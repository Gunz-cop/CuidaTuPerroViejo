"""Revalidación focal tras appendChild y tipografía de impresión 10 pt.
No repite controles de secuencia o cobertura clínica ya comprobados.
"""
from pathlib import Path
import json, subprocess
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
CAPTURES=ROOT/'capturas-creacion'
URL='http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes'
RESULT={'fecha_prueba':'2026-10-20','alcance':'Prueba propia focal sobre el build final de appendChild y CSS de impresión a 10 pt.','casos':[],'errores_js':[]}

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for mode in ['normal','maximo']:
        page=browser.new_page(viewport={'width':1366,'height':900})
        page.on('pageerror',lambda err:RESULT['errores_js'].append(str(err)))
        response=page.goto(URL,wait_until='networkidle');assert response.status==200
        record=page.locator('[data-feeding-visual="registro"]')
        values=[]
        for i,inp in enumerate(record.locator('input').all()):
            value=(('Observación de ejemplo, sin datos clínicos reales. '*4)[:160] if mode=='maximo' else ['19/10/2026 08:00','Alimento completo habitual','','','','','',''][i])
            inp.fill(value);values.append(value)
        notes=(('Anotación de ejemplo para comprobar espacio disponible; no es una observación real. '*5)[:350] if mode=='maximo' else 'Ejemplo de registro: anotar lo observado sin diagnosticar.')
        record.locator('textarea').fill(notes);values.append(notes)
        # Primero invocación real, eventos de navegador y limpieza.
        page.evaluate("window.__beforePrinted=false;window.addEventListener('beforeprint',()=>window.__beforePrinted=!!document.querySelector('.asv-print-copy'),{once:true})")
        record.locator('.asv-print').click();assert page.evaluate('window.__beforePrinted')
        assert page.locator('.asv-print-copy').count()==0
        # Segunda invocación retenida para exportar su estado final con page.pdf.
        page.evaluate("window.print=()=>{window.__called=true}")
        record.locator('.asv-print').click();assert page.evaluate('window.__called')
        assert page.locator('.asv-print-copy').count()==1
        copy_values=page.locator('.asv-print-copy .asv-printed-value').all_text_contents()
        assert all(a==(b or '________________________________') for a,b in zip(copy_values,values))
        page.emulate_media(media='print')
        font=page.locator('.asv-print-copy .asv-printed-value').first.evaluate('el=>getComputedStyle(el).fontSize')
        assert abs(float(font.replace('px',''))-13.3333)<.01,font
        pdf=CAPTURES/('registro-relleno.pdf' if mode=='normal' else 'registro-maximo.pdf')
        page.pdf(path=str(pdf),format='A4',print_background=True)
        info=subprocess.check_output(['pdfinfo',str(pdf)],text=True)
        pages=int(next(line.split(':',1)[1] for line in info.splitlines() if line.startswith('Pages:')))
        assert pages==1,(mode,pages)
        extracted=subprocess.check_output(['pdftotext',str(pdf),'-'],text=True)
        assert 'No esperes a completar el registro si empeora.' in extracted
        assert 'Ejemplo de registro:' in extracted if mode=='normal' else 'Anotación de ejemplo' in extracted
        RESULT['casos'].append({'tipo':mode,'pdf':pdf.name,'paginas_A4':pages,'valores_exactos_preservados':True,'font_px':font,'font_pt':10,'beforeprint_real':True,'afterprint_limpia':True,'campos_maxlength':{'inputs':160,'notas':350}})
        page.evaluate("dispatchEvent(new Event('afterprint'))");assert page.locator('.asv-print-copy').count()==0
        page.close()
    browser.close()
assert not RESULT['errores_js']
(ROOT/'impresion-final.json').write_text(json.dumps(RESULT,ensure_ascii=False,indent=2))
print(json.dumps(RESULT,ensure_ascii=False,indent=2))
