from pathlib import Path
from html.parser import HTMLParser
import subprocess,json,hashlib,re,urllib.request
from collections import Counter
ROOT=Path.cwd();D=ROOT/'docs/seo/correccion-editorial-2026-10-16';E=D/'evidencias/auditor-anclas-r1';E.mkdir(exist_ok=True)
files=subprocess.check_output(['git','diff','--name-only','872517c'],text=True).splitlines();records=[]
pairs={'que-cambia':'Qué cambia en la alimentación de un perro senior','que-dar':'Qué debe comer un perro senior','racion':'Ración, peso y masa muscular: cómo ajustar sin adivinar','casera':'Comida casera para perros mayores: qué sí y qué no','apetito':'Apetito, horarios e hidratación','senales':'Cuándo consultar por un cambio en la comida','preguntas':'Preguntas frecuentes'}
for f in files:
 if not(f.startswith('src/pages/') or f=='src/content/pilares/alimentacion-perros-senior.mdx'):continue
 old=subprocess.check_output(['git','show','872517c:'+f]);new=Path(f).read_bytes();s=old.decode()
 if f.endswith('.astro'):
  tags=re.findall(r'<main\b[^>]*>',s)
  expected=s
  for tag in tags:
   if 'tabindex="-1"' in tag:continue
   replacement=tag.replace('<main ', '<main tabindex="-1" ',1) if 'id="main-content"' in tag else tag.replace('<main ', '<main id="main-content" tabindex="-1" ',1)
   expected=expected.replace(tag,replacement,1)
 else:
  expected=s
  for id,text in pairs.items():expected=expected.replace('## '+text+'\n','<h2 id="'+id+'">'+text+'</h2>\n')
 assert expected.encode()==new,f
 q=E/f;q.parent.mkdir(parents=True,exist_ok=True);q=Path(str(q)+'.txt');q.write_bytes(new)
 records.append({'path':f,'before_sha256':hashlib.sha256(old).hexdigest(),'after_sha256':hashlib.sha256(new).hexdigest(),'snapshot_path':str(q.relative_to(ROOT)),'only_allowed_delta':True})
(E/'manifest.json').write_text(json.dumps(records,indent=2))
class P(HTMLParser):
 def __init__(self):super().__init__();self.ids=Counter();self.mains=[];self.h2={};self.cur=None;self.skip=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids[a['id']]+=1
  if t=='main':self.mains.append(a)
  if t=='a' and a.get('href')=='#main-content':self.skip.append(a)
  if t=='h2' and 'id' in a:self.cur=a['id'];self.h2[self.cur]=''
 def handle_endtag(self,t):
  if t=='h2':self.cur=None
 def handle_data(self,d):
  if self.cur:self.h2[self.cur]+=d
out=[]
for f in (ROOT/'dist/client').rglob('*.html'):
 p=P();p.feed(f.read_text());
 if p.skip:
  assert p.ids['main-content']==1,(f,p.ids['main-content']);targets=[m for m in p.mains if m.get('id')=='main-content'];assert len(targets)==1 and targets[0].get('tabindex')=='-1',str(f)
  out.append({'html':str(f.relative_to(ROOT)),'main_content_unique':True,'main_tag':True,'tabindex':'-1'})
p=P();p.feed((ROOT/'dist/client/alimentacion-perros-senior.html').read_text())
for id,text in pairs.items():assert p.ids[id]==1 and p.h2[id]==text,(id,p.h2.get(id))
(D/'evidencias/auditor-anclas-html.json').write_text(json.dumps({'source_files':len(records),'html_with_skip_link':out,'nutrition_h2':pairs},ensure_ascii=False,indent=2));print('SOURCE',len(records),'HTML',len(out),'H2',len(pairs))
