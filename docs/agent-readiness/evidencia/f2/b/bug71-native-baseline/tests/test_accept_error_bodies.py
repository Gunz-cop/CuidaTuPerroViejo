"""TEST synthetic Accept error-body protocol proof; no network."""
import base64, hashlib, json, os, pathlib, tempfile, unittest
from unittest.mock import patch
import test_runner as t

class AcceptErrorBodyFixtures(unittest.TestCase):
    def test_exact_literals_pass_and_empty_or_wrong_bodies_stop_in_default_executor(self):
        rows={r['requestId']:r for r in t.PLAN_ROWS if r.get('requestId','').startswith('accept:accept-home-') and isinstance(r.get('expected'),dict) and r['expected'].get('status') in (400,406)}
        ids={
            'accept:accept-home-bad-q-over-one','accept:accept-home-bad-q-precision','accept:accept-home-duplicate-q',
            'accept:accept-home-json-only','accept:accept-home-none-acceptable','accept:accept-home-unsupported-media-param',
        }
        self.assertEqual(set(rows),ids)
        exact={400:b'Invalid Accept header.\n',406:b'No acceptable representation.\n'}
        t.RESPONSE_BODY_OVERRIDE=None
        positive=[]; negative=[]
        # All six exact expected responses traverse the real default run_one -> validate_response path.
        for rid,req in rows.items():
            body=exact[req['expected']['status']]
            self.assertEqual(req['expected']['bodySha256'],t.runner.sha(body))
            self.assertEqual(base64.b64decode(req['expected']['bodyBase64']),body)
            with tempfile.TemporaryDirectory() as td:
                out=pathlib.Path(td); prior={}; t.CURRENT_REQUESTS=[req]; t.CURRENT_PRIOR=prior
                t.CURRENT_RESOLVED=req['headers']
                with patch.object(t.runner.subprocess,'run',side_effect=t.synthetic_curl):
                    t.runner.execute_plan([req],out,prior,1,destination='https://fixture.invalid',source={'commit':'TEST synthetic'})
                result=json.loads((out/'summary.jsonl').read_text().splitlines()[0])
                self.assertEqual(result['bodyDecodedSha256'],t.runner.sha(body),rid)
                raw=next((out/'raw').iterdir())/'curl.output.raw'
                self.assertEqual(raw.read_bytes(),body,rid)
                positive.append({'requestId':rid,'status':req['expected']['status'],'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'state':'PASS'})
        # Empty and incorrect bodies for both status classes STOP with raw partials and pending IDs.
        for status,body in ((400,b''),(400,b'Wrong error text.\n'),(406,b''),(406,b'Wrong error text.\n')):
            req=next(r for r in rows.values() if r['expected']['status']==status)
            following={'requestId':'TEST-after-'+str(status)+'-'+str(len(body))}
            with tempfile.TemporaryDirectory() as td:
                out=pathlib.Path(td); prior={}; t.CURRENT_REQUESTS=[req]; t.CURRENT_PRIOR=prior
                t.CURRENT_RESOLVED=req['headers']; t.RESPONSE_BODY_OVERRIDE=body
                with patch.object(t.runner.subprocess,'run',side_effect=t.synthetic_curl):
                    with self.assertRaisesRegex(t.runner.Stop,'literal body mismatch'):
                        t.runner.execute_plan([req,following],out,prior,1,destination='https://fixture.invalid',source={'commit':'TEST synthetic'})
                stop=json.loads((out/'STOP.json').read_text())
                self.assertEqual(stop['completedCases'],0)
                self.assertEqual(stop['remainingRequestIds'],[req['requestId'],following['requestId']])
                rawdirs=list((out/'raw').iterdir()); self.assertEqual(len(rawdirs),1)
                self.assertEqual((rawdirs[0]/'curl.output.raw').read_bytes(),body)
                self.assertTrue((rawdirs[0]/'headers.raw').is_file())
                negative.append({'requestId':req['requestId'],'status':status,'observedBytes':len(body),'observedSha256':hashlib.sha256(body).hexdigest(),'state':'STOP','partialRawRetained':True,'remainingRequestIds':stop['remainingRequestIds']})
        t.RESPONSE_BODY_OVERRIDE=None
        result_path=os.environ.get('CTPV_BUG70_ERROR_BODY_RESULT')
        if result_path:
            target=pathlib.Path(result_path); target.parent.mkdir(parents=True,exist_ok=True)
            target.write_text(json.dumps({'schema':'bug69-error-body-test-result/1','fixtureLabel':'TEST synthetic offline transport; no HTTP','positiveCases':positive,'negativeCases':negative,'expectedLiteralSha256':{str(k):hashlib.sha256(v).hexdigest() for k,v in exact.items()}},ensure_ascii=False,sort_keys=True,indent=2)+'\n')

if __name__=='__main__': unittest.main(verbosity=2)
