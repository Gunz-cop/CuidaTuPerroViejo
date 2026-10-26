#!/usr/bin/env python3
"""Inspección propia de fuentes y reanálisis de artefactos de builds previos."""
from pathlib import Path
import json, re, subprocess, hashlib
ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
DOC=ROOT/'docs/contenido/miedo-petardos-perros-mayores'
SLUG='miedo-petardos-perros-mayores'
def save(name, data):
    (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def sha(data):return hashlib.sha256(data).hexdigest()
base=Path('/tmp/petardos-publicacion/base/html-todos')
after=Path('/workspace/petardos-codigo/dist/client')
report=json.loads((DOC/'publicacion/codigo/comparacion-html.json').read_text())
results=[]
for entry in report['resultados']:
    p=entry['ruta']; a=(base/p).read_bytes(); b=(after/p).read_bytes()
    d={'ruta':p,'base_sha256':sha(a),'codigo_sha256':sha(b),'identico':a==b,'hashes_coinciden_con_reporte':sha(a)==entry['antes_sha256'] and sha(b)==entry['despues_sha256']}
    if a!=b:
        # Los seis componentes preexistentes usan crypto.randomUUID().slice(0,8).
        # Solo se sustituyen sus prefijos de ID conocidos, conservando el prefijo.
        uuid=r'((?:feeding-v2|golpe-calor|halitosis)-[a-z0-9-]+?-|leish-(?:calendario|revision)-|dental-)[0-9a-f]{8}(?=[-"#])'
        d['identico_sustituyendo_solo_uuid']=re.sub(uuid,r'\1UUID8',a.decode())==re.sub(uuid,r'\1UUID8',b.decode())
        if p=='contacto.html':
            started=r'(name="startedAt" value=")\d+'
            d['identico_sustituyendo_solo_startedAt']=re.sub(started,r'\1STARTED',a.decode())==re.sub(started,r'\1STARTED',b.decode())
    results.append(d)
assert all(x['hashes_coinciden_con_reporte'] for x in results)
assert sum(x.get('identico_sustituyendo_solo_uuid',False)for x in results)==5
assert all(x['identico']or x.get('identico_sustituyendo_solo_uuid')or x.get('identico_sustituyendo_solo_startedAt') for x in results)
save('comparacion-artefactos-previos.json',{'metodo':'Comparación propia sobre HTML de builds previos del productor; no nuevos builds independientes. Hashes contrastados contra registro previo. Normalización limitada a UUID o startedAt cuando se indica.','resultados':results,'html_total':len(results),'identicos':sum(x['identico']for x in results)})
mdx=(ROOT/f'src/content/blog/{SLUG}.mdx').read_text()
links=sorted(set(re.findall(r'\]\((/[^)#]+)\)',mdx))); destinations=[]
for href in links:
    slug=href.split('/')[-1]
    source=ROOT/'src/content/blog'/(slug+'.mdx') if href.count('/')>1 else ROOT/'src/content/pilares'/(slug+'.mdx')
    pilar=re.search(r'^pilar:\s*"([^"]+)"',source.read_text(),re.M)
    match=pilar.group(1)==href.split('/')[1] if href.count('/')>1 else True
    destinations.append({'href':href,'fuente':str(source.relative_to(ROOT)),'pilar_coincide':match,'html_existe':(ROOT/'dist/client'/(href.lstrip('/')+'.html')).is_file()})
assert len(destinations)==10 and all(x['pilar_coincide']and x['html_existe']for x in destinations)
route='/salud-mental-emocional-perros/'+SLUG
pages=['salud-mental-emocional-perros.html','salud-mental-emocional-perros/ansiedad-separacion-perros-senior.html','salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor.html']
inbound=[{'html':p,'enlace_presente':f'href="{route}"'in(ROOT/'dist/client'/p).read_text()}for p in pages]
assert all(x['enlace_presente']for x in inbound)
projection=(ROOT/f'dist/client/agent-content/v1/documents/article--{SLUG}.md').read_text()
assert 'https://colegioveterinariosmalaga.es/2026/06/' in projection and '<style' not in projection
assert route in (ROOT/'dist/client/sitemap-0.xml').read_text()
save('enlazado-descubrimiento.json',{'metodo':'Resolución propia contra fuentes y HTML del build previo local; no certifica HTTP público','destinos_cuerpo':destinations,'entradas_automaticas':inbound,'sitemap_presente':True,'proyeccion_articulo_presente':True,'proyeccion_s10_nuevo_presente':True,'proyeccion_sin_style':True})
component='src/components/article/TablaApilable.astro'
old=subprocess.check_output(['git','show',f'b79ee0b:{component}'],cwd=ROOT).decode()
new=(ROOT/component).read_text()
styles=lambda s: re.sub(r'\s+','',re.search(r'<style is:global>(.*?)</style>',s,re.S).group(1))
assert styles(old)==styles(new)
save('css-base.json',{'componente':component,'css_global_anterior_identico_salvo_espacios':True,'compacta_por_defecto':False,'css_compacto_condicional':True,'media_query':'max-width:640px','selector_requiere':['.content-body','.tabla-apilable','[data-compacta]'],'revision_de_selectores':'Solo descendientes del wrapper marcado; td:first-child conserva el texto de la primera celda y oculta el rótulo repetido; td[data-label-corto] cambia solo el pseudorrótulo. No nueva JS ni CSS global distinto.'})
print(json.dumps({'html_previos':len(results),'identicos':sum(x['identico']for x in results),'destinos_cuerpo':len(destinations),'entradas':len(inbound),'css_base_identico':True}))
