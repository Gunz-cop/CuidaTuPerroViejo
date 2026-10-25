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
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,...options});
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
  await page.locator(selector).screenshot({path:path.join(out,name+'.png'),animations:'disabled',style:cleanCapture});
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


(async()=>{const browser=await chromium.launch({executablePath:'/workspace/leish-browsers/chromium-1234/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});const rows=[];try{for(const dark of [false,true]){const {page,context}=await setup(browser,{viewport:{width:375,height:844},colorScheme:dark?'dark':'light'});await load(page);const m=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,calendar:document.querySelector('[data-leish-calendar]').getBoundingClientRect().height,targets:[...document.querySelectorAll('[data-leish-revision] button')].map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))}));assert.equal(m.width,m.scrollWidth);assert(m.targets.every(e=>e.width>=44&&e.height>=44));rows.push({dark,...m});await context.close();}}finally{await browser.close();}fs.writeFileSync(path.join(__dirname,'estrecho-375.json'),JSON.stringify(rows,null,2)+'\n');console.log(rows);})();