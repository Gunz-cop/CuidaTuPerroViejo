"""Verificación local; terceros bloqueados, sin enviar formularios ni consultas."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:4321'
URL = BASE + '/salud-perros-mayores/salud-dental-perros-mayores'
results = []
def contrast(fg, bg):
    import re
    def luminance(color):
        rgb = [float(v)/255 for v in re.findall(r"[0-9.]+", color)[:3]]
        linear = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in rgb]
        return sum(v*w for v,w in zip(linear, [.2126,.7152,.0722]))
    a,b = sorted([luminance(fg),luminance(bg)])
    return (b+.05)/(a+.05)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for width, theme in [(1440, 'light'), (1440, 'dark'), (390, 'light'), (390, 'dark')]:
        context = browser.new_context(viewport={'width': width, 'height': 1000})
        context.add_init_script(f"localStorage.setItem('theme','{theme}')")
        context.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
        page = context.new_page()
        js_errors = []
        page.on('pageerror', lambda e: js_errors.append(str(e)))
        response = page.goto(URL, wait_until='networkidle')
        guide = page.locator('[data-dental-guide]')
        assert response.status == 200
        assert guide.get_attribute('data-enhanced') == 'true'
        assert guide.locator('[data-panel]:visible').count() == 1
        assert guide.locator('[data-panel="0"]').is_visible()
        assert guide.get_attribute('data-playing') == 'false'
        page.evaluate("document.querySelectorAll('[data-dental-guide] img').forEach(i=>i.loading='eager')")
        page.evaluate("Promise.all([...document.querySelectorAll('[data-dental-guide] img')].map(i=>i.decode()))")
        for step in range(4):
            guide.locator(f'[data-step="{step}"]').click()
            assert guide.locator(f'[data-panel="{step}"]').is_visible()
            assert guide.locator(f'[data-step="{step}"]').get_attribute('aria-pressed') == 'true'
            selected = guide.locator(f'[data-step="{step}"]').evaluate('(e)=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e).backgroundColor})')
            assert contrast(selected['fg'], selected['bg']) >= 4.5, selected
            assert guide.locator('.position').inner_text() == f'Paso {step+1} de 4'
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            guide.screenshot(path=str(OUT / f'guia-{width}-{theme}-paso-{step+1}.png'))
        guide.locator('[data-step="2"]').focus()
        page.keyboard.press('Enter')
        detail = guide.locator('[data-panel="2"] [data-detail-toggle]')
        detail.click()
        assert detail.get_attribute('aria-pressed') == 'true'
        page.wait_for_timeout(700)
        guide.screenshot(path=str(OUT / f'guia-{width}-{theme}-detalle.png'))
        detail.click()
        assert detail.get_attribute('aria-pressed') == 'false'
        page.clock.install()
        guide.locator('[data-step="0"]').click()
        guide.locator('[data-action="play"]').click()
        page.clock.fast_forward(9001)
        assert guide.locator('[data-panel="1"]').is_visible()
        guide.locator('[data-action="play"]').click()
        page.clock.fast_forward(18001)
        assert guide.locator('[data-panel="1"]').is_visible()
        assert guide.get_attribute('data-playing') == 'false'
        guide.locator('[data-step="0"]').click()
        guide.locator('[data-action="play"]').click()
        for _ in range(4): page.clock.fast_forward(9001)
        assert guide.locator('[data-panel="3"]').is_visible()
        assert guide.get_attribute('data-playing') == 'false'
        guide.locator('[data-action="play"]').click()
        assert guide.locator('[data-panel="0"]').is_visible()
        page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,get:()=>true}); document.dispatchEvent(new Event('visibilitychange'))")
        assert guide.get_attribute('data-playing') == 'false'
        page.clock.fast_forward(18001)
        assert guide.locator('[data-panel="0"]').is_visible()
        assert not js_errors, js_errors
        boxes = guide.locator('button:visible').evaluate_all('(els)=>els.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))')
        assert all(b['width'] >= 44 and b['height'] >= 44 for b in boxes), boxes
        colors = guide.locator('.step-copy p,.guide-header h3,figcaption').evaluate_all('(els)=>els.filter(e=>e.getClientRects().length).map(e=>({text:e.textContent,color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}))')
        results.append({'width': width, 'theme': theme, 'steps': 4, 'zoom': True, 'play_pause_repeat_finite': True, 'visibility_pause': True, 'keyboard': True, 'no_overflow': True, 'js_errors': js_errors, 'colors': colors})
        context.close()
    context = browser.new_context(viewport={'width': 390, 'height': 1000}, reduced_motion='reduce')
    context.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
    page = context.new_page()
    page.goto(URL, wait_until='networkidle')
    guide = page.locator('[data-dental-guide]')
    assert guide.locator('[data-action="play"]').is_disabled()
    guide.locator('[data-step="2"]').click()
    guide.locator('[data-panel="2"] [data-detail-toggle]').click()
    assert guide.locator('[data-panel="2"] img').evaluate('(e)=>getComputedStyle(e).transitionProperty') == 'none'
    page.emulate_media(media='print')
    assert guide.locator('[data-panel]:visible').count() == 4
    results.append({'reduced_motion': True, 'manual_navigation': True, 'print_all_steps': True})
    context.close()
    context = browser.new_context(viewport={'width': 390, 'height': 1000}, java_script_enabled=False)
    context.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
    page = context.new_page()
    page.goto(URL, wait_until='networkidle')
    guide = page.locator('[data-dental-guide]')
    assert guide.locator('[data-panel]:visible').count() == 4
    assert guide.locator('.guide-tabs').is_hidden()
    assert guide.locator('.guide-controls').is_hidden()
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    guide.screenshot(path=str(OUT / 'guia-sin-javascript.png'))
    results.append({'no_javascript': True, 'all_four_steps_available': True, 'no_inactive_controls': True})
    context.close()
    browser.close()
(OUT / 'navegador-local.json').write_text(json.dumps({'base': URL, 'method': 'Build estático local; terceros bloqueados; no acredita producción ni servicios externos.', 'results': results}, ensure_ascii=False, indent=2))
print(json.dumps({'scenarios': len(results), 'passed': True}))
