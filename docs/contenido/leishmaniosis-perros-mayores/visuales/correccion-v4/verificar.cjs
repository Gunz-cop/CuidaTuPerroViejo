// Comprobaciones del productor. No emite una auditoría independiente.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const runFile = promisify(execFile);
const url = process.env.LEISH_PREVIEW_URL || 'http://127.0.0.1:4321/salud-perros-mayores/leishmaniosis-perros-mayores.html';
const out = path.join(__dirname,'capturas');
const selectors = ['[data-leish-revision]','[data-leish-calendar]','.leish-tabla'];
const cleanCapture = 'html { scroll-behavior:auto!important; } [data-leish-capture-overlay], [data-leish-capture-overlay] * { visibility:hidden!important; }';
const fontCache = process.env.LEISH_FONT_CACHE || '/tmp/leish-font-cache';
fs.mkdirSync(fontCache,{recursive:true});
const fontDownloads = new Map();
const results = { date:new Date().toISOString(), url, independentAudit:false, externalRequests:'only Google Fonts, fetched with curl using inherited proxy and TLS trust; other third parties blocked', captureOverlays:'fixed and sticky site UI hidden only during isolated screenshots', modes:[], interactions:{}, errors:[] };

async function routeRequest(route) {
  const source=route.request().url(),host=new URL(source).hostname;
  if(host==='127.0.0.1')return route.continue();
  if(!['fonts.googleapis.com','fonts.gstatic.com'].includes(host))return route.abort();
  const file=path.join(fontCache,crypto.createHash('sha256').update(source).digest('hex'));
  if(!fontDownloads.has(source))fontDownloads.set(source,(async()=>{
    if(!fs.existsSync(file))await runFile('curl',['--fail','--silent','--show-error','--location','--max-time','30','--output',file,source]);
    return file;
  })());
  await fontDownloads.get(source);
  return route.fulfill({path:file,contentType:host==='fonts.googleapis.com'?'text/css':'application/octet-stream'});
}

async function setup(browser,options={}) {
  const context=await browser.newContext({viewport:{width:390,height:1200},deviceScaleFactor:1,...options});
  await context.route('**/*',routeRequest);
  await context.addInitScript(dark=>localStorage.setItem('theme',dark?'dark':'light'),options.colorScheme==='dark');
  const page=await context.newPage();
  page.on('pageerror',error=>results.errors.push(error.message));
  return {context,page};
}
async function load(page,js=true) {
  await page.goto(url,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  if(js) await page.locator('[data-leish-revision][data-enhanced]').waitFor();
  await page.evaluate(async()=>{
    document.querySelectorAll('img').forEach(img=>img.loading='eager');
    await Promise.all([...document.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));
    document.querySelectorAll('body *').forEach(el=>{
      if(['fixed','sticky'].includes(getComputedStyle(el).position)) el.setAttribute('data-leish-capture-overlay','');
    });
  });
}
async function capture(page,selector,name) {
  const locator=page.locator(selector);
  const height=await locator.evaluate(el=>el.getBoundingClientRect().height);
  const viewport=page.viewportSize();
  if(height>viewport.height-40)await page.setViewportSize({...viewport,height:Math.ceil(height+100)});
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100); // Espera de Playwright, compatible con el reloj simulado.
  await locator.screenshot({path:path.join(out,name+'.png'),animations:'disabled',style:cleanCapture});
}
async function contrast(page) {
  return page.evaluate(()=>{
    const rgba=s=>{const n=s.match(/[\d.]+/g)?.map(Number)||[];return n.length>=3?[...n.slice(0,3),(n[3]??1)]:[0,0,0,0];};
    const mix=(top,bot)=>top.slice(0,3).map((v,i)=>v*top[3]+bot[i]*(1-top[3]));
    const background=el=>{if(!el)return[255,255,255];const c=rgba(getComputedStyle(el).backgroundColor);return c[3]===1?c.slice(0,3):mix(c,background(el.parentElement));};
    const lum=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
    const rows=[];
    document.querySelectorAll('[data-leish-revision] *,[data-leish-calendar] *,.leish-tabla td,.leish-tabla th,.leish-tabla caption').forEach(el=>{
      const own=[...el.childNodes].some(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
      if(!own||!el.getClientRects().length||el.closest('[disabled]')||el.closest('.lc-sr')||getComputedStyle(el).visibility==='hidden')return;
      const bg=background(el),color=mix(rgba(getComputedStyle(el).color),bg),a=lum(color),b=lum(bg);
      rows.push({text:el.textContent.trim().slice(0,65),ratio:Number(((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2))});
    });
    return {minimum:Math.min(...rows.map(x=>x.ratio)),includesTableHeaders:true,rows,failures:rows.filter(x=>x.ratio<4.5)};
  });
}

(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:process.env.LEISH_CHROME_PATH||'/workspace/leish-browsers/chromium-1234/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
  try {
    for(const width of [390,1366])for(const dark of [false,true]){
      const {context,page}=await setup(browser,{viewport:{width,height:1200},colorScheme:dark?'dark':'light'});
      await load(page);
      const prefix=`${width}-${dark?'oscuro':'claro'}`;
      const root=page.locator('[data-leish-revision]');
      assert.equal(await root.getAttribute('data-playing'),'false');
      assert.equal(await page.locator('details[open]').count(),0);
      const heights=[];
      for(let step=0;step<6;step++){
        assert.equal(await root.getAttribute('data-step'),String(step));
        heights.push(await root.evaluate(el=>el.getBoundingClientRect().height));
        await capture(page,'[data-leish-revision]',`${prefix}-revision-${step+1}`);
        if(step<5)await root.locator('[data-action=next]').click();
      }
      await root.locator('[data-action=restart]').click();
      await capture(page,'[data-leish-calendar]',`${prefix}-calendario`);
      await capture(page,'.leish-tabla >> nth=0',`${prefix}-senales`);
      await capture(page,'.leish-tabla >> nth=1',`${prefix}-pruebas`);
      for(const [name,selector]of [['hero','article > header figure'],['casa','[data-leish-image=casa]'],['consulta','[data-leish-image=consulta]']])await capture(page,selector,`${prefix}-${name}`);
      const measured=await page.evaluate(()=>({
        width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
        calendar:document.querySelector('[data-leish-calendar]').getBoundingClientRect().height,
        tables:[...document.querySelectorAll('.leish-tabla')].map(el=>el.getBoundingClientRect().height),
        images:[...document.querySelectorAll('article img')].map(img=>({source:img.currentSrc,naturalWidth:img.naturalWidth,decoded:img.complete&&img.naturalWidth>0})),
        targets:[...document.querySelectorAll('[data-leish-revision] button,.lv-method summary,.lc-method summary')].map(el=>({name:el.getAttribute('aria-label')||el.textContent.trim(),width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})),
        brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.hash&&a.hash!=='#'&&!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash),
        ogImage:document.querySelector('meta[property="og:image"]')?.content,
        captionAI:document.querySelector('article > header').textContent.includes('Ilustraciones generadas con IA'),
        fonts:[...document.fonts].filter(font=>font.status==='loaded').map(font=>font.family),
        heroAlt:document.querySelector('article > header figure img')?.alt,
        heroCaption:document.querySelector('article > header figure figcaption')?.textContent.trim(),
      }));
      const closedContrast=await contrast(page);
      for(const [name,selector]of [['revision','[data-leish-revision]'],['calendario','[data-leish-calendar]']]){
        await page.locator(selector+' summary').click();
        await capture(page,selector,`${prefix}-${name}-notas`);
      }
      const openContrast=await contrast(page);
      results.modes.push({width,dark,revisionHeights:heights,...measured,closedContrast,openContrast});
      assert.equal(measured.scrollWidth,width,'desbordamiento horizontal');
      assert(measured.images.every(img=>img.decoded),'imagen sin decodificar');
      assert(measured.targets.every(t=>t.width>=44&&t.height>=44),'objetivo menor de 44 px');
      assert.equal(measured.brokenAnchors.length,0);
      if(width===390){assert(Math.max(...heights)<=900,'revisión demasiado alta');assert(measured.calendar<=900,'calendario demasiado alto');assert(measured.tables.every(h=>h<=900),'tabla demasiado alta');}
      assert.equal(closedContrast.failures.length,0,'contraste en estado cerrado');
      assert.equal(openContrast.failures.length,0,'contraste de notas desplegadas');
      assert(measured.ogImage.includes('mestizo-senior-colocacion-collar-v1.webp'));
      assert(measured.captionAI);
      assert.equal(measured.heroAlt,'Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de hocico oscuro canoso, sentada en el recibidor de un piso');
      assert.equal(measured.heroCaption,measured.heroAlt);
      assert((await root.locator('img').getAttribute('src')).includes('recorte-perfil-v4.webp'));
      const consulta=page.locator('[data-leish-image=consulta]');
      assert((await consulta.locator('img').getAttribute('src')).includes('consulta-v4.webp'));
      assert.equal(await consulta.locator('img').getAttribute('alt'),(await consulta.locator('figcaption').textContent()).trim());
      assert((await root.locator('img').getAttribute('alt')).includes('muchos perros infectados se ven normales'));
      assert((await root.locator('.lv-essential').textContent()).includes('La ausencia de lesiones no descarta infección'));
      assert((await consulta.locator('figcaption').textContent()).includes('Son señales posibles; muchos perros infectados se ven normales'));
      assert((await page.locator('.lc-card').first().textContent()).includes('Abril y noviembre: actividad variable'));
      assert.deepEqual(await page.locator('.lc-card').first().locator('.lc-month > span[aria-hidden]').allTextContents(),['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']);
      const faq=page.locator('.faq-section details');
      assert.equal(await faq.count(),7);
      await faq.first().locator('summary').focus();
      await page.keyboard.press('Enter');
      assert(await faq.first().evaluate(el=>el.open));
      await page.keyboard.press('Enter');
      assert.equal(await faq.first().evaluate(el=>el.open),false);
      results.modes[results.modes.length-1].faqKeyboard=true;
      await page.emulateMedia({media:'print'});
      assert.equal(await root.locator('[data-panel]:visible').count(),6);
      const printed=await page.evaluate(()=>({ink:getComputedStyle(document.querySelector('.lv-panels h4')).color,background:getComputedStyle(document.querySelector('[data-leish-revision]')).backgroundColor,calendarInk:getComputedStyle(document.querySelector('.lc-calendar h3')).color,calendarBackground:getComputedStyle(document.querySelector('[data-leish-calendar]')).backgroundColor}));
      assert.equal(printed.ink,'rgb(32, 62, 50)');
      assert.equal(printed.background,'rgb(255, 255, 255)');
      assert.equal(printed.calendarInk,'rgb(32, 62, 50)');
      assert.equal(printed.calendarBackground,'rgb(255, 255, 255)');
      results.modes[results.modes.length-1].printColors=printed;
      if(dark){await capture(page,'[data-leish-revision]',`${prefix}-impresion-revision`);await capture(page,'[data-leish-calendar]',`${prefix}-impresion-calendario`);}
      await page.emulateMedia({media:'screen'});
      await context.close();
    }

    {
      const {context,page}=await setup(browser);
      await page.clock.install();
      await load(page);
      const root=page.locator('[data-leish-revision]');
      await page.clock.runFor(6000);
      assert.equal(await root.getAttribute('data-step'),'0');
      await root.locator('[data-action=play]').click();
      await page.clock.runFor(5100);
      assert.equal(await root.getAttribute('data-step'),'1');
      await root.locator('[data-action=play]').click();
      await page.clock.runFor(15000);
      assert.equal(await root.getAttribute('data-step'),'1');
      assert.equal(await root.getAttribute('data-playing'),'false');
      await root.locator('[data-action=next]').focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await root.getAttribute('data-step'),'2');
      const focus=await root.locator('[data-action=next]').evaluate(el=>({focused:el===document.activeElement,outline:getComputedStyle(el).outlineStyle,width:getComputedStyle(el).outlineWidth}));
      assert(focus.focused&&focus.outline!=='none');
      await root.locator('[data-action=restart]').click();
      await root.locator('[data-action=play]').click();
      await page.clock.runFor(31000);
      assert.equal(await root.getAttribute('data-step'),'5');
      assert.equal(await root.getAttribute('data-playing'),'false');
      await root.locator('[data-action=play]').click();
      assert.equal(await root.getAttribute('data-step'),'0');
      await root.locator('[data-action=play]').click();
      await root.locator('[data-action=next]').click();
      await page.emulateMedia({media:'print'});
      assert.equal(await root.locator('[data-panel]:visible').count(),6);
      assert.equal(await root.locator('.lv-controls:visible').count(),0);
      await capture(page,'[data-leish-revision]','impresion-con-js');
      await page.emulateMedia({media:'screen'});
      await root.locator('[data-action=play]').click();
      await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
      assert.equal(await root.getAttribute('data-playing'),'false');
      await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('astro:before-swap'));document.dispatchEvent(new Event('astro:page-load'));document.dispatchEvent(new Event('astro:page-load'));});
      await root.locator('[data-action=next]').click();
      assert.equal(await root.getAttribute('data-step'),'1','inicialización duplicada');
      await root.locator('[data-action=play]').click();
      await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
      assert.equal(await root.getAttribute('data-playing'),'false');
      results.interactions={noAutoplay:true,timedAdvance:true,pauseStable:true,keyboard:true,focus,finitePlayback:true,restart:true,printWithJS:true,visibilityHandler:'document.hidden simulated + visibilitychange',pagehide:true,noDuplicateListeners:true};
      await context.close();
    }
    {
      const {context,page}=await setup(browser,{reducedMotion:'reduce'});
      await load(page);
      const root=page.locator('[data-leish-revision]');
      assert(await root.locator('[data-action=play]').isDisabled());
      await root.locator('[data-action=next]').focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await root.getAttribute('data-step'),'1');
      assert.equal(await root.getAttribute('data-playing'),'false');
      await capture(page,'[data-leish-revision]','movimiento-reducido');
      results.interactions.reducedMotion=true;
      await context.close();
    }
    {
      const {context,page}=await setup(browser,{javaScriptEnabled:false});
      await load(page,false);
      const root=page.locator('[data-leish-revision]');
      assert.equal(await root.locator('[data-panel]:visible').count(),6);
      assert.equal(await root.locator('.lv-controls:visible').count(),0);
      results.interactions.noJavaScriptHeight=await root.evaluate(el=>el.getBoundingClientRect().height);
      assert(results.interactions.noJavaScriptHeight<=900,'alternativa sin JavaScript demasiado alta');
      await capture(page,'[data-leish-revision]','sin-javascript');
      await page.emulateMedia({media:'print'});
      assert.equal(await root.locator('[data-panel]:visible').count(),6);
      await capture(page,'[data-leish-revision]','impresion-sin-js');
      results.interactions.noJavaScript=true;
      results.interactions.printWithoutJS=true;
      await context.close();
    }
    assert.equal(results.errors.length,0,'errores JavaScript');
    results.completed=true;
  } finally {
    fs.writeFileSync(path.join(__dirname,'verificacion-navegador.json'),JSON.stringify(results,null,2)+'\n');
    await browser.close();
  }
  console.log(JSON.stringify({completed:results.completed,modes:results.modes.map(m=>({width:m.width,dark:m.dark,revisionMax:Math.max(...m.revisionHeights),calendar:m.calendar,tables:m.tables,minContrast:Math.min(m.closedContrast.minimum,m.openContrast.minimum)})),interactions:results.interactions,errors:results.errors},null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
