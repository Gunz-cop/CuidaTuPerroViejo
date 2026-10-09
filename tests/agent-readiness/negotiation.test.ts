import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createAgentContentWorker,
  loadAgentIndex,
  negotiateAccept,
  validateAgentIndex,
  type AgentIndex,
  type AgentDocument,
} from '../../src/lib/agent-content/runtime';

const HEX = 'a'.repeat(64);

async function indexFor(documents: AgentDocument[]): Promise<AgentIndex> {
  const rows = documents.map((doc) => [doc.documentId, doc.canonicalPath, doc.markdownSha256]);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(rows)));
  const corpusSha256 = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return { schemaVersion: 'agent-content/1', siteOrigin: 'https://cuidatuperroviejo.com', language: 'es', corpusSha256, documents };
}

function document(documentId = 'home', canonicalPath = '/'): AgentDocument {
  return {
    documentId,
    kind: documentId === 'home' ? 'home' : 'article',
    title: 'Título',
    description: 'Descripción',
    canonicalPath,
    canonicalUrl: `https://cuidatuperroviejo.com${canonicalPath}`,
    markdownPath: `/agent-content/v1/documents/${documentId}.md`,
    language: 'es',
    datePublished: null,
    dateModified: null,
    htmlSha256: HEX,
    markdownSha256: HEX,
    markdownBytes: 8,
  };
}

async function conditionalHarness(options: {
  htmlEtag?: string | null;
  markdownEtag?: string | null;
  respond?: (request: Request, etag: string | null) => Response | undefined;
} = {}) {
  const index = await indexFor([document()]);
  const seen: Request[] = [];
  const htmlEtag = Object.hasOwn(options, 'htmlEtag') ? options.htmlEtag ?? null : '"html-v1"';
  const markdownEtag = Object.hasOwn(options, 'markdownEtag') ? options.markdownEtag ?? null : '"md-v1"';
  const assets = {
    fetch: async (input: Request | string) => {
      const request = input instanceof Request ? input : new Request(input);
      seen.push(request);
      if (new URL(request.url).pathname === '/agent-content/v1/index.json') return Response.json(index);
      const markdown = new URL(request.url).pathname.endsWith('.md');
      const etag = markdown ? markdownEtag : htmlEtag;
      const overridden = options.respond?.(request, etag);
      if (overridden) return overridden;
      const body = markdown ? '# Título\n' : '<h1>Título</h1>';
      const headers = new Headers({ Vary: 'Accept-Encoding', 'Content-Length': String(new TextEncoder().encode(body).byteLength) });
      if (etag !== null) headers.set('ETag', etag);
      return new Response(request.method === 'HEAD' ? null : body, { headers });
    },
  } as unknown as Fetcher;
  const worker = createAgentContentWorker(async () => new Response('delegated'));
  return { worker, env: { ASSETS: assets } as Env, context: {} as ExecutionContext, seen };
}

const acceptCases: Array<[string | undefined, 'html' | 'markdown' | 400 | 406]> = [
  [undefined, 'html'], ['', 'html'], ['  \t', 'html'], ['*/*', 'html'], ['text/*', 'html'],
  ['text/markdown', 'markdown'], ['TEXT/MARKDOWN;q=1', 'markdown'],
  ['text/html,text/markdown', 'html'],
  ['text/html;q=0.4,text/markdown;q=0.8', 'markdown'],
  ['text/html;q=0.9,text/markdown;q=0.2', 'html'],
  ['text/markdown;q=0,*/*;q=1', 'html'], ['text/html;q=0,*/*;q=1', 'markdown'],
  ['text/html;q=0,text/markdown;q=0', 406], ['application/json', 406],
  ['application/json,*/*;q=0.5', 'html'],
  ['text/markdown;q=1.1', 400], ['text/markdown;q=.8,text/html', 'html'],
  ['text/markdown;q=0.1234', 400], ['text/markdown;q=0.2;q=1', 400],
  ['text/markdown;q=0.2,text/markdown;q=0.9,text/html;q=0.5', 'markdown'],
  ['text/html;q=0.2,text/*;q=0.9', 'markdown'],
  ['text/markdown;charset=utf-8', 406],
  ['text/markdown;q=1;ext="a,b"', 'markdown'],
  ['text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'html'],
  ['garbage,text/markdown', 'markdown'],
  ['text/html;q=1,text/markdown;q=1', 'html'],
  ['text/html;q=1,text/markdown;q=0.1;foo="x,y"', 'html'],
  ['text/html;q=1,text/markdown;foo=bar;q=1', 'html'],
  ['*/html,text/markdown', 'markdown'], ['text/markdown;q=1;ext', 'markdown'],
];

for (const [header, expected] of acceptCases) {
  test(`Accept ${JSON.stringify(header)} selects ${expected}`, () => {
    const result = negotiateAccept(header);
    if (expected === 400 || expected === 406) assert.deepEqual(result, { ok: false, status: expected });
    else assert.deepEqual(result, { ok: true, representation: expected });
  });
}

test('Accept enforces 8192 ASCII bytes and rejects non-ASCII', () => {
  assert.deepEqual(negotiateAccept(`text/html,${' '.repeat(8190)}`), { ok: false, status: 400 });
  assert.deepEqual(negotiateAccept(`text/html,${' '.repeat(8182)}`), { ok: true, representation: 'html' });
  assert.deepEqual(negotiateAccept('text/markdown,ñ'), { ok: false, status: 400 });
});

test('closed index schema accepts a valid index and rejects unsafe or inconsistent entries', async () => {
  const valid = await indexFor([document()]);
  assert.equal((await validateAgentIndex(valid)).documents[0]?.canonicalPath, '/');
  await assert.rejects(validateAgentIndex({ ...valid, privateField: true }), /INDEX_SCHEMA/u);
  await assert.rejects(validateAgentIndex(await indexFor([{ ...document(), markdownPath: '/elsewhere.md' }])), /DOCUMENT_MARKDOWN_PATH/u);
  await assert.rejects(validateAgentIndex(await indexFor([{ ...document(), canonicalPath: '/a/%2e%2e/b', canonicalUrl: 'https://cuidatuperroviejo.com/a/%2e%2e/b' }])), /DOCUMENT_CANONICAL_PATH/u);
  await assert.rejects(validateAgentIndex({ ...valid, corpusSha256: HEX }), /INDEX_CORPUS_MISMATCH/u);
  const tooMany = await indexFor(Array.from({ length: 99 }, (_, i) => document(`article--doc-${String(i).padStart(3, '0')}`, `/doc-${i}`)));
  await assert.rejects(validateAgentIndex(tooMany), /INDEX_DOCUMENT_COUNT/u);
  const duplicate = await indexFor([document('article--one', '/same'), document('article--two', '/same')]);
  await assert.rejects(validateAgentIndex(duplicate), /DOCUMENT_CANONICAL_PATH/u);
  const overCorpus = await indexFor(Array.from({ length: 33 }, (_, i) => ({
    ...document(`article--large-${String(i).padStart(2, '0')}`, `/large-${i}`),
    markdownBytes: 512 * 1024,
  })));
  await assert.rejects(validateAgentIndex(overCorpus), /DOCUMENT_CORPUS_SIZE/u);
});

test('index lookup coalesces concurrent loads and only retains successful indexes', async () => {
  const index = await indexFor([document()]);
  let requests = 0;
  const assets = { fetch: async () => { requests += 1; await new Promise((resolve) => setTimeout(resolve, 5)); return Response.json(index); } } as unknown as Fetcher;
  const [first, second] = await Promise.all([
    loadAgentIndex(assets, 'https://preview.example/'),
    loadAgentIndex(assets, 'https://preview.example/another'),
  ]);
  assert.equal(requests, 1);
  assert.equal(first, second);
  assert.equal(first.byCanonicalPath.get('/'), first.index.documents[0]);

  let attempts = 0;
  const retrying = { fetch: async () => { attempts += 1; return attempts === 1 ? new Response('offline', { status: 503 }) : Response.json(index); } } as unknown as Fetcher;
  await assert.rejects(loadAgentIndex(retrying, 'https://preview.example/'));
  assert.equal((await loadAgentIndex(retrying, 'https://preview.example/')).index.documents.length, 1);
  assert.equal(attempts, 2);
});

test('delegated APIs and methods preserve exact request/env/context and skip index lookup', async () => {
  const calls: unknown[] = [];
  const context = {} as ExecutionContext;
  const env = { ASSETS: { fetch: async () => { throw new Error('should not load the index'); } } } as unknown as Env;
  const handler = async (request: Request, passedEnv: Env, passedContext: ExecutionContext) => {
    calls.push([request, passedEnv, passedContext]);
    return new Response('delegated');
  };
  const worker = createAgentContentWorker(handler);
  const apiRequest = new Request('https://example.test/api/geo');
  assert.equal((await worker(apiRequest, env, context)).status, 200);
  assert.equal((calls[0] as unknown[])[0], apiRequest);
  assert.equal((calls[0] as unknown[])[1], env);
  assert.equal((calls[0] as unknown[])[2], context);
  calls.length = 0;
  const post = new Request('https://example.test/', { method: 'POST', body: 'x' });
  await worker(post, env, context);
  assert.equal((calls[0] as unknown[])[0], post);
  assert.equal(calls.length, 1);
});

test('canonical negotiation uses fixed ASSETS requests, ignores query, adds policy headers, and preserves HEAD', async () => {
  const index = await indexFor([document()]);
  const seen: Request[] = [];
  const assets = {
    fetch: async (input: Request | string) => {
      const request = input instanceof Request ? input : new Request(input);
      seen.push(request);
      if (new URL(request.url).pathname === '/agent-content/v1/index.json') return Response.json(index);
      const markdown = new URL(request.url).pathname.endsWith('.md');
      const etag = markdown ? '"md-v1"' : '"html-v1"';
      if (request.headers.get('If-None-Match') === etag) return new Response(null, { status: 304, headers: { ETag: etag, 'Content-Length': '999', Vary: 'Accept-Encoding' } });
      return new Response(markdown ? '# Título\n' : '<h1>Título</h1>', { headers: { ETag: etag, Vary: 'Accept, Accept-Encoding' } });
    },
  } as unknown as Fetcher;
  const env = { ASSETS: assets } as Env;
  const context = {} as ExecutionContext;
  const worker = createAgentContentWorker(async () => new Response('delegated'));

  const mdRequest = new Request('https://preview.example/?tracking=ignored', {
    headers: { Accept: 'text/markdown', Cookie: 'private=1', Authorization: 'Basic secret' },
  });
  const md = await worker(mdRequest, env, context);
  assert.equal(md.status, 200);
  assert.equal(await md.text(), '# Título\n');
  assert.equal(md.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(md.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(md.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(md.headers.get('Link'), '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"');
  assert.equal(md.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(md.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.equal(md.headers.get('Permissions-Policy'), 'geolocation=(), microphone=(), camera=()');
  assert.equal(md.headers.get('Strict-Transport-Security'), 'max-age=31536000; includeSubDomains');
  assert.equal(seen[0]?.url, 'https://preview.example/agent-content/v1/index.json');
  assert.equal(seen[0]?.headers.has('Cookie'), false);
  assert.equal(seen[0]?.headers.has('Authorization'), false);
  assert.equal(seen[1]?.url, 'https://preview.example/agent-content/v1/documents/home.md');
  assert.equal(seen[1]?.headers.has('Accept'), false);
  assert.equal(seen[1]?.headers.has('Cookie'), false);
  assert.equal(seen[1]?.headers.has('Authorization'), false);
  assert.equal(seen[1]?.headers.has('If-None-Match'), false);

  const head = await worker(new Request('https://preview.example/', { method: 'HEAD', headers: { Accept: 'text/markdown' } }), env, context);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(head.headers.get('ETag'), '"md-v1"');

  const conditional = await worker(new Request('https://preview.example/', { headers: { Accept: 'text/markdown', 'If-None-Match': '"md-v1"' } }), env, context);
  assert.equal(conditional.status, 304);
  assert.equal(await conditional.text(), '');
  assert.equal(conditional.headers.get('ETag'), '"md-v1"');
  assert.equal(conditional.headers.get('Content-Length'), null);
  assert.equal(conditional.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(conditional.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(conditional.headers.get('Link'), '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"');
  assert.equal(conditional.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(seen[3]?.headers.get('If-None-Match'), '"md-v1"');

  const weakList = await worker(new Request('https://preview.example/', { headers: {
    Accept: 'text/markdown', 'If-None-Match': 'W/"md-v1", "other"',
  } }), env, context);
  assert.equal(weakList.status, 304);
  assert.equal(await weakList.text(), '');
  const wildcard = await worker(new Request('https://preview.example/', { headers: {
    Accept: 'text/markdown', 'If-None-Match': '*',
  } }), env, context);
  assert.equal(wildcard.status, 304);

  const crossed = await worker(new Request('https://preview.example/', { headers: {
    Accept: 'text/markdown', 'If-None-Match': '"html-v1"', Range: 'bytes=1-4',
    'If-Range': '"html-v1"', 'If-Modified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT',
  } }), env, context);
  assert.equal(crossed.status, 200);
  assert.equal(await crossed.text(), '# Título\n');
  assert.equal(seen[6]?.headers.get('If-None-Match'), '"html-v1"');
  assert.equal(seen[6]?.headers.has('Range'), false);
  assert.equal(seen[6]?.headers.has('If-Range'), false);
  assert.equal(seen[6]?.headers.has('If-Modified-Since'), false);
});

test('selected HTML and Markdown use their own weak/list/wildcard validators for GET and HEAD', async () => {
  const { worker, env, context, seen } = await conditionalHarness();
  for (const selected of [
    { accept: 'text/html', tag: '"html-v1"', cross: '"md-v1"', body: '<h1>Título</h1>', path: '/' },
    { accept: 'text/markdown', tag: '"md-v1"', cross: '"html-v1"', body: '# Título\n', path: '/agent-content/v1/documents/home.md' },
  ]) {
    const cases: Array<[string | undefined, number]> = [
      [undefined, 200], [selected.tag, 304], [`W/${selected.tag}`, 304], [`"other", W/${selected.tag}`, 304], ['*', 304],
      ['"other"', 200], [selected.cross, 200],
    ];
    for (const method of ['GET', 'HEAD'] as const) {
      for (const [ifNoneMatch, expectedStatus] of cases) {
        const headers = new Headers({ Accept: selected.accept });
        if (ifNoneMatch !== undefined) headers.set('If-None-Match', ifNoneMatch);
        const response = await worker(new Request('https://preview.example/?q=ignored', { method, headers }), env, context);
        assert.equal(response.status, expectedStatus, `${method} ${selected.accept} ${ifNoneMatch ?? '(absent)'}`);
        assert.equal(await response.text(), method === 'HEAD' || expectedStatus === 304 ? '' : selected.body);
        assert.equal(response.headers.get('ETag'), selected.tag);
        assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
        assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept');
        assert.equal(response.headers.get('Link'), '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"');
        assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
        if (expectedStatus === 304) assert.equal(response.headers.get('Content-Length'), null);
        else assert.equal(response.headers.get('Content-Length'), String(new TextEncoder().encode(selected.body).byteLength));
        const internal = seen.at(-1)!;
        assert.equal(new URL(internal.url).pathname, selected.path);
        assert.equal(internal.method, method);
        assert.equal(internal.headers.get('If-None-Match'), ifNoneMatch ?? null);
        assert.equal(internal.headers.has('Range'), false);
        assert.equal(internal.headers.has('If-Range'), false);
        assert.equal(internal.headers.has('If-Modified-Since'), false);
      }
    }
  }
});

test('HTML and Markdown forward only If-None-Match when range and date validators are present', async () => {
  for (const selected of [
    { accept: 'text/html', tag: '"html-v1"', body: '<h1>Título</h1>' },
    { accept: 'text/markdown', tag: '"md-v1"', body: '# Título\n' },
  ]) {
    for (const method of ['GET', 'HEAD'] as const) {
      for (const [ifNoneMatch, expectedStatus] of [['"other"', 200], [selected.tag, 304]] as const) {
        const { worker, env, context, seen } = await conditionalHarness();
        const response = await worker(new Request('https://preview.example/', { method, headers: {
          Accept: selected.accept,
          'If-None-Match': ifNoneMatch,
          Range: 'bytes=1-4',
          'If-Range': selected.tag,
          'If-Modified-Since': 'Wed, 21 Oct 2015 07:28:00 GMT',
        } }), env, context);
        assert.equal(response.status, expectedStatus, `${method} ${selected.accept} ${ifNoneMatch}`);
        assert.equal(await response.text(), method === 'GET' && expectedStatus === 200 ? selected.body : '');
        assert.equal(response.headers.get('ETag'), selected.tag);
        if (expectedStatus === 304) assert.equal(response.headers.get('Content-Length'), null);
        const forwarded = seen.at(-1)!;
        assert.equal(forwarded.headers.get('If-None-Match'), ifNoneMatch);
        assert.equal(forwarded.headers.has('Range'), false);
        assert.equal(forwarded.headers.has('If-Range'), false);
        assert.equal(forwarded.headers.has('If-Modified-Since'), false);
      }
    }
  }
});

test('public HTML without a native ETag still has wildcard existence semantics and never borrows Markdown ETag', async () => {
  const { worker, env, context, seen } = await conditionalHarness({ htmlEtag: null });
  for (const method of ['GET', 'HEAD'] as const) {
    for (const [ifNoneMatch, expectedStatus] of [[undefined, 200], ['*', 304], ['"html-v1"', 200], ['"md-v1"', 200]] as const) {
      const headers = new Headers({ Accept: 'text/html' });
      if (ifNoneMatch !== undefined) headers.set('If-None-Match', ifNoneMatch);
      const response = await worker(new Request('https://preview.example/', { method, headers }), env, context);
      assert.equal(response.status, expectedStatus, `${method} ${ifNoneMatch ?? '(absent)'}`);
      assert.equal(await response.text(), method === 'HEAD' || expectedStatus === 304 ? '' : '<h1>Título</h1>');
      assert.equal(response.headers.get('ETag'), null);
      if (expectedStatus === 304) assert.equal(response.headers.get('Content-Length'), null);
      const internal = seen.at(-1)!;
      assert.equal(internal.headers.get('If-None-Match'), ifNoneMatch ?? null);
    }
  }
});

test('If-None-Match grammar rejects a whole malformed field, permits bounded empty members and commas inside tags', async () => {
  for (const accept of ['text/html', 'text/markdown']) {
    const ownTag = accept === 'text/markdown' ? '"md-v1"' : '"html-v1"';
    for (const malformed of ['', `W/${ownTag}, garbage`, `W/${ownTag.slice(0, -1)}`, `W/${ownTag} garbage`, `*, W/${ownTag}`, `${','.repeat(17)}${ownTag}`]) {
      const { worker, env, context, seen } = await conditionalHarness();
      const response = await worker(new Request('https://preview.example/', { headers: { Accept: accept, 'If-None-Match': malformed } }), env, context);
      assert.equal(response.status, 200, `${accept} ${malformed}`);
      assert.equal(await response.text(), accept === 'text/markdown' ? '# Título\n' : '<h1>Título</h1>');
      assert.equal(seen.at(-1)?.headers.has('If-None-Match'), false);
    }

    const { worker, env, context, seen } = await conditionalHarness();
    const paddedList = await worker(new Request('https://preview.example/', { headers: { Accept: accept, 'If-None-Match': `,, W/${ownTag},,` } }), env, context);
    assert.equal(paddedList.status, 304);
    assert.equal(await paddedList.text(), '');
    assert.equal(seen.at(-1)?.headers.get('If-None-Match'), `,, W/${ownTag},,`);

    const commaTag = '"part,one"';
    const commaHarness = await conditionalHarness(accept === 'text/markdown'
      ? { markdownEtag: commaTag }
      : { htmlEtag: commaTag });
    const commaMatch = await commaHarness.worker(new Request('https://preview.example/', { headers: { Accept: accept, 'If-None-Match': commaTag } }), commaHarness.env, commaHarness.context);
    assert.equal(commaMatch.status, 304, accept);
    assert.equal(commaMatch.headers.get('ETag'), commaTag);
    assert.equal(commaHarness.seen.at(-1)?.headers.get('If-None-Match'), commaTag);
  }
});

test('Markdown without a valid native ETag and an unsolicited or mismatching ASSETS 304 fail closed', async () => {
  for (const method of ['GET', 'HEAD'] as const) {
    const missing = await conditionalHarness({ markdownEtag: null });
    const response = await missing.worker(new Request('https://preview.example/', { method, headers: { Accept: 'text/markdown', 'If-None-Match': '*' } }), missing.env, missing.context);
    assert.equal(response.status, 503);
    assert.equal(await response.text(), method === 'HEAD' ? '' : 'Document representation unavailable.\n');
    assert.equal(response.headers.get('ETag'), null);
  }

  const markdown304WithoutEtag = await conditionalHarness({
    markdownEtag: null,
    respond: (request) => new URL(request.url).pathname.endsWith('.md')
      ? new Response(null, { status: 304 })
      : undefined,
  });
  const missing304 = await markdown304WithoutEtag.worker(new Request('https://preview.example/', { headers: { Accept: 'text/markdown', 'If-None-Match': '*' } }), markdown304WithoutEtag.env, markdown304WithoutEtag.context);
  assert.equal(missing304.status, 503);

  const htmlWildcard304 = await conditionalHarness({
    htmlEtag: null,
    respond: (request) => new URL(request.url).pathname === '/'
      ? new Response(null, { status: 304, headers: { 'Content-Length': '999' } })
      : undefined,
  });
  const nativeWildcard304 = await htmlWildcard304.worker(new Request('https://preview.example/', { headers: { Accept: 'text/html', 'If-None-Match': '*' } }), htmlWildcard304.env, htmlWildcard304.context);
  assert.equal(nativeWildcard304.status, 304);
  assert.equal(await nativeWildcard304.text(), '');
  assert.equal(nativeWildcard304.headers.get('ETag'), null);
  assert.equal(nativeWildcard304.headers.get('Content-Length'), null);

  const absentAsset = await conditionalHarness({
    respond: (request) => new URL(request.url).pathname === '/'
      ? new Response('missing', { status: 404 })
      : undefined,
  });
  const missingAssetWildcard = await absentAsset.worker(new Request('https://preview.example/', { headers: { Accept: 'text/html', 'If-None-Match': '*' } }), absentAsset.env, absentAsset.context);
  assert.equal(missingAssetWildcard.status, 503);
  assert.equal(await missingAssetWildcard.text(), 'Document representation unavailable.\n');

  for (const ifNoneMatch of [undefined, '"not-selected"']) {
    const unexpected = await conditionalHarness({ respond: () => new Response(null, { status: 304, headers: { ETag: '"html-v1"', 'Content-Length': '12' } }) });
    const headers = new Headers({ Accept: 'text/html' });
    if (ifNoneMatch !== undefined) headers.set('If-None-Match', ifNoneMatch);
    const response = await unexpected.worker(new Request('https://preview.example/', { headers }), unexpected.env, unexpected.context);
    assert.equal(response.status, 503);
    assert.equal(await response.text(), 'Document representation unavailable.\n');
    assert.equal(response.headers.get('Content-Length'), null);
    assert.equal(response.headers.get('ETag'), null);
  }
});

test('malformed Accept and unavailable assets produce literal safe errors; unknown paths delegate', async () => {
  const index = await indexFor([document()]);
  const assets = {
    fetch: async (input: Request | string) => {
      const request = input instanceof Request ? input : new Request(input);
      if (new URL(request.url).pathname === '/agent-content/v1/index.json') return Response.json(index);
      return new Response('missing', { status: 404, headers: { 'Set-Cookie': 'x=1', 'Cloudflare-CDN-Cache-Control': 'public, max-age=60' } });
    },
  } as unknown as Fetcher;
  const worker = createAgentContentWorker(async () => new Response('delegated'));
  const env = { ASSETS: assets } as Env;
  const context = {} as ExecutionContext;
  const bad = await worker(new Request('https://preview.example/', { headers: { Accept: 'text/markdown;q=.8' } }), env, context);
  assert.equal(bad.status, 400);
  assert.equal(await bad.text(), 'Invalid Accept header.\n');
  assert.equal(bad.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(bad.headers.get('Vary'), 'Accept');
  assert.equal((await worker(new Request('https://preview.example/', { headers: { Accept: 'application/json' } }), env, context)).status, 406);
  const broken = await worker(new Request('https://preview.example/', { headers: { Accept: 'text/markdown' } }), env, context);
  assert.equal(broken.status, 503);
  assert.equal(await broken.text(), 'Document representation unavailable.\n');
  assert.equal(broken.headers.get('Set-Cookie'), null);
  assert.equal(broken.headers.get('Cloudflare-CDN-Cache-Control'), 'no-store');
  const unknown = await worker(new Request('https://preview.example/unknown?x=1'), env, context);
  assert.equal(unknown.status, 200);
  assert.equal(await unknown.text(), 'delegated');
});
