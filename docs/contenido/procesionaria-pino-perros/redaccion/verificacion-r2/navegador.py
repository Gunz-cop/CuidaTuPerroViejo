from playwright.sync_api import sync_playwright
from urllib.parse import urlparse
from pathlib import Path
import json
out=Path('/workspace/CuidaTuPerroViejo/docs/contenido/procesionaria-pino-perros/redaccion/verificacion-r2')
out.mkdir(parents=True,exist_ok=True)
url='http://127.0.0.1:8765/salud-perros-mayores/procesionaria-pino-perros.html'
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,theme in [(390,'light'),(390,'dark'),(1366,'light'),(1366,'dark')]:
  c=b.new_context(viewport={'width':width,'height':900},color_scheme=theme)
  c.route('**/*',lambda r: r.continue_() if urlparse(r.request.url).hostname=='127.0.0.1' else r.abort())
  page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(url,wait_until='networkidle');page.evaluate('document.fonts.ready')
  faq=page.locator('.faq-section details');initial=page.locator('.faq-section details[open]').count()
  first=faq.first.locator('summary');first.focus();page.keyboard.press('Space');page.wait_for_timeout(150)
  opened=faq.first.get_attribute('open') is not None
  answer_visible=faq.first.locator('div').last.is_visible()
  page.keyboard.press('Space');closed=faq.first.get_attribute('open') is None
  paragraphs=page.locator('.content-body p').evaluate_all('''els=>els.filter(e=>!e.closest('[data-editorial-bibliography]')&&!e.querySelector('img')&&!e.querySelector('em:only-child')).map(e=>({text:e.textContent,lines:Math.round(e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight))}))''')
  overflow=page.evaluate('({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth})')
  anchors=page.locator('a[href^="#"]').evaluate_all('els=>els.map(e=>e.getAttribute("href")).filter(h=>h.length>1&&!document.getElementById(h.slice(1)))')
  page.locator('.content-body > p').first.evaluate('(e)=>window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-95,behavior:"instant"})');page.screenshot(path=str(out/f'{width}-{theme}-lectura.png'))
  first.focus();page.keyboard.press('Space');page.screenshot(path=str(out/f'{width}-{theme}-faq.png'))
  results.append({'width':width,'theme':theme,'overflow':overflow,'faq_count':faq.count(),'faq_initial_open':initial,'faq_keyboard_open':opened,'faq_answer_visible':answer_visible,'faq_keyboard_close':closed,'missing_anchors':anchors,'runtime_errors':errors,'paragraph_line_max':max(x['lines'] for x in paragraphs),'paragraphs_over3':sum(x['lines']>3 for x in paragraphs),'paragraph_n':len(paragraphs),'font_note':'External requests aborted; system fallback fonts. Images pending (text-only scope); no image validation claimed.'})
  c.close()
 b.close()
(out/'navegador.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False,indent=2))
