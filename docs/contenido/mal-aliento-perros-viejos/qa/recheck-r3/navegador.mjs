// Verificación puntual de producción. No constituye una auditoría editorial.
import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const require=createRequire('/tmp/mal-aliento-browser/node_modules/_qa.cjs');
const {chromium}=require('playwright-core');
const out=path.dirname(new URL(import.meta.url).pathname);
const origin='http://127.0.0.1:4321';
const article=origin+'/salud-perros-mayores/mal-aliento-perros-viejos';
const file='src/content/blog/mal-aliento-perros-viejos.mdx';
const report={scope:'Corrección de Illinois tras informe R3; comprobación de producción, no auditoría',date:new Date().toISOString(),sha256:crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex'),views:[],errors:[]};
await fs.mkdir(path.join(out,'capturas'),{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage'],env:{...process.env,XDG_CONFIG_HOME:'/tmp/mal-aliento-chromium-config',XDG_CACHE_HOME:'/tmp/mal-aliento-chromium-cache'}});
report.chromium=browser.version();
try {
for(const width of [375,390,1366]) for(const theme of ['light','dark']) {
 const context=await browser.newContext({viewport:{width,height:844},colorScheme:theme});
 await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
 await context.addInitScript(t=>localStorage.setItem('theme',t),theme);
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 const response=await page.goto(article,{waitUntil:'networkidle'});
 if(response.status()!==200)throw Error('HTTP '+response.status());
 const heading=page.getByRole('heading',{name:'Bultos o heridas que persisten',exact:true});
 await heading.scrollIntoViewIfNeeded();
 const detail=await heading.evaluate(h=>{
  const first=h.nextElementSibling,second=first.nextElementSibling;
  return {first:first.textContent,second:second.textContent,href:second.querySelector('a')?.href,overflow:document.documentElement.scrollWidth>innerWidth,dark:document.documentElement.classList.contains('dark')};
 });
 if(!detail.first.includes('Una llaga o un bulto nuevo')||!detail.second.includes('tumores que al principio son pequeños y no causan síntomas')||!detail.href?.includes('vetmed.illinois.edu/pet-health-columns/oral-tumors-in-dogs-and-cats/')||detail.overflow||detail.dark!==(theme==='dark'))throw Error(JSON.stringify(detail));
 await page.screenshot({path:path.join(out,'capturas',`${width}-${theme}-illinois.png`)});
 report.views.push({width,theme,pass:true,...detail});await context.close();
}
if(report.errors.length)throw Error('Errores JS');
report.pass=true;
} catch(e) {report.pass=false;report.error=e.message;process.exitCode=1;}
finally {await browser.close();await fs.writeFile(path.join(out,'navegador.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({pass:report.pass,views:report.views.length,errors:report.errors,error:report.error}));}
