from playwright.sync_api import sync_playwright
from pathlib import Path
import json
OUT=Path(__file__).parent
BASE='http://127.0.0.1:4173'
KEYS=['hurt','hunger','hydration','hygiene','happiness','mobility','moreGoodDays']
CASES={'minimo':[0]*7,'maximo':[10]*7,'dolor_cero_total60':[0]+[10]*6,'dolor_uno_total61':[1]+[10]*6,'todos_cinco':[5]*7,'misma_suma35_con_ceros':[0,10,10,10,5,0,0],'apetito_cero':[10,0,10,10,10,10,10],'balance_cero':[10,10,10,10,10,10,0]}
rows=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [390,820,1366]:
  for theme in ['light','dark']:
   ctx=browser.new_context(viewport={'width':width,'height':844},color_scheme=theme,reduced_motion='reduce')
   ctx.add_init_script(f"localStorage.setItem('theme','{theme}')")
   ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) else r.abort())
   page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   response=page.goto(BASE+'/herramientas/calculadora-calidad-vida-perros',wait_until='networkidle')
   assert response.status==200, response.status
   print('context',width,theme,flush=True)
   cases=CASES if width==390 and theme=='light' else {'dolor_cero_total60':CASES['dolor_cero_total60']}
   cases={k:v for k,v in cases.items() if k!='dolor_cero_total60'} | {'dolor_cero_total60':CASES['dolor_cero_total60']}
   for name,values in cases.items():
    if page.locator('#qol-result').is_visible(): page.locator('#qol-reset-fixed' if width<640 else '#qol-reset').click()
    page.locator('#qol-start').click()
    for value in values: page.locator('#qol-q-chips').get_by_role('radio',name=f'Valor {value} de 10',exact=True).click()
    score=int(page.locator('#qol-result-score').inner_text())
    warnings=page.locator('#qol-warnings').inner_text()
    assert score==sum(values),(name,score)
    assert 'no garantiza bienestar' in page.locator('#qol-human-msg').inner_text()
    assert 'Sigue así' not in page.locator('#qol-result').inner_text()
    if values[0]==0:assert 'Contacta con tu veterinario cuanto antes' in warnings
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    rows.append({'case':name,'width':width,'theme':theme,'score':score,'warnings':warnings,'expectedZeroCriteria':[KEYS[i] for i,v in enumerate(values) if v==0],'errors':list(errors)})
   page.locator('#qol-result').screenshot(path=str(OUT/f'local-calidad-{width}-{theme}.png'))
   # Ensure copied output keeps warnings and neutral interpretation; no external sharing is opened.
   page.evaluate("navigator.clipboard.writeText=async text=>window.__copied=text")
   page.locator('#qol-copy').click()
   assert 'no garantiza bienestar' in page.evaluate('window.__copied')
   assert 'Contacta con tu veterinario cuanto antes' in page.evaluate('window.__copied')
   page.emulate_media(media='print')
   assert page.locator('#qol-warnings').is_visible()
   assert page.locator('#qol-recommendation').is_visible()
   assert page.locator('#qol-breakdown').is_visible()
   if width==390 and theme=='light':page.pdf(path=str(OUT/'local-calidad-impresion.pdf'),format='A4',print_background=True)
   page.emulate_media(media='screen')
   assert not errors,errors
   ctx.close()
 # Home and age: same framework from shared module; no suggested individual genetic testing.
 ctx=browser.new_context(viewport={'width':390,'height':844})
 ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) else r.abort())
 page=ctx.new_page()
 for path in ['/','/herramientas/calculadora-edad-perro','/acerca-de']:
  page.goto(BASE+path,wait_until='networkidle')
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  if path=='/':assert page.locator('img[src*="avatar-vet"]').count()==0
  if 'edad-perro' in path:
   assert 'Fórmula de Wang' in page.locator('body').inner_text()
   assert 'Según su ADN' not in page.locator('body').inner_text()
  if path=='/acerca-de':assert 'Gonzalo' in page.locator('main').inner_text()
  page.screenshot(path=str(OUT/('local-'+('portada' if path=='/' else path.split('/')[-1])+'.png')),full_page=False)
 browser.close()
(OUT/'local-navegador.json').write_text(json.dumps({'method':'Chromium local, build estático; terceros bloqueados. No acredita despliegue ni consentimiento.','cases':rows},ensure_ascii=False,indent=2))
print('PASS',len(rows),'recorridos de calidad de vida; móvil/tablet/escritorio, claro/oscuro, copia e impresión; portada, edad y autoría.')
