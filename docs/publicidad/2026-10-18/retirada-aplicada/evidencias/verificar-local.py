from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
import json,threading,re,hashlib
ROOT=Path.cwd();OUT=Path(__file__).parent;BUILD=ROOT/'dist/client'
BAD=re.compile(r'adsterra|highperformanceformat|profitabledisplaynetwork|atOptions|ad-slot|10df6b95565e4b70f014e77906b6218c|77fb25612074d9660a62a330b778e5ad',re.I)
scanned=[]
for p in BUILD.rglob('*'):
 if p.is_file() and p.suffix in ['.html','.js','.css','.json','.md','.txt','.xml']:
  assert not BAD.search(p.read_text(errors='replace')),str(p)
  scanned.append(str(p.relative_to(BUILD)))
assert not (BUILD/'docs').exists()
fixture=json.loads((ROOT/'tests/agent-readiness/fixtures/f4a/movilidad-v1.1.json').read_text())
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(BUILD),**kw)
 def do_GET(self):
  path=urlparse(self.path).path
  if path=='/':self.path='/index.html'
  elif not Path(path).suffix and (BUILD/(path.lstrip('/')+'.html')).is_file():self.path=path+'.html'
  return super().do_GET()
 def log_message(self,*a):pass
server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start();BASE=f'http://127.0.0.1:{server.server_port}'
tools=['/herramientas/selector-movilidad-perros-mayores','/herramientas/calculadora-calidad-vida-perros','/herramientas/calculadora-edad-perro']
others=['/','/salud-perros-mayores','/higiene-hogar-perros-senior','/higiene-hogar-perros-senior/banar-perro-viejo-movilidad-reducida','/higiene-hogar-perros-senior/limpieza-ojos-oidos-perros-ancianos','/higiene-hogar-perros-senior/callosidades-higromas-codos-perros-senior','/salud-perros-mayores/salud-dental-perros-mayores','/cuidados-paliativos-perros/como-dar-medicacion-perro','/cuidados-paliativos-perros/ulceras-presion-perros','/politica-de-privacidad','/politica-de-cookies']
rows=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for path in tools+others:
  for width in [390,1366]:
   for theme in (['light','dark'] if path in tools else ['light']):
    ctx=b.new_context(viewport={'width':width,'height':900},color_scheme=theme,reduced_motion='reduce')
    ctx.add_init_script(f"localStorage.setItem('theme','{theme}')")
    # An Adsterra request would be allowed and fail the assertion below, never masked by abort.
    ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) or BAD.search(r.request.url) else r.abort())
    page=ctx.new_page();errors=[];requests=[]
    page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
    response=page.goto(BASE+path,wait_until='networkidle');assert response.status==200
    page.evaluate("document.querySelectorAll('main img').forEach(i=>i.loading='eager')")
    imgs=page.evaluate("async()=>await Promise.all([...document.querySelectorAll('main img')].map(async i=>{try{await i.decode()}catch{}return {src:i.currentSrc,loaded:i.naturalWidth>0}}))")
    assert all(i['loaded'] for i in imgs),imgs
    assert page.locator('.ad-slot,[data-ad-pending],script[src*="highperformanceformat"]').count()==0
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),path
    details={}
    if path==tools[0]:
     outputs=[]
     for index,(key,expected) in enumerate(fixture['results'].items()):
      if index:page.locator('#m5rstFixed' if width<640 else '#m5rst').click()
      page.locator('#m5start').click();page.locator('#m5oo1 > button').nth('LMS'.index(key[0])).click();page.locator('#m5oo2 > button').nth('AB'.index(key[1])).click()
      assert page.locator('#m5rtit').inner_text()==expected['title']
      # Severe descriptions include a block-level strong: compare contract textContent, not visual line breaks.
      assert page.locator('#m5rdesc').text_content()==expected['description']
      assert page.locator('#m5prods a').count()==0
      assert page.locator('#m5alert').is_visible()==key.startswith('S')
      if key.startswith('S'):assert 'hoy al veterinario' in page.locator('#m5rdesc').inner_text()
      assert 'Estas opciones orientan preguntas para el veterinario' in page.locator('#m5s3 > p').last.inner_text()
      outputs.append(key)
     page.evaluate("navigator.clipboard.writeText=async t=>window.__copied=t")
     page.locator('#m5copy').click();assert 'urgencia' in page.evaluate('window.__copied')
     details={'results':outputs,'noAffiliateLinks':True,'copyWarnings':True}
     page.locator('#m5s3').screenshot(path=str(OUT/f'movilidad-{width}-{theme}.png'))
    elif path==tools[1]:
     cases=[]
     for name,values in [('min',[0]*7),('max',[10]*7),('dolor0',[0]+[10]*6)]:
      page.evaluate("document.querySelector('#qol-reset').click()")
      page.locator('#qol-start').click()
      for v in values:page.locator('#qol-q-chips').get_by_role('radio',name=f'Valor {v} de 10',exact=True).click()
      assert int(page.locator('#qol-result-score').inner_text())==sum(values)
      assert 'no garantiza bienestar' in page.locator('#qol-human-msg').inner_text()
      if name=='dolor0':assert 'Contacta con tu veterinario cuanto antes' in page.locator('#qol-warnings').inner_text()
      cases.append({'case':name,'score':sum(values)})
     page.evaluate("navigator.clipboard.writeText=async t=>window.__copied=t")
     page.locator('#qol-copy').click();assert 'Contacta con tu veterinario cuanto antes' in page.evaluate('window.__copied')
     page.emulate_media(media='print');assert page.locator('#qol-warnings').is_visible() and page.locator('#qol-breakdown').is_visible();page.emulate_media(media='screen')
     details={'profiles':cases,'copyAndPrintWarnings':True}
    elif path==tools[2]:
     before=page.locator('#dat-sr').inner_text();page.locator('#dat-years').focus();page.keyboard.press('End');assert before!=page.locator('#dat-sr').inner_text();assert 'Fórmula de Wang' in page.locator('main').inner_text();details={'changesAgeWithKeyboard':True}
    if path.endswith('salud-dental-perros-mayores'):
     g=page.locator('[data-dental-guide]')
     for i in range(4):g.locator('[data-step]').nth(i).click();assert g.locator(f'[data-panel="{i}"]').is_visible()
     page.emulate_media(media='print');assert all(x.is_visible() for x in g.locator('[data-panel]').all());page.emulate_media(media='screen');details={'dentalSteps':4}
    if 'banar-perro' in path or 'limpieza-ojos' in path:
     page.emulate_media(media='print')
     panels=page.locator('[data-bano-sequence] [data-panel],[data-ojos-visual="secuencia"] [data-ojv-panel]')
     expected=12 if 'banar-perro' in path else 4
     assert panels.count()==expected and all(x.is_visible() for x in panels.all());page.emulate_media(media='screen');details={'printSteps':expected}
    # Top, middle and bottom exercise scrolling and any residual lazy ad insertion.
    page.evaluate('scrollTo(0,document.body.scrollHeight/2)');page.wait_for_timeout(120);page.evaluate('scrollTo(0,document.body.scrollHeight)');page.wait_for_timeout(120)
    assert not [u for u in requests if BAD.search(u)],requests
    assert not errors,errors
    rows.append({'path':path,'width':width,'theme':theme,'status':response.status,'noAdSlots':True,'noAdRequests':True,'images':len(imgs),'details':details,'pageErrors':errors})
    print('PASS',path,width,theme,flush=True);ctx.close()
 b.close()
server.shutdown()
(OUT/'navegador-local.json').write_text(json.dumps({'method':'Build local Chromium; terceros no publicitarios bloqueados; Adsterra NO bloqueado. No acredita producción, consentimiento ni CMP.','staticFilesScanned':len(scanned),'cases':rows},ensure_ascii=False,indent=2)+'\n')
print('PASS',len(rows),'recorridos; build sin scripts/slots/claves publicitarias.')
