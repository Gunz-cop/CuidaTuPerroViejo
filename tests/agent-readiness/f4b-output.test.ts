import test from 'node:test';
import assert from 'node:assert/strict';
import { boundedResponse } from '../../src/lib/agent-mcp/output';
import { createAgentMcpWorker, MAX_RESULT } from '../../src/lib/agent-mcp/runtime';

test('C08: wire8MiB/list256KiB inclusivos y +1 falla antes de emitir bytes', async () => {
  // Fuente sintética para defensas del pipeline real. No sustituye SDK/preview.
  for (const cap of [MAX_RESULT, 256 * 1024]) {
    const run = (size: number, transformedExtra = 0) => {
      const lease = { controller: new AbortController(), closed: false, release() {} };
      const source = new Response(new Uint8Array(size), { headers: { 'Content-Type': 'application/json' } });
      return { lease, response: boundedResponse(source, lease, cap, (b) => transformedExtra ? new Uint8Array(b.length + transformedExtra) : b) };
    };
    const equal = run(cap); assert.equal((await equal.response.arrayBuffer()).byteLength, cap); assert.equal(equal.lease.closed, true);
    const over = run(cap + 1); const reader = over.response.body!.getReader();
    await assert.rejects(reader.read(), /CONTENT_UNAVAILABLE/); assert.equal(over.lease.controller.signal.aborted, true);
    const framing = run(cap, 1); await assert.rejects(framing.response.text(), /CONTENT_UNAVAILABLE/);
  }
});

test('C08: card256KiB inclusiva y +1 CONTENT_UNAVAILABLE, lectura se corta', async () => {
  const worker = createAgentMcpWorker(async () => new Response(null, { status: 404 }));
  for (const size of [256 * 1024, 256 * 1024 + 1]) {
    const env = { ASSETS: { fetch: async () => new Response(new Uint8Array(size)) } } as any;
    const response = await worker(new Request('http://localhost/api/mcp/server-card'), env, {} as any);
    if (size === 256 * 1024) { assert.equal(response.status, 200); assert.equal((await response.arrayBuffer()).byteLength, size); }
    else { assert.equal(response.status, 503); assert.equal((await response.json() as any).error.code, 'CONTENT_UNAVAILABLE'); }
  }
});
