"""TEST offline regression proofs for the two scoped CSS MIME plan rows; no HTTP."""
import hashlib
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / 'fixtures/css-stylesheet/response-metadata.json'
PLAN = ROOT / 'plan/public-acceptance-plan-index.json'
spec = importlib.util.spec_from_file_location('bug70_runner', ROOT / 'runner.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


def all_plan_rows():
    idx, rows = runner.chunks_from(PLAN, 'requestChunks', 'path', 'requestCount')
    return idx, rows


def row_by_id(rows, request_id):
    return next(row for row in rows if row['requestId'] == request_id)


def fixture():
    meta = json.loads(FIXTURE.read_text(encoding='utf-8'))
    body = b''.join((FIXTURE.parent / part['path']).read_bytes() for part in meta['parts'])
    return meta, body


class CssMimePolicy(unittest.TestCase):
    def test_plan_scopes_semantic_policy_to_exact_get_head_pair(self):
        idx, rows = all_plan_rows()
        runner.validate_plan(idx, rows)
        policies = {row['requestId'] for row in rows if isinstance(row['expected'], dict) and row['expected'].get('mimePolicy') == runner.CSS_MIME_POLICY}
        self.assertEqual(policies, {'resource:resource-stylesheet-get', 'resource:resource-stylesheet-head'})
        altered = [dict(row) for row in rows]
        target = next(row for row in altered if row['requestId'] == 'resource:resource-hero-image-get')
        target['expected'] = dict(target['expected'], mimePolicy=runner.CSS_MIME_POLICY)
        with self.assertRaisesRegex(runner.Stop, 'outside its frozen request IDs'):
            runner.validate_plan(idx, altered)

    def test_replay_captured_css_get_and_head_with_real_validator_no_curl(self):
        idx, rows = all_plan_rows()
        meta, body = fixture()
        self.assertEqual(meta['requestId'], 'resource:resource-stylesheet-get')
        self.assertEqual(meta['fixtureLabel'], 'Exact CSS bytes from existing target build; offline fixture, no HTTP')
        self.assertEqual(meta['sourceCommit'], 'd2bd342050811d41ee212730cb11fe07783994bd')
        self.assertEqual(meta['path'], '/_astro/BaseLayout.DiuOmqqC.css')
        self.assertEqual(meta['bodyBytes'], len(body))
        self.assertEqual(meta['bodySha256'], hashlib.sha256(body).hexdigest())
        self.assertEqual(meta['status'], 200)
        self.assertEqual(meta['headers']['content-type'], ['text/css'])
        values = meta['headers']
        get = row_by_id(rows, 'resource:resource-stylesheet-get')
        runner.validate_response(get, meta['status'], values, body, body, {})
        runner.policy_checks(get, meta['status'], values, canonical=False)
        head = row_by_id(rows, 'resource:resource-stylesheet-head')
        # TEST synthetic HEAD entity proof; the retained capture is the real GET.
        runner.validate_response(head, 200, values, b'', b'', {})
        with self.assertRaisesRegex(runner.Stop, 'HEAD response unexpectedly contains entity bytes'):
            runner.validate_response(head, 200, values, b'x', b'', {})

    def test_css_media_type_accepts_optional_utf8_charset_only(self):
        policy = runner.CSS_MIME_POLICY
        for value in (
            'text/css',
            'text/css; charset=utf-8',
            'TEXT/CSS;CHARSET=UTF-8',
            'text/css ; charset = "UTF-8"',
        ):
            with self.subTest(value=value):
                self.assertTrue(runner.css_content_type_matches([value], policy))
        for value in (
            'text/css; charset=latin1',
            'text/css; charset=utf-8; charset=utf-8',
            'text/css; charset=utf-8; profile=other',
            'text/css; profile=other',
            'text/css;',
            'text/css; charset=',
            'text/css; charset="utf-8',
            'application/css',
            'text/html; charset=utf-8',
            'text/css, text/css',
        ):
            with self.subTest(value=value):
                self.assertFalse(runner.css_content_type_matches([value], policy))
        self.assertFalse(runner.css_content_type_matches(['text/css', 'text/css'], policy))

    def test_css_status_body_hash_and_empty_get_still_stop(self):
        _, rows = all_plan_rows()
        req = row_by_id(rows, 'resource:resource-stylesheet-get')
        meta, body = fixture()
        values = meta['headers']
        with self.assertRaisesRegex(runner.Stop, 'Status 404'):
            runner.validate_response(req, 404, values, body, body, {})
        with self.assertRaisesRegex(runner.Stop, 'CSS MIME policy mismatch'):
            runner.validate_response(req, 200, {'content-type': ['text/css; charset=latin1']}, body, body, {})
        with self.assertRaisesRegex(runner.Stop, 'Decoded body hash mismatch'):
            runner.validate_response(req, 200, values, b'', b'', {})
        wrong = bytearray(body); wrong[0] ^= 1
        with self.assertRaisesRegex(runner.Stop, 'Decoded body hash mismatch'):
            runner.validate_response(req, 200, values, bytes(wrong), bytes(wrong), {})

    def test_all_non_css_expectations_keep_exact_mime_matching(self):
        _, rows = all_plan_rows()
        req = row_by_id(rows, 'resource:resource-index-json-get')
        self.assertIsNone(req['expected'].get('mimePolicy'))
        with self.assertRaisesRegex(runner.Stop, 'MIME mismatch'):
            runner.validate_response(req, 200, {'content-type': ['application/json']}, b'{}', b'{}', {})


if __name__ == '__main__':
    unittest.main(verbosity=2)
