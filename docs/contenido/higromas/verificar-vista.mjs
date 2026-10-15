import { writeFile } from 'node:fs/promises';
import { launchChrome, openPage } from '../../../scripts/agent-readiness/cdp.mjs';

const origin = 'http://127.0.0.1:4173';
const path = '/higiene-hogar-perros-senior/callosidades-higromas-codos-perros-senior.html';
const browser = await launchChrome('/usr/bin/chromium');
const result = { checkedAt: new Date().toISOString(), assertions: [] };
const check = (name, passed, details) => result.assertions.push({ name, passed: Boolean(passed), details });
try {
  const page = await openPage(browser, { allowOrigin: origin });
  const exceptions = [];
  page.on('Runtime.exceptionThrown', ({ exceptionDetails }) => exceptions.push(exceptionDetails.text));
  await page.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.goto(origin + path);
  await page.evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  await page.evaluate(`Promise.all([...document.querySelectorAll('article img')].map(async img => { img.loading = 'eager'; await img.decode().catch(() => {}); }))`);
  result.initial = await page.evaluate(`(() => {
    const widgets = [...document.querySelectorAll('[data-higroma-animation]')];
    return { widgets: widgets.map(el => ({ variant: el.dataset.variant, playing: el.dataset.playing, pressed: el.querySelector('button').getAttribute('aria-pressed'), controlsHidden: el.querySelector('.controls').hidden })), images: [...document.querySelectorAll('article img')].map(el => ({ src: new URL(el.src).pathname, alt: el.alt, complete: el.complete && el.naturalWidth > 0, width: el.naturalWidth, height: el.naturalHeight })), h1: document.querySelectorAll('h1').length };
  })()`);
  check('Tres variantes únicas; sin reproducción automática', result.initial.widgets.length === 3 && new Set(result.initial.widgets.map(w => w.variant)).size === 3 && result.initial.widgets.every(w => w.playing === 'false' && w.pressed === 'false' && !w.controlsHidden), result.initial.widgets);
  check('Hero, dos fotos y una infografía cargan', result.initial.images.filter(i => i.src.includes('callosidades-higromas')).length === 4 && result.initial.images.filter(i => i.src.includes('callosidades-higromas')).every(i => i.complete && i.alt), result.initial.images);
  check('Un único H1', result.initial.h1 === 1, result.initial.h1);
  result.playback = await page.evaluate(`(() => [...document.querySelectorAll('[data-higroma-animation]')].map(el => {
    const button = el.querySelector('button'); button.click();
    const running = el.dataset.playing === 'true' && button.getAttribute('aria-pressed') === 'true' && getComputedStyle(el.querySelector('.bounce, .step-ring')).animationPlayState === 'running';
    button.click();
    return { variant: el.dataset.variant, running, paused: el.dataset.playing === 'false' && button.getAttribute('aria-pressed') === 'false' && getComputedStyle(el.querySelector('.bounce, .step-ring')).animationPlayState === 'paused' };
  }))()`);
  check('Las tres animaciones reproducen y pausan', result.playback.every(w => w.running && w.paused), result.playback);
  result.wordCount = await page.evaluate(`(() => {
    const original = document.querySelector('.content-body'); const clone = original.cloneNode(true);
    clone.querySelectorAll('script,style,.ad-slot,[data-ad-pending]').forEach(el => el.remove());
    clone.querySelectorAll('aside').forEach(el => { if(el.querySelector('h3')?.textContent.includes('Fuentes científicas y de autoridad')) el.remove(); });
    const svgLabels = [...clone.querySelectorAll('svg text')].map(el => el.textContent).join(' ');
    clone.querySelectorAll('svg').forEach(el => el.remove());
    clone.querySelectorAll('details').forEach(el => el.open = true);
    clone.style.cssText = 'position:absolute;left:-10000px;top:0;width:800px'; document.body.append(clone);
    const text = clone.innerText; const count = s => s.trim().split(/\\s+/u).filter(Boolean).length;
    const output = { articleAndComponents: count(text + ' ' + svgLabels), excludes: ['frontmatter','imports','alt','bibliography','hidden SVG titles/descriptions'], includes: ['H2/H3','FAQ answers opened','animation explanations','SVG visible labels','animation controls'], svgLabels: count(svgLabels) };
    clone.remove(); return output;
  })()`);
  check('Contenido renderizado entre 6000 y 6500 palabras', result.wordCount.articleAndComponents >= 6000 && result.wordCount.articleAndComponents <= 6500, result.wordCount);
  await page.evaluate("document.querySelector('[data-higroma-animation] button').click()");
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  result.reduced = await page.evaluate(`(() => [...document.querySelectorAll('[data-higroma-animation]')].map(el => ({ variant: el.dataset.variant, playing: el.dataset.playing, disabled: el.querySelector('button').disabled, animationName: getComputedStyle(el.querySelector('.bounce, .step-ring')).animationName })))()`);
  check('Movimiento reducido detiene y desactiva las tres animaciones', result.reduced.every(w => w.disabled && w.playing === 'false' && w.animationName === 'none'), result.reduced);
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  for (const width of [375, 1280]) {
    await page.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    const layout = await page.evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, widgets: [...document.querySelectorAll('[data-higroma-animation]')].map(el => ({width:el.getBoundingClientRect().width, controlsWidth:el.querySelector('.controls').getBoundingClientRect().width})) })`);
    check(`Sin desbordamiento horizontal a ${width}px`, layout.scrollWidth <= width + 1, layout);
    await page.evaluate("window.scrollTo(0,0)");
    const image = await page.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`docs/contenido/higromas/vista-${width}.png`, Buffer.from(image.data, 'base64'));
  }
  await page.evaluate("document.querySelector('[data-higroma-animation]').scrollIntoView({block:'center',behavior:'instant'})");
  await page.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const animationImage = await page.send('Page.captureScreenshot', { format: 'png' });
  await writeFile('docs/contenido/higromas/vista-animacion.png', Buffer.from(animationImage.data, 'base64'));
  check('Sin excepciones JavaScript de página', exceptions.length === 0, exceptions);
  await page.close();
  const noJs = await openPage(browser, { allowOrigin: origin });
  await noJs.send('Emulation.setScriptExecutionDisabled', { value: true });
  await noJs.goto(origin + path);
  result.noJs = await noJs.evaluate(`({ count: document.querySelectorAll('[data-higroma-animation]').length, allStatic: [...document.querySelectorAll('[data-higroma-animation]')].every(el => el.dataset.playing === 'false' && el.querySelector('.controls').hidden && el.querySelector('figcaption p').textContent.length > 20) })`);
  check('Sin JS: tres esquemas y explicaciones, controles ocultos', result.noJs.count === 3 && result.noJs.allStatic, result.noJs);
  await noJs.close();
} finally {
  await browser.close();
}
await writeFile('docs/contenido/higromas/verificacion-navegador.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ wordCount: result.wordCount, checks: result.assertions.map(({name, passed}) => ({name, passed})) }, null, 2));
if (result.assertions.some(check => !check.passed)) process.exitCode = 1;
