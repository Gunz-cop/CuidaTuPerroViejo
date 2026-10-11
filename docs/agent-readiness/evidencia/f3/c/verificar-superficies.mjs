// Gate finito F3C, local o preview fija con recibo. Sin retries ni redirects seguidos.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import Ajv2020 from 'ajv/dist/2020.js';

const [origin, output, receiptPath] = process.argv.slice(2);
assert.ok(origin && output, 'Uso: node verificar-superficies.mjs ORIGIN OUT [RECEIPT]');
const url = new URL(origin); assert.equal(url.origin, origin);
const local = ['127.0.0.1', 'localhost'].includes(url.hostname);
const out = resolve(output); await mkdir(out, { recursive: true });
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const tree = execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
assert.equal(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }), '', 'entrega congelada');
let receipt = null;
if (!local) {
  assert.equal(url.protocol, 'https:'); assert.match(url.hostname, /^[a-f0-9]+-cuidatuperroviejo\.g1721m\.workers\.dev$/u);
  assert.ok(receiptPath, 'preview requiere recibo independiente');
  receipt = JSON.parse(await readFile(receiptPath));
  assert.equal(receipt.commit, commit); assert.equal(receipt.tree, tree);
  assert.equal(receipt.ci.conclusion, 'success'); assert.equal(receipt.preview.commitPreviewUrl, origin);
}
const root = resolve('dist/client');
const sha = (value) => createHash('sha256').update(value).digest('hex');
const readAsset = (path) => readFile(join(root, path));
const index = JSON.parse(await readAsset('/agent-content/v1/index.json'));
const query = JSON.parse(await readAsset('/agent-api/v1/query-index.json'));
const schema = JSON.parse(await readFile('src/agent-api/schema.json'));
const ajv = new Ajv2020({ strict: false, validateFormats: false }); ajv.addSchema(schema);
const validators = Object.fromEntries(['Catalog', 'Search', 'Read', 'Error'].map((name) => [name, ajv.compile({ $ref: `${schema.$id}#/$defs/${name}` })]));
const LINK = [
  '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"',
  '<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"',
  '<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
].join(', ');
const TYPES = new Map([
  ['/.well-known/api-catalog', 'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"'],
  ['/agent-api/v1/openapi.json', 'application/vnd.oai.openapi+json;version=3.1'],
  ['/.well-known/agent-skills/index.json', 'application/json;charset=utf-8'],
  ['/.well-known/agent-skills/buscar-leer-citar/SKILL.md', 'text/markdown;charset=utf-8'],
  ['/.well-known/ard.json', 'application/json;charset=utf-8'],
  ['/.well-known/ai-catalog.json', 'application/json;charset=utf-8'],
  ['/agent-api/v1/query-index.json', 'application/json;charset=utf-8'],
]);
const mime = (value) => value?.split(';').map((part) => part.trim()).join(';');
const records = [], documents = [], journeys = [], conditionals = [];
const state = { commit, tree, origin, mode: local ? 'workerd-local' : 'commit-preview', receipt, corpusSha256: index.corpusSha256, records, documents, journeys, conditionals, result: 'RUNNING' };
async function save() { await writeFile(join(out, 'manifest-private.json'), JSON.stringify(state, null, 2) + '\n'); }
async function request(path, { method = 'GET', status = 200, headers = {}, shared = true, api = false, asset = false, schemaName } = {}) {
  assert.ok(path.startsWith('/') && !path.startsWith('//'));
  const number = String(records.length + 1).padStart(3, '0');
  const record = { path, method, expectedStatus: status, requestHeaders: headers, file: `${number}.body` }; records.push(record);
  let response;
  try {
    response = await fetch(origin + path, { method, redirect: 'manual', signal: AbortSignal.timeout(30000), headers: { 'Accept-Encoding': 'identity', ...headers } });
    record.status = response.status; record.headers = Object.fromEntries(response.headers);
    const bytes = Buffer.from(await response.arrayBuffer());
    record.bytes = bytes.length; record.sha256 = sha(bytes); await writeFile(join(out, record.file), bytes);
    await save(); // Persist the original before any assertion; never retry a failed case.
    assert.equal(response.status, status, `${method} ${path}`);
    if (method === 'HEAD' || status === 204 || status === 304) assert.equal(bytes.length, 0);
    if (shared) {
      assert.equal(response.headers.get('Link'), LINK, `Link ${method} ${path}`);
      assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
      assert.equal(response.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
      assert.equal(response.headers.get('Permissions-Policy'), 'geolocation=(), microphone=(), camera=()');
      assert.equal(response.headers.get('Strict-Transport-Security'), 'max-age=31536000; includeSubDomains');
    }
    if (api || asset) {
      assert.equal(response.headers.get('Cache-Control'), api ? 'private, no-store' : 'no-store');
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*');
      assert.equal(response.headers.get('Access-Control-Allow-Credentials'), null);
      assert.equal(response.headers.get('Set-Cookie'), null);
    }
    if (api) {
      assert.equal(response.headers.get('Access-Control-Allow-Methods'), 'GET, HEAD, OPTIONS');
      assert.equal(response.headers.get('Access-Control-Allow-Headers'), 'Accept');
      assert.equal(response.headers.get('Access-Control-Expose-Headers'), 'Link');
      assert.equal(response.headers.get('ETag'), null); assert.equal(response.headers.get('Last-Modified'), null);
      if (status !== 204) assert.equal(mime(response.headers.get('Content-Type')), 'application/json;charset=utf-8');
    }
    const value = schemaName && bytes.length ? JSON.parse(bytes) : null;
    if (value) assert.equal(validators[schemaName](value), true, JSON.stringify(validators[schemaName].errors));
    return { response, bytes, value, record };
  } catch (error) { record.failure = error.message; await save(); throw error; }
}
function pathOf(href) {
  const target = new URL(href); assert.equal(target.origin, 'https://cuidatuperroviejo.com');
  return target.pathname + target.search; // Contract metadata stays canonical; transport selects this exact preview.
}
const api = '/api/agent/v1/';
try {
  const assets = new Map();
  for (const [path, type] of TYPES) {
    const get = await request(path, { asset: true });
    assert.equal(mime(get.response.headers.get('Content-Type')), type);
    assert.deepEqual(get.bytes, await readAsset(path)); assets.set(path, get);
    const head = await request(path, { method: 'HEAD', asset: true });
    assert.equal(mime(head.response.headers.get('Content-Type')), type);
  }
  const catalogAsset = assets.get('/.well-known/api-catalog');
  const etag = catalogAsset.response.headers.get('ETag');
  if (etag) {
    await request('/.well-known/api-catalog', { status: 304, headers: { 'If-None-Match': etag }, asset: true });
    conditionals.push({ path: '/.well-known/api-catalog', result: 'PASS 304', etag });
  } else conditionals.push({ path: '/.well-known/api-catalog', result: 'N/A', reason: 'La plataforma no expuso ETag nativo en esta entidad; no se inventa uno exterior.' });
  const linkset = JSON.parse(catalogAsset.bytes);
  const openapi = JSON.parse(assets.get('/agent-api/v1/openapi.json').bytes);
  assert.equal(openapi.openapi, '3.1.1');
  assert.equal(Object.values(openapi.paths).flatMap((path) => Object.values(path).map((op) => op.operationId)).length, 9);
  for (const context of linkset.linkset) for (const rel of ['item', 'service-desc']) for (const target of context[rel] ?? []) {
    const path = pathOf(target.href);
    if (!assets.has(path)) await request(path, { api: true, schemaName: path.includes('/search') ? 'Search' : path.includes('/documents/') ? 'Read' : 'Catalog' });
  }
  assert.deepEqual(assets.get('/.well-known/ard.json').bytes, assets.get('/.well-known/ai-catalog.json').bytes);
  const ard = JSON.parse(assets.get('/.well-known/ard.json').bytes);
  assert.equal(ard.entries.length, 2);
  for (const entry of ard.entries) assert.ok(assets.has(pathOf(entry.url)), 'ARD apunta a entidad200 verificada');
  const skills = JSON.parse(assets.get('/.well-known/agent-skills/index.json').bytes);
  assert.equal(skills.$schema, 'https://schemas.agentskills.io/discovery/0.2.0/schema.json');
  const skill = skills.skills[0]; const skillBytes = assets.get(pathOf(skill.url)).bytes;
  assert.equal(skill.digest, `sha256:${sha(skillBytes)}`);

  const catalogDocs = []; let offset = 0;
  do {
    const { value } = await request(`${api}catalog?limit=9&offset=${offset}`, { api: true, schemaName: 'Catalog' });
    assert.equal(value.corpusSha256, index.corpusSha256); assert.equal(value.total, index.documents.length);
    catalogDocs.push(...value.documents); offset = value.nextOffset;
  } while (offset !== null);
  assert.deepEqual(catalogDocs, index.documents);
  for (const [i, doc] of index.documents.entries()) {
    const path = `${api}documents/${doc.documentId}?corpus=${index.corpusSha256}`;
    const { value, record } = await request(path, { api: true, schemaName: 'Read' });
    const bytes = Buffer.from(value.markdown); assert.deepEqual(bytes, await readAsset(doc.markdownPath));
    assert.equal(sha(bytes), doc.markdownSha256); assert.equal(bytes.length, doc.markdownBytes);
    assert.deepEqual(value.document, doc); assert.deepEqual(value.links, query.documents[i].links);
    await request(path, { method: 'HEAD', api: true });
    documents.push({ documentId: doc.documentId, bytes: bytes.length, sha256: sha(bytes), links: value.links.length, record: record.file });
  }
  for (const [term, entrypoint] of [['cushing', 'api-catalog/openapi'], ['artrosis', 'skills/digest']]) {
    const { value: search } = await request(`${api}search?q=${term}`, { api: true, schemaName: 'Search' });
    assert.ok(search.results.length); assert.equal(search.corpusSha256, index.corpusSha256);
    const selected = search.results[0].document;
    const { value: read } = await request(`${api}documents/${selected.documentId}?corpus=${search.corpusSha256}`, { api: true, schemaName: 'Read' });
    const canonical = await request(pathOf(read.document.canonicalUrl), { headers: { Accept: 'text/html' } });
    assert.ok(canonical.bytes.toString().includes(read.document.canonicalUrl));
    const md = await request(pathOf(read.document.canonicalUrl), { headers: { Accept: 'text/markdown' } });
    assert.deepEqual(md.bytes, Buffer.from(read.markdown));
    const source = read.links.find((link) => /^https?:/u.test(link.url) && new URL(link.url).origin !== 'https://cuidatuperroviejo.com');
    assert.ok(source, 'enlace externo original disponible para cita; no se reclasifica como evidencia científica');
    journeys.push({ entrypoint, term, selectedId: selected.documentId, corpus: search.corpusSha256, canonicalUrl: read.document.canonicalUrl, markdownSha256: sha(md.bytes), originalExternalLink: source });
  }
  const none = await request(`${api}search?q=xyzsincoincidencias`, { api: true, schemaName: 'Search' }); assert.equal(none.value.total, 0);
  for (const [path, status, code] of [
    ['search?q=%FF', 400, 'INVALID_REQUEST'], ['search?q=x&q=y', 400, 'INVALID_REQUEST'], ['catalog?limit=21', 400, 'INVALID_REQUEST'],
    ['documents/%2f', 400, 'INVALID_REQUEST'], ['documents/article--unknown', 404, 'DOCUMENT_NOT_FOUND'], ['catalog/', 404, 'ROUTE_NOT_FOUND'],
    ['documents/home?corpus=' + '0'.repeat(64), 409, 'CORPUS_CHANGED'],
  ]) {
    const get = await request(api + path, { status, api: true, schemaName: 'Error' }); assert.equal(get.value.error.code, code);
    await request(api + path, { method: 'HEAD', status, api: true });
  }
  for (const path of ['catalog', 'search', 'documents/article--unknown']) {
    await request(api + path + '?bad=%FF', { method: 'OPTIONS', status: 204, api: true });
    const post = await request(api + path, { method: 'POST', status: 405, api: true, schemaName: 'Error' });
    assert.equal(post.response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
  }
  await request(api + 'documents/home', { api: true, schemaName: 'Read', headers: { Accept: 'image/png', Range: 'bytes=0-1', 'If-None-Match': '*' } });
  for (const [method, accept] of [['GET', 'text/html'], ['HEAD', 'text/html'], ['GET', 'text/markdown'], ['HEAD', 'text/markdown']]) {
    const home = await request('/', { method, headers: { Accept: accept } });
    if (method === 'GET' && accept === 'text/markdown') assert.deepEqual(home.bytes, await readAsset('/agent-content/v1/documents/home.md'));
  }
  for (const path of ['/llms.txt', '/robots.txt', '/sitemap-index.xml', '/api/assistant-catalog.json']) {
    const result = await request(path); assert.deepEqual(result.bytes, await readAsset(path));
  }
  const redirect = await request('/p/acerca-de.html', { status: 301, shared: false });
  assert.equal(new URL(redirect.response.headers.get('Location'), origin).pathname, '/acerca-de');
  const buildFiles = [];
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = join(dir, item.name);
      if (item.isDirectory()) await walk(file);
      else { const bytes = await readFile(file); buildFiles.push({ path: file.slice(resolve('dist').length + 1), bytes: bytes.length, sha256: sha(bytes) }); }
    }
  }
  await walk(resolve('dist')); state.buildFiles = buildFiles.sort((a, b) => a.path < b.path ? -1 : 1);
  state.result = 'PASS'; await save();
  console.log(JSON.stringify({ result: state.result, commit, tree, mode: state.mode, requests: records.length, documents: documents.length, journeys: journeys.length, manifest: join(out, 'manifest-private.json') }, null, 2));
} catch (error) {
  state.result = 'FAIL/STOP'; state.failure = error.message; await save();
  console.error(`FAIL/STOP: ${error.message}. Originales conservados; no retry.`); process.exitCode = 1;
}
