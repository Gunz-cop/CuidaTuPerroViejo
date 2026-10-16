import json,os
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/workspace/.cache/ms-playwright'
root=Path(__file__).resolve().parents[3]; slug='limpieza-ojos-oidos-perros-ancianos'
out=root/'docs/contenido'/slug;out.mkdir(parents=True,exist_ok=True)
url=f'http://127.0.0.1:8766/higiene-hogar-perros-senior/{slug}.html'
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
 for label,width,height,dark in [('movil-claro',390,844,False),('movil-oscuro',390,844,True),('escritorio-claro',1440,1000,False),('escritorio-oscuro',1440,1000,True)]:
  ctx=browser.new_context(viewport={'width':width,'height':height},color_scheme='dark' if dark else 'light',reduced_motion='reduce',device_scale_factor=1)
  ctx.route('**/*',lambda route: route.continue_() if urlparse(route.request.url).hostname in ('127.0.0.1','localhost') else route.abort())
  ctx.add_init_script("localStorage.setItem('theme', '"+('dark' if dark else 'light')+"');")
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  response=page.goto(url,wait_until='networkidle');page.wait_for_timeout(700)
  # Decode lazily loaded images by visiting each one before assertions.
  imgs=page.locator(f'img[src*="/images/blog/{slug}/"]')
  for img in imgs.all():img.scroll_into_view_if_needed();img.evaluate('(im)=>im.decode()')
  data=page.evaluate('''(slug)=>({title:document.querySelector('h1')?.textContent, h1:document.querySelectorAll('h1').length,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,dark:document.documentElement.classList.contains('dark'),images:[...document.querySelectorAll('img')].filter(i=>i.getAttribute('src')?.includes('/images/blog/'+slug+'/')).map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight,rendered:i.getBoundingClientRect().width,loaded:i.complete&&i.naturalWidth>0,alt:i.alt,declaredWidth:i.getAttribute('width'),declaredHeight:i.getAttribute('height')})),faq:document.querySelectorAll('.faq-section details').length,overflow:[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect();const intentionalScroller=el.closest('nav[aria-label=Breadcrumb]');return !intentionalScroller&&r.width>0&&(r.right>innerWidth+1||r.left<-1)}).slice(0,12).map(el=>({tag:el.tagName,class:el.className,rect:el.getBoundingClientRect().toJSON()}))})''',slug)
  data.update({'label':label,'status':response.status,'errors':errors})
  assert response.status==200 and data['h1']==1
  assert len(data['images'])==3 and all(i['loaded'] and i['alt'] and i['declaredWidth'] and i['declaredHeight'] for i in data['images'])
  assert data['scrollWidth']<=width and not data['overflow'],data['overflow']
  assert data['faq']==7 and data['dark']==dark
  faq=page.locator('.faq-section details').first;faq.locator('summary').focus();page.keyboard.press('Enter');assert faq.get_attribute('open') is not None
  data['faqKeyboard']=True
  # Capture hero viewport and the main instructional body image in each mode.
  page.evaluate('window.scrollTo(0,0)');page.screenshot(path=str(out/(label+'.png')))
  imgs.nth(1).scroll_into_view_if_needed();page.screenshot(path=str(out/(label+'-tecnica.png')))
  if width==390 and dark:page.screenshot(path=str(out/'movil-oscuro-completo.png'),full_page=True)
  # Measure actual title and warning text contrast on composited backgrounds.
  data['contrast']=page.evaluate('''()=>{function rgba(c){const v=document.createElement('canvas');v.width=v.height=1;const ctx=v.getContext('2d');ctx.fillStyle=c;ctx.fillRect(0,0,1,1);const a=ctx.getImageData(0,0,1,1).data;return[a[0],a[1],a[2],a[3]/255]}function blend(f,b){return[f[0]*f[3]+b[0]*(1-f[3]),f[1]*f[3]+b[1]*(1-f[3]),f[2]*f[3]+b[2]*(1-f[3]),1]}function bg(el){let chain=[];for(let n=el;n;n=n.parentElement)chain.unshift(n);return chain.reduce((b,n)=>blend(rgba(getComputedStyle(n).backgroundColor),b),[255,255,255,1])}function lum(c){return c.slice(0,3).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0)}return [...document.querySelectorAll('h1,.content-body aside h3,.content-body aside p')].map(e=>{let f=rgba(getComputedStyle(e).color),b=bg(e),l=[lum(blend(f,b)),lum(b)].sort((a,b)=>a-b);return{text:e.textContent.slice(0,65),ratio:+((l[1]+.05)/(l[0]+.05)).toFixed(2)}})}''')
  assert all(x['ratio']>=4.5 for x in data['contrast']),data['contrast']
  results.append(data);ctx.close()
 ctx=browser.new_context(viewport={'width':390,'height':844},java_script_enabled=False)
 ctx.route('**/*',lambda route: route.continue_() if urlparse(route.request.url).hostname=='127.0.0.1' else route.abort())
 page=ctx.new_page();page.goto(url,wait_until='networkidle')
 assert page.locator('.content-body').inner_text().find('Ojos: qué observar')>=0
 summary=page.locator('.faq-section summary').first;summary.scroll_into_view_if_needed();summary.focus();page.keyboard.press('Enter');assert page.locator('.faq-section details').first.get_attribute('open') is not None
 page.screenshot(path=str(out/'movil-sin-javascript-faq.png'))
 results.append({'label':'sin-javascript','articleVisible':True,'faqKeyboard':True,'faqCount':page.locator('.faq-section details').count()})
 browser.close()
(out/'revision-navegador.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps([{'label':r['label'],'status':r.get('status'),'overflow':r.get('overflow'),'images':len(r.get('images',[])),'faqKeyboard':r.get('faqKeyboard'),'minContrast':min((c['ratio'] for c in r.get('contrast',[])),default=None)} for r in results],ensure_ascii=False))
