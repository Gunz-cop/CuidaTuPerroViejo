from pathlib import Path
import json,re,subprocess
from playwright.sync_api import sync_playwright
ROOT=Path('/workspace/CuidaTuPerroViejo');OUT=ROOT/'docs/contenido/alimentacion-perros-mayores-sin-dientes/reinicio-v2/validacion-creacion';URL='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes';R={'role':'Autocontroles del productor visual; no auditoría independiente','views':[],'events':{},'errors':[]}
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for width in [375,390,1366]:
  p=b.new_page(viewport={'width':width,'height':1000},device_scale_factor=1);p.on('pageerror',lambda e:R['errors'].append(str(e)));assert p.goto(URL,wait_until='networkidle').status==200
  for theme in ['light','dark']:
   p.evaluate("t=>{document.documentElement.classList.toggle('dark',t==='dark')}",theme);p.emulate_media(color_scheme=theme)
   components=p.locator('[data-feeding-v2-visual]');assert components.count()==3
   boxes=components.evaluate_all('xs=>xs.map(x=>({variant:x.dataset.feedingV2Visual,left:x.getBoundingClientRect().left,right:x.getBoundingClientRect().right}))');assert all(x['left']>=0 and x['right']<=width for x in boxes)
   sizes=p.locator('[data-feeding-v2-visual] button').evaluate_all('xs=>xs.filter(x=>!x.hidden).map(x=>({w:x.getBoundingClientRect().width,h:x.getBoundingClientRect().height}))');assert all(x['w']>=44 and x['h']>=44 for x in sizes)
   if width<=390:
    progress=p.locator('.feeding-progress li').first.evaluate('x=>getComputedStyle(x).fontSize');assert float(progress[:-2])>=14
    assert not p.locator('.canvas-labels').first.is_visible()
   for variant in ['base','ingesta','registro']:
    components=p.locator(f'[data-feeding-v2-visual="{variant}"]');components.screenshot(path=str(OUT/f'{width}-{theme}-{variant}.png'))
   R['views'].append({'width':width,'theme':theme,'boxes':boxes,'buttons':sizes,'mobile_labels_14px':width<=390})
  p.close()
 p=b.new_page(viewport={'width':390,'height':1000});p.on('pageerror',lambda e:R['errors'].append(str(e)));p.goto(URL,wait_until='networkidle');seq=p.locator('[data-feeding-v2-sequence]');assert seq.count()==2
 p.wait_for_timeout(6750);assert all(seq.nth(i).get_attribute('data-step')=='0' and seq.nth(i).get_attribute('data-playing')=='false' for i in range(2));R['events']['no_autoplay_6.75s']=True
 for i in range(2):
  s=seq.nth(i);variant=s.get_attribute('data-variant')
  next=s.locator('[data-action="next"]');next.focus();p.keyboard.press('Enter');assert s.get_attribute('data-step')=='1';assert next.evaluate('x=>getComputedStyle(x).outlineStyle')=='solid'
  for step in [1,2,3]:
   if step>1:next.click()
   p.locator(f'[data-feeding-v2-visual="{variant}"]').screenshot(path=str(OUT/f'390-{variant}-paso-{step+1}.png'))
   assert s.locator('[data-panel]:visible').count()==1
  assert next.is_disabled();s.locator('[data-action="play"]').click();assert s.get_attribute('data-step')=='0' and s.get_attribute('data-playing')=='true'
 R['events']['keyboard_manual_all_steps_repeat']=True
 p.wait_for_timeout(6750)
 for i in range(2):
  s=seq.nth(i);assert s.get_attribute('data-step')=='1';s.locator('[data-action="play"]').click();assert s.get_attribute('data-playing')=='false';assert s.evaluate('x=>x.getAnimations({subtree:true}).filter(a=>a.playState==="running").length')==0
 p.wait_for_timeout(6750);assert all(seq.nth(i).get_attribute('data-step')=='1' for i in range(2));R['events']['pause_no_advance_6.75s_and_no_running_motion']=True
 for i in range(2):
  s=seq.nth(i);s.locator('[data-action="next"]').click();s.locator('[data-action="next"]').click();s.locator('[data-action="play"]').click();assert s.get_attribute('data-step')=='0'
 p.wait_for_timeout(26500)
 assert all(seq.nth(i).get_attribute('data-step')=='3' and seq.nth(i).get_attribute('data-playing')=='false' for i in range(2));R['events']['finite_both_26.5s']=True
 p.emulate_media(reduced_motion='reduce');p.wait_for_function("Array.from(document.querySelectorAll('[data-feeding-v2-sequence] [data-action=play]')).every(x=>x.disabled)")
 for i in range(2):
  s=seq.nth(i);assert s.locator('[data-action="play"]').is_disabled();s.locator('[data-action="prev"]').click();assert s.get_attribute('data-step')=='2';assert s.locator('.feeding-motion').inner_text().startswith('Movimiento reducido');assert s.evaluate('x=>x.getAnimations({subtree:true}).length')==0
 R['events']['reduced_motion_manual']=True;p.emulate_media(reduced_motion='no-preference')
 for i in range(2):seq.nth(i).locator('[data-action="play"]').click()
 p.evaluate("Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden");assert all(seq.nth(i).get_attribute('data-playing')=='false' for i in range(2));R['events']['simulated_visibility_pause']=True
 for i in range(2):seq.nth(i).locator('[data-action="play"]').click()
 p.evaluate("dispatchEvent(new Event('pagehide'))");assert all(seq.nth(i).get_attribute('data-playing')=='false' for i in range(2));R['events']['simulated_pagehide_pause']=True
 p.evaluate("document.dispatchEvent(new Event('astro:before-swap'));document.dispatchEvent(new Event('astro:page-load'));document.dispatchEvent(new Event('astro:page-load'))")
 for i in range(2):
  s=seq.nth(i);assert s.get_attribute('data-step')=='0';s.locator('[data-action="next"]').click();assert s.get_attribute('data-step')=='1'
 R['events']['simulated_astro_cleanup_no_double_initialization']=True
 p.emulate_media(media='print');assert seq.locator('[data-panel]:visible').count()==8;p.emulate_media(media='screen');R['events']['print_all_eight_steps']=True
 record=p.locator('[data-feeding-v2-visual="registro"]');controls=record.locator('input,textarea');values=[]
 for i in range(controls.count()):
  el=controls.nth(i);length=int(el.get_attribute('maxlength'));value=(f'Campo{i+1} ejemplo de comprobación sin diagnóstico. '*12)[:length];el.fill(value);values.append(value)
 p.evaluate('window.print=()=>{}');record.locator('.feeding-print').click();assert p.locator('.feeding-v2-print-copy').count()==1
 actual=p.locator('.feeding-v2-print-copy .feeding-printed-value').all_inner_texts();assert actual==values,(actual,values)
 p.emulate_media(media='print');p.pdf(path=str(OUT/'registro-maximo.pdf'),format='A4',print_background=True);p.evaluate("dispatchEvent(new Event('afterprint'))");assert p.locator('.feeding-v2-print-copy').count()==0
 R['events']['print_values_exact_dom_copy']=True;p.close()
 ctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':1000});p=ctx.new_page();p.goto(URL);assert p.locator('[data-panel]:visible').count()==8;assert p.locator('.feeding-controls:visible,.feeding-print:visible').count()==0
 p.locator('[data-feeding-v2-visual="base"]').screenshot(path=str(OUT/'390-sin-js-base.png'));p.emulate_media(media='print');assert p.locator('[data-panel]:visible').count()==8;ctx.close();R['events']['no_js_and_print_all_steps_no_inert_controls']=True
 b.close()
info=subprocess.check_output(['pdfinfo',str(OUT/'registro-maximo.pdf')],text=True);R['print_max_pages']=int(re.search(r'Pages:\s*(\d+)',info).group(1));R['events']['print_one_a4_max']=R['print_max_pages']==1
subprocess.run(['pdftoppm','-png','-singlefile','-scale-to','1400',str(OUT/'registro-maximo.pdf'),str(OUT/'registro-maximo')],check=True)
assert not R['errors'],R['errors'];(OUT/'autocontroles-visuales.json').write_text(json.dumps(R,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in R.items() if k!='views'},ensure_ascii=False,indent=2));assert R['print_max_pages']==1,R['print_max_pages']
