// F4A-1 — API HTTP de cálculo (C4A-05): contratos F4A §2 sobre el Worker F3.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import { createAgentApiWorker } from '../../src/lib/agent-api/runtime';

const SITE = 'https://cuidatuperroviejo.com';
const QUALITY = '/api/agent/v1/tools/calidad-vida';
const MOBILITY = '/api/agent/v1/tools/movilidad';
const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];
const schema = JSON.parse(readFileSync(new URL('../../src/agent-api/schema.json', import.meta.url), 'utf8'));
const ajv = new Ajv2020({ strict: false, validateFormats: false });
ajv.addSchema(schema);
const validate = Object.fromEntries(['QualityOfLifeResult', 'MobilityResult', 'Error'].map((name) => [name, ajv.compile({ $ref: `${schema.$id}#/$defs/${name}` })]));
const annex = (name: string) => readFileSync(new URL(`../../docs/agent-readiness/evidencia/f4a/contratos/${name}`, import.meta.url), 'utf8');

const LINK = [
  '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"',
  '<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"',
  '<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
].join(', ');
const COMMON = {
  'cache-control': 'private, no-store',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, HEAD, OPTIONS',
  'access-control-allow-headers': 'Accept',
  'access-control-expose-headers': 'Link',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'geolocation=(), microphone=(), camera=()',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  link: LINK,
};

function harness() {
  const assetCalls: string[] = [];
  const delegated: string[] = [];
  const assets = { fetch: async (req: Request) => { assetCalls.push(req.url); return new Response('unexpected', { status: 500 }); } } as unknown as Fetcher;
  const worker = createAgentApiWorker(async (req) => { delegated.push(req.url); return new Response('delegated'); });
  const request = (path: string, init: RequestInit = {}) => worker(new Request(SITE + path, init), { ASSETS: assets }, {} as ExecutionContext);
  return { request, assetCalls, delegated };
}

const qs = (values: Record<string, string | number>) => Object.entries(values).map(([k, v]) => `${k}=${v}`).join('&');
const quality = (values: number[]) => `${QUALITY}?${qs(Object.fromEntries(KEYS.map((k, i) => [k, values[i]!])))}`;

function assertHeaders(response: Response, status: number) {
  assert.equal(response.status, status);
  for (const [name, value] of Object.entries(COMMON)) assert.equal(response.headers.get(name), value, name);
  assert.equal(response.headers.get('content-type'), status === 204 ? null : 'application/json; charset=utf-8');
  assert.equal(response.headers.get('allow'), status === 405 ? 'GET, HEAD, OPTIONS' : null);
  for (const name of ['etag', 'last-modified', 'set-cookie', 'access-control-allow-credentials']) assert.equal(response.headers.get(name), null, name);
}

async function expectError(response: Response, status: number, code: string, message: string) {
  assertHeaders(response, status);
  const body = await response.json();
  assert.deepEqual(body, { schemaVersion: 'agent-api/1', error: { code, message } });
  assert.ok(validate.Error!(body));
}

test('200: ejemplos normativos byteexactos, umbrales y extremos; sin ASSETS ni delegación', async () => {
  const h = harness();
  const r1 = await h.request(quality([5, 5, 5, 5, 5, 5, 5]));
  assertHeaders(r1, 200);
  assert.equal(await r1.text(), annex('ejemplo-calidad-vida-200.json'));
  const r2 = await h.request(`${MOBILITY}?level=severe&handling=stressed`);
  assertHeaders(r2, 200);
  assert.equal(await r2.text(), annex('ejemplo-movilidad-200.json'));
  const cases: Array<[number[], number, string]> = [
    [[0, 0, 0, 0, 0, 0, 0], 0, 'compromised'], [[10, 10, 10, 10, 10, 10, 10], 70, 'good'],
    [[4, 5, 5, 5, 5, 5, 5], 34, 'compromised'], [[5, 5, 5, 5, 5, 5, 5], 35, 'compromised'], [[6, 5, 5, 5, 5, 5, 5], 36, 'acceptable'],
    [[10, 10, 10, 10, 9, 0, 0], 49, 'acceptable'], [[10, 10, 10, 10, 10, 0, 0], 50, 'acceptable'], [[10, 10, 10, 10, 10, 1, 0], 51, 'good'],
  ];
  for (const [values, score, band] of cases) {
    const body = await (await h.request(quality(values))).json() as { score: number; band: string };
    assert.equal(body.score, score);
    assert.equal(body.band, band);
    assert.ok(validate.QualityOfLifeResult!(body), JSON.stringify(validate.QualityOfLifeResult!.errors));
  }
  for (const level of ['light', 'moderate', 'severe']) for (const handling of ['calm', 'stressed']) {
    const body = await (await h.request(`${MOBILITY}?level=${level}&handling=${handling}`)).json() as { palliativeAlert: unknown };
    assert.ok(validate.MobilityResult!(body), JSON.stringify(validate.MobilityResult!.errors));
    assert.equal(body.palliativeAlert === null, level !== 'severe');
  }
  // Orden de keys indiferente; separadores vacíos se ignoran como en F3.
  const reordered = await (await h.request(`${QUALITY}?&moreGoodDays=5&mobility=5&happiness=5&hygiene=5&hydration=5&hunger=5&hurt=5&`)).text();
  assert.equal(reordered, annex('ejemplo-calidad-vida-200.json'));
  assert.deepEqual(h.assetCalls, []);
  assert.deepEqual(h.delegated, []);
});

test('400 INVALID_REQUEST para toda entrada fuera de contrato', async () => {
  const h = harness();
  const base = Object.fromEntries(KEYS.map((k) => [k, '5']));
  const without = (key: string) => qs(Object.fromEntries(Object.entries(base).filter(([k]) => k !== key)));
  const invalid = [
    `${QUALITY}`, `${QUALITY}?`, `${QUALITY}?${without('hurt')}`, `${QUALITY}?${qs({ ...base, hurt: '11' })}`, `${QUALITY}?${qs({ ...base, hurt: '05' })}`,
    `${QUALITY}?${qs({ ...base, hurt: '+1' })}`, `${QUALITY}?${qs({ ...base, hurt: '-1' })}`, `${QUALITY}?${qs({ ...base, hurt: '1.0' })}`,
    `${QUALITY}?${qs({ ...base, hurt: '' })}`, `${QUALITY}?${qs({ ...base, hurt: ' 5' })}`, `${QUALITY}?${qs({ ...base, hurt: '1e1' })}`,
    `${QUALITY}?${qs({ ...base, hurt: '0010' })}`, `${QUALITY}?${qs(base)}&hurt=5`, `${QUALITY}?${qs(base)}&extra=1`,
    `${QUALITY}?${qs(base)}&corpus=${'a'.repeat(64)}`, `${QUALITY}?${qs(base)}&=1`, `${QUALITY}?${qs({ ...base, hurt: '%ZZ' })}`,
    `${QUALITY}?${qs({ ...base, hurt: '%C3' })}`, `${QUALITY}?${qs({ ...base, hurt: '5%00' })}`, `${QUALITY}?${qs(base)}&pad=${'x'.repeat(2048)}`,
    `${MOBILITY}`, `${MOBILITY}?level=severe`, `${MOBILITY}?level=Severe&handling=calm`, `${MOBILITY}?level=S&handling=A`,
    `${MOBILITY}?level=severe&handling=calm&level=severe`, `${MOBILITY}?level=severe&handling=calm&x=1`, `${MOBILITY}?level=severe&handling=calm+`,
    `${MOBILITY}?level=&handling=calm`, `${MOBILITY}?level=severe&handling=calm&corpus=${'a'.repeat(64)}`,
    '/api/agent/v1/tools/calidad%2Dvida', '/api/agent/v1/tools/movilidad%20',
  ];
  for (const path of invalid) {
    for (const method of ['GET', 'HEAD']) {
      const response = await h.request(path, { method });
      if (method === 'HEAD') { assertHeaders(response, 400); assert.equal(await response.text(), ''); }
      else await expectError(response, 400, 'INVALID_REQUEST', 'Invalid request.');
    }
  }
  assert.deepEqual(h.assetCalls, []);
});

test('rutas, métodos, OPTIONS y HEAD', async () => {
  const h = harness();
  for (const path of ['/api/agent/v1/tools', '/api/agent/v1/tools/', '/api/agent/v1/tools/otra', '/api/agent/v1/tools/calidad-vida/', '/api/agent/v1/tools/Movilidad', '/api/agent/v1/tools/movilidad/x']) {
    await expectError(await h.request(path), 404, 'ROUTE_NOT_FOUND', 'Unknown API route.');
  }
  for (const path of [QUALITY, MOBILITY]) {
    const options = await h.request(`${path}?anything=goes`, { method: 'OPTIONS' });
    assertHeaders(options, 204);
    assert.equal(await options.text(), '');
    for (const method of ['POST', 'PUT', 'DELETE', 'PATCH']) {
      await expectError(await h.request(`${path}?level=severe&handling=calm`, { method, body: method === 'DELETE' ? undefined : '{"level":"severe"}' }), 405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
    }
  }
  const get = await h.request(`${MOBILITY}?level=moderate&handling=calm`);
  const head = await h.request(`${MOBILITY}?level=moderate&handling=calm`, { method: 'HEAD' });
  assertHeaders(head, 200);
  assert.equal(await head.text(), '');
  assert.deepEqual([...head.headers.entries()], [...get.headers.entries()]);
  // Accept, condicionales y Range se ignoran.
  const conditional = await h.request(`${MOBILITY}?level=moderate&handling=calm`, { headers: { Accept: 'text/markdown', 'If-None-Match': '*', Range: 'bytes=0-1' } });
  assertHeaders(conditional, 200);
  assert.equal(await conditional.text(), await get.text());
  assert.deepEqual(h.assetCalls, []);
  assert.deepEqual(h.delegated, []);
});

test('F3 intacto: fuera del namespace se delega; rutas F3 no cambian de precedencia', async () => {
  const h = harness();
  assert.equal(await (await h.request('/herramientas/calculadora-calidad-vida-perros')).text(), 'delegated');
  await expectError(await h.request('/api/agent/v1/search'), 400, 'INVALID_REQUEST', 'Invalid request.');
  await expectError(await h.request('/api/agent/v1/unknown'), 404, 'ROUTE_NOT_FOUND', 'Unknown API route.');
});
