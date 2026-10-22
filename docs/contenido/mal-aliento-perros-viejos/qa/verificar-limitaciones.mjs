import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const requireQA = createRequire(path.join(process.env.QA_NODE_MODULES || '/tmp/mal-aliento-browser/node_modules', '_qa.cjs'));
const { chromium } = requireQA('playwright-core');
const { AxeBuilder } = requireQA('@axe-core/playwright');
const baseURL = new URL(process.argv[2] || 'http://127.0.0.1:4321');
const output = 'docs/contenido/mal-aliento-perros-viejos/qa';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'], env: { ...process.env, XDG_CONFIG_HOME: '/tmp/mal-aliento-chromium-config', XDG_CACHE_HOME: '/tmp/mal-aliento-chromium-cache' } });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
await context.route('**/*', route => new URL(route.request().url()).origin === baseURL.origin ? route.continue() : route.abort('blockedbyclient'));
await context.addInitScript(() => localStorage.setItem('theme', 'light'));
const page = await context.newPage();
const results = { timestamp: new Date().toISOString(), chromium: browser.version(), scope: 'Referencias preexistentes del mismo build, sin modificar producto', references: [] };
for (const articlePath of ['/salud-perros-mayores/salud-dental-perros-mayores', '/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes']) {
  await page.goto(new URL(articlePath, baseURL).href, { waitUntil: 'networkidle' });
  const hero = await page.locator('article header img').first().evaluate(img => ({ src: img.getAttribute('src'), srcset: img.srcset }));
  const thumbnail = hero.src.replace(/\.webp$/, '-400.webp');
  const thumbResponse = await context.request.get(new URL(thumbnail, baseURL).href);
  const axe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  const feedback = axe.violations.flatMap(v => v.nodes).filter(n => n.html.includes('No del todo'));
  results.references.push({ articlePath, hero, thumbnail, thumbnailHTTP: thumbResponse.status(), feedback });
  if (results.references.length === 1) await page.getByRole('button', { name: 'No del todo' }).screenshot({ path: path.join(output, 'capturas', 'limitacion-feedback-preexistente.png') });
}
await browser.close();
await fs.writeFile(path.join(output, 'limitaciones-preexistentes.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results.references.map(r => ({ article: r.articlePath, thumbnailHTTP: r.thumbnailHTTP, heroSrcset: r.hero.srcset, feedbackFindings: r.feedback.length }))));
