import os,json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/workspace/.cache/ms-playwright'
root=Path(__file__).resolve().parents[4];out=root/'docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales'
url='http://127.0.0.1:8766/higiene-hogar-perros-senior/limpieza-ojos-oidos-perros-ancianos.html'
contrast='''()=>{function rgba(c){let cv=document.createElement('canvas');cv.width=cv.height=1;let x=cv.getContext('2d');x.fillStyle=c;x.fillRect(0,0,1,1);let a=x.getImageData(0,0,1,1).data;return[a[0],a[1],a[2],a[3]/255]}function blend(f,b){return[f[0]*f[3]+b[0]*(1-f[3]),f[1]*f[3]+b[1]*(1-f[3]),f[2]*f[3]+b[2]*(1-f[3]),1]}function bg(el){let c=[];for(let n=el;n;n=n.parentElement)c.unshift(n);return c.reduce((b,n)=>blend(rgba(getComputedStyle(n).backgroundColor),b),[255,255,255,1])}function lum(c){return c.slice(0,3).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0)}return [...document.querySelectorAll('.ojv p,.ojv h3,.ojv h4,.ojv strong,.ojv button:not(:disabled),.ojv summary,.ojv a,.ojv .ojv-data-grid span')].filter(e=>e.checkVisibility()).map(e=>{let f=rgba(getComputedStyle(e).color),b=bg(e),l=[lum(blend(f,b)),lum(b)].sort((a,b)=>a-b);return{text:e.textContent.trim().slice(0,60),ratio:+((l[1]+.05)/(l[0]+.05)).toFixed(2)}})}'''
results=[]
with sync_playwright()as p:
 b=p.chromium.launch(args=['--no-sandbox'])
 for width,dark in [(375,False),(390,True),(1440,False),(1440,True)]:
  label=f'{width}-'+('oscuro'if dark else'claro');ctx=b.new_context(viewport={'width':width,'height':1000},color_scheme='dark'if dark else'light')
  ctx.route('**/*',lambda r:r.continue_()if urlparse(r.request.url).hostname=='127.0.0.1'else r.abort());ctx.add_init_script("localStorage.setItem('theme','"+('dark'if dark else'light')+"')")
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));response=page.goto(url,wait_until='networkidle');page.locator('.ojv-secuencia[data-enhanced=true]').wait_for();seq=page.locator('.ojv-secuencia');page.clock.install()
  assert response.status==200 and page.locator('[data-ojos-visual]').count()==3
  anchors=page.locator('.ojv-decision a[href^="#"]').evaluate_all('(as)=>as.map(a=>({href:a.getAttribute("href"),exists:!!document.getElementById(decodeURIComponent(a.hash.slice(1)))}))');assert all(a['exists']for a in anchors),anchors
  assert seq.get_attribute('data-playing')=='false'and seq.get_attribute('data-step')=='0'
  # Actual asset decoding, including the image embedded in SVG.
  cutout=seq.locator('svg image').get_attribute('href');assert page.evaluate('''async u=>{let i=new Image();i.src=u;await i.decode();return i.naturalWidth>0}''',cutout)
  details=page.locator('.ojv-audicion details');details.locator('summary').focus();page.keyboard.press('Enter');assert details.get_attribute('open')is not None
  for kind in ['decision','secuencia','audicion']:
   widget=page.locator('[data-ojos-visual="'+kind+'"]');widget.scroll_into_view_if_needed();widget.screenshot(animations='disabled',path=str(out/f'{label}-{kind}.png'),style='nav[aria-label="Navegación principal"], .ad-slot, #ai-chat-toggle { visibility:hidden!important; }')
  sizes=seq.locator('button').evaluate_all('(bs)=>bs.map(b=>({w:b.getBoundingClientRect().width,h:b.getBoundingClientRect().height}))');assert all(s['w']>=44 and s['h']>=44 for s in sizes)
  # Keyboard manual advance through every stage.
  state=[]
  for i in range(4):
   assert seq.get_attribute('data-step')==str(i)
   assert seq.locator('[data-ojv-panel]:visible').count()==1
   state.append(seq.locator('[data-ojv-panel]:visible h4').inner_text())
   if width==390:seq.screenshot(animations='disabled',path=str(out/f'{label}-paso-{i+1}.png'),style='nav[aria-label="Navegación principal"], .ad-slot, #ai-chat-toggle { visibility:hidden!important; }')
   if i<3:seq.locator('[data-ojv-action=next]').focus();page.keyboard.press('Enter')
  seq.locator('[data-ojv-action=play]').click();assert seq.get_attribute('data-step')=='0'
  page.clock.run_for(13010);assert seq.get_attribute('data-step')=='2'
  assert seq.locator('.ojv-massage-arrows').evaluate('(e)=>getComputedStyle(e).animationPlayState')=='running'
  seq.locator('[data-ojv-action=play]').click();assert seq.get_attribute('data-playing')=='false'
  assert seq.locator('.ojv-massage-arrows').evaluate('(e)=>getComputedStyle(e).animationPlayState')=='paused'
  page.clock.run_for(14000);assert seq.get_attribute('data-step')=='2'
  seq.locator('[data-ojv-action=play]').click();page.clock.run_for(14000);assert seq.get_attribute('data-step')=='3'and seq.get_attribute('data-playing')=='false'
  # Check visibility handler without depending on background-tab behavior of headless Chromium.
  seq.locator('[data-ojv-action=play]').click();page.evaluate("Object.defineProperty(document,'hidden',{get:()=>true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))")
  assert seq.get_attribute('data-playing')=='false';page.clock.run_for(7000);assert seq.get_attribute('data-step')=='0'
  page.evaluate("delete document.hidden")
  con=page.evaluate(contrast);assert all(x['ratio']>=4.5 for x in con),[x for x in con if x['ratio']<4.5]
  data=page.evaluate('''()=>({h1:document.querySelectorAll('h1').length,width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('.ojv *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.left< -1)}).map(e=>({tag:e.tagName,cls:e.getAttribute('class')}))})''');assert data['width']==data['scroll']and not data['overflow'],data
  results.append({'label':label,'status':response.status,'states':state,'anchors':anchors,'controls44px':True,'noAutoplay':True,'pauseHolds':True,'finitePlay':True,'visibilityHandlerSynthetic':True,'cutoutDecoded':True,'cohortExpandableKeyboard':True,'minContrast':min(x['ratio']for x in con),'contrast':con,'errors':errors,**data});assert not errors
  page.emulate_media(media='print');assert seq.locator('[data-ojv-panel]:visible').count()==4;results[-1]['printEnhancedStepsVisible']=4;page.emulate_media(media='screen');
  page.emulate_media(reduced_motion='reduce');page.clock.run_for(100);expect(seq.locator('[data-ojv-action=play]')).to_be_disabled();seq.locator('[data-ojv-action=next]').click();assert seq.get_attribute('data-step')=='1';assert seq.locator('.ojv-base').evaluate('(e)=>getComputedStyle(e).transitionDuration')=='0s'
  results[-1]['reducedMotionManual']=True
  ctx.close()
 (out/'navegador-parcial.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
 ctx=b.new_context(viewport={'width':390,'height':1000},java_script_enabled=False)
 ctx.route('**/*',lambda r:r.continue_()if urlparse(r.request.url).hostname=='127.0.0.1'else r.abort());page=ctx.new_page();page.goto(url,wait_until='networkidle');seq=page.locator('.ojv-secuencia');assert seq.locator('[data-ojv-panel]:visible').count()==4 and not seq.locator('.ojv-controls').is_visible()
 page.locator('.ojv-details summary').focus();page.keyboard.press('Enter');assert page.locator('.ojv-breakdown').is_visible();results.append({'label':'sin-javascript','stepsVisible':4,'controlsHidden':True,'nativeDetailsKeyboard':True})
 # Print fallback keeps all four instructions.
 page.emulate_media(media='print');assert seq.locator('[data-ojv-panel]:visible').count()==4;results[-1]['printStepsVisible']=4
 b.close()
(out/'navegador.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));print(json.dumps([{k:r.get(k)for k in ['label','minContrast','errors','stepsVisible','controls44px','reducedMotionManual']}for r in results]))
