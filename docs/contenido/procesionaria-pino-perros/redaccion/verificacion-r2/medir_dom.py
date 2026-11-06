import json,re,sys,hashlib,statistics
from pathlib import Path
from lxml import html
p=Path(sys.argv[1]); root=html.fromstring(p.read_text())
body=root.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," content-body ")]')[0]
removed=[]
for el in list(body.xpath('.//*[@data-editorial-bibliography] | .//script | .//style | .//figcaption')):
 removed.append(el.tag); el.drop_tree()
for el in list(body.xpath('.//p[img]')):
 nxt=el.getnext()
 if nxt is not None and nxt.tag=='p' and len(nxt)==1 and nxt[0].tag=='em': nxt.drop_tree()
 el.drop_tree()
def text(el):
 return ' '.join(' '.join(el.itertext()).split())
def count(t): return len(t.split())
targets=[150,800,1100,900,1000,1100,100,600]
sections=[]; name='Introducción'; chunks=[]
for child in body:
 if child.tag=='h2' or (child.tag=='section' and 'faq-section' in child.get('class','')):
  if chunks: sections.append({'section':name,'words':sum(count(text(x)) for x in chunks)})
  name=text(child) if child.tag=='h2' else 'Preguntas frecuentes'
  chunks=[child]
 else: chunks.append(child)
if chunks: sections.append({'section':name,'words':sum(count(text(x)) for x in chunks)})
for s,t in zip(sections,targets):
 s['target']=t;s['deviation_pct']=round(100*(s['words']-t)/t,2)
paras=[count(text(el)) for el in body.xpath('.//p') if text(el)]
headings=[{'tag':e.tag,'text':text(e),'id':e.get('id')} for e in body.xpath('.//h2 | .//h3')]
links=[{'text':text(e),'href':e.get('href')} for e in body.xpath('.//a')]
result={'method':'DOM Astro .content-body; text_content includes FAQ answers even when collapsed. Excludes bibliography, script/style, images/alt and figure captions. Headings, lists, AlertBox titles and FAQ heading included. Whitespace word tokens.','html_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'sections':sections,'total_words':sum(s['words'] for s in sections),'range':[5500,6000],'paragraphs':{'n':len(paras),'mean':round(statistics.mean(paras),2),'median':statistics.median(paras),'max':max(paras),'over50_pct':round(100*sum(x>50 for x in paras)/len(paras),2)},'headings':headings,'links':links,'faq_count':len(body.xpath('.//section[contains(@class,"faq-section")]//details')),'faq_open_count':len(body.xpath('.//section[contains(@class,"faq-section")]//details[@open]'))}
print(json.dumps(result,ensure_ascii=False,indent=2))
