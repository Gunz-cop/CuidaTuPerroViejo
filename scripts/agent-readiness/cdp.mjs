// Cliente mínimo de Chrome DevTools Protocol para los harness de F4A.
// Sin dependencias: lanza Chrome con un perfil temporal y habla CDP por el
// WebSocket nativo de Node (>=22). No forma parte del producto ni del build.
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export async function launchChrome(executable, extraArgs = [], { timeoutMs = 30000 } = {}) {
  const profile = await mkdtemp(join(tmpdir(), 'ctpv-cdp-'));
  const child = spawn(executable, [
    '--headless=new', '--no-sandbox', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, ...extraArgs, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((resolve, reject) => {
    let buffer = '';
    const timer = setTimeout(() => reject(new Error('CDP_LAUNCH_TIMEOUT')), timeoutMs);
    child.stderr.on('data', (chunk) => {
      buffer += chunk;
      const match = /DevTools listening on (ws:\/\/\S+)/u.exec(buffer);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    child.on('exit', (code) => { clearTimeout(timer); reject(new Error(`CDP_LAUNCH_EXIT code=${code}`)); });
  });
  const connection = await connect(wsUrl);
  connection.close = async () => {
    connection.socket.close();
    child.kill('SIGKILL');
    await new Promise((resolve) => (child.exitCode !== null ? resolve() : child.once('exit', resolve)));
    await rm(profile, { recursive: true, force: true });
  };
  return connection;
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const listeners = new Set();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== undefined) {
        const entry = pending.get(message.id);
        if (!entry) return;
        pending.delete(message.id);
        if (message.error) entry.reject(Object.assign(new Error(`${entry.method}: ${message.error.message}`), { cdp: message.error }));
        else entry.resolve(message.result);
      } else for (const listener of listeners) listener(message);
    });
    socket.addEventListener('error', () => reject(new Error('CDP_SOCKET_ERROR')));
    socket.addEventListener('open', () => resolve({
      socket,
      send(method, params = {}, sessionId) {
        const id = nextId++;
        socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
        return new Promise((ok, fail) => pending.set(id, { resolve: ok, reject: fail, method }));
      },
      on(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    }));
  });
}

/** Abre una pestaña nueva y devuelve helpers ligados a su sesión CDP. */
export async function openPage(browser, { allowOrigin } = {}) {
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => browser.send(method, params, sessionId);
  const on = (method, handler) => browser.on((message) => { if (message.sessionId === sessionId && message.method === method) handler(message.params); });
  await send('Page.enable');
  await send('Runtime.enable');
  if (allowOrigin) {
    // Sólo el origen bajo prueba: anuncios y terceros se bloquean para que la
    // medición no dependa de red externa ni registre efectos ajenos.
    on('Fetch.requestPaused', ({ requestId, request }) => {
      const allowed = request.url.startsWith(`${allowOrigin}/`) || request.url === allowOrigin;
      void send(allowed ? 'Fetch.continueRequest' : 'Fetch.failRequest', allowed ? { requestId } : { requestId, errorReason: 'BlockedByClient' }).catch(() => {});
    });
    await send('Fetch.enable', { patterns: [{ urlPattern: '*' }] });
  }
  return {
    sessionId, targetId, send, on,
    async goto(url) {
      const loaded = new Promise((resolve) => { const off = browser.on((m) => { if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') { off(); resolve(); } }); });
      const result = await send('Page.navigate', { url });
      if (result.errorText) throw new Error(`NAVIGATE_FAILED ${result.errorText}`);
      await loaded;
    },
    async evaluate(expression) {
      const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(`EVALUATE_FAILED ${result.exceptionDetails.exception?.description ?? result.exceptionDetails.text}`);
      return result.result.value;
    },
    close: () => browser.send('Target.closeTarget', { targetId }),
  };
}
