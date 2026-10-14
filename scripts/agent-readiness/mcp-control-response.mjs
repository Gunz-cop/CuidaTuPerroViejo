// Harness controls only. SDK responses remain real streams consumed by Client.
export async function consumeControlResponse(response, { cap = 8 * 1024 * 1024, terminal } = {}) {
  const reader = response.body?.getReader(); const chunks = []; let size = 0;
  try {
    while (reader) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > cap) { await reader.cancel('CONTROL_RESPONSE_LIMIT').catch(() => {}); throw new RangeError('CONTROL_RESPONSE_LIMIT'); }
      chunks.push(value);
    }
    if (terminal) await terminal();
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return { status: response.status, headers: response.headers, url: response.url, bytes,
      async text() { return new TextDecoder().decode(bytes); }, async json() { return JSON.parse(new TextDecoder().decode(bytes)); } };
  } catch (error) {
    if (reader) await reader.cancel(error).catch(() => {});
    if (terminal) await terminal().catch(() => {});
    throw error;
  } finally { reader?.releaseLock(); }
}
