import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { discoveryIntegration, runDiscoveryCheck, serializeLlms } from '../../scripts/agent-readiness/discovery.mjs';
import { inventory } from '../../scripts/agent-readiness/inventory.mjs';

const ORIGIN = 'https://cuidatuperroviejo.com';
const pillars = [
  'alimentacion-perros-senior', 'cuidados-paliativos-perros', 'herramientas',
  'higiene-hogar-perros-senior', 'movilidad-dolor-perros-mayores',
  'salud-mental-emocional-perros', 'salud-perros-mayores',
];
const paths = [
  '/', ...pillars.map((slug) => `/${slug}`),
  ...Array.from({ length: 16 }, (_, index) => `/${pillars[index % pillars.length]}/articulo-${String(index + 1).padStart(2, '0')}`),
  '/herramientas/calculadora-calidad-vida-perros', '/herramientas/selector-movilidad-perros-mayores',
  '/acerca-de', '/politica-editorial',
];

async function makeValidBuild(t) {
  const root = await mkdtemp(join(process.cwd(), 'tests/agent-readiness/.discovery-fixture-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const build = join(root, 'dist');
  const assets = join(build, 'client');
  const catalog = paths.filter((path) => path.includes('/articulo-')).map((href, index) => ({ slug: `articulo-${String(index + 1).padStart(2, '0')}`, href }));
  const sitemap = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${ORIGIN}${path}</loc></url>`).join('')}</urlset>`;
  await mkdir(join(assets, 'api'), { recursive: true });
  await writeFile(join(assets, 'api/assistant-catalog.json'), JSON.stringify(catalog));
  await writeFile(join(assets, 'sitemap.xml'), sitemap);
  for (const path of paths) {
    const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
    const title = path === '/' ? 'Hogar [senior]' : `Guía ${path}`;
    const description = path === '/' ? 'Descripción de home en español' : `Descripción de ${path} con [énfasis]`;
    const html = `<!doctype html><html lang="es"><head><link rel="canonical" href="${ORIGIN}${path}"><meta name="description" content="${description}"></head><body><h1>${title}</h1></body></html>`;
    const fullPath = join(assets, file);
    await mkdir(join(fullPath, '..'), { recursive: true });
    await writeFile(fullPath, html);
  }
  await writeFile(join(assets, 'robots.txt'), await readFile(join(process.cwd(), 'public/robots.txt')));
  await writeFile(join(assets, '_headers'), await readFile(join(process.cwd(), 'public/_headers')));
  const inventoryOut = join(root, 'inventory');
  assert.equal(await inventory(build, inventoryOut), 0);
  const inventoryData = JSON.parse(await readFile(join(inventoryOut, 'inventory.json'), 'utf8'));
  await writeFile(join(assets, 'llms.txt'), serializeLlms(inventoryData));
  return { root, build, assets, inventoryData };
}

function document(kind, path, title, description = `Descripción ${path}`) {
  return {
    kind, disposition: 'document', documentId: kind === 'home' ? 'home' : `${kind}-${path}`,
    canonicalPath: path, canonicalUrl: `${ORIGIN}${path}`, title, description,
  };
}

test('serialización llms es determinista, ordena canonicales y escapa Markdown', () => {
  const data = { state: 'valid', pages: [
    document('home', '/', 'Casa', 'Descripción principal'),
    document('pillar', '/z-tema', 'Z [tema]*', 'Descripción <final>'),
    document('pillar', '/a-tema', 'A _tema_', 'Guía (útil)'),
    document('tool', '/herramienta', 'Herramienta `útil`'),
    document('editorial', '/politica', 'Criterios & fuentes'),
  ] };
  const first = serializeLlms(data);
  assert.ok(first.equals(serializeLlms(data)));
  const text = first.toString('utf8');
  assert.ok(text.indexOf('/a-tema') < text.indexOf('/z-tema'));
  assert.ok(text.includes('Z \\[tema\\]\\*'));
  assert.ok(text.includes('Descripción \\<final\\>'));
  assert.ok(text.includes('Herramienta \\`útil\\`'));
  assert.match(text, /Búsqueda: permitida\. Uso como contexto de IA: permitido\. Entrenamiento de modelos: no permitido\./);
  assert.doesNotMatch(text, /sourceCommit|dirtySource|timestamp|api-catalog|service-desc/);
});

test('serialización rechaza inventario, descripción, canonical y tamaño inválidos', () => {
  const home = document('home', '/', 'Inicio');
  assert.throws(() => serializeLlms({ state: 'invalid', pages: [] }), /inventario/iu);
  assert.throws(() => serializeLlms({ state: 'valid', pages: [home, { ...document('pillar', '/tema', 'Tema'), description: ' \n ' }] }), /description/iu);
  assert.throws(() => serializeLlms({ state: 'valid', pages: [{ ...home, description: 'x', canonicalUrl: `${ORIGIN}/?q=1` }] }), /canonical/iu);
  assert.throws(() => serializeLlms({ state: 'valid', pages: [{ ...home, description: 'á'.repeat(33000) }] }), /64 KiB/iu);
});

test('check CLI verifica bytes sin reescribir y rechaza artefactos o flags inválidos', async (t) => {
  const { build, assets } = await makeValidBuild(t);
  const before = await readFile(join(assets, 'llms.txt'));
  assert.equal(await runDiscoveryCheck(['check', '--build-dir', build]), 0);
  assert.ok((await readFile(join(assets, 'llms.txt'))).equals(before));
  assert.equal(await runDiscoveryCheck(['check', '--build-dir', build, '--build-dir', build]), 3);
  await writeFile(join(assets, 'llms.txt'), Buffer.concat([before, Buffer.from('editado') ]));
  assert.equal(await runDiscoveryCheck(['check', '--build-dir', build]), 3);
  await rm(join(assets, 'llms.txt'));
  assert.equal(await runDiscoveryCheck(['check', '--build-dir', build]), 1);
});

test('hook real falla sin sitemap, no escribe llms y limpia su scratch', async (t) => {
  const root = await mkdtemp(join(process.cwd(), 'tests/agent-readiness/.discovery-negative-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const assets = join(root, 'dist/client');
  await mkdir(join(assets, 'api'), { recursive: true });
  await writeFile(join(assets, 'index.html'), '<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com/"><meta name="description" content="Home"></head><body><h1>Home</h1></body></html>');
  await writeFile(join(assets, 'api/assistant-catalog.json'), '[]');
  const before = (await readdir(tmpdir())).filter((name) => name.startsWith('ctpv-f1-discovery-')).sort();
  const integration = discoveryIntegration();
  integration.hooks['astro:config:done']({ config: { build: { client: pathToFileURL(assets) } } });
  await assert.rejects(integration.hooks['astro:build:done']({ logger: { info() {} } }), /inventario inválido/iu);
  await assert.rejects(readFile(join(assets, 'llms.txt')), { code: 'ENOENT' });
  const after = (await readdir(tmpdir())).filter((name) => name.startsWith('ctpv-f1-discovery-')).sort();
  assert.deepEqual(after, before);
});
