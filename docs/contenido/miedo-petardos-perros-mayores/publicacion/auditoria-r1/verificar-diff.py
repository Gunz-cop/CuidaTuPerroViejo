#!/usr/bin/env python3
"""Auditoría independiente R1: solo lectura de Git/producción; escribe evidencia propia."""
from pathlib import Path
import subprocess, hashlib, json, difflib, re, struct

ROOT = Path(__file__).resolve().parents[5]
OUT = Path(__file__).resolve().parent
SLUG = 'miedo-petardos-perros-mayores'
DOC = f'docs/contenido/{SLUG}'
BASE = 'b79ee0b2e77269426d63381111dc405b933137e5'
CODE = '625ef8a75b6a21d17848b65a36cd699b4c337661'
HEAD = 'de55e25ac17f196bb1b771b46fc86b888c1f15ae'
SOURCE = '717ee60'
MDX = f'src/content/blog/{SLUG}.mdx'

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)
def blob(ref, path):
    return git('show', f'{ref}:{path}')
def digest(data):
    return hashlib.sha256(data).hexdigest()
def save(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
def names(a, b):
    return git('diff', '--name-only', a, b).decode().splitlines()

assert git('rev-parse', 'HEAD').decode().strip() == HEAD
allowed_code = ['src/components/article/TablaApilable.astro', 'src/content.config.ts', 'src/pages/[pilar]/[slug].astro']
code_names = names(BASE, CODE)
article_names = names(CODE, HEAD)
assert code_names == allowed_code
assert not set(allowed_code).intersection(article_names)
save('git-alcance.json', {
    'fecha': '2026-10-26', 'ronda': 'publicación R1', 'base': BASE, 'codigo': CODE, 'head': HEAD,
    'fuente_resuelta': git('rev-parse', SOURCE).decode().strip(),
    'branch': git('branch', '--show-current').decode().strip(),
    'git_status_inicial': git('status', '--short').decode(),
    'codigo_archivos': code_names, 'editorial_archivos': article_names,
    'tres_archivos_codigo_excluidos_diff_editorial': True,
    'otros_cuerpos_mdx_editados': [p for p in article_names if p.startswith('src/content/blog/') and p != MDX],
})
(OUT/'codigo.diff').write_bytes(git('diff', BASE, CODE))
(OUT/'documentacion-enlazado.diff').write_bytes(git('diff', CODE, HEAD, '--', 'INVENTARIO_CONTENIDO.md', 'TODO.md', 'docs/seo/enlazado-interno.md', 'src/data/internal-links.ts'))

original = blob(SOURCE, f'{DOC}/articulo-borrador.mdx')
current = blob(HEAD, MDX)
manifest = json.loads((ROOT/f'{DOC}/publicacion/ajuste-bibliografia.json').read_text())
before = manifest['linea_antes'].encode()
after = manifest['linea_despues'].encode()
assert original.count(before) == current.count(after) == 1
assert current == original.replace(before, after)
assert digest(original) == manifest['sha256_antes']
assert digest(current) == manifest['sha256_despues']
assert (ROOT/MDX).read_bytes() == current
delta = ''.join(difflib.unified_diff(original.decode().splitlines(True), current.decode().splitlines(True), fromfile=f'{SOURCE}:{DOC}/articulo-borrador.mdx', tofile=f'{HEAD}:{MDX}'))
(OUT/'mdx-unico-cambio.diff').write_text(delta)
save('integridad-mdx.json', {
    'origen_sha256': digest(original), 'actual_sha256': digest(current),
    'bytes_origen':len(original), 'bytes_actual':len(current),
    'linea_s10_actual': current.decode().splitlines().index(after.decode())+1,
    'sustitucion_unica_exacta': True,
    'identico_al_sustituir_solo_entrada_s10': True,
    'frontmatter_identico':original.split(b'---',2)[1] == current.split(b'---',2)[1],
    'cuerpo_antes_bibliografia_identico': original.split(b'<div data-editorial-bibliography')[0] == current.split(b'<div data-editorial-bibliography')[0],
    'cifras_faq_testimonios_cuerpo_identicos': True,
    'linea_antes':before.decode(),'linea_despues':after.decode(),
    'manifest_contrastado_con_blobs_git':True,
})

source_paths = git('ls-tree','-r','--name-only',SOURCE,'--', DOC, f'public/images/blog/{SLUG}', f'briefings/briefing-{SLUG}.md').decode().splitlines()
retained, excluded, changed, moved = [], [], [], []
for p in source_paths:
    old = blob(SOURCE,p)
    if p == f'{DOC}/articulo-borrador.mdx':
        moved.append({'origen':p,'destino':MDX,'sha256':digest(old),'unico_cambio_s10':True})
        continue
    target = ROOT/p
    record = {'ruta':p,'bytes_fuente':len(old),'sha256_fuente':digest(old)}
    if not target.exists():
        excluded.append(record)
    elif target.read_bytes()==old:
        retained.append(record)
    else:
        record['sha256_actual']=digest(target.read_bytes())
        changed.append(record)
        (OUT/(Path(p).name+'.diff')).write_text(''.join(difflib.unified_diff(old.decode().splitlines(True),target.read_text().splitlines(True),fromfile=SOURCE+':'+p,tofile=HEAD+':'+p)))
protected = lambda p: ('auditoria' in p and Path(p).suffix in ('.md','.json')) or p.endswith('testimonios-propietario.md') or p.startswith('briefings/')
assert not any(protected(x['ruta']) for x in changed+excluded)
assert len(excluded)==226 and sum(x['bytes_fuente'] for x in excluded)==82281449
policy=json.loads((ROOT/f'{DOC}/publicacion/politica-archivos.json').read_text())
policy_records={x['ruta']:x for x in policy['archivos']}
policy_mismatch=[]
for record in excluded:
    entry=policy_records.get(record['ruta'])
    if not entry or entry.get('sha256')!=record['sha256_fuente'] or entry.get('bytes')!=record['bytes_fuente']:
        policy_mismatch.append(record['ruta'])
assert not policy_mismatch
save('conservacion-historica.json',{
    'metodo':'Comparar cada blob fuente con archivo real actual; manifiesto contrastado después.',
    'conservados_identicos':retained,'modificados_documentales':changed,'traslado':moved,
    'excluidos':excluded,'excluidos_cantidad':len(excluded),'excluidos_bytes':sum(x['bytes_fuente'] for x in excluded),
    'manifiesto_excluidos_mismatches':policy_mismatch,
    'brief_testimonios_auditorias_y_json_historicos_integrales':True,
})
active=[]
for p in sorted((ROOT/f'public/images/blog/{SLUG}').glob('*')):
    data=p.read_bytes(); rel=str(p.relative_to(ROOT))
    active.append({'ruta':rel,'bytes':len(data),'sha256':digest(data),'identica_fuente_717ee60':data==blob(SOURCE,rel),'menor_250000':len(data)<250000})
pngs=[]
for p in sorted((ROOT/DOC).rglob('*.png')):
    data=p.read_bytes(); rel=str(p.relative_to(ROOT))
    pngs.append({'ruta':rel,'bytes':len(data),'sha256':digest(data),'dimensiones_png':list(struct.unpack('>II',data[16:24])),'identica_fuente_717ee60':data==blob(SOURCE,rel)})
assert len(active)==4 and all(x['identica_fuente_717ee60'] and x['menor_250000'] for x in active)
assert len(pngs)==3 and all(x['identica_fuente_717ee60'] for x in pngs)
save('binarios.json',{'webp_activos':active,'png_originales_retenidos':pngs,'png_bytes_total':sum(x['bytes'] for x in pngs),'nueva_inspeccion_anatomica':False})
print(json.dumps({'codigo_archivos':len(code_names),'editorial_archivos':len(article_names),'s10_sustitucion_exacta':True,'historicos_identicos':len(retained),'historicos_documentales_modificados':[x['ruta'] for x in changed],'excluidos':len(excluded),'bytes_excluidos':sum(x['bytes_fuente'] for x in excluded),'webp_activos':len(active),'png_retenidos':len(pngs)},ensure_ascii=False,indent=2))
