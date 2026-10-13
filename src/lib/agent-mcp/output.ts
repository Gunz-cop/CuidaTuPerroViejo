// Salida terminal acotada: nunca emitir un éxito parcial ni retener salida
// encolada tras deadline/desconexión. El lease conserva sus jobs residuales.
export type OutputLease = {
  controller: AbortController;
  closed: boolean;
  release: () => void;
};

export function boundedResponse(response: Response, lease: OutputLease, cap: number,
  transform: (bytes: Uint8Array, sse: boolean) => Uint8Array): Response {
  if (!response.body) { lease.closed = true; lease.release(); return response; }
  const reader = response.body.getReader();
  const signal = lease.controller.signal;
  const sse = response.headers.get('Content-Type')?.startsWith('text/event-stream') ?? false;
  let emitted = false; let stopping = false; let ended = false;
  let output!: ReadableStreamDefaultController<Uint8Array>;
  const settle = () => {
    if (ended) return;
    ended = true; signal.removeEventListener('abort', abortOutput);
    lease.closed = true; lease.release();
  };
  const abortOutput = () => {
    if (stopping || ended) return;
    stopping = true;
    output.error(new Error('CONTENT_UNAVAILABLE'));
    void reader.cancel().catch(() => {}).finally(settle);
  };
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      output = controller;
      if (signal.aborted) abortOutput();
      else signal.addEventListener('abort', abortOutput, { once: true });
    },
    async pull(controller) {
      try {
        signal.throwIfAborted();
        if (emitted) { settle(); controller.close(); return; }
        const chunks: Uint8Array[] = []; let count = 0;
        while (true) {
          signal.throwIfAborted();
          const { done, value } = await reader.read();
          signal.throwIfAborted();
          if (done) break;
          count += value.byteLength;
          if (count > cap) throw new RangeError('OUTPUT_LIMIT');
          chunks.push(value);
        }
        const bytes = new Uint8Array(count); let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
        const wire = transform(bytes, sse);
        if (wire.byteLength > cap) throw new RangeError('OUTPUT_LIMIT');
        signal.throwIfAborted();
        controller.enqueue(wire); emitted = true;
      } catch { lease.controller.abort(); abortOutput(); }
    },
    async cancel() {
      stopping = true; lease.controller.abort();
      await reader.cancel().catch(() => {}); settle();
    },
  });
  const headers = new Headers(response.headers); headers.delete('Content-Length');
  if (sse) headers.set('X-Accel-Buffering', 'no');
  return new Response(stream, { status: response.status, headers });
}

export async function readLimited(body: ReadableStream<Uint8Array> | null, cap: number): Promise<Uint8Array<ArrayBuffer>> {
  if (!body) return new Uint8Array();
  const reader = body.getReader(); const chunks: Uint8Array[] = []; let count = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      count += value.byteLength;
      if (count > cap) { await reader.cancel(); throw new RangeError('OUTPUT_LIMIT'); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(count); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return bytes;
  } finally { reader.releaseLock(); }
}
