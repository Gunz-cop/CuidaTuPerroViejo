import { hashIp, hasValidBasicAuth, unauthorizedResponse } from '../contact/security';

type AdminBindings = Partial<Pick<Cloudflare.Env, 'ADMIN_LIMIT' | 'CONTACT_ADMIN_USER' | 'CONTACT_ADMIN_PASSWORD' | 'CONTACT_IP_HASH_SALT'>>;
export const privateHeaders = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'Referrer-Policy': 'no-referrer',
};

/** Misma autenticación y límite que los paneles existentes; antes de leer D1. */
export async function requireAdmin(request: Request, env: AdminBindings): Promise<Response | null> {
  if (env.ADMIN_LIMIT) {
    try {
      const key = await hashIp(request.headers.get('cf-connecting-ip') || 'unknown', env.CONTACT_IP_HASH_SALT || 'admin-rate-limit');
      const outcome = await env.ADMIN_LIMIT.limit({ key });
      if (!outcome.success) return new Response('Demasiadas solicitudes. Inténtalo de nuevo en un minuto.', {
        status: 429, headers: { ...privateHeaders, 'Retry-After': '60' },
      });
    } catch {
      return new Response('Acceso temporalmente no disponible.', { status: 503, headers: privateHeaders });
    }
  }
  if (!hasValidBasicAuth(request, env.CONTACT_ADMIN_USER, env.CONTACT_ADMIN_PASSWORD)) {
    const response = unauthorizedResponse();
    for (const [key, value] of Object.entries(privateHeaders)) response.headers.set(key, value);
    return response;
  }
  return null;
}
