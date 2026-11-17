const { chromium }=require('playwright');
const fs=require('fs'); const assert=require('assert/strict');
const dir=__dirname;
const url='http://127.0.0.1:4321/movilidad-dolor-perros-mayores.html';
(async()=>{
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const results=[];
for(const width of [390,1366]) for(const theme of ['light','dark']){
 const page=await browser.newPage({viewport:{width,height:900},colorScheme:theme});
 await page.addInitScript(t=>{try{localStorage.setItem('theme',t)}catch{};document.addEventListener('DOMContentLoaded',()=>document.documentElement.classList.toggle('dark',t==='dark'));},theme);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.waitForFunction(()=>document.querySelector('[data-mobility-room]')?.dataset.ready==='true'&&document.querySelector('[data-mobility-atlas]')?.dataset.ready==='true');
 await page.locator('img[loading="lazy"]').evaluateAll(xs=>xs.forEach(x=>x.loading='eager'));
 await page.waitForFunction(()=>[...document.querySelectorAll('article img,.health-hero img')].every(i=>i.complete&&i.naturalWidth));
 const room=page.locator('[data-mobility-room]'),atlas=page.locator('[data-mobility-atlas]');
 const initial=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,roomHeight:document.querySelector('[data-mobility-room]').getBoundingClientRect().height,atlasHeight:document.querySelector('[data-mobility-atlas]').getBoundingClientRect().height,forms:document.querySelectorAll('[data-mobility-room] input,[data-mobility-atlas] input,[data-mobility-room] form,[data-mobility-atlas] form').length,images:[...document.querySelectorAll('article img,.health-hero img')].map(i=>({src:i.currentSrc,ok:i.complete&&i.naturalWidth>0})),targets:[...document.querySelectorAll('[data-mobility-room] button,[data-mobility-atlas] button')].filter(e=>e.getBoundingClientRect().width).map(e=>({text:e.textContent.trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))}));
 assert.equal(initial.scroll,width);assert.equal(initial.forms,0);assert(initial.targets.every(x=>x.width>=44&&x.height>=44));assert(initial.roomHeight<900);assert(initial.atlasHeight<900);
 const shot={style:'nav[aria-label="Navegación principal"]{visibility:hidden!important}'};
 await room.screenshot({path:`${dir}/room-${width}-${theme}.png`,...shot});
 await atlas.screenshot({path:`${dir}/atlas-${width}-${theme}.png`,...shot});
 for(const zone of ['suelo','cama','paso']) {await room.locator(`[data-room-zone="${zone}"]`).click();assert(await room.locator(`[data-room-note="${zone}"]`).isVisible());}
 await room.locator('[data-room-zone="paso"]').click();assert.match(await room.locator('[data-room-progress]').textContent(),/^3 de 3/);
 await room.locator('[data-room-show="after"]').click();assert(await room.locator('[data-room-view="after"]').isVisible());assert(!(await room.locator('[data-room-view="before"]').isVisible()));
 await room.screenshot({path:`${dir}/room-after-${width}-${theme}.png`,...shot});
 await room.locator('[data-room-reset]').click();assert.match(await room.locator('[data-room-progress]').textContent(),/^0 de 3/);assert(await room.locator('[data-room-view="before"]').isVisible());
 for(let i=0;i<3;i++){await atlas.locator(`[data-atlas-panel="${i}"]`).click();assert(await atlas.locator(`[data-atlas-note="${i}"]`).isVisible());}
 const zoom=await atlas.locator('img').evaluate(e=>({imageWidth:e.getBoundingClientRect().width,imageHeight:e.getBoundingClientRect().height,viewportWidth:e.parentElement.getBoundingClientRect().width}));assert(Math.abs(zoom.imageWidth/zoom.imageHeight-16/9)<.01);
 await atlas.locator('[data-atlas-all]').click();assert(!(await atlas.evaluate(e=>e.classList.contains('is-zoomed'))));
 await atlas.screenshot({path:`${dir}/atlas-full-${width}-${theme}.png`,...shot});
 await room.locator('[data-room-zone="suelo"]').focus();await page.keyboard.press('Enter');assert(await room.locator('[data-room-note="suelo"]').isVisible());
 const video=page.locator('.walk-pause video');assert(await video.evaluate(v=>v.paused&&!v.autoplay&&v.currentTime===0));
 let playback=null;
 if(width===390&&theme==='light') {
  playback=await video.evaluate(async v=>{await v.play();await new Promise(r=>setTimeout(r,600));v.pause();return {duration:v.duration,time:v.currentTime,error:v.error?.message??null};});assert(playback.time>0);assert(playback.duration>=6);assert.equal(playback.error,null);
  await video.evaluate(v=>{v.currentTime=3});await page.waitForTimeout(300);await page.locator('.walk-pause').screenshot({path:`${dir}/video-mobile.png`,...shot});
 }
 assert.deepEqual(errors,[]);results.push({width,theme,errors,...initial,zoom,playback,exploreCompareReset:true,keyboard:true});await page.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});await nojs.goto(url);
const fallback={roomFigures:await nojs.locator('[data-room-view]').count(),roomNotes:await nojs.locator('[data-room-note]:visible').count(),atlasNotes:await nojs.locator('[data-atlas-note]:visible').count(),deadButtons:await nojs.locator('[data-mobility-room] button:visible,[data-mobility-atlas] button:visible').count()};assert.deepEqual(fallback,{roomFigures:2,roomNotes:3,atlasNotes:3,deadButtons:0});await nojs.close();
const reduce=await browser.newPage({reducedMotion:'reduce'});await reduce.goto(url);const motion=await reduce.locator('video').evaluate(v=>({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,paused:v.paused,autoplay:v.autoplay}));assert(motion.reduced&&motion.paused&&!motion.autoplay);await reduce.close();
await browser.close();fs.writeFileSync(`${dir}/browser-results.json`,JSON.stringify({results,fallback,motion},null,2));console.log(JSON.stringify({views:results.map(({width,theme,roomHeight,atlasHeight})=>({width,theme,roomHeight,atlasHeight})),fallback,motion},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
