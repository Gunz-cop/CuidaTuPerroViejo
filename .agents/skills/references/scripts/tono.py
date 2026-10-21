import re,sys,glob
PAT=r"\bno (demuestra|sustituye|garantiza|basta|permite|convierte|confirma|autoriza|prueba|certifica|indica por sí|equivale|resuelve|significa necesariamente|descarta)\b|\bpor sí sol[oa]s?\b|\bsin (atribuir|convertir|inventar|deducir)\b"
def txt(f):
    s=open(f).read().split('---',2)[2]
    s=re.sub(r'<FAQ.*','',s,flags=re.S); s=re.sub(r'<div data-editorial-bibliography>.*?</div>','',s,flags=re.S)
    s=re.sub(r'<AlertBox type="(danger|warning)".*?</AlertBox>','',s,flags=re.S)
    return re.sub(r'<[^>]+>|^import .*$','',s,flags=re.M)
for f in sys.argv[1:] or sorted(glob.glob('src/content/blog/*.mdx')):
    s=txt(f); n=len(s.split()); h=len(re.findall(PAT,s,flags=re.I))
    print(f"{f.split('/')[-1][:-4]:62} {n:5} palabras  {h:3} muletillas  {h*1000/n:4.1f}/1000")
