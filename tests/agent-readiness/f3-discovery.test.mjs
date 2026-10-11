import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { appendInterfaces, checkDiscoveryBuild, discoveryIntegration } from '../../scripts/agent-readiness/discovery.mjs';
import { createAgentContentWorker } from '../../src/lib/agent-content/runtime.ts';

// Node executes test files in separate processes. Keep this suite's discovery
// scratch directories out of the historical F1 cleanup test's shared /tmp view.
const originalTmpdir = process.env.TMPDIR;
const suiteScratch = await mkdtemp(join(tmpdir(), 'ctpv-f3-test-scratch-'));
process.env.TMPDIR = suiteScratch;
after(async () => {
  if (originalTmpdir === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = originalTmpdir;
  await rm(suiteScratch, { recursive: true, force: true });
});

// Literal contract oracle; neither the suffix nor headers are imported from the
// implementation. Fake assets below test existence gating, not artifact schemas.
const SUFFIX = '\n## Interfaces públicas de contenido\n\n'
  + '- [API Catalog](https://cuidatuperroviejo.com/.well-known/api-catalog): catálogo de operaciones públicas de lectura.\n'
  + '- [OpenAPI](https://cuidatuperroviejo.com/agent-api/v1/openapi.json): contrato de catálogo, búsqueda y lectura íntegra.\n'
  + '- [Skills](https://cuidatuperroviejo.com/.well-known/agent-skills/index.json): instrucciones verificables para buscar, leer y citar.\n'
  + '- [ARD](https://cuidatuperroviejo.com/.well-known/ard.json): capacidades públicas activas.\n';
const LINKS = [
  '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"',
  '<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"',
  '<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
];
const DESTINATIONS = ['agent-api/v1/query-index.json', 'agent-api/v1/openapi.json', '.well-known/api-catalog', '.well-known/agent-skills/index.json', '.well-known/agent-skills/buscar-leer-citar/SKILL.md', '.well-known/ard.json', '.well-known/ai-catalog.json'];

async function fixture(t) {
  const root = await mkdtemp(join(process.cwd(), 'tests/agent-readiness/.f3-discovery-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const assets = join(root, 'dist/client');
  const pillars = ['alimentacion-perros-senior', 'cuidados-paliativos-perros', 'herramientas', 'higiene-hogar-perros-senior', 'movilidad-dolor-perros-mayores', 'salud-mental-emocional-perros', 'salud-perros-mayores'];
  const articles = Array.from({ length: 16 }, (_, i) => `/${pillars[i % pillars.length]}/articulo-${i + 1}`);
  const paths = ['/', ...pillars.map((p) => '/' + p), ...articles, '/herramientas/calculadora-calidad-vida-perros', '/herramientas/selector-movilidad-perros-mayores', '/acerca-de', '/politica-editorial'];
  await mkdir(join(assets, 'api'), { recursive: true });
  await writeFile(join(assets, 'api/assistant-catalog.json'), JSON.stringify(articles.map((href, i) => ({ href, slug: `articulo-${i + 1}` }))));
  await writeFile(join(assets, 'sitemap.xml'), `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>https://cuidatuperroviejo.com${p}</loc></url>`).join('')}</urlset>`);
  for (const path of paths) {
    const target = join(assets, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
    await mkdir(join(target, '..'), { recursive: true });
    await writeFile(target, `<html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com${path}"><meta name="description" content="Descripción pública"></head><body><h1>Guía senior</h1></body></html>`);
  }
  for (const file of ['robots.txt', '_headers']) await writeFile(join(assets, file), await readFile(join('public', file)));
  for (const path of DESTINATIONS) {
    await mkdir(join(assets, path, '..'), { recursive: true });
    await writeFile(join(assets, path), 'fixture de destino\n');
  }
  const integration = discoveryIntegration();
  integration.hooks['astro:config:done']({ config: { build: { client: pathToFileURL(assets) } } });
  const generatePrefix = () => integration.hooks['astro:build:done']({ logger: { info() {} } });
  await generatePrefix();
  return { root, assets, generatePrefix, prefix: await readFile(join(assets, 'llms.txt')) };
}

test('F3 extends the exact generated F1 prefix once, with literal normative suffix; check is read-only', async (t) => {
  const { assets, prefix } = await fixture(t);
  await appendInterfaces(assets);
  const expected = Buffer.concat([prefix, Buffer.from(SUFFIX)]);
  assert.deepEqual(await readFile(join(assets, 'llms.txt')), expected);
  await appendInterfaces(assets);
  await checkDiscoveryBuild(assets);
  assert.deepEqual(await readFile(join(assets, 'llms.txt')), expected);
});

test('missing or empty targets fail before announcing; no fallback and no rewriting mutated prefixes', async (t) => {
  const { assets, prefix } = await fixture(t);
  const target = join(assets, DESTINATIONS[2]);
  await rm(target);
  await assert.rejects(appendInterfaces(assets), { code: 'ENOENT' });
  assert.deepEqual(await readFile(join(assets, 'llms.txt')), prefix);
  await writeFile(target, ''); await assert.rejects(appendInterfaces(assets), /ausente o vacío/u);
  await writeFile(target, 'fixture\n');
  const modified = Buffer.concat([prefix, Buffer.from('alteración\n')]);
  await writeFile(join(assets, 'llms.txt'), modified);
  await assert.rejects(appendInterfaces(assets), /Prefijo llms F1 alterado/u);
  assert.deepEqual(await readFile(join(assets, 'llms.txt')), modified);
  await writeFile(join(assets, 'llms.txt'), Buffer.concat([prefix, Buffer.from(SUFFIX + SUFFIX)]));
  await assert.rejects(appendInterfaces(assets), /sección F3 inválida/u);
  await assert.rejects(checkDiscoveryBuild(assets), /byteexactos/u);
});

test('F3 preserves the complete llms 64 KiB cap instead of truncating the F1 prefix', async (t) => {
  const { assets, prefix, generatePrefix } = await fixture(t);
  const home = join(assets, 'index.html');
  const html = await readFile(home, 'utf8');
  // Add ASCII bytes only to home description. The resulting F1 prefix fits,
  // while the additional interface section would cross the historical cap.
  const padding = 64 * 1024 - prefix.length - 1;
  await writeFile(home, html.replace('Descripción pública', 'Descripción pública' + 'x'.repeat(padding)));
  await rm(join(assets, 'llms.txt')); await generatePrefix();
  const before = await readFile(join(assets, 'llms.txt')); assert.equal(before.length, 64 * 1024 - 1);
  await assert.rejects(appendInterfaces(assets), /64 KiB/u);
  assert.deepEqual(await readFile(join(assets, 'llms.txt')), before);
});

test('discovery check rejects changed headers and policy without rewriting either', async (t) => {
  const { assets } = await fixture(t); await appendInterfaces(assets);
  const headers = await readFile(join(assets, '_headers'), 'utf8');
  assert.equal(headers.split(`Link: ${LINKS.join(', ')}`).length, 2);
  await writeFile(join(assets, '_headers'), headers.replace('application/linkset+json; profile=', 'application/json; profile='));
  await assert.rejects(checkDiscoveryBuild(assets), /_headers construido/u);
  await writeFile(join(assets, '_headers'), headers);
  await writeFile(join(assets, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  await assert.rejects(checkDiscoveryBuild(assets), /política aprobada/u);
});

test('F2 Link composition preserves foreign links and does not append duplicate F1/F3 values', async () => {
  const foreign = '<https://example.org/policy>; rel="license"';
  // Accepted static F2 fixture: exercise the actual shared header composer,
  // without changing negotiation or using API B as the expected-value oracle.
  for (const initial of [foreign, `${foreign}, ${LINKS[0]}`, `${foreign}, ${LINKS.join(', ')}`]) {
    const base = 'tests/agent-readiness/fixtures/f3/build/client';
    const index = JSON.parse(await readFile(join(base, 'agent-content/v1/index.json')));
    const doc = index.documents[0];
    const assets = { fetch: async (request) => new URL(request.url).pathname.endsWith('index.json')
      ? Response.json(index)
      : new Response(await readFile(join(base, doc.markdownPath)), { headers: { Link: initial, ETag: '"fixture-md"' } }) };
    const worker = createAgentContentWorker(async () => new Response('delegated'));
    const response = await worker(new Request(`https://cuidatuperroviejo.com${doc.canonicalPath}`, { headers: { Accept: 'text/markdown' } }), { ASSETS: assets }, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Link'), `${foreign}, ${LINKS.join(', ')}`);
  }
});
