import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { createLocalHttpFetch } from '../../scripts/agent-readiness/mcp-local-http.mjs';

async function fixture(handler, run, observe) {
  const server = http.createServer(handler); server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const adapter = createLocalHttpFetch({ observe });
  try { await run(adapter, `http://127.0.0.1:${server.address().port}`); }
  finally { adapter.close(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
const stream = bytes => new ReadableStream({ start(c) { c.enqueue(bytes.subarray(0, 2)); c.enqueue(bytes.subarray(2)); c.close(); } });

test('local adapter preserves method/URL/headers and binary streamed bytes; evidence taps equal wire, JSON/SSE unchanged', async () => {
  const sent = Buffer.from([0, 255, 13, 10, 128]); const events = []; let received;
  await fixture(async (req, res) => {
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    received = { method: req.method, url: req.url, headers: req.headers, body: Buffer.concat(chunks) };
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'X-Probe': 'real' }); res.write('data: {"ok":'); res.end('true}\n\n');
  }, async (adapter, base) => {
    const response = await adapter.fetch(`${base}/path/%C3%B1?q=%2B`, { method: 'PATCH', headers: { 'Content-Type': 'application/octet-stream', 'X-Input': 'preserved' }, body: stream(sent), duplex: 'half' });
    assert.equal(response.url, `${base}/path/%C3%B1?q=%2B`); assert.equal(response.headers.get('X-Probe'), 'real');
    assert.equal(await response.text(), 'data: {"ok":true}\n\n'); assert.equal(adapter.active(), 0);
    assert.equal(received.method, 'PATCH'); assert.equal(received.url, '/path/%C3%B1?q=%2B'); assert.equal(received.headers['x-input'], 'preserved');
    assert.equal(received.headers['content-length'], undefined); assert.equal(received.headers['transfer-encoding'], 'chunked'); assert.deepEqual(received.body, sent);
    assert.deepEqual(Buffer.concat(events.filter(e => e.event === 'request-chunk').map(e => e.bytes)), sent);
    assert.equal(Buffer.concat(events.filter(e => e.event === 'response-chunk').map(e => e.bytes)).toString(), 'data: {"ok":true}\n\n');
  }, e => events.push(e));
});

test('real 413/JSON, HEAD and redirect responses preserved; no retry or redirect following', async () => {
  let count = 0;
  await fixture((req, res) => { count++; if (req.url === '/redirect') { res.writeHead(302, { Location: '/target' }); res.end('redirect'); } else if (req.method === 'HEAD') { res.writeHead(200, { 'Content-Length': '9' }); res.end(); } else { res.writeHead(413, { 'Content-Type': 'application/json' }); res.end('{"error":"real limit"}'); } }, async (adapter, base) => {
    const r = await adapter.fetch(`${base}/limit`); assert.equal(r.status, 413); assert.deepEqual(await r.json(), { error: 'real limit' });
    const d = await adapter.fetch(`${base}/redirect`); assert.equal(d.status, 302); assert.equal(d.headers.get('Location'), '/target'); assert.equal(await d.text(), 'redirect');
    const h = await adapter.fetch(`${base}/head`, { method: 'HEAD' }); assert.equal(await h.text(), ''); assert.equal(h.headers.get('Content-Length'), '9');
    assert.equal(count, 3);
    await assert.rejects(adapter.fetch('https://cuidatuperroviejo.com/api/mcp'), /loopback/);
  });
});

test('AbortSignal before send and during upload cancels source, releases request and preserves reason', async () => {
  let count = 0, entered; const began = new Promise(r => entered = r); let cancelled = false;
  await fixture(req => { count++; req.on('data', () => entered()); req.on('error', () => {}); }, async (adapter, base) => {
    const early = new AbortController(); const reason = new Error('explicit-abort'); early.abort(reason);
    await assert.rejects(adapter.fetch(base, { signal: early.signal }), e => e === reason); assert.equal(count, 0);
    const abort = new AbortController();
    const body = new ReadableStream({ start(c) { c.enqueue(new Uint8Array([123])); }, cancel() { cancelled = true; } });
    const pending = adapter.fetch(base, { method: 'POST', body, duplex: 'half', signal: abort.signal }); await began;
    abort.abort(reason); await assert.rejects(pending, e => e === reason); assert.equal(cancelled, true); assert.equal(adapter.active(), 0);
  });
});

test('abort after headers, response.cancel and adapter.close terminate open SSE/resources; network errors propagate without retries', async () => {
  let count = 0;
  await fixture((req, res) => { count++; if (req.url === '/network') { req.socket.destroy(); return; } res.writeHead(200, { 'Content-Type': 'text/event-stream' }); res.flushHeaders(); res.write('data: pending\n\n'); }, async (adapter, base) => {
    const abort = new AbortController(); const r = await adapter.fetch(base, { signal: abort.signal }); const reader = r.body.getReader(); await reader.read();
    const pending = reader.read(); const reason = new Error('after-headers'); abort.abort(reason); await assert.rejects(pending, e => e === reason); assert.equal(adapter.active(), 0);
    const cancel = await adapter.fetch(base); await cancel.body.cancel('consumer-cancel'); assert.equal(adapter.active(), 0);
    const open = await adapter.fetch(base); const read = open.body.getReader(); adapter.close(); await assert.rejects(read.read(), /Adapter closed/); assert.equal(adapter.active(), 0);
    await assert.rejects(adapter.fetch(base), /closed/); assert.equal(count, 3);
  });
  await fixture((req) => req.socket.destroy(), async (adapter, base) => {
    await assert.rejects(adapter.fetch(`${base}/network`), /socket hang up/); assert.equal(adapter.active(), 0);
  });
});
