from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
import json,hashlib,math
root=Path('/workspace/CuidaTuPerroViejo');out=root/'docs/contenido/procesionaria-pino-perros/visuales/verificacion-r2';out.mkdir(parents=True,exist_ok=True)
url='http://127.0.0.1:8765/salud-perros-mayores/procesionaria-pino-perros.html';runs=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,theme in [(390,'light'),(390,'dark'),(1366,'light'),(1366,'dark')]:
  ctx=browser.new_context(viewport={'width':width,'height':900},device_scale_factor=1,color_scheme=theme)
  ctx.route('**/*',lambda r:r.continue_() if urlparse(r.request.url).hostname=='127.0.0.1' else r.abort())
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(url,wait_until='networkidle');page.add_style_tag(content='html {scroll-behavior:auto !important;}')
  imgs=page.locator('article img');assert imgs.count()==7,imgs.count();resources=[]
  for i in range(imgs.count()):
   img=imgs.nth(i);img.scroll_into_view_if_needed();img.evaluate('(e)=>e.decode()');page.wait_for_timeout(100)
   fig=img.locator('xpath=ancestor::figure[1]');key=fig.get_attribute('data-procesionaria-visual') or 'hero'
   state=img.evaluate('''e=>({src:e.getAttribute('src'),currentSrc:e.currentSrc,complete:e.complete,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,alt:e.alt})''')
   box=fig.bounding_box();state['id']=key;state['figureHeight']=round(box['height'],2);state['figureWidth']=round(box['width'],2)
   assert state['complete'] and state['naturalWidth']>0
   assert state['figureHeight']<=900 if width==390 else True
   fig.screenshot(path=str(out/f'{width}-{theme}-{key}.png'),animations='disabled')
   resources.append(state)
  run={'width':width,'theme':theme,'images':resources,'horizontalOverflow':page.evaluate('document.documentElement.scrollWidth>innerWidth'),'errors':errors,'faqCount':page.locator('.faq-section details').count(),'faqOpenInitially':page.locator('.faq-section details[open]').count(),'sources':'External requests blocked; system fonts. Screenshots are local compiled Astro, not deployment.'}
  assert not run['horizontalOverflow'];assert not errors
  # Los enlaces de ampliación apuntan a los mismos archivos de imagen locales.
  link=page.locator('figure[data-procesionaria-visual="prioridades"] > a');link.focus()
  with page.expect_popup() as popup: page.keyboard.press('Enter')
  big=popup.value;big.wait_for_load_state();run['imageEnlargeKeyboard']=big.url.endswith('.webp');big.close()
  assert run['imageEnlargeKeyboard'];runs.append(run);ctx.close()
 browser.close()
(out/'navegador.json').write_text(json.dumps(runs,ensure_ascii=False,indent=2))
print(json.dumps([{'width':r['width'],'theme':r['theme'],'decoded':len(r['images']),'heights':[(i['id'],i['figureHeight']) for i in r['images']],'overflow':r['horizontalOverflow'],'keyboardZoom':r['imageEnlargeKeyboard'],'errors':r['errors']} for r in runs],ensure_ascii=False,indent=2))
