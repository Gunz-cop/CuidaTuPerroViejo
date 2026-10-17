from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:4321'
URL = BASE + '/salud-perros-mayores/salud-dental-perros-mayores'
results = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    cases = [(w,h,t,False) for w,h in [(320,568),(375,667),(390,844),(412,915)] for t in ['light','dark']]
    cases += [(320,568,'light',True), (390,844,'dark',True)]
    for width,height,theme,reduced in cases:
        context = browser.new_context(viewport={'width':width,'height':height}, reduced_motion='reduce' if reduced else 'no-preference')
        context.add_init_script(f"localStorage.setItem('theme','{theme}')")
        context.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(URL,wait_until='networkidle')
        guide = page.locator('[data-dental-guide]')
        page.evaluate("document.querySelectorAll('[data-dental-guide] img').forEach(i=>i.loading='eager')")
        page.evaluate("Promise.all([...document.querySelectorAll('[data-dental-guide] img')].map(i=>i.decode()))")
        assert guide.locator('.ad-slot').count() == 0
        assert page.locator('.ad-slot--300x250').count() >= 1
        assert page.locator('.ad-slot--320x50-mid').count() == 1
        steps = []
        for step in range(4):
            guide.locator(f'[data-step="{step}"]').click()
            player = guide.locator('.guide-player')
            player.evaluate('(e)=>window.scrollBy(0,e.getBoundingClientRect().top-76)')
            box = player.bounding_box()
            assert box and box['y'] >= 75 and box['y']+box['height'] <= height-54, (width,height,theme,reduced,step,box)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            instruction = guide.locator(f'[data-panel="{step}"] .step-copy > p:not(.step-number)').bounding_box()
            assert instruction and instruction['y']+instruction['height'] <= height-54
            for action in ['prev','play','next']:
                button = guide.locator(f'[data-action="{action}"]').bounding_box()
                assert button and button['width'] >= 44 and button['height'] >= 44
                assert button['y'] >= 75 and button['y']+button['height'] <= height-54
            assert guide.locator(f'[data-panel="{step}"] img').evaluate('(e)=>e.complete&&e.naturalWidth>0')
            steps.append({'step':step+1,'player_height':round(box['height'],2),'available_height':height-130,'image_instruction_controls_together':True})
        guide.locator('[data-step="2"]').click()
        guide.locator('.guide-player').evaluate('(e)=>window.scrollBy(0,e.getBoundingClientRect().top-76)')
        page.mouse.move(0,0)
        page.screenshot(path=str(OUT/f'telefono-{width}x{height}-{theme}-reduce-{reduced}.png'))
        if width == 390 and theme == 'light' and not reduced:
            page.evaluate("for(const e of document.querySelectorAll('body *'))if(!document.querySelector('[data-dental-guide]').contains(e)&&getComputedStyle(e).position==='fixed')e.style.setProperty('display','none','important')")
            guide.screenshot(path=str(OUT/'propuesta-movil-v2.png'))
        assert not errors, errors
        guide.locator('.guide-footer summary').click()
        assert guide.locator('.guide-footer details').get_attribute('open') is not None
        assert guide.locator('.guide-footer a').is_visible()
        results.append({'width':width,'height':height,'theme':theme,'reduced_motion':reduced,'steps':steps,'extra_notes_expand':True,'js_errors':errors})
        context.close()
    browser.close()
(OUT/'altura-navegador.json').write_text(json.dumps({'method':'Build local real del artículo; cabecera fija y publicidad presentes. El reproductor se sitúa a76px para dejar72px de navegación y54px al pie. Las notas opcionales pueden abrirse y extender la página.','results':results},ensure_ascii=False,indent=2))
print(json.dumps({'scenarios':len(results),'step_checks':sum(len(r['steps']) for r in results),'passed':True}))
