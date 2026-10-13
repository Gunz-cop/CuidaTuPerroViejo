import test from 'node:test';
import assert from 'node:assert/strict';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createAgentMcpWorker, MAX_BODY } from '../../src/lib/agent-mcp/runtime';
import { evaluateQualityOfLife } from '../../src/lib/agent-tools/calidad-vida';
import { recommendMobilityAids } from '../../src/lib/agent-tools/movilidad';

function fixture() {
  let assetReads = 0;
  const env = { ASSETS: { fetch: async () => { assetReads++; return new Response(null, { status: 503 }); } } } as any;
  const ctx = { waitUntil() {}, passThroughOnException() {} } as any;
  const worker = createAgentMcpWorker(async () => new Response('next', { status: 404 }));
  const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => worker(new Request(input, init), env, ctx);
  return { fetcher, reads: () => assetReads };
}
const modernHeaders = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'server/discover' };
const discover = { jsonrpc: '2.0', id: 1, method: 'server/discover', params: { _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };

test('SDK real: initialize legacy y moderno; listado y cálculos exactos sin I/O', async () => {
  for (const modern of [false, true]) {
    const f = fixture(); const client = new Client({ name: 'f4b-client', version: '1.0.0' }, modern ? { versionNegotiation: { mode: { pin: '2026-07-28' } } } : {});
    const transport = new StreamableHTTPClientTransport(new URL('http://localhost/api/mcp'), { fetch: f.fetcher });
    try {
      await client.connect(transport);
      const listed = await client.listTools();
      assert.deepEqual(listed.tools.map((tool) => tool.name), ['search_guides', 'read_guide', 'evaluate_quality_of_life', 'recommend_mobility_aids']);
      const quality = { hurt: 5, hunger: 5, hydration: 5, hygiene: 5, happiness: 5, mobility: 5, moreGoodDays: 5 };
      const result = await client.callTool({ name: 'evaluate_quality_of_life', arguments: quality });
      const value = modern ? result.structuredContent : (result.structuredContent as any)?.result;
      assert.deepEqual(value, evaluateQualityOfLife(quality)); assert.equal((value as any).band, 'compromised');
      const mobility = { level: 'severe', handling: 'stressed' };
      const recommended = await client.callTool({ name: 'recommend_mobility_aids', arguments: mobility });
      assert.deepEqual(modern ? recommended.structuredContent : (recommended.structuredContent as any)?.result, recommendMobilityAids(mobility));
      const invalid = await client.callTool({ name: 'evaluate_quality_of_life', arguments: { ...quality, hurt: 11 } });
      assert.equal(invalid.isError, true); assert.equal(JSON.parse((invalid.content as any)[0].text).error.code, 'INVALID_REQUEST');
      assert.equal(f.reads(), 0);
    } finally { await client.close(); }
  }
});

test('clientInfo opcional y negociación completa sin reflexión arbitraria', async () => {
  const f = fixture();
  const ok = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) });
  assert.equal(ok.status, 200); const text = await ok.text(); assert.match(text, /2026-07-28/); assert.match(text, /cuidatuperroviejo.com/);
  const unsupported = structuredClone(discover); unsupported.params._meta['io.modelcontextprotocol/protocolVersion'] = '1900-01-01';
  const response = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: { ...modernHeaders, 'MCP-Protocol-Version': '1900-01-01' }, body: JSON.stringify(unsupported) });
  assert.equal(response.status, 400); assert.deepEqual((await response.json() as any).error.data, { supported: ['2026-07-28'], requested: '1900-01-01' });
  const mismatch = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: { ...modernHeaders, 'Mcp-Method': 'tools/list' }, body: JSON.stringify(discover) });
  assert.equal((await mismatch.json() as any).error.code, -32020);
});

test('Origin, métodos, sesiones y body se rechazan antes de tools', async () => {
  const f = fixture();
  const origin = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: { ...modernHeaders, Origin: 'null' }, body: JSON.stringify(discover) });
  assert.equal(origin.status, 403);
  const get = await f.fetcher('http://localhost/api/mcp'); assert.equal(get.status, 405); assert.equal(get.headers.get('Allow'), 'POST, OPTIONS'); await get.text();
  const session = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: { ...modernHeaders, 'MCP-Session-Id': 'fake' }, body: JSON.stringify(discover) });
  assert.equal(session.status, 400); await session.text();
  const oversized = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: 'x'.repeat(MAX_BODY + 1) });
  assert.equal(oversized.status, 413); await oversized.text(); assert.equal(f.reads(), 0);
});

test('dos slow bodies cuentan durante lectura; tercero429 sin abrir reader y malformed libera', async () => {
  const f = fixture(); let first!: ReadableStreamDefaultController<Uint8Array>; let second!: ReadableStreamDefaultController<Uint8Array>;
  const input = (save: (c: ReadableStreamDefaultController<Uint8Array>) => void) => new ReadableStream<Uint8Array>({ start(c) { save(c); c.enqueue(new TextEncoder().encode('{')); } });
  const slow = (body: ReadableStream<Uint8Array>) => f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body, duplex: 'half' } as RequestInit);
  const one = slow(input((c) => { first = c; })); const two = slow(input((c) => { second = c; }));
  const three = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) });
  assert.equal(three.status, 429); assert.equal(three.headers.get('Retry-After'), '1'); await three.text();
  first.close(); second.close(); assert.equal((await one).status, 400); assert.equal((await two).status, 400);
  const restored = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) }); assert.equal(restored.status, 200); await restored.text();
});

test('límites inclusivos, UTF8/depth/meta, headers y mensajes genéricos', async () => {
  const send = async (body: any, headers = modernHeaders) => {
    const encoded: BodyInit = body instanceof Uint8Array ? Uint8Array.from(body).buffer : typeof body === 'string' ? body : JSON.stringify(body);
    const f = fixture(); const response = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers, body: encoded });
    return { status: response.status, text: await response.text() };
  };
  const minimal = JSON.stringify(discover);
  assert.equal((await send(minimal + ' '.repeat(MAX_BODY - Buffer.byteLength(minimal)))).status, 200);
  assert.equal((await send(minimal + ' '.repeat(MAX_BODY + 1 - Buffer.byteLength(minimal)))).status, 413);
  assert.equal((await send(new Uint8Array([0xff]))).status, 400);
  assert.equal((await send([discover])).status, 400);
  const meta = structuredClone(discover); (meta.params._meta as any).extra = 'x'.repeat(8192);
  assert.equal((await send(meta)).status, 400);
  const deep = structuredClone(discover); let nested: any = {}; (deep.params as any).extra = nested;
  for (let n = 0; n < 17; n++) { nested.child = {}; nested = nested.child; }
  assert.equal((await send(deep)).status, 400);
  const malformedInfo = structuredClone(discover); (malformedInfo.params._meta as any)['io.modelcontextprotocol/clientInfo'] = { name: 3, version: 'private-value' };
  const rejected = await send(malformedInfo); assert.equal(rejected.status, 400); assert.doesNotMatch(rejected.text, /private-value/);
  const legacy = { jsonrpc: '2.0', id: 4, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 3, version: 'private-value' } } };
  const sdkRejected = await send(legacy, { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' } as any);
  assert.doesNotMatch(sdkRejected.text, /private-value|Expected|clientInfo|name/);
});

test('cuota real acotada por isolate y clientInfo no renueva identidad', async () => {
  const f = fixture();
  for (let n = 0; n < 120; n++) {
    const response = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify({ ...discover, id: n }) });
    assert.equal(response.status, 200); await response.text();
  }
  const response = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) });
  assert.equal(response.status, 429); assert.ok(Number(response.headers.get('Retry-After')) > 0); await response.text();
});

test('cancelación de body libera slots y ninguna operación lee assets', async () => {
  const f = fixture(); let cancelled = false; const abort = new AbortController();
  const body = new ReadableStream<Uint8Array>({ start(c) { c.enqueue(new TextEncoder().encode('{')); }, cancel() { cancelled = true; } });
  const pending = f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body, signal: abort.signal, duplex: 'half' } as RequestInit);
  abort.abort(); const failed = await pending; assert.equal(failed.status, 500); await failed.text(); assert.equal(cancelled, true);
  const restored = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) });
  assert.equal(restored.status, 200); await restored.text(); assert.equal(f.reads(), 0);
});

test('cancelar SSE conserva slot hasta que I/O F3 residual termine', async () => {
  let unblock!: (response: Response) => void; let started!: () => void;
  const began = new Promise<void>((resolve) => { started = resolve; });
  const asset = new Promise<Response>((resolve) => { unblock = resolve; });
  const env = { ASSETS: { fetch: async () => { started(); return asset; } } } as any;
  const ctx = { waitUntil() {}, passThroughOnException() {} } as any;
  const worker = createAgentMcpWorker(async () => new Response(null, { status: 404 }));
  const fetcher = (body: any, method: string, signal?: AbortSignal) => worker(new Request('http://localhost/api/mcp', { method: 'POST', headers: { ...modernHeaders, 'Mcp-Method': method, ...(method === 'tools/call' ? { 'Mcp-Name': 'search_guides' } : {}) }, body: typeof body === 'string' ? body : JSON.stringify(body), signal }), env, ctx);
  const abort = new AbortController();
  const call = { ...discover, method: 'tools/call', params: { ...discover.params, name: 'search_guides', arguments: { q: 'cushing' } } };
  const pending = fetcher(call, 'tools/call', abort.signal); await began;
  abort.abort();
  const cancelled = await pending;
  const read = cancelled.text().catch(() => 'cancelled');
  let close!: () => void;
  const slow = new ReadableStream<Uint8Array>({ start(c) { c.enqueue(new TextEncoder().encode('{')); close = () => c.close(); } });
  const second = worker(new Request('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: slow, duplex: 'half' } as RequestInit), env, ctx);
  const third = await fetcher(discover, 'server/discover'); assert.equal(third.status, 429); await third.text();
  unblock(new Response(null, { status: 503 })); await read; close(); await (await second).text();
  const restored = await fetcher(discover, 'server/discover'); assert.equal(restored.status, 200); await restored.text();
});

test('90 tools/call y deadline wall10s conservan sus límites', async () => {
  const f = fixture(); const client = new Client({ name: 'limits', version: '1' }, { versionNegotiation: { mode: { pin: '2026-07-28' } } });
  await client.connect(new StreamableHTTPClientTransport(new URL('http://localhost/api/mcp'), { fetch: f.fetcher }));
  try {
    for (let n = 0; n < 90; n++) assert.equal((await client.callTool({ name: 'recommend_mobility_aids', arguments: { level: 'light', handling: 'calm' } })).isError, false);
    await assert.rejects(client.callTool({ name: 'recommend_mobility_aids', arguments: { level: 'light', handling: 'calm' } }), (error: any) => error.status === 429);
  } finally { await client.close(); }
  const timed = fixture(); let cancelled = false;
  const slow = new ReadableStream<Uint8Array>({ start(c) { c.enqueue(new TextEncoder().encode('{')); }, cancel() { cancelled = true; } });
  const start = performance.now();
  const response = await timed.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: slow, duplex: 'half' } as RequestInit);
  assert.equal(response.status, 500); await response.text(); assert.equal(cancelled, true);
  assert.ok(performance.now() - start >= 9900); assert.ok(performance.now() - start < 11500);
});

test('R1 I-B2: dos salidas sin consumo se cancelan al deadline y cap2 se recupera', async () => {
  const f = fixture();
  const send = () => f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: modernHeaders, body: JSON.stringify(discover) });
  const first = await send(); const second = await send();
  assert.equal(first.status, 200); assert.equal(second.status, 200);
  const blocked = await send(); assert.equal(blocked.status, 429); await blocked.text();
  await new Promise((resolve) => setTimeout(resolve, 10300));
  const recovered = await send(); assert.equal(recovered.status, 200); await recovered.text();
  await assert.rejects(first.text(), /CONTENT_UNAVAILABLE/); await assert.rejects(second.text(), /CONTENT_UNAVAILABLE/);
});

test('C08: depth16/meta8192 inclusivos, +1 rechazado; ping ambas eras conforme adenda', async () => {
  const send = async (body: any, method = 'server/discover', legacy = false) => {
    const f = fixture(); const response = await f.fetcher('http://localhost/api/mcp', { method: 'POST', headers: legacy
      ? { 'Content-Type': 'application/json', Accept: modernHeaders.Accept, 'MCP-Protocol-Version': '2025-11-25' }
      : { ...modernHeaders, 'Mcp-Method': method }, body: JSON.stringify(body) });
    return { status: response.status, text: await response.text() };
  };
  const nested = (arrays: number) => { let value: any = 'x'; for (let i = 0; i < arrays; i++) value = [value]; return { ...discover, params: { _meta: { ...discover.params._meta, probe: value } } }; };
  assert.equal((await send(nested(13))).status, 200); assert.equal((await send(nested(14))).status, 400);
  const meta: any = { ...discover.params._meta, padding: '' };
  meta.padding = 'x'.repeat(8192 - Buffer.byteLength(JSON.stringify(meta)));
  assert.equal(Buffer.byteLength(JSON.stringify(meta)), 8192);
  assert.equal((await send({ ...discover, params: { _meta: meta } })).status, 200);
  meta.padding += 'x'; assert.equal((await send({ ...discover, params: { _meta: meta } })).status, 400);
  const modern = await send({ ...discover, method: 'ping' }, 'ping'); assert.equal(modern.status, 404);
  assert.deepEqual(JSON.parse(modern.text), { jsonrpc: '2.0', id: 1, error: { code: -32601, message: 'Method not found.' } });
  const legacy = await send({ jsonrpc: '2.0', id: 2, method: 'ping', params: {} }, 'ping', true); assert.equal(legacy.status, 200); assert.match(legacy.text, /"result":\{\}/);
});
