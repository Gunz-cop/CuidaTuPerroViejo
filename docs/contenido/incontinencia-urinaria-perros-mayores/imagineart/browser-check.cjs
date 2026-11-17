const { chromium } = require('playwright');
const fs = require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const results=[];
 const dir=require('path').join(__dirname);
 for(const width of [390,1366]) for(const theme of ['light','dark']) {
  const page=await browser.newPage({viewport:{width,height:900},colorScheme:theme});
  await page.addInitScript(theme=>{try{localStorage.setItem('theme',theme)}catch{};document.addEventListener('DOMContentLoaded',()=>document.documentElement.classList.toggle('dark',theme==='dark'));},theme);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4321/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores.html');
  const card=page.locator('.descanso-seco');await card.scrollIntoViewIfNeeded();
  await page.locator('img[loading="lazy"]').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
  await page.waitForFunction(()=>[...document.querySelectorAll('article img')].every(i=>i.complete&&i.naturalWidth>0));
  await card.screenshot({path:`${dir}/${width}-${theme}.png`});
  const data=await page.evaluate(()=>{
   const card=document.querySelector('.descanso-seco');const h=card.querySelector('h3');const link=card.querySelector('a');const video=card.querySelector('video');
   return {viewport:innerWidth,scroll:document.documentElement.scrollWidth,cardHeight:card.getBoundingClientRect().height,titleColor:getComputedStyle(h).color,background:getComputedStyle(card).backgroundColor,downloadTargetHeight:link.getBoundingClientRect().height,images:[...document.querySelectorAll('article img')].map(i=>({src:i.currentSrc,ok:i.complete&&i.naturalWidth>0})),video:video?{autoplay:video.autoplay,controls:video.controls,preload:video.preload}:null};
  });
  if(width===390&&theme==='light') {
   data.playback=await page.locator('video').evaluate(async v=>{await v.play(); await new Promise(r=>setTimeout(r,500));v.pause();return {time:v.currentTime,readyState:v.readyState,duration:v.duration,error:v.error?.message??null};});
   await page.locator('video').evaluate(v=>{v.currentTime=15;});await page.waitForTimeout(300);
   await page.locator('video').screenshot({path:`${dir}/video-final.png`});
  }
  results.push({width,theme,errors,...data});await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
 await page.goto('http://127.0.0.1:4321/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores.html');
 results.push({noJS:await page.locator('.descanso-seco li').count(),download:await page.locator('.descanso-seco a').getAttribute('href')});
 await browser.close();fs.writeFileSync(`${dir}/browser-results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})();
