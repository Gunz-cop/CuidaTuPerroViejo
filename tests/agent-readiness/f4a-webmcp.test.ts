// F4A-2 — lógica del adaptador WebMCP con un modelContext simulado. Prueba el
// contrato de registro, validación, red y cancelación del módulo; NO acredita
// integración con un navegador real (eso es C4A-08..12 con Chrome + CDP).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INPUT_SCHEMAS, TOOLS, findModelContext, registerAgentTools } from '../../src/scripts/agent-tools.ts';
import { evaluateQualityOfLife } from '../../src/lib/agent-tools/calidad-vida.ts';
import { recommendMobilityAids } from '../../src/lib/agent-tools/movilidad.ts';

const ANNEX = readFileSync(new URL('../../docs/agent-readiness/evidencia/f4a/contratos/webmcp-input-schemas.json', import.meta.url), 'utf8');
const INVALID = { schemaVersion: 'agent-api/1', error: { code: 'INVALID_REQUEST', message: 'Invalid request.' } };
const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];
const five = Object.fromEntries(KEYS.map((k) => [k, 5]));
type Registered = { tool: Record<string, any>; options: { signal: AbortSignal } };

function fakeContext(failAt = -1) {
  const registered: Registered[] = [];
  return {
    registered,
    registerTool(tool: Record<string, any>, options: { signal: AbortSignal }) {
      if (registered.length === failAt) return Promise.reject(new DOMException('dup', 'InvalidStateError'));
      registered.push({ tool, options });
      return Promise.resolve();
    },
  };
}

const tool = (name: string) => TOOLS.find((t) => t.name === name)!.execute as (input: unknown, options?: { signal?: AbortSignal }) => Promise<unknown>;

function stubFetch(handler: (url: string, init: RequestInit) => Response | Promise<Response>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: string, init: RequestInit) => { calls.push({ url, init }); return handler(url, init); }) as typeof fetch;
  return { calls, restore: () => { globalThis.fetch = original; } };
}
const json = (body: unknown, status = 200, type = 'application/json; charset=utf-8') => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': type } });

test('el anexo de inputSchema es ASCII puro y el módulo lo usa con igualdad exacta', () => {
  assert.doesNotMatch(ANNEX, /[^\x00-\x7f]/u);
  assert.deepEqual(INPUT_SCHEMAS, JSON.parse(ANNEX));
});

test('registro: cuatro tools en orden, metadatos exactos, readOnlyHint y una sola señal', async () => {
  const context = fakeContext();
  assert.equal(await registerAgentTools(context), true);
  assert.deepEqual(context.registered.map((r) => r.tool.name), ['search_guides', 'read_guide', 'evaluate_quality_of_life', 'recommend_mobility_aids']);
  assert.deepEqual(context.registered.map((r) => r.tool.title), ['Buscar guías', 'Leer guía completa', 'Calculadora HHHHHMM', 'Selector de movilidad']);
  assert.deepEqual(context.registered.map((r) => r.tool.description), [
    'Busca guías publicadas de Cuida tu Perro Viejo por palabras completas y devuelve documentos con su puntuación léxica. No genera consejo veterinario.',
    'Lee el contenido íntegro en Markdown de una guía por su documentId, con metadata, URL canónica y enlaces originales.',
    'Calcula la escala HHHHHMM de calidad de vida (siete criterios de 0 a 10) igual que la calculadora del sitio. Es orientativa, no un diagnóstico ni una decisión.',
    'Recomienda ayudas de movilidad según el nivel de movilidad y la tolerancia a la manipulación, igual que el selector del sitio. Orientativo; consulta al veterinario.',
  ]);
  const annex = JSON.parse(ANNEX);
  for (const { tool: t, options } of context.registered) {
    assert.deepEqual(t.inputSchema, annex[t.name]);
    assert.deepEqual(t.annotations, { readOnlyHint: true });
    assert.deepEqual(Object.keys(t), ['name', 'title', 'description', 'inputSchema', 'execute', 'annotations']);
    assert.equal(options.signal, context.registered[0]!.options.signal);
  }
  assert.equal(context.registered[0]!.options.signal.aborted, false);
});

test('registro: si una falla, se aborta la señal y no queda un conjunto parcial', async () => {
  const context = fakeContext(2);
  assert.equal(await registerAgentTools(context), false);
  assert.equal(context.registered.length, 2);
  assert.ok(context.registered.every((r) => r.options.signal.aborted));
  const throwing = { registerTool() { throw new TypeError('sync'); } };
  assert.equal(await registerAgentTools(throwing), false);
});

test('detección: document.modelContext primero, navigator como fallback, nada sin API', () => {
  const api = { registerTool() {} };
  const other = { registerTool() {} };
  assert.equal(findModelContext({ document: { modelContext: api }, navigator: { modelContext: other } }), api);
  assert.equal(findModelContext({ document: {}, navigator: { modelContext: other } }), other);
  assert.equal(findModelContext({ document: {}, navigator: {} }), null);
  assert.equal(findModelContext({ document: { modelContext: {} }, navigator: { modelContext: 'x' } }), null);
  assert.equal(findModelContext({}), null);
});

test('cálculos locales = función compartida, sin red; entrada string JSON aceptada', async () => {
  const net = stubFetch(() => { throw new Error('no network expected'); });
  try {
    assert.deepEqual(await tool('evaluate_quality_of_life')(five), evaluateQualityOfLife(five));
    assert.deepEqual(await tool('evaluate_quality_of_life')(JSON.stringify(five)), evaluateQualityOfLife(five));
    assert.deepEqual(await tool('recommend_mobility_aids')({ level: 'severe', handling: 'calm' }), recommendMobilityAids({ level: 'severe', handling: 'calm' }));
    assert.equal(net.calls.length, 0);
  } finally { net.restore(); }
});

test('entradas inválidas → INVALID_REQUEST exacto y sin red', async () => {
  const net = stubFetch(() => { throw new Error('no network expected'); });
  const cases: Array<[string, unknown]> = [
    ['evaluate_quality_of_life', { ...five, hurt: 11 }], ['evaluate_quality_of_life', { ...five, hurt: 1.5 }], ['evaluate_quality_of_life', { ...five, x: 1 }],
    ['evaluate_quality_of_life', null], ['evaluate_quality_of_life', [1]], ['evaluate_quality_of_life', 'not json'], ['evaluate_quality_of_life', '[1]'],
    ['recommend_mobility_aids', { level: 'S', handling: 'A' }], ['recommend_mobility_aids', { level: 'severe' }],
    ['search_guides', {}], ['search_guides', { q: 5 }], ['search_guides', { q: 'x', limit: 0 }], ['search_guides', { q: 'x', limit: 21 }], ['search_guides', { q: 'x', limit: '5' }],
    ['search_guides', { q: 'x', offset: 99 }], ['search_guides', { q: 'x', kind: 'blog' }], ['search_guides', { q: 'x', corpus: 'abc' }], ['search_guides', { q: 'x', extra: 1 }],
    ['read_guide', {}], ['read_guide', { documentId: '../../admin/contact-messages' }], ['read_guide', { documentId: 'home/../x' }], ['read_guide', { documentId: 'https://example.org' }],
    ['read_guide', { documentId: `article--${'a'.repeat(160)}` }], ['read_guide', { documentId: 'home', corpus: 'A'.repeat(64) }], ['read_guide', { documentId: 'home', extra: 1 }],
  ];
  try {
    for (const [name, input] of cases) assert.deepEqual(await tool(name)(input), INVALID, `${name} ${JSON.stringify(input)}`);
    assert.equal(net.calls.length, 0);
  } finally { net.restore(); }
});

test('search/read reutilizan la API F3: URL, opciones de fetch y cuerpo sin modificar', async () => {
  const body = { schemaVersion: 'agent-api/1', any: 'thing' };
  const net = stubFetch(() => json(body));
  try {
    assert.deepEqual(await tool('search_guides')({ q: 'perro señor', kind: 'article', limit: 5, offset: 0, corpus: 'a'.repeat(64) }), body);
    assert.deepEqual(await tool('search_guides')({ corpus: 'b'.repeat(64), q: 'cushing' }), body);
    assert.deepEqual(await tool('read_guide')({ documentId: 'tool--movilidad', corpus: 'c'.repeat(64) }), body);
    assert.deepEqual(await tool('read_guide')({ documentId: 'home' }), body);
    assert.deepEqual(net.calls.map((c) => c.url), [
      `/api/agent/v1/search?q=perro+se%C3%B1or&kind=article&limit=5&offset=0&corpus=${'a'.repeat(64)}`,
      `/api/agent/v1/search?q=cushing&corpus=${'b'.repeat(64)}`,
      `/api/agent/v1/documents/tool--movilidad?corpus=${'c'.repeat(64)}`,
      '/api/agent/v1/documents/home',
    ]);
    for (const { init } of net.calls) {
      assert.equal(init.method, 'GET');
      assert.equal(init.credentials, 'omit');
      assert.equal(init.cache, 'no-store');
      assert.equal(init.redirect, 'error');
      assert.deepEqual(init.headers, { Accept: 'application/json' });
      assert.equal(init.body, undefined);
    }
  } finally { net.restore(); }
});

test('respuestas de la API: errores contractuales pasan tal cual; lo demás rechaza CONTENT_UNAVAILABLE', async () => {
  for (const status of [400, 404, 409, 503]) {
    const body = { schemaVersion: 'agent-api/1', error: { code: `E${status}`, message: 'x' } };
    const net = stubFetch(() => json(body, status));
    try { assert.deepEqual(await tool('read_guide')({ documentId: 'home' }), body); } finally { net.restore(); }
  }
  const bad: Array<() => Response | never> = [
    () => json({}, 500), () => json({}, 302), () => json({}, 200, 'text/html'), () => new Response('{', { status: 200, headers: { 'Content-Type': 'application/json' } }),
    () => { throw new TypeError('network'); },
  ];
  for (const respond of bad) {
    const net = stubFetch(respond);
    try { await assert.rejects(tool('search_guides')({ q: 'x' }), /CONTENT_UNAVAILABLE/u); } finally { net.restore(); }
  }
  const upper = stubFetch(() => json({ ok: 1 }, 200, 'Application/JSON ; charset=UTF-8'));
  try { assert.deepEqual(await tool('search_guides')({ q: 'x' }), { ok: 1 }); } finally { upper.restore(); }
});

test('cancelación: señal ya abortada rechaza sin red; abortar durante fetch rechaza con el motivo', async () => {
  const net = stubFetch((_url, init) => new Promise((_resolve, reject) => {
    init.signal!.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
  }));
  try {
    const pre = new AbortController();
    pre.abort(new DOMException('ya', 'AbortError'));
    await assert.rejects(tool('evaluate_quality_of_life')(five, { signal: pre.signal }), { name: 'AbortError', message: 'ya' });
    await assert.rejects(tool('search_guides')({ q: 'x' }, { signal: pre.signal }), { name: 'AbortError' });
    assert.equal(net.calls.length, 0);
    const during = new AbortController();
    const pending = tool('read_guide')({ documentId: 'home' }, { signal: during.signal });
    await new Promise((resolve) => setTimeout(resolve, 10));
    during.abort(new DOMException('cancelado', 'AbortError'));
    await assert.rejects(pending, { name: 'AbortError', message: 'cancelado' });
    assert.equal(net.calls.length, 1);
    assert.equal(net.calls[0]!.init.signal, during.signal);
  } finally { net.restore(); }
});
