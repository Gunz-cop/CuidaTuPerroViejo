"""Presentación privada de la misma guía: HTML autocontenido y PDF compacto.
Ejecutar después de revision-navegador.py. No modifica producto ni despliega.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json,re,sys
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'AGENTS.md').exists())
OUT=Path(__file__).resolve().parent.parent/'revision'
p=OUT/'lectura-interactiva.html';html=p.read_text()
html=re.sub(r'<style id="review-print">.*?</style>','',html,flags=re.S)
html=re.sub(r'<div class="review-print-status">.*?</div>','',html,flags=re.S)
style='''<style id="review-print">.review-print-status{display:none}#reading-progress-bar{display:none!important}@media print{
 @page{size:A4;margin:14mm}
 html,body{background:#fff!important;color:#111!important}
 main#main-content{padding:0!important;max-width:none!important;width:100%!important}
 .review-note,.mobile-toc-container,article>.relative>.grid>aside,#reading-progress-bar{display:none!important}
 .review-print-status{display:block;font:9pt/1.4 system-ui,sans-serif;border-bottom:1px solid #999;padding-bottom:6pt;margin-bottom:12pt;color:#333}
 article>.relative>.grid{display:block!important}
 article>.relative>.grid>div{max-width:none!important;width:100%!important}
 article>header h1{font-size:22pt!important;line-height:1.2!important}
 article>header{margin-bottom:14pt!important}
 .content-body{font-size:10.5pt!important;line-height:1.45!important}
 .content-body p,.content-body li{font-size:10.5pt!important;line-height:1.45!important;margin:6pt 0!important;orphans:2;widows:2}
 .content-body ul,.content-body ol{margin:6pt 0!important}
 .content-body h2{font-size:17pt!important;line-height:1.25!important;margin:16pt 0 8pt!important;break-after:avoid}
 .content-body h3{font-size:13pt!important;line-height:1.3!important;margin:11pt 0 5pt!important;break-after:avoid}
 .content-body h4{font-size:11pt!important;line-height:1.3!important;break-after:avoid}
 article figure{break-inside:avoid;margin:12pt auto!important}
 article img{max-height:100mm!important;max-width:100%!important;width:auto!important;object-fit:contain!important;margin-inline:auto!important}
 article figcaption{font-size:9pt!important;line-height:1.35!important}
 .content-body table{display:table!important;width:100%!important;min-width:0!important;margin:8pt 0!important}
 .content-body th,.content-body td{font-size:9.5pt!important;line-height:1.35!important;padding:5pt!important}
 .content-body tr{break-inside:avoid}
 .feeding-v2{padding:10pt!important;margin:12pt 0!important}
 .feeding-v2 .feeding-steps li{padding:4pt 0!important}
 .feeding-v2 .feeding-note,.feeding-v2 .feeding-stop{font-size:9.5pt!important;line-height:1.4!important}
 .faq-section summary{font-size:11pt!important;padding:7pt!important;break-after:avoid}
 .faq-section details>div{padding:7pt!important}
}</style>'''
html=html.replace('</head>',style+'</head>');html=html.replace('<body>','<body><div class="review-print-status">Para revisión del propietario · versión v2 sin publicar</div>',1);p.write_text(html)
report={'scope':'Artefactos privados de revisión, mismo artículo y recursos; PDF con maquetación compacta y sin navegación general. No modifica el sitio ni publica.','external_requests':[],'js_errors':[]}
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [390,1366]:
  page=browser.new_page(viewport={'width':width,'height':900})
  page.on('pageerror',lambda e:report['js_errors'].append(str(e)))
  def deny(route):report['external_requests'].append(route.request.url);route.abort()
  page.route('http://**',deny);page.route('https://**',deny)
  page.route('http://127.0.0.1:8766/__revision-local__',lambda route:route.fulfill(status=200,content_type='text/html; charset=utf-8',body=html))
  page.goto('http://127.0.0.1:8766/__revision-local__',wait_until='load')
  page.locator('article img').evaluate_all('async xs=>{await Promise.all(xs.map(x=>x.decode()))}')
  assert page.evaluate('document.documentElement.scrollWidth===innerWidth')
  for variant in ['base','ingesta']:
   seq=page.locator(f'[data-feeding-v2-visual="{variant}"] [data-feeding-v2-sequence]');assert seq.get_attribute('data-step')=='0';seq.locator('[data-action="next"]').click();assert seq.get_attribute('data-step')=='1'
   page.locator(f'[data-feeding-v2-visual="{variant}"]').screenshot(path=str(OUT/f'{width}-animacion-{variant}.png'))
  page.evaluate('scrollTo(0,0)');page.screenshot(path=str(OUT/f'{width}-lectura.png'))
  if width==1366 and '--sin-pdf' not in sys.argv:
   page.locator('article details').evaluate_all('xs=>xs.forEach(x=>x.open=true)');page.emulate_media(media='print')
   assert page.locator('[data-panel]:visible').count()==8
   assert page.locator('.faq-section details[open]').count()==8
   page.pdf(path=str(OUT/'articulo-completo.pdf'),format='A4',print_background=True,tagged=True,outline=True)
  page.close()
 browser.close()
assert not report['external_requests'],report['external_requests'];assert not report['js_errors'],report['js_errors']
report['validation_mode']='Respuesta local interceptada de Playwright; file:// está bloqueado por la política de Chromium del entorno. Recursos y scripts incluidos, sin solicitudes externas.'
report['artifacts']=[{'path':str(x.relative_to(ROOT)),'bytes':x.stat().st_size,'sha256':hashlib.sha256(x.read_bytes()).hexdigest()} for x in [p,OUT/'articulo-completo.pdf']]
(OUT/'verificacion-lectura.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
