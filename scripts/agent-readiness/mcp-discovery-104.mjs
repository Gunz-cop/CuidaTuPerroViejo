#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const cardPaths = ['/api/mcp/server-card', '/.well-known/mcp/server-card.json'];
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const json = async (path) => JSON.parse(await readFile(path, 'utf8'));
const save = (path, value) => writeFile(path, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });

export async function prepareExpected(buildDir, baseBuildDir, output) {
  assert.equal(git('status', '--porcelain', '--untracked-files=no'), '', 'tracked source must be clean');
  const registry = await json('src/agent-api/capabilities.json');
  const cards = [];
  for (const path of cardPaths) {
    const bytes = await readFile(join(resolve(buildDir), 'client', path));
    cards.push({ path, bytes: bytes.length, sha256: hash(bytes), value: JSON.parse(bytes) });
  }
  const baseCard = await readFile(join(resolve(baseBuildDir), 'client', cardPaths[0]));
  assert.equal(cards[0].sha256, hash(baseCard), 'native card must preserve base bytes');
  const index = await json(join(resolve(buildDir), 'client/agent-content/v1/index.json'));
  const document = index.documents.find((doc) => doc.documentId === 'article--sindrome-cushing-perros-mayores');
  assert.ok(document, 'read fixture exists in this build');
  const markdown = await readFile(join(resolve(buildDir), 'client', document.markdownPath));
  assert.equal(hash(markdown), document.markdownSha256); assert.equal(markdown.length, document.markdownBytes);
  const expected = { schemaVersion: 'mcp-discovery-104-expected/1', head: git('rev-parse', 'HEAD'), tree: git('rev-parse', 'HEAD^{tree}'),
    node: process.version, sdk: (await json('node_modules/@modelcontextprotocol/client/package.json')).version,
    cards, identity: { name: registry.mcp.name, version: registry.mcp.version, title: registry.mcp.title, description: registry.mcp.description },
    capabilities: registry.mcp.capabilities, tools: registry.mcp.tools, corpusSha256: index.corpusSha256, document,
    nativeBaseSha256: hash(baseCard), buildDir: resolve(buildDir), baseBuildDir: resolve(baseBuildDir) };
  assert.equal(expected.sdk, '2.3.1'); await save(resolve(output), expected); return expected;
}

function assertReceipt(receipt, expected, mode, base) {
  assert.equal(receipt.head, expected.head); assert.equal(receipt.tree, expected.tree);
  const checks = receipt.check_runs;
  for (const name of ['Criterios de aceptación', 'Workers Builds: cuidatuperroviejo']) {
    assert.ok(checks.some((check) => check.name === name && check.head_sha === expected.head && check.conclusion === 'success'), `receipt ${name}`);
  }
  assert.match(receipt.build, /^[a-f0-9-]{36}$/u); assert.match(receipt.version, /^[a-f0-9-]{36}$/u);
  const workers = checks.find((check) => check.name === 'Workers Builds: cuidatuperroviejo' && check.head_sha === expected.head && check.conclusion === 'success');
  assert.ok(workers.output.summary.includes(receipt.build)); assert.ok(workers.output.summary.includes(receipt.version));
  if (mode === 'preview') { assert.equal(base.hostname, `${receipt.version.slice(0, 8)}-cuidatuperroviejo.g1721m.workers.dev`); assert.ok(workers.output.summary.includes(base.origin)); }
}

function recorder(root, budget) {
  const records = [], jobs = new Set(); let requests = 0;
  const allowed = new Set([...cardPaths, '/robots.txt', '/api/mcp', '/api/agent/v1/search', '/api/agent/v1/documents/article--sindrome-cushing-perros-mayores', '/api/agent/v1/tools/calidad-vida', '/api/agent/v1/tools/movilidad']);
  const capture = async (input, init) => {
    const original = new Request(input, init), url = new URL(original.url);
    assert.equal(url.origin, root.origin); assert.ok(allowed.has(url.pathname));
    assert.ok(!url.username && !url.password && !url.hash); assert.ok(!original.headers.has('Authorization') && !original.headers.has('Cookie'));
    assert.ok(['GET', 'HEAD', 'POST'].includes(original.method)); assert.ok(original.method !== 'POST' || url.pathname === '/api/mcp');
    if (requests >= budget) throw new Error('REQUEST_BUDGET_EXCEEDED');
    const controller = new AbortController(), signal = AbortSignal.any([original.signal, controller.signal]);
    const timer = setTimeout(() => controller.abort(new Error('CAPTURE_TIMEOUT')), 15000);
    const headers = new Headers(original.headers); headers.set('User-Agent', 'ctpv-mcp-discovery104/1.0');
    const record = { sequence: ++requests, at: new Date().toISOString(), method: original.method, url: original.url,
      requestHeaders: Object.fromEntries(headers), transport: 'Node fetch', requestBytesObservedByFetch: 0, requestBodyComplete: !original.body,
      responseBytesObserved: 0, responseComplete: false };
    records.push(record); const requestChunks = [], responseChunks = []; let ended = false, reader;
    let terminalResolve; const terminal = new Promise((resolveTerminal) => { terminalResolve = resolveTerminal; }); jobs.add(terminal);
    const finish = (state, error) => {
      if (ended) return; ended = true; clearTimeout(timer);
      const request = Buffer.concat(requestChunks), response = Buffer.concat(responseChunks);
      Object.assign(record, { terminal: state, responseComplete: state === 'end', requestBodyBase64: request.toString('base64'), requestCapturedBytes: request.length,
        requestSha256: hash(request), bodyBase64: response.toString('base64'), capturedBytes: response.length, sha256: hash(response),
        ...(error ? { error: String(error), errorName: error.name } : {}) });
      terminalResolve();
    };
    const body = original.body?.pipeThrough(new TransformStream({ transform(chunk, stream) {
      record.requestBytesObservedByFetch += chunk.byteLength;
      if (record.requestBytesObservedByFetch > 65536) { record.requestCaptureTruncated = true; throw new Error('REQUEST_CAPTURE_LIMIT'); }
      requestChunks.push(Buffer.from(chunk)); stream.enqueue(chunk);
    }, flush() { record.requestBodyComplete = true; } }), { signal });
    try {
      const response = await fetch(new Request(original.url, { method: original.method, headers, ...(body ? { body, duplex: 'half' } : {}), signal, redirect: 'manual' }));
      Object.assign(record, { status: response.status, finalUrl: response.url, responseHeaders: Object.fromEntries(response.headers), cfRay: response.headers.get('Cf-Ray') });
      if (response.status >= 300 && response.status < 400) { await response.body?.cancel(); throw new Error('REDIRECT_REJECTED'); }
      if (!response.body) { finish('end'); return response; }
      reader = response.body.getReader();
      const captured = new ReadableStream({ async pull(stream) {
        try {
          const { done, value } = await reader.read(); if (ended) return;
          if (done) { finish('end'); stream.close(); return; }
          record.responseBytesObserved += value.byteLength;
          if (record.responseBytesObserved > 8 * 1024 * 1024) { record.responseCaptureTruncated = true; await reader.cancel(); throw new Error('RESPONSE_CAPTURE_LIMIT'); }
          responseChunks.push(Buffer.from(value)); stream.enqueue(value);
        } catch (error) { finish('error', error); stream.error(error); }
      }, async cancel(reason) { finish('cancel', new Error(String(reason))); await reader.cancel(reason).catch(() => {}); } });
      const result = new Response(captured, { status: response.status, statusText: response.statusText, headers: response.headers });
      Object.defineProperty(result, 'url', { value: response.url }); return result;
    } catch (error) { finish('error', error); throw error; }
  };
  return { fetch: capture, records, requests: () => requests, settle: () => Promise.all([...jobs]) };
}

export async function runSmoke({ baseUrl, expectedPath, receiptPath, mode, output, budget = 24 }) {
  assert.ok(Number.isInteger(budget) && budget >= 1 && budget <= 24);
  const root = new URL(baseUrl); assert.equal(root.pathname, '/'); assert.ok(!root.search && !root.hash && !root.username && !root.password);
  assert.ok(['local', 'preview', 'production'].includes(mode));
  if (mode === 'local') assert.ok(root.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(root.hostname));
  else { assert.equal(root.protocol, 'https:'); assert.equal(root.port, ''); assert.ok(mode === 'production' ? root.hostname === 'cuidatuperroviejo.com' : /^[a-f0-9]{8}-cuidatuperroviejo\.g1721m\.workers\.dev$/u.test(root.hostname)); }
  const expected = await json(expectedPath); assert.equal(expected.schemaVersion, 'mcp-discovery-104-expected/1'); assert.equal(expected.sdk, '2.3.1');
  assert.equal(git('rev-parse', 'HEAD'), expected.head); assert.equal(git('rev-parse', 'HEAD^{tree}'), expected.tree);
  assert.equal(git('status', '--porcelain', '--untracked-files=no'), '');
  const receipt = mode === 'local' ? null : await json(receiptPath); if (receipt) assertReceipt(receipt, expected, mode, root);
  await mkdir(resolve(output));
  await save(join(output, 'expected.json'), expected); if (receipt) await save(join(output, 'receipt.json'), receipt);
  const capture = recorder(root, budget), results = []; let error;
  const control = async (path, init) => { const response = await capture.fetch(new URL(path, root), init); const bytes = Buffer.from(await response.arrayBuffer()); return { response, bytes, value: () => JSON.parse(bytes) }; };
  try {
    for (const card of expected.cards) for (const method of ['GET', 'HEAD']) {
      const { response, bytes } = await control(card.path, { method }); assert.equal(response.status, 200); assert.equal(response.url, root.origin + card.path); assert.equal(response.headers.get('Location'), null);
      assert.equal(response.headers.get('Content-Type'), card.path === cardPaths[0] ? 'application/mcp-server-card+json' : 'application/json; charset=utf-8');
      assert.match(response.headers.get('Cache-Control'), /(?:^|,\s*)no-store(?:,|$)/u); assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*'); assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
      if (method === 'HEAD') assert.equal(bytes.length, 0); else { assert.equal(bytes.length, card.bytes); assert.equal(hash(bytes), card.sha256); }
      results.push({ card: card.path, method, status: 'PASS', bytes: bytes.length, sha256: hash(bytes) });
    }
    for (const modern of [false, true]) {
      const client = new Client({ name: 'ctpv-discovery104', version: '1.0.0' }, modern ? { versionNegotiation: { mode: { pin: '2026-07-28' } } } : {});
      const transport = new StreamableHTTPClientTransport(new URL('/api/mcp', root), { fetch: capture.fetch, requestInit: { redirect: 'manual' }, reconnectionOptions: { maxRetries: 0 } });
      try {
        await client.connect(transport); assert.deepEqual(client.getServerVersion(), expected.identity); assert.deepEqual(client.getServerCapabilities(), expected.capabilities);
        const listed = await client.listTools(); assert.deepEqual(listed.tools.map((tool) => tool.name), expected.tools);
        if (modern) {
          const inputs = [{ q: 'cushing' }, { documentId: expected.document.documentId, corpus: expected.corpusSha256 }, { hurt: 5, hunger: 5, hydration: 5, hygiene: 5, happiness: 5, mobility: 5, moreGoodDays: 5 }, { level: 'severe', handling: 'stressed' }];
          const paths = ['/api/agent/v1/search', `/api/agent/v1/documents/${expected.document.documentId}`, '/api/agent/v1/tools/calidad-vida', '/api/agent/v1/tools/movilidad'];
          for (let index = 0; index < expected.tools.length; index++) {
            const tool = expected.tools[index], result = await client.callTool({ name: tool, arguments: inputs[index] });
            assert.equal(result.isError, false); const value = result.structuredContent; assert.deepEqual(JSON.parse(result.content[0].text), value);
            const query = new URLSearchParams(index === 1 ? { corpus: expected.corpusSha256 } : Object.fromEntries(Object.entries(inputs[index]).map(([key, entry]) => [key, String(entry)])));
            const api = await control(`${paths[index]}?${query}`); assert.equal(api.response.status, 200); assert.deepEqual(value, api.value());
            if (index === 0) { assert.ok(value.results.length > 0); assert.equal(value.corpusSha256, expected.corpusSha256); }
            if (index === 1) { assert.deepEqual(value.document, expected.document); assert.equal(hash(Buffer.from(value.markdown)), expected.document.markdownSha256); assert.equal(Buffer.byteLength(value.markdown), expected.document.markdownBytes); }
            if (index === 2) { assert.equal(value.score, 35); assert.equal(value.band, 'compromised'); }
            results.push({ tool, status: 'PASS', apiParity: true, ...(index === 1 ? { markdownSha256: hash(Buffer.from(value.markdown)) } : {}) });
          }
        }
        results.push({ era: modern ? '2026-07-28' : '2025-11-25', identity: client.getServerVersion(), capabilities: client.getServerCapabilities(), tools: listed.tools.map((tool) => tool.name), status: 'PASS' });
      } finally { await client.close(); }
    }
    const robots = await control('/robots.txt'); assert.equal(robots.response.status, 200); assert.match(robots.bytes.toString(), /Content-Signal: search=yes, ai-input=yes, ai-train=no/u);
    const forbidden = await control('/api/mcp', { method: 'POST', headers: { Origin: 'null', 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, body: JSON.stringify({ jsonrpc: '2.0', id: 104, method: 'server/discover', params: {} }) }); assert.equal(forbidden.response.status, 403);
    results.push({ robots: 'PASS', originNull: 403 });
  } catch (failure) { error = { message: String(failure), stack: failure.stack }; }
  await capture.settle();
  for (const record of capture.records) {
    if (record.requestCaptureTruncated || record.responseCaptureTruncated || !record.requestBodyComplete) error ??= { message: 'Partial capture', sequence: record.sequence };
    if (record.terminal !== 'end') {
      let completeMessage = false;
      try {
        const request = JSON.parse(Buffer.from(record.requestBodyBase64, 'base64'));
        const frames = Buffer.from(record.bodyBase64, 'base64').toString().split(/\r?\n\r?\n/u).slice(0, -1);
        completeMessage = frames.some((frame) => frame.split(/\r?\n/u).filter((line) => line.startsWith('data:')).some((line) => { const message = JSON.parse(line.slice(5)); return message.id === request.id && Object.hasOwn(message, 'result'); }));
      } catch {}
      const admitted = completeMessage && record.errorName === 'AbortError' && record.responseHeaders?.['content-type']?.includes('text/event-stream');
      record.intentionalClientCloseAfterCompleteMessage = admitted;
      if (!admitted) error ??= { message: 'Unadmitted response terminal', sequence: record.sequence, terminal: record.terminal };
    }
  }
  await save(join(output, 'http-originals.json'), capture.records);
  const report = { schemaVersion: 'mcp-discovery-104-smoke/1', head: expected.head, tree: expected.tree, receipt, mode, baseUrl: root.origin, at: new Date().toISOString(),
    node: process.version, sdk: expected.sdk, budget, requests: capture.requests(), status: error ? 'FAIL' : 'PASS', results, ...(error ? { error } : {}) };
  await save(join(output, 'result.json'), report); return report;
}

async function main() {
  const { positionals, values } = parseArgs({ allowPositionals: true, options: Object.fromEntries(['build-dir', 'base-build-dir', 'expected', 'base-url', 'receipt', 'mode', 'out', 'budget'].map((key) => [key, { type: 'string' }])) });
  if (positionals[0] === 'prepare') await prepareExpected(values['build-dir'], values['base-build-dir'], values.out);
  else if (positionals[0] === 'run') { const report = await runSmoke({ baseUrl: values['base-url'], expectedPath: values.expected, receiptPath: values.receipt, mode: values.mode, output: values.out, budget: values.budget ? Number(values.budget) : 24 }); console.log(`${report.status}: ${report.requests}/${report.budget} requests (${report.mode})`); if (report.status !== 'PASS') process.exitCode = 2; }
  else throw new Error('Use prepare --build-dir --base-build-dir --out, or run --expected --base-url --receipt --mode --out [--budget <=24].');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
