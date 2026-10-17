from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
import threading,json
from playwright.sync_api import sync_playwright,expect
root=Path.cwd()/'dist/client'
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(root),**kw)
 def do_GET(self):
  p=urlparse(self.path).path
  if not Path(p).suffix:self.path=p+'.html'
  return super().do_GET()
 def log_message(self,*a):pass
srv=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=srv.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{srv.server_port}/higiene-hogar-perros-senior/banar-perro-viejo-movilidad-reducida';results=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for js in [True,False]:
  c=b.new_context(viewport={'width':390,'height':900},java_script_enabled=js)
  c.route('**/*',lambda r:r.continue_() if r.request.url.startswith(f'http://127.0.0.1:{srv.server_port}') else r.abort())
  page=c.new_page();page.goto(url,wait_until='networkidle');gs=page.locator('[data-bano-sequence]');assert gs.count()==3
  for g in gs.all():
   panels=g.locator('[data-panel]');assert panels.count()==4
   assert sum(x.is_visible() for x in panels.all())==(1 if js else 4)
   if js:
    g.locator('[data-action="next"]').click();assert panels.nth(1).is_visible()
    assert sum(x.is_visible() for x in panels.all())==1
   page.emulate_media(media='print')
   assert sum(x.is_visible() for x in panels.all())==4
   assert not g.locator('.controls').is_visible()
   page.emulate_media(media='screen')
   assert sum(x.is_visible() for x in panels.all())==(1 if js else 4)
   results.append({'javascript':js,'variant':g.get_attribute('data-variant'),'screenVisible':1 if js else 4,'printVisible':4,'returnScreenCorrect':True})
  c.close()
 b.close()
srv.shutdown()
out=Path('docs/seo/correcciones-confianza-2026-10-17/edicion-tres-guias/evidencias/impresion-e2-auditor.json');out.write_text(json.dumps({'method':'Ejecución independiente Chromium local build; terceros bloqueados. No acredita preview o producción.','cases':results},indent=2));print('PASS6 estados:3variantes con y sinJS; pantalla→impresión→pantalla;12pasos imprimibles.')
