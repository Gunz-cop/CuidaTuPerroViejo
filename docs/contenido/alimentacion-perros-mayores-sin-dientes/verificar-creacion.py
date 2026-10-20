"""Comprobaciones propias reproducibles: artículo estático, no Worker ni producción.
Requiere playwright Python, /usr/bin/chromium y axe-core en /tmp/cuidatuperro-qa.
Ejecutar desde raíz repo con el servidor de dist/client en 127.0.0.1:8766.
"""
from pathlib import Path
import json, re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
EVIDENCE = ROOT / 'capturas-creacion'
EVIDENCE.mkdir(exist_ok=True)
URL = 'http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
REPORT = {'alcance':'Validación propia local de creación; no auditoría independiente ni URL pública.', 'vistas':[], 'interaccion':{}, 'impresion':{}, 'errores_js':[]}
AXE = '/tmp/cuidatuperro-qa/node_modules/axe-core/axe.min.js'

def theme(page, mode):
    page.evaluate("mode => {localStorage.setItem('theme',mode);document.documentElement.classList.toggle('dark',mode === 'dark')}",mode)
    page.emulate_media(color_scheme=mode)
    page.wait_for_timeout(350)

def isolated_capture(page, selector, name):
    # Solo capturas de detalle: ocultar overlays ajenos evita que el sticky header
    # tape el título del componente. Capturas de viewport conservan ambos overlays.
    page.evaluate("window.__captureHidden=[...document.querySelectorAll('nav.sticky,#ai-chat-toggle')].map(el=>{const marker=document.createComment('capture-placeholder');el.before(marker);el.remove();return {el,marker}})")
    page.locator(selector).screenshot(path=str(EVIDENCE/name))
    page.evaluate("window.__captureHidden.forEach(({el,marker})=>{marker.before(el);marker.remove()});delete window.__captureHidden")

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for width in [390,1366]:
        page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
        page.on('pageerror',lambda error: REPORT['errores_js'].append(str(error)))
        response=page.goto(URL,wait_until='networkidle')
        assert response.status==200
        page.locator('[data-feeding-sequence][data-enhanced="true"]').wait_for()
        for mode in ['light','dark']:
            theme(page,mode)
            page.evaluate('scrollTo(0,0)')
            page.screenshot(path=str(EVIDENCE/f'{width}-{mode}-pagina.png'))
            layout=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})')
            assert layout['width']==layout['scroll'],layout
            images=page.locator('article img').evaluate_all('''async els => {
              await Promise.all(els.map(async img => {img.loading='eager'; await img.decode()}));
              return els.map(img=>({src:img.getAttribute('src'),current:img.currentSrc,width:img.naturalWidth,height:img.naturalHeight,decoded:img.complete && img.naturalWidth>0}));
            }''')
            assert all(x['decoded'] for x in images)
            colors=page.locator('[data-feeding-visual] h3,[data-feeding-visual] h4,[data-feeding-visual] p,[data-feeding-visual] label,[data-feeding-visual] button').evaluate_all('''els => els.filter(el=>el.getBoundingClientRect().height>0).map(el=>{
              let bg=el; while(bg && getComputedStyle(bg).backgroundColor==='rgba(0, 0, 0, 0)') bg=bg.parentElement;
              return {tag:el.tagName,text:el.textContent.slice(0,50),fg:getComputedStyle(el).color,bg:bg?getComputedStyle(bg).backgroundColor:'rgb(255, 255, 255)'};
            })''')
            page.add_script_tag(path=AXE)
            axe=page.evaluate("async () => {const r=await axe.run({include:['article']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}")
            assert not axe,axe
            isolated_capture(page,'[data-feeding-visual="decision"]',f'{width}-{mode}-matriz.png')
            isolated_capture(page,'[data-feeding-visual="comparacion"]',f'{width}-{mode}-comparacion.png')
            seq=page.locator('[data-feeding-sequence]')
            while seq.get_attribute('data-step')!='0':seq.locator('[data-action="prev"]').click()
            for step in range(3):
                if step:seq.locator('[data-action="next"]').click()
                page.wait_for_timeout(350)
                isolated_capture(page,'[data-feeding-visual="secuencia"]',f'{width}-{mode}-paso-{step+1}.png')
            isolated_capture(page,'[data-feeding-visual="registro"]',f'{width}-{mode}-registro.png')
            REPORT['vistas'].append({'width':width,'mode':mode,'layout':layout,'images':images,'colors':colors,'axe_article':axe})
        page.close()

    page=browser.new_page(viewport={'width':390,'height':844})
    page.on('pageerror',lambda error:REPORT['errores_js'].append(str(error)))
    page.goto(URL,wait_until='networkidle')
    seq=page.locator('[data-feeding-sequence]')
    assert seq.get_attribute('data-step')=='0' and seq.get_attribute('data-playing')=='false'
    page.wait_for_timeout(7000)
    assert seq.get_attribute('data-step')=='0'
    # Teclado, foco y objetivos táctiles.
    next_button=seq.locator('[data-action="next"]')
    next_button.focus();page.keyboard.press('Enter');assert seq.get_attribute('data-step')=='1'
    next_button.focus()
    focus=next_button.evaluate('(el)=>({focus:el===document.activeElement,outline:getComputedStyle(el).outlineStyle,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})')
    assert focus['focus'] and focus['outline']!='none'
    sizes=seq.locator('button').evaluate_all('els=>els.map(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))')
    assert all(s['width']>=44 and s['height']>=44 for s in sizes)
    table=page.locator('.asv-table');table.focus();before=table.evaluate('el=>el.scrollLeft')
    page.keyboard.press('ArrowRight');page.wait_for_timeout(300)
    after=table.evaluate('el=>el.scrollLeft');assert after>before,(before,after)
    assert table.evaluate('el=>getComputedStyle(el).outlineStyle')=='solid'
    # Pausa real con temporizador y animación detenidos.
    seq.locator('[data-action="play"]').click();page.wait_for_timeout(500)
    seq.locator('[data-action="play"]').click();paused_step=seq.get_attribute('data-step')
    assert seq.get_attribute('data-playing')=='false'
    animations=seq.evaluate('(el)=>el.getAnimations({subtree:true}).filter(a=>a.playState==="running").length')
    assert animations==0
    page.wait_for_timeout(7000);assert seq.get_attribute('data-step')==paused_step
    # Finalización finita y repetir.
    seq.locator('[data-action="next"]').click();assert seq.get_attribute('data-step')=='2'
    seq.locator('[data-action="play"]').click();assert seq.get_attribute('data-step')=='0'
    page.wait_for_timeout(20000)
    assert seq.get_attribute('data-step')=='2' and seq.get_attribute('data-playing')=='false'
    assert seq.locator('[data-action="play"]').inner_text()=='Repetir secuencia'
    # Movimiento reducido conserva navegación manual sin transición.
    page.emulate_media(reduced_motion='reduce');assert seq.locator('[data-action="play"]').is_disabled()
    seq.locator('[data-action="prev"]').click();assert seq.get_attribute('data-step')=='1'
    assert seq.locator('.asv-stage').first.evaluate('el=>getComputedStyle(el).transitionDuration')=='0s'
    REPORT['interaccion']={'sin_autoplay':True,'teclado':True,'foco':focus,'controles':sizes,'pausa_estable_7s':True,'animaciones_en_pausa':animations,'finita_20s':True,'repetir':True,'reduced_motion':True}
    REPORT['interaccion']['tabla_teclado_desplazamiento']={'antes':before,'despues':after,'foco_visible':True}
    page.emulate_media(reduced_motion='no-preference')
    seq.locator('[data-action="play"]').click()
    page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))")
    assert seq.get_attribute('data-playing')=='false'
    page.evaluate("delete document.hidden")
    seq.locator('[data-action="play"]').click()
    page.evaluate("document.dispatchEvent(new Event('astro:before-swap'))")
    stopped_step=seq.get_attribute('data-step');page.wait_for_timeout(7000)
    assert seq.get_attribute('data-step')==stopped_step
    page.evaluate("document.dispatchEvent(new Event('astro:page-load'));document.dispatchEvent(new Event('astro:page-load'))")
    seq.locator('[data-action="next"]').click();assert seq.get_attribute('data-step')=='1'
    REPORT['interaccion']['evento_visibilitychange_simulado_pausa']=True
    REPORT['interaccion']['evento_navegacion_limpia_timer_7s']=True
    REPORT['interaccion']['doble_page_load_sin_duplicacion']=True
    # Todos los pasos en impresión de artículo, con JS activo.
    page.emulate_media(media='print')
    assert seq.locator('[data-panel]:visible').count()==3
    page.pdf(path=str(EVIDENCE/'articulo-js.pdf'),format='A4',print_background=True)
    REPORT['impresion']['pasos_con_js']=3
    page.emulate_media(media='screen',reduced_motion='no-preference')
    # Botón real invoca impresión y los valores sobreviven en la copia imprimible.
    record=page.locator('[data-feeding-visual="registro"]')
    record.locator('input').nth(0).fill('19/10/2026 08:00')
    record.locator('input').nth(1).fill('Alimento completo habitual')
    record.locator('textarea').fill('Ejemplo de registro: anotar lo observado sin diagnosticar.')
    page.evaluate("window.__beforePrinted=false;window.addEventListener('beforeprint',()=>window.__beforePrinted=!!document.querySelector('.asv-print-copy'),{once:true})")
    record.locator('.asv-print').click()
    assert page.evaluate('window.__beforePrinted')
    page.evaluate("window.print=()=>{window.__printInvoked=true}")
    record.locator('.asv-print').click();assert page.evaluate('window.__printInvoked')
    page.emulate_media(media='print')
    assert page.locator('.asv-print-copy').is_visible()
    assert '19/10/2026 08:00' in page.locator('.asv-print-copy').inner_text()
    assert page.locator('.asv-print-copy input,.asv-print-copy textarea').count()==0
    page.pdf(path=str(EVIDENCE/'registro-relleno.pdf'),format='A4',print_background=True)
    REPORT['impresion']['boton_real_beforeprint']=True
    REPORT['impresion']['pdf_registro_valores']=True
    page.evaluate("dispatchEvent(new Event('afterprint'))")
    assert page.locator('.asv-print-copy').count()==0
    page.emulate_media(media='screen')
    # 375 px y reflujo aproximado a zoom 200 % con viewport efectivo 320 px.
    reflow=[]
    for width in [375,320]:
        page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(200)
        dims=page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth})');assert dims['scroll']==width,dims;reflow.append(dims)
    REPORT['reflujo']=reflow
    # Anclas y destinos locales reales (sin alterar datos externos).
    anchors=page.locator('article a[href^="#"]').evaluate_all('els=>els.map(a=>a.getAttribute("href"))')
    broken=[a for a in anchors if not page.locator('[id]').evaluate_all('(els,id)=>els.some(el=>el.id===id)',a[1:])]
    assert not broken,broken
    internal=sorted(set(page.locator('article a[href^="/"]').evaluate_all('els=>els.map(a=>a.getAttribute("href"))')))
    REPORT['enlaces_internos']=[]
    for href in internal:
        r=page.request.get('http://127.0.0.1:8766'+href);assert r.status==200,(href,r.status)
        REPORT['enlaces_internos'].append({'href':href,'status':r.status,'html':r.headers.get('content-type','')})
    page.close()

    nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844})
    page=nojs.new_page();page.goto(URL)
    assert page.locator('[data-feeding-sequence] [data-panel]:visible').count()==3
    assert page.locator('.asv-controls:visible,.asv-print:visible').count()==0
    page.emulate_media(media='print');assert page.locator('[data-feeding-sequence] [data-panel]:visible').count()==3
    page.pdf(path=str(EVIDENCE/'articulo-sin-js.pdf'),format='A4',print_background=True)
    REPORT['sin_js']={'pasos_visibles':3,'controles_inertes_visibles':0,'pasos_impresion':3}
    nojs.close();browser.close()

assert not REPORT['errores_js'],REPORT['errores_js']
(ROOT/'verificacion-creacion.json').write_text(json.dumps(REPORT,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in REPORT.items() if k!='vistas'},ensure_ascii=False,indent=2))
