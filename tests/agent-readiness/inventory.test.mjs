import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { inventory } from '../../scripts/agent-readiness/inventory.mjs';

async function fixtureBuild(t, files) {
  const root = await mkdtemp(join(process.cwd(), 'tests/agent-readiness/.inventory-fixture-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const assets = join(root, 'dist/client');
  for (const [path, content] of Object.entries(files)) {
    const absolute = join(assets, path);
    await mkdir(join(absolute, '..'), { recursive: true });
    await writeFile(absolute, content);
  }
  return assets;
}

const emptySitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
const catalog = '[]';
const pillarSlugs = [
  'alimentacion-perros-senior', 'cuidados-paliativos-perros', 'herramientas',
  'higiene-hogar-perros-senior', 'movilidad-dolor-perros-mayores',
  'salud-mental-emocional-perros', 'salud-perros-mayores',
];
const toolRoutes = [
  '/herramientas/calculadora-calidad-vida-perros',
  '/herramientas/selector-movilidad-perros-mayores',
];
const editorialRoutes = ['/acerca-de', '/politica-editorial'];

async function fullProjectionFixture(t, articleCount = 16, options = {}) {
  const articles = Array.from({ length: articleCount }, (_, index) => ({
    slug: `articulo-${String(index + 1).padStart(2, '0')}`,
    href: `/${pillarSlugs[index % pillarSlugs.length]}/articulo-${String(index + 1).padStart(2, '0')}`,
  }));
  const routes = [
    '/', ...pillarSlugs.map((slug) => `/${slug}`), ...articles.map((item) => item.href),
    ...toolRoutes, ...editorialRoutes,
  ];
  const files = {
    'sitemap.xml': `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>https://cuidatuperroviejo.com${path}</loc></url>`).join('')}</urlset>`,
    'api/assistant-catalog.json': JSON.stringify(options.catalog ?? articles),
  };
  for (const path of routes) {
    if (options.omitPath === path) continue;
    const htmlPath = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
    files[htmlPath] = `<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com${path}"><meta name="description" content="Descripción ${path}"></head><body><h1>Título ${path}</h1></body></html>`;
  }
  if (options.aliasPath) {
    const path = options.aliasPath;
    files[`${path.slice(1)}.html`] = `<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com${options.aliasCanonical}"><meta name="description" content="Alias"></head><body><h1>Alias</h1></body></html>`;
    files['sitemap.xml'] = files['sitemap.xml'].replace('</urlset>', `<url><loc>https://cuidatuperroviejo.com${options.aliasCanonical}</loc></url></urlset>`);
  }
  if (options.extraPath) {
    const path = options.extraPath;
    files[`${path.slice(1)}.html`] = `<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com${path}"><meta name="description" content="Desconocida"></head><body><h1>Desconocida</h1></body></html>`;
    files['sitemap.xml'] = files['sitemap.xml'].replace('</urlset>', `<url><loc>https://cuidatuperroviejo.com${path}</loc></url></urlset>`);
  }
  return { assets: await fixtureBuild(t, files), routes, articles };
}

test('inventory conserva tool/document sin canonical y devuelve DOCUMENT_TITLE_MISSING sin H1', async (t) => {
  const build = await fixtureBuild(t, {
    'index.html': '<!doctype html><html lang="es"><head><title>Inicio</title><meta name="description" content="Home"></head><body><h1>Inicio</h1></body></html>',
    'sitemap.xml': emptySitemap,
    'api/assistant-catalog.json': catalog,
    'herramientas/selector-movilidad-perros-mayores.html': '<!doctype html><html lang="es"><head><title>No usar como H1</title></head><body><main><h1>Selector de movilidad</h1></main></body></html>',
    'acerca-de.html': await readFile(join(process.cwd(), 'tests/agent-readiness/fixtures/editorial-sin-h1.html'), 'utf8'),
  });
  const out = join(await mkdtemp(join(tmpdir(), 'ctpv-inventory-out-')), 'run');
  t.after(() => rm(out.slice(0, out.lastIndexOf('/')), { recursive: true, force: true }));
  assert.equal(await inventory(join(build, '..', '..'), out), 3);
  const result = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
  assert.equal(result.state, 'invalid');
  const selector = result.pages.find((page) => page.htmlFile === 'herramientas/selector-movilidad-perros-mayores.html');
  assert.equal(selector.kind, 'tool');
  assert.equal(selector.disposition, 'document');
  assert.equal(selector.documentId, 'tool--movilidad');
  assert.equal(selector.canonicalUrl, null);
  assert.equal(selector.canonicalPath, null);
  assert.equal(selector.title, 'Selector de movilidad');
  assert.ok(result.errors.some((error) => error.code === 'CANONICAL_INVALID' && error.htmlFile === selector.htmlFile));
  const about = result.pages.find((page) => page.htmlFile === 'acerca-de.html');
  assert.equal(about.title, null);
  assert.ok(result.errors.some((error) => error.code === 'DOCUMENT_TITLE_MISSING' && error.htmlFile === 'acerca-de.html'));
});

test('inventory no sustituye canonical, no inventa clasificaciones y valida sitemap child local', async (t) => {
  const build = await fixtureBuild(t, {
    'index.html': '<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com/"><meta name="description" content="Home"></head><body><h1>Inicio</h1></body></html>',
    'sitemap-index.xml': '<?xml version="1.0"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://cuidatuperroviejo.com/sitemap-0.xml</loc></sitemap></sitemapindex>',
    'sitemap-0.xml': '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://cuidatuperroviejo.com/</loc></url></urlset>',
    'api/assistant-catalog.json': catalog,
    'unknown.html': '<!doctype html><html lang="es"><head><link rel="canonical" href="https://cuidatuperroviejo.com/unknown"><title>Unknown</title></head><body><h1>Unknown route</h1></body></html>',
  });
  const parent = await mkdtemp(join(tmpdir(), 'ctpv-inventory-out-'));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const out = join(parent, 'run');
  assert.equal(await inventory(join(build, '..', '..'), out), 3);
  const result = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
  assert.equal(result.assetDirectory.endsWith('/dist/client'), true);
  assert.equal(result.pages.find((page) => page.htmlFile === 'index.html').inSitemap, true);
  assert.ok(result.errors.some((error) => error.code === 'UNCLASSIFIED_PAGE' && error.htmlFile === 'unknown.html'));
});

test('inventory detecta canonical duplicado en páginas proyectadas', async (t) => {
  const canonical = '<link rel="canonical" href="https://cuidatuperroviejo.com/">';
  const build = await fixtureBuild(t, {
    'index.html': `<!doctype html><html lang="es"><head>${canonical}</head><body><h1>Inicio</h1></body></html>`,
    'alias.html': `<!doctype html><html lang="es"><head>${canonical}</head><body><h1>Alias</h1></body></html>`,
    'sitemap.xml': '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://cuidatuperroviejo.com/</loc></url></urlset>',
    'api/assistant-catalog.json': catalog,
  });
  const parent = await mkdtemp(join(tmpdir(), 'ctpv-inventory-out-'));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const out = join(parent, 'run');
  assert.equal(await inventory(join(build, '..', '..'), out), 3);
  const result = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
  assert.equal(result.state, 'invalid');
  assert.ok(result.errors.some((error) => error.code === 'CANONICAL_DUPLICATE' && error.htmlFile));
});

test('inventario deriva correspondencia exacta y admite crecimiento concordante 28 → 29', async (t) => {
  for (const articleCount of [16, 17]) {
    const { assets } = await fullProjectionFixture(t, articleCount);
    const parent = await mkdtemp(join(tmpdir(), 'ctpv-inventory-out-'));
    t.after(() => rm(parent, { recursive: true, force: true }));
    const out = join(parent, 'run');
    assert.equal(await inventory(join(assets, '..', '..'), out), 0);
    const result = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
    assert.equal(result.state, 'valid');
    assert.equal(result.pages.filter((page) => page.disposition === 'document').length, articleCount + 12);
  }
});

test('inventario rechaza documentos requeridos ausentes, IDs repetidos y rutas no clasificadas', async (t) => {
  const cases = [
    { name: 'home', options: { omitPath: '/' } },
    { name: 'pilar', options: { omitPath: '/salud-perros-mayores' } },
    { name: 'herramienta', options: { omitPath: toolRoutes[0] } },
    { name: 'editorial', options: { omitPath: editorialRoutes[0] } },
    { name: 'artículo', options: { omitPath: `/${pillarSlugs[0]}/articulo-01` } },
    { name: 'ID y canonical duplicados', options: { aliasPath: '/alias-pilar', aliasCanonical: '/salud-perros-mayores' } },
    { name: 'ruta sin clasificar', options: { extraPath: '/ruta-sin-clasificar' } },
  ];
  for (const { name, options } of cases) {
    const { assets } = await fullProjectionFixture(t, 16, options);
    const parent = await mkdtemp(join(tmpdir(), 'ctpv-inventory-out-'));
    t.after(() => rm(parent, { recursive: true, force: true }));
    const out = join(parent, 'run');
    assert.equal(await inventory(join(assets, '..', '..'), out), 3, name);
    const result = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
    assert.equal(result.state, 'invalid', name);
    if (name === 'ID y canonical duplicados') {
      assert.ok(result.errors.some((error) => error.code === 'DOCUMENT_ID_COLLISION'));
      assert.ok(result.errors.some((error) => error.code === 'CANONICAL_DUPLICATE'));
    }
  }
});
