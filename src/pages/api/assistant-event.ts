import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { isInteractionId, recordClick, recordFeedback } from '../../lib/assistant/metrics';
import { toSitePath } from '../../lib/assistant/links';

export const prerender = false;

const MAX_REQUEST_BYTES = 1_024;

const reply = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

/**
 * Señales de uso del asistente: clic en una guía recomendada y voto de utilidad.
 * Solo se aceptan sobre una consulta que exista, así que no sirve para escribir
 * datos arbitrarios.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const text = await request.text();
    if (text.length > MAX_REQUEST_BYTES) return reply(413);

    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return reply(400);
    }
    if (typeof body !== 'object' || body === null) return reply(400);
    const { id, type, value, href } = body as Record<string, unknown>;
    if (!isInteractionId(id)) return reply(400);

    const db = env.CONTACT_DB;
    if (!db) return reply(204);

    if (type === 'feedback' && (value === 'up' || value === 'down')) {
      await recordFeedback(db, id, value);
      return reply(204);
    }
    if (type === 'click' && typeof href === 'string' && href.length <= 200) {
      const path = toSitePath(href);
      if (!path) return reply(400);
      await recordClick(db, id, path);
      return reply(204);
    }
    return reply(400);
  } catch (error) {
    console.error(JSON.stringify({ event: 'assistant_event_failed', error: error instanceof Error ? error.message : String(error) }));
    // Una métrica perdida no debe mostrarse como error al visitante.
    return reply(204);
  }
};
