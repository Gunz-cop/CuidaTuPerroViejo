"""Verificación de coordinación y artefactos de revisión locales; no despliega.
Requiere build, servidor local :8766, Playwright/Chromium y axe-core en AXE_PATH.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,hashlib,json,mimetypes,os,re,statistics
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'AGENTS.md').exists())
OUT=Path(__file__).resolve().parent;REVIEW=OUT.parent/'revision';REVIEW.mkdir(exist_ok=True)
URL=os.environ.get('ARTICLE_URL','http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes')
AXE=os.environ.get('AXE_PATH','/tmp/feeding-v2-qa/node_modules/axe-core/axe.min.js')
R={'scope':'Chromium local; coordinación, distinta de la auditoría independiente. No producción.','views':[],'errors':[]}
def content_count(page):
 data=page.evaluate('''()=>{
  const clone=document.querySelector('.content-body').cloneNode(true);clone.style.cssText='position:absolute;left:-10000px;top:0;width:800px';
  const exclusions=['[data-editorial-visual]','[data-editorial-bibliography]','figcaption','script','style','button','input','textarea'];
  const excludedCounts=Object.fromEntries(exclusions.map(s=>[s,clone.querySelectorAll(s).length]));
  clone.querySelectorAll(exclusions.join(',')).forEach(x=>x.remove());clone.querySelectorAll('details').forEach(x=>x.open=true);document.body.append(clone);
  const words=s=>s.trim().split(/\\s+/u).filter(Boolean).length;
  let current={section:'Introducción',text:''};const sections=[current];
  for(const el of clone.children){if(el.matches('h2,.faq-section')){current={section:el.matches('h2')?el.innerText:'Preguntas frecuentes',text:''};sections.push(current)}current.text+='\\n'+el.innerText}
  const paragraphs=[...clone.querySelectorAll('p')].filter(x=>!x.closest('.faq-section')&&words(x.innerText)>0).map(x=>words(x.innerText));
  const text=clone.innerText;const result={total:words(text),sections:sections.map(s=>({section:s.section,words:words(s.text)})),paragraphs,excludedCounts,text};clone.remove();return result;
 }''')
 text=data.pop('text');paragraphs=data.pop('paragraphs');targets=[200,600,800,650,700,550,450,650,650,150,600]
 assert len(data['sections'])==len(targets),data['sections']
 for section,target in zip(data['sections'],targets):
  section['target']=target;section['deviation_percent']=round(100*(section['words']-target)/target,2);assert abs(section['deviation_percent'])<=15,section
 assert 5700<=data['total']<=6300,data['total']
 assert data['excludedCounts']['[data-editorial-visual]']==3,data['excludedCounts']
 assert data['excludedCounts']['[data-editorial-bibliography]']==1
 assert sum(s['words'] for s in data['sections'])==data['total']
 data['method']='DOM .content-body; FAQ desplegado una vez; excluir recursos, bibliografía, pies, scripts, controles; espacios Unicode.'
 data['density']={'paragraphs':len(paragraphs),'mean':round(statistics.mean(paragraphs),2),'median':statistics.median(paragraphs),'over50_percent':round(100*sum(n>50 for n in paragraphs)/len(paragraphs),2),'max':max(paragraphs)}
 data['source_sha256']=hashlib.sha256((ROOT/'src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx').read_bytes()).hexdigest()
 (OUT.parent/'conteo-editorial-dom.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');(OUT.parent/'texto-editorial-contado.txt').write_text(text)
 return data
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [390,1366]:
  for theme in ['light','dark']:
   ctx=browser.new_context(viewport={'width':width,'height':900},color_scheme=theme);ctx.add_init_script('localStorage.setItem("theme",'+json.dumps(theme)+')')
   page=ctx.new_page();page.on('pageerror',lambda e:R['errors'].append(str(e)));assert page.goto(URL,wait_until='networkidle').status==200
   page.evaluate('t=>document.documentElement.classList.toggle("dark",t==="dark")',theme)
   if not R.get('count'):R['count']=content_count(page)
   images=page.locator('article img').evaluate_all('''async xs=>{await Promise.all(xs.map(async x=>{x.loading='eager';await x.decode()}));return xs.map(x=>({src:x.getAttribute('src'),currentSrc:x.currentSrc,width:x.naturalWidth,height:x.naturalHeight,alt:x.alt}))}''')
   assert len(images)>=4 and all(x['width']>0 and x['alt'] for x in images)
   assert page.evaluate('document.documentElement.scrollWidth===innerWidth')
   page.add_script_tag(path=AXE);page.locator('article details').evaluate_all('xs=>xs.forEach(x=>x.open=true)')
   axe=page.evaluate('''async()=>{let r=await axe.run({include:['article']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}''');assert not axe,axe
   page.evaluate('scrollTo(0,0)');page.screenshot(path=str(OUT/f'{width}-{theme}-cabecera.png'))
   sequences=page.locator('[data-feeding-v2-sequence]');assert sequences.count()==2
   for i,seq in enumerate(sequences.all()):
    assert seq.get_attribute('data-step')=='0' and seq.get_attribute('data-playing')=='false'
    next_button=seq.locator('[data-action="next"]');next_button.focus();page.keyboard.press('Enter');assert seq.get_attribute('data-step')=='1'
    for step in [2,3]:next_button.click();assert seq.get_attribute('data-step')==str(step)
    seq.locator('[data-action="prev"]').click();assert seq.get_attribute('data-step')=='2'
    root=seq if seq.get_attribute('data-editorial-visual') is not None else seq.locator('xpath=ancestor::*[@data-editorial-visual][1]')
    root.screenshot(path=str(OUT/f'{width}-{theme}-animacion-{i+1}.png'))
    sizes=seq.locator('button').evaluate_all('xs=>xs.map(x=>({w:x.getBoundingClientRect().width,h:x.getBoundingClientRect().height}))');assert all(x['w']>=44 and x['h']>=44 for x in sizes),sizes
   anchors=page.locator('a[href^="#"]').evaluate_all('xs=>xs.map(x=>x.getAttribute("href")).filter(x=>x.length>1)');broken=page.evaluate('xs=>xs.filter(x=>!document.getElementById(decodeURIComponent(x.slice(1))))',anchors);assert not broken,broken
   R['views'].append({'width':width,'theme':theme,'images':images,'axe_article':axe,'anchors':len(anchors),'sequences_manual_4_steps':True,'controls_min44':True,'no_overflow':True});ctx.close()
 # Original DOM without JavaScript: embed styles and images while retaining built modules.
 ctx=browser.new_context(java_script_enabled=False,viewport={'width':375,'height':900});page=ctx.new_page();assert page.goto(URL).status==200
 assert page.evaluate('document.documentElement.scrollWidth===innerWidth')
 for seq in page.locator('[data-feeding-v2-sequence]').all():assert seq.locator('[data-panel]:visible').count()==4
 R['no_js_all_8_steps']=True;page.screenshot(path=str(OUT/'375-sin-js.png'))
 data=page.evaluate('''()=>({title:document.querySelector('h1').textContent,styles:[...document.querySelectorAll('head style')].map(x=>x.outerHTML),css:[...document.querySelectorAll('link[rel="stylesheet"]')].map(x=>x.getAttribute('href')).filter(x=>x.startsWith('/')),images:[...document.querySelectorAll('article img')].map(x=>x.getAttribute('src'))})''')
 for src in set(data['images']):
  assert src.startswith('/');path=ROOT/'dist/client'/src.lstrip('/');uri='data:'+mimetypes.guess_type(path)[0]+';base64,'+base64.b64encode(path.read_bytes()).decode()
  page.locator('article img').evaluate_all('(xs,o)=>xs.filter(x=>x.getAttribute("src")===o.src).forEach(x=>{x.src=o.uri;x.removeAttribute("srcset");x.removeAttribute("sizes");x.loading="eager"})',{'src':src,'uri':uri})
 for script in page.locator('article script[src]').all():
  src=script.get_attribute('src');assert src.startswith('/');script.evaluate('(el,text)=>{el.removeAttribute("src");el.textContent=text}',(ROOT/'dist/client'/src.lstrip('/')).read_text())
 for script in page.locator('article script[type="module"]').all_text_contents():assert not re.search(r'\bimport\s*(?:["\x27{*]|\()',script),'External module import: embed required'
 page.locator('article a[href^="/"]').evaluate_all('xs=>xs.forEach(x=>x.href="https://cuidatuperroviejo.com"+x.getAttribute("href"))')
 article=page.locator('article').evaluate('x=>x.outerHTML');css='\n'.join((ROOT/'dist/client'/s.lstrip('/')).read_text() for s in data['css'])
 head='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revisión local — '+data['title']+'</title><style>'+css+'</style>'+''.join(data['styles'])
 head+='''<style>body{margin:0}.review-note{max-width:70rem;margin:1rem auto;padding:1rem;background:#f7efdc;color:#263f34;border:1px solid #8b7754;border-radius:12px;font:16px/1.5 system-ui}.review-note button{padding:.6rem 1rem;min-height:44px;background:#fff;color:#263f34;border:1px solid #263f34;border-radius:8px;cursor:pointer}.review-note button:focus-visible{outline:3px solid #244d3e;outline-offset:3px}@media print{.review-note{display:none}}</style></head><body>'''
 banner='''<aside class="review-note"><strong>Vista local de revisión · sin publicar</strong><p>Artículo y recursos integrados. Este archivo incluye imágenes, estilos y animaciones. Omite navegación general, asistente y anuncios; utiliza fuentes tipográficas locales. Los enlaces a fuentes y otros artículos necesitan Internet.</p><button type="button" onclick="document.documentElement.classList.toggle('dark')">Cambiar claro / oscuro</button></aside>'''
 (REVIEW/'lectura-interactiva.html').write_text(head+banner+'<main id="main-content" tabindex="-1" class="max-w-5xl mx-auto px-4 py-8 md:py-12 w-full">'+article+'</main></body></html>');ctx.close()
 # Complete article PDF; all FAQ answers expanded, original print alternatives for steps.
 page=browser.new_page(viewport={'width':1366,'height':900});assert page.goto(URL,wait_until='networkidle').status==200
 page.locator('article img').evaluate_all('async xs=>{await Promise.all(xs.map(async x=>{x.loading="eager";await x.decode()}))}');page.locator('article details').evaluate_all('xs=>xs.forEach(x=>x.open=true)');page.emulate_media(media='print');page.pdf(path=str(REVIEW/'articulo-completo.pdf'),format='A4',print_background=True,tagged=True,outline=True);page.close()
 # Offline reading must load all embedded resources and actual animation code, no network.
 ctx=browser.new_context(viewport={'width':390,'height':900});page=ctx.new_page();errors=[];requests=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def deny(route):requests.append(route.request.url);route.abort()
 page.route('http://**',deny);page.route('https://**',deny)
 page.route('http://127.0.0.1:8766/__revision-local__',lambda route:route.fulfill(status=200,content_type='text/html; charset=utf-8',body=(REVIEW/'lectura-interactiva.html').read_text()))
 page.goto('http://127.0.0.1:8766/__revision-local__',wait_until='load');page.wait_for_timeout(500)
 assert page.locator('article img').evaluate_all('xs=>xs.every(x=>x.complete&&x.naturalWidth>0)')
 for seq in page.locator('[data-feeding-v2-sequence]').all():
  assert seq.get_attribute('data-step')=='0';seq.locator('[data-action="next"]').click();assert seq.get_attribute('data-step')=='1'
 assert page.evaluate('document.documentElement.scrollWidth===innerWidth'),'Offline preview overflow';assert not errors,errors;assert not requests,requests
 page.locator('[data-feeding-v2-visual="base"]').screenshot(path=str(REVIEW/'390-animacion-base.png'))
 page.locator('[data-feeding-v2-visual="ingesta"]').screenshot(path=str(REVIEW/'390-animacion-ingesta.png'))
 R['offline_review']={'mode':'HTML autocontenido entregado por ruta local interceptada de Playwright; file:// bloqueado por política del navegador del entorno','network_requests':requests,'js_errors':errors,'images':page.locator('article img').count(),'manual_sequences':2};ctx.close();browser.close()
assert not R['errors'],R['errors'];(OUT/'navegador-coordinacion.json').write_text(json.dumps(R,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'views':len(R['views']),'words':R['count']['total'],'errors':R['errors'],'offline':R['offline_review']},ensure_ascii=False))
