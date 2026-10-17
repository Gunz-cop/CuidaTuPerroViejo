from pathlib import Path
import hashlib,json,re,statistics,subprocess
OUT=Path(__file__).parent
base=json.loads((OUT/'baseline.json').read_text())
rows=[];tables=[]
for old in base:
 slug=old['slug'];p=Path('src/content/blog')/(slug+'.mdx');s=p.read_text()
 previous=subprocess.check_output(['git','show',f'1a8489a:{p}'],text=True)
 def body(t): return '\n'.join(l for l in t.split('---',2)[-1].splitlines() if not l.startswith('import ')).strip()
 before=body(previous);after=body(s)
 words=lambda t:len(t.split())
 curr=set(re.findall(r'\]\((/[^)]+)\)',s));imgs=re.findall(r'(?:src=|heroImage: )"([^"]+)"',s)
 components=re.findall(r'<(BanoAnimation|BanoInfographic|OjosOidosVisual|HigromaAnimation) variant="([^"]+)"',s)
 missinglinks=sorted(set(old['internalLinks'])-curr);missingimgs=sorted(set(old['images'])-set(imgs))
 assert not missinglinks,(slug,missinglinks)
 assert not missingimgs,(slug,missingimgs)
 for path in curr:
  if path.startswith('/images/'):assert Path('public'+path).is_file(),path
  elif path.startswith('/herramientas/'):assert Path('src/pages'+path+'.astro').is_file(),path
  elif path.count('/')==1:assert Path('src/content/pilares/'+path.strip('/')+'.mdx').is_file(),path
  else:assert Path('src/content/blog/'+path.rsplit('/',1)[-1]+'.mdx').is_file(),path
 for im in imgs:assert Path('public'+im).is_file(),im
 sections=[]
 for part in re.split(r'(?m)^## ',after):
  if not part.strip():continue
  name,_,text=part.partition('\n')
  if part==re.split(r'(?m)^## ',after)[0]:name='Introducción';text=part
  sections.append({'h2':name,'words':words(text),'target':'Sin cuota: adenda autorizada','deviation':'No aplica'})
 # Plain prose paragraphs only; excludes tables, imports, markup, lists, pictures and FAQ JSX.
 paras=[]
 for block in re.split(r'\n\s*\n',after):
  if block.startswith(('#','<','![','*','|','-','1.')) or '\n  {' in block:continue
  if '\n' in block and re.match(r'\d+\.',block):continue
  n=words(block)
  if n>5:paras.append(n)
 row={'slug':slug,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'method':'Palabras fuente MDX por espacios, cuerpo sin frontmatter/imports. Incluye texto FAQ y atributos; no incluye texto de componentes. No es contador de palabras visibles HTML. Misma operación antes/después.','before':words(before),'after':words(after),'reductionPercent':round((1-words(after)/words(before))*100,1),'sections':sections,'paragraphDensity':{'method':'Bloques de prosa separados por línea en blanco; excluye listas, tablas, JSX, imágenes y títulos.','mean':round(statistics.mean(paras),1),'median':statistics.median(paras),'over50Percent':round(sum(n>50 for n in paras)*100/len(paras),1)},'internalLinks':sorted(curr),'missingInternalLinks':missinglinks,'images':imgs,'missingImages':missingimgs,'components':components,'removedComponents':[c for c in old['components'] if tuple(c) not in components],'sources':sorted(set(re.findall(r'\]\((https?://[^)]+)\)',s))),'removedSources':sorted(set(old['sources'])-set(re.findall(r'\]\((https?://[^)]+)\)',s)))}
 rows.append(row)
 tables.extend([f'## {slug}',f"\nFuente MDX: {row['before']} → {row['after']} palabras ({row['reductionPercent']}% menos). Sin texto de componentes.\n",'| H2 | Palabras reales | Target | Desviación |','|---|---:|---|---|']+[f"| {x['h2']} | {x['words']} | {x['target']} | {x['deviation']} |" for x in sections]+['',f"Densidad de prosa: {row['paragraphDensity']}\n"])
(OUT/'inventario-final.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
(OUT.parent/'metricas.md').write_text('# Métricas de edición\n\nNo se usan como umbral de aprobación clínica ni requisito AdSense.\n\n'+'\n'.join(tables))
print(json.dumps([{k:r[k] for k in ['slug','before','after','reductionPercent','missingInternalLinks','missingImages','removedComponents']} for r in rows],ensure_ascii=False,indent=2))
