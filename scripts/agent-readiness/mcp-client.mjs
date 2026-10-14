#!/usr/bin/env node
// Cliente SDK real: transporte HTTP contra workerd/preview/producción, no mocks.
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createLocalHttpFetch } from './mcp-local-http.mjs';
import { consumeControlResponse } from './mcp-control-response.mjs';

const base = process.argv[2]; const output = process.argv[3];
if (!base || !output) throw new Error('Usage: mcp-client.mjs <base-url> <private-output-dir>');
const root = new URL(base); if (!['http:', 'https:'].includes(root.protocol)) throw new Error('Invalid base');
const localHttp = process.argv[4] === '--local-http';
if (process.argv[4] && !localHttp) throw new Error('Unknown transport flag');
if (localHttp && (root.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(root.hostname))) throw new Error('Local HTTP requires loopback');
const observations = []; const results = []; let sentRequests = 0;
const captures = new Map(); const responseTerminals = new WeakMap();
const adapter = localHttp ? createLocalHttpFetch({ observe(event) {
  if (event.event === 'request') {
    const record = { at: new Date().toISOString(), method: event.method, url: event.url, requestHeaders: event.headers, protocolVersion: event.headers['mcp-protocol-version'] ?? null, requestBody: '', requestBytesSent: 0, body: '', bytes: 0, complete: false, transport: 'node:http' };
    let settle; const terminal = new Promise(resolve => { settle = resolve; });
    observations.push(record); captures.set(event.exchange, { record, request: [], response: [], terminal, settle });
  }
  const c = captures.get(event.exchange); if (!c) return;
  if (event.event === 'request-chunk') { c.record.requestBytesSent += event.bytes.length; if (c.record.requestBytesSent <= 65536) c.request.push(event.bytes); else c.record.requestCaptureTruncated = true; }
  if (event.event === 'response-chunk') { c.record.bytes += event.bytes.length; if (c.record.bytes <= 8 * 1024 * 1024) c.response.push(event.bytes); else c.record.responseCaptureTruncated = true; }
  if (event.event === 'headers') { c.record.status = event.status; c.record.responseRawHeaders = event.headers; c.record.responseHeaders = Object.fromEntries(new Headers(Array.from({ length: event.headers.length / 2 }, (_, i) => [event.headers[i * 2], event.headers[i * 2 + 1]]))); c.record.sentWireHeaders = event.sentWireHeaders; }
  if (['end', 'cancel', 'error'].includes(event.event)) {
    const request = Buffer.concat(c.request), response = Buffer.concat(c.response);
    Object.assign(c.record, { requestBody: request.toString('utf8'), requestBodyBase64: request.toString('base64'), requestSha256: hash(request), body: response.toString('utf8'), bodyBase64: response.toString('base64'), sha256: hash(response), complete: event.event === 'end', terminal: event.event, ...(event.error ? { transportError: event.error } : {}), ...(event.reason ? { cancelReason: event.reason } : {}) });
    c.settle(event.event);
  }
} }) : null;
await mkdir(resolve(output), { recursive: true });
const hash = (value) => createHash('sha256').update(value).digest('hex');
async function capture(input, init) {
  if (localHttp) {
    if (++sentRequests > 320) throw new Error('LOCAL_MATRIX_REQUEST_BUDGET');
    const position = observations.length;
    const response = await adapter.fetch(input, init);
    const record = observations[position];
    const captured = [...captures.values()].find(c => c.record === record);
    responseTerminals.set(response, () => captured.terminal);
    if (response.status >= 300 && response.status < 400) { await response.body?.cancel('redirect-not-followed'); throw new Error('Redirect not followed'); }
    return response;
  }
  const request = new Request(input, init); const requestBody = request.method === 'POST' ? await request.clone().text() : '';
  const response = await fetch(request); const copy = response.clone();
  const body = await copy.text();
  const observation = { at: new Date().toISOString(), method: request.method, url: request.url, protocolVersion: request.headers.get('MCP-Protocol-Version'),
    requestHeaders: Object.fromEntries(request.headers), requestBody, status: response.status, responseHeaders: Object.fromEntries(response.headers), body, bytes: Buffer.byteLength(body), sha256: hash(body) };
  observations.push(observation); return response;
}
function domain(result, modern) {
  assert.equal(result.isError, false, 'tool success');
  const value = modern ? result.structuredContent : result.structuredContent.result;
  assert.deepEqual(JSON.parse(result.content[0].text), value);
  return value;
}
async function control(input, init) { const response = await capture(input, init); return consumeControlResponse(response, { terminal: responseTerminals.get(response) }); }
async function api(path) { const r = await control(new URL(path, root)); assert.equal(r.status, 200); return r.json(); }
try {
  for (const modern of [false, true]) {
    const client = new Client({ name: 'ctpv-f4b-evidence', version: '1.0.0' }, modern ? { versionNegotiation: { mode: { pin: '2026-07-28' } } } : {});
    const transport = new StreamableHTTPClientTransport(new URL('/api/mcp', root), { fetch: capture, ...(localHttp ? { redirectPolicy: 'follow', requestInit: { redirect: 'manual' }, reconnectionOptions: { maxRetries: 0, initialReconnectionDelay: 1000, maxReconnectionDelay: 1000, reconnectionDelayGrowFactor: 1 } } : {}) });
    try {
      await client.connect(transport); const list = await client.listTools();
      assert.deepEqual(list.tools.map((tool) => tool.name), ['search_guides', 'read_guide', 'evaluate_quality_of_life', 'recommend_mobility_aids']);
      const search = domain(await client.callTool({ name: 'search_guides', arguments: { q: 'cushing' } }), modern);
      assert.deepEqual(search, await api('/api/agent/v1/search?q=cushing')); assert.ok(search.results.length > 0);
      const id = search.results[0].document.documentId;
      const read = domain(await client.callTool({ name: 'read_guide', arguments: { documentId: id, corpus: search.corpusSha256 } }), modern);
      assert.deepEqual(read, await api(`/api/agent/v1/documents/${id}?corpus=${search.corpusSha256}`));
      assert.equal(hash(Buffer.from(read.markdown)), read.document.markdownSha256);
      assert.equal(Buffer.byteLength(read.markdown), read.document.markdownBytes);
      const quality = { hurt: 5, hunger: 5, hydration: 5, hygiene: 5, happiness: 5, mobility: 5, moreGoodDays: 5 };
      const qualityResult = domain(await client.callTool({ name: 'evaluate_quality_of_life', arguments: quality }), modern);
      assert.deepEqual(qualityResult, await api(`/api/agent/v1/tools/calidad-vida?${new URLSearchParams(quality)}`)); assert.equal(qualityResult.band, 'compromised');
      const mobility = { level: 'severe', handling: 'stressed' };
      assert.deepEqual(domain(await client.callTool({ name: 'recommend_mobility_aids', arguments: mobility }), modern), await api(`/api/agent/v1/tools/movilidad?${new URLSearchParams(mobility)}`));
      const nonexistent = await client.callTool({ name: 'read_guide', arguments: { documentId: 'article--f4b-nonexistent' } });
      assert.equal(nonexistent.isError, true); assert.equal(JSON.parse(nonexistent.content[0].text).error.code, 'DOCUMENT_NOT_FOUND');
      const invalid = await client.callTool({ name: 'evaluate_quality_of_life', arguments: { ...quality, hurt: 11 } });
      assert.equal(invalid.isError, true); assert.equal(JSON.parse(invalid.content[0].text).error.code, 'INVALID_REQUEST');
      if (modern) {
        const index = await api('/agent-content/v1/index.json');
        assert.equal(index.documents.length, 28, 'corpus fijo F4A de 28 documentos');
        const catalog = { corpusSha256: index.corpusSha256, documents: [] };
        let offset = 0; const pages = [];
        while (true) {
          const page = await api(`/api/agent/v1/catalog?${new URLSearchParams({ limit: '20', offset: String(offset), corpus: index.corpusSha256 })}`);
          assert.equal(page.corpusSha256, index.corpusSha256); assert.equal(page.total, index.documents.length);
          assert.equal(page.offset, offset); assert.equal(page.limit, 20);
          assert.equal(page.documents.length, Math.min(20, page.total - offset));
          catalog.documents.push(...page.documents); pages.push({ offset, documents: page.documents.length, nextOffset: page.nextOffset });
          assert.ok(catalog.documents.length <= index.documents.length);
          const next = offset + page.documents.length;
          assert.equal(page.nextOffset, next < page.total ? next : null);
          if (page.nextOffset === null) break;
          assert.ok(page.nextOffset > offset); offset = page.nextOffset;
        }
        assert.equal(new Set(catalog.documents.map((d) => d.documentId)).size, index.documents.length);
        assert.deepEqual(catalog.documents, index.documents, 'universo/metadata exactos de ese corpus, sin duplicados ni omisiones');
        for (const document of catalog.documents) {
          const full = domain(await client.callTool({ name: 'read_guide', arguments: { documentId: document.documentId, corpus: catalog.corpusSha256 } }), true);
          assert.deepEqual(full, await api(`/api/agent/v1/documents/${document.documentId}?corpus=${catalog.corpusSha256}`));
          assert.equal(hash(Buffer.from(full.markdown)), document.markdownSha256); assert.equal(Buffer.byteLength(full.markdown), document.markdownBytes);
        }
        for (const [score, band] of [[0, 'compromised'], [34, 'compromised'], [35, 'compromised'], [36, 'acceptable'], [49, 'acceptable'], [50, 'acceptable'], [51, 'good'], [70, 'good']]) {
          let remaining = score;
          const input = Object.fromEntries(Object.keys(quality).map((key) => { const value = Math.min(10, remaining); remaining -= value; return [key, value]; }));
          const evaluated = domain(await client.callTool({ name: 'evaluate_quality_of_life', arguments: input }), true);
          assert.deepEqual(evaluated, await api(`/api/agent/v1/tools/calidad-vida?${new URLSearchParams(input)}`)); assert.equal(evaluated.score, score); assert.equal(evaluated.band, band);
        }
        for (const level of ['light', 'moderate', 'severe']) for (const handling of ['calm', 'stressed']) {
          const input = { level, handling };
          assert.deepEqual(domain(await client.callTool({ name: 'recommend_mobility_aids', arguments: input }), true), await api(`/api/agent/v1/tools/movilidad?${new URLSearchParams(input)}`));
        }
        for (const q of ['artrosis', '  CUSHING  ', 'ñ', 'f4bzzzsinresultado']) {
          assert.deepEqual(domain(await client.callTool({ name: 'search_guides', arguments: { q } }), true), await api(`/api/agent/v1/search?${new URLSearchParams({ q })}`));
        }
        const empty = await client.callTool({ name: 'search_guides', arguments: { q: '' } });
        assert.equal(empty.isError, true); const emptyApi = await control(new URL('/api/agent/v1/search?q=', root)); assert.equal(emptyApi.status, 400);
        assert.deepEqual(JSON.parse(empty.content[0].text), await emptyApi.json());
        const changed = await client.callTool({ name: 'read_guide', arguments: { documentId: id, corpus: '0'.repeat(64) } });
        assert.equal(changed.isError, true); assert.equal(JSON.parse(changed.content[0].text).error.code, 'CORPUS_CHANGED');
        results.push({ criterion: 'C05/C06', documents: catalog.documents.length, pages, documentIds: catalog.documents.map((d) => d.documentId), corpusSha256: catalog.corpusSha256, qualityBoundaries: 8, mobilityCombinations: 6, searchCases: 5, corpusChanged: 'PASS', status: 'PASS' });
      }
      results.push({ era: modern ? '2026-07-28' : '2025-11-25', tools: list.tools.map((tool) => tool.name), searchTotal: search.total, documentId: id, markdownSha256: read.document.markdownSha256, qualityScore: qualityResult.score, qualityBand: qualityResult.band, status: 'PASS' });
    } finally { await client.close(); }
  }
  const cardResponse = await control(new URL('/api/mcp/server-card', root)); assert.equal(cardResponse.status, 200); assert.equal(cardResponse.headers.get('Content-Type'), 'application/mcp-server-card+json');
  const card = await cardResponse.json(); assert.equal(card.name, 'cuidatuperroviejo.com/guias-herramientas'); assert.deepEqual(card.remotes[0].supportedProtocolVersions, ['2026-07-28', '2025-11-25']);
  const ard = await api('/.well-known/ard.json'); const entry = ard.entries.find((entry) => entry.type === 'application/mcp-server-card+json'); assert.equal(entry.url, 'https://cuidatuperroviejo.com/api/mcp/server-card');
  const h = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'server/discover' };
  const discover = { jsonrpc: '2.0', id: 900, method: 'server/discover', params: { _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };
  for (const method of ['GET', 'HEAD', 'DELETE', 'PUT']) { const r = await control(new URL('/api/mcp', root), { method }); assert.equal(r.status, 405); assert.equal(r.headers.get('Allow'), 'POST, OPTIONS'); if (method === 'HEAD') assert.equal(await r.text(), ''); }
  const send = (body, headers = h) => control(new URL('/api/mcp', root), { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) });
  assert.equal((await send(discover, { ...h, Origin: 'null' })).status, 403);
  assert.equal((await send(discover, { ...h, Origin: root.origin })).headers.get('Access-Control-Allow-Origin'), root.origin);
  assert.equal((await send(discover, { ...h, 'MCP-Session-Id': 'forbidden' })).status, 400);
  assert.equal((await send(discover, { ...h, 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await send(discover, { ...h, Accept: 'application/json' })).status, 406);
  assert.equal((await send('x'.repeat(32769))).status, 413);
  assert.equal((await send([discover])).status, 400);
  assert.equal((await send('{')).status, 400);
  const cancelled = await send({ jsonrpc: '2.0', method: 'notifications/cancelled', params: { requestId: 900, reason: 'synthetic' } }, { 'Content-Type': 'application/json', Accept: h.Accept, 'MCP-Protocol-Version': '2025-11-25' });
  assert.equal(cancelled.status, 202); assert.equal(await cancelled.text(), '');
  const modernPing = await send({ ...discover, method: 'ping' }, { ...h, 'Mcp-Method': 'ping' }); assert.equal(modernPing.status, 404);
  assert.deepEqual(await modernPing.json(), { jsonrpc: '2.0', id: 900, error: { code: -32601, message: 'Method not found.' } });
  const legacyPing = await send({ jsonrpc: '2.0', id: 901, method: 'ping', params: {} }, { 'Content-Type': 'application/json', Accept: h.Accept, 'MCP-Protocol-Version': '2025-11-25' });
  assert.equal(legacyPing.status, 200); assert.match(await legacyPing.text(), /"result":\{\}/u);
  const preflight = await control(new URL('/api/mcp', root), { method: 'OPTIONS', headers: { Origin: root.origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'mcp-protocol-version,mcp-method,mcp-name,content-type' } }); assert.equal(preflight.status, 204);
  if (localHttp) await localDefenses(h, discover);
  results.push({ criterion: 'C07/C08', methods: 4, modernPing: 404, legacyPing: 200, origin: 'PASS', cors: 'PASS', sessions: 'stateless', legacyCancelled: 202, oversized: 413, malformed: 'PASS', status: 'PASS' });
  await writeFile(resolve(output, 'result.json'), JSON.stringify({ base, transport: localHttp ? 'node:http' : 'Node fetch', product: localHttp ? '192dcdd52d2790652ef2dbcb6d23a0f5006ade43' : undefined, harnessCommit: localHttp ? process.env.F4B_HARNESS_COMMIT : undefined, at: new Date().toISOString(), status: 'PASS', results, limitations: ['Este harness no acredita por sí solo UI/WebMCP, presupuesto, cancelación, todosIDs o receipt de build.'] }, null, 2) + '\n');
  process.stdout.write(`PASS: SDK HTTP real, ambas eras, cuatro tools, paridad API, hash Markdown, inválidos y card/ARD (${observations.length} exchanges).\n`);
} catch (error) {
  await writeFile(resolve(output, 'result.json'), JSON.stringify({ base, transport: localHttp ? 'node:http' : 'Node fetch', product: localHttp ? '192dcdd52d2790652ef2dbcb6d23a0f5006ade43' : undefined, harnessCommit: localHttp ? process.env.F4B_HARNESS_COMMIT : undefined, at: new Date().toISOString(), status: 'FAIL', results, error: String(error) }, null, 2) + '\n');
  throw error;
} finally { adapter?.close(); await new Promise(resolve => setImmediate(resolve)); await writeFile(resolve(output, 'http-originals.json'), JSON.stringify(observations, null, 2) + '\n'); }

async function localDefenses(h, discover) {
  const endpoint = new URL('/api/mcp', root);
  const send = (body, extra = {}) => control(endpoint, { method: 'POST', headers: h, body: typeof body === 'string' || body instanceof ReadableStream ? body : JSON.stringify(body), ...extra });
  const read = async response => { const text = await response.text(); return { status: response.status, text }; };
  const stream = text => new ReadableStream({ start(c) { c.enqueue(Buffer.from(text)); c.close(); } });
  const text = JSON.stringify(discover); const atLimit = text + ' '.repeat(32768 - Buffer.byteLength(text));
  assert.equal(Buffer.byteLength(atLimit), 32768); const streamingBegin = observations.length;
  assert.equal((await read(await send(stream(atLimit), { duplex: 'half' }))).status, 200);
  assert.equal((await read(await send(stream('x'.repeat(32769)), { duplex: 'half' }))).status, 413);
  for (const [record, length] of observations.slice(streamingBegin).map((record, i) => [record, 32768 + i])) {
    assert.equal(record.requestBytesSent, length); assert.match(record.sentWireHeaders, /Transfer-Encoding: chunked/i); assert.doesNotMatch(record.sentWireHeaders, /Content-Length:/i); assert.equal(record.complete, true);
  }
  assert.equal((await read(await send(discover))).status, 200);
  assert.equal((await read(await send([discover]))).status, 400);
  const nested = n => { let probe = 'x'; while (n--) probe = [probe]; return { ...discover, params: { _meta: { ...discover.params._meta, probe } } }; };
  assert.equal((await read(await send(nested(13)))).status, 200); assert.equal((await read(await send(nested(14)))).status, 400);
  const meta = { ...discover.params._meta, padding: '' }; meta.padding = 'x'.repeat(8192 - Buffer.byteLength(JSON.stringify(meta)));
  assert.equal((await read(await send({ ...discover, params: { _meta: meta } }))).status, 200); meta.padding += 'x';
  assert.equal((await read(await send({ ...discover, params: { _meta: meta } }))).status, 400);
  results.push({ criterion: 'C08-local', streamingInclusive: 32768, streamingExcess: 32769, overflow: 413, after: 200, batch: 400, depth: '16/+1 PASS', metadata: '8192/+1 PASS', status: 'PASS' });
  const nap = ms => new Promise(resolve => setTimeout(resolve, ms));
  const aborts = [new AbortController(), new AbortController()]; const cancelled = [false, false];
  const slow = i => new ReadableStream({ start(c) { c.enqueue(Buffer.from('{')); }, cancel() { cancelled[i] = true; } });
  const pending = aborts.map((controller, i) => send(slow(i), { duplex: 'half', signal: controller.signal }).then(() => ({ unexpected: true }), error => ({ error: String(error) })));
  await nap(500); assert.equal((await read(await send(discover))).status, 429);
  aborts.forEach(controller => controller.abort(new Error('matrix-cancel')));
  const aborted = await Promise.all(pending); assert.ok(aborted.every(r => r.error)); assert.deepEqual(cancelled, [true, true]);
  await nap(300); assert.equal((await read(await send(discover))).status, 200);
  let sourceStopped = false; const timed = new ReadableStream({ start(c) { c.enqueue(Buffer.from('{')); }, cancel() { sourceStopped = true; } });
  const start = performance.now(); assert.equal((await read(await send(timed, { duplex: 'half' }))).status, 500);
  const elapsed = performance.now() - start; assert.ok(elapsed >= 9900 && elapsed < 13000); assert.equal(sourceStopped, true);
  assert.equal((await read(await send(discover))).status, 200); assert.equal(adapter.active(), 0);
  results.push({ criterion: 'C09-local', slowBodies: 2, third: 429, aborts: 2, restored: 200, deadlineMs: elapsed, uploadCancelled: sourceStopped, adapterActiveAfter: adapter.active(), status: 'PASS' });
  // Same isolate/IP; no restart or identity variation to reset the bucket.
  const waitWindow = async label => { for (const ms of [20000, 20000, 20000, 1200]) { process.stdout.write(`RATE_WINDOW ${label}: waiting ${ms}ms without requests\n`); await nap(ms); } };
  await waitWindow('before'); const begin = observations.length;
  const client = new Client({ name: 'ctpv-f4b-rate-evidence', version: '1.0.0' }, { versionNegotiation: { mode: { pin: '2026-07-28' } } });
  const transport = new StreamableHTTPClientTransport(endpoint, { fetch: capture, redirectPolicy: 'follow', requestInit: { redirect: 'manual' }, reconnectionOptions: { maxRetries: 0, initialReconnectionDelay: 1000, maxReconnectionDelay: 1000, reconnectionDelayGrowFactor: 1 } });
  try {
    await client.connect(transport);
    for (let n = 0; n < 90; n++) assert.equal((await client.callTool({ name: 'recommend_mobility_aids', arguments: { level: 'light', handling: 'calm' } })).isError, false);
    await assert.rejects(client.callTool({ name: 'recommend_mobility_aids', arguments: { level: 'light', handling: 'calm' } }), e => e.status === 429);
  } finally { await client.close(); }
  const counted = () => observations.slice(begin).filter(r => r.method === 'POST' && new URL(r.url).pathname === '/api/mcp').length;
  assert.ok(counted() <= 120);
  while (counted() < 120) assert.equal((await read(await send(discover))).status, 200);
  assert.equal((await read(await send(discover))).status, 429); assert.equal(counted(), 121);
  assert.equal(adapter.active(), 0);
  await waitWindow('recovery'); assert.equal((await read(await send(discover))).status, 200);
  assert.equal(adapter.active(), 0);
  results.push({ criterion: 'C09-rate-local', callsAccepted: 90, call91: 429, postsAccepted: 120, post121: 429, sameIsolate: true, sameIP: true, recovered: 200, adapterActiveAfter: adapter.active(), requestBudget: 320, actualRequests: sentRequests, status: 'PASS' });
}
