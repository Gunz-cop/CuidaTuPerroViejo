from pathlib import Path
from playwright.sync_api import sync_playwright
import json,re,hashlib
root=Path('/workspace/CuidaTuPerroViejo');out=root/'docs/contenido/alimentacion-perros-mayores-sin-dientes/reinicio-v2'
url='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
r={}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for dark in [False,True]:
  page=b.new_page(viewport={'width':1366,'height':950});page.goto(url,wait_until='networkidle');page.evaluate('(d)=>document.documentElement.classList.toggle("dark",d)',dark)
  r['dark' if dark else 'light']=page.evaluate('''()=>{
  const rgb=s=>(s.match(/[\\d.]+/g)||[]).map(Number).slice(0,3);
  const lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const ratio=(a,b)=>{a=lum(a);b=lum(b);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
  const rows=[...document.querySelectorAll('.feeding-v2 h3,.feeding-v2 h4,.feeding-v2 p,.feeding-v2 strong,.feeding-v2 label,.feeding-v2 button')].filter(x=>x.getClientRects().length&&!x.disabled).map(x=>{let parent=x,bg;while(parent){bg=getComputedStyle(parent).backgroundColor;if(!['rgba(0, 0, 0, 0)','transparent'].includes(bg))break;parent=parent.parentElement}const color=getComputedStyle(x).color;return {tag:x.tagName,text:x.textContent.slice(0,65),color,bg,ratio:ratio(rgb(color),rgb(bg))}});
  return {contrast:rows,minContrast:Math.min(...rows.map(x=>x.ratio)),brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].map(x=>x.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(decodeURIComponent(h.slice(1)))),byline:[...document.querySelectorAll('article a[href="/acerca-de"]')].map(x=>x.textContent),iaVisible:[...document.querySelectorAll('article figcaption')].map(x=>x.innerText)}
  }''')
  if not dark:
   count=page.evaluate('''()=>{
   const source=document.querySelector('.content-body'), c=source.cloneNode(true);
   c.style.cssText='position:absolute;left:-10000px;top:0;width:800px';
   c.querySelectorAll('[data-editorial-visual],[data-editorial-bibliography],figcaption,script,style,button,input,textarea').forEach(x=>x.remove());
   c.querySelectorAll('details').forEach(x=>x.open=true);document.body.append(c);
   const words=s=>s.trim().split(/\\s+/u).filter(Boolean).length;
   let section={title:'Introducción',text:''},sections=[section];
   for(const el of c.children){if(el.matches('h2,.faq-section')){section={title:el.matches('.faq-section')?'Preguntas frecuentes':el.innerText,text:''};sections.push(section)}section.text+='\\n'+el.innerText}
   const text=c.innerText,result={total:words(text),sections:sections.map(x=>({title:x.title,words:words(x.text)})),text};c.remove();return result;
   }''')
   text=count.pop('text');(out/'texto-editorial-auditor-r2.txt').write_text(text);r['count']=count
  page.close()
 # Edge-width check beyond contracted375–390.
 page=b.new_page(viewport={'width':320,'height':900});page.goto(url,wait_until='networkidle');r['width320']={'overflow':page.evaluate('document.documentElement.scrollWidth>innerWidth')};page.close();b.close()
r['source_sha256']=hashlib.sha256((root/'src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx').read_bytes()).hexdigest()
(out/'verificacion-dom-extra-auditor-r2.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'total':r['count']['total'],'contrast_min':[r[t]['minContrast'] for t in ['light','dark']],'anchors':[r[t]['brokenAnchors'] for t in ['light','dark']],'width320':r['width320']},ensure_ascii=False))
