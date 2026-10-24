"""Comprueba solo los recursos de esta entrega; requiere build servido en localhost:8787."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

HERE = Path(__file__).resolve().parent
out = HERE / 'imagenes-revision'
out.mkdir(exist_ok=True)
base = 'http://127.0.0.1:8787'
results = []
with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    for width in [375, 390, 1366]:
        for mode in ['claro', 'oscuro']:
            page = browser.new_page(viewport={'width': width, 'height': 900}, color_scheme='dark' if mode == 'oscuro' else 'light')
            page.route('**/*', lambda route: route.continue_() if route.request.url.startswith(base + '/') else route.abort())
            page.goto(base + '/salud-perros-mayores/golpe-de-calor-perros-mayores.html')
            page.locator('html').evaluate('(el,dark)=>el.classList.toggle("dark",dark)', mode == 'oscuro')
            images = page.locator('img')
            assert images.count() == 3
            images.evaluate_all('(els)=>Promise.all(els.map(el=>el.decode()))')
            assert page.evaluate('document.documentElement.scrollWidth') == width
            selected = images.evaluate_all('(els)=>els.map(el=>({src:el.currentSrc,alt:el.alt,width:el.naturalWidth,decoded:el.complete&&el.naturalWidth>0}))')
            assert 'enfriamiento-evaporativo-v2' in selected[1]['src']
            assert 'zona-fresca-casa-v2' in selected[2]['src']
            for index, name in [(1, 'enfriamiento'), (2, 'casa')]:
                images.nth(index).screenshot(path=str(out / f'{name}-{width}-{mode}.png'))
            results.append({'width': width, 'mode': mode, 'images': selected, 'overflow': False})
            page.close()
    page = browser.new_page(viewport={'width': 1200, 'height': 900})
    png = base + '/images/blog/golpe-de-calor-perros-mayores/podenco-senior-perfil-transparente-v1.png'
    page.set_content('<main style="width:1100px;height:850px;background:linear-gradient(90deg,#fff 50%,#22352c 50%)"><img style="width:100%;height:100%;object-fit:contain" src="' + png + '" alt="Recorte del podenco senior de perfil hacia la derecha"></main>')
    page.locator('img').evaluate('(el)=>el.decode()')
    page.locator('main').screenshot(path=str(out / 'recorte-claro-oscuro.png'))
    results.append({'cutout': page.locator('img').evaluate('(el)=>({src:el.currentSrc,width:el.naturalWidth,height:el.naturalHeight,decoded:el.complete})')})
    browser.close()
(HERE / 'imagenes-revision-navegador.json').write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(f'{len(results)-1} vistas comprobadas y recorte PNG decodificado')
