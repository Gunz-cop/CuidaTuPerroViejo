import re,json,hashlib,pathlib,statistics
root=next(p for p in pathlib.Path(__file__).resolve().parents if (p/"src/content/blog").is_dir())
a=(root/'src/content/blog/miedo-polvora-perros-mayores.mdx').read_text();b=(root/'src/content/blog/miedo-petardos-perros-mayores.mdx').read_text()
def clean(s):
 s=re.sub(r'<FAQ\b.*?/>',lambda m:'\n'.join(re.findall(r"(?:question|answer):\s*'([^']*)'",m[0])),s,flags=re.S)
 s=re.sub(r'\{?/\*.*?\*/\}?','',s,flags=re.S)
 s=re.sub(r'^import .*?;\s*','',s,flags=re.M)
 s=re.sub(r'<TarjetaRelacionada\b[^>]*/>','',s)
 s=re.sub(r'<div data-editorial-bibliography>.*?</div>','',s,flags=re.S)
 s=re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',s)
 s=re.sub(r'<AlertBox\b[^>]*title="([^"]+)"[^>]*>',r' \1 ',s)
 s=re.sub(r'<[^>]+>',' ',s)
 s=re.sub(r"\b(question|answer):\s*",'',s)
 s=re.sub(r"[{}\[\]#*]",'',s)
 return s
def count(s):return len(re.findall(r'\S+',clean(s)))
body=a.split('---',2)[2]
parts=re.split(r'^## ',body,flags=re.M)
targets=[320,510,560,450,520,520,480,460,360,420,560,540]
rows=[dict(section='Introducción' if i==0 else s.splitlines()[0],real=count(s),target=targets[i],deviation=round(100*(count(s)/targets[i]-1),2)) for i,s in enumerate(parts)]
def words(t):return re.findall(r'\w+',t.lower())
def hits(x,y,n):
 x=words(x);y=words(y);ys={tuple(y[i:i+n]) for i in range(len(y)-n+1)}
 return sorted({' '.join(x[i:i+n]) for i in range(len(x)-n+1) if tuple(x[i:i+n]) in ys})
out={'sha256':hashlib.sha256(a.encode()).hexdigest(),'count_method':'whitespace, visible title/text; removes comments/imports/bibliography/card/tags/link destinations; AlertBox title included; FAQ question/answer included','total':count(body),'sections':rows,'ngram8_raw_contract':hits(body,b.split('---',2)[2],8),'ngram8_visible':hits(clean(body),clean(b.split('---',2)[2]),8)}
(root/'comprobaciones.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print(json.dumps(out,ensure_ascii=False,indent=2))
