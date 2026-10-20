from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib
OUT=Path(__file__).resolve().parent
URL='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
RESULT={'role':'Autocontrol y corrección técnica; no auditoría independiente','engine':'Chromium /usr/bin/chromium, sitio compilado local','views':[],'errors':[]}
def shots(page,w,theme):
 # Solo para captura aislada: esconder overlays fijos ajenos al recurso y restaurar.
 page.evaluate("""()=>{window.__fixed=[...document.querySelectorAll('body *')].filter(x=>getComputedStyle(x).position==='fixed'&&!x.closest('[data-editorial-visual]')).map(x=>[x,x.style.visibility]);window.__fixed.forEach(([x])=>x.style.visibility='hidden')}""")
 for el in page.locator('[data-editorial-visual],.tabla-apilable').all():
  variant=el.get_attribute('data-feeding-v2-visual')
  if not variant: variant='tabla-'+str(page.locator('.tabla-apilable').evaluate_all('(xs,el)=>xs.indexOf(el)',el.element_handle()))
  el.screenshot(path=str(OUT/f'{w}-{theme}-{variant}.png'))
 page.evaluate("window.__fixed.forEach(([x,v])=>x.style.visibility=v)")
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for w in [390,1366]:
  for theme in ['light','dark']:
   ctx=browser.new_context(viewport={'width':w,'height':900},color_scheme=theme)
   ctx.add_init_script('localStorage.setItem("theme",'+json.dumps(theme)+')')
   page=ctx.new_page();page.on('pageerror',lambda e:RESULT['errors'].append(str(e)))
   assert page.goto(URL,wait_until='networkidle').status==200;page.evaluate('document.fonts.ready')
   page.evaluate('t=>document.documentElement.classList.toggle("dark",t==="dark")',theme);page.wait_for_timeout(500)
   page.locator('article img').evaluate_all('async xs=>{await Promise.all(xs.map(async x=>{x.loading="eager";await x.decode()}))}')
   assert page.evaluate('document.documentElement.scrollWidth===innerWidth')
   page.add_script_tag(path='/tmp/feeding-v2-qa/node_modules/axe-core/axe.min.js')
   axe=page.evaluate("""async()=>{const r=await axe.run({include:['article']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)}))}""")
   assert not axe,axe
   page.locator('.feeding-v2 details').evaluate_all('xs=>xs.forEach(x=>x.open=true)')
   openedAxe=page.evaluate("""async()=>{const r=await axe.run({include:['article']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)}))}""")
   assert not openedAxe,openedAxe
   page.locator('.feeding-limits').evaluate_all('xs=>xs.forEach(x=>x.open=false)')
   page.locator('.feeding-record-form').evaluate('(x,w)=>x.open=w>640',w)
   visuals=page.locator('[data-editorial-visual]').evaluate_all('xs=>xs.map(x=>({variant:x.dataset.feedingV2Visual,height:x.getBoundingClientRect().height,formOpen:x.querySelector(".feeding-record-form")?.open}))')
   assert all(x['height']<=900 for x in visuals) if w==390 else True,visuals
   assert page.locator('.feeding-record-form').evaluate('x=>x.open')==(w>640)
   buttons=page.locator('[data-feeding-v2-sequence] button').evaluate_all('xs=>xs.map(x=>({w:x.getBoundingClientRect().width,h:x.getBoundingClientRect().height}))');assert all(x['w']>=44 and x['h']>=44 for x in buttons)
   tables=page.locator('.tabla-apilable table').evaluate_all('xs=>xs.map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height,scrollWidth:x.scrollWidth,clientWidth:x.clientWidth,labels:[...x.querySelectorAll("td")].every(td=>!!td.dataset.label)}))');assert all(x['labels'] and x['scrollWidth']<=x['clientWidth'] for x in tables),tables
   assert all(x['height']<=900 for x in tables) if w==390 else True,tables
   shots(page,w,theme)
   sequenceSteps=[]
   for seq in page.locator('[data-feeding-v2-sequence]').all():
    assert seq.get_attribute('data-playing')=='false'
    heights=[]
    for step in range(4):
     if step:seq.locator('[data-action="next"]').click()
     assert seq.get_attribute('data-step')==str(step)
     assert seq.locator('[data-panel]:visible').count()==1
     heights.append(seq.bounding_box()['height'])
     geometry=seq.evaluate('x=>{let d=x.querySelector(".feeding-canvas").getBoundingClientRect(),c=x.querySelector(".feeding-controls").getBoundingClientRect(),s=x.querySelector("[data-active=true]").getBoundingClientRect();return {correctOrder:d.bottom<=c.top&&c.bottom<=s.top,block:s.bottom-d.top}}')
     assert geometry['correctOrder'] and (geometry['block']<=900 if w==390 else True),geometry
    sequenceSteps.append(heights)
   RESULT['views'].append({'width':w,'theme':theme,'initialVisuals':visuals,'sequenceHeightsAllSteps':sequenceSteps,'axe':axe,'buttonsMin44':True,'noPageOverflow':True,'tables':tables})
   ctx.close()
 # Impresión real de página completa con registro cerrado en móvil: before/afterprint nativos de page.pdf.
 ctx=browser.new_context(viewport={'width':390,'height':900});page=ctx.new_page();page.goto(URL,wait_until='networkidle')
 page.evaluate("""()=>{window.__print=[];for(const event of ['beforeprint','afterprint'])addEventListener(event,()=>window.__print.push({event,open:document.querySelector('.feeding-record-form').open,fields:[...document.querySelectorAll('.feeding-record-form input,.feeding-record-form textarea')].filter(x=>x.getBoundingClientRect().height>0).length}))}""")
 page.pdf(path=str(OUT/'pagina-completa-print-movil.pdf'),format='A4',print_background=True)
 events=page.evaluate('window.__print');assert events[0]['event']=='beforeprint' and events[0]['open'] and events[0]['fields']==10,events
 assert events[-1]['event']=='afterprint' and not events[-1]['open'],events
 RESULT['nativePagePrint']=events
 page.set_viewport_size({'width':1366,'height':900});page.wait_for_timeout(100);assert page.locator('.feeding-record-form').evaluate('x=>x.open')
 page.set_viewport_size({'width':390,'height':900});page.wait_for_timeout(100);assert not page.locator('.feeding-record-form').evaluate('x=>x.open')
 RESULT['resizeRecordOpenDesktopClosedMobile']=True
 # Botón de registro, conservando todos los valores y copia abierta.
 page.locator('.feeding-record-form summary').click()
 values=[]
 for i,f in enumerate(page.locator('.feeding-record-form input,.feeding-record-form textarea').all()):
  prefix=f'CAMPO{i+1}-';value=prefix+'Z'*(int(f.get_attribute('maxlength'))-len(prefix));values.append(value);f.fill(value)
 page.evaluate('window.print=()=>{window.__recordPrint={fields:document.querySelectorAll(".feeding-v2-print-copy .feeding-printed-value").length,open:[...document.querySelectorAll(".feeding-v2-print-copy details")].every(x=>x.open)}}')
 page.locator('.feeding-print').click();r=page.evaluate('window.__recordPrint');assert r['fields']==10 and r['open'],r
 page.pdf(path=str(OUT/'registro-print-ejemplo.pdf'),format='A4',print_background=True)
 import subprocess,re
 text=subprocess.check_output(['pdftotext','-raw',str(OUT/'registro-print-ejemplo.pdf'),'-']).decode()
 compact=re.sub(r'\s+','',text)
 assert all(value in compact for value in values),'Valores máximos incompletos en PDF'
 RESULT['recordPrint']={**r,'all10MaxLengthValuesInPDF':True};ctx.close()
 for js in [False,True]:
  ctx=browser.new_context(java_script_enabled=js,viewport={'width':390,'height':900},reduced_motion='reduce');page=ctx.new_page();page.goto(URL,wait_until='networkidle')
  if not js:
   assert page.locator('.feeding-record-form').evaluate('x=>x.open')
   assert page.locator('[data-feeding-v2-sequence] [data-panel]:visible').count()==8
   page.pdf(path=str(OUT/'pagina-completa-print-sin-js.pdf'),format='A4',print_background=True)
  else:
   assert page.locator('[data-action="play"]:disabled').count()==2
   for seq in page.locator('[data-feeding-v2-sequence]').all():seq.locator('[data-action="next"]').click();assert seq.get_attribute('data-step')=='1'
  ctx.close()
 RESULT['noJSAll8StepsAnd10Fields']=True;RESULT['reducedMotionManual']=True
 browser.close()
assert not RESULT['errors'],RESULT['errors']
(OUT/'verificacion-tecnica.json').write_text(json.dumps(RESULT,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(RESULT,ensure_ascii=False))
