from pathlib import Path
import json
from playwright.sync_api import sync_playwright
OUT=Path('/workspace/CuidaTuPerroViejo/docs/contenido/alimentacion-perros-mayores-sin-dientes/reinicio-v2/validacion-creacion')
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);p=b.new_page();p.goto('http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes',wait_until='networkidle')
 p.locator('[data-feeding-v2-visual="registro"] input').first.fill('20/10/2026 — ejemplo de prueba')
 p.evaluate("window.__printObserved={before:false,copyDuring:false,after:false};addEventListener('beforeprint',()=>{window.__printObserved.before=true;window.__printObserved.copyDuring=!!document.querySelector('.feeding-v2-print-copy')});addEventListener('afterprint',()=>window.__printObserved.after=true)")
 p.locator('.feeding-print').click();p.wait_for_function('window.__printObserved.after===true');r=p.evaluate('window.__printObserved');assert r['before'] and r['copyDuring'] and r['after'];assert p.locator('.feeding-v2-print-copy').count()==0;r['copy_removed_afterprint']=True;r['method']='click real, eventos nativos beforeprint/afterprint Chromium headless; sin interceptar window.print'
 (OUT/'impresion-eventos-reales.json').write_text(json.dumps(r,ensure_ascii=False,indent=2));print(r);b.close()
