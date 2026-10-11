// Ejecutar desde la raíz del checkout ya compilado. Sólo localhost y lectura.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import Ajv2020 from 'ajv/dist/2020.js';

const origin = process.argv[2] ?? 'http://127.0.0.1:8798';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(origin).hostname), 'sólo workerd local');
const out = resolve(process.argv[3] ?? '/workspace/f3b-evidence/workerd');
await mkdir(out, { recursive: true });
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const tree = execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
assert.equal(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }), '', 'snapshot limpio antes de verificar');
const assetRoot = resolve('dist/client');
const index = JSON.parse(await readFile(join(assetRoot, 'agent-content/v1/index.json')));
const query = JSON.parse(await readFile(join(assetRoot, 'agent-api/v1/query-index.json')));
const schema = JSON.parse(await readFile('src/agent-api/schema.json'));
const ajv = new Ajv2020({ strict: false, validateFormats: false }); ajv.addSchema(schema);
const validate = Object.fromEntries(['Catalog', 'Search', 'Read', 'Error'].map((key) => [key, ajv.compile({ $ref: `${schema.$id}#/$defs/${key}` })]));
const records = [];
async function capture(path, method = 'GET', schemaName, requestHeaders = {}) {
  const response = await fetch(origin + path, { method, redirect: 'manual', headers: requestHeaders });
  const bytes = Buffer.from(await response.arrayBuffer());
  const file = `${String(records.length + 1).padStart(3, '0')}-${method}.body`;
  await writeFile(join(out, file), bytes);
  const record = { path, method, status: response.status, headers: Object.fromEntries(response.headers), file, bytes: bytes.length, sha256: digest(bytes) };
  records.push(record);
  if (method === 'HEAD' || method === 'OPTIONS') assert.equal(bytes.length, 0);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*');
  assert.equal(response.headers.get('Access-Control-Expose-Headers'), 'Link');
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(response.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.equal(response.headers.get('Permissions-Policy'), 'geolocation=(), microphone=(), camera=()');
  assert.equal(response.headers.get('Strict-Transport-Security'), 'max-age=31536000; includeSubDomains');
  for (const key of ['ETag', 'Last-Modified', 'Set-Cookie', 'Access-Control-Allow-Credentials']) assert.equal(response.headers.get(key), null);
  const value = bytes.length ? JSON.parse(bytes) : null;
  if (schemaName && value) assert.equal(validate[schemaName](value), true, JSON.stringify(validate[schemaName].errors));
  if (value) assert.equal(bytes.toString(), JSON.stringify(value, null, 2) + '\n');
  return { response, value, record };
}
const api = '/api/agent/v1/';
let offset = 0; const catalogDocs = [];
do {
  const { response, value } = await capture(`${api}catalog?limit=7&offset=${offset}`, 'GET', 'Catalog');
  assert.equal(response.status, 200); assert.equal(value.total, index.documents.length);
  assert.equal(value.corpusSha256, index.corpusSha256);
  catalogDocs.push(...value.documents); offset = value.nextOffset;
} while (offset !== null);
assert.deepEqual(catalogDocs, index.documents);

const readEvidence = [];
for (const [i, doc] of index.documents.entries()) {
  const path = `${api}documents/${doc.documentId}?corpus=${index.corpusSha256}`;
  const { response, value, record } = await capture(path, 'GET', 'Read');
  assert.equal(response.status, 200); assert.deepEqual(value.document, doc);
  const original = await readFile(join(assetRoot, doc.markdownPath));
  const returned = Buffer.from(value.markdown);
  assert.deepEqual(returned, original); assert.equal(digest(returned), doc.markdownSha256); assert.equal(returned.length, doc.markdownBytes);
  assert.deepEqual(value.links, query.documents[i].links);
  const head = await capture(path, 'HEAD'); assert.equal(head.response.status, 200);
  for (const key of ['Content-Type', 'Cache-Control', 'Link', 'Access-Control-Allow-Origin']) assert.equal(head.response.headers.get(key), response.headers.get(key));
  readEvidence.push({ documentId: doc.documentId, markdownBytes: returned.length, markdownSha256: digest(returned), response: record.file, links: value.links.length });
}

for (const [q, expectedTokens] of [['CÚSHING', ['cushing']], ['artrosis', ['artrosis']], ['movilidad dolor', ['movilidad', 'dolor']], ['cushing cushing', ['cushing']], ['xyzsincoincidencias', ['xyzsincoincidencias']]]) {
  // Oracle over the accepted static token artifact, no production runtime helper.
  const expected = query.documents.flatMap((entry, i) => {
    const scores = expectedTokens.map((token) => [entry.titleTokens, entry.descriptionTokens, entry.bodyTokens].reduce((sum, field, j) => sum + (new Set(field).has(token) ? [8, 3, 1][j] : 0), 0));
    return scores.every((n) => n > 0) ? [{ document: index.documents[i], score: scores.reduce((a, b) => a + b, 0) }] : [];
  }).sort((a, b) => b.score - a.score || (a.document.documentId < b.document.documentId ? -1 : 1));
  const { response, value } = await capture(`${api}search?q=${encodeURIComponent(q)}`, 'GET', 'Search');
  assert.equal(response.status, 200); assert.deepEqual(value.results, expected.slice(0, 20)); assert.equal(value.total, expected.length);
}
for (const kind of ['home', 'pillar', 'article', 'tool', 'editorial']) {
  const { value } = await capture(`${api}catalog?kind=${kind}`, 'GET', 'Catalog');
  const expected = index.documents.filter((doc) => doc.kind === kind);
  assert.equal(value.total, expected.length); assert.deepEqual(value.documents, expected.slice(0, 20));
}
for (const [path, status, code] of [
  ['search?q=%FF', 400, 'INVALID_REQUEST'], ['search?q=x&q=y', 400, 'INVALID_REQUEST'],
  ['search?q=', 400, 'INVALID_REQUEST'], ['search?q=' + 'a'.repeat(65), 400, 'INVALID_REQUEST'],
  ['catalog?limit=21', 400, 'INVALID_REQUEST'], ['documents/%2f', 400, 'INVALID_REQUEST'],
  ['documents/home?url=https://example.org/', 400, 'INVALID_REQUEST'], ['catalog/', 404, 'ROUTE_NOT_FOUND'],
  ['documents/article--unknown', 404, 'DOCUMENT_NOT_FOUND'], ['documents/article--unknown?corpus=' + '0'.repeat(64), 409, 'CORPUS_CHANGED'],
]) {
  const { response, value } = await capture(api + path, 'GET', 'Error'); assert.equal(response.status, status); assert.equal(value.error.code, code);
  const head = await capture(api + path, 'HEAD'); assert.equal(head.response.status, status);
}
for (const route of ['catalog', 'search', 'documents/article--unknown']) {
  const options = await capture(api + route + '?bad=%FF', 'OPTIONS'); assert.equal(options.response.status, 204);
  const post = await capture(api + route, 'POST', 'Error'); assert.equal(post.response.status, 405); assert.equal(post.response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
}
const conditional = await capture(api + 'documents/home', 'GET', 'Read', { Accept: 'image/png', Range: 'bytes=0-1', 'If-None-Match': '*', 'If-Modified-Since': new Date().toUTCString() });
assert.equal(conditional.response.status, 200);

const buildFiles = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await walk(path);
    else { const bytes = await readFile(path); buildFiles.push({ path: path.slice(resolve('dist').length + 1), bytes: bytes.length, sha256: digest(bytes) }); }
  }
}
await walk(resolve('dist')); buildFiles.sort((a, b) => a.path < b.path ? -1 : 1);
await writeFile(join(out, 'manifest.json'), JSON.stringify({ commit, tree, origin, corpusSha256: index.corpusSha256, documentCount: index.documents.length, records, readEvidence, buildFiles }, null, 2) + '\n');
console.log(JSON.stringify({ result: 'PASS', commit, tree, documents: readEvidence.length, requests: records.length, buildFiles: buildFiles.length, manifest: join(out, 'manifest.json') }, null, 2));
