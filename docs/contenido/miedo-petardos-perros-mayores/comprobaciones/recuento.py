import re,json,html,statistics
from pathlib import Path
p=Path('src/content/blog/miedo-petardos-perros-mayores.mdx')
s=p.read_text().split('---',2)[2]
def visible(s):
 s=re.sub(r'\{/\*.*?\*/\}', '',s,flags=re.S)
 s=re.sub(r'<div data-editorial-bibliography>.*?</div>', '',s,flags=re.S)
 s=re.sub(r'^import .*$', '',s,flags=re.M)
 s=re.sub(r'^\*Pie:.*$', '',s,flags=re.M)
 s=re.sub(r'<img\b[^>]*>', '',s)
 s=re.sub(r'<AlertBox[^>]*title="([^"]*)"[^>]*>',lambda m:m[1]+'\n',s)
 s=re.sub(r'<FAQ items=\{\[(.*?)\]\} />',lambda m:'\n'.join(re.findall(r"(?:question|answer): '([^']*)'",m[1])),s,flags=re.S)
 s=re.sub(r'<[^>]*>', ' ',s)
 s=re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',s)
 s=re.sub(r'^\s*(?:#{1,6}|\d+\.|-)\s+', '',s,flags=re.M)
 s=s.replace('**','').replace('*','')
 return html.unescape(s)
def count(s):return len(visible(s).split())
parts=re.split(r'(?=^## )',s,flags=re.M)
targets=[350,540,560,500,640,550,600,440,400,300,280,540]
rows=[]
for part,t in zip(parts,targets):
 name=part.splitlines()[0] if part.startswith('##') else 'Introducción'
 n=count(part);rows.append([name,n,t,round(100*(n-t)/t,1)])
 print(name,n,t,rows[-1][-1])
 for sub in re.split(r'(?=^### )',part,flags=re.M)[1:]:
  print('  ',sub.splitlines()[0],count(re.sub(r'<AlertBox.*?</AlertBox>','',sub,flags=re.S)))
print('TOTAL',count(s))
Path('/tmp/petardos-recuento.json').write_text(json.dumps({'total':count(s),'rows':rows},ensure_ascii=False,indent=2))
