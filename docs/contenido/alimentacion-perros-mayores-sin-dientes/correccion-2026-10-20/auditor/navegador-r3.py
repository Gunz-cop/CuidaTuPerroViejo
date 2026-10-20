"""Pruebas propias del auditor; ejecutar solo sobre el conjunto final congelado.

No modifica los archivos del producto. Las alteraciones DOM de impresión y
simulación de eventos se declaran en el resultado y se limitan al navegador.
"""
import asyncio
import hashlib
import json
import re
import subprocess
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[5]
DOSSIER = Path(__file__).resolve().parent
CAPTURES = DOSSIER / 'capturas'
URL = 'http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
AXE = Path('/tmp/feeding-v2-qa/node_modules/axe-core/axe.min.js')
RESULT = {'scope': 'Auditoría propia Chromium local, sin despliegue', 'checks': [], 'failures': [], 'screens': [], 'pdf': [], 'browser_errors': []}


def check(name, passed, evidence=None):
    entry = {'check': name, 'pass': bool(passed), 'evidence': evidence}
    RESULT['checks'].append(entry)
    if not passed:
        RESULT['failures'].append(entry)


def pdf_text(path):
    return subprocess.check_output(['pdftotext', str(path), '-'], text=True)


def pdf_pages(path):
    info = subprocess.check_output(['pdfinfo', str(path)], text=True)
    return int(re.search(r'^Pages:\s+(\d+)', info, re.M).group(1))


async def screenshot(locator, name):
    path = CAPTURES / name
    await locator.screenshot(path=str(path))
    RESULT['screens'].append(str(path.relative_to(ROOT)))


async def prepare(page):
    page.on('pageerror', lambda e: RESULT['browser_errors'].append(str(e)))
    await page.goto(URL, wait_until='networkidle')
    await page.locator('[data-feeding-v2-sequence]').first.wait_for()
    await page.evaluate('Promise.all(Array.from(document.images).map(i => { i.loading="eager"; return i.decode().catch(() => null) }))')


async def viewport_case(browser, width, theme):
    context = await browser.new_context(viewport={'width': width, 'height': 950}, color_scheme=theme)
    page = await context.new_page()
    await page.add_init_script("localStorage.setItem('theme', '%s')" % theme)
    await prepare(page)
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)', theme == 'dark')
    key = f'{width}-{theme}'
    check(key + ': tema real', await page.evaluate("document.documentElement.classList.contains('dark')") == (theme == 'dark'))
    check(key + ': sin overflow global', await page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
    reading = await page.locator('.content-body p').evaluate_all('''(xs)=>xs.filter(x=>!x.closest('[data-editorial-visual],[data-editorial-bibliography],figcaption')&&x.getClientRects().length&&x.textContent.trim().split(/\\s+/).length>10).map(x=>{const c=getComputedStyle(x);return {words:x.textContent.trim().split(/\\s+/).length,lines:Math.round(x.getBoundingClientRect().height/parseFloat(c.lineHeight)),font:c.fontSize,lineHeight:c.lineHeight}})''')
    RESULT.setdefault('reading', {})[key] = reading
    # Medir lectura real; no convertir 30–40 palabras en una promesa de tres líneas.
    RESULT.setdefault('reading_summary', {})[key] = {'paragraphs':len(reading), 'max_lines':max((p['lines'] for p in reading),default=0), 'note':'Medición, no umbral universal de líneas o tamaño. La legibilidad se evalúa además en las capturas.'}
    imgs = await page.locator('.content-body img').evaluate_all('(xs) => xs.map(i => ({src:i.currentSrc,ok:i.complete&&i.naturalWidth>0,w:i.naturalWidth,h:i.naturalHeight}))')
    # La hero vive fuera del cuerpo: comprobarla además, sin contar favicons.
    all_imgs = await page.locator('img[src*="/images/blog/alimentacion-perros-mayores-sin-dientes/"]').evaluate_all('(xs) => xs.map(i=>({src:i.currentSrc,ok:i.complete&&i.naturalWidth>0}))')
    check(key + ': cinco escenas decodificadas', len(all_imgs) == 5 and all(i['ok'] for i in all_imgs), all_imgs)
    seqs = page.locator('[data-feeding-v2-sequence]')
    check(key + ': dos secuencias sin autoplay', await seqs.count() == 2 and await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.step==="0"&&x.dataset.playing==="false")'))
    targets = await page.locator('.feeding-controls button,.feeding-print').evaluate_all('(xs)=>xs.filter(x=>x.getClientRects().length).map(x=>({text:x.textContent,w:x.getBoundingClientRect().width,h:x.getBoundingClientRect().height}))')
    check(key + ': controles tactiles 44px', all(t['w'] >= 44 and t['h'] >= 44 for t in targets), targets)
    await page.add_script_tag(path=str(AXE))
    axe = await page.evaluate('async()=>{const r=await axe.run(document.querySelector(".content-body"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))}')
    check(key + ': axe cuerpo', not axe, axe)
    await page.screenshot(path=str(CAPTURES / f'{key}-cabecera.png'))
    RESULT['screens'].append(str((CAPTURES / f'{key}-cabecera.png').relative_to(ROOT)))
    for variant in ['base', 'ingesta']:
        seq = page.locator(f'[data-feeding-v2-sequence][data-variant="{variant}"]')
        await seq.locator('[data-action="next"]').focus()
        await page.keyboard.press('Enter')
        check(key + ':' + variant + ': avance teclado', await seq.get_attribute('data-step') == '1')
        focus = await seq.locator('[data-action="next"]').evaluate('(x)=>({active:document.activeElement===x,outline:getComputedStyle(x).outlineStyle,width:getComputedStyle(x).outlineWidth})')
        check(key + ':' + variant + ': foco visible', focus['active'] and focus['outline'] != 'none' and focus['width'] != '0px', focus)
        await seq.locator('[data-action="next"]').click()
        await screenshot(seq, f'{key}-{variant}-paso3.png')
    # Comprobar la tabla que realmente puede desplazarse, no solo el contenedor.
    for i, table in enumerate(await page.locator('.content-body table').all()):
        dims = await table.evaluate('(x)=>({scroll:x.scrollWidth,client:x.clientWidth,tab:x.tabIndex})')
        if dims['scroll'] > dims['client'] + 1:
            await table.focus()
            before = await table.evaluate('(x)=>x.scrollLeft')
            await page.keyboard.press('ArrowRight')
            await page.wait_for_timeout(250)
            after = await table.evaluate('(x)=>x.scrollLeft')
            check(key + f': tabla {i+1} desplazable con teclado', after > before, {'before': before, 'after': after, 'dimensions': dims})
    anchors = await page.locator('.content-body a[href^="#"]').evaluate_all('(xs)=>xs.map(a=>a.getAttribute("href")).filter(h=>h.length>1&&!document.getElementById(decodeURIComponent(h.slice(1))))')
    check(key + ': anclas internas cuerpo', not anchors, anchors)
    await context.close()


async def interaction_case(browser):
    context = await browser.new_context(viewport={'width': 1366, 'height': 950})
    page = await context.new_page()
    await prepare(page)
    seqs = page.locator('[data-feeding-v2-sequence]')
    # Las dos instancias simultáneas deben conservar estado y temporizador propios.
    for seq in await seqs.all():
        await seq.locator('[data-action="play"]').click()
    await page.wait_for_timeout(7000)
    check('temporizador: ambas avanzan realmente', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.step==="1"&&x.dataset.playing==="true")'))
    for seq in await seqs.all():
        await seq.locator('[data-action="play"]').click()
    paused = await seqs.evaluate_all('(xs)=>xs.map(x=>({step:x.dataset.step,playing:x.dataset.playing,transitions:Array.from(x.querySelectorAll("svg *")).map(n=>getComputedStyle(n).transitionDuration)}))')
    await page.wait_for_timeout(7000)
    check('pausa real: sin avance durante 7s', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.step==="1"&&x.dataset.playing==="false")'), paused)
    check('pausa real: transiciones detenidas', all(all(t == '0s' for t in s['transitions']) for s in paused))
    for seq in await seqs.all():
        await seq.locator('[data-action="play"]').click()
    await page.wait_for_function('Array.from(document.querySelectorAll("[data-feeding-v2-sequence]")).every(x=>x.dataset.step==="3"&&x.dataset.playing==="false")', timeout=24000)
    check('reproduccion finita: ambas terminan', True)
    for seq in await seqs.all():
        check('repetir disponible: '+str(await seq.get_attribute('data-variant')), 'Repetir' in await seq.locator('[data-action="play"]').inner_text())
        await seq.locator('[data-action="play"]').click()
    check('repetir reinicia al primer paso', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.step==="0"&&x.dataset.playing==="true")'))
    await page.evaluate('window.dispatchEvent(new Event("pagehide"))')
    check('pagehide simulado detiene reproduccion', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.playing==="false")'))
    for seq in await seqs.all():
        await seq.locator('[data-action="play"]').click()
    await page.evaluate('Object.defineProperty(document,"hidden",{configurable:true,value:true}); document.dispatchEvent(new Event("visibilitychange")); Object.defineProperty(document,"hidden",{configurable:true,value:false})')
    check('visibilitychange simulado detiene reproduccion', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.playing==="false")'))
    for seq in await seqs.all():
        await seq.locator('[data-action="play"]').click()
    await page.evaluate('document.dispatchEvent(new Event("astro:before-swap"))')
    check('before-swap simulado detiene reproduccion', await seqs.evaluate_all('(xs)=>xs.every(x=>x.dataset.playing==="false")'))
    await page.evaluate('document.dispatchEvent(new Event("astro:page-load"));document.dispatchEvent(new Event("astro:page-load"))')
    seq = seqs.first
    await seq.locator('[data-action="next"]').click()
    check('reinicializacion idempotente, un solo avance', await seq.get_attribute('data-step') == '1')
    # Impresión completa: CSS debe mostrar todos los pasos, incluso los inactivos.
    await page.locator('.feeding-v2 details').evaluate_all('(xs)=>xs.forEach(x=>x.open=false)')
    await page.emulate_media(media='print')
    check('impresion JS muestra ocho pasos', all([await p.is_visible() for p in await page.locator('[data-panel]').all()]))
    path = CAPTURES / 'articulo-completo-js.pdf'
    await page.pdf(path=str(path), format='A4', print_background=True, tagged=True, outline=True)
    text = pdf_text(path)
    check('PDF articulo JS incluye ambos recorridos', 'Separa la base indicada' in text and 'Traslada datos y preguntas' in text)
    RESULT['pdf'].append({'path': str(path.relative_to(ROOT)), 'pages': pdf_pages(path)})
    await page.emulate_media(media='screen')
    record = page.locator('[data-feeding-v2-visual="registro"]')
    fields = record.locator('input,textarea')
    network = []
    page.on('request', lambda req: network.append({'url': req.url, 'method': req.method}))
    for maximal in [False, True]:
        values = []
        await record.locator('.feeding-record-form').evaluate('(x)=>x.open=true')
        for i, field in enumerate(await fields.all()):
            max_len = int(await field.get_attribute('maxlength'))
            prefix = f'Campo{i+1} '
            value = (prefix + ('dato ' * 100))[:max_len] if maximal else prefix + 'observado sin diagnostico'
            values.append(value)
            await field.fill(value)
        await page.evaluate('window.print=()=>{window.__auditorPrintCalled=true}')
        await record.locator('.feeding-print').click()
        clone = page.locator('.feeding-v2-print-copy')
        printed = await clone.locator('.feeding-printed-value').all_text_contents()
        check('registro '+str(maximal)+': conserva todos los valores', printed == values)
        await page.emulate_media(media='print')
        path = CAPTURES / ('registro-maximo.pdf' if maximal else 'registro-ejemplo.pdf')
        await page.pdf(path=str(path), format='A4', print_background=True, tagged=True, outline=True)
        pages = pdf_pages(path)
        check('registro '+str(maximal)+': una pagina A4', pages == 1, pages)
        pdf_flat = re.sub(r'\s+', '', pdf_text(path))
        check('registro '+str(maximal)+': valores completos en PDF', all(re.sub(r'\s+', '', v) in pdf_flat for v in values))
        RESULT['pdf'].append({'path': str(path.relative_to(ROOT)), 'pages': pages})
        await page.evaluate('window.dispatchEvent(new Event("afterprint"))')
        await page.emulate_media(media='screen')
    check('registro: escribir e imprimir no envia solicitudes', not network, network)
    check('registro: sin persistencia de valores', await page.evaluate('!JSON.stringify({...localStorage,...sessionStorage}).includes("Campo1")'))
    await context.close()


async def alternative_cases(browser):
    context = await browser.new_context(viewport={'width': 375, 'height': 900}, java_script_enabled=False)
    page = await context.new_page()
    await page.goto(URL, wait_until='networkidle')
    check('sin JS: ocho pasos visibles', await page.locator('[data-panel]').count() == 8 and all([await p.is_visible() for p in await page.locator('[data-panel]').all()]))
    check('sin JS: controles no funcionales ocultos', not any([await p.is_visible() for p in await page.locator('.feeding-controls,.feeding-print').all()]))
    check('sin JS: sin overflow a 375px', await page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
    path = CAPTURES / 'articulo-completo-sin-js.pdf'
    await page.pdf(path=str(path), format='A4', print_background=True, tagged=True, outline=True)
    text = pdf_text(path)
    check('PDF sin JS conserva ambos finales', 'Ofrece y anota lo que quede' in text and 'Traslada datos y preguntas' in text)
    RESULT['pdf'].append({'path': str(path.relative_to(ROOT)), 'pages': pdf_pages(path)})
    await context.close()
    context = await browser.new_context(viewport={'width': 390, 'height': 900}, reduced_motion='reduce')
    page = await context.new_page()
    await prepare(page)
    for seq in await page.locator('[data-feeding-v2-sequence]').all():
        variant = await seq.get_attribute('data-variant')
        check('movimiento reducido '+variant+': reproduccion desactivada', await seq.locator('[data-action="play"]').is_disabled())
        await seq.locator('[data-action="next"]').click()
        check('movimiento reducido '+variant+': avance manual disponible', await seq.get_attribute('data-step') == '1')
        transitions = await seq.locator('svg *').evaluate_all('(xs)=>xs.filter(x=>x.getClientRects().length).map(x=>getComputedStyle(x).transitionDuration)')
        check('movimiento reducido '+variant+': sin transiciones', all(t == '0s' for t in transitions))
    await screenshot(page.locator('[data-feeding-v2-sequence]').first, '390-reduced-base.png')
    await context.close()


async def main():
    CAPTURES.mkdir(parents=True, exist_ok=True)
    for name in ['src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx', 'src/components/article/AlimentacionSinDientesRecursosV2.astro']:
        RESULT.setdefault('hashes', {})[name] = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        for width in [390, 393, 1366]:
            for theme in ['light', 'dark']:
                await viewport_case(browser, width, theme)
        await interaction_case(browser)
        await alternative_cases(browser)
        await browser.close()
    check('sin errores JavaScript', not RESULT['browser_errors'], RESULT['browser_errors'])
    RESULT['note'] = 'No se ocultaron nav/asistente para capturas. Eventos pagehide/visibility/Astro simulados; no se afirma navegación o cambio de pestaña nativos. window.print se interceptó solo en pruebas PDF del registro; se imprimió con su CSS real.'
    (DOSSIER / 'navegador-r3.json').write_text(json.dumps(RESULT, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'checks': len(RESULT['checks']), 'failures': RESULT['failures'], 'screenshots': len(RESULT['screens']), 'pdf': RESULT['pdf']}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except Exception as error:
        RESULT['failures'].append({'fatal': str(error)})
        (DOSSIER / 'navegador-r3.json').write_text(json.dumps(RESULT, ensure_ascii=False, indent=2) + '\n')
        raise
