"""TEST synthetic exterior-policy proofs and replay of the retained STOP body; no HTTP."""
import importlib.util
import json
import os
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[1]
PLAN=ROOT/'plan/public-acceptance-plan-index.json'
spec=importlib.util.spec_from_file_location('bug70_runner',ROOT/'runner.py')
runner=importlib.util.module_from_spec(spec); spec.loader.exec_module(runner)
ASSETS=Path(os.environ['CTPV_BUG70_ASSETS_ROOT']) if os.environ.get('CTPV_BUG70_ASSETS_ROOT') else None
INSERTION=Path(os.environ['CTPV_BUG70_INSERTION_PATH']) if os.environ.get('CTPV_BUG70_INSERTION_PATH') else None
STOP_CAPTURE=Path(os.environ['CTPV_BUG70_STOP_CAPTURE']) if os.environ.get('CTPV_BUG70_STOP_CAPTURE') else None
CONTEXT=runner.load_build_assets(PLAN,ASSETS,INSERTION) if ASSETS and INSERTION else None


class HtmlExteriorPolicy(unittest.TestCase):
    def setUp(self):
        if CONTEXT is None: self.skipTest('Set frozen private build asset and insertion paths for exterior tests')
        self.idx, self.rows=runner.chunks_from(PLAN,'requestChunks','path','requestCount')
        self.req=next(r for r in self.rows if r['requestId']=='identity:article--agresividad-tardia-perros-mayores-dolor:html:GET')
        self.prior={'__bug70BuildAssets__':CONTEXT}
        self.asset=CONTEXT['canonicalHtml'][self.req['path']]
        self.transformed=self.asset['bytes'][:self.asset['insertOffset']]+CONTEXT['insertion']+self.asset['bytes'][self.asset['insertOffset']:]

    def test_exact_A_and_exact_authorized_insertion_only(self):
        a=runner.validate_html_exterior(self.req,200,self.asset['bytes'],self.prior)
        inserted=runner.validate_html_exterior(self.req,200,self.transformed,self.prior)
        self.assertEqual(a['observedForm'],'A')
        self.assertEqual((a['expectedExteriorBytes'],a['expectedExteriorSha256']),(len(self.asset['bytes']),self.asset['sha256']))
        self.assertEqual((a['insertionBytes'],a['insertionSha256'],a['insertionOffset']),(0,None,None))
        self.assertEqual(inserted['observedForm'],'A[:p]+I+A[p:]')
        self.assertEqual(inserted['observedEntityBytes'],127017)
        self.assertEqual(inserted['expectedExteriorBytes'],len(self.transformed))
        self.assertEqual(inserted['expectedExteriorSha256'],runner.sha(self.transformed))
        self.assertEqual((inserted['insertionBytes'],inserted['insertionSha256'],inserted['insertionOffset']),
                         (len(CONTEXT['insertion']),runner.AUTHORIZED_INSERTION_SHA256,self.asset['insertOffset']))
        self.assertEqual(inserted['insertionSha256'],runner.AUTHORIZED_INSERTION_SHA256)
        wrong=self.transformed+b' '
        with self.assertRaisesRegex(runner.Stop,'neither exact A nor exact authorized insertion'):
            runner.validate_html_exterior(self.req,200,wrong,self.prior)

    def test_route_source_manifest_and_insertion_fingerprints_are_fixed(self):
        wrong_route=dict(self.req); wrong_route['path']='/not-in-canonical-build'
        with self.assertRaisesRegex(runner.Stop,'not in the frozen canonical build asset map'):
            runner.validate_html_exterior(wrong_route,200,self.asset['bytes'],self.prior)
        bad_plan=dict(self.idx); bad_plan['source']=dict(self.idx['source'],commit='0'*40)
        with self.assertRaisesRegex(runner.Stop,'source is not the frozen production target'):
            runner.validate_plan(bad_plan,self.rows)
        with tempfile.TemporaryDirectory() as td:
            bad_insertion=Path(td)/'wrong-insertion.bin'
            altered=bytearray(CONTEXT['insertion']); altered[0]^=1; bad_insertion.write_bytes(altered)
            with self.assertRaisesRegex(runner.Stop,'Authorized production insertion bytes differ'):
                runner.load_build_assets(PLAN,ASSETS,bad_insertion)

    def test_loader_rejects_corrupt_manifest_and_corrupt_A_asset(self):
        with tempfile.TemporaryDirectory() as td:
            root=Path(td); (root/'plan').mkdir(); manifest=root/'build-artifact-manifest.json'
            manifest.write_bytes((ROOT/'build-artifact-manifest.json').read_bytes()+b' ')
            fake_index=root/'plan/public-acceptance-plan-index.json'; fake_index.write_text('{}')
            with self.assertRaisesRegex(runner.Stop,'manifest SHA mismatch'):
                runner.load_build_assets(fake_index,ASSETS,INSERTION)
        with tempfile.TemporaryDirectory() as td:
            root=Path(td); css=root/'_astro/BaseLayout.DiuOmqqC.css'; css.parent.mkdir()
            data=bytearray(CONTEXT['artifacts']['_astro/BaseLayout.DiuOmqqC.css']); data[0]^=1; css.write_bytes(data)
            with self.assertRaisesRegex(runner.Stop,'Build artifact differs from frozen manifest'):
                runner.load_build_assets(PLAN,root,INSERTION)

    def test_accept_selected_html_without_plan_hash_still_requires_exact_exterior(self):
        req=next(r for r in self.rows if r['requestId']=='accept:accept-home-q-prefers-html')
        self.assertEqual(req['expected']['status'],200)
        self.assertEqual(runner.expected_format(req),'html')
        self.assertNotIn('bodySha256',req['expected'])
        a=CONTEXT['canonicalHtml']['/']['bytes']
        values={'content-type':['text/html; charset=utf-8'],'date':['Wed, 08 Oct 2026 00:00:00 GMT'],
                'cache-control':['private, no-store'],'vary':['Accept'],'link':[runner.LINK]}
        values.update({k:[v] for k,v in runner.SECURITY.items()})
        check=runner.validate_response(req,200,values,a,a,self.prior)
        self.assertEqual(check['observedForm'],'A')
        with self.assertRaisesRegex(runner.Stop,'neither exact A nor exact authorized insertion'):
            runner.validate_response(req,200,values,a+b'\n',a+b'\n',self.prior)

    def test_conditional_html_keeps_exact_E_baseline_stability(self):
        req=next(r for r in self.rows if r['requestId']=='conditional:home:html:GET:different-tag')
        a=CONTEXT['canonicalHtml']['/']['bytes']
        values={'content-type':['text/html; charset=utf-8'],'date':['Wed, 08 Oct 2026 00:00:00 GMT'],
                'cache-control':['private, no-store'],'vary':['Accept'],'link':[runner.LINK]}
        values.update({k:[v] for k,v in runner.SECURITY.items()})
        # Both E values must independently satisfy the exterior rule; vary only
        # A versus A+I so this assertion exercises same-context stability.
        source={'bodyDecodedSha256':runner.sha(self.transformed)}
        self.prior['identity:home:html:GET']=source
        with self.assertRaisesRegex(runner.Stop,'Conditional 200 differs from identity baseline'):
            runner.validate_response(req,200,values,a,a,self.prior)
        req=next(r for r in self.rows if r['requestId']=='supplement:home-gzip:html:GET:different-tag')
        self.prior['supplement:home-gzip:html:GET:baseline-no-condition']=source
        with self.assertRaisesRegex(runner.Stop,'Conditional 200 differs from selected same-coding'):
            runner.validate_response(req,200,values,a,a,self.prior)

    def test_alternation_requires_same_real_entity_with_and_without_etag(self):
        req=next(r for r in self.rows if r['group']=='alternation' and r['path']=='/' and r['headers'].get('Accept')=='text/html')
        home=CONTEXT['canonicalHtml']['/']
        a=home['bytes']
        insertion=CONTEXT['insertion']
        transformed=a[:home['insertOffset']]+insertion+a[home['insertOffset']:]
        forms={'A':a,'A+I':transformed}
        values={'content-type':['text/html; charset=utf-8'],'date':['Wed, 08 Oct 2026 00:00:00 GMT'],
                'cache-control':['private, no-store'],'vary':['Accept'],'link':[runner.LINK]}
        values.update({k:[v] for k,v in runner.SECURITY.items()})
        for etag in (None,'"stable"'):
            tagged=dict(values)
            if etag is not None: tagged['etag']=[etag]
            for baseline_form,observed_form in (('A','A+I'),('A+I','A')):
                with self.subTest(etag=etag,baseline=baseline_form,observed=observed_form):
                    baseline={'group':'identity-identity','method':'GET','path':'/',
                              'expectedFormat':'html','contentEncoding':'identity',
                              'bodyDecodedSha256':runner.sha(forms[baseline_form]),
                              'headers':[('ETag',etag)] if etag is not None else []}
                    prior={**self.prior,'identity:home:html:GET':baseline}
                    with self.assertRaisesRegex(runner.Stop,'Alternation decoded entity differs from identity baseline'):
                        runner.validate_response(req,200,tagged,b'',forms[observed_form],prior)
            for first_form,second_form in (('A','A+I'),('A+I','A')):
                with self.subTest(etag=etag,first=first_form,second=second_form):
                    baseline={'group':'identity-identity','method':'GET','path':'/',
                              'expectedFormat':'html','contentEncoding':'identity',
                              'bodyDecodedSha256':runner.sha(forms[first_form]),
                              'headers':[('ETag',etag)] if etag is not None else []}
                    prior={**self.prior,'identity:home:html:GET':baseline}
                    runner.validate_response(req,200,tagged,b'',forms[first_form],prior)
                    with self.assertRaisesRegex(runner.Stop,'Alternation decoded entity differs from identity baseline|Decoded entity changed within same alternation'):
                        runner.validate_response(req,200,tagged,b'',forms[second_form],prior)

    def test_actual_retained_first_response_replays_without_transport(self):
        if STOP_CAPTURE is None: self.skipTest('Set CTPV_BUG70_STOP_CAPTURE to retained production STOP request directory')
        body=(STOP_CAPTURE/'curl.output.raw').read_bytes()
        raw=(STOP_CAPTURE/'headers.raw').read_bytes()
        status,reason,pairs,block=runner.parse_header_block(raw)
        values=runner.header_values(pairs)
        encoding=values.get('content-encoding',['identity'])[-1]
        decoded=runner.decode_entity(body,encoding)
        exterior=runner.validate_response(self.req,status,values,body,decoded,self.prior)
        self.assertEqual(status,200)
        self.assertEqual(runner.sha(decoded),'8585d05ecf77c601511ca5b124b958f8fa95fe6daef817548c747094d2e43f49')
        self.assertEqual(exterior['observedForm'],'A[:p]+I+A[p:]')
        self.assertEqual(exterior['observedEntityBytes'],127017)
        self.assertEqual(exterior['expectedExteriorSha256'],runner.sha(decoded))
        # This only replays the already retained failing capture; it is not a new acceptance run.
        self.assertTrue(block.endswith(b'\r\n\r\n'))

    def test_inactive_plan_refuses_execute_before_creating_output(self):
        import tempfile, subprocess, sys
        with tempfile.TemporaryDirectory() as td:
            out=Path(td)/'must-not-exist'
            p=subprocess.run([sys.executable,str(ROOT/'runner.py'),'--plan-index',str(PLAN),'--output',str(out),'--execute'],stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=False)
            self.assertEqual(p.returncode,2)
            self.assertIn(b'Execution blocked',p.stderr)
            self.assertFalse(out.exists())


if __name__=='__main__': unittest.main(verbosity=2)
