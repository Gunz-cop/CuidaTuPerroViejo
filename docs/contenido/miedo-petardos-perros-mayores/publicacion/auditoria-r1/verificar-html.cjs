// Prueba propia breve de integración. No captura imágenes ni reabre auditoría visual.
const { chromium } = require('/opt/codex/cua_node/lib/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  const page = await browser.newPage({viewport:{width:390,height:844},colorScheme:'light'});
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:4468/') ? route.continue() : route.abort());
  const errors=[];
  page.on('pageerror', e=>errors.push(String(e)));
  const results=[];
  for (const route of ['/salud-mental-emocional-perros/miedo-petardos-perros-mayores.html','/salud-perros-mayores/mal-aliento-perros-viejos.html']) {
    const response = await page.goto('http://127.0.0.1:4468'+route,{waitUntil:'networkidle'});
    const data = await page.evaluate(async () => {
      const content = document.querySelector('.content-body');
      const images = [...document.querySelectorAll('article img')];
      for (const img of images) { img.scrollIntoView(); await new Promise(r=>setTimeout(r,150)); try { await Promise.race([img.decode(),new Promise(r=>setTimeout(r,5000))]); } catch {} }
      const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)).flatMap(s=>s['@graph']||[s]).find(s=>s['@type']==='BlogPosting');
      const hero = document.querySelector('article header img');
      const caption = document.querySelector('article header figcaption')?.textContent.trim();
      const tables = [...document.querySelectorAll('.tabla-apilable')].map(el=>({compacta:el.hasAttribute('data-compacta'),label:el.getAttribute('aria-label'),labels:[...el.querySelectorAll('td[data-label]')].map(td=>({text:td.textContent.trim(),label:td.dataset.label,short:td.dataset.labelCorto,pseudo:getComputedStyle(td,'::before').content,opacity:getComputedStyle(td,'::before').opacity,display:getComputedStyle(td,'::before').display}))}));
      const primary = [...document.querySelectorAll('[data-editorial-bibliography] a')].filter(a=>a.href.includes('colegioveterinariosmalaga.es/2026/06/')).map(a=>({href:a.href,text:a.textContent,target:a.target,rel:a.rel}));
      return {title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href,hero:{alt:hero?.alt,caption,src:hero?.getAttribute('src'),loading:hero?.loading,srcset:hero?.getAttribute('srcset')},schema,tables,primary,compactStyleElements:[...document.querySelectorAll('style')].filter(s=>s.textContent.includes('.content-body .tabla-apilable[data-compacta]')).length,images:images.map(img=>({src:img.getAttribute('src'),decoded:img.complete&&img.naturalWidth>0,loading:img.loading,width:img.getAttribute('width'),height:img.getAttribute('height')})),detailsOpen:[...content.querySelectorAll('details')].filter(el=>el.open).length,internalLinks:[...content.querySelectorAll('a[href^="/"]')].map(a=>a.getAttribute('href'))};
    });
    results.push({route,status:response.status(),...data});
  }
  const article=results[0], fallback=results[1];
  assert.equal(article.status,200);assert.equal(fallback.status,200);
  assert.equal(article.tables.length,2);assert(article.tables.every(t=>t.compacta));
  assert.equal(article.compactStyleElements,2);assert.equal(fallback.compactStyleElements,0);
  assert(fallback.tables.every(t=>!t.compacta));
  assert(article.tables.every(t=>t.labels.every(l=>l.opacity==='0.8')));
  assert(fallback.tables.every(t=>t.labels.every(l=>l.opacity==='0.75')));
  assert.equal(article.primary.length,1);assert.equal(article.primary[0].target,'_blank');
  assert.equal(article.schema.image[0].caption,article.hero.caption);
  assert.notEqual(article.hero.alt,article.hero.caption);
  assert.equal(fallback.schema.image[0].caption,fallback.hero.alt);assert.equal(fallback.hero.caption,fallback.hero.alt);
  assert.equal(article.schema.datePublished,'2026-10-25T00:00:00.000Z');
  assert.equal(article.schema.dateModified,article.schema.datePublished);
  assert.equal(article.images.length,3);assert(article.images.every(i=>i.decoded));
  assert.deepEqual(article.images.map(i=>i.loading),['eager','lazy','lazy']);
  assert.equal(article.detailsOpen,0);assert.equal(errors.length,0);
  fs.writeFileSync(path.join(__dirname,'html-navegador.json'),JSON.stringify({fecha:'2026-10-26',metodo:'Chromium propio a390claro, build previo del productor servido estático; terceros bloqueados; sin métricas tipográficas, contraste o captura anatómica',resultados:results,erroresJS:errors},null,2)+'\n');
  await browser.close();
  console.log(JSON.stringify({resultado:'OK',paginas:results.map(r=>({route:r.route,status:r.status,compacta:r.tables.map(t=>t.compacta),styleInlineCompacto:r.compactStyleElements})),imagesDecoded:article.images.length,primaryS10:article.primary.length,errorsJS:errors.length},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
