"""TEST offline native HTML MIME regression proofs; no HTTP."""
import hashlib
import importlib.util
import json
import re
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PLAN = ROOT / 'plan/public-acceptance-plan-index.json'
FIXTURE = ROOT / 'fixtures/native-html-contacto/response-metadata.json'
spec = importlib.util.spec_from_file_location('bug68_runner', ROOT / 'runner.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


def all_plan_rows():
    return runner.chunks_from(PLAN, 'requestChunks', 'path', 'requestCount')


def row_by_id(rows, request_id):
    return next(row for row in rows if row['requestId'] == request_id)


def fixture():
    meta = json.loads(FIXTURE.read_text(encoding='utf-8'))
    body = b''.join((FIXTURE.parent / part['path']).read_bytes() for part in meta['parts'])
    return meta, body


class NativeHtmlMimePolicy(unittest.TestCase):
    def test_plan_scopes_semantic_policy_to_exact_ten_native_html_rows(self):
        idx, rows = all_plan_rows()
        runner.validate_plan(idx, rows)
        policies = {row['requestId'] for row in rows if isinstance(row['expected'], dict) and row['expected'].get('mimePolicy') == runner.NATIVE_HTML_MIME_POLICY}
        self.assertEqual(policies, set(runner.NATIVE_HTML_MIME_REQUESTS))
        expected_statuses = {rid: row_by_id(rows, rid)['expected']['status'] for rid in policies}
        self.assertEqual(sum(status == 200 for status in expected_statuses.values()), 8)
        self.assertEqual(sum(status == 404 for status in expected_statuses.values()), 2)
        css_policies = [row['expected'].get('mimePolicy') for row in rows if row['requestId'] in runner.CSS_MIME_REQUESTS]
        self.assertEqual(css_policies, [runner.CSS_MIME_POLICY, runner.CSS_MIME_POLICY])
        unrelated = [dict(row) for row in rows]
        target = row_by_id(unrelated, 'resource:resource-hero-image-get')
        target['expected'] = dict(target['expected'], mimePolicy=runner.NATIVE_HTML_MIME_POLICY)
        with self.assertRaisesRegex(runner.Stop, 'outside its frozen request IDs'):
            runner.validate_plan(idx, unrelated)

    def test_native_html_accepts_optional_utf8_charset_and_rejects_other_parameters(self):
        policy = runner.NATIVE_HTML_MIME_POLICY
        for value in ('text/html', 'text/html; charset=utf-8', 'TEXT/HTML;CHARSET=UTF-8', 'text/html ; charset = "UTF-8"'):
            with self.subTest(value=value):
                self.assertTrue(runner.native_html_content_type_matches([value], policy))
        for value in (
            'text/plain', 'text/html; charset=latin1', 'text/html; charset=utf-8; charset=utf-8',
            'text/html; profile=x', 'text/html; charset=utf-8; profile=x', 'text/html;',
            'text/html; charset=', 'text/html; charset="utf-8', 'text/html, text/html',
        ):
            with self.subTest(value=value):
                self.assertFalse(runner.native_html_content_type_matches([value], policy))
        self.assertFalse(runner.native_html_content_type_matches(['text/html', 'text/html'], policy))

    def test_retained_contacto_get_replays_with_real_validator_and_strict_utf8(self):
        _, rows = all_plan_rows()
        meta, body = fixture()
        self.assertEqual(meta['requestId'], 'delegation:delegation-discovery-contacto-get')
        self.assertEqual(meta['status'], 200)
        self.assertEqual(meta['headers']['content-type'], ['text/html'])
        self.assertEqual(len(body), meta['bodyBytes'])
        self.assertEqual(hashlib.sha256(body).hexdigest(), meta['bodySha256'])
        html = body.decode('utf-8', 'strict')
        self.assertRegex(html, re.compile(r'<meta\b[^>]*charset\s*=\s*["\']?utf-8', re.I))
        get = row_by_id(rows, 'delegation:delegation-discovery-contacto-get')
        self.assertIsNone(runner.expected_format(get), 'native HTML is not a negotiated Markdown document')
        runner.validate_response(get, meta['status'], meta['headers'], body, body, {})
        runner.policy_checks(get, meta['status'], meta['headers'], canonical=False)

    def test_head_is_explicitly_synthetic_and_bodyless(self):
        _, rows = all_plan_rows()
        meta, _ = fixture()
        head = row_by_id(rows, 'delegation:delegation-discovery-contacto-head')
        # TEST synthetic HEAD control constructed from the retained GET headers; no real HEAD was captured.
        runner.validate_response(head, 200, meta['headers'], b'', b'', {})
        runner.policy_checks(head, 200, meta['headers'], canonical=False)
        with self.assertRaisesRegex(runner.Stop, 'HEAD response unexpectedly contains entity bytes'):
            runner.validate_response(head, 200, meta['headers'], b'x', b'', {})

    def test_native_html_ids_ignore_accept_markdown_and_have_no_document_etag_format(self):
        _, rows = all_plan_rows()
        for request_id in runner.NATIVE_HTML_MIME_REQUESTS:
            row = row_by_id(rows, request_id)
            self.assertEqual(row['headers'].get('Accept'), 'text/markdown')
            self.assertEqual(row['expected']['mime'], 'text/html')
            self.assertIsNone(runner.expected_format(row))
        gui_get = row_by_id(rows, 'delegation:delegation-discovery-gracias-get')
        gui_test = dict(gui_get, expected=dict(gui_get['expected']))
        values = {'content-type': ['text/html'], 'link': [runner.LINK]}
        values.update({k: [v] for k, v in runner.SECURITY.items()})
        body = b'<!doctype html><meta charset="utf-8"><title>TEST GUI</title>'
        gui_test['expected']['bodySha256'] = hashlib.sha256(body).hexdigest()
        # TEST synthetic text/markdown Accept must not turn the native GUI response into Markdown.
        runner.validate_response(gui_test, 200, values, body, body, {})

    def test_status_utf8_and_scope_errors_still_stop(self):
        _, rows = all_plan_rows()
        get = row_by_id(rows, 'delegation:delegation-discovery-contacto-get')
        values = {'content-type': ['text/html']}
        with self.assertRaisesRegex(runner.Stop, 'Status 503'):
            runner.validate_response(get, 503, values, b'failure', b'failure', {})
        with self.assertRaisesRegex(runner.Stop, 'Native HTML MIME policy mismatch'):
            runner.validate_response(get, 200, {'content-type': ['text/html; charset=latin1']}, b'ok', b'ok', {})
        with self.assertRaisesRegex(runner.Stop, 'valid UTF-8'):
            runner.validate_response(get, 200, values, b'\xff', b'\xff', {})
        unknown = row_by_id(rows, 'unknown:unknown-canonical')
        self.assertEqual(unknown['expected']['status'], 404)
        body = b'<!doctype html><meta charset=utf-8><title>TEST not found</title>'
        values.update({'link': [runner.LINK], **{k: [v] for k, v in runner.SECURITY.items()}})
        runner.validate_response(unknown, 404, values, body, body, {})

    def test_other_html_and_markdown_rows_remain_exact_and_css_policy_is_unchanged(self):
        _, rows = all_plan_rows()
        html = row_by_id(rows, 'identity:home:html:GET')
        self.assertNotIn('mimePolicy', html['expected'])
        with self.assertRaisesRegex(runner.Stop, 'MIME mismatch'):
            runner.validate_response(html, 200, {'content-type': ['text/html']}, b'x', b'x', {})
        markdown = row_by_id(rows, 'identity:home:markdown:GET')
        self.assertEqual(runner.expected_format(markdown), 'markdown')
        css = row_by_id(rows, 'resource:resource-stylesheet-get')
        self.assertEqual(css['expected']['mimePolicy'], runner.CSS_MIME_POLICY)
        self.assertTrue(runner.css_content_type_matches(['text/css'], runner.CSS_MIME_POLICY))


if __name__ == '__main__':
    unittest.main(verbosity=2)
