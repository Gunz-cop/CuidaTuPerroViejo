"""Control del autor: cuenta texto útil, bruto y distribución; no emite auditoría."""
from pathlib import Path
import hashlib, json, re, statistics, sys
root=Path(__file__).resolve().parents[3]
p=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).with_name('borrador-articulo.mdx')
s=p.read_text()
body=s.split('---',2)[2]
body=re.sub(r'^import .*\n','',body,flags=re.M)
biblio=r'<AlertBox type="info" title="Fuentes científicas y de autoridad">.*?</AlertBox>'
editorial=re.sub(biblio,'',body,flags=re.S)
def visible(t):
    faqs=re.findall(r"(?:question|answer): '([^']*)'",t)
    t=re.sub(r'<FAQ items=\{\[.*?\]\} />','',t,flags=re.S)
    t+='\n'+'\n'.join(faqs)
    t=re.sub(r'\[([^]]+)\]\([^)]*\)',r'\1',t)
    t=re.sub(r'<[^>]*>',' ',t)
    t=re.sub(r'(?m)^#{1,6}\s+','',t)
    t=t.replace('**','').replace('`','')
    return t
blocks=re.split(r'(?m)^## ',editorial)
targets=[200,650,450,900,800,650,800,600,400,550]
rows=[]
for i,b in enumerate(blocks):
    name=b.splitlines()[0] if i else 'Introducción'
    n=len(visible(b).split())
    target=targets[i]
    rows.append({'seccion':name,'util':n,'target':target,'desviacion_pct':round((n/target-1)*100,1)})
paras=[]
for b in editorial.split('\n\n'):
    if b.startswith(('#','<','import','-')):continue
    n=len(visible(b).split())
    if n>5:paras.append(n)
h3=[]
for b in re.split(r'(?m)^### ',editorial)[1:]:
    b=re.split(r'(?m)^## ',b)[0]
    h3.append({'titulo':b.splitlines()[0],'palabras':len(visible(b).split())})
r={'documento':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'metodo':'Texto visible del MDX: excluye frontmatter/imports, bibliografía y sintaxis; conserva anclas de enlaces, encabezados, listas, captions y FAQ. Componentes externos no se suman. Bruto=split sobre cuerpo sin frontmatter/imports.','util_total':sum(x['util'] for x in rows),'bruto_cuerpo':len(body.split()),'secciones':rows,'densidad':{'parrafos_medidos':len(paras),'media':round(statistics.mean(paras),1),'mediana':statistics.median(paras),'porcentaje_mayor_50':round(sum(x>50 for x in paras)*100/len(paras),1),'maximo':max(paras)},'h3':h3,'bloques_fuera_rango':[x for x in rows if abs(x['desviacion_pct'])>15],'h3_superior_200':[x for x in h3 if x['palabras']>200]}
print(json.dumps(r,ensure_ascii=False,indent=2))
