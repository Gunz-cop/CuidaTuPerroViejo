"""TEST offline checks for three native HTML build baselines; no HTTP."""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PLAN = ROOT / 'plan/public-acceptance-plan-index.json'
MANIFEST = ROOT / 'native-html-baseline-manifest.json'
spec = importlib.util.spec_from_file_location('bug71_runner', ROOT / 'runner.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
CURRENT = Path(os.environ['CTPV_BUG71_NATIVE_ASSETS_ROOT']) if os.environ.get('CTPV_BUG71_NATIVE_ASSETS_ROOT') else None
HISTORICAL = Path(os.environ['CTPV_BUG71_HISTORICAL_ASSETS_ROOT']) if os.environ.get('CTPV_BUG71_HISTORICAL_ASSETS_ROOT') else None
GRACIAS_CAPTURE = Path(os.environ['CTPV_BUG71_GRACIAS_CAPTURE']) if os.environ.get('CTPV_BUG71_GRACIAS_CAPTURE') else None
INSERTION = Path(os.environ['CTPV_BUG70_INSERTION_PATH']) if os.environ.get('CTPV_BUG70_INSERTION_PATH') else None


class NativeHtmlBaseline(unittest.TestCase):
    def setUp(self):
        if CURRENT is None or HISTORICAL is None:
            self.skipTest('Set retained current and historical build asset roots')
        self.plan, self.rows = runner.chunks_from(PLAN, 'requestChunks', 'path', 'requestCount')
        self.manifest = json.loads(MANIFEST.read_text())

    def test_three_proposed_get_hashes_match_exact_current_bytes_only(self):
        by_id = {row['requestId']: row for row in self.rows}
        for asset in self.manifest['assets']:
            with self.subTest(route=asset['route']):
                actual = (CURRENT / asset['assetPath']).read_bytes()
                historical = (HISTORICAL / asset['assetPath']).read_bytes()
                planned = by_id[asset['requestId']]['expected']['bodySha256']
                self.assertEqual(len(actual), asset['currentD2bdAssetBytes'])
                self.assertEqual(hashlib.sha256(actual).hexdigest(), asset['currentD2bdAssetSha256'])
                self.assertEqual(planned, asset['currentD2bdAssetSha256'])
                self.assertEqual(hashlib.sha256(historical).hexdigest(), asset['historicalPlanExpectedSha256'])
                self.assertNotEqual(hashlib.sha256(historical).hexdigest(), planned)
                self.assertNotEqual(actual, historical)
                head_id = asset['requestId'].removesuffix('-get') + '-head'
                self.assertEqual(by_id[head_id]['expected']['bodySha256'], hashlib.sha256(b'').hexdigest())

    def test_static_assets_reject_changed_byte_and_exterior_is_not_in_scope(self):
        for asset in self.manifest['assets']:
            with self.subTest(route=asset['route']):
                exact = (CURRENT / asset['assetPath']).read_bytes()
                changed = bytearray(exact)
                changed[len(changed) // 2] ^= 1
                row = next(r for r in self.rows if r['requestId'] == asset['requestId'])
                values = {'content-type': ['text/html'], 'link': [runner.LINK]}
                values.update({name: [value] for name, value in runner.SECURITY.items()})
                self.assertIsNone(runner.validate_html_exterior(row, 200, exact, {}))
                runner.validate_response(row, 200, values, exact, exact, {})
                bad_candidates = [
                    (HISTORICAL / asset['assetPath']).read_bytes(),
                    exact + b'\n',
                    bytes(changed),
                ]
                if INSERTION is not None:
                    close = exact.rfind(b'</body>')
                    self.assertGreaterEqual(close, 0)
                    self.assertEqual(exact.count(b'</body>'), 1)
                    insertion = INSERTION.read_bytes()
                    bad_candidates.append(exact[:close] + insertion + exact[close:])
                for bad in bad_candidates:
                    with self.subTest(route=asset['route'], badBytes=len(bad)):
                        self.assertNotEqual(hashlib.sha256(bad).hexdigest(), asset['currentD2bdAssetSha256'])
                        with self.assertRaisesRegex(runner.Stop, 'Decoded body hash mismatch'):
                            runner.validate_response(row, 200, values, bad, bad, {})

    def test_retained_gracias_stop_replay_matches_updated_expected_hash(self):
        if GRACIAS_CAPTURE is None:
            self.skipTest('Set retained /gracias GET capture path for offline replay')
        row = next(r for r in self.rows if r['requestId'] == 'delegation:delegation-discovery-gracias-get')
        response = next(a for a in self.manifest['assets'] if a['route'] == '/gracias')
        body = (GRACIAS_CAPTURE / 'curl.output.raw').read_bytes()
        raw_headers = (GRACIAS_CAPTURE / 'headers.raw').read_bytes()
        status, _reason, pairs, raw_final = runner.parse_header_block(raw_headers)
        values = runner.header_values(pairs)
        decoded = runner.decode_entity(body, values.get('content-encoding', ['identity'])[-1])
        checked = runner.validate_response(row, status, values, body, decoded, {})
        self.assertEqual(status, 200)
        self.assertEqual(len(decoded), response['currentD2bdAssetBytes'])
        self.assertEqual(hashlib.sha256(decoded).hexdigest(), row['expected']['bodySha256'])
        self.assertEqual(decoded, (CURRENT / response['assetPath']).read_bytes())
        self.assertTrue(raw_final.endswith(b'\r\n\r\n'))
        self.assertIsNone(checked)
        self.assertIsNone(runner.validate_html_exterior(row, status, decoded, {}))
        stale = dict(row)
        stale['expected'] = dict(row['expected'], bodySha256=response['historicalPlanExpectedSha256'])
        with self.assertRaisesRegex(runner.Stop, 'Decoded body hash mismatch'):
            runner.validate_response(stale, status, values, body, decoded, {})
        altered = decoded + b'\n'
        with self.assertRaisesRegex(runner.Stop, 'Decoded body hash mismatch'):
            runner.validate_response(row, status, values, altered, altered, {})


if __name__ == '__main__':
    unittest.main(verbosity=2)
