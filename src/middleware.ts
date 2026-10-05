import { defineMiddleware } from 'astro:middleware';

const STATIC_HTML_CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';
const ASSET_PATH_PATTERN = /\.[a-z0-9]+$/i;

// Mismas cabeceras que public/_headers. Ese fichero no se aplica a las
// respuestas que genera el Worker (rutas dinámicas como /api/* y /admin/*),
// así que se repiten aquí. Si se tocan, hay que tocar las dos.
const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'geolocation=(), microphone=(), camera=()'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'],
];

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of SECURITY_HEADERS) {
    if (!headers.has(key)) headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Sólo interceptar peticiones GET para el cacheo de edge
  if (context.request.method !== 'GET') {
    return withSecurityHeaders(await next());
  }

  const url = new URL(context.request.url);

  // 2. Evitar cachear APIs, admin y assets. Las APIs y el admin dependen del
  // visitante o mutan estado; los assets estáticos ya reciben manejo de
  // caché del adaptador/CDN. Las cabeceras de seguridad sí se aplican.
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/admin/') ||
    ASSET_PATH_PATTERN.test(url.pathname) ||
    context.request.headers.has('Authorization')
  ) {
    return withSecurityHeaders(await next());
  }

  // 3. Comprobar si la API nativa de Cache de Cloudflare está disponible (en el borde)
  const hasCacheAPI = typeof caches !== 'undefined' && (caches as any).default;

  if (hasCacheAPI) {
    const cache = (caches as any).default;

    try {
      // Buscar coincidencia en la caché de Cloudflare para la petición actual
      const cachedResponse = await cache.match(context.request);
      if (cachedResponse) {
        // Clonar la respuesta y añadir un header de diagnóstico
        const response = withSecurityHeaders(new Response(cachedResponse.body, cachedResponse));
        response.headers.set('X-Edge-Cache', 'HIT');
        return response;
      }

      // Si no existe en caché, procesamos la petición llamando a Astro
      const response = await next();
      const newResponse = new Response(response.body, response);

      if (
        newResponse.status === 200 &&
        !newResponse.headers.has('Cache-Control') &&
        (newResponse.headers.get('Content-Type') || '').includes('text/html')
      ) {
        newResponse.headers.set('Cache-Control', STATIC_HTML_CACHE_CONTROL);
      }

      // Si la respuesta fue exitosa (200) y tiene directivas de caché que no sean privadas
      const cacheControl = newResponse.headers.get('Cache-Control');
      if (
        newResponse.status === 200 &&
        cacheControl && 
        !cacheControl.includes('no-store') && 
        !cacheControl.includes('private')
      ) {
        // Guardar la respuesta clonada en la caché de Cloudflare
        await cache.put(context.request, newResponse.clone());
      }

      // Retornar la respuesta original con cabecera de diagnóstico MISS
      const finalResponse = withSecurityHeaders(newResponse);
      finalResponse.headers.set('X-Edge-Cache', 'MISS');
      return finalResponse;
    } catch (error) {
      console.error('Middleware Edge Cache Error:', error);
    }
  }

  // Fallback normal si estamos en desarrollo local o no hay soporte de caché global
  return withSecurityHeaders(await next());
});
