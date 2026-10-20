"""Verificación técnica local de coordinación; no auditoría editorial independiente.
Requiere servidor estático en :8766, Playwright, Chromium y axe-core en /tmp.
Ejecutar desde la raíz del repositorio después del build completo.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
ARTICLE = '/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
BASELINE = '/alimentacion-perros-senior/comida-casera-perros-mayores'
HOST = 'http://127.0.0.1:8766'
report = {'alcance': 'Comprobación técnica local de coordinación; sin publicación.', 'paginas': []}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for path, width in [(ARTICLE, 390), (ARTICLE, 1366), (BASELINE, 390), (BASELINE, 1366)]:
        page = browser.new_page(viewport={'width': width, 'height': 844})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.route('**/*', lambda route: route.continue_() if route.request.url.startswith(HOST) else route.abort())
        response = page.goto(HOST + path, wait_until='networkidle')
        assert response.status == 200
        for mode in ['light', 'dark']:
            page.evaluate("mode => { document.documentElement.classList.toggle('dark', mode === 'dark'); localStorage.setItem('theme', mode); }", mode)
            page.emulate_media(color_scheme=mode)
            # Esperar a la transición de color de 200 ms del layout antes
            # de que axe congele los colores calculados para su análisis.
            page.wait_for_timeout(350)
            page.add_script_tag(path='/tmp/cuidatuperro-qa/node_modules/axe-core/axe.min.js')
            violations = page.evaluate("""async () => {
              const r = await axe.run({include:['article']}, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21aa']}});
              return r.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.map(n => ({target:n.target, summary:n.failureSummary}))}));
            }""")
            report['paginas'].append({'ruta': path, 'ancho': width, 'tema': mode, 'axe_articulo': violations})
        if path == ARTICLE:
            assert page.locator('h1').count() == 1
            assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://cuidatuperroviejo.com' + ARTICLE
            assert len(page.locator('meta[name="description"]').get_attribute('content')) <= 160
            resources = page.locator('[data-feeding-visual]').evaluate_all("els => els.map(el => el.dataset.feedingVisual)")
            assert {'decision', 'secuencia', 'registro'}.issubset(resources)
            report['apoyos'] = resources
            image_data = page.locator('article img').evaluate_all("""async els => {
              await Promise.all(els.map(async el => {el.loading='eager'; await el.decode();}));
              return els.map(el => ({src:el.getAttribute('src'), currentSrc:el.currentSrc, alt:el.alt, width:el.naturalWidth, height:el.naturalHeight}));
            }""")
            assert len(image_data) == 3 and all(i['width'] > 0 and i['alt'] for i in image_data)
            anchors = page.locator('article a[href^="#"]').evaluate_all("""els => els.map(el => ({href:el.getAttribute('href'), exists:!!document.getElementById(decodeURIComponent(el.hash.slice(1)))}))""")
            assert all(a['exists'] for a in anchors)
            report['imagenes'] = image_data
            report['anclas'] = anchors
            report['h1'] = page.locator('h1').inner_text()
        assert not errors, errors
        page.close()
    browser.close()
(OUT / 'coordinacion-navegador.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
current = [x for x in report['paginas'] if x['ruta'] == ARTICLE]
assert all(not x['axe_articulo'] for x in current), 'Revisar hallazgos de accesibilidad del artículo completo en el JSON.'
print(json.dumps({'paginas': len(report['paginas']), 'hallazgos_articulo_nuevo': sum(len(x['axe_articulo']) for x in current), 'imagenes_decodificadas': len(report['imagenes']), 'anclas_rotas': sum(not x['exists'] for x in report['anclas'])}, ensure_ascii=False))
