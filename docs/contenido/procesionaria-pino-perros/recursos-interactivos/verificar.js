const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = process.argv[2]; const errs = [];
  for (const [w, h] of [[390, 844], [1366, 900]]) for (const dark of [false, true]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: dark ? 'dark' : 'light' });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.goto('http://localhost:4321/salud-perros-mayores/procesionaria-pino-perros.html', { waitUntil: 'networkidle' });
    const tag = `${w}-${dark ? 'dark' : 'light'}`;
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    const roots = await p.$$('[data-proc]');
    const hs = [];
    for (const r of roots) hs.push(Math.round((await r.boundingBox()).height));
    // ruta: contacto, step 3, tick all
    const ruta = p.locator('[data-proc=ruta]');
    await ruta.locator('[data-choose=contacto]').click();
    await ruta.locator('[data-step-nav="1"]').click(); await ruta.locator('[data-step-nav="1"]').click();
    for (let i = 0; i < 4; i++) await ruta.locator(`[data-check="${i}"]`).check();
    await p.waitForTimeout(1300);
    const hRuta = Math.round((await ruta.boundingBox()).height);
    await ruta.screenshot({ path: `${out}/ruta-${tag}.png` });
    await ruta.locator('[data-choose=grave]').click(); await p.waitForTimeout(1200);
    await ruta.screenshot({ path: `${out}/ruta-grave-${tag}.png` });
    const niza = p.locator('[data-proc=niza]');
    await niza.locator('[data-niza-toggle]').click(); await p.waitForTimeout(3000);
    await niza.screenshot({ path: `${out}/niza-${tag}.png` });
    const ll = p.locator('[data-proc=llamada]');
    await ll.locator('text=La lamió').click(); await ll.locator('text=15–60 min').click();
    await ll.locator('text=Le cuesta tragar').click(); await ll.locator('text=Babea').click();
    await ll.locator('[data-field=hecho] >> text=Nada').click(); await ll.locator('[data-age]').fill('12');
    const phrase = await ll.locator('[data-phrase]').textContent();
    await ll.screenshot({ path: `${out}/llamada-${tag}.png` });
    const sw2 = await p.evaluate(() => document.documentElement.scrollWidth);
    console.log(tag, 'scrollW', sw, sw2, 'alturas inicio', hs, 'ruta abierta', hRuta, '|', phrase);
    await ctx.close();
  }
  // reduced motion + no JS
  const c2 = await b.newContext({ viewport:{width:390,height:844}, javaScriptEnabled:false });
  const p2 = await c2.newPage(); await p2.goto('http://localhost:4321/salud-perros-mayores/procesionaria-pino-perros.html');
  await p2.locator('[data-proc=ruta]').screenshot({ path: `${out}/ruta-nojs.png` });
  console.log('nojs alturas', await p2.$$eval('[data-proc]', els => els.map(e => Math.round(e.getBoundingClientRect().height))));
  console.log('errores JS', errs);
  await b.close();
})();
