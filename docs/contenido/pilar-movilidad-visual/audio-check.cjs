const { chromium } = require('playwright');const fs=require('fs');const assert=require('assert/strict');
const dir=__dirname;
const url='http://127.0.0.1:4321/movilidad-dolor-perros-mayores.html';
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 console.log('browser ready');const p=await b.newPage({viewport:{width:390,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));const requested=[];p.on('request',r=>{if(r.url().includes('narracion-'))requested.push(r.url())});
 await p.goto(url);console.log('page ready');await p.waitForFunction(()=>document.querySelector('[data-mobility-atlas]')?.dataset.ready==='true');
 const a=p.locator('[data-mobility-atlas]');assert.equal(await a.locator('audio').count(),3);
 const initial=await a.locator('audio').evaluateAll(xs=>xs.map(x=>({paused:x.paused,autoplay:x.autoplay,preload:x.preload,time:x.currentTime})));assert(initial.every(x=>x.paused&&!x.autoplay&&x.preload==='none'&&x.time===0));assert.equal(requested.length,0);
 console.log('no autoplay checked');const playback=[];
 for(let i=0;i<3;i++){
  await a.locator(`[data-atlas-panel="${i}"]`).click();const audio=a.locator('audio').nth(i);
  assert(await audio.isVisible());
  const result=await audio.evaluate(async e=>{await e.play();await new Promise(r=>setTimeout(r,450));return {duration:e.duration,time:e.currentTime,paused:e.paused,error:e.error?.message??null};});assert(result.time>0);assert(!result.paused);assert(result.duration>7&&result.duration<10);assert.equal(result.error,null);playback.push(result);console.log('played',i,result);
  await a.locator(`[data-atlas-panel="${(i+1)%3}"]`).click();const state=await audio.evaluate(e=>({paused:e.paused,time:e.currentTime}));assert(state.paused&&state.time===0);
  const next=a.locator('audio').nth((i+1)%3);assert(await next.evaluate(e=>e.paused&&e.currentTime===0));
 }
 await a.locator('[data-atlas-panel="0"]').click();await a.locator('audio').nth(0).evaluate(e=>e.play());await a.locator('[data-atlas-all]').click();assert(await a.locator('audio').evaluateAll(xs=>xs.every(e=>e.paused)));
 // Ejercita el manejador de visibilidad con una notificación simulada, sin afirmar cambio real de pestaña.
 await a.locator('[data-atlas-panel="0"]').click();await a.locator('audio').nth(0).evaluate(e=>e.play());
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});assert(await a.locator('audio').nth(0).evaluate(e=>e.paused));await p.evaluate(()=>{delete document.hidden});
 await a.locator('audio').nth(0).evaluate(e=>e.play());await p.evaluate(()=>document.dispatchEvent(new Event('astro:before-swap')));assert(await a.locator('audio').nth(0).evaluate(e=>e.paused));
 for(const link of await a.locator('a[download]').all()){const href=await link.getAttribute('href');const response=await p.request.get('http://127.0.0.1:4321'+href);assert.equal(response.status(),200);assert(response.headers()['content-type'].includes('audio/mpeg'));}
 console.log('pause handlers checked');const nojs=await b.newPage({javaScriptEnabled:false});await nojs.goto(url);assert.equal(await nojs.locator('[data-mobility-atlas] audio:visible').count(),3);const nativeAudio=nojs.locator('[data-mobility-atlas] audio').nth(1);await nativeAudio.click({position:{x:25,y:22}});await new Promise(r=>setTimeout(r,600));const noJSPlayback=await nativeAudio.evaluate(e=>e.currentTime);assert(noJSPlayback>0);await nativeAudio.evaluate(e=>e.pause());await nojs.close();
 assert.deepEqual(errors,[]);await b.close();const result={initial,requestsBeforeInteraction:0,playback,switchStopsAndResets:true,nextDoesNotAutoplay:true,fullViewStops:true,simulatedVisibilityPause:true,navigationEventPause:true,noJSAudios:3,noJSPlayback,downloads200:true,errors};fs.writeFileSync(`${dir}/audio-results.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
