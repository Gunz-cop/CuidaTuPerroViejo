"""Run against wrangler dev --local on port 8787; .dev.vars must contain preview credentials.
Uses Python Playwright from the cloud environment; no app dependencies added.
"""
import json, re, urllib.request, urllib.error, base64
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[2]
credentials = dict(re.findall(r'^(CONTACT_ADMIN_\w+)="([^"]+)"', (root / '.dev.vars').read_text(), re.M))
user, password = credentials['CONTACT_ADMIN_USER'], credentials['CONTACT_ADMIN_PASSWORD']
base = 'http://localhost:8787'
results = []
def check(path, method='GET', authorized=False, accept='text/html'):
    headers = {'Origin': base, 'Accept': accept, 'cf-connecting-ip': f'192.0.2.{len(results)+1}'}
    if authorized:
        headers['Authorization'] = 'Basic ' + base64.b64encode(f'{user}:{password}'.encode()).decode()
    req = urllib.request.Request(base + path, headers=headers, method=method)
    try: response = urllib.request.urlopen(req)
    except urllib.error.HTTPError as e: response = e
    body = response.read().decode()
    result = {'path':path,'method':method,'authorized':authorized,'accept':accept,'status':response.status,'cache':response.headers.get('Cache-Control')}
    results.append(result)
    assert 'no-store' in (result['cache'] or ''), result
    assert response.status == (200 if authorized else 401), result
    if not authorized: assert 'affiliate_clicks_daily' not in body
    return body

for path in ['/admin','/admin/','/admin/monetizacion','/admin/asistente','/admin/contact-messages']:
    check(path)
    check(path, authorized=True)
check('/api/admin/contact-messages/1', method='POST')
check('/admin', method='HEAD')
check('/admin', accept='text/markdown')
body = check('/admin', authorized=True)
assert 'Sin clics registrados' in body and 'Sin consultas registradas' in body

out = root / 'docs/admin/capturas'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for name, viewport, mobile in [('iphone',{'width':390,'height':844},True),('escritorio',{'width':1440,'height':1000},False)]:
        for theme in ['light','dark']:
            context = browser.new_context(viewport=viewport, is_mobile=mobile, has_touch=mobile, device_scale_factor=1, color_scheme=theme, http_credentials={'username':user,'password':password}, extra_http_headers={'cf-connecting-ip': '198.51.100.' + str(len(name)+len(theme))})
            page = context.new_page()
            errors=[]
            page.on('pageerror', lambda e: errors.append(str(e)))
            response=page.goto(base+'/admin')
            assert response.status == 200
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            assert page.locator('h1').inner_text() == 'Escritorio'
            page.keyboard.press('Tab')
            assert page.evaluate('document.activeElement.textContent') == 'Saltar al contenido'
            page.keyboard.press('Tab')
            for label in ['Ver sitio público','Monetización','Asistente','Mensajes de contacto']:
                assert label in page.evaluate('document.activeElement.textContent'), label
                page.keyboard.press('Tab')
            assert not errors, errors
            page.screenshot(path=str(out/f'{name}-{theme}.png'),full_page=True)
            context.close()
    browser.close()
(root/'docs/admin/preview-results.json').write_text(json.dumps({'http':results,'browser':'Chromium; 390x844 y 1440x1000; claro/oscuro; sin overflow; orden de Tab y JS verificados; D1 local vacío'},indent=2))
print('HTTP, navegación por teclado y cuatro capturas: OK')
