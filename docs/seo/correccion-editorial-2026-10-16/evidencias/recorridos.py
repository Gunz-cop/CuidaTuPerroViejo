"""Recorridos locales; no envía formularios, preguntas, votos ni mensajes externos."""
from playwright.sync_api import sync_playwright
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:4321'
results = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for width in [1440, 390]:
        c = browser.new_context(viewport={'width': width, 'height': 900})
        c.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
        page = c.new_page()
        page.goto(BASE + '/herramientas/calculadora-calidad-vida-perros', wait_until='networkidle')
        page.locator('#qol-start').click()
        for i in range(7):
            page.locator('#qol-q-chips button').nth(5).click()
        page.locator('#qol-result').wait_for(state='visible')
        score = page.locator('#qol-result-progress').get_attribute('aria-valuenow')
        assert score == '35', score
        page.evaluate('window.__printCalled=false; window.print=()=>{window.__printCalled=true}')
        page.locator('#qol-print').click()
        assert page.evaluate('window.__printCalled')
        results.append({'width': width, 'tool': 'calidad-vida', 'answers': [5]*7, 'score': score, 'result_visible': True, 'print_handler_called': True})
        if width == 390:
            page.screenshot(path=str(OUT/'movil-calidad-vida-resultado.png'))
        page.goto(BASE + '/herramientas/calculadora-edad-perro', wait_until='networkidle')
        before = page.locator('#dat-sr').text_content()
        page.locator('#dat-years').fill('12')
        page.locator('#dat-years').dispatch_event('input')
        after = page.locator('#dat-sr').text_content()
        assert before and after and before != after, (before, after)
        results.append({'width': width, 'tool': 'edad', 'before_aria': before, 'after_aria': after, 'css_counter': page.locator('.dat').evaluate("el=>el.style.getPropertyValue('--num')")})
        page.goto(BASE + '/herramientas/selector-movilidad-perros-mayores', wait_until='networkidle')
        page.locator('#m5start').click()
        page.locator('#m5oo1 button').last.click()
        page.locator('#m5oo2 button').last.click()
        page.locator('#m5s3').wait_for(state='visible')
        assert 'cada 4 horas' not in page.locator('#m5alert').inner_text()
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
        results.append({'width': width, 'tool': 'movilidad', 'result': page.locator('#m5s3').inner_text(), 'alert': page.locator('#m5alert').inner_text(), 'overflow': False})
        if width == 390:
            page.screenshot(path=str(OUT/'movil-movilidad-resultado.png'))
            page.goto(BASE + '/salud-perros-mayores/salud-dental-perros-mayores', wait_until='networkidle')
            page.screenshot(path=str(OUT/'movil-dental-portada.png'))
            page.evaluate("localStorage.setItem('theme','dark')")
            page.reload(wait_until='networkidle')
            page.screenshot(path=str(OUT/'movil-dental-oscuro.png'))
        c.close()
    browser.close()
(OUT/'recorridos-herramientas.json').write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(json.dumps({'checks': len(results), 'passed': True, 'printing': 'UI handler verified; no hosted PDF created'}, ensure_ascii=False))
