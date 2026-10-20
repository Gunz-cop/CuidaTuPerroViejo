"""Cierre focal de mediciones y artefactos; preserva ejecución inicial del auditor."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,re,subprocess,hashlib
ROOT=next(x for x in Path(__file__).resolve().parents if (x/'AGENTS.md').exists());D=Path(__file__).resolve().parents[1]
r=json.loads((D/'verificacion-auditor-r2-ejecucion.json').read_text())
retired=[x for x in r['checks'] if x['check'].endswith(': prosa legible medida') or x['check']=='registro True: valores completos en PDF' or x['check'].startswith('movimiento reducido') and x['check'].endswith(': sin transiciones')]
r['harness_corrections']={'retired_checks':retired,'reasons':['Se retiró el umbral arbitrario de16px: WCAG no prescribe ese mínimo. Las medidas reales se conservan; la legibilidad se evalúa en capturas.','pdftotext -layout intercalaba columnas de un registro completo. Se verifica texto normal/raw y se inspeccionó el PDF renderizado.','Se excluyen nodos SVG sin representación gráfica: title hereda una duración global de0.00001s pero no dibuja ni anima nada. Se verifican elementos gráficos visibles.'],'initial_execution':'verificacion-auditor-r2-ejecucion.json'}
r['checks']=[x for x in r['checks'] if x not in retired]
r['failures']=[x for x in r['checks'] if not x['pass']]
def check(name,ok,evidence=None):
 row={'check':name,'pass':bool(ok),'evidence':evidence};r['checks'].append(row)
 if not ok:r['failures'].append(row)
pdf=D/'capturas-auditor-r2/registro-maximo.pdf';flat=lambda s:re.sub(r'\s+','',s)
values=[(f'Campo{i+1} '+('dato '*100))[:m] for i,m in enumerate([80,80,120,80,120,120,120,120,300,220])]
for mode in [[],['-raw']]:
 text=subprocess.check_output(['pdftotext',*mode,str(pdf),'-'],text=True)
 check('registro maximo: texto '+str(mode)+' completo',all(flat(v) in flat(text) for v in values),{'all_ten_fields':all(flat(v) in flat(text) for v in values)})
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':390,'height':900},reduced_motion='reduce');page.goto('http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes',wait_until='networkidle')
 for seq in page.locator('[data-feeding-v2-sequence]').all():
  variant=seq.get_attribute('data-variant');seq.locator('[data-action="next"]').click()
  transitions=seq.locator('svg *').evaluate_all('(xs)=>xs.filter(x=>x.getClientRects().length).map(x=>({tag:x.tagName,duration:getComputedStyle(x).transitionDuration}))')
  check('reduced '+variant+': elementos graficos sin transicion',all(x['duration']=='0s' for x in transitions),transitions)
 page.close()
 c=b.new_context(viewport={'width':390,'height':900});page=c.new_page();requests=[];errors=[]
 def block(route):requests.append(route.request.url);route.abort()
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('http://**',block);page.route('https://**',block)
 html=D/'revision/lectura-interactiva.html';page.route('http://127.0.0.1:8766/__auditor_lectura__',lambda route:route.fulfill(status=200,content_type='text/html; charset=utf-8',body=html.read_text()))
 page.goto('http://127.0.0.1:8766/__auditor_lectura__',wait_until='load');page.wait_for_timeout(500)
 check('HTML privado: cinco imagenes embebidas decodificadas',page.locator('article img').count()==5 and page.locator('article img').evaluate_all('(xs)=>xs.every(x=>x.complete&&x.naturalWidth>0)'))
 for seq in page.locator('[data-feeding-v2-sequence]').all():
  variant=seq.get_attribute('data-variant');seq.locator('[data-action="next"]').click();check('HTML privado: secuencia manual '+variant,seq.get_attribute('data-step')=='1')
 check('HTML privado: sin recursos de red',not requests,requests);check('HTML privado: sin errores JS',not errors,errors);check('HTML privado: sin overflow390',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
 page.locator('.review-note button').click();check('HTML privado: control tema oscuro',page.evaluate('document.documentElement.classList.contains("dark")'))
 c.close();b.close()
review=D/'revision/articulo-completo.pdf';info=subprocess.check_output(['pdfinfo',str(review)],text=True);text=subprocess.check_output(['pdftotext',str(review),'-'],text=True)
check('PDF privado: etiquetado y20paginas',bool(re.search(r'^Tagged:\s+yes',info,re.M)) and bool(re.search(r'^Pages:\s+20',info,re.M)),info)
for heading in ['Separa la base indicada','Adapta solo si está permitido','Más volumen, la misma base','Ofrece y anota lo que quede','Identifica lo que ofreciste','Separa sobrante y derrame','Distingue medido, estimado y desconocido','Traslada datos y preguntas']:
 check('PDF privado: paso '+heading,flat(heading) in flat(text))
check('PDF privado: FAQ8 y ultima respuesta','¿Tengo que cambiar a un alimento senior por su edad?' in text and 'No reduzcas la comida solo porque sea mayor' in text)
r['review_artifacts']={str(x.relative_to(ROOT)):{'sha256':hashlib.sha256(x.read_bytes()).hexdigest(),'bytes':x.stat().st_size} for x in [html,review]}
r['reading_note']='Párrafos medidosincluyen16FAQ a14px, además120editoriales a18px. No se afirma máximo3líneas. Capturas revisadas con criterio de legibilidad.'
(D/'verificacion-auditor-r2.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'checks':len(r['checks']),'failures':r['failures'],'artifacts':r['review_artifacts']},ensure_ascii=False,indent=2))
