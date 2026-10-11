import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import { createAgentApiWorker } from '../../src/lib/agent-api/runtime';
import type { AgentDocument } from '../../src/lib/agent-content/runtime';

const SITE = 'https://cuidatuperroviejo.com';
const API = '/api/agent/v1/';
const INDEX = '/agent-content/v1/index.json';
const QUERY = '/agent-api/v1/query-index.json';
const hash = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex');
const schema = JSON.parse(readFileSync(new URL('../../src/agent-api/schema.json', import.meta.url), 'utf8'));
const ajv = new Ajv2020({ strict: false, validateFormats: false });
ajv.addSchema(schema);
const validators = Object.fromEntries(['CatalogResponse', 'SearchResponse', 'ReadResponse', 'ErrorResponse'].map((name) => [name, ajv.compile({ $ref: `${schema.$id}#/$defs/${name.replace('Response', '')}` })]));

// Declared fixture expectations, independent of the production tokenizer/parser.
// A match, warning and source are deliberately beyond character 4000.
const longMarkdown = `# Cushing\n\n${'perro '.repeat(800)}\n\nArtrosis: aviso final. [Fuente](https://example.org/a_(b)?x=1#fin)\n`;
const links = [{ label: 'Fuente', url: 'https://example.org/a_(b)?x=1#fin' }];
function fixture() {
  const specs = [
    ['article--a', '/a', 'Cushing', 'Artrosis', longMarkdown, ['artrosis', 'aviso', 'cushing', 'final', 'fuente', 'perro'], links],
    ['article--b', '/b', 'Cushing', 'Artrosis', 'Cushing artrosis\n', ['artrosis', 'cushing'], []],
    ['home', '/', 'Inicio', 'Cushing', 'Artrosis\n', ['artrosis'], []],
  ] as const;
  const documents: AgentDocument[] = specs.map(([id, path, title, description, markdown]) => ({
    documentId: id, kind: id === 'home' ? 'home' : 'article', title, description,
    canonicalPath: path, canonicalUrl: SITE + path, markdownPath: `/agent-content/v1/documents/${id}.md`,
    language: 'es', datePublished: null, dateModified: null, htmlSha256: 'a'.repeat(64),
    markdownSha256: hash(markdown), markdownBytes: Buffer.byteLength(markdown),
  }));
  const corpusSha256 = hash(JSON.stringify(documents.map((d) => [d.documentId, d.canonicalPath, d.markdownSha256])));
  const index = { schemaVersion: 'agent-content/1', siteOrigin: SITE, language: 'es', corpusSha256, documents };
  const query = { schemaVersion: 'agent-query/1', corpusSha256, documents: specs.map(([id, , , , , body, refs], i) => ({
    documentId: id, markdownSha256: documents[i]!.markdownSha256,
    titleTokens: [id === 'home' ? 'inicio' : 'cushing'], descriptionTokens: [id === 'home' ? 'cushing' : 'artrosis'],
    bodyTokens: [...body] as string[], links: structuredClone(refs) as Array<{label: string; url: string}>,
  })) };
  const data = new Map<string, string | Uint8Array>([
    [INDEX, JSON.stringify(index)], [QUERY, JSON.stringify(query)],
    ...specs.map((s, i): [string, string] => [documents[i]!.markdownPath, s[4]]),
  ]);
  return { index, query, data, save: () => { data.set(INDEX, JSON.stringify(index)); data.set(QUERY, JSON.stringify(query)); } };
}

function harness(f = fixture(), intercept?: (req: Request) => Response | undefined) {
  const seen: Request[] = [];
  const delegated: Request[] = [];
  const assets = { fetch: async (req: Request) => {
    seen.push(req);
    const response = intercept?.(req);
    if (response) return response;
    const body = f.data.get(new URL(req.url).pathname);
    return body === undefined ? new Response('missing', { status: 404 }) : new Response(typeof body === 'string' ? body : new Uint8Array(body));
  } } as unknown as Fetcher;
  const worker = createAgentApiWorker(async (req) => { delegated.push(req); return new Response('delegated'); });
  const request = (path: string, method = 'GET', headers: HeadersInit = {}) => worker(new Request(SITE + path, { method, headers }), { ASSETS: assets }, {} as ExecutionContext);
  return { f, seen, delegated, request };
}

async function body(response: Response, name?: string) {
  const text = await response.text();
  const value = JSON.parse(text);
  assert.equal(text, JSON.stringify(value, null, 2) + '\n');
  if (name) assert.equal(validators[name]!(value), true, JSON.stringify(validators[name]!.errors));
  return value;
}

test('catalog schema, exact F2 metadata, filters, paging and empty page', async () => {
  const h = harness();
  const value = await body(await h.request(API + 'catalog?limit=1'), 'CatalogResponse');
  assert.deepEqual(value.documents, [h.f.index.documents[0]]);
  assert.deepEqual([value.total, value.limit, value.offset, value.nextOffset], [3, 1, 0, 1]);
  const last = await body(await h.request(API + 'catalog?kind=article&offset=1&limit=20'), 'CatalogResponse');
  assert.deepEqual(last.documents, [h.f.index.documents[1]]);
  assert.equal(last.nextOffset, null);
  const empty = await body(await h.request(API + 'catalog?offset=98'), 'CatalogResponse');
  assert.deepEqual([empty.documents, empty.total, empty.nextOffset], [[], 3, null]);
  assert.equal(h.seen.length, 2, 'successful indexes cached by binding');
});

test('AND, accent normalization, distinct tokens, exact weights and ASCII ties', async () => {
  const h = harness();
  for (const q of ['CÚSHING artrosis', 'artrosis cushing cushing', 'cushing-artrosis']) {
    const value = await body(await h.request(API + 'search?q=' + encodeURIComponent(q)), 'SearchResponse');
    assert.deepEqual(value.results.map((r: any) => [r.document.documentId, r.score]), [['article--a', 13], ['article--b', 13], ['home', 4]]);
  }
  const late = await body(await h.request(API + 'search?q=aviso+final'), 'SearchResponse');
  assert.deepEqual(late.results.map((r: any) => [r.document.documentId, r.score]), [['article--a', 2]]);
  const none = await body(await h.request(API + 'search?q=cushing+inexistente'), 'SearchResponse');
  assert.deepEqual([none.results, none.total, none.nextOffset], [[], 0, null]);
  const filtered = await body(await h.request(API + 'search?q=artrosis&kind=home'), 'SearchResponse');
  assert.deepEqual(filtered.results.map((r: any) => r.document.documentId), ['home']);
  assert.deepEqual(h.seen.map((r) => new URL(r.url).pathname), [INDEX, QUERY], 'search never fetches Markdown');
});

test('read returns complete bytes, metadata, links and retained final warning/source', async () => {
  const h = harness();
  for (const doc of h.f.index.documents) {
    const value = await body(await h.request(API + 'documents/' + doc.documentId), 'ReadResponse');
    assert.deepEqual(value.document, doc);
    assert.equal(value.markdown, h.f.data.get(doc.markdownPath));
    assert.equal(hash(value.markdown), doc.markdownSha256);
    assert.equal(Buffer.byteLength(value.markdown), doc.markdownBytes);
  }
  const value = await body(await h.request(API + 'documents/article--a'));
  assert.deepEqual(value.links, links);
  assert.ok(value.markdown.indexOf('aviso final') > 4000);
});

test('strict query decoding, closed keys, presence, integers and controls', async () => {
  const h = harness();
  const invalid = ['search', 'search?q=', 'search?q=...', 'search?q=%', 'search?q=%GG', 'search?q=%C0%AF', 'search?q=%ED%A0%80', 'search?q=%FF',
    'search?q=cushing&q=x', 'search?q=x&%71=y', 'search?q=x&z=1', 'search?q=x&=1', 'search?q=x%00', 'search?q=x%7F',
    'catalog?q=x', 'catalog?kind=', 'catalog?kind=ARTICLE', 'catalog?limit=', 'catalog?limit=0', 'catalog?limit=21', 'catalog?limit=01',
    'catalog?limit=+1', 'catalog?limit=1.0', 'catalog?limit=1e1', 'catalog?offset=-1', 'catalog?offset=99', 'catalog?offset=00',
    'catalog?corpus=', 'catalog?corpus=' + 'A'.repeat(64), 'documents/home?limit=1'];
  for (const path of invalid) {
    const r = await h.request(API + path);
    assert.equal(r.status, 400, path);
    assert.deepEqual(await body(r, 'ErrorResponse'), { schemaVersion: 'agent-api/1', error: { code: 'INVALID_REQUEST', message: 'Invalid request.' } });
  }
  assert.equal(h.seen.length, 0);
});

test('query boundaries include raw 2048, q 200, 12 tokens and token 64; NFC before limits', async () => {
  const h = harness();
  const cases: Array<[string, number]> = [
    ['q=' + '+'.repeat(2039) + 'cushing', 200], ['q=' + '+'.repeat(2040) + 'cushing', 400],
    ['q=' + 'a-'.repeat(99) + 'ab', 200], ['q=' + 'a-'.repeat(100) + 'a', 400],
    ['q=' + Array.from({ length: 12 }, (_, i) => 'w' + i).join('+'), 200], ['q=' + Array.from({ length: 13 }, (_, i) => 'w' + i).join('+'), 400],
    ['q=' + 'a'.repeat(64), 200], ['q=' + 'a'.repeat(65), 400],
  ];
  const normative = JSON.parse(readFileSync(new URL('../../docs/agent-readiness/evidencia/f3/contratos/q-normalizacion-casos.json', import.meta.url), 'utf8'));
  cases.push(...normative.cases.map((c: any): [string, number] => [c.rawQuery, c.expectedStatus]));
  for (const [q, status] of cases) for (const method of ['GET', 'HEAD']) {
    const r = await h.request(API + 'search?' + q, method);
    assert.equal(r.status, status, `${method} ${q.slice(0, 50)} (${q.length})`);
    if (method === 'HEAD') assert.equal(await r.text(), '');
  }
});

test('path/method/query/data/corpus/membership precedence, OPTIONS without I/O', async () => {
  const h = harness();
  for (const path of ['catalog/', 'nope', 'documents/home/']) {
    assert.equal((await h.request(API + path + '?bad=1', 'POST')).status, 404);
  }
  for (const id of ['BAD', '%2f', '%2e%2e%2f', 'article--' + 'a'.repeat(152)]) {
    assert.equal((await h.request(API + 'documents/' + id, 'OPTIONS')).status, 400);
  }
  for (const path of ['catalog', 'search', 'documents/article--unknown']) {
    const r = await h.request(API + path + '?bad=%FF', 'OPTIONS');
    assert.equal(r.status, 204); assert.equal(await r.text(), '');
    const m = await h.request(API + path + '?bad=1', 'PATCH');
    assert.equal(m.status, 405); assert.equal(m.headers.get('Allow'), 'GET, HEAD, OPTIONS');
  }
  assert.equal(h.seen.length, 0);
  assert.equal((await h.request(API + 'documents/article--unknown?bad=1')).status, 400);
  assert.equal((await h.request(API + 'documents/article--unknown?corpus=' + '0'.repeat(64))).status, 409);
  assert.equal((await h.request(API + 'documents/article--unknown')).status, 404);
  assert.equal((await h.request(API + 'catalog?corpus=' + h.f.index.corpusSha256)).status, 200);
  const unavailable = harness(); unavailable.f.data.delete(INDEX);
  assert.equal((await unavailable.request(API + 'documents/article--unknown?corpus=' + '0'.repeat(64))).status, 503);
  for (const path of ['/api/agent/v10/catalog', '/api/ask', '/', '/agent-api/v1/openapi.json']) assert.equal(await (await h.request(path)).text(), 'delegated');
  assert.equal(h.delegated.length, 4);
});

test('GET/HEAD parity, fixed headers, no reflection/conditional processing or header forwarding', async () => {
  const h = harness();
  const incoming = { Authorization: 'secret', Cookie: 'private', Accept: 'image/png', Origin: 'https://example.org', Range: 'bytes=0-1', 'If-None-Match': '*', 'If-Modified-Since': new Date().toUTCString() };
  const expected = [
    '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"',
    '<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    '<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
    '<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"',
    '<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
  ].join(', ');
  for (const path of ['catalog', 'search?q=cushing', 'documents/home', 'search?q=%FF', 'missing', 'documents/article--unknown', 'catalog?corpus=' + '0'.repeat(64)]) {
    const get = await h.request(API + path, 'GET', incoming);
    const head = await h.request(API + path, 'HEAD', incoming);
    assert.equal(head.status, get.status); assert.deepEqual([...head.headers], [...get.headers]); assert.equal(await head.text(), '');
    assert.equal(get.headers.get('Link'), expected);
    assert.equal(get.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(get.headers.get('Access-Control-Allow-Origin'), '*');
    assert.equal(get.headers.get('Access-Control-Allow-Methods'), 'GET, HEAD, OPTIONS');
    assert.equal(get.headers.get('Access-Control-Allow-Headers'), 'Accept');
    assert.equal(get.headers.get('Access-Control-Expose-Headers'), 'Link');
    assert.equal(get.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(get.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
    assert.equal(get.headers.get('Permissions-Policy'), 'geolocation=(), microphone=(), camera=()');
    assert.equal(get.headers.get('Strict-Transport-Security'), 'max-age=31536000; includeSubDomains');
    for (const key of ['Set-Cookie', 'ETag', 'Last-Modified', 'Content-Length', 'Content-Encoding', 'Access-Control-Allow-Credentials']) assert.equal(get.headers.get(key), null);
    assert.doesNotMatch(await get.text(), /secret|private"|example.org"/);
  }
  for (const req of h.seen) {
    assert.equal(req.method, 'GET'); assert.equal(req.redirect, 'manual'); assert.deepEqual([...req.headers], []);
    assert.equal(new URL(req.url).origin, SITE); assert.equal(new URL(req.url).search, '');
    assert.ok([INDEX, QUERY, ...h.f.index.documents.map((d) => d.markdownPath)].includes(new URL(req.url).pathname));
  }
});

test('query schema/invariants fail closed and failed promises recover on same binding', async () => {
  const mutations: Array<(f: ReturnType<typeof fixture>) => void> = [
    (f) => { (f.query as any).extra = true; }, (f) => { f.query.corpusSha256 = '0'.repeat(64); },
    (f) => { f.query.documents.reverse(); }, (f) => { f.query.documents.pop(); },
    (f) => { f.query.documents[0]!.markdownSha256 = '0'.repeat(64); },
    (f) => { f.query.documents[0]!.bodyTokens = ['cushing', 'cushing']; },
    (f) => { f.query.documents[0]!.bodyTokens = ['z', 'a']; },
    (f) => { f.query.documents[0]!.bodyTokens = ['CÚSHING']; },
    (f) => { f.query.documents[0]!.titleTokens = ['wrong']; },
    (f) => { f.query.documents[0]!.links[0]!.url = 'javascript:alert(1)'; },
    (f) => { f.query.documents[0]!.links[0]!.url = 'https://user:pass@example.org/'; },
    (f) => { f.query.documents[0]!.links.push(f.query.documents[0]!.links[0]!); },
    (f) => { (f.query.documents[0]!.links[0] as any).extra = true; },
  ];
  for (const mutate of mutations) {
    const f = fixture(); mutate(f); f.save(); const h = harness(f);
    const r = await h.request(API + 'search?q=cushing'); assert.equal(r.status, 503);
    assert.equal((await body(r, 'ErrorResponse')).error.code, 'CONTENT_UNAVAILABLE');
    f.data.set(QUERY, fixture().data.get(QUERY)!);
    assert.equal((await h.request(API + 'search?q=cushing')).status, 200);
  }
});

test('missing, malformed, invalid UTF-8, oversized indexes and binding isolation', async () => {
  for (const path of [INDEX, QUERY]) for (const bytes of [undefined, '{', new Uint8Array([0xff]), ' '.repeat((path === INDEX ? 512 * 1024 : 8 * 1024 * 1024) + 1)]) {
    const h = harness();
    if (bytes === undefined) h.f.data.delete(path); else h.f.data.set(path, bytes);
    assert.equal((await h.request(API + 'catalog')).status, 503);
    h.f.data.set(path, fixture().data.get(path)!);
    assert.equal((await h.request(API + 'catalog')).status, 200);
  }
  const good = harness(); const bad = harness(); bad.f.data.delete(QUERY);
  assert.equal((await good.request(API + 'catalog')).status, 200);
  assert.equal((await bad.request(API + 'catalog')).status, 503);
});

test('document absence/hash/UTF-8/size failure is 503 also for HEAD, recoverable', async () => {
  for (const bytes of [undefined, 'corrupt\n', new Uint8Array([0xff]), 'x'.repeat(512 * 1024 + 1)]) {
    const h = harness(); const doc = h.f.index.documents[0]!;
    if (bytes === undefined) h.f.data.delete(doc.markdownPath); else h.f.data.set(doc.markdownPath, bytes);
    for (const method of ['GET', 'HEAD']) {
      const r = await h.request(API + 'documents/article--a', method); assert.equal(r.status, 503);
      if (method === 'HEAD') assert.equal(await r.text(), '');
    }
    h.f.data.set(doc.markdownPath, longMarkdown);
    assert.equal((await h.request(API + 'documents/article--a')).status, 200);
  }
  const f = fixture(); const doc = f.index.documents[0]!; const bytes = new Uint8Array([0xff]);
  doc.markdownSha256 = hash(bytes); doc.markdownBytes = 1;
  f.query.documents[0]!.markdownSha256 = doc.markdownSha256;
  f.index.corpusSha256 = f.query.corpusSha256 = hash(JSON.stringify(f.index.documents.map((d) => [d.documentId, d.canonicalPath, d.markdownSha256])));
  f.data.set(doc.markdownPath, bytes); f.save();
  assert.equal((await harness(f).request(API + 'documents/article--a')).status, 503, 'fatal UTF-8 even with matching digest');
});

test('inclusive streaming caps and response cap: full entity or 503, never truncation', async () => {
  for (const path of [INDEX, QUERY]) {
    const f = fixture(); const cap = path === INDEX ? 512 * 1024 : 8 * 1024 * 1024;
    const original = f.data.get(path) as string; f.data.set(path, original + ' '.repeat(cap - Buffer.byteLength(original)));
    assert.equal((await harness(f).request(API + 'catalog')).status, 200);
  }
  // Long links are legal metadata; enough of them exceed the 2 MiB read envelope.
  const f = fixture(); f.query.documents[0]!.links = [{ label: 'x'.repeat(2 * 1024 * 1024), url: 'https://example.org/' }]; f.save();
  const h = harness(f);
  assert.equal((await h.request(API + 'catalog')).status, 200);
  for (const method of ['GET', 'HEAD']) assert.equal((await h.request(API + 'documents/article--a', method)).status, 503);
  let cancelled = false;
  const streaming = harness(fixture(), (req) => new URL(req.url).pathname === QUERY ? new Response(new ReadableStream({
    pull(controller) { controller.enqueue(new Uint8Array(1024 * 1024)); }, cancel() { cancelled = true; },
  })) : undefined);
  assert.equal((await streaming.request(API + 'catalog')).status, 503); assert.equal(cancelled, true);
});

test('document 512 KiB and JSON 2 MiB exact limits remain readable; +1 fails', async () => {
  const f = fixture(); const doc = f.index.documents[0]!;
  const markdown = 'a'.repeat(512 * 1024 - 1) + '\n';
  doc.markdownSha256 = hash(markdown); doc.markdownBytes = Buffer.byteLength(markdown);
  f.query.documents[0]!.markdownSha256 = doc.markdownSha256;
  f.index.corpusSha256 = f.query.corpusSha256 = hash(JSON.stringify(f.index.documents.map((d) => [d.documentId, d.canonicalPath, d.markdownSha256])));
  f.data.set(doc.markdownPath, markdown); f.save();
  assert.equal((await harness(f).request(API + 'documents/article--a')).status, 200);
  const emptyLink = { label: '', url: 'https://example.org/' };
  const envelope = { schemaVersion: 'agent-api/1', corpusSha256: f.index.corpusSha256, document: doc, mediaType: 'text/markdown', markdown, links: [emptyLink] };
  const remaining = 2 * 1024 * 1024 - Buffer.byteLength(JSON.stringify(envelope, null, 2) + '\n');
  f.query.documents[0]!.links = [{ ...emptyLink, label: 'x'.repeat(remaining) }]; f.save();
  const exact = await harness(f).request(API + 'documents/article--a'); assert.equal(exact.status, 200);
  assert.equal((await exact.arrayBuffer()).byteLength, 2 * 1024 * 1024);
  f.query.documents[0]!.links[0]!.label += 'x'; f.save();
  assert.equal((await harness(f).request(API + 'documents/article--a')).status, 503);
});
