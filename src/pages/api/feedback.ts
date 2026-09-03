import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { hashIp } from '../../lib/contact/security';

export const prerender = false;

type FeedbackKind = 'yes' | 'no';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const readCount = async (db: D1Database, slug: string, kind: FeedbackKind): Promise<number> => {
  const row = await db
    .prepare('SELECT n FROM feedback_counts WHERE slug = ? AND kind = ?')
    .bind(slug, kind)
    .first<{ n: number | string }>();

  const count = row?.n === undefined ? 0 : Number.parseInt(String(row.n), 10);
  return Number.isFinite(count) ? count : 0;
};

// GET: Obtiene las estadísticas de feedback para un artículo
export const GET: APIRoute = async ({ request }) => {
  try {
    const slug = new URL(request.url).searchParams.get('slug')?.trim();
    if (!slug) return json({ error: 'Falta el parámetro slug.' }, 400);

    const db = env.CONTACT_DB;
    if (!db) return json({ error: 'El almacenamiento de feedback no está configurado.' }, 503);

    const [yes, no] = await Promise.all([
      readCount(db, slug, 'yes'),
      readCount(db, slug, 'no'),
    ]);

    return json({ yes, no });
  } catch (error) {
    console.error('SDI Feedback GET Error:', error);
    return json({ error: 'Error interno del servidor.' }, 500);
  }
};

// POST: Registra un voto para un artículo (útil o no útil)
export const POST: APIRoute = async ({ request }) => {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Cuerpo de petición inválido. Debe ser JSON.' }, 400);
    }

    const slug = typeof body === 'object' && body !== null && 'slug' in body
      ? (body as { slug?: unknown }).slug
      : undefined;
    const type = typeof body === 'object' && body !== null && 'type' in body
      ? (body as { type?: unknown }).type
      : undefined;

    if (typeof slug !== 'string' || !slug.trim() || (type !== 'yes' && type !== 'no')) {
      return json({ error: 'Parámetros inválidos. Se requiere "slug" y "type" ("yes" o "no").' }, 400);
    }

    const normalizedSlug = slug.trim();
    const kind = type as FeedbackKind;
    const db = env.CONTACT_DB;
    if (!db) return json({ error: 'El almacenamiento de feedback no está configurado.' }, 503);

    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const ipHash = await hashIp(ip, env.CONTACT_IP_HASH_SALT || 'feedback-rate-limit');
    const vote = await db
      .prepare(
        `INSERT INTO feedback_votes (slug, kind, ip_hash)
         VALUES (?, ?, ?)
         ON CONFLICT(slug, kind, ip_hash) DO NOTHING`,
      )
      .bind(normalizedSlug, kind, ipHash)
      .run();

    if (Number(vote.meta.changes ?? 0) > 0) {
      await db
        .prepare(
          `INSERT INTO feedback_counts (slug, kind, n) VALUES (?, ?, 1)
           ON CONFLICT(slug, kind) DO UPDATE SET n = n + 1`,
        )
        .bind(normalizedSlug, kind)
        .run();
    }

    const count = await readCount(db, normalizedSlug, kind);
    console.log(`SDI Feedback: ${vote.meta.changes ? 'Registrado' : 'Duplicado'} voto "${kind}" para ${normalizedSlug}. Total: ${count}`);
    return json({ success: true, count });
  } catch (error) {
    console.error('SDI Feedback POST Error:', error);
    return json({ error: 'Error interno del servidor.' }, 500);
  }
};
