// Real Node fetch evidence for the admitted preview. No loopback adapter, retries or redirects.
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export function createPreviewEvidence(base, { budget = 320, userAgent = 'ctpv-independent-f4b/1.0' } = {}) {
  const root = new URL(base);
  if (root.protocol !== 'https:' || root.port || root.pathname !== '/' || root.search || root.hash ||
      !/^[a-f0-9]{8}-cuidatuperroviejo\.g1721m\.workers\.dev$/u.test(root.hostname)) throw new Error('Only immutable Commit Preview allowed.');
  const records = []; const active = new Set(); let count = 0;
  const allowed = path => path === '/api/mcp' || path === '/api/mcp/server-card' || path.startsWith('/api/agent/v1/') ||
    ['/.well-known/ard.json', '/.well-known/ai-catalog.json', '/.well-known/api-catalog', '/llms.txt', '/robots.txt'].includes(path);
  const capture = async (input, init) => {
    const original = new Request(input, init); const url = new URL(original.url);
    if (url.origin !== root.origin || !allowed(url.pathname) || url.username || url.password || url.hash || /%2f|%5c|\.\./iu.test(url.pathname)) throw new Error('Request outside read-only preview allowlist.');
    if (!['GET', 'HEAD', 'POST', 'OPTIONS', 'DELETE', 'PUT'].includes(original.method) ||
      (url.pathname !== '/api/mcp' && !['GET', 'HEAD', 'OPTIONS'].includes(original.method)) || original.headers.has('Authorization') || original.headers.has('Cookie')) throw new Error('Unsafe request rejected before transmission.');
    if (++count > budget) throw new Error('REQUEST_BUDGET_EXCEEDED');
    const controller = new AbortController(); const signal = AbortSignal.any([original.signal, controller.signal]); active.add(controller);
    const headers = new Headers(original.headers); headers.set('User-Agent', userAgent);
    const record = { sequence: count, at: new Date().toISOString(), method: original.method, url: original.url,
      requestHeaders: Object.fromEntries(headers), requestBytesObservedByFetch: 0, requestBodyComplete: !original.body,
      responseBytesObserved: 0, responseComplete: false, requestBodyBase64: '', bodyBase64: '', transport: 'Node fetch' };
    records.push(record); const requestChunks = [], responseChunks = []; let responseReader, outputController, ended = false;
    const finish = (terminal, error) => {
      if (ended) return; ended = true; active.delete(controller);
      const request = Buffer.concat(requestChunks), response = Buffer.concat(responseChunks);
      Object.assign(record, { terminal, responseComplete: terminal === 'end', requestBodyBase64: request.toString('base64'), requestCapturedBytes: request.length,
        requestSha256: hash(request), bodyBase64: response.toString('base64'), capturedBytes: response.length, body: response.toString('utf8'), sha256: hash(response),
        ...(error ? { error: String(error), errorStack: error.stack ?? null } : {}) });
      controller.abort(error ?? new DOMException('Response capture ended', 'AbortError'));
    };
    const body = original.body?.pipeThrough(new TransformStream({
      transform(chunk, c) {
        const bytes = Buffer.from(chunk); const remaining = Math.max(0, 65536 - record.requestBytesObservedByFetch);
        requestChunks.push(bytes.subarray(0, remaining)); record.requestBytesObservedByFetch += bytes.length;
        if (record.requestBytesObservedByFetch > 65536) record.requestCaptureTruncated = true;
        c.enqueue(chunk);
      }, flush() { record.requestBodyComplete = true; },
    }), { signal });
    try {
      const request = new Request(original.url, { method: original.method, headers, ...(body ? { body, duplex: 'half' } : {}), signal, redirect: 'manual' });
      const response = await fetch(request, { redirect: 'manual' });
      Object.assign(record, { headersAt: new Date().toISOString(), status: response.status, responseHeaders: Object.fromEntries(response.headers),
        cfRay: response.headers.get('Cf-Ray'), cfColoHeader: response.headers.get('Cf-Colo'),
        coloInferredFromRay: response.headers.get('Cf-Ray')?.match(/-([A-Z]{3})$/u)?.[1] ?? null });
      if (response.status >= 300 && response.status < 400) {
        await response.body?.cancel('redirect-not-followed'); finish('cancel', new Error('Redirect not followed.')); throw new Error('Redirect not followed.');
      }
      if (!response.body) { finish('end'); return response; }
      responseReader = response.body.getReader();
      const captured = new ReadableStream({
        start(c) { outputController = c; },
        async pull(c) {
          try {
            const { done, value } = await responseReader.read();
            if (ended) return;
            if (done) { finish('end'); c.close(); return; }
            const remaining = Math.max(0, 8 * 1024 * 1024 - record.responseBytesObserved);
            responseChunks.push(Buffer.from(value).subarray(0, remaining)); record.responseBytesObserved += value.byteLength;
            if (record.responseBytesObserved > 8 * 1024 * 1024) {
              record.responseCaptureTruncated = true; await responseReader.cancel('RESPONSE_LIMIT');
              throw new RangeError('RESPONSE_LIMIT');
            }
            c.enqueue(value);
          } catch (error) { finish('error', error); c.error(error); }
        },
        async cancel(reason) { finish('cancel', new Error(String(reason))); await responseReader.cancel(reason).catch(() => {}); },
      });
      signal.addEventListener('abort', () => { if (ended) return; finish('error', signal.reason); outputController.error(signal.reason); void responseReader.cancel(signal.reason).catch(() => {}); }, { once: true });
      const result = new Response(captured, { status: response.status, statusText: response.statusText, headers: response.headers });
      Object.defineProperty(result, 'url', { value: response.url }); return result;
    } catch (error) { finish('error', error); throw error; }
  };
  return { root, fetch: capture, records, count: () => count, active: () => active.size,
    async close() { for (const controller of [...active]) controller.abort(new Error('Evidence client closed')); await new Promise(r => setImmediate(r)); },
    async save(directory) { await mkdir(resolve(directory), { recursive: true }); await writeFile(resolve(directory, 'http-originals.json'), JSON.stringify(records, null, 2) + '\n'); } };
}
