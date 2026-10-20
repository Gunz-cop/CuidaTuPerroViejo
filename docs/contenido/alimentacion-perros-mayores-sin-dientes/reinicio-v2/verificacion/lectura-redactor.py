from pathlib import Path
from playwright.sync_api import sync_playwright
import json
base=Path('/workspace/CuidaTuPerroViejo/docs/contenido/alimentacion-perros-mayores-sin-dientes/reinicio-v2')
out=base/'verificacion';out.mkdir(exist_ok=True)
url='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
results={'scope':'Lectura/formato del redactor sobre build v2 previo a atributos finales de tablas; no auditoría independiente','views':[],'errors':[]}
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [390,1366]:
  page=browser.new_page(viewport={'width':width,'height':900})
  page.on('pageerror',lambda e:results['errors'].append(str(e)))
  assert page.goto(url,wait_until='networkidle').status==200
  page.locator('article details').evaluate_all('xs=>xs.forEach(x=>x.open=true)')
  for theme in ['light','dark']:
   page.evaluate("t=>document.documentElement.classList.toggle('dark',t==='dark')",theme)
   page.emulate_media(color_scheme=theme)
   page.wait_for_timeout(200)
   data=page.evaluate(r'''()=>{
     const c=document.querySelector('.content-body');
     return {
       title:document.querySelector('h1').textContent,
       global_overflow:document.documentElement.scrollWidth>innerWidth,
       h2:[...c.querySelectorAll('h2')].map(x=>x.textContent),
       faq:c.querySelectorAll('.faq-section details').length,
       images:[...document.querySelectorAll('article img')].map(x=>({alt:x.alt,w:x.naturalWidth,src:x.currentSrc})),
       paragraphs:[...c.querySelectorAll('p')].filter(x=>!x.closest('[data-editorial-visual],[data-editorial-bibliography],figcaption,.faq-section')&&x.getBoundingClientRect().height>0).map(x=>({words:x.textContent.trim().split(/\s+/).length,lines:x.getBoundingClientRect().height/parseFloat(getComputedStyle(x).lineHeight),font:getComputedStyle(x).fontSize,text:x.textContent.slice(0,90)})),
       tables:[...c.querySelectorAll('table')].map(x=>({caption:x.caption?.textContent,viewport:x.getBoundingClientRect().width,scroll:x.scrollWidth,font:getComputedStyle(x.querySelector('td')).fontSize})),
       broken_images:[...document.querySelectorAll('article img')].filter(x=>x.complete&&!x.naturalWidth).length
     }
   }''')
   assert not data['global_overflow']
   assert data['faq']==8
   assert len(data['images'])==5
   data.update({'width':width,'theme':theme})
   results['views'].append(data)
  page.locator('article').evaluate("x=>x.scrollIntoView()")
  page.screenshot(path=str(out/f'lectura-redactor-{width}.png'))
  page.close()
 browser.close()
(out/'lectura-redactor.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps({'views':[{'width':x['width'],'theme':x['theme'],'paragraphs':len(x['paragraphs']),'median_lines':sorted(y['lines'] for y in x['paragraphs'])[len(x['paragraphs'])//2],'max_lines':max(y['lines'] for y in x['paragraphs']),'tables':x['tables']} for x in results['views']],'errors':results['errors']},ensure_ascii=False,indent=2))
