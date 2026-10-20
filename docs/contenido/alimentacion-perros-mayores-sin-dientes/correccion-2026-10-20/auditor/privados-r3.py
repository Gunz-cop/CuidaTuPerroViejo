from pathlib import Path
from playwright.sync_api import sync_playwright
import json,re,subprocess,hashlib
OUT=Path(__file__).resolve().parent;ROOT=next(x for x in OUT.parents if (x/'AGENTS.md').exists()); D=OUT.parent; r={'checks':[],'hashes':{}}
def ck(n,ok,e=None):r['checks'].append({'check':n,'pass':bool(ok),'evidence':e})
for row in json.loads((D/'versiones-congeladas.json').read_text()):
 f=ROOT/row['path'];h=hashlib.sha256(f.read_bytes()).hexdigest();r['hashes'][row['path']]=h;ck('hash '+row['path'],h==row['sha256'])
html=D/'revision/lectura-interactiva.html';pdf=D/'revision/articulo-completo.pdf'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':900});requests=[];errors=[]
 def block(route):requests.append(route.request.url);route.abort()
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('http://**',block);page.route('https://**',block);page.route('http://127.0.0.1:8766/__audit_r3__',lambda route:route.fulfill(status=200,content_type='text/html; charset=utf-8',body=html.read_text()))
 page.goto('http://127.0.0.1:8766/__audit_r3__',wait_until='load');page.wait_for_timeout(400)
 ck('HTML cinco imágenes embebidas',page.locator('article img').count()==5 and page.locator('article img').evaluate_all('(xs)=>xs.every(x=>x.complete&&x.naturalWidth>0)'))
 for s in page.locator('[data-feeding-v2-sequence]').all():
  s.locator('[data-action="next"]').click();ck('HTML paso manual '+s.get_attribute('data-variant'),s.get_attribute('data-step')=='1')
 ck('HTML red externa cero',not requests,requests);ck('HTML errores JS cero',not errors,errors);ck('HTML sin overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
 page.locator('.review-note button').click();ck('HTML tema oscuro',page.evaluate('document.documentElement.classList.contains("dark")'));page.screenshot(path=str(OUT/'capturas/privado390.png'))
 page.close();b.close()
info=subprocess.check_output(['pdfinfo',str(pdf)],text=True);text=subprocess.check_output(['pdftotext',str(pdf),'-'],text=True);flat=lambda t:re.sub(r'\s+','',t)
ck('PDF etiquetado 19p',bool(re.search(r'^Tagged:\s+yes',info,re.M)) and bool(re.search(r'^Pages:\s+19',info,re.M)),info)
for h in ['Separa la base indicada','Adapta solo si está permitido','Más volumen, la misma base','Ofrece y anota lo que quede','Identifica lo que ofreciste','Separa sobrante y derrame','Distingue medido, estimado y desconocido','Traslada datos y preguntas','¿Tengo que cambiar a un alimento senior por su edad?','No reduzcas la comida solo porque sea mayor','Qué ocurrió durante o después de comer']:
 ck('PDF incluye '+h,flat(h) in flat(text))
# Recurso de registro en PDF del sitio real, impreso con details inicialmente cerrado, comprobado aparte del PDF privado.
for name in ['articulo-completo-js.pdf','articulo-completo-sin-js.pdf']:
 f=OUT/'capturas'/name
 if f.exists():
  t=subprocess.check_output(['pdftotext',str(f),'-'],text=True);ck('PDF sitio campos '+name,all(flat(x) in flat(t) for x in ['Qué ocurrió durante o después de comer','Preguntas e indicaciones para la revisión','Persona cuidadora']))
r['harness_note']='La ejecución inicial buscó Rellenar el registro en PDF, pero ese summary se oculta correctamente al imprimir. Se conserva JSON inicial y se verifica la etiqueta de contenido del registro en lugar de exigir interfaz de pantalla en papel.'
r['failures']=[x for x in r['checks'] if not x['pass']];(OUT/'privados-r3.json').write_text(json.dumps(r,ensure_ascii=False,indent=2));print(json.dumps({'checks':len(r['checks']),'failures':r['failures']},ensure_ascii=False))
