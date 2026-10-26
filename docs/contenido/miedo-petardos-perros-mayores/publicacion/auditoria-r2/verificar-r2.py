#!/usr/bin/env python3
"""Comprobación R2 propia: cuatro líneas, hashes y recuentos afectados. Solo escribe evidencia."""
from pathlib import Path
import subprocess, hashlib, json, difflib, runpy, contextlib, io, re

ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
DOC='docs/contenido/miedo-petardos-perros-mayores'
MDX='src/content/blog/miedo-petardos-perros-mayores.mdx'
BASE='1d1c389e0f39257bfc52b46fcb7ae3beefa32095'
HEAD='e35073e204e6d3f46b74db498fb747724981f512'
def git(*args):return subprocess.check_output(['git',*args],cwd=ROOT)
def blob(ref,p):return git('show',f'{ref}:{p}')
def sha(data):return hashlib.sha256(data).hexdigest()
def save(p,data):(OUT/p).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
assert git('rev-parse','HEAD').decode().strip()==HEAD
old=blob(BASE,MDX); new=blob(HEAD,MDX)
assert new==(ROOT/MDX).read_bytes()
a=old.decode().splitlines();b=new.decode().splitlines()
assert len(a)==len(b)
changes=[{'linea':i+1,'antes':x,'despues':y}for i,(x,y)in enumerate(zip(a,b))if x!=y]
assert [x['linea']for x in changes]==[52,82,99,488]
manifest=json.loads((ROOT/f'{DOC}/publicacion/corroboracion-s2-s7.json').read_text())
assert sha(old)==manifest['cambio_mdx']['sha256_anterior']
assert sha(new)==manifest['cambio_mdx']['sha256_actual']
assert [x['linea']for x in changes]==manifest['cambio_mdx']['lineas_cambiadas']
all_changes=git('diff','--name-only',BASE,HEAD).decode().splitlines()
production=[x for x in all_changes if x.startswith(('src/','public/'))]
assert production==[MDX]
protected_paths=['briefings',f'{DOC}/testimonios-propietario.md',f'{DOC}/auditoria-publicacion-r1.md',f'{DOC}/publicacion/auditoria-r1',f'{DOC}/visuales']
assert not git('diff','--name-only',BASE,HEAD,'--',*protected_paths).strip()
products=json.loads((ROOT/f'{DOC}/publicacion/producto-verificado.json').read_text())
hashes=[]
for p,expected in products['hashes'].items():
    actual=(ROOT/p).read_bytes()
    assert sha(actual)==expected and actual==blob(HEAD,p)
    unchanged=actual==blob(BASE,p)
    assert unchanged or p==MDX
    hashes.append({'ruta':p,'sha256':sha(actual),'bytes':len(actual),'igual_base_r1':unchanged})
assert len(list((ROOT/'public/images/blog/miedo-petardos-perros-mayores').glob('*.webp')))==4
assert len(list((ROOT/DOC).rglob('*.png')))==3
save('integridad-diff.json',{'fecha':'2026-10-26','ronda':'publicación R2 de un máximo de tres','base':BASE,'head':HEAD,'mdx_sha256_anterior':sha(old),'mdx_sha256_actual':sha(new),'lineas':changes,'resto_mdx_exacto':True,'archivos_diff':all_changes,'produccion_diff':production,'protegidos_sin_cambios':protected_paths,'manifiesto_contrastado':True,'hashes_actuales':hashes,'webp_activos':4,'png_retenidos':3})
(OUT/'mdx-diff.md').write_text('# Diff MDX contrastado por el auditor\n\n```diff\n'+''.join(difflib.unified_diff(old.decode().splitlines(True),new.decode().splitlines(True),fromfile=BASE+':'+MDX,tofile=HEAD+':'+MDX))+'```\n')
stream=io.StringIO()
with contextlib.redirect_stdout(stream):ns=runpy.run_path(str(ROOT/f'{DOC}/comprobaciones/recuento.py'))
count=ns['count'];s=ns['s']
assert count(s)==5659
targets={'El miedo al ruido es frecuente, pero con la edad los datos no son uniformes':220,'No confundir con la ansiedad por separación':80,'Qué midió el análisis de vídeo':170}
h3=[]
for part in re.split(r'(?=^### )',s,flags=re.M)[1:]:
    name=part.splitlines()[0].removeprefix('### ')
    if name in targets:
        # Evita incluir el H2 siguiente en el último H3 de la sección.
        section=re.split(r'^## ',part,flags=re.M)[0]
        n=count(re.sub(r'<AlertBox.*?</AlertBox>','',section,flags=re.S));t=targets[name]
        h3.append({'h3':name,'palabras':n,'target':t,'desviacion_pct':100*(n-t)/t,'cumple_margen_10pct':abs(n-t)<=t*.1})
assert len(h3)==3 and all(x['cumple_margen_10pct']for x in h3)
prior_count=count(old.decode().split('---',2)[2])
assert prior_count==5653
save('recuento-propio.json',{'metodo':'Ejecución propia del script contractual original y sus funciones sobre los tres H3 modificados; títulos incluidos, bibliografía excluida. Targets contrastados con brief líneas239/248/256.','total_base_r1':prior_count,'total_actual':count(s),'incremento':count(s)-prior_count,'rango_contractual':[5300,6000],'h3_afectados':h3,'h2_afectados':[x for x in ns['rows']if x[0].startswith(('## Por qué','## Cómo se ve'))]})
projection=ROOT/'dist/client/agent-content/v1/documents/article--miedo-petardos-perros-mayores.md'
ptext=projection.read_text()
fragments=['en el conjunto de participantes','aunque no solían presentarse junto con conductas relacionadas con la separación','podían reconocer señales sin identificarlas como miedo','https://www.scribd.com/document/851031407/1-s2-0-S016815911200367X-main']
assert all(x in ptext for x in fragments)
disc=json.loads((ROOT/f'{DOC}/publicacion/descubrimiento-local.json').read_text())
assert sha(projection.read_bytes())==disc['sha256_markdown']
assert len(projection.read_bytes())==disc['bytes_markdown']
save('proyeccion-local.json',{'metodo':'Inspección propia del artefacto del build previo del productor; no nuevo build ni guarda de37documentos repetida.','ruta':str(projection.relative_to(ROOT)),'bytes':len(projection.read_bytes()),'sha256':sha(projection.read_bytes()),'cuatro_fragmentos_nuevos_presentes':True,'manifiesto_actual_coincide':True})
print(json.dumps({'cuatro_lineas_exactas':True,'hashes_contrastados':len(hashes),'total':count(s),'h3':h3,'proyeccion_actual':True},ensure_ascii=False,indent=2))
