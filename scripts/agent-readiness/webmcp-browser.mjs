#!/usr/bin/env node
// C4A-08..C4A-12 — verificación WebMCP real con un cliente CDP externo (no un mock).
// supported   (Chrome + --enable-features=WebMCPTesting): registro de las cuatro
//             tools en varias superficies, llamadas reales con WebMCP.invokeTool
//             comparadas con la API, cancelación, errores y ausencia de efectos.
// unsupported (navegador sin la API): carga sin excepciones, sin peticiones a la
//             API y sin modelContext; C4A-17: sólo pide el JS del cierre de
//             imports estáticos de los <script src> fuera de la plantilla WebMCP.
// En ambos modos registra los /_astro/*.js pedidos con el SHA-256 de su contenido.
// Terceros (anuncios) se bloquean: sólo se permite el origen bajo prueba.
//
// Uso: node scripts/agent-readiness/webmcp-browser.mjs --chrome <bin> --base-url <url> --out <json>
//        [--mode supported|unsupported] [--commit <sha>] [--schemas <json>]
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { launchChrome, openPage } from './cdp.mjs';

const PAGES = ['/', '/salud-perros-mayores/sindrome-cushing-perros-mayores', '/herramientas/calculadora-calidad-vida-perros', '/herramientas/calculadora-edad-perro', '/politica-editorial'];
const TOOL_NAMES = ['search_guides', 'read_guide', 'evaluate_quality_of_life', 'recommend_mobility_aids', 'calculate_dog_age'];
const TITLES = { search_guides: 'Buscar guías', read_guide: 'Leer guía completa', evaluate_quality_of_life: 'Calculadora HHHHHMM', recommend_mobility_aids: 'Selector de movilidad', calculate_dog_age: 'Calculadora de edad' };
const DESCRIPTIONS = {
  search_guides: 'Busca guías publicadas de Cuida tu Perro Viejo por palabras completas y devuelve documentos con su puntuación léxica. No genera consejo veterinario.',
  read_guide: 'Lee el contenido íntegro en Markdown de una guía por su documentId, con metadata, URL canónica y enlaces originales.',
  evaluate_quality_of_life: 'Calcula la escala HHHHHMM de calidad de vida (siete criterios de 0 a 10) igual que la calculadora del sitio. Es orientativa, no un diagnóstico ni una decisión.',
  recommend_mobility_aids: 'Recomienda ayudas de movilidad según el nivel de movilidad y la tolerancia a la manipulación, igual que el selector del sitio. Orientativo; consulta al veterinario.',
  calculate_dog_age: 'Calcula la edad equivalente en años humanos de un perro según su tamaño y edad, igual que la calculadora del sitio: etapa de vida (AAHA 2019), edad de inicio senior, esperanza de vida media por tamaño (Montoya 2023), comparación epigenética (Wang 2020), un mensaje para su etapa y la guía recomendada. Úsala cuando alguien pregunte cuántos años humanos tiene su perro, si ya es senior o en qué etapa está. Orientativa; no sustituye una valoración veterinaria.',
};
const INVALID = { schemaVersion: 'agent-api/1', error: { code: 'INVALID_REQUEST', message: 'Invalid request.' } };
const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TEMPLATE = /<template id="agent-tools-webmcp">([\s\S]*?)<\/template>/gu;
const MODULE_SRC = /<script type="module" src="(\/_astro\/[^"]+\.js)"/gu;
const STATIC_IMPORT = /(?:\bfrom\s*|\bimport\s*)["'](\.{1,2}\/[^"']+\.js)["']/gu;

// C4A-17: cierre transitivo de imports estáticos (los import() dinámicos no cuentan),
// calculado sobre el build servido.
async function staticClosure(base, entries, cache) {
  const seen = new Set();
  const queue = [...entries];
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    if (!cache.has(path)) cache.set(path, await (await fetch(base + path)).text());
    for (const [, spec] of cache.get(path).matchAll(STATIC_IMPORT)) queue.push(new URL(spec, `https://x${path}`).pathname);
  }
  return seen;
}

async function scriptGraph(base, path, cache) {
  const html = await (await fetch(base + path)).text();
  const inside = [...html.matchAll(TEMPLATE)].flatMap(([, body]) => [...body.matchAll(MODULE_SRC)].map((m) => m[1]));
  const outside = [...html.replace(TEMPLATE, '').matchAll(MODULE_SRC)].map((m) => m[1]);
  const outsideClosure = await staticClosure(base, outside, cache);
  const templateClosure = await staticClosure(base, inside, cache);
  return { inside, outsideClosure, exclusive: [...templateClosure].filter((p) => !outsideClosure.has(p)).sort() };
}

async function jsRequested(base, requests) {
  const paths = [...new Set(requests.map((r) => r.url).filter((u) => u.startsWith(`${base}/_astro/`) && u.endsWith('.js')).map((u) => u.slice(base.length)))].sort();
  return Promise.all(paths.map(async (path) => ({ path, sha256: createHash('sha256').update(Buffer.from(await (await fetch(base + path)).arrayBuffer())).digest('hex') })));
}

function nextEvent(page, method, predicate = () => true, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    let off = () => {};
    const timer = setTimeout(() => { off(); reject(new Error(`TIMEOUT ${method}`)); }, timeoutMs);
    off = page.on(method, (params) => { if (predicate(params)) { clearTimeout(timer); off(); resolve(params); } });
  });
}

async function preparePage(browser, origin) {
  const page = await openPage(browser);
  const state = { requests: [], failed: [], exceptions: [], hold: null, held: [] };
  page.on('Network.requestWillBeSent', ({ requestId, request }) => state.requests.push({ requestId, method: request.method, url: request.url }));
  page.on('Network.loadingFailed', (params) => state.failed.push(params));
  page.on('Runtime.exceptionThrown', ({ exceptionDetails }) => state.exceptions.push(exceptionDetails.exception?.description ?? exceptionDetails.text));
  page.on('Fetch.requestPaused', ({ requestId, request }) => {
    const sameOrigin = request.url === origin || request.url.startsWith(`${origin}/`);
    if (!sameOrigin) { void page.send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' }).catch(() => {}); return; }
    if (state.hold && request.url.includes(state.hold)) { state.held.push({ requestId, url: request.url }); return; }
    void page.send('Fetch.continueRequest', { requestId }).catch(() => {});
  });
  await page.send('Network.enable');
  await page.send('Fetch.enable', { patterns: [{ urlPattern: '*' }] });
  return { page, state };
}

async function main() {
  const { values } = parseArgs({ options: { chrome: { type: 'string' }, 'base-url': { type: 'string' }, out: { type: 'string' }, mode: { type: 'string', default: 'supported' }, commit: { type: 'string' }, schemas: { type: 'string', default: 'docs/agent-readiness/evidencia/f4a/contratos/webmcp-input-schemas.json' } } });
  if (!values.chrome || !values['base-url'] || !values.out || !['supported', 'unsupported'].includes(values.mode)) {
    process.stderr.write('Uso: webmcp-browser.mjs --chrome <bin> --base-url <url> --out <json> [--mode supported|unsupported] [--commit <sha>]\n');
    return 3;
  }
  const base = values['base-url'].replace(/\/$/u, '');
  const origin = new URL(base).origin;
  const supported = values.mode === 'supported';
  const schemas = JSON.parse(await readFile(values.schemas, 'utf8'));
  const browser = await launchChrome(values.chrome, supported ? ['--enable-features=WebMCPTesting'] : []);
  const checks = [];
  const check = (id, name, ok, detail) => checks.push({ id, name, ok: Boolean(ok), ...(detail === undefined ? {} : { detail }) });
  const scripts = {};
  const chunkCache = new Map();
  let product = null;
  try {
    ({ product } = await browser.send('Browser.getVersion'));
    for (const path of PAGES) {
      const { page, state } = await preparePage(browser, origin);
      const added = [];
      if (supported) {
        page.on('WebMCP.toolsAdded', ({ tools }) => added.push(...tools));
        await page.send('WebMCP.enable');
      }
      await page.goto(base + path);
      await sleep(800);
      // Otras APIs del sitio (p. ej. /api/geo, /api/feedback) son widgets previos; el criterio es /api/agent/v1.
      const onLoadApi = state.requests.filter((r) => r.url.startsWith(`${base}/api/agent/v1/`));
      check(supported ? 'C4A-08' : 'C4A-11', `${path}: sin peticiones a /api/agent/v1 al cargar`, onLoadApi.length === 0, onLoadApi);
      check(supported ? 'C4A-08' : 'C4A-11', `${path}: sin excepciones de página`, state.exceptions.length === 0, state.exceptions);
      check('C4A-12', `${path}: sin atributos declarativos WebMCP`, await page.evaluate("document.querySelectorAll('[toolname],[tooldescription],[toolparamdescription],[toolautosubmit]').length") === 0);
      const requested = await jsRequested(base, state.requests);
      const graph = await scriptGraph(base, path, chunkCache);
      const requestedPaths = requested.map((r) => r.path);
      scripts[path] = { requested, expectedWithoutApi: [...graph.outsideClosure].sort(), template: graph.inside, templateOnly: graph.exclusive };
      check(supported ? 'C4A-18' : 'C4A-17', `${path}: el adaptador WebMCP está en una plantilla inerte`, graph.inside.length === 1, graph.inside);
      if (supported) check('C4A-18', `${path}: con API se carga el chunk de la plantilla`, graph.inside.every((p) => requestedPaths.includes(p)), requestedPaths);
      else {
        check('C4A-17', `${path}: JS pedido = cierre de imports estáticos de los <script src> fuera de la plantilla`, isDeepStrictEqual(requestedPaths, [...graph.outsideClosure].sort()), { requested: requestedPaths, expected: [...graph.outsideClosure].sort() });
        const leaked = requestedPaths.filter((p) => graph.inside.includes(p) || graph.exclusive.includes(p));
        check('C4A-17', `${path}: sin petición al chunk de la plantilla ni a módulos sólo suyos`, leaked.length === 0, { leaked, templateOnly: graph.exclusive });
      }
      if (!supported) {
        const api = await page.evaluate("typeof document.modelContext + '/' + typeof navigator.modelContext");
        check('C4A-11', `${path}: navegador sin API WebMCP`, api === 'undefined/undefined', api);
        await page.close();
        continue;
      }
      check('C4A-08', `${path}: WebMCP.toolsAdded entrega exactamente las cinco tools`, isDeepStrictEqual(added.map((t) => t.name).sort(), [...TOOL_NAMES].sort()), added.map((t) => t.name));
      for (const name of TOOL_NAMES) {
        const entry = added.find((t) => t.name === name);
        check('C4A-08', `${path}: ${name} vía CDP (description, inputSchema, readOnly)`,
          entry && entry.description === DESCRIPTIONS[name] && isDeepStrictEqual(entry.inputSchema, schemas[name]) && entry.annotations?.readOnly === true,
          entry && { hasInputSchema: entry.inputSchema !== undefined, annotations: entry.annotations });
      }
      const inPage = await page.evaluate('(async () => (await document.modelContext.getTools()).map((t) => ({ name: t.name, title: t.title, inputSchema: t.inputSchema, readOnlyHint: t.annotations?.readOnlyHint === true })))()');
      for (const name of TOOL_NAMES) {
        const entry = inPage.find((t) => t.name === name);
        check('C4A-08', `${path}: ${name} vía getTools() (title, inputSchema, readOnlyHint)`, entry && entry.title === TITLES[name] && isDeepStrictEqual(entry.inputSchema, schemas[name]) && entry.readOnlyHint);
      }
      if (path === '/') for (const result of await invocations(page, state, base, added[0]?.frameId)) checks.push(result);
      await page.close();
    }
  } finally { await browser.close(); }
  const pass = checks.length > 0 && checks.every((c) => c.ok);
  await writeFile(values.out, `${JSON.stringify({ schemaVersion: 'f4a-webmcp-browser/1', commit: values.commit ?? null, baseUrl: base, mode: values.mode, browser: product, flags: supported ? ['--enable-features=WebMCPTesting'] : [], pass, passed: checks.filter((c) => c.ok).length, total: checks.length, checks, scripts }, null, 2)}\n`);
  process.stdout.write(`${pass ? 'PASS' : 'FAIL'}: ${checks.filter((c) => c.ok).length}/${checks.length} comprobaciones en ${product} (${values.mode}).\n`);
  return pass ? 0 : 2;
}

// Llamada moderna (2026-07-28) al MCP remoto del mismo origen; devuelve structuredContent.
async function mcpCall(base, name, args) {
  const body = { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args, _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };
  const response = await fetch(`${base}/api/mcp`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'tools/call', 'Mcp-Name': name } });
  const text = await response.text();
  const data = text.split('\n').find((line) => line.startsWith('data:'));
  return JSON.parse(data ? data.slice(5) : text).result?.structuredContent;
}

async function invocations(page, state, base, frameId) {
  const results = [];
  const check = (id, name, ok, detail) => results.push({ id, name, ok: Boolean(ok), ...(detail === undefined ? {} : { detail }) });
  const invoke = async (toolName, input) => {
    const responded = nextEvent(page, 'WebMCP.toolResponded');
    const { invocationId } = await page.send('WebMCP.invokeTool', { frameId, toolName, input });
    const response = await responded;
    if (response.invocationId !== invocationId) throw new Error('INVOCATION_MISMATCH');
    // CDP entrega `output` como objeto o como string JSON según la serialización
    // interna de Chrome (la spec define executeTool como JSON serializado). Se
    // compara el valor JSON y se registra la representación recibida.
    outputTypes[toolName] = [...new Set([...(outputTypes[toolName] ?? []), typeof response.output])];
    return { ...response, output: typeof response.output === 'string' ? JSON.parse(response.output) : response.output };
  };
  const outputTypes = {};
  const api = async (path) => (await fetch(base + path)).json();
  const storage = () => page.evaluate('JSON.stringify([document.cookie, Object.entries(localStorage), Object.entries(sessionStorage)])');

  // C4A-09: búsqueda real → lectura del resultado con corpus; idénticas a la API.
  const before = await storage();
  const mark = state.requests.length;
  const search = await invoke('search_guides', { q: 'cushing' });
  const apiSearch = await api('/api/agent/v1/search?q=cushing');
  check('C4A-09', 'search_guides {q:"cushing"} = API', search.status === 'Completed' && isDeepStrictEqual(search.output, apiSearch), { status: search.status, total: search.output?.total, first: search.output?.results?.[0]?.document?.documentId });
  const id = apiSearch.results[0].document.documentId;
  const read = await invoke('read_guide', { documentId: id, corpus: apiSearch.corpusSha256 });
  const apiRead = await api(`/api/agent/v1/documents/${id}?corpus=${apiSearch.corpusSha256}`);
  check('C4A-09', `read_guide ${id} con corpus = API (Markdown íntegro)`, read.status === 'Completed' && isDeepStrictEqual(read.output, apiRead), { status: read.status, markdownSha256: apiRead.document?.markdownSha256 });

  // C4A-09/C4A-15: cálculos = API para extremos, fronteras 34/35/36/49/50/51 y las seis combinaciones.
  for (const v of [[0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10], [4, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5], [6, 5, 5, 5, 5, 5, 5], [10, 10, 10, 10, 9, 0, 0], [10, 10, 10, 10, 10, 0, 0], [10, 10, 10, 10, 10, 1, 0], [7, 2, 9, 0, 6, 3, 8]]) {
    const result = await invoke('evaluate_quality_of_life', Object.fromEntries(KEYS.map((k, i) => [k, v[i]])));
    const expected = await api(`/api/agent/v1/tools/calidad-vida?${KEYS.map((k, i) => `${k}=${v[i]}`).join('&')}`);
    check('C4A-09', `evaluate_quality_of_life [${v.join(',')}] = API`, result.status === 'Completed' && isDeepStrictEqual(result.output, expected), { score: result.output?.score, band: result.output?.band });
  }
  for (const level of ['light', 'moderate', 'severe']) for (const handling of ['calm', 'stressed']) {
    const result = await invoke('recommend_mobility_aids', { level, handling });
    check('C4A-09', `recommend_mobility_aids ${level}/${handling} = API`, result.status === 'Completed' && isDeepStrictEqual(result.output, await api(`/api/agent/v1/tools/movilidad?level=${level}&handling=${handling}`)), { resultKey: result.output?.resultKey });
  }
  // edad-mcp: calculate_dog_age por WebMCP = misma llamada por el MCP remoto del mismo origen.
  for (const [input, human, stage] of [[{ size: 'medium', years: 0, months: 1 }, 1, 'puppy'], [{ size: 'small', years: 11, name: 'Luna' }, 68, 'senior'], [{ size: 'medium', years: 12, name: 'Dakota' }, 76, 'senior'], [{ size: 'giant', years: 10 }, 83, 'longevous']]) {
    const result = await invoke('calculate_dog_age', input);
    const remote = await mcpCall(base, 'calculate_dog_age', input);
    check('edad-mcp', `calculate_dog_age ${JSON.stringify(input)} = MCP remoto (${human}, ${stage})`, result.status === 'Completed' && isDeepStrictEqual(result.output, remote)
      && result.output.human_years === human && result.output.stage.id === stage, { human_years: result.output?.human_years, stage: result.output?.stage, recommended_action: result.output?.recommended_action?.url });
  }
  const during = state.requests.slice(mark);
  check('C4A-12', 'durante las llamadas: sólo GET same-origin a /api/agent/v1/', during.every((r) => r.method === 'GET' && r.url.startsWith(`${base}/api/agent/v1/`)), during.map((r) => `${r.method} ${r.url.slice(base.length)}`));
  check('C4A-12', 'durante las llamadas: búsqueda y lectura hacen un fetch cada una; cálculos ninguno', during.length === 2, during.length);
  check('C4A-12', 'sin escrituras de cookies/localStorage/sessionStorage atribuibles a execute', before === await storage());

  // C4A-09: entradas inválidas → INVALID_REQUEST sin red, incluido un ID que intenta salir del namespace.
  const invalid = [
    ['evaluate_quality_of_life', { hurt: 11 }], ['evaluate_quality_of_life', { ...Object.fromEntries(KEYS.map((k) => [k, 5])), hurt: 1.5 }],
    ['recommend_mobility_aids', { level: 'Severe', handling: 'calm' }], ['calculate_dog_age', { size: 'tiny', years: 3 }], ['calculate_dog_age', { size: 'small', years: 26 }], ['search_guides', { q: 'x', limit: 0 }], ['search_guides', { q: 'x', extra: 1 }],
    ['read_guide', { documentId: '../../admin/contact-messages' }], ['read_guide', { documentId: 'https://example.org/x' }], ['read_guide', { documentId: 'home', corpus: 'nope' }],
  ];
  for (const [toolName, input] of invalid) {
    const before2 = state.requests.length;
    const result = await invoke(toolName, input);
    check('C4A-09', `${toolName} ${JSON.stringify(input)} → INVALID_REQUEST sin red`, result.status === 'Completed' && isDeepStrictEqual(result.output, INVALID) && state.requests.length === before2, { status: result.status });
  }
  // Errores contractuales de la API llegan sin modificar.
  const missing = await invoke('read_guide', { documentId: 'article--no-existe' });
  check('C4A-09', 'read_guide inexistente → DOCUMENT_NOT_FOUND de la API', missing.status === 'Completed' && isDeepStrictEqual(missing.output, await api('/api/agent/v1/documents/article--no-existe')));
  const stale = await invoke('read_guide', { documentId: id, corpus: '0'.repeat(64) });
  check('C4A-09', 'read_guide con corpus discordante → CORPUS_CHANGED de la API', stale.status === 'Completed' && stale.output?.error?.code === 'CORPUS_CHANGED');

  // C4A-10: cancelación de una lectura retenida en vuelo → Canceled y fetch abortado.
  state.hold = '/api/agent/v1/documents/';
  const heldBefore = state.held.length;
  const responded = nextEvent(page, 'WebMCP.toolResponded');
  const { invocationId } = await page.send('WebMCP.invokeTool', { frameId, toolName: 'read_guide', input: { documentId: id } });
  const deadline = Date.now() + 10000;
  while (state.held.length === heldBefore && Date.now() < deadline) await sleep(25);
  const heldRequest = state.held.at(-1);
  await page.send('WebMCP.cancelInvocation', { invocationId });
  const canceled = await responded;
  await sleep(300);
  const networkId = heldRequest && state.requests.filter((r) => r.url === heldRequest.url).at(-1);
  const aborted = networkId && state.failed.find((f) => f.requestId === networkId.requestId && f.canceled);
  check('C4A-10', 'cancelInvocation durante read_guide → Canceled', state.held.length === heldBefore + 1 && canceled.status === 'Canceled', { status: canceled.status, held: state.held.length - heldBefore });
  check('C4A-10', 'la cancelación aborta el fetch en curso (Network.loadingFailed canceled)', Boolean(aborted), aborted && { errorText: aborted.errorText });
  state.hold = null;
  for (const entry of state.held.splice(0)) await page.send('Fetch.continueRequest', { requestId: entry.requestId }).catch(() => {});

  // C4A-10: transporte fallido → Error, sin reintentos.
  const failMark = state.requests.length;
  state.hold = '/api/agent/v1/search';
  const respondedFail = nextEvent(page, 'WebMCP.toolResponded');
  await page.send('WebMCP.invokeTool', { frameId, toolName: 'search_guides', input: { q: 'artrosis' } });
  const failDeadline = Date.now() + 10000;
  while (!state.held.length && Date.now() < failDeadline) await sleep(25);
  for (const entry of state.held.splice(0)) await page.send('Fetch.failRequest', { requestId: entry.requestId, errorReason: 'ConnectionFailed' });
  const failed = await respondedFail;
  state.hold = null;
  const searchAttempts = state.requests.slice(failMark).filter((r) => r.url.includes('/api/agent/v1/search')).length;
  check('C4A-10', 'transporte fallido → Error y un solo intento (sin reintentos)', failed.status === 'Error' && searchAttempts === 1, { status: failed.status, attempts: searchAttempts, errorText: failed.errorText });

  // C4A-10: señal ya abortada vía executeTool dentro de la página → AbortError.
  const preAborted = await page.evaluate("(async () => { const t = (await document.modelContext.getTools()).find((x) => x.name === 'evaluate_quality_of_life'); const c = new AbortController(); c.abort(); try { await document.modelContext.executeTool(t, {}, { signal: c.signal }); return 'resolved'; } catch (e) { return e.name; } })()");
  check('C4A-10', 'executeTool con señal ya abortada → AbortError', preAborted === 'AbortError', preAborted);
  results.push({ id: 'info', name: 'representación de output en WebMCP.toolResponded por tool', ok: true, detail: outputTypes });
  return results;
}

process.exitCode = await main();
