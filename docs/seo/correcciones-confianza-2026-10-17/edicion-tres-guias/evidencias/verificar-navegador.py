from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlparse,unquote
import json,threading
from playwright.sync_api import sync_playwright,expect
OUT=Path(__file__).parent;ROOT=Path.cwd()/'dist/client'
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def do_GET(self):
  path=urlparse(self.path).path
  if path=='/':self.path='/index.html'
  elif not Path(path).suffix and (ROOT/(path.lstrip('/')+'.html')).is_file():self.path=path+'.html'
  return super().do_GET()
 def log_message(self,*a):pass
server=ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
BASE=f'http://127.0.0.1:{server.server_port}'
SLUGS=['banar-perro-viejo-movilidad-reducida','limpieza-ojos-oidos-perros-ancianos','callosidades-higromas-codos-perros-senior']
rows=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for slug in SLUGS:
  for width in [390,820,1366]:
   for theme in ['light','dark']:
    ctx=b.new_context(viewport={'width':width,'height':900},color_scheme=theme)
    ctx.add_init_script(f"localStorage.setItem('theme','{theme}')")
    ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) else r.abort())
    page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    response=page.goto(BASE+'/higiene-hogar-perros-senior/'+slug,wait_until='networkidle');assert response.status==200
    assert page.locator('h1').count()==1
    page.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
    images=page.evaluate("async()=>await Promise.all([...document.querySelectorAll('main img')].map(async i=>{try{await i.decode()}catch{}return {src:i.currentSrc,loaded:i.naturalWidth>0,alt:i.alt}}))")
    assert all(i['loaded'] and i['alt'] for i in images),images
    svgimages=page.evaluate("async()=>await Promise.all([...document.querySelectorAll('main svg image')].map(async i=>{const src=i.getAttribute('href');const r=await fetch(src);return {src,status:r.status}}))")
    assert all(i['status']==200 for i in svgimages),svgimages
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),slug
    fragments=page.evaluate("[...document.querySelectorAll('main a[href^=\"#\"]')].map(a=>({href:a.getAttribute('href'),exists:!!document.getElementById(decodeURIComponent(a.hash.slice(1)))}))")
    assert all(f['exists'] for f in fragments),[f for f in fragments if not f['exists']]
    # All retained controls: manual navigation, play/stop, keyboard and reduced-motion.
    sequences=[]
    for selector,action,panels,position in [('[data-bano-sequence]','data-action','data-panel','.position'),('[data-ojos-visual="secuencia"]','data-ojv-action','data-ojv-panel','.ojv-position')]:
     for g in page.locator(selector).all():
      assert g.get_attribute('data-playing')=='false'
      nxt=g.locator(f'[{action}="next"]');nxt.click();assert '2' in g.locator(position).inner_text()
      g.locator(f'[{action}="prev"]').click();assert '1' in g.locator(position).inner_text()
      nxt.focus();page.keyboard.press('Enter');assert '2' in g.locator(position).inner_text()
      play=g.locator(f'[{action}="play"]');expect(play).to_be_enabled();play.click();assert g.get_attribute('data-playing')=='true';play.click();assert g.get_attribute('data-playing')=='false'
      page.emulate_media(reduced_motion='reduce');expect(play).to_be_disabled();assert g.get_attribute('data-playing')=='false'
      page.emulate_media(media='print')
      for panel in g.locator(f'[{panels}]').all():assert panel.is_visible(),f'Print panel hidden {slug}'
      page.emulate_media(media='screen',reduced_motion='no-preference')
      sequences.append(g.get_attribute('data-variant') or g.get_attribute('data-ojos-visual'))
    for g in page.locator('[data-higroma-animation]').all():
     btn=g.locator('button');assert btn.get_attribute('aria-pressed')=='false';btn.click();assert btn.get_attribute('aria-pressed')=='true';btn.click();assert btn.get_attribute('aria-pressed')=='false'
     page.emulate_media(reduced_motion='reduce');expect(btn).to_be_disabled();page.emulate_media(reduced_motion='no-preference')
     sequences.append(g.get_attribute('data-variant'))
    assert len(sequences)=={'banar-perro-viejo-movilidad-reducida':3,'limpieza-ojos-oidos-perros-ancianos':1,'callosidades-higromas-codos-perros-senior':3}[slug],(slug,sequences)
    if width in [390,1366]:
     page.locator('main h2').first.scroll_into_view_if_needed();page.screenshot(path=str(OUT/f'{slug}-{width}-{theme}.png'))
    assert not errors,errors
    rows.append({'slug':slug,'width':width,'theme':theme,'status':response.status,'documentWidth':page.evaluate('document.documentElement.scrollWidth'),'images':images,'svgImages':svgimages,'fragments':fragments,'interactions':sequences,'errors':errors})
    print('PASS',slug,width,theme,flush=True);ctx.close()
  # The guidance and complete steps remain available without JavaScript.
  ctx=b.new_context(viewport={'width':390,'height':900},java_script_enabled=False)
  ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(BASE) else r.abort())
  page=ctx.new_page();page.goto(BASE+'/higiene-hogar-perros-senior/'+slug,wait_until='networkidle')
  counts=[]
  for s in ['[data-bano-sequence] [data-panel]','[data-ojos-visual="secuencia"] [data-ojv-panel]']:
   counts.append(page.locator(s).count())
   for panel in page.locator(s).all():assert panel.is_visible()
  if slug=='banar-perro-viejo-movilidad-reducida':assert counts[0]==12,counts
  if slug=='limpieza-ojos-oidos-perros-ancianos':assert counts[1]==4,counts
  ctx.close()
 b.close()
server.shutdown()
(OUT/'navegador-local.json').write_text(json.dumps({'method':'Chromium local sobre build estático; terceros bloqueados. No acredita preview/producción ni consentimiento.','cases':rows,'withoutJS':'tres páginas con instrucciones/paneles disponibles'},ensure_ascii=False,indent=2))
print('PASS:18 recorridos,3 sinJS; imágenes, anclas, controles y reduced-motion/print comprobados.')
