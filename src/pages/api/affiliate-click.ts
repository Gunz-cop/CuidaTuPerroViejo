import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import {
  classifyEnvironment,
  countryFromRequest,
  findPlacement,
  isSameOrigin,
  recordAffiliateClick,
  utcDay,
} from '../../lib/affiliate/clicks';
import { hashIp } from '../../lib/contact/security';

export const prerender = false;

const MAX_REQUEST_BYTES = 256;

const reply = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

/**
 * Cuenta una activación del CTA de una ficha afiliada. Lo envía el navegador con
 * `sendBeacon` mientras abre el enlace del comercio, así que nunca bloquea la
 * navegación: si esto falla, el lector llega igual a la tienda.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isSameOrigin(request)) return reply(403);

    const text = await request.text();
    if (text.length > MAX_REQUEST_BYTES) return reply(413);

    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return reply(400);
    }
    if (typeof body !== 'object' || body === null) return reply(400);
    const placement = findPlacement((body as Record<string, unknown>).placement);
    if (!placement) return reply(400);

    if (env.CLICK_LIMIT) {
      // La clave es una huella efímera solo para limitar ráfagas; no se guarda.
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const key = await hashIp(ip, `${env.CONTACT_IP_HASH_SALT || 'click-rate-limit'}:affiliate`);
      const outcome = await env.CLICK_LIMIT.limit({ key });
      if (!outcome.success) return reply(429);
    }

    await recordAffiliateClick(env.CONTACT_DB, {
      day: utcDay(),
      placement,
      country: countryFromRequest(request),
      environment: classifyEnvironment(request.url),
    });
    return reply(204);
  } catch (error) {
    console.error(JSON.stringify({ event: 'affiliate_click_failed', error: error instanceof Error ? error.message : String(error) }));
    // Una métrica perdida no debe mostrarse como error al visitante.
    return reply(204);
  }
};
