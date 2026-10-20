from pathlib import Path
import json,re,hashlib,subprocess
from playwright.sync_api import sync_playwright
ROOT=Path('/workspace/CuidaTuPerroViejo');OUT=ROOT/'docs/contenido/alimentacion-perros-mayores-sin-dientes/capturas-auditor-r1';URL='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes';R={'scope':'Pruebas propias auditor independiente R1; navegador Chromium local, no producción','views':[],'events':{},'errors':[],'links':[]}
def ratios(colors):
 def lum(rgb):
  v=[int(x)/255 for x in re.findall(r'\d+',rgb)[:3]];v=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in v];return sum(x*y for x,y in zip(v,[.2126,.7152,.0722]))
 return min((max(lum(c['fg']),lum(c['bg']))+.05)/(min(lum(c['fg']),lum(c['bg']))+.05) for c in colors)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for w in [390,1366]:
  page=b.new_page(viewport={'width':w,'height':900},device_scale_factor=1);page.on('pageerror',lambda e:R['errors'].append(str(e)));assert page.goto(URL,wait_until='networkidle').status==200
  for theme in ['light','dark']:
   page.evaluate("t=>{document.documentElement.classList.toggle('dark',t==='dark');localStorage.setItem('theme',t)}",theme);page.emulate_media(color_scheme=theme);page.wait_for_timeout(400)
   assert page.evaluate('document.documentElement.scrollWidth===innerWidth')
   images=page.locator('article img').evaluate_all('''async imgs=>{await Promise.all(imgs.map(async x=>{x.loading='eager';await x.decode()}));return imgs.map(x=>({src:x.currentSrc,alt:x.alt,w:x.naturalWidth,h:x.naturalHeight,complete:x.complete}))}''');assert len(images)==3 and all(x['w']>0 for x in images)
   page.add_script_tag(path='/tmp/cuidatuperro-qa/node_modules/axe-core/axe.min.js');axe=page.evaluate("async()=>{let r=await axe.run({include:['article']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)}))}");assert not axe,axe
   colors=page.locator('[data-feeding-visual] h3,[data-feeding-visual] h4,[data-feeding-visual] p,[data-feeding-visual] label,[data-feeding-visual] button,[data-feeding-visual] th,[data-feeding-visual] td').evaluate_all('''els=>els.filter(x=>x.getBoundingClientRect().height>0).map(x=>{let a=x;while(a&&getComputedStyle(a).backgroundColor==='rgba(0, 0, 0, 0)')a=a.parentElement;return {text:x.textContent.slice(0,60),fg:getComputedStyle(x).color,bg:getComputedStyle(a).backgroundColor}})''');minimum=ratios(colors);assert minimum>=4.5,minimum
   page.evaluate('scrollTo(0,0)');page.screenshot(path=str(OUT/f'{w}-{theme}-cabecera.png'))
   for v in ['decision','comparacion','secuencia','registro']:
    # No se ocultan overlays ni elementos ajenos; screenshot real de cada región.
    page.locator(f'[data-feeding-visual="{v}"]').screenshot(path=str(OUT/f'{w}-{theme}-{v}.png'))
   R['views'].append({'width':w,'theme':theme,'images':images,'axe_article':axe,'min_contrast_measured':minimum,'colors':colors})
  page.close()
 page=b.new_page(viewport={'width':390,'height':900});page.on('pageerror',lambda e:R['errors'].append(str(e)));page.goto(URL,wait_until='networkidle');s=page.locator('[data-feeding-sequence]');assert s.get_attribute('data-step')=='0' and s.get_attribute('data-playing')=='false';page.wait_for_timeout(6800);assert s.get_attribute('data-step')=='0';R['events']['no_autoplay_6.8s']=True
 n=s.locator('[data-action="next"]');n.focus();page.keyboard.press('Enter');assert s.get_attribute('data-step')=='1';assert n.evaluate('x=>getComputedStyle(x).outlineStyle')=='solid';sizes=s.locator('button').evaluate_all('xs=>xs.map(x=>({w:x.getBoundingClientRect().width,h:x.getBoundingClientRect().height}))');assert all(x['w']>=44 and x['h']>=44 for x in sizes);R['events']['keyboard_focus_sizes']=sizes
 for i in [1,2]:
  if i==2:n.click()
  page.wait_for_timeout(400);page.locator('[data-feeding-visual="secuencia"]').screenshot(path=str(OUT/f'390-paso-{i+1}.png'))
 s.locator('[data-action="prev"]').click();s.locator('[data-action="play"]').click();page.wait_for_timeout(400);s.locator('[data-action="play"]').click();step=s.get_attribute('data-step');assert s.evaluate('x=>x.getAnimations({subtree:true}).filter(a=>a.playState==="running").length')==0;page.wait_for_timeout(6800);assert s.get_attribute('data-step')==step and s.get_attribute('data-playing')=='false';R['events']['pause_6.8s_no_animation']=True
 s.locator('[data-action="next"]').click();s.locator('[data-action="play"]').click();assert s.get_attribute('data-step')=='0';page.wait_for_timeout(20000);assert s.get_attribute('data-step')=='2' and s.get_attribute('data-playing')=='false';assert s.locator('[data-action="play"]').inner_text()=='Repetir secuencia';R['events']['finite_20s_repeat']=True
 page.emulate_media(reduced_motion='reduce');assert s.locator('[data-action="play"]').is_disabled();s.locator('[data-action="prev"]').click();assert s.get_attribute('data-step')=='1';assert s.locator('.asv-stage').first.evaluate('x=>getComputedStyle(x).transitionDuration')=='0s';R['events']['reduced_manual']=True;page.emulate_media(reduced_motion='no-preference')
 s.locator('[data-action="play"]').click();page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden");assert s.get_attribute('data-playing')=='false';R['events']['simulated_visibility_pause']=True
 s.locator('[data-action="play"]').click();page.evaluate("window.dispatchEvent(new Event('pagehide'))");assert s.get_attribute('data-playing')=='false';R['events']['simulated_pagehide_pause']=True
 s.locator('[data-action="play"]').click();page.evaluate("document.dispatchEvent(new Event('astro:before-swap'))");step=s.get_attribute('data-step');page.wait_for_timeout(6800);assert s.get_attribute('data-step')==step;page.evaluate("document.dispatchEvent(new Event('astro:page-load'));document.dispatchEvent(new Event('astro:page-load'))");assert s.get_attribute('data-step')=='0';s.locator('[data-action="next"]').click();assert s.get_attribute('data-step')=='1';R['events']['simulated_astro_cleanup_6.8s_double_init']=True
 table=page.locator('.asv-table');table.focus();old=table.evaluate('x=>x.scrollLeft');page.keyboard.press('ArrowRight');page.wait_for_timeout(300);assert table.evaluate('x=>x.scrollLeft')>old;R['events']['table_keyboard_scroll']=True
 for w in [375,320]:
  page.set_viewport_size({'width':w,'height':900});assert page.evaluate('document.documentElement.scrollWidth===innerWidth');page.screenshot(path=str(OUT/f'{w}-reflujo.png'))
 R['reflow']={'375':True,'320':True,'method':'viewport CSS efectivo, no zoom nativo del navegador'}
 page.set_viewport_size({'width':390,'height':900});page.emulate_media(media='print');assert s.locator('[data-panel]:visible').count()==3;page.pdf(path=str(OUT/'articulo-js.pdf'),format='A4',print_background=True);page.emulate_media(media='screen');R['print_js_all_steps']=True
 record=page.locator('[data-feeding-visual="registro"]');record.locator('input').nth(0).fill('20/10/2026 12:00');record.locator('input').nth(1).fill('Alimento completo habitual');record.locator('textarea').fill('Ejemplo ilustrativo de registro; sin historia clínica.');page.evaluate("window.__seenPrint=false;window.addEventListener('beforeprint',()=>window.__seenPrint=!!document.querySelector('.asv-print-copy'),{once:true})");record.locator('.asv-print').click();assert page.evaluate('window.__seenPrint');assert page.locator('.asv-print-copy').count()==0;R['real_print_event_and_cleanup']=True
 # Mantener copia para inspección PDF: solo interceptar diálogo en esta segunda prueba.
 page.evaluate('window.print=()=>{}');record.locator('.asv-print').click();assert '20/10/2026 12:00' in page.locator('.asv-print-copy').inner_text();page.emulate_media(media='print');page.pdf(path=str(OUT/'registro-ejemplo.pdf'),format='A4',print_background=True);page.evaluate("dispatchEvent(new Event('afterprint'))");page.emulate_media(media='screen')
 for i in range(record.locator('input').count()):record.locator('input').nth(i).fill(('Dato de prueba sin diagnóstico ' * 6)[:160])
 record.locator('textarea').fill(('Observación de ejemplo para probar impresión. '*9)[:350]);record.locator('.asv-print').click();page.emulate_media(media='print');page.pdf(path=str(OUT/'registro-maximo.pdf'),format='A4',print_background=True);page.evaluate("dispatchEvent(new Event('afterprint'))");page.emulate_media(media='screen');R['print_values_and_max_pdf']=True
 links=sorted(set(page.locator('article a[href^="/"]').evaluate_all('xs=>xs.map(x=>x.getAttribute("href"))')))
 for href in links:
  r=page.request.get('http://127.0.0.1:8766'+href);assert r.status==200 and 'text/html' in r.headers.get('content-type','');assert '<h1' in r.text();R['links'].append({'href':href,'status':r.status,'content_checked':True})
 anchors=page.locator('a[href^="#"]').evaluate_all('xs=>xs.map(x=>x.getAttribute("href")).filter(x=>x.length>1)');bad=page.evaluate('(xs)=>xs.filter(x=>!document.getElementById(decodeURIComponent(x.slice(1))))',anchors);assert not bad,bad;R['anchors_checked']=len(anchors)
 page.close();ctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':900});page=ctx.new_page();page.goto(URL);assert page.locator('[data-panel]:visible').count()==3 and page.locator('.asv-controls:visible,.asv-print:visible').count()==0;page.locator('[data-feeding-visual="secuencia"]').screenshot(path=str(OUT/'390-sin-js-secuencia.png'));page.emulate_media(media='print');assert page.locator('[data-panel]:visible').count()==3;page.pdf(path=str(OUT/'articulo-sin-js.pdf'),format='A4',print_background=True);R['no_js_all_steps_print_no_inert_controls']=True;ctx.close();b.close()
for name in ['registro-ejemplo.pdf','registro-maximo.pdf']:
 info=subprocess.check_output(['pdfinfo',str(OUT/name)],text=True);pages=int(re.search(r'Pages:\s*(\d+)',info).group(1));assert pages==1,(name,pages);R[name]={'pages':pages}
assert not R['errors'],R['errors'];(OUT/'navegador.json').write_text(json.dumps(R,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in R.items() if k!='views'},ensure_ascii=False,indent=2))
