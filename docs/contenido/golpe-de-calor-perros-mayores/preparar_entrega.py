"""Vista de lectura aislada y comprobaciones; no sustituye al build de Astro."""
from pathlib import Path
import base64, html, json, re, statistics, unicodedata
import yaml

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
s = (HERE / 'articulo.mdx').read_text()
fm = yaml.safe_load(s.split('---', 2)[1])
body = re.sub(r'^import .*\n', '', s.split('---', 2)[2], flags=re.M)
editorial = body.split('<div data-editorial-bibliography>')[0]
sections = re.split(r'^## ', editorial, flags=re.M)
targets = [250,700,700,850,500,850,550]
counts = []
for i, (section,target) in enumerate(zip(sections, targets)):
    n = len(section.split())
    assert .85*target <= n <= 1.15*target, (i,n,target)
    counts.append({'seccion':'Introducción' if i==0 else section.splitlines()[0], 'palabras':n, 'target':target,'desviacion':round(100*(n/target-1),1)})
faq = re.findall(r"question: '([^']*)', answer: '([^']*)'", body)
assert len(faq)==7
assert all(40 <= len(a.split()) <= 60 for q,a in faq)
assert [body.count('type="'+t+'"') for t in ['info','danger','warning']]==[1,1,1]
assert len(fm['seoTitle'])<=55 and len(fm['metaDescription'])<=160
assert not re.search(r'(?m)^# ',body)
paras=[len(l.split()) for l in editorial.splitlines() if len(l.split())>5 and not re.match(r'^(import |#|!\[|\*|<| |-|\])',l)]
report={'metodo':'split() del cuerpo MDX sin frontmatter, imports ni bibliografía; incluye marcas y props, como wc -w. No equivale a palabras de prosa visible.', 'total':len(editorial.split()), 'secciones':counts,'faq_palabras':[len(a.split()) for q,a in faq], 'densidad':{'media':round(statistics.mean(paras),1),'mediana':statistics.median(paras),'porcentaje_mayores_50':round(sum(n>50 for n in paras)*100/len(paras),1)}}
(HERE/'verificacion.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))

def slug(t):
    t=unicodedata.normalize('NFD',t)
    return re.sub(r'[^\w-]','',re.sub(r'\s+','-', t.lower())).strip('-')

def img(url,alt):
    p=ROOT/'public'/url.lstrip('/')
    with p.open('rb') as f: data=base64.b64encode(f.read()).decode()
    return '<img width="1200" height="800" src="data:image/webp;base64,'+data+'" alt="'+html.escape(alt,quote=True)+'">'

def inline(t):
    t=re.sub(r'!\[([^\]]*)\]\(([^)]+)\)',lambda m:img(m[2],m[1]),t)
    t=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',lambda m:'<a href="'+html.escape(('https://cuidatuperroviejo.com'+m[2]) if m[2].startswith('/') else m[2],quote=True)+'">'+m[1]+'</a>',t)
    t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t)
    return re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'<em>\1</em>',t)

def render(t):
    out=[]; inlist=False
    for line in t.splitlines():
        if not line.strip(): continue
        if not line.startswith('- ') and inlist: out.append('</ul>');inlist=False
        if line.startswith('- '):
            if not inlist: out.append('<ul>');inlist=True
            out.append('<li>'+inline(line[2:])+'</li>')
        elif line.startswith('##'):
            depth=len(line)-len(line.lstrip('#')); title=line[depth:].strip()
            out.append(f'<h{depth} id="{slug(title)}">{title}</h{depth}>')
        elif re.match(r'\s*<',line): out.append(line)
        else: out.append('<p>'+inline(line)+'</p>')
    if inlist: out.append('</ul>')
    return '\n'.join(out)

body=re.sub(r'<GolpeCalorRecursos\b[^>]*/>', '', body)
body=re.sub(r'<FAQ items=\{\[.*?\]\} />',lambda m:'<section class="faq"><h2>Preguntas frecuentes</h2>'+''.join('<details><summary>'+html.escape(q)+'</summary><p>'+html.escape(a)+'</p></details>' for q,a in faq)+'</section>',body,flags=re.S)
body=re.sub(r'<AlertBox type="(\w+)" title="([^"]+)">',r'<aside class="\1"><h3>\2</h3>',body).replace('</AlertBox>','</aside>')
body=re.sub(r'<TablaApilable label="([^"]+)">',r'<div class="tabla-apilable" role="region" aria-label="\1">',body).replace('</TablaApilable>','</div>')
css='''body{font:17px/1.65 system-ui,sans-serif;color:#272d29;background:#faf8f3;margin:0}main{max-width:740px;margin:auto;padding:24px}h1{font-size:clamp(28px,4vw,40px);line-height:1.18}h2{font-size:27px;line-height:1.3;margin-top:48px}h3{font-size:21px;line-height:1.35;margin-top:32px}img{display:block;width:100%;height:auto;border-radius:12px}a{color:#245b40;overflow-wrap:anywhere}aside{padding:18px;border:1px solid #8f998f;border-left:5px solid #245b40;border-radius:12px;margin:24px 0}aside h3{margin:0}.danger{border-left-color:#9a2020}.warning{border-left-color:#8b5800}table{border-collapse:collapse;width:100%;font-size:15px}th,td{padding:12px;text-align:left;border-bottom:1px solid #b4b9b0}details{border:1px solid #8f998f;border-radius:12px;margin:12px 0;padding:0 14px}summary{padding:14px 0;min-height:44px;box-sizing:border-box;cursor:pointer;font-weight:650}details:focus-within{outline:3px solid #447c59}.preview-note{font-size:14px;border-bottom:1px solid;padding-bottom:12px}body.dark{background:#17211d;color:#f2eee4}body.dark a{color:#a6d7b8}body.dark aside{background:#223027}body.dark th,body.dark td{border-color:#849388}@media print{details>*{display:block}details p{display:block!important}main{max-width:none}}'''
css+=(ROOT/'src/components/article/TablaApilable.astro').read_text().split('<style is:global>')[1].split('</style>')[0]
doc='<!doctype html><html lang="es-ES"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(fm['title'])+'</title><style>'+css+'</style><body><main><p class="preview-note">Vista de lectura aislada con imágenes integradas. Ilustraciones generadas con IA.</p><h1>'+html.escape(fm['title'])+'</h1>'+img(fm['heroImage'],fm['heroImageAlt'])+render(body)+'</main></body></html>'
(HERE/'vista-previa.html').write_text(doc)
# Versión Markdown legible: sin componentes del sitio ni expresiones JSX.
md=re.sub(r'<GolpeCalorRecursos\b[^>]*/>', '', editorial)
md=re.sub(r'<FAQ items=\{\[.*?\]\} />','\n'.join('### '+q+'\n\n'+a+'\n' for q,a in faq),md,flags=re.S)
md=re.sub(r'<AlertBox[^>]*title="([^"]+)"[^>]*>',r'**\1**',md).replace('</AlertBox>','')
md=re.sub(r'</?TablaApilable[^>]*>','',md)
(HERE/'articulo-lectura.md').write_text('# '+fm['title']+'\n\n'+md)
print(json.dumps(report,ensure_ascii=False,indent=2))
