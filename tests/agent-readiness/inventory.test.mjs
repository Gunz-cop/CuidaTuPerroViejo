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
