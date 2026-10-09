"""TEST synthetic protocol proofs plus curated replay of one retained actual capture."""
import base64, gzip, hashlib, json, pathlib, tempfile, unittest
from unittest.mock import patch
import test_runner as t

runner=t.runner
ROOT=pathlib.Path(__file__).resolve().parents[1]
FIXTURE=ROOT/'fixtures/actual-gzip-markdown-home'

class WeakETagResponseEquivalence(unittest.TestCase):
    def test_weak_comparison_uses_valid_exact_opaque_tag_and_ignores_only_w_prefix(self):
        positives=[('"x"','"x"'),('W/"x"','W/"x"'),('W/"x"','"x"'),('"x"','W/"x"')]
        for left,right in positives:
            with self.subTest(left=left,right=right): self.assertTrue(runner.weak_etag_equivalent(left,right))
        negatives=[('"x"','"X"'),('W/"x"','"y"'),('"x"','"x" '),('W/W/"x"','"x"'),('"x"','x'),('', '""')]
        for left,right in negatives:
            with self.subTest(left=left,right=right): self.assertFalse(runner.weak_etag_equivalent(left,right))

    def test_actual_captured_gzip_markdown_baseline_head_and_304_replay(self):
        metadata=json.loads((FIXTURE/'capture-projection.json').read_text())
        self.assertEqual(metadata['fixtureType'],'ACTUAL_CAPTURE_PROJECTION_NOT_SYNTHETIC_HTTP')
        projection=metadata['getBaseline']; wire=base64.b64decode((FIXTURE/projection['wireBodyFile']).read_bytes().strip(),validate=True)
        self.assertEqual(len(wire),projection['wireBodyBytes'])
        self.assertEqual(hashlib.sha256(wire).hexdigest(),projection['wireBodySha256'])
        decoded=gzip.decompress(wire)
        self.assertEqual(len(decoded),projection['decodedEntityBytes'])
        self.assertEqual(hashlib.sha256(decoded).hexdigest(),projection['decodedEntitySha256'])
        self.assertEqual(projection['decodedEntitySha256'],'859f77287af9e57173b1ca1c9d84db55efee18ee95e608763550aaf21eb0a079')
        self.assertEqual(metadata['headBaseline']['httpDownloadBytes'],0)
        self.assertEqual(metadata['headBaseline']['selectedHeaders']['etag'],projection['selectedHeaders']['etag'])
        failed=metadata['conditionalResponse']
        self.assertEqual(failed['requestIfNoneMatch'],projection['selectedHeaders']['etag'])
        self.assertEqual(failed['status'],304); self.assertEqual(failed['entityBytes'],0)
        self.assertTrue(runner.weak_etag_equivalent(failed['selectedHeaders']['etag'],projection['selectedHeaders']['etag']))
        req=next(r for r in t.PLAN_ROWS if r['requestId']=='supplement:home-gzip:markdown:GET:own-tag')
        source_id=runner.etag_source_id(req); head_id=runner.etag_head_id(req,source_id)
        source_headers=[(k,v) for k,v in projection['selectedHeaders'].items()]
        head_headers=[(k,v) for k,v in metadata['headBaseline']['selectedHeaders'].items()]
        prior={source_id:{'headers':source_headers,'expectedFormat':'markdown','requestHeaders':{'Accept':'text/markdown','Accept-Encoding':'gzip'}},
               head_id:{'headers':head_headers,'expectedFormat':'markdown','requestHeaders':{'Accept':'text/markdown','Accept-Encoding':'gzip'}}}
        values={k.lower():[v] for k,v in failed['selectedHeaders'].items()}
        runner.validate_response(req,304,values,b'',b'',prior)

    def _plan_case(self,group,context,fmt,method,row='own-tag'):
        if group=='conditional-identity':
            path='/salud-perros-mayores/sindrome-cushing-perros-mayores'
            return next(r for r in t.PLAN_ROWS if r['group']==group and r['path']==path and runner.expected_format(r)==fmt and r['method']==method and r['requestId'].endswith(':'+row))
        context_name,path,coding=context
        rid_prefix=f'supplement:{context_name}:{fmt}:{method}:{row}'
        return next(r for r in t.PLAN_ROWS if r['requestId']==rid_prefix and r['method']==method and r['group']==group)

    def _run_one(self,req,baseline_tag,response_tag,duplicate=False,missing=False):
        source_id=runner.etag_source_id(req); head_id=runner.etag_head_id(req,source_id)
        fmt=runner.expected_format(req)
        coding=(req.get('headers') or {}).get('Accept-Encoding','identity')
        accept='text/markdown' if fmt=='markdown' else 'text/html'
        source_headers=[('Content-Type',{'markdown':'text/markdown; charset=utf-8','html':'text/html; charset=utf-8'}[fmt]),('ETag',baseline_tag)]
        prior={source_id:{'headers':source_headers,'expectedFormat':fmt,'requestHeaders':{'Accept':accept,'Accept-Encoding':coding}},
               head_id:{'headers':source_headers,'expectedFormat':fmt,'requestHeaders':{'Accept':accept,'Accept-Encoding':coding}}}
        resolved,_=runner.resolve_header_values(req,prior)
        t.CURRENT_REQUESTS=[req]; t.CURRENT_PRIOR=prior; t.CURRENT_RESOLVED=resolved
        original=t.response_for
        def response_with_selected_wire_etag(request,prior_state):
            status,headers,body=original(request,prior_state)
            if status!=304: return status,headers,body
            headers=[(k,v) for k,v in headers if k.lower()!='etag']
            if not missing: headers.append(('ETag',response_tag))
            if duplicate and not missing: headers.append(('ETag',response_tag))
            return status,headers,body
        with tempfile.TemporaryDirectory() as td:
            out=pathlib.Path(td)
            with patch.object(t,'response_for',side_effect=response_with_selected_wire_etag), patch.object(runner.subprocess,'run',side_effect=t.synthetic_curl):
                result=runner.execute_plan([req],out,prior,5,destination='https://fixture.invalid',source={'commit':'TEST synthetic; transport mocked'})
            if result: return result[0],prior
            raise AssertionError('runner produced no response')

    def test_real_run_one_accepts_weak_and_strong_forms_for_identity_and_gzip_brotli_rows(self):
        tests=[]
        # Identity controls exercise both methods and selected representations.
        for fmt,method in [('html','GET'),('markdown','GET'),('html','HEAD'),('markdown','HEAD')]:
            req=self._plan_case('conditional-identity',None,fmt,method,'own-tag')
            tests.append((req,'W/"case-sensitive"','"case-sensitive"' if len(tests)%2==0 else 'W/"case-sensitive"'))
            tests.append((req,'"case-sensitive"','W/"case-sensitive"'))
        # All four supplemental route/coding contexts, both representations and methods.
        for context in [('home-gzip','/','gzip'),('home-br','/','br'),('cushing-gzip','/salud-perros-mayores/sindrome-cushing-perros-mayores','gzip'),('cushing-br','/salud-perros-mayores/sindrome-cushing-perros-mayores','br')]:
            for fmt in ('html','markdown'):
                for method in ('GET','HEAD'):
                    req=self._plan_case('compression-supplement-144',context,fmt,method,'own-tag')
                    tests.append((req,'W/"matrix"','"matrix"'))
                    tests.append((req,'"matrix"','W/"matrix"'))
        for req,baseline,response in tests:
            with self.subTest(requestId=req['requestId'],baseline=baseline,response=response):
                result,_=self._run_one(req,baseline,response)
                self.assertEqual(result['status'],304)
                self.assertEqual(result['bodyWireBytes'],0)
                self.assertEqual(dict((k.lower(),v) for k,v in result['headers'])['etag'],response)

    def test_plan_rejects_a_wrong_route_or_format_baseline_before_execution(self):
        idx,rows=runner.chunks_from(t.PLAN,'requestChunks','path','requestCount')
        bad=[dict(row) for row in rows]
        target=next(row for row in bad if row['requestId']=='supplement:home-gzip:markdown:GET:own-tag')
        target['etagSourceRequestId']='supplement:home-gzip:html:GET:baseline-no-condition'
        with self.assertRaisesRegex(runner.Stop,'Supplement exact coding ETag source mismatch'):
            runner.validate_plan(idx,bad)

    def test_weak_equivalence_does_not_relax_200_alternation_or_get_head_stability(self):
        # Existing GET/HEAD stability remains literal-string equality even when opaque-tags match.
        req=next(r for r in t.PLAN_ROWS if r['group']=='identity-identity' and r['path']=='/salud-perros-mayores/sindrome-cushing-perros-mayores' and runner.expected_format(r)=='markdown' and r['method']=='HEAD')
        get_id=req['requestId'].replace(':HEAD',':GET')
        prior={get_id:{'group':'identity-identity','method':'GET','path':req['path'],'expectedFormat':'markdown','contentEncoding':'identity','headers':[('ETag','W/"same"')]}}
        t.CURRENT_REQUESTS=[req]; t.CURRENT_PRIOR=prior; t.CURRENT_RESOLVED=req['headers']
        original=t.response_for
        def strong_head(request,prior_state):
            status,headers,body=original(request,prior_state)
            if request['method']=='HEAD': headers=[(k,v) for k,v in headers if k.lower()!='etag']+[('ETag','"same"')]
            return status,headers,body
        with tempfile.TemporaryDirectory() as td:
            with patch.object(t,'response_for',side_effect=strong_head), patch.object(runner.subprocess,'run',side_effect=t.synthetic_curl):
                with self.assertRaisesRegex(runner.Stop,'GET/HEAD etag incoherent'):
                    runner.execute_plan([req],pathlib.Path(td),prior,5,destination='https://fixture.invalid',source={'commit':'TEST synthetic'})

    def test_real_run_one_rejects_wrong_opaque_case_malformed_duplicate_and_missing_markdown_etag(self):
        req=self._plan_case('compression-supplement-144',('home-gzip','/','gzip'),'markdown','GET','own-tag')
        cases=[
            {'label':'different opaque tag','response':'"different"','message':'304 ETag differs'},
            {'label':'case changed','response':'"Opaque"','message':'304 ETag differs'},
            {'label':'malformed','response':'W/W/"matrix"','message':'Invalid or repeated native ETag'},
            {'label':'duplicate','response':'"matrix"','duplicate':True,'message':'Invalid or repeated native ETag'},
            {'label':'missing Markdown response tag','response':'','missing':True,'message':'Markdown response lacks required native ETag'},
        ]
        for case in cases:
            with self.subTest(case=case['label']):
                source_id=runner.etag_source_id(req); head_id=runner.etag_head_id(req,source_id)
                fmt='markdown'; tag='W/"matrix"'; headers=[('Content-Type','text/markdown; charset=utf-8'),('ETag',tag)]
                prior={source_id:{'headers':headers,'expectedFormat':fmt,'requestHeaders':{'Accept':'text/markdown','Accept-Encoding':'gzip'}},
                       head_id:{'headers':headers,'expectedFormat':fmt,'requestHeaders':{'Accept':'text/markdown','Accept-Encoding':'gzip'}}}
                resolved,_=runner.resolve_header_values(req,prior)
                t.CURRENT_REQUESTS=[req]; t.CURRENT_PRIOR=prior; t.CURRENT_RESOLVED=resolved
                original=t.response_for
                def response_with_bad_wire_etag(request,prior_state):
                    status,pairs,body=original(request,prior_state)
                    if status!=304: return status,pairs,body
                    pairs=[(k,v) for k,v in pairs if k.lower()!='etag']
                    if not case.get('missing'): pairs.append(('ETag',case['response']))
                    if case.get('duplicate'): pairs.append(('ETag',case['response']))
                    return status,pairs,body
                following={'requestId':'TEST-after-'+case['label']}
                with tempfile.TemporaryDirectory() as td:
                    out=pathlib.Path(td)
                    with patch.object(t,'response_for',side_effect=response_with_bad_wire_etag), patch.object(runner.subprocess,'run',side_effect=t.synthetic_curl):
                        with self.assertRaisesRegex(runner.Stop,case['message']):
                            runner.execute_plan([req,following],out,prior,5,destination='https://fixture.invalid',source={'commit':'TEST synthetic'})
                    stop=json.loads((out/'STOP.json').read_text())
                    self.assertEqual(stop['completedCases'],0)
                    self.assertEqual(stop['remainingRequestIds'],[req['requestId'],following['requestId']])
                    rawdirs=list((out/'raw').iterdir()); self.assertEqual(len(rawdirs),1)
                    self.assertTrue((rawdirs[0]/'headers.raw').is_file())

if __name__=='__main__': unittest.main(verbosity=2)
