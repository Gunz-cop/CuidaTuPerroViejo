from playwright.sync_api import sync_playwright
from pathlib import Path
import json
results = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for width in [1440, 390]:
        context = browser.new_context(viewport={'width': width, 'height': 900})
        context.route('**/*', lambda r: r.continue_() if r.request.url.startswith('http://127.0.0.1:4321') else r.abort())
        for path in ['/', '/alimentacion-perros-senior', '/salud-perros-mayores/sindrome-cushing-perros-mayores', '/politica-de-privacidad', '/herramientas/selector-movilidad-perros-mayores', '/herramientas/calculadora-edad-perro', '/asistente-ia']:
            page = context.new_page()
            page.goto('http://127.0.0.1:4321' + path, wait_until='networkidle')
            page.keyboard.press('Tab')
            assert page.locator(':focus').get_attribute('href') == '#main-content', path
            page.keyboard.press('Enter')
            page.wait_for_function("document.activeElement.id === 'main-content'")
            if path == '/alimentacion-perros-senior':
                page.locator('a[href="#racion"]').first.click()
                assert page.locator('h2#racion').count() == 1
                assert page.evaluate('location.hash') == '#racion'
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), path
            results.append({'width': width, 'path': path, 'keyboard_skip_focus': 'main-content', 'passed': True})
            page.close()
        context.close()
    browser.close()
Path(__file__).with_name('navegacion-anclas-navegador.json').write_text(json.dumps(results, ensure_ascii=False, indent=2))
print({'checks': len(results), 'passed': True})
