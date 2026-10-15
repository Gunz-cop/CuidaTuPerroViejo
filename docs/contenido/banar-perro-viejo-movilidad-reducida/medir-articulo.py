from pathlib import Path
import re,json,statistics
p=Path('src/content/blog/banar-perro-viejo-movilidad-reducida.mdx')
s=p.read_text().split('---',2)[2]
s=re.sub(r'^import .*\n','',s,flags=re.M)
def visible(t):
 faq=re.search(r'<FAQ.*?items=\{\[(.*?)\]\} />',t,re.S)
 if faq:
  values=re.findall(r"(?:question|answer): '((?:[^'\\]|\\.)*)'",faq[1])
  t=t[:faq.start()]+'\n\n'+'\n\n'.join(values)+t[faq.end():]
 t=re.sub(r'<img\b[^>]*>','',t)
 t=re.sub(r'<Bano\w+[^>]*\/>','',t)
 t=re.sub(r'<[^>]*>','',t)
 t=re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',t)
 t=re.sub(r'^#{1,6}\s*','',t,flags=re.M)
 return t.replace('*','').replace('`','')
parts=re.split(r'(?=^## )',s,flags=re.M);rows=[]
for part,target in zip(parts,[800,1000,1100,1200,800,700,700]):
 txt=visible(part);n=len(txt.split());rows.append({'section':part.strip().splitlines()[0] if part.strip().startswith('##') else 'Introducción','words':n,'target':target,'deviation':round((n/target-1)*100,1),'pass':.85*target<=n<=1.15*target})
body=visible(s)
# Densidad de prosa: excluye títulos, pies, byline, listas y componentes.
pars=[p for p in s.split('\n\n') if p.strip() and not p.lstrip().startswith(('import','#','<','*','-','}',']','{'))]
counts=[len(re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',p).split()) for p in pars]
r={'rows':rows,'total_visible':sum(r['words'] for r in rows),'raw_words':len(s.split()),'density':{'mean':round(statistics.mean(counts),1),'median':statistics.median(counts),'over50_percent':round(100*sum(n>50 for n in counts)/len(counts),1)},'faq':len(re.findall(r"question: '",s)),'animations':len(re.findall(r'<BanoAnimation ',s)),'infographics':len(re.findall(r'<BanoInfographic ',s))}
Path('docs/contenido/banar-perro-viejo-movilidad-reducida/metricas.json').write_text(json.dumps(r,ensure_ascii=False,indent=2));print(json.dumps(r,ensure_ascii=False,indent=2))
