import urllib.request, urllib.error, json, hashlib, pathlib, datetime, sys
ROOT=pathlib.Path('/workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia')
BUILD=pathlib.Path('/workspace/ctpv-f2a-audit-r1/dist/client')
INDEX=json.loads((BUILD/'agent-content/v1/index.json').read_text())
HEAD='d628f371b32cd7c4bb698ba906b2648c4cd6178a'
SEC={'x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'geolocation=(), microphone=(), camera=()','strict-transport-security':'max-age=31536000; includeSubDomains'}
LINK='<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None
opener=urllib.request.build_opener(NoRedirect)
mode=sys.argv[1];origin='http://127.0.0.1:8797' if mode=='local' else 'https://a9654c00-cuidatuperroviejo.g1721m.workers.dev'
out=ROOT/mode;out.mkdir(exist_ok=True);raw=out/'raw';raw.mkdir(exist_ok=True)
resources=[('/agent-content/v1/index.json','application/json; charset=utf-8')]+[(d['markdownPath'],'text/markdown; charset=utf-8') for d in INDEX['documents']]
resources.append(('/','text/html; charset=utf-8'))
records=[]
for i,(path,mime) in enumerate(resources):
    expected=(BUILD/('index.html' if path=='/' else path[1:])).read_bytes()
    for method in ('GET','HEAD'):
        headers={'Accept-Encoding':'identity'}
        if path=='/': headers['Accept']='text/markdown'
        request=urllib.request.Request(origin+path,headers=headers,method=method)
        when=datetime.datetime.now(datetime.timezone.utc).isoformat()
        try: response=opener.open(request,timeout=30)
        except urllib.error.HTTPError as e:response=e
        body=response.read(); h={k.lower():v for k,v in response.headers.items()}
        stem=f'{i:02}-{method.lower()}'
        (raw/(stem+'.headers')).write_text(str(response.headers))
        (raw/(stem+'.body')).write_bytes(body)
        checks={'status':response.status==200,'mime':h.get('content-type')==mime,'body':body==expected if method=='GET' else body==b'', 'security':all(h.get(k)==v for k,v in SEC.items()),'link':h.get('link')==LINK,'noCookie':'set-cookie' not in h}
        if 'content-length' in h: checks['length']=int(h['content-length'])==len(expected)
        records.append({'timestamp':when,'method':method,'request':{'url':origin+path,'headers':headers},'head':HEAD,'status':response.status,'headers':h,'bodyBytes':len(body),'bodySha256':hashlib.sha256(body).hexdigest(),'expectedBytes':len(expected),'expectedSha256':hashlib.sha256(expected).hexdigest(),'rawBody':str((raw/(stem+'.body')).relative_to(out)),'rawHeaders':str((raw/(stem+'.headers')).relative_to(out)),'checks':checks})
        print(f'{mode} {method} {path} {response.status} '+('PASS' if all(checks.values()) else 'FAIL '+str(checks)),flush=True)
data={'sourceCommit':HEAD,'origin':origin,'requests':len(records),'failed':[{'method':r['method'],'url':r['request']['url'],'checks':r['checks']} for r in records if not all(r['checks'].values())],'records':records}
(out/'http.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
files=sorted([p for p in out.rglob('*') if p.is_file() and p.name!='manifest.sha256'])
(out/'manifest.sha256').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(out))+'\n' for p in files))
print(json.dumps({'requests':len(records),'failed':data['failed']}));sys.exit(bool(data['failed']))
