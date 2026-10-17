from playwright.sync_api import sync_playwright
from pathlib import Path
import json
BASE='http://127.0.0.1:4321';out=[]
paths=['/','/404','/gracias','/acerca-de','/contacto','/politica-de-cookies','/politica-de-privacidad','/politica-editorial','/asistente-ia','/herramientas/calculadora-calidad-vida-perros','/herramientas/selector-movilidad-perros-mayores','/herramientas/calculadora-edad-perro','/salud-perros-mayores/sindrome-cushing-perros-mayores','/alimentacion-perros-senior','/movilidad-dolor-perros-mayores']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [1440,390]:
  c=b.new_context(viewport={'width':width,'height':900});c.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) else r.abort())
  for path in paths:
   page=c.new_page();r=page.goto(BASE+path,wait_until='domcontentloaded');page.keyboard.press('Tab');before=page.evaluate('document.activeElement.getAttribute("href")');assert before=='#main-content',(path,width,before)
   page.keyboard.press('Enter');page.wait_for_function('document.activeElement.id==="main-content"',timeout=5000)
   a=page.evaluate('''()=>({id:document.activeElement.id,tag:document.activeElement.tagName,tabindex:document.activeElement.getAttribute('tabindex'),targets:document.querySelectorAll('#main-content').length,mainCount:document.querySelectorAll('main').length})''');assert a=={'id':'main-content','tag':'MAIN','tabindex':'-1','targets':1,'mainCount':1},(path,a)
   out.append({'path':path,'width':width,'status':r.status,'keyboard_tab_enter':True,**a});page.close()
  c.close()
 b.close()
Path('docs/seo/correccion-editorial-2026-10-16/evidencias/auditor-anclas-teclado.json').write_text(json.dumps(out,indent=2));print('KEYBOARD',len(out),'PASSED')
