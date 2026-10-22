import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const requireQA = createRequire(path.join(process.env.QA_NODE_MODULES || '/tmp/mal-aliento-browser/node_modules', '_qa.cjs'));
const { chromium } = requireQA('playwright-core');
const { AxeBuilder } = requireQA('@axe-core/playwright');
const readPackageVersion = async name => JSON.parse(await fs.readFile(path.join(process.env.QA_NODE_MODULES || '/tmp/mal-aliento-browser/node_modules', name, 'package.json'), 'utf8')).version;
const runtimeVersions = { node: process.version, playwright: await readPackageVersion('playwright-core'), axePlaywright: await readPackageVersion('@axe-core/playwright'), axeCore: await readPackageVersion('axe-core') };
const baseURL = new URL(process.argv[2] || 'http://127.0.0.1:4321');
const articlePath = '/salud-perros-mayores/mal-aliento-perros-viejos';
const targetURL = new URL(articlePath, baseURL).href;
const output = path.resolve('docs/contenido/mal-aliento-perros-viejos/qa');
const resourceSelector = '[data-editorial-visual]';
const sequenceSelector = '[data-halitosis-sequence]';
const recordSelector = '[data-halitosis-registro]';
const report = { timestamp: new Date().toISOString(), targetURL, scope: 'Verificación local; no auditoría editorial', externalRequestsBlocked: true, runtimeVersions, versions: {}, views: [], checks: [], consoleErrors: [], failedLocalRequests: [] };
await fs.mkdir(path.join(output, 'capturas'), { recursive: true });
const sha = async file => crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
for (const file of ['briefings/briefing-mal-aliento-perros-viejos.md', 'src/content/blog/mal-aliento-perros-viejos.mdx', 'src/components/article/HalitosisRecursos.astro', 'src/components/article/TablaApilable.astro']) {
  try { report.versions[file] = await sha(file); } catch { report.versions[file] = 'ausente'; }
}
try {
  const imageFolder = 'public/images/blog/mal-aliento-perros-viejos';
  for (const name of await fs.readdir(imageFolder)) { const file = path.join(imageFolder, name); report.versions[file] = await sha(file); }
} catch { report.versions.images = 'carpeta ausente'; }
const browser = await chromium.launch({ executablePath: process.env.QA_CHROMIUM || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'], env: { ...process.env, XDG_CACHE_HOME: '/tmp/mal-aliento-chromium-cache', XDG_CONFIG_HOME: '/tmp/mal-aliento-chromium-config' } });
report.runtimeVersions.chromium = browser.version();
async function contextFor({ width = 390, mode = 'light', javaScriptEnabled = true, reducedMotion = 'no-preference' } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, colorScheme: mode, reducedMotion, javaScriptEnabled, deviceScaleFactor: 1 });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (['data:', 'blob:'].includes(url.protocol) || url.origin === baseURL.origin) return route.continue();
    return route.abort('blockedbyclient');
  });
  await context.addInitScript(theme => localStorage.setItem('theme', theme), mode);
  const page = await context.newPage();
  page.on('pageerror', e => report.consoleErrors.push(e.message));
  page.on('requestfailed', r => { if (r.url().startsWith(baseURL.origin)) report.failedLocalRequests.push({ url: r.url(), failure: r.failure()?.errorText }); });
  const response = await page.goto(targetURL, { waitUntil: 'networkidle' });
  if (response.status() !== 200) throw new Error(`Artículo HTTP ${response.status()}`);
  if (!javaScriptEnabled) await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), mode);
  return { context, page };
}
async function check(name, fn) {
  try { const detail = await fn(); report.checks.push({ name, pass: true, detail }); }
  catch (e) { report.checks.push({ name, pass: false, error: e.message }); }
}
function assert(condition, message) { if (!condition) throw new Error(message); }
async function imageInfo(page) {
  for (const img of await page.locator('article img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(async img => { if (img.loading === 'lazy') img.loading = 'eager'; await img.decode(); });
  }
  return page.locator('article img').evaluateAll(images => images.map(img => ({ src: img.getAttribute('src'), currentSrc: img.currentSrc, srcset: img.srcset, alt: img.alt, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, displayedWidth: img.getBoundingClientRect().width, complete: img.complete })));
}
async function contrastInfo(page) {
  return page.locator(resourceSelector).evaluateAll(roots => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1; const cx = canvas.getContext('2d', { willReadFrequently: true });
    function rgba(color) { cx.clearRect(0, 0, 1, 1); cx.fillStyle = color; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data]; }
    function over(top, bottom) { const a = top[3] / 255; return [0, 1, 2].map(i => top[i] * a + bottom[i] * (1 - a)).concat(255); }
    function background(el) {
      const chain = []; for (let node = el; node; node = node.parentElement) chain.push(node);
      let bg = [255, 255, 255, 255];
      chain.reverse().forEach(node => { bg = over(rgba(getComputedStyle(node).backgroundColor), bg); });
      const svg = el.closest('svg');
      if (svg) { const firstRect = svg.querySelector('rect'); if (firstRect) { const fill = getComputedStyle(firstRect).fill; if (!fill.startsWith('url(')) bg = over(rgba(fill), bg); } }
      return bg;
    }
    function luminance(rgb) { const linear = rgb.slice(0, 3).map(n => { const x = n / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]; }
    const rows = [];
    for (const [index, root] of roots.entries()) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let text;
      while ((text = walker.nextNode())) {
        if (!text.textContent.trim()) continue;
        const el = text.parentElement;
        if (el.closest('script,style,title,desc,[aria-hidden="true"]')) continue;
        if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
        const rect = el.getBoundingClientRect(); if (!rect.width || !rect.height) continue;
        const range = document.createRange(); range.selectNodeContents(text); if (!range.getBoundingClientRect().width) continue;
        const cs = getComputedStyle(el); const bg = background(el); const fg = over(rgba(el.closest('svg') ? cs.fill : cs.color), bg); const l1 = luminance(fg), l2 = luminance(bg); const ratio = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
        rows.push({ resource: index, element: el.tagName, text: text.textContent.trim().slice(0, 95), color: cs.color, background: bg.slice(0, 3).map(Math.round), ratio: +ratio.toFixed(2), fontSize: cs.fontSize, fontWeight: cs.fontWeight, disabled: el.closest('button')?.disabled || false });
      }
    }
    return rows;
  });
}
try {
  for (const width of [375, 390, 1366]) for (const mode of ['light', 'dark']) {
    const { context, page } = await contextFor({ width, mode });
    const key = `${width}-${mode}`;
    const view = { key, width, mode, resources: [] }; report.views.push(view);
    await check(`${key}: documento sin desbordamiento`, async () => {
      const sizes = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, dark: document.documentElement.classList.contains('dark') }));
      assert(sizes.viewport === sizes.scrollWidth, JSON.stringify(sizes)); assert(sizes.dark === (mode === 'dark'), 'Tema incorrecto'); return sizes;
    });
    await check(`${key}: imágenes decodificadas`, async () => { const images = await imageInfo(page); assert(images.length >= 3, `Solo ${images.length} imágenes`); assert(images.every(i => i.naturalWidth > 0 && i.alt), 'Imagen ausente o sin alt'); view.images = images; return images; });
    await check(`${key}: desplegables cerrados`, async () => { const open = await page.locator('article details[open]').count(); assert(open === 0, `${open} abiertos`); return { open }; });
    const resources = page.locator(resourceSelector); const count = await resources.count();
    await check(`${key}: existen apoyos visuales`, () => assert(count > 0, 'Sin data-editorial-visual'));
    for (let i = 0; i < count; i++) {
      const resource = resources.nth(i); await resource.scrollIntoViewIfNeeded();
      const bounds = await resource.boundingBox(); view.resources.push({ index: i, ...bounds });
      await check(`${key}: recurso ${i} cómodo`, () => { assert(bounds.width <= width, `ancho ${bounds.width}`); if (width <= 390) assert(bounds.height <= 900, `altura ${bounds.height.toFixed(1)}px >900px`); return bounds; });
      if (width !== 375) await resource.screenshot({ path: path.join(output, 'capturas', `${key}-recurso-${i}.png`) });
    }
    view.contrast = await contrastInfo(page);
    await check(`${key}: contraste recursos`, () => { const low = view.contrast.filter(r => r.ratio < 4.5 && !r.disabled); assert(!low.length, JSON.stringify(low)); return { minimum: Math.min(...view.contrast.filter(r => !r.disabled).map(r => r.ratio)), samples: view.contrast.length }; });
    await check(`${key}: objetivos táctiles recursos`, async () => {
      const controls = await resources.locator('button,summary').evaluateAll(els => els.filter(el => el.checkVisibility()).map(el => ({ text: el.textContent.trim().slice(0, 70), ...Object.fromEntries(['width', 'height'].map(k => [k, el.getBoundingClientRect()[k]])) })));
      assert(controls.every(c => c.width >= 44 && c.height >= 44), JSON.stringify(controls.filter(c => c.width < 44 || c.height < 44))); return controls;
    });
    if (width === 390 || width === 1366) {
      view.sequenceStates = [];
      const sequenceRoot = page.locator(sequenceSelector);
      if (await sequenceRoot.count() === 1) {
        const numberOfSteps = await sequenceRoot.locator('[data-panel]').count();
        for (let stepIndex = 0; stepIndex < numberOfSteps; stepIndex++) {
          if (stepIndex) await sequenceRoot.locator('[data-action="next"]').click();
          await page.waitForTimeout(1300);
          const state = await sequenceRoot.evaluate(el => {
            const resource = el.closest('[data-editorial-visual]');
            const drawing = el.querySelector('svg');
            const controls = el.querySelector('[data-action="play"]')?.parentElement;
            const panel = el.querySelector('[data-panel][data-active="true"]');
            const box = node => { if (!node) return null; const r = node.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
            return { step: el.dataset.step, resource: box(resource), drawing: box(drawing), controls: box(controls), activePanel: box(panel) };
          });
          view.sequenceStates.push(state);
          await check(`${key}: secuencia paso ${stepIndex + 1} compacto`, () => {
            assert(state.step === String(stepIndex), `Paso inesperado ${state.step}`);
            if (width === 390) {
              assert(state.resource.height <= 900, `Recurso alto ${state.resource.height}`);
              if (state.drawing && state.controls && state.activePanel) {
                const span = Math.max(state.drawing.bottom, state.controls.bottom, state.activePanel.bottom) - Math.min(state.drawing.top, state.controls.top, state.activePanel.top);
                assert(span <= 844, `Gráfico, controles y texto ocupan ${span}px`);
                assert(state.controls.top >= state.drawing.bottom - 2 && state.controls.top - state.drawing.bottom <= 160, 'Controles alejados del gráfico');
              }
            }
            return state;
          });
          await sequenceRoot.locator('xpath=ancestor-or-self::*[@data-editorial-visual][1]').screenshot({ path: path.join(output, 'capturas', `${key}-proceso-paso-${stepIndex + 1}.png`) });
        }
        for (let i = 1; i < numberOfSteps; i++) await sequenceRoot.locator('[data-action="prev"]').click();
      }
      await resources.locator('details').evaluateAll(els => els.forEach(el => el.open = true));
      view.openDetailsContrast = await contrastInfo(page);
      await check(`${key}: contraste desplegables abiertos`, () => { const low = view.openDetailsContrast.filter(r => r.ratio < 4.5 && !r.disabled); assert(!low.length, JSON.stringify(low)); return { minimum: Math.min(...view.openDetailsContrast.filter(r => !r.disabled).map(r => r.ratio)), samples: view.openDetailsContrast.length }; });
      await resources.locator('details').evaluateAll(els => els.forEach(el => el.open = false));
      await page.evaluate(() => scrollTo(0, 0)); await page.screenshot({ path: path.join(output, 'capturas', `${key}-pagina.png`), fullPage: true });
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      view.axe = { violations: axe.violations, incomplete: axe.incomplete.map(x => ({ id: x.id, impact: x.impact, nodes: x.nodes.length })), passes: axe.passes.length };
      await check(`${key}: axe recursos`, () => { const violations = axe.violations.filter(v => v.nodes.some(n => n.target.some(t => /halitosis|mal-aliento|editorial-visual|tabla-apilable/i.test(t)))); assert(!violations.length, JSON.stringify(violations)); return { allPageViolations: axe.violations.length, resourceViolations: violations.length }; });
    }
    if (width === 390 && mode === 'light') {
      await check('Nueve archivos de imágenes: HTTP, formato y decodificación', async () => {
        const files = Object.keys(report.versions).filter(file => file.startsWith('public/images/'));
        assert(files.length === 9, `Archivos esperados 9; encontrados ${files.length}`);
        const decoded = [];
        for (const file of files) {
          const url = new URL(file.replace(/^public/, ''), baseURL).href;
          const response = await context.request.get(url);
          assert(response.status() === 200 && response.headers()['content-type']?.includes('image/webp'), `${url}: HTTP/formato incorrectos`);
          const dimensions = await page.evaluate(async src => { const image = new Image(); image.src = src; await image.decode(); return { width: image.naturalWidth, height: image.naturalHeight }; }, url);
          assert(dimensions.width > 0 && dimensions.height > 0, `Sin decodificar ${url}`);
          decoded.push({ file, status: response.status(), contentType: response.headers()['content-type'], ...dimensions });
        }
        return decoded;
      });
      const anchors = await page.locator('article a[href]').evaluateAll(els => [...new Set(els.map(el => el.getAttribute('href')))]);
      view.links = [];
      for (const href of anchors) {
        const destination = new URL(href, targetURL);
        if (destination.origin !== baseURL.origin) continue;
        if (destination.pathname === articlePath && destination.hash) {
          const exists = await page.evaluate(id => Boolean(document.getElementById(id)), decodeURIComponent(destination.hash.slice(1))); view.links.push({ href, exists });
        } else { const response = await context.request.get(destination.href); view.links.push({ href, status: response.status(), contentType: response.headers()['content-type'] }); }
      }
      await check('Enlaces locales y anclas', () => { assert(view.links.every(x => x.exists !== false && (!x.status || x.status === 200)), JSON.stringify(view.links)); return view.links; });
    }
    await context.close();
  }
  const { context, page } = await contextFor();
  const sequence = page.locator(sequenceSelector);
  await check('Secuencia presente', async () => { assert(await sequence.count() === 1, `Secuencias: ${await sequence.count()}`); });
  if (await sequence.count() === 1) {
    const step = () => sequence.getAttribute('data-step'); const playing = () => sequence.getAttribute('data-playing');
    const panels = sequence.locator('[data-panel]'); const n = await panels.count();
    const next = sequence.locator('[data-action="next"]'); const previous = sequence.locator('[data-action="prev"]'); const play = sequence.locator('[data-action="play"]');
    await page.clock.install();
    await check('Sin autoplay al cargar', async () => { const initial = await step(); await page.clock.fastForward(20000); assert(await step() === initial && await playing() !== 'true', 'Avance sin acción'); return { step: initial }; });
    await check('Teclado siguiente/anterior y foco', async () => {
      await next.focus(); await page.keyboard.press('Enter'); assert(await step() === '1', `Paso ${await step()}`);
      await previous.focus(); const focus = await previous.evaluate(el => ({ matches: el.matches(':focus-visible'), outline: getComputedStyle(el).outlineStyle, outlineWidth: getComputedStyle(el).outlineWidth })); await page.keyboard.press('Space'); assert(await step() === '0', `Paso ${await step()}`); assert(focus.matches && focus.outline !== 'none', JSON.stringify(focus)); return focus;
    });
    await check('Pausa detiene avance y movimiento', async () => {
      await play.click(); assert(await playing() === 'true', 'No reproduce'); await page.clock.fastForward(7000); await play.click(); const paused = await step(); await page.clock.fastForward(25000); assert(await step() === paused && await playing() === 'false', 'La pausa avanza'); const animations = await sequence.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length); assert(animations === 0, `${animations} animaciones activas en pausa`); return { step: paused, animations };
    });
    await check('Reproducción finita y repetición', async () => {
      await play.click(); for (let i = 0; i < n + 1; i++) await page.clock.fastForward(7000); assert(await step() === String(n - 1) && await playing() === 'false', `No termina: ${await step()}/${await playing()}`);
      const restart = sequence.locator('[data-action="restart"]'); if (await restart.count()) await restart.click(); else await play.click(); assert(await step() === '0', 'Repetir no vuelve al inicio'); if (await playing() === 'true') await play.click(); return { panels: n, reset: await step() };
    });
    await check('Limpieza al ocultar (evento simulado)', async () => {
      await play.click(); await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); }); const before = await step(); await page.clock.fastForward(20000); assert(await playing() === 'false' && await step() === before, 'No suspende al ocultar'); await page.evaluate(() => delete document.hidden); return { method: 'document.hidden y visibilitychange simulados', stableStep: before };
    });
    await check('Inicialización repetida no duplica manejadores', async () => {
      await page.evaluate(() => { document.dispatchEvent(new Event('astro:page-load')); document.dispatchEvent(new Event('astro:page-load')); });
      const before = Number(await step());
      if (before === n - 1) await previous.click();
      const initial = Number(await step()); await next.click(); assert(Number(await step()) === initial + 1, 'Un clic avanza más de un paso'); return { initial, afterOneClick: await step() };
    });
    await check('Impresión con JavaScript muestra pasos', async () => { await page.emulateMedia({ media: 'print' }); const visible = await panels.evaluateAll(els => els.map(el => el.checkVisibility())); assert(visible.every(Boolean), JSON.stringify(visible)); await page.screenshot({ path: path.join(output, 'capturas', '390-impresion-js.png'), fullPage: true }); await page.emulateMedia({ media: 'screen' }); return visible; });
    await check('Limpieza antes de navegar (evento Astro)', async () => {
      await play.click(); await page.evaluate(() => document.dispatchEvent(new Event('astro:before-swap'))); const before = await step(); await page.clock.fastForward(20000); assert(await playing() === 'false' && await step() === before, 'Temporizador activo al desmontar'); return { method: 'astro:before-swap simulado', stableStep: before };
    });
  }
  await page.evaluate(() => document.dispatchEvent(new Event('astro:page-load')));
  await check('Registro editable: ocho campos, impresión y conservación de valores', async () => {
    const root = page.locator(recordSelector); assert(await root.count() === 1, 'Registro no encontrado');
    const details = root.locator('details').first(); const initiallyOpen = await details.getAttribute('open'); assert(initiallyOpen === null, 'Registro abierto inicialmente');
    await details.locator('summary').click(); const fields = root.locator('input,textarea'); assert(await fields.count() === 8, `Campos ${await fields.count()} !=8`);
    const values = []; for (let i = 0; i < 8; i++) { const value = `Dato de prueba ${i + 1}: observación anotada`; await fields.nth(i).fill(value); values.push(value); }
    const labels = await fields.evaluateAll(els => els.map(el => ({ id: el.id, labels: [...(el.labels || [])].map(x => x.textContent.trim()), value: el.value })));
    assert(labels.every(f => f.labels.length && f.value), 'Campo sin etiqueta o valor');
    await details.locator('summary').click();
    const detailStatesBefore = await root.locator('details').evaluateAll(els => els.map(el => el.open));
    await page.evaluate(() => window.dispatchEvent(new Event('beforeprint'))); await page.emulateMedia({ media: 'print' });
    const defaultPrint = await root.evaluate((el, expected) => ({ values: expected.map(value => ({ value, visible: [...el.querySelectorAll('.halitosis-print-value')].some(node => node.checkVisibility() && node.textContent === value) })), labels: [...el.querySelectorAll('label')].map(label => ({ text: label.textContent, visible: label.checkVisibility() })) }), values);
    assert(defaultPrint.values.every(x => x.visible) && defaultPrint.labels.every(x => x.visible), JSON.stringify(defaultPrint));
    assert(await page.locator('article h1').isVisible(), 'Impresión general oculta artículo');
    const defaultPanels = await page.locator(`${sequenceSelector} [data-panel]`).evaluateAll(els => els.map(el => el.checkVisibility())); assert(defaultPanels.every(Boolean), 'Impresión general oculta pasos');
    await root.locator('xpath=ancestor::*[@data-editorial-visual][1]').screenshot({ path: path.join(output, 'capturas', '390-registro-impresion-general-js.png') });
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint'))); await page.emulateMedia({ media: 'screen' });
    const restoredDefault = await root.locator('details').evaluateAll(els => els.map(el => el.open)); assert(JSON.stringify(restoredDefault) === JSON.stringify(detailStatesBefore), 'Impresión general no restaura plegado');
    await page.evaluate(() => { window.print = () => window.dispatchEvent(new Event('beforeprint')); });
    const printButton = root.locator('[data-action="print"]'); assert(await printButton.count() === 1, 'Botón imprimir ausente'); await printButton.click(); await page.emulateMedia({ media: 'print' });
    const printed = await page.evaluate(expected => {
      const visibleText = document.body.innerText;
      const visibleFields = [...document.querySelectorAll('input,textarea')].filter(el => el.checkVisibility()).map(el => el.value);
      return expected.map(value => ({ value, visible: visibleText.includes(value) || visibleFields.includes(value) }));
    }, values);
    assert(printed.every(x => x.visible), JSON.stringify(printed));
    assert(await page.locator('.halitosis-record-print-copy').isVisible(), 'No hay copia aislada del registro');
    assert(!await page.locator('article h1').isVisible(), 'Imprimir registro incluye artículo');
    await page.screenshot({ path: path.join(output, 'capturas', '390-registro-impresion-js.png'), fullPage: true });
    await page.pdf({ path: path.join(output, 'capturas', 'registro-prueba-js.pdf'), format: 'A4', printBackground: true });
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint'))); await page.emulateMedia({ media: 'screen' });
    const detailStatesAfter = await root.locator('details').evaluateAll(els => els.map(el => el.open));
    assert(JSON.stringify(detailStatesBefore) === JSON.stringify(detailStatesAfter), 'No restaura plegado tras imprimir');
    const restored = await fields.evaluateAll(els => els.map(el => el.value)); assert(JSON.stringify(restored) === JSON.stringify(values), 'Valores perdidos al imprimir');
    return { labels, defaultPrint, defaultPanels, restoredDefault, printed, detailStatesBefore, detailStatesAfter, valuesPreserved: true, isolatedRecordOnly: true };
  });
  await context.close();
  const reduced = await contextFor({ reducedMotion: 'reduce', mode: 'dark' });
  await check('Movimiento reducido con recorrido manual', async () => {
    const root = reduced.page.locator(sequenceSelector); const play = root.locator('[data-action="play"]'); assert(await play.isDisabled(), 'Reproducción habilitada en reduce'); await root.locator('[data-action="next"]').click(); assert(await root.getAttribute('data-step') === '1', 'Recorrido manual falla');
    const active = await root.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length); assert(!active, `${active} animaciones activas`); await root.screenshot({ path: path.join(output, 'capturas', '390-dark-reduced.png') }); return { step: '1', animations: active };
  });
  await reduced.context.close();
  for (const mode of ['light', 'dark']) {
    const fallback = await contextFor({ javaScriptEnabled: false, mode }); const panels = fallback.page.locator(`${sequenceSelector} [data-panel]`);
    await check(`Sin JavaScript ${mode}: pasos y controles`, async () => { const visible = await panels.evaluateAll(els => els.map(el => el.checkVisibility())); assert(visible.length >= 3 && visible.every(Boolean), JSON.stringify(visible)); const buttons = await fallback.page.locator(`${sequenceSelector} button`).evaluateAll(els => els.filter(el => el.checkVisibility()).length); assert(buttons === 0, `${buttons} controles inertes visibles`); await fallback.page.locator(sequenceSelector).screenshot({ path: path.join(output, 'capturas', `390-${mode}-sin-js.png`) }); return { visibleSteps: visible.length, visibleButtons: buttons }; });
    await check(`Impresión sin JavaScript ${mode}`, async () => { await fallback.page.emulateMedia({ media: 'print' }); const visible = await panels.evaluateAll(els => els.map(el => el.checkVisibility())); assert(visible.every(Boolean), JSON.stringify(visible)); return visible; });
    await check(`Registro sin JavaScript ${mode}: valores imprimibles`, async () => {
      await fallback.page.emulateMedia({ media: 'screen' }); const root = fallback.page.locator(recordSelector); const details = root.locator('details').first();
      await details.locator('summary').click(); const fields = root.locator('input,textarea'); assert(await fields.count() === 8, 'No hay ocho campos sin JS');
      const values = []; for (let i = 0; i < 8; i++) { const value = `Sin JS campo ${i + 1}`; await fields.nth(i).fill(value); values.push(value); }
      await details.locator('summary').click(); await fallback.page.emulateMedia({ media: 'print' });
      const printable = await fields.evaluateAll(els => els.map(el => ({ value: el.value, visible: el.checkVisibility(), labelVisible: [...el.labels].some(label => label.checkVisibility()) })));
      assert(printable.every(f => f.visible && f.labelVisible && f.value), JSON.stringify(printable));
      await fallback.page.screenshot({ path: path.join(output, 'capturas', `390-${mode}-registro-impresion-sin-js.png`), fullPage: true });
      return printable;
    });
    await fallback.context.close();
  }
} catch (e) { report.fatalError = e.stack; }
finally {
  await browser.close();
  report.summary = { passed: report.checks.filter(x => x.pass).length, failed: report.checks.filter(x => !x.pass).length, fatal: Boolean(report.fatalError) };
  await fs.writeFile(path.join(output, 'navegador.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.summary));
  if (report.summary.failed || report.summary.fatal) process.exitCode = 1;
}
