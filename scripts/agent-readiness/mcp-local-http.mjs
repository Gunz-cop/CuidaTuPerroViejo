// Harness only: FetchLike for real HTTP on loopback. No retries, redirect following or SDK replacement.
import http from 'node:http';
import { once } from 'node:events';

export function createLocalHttpFetch({ observe = () => {} } = {}) {
  const agent = new http.Agent({ keepAlive: true, maxSockets: 4 });
  const exchanges = new Set(); let closed = false;
  const emit = (exchange, event, fields = {}) => observe({ exchange, event, ...fields });
  let sequence = 0;
  async function localFetch(input, init) {
    if (closed) throw new TypeError('Local HTTP adapter is closed.');
    const request = new Request(input, init); const url = new URL(request.url);
    if (url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.username || url.password) throw new TypeError('Local HTTP adapter requires loopback HTTP.');
    request.signal.throwIfAborted();
    const exchange = ++sequence;
    return new Promise((resolve, reject) => {
      let incoming, controller, settled = false, finished = false, terminal = false, uploadStopped = false;
      const upload = request.body?.getReader();
      const outgoing = http.request(url, { method: request.method, headers: Object.fromEntries(request.headers), agent });
      const stopUpload = (reason) => {
        if (uploadStopped) return; uploadStopped = true;
        if (upload) void upload.cancel(reason).catch(() => {});
      };
      const cleanup = (event, fields = {}) => {
        if (finished) return; finished = true;
        request.signal.removeEventListener('abort', signalAbort); exchanges.delete(abort);
        stopUpload(); emit(exchange, event, fields);
      };
      // Terminal before destroying sockets: destroy() re-enters via 'aborted'/'error' and must not replace the first reason.
      const fail = (error) => {
        if (terminal) return; terminal = true;
        stopUpload(error); incoming?.destroy(error); outgoing.destroy(error);
        if (!settled) { settled = true; reject(error); }
        else { try { controller?.error(error); } catch {} }
        cleanup('error', { error: String(error) });
      };
      const abort = (reason = request.signal.reason) => fail(reason instanceof Error ? reason : new DOMException('Aborted', 'AbortError'));
      const signalAbort = () => abort(request.signal.reason);
      exchanges.add(abort); request.signal.addEventListener('abort', signalAbort, { once: true });
      emit(exchange, 'request', { method: request.method, url: request.url, headers: Object.fromEntries(request.headers) });
      outgoing.on('error', fail);
      outgoing.on('response', (response) => {
        incoming = response;
        emit(exchange, 'headers', { status: response.statusCode, headers: response.rawHeaders, sentWireHeaders: outgoing._header });
        const h = new Headers(); for (let i = 0; i < response.rawHeaders.length; i += 2) h.append(response.rawHeaders[i], response.rawHeaders[i + 1]);
        response.on('error', fail);
        response.on('aborted', () => fail(new Error('HTTP response aborted.')));
        const noBody = request.method === 'HEAD' || [204, 205, 304].includes(response.statusCode);
        const iterator = response[Symbol.asyncIterator]();
        const stream = noBody ? null : new ReadableStream({
          start(c) { controller = c; },
          async pull(c) {
            try {
              const { done, value } = await iterator.next();
              if (terminal) return;
              if (done) { terminal = true; c.close(); cleanup('end'); return; }
              emit(exchange, 'response-chunk', { bytes: Buffer.from(value) }); c.enqueue(new Uint8Array(value));
            } catch (error) { fail(error); }
          },
          cancel(reason) {
            if (terminal) return; terminal = true;
            stopUpload(reason); incoming.destroy(); outgoing.destroy(); cleanup('cancel', { reason: String(reason) });
          },
        }, { highWaterMark: 0 });
        try {
          const result = new Response(stream, { status: response.statusCode, statusText: response.statusMessage, headers: h });
          Object.defineProperty(result, 'url', { value: request.url });
          settled = true; resolve(result);
          if (noBody) { response.resume(); response.once('end', () => { if (!terminal) { terminal = true; cleanup('end'); } }); }
        } catch (error) { fail(error); }
      });
      if (request.signal.aborted) { abort(); return; }
      void (async () => {
        try {
          if (upload) {
            while (!uploadStopped && !finished) {
              request.signal.throwIfAborted(); const { done, value } = await upload.read();
              if (done || uploadStopped || finished) break;
              if (!(value instanceof Uint8Array)) throw new TypeError('Upload chunks must be bytes.');
              const bytes = Buffer.from(value);
              const writable = outgoing.write(bytes); emit(exchange, 'request-chunk', { bytes });
              if (!writable) await once(outgoing, 'drain');
            }
          }
          if (!outgoing.destroyed) outgoing.end();
          emit(exchange, 'upload-end');
        } catch (error) { fail(error); }
        finally { try { upload?.releaseLock(); } catch {} }
      })();
    });
  }
  return { fetch: localFetch, close() { if (closed) return; closed = true; for (const abort of [...exchanges]) abort(new DOMException('Adapter closed', 'AbortError')); agent.destroy(); }, active: () => exchanges.size };
}
