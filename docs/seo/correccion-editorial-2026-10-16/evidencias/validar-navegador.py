import json, pathlib, urllib.request, urllib.parse, xml.etree.ElementTree as ET, concurrent.futures, hashlib
from playwright.sync_api import sync_playwright

ROOT=pathlib.Path.cwd()
OUT=ROOT/'docs/seo/correccion-editorial-2026-10-16/evidencias'
BASE='http://127.0.0.1:4321'
site='https://cuidatuperroviejo.com'
pages=[]
for f in (ROOT/'dist/client').glob('sitemap-*.xml'):
    if 'index' in f.name:continue
    for e in ET.parse(f).iter():
        if e.tag.endswith('loc') and e.text and e.text.startswith(site):pages.append(e.text[len(site):] or '/')
pages=sorted(set(pages))
results=[]; resources=set(); links=set(); errors=[]
screens={'/salud-perros-mayores/sindrome-cushing-perros-mayores','/alimentacion-perros-senior/comida-casera-perros-mayores','/cuidados-paliativos-perros/ulceras-presion-perros','/cuidados-paliativos-perros/como-dar-medicacion-perro','/salud-perros-mayores/salud-dental-perros-mayores','/politica-de-privacidad','/politica-de-cookies','/herramientas/calculadora-calidad-vida-perros'}
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for width in [1440,390]:
        context=browser.new_context(viewport={'width':width,'height':900},device_scale_factor=1)
        context.route('**/*',lambda route:route.continue_() if route.request.url.startswith(BASE) else route.abort())
        page=context.new_page()
        for path in pages:
            response=page.goto(BASE+path,wait_until='networkidle')
            page.evaluate('''async()=>{for(const img of document.images){img.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));}''')
            page.wait_for_function("[...document.images].every(i=>i.complete)")
            record=page.evaluate('''()=>({title:document.title,h1:document.querySelectorAll('h1').length,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,srcset:i.srcset,alt:i.getAttribute('alt'),loaded:i.complete&&i.naturalWidth>0})),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})''')
            record.update(path=path,status=response.status,width=width)
            for img in record['images']:
                if img['src'] and img['src'].startswith('/'):resources.add(img['src'])
                if img['currentSrc'].startswith(BASE):resources.add(urllib.parse.urlsplit(img['currentSrc']).path)
                for candidate in img['srcset'].split(','):
                    pathpart=candidate.strip().split(' ')[0]
                    if pathpart.startswith('/'):resources.add(pathpart)
                if not img['loaded']:errors.append({'path':path,'width':width,'broken_image':img})
            for href in record['links']:
                if href.startswith('/') and not href.startswith('//'):links.add(urllib.parse.urlsplit(href).path)
            if record['scrollWidth']>width:errors.append({'path':path,'width':width,'overflow':record['scrollWidth']})
            if record['h1']!=1 or record['status']!=200:errors.append({'path':path,'width':width,'h1':record['h1'],'status':record['status']})
            if width==390 and path in screens:
                page.screenshot(path=str(OUT/('movil-'+path.split('/')[-1]+'.png')),full_page=True)
            results.append(record)
        # Recorridos de herramientas sin enviar consultas ni formularios externos.
        page.goto(BASE+'/herramientas/calculadora-calidad-vida-perros',wait_until='networkidle')
        tool={'path':'/herramientas/calculadora-calidad-vida-perros','buttons':page.locator('button').all_text_contents()}
        (OUT/'herramienta-botones.json').write_text(json.dumps(tool,ensure_ascii=False,indent=2))
        context.close()
    browser.close()

def check(path):
    try:
        f=urllib.request.urlopen(BASE+path,timeout=10)
        return {'path':path,'status':f.status,'type':f.headers.get('Content-Type')}
    except Exception as e:return {'path':path,'error':str(e),'status':getattr(e,'code',None)}
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
    checked=list(pool.map(check,sorted(resources|links)))
data={'method':'Built static HTML served locally with extension resolution; no server API certification. Third-party requests blocked to exclude advertising. No messages/forms/assistant queries submitted.','pages':pages,'browser':results,'local_resources':checked,'errors':errors}
(OUT/'navegador-local.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps({'pages':len(pages),'viewports':[1440,390],'visits':len(results),'resources':len(checked),'resource_failures':[x for x in checked if x['status']!=200],'errors':errors},ensure_ascii=False,indent=2))
