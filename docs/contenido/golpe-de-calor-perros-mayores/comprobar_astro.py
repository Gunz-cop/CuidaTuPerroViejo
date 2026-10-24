from pathlib import Path
from playwright.sync_api import sync_playwright
import json
p=Path(__file__).resolve().parent
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for w in [390,1366]:
        for mode in ['claro','oscuro']:
            page=browser.new_page(viewport={'width':w,'height':844 if w==390 else 900},color_scheme='dark' if mode=='oscuro' else 'light')
            page.goto('http://127.0.0.1:8787/salud-perros-mayores/golpe-de-calor-perros-mayores.html')
            page.wait_for_load_state('networkidle')
            if mode=='oscuro': page.locator('html').evaluate('(el)=>el.classList.add("dark")')
            page.locator('img').evaluate_all('(els)=>Promise.all(els.map(el=>el.decode()))')
            assert page.locator('img').count()==3
            assert page.locator('.faq-section details[open]').count()==0
            assert page.locator('.faq-section details').count()==7
            sizes=page.locator('.tabla-apilable').evaluate_all('(els)=>els.map(el=>({height:el.getBoundingClientRect().height,width:el.getBoundingClientRect().width}))')
            assert all(s['height']<900 for s in sizes)
            assert page.evaluate('document.documentElement.scrollWidth')==w
            assert page.locator('#qué-hacer-en-los-primeros-minutos').count()==1
            for i,el in enumerate(page.locator('.tabla-apilable').all()):
                el.screenshot(path=str(p/f'astro-tabla-{i+1}-{w}-{mode}.png'))
            page.screenshot(path=str(p/f'astro-lectura-{w}-{mode}.png'))
            for i,el in enumerate(page.locator('img').all()):
                el.screenshot(path=str(p/f'astro-imagen-{i+1}-{w}-{mode}.png'))
            faq=page.locator('.faq-section summary').first
            faq.focus();page.keyboard.press('Enter')
            assert page.locator('.faq-section details[open]').count()==1
            page.keyboard.press('Enter')
            assert page.locator('.faq-section details[open]').count()==0
            images=page.locator('img').evaluate_all('(els)=>els.map(el=>({src:el.currentSrc,width:el.naturalWidth,complete:el.complete}))')
            results.append({'selected_images':images,'width':w,'mode':mode,'tables':sizes,'images_decoded':3,'faq_closed':7,'keyboard':True,'overflow':False,'scope':'compilación Astro local'})
            page.close()
    browser.close()
(p/'navegador-astro.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False,indent=2))
