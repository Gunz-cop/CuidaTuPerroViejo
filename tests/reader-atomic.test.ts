import assert from 'node:assert/strict';
import test from 'node:test';
import { readerAtomicRanges } from '../src/utils/reader-atomic';

test('a nested section cannot expose later paragraphs of an interactive guide to insertion', () => {
  const widget = '<section data-reader-atomic><p>uno</p><section><p>dos</p></section><p>tres</p></section>';
  const html = `<p>antes</p>${widget}<p>después</p>`;
  assert.deepEqual(readerAtomicRanges(html).map(r => html.slice(r.start, r.end)), [widget]);
  const eligible = [...html.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)].filter(m => !readerAtomicRanges(html).some(r => m.index! >= r.start && m.index! < r.end));
  assert.deepEqual(eligible.map(m => m[0]), ['<p>antes</p>', '<p>después</p>']);
});

test('multiple widgets preserve exact source offsets without changing regular paragraph eligibility', () => {
  const a = '<div data-reader-atomic="true"><p>A</p></div>';
  const b = '<section class="b" data-reader-atomic><p>B</p></section>';
  const html = `<p>Ñ y 🐕</p>${a}<p>medio</p>${b}<p>fin</p>`;
  assert.deepEqual(readerAtomicRanges(html).map(r => html.slice(r.start, r.end)), [a, b]);
});

test('literal markers in code, comments and lookalike attributes do not exclude article text', () => {
  const html = '<!-- <div data-reader-atomic> --><pre>&lt;div data-reader-atomic&gt;</pre><script>"<div data-reader-atomic>"</script><p data-reader-atomicity="yes">contenido</p>';
  assert.deepEqual(readerAtomicRanges(html), []);
});
