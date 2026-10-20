import asyncio,json,hashlib,re
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path(__file__).resolve().parent; URL='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'; R={'views':{},'errors':[]}
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for w in [390,393,1366]:
   for theme in ['light','dark']:
    page=await b.new_page(viewport={'width':w,'height':900},color_scheme=theme); await page.goto(URL,wait_until='networkidle');await page.evaluate('document.fonts.ready');await page.evaluate('(d)=>document.documentElement.classList.toggle("dark",d)',theme=='dark')
    key=f'{w}-{theme}'; v={'resources':[],'tables':[]}; R['views'][key]=v
    await page.evaluate('Promise.all([...document.images].map(x=>{x.loading="eager";return x.decode().catch(()=>null)}))')
    for i,x in enumerate(await page.locator('[data-editorial-visual],.tabla-apilable').all()):
     d=await x.evaluate('(x)=>({kind:x.dataset.variant||x.dataset.feedingV2Visual||"tabla",height:x.getBoundingClientRect().height,width:x.getBoundingClientRect().width,scroll:x.scrollWidth,client:x.clientWidth,details:[...x.querySelectorAll("details")].map(d=>({open:d.open,summary:d.querySelector("summary").textContent})),buttons:[...x.querySelectorAll("button,summary")].filter(n=>n.getClientRects().length).map(n=>({name:n.textContent,w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height}))})')
     seq=x.locator('[data-feeding-v2-sequence]')
     if await seq.count():
      d['stepHeights']=[]
      for step in range(4):
       d['stepHeights'].append(await seq.evaluate('(x)=>({step:x.dataset.step,height:x.getBoundingClientRect().height,controlsTop:x.querySelector(".feeding-controls").getBoundingClientRect().top-x.getBoundingClientRect().top,drawingBottom:x.querySelector(".feeding-canvas").getBoundingClientRect().bottom-x.getBoundingClientRect().top,activeBottom:x.querySelector("[data-active=true]").getBoundingClientRect().bottom-x.getBoundingClientRect().top})'))
       if step<3: await seq.locator('[data-action="next"]').click()
     v['resources'].append(d)
     # Hide only fixed site overlays for element evidence; source and screen QA unchanged.
     await page.evaluate('document.querySelectorAll("*").forEach(n=>{if(getComputedStyle(n).position==="fixed")n.style.visibility="hidden"})')
     await x.screenshot(path=str(OUT/'capturas'/f'{key}-recurso-{i}.png'))
    v['overflow']=await page.evaluate('document.documentElement.scrollWidth>innerWidth')
    v['tables']=await page.locator('.tabla-apilable table').evaluate_all('(xs)=>xs.map(x=>({caption:x.caption.textContent,scroll:x.scrollWidth,client:x.clientWidth,labels:[...x.querySelectorAll("td")].every(n=>!!n.dataset.label),rowDisplay:getComputedStyle(x.querySelector("tbody tr")).display,tdDisplay:getComputedStyle(x.querySelector("td")).display}))')
    await page.close()
  page=await b.new_page(viewport={'width':390,'height':900}); await page.goto(URL,wait_until='networkidle')
  rec=page.locator('.feeding-record-form');R['resize']={'390':await rec.get_attribute('open')};await page.set_viewport_size({'width':1366,'height':900});await page.wait_for_timeout(150);R['resize']['1366']=await rec.get_attribute('open');await page.set_viewport_size({'width':393,'height':900});await page.wait_for_timeout(150);R['resize']['393']=await rec.get_attribute('open')
  await page.close();await b.close()
 (OUT/'responsive-r3.json').write_text(json.dumps(R,ensure_ascii=False,indent=2))
 print(json.dumps({k:{'heights':[round(x['height']) for x in v['resources']],'overflow':v['overflow']} for k,v in R['views'].items()},ensure_ascii=False))
R['capture_note']='Solo capturas de elemento ocultan overlays fijos generales en DOM; no se modifica producto. Primera ejecución del harness midió alturas iniciales pero no pasos por buscar dataset en envoltura; se corrigió selector antes de concluir.'
asyncio.run(main())
