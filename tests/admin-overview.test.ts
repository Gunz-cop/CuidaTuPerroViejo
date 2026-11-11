import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { overviewQueries, loadOverview } from '../src/lib/admin/overview';
import { requireAdmin } from '../src/lib/admin/access';

const now = new Date('2026-11-11T00:00:01Z');
test('agregados SQL reales: límites UTC, producción, consultas repetidas y moderación', () => {
  const q = overviewQueries(now);
  assert.equal(q.since7, '2026-11-05');
  assert.equal(q.since30, '2026-10-13');
  const script = `
import sqlite3,json,sys
q=json.load(sys.stdin)
db=sqlite3.connect(':memory:'); db.row_factory=sqlite3.Row
for file in ['migrations/0001_contact_messages.sql','migrations/0003_assistant_metrics.sql','migrations/0004_affiliate_clicks.sql']:
    db.executescript(open(file).read())
for day,n,env in [('2026-11-11',2,'produccion'),('2026-11-05',3,'produccion'),('2026-11-04',7,'produccion'),('2026-10-13',11,'produccion'),('2026-10-12',100,'produccion'),('2026-11-12',100,'produccion'),('2026-11-11',100,'prueba')]:
    db.execute("INSERT INTO affiliate_clicks_daily(day,placement,provider,page,country,environment,clicks) VALUES (?, 'a','aliexpress','/a','ES',?,?)",(day,env,n))
for i,day in enumerate(['2026-11-11','2026-11-05','2026-11-04','2026-10-13','2026-10-12','2026-11-12']):
    db.execute("INSERT INTO assistant_interactions(id,day,visitor_hash,conversation_id,surface,source) VALUES (?,?,'same','same','chat','workers-ai')",(str(i),day))
for status in ['quarantine','quarantine','allowed','rejected']:
    db.execute("INSERT INTO contact_messages(name,email,subject,message,status,created_at) VALUES ('x','x@y.es','x','x',?,'2026-01-01')",(status,))
print(json.dumps({k:dict(db.execute(q[k]['sql'],q[k]['values']).fetchone()) for k in ['affiliate','assistant','messages']}))
`;
  const result = JSON.parse(execFileSync('python3', ['-c', script], { input: JSON.stringify(q), encoding: 'utf8' }));
  assert.deepEqual(result, { affiliate: {days7:5, days30:23}, assistant: {days7:2, days30:4}, messages: {quarantine:2} });
});

test('sin binding y fallos parciales nunca se convierten en ceros ni filtran errores SQL', async () => {
  const missing = await loadOverview(undefined, now);
  assert.equal(missing.affiliate.data, null);
  const db = { prepare(sql: string) { return { bind() { return { async first() {
    if (sql.includes('affiliate')) throw new Error('secret SQL error');
    return sql.includes('assistant') ? { days7: 0, days30: 0 } : { quarantine: 0 };
  } }; } }; } } as unknown as D1Database;
  const result = await loadOverview(db, now);
  assert.equal(result.affiliate.data, null);
  assert.doesNotMatch(result.affiliate.error!, /secret/);
  assert.deepEqual(result.assistant.data, {days7:0, days30:0});
  assert.equal(result.messages.data?.quarantine, 0);
});

const request = (authorization?: string) => new Request('https://example.com/admin', {headers: authorization ? {authorization} : {}});
const basic = 'Basic ' + btoa('admin:fixture');
test('autenticación cerrada sin secretos, inválida, ausente y válida', async () => {
  for (const header of [undefined, 'Basic invalid!', 'Bearer x', 'Basic ' + btoa('admin:wrong')]) {
    const response = await requireAdmin(request(header), {CONTACT_ADMIN_USER:'admin', CONTACT_ADMIN_PASSWORD:'fixture'});
    assert.equal(response?.status, 401);
    assert.match(response!.headers.get('Cache-Control')!, /no-store/);
    assert.ok(response!.headers.get('WWW-Authenticate'));
  }
  assert.equal((await requireAdmin(request(basic), {}))?.status,401);
  assert.equal(await requireAdmin(request(basic), {CONTACT_ADMIN_USER:'admin',CONTACT_ADMIN_PASSWORD:'fixture'}), null);
});
test('rate limit bloquea y falla de forma cerrada', async () => {
  for (const broken of [false, true]) {
    const ADMIN_LIMIT = {async limit() { if (broken) throw Error('down'); return {success:false}; }} as RateLimit;
    const response = await requireAdmin(request(basic), {ADMIN_LIMIT});
    assert.equal(response?.status, broken ? 503 : 429);
    assert.match(response!.headers.get('Cache-Control')!, /no-store/);
  }
});
test('portada dinámica autentica antes de D1; /admin exacto evita caché', () => {
  const page = readFileSync('src/pages/admin/index.astro','utf8');
  assert.match(page, /prerender = false/);
  assert.ok(page.indexOf('if (denied) return denied') < page.indexOf('await loadOverview'));
  const middleware = readFileSync('src/middleware.ts','utf8');
  assert.match(middleware, /url.pathname === '\/admin'/);
});

test('configuración privada: Worker primero para /admin y exclusión del sitemap', () => {
  const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
  assert.ok(config.assets.run_worker_first.includes('/admin'));
  assert.ok(config.assets.run_worker_first.includes('/admin/*'));
  assert.match(readFileSync('astro.config.mjs', 'utf8'), /pathname === '\/admin'/);
});
