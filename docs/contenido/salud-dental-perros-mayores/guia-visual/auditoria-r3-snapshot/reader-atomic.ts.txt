import { parseFragment, type DefaultTreeAdapterMap } from 'parse5';

/** Keep original HTML offsets: nested sections and attributes must not end a widget early. */
export function readerAtomicRanges(html: string): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];
  function visit(node: DefaultTreeAdapterMap['node']) {
    if ('attrs' in node && node.attrs.some(attr => attr.name === 'data-reader-atomic')) {
      const location = node.sourceCodeLocation;
      if (location) ranges.push({ start: location.startOffset, end: location.endOffset });
      return;
    }
    if ('childNodes' in node) node.childNodes.forEach(visit);
  }
  visit(parseFragment(html, { sourceCodeLocationInfo: true }));
  return ranges;
}
