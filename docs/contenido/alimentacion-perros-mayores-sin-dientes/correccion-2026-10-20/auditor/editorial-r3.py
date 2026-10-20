from pathlib import Path
from playwright.sync_api import sync_playwright
import json,statistics,urllib.request,re
r=Path('/workspace/CuidaTuPerroViejo');out=r/'docs/contenido/alimentacion-perros-mayores-sin-dientes/correccion-2026-10-20/auditor';R={}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page();page.goto('http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes',wait_until='networkidle');page.evaluate('document.fonts.ready')
 R=page.evaluate('''()=>{const c=document.querySelector('.content-body').cloneNode(true);c.querySelectorAll('[data-editorial-visual],[data-editorial-bibliography],figcaption,script,style,button,input,textarea').forEach(x=>x.remove());const counts=[...c.querySelectorAll('p')].filter(x=>!x.closest('.faq-section')).map(x=>x.textContent.trim().split(/\\s+/).length);return {paragraphWords:counts,tableBoxes:[...document.querySelectorAll('.tabla-apilable')].map(x=>({wrapper:x.getBoundingClientRect().height,table:x.querySelector('table').getBoundingClientRect().height,marginTop:getComputedStyle(x.querySelector('table')).marginTop,marginBottom:getComputedStyle(x.querySelector('table')).marginBottom})),byline:[...document.querySelectorAll('article a[href="/acerca-de"]')].map(x=>x.textContent),faq:c.querySelectorAll('.faq-section details').length}}''');b.close()
source=(r/'src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx').read_text().split('<div data-editorial-bibliography>')[0];sections=re.split(r'^## ',source,flags=re.M);R['duplicateLinkedSources']={}
for sec in sections:
 urls=re.findall(r'\]\((https?://[^)]+)\)',sec);dups=[u for u in set(urls) if urls.count(u)>1]
 if dups:R['duplicateLinkedSources'][sec.splitlines()[0]]=dups
R['internalLinks']=[]
for u in re.findall(r'\]\((/[^)]+)\)',source):
 req=urllib.request.urlopen('http://127.0.0.1:8766'+u);txt=req.read().decode();R['internalLinks'].append({'url':u,'status':req.status,'title':re.search('<title>(.*?)</title>',txt).group(1),'not404':not bool(re.search('<title>[^<]*404',txt))})
cs=R['paragraphWords'];R['density']={'count':len(cs),'mean':statistics.mean(cs),'median':statistics.median(cs),'max':max(cs),'over50':sum(x>50 for x in cs)}
R['internalLinks'][-1]['limitation']='El servidor Python prioriza la carpeta; el 200 es un listado y no valida el contenido del pilar.'
f=r/'dist/client/alimentacion-perros-senior.html';R['compiledPilar']={'path':str(f.relative_to(r)),'title':re.search('<title>(.*?)</title>',f.read_text()).group(1),'route':'src/pages/[pilar].astro'}
(out/'editorial-r3.json').write_text(json.dumps(R,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in R.items() if k!='paragraphWords'},ensure_ascii=False))
