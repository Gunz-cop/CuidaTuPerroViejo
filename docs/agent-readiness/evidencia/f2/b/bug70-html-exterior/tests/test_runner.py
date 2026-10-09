import base64, gzip, hashlib, importlib.util, json, os, pathlib, subprocess, tempfile, unittest
from unittest.mock import patch
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('runner',ROOT/'runner.py'); runner=importlib.util.module_from_spec(spec); spec.loader.exec_module(runner)
_project_client=ROOT.parents[5]/'dist/client'
_configured_client=os.environ.get('CTPV_BUG70_ASSETS_ROOT')
CLIENT=pathlib.Path(_configured_client) if _configured_client else (_project_client if (_project_client/'agent-content/v1/index.json').is_file() else ROOT/'fixtures/client')
PLAN=ROOT/'plan/public-acceptance-plan-index.json'
CAPTURED_DELEGATION_ROOT=pathlib.Path(os.environ['CTPV_BUG70_DELEGATION_CAPTURE_ROOT']) if os.environ.get('CTPV_BUG70_DELEGATION_CAPTURE_ROOT') else None
ORIGINAL_SUBPROCESS_RUN=subprocess.run
CONTENT_INDEX=json.loads((CLIENT/'agent-content/v1/index.json').read_text())
DOC_BY_CANONICAL={d['canonicalPath']:d for d in CONTENT_INDEX['documents']}
PLAN_INDEX,PLAN_ROWS=runner.chunks_from(PLAN,'requestChunks','path','requestCount')
INSERTION_PATH=os.environ.get('CTPV_BUG70_INSERTION_PATH')
BUILD_ASSET_CONTEXT=runner.load_build_assets(PLAN,CLIENT,INSERTION_PATH) if INSERTION_PATH else None

def body_for(req):
    path=req['path']
    expected=req.get('expected') or {}
    if req['group']=='routing-delegation' and req['method']=='GET' and path!='/contacto':
        if CAPTURED_DELEGATION_ROOT is None: raise AssertionError('Set CTPV_BUG70_DELEGATION_CAPTURE_ROOT for retained public delegation body fixtures')
        suffix=req['requestId'].replace(':','_')
        candidates=list(CAPTURED_DELEGATION_ROOT.glob('*'+suffix))
        if len(candidates)!=1: raise AssertionError(f'Expected one retained delegation body fixture for {req["requestId"]}')
        return (candidates[0]/'curl.output.raw').read_bytes()
    if req['method']=='HEAD':
        row=req['requestId'].replace(':HEAD:',':GET:').replace(':HEAD:',':GET:')
        candidate=next((x for x in PLAN_ROWS if x['method']=='GET' and x['group']==req['group'] and x['path']==path and runner.expected_format(x)==runner.expected_format(req) and x['requestId'].rsplit(':',1)[-1]==req['requestId'].rsplit(':',1)[-1]),None)
        if candidate is None and req['group']=='compression-supplement-144':
            candidate=next((x for x in PLAN_ROWS if x['group']==req['group'] and x['method']=='GET' and x['path']==path and runner.expected_format(x)==runner.expected_format(req) and x['requestId'].endswith(':baseline-no-condition')),None)
        if candidate is not None: req=candidate; expected=req.get('expected') or {}
    if req['group']=='compression-supplement-144' and req['requestId'].endswith(':baseline-no-condition'):
        target=req['expectedBodySha256']
        for p in CLIENT.rglob('*'):
            if p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==target: return p.read_bytes()
        raise AssertionError('No real build fixture matches indexed supplement SHA')
    if isinstance(expected,dict) and expected.get('bodySha256'):
        target=expected['bodySha256']
        for p in CLIENT.rglob('*'):
            if p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==target: return p.read_bytes()
    if req['group']=='legacy-redirect': return b''
    if req['group']=='delegation' and path=='/contacto': return b'<!doctype html><title>Contact form fixture</title>startedAt synthetic'
    if req['group']=='delegation': return b'<!doctype html><title>Delegated page fixture</title>'
    if isinstance(expected,dict) and expected.get('status') in (400,406): return base64.b64decode(expected['bodyBase64'])
    if req['group']=='unknown-routes':
        return b'# not found\n' if path.endswith('.md') else b'<!doctype html><title>Not Found</title>'
    if runner.expected_format(req)=='markdown' and path=='/':
        rel='agent-content/v1/documents/home.md'
    elif runner.expected_format(req)=='markdown' and path in DOC_BY_CANONICAL:
        rel=DOC_BY_CANONICAL[path]['markdownPath'].lstrip('/')
    elif path.startswith('/agent-content/v1/documents/'): rel=path.lstrip('/')
    else:
        rel=path.lstrip('/')
        if path=='/': rel='index.html'
        elif '.' not in pathlib.PurePosixPath(rel).name: rel += '.html'
    p=CLIENT/rel
    if not p.is_file(): raise AssertionError(f'No fixture body for {req["requestId"]}: {p}')
    return p.read_bytes()

def gzip_body(body): return gzip.compress(body,mtime=0)
def etag_for(req):
    fmt=runner.expected_format(req) or 'other'
    coding=(req.get('headers') or {}).get('Accept-Encoding','identity')
    if req['path']=='/' and fmt=='html' and coding=='identity': return None
    return '"test-'+hashlib.sha256((req['path']+'|'+fmt+'|'+coding).encode()).hexdigest()[:20]+'"'

def response_for(req,prior):
    exp=req.get('expected') or {}
    if isinstance(exp,str):
        row=req['requestId'].rsplit(':',1)[-1]
        status=200 if row=='baseline-no-condition' else runner.CONDITIONAL_STATUSES[row]
    else: status=exp['status']
    fmt=runner.expected_format(req)
    mime=(exp.get('mime') if isinstance(exp,dict) else None)
    if not mime: mime={'html':'text/html; charset=utf-8','markdown':'text/markdown; charset=utf-8'}.get(fmt,'text/plain; charset=utf-8')
    entity=body_for(req) if status==200 or (status in (400,406) and req['method']=='GET') else b''
    content=entity if req['method']=='GET' else b''
    requested=(req.get('headers') or {}).get('Accept-Encoding','identity')
    encoding=requested if req['group']=='compression-supplement-144' and status==200 else 'identity'
    wire=gzip_body(content) if encoding=='gzip' and content else content
    if encoding=='br' and content:
        code='const z=require("node:zlib");let b=[];process.stdin.on("data",x=>b.push(x));process.stdin.on("end",()=>process.stdout.write(z.brotliCompressSync(Buffer.concat(b))));'
        wire=ORIGINAL_SUBPROCESS_RUN(['node','-e',code],input=content,stdout=subprocess.PIPE,check=True).stdout
    headers=[('Content-Type',mime),('Date','Wed, 08 Oct 2026 00:00:00 GMT'),('Cache-Control','private, no-store'),('Vary','Accept'),('Link',runner.LINK)]
    headers.extend(runner.SECURITY.items())
    tag=etag_for(req)
    if tag: headers.append(('ETag',tag))
    if encoding in ('gzip','br') and status==200: headers.append(('Content-Encoding',encoding))
    if status==200 and req['method']=='GET' or (status==200 and req['group']=='compression-supplement-144' and req['method']=='HEAD'):
        encoded_entity=(gzip_body(entity) if encoding=='gzip' else entity)
        if encoding=='br' and entity:
            code='const z=require("node:zlib");let b=[];process.stdin.on("data",x=>b.push(x));process.stdin.on("end",()=>process.stdout.write(z.brotliCompressSync(Buffer.concat(b))));'
            encoded_entity=ORIGINAL_SUBPROCESS_RUN(['node','-e',code],input=entity,stdout=subprocess.PIPE,check=True).stdout
        headers.append(('Content-Length',str(len(encoded_entity))))
    if status in (301,):
        headers=[('Location',exp['location']),('Link',runner.LINK),*runner.SECURITY.items()]
        wire=b''
    if req['group']=='explicit-resource' or req['group']=='routing-delegation' or req['group']=='unknown-routes':
        if status not in (200,304):
            pass
    if status==304:
        wire=b''
        if req['method']=='GET' or req['method']=='HEAD':
            source_id=runner.etag_source_id(req)
            source=prior.get(source_id) if source_id else None
            native=runner.header_values(source['headers']).get('etag',[]) if source else []
            headers=[(k,v) for k,v in headers if k.lower()!='etag']
            if native: headers.append(('ETag',native[-1]))
            headers=[(k,v) for k,v in headers if k.lower()!='content-length']
    return status,headers,wire

RESPONSE_BODY_OVERRIDE=None
def synthetic_curl(args,stdout,stderr):
    if args and args[0]=='node': return ORIGINAL_SUBPROCESS_RUN(args,stdout=stdout,stderr=stderr,check=False)
    def patharg(flag): return pathlib.Path(args[args.index(flag)+1])
    hp,op,tp=patharg('--dump-header'),patharg('--output'),patharg('--trace-ascii')
    url=args[-1]; path='/' + url.split('/',3)[3] if url.count('/')>=3 else '/'
    method='HEAD' if '--head' in args else 'GET'
    headers={}
    for i,x in enumerate(args):
        if x=='--header':
            k,v=args[i+1].split(':',1); headers[k]=v.strip()
    req=next(r for r in CURRENT_REQUESTS if r['path']==path and r['method']==method and all(headers.get(k)==v for k,v in CURRENT_RESOLVED.items()))
    status,pairs,wire=response_for(req,CURRENT_PRIOR)
    if RESPONSE_BODY_OVERRIDE is not None and method=='GET': wire=RESPONSE_BODY_OVERRIDE
    phrase={200:'OK',301:'Moved Permanently',304:'Not Modified',400:'Bad Request',404:'Not Found',406:'Not Acceptable'}[status]
    raw=f'HTTP/1.1 {status} {phrase}\r\n'.encode()+b''.join(f'{k}: {v}\r\n'.encode('latin-1') for k,v in pairs)+b'\r\n'
    hp.write_bytes(raw); tp.write_bytes(b'TEST synthetic curl transcript; no network\n')
    if method=='HEAD': op.write_bytes(raw)
    else: op.write_bytes(wire)
    return subprocess.CompletedProcess(args,0,f'{status}\t{0 if method=="HEAD" else len(wire)}\t0.001000\n'.encode(),b'')

class ProtocolFixtures(unittest.TestCase):
    def test_headers_keep_interim_blocks_and_raw_final_crlf(self):
        raw=(b'HTTP/1.1 200 Connection established\r\nProxy-Agent: fixture\r\n\r\n'
             b'HTTP/1.1 100 Continue\r\nX-Interim: yes\r\n\r\n'
             b'HTTP/2 304 Not Modified\r\nETag: "x"\r\n\r\n')
        status,reason,pairs,block=runner.parse_header_block(raw)
        self.assertEqual((status,reason),(304,'Not Modified')); self.assertEqual(pairs,[('ETag','"x"')])
        self.assertEqual(block,b'HTTP/2 304 Not Modified\r\nETag: "x"\r\n\r\n')

    def test_head_stdout_is_not_misread_as_headers_and_entity_metric_is_zero(self):
        out,metric=runner.split_curl_stdout('HEAD',b'200\t0\t0.001234\n')
        self.assertEqual(out,b''); self.assertEqual(metric,b'200\t0\t0.001234\n')
        self.assertEqual(runner.split_curl_stdout('GET',b'200\t5\t0.003\n')[1],b'200\t5\t0.003\n')
        with self.assertRaises(runner.Stop): runner.split_curl_stdout('HEAD',b'HTTP/1.1 200 OK\r\n')

    def test_gzip_and_brotli_real_data_and_empty_head304_skip_decode(self):
        entity=b'TEST real compressed bytes'
        self.assertEqual(runner.decode_entity(gzip.compress(entity),'gzip'),entity)
        code='const z=require("node:zlib");let b=[];process.stdin.on("data",x=>b.push(x));process.stdin.on("end",()=>process.stdout.write(z.brotliCompressSync(Buffer.concat(b))));'
        br=ORIGINAL_SUBPROCESS_RUN(['node','-e',code],input=entity,stdout=subprocess.PIPE,check=True).stdout
        self.assertEqual(runner.decode_entity(br,'br'),entity)
        self.assertEqual(runner.decode_entity(b'','br'),b'')

    def test_etag_grammar_weak_and_html_na_are_bound_to_exact_get_head_pair(self):
        for tag in ('""','"abc,def"','W/"weak"'): self.assertTrue(runner.valid_etag(tag))
        self.assertFalse(runner.valid_etag('W/W/"weak"'))
        self.assertEqual(runner.parse_etag_list('"a,b", W/"c"'),['"a,b"','W/"c"'])
        req={'requestId':'conditional:home:html:GET:own-tag','etagSourceRequestId':'identity:home:html:GET','headers':{'Accept':'text/html','If-None-Match':'W/${selected-native-tag}'},'tagMissingBehavior':'N/A only when sourcefmt is HTML'}
        get={'headers':[],'expectedFormat':'html','requestHeaders':{'Accept':'text/html'}}; head={'headers':[]}
        self.assertIn('N/A',runner.resolve_header_values(req,{'identity:home:html:GET':get,'identity:home:html:HEAD':head})[1])
        with self.assertRaisesRegex(runner.Stop,'Exact baseline HEAD'):
            runner.resolve_header_values(req,{'identity:home:html:GET':get})
        md={**req,'requestId':'conditional:home:markdown:GET:own-tag','etagSourceRequestId':'identity:home:markdown:GET','headers':{'Accept':'text/markdown','If-None-Match':'${selected-native-tag}'}}
        with self.assertRaisesRegex(runner.Stop,'native ETag'):
            runner.resolve_header_values(md,{'identity:home:markdown:GET':{**get,'expectedFormat':'markdown'},'identity:home:markdown:HEAD':head})

    def test_expected_format_uses_selected_plan_mime_not_accept_substring_or_received_mime(self):
        cases=[('text/html;q=0,text/markdown;q=1',{'status':200,'mime':'text/markdown; charset=utf-8'},'markdown'),
               ('text/markdown;q=0,*/*;q=1',{'status':200,'mime':'text/html; charset=utf-8'},'html')]
        for accept,expected,fmt in cases:
            req={'requestId':'accept:q','headers':{'Accept':accept},'expected':expected}
            self.assertEqual(runner.expected_format(req),fmt)
        self.assertIsNone(runner.expected_format({'requestId':'resource:image','headers':{'Accept':'text/markdown'},'expected':{'status':200,'mime':'image/webp'}}))
        req={'requestId':'accept:q','group':'accept-negotiation','method':'GET','headers':{'Accept':'text/markdown;q=0,*/*;q=1'},'expected':{'status':200,'mime':'text/html; charset=utf-8'}}
        with self.assertRaisesRegex(runner.Stop,'MIME mismatch|Selected representation MIME'):
            runner.validate_response(req,200,{'content-type':['text/markdown; charset=utf-8']},b'x',b'x',{})

    def test_date_allowed_but_cdn_public_on_canonical_stops_and_delegated_asset_unconstrained(self):
        req={'requestId':'canonical','group':'identity-identity','method':'GET','path':'/','headers':{'Accept':'text/html'},'expected':{'status':200,'mime':'text/html; charset=utf-8'}}
        values={'date':['Wed, 08 Oct 2026 00:00:00 GMT'],'content-type':['text/html; charset=utf-8'],'cache-control':['private, no-store'],'vary':['Accept'],'link':[runner.LINK], 'cdn-cache-control':['no-store']}
        values.update({k:[v] for k,v in runner.SECURITY.items()})
        asset=BUILD_ASSET_CONTEXT['canonicalHtml']['/']['bytes'] if BUILD_ASSET_CONTEXT else b'x'
        prior={'__bug70BuildAssets__':BUILD_ASSET_CONTEXT} if BUILD_ASSET_CONTEXT else {}
        runner.validate_response(req,200,values,asset,asset,prior)
        values['cloudflare-cdn-cache-control']=['public, max-age=60']
        with self.assertRaisesRegex(runner.Stop,'CDN cache policy'): runner.policy_checks(req,200,values,canonical=True)
        delegated={'requestId':'delegated','group':'routing-delegation','method':'GET','path':'/contacto','headers':{},'expected':{'status':200}}
        asset={'x-edge-cache':['MISS'],'last-modified':['Wed, 08 Oct 2026 00:00:00 GMT'],'accept-ranges':['bytes']}
        asset.update({'link':[runner.LINK],**{k:[v] for k,v in runner.SECURITY.items()}})
        runner.policy_checks(delegated,404,asset,canonical=False)

    def test_response_must_require_native_markdown_etag_on_head_and_304(self):
        req={'requestId':'identity:home:markdown:HEAD','group':'identity-identity','method':'HEAD','path':'/','headers':{'Accept':'text/markdown'},'expected':{'status':200,'mime':'text/markdown; charset=utf-8'}}
        values={'content-type':['text/markdown; charset=utf-8'],'cache-control':['private, no-store'],'vary':['Accept'],'link':[runner.LINK]}; values.update({k:[v] for k,v in runner.SECURITY.items()})
        with self.assertRaisesRegex(runner.Stop,'lacks required native ETag'): runner.validate_response(req,200,values,b'',b'',{})

    def test_destination_is_frozen_to_receipt_and_allowlisted(self):
        idx={'source':{'preview':'https://preview.example'},'allowlist':{'hosts':['preview.example']}}
        self.assertEqual(runner.validate_execution_destination(idx,'https://preview.example/'),'https://preview.example')
        for url in ('http://preview.example','https://evil.example','https://preview.example/path','https://u@preview.example'):
            with self.assertRaises(runner.Stop): runner.validate_execution_destination(idx,url)
        with self.assertRaisesRegex(runner.Stop,'No accepted candidate preview'):
            runner.validate_execution_destination({'source':{'preview':None},'allowlist':{'hosts':[]}},'https://candidate.example')

    def test_unexpected_transport_exception_becomes_stop_with_remaining_manifest(self):
        reqs=[{'requestId':'first'},{'requestId':'second'}]
        def explode(*args): raise RuntimeError('TEST synthetic transport exception')
        with tempfile.TemporaryDirectory() as td:
            out=pathlib.Path(td)
            with self.assertRaisesRegex(runner.Stop,'Unexpected RuntimeError'):
                runner.execute_plan(reqs,out,{},1,destination='https://fixture.invalid',source={'commit':'TEST'},executor=explode)
            stop=json.loads((out/'STOP.json').read_text())
            self.assertEqual(stop['remainingRequestIds'],['first','second']); self.assertIn('RuntimeError',stop['reason'])

    def test_status_hash_policy_stops_keep_partial_files_and_list_remaining(self):
        cases=[('status',{'status':200,'mime':'text/html; charset=utf-8'},503,'text/plain; charset=utf-8',b'failed','Status'),
               ('hash',{'status':200,'mime':'text/html; charset=utf-8','bodySha256':runner.sha(b'expected')},200,'text/html; charset=utf-8',b'wrong','Decoded body hash'),
               ('policy',{'status':200,'mime':'text/html; charset=utf-8'},200,'text/html; charset=utf-8',b'ok','Cache policy mismatch')]
        global CURRENT_REQUESTS,CURRENT_PRIOR,CURRENT_RESOLVED
        for label,expected,status,mime,body,message in cases:
            req={'requestId':f'TEST-{label}','group':'identity-identity' if label=='policy' else 'explicit-resource','method':'GET','path':'/fixture','headers':{'Accept':'text/html'},'expected':expected}
            following={'requestId':f'TEST-{label}-remaining'}
            def fake(args,stdout=None,stderr=None,**kwargs):
                hp=pathlib.Path(args[args.index('--dump-header')+1]); op=pathlib.Path(args[args.index('--output')+1]); tp=pathlib.Path(args[args.index('--trace-ascii')+1])
                phrase={200:'OK',503:'Service Unavailable'}[status]
                pairs=[('Content-Type',mime),('Date','Wed, 08 Oct 2026 00:00:00 GMT'),('Link',runner.LINK)]
                pairs.extend(runner.SECURITY.items())
                pairs.append(('Cache-Control','public, max-age=60' if label=='policy' else 'private, no-store'))
                pairs.append(('Vary','Accept'))
                raw=f'HTTP/1.1 {status} {phrase}\r\n'.encode()+b''.join(f'{k}: {v}\r\n'.encode() for k,v in pairs)+b'\r\n'
                hp.write_bytes(raw); op.write_bytes(body); tp.write_bytes(b'TEST synthetic partial trace\n')
                return subprocess.CompletedProcess(args,0,f'{status}\t{len(body)}\t0.001\n'.encode(),b'')
            with tempfile.TemporaryDirectory() as td:
                prior={'__bug70BuildAssets__':BUILD_ASSET_CONTEXT} if BUILD_ASSET_CONTEXT else {}
                out=pathlib.Path(td); CURRENT_REQUESTS=[req]; CURRENT_PRIOR=prior; CURRENT_RESOLVED=req['headers']
                with patch.object(runner.subprocess,'run',side_effect=fake):
                    with self.assertRaisesRegex(runner.Stop,message):
                        runner.execute_plan([req,following],out,prior,1,destination='https://fixture.invalid',source={'commit':'TEST'},executor=runner.run_one)
                stop=json.loads((out/'STOP.json').read_text())
                self.assertEqual(stop['completedCases'],0); self.assertEqual(stop['remainingRequestIds'],[req['requestId'],following['requestId']])
                rawdirs=list((out/'raw').iterdir()); self.assertEqual(len(rawdirs),1)
                for name in ('request.json','headers.raw','curl.output.raw','curl.trace.raw'):
                    self.assertTrue((rawdirs[0]/name).is_file(),name)

    def test_full_1284_true_run_one_simulation_and_first_stop(self):
        idx,requests=runner.chunks_from(PLAN,'requestChunks','path','requestCount'); runner.validate_plan(idx,requests)
        self.assertEqual(len(requests),1284)
        no_network=[]
        def transport(args,stdout=None,stderr=None,**kwargs):
            if args and args[0]=='node': return ORIGINAL_SUBPROCESS_RUN(args,stdout=stdout,stderr=stderr,**kwargs)
            no_network.append(args[-1]); return synthetic_curl(args,stdout,stderr)
        global CURRENT_REQUESTS,CURRENT_PRIOR,CURRENT_RESOLVED
        with tempfile.TemporaryDirectory() as td:
            out=pathlib.Path(td); prior={'__bug70BuildAssets__':BUILD_ASSET_CONTEXT} if BUILD_ASSET_CONTEXT else {}; results=[]
            if BUILD_ASSET_CONTEXT is None: self.skipTest('Set CTPV_BUG70_ASSETS_ROOT and CTPV_BUG70_INSERTION_PATH to run full build-bound mock simulation')
            def execute(req,outdir,prior,timeout,destination,source):
                global CURRENT_REQUESTS,CURRENT_PRIOR,CURRENT_RESOLVED
                CURRENT_REQUESTS=[req]; CURRENT_PRIOR=prior
                resolved,na=runner.resolve_header_values(req,prior)
                CURRENT_RESOLVED=resolved
                return runner.run_one(req,outdir,prior,timeout,destination,source)
            with patch.object(runner.subprocess,'run',side_effect=transport):
                results=runner.execute_plan(requests,out,prior,2,destination='https://preview.example',source={'commit':'TEST','tree':'TEST'},executor=execute)
            self.assertEqual(len(results),1284); self.assertEqual(len({x['requestId'] for x in results}),1284)
            self.assertGreater(sum(x['state']=='N/A' for x in results),0)
            self.assertEqual(len(no_network),sum(x['state']=='captured' for x in results))
            self.assertEqual(len((out/'summary.jsonl').read_text().splitlines()),1284)
            self.assertFalse((out/'STOP.json').exists())
            exterior_rows=[r for r in results if r['state']=='captured' and r['method']=='GET' and r['status']==200 and r['expectedFormat']=='html' and r['group'] in ('identity-identity','conditional-identity','compression-supplement-144','alternation','accept-negotiation')]
            self.assertGreater(len(exterior_rows),0)
            self.assertTrue(all('htmlExteriorCheck' in r for r in exterior_rows))
            self.assertTrue(all(r['htmlExteriorCheck']['observedForm']=='A' for r in exterior_rows))
            for row in results:
                self.assertTrue(row.get('timestampUtc') or row.get('timestampStartUtc'))
                if row['state']=='captured' and row['method']=='HEAD':
                    self.assertEqual(row['httpDownloadBytes'],0)
                    self.assertEqual(row['bodyWireBytes'],0)
                    self.assertTrue(row['curlHeadOutputFile'])
                    case=out/row['curlHeadOutputFile']
                    self.assertEqual(case.read_bytes(),(out/row['headerFile']).read_bytes())
            result_dir=os.environ.get('CTPV_BUG70_FULL_PLAN_RESULT')
            if result_dir:
                target=pathlib.Path(result_dir); target.mkdir(parents=True,exist_ok=True)
                receipt={'schema':'bug70-offline-protocol-result/1','fixtureLabel':'TEST synthetic offline transport; no HTTP requests',
                         'planIndexSha256':hashlib.sha256(PLAN.read_bytes()).hexdigest(),
                         'requestCount':len(results),'uniqueRequestIdCount':len({x['requestId'] for x in results}),
                         'stateCounts':{state:sum(x['state']==state for x in results) for state in ('captured','N/A')},
                         'transportInvocations':len(no_network),'workerdOrCurlHttpRequests':0,
                         'stopManifestPresent':(out/'STOP.json').exists(),
                         'htmlExteriorCaseCount':len(exterior_rows),
                         'htmlExteriorObservedForms':{form:sum(r['htmlExteriorCheck']['observedForm']==form for r in exterior_rows) for form in ('A','A[:p]+I+A[p:]')},
                         'nativeHtmlCaseCount':sum(r['requestId'] in runner.NATIVE_HTML_MIME_REQUESTS for r in results),
                         'acceptErrorBodyCaseCount':sum(r['requestId'].startswith('accept:accept-home-') and r['status'] in (400,406) for r in results)}
                (target/'full-plan-simulation-result.json').write_text(json.dumps(receipt,ensure_ascii=False,sort_keys=True,indent=2)+'\n')
        self.assertGreater(sum(r['group']=='compression-supplement-144' and r['method']=='GET' for r in results),0)
        self.assertTrue(any(r.get('contentEncoding')=='gzip' for r in results))
        self.assertTrue(any(r.get('contentEncoding')=='br' for r in results))

if __name__=='__main__': unittest.main(verbosity=2)
