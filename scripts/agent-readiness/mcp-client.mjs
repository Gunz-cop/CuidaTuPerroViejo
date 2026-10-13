#!/usr/bin/env node
// Cliente SDK real: transporte HTTP contra workerd/preview/producción, no mocks.
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

const base = process.argv[2]; const output = process.argv[3];
if (!base || !output) throw new Error('Usage: mcp-client.mjs <base-url> <private-output-dir>');
const root = new URL(base); if (!['http:', 'https:'].includes(root.protocol)) throw new Error('Invalid base');
const observations = []; const results = [];
await mkdir(resolve(output), { recursive: true });
const hash = (value) => createHash('sha256').update(value).digest('hex');
async function capture(input, init) {
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
async function api(path) { const r = await capture(new URL(path, root)); assert.equal(r.status, 200); return r.json(); }
try {
  for (const modern of [false, true]) {
    const client = new Client({ name: 'ctpv-f4b-evidence', version: '1.0.0' }, modern ? { versionNegotiation: { mode: { pin: '2026-07-28' } } } : {});
    const transport = new StreamableHTTPClientTransport(new URL('/api/mcp', root), { fetch: capture });
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
        assert.equal(empty.isError, true); const emptyApi = await capture(new URL('/api/agent/v1/search?q=', root)); assert.equal(emptyApi.status, 400);
        assert.deepEqual(JSON.parse(empty.content[0].text), await emptyApi.json());
        const changed = await client.callTool({ name: 'read_guide', arguments: { documentId: id, corpus: '0'.repeat(64) } });
        assert.equal(changed.isError, true); assert.equal(JSON.parse(changed.content[0].text).error.code, 'CORPUS_CHANGED');
        results.push({ criterion: 'C05/C06', documents: catalog.documents.length, pages, documentIds: catalog.documents.map((d) => d.documentId), corpusSha256: catalog.corpusSha256, qualityBoundaries: 8, mobilityCombinations: 6, searchCases: 5, corpusChanged: 'PASS', status: 'PASS' });
      }
      results.push({ era: modern ? '2026-07-28' : '2025-11-25', tools: list.tools.map((tool) => tool.name), searchTotal: search.total, documentId: id, markdownSha256: read.document.markdownSha256, qualityScore: qualityResult.score, qualityBand: qualityResult.band, status: 'PASS' });
    } finally { await client.close(); }
  }
  const cardResponse = await capture(new URL('/api/mcp/server-card', root)); assert.equal(cardResponse.status, 200); assert.equal(cardResponse.headers.get('Content-Type'), 'application/mcp-server-card+json');
  const card = await cardResponse.json(); assert.equal(card.name, 'cuidatuperroviejo.com/guias-herramientas'); assert.deepEqual(card.remotes[0].supportedProtocolVersions, ['2026-07-28', '2025-11-25']);
  const ard = await api('/.well-known/ard.json'); const entry = ard.entries.find((entry) => entry.type === 'application/mcp-server-card+json'); assert.equal(entry.url, 'https://cuidatuperroviejo.com/api/mcp/server-card');
  const h = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'server/discover' };
  const discover = { jsonrpc: '2.0', id: 900, method: 'server/discover', params: { _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };
  for (const method of ['GET', 'HEAD', 'DELETE', 'PUT']) { const r = await capture(new URL('/api/mcp', root), { method }); assert.equal(r.status, 405); assert.equal(r.headers.get('Allow'), 'POST, OPTIONS'); if (method === 'HEAD') assert.equal(await r.text(), ''); }
  const send = (body, headers = h) => capture(new URL('/api/mcp', root), { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) });
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
  const preflight = await capture(new URL('/api/mcp', root), { method: 'OPTIONS', headers: { Origin: root.origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'mcp-protocol-version,mcp-method,mcp-name,content-type' } }); assert.equal(preflight.status, 204);
  results.push({ criterion: 'C07/C08', methods: 4, modernPing: 404, legacyPing: 200, origin: 'PASS', cors: 'PASS', sessions: 'stateless', legacyCancelled: 202, oversized: 413, malformed: 'PASS', status: 'PASS' });
  await writeFile(resolve(output, 'result.json'), JSON.stringify({ base, at: new Date().toISOString(), status: 'PASS', results, limitations: ['Este harness no acredita por sí solo UI/WebMCP, presupuesto, cancelación, todosIDs o receipt de build.'] }, null, 2) + '\n');
  process.stdout.write(`PASS: SDK HTTP real, ambas eras, cuatro tools, paridad API, hash Markdown, inválidos y card/ARD (${observations.length} exchanges).\n`);
} catch (error) {
  await writeFile(resolve(output, 'result.json'), JSON.stringify({ base, at: new Date().toISOString(), status: 'FAIL', results, error: String(error) }, null, 2) + '\n');
  throw error;
} finally { await writeFile(resolve(output, 'http-originals.json'), JSON.stringify(observations, null, 2) + '\n'); }
