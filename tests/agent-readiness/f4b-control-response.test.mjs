import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeControlResponse } from '../../scripts/agent-readiness/mcp-control-response.mjs';
import { createLocalHttpFetch } from '../../scripts/agent-readiness/mcp-local-http.mjs';
import http from 'node:http';
import { once } from 'node:events';

test('control reads once, preserves bytes/status/headers and waits terminal before assert', async () => {
  let settle; const terminal = new Promise(resolve => { settle = resolve; }); let resolved = false;
  const bytes = new Uint8Array([0, 255, 128, 13]);
  const response = new Response(bytes, { status: 500, headers: { 'X-Debug': 'actual' } });
  response.clone = () => { throw new Error('clone forbidden'); };
  const pending = consumeControlResponse(response, { terminal: () => terminal }).then(value => { resolved = true; return value; });
  await new Promise(resolve => setImmediate(resolve)); assert.equal(resolved, false); settle('end');
  const control = await pending; assert.equal(control.status, 500); assert.equal(control.headers.get('X-Debug'), 'actual'); assert.deepEqual(control.bytes, bytes); assert.equal(response.bodyUsed, true);
});
test('existing8MiB consumption limit inclusive and +1 cancels even if capture could truncate', async () => {
  const cap = 8 * 1024 * 1024; const accepted = await consumeControlResponse(new Response(new Uint8Array(cap))); assert.equal(accepted.bytes.length, cap);
  let cancelled = false;
  const oversized = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(cap)); c.enqueue(new Uint8Array(1)); }, cancel(reason) { cancelled = reason === 'CONTROL_RESPONSE_LIMIT'; } });
  await assert.rejects(consumeControlResponse(new Response(oversized)), /CONTROL_RESPONSE_LIMIT/); assert.equal(cancelled, true);
});
test('terminal error/cancel preserved without waiting only end', async () => {
  const original = new Error('real network error'); const broken = new ReadableStream({ start(c) { c.error(original); } }); let waited = false;
  await assert.rejects(consumeControlResponse(new Response(broken), { terminal: async () => { waited = true; return 'error'; } }), e => e === original); assert.equal(waited, true);
  let cancelled = false; const open = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(2)); }, cancel() { cancelled = true; } });
  await assert.rejects(consumeControlResponse(new Response(open), { cap: 1, terminal: async () => 'cancel' }), /CONTROL_RESPONSE_LIMIT/); assert.equal(cancelled, true);
});
test('real HTTP500 body and next response captured completely using one reader and passive taps', async () => {
  const events = []; const server = http.createServer((request, response) => { request.resume(); response.writeHead(500, { 'Content-Type': 'text/plain' }); response.end('actual proxy error'); });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const adapter = createLocalHttpFetch({ observe: event => events.push(event) });
  try {
    const raw = await adapter.fetch(`http://127.0.0.1:${server.address().port}/api/mcp`, { method: 'POST', body: 'actual upload' });
    const control = await consumeControlResponse(raw); assert.equal(await control.text(), 'actual proxy error'); assert.equal(control.status, 500);
    assert.equal(events.filter(e => e.event === 'end').length, 1); assert.equal(adapter.active(), 0);
    assert.equal(Buffer.concat(events.filter(e => e.event === 'response-chunk').map(e => e.bytes)).toString(), 'actual proxy error');
    const next = await consumeControlResponse(await adapter.fetch(`http://127.0.0.1:${server.address().port}/next`)); assert.equal(next.status, 500); assert.equal(adapter.active(), 0);
  } finally { adapter.close(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
