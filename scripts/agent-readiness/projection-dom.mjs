import { parse as parseHtml } from 'parse5';

const SITE = 'https://cuidatuperroviejo.com';
const EXCLUDED_TAGS = new Set([
  'nav', 'script', 'style', 'noscript', 'iframe', 'template', 'svg', 'form', 'button',
  'input', 'select', 'textarea', 'progress', 'label', 'source',
]);
const INLINE_TAGS = new Set([
  'a', 'abbr', 'b', 'code', 'del', 'em', 'i', 'ins', 'mark', 's', 'small', 'span',
  'strong', 'sub', 'sup', 'u', 'time', 'wbr', 'q', 'cite', 'var', 'samp',
]);
const TRANSPARENT_TAGS = new Set([
  'article', 'aside', 'blockquote', 'br', 'caption', 'dd', 'details', 'div', 'dl',
  'dt', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hr', 'img', 'li', 'main', 'ol', 'p', 'picture', 'pre', 'section',
  'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
]);
const ALLOWED_TAGS = new Set([...INLINE_TAGS, ...TRANSPARENT_TAGS, ...EXCLUDED_TAGS]);
const BLOCK_TAGS = new Set([
  'article', 'aside', 'blockquote', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption',
  'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li',
  'main', 'ol', 'p', 'pre', 'section', 'table', 'ul',
]);
const MARKDOWN_META = {
  home: { type: 'WebPage', idSuffix: '#webpage' },
  article: { type: 'BlogPosting', idSuffix: '#article' },
  pillar: { type: 'CollectionPage', idSuffix: '#webpage' },
  editorial: { type: ['AboutPage', 'WebPage'], idSuffix: '#webpage' },
  tool: { type: 'WebPage', idSuffix: '#webpage', allowCanonicalId: true },
};

function attrs(node) {
  return Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name.toLowerCase(), value]));
}

function children(node) {
  return node.childNodes ?? [];
}

function nodes(root, predicate = () => true) {
  const result = [];
  const visit = (node) => {
    if (predicate(node)) result.push(node);
    for (const child of children(node)) visit(child);
    if (node.content) visit(node.content);
  };
  visit(root);
  return result;
}

function hasClass(node, ...names) {
  const classes = new Set((attrs(node).class ?? '').split(/\s+/u).filter(Boolean));
  return names.every((name) => classes.has(name));
}

function byId(root, id, tagName = null) {
  return nodes(root, (node) => (tagName === null || node.tagName === tagName) && attrs(node).id === id);
}

function exactOne(items, page, selector) {
  if (items.length !== 1) {
    throw new Error(`PROJECTION_SELECTOR_CARDINALITY documentId=${page.documentId} selector=${selector} expected=1 observed=${items.length}`);
  }
  return items[0];
}

function textOf(node) {
  let value = '';
  const visit = (current) => {
    if (current.nodeName === '#text') value += current.value;
    for (const child of children(current)) visit(child);
    if (current.content) visit(current.content);
  };
  visit(node);
  return value.replace(/\s+/gu, ' ').trim();
}

function canonicalAndMainMetadata(document, page) {
  const canonical = page.canonicalUrl;
  const typeSpec = MARKDOWN_META[page.kind];
  if (!typeSpec || typeof canonical !== 'string') {
    throw new Error(`PROJECTION_METADATA_UNSUPPORTED documentId=${page.documentId}`);
  }
  const structured = [];
  for (const script of nodes(document, (node) => node.tagName === 'script' && (attrs(node).type ?? '').toLowerCase() === 'application/ld+json')) {
    const raw = children(script).filter((node) => node.nodeName === '#text').map((node) => node.value).join('');
    if (!raw.trim()) continue;
    let data;
    try { data = JSON.parse(raw); }
    catch { throw new Error(`PROJECTION_JSONLD_INVALID documentId=${page.documentId}`); }
    const add = (value) => {
      if (Array.isArray(value)) value.forEach(add);
      else if (value && typeof value === 'object') {
        if (Array.isArray(value['@graph'])) value['@graph'].forEach(add);
        else structured.push(value);
      }
    };
    add(data);
  }
  const expectedId = `${canonical}${typeSpec.idSuffix}`;
  const types = Array.isArray(typeSpec.type) ? typeSpec.type : [typeSpec.type];
  const principal = structured.filter((item) => {
    const itemTypes = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
    const identityOk = item['@id'] === expectedId || (typeSpec.allowCanonicalId && item['@id'] === canonical);
    return identityOk && types.some((type) => itemTypes.includes(type)) && item.url === canonical;
  });
  if (principal.length !== 1) {
    throw new Error(`PROJECTION_JSONLD_PRINCIPAL documentId=${page.documentId} expected=${types.join('|')}@${expectedId} observed=${principal.length}`);
  }
  const source = principal[0];
  const checkedDate = (key) => {
    if (!Object.hasOwn(source, key)) return null;
    const value = source[key];
    if (value === null) return null;
    if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/u.test(value) || Number.isNaN(Date.parse(value))) {
      throw new Error(`PROJECTION_JSONLD_DATE documentId=${page.documentId} field=${key}`);
    }
    return value;
  };
  return { datePublished: checkedDate('datePublished'), dateModified: checkedDate('dateModified') };
}

function directParagraphs(parent) {
  return children(parent).filter((node) => node.tagName === 'p');
}

function selectProfile(document, page, h1) {
  const mainMax = () => nodes(document, (node) => node.tagName === 'main' && hasClass(node, 'max-w-3xl'));
  switch (page.documentId) {
    case 'home':
      return [exactOne(nodes(document, (node) => node.tagName === 'main' && attrs(node).id === 'main-content'), page, 'main#main-content')];
    case 'pillar--herramientas': {
      const hero = h1.parentNode;
      const root = exactOne(nodes(document, (node) => node.tagName === 'main' && hasClass(node, 'mx-auto', 'w-full', 'max-w-4xl')), page, 'main.mx-auto.w-full.max-w-4xl');
      return [h1, ...directParagraphs(hero), root];
    }
    case 'page--acerca-de': {
      const article = exactOne(byId(document, 'about-us', 'article'), page, 'article#about-us');
      return [h1, ...directParagraphs(h1.parentNode), article];
    }
    case 'page--politica-editorial': {
      const root = exactOne(nodes(document, (node) => node.tagName === 'main' && hasClass(node, 'max-w-3xl')), page, 'main.max-w-3xl');
      return [h1, ...directParagraphs(h1.parentNode), root];
    }
    case 'tool--calidad-vida':
    case 'tool--movilidad':
      return [exactOne(mainMax(), page, 'main.max-w-3xl')];
    default: break;
  }
  if (page.kind === 'article') {
    const articles = nodes(document, (node) => node.tagName === 'article');
    const article = exactOne(articles, page, 'article');
    const header = exactOne(children(article).filter((node) => node.tagName === 'header'), page, 'article > header');
    const body = exactOne(nodes(article, (node) => node.tagName === 'div' && hasClass(node, 'content-body', 'prose')), page, 'article .content-body.prose');
    return [header, body];
  }
  if (page.kind === 'pillar') {
    const heroH1 = exactOne(byId(document, 'health-title', 'h1'), page, 'h1#health-title');
    const body = exactOne(nodes(document, (node) => node.tagName === 'article' && hasClass(node, 'content-body', 'health-content', 'prose')), page, 'article.content-body.health-content.prose');
    const sourceP = exactOne(nodes(document, (node) => node.tagName === 'p' && node.parentNode?.tagName === 'div' &&
      hasClass(node.parentNode, 'health-toc__source') && node.parentNode.parentNode?.tagName === 'aside' &&
      hasClass(node.parentNode.parentNode, 'health-toc')), page, 'aside.health-toc > .health-toc__source > p');
    return [heroH1, ...directParagraphs(heroH1.parentNode), body, sourceP];
  }
  throw new Error(`PROJECTION_PROFILE_UNKNOWN documentId=${page.documentId}`);
}

function isExcluded(node) {
  if (!node.tagName) return false;
  const attr = attrs(node);
  return EXCLUDED_TAGS.has(node.tagName) || attr['aria-hidden'] === 'true' || attr.role === 'progressbar' ||
    (node.tagName === 'span' && attr.id === 'localized-emergency-text') ||
    (node.tagName === 'div' && hasClass(node, 'ad-slot') && Object.hasOwn(attr, 'data-ad-pending')) ||
    hasClass(node, 'back-btn') || hasClass(node, 'breadcrumb') || hasClass(node, 'breadcrumbs') ||
    hasClass(node, 'health-toc__nav');
}

function assertKnownTree(node, page) {
  if (!node.tagName || isExcluded(node)) return;
  const hasContent = children(node).some((child) => child.nodeName === '#text' ? child.value.trim() : true);
  if (!ALLOWED_TAGS.has(node.tagName) && hasContent) {
    throw new Error(`PROJECTION_TAG_UNSUPPORTED documentId=${page.documentId} tag=${node.tagName} id=${attrs(node).id ?? ''}`);
  }
  for (const child of children(node)) assertKnownTree(child, page);
}

function escapeText(value) {
  const escaped = value.replace(/\\/gu, '\\\\').replace(/([`*_{}\[\]<>|])/gu, '\\$1');
  return escaped
    .replace(/(^|\n)(#{1,6}|>|[-+])(?=\s)/gu, '$1\\$2')
    .replace(/(^|\n)(\d+)([.)])(?=\s)/gu, '$1$2\\$3');
}

function startsPunctuation(value) {
  return /^[\s.,;:!?)}\]]/u.test(value.replace(/^(?:[*_`~]+|\\)+/u, ''));
}

function indentContinuation(value, indent) {
  return value.split('\n').map((line, index) => index === 0 || !line ? line : `${indent}${line}`).join('\n');
}

function inlineText(node, page, canonicalUrl, pre = false) {
  if (node.nodeName === '#text') {
    return pre ? node.value.replace(/\r\n?/gu, '\n') : escapeText(node.value.replace(/\s+/gu, ' '));
  }
  if (!node.tagName || isExcluded(node) || node === page.h1) return '';
  const tag = node.tagName;
  if (!ALLOWED_TAGS.has(tag)) throw new Error(`PROJECTION_TAG_UNSUPPORTED documentId=${page.documentId} tag=${tag} id=${attrs(node).id ?? ''}`);
  const attr = attrs(node);
  if (tag === 'img') {
    if (attr['aria-hidden'] === 'true') return '';
    const src = safeUrl(attr.src, canonicalUrl, true, page);
    return `![${escapeText(attr.alt ?? '')}](<${src}>)`;
  }
  if (tag === 'a') {
    if (!attr.href) throw new Error(`PROJECTION_LINK_MISSING documentId=${page.documentId}`);
    const href = safeUrl(attr.href, canonicalUrl, false, page);
    return `[${renderInlineChildren(node, page, canonicalUrl, pre)}](<${href}>)`;
  }
  if (tag === 'br') return '  \n';
  if (tag === 'wbr') return '';
  if (tag === 'code') {
    const value = children(node).map((child) => child.nodeName === '#text' ? child.value : textOf(child)).join('');
    const fence = '`'.repeat(Math.max(1, ...[...value.matchAll(/`+/gu)].map((match) => match[0].length + 1)));
    return `${fence}${value.includes('`') ? ` ${value} ` : value}${fence}`;
  }
  if (tag === 'sub' || tag === 'sup') return `<${tag}>${renderInlineChildren(node, page, canonicalUrl, pre)}</${tag}>`;
  const content = renderInlineChildren(node, page, canonicalUrl, pre);
  if (tag === 'strong' || tag === 'b') return content ? `**${content}**` : '';
  if (tag === 'em' || tag === 'i') return content ? `*${content}*` : '';
  return content;
}

function safeUrl(raw, base, image, page) {
  if (typeof raw !== 'string' || !raw || /[\u0000-\u001f\u007f]/u.test(raw)) throw new Error(`PROJECTION_URL_INVALID documentId=${page.documentId}`);
  let url;
  try { url = new URL(raw, base); } catch { throw new Error(`PROJECTION_URL_INVALID documentId=${page.documentId}`); }
  const allowed = image ? ['http:', 'https:'] : ['http:', 'https:', 'mailto:', 'tel:'];
  if (!allowed.includes(url.protocol) || url.username || url.password) throw new Error(`PROJECTION_URL_SCHEME documentId=${page.documentId}`);
  return url.href;
}

function renderInlineChildren(node, page, canonicalUrl, pre = false) {
  let result = '';
  let previousNode = null;
  for (const child of children(node)) {
    const rendered = inlineText(child, page, canonicalUrl, pre);
    if (rendered && previousNode && previousNode.tagName && child.tagName &&
        !/\s$/u.test(result) && !startsPunctuation(rendered)) result += ' ';
    result += rendered;
    if (rendered) previousNode = child;
  }
  return result;
}

function containsHeading(node) {
  return nodes(node, (child) => child !== node && /^h[2-6]$/u.test(child.tagName ?? '')).length > 0;
}

function renderLinkedBlocks(anchor, page, canonicalUrl, href) {
  const blocks = [];
  let inline = [];
  const flush = () => {
    const value = compactInline(inline.join(''));
    if (value) blocks.push(`[${value}](<${href}>)`);
    inline = [];
  };
  const visit = (node) => {
    if (node.nodeName === '#text') { inline.push(escapeText(node.value.replace(/\s+/gu, ' '))); return; }
    if (!node.tagName || isExcluded(node)) return;
    if (/^h[2-6]$/u.test(node.tagName)) {
      flush();
      blocks.push(`${'#'.repeat(Number(node.tagName[1]))} [${compactInline(renderInlineChildren(node, page, canonicalUrl))}](<${href}>)`);
      return;
    }
    if (node.tagName === 'img') {
      flush();
      blocks.push(`[${inlineText(node, page, canonicalUrl)}](<${href}>)`);
      return;
    }
    if (containsHeading(node)) {
      flush();
      for (const child of children(node)) visit(child);
      return;
    }
    if (BLOCK_TAGS.has(node.tagName)) {
      flush();
      const value = renderBlock(node, page, canonicalUrl);
      if (value) blocks.push(node.tagName === 'p' ? `[${value}](<${href}>)` : value);
      return;
    }
    inline.push(inlineText(node, page, canonicalUrl));
  };
  for (const child of children(anchor)) visit(child);
  flush();
  return blocks.join('\n\n');
}

function compactInline(value) {
  const hardBreak = '\u0000';
  return value.replace(/[ \t]{2,}\n/gu, `${hardBreak}\n`)
    .replace(/[ \t]+/gu, ' ')
    .replaceAll(`${hardBreak}\n`, '  \n')
    .trim();
}

function renderList(node, page, canonicalUrl) {
  const ordered = node.tagName === 'ol';
  const start = Number.parseInt(attrs(node).start ?? '1', 10);
  let index = Number.isFinite(start) && start > 0 ? start : 1;
  const rows = [];
  // Indent nested lists exactly once: the parent list item adds the marker
  // continuation indent when it embeds this list block.
  const indent = '';
  for (const item of children(node).filter((child) => child.tagName === 'li')) {
    const nested = children(item).filter((child) => child.tagName === 'ul' || child.tagName === 'ol');
    const blocks = [];
    let inline = [];
    let previousInlineNode = null;
    const flushInline = () => {
      const value = compactInline(inline.join(''));
      if (value) blocks.push(value);
      inline = [];
      previousInlineNode = null;
    };
    for (const child of children(item)) {
      const containsNestedStructure = child.tagName && nodes(child, (descendant) =>
        descendant.tagName === 'table' || descendant.tagName === 'pre' || descendant.tagName === 'ul' || descendant.tagName === 'ol').length > 0;
      const blockChild = Boolean(child.tagName && (
        BLOCK_TAGS.has(child.tagName) && (!['div', 'section'].includes(child.tagName) || containsHeading(child) || containsNestedStructure) ||
        child.tagName === 'a' && (containsHeading(child) || /(?:^|\s)block(?:\s|$)/u.test(attrs(child).class ?? ''))
      ));
      if (nested.includes(child)) {
        flushInline();
        const value = renderList(child, page, canonicalUrl);
        if (value) blocks.push(value);
      } else if (blockChild) {
        flushInline();
        const value = renderBlock(child, page, canonicalUrl);
        if (value) blocks.push(value);
      } else {
        const value = child.nodeName === '#text' ? escapeText(child.value.replace(/\s+/gu, ' ')) : inlineText(child, page, canonicalUrl);
        const precedingVisualMarker = previousInlineNode?.tagName === 'span' && /(?:^|\s)absolute(?:\s|$)/u.test(attrs(previousInlineNode).class ?? '');
        if (value && previousInlineNode?.tagName && (child.tagName || precedingVisualMarker) && !/\s$/u.test(inline.join('')) && !startsPunctuation(value)) inline.push(' ');
        if (value) { inline.push(value); previousInlineNode = child; }
      }
    }
    flushInline();
    const marker = ordered ? `${index}.` : '-';
    if (blocks.length) {
      const first = blocks.shift();
      const blockIndent = `${indent}${' '.repeat(marker.length + 1)}`;
      const itemLines = [`${indent}${marker} ${indentContinuation(first, blockIndent)}`];
      for (const block of blocks) itemLines.push(`${blockIndent}${indentContinuation(block, blockIndent)}`);
      rows.push(itemLines.join('\n\n'));
    } else rows.push(`${indent}${marker}`);
    index += 1;
  }
  return rows.join('\n');
}

function renderTable(node, page, canonicalUrl) {
  const caption = children(node).find((child) => child.tagName === 'caption');
  const rows = nodes(node, (child) => child.tagName === 'tr').map((row) => children(row).filter((cell) => cell.tagName === 'th' || cell.tagName === 'td'));
  if (!rows.length) throw new Error(`PROJECTION_TABLE_EMPTY documentId=${page.documentId}`);
  for (const row of rows) for (const cell of row) {
    const attr = attrs(cell);
    if ((attr.colspan && attr.colspan !== '1') || (attr.rowspan && attr.rowspan !== '1')) throw new Error(`PROJECTION_TABLE_SPAN documentId=${page.documentId}`);
  }
  const headerIndex = rows.findIndex((row) => row.some((cell) => cell.tagName === 'th'));
  const actualHeader = headerIndex === -1 ? 0 : headerIndex;
  const width = rows[actualHeader].length;
  if (!width || rows.some((row) => row.length !== width)) throw new Error(`PROJECTION_TABLE_SHAPE documentId=${page.documentId}`);
  const formatRow = (row) => `| ${row.map((cell) => compactInline(renderInlineChildren(cell, page, page.canonicalUrl)).replace(/\s*\n\s*/gu, '<br>')).join(' | ')} |`;
  const lines = [];
  if (caption) lines.push(renderInlineChildren(caption, page, page.canonicalUrl));
  lines.push(formatRow(rows[actualHeader]));
  lines.push(`| ${Array.from({ length: width }, () => '---').join(' | ')} |`);
  rows.forEach((row, index) => { if (index !== actualHeader) lines.push(formatRow(row)); });
  return lines.join('\n');
}

function renderAside(node, page, canonicalUrl) {
  const rendered = renderChildren(node, page, canonicalUrl);
  return rendered;
}

function renderBlock(node, page, canonicalUrl) {
  if (node.nodeName === '#text') return compactInline(escapeText(node.value));
  if (page.specialRender) {
    const replacement = page.specialRender(node);
    if (replacement !== null) return replacement;
  }
  if (!node.tagName || isExcluded(node) || node === page.h1) return '';
  const tag = node.tagName;
  if (!ALLOWED_TAGS.has(tag)) throw new Error(`PROJECTION_TAG_UNSUPPORTED documentId=${page.documentId} tag=${tag} id=${attrs(node).id ?? ''}`);
  if (tag === 'a' && containsHeading(node)) {
    const href = attrs(node).href;
    if (!href) throw new Error(`PROJECTION_LINK_MISSING documentId=${page.documentId}`);
    return renderLinkedBlocks(node, page, canonicalUrl, safeUrl(href, canonicalUrl, false, page));
  }
  if (tag === 'h1') return '';
  if (/^h[2-6]$/u.test(tag)) return `${'#'.repeat(Number(tag[1]))} ${compactInline(renderInlineChildren(node, page, canonicalUrl))}`;
  if (tag === 'p') return compactInline(renderInlineChildren(node, page, canonicalUrl));
  if (tag === 'ul' || tag === 'ol') return renderList(node, page, canonicalUrl);
  if (tag === 'table') return renderTable(node, page, canonicalUrl);
  if (tag === 'hr') return '---';
  if (tag === 'pre') {
    const code = nodes(node, (child) => child.tagName === 'code')[0];
    const value = code ? children(code).map((child) => child.nodeName === '#text' ? child.value : textOf(child)).join('') : children(node).map((child) => child.value ?? '').join('');
    const fence = '`'.repeat(Math.max(3, ...[...value.matchAll(/`+/gu)].map((match) => match[0].length + 1)));
    const lang = (attrs(code ?? {}).class ?? '').split(/\s+/u).find((name) => /^language-[a-z0-9_-]+$/iu.test(name))?.slice(9) ?? '';
    const normalized = value.replace(/\r\n?/gu, '\n');
    return `${fence}${lang}\n${normalized}\n${fence}`;
  }
  if (tag === 'blockquote') {
    const content = renderChildren(node, page, canonicalUrl);
    return content.split('\n').map((line) => line ? `> ${line}` : '>').join('\n');
  }
  if (tag === 'aside') return renderAside(node, page, canonicalUrl);
  if (tag === 'figure') {
    const image = nodes(node, (child) => child.tagName === 'img')[0];
    const caption = nodes(node, (child) => child.tagName === 'figcaption')[0];
    const parts = [];
    if (image) parts.push(inlineText(image, page, canonicalUrl));
    if (caption) parts.push(renderBlock(caption, page, canonicalUrl));
    return parts.filter(Boolean).join('\n\n');
  }
  if (tag === 'img') return inlineText(node, page, canonicalUrl);
  if (tag === 'details') {
    const summary = children(node).find((child) => child.tagName === 'summary');
    const prompt = summary ? `**${compactInline(renderInlineChildren(summary, page, canonicalUrl))}**` : '';
    const response = renderChildren(node, page, canonicalUrl, new Set(summary ? [summary] : []));
    return [prompt, response].filter(Boolean).join('\n\n');
  }
  if (tag === 'summary') return `**${compactInline(renderInlineChildren(node, page, canonicalUrl))}**`;
  if (tag === 'dl') {
    return children(node).filter((child) => child.tagName === 'dt' || child.tagName === 'dd')
      .map((child) => child.tagName === 'dt' ? `**${compactInline(renderInlineChildren(child, page, canonicalUrl))}**` : renderChildren(child, page, canonicalUrl))
      .filter(Boolean).join('\n\n');
  }
  if (tag === 'dt') return `**${compactInline(renderInlineChildren(node, page, canonicalUrl))}**`;
  if (tag === 'dd') return renderChildren(node, page, canonicalUrl);
  if (tag === 'li') return compactInline(renderInlineChildren(node, page, canonicalUrl));
  if (tag === 'br') return '  \n';
  if (INLINE_TAGS.has(tag)) return compactInline(inlineText(node, page, canonicalUrl));
  if (tag === 'picture') {
    const image = nodes(node, (child) => child.tagName === 'img')[0];
    return image ? inlineText(image, page, canonicalUrl) : '';
  }
  if (BLOCK_TAGS.has(tag) || ['span', 'time', 'small', 'mark', 'abbr', 'sup', 'sub', 'u', 's', 'del', 'ins'].includes(tag)) {
    return renderChildren(node, page, canonicalUrl);
  }
  return '';
}

function renderChildren(node, page, canonicalUrl, skip = new Set()) {
  const blocks = [];
  let inline = [];
  let previousInlineNode = null;
  const flush = () => {
    const text = compactInline(inline.join(''));
    if (text) blocks.push(text);
    inline = [];
    previousInlineNode = null;
  };
  for (const child of children(node)) {
    if (skip.has(child)) continue;
    if (child.nodeName === '#text') {
      const rendered = escapeText(child.value.replace(/\s+/gu, ' '));
      if (rendered.trim() && previousInlineNode?.tagName && !/\s$/u.test(inline.join('')) && !startsPunctuation(rendered)) inline.push(' ');
      if (rendered.trim()) inline.push(rendered);
      previousInlineNode = child;
      continue;
    }
    if (child.tagName && (BLOCK_TAGS.has(child.tagName) || child.tagName === 'a' && containsHeading(child))) {
      flush();
      const rendered = renderBlock(child, page, canonicalUrl);
      if (rendered) blocks.push(rendered);
    } else {
      const rendered = renderBlock(child, page, canonicalUrl);
      if (rendered && previousInlineNode?.tagName && !/\s$/u.test(inline.join('')) && !startsPunctuation(rendered)) inline.push(' ');
      inline.push(rendered);
      if (rendered) previousInlineNode = child;
    }
  }
  flush();
  return blocks.join('\n\n');
}

function toolReplacements(page) {
  return page.documentId === 'tool--calidad-vida' ? {
    widget: 'qol-widget',
    selectors: [
      ['qol-intro', '#qol-intro'],
      ['qol-static', '#qol-result-box > p.mt-4.text-xs.font-light'],
      ['qol-anti-guilt', '#qol-result > .qol-anti-guilt'],
    ],
  } : page.documentId === 'tool--movilidad' ? {
    widget: 'm5widget',
    selectors: [
      ['m5s0', '#m5s0'],
      ['m5alert', '#m5alert[role=alert]'],
      ['m5limit', '#m5s3 > p:last-of-type'],
    ],
  } : null;
}

function projectToolMain(root, page, h1) {
  const spec = toolReplacements(page);
  if (!spec) return renderBlock(root, page, page.canonicalUrl);
  const widgets = byId(root, spec.widget);
  const widget = exactOne(widgets, page, `#${spec.widget}`);
  const selected = spec.selectors.map(([name, selector]) => {
    let matches;
    if (selector === '#qol-result-box > p.mt-4.text-xs.font-light') {
      matches = nodes(widget, (node) => node.tagName === 'p' && hasClass(node, 'mt-4', 'text-xs', 'font-light') &&
        node.parentNode?.tagName === 'div' && attrs(node.parentNode).id === 'qol-result-box');
    } else if (selector === '#qol-result > .qol-anti-guilt') {
      matches = nodes(widget, (node) => hasClass(node, 'qol-anti-guilt') && node.parentNode && attrs(node.parentNode).id === 'qol-result');
    } else if (selector === '#m5alert[role=alert]') {
      matches = nodes(widget, (node) => attrs(node).id === 'm5alert' && attrs(node).role === 'alert');
    } else if (selector === '#m5s3 > p:last-of-type') {
      const s3 = exactOne(byId(widget, 'm5s3'), page, '#m5s3');
      const paragraphs = children(s3).filter((node) => node.tagName === 'p');
      matches = paragraphs.slice(-1);
    } else matches = byId(widget, name);
    return [name, exactOne(matches, page, selector)];
  });
  const replacements = new Map(selected.map(([name, node]) => [node, name]));
  const renderSelected = (name, node) => {
    page.specialRender = null;
    try {
      const rendered = renderBlock(node, page, page.canonicalUrl);
      if (name === 'm5alert') return `Aviso condicional de la interfaz para nivel severo:\n\n${rendered}`;
      return rendered;
    } finally {
      page.specialRender = renderNode;
    }
  };
  const renderNode = (node) => {
    if (replacements.has(node)) {
      return renderSelected(replacements.get(node), node);
    }
    if (attrs(node).id === spec.widget) return selected.map(([name, selectedNode]) => renderSelected(name, selectedNode)).filter(Boolean).join('\n\n');
    return null;
  };
  const previous = page.specialRender;
  page.specialRender = renderNode;
  try { return renderBlock(root, page, page.canonicalUrl); }
  finally { page.specialRender = previous; }
}

export function projectDocument(page, htmlBytes) {
  const document = parseHtml(Buffer.from(htmlBytes).toString('utf8'));
  const allH1 = nodes(document, (node) => node.tagName === 'h1');
  const h1 = exactOne(allH1, page, 'document h1');
  const title = textOf(h1);
  if (!title || title !== page.title) throw new Error(`PROJECTION_H1_MISMATCH documentId=${page.documentId}`);
  page.h1 = h1;
  const metadata = canonicalAndMainMetadata(document, page);
  const roots = selectProfile(document, page, h1);
  for (const root of roots) assertKnownTree(root, page);
  const pieces = [];
  for (const root of roots) {
    let piece;
    if (toolReplacements(page) && root.tagName === 'main') piece = projectToolMain(root, page, h1);
    else piece = renderBlock(root, page, page.canonicalUrl);
    if (piece) pieces.push(piece);
  }
  delete page.h1;
  const escapeTitle = escapeText(title);
  const lines = [
    `# ${escapeTitle}`,
    '',
    `> URL canónica: [${page.canonicalUrl}](<${page.canonicalUrl}>)`,
    '> Idioma: es',
  ];
  if (metadata.datePublished !== null) lines.push(`> Publicación: ${metadata.datePublished}`);
  if (metadata.dateModified !== null) lines.push(`> Modificación editorial: ${metadata.dateModified}`);
  lines.push('', ...pieces);
  const markdown = `${lines.join('\n').trimEnd()}\n`;
  return { markdown: Buffer.from(markdown, 'utf8'), metadata };
}
