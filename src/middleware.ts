import { defineMiddleware } from 'astro:middleware';

const STATIC_HTML_CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';
const ASSET_PATH_PATTERN = /\.[a-z0-9]+$/i;

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Sólo interceptar peticiones GET
  if (context.request.method !== 'GET') {
    return next();
  }

  const url = new URL(context.request.url);

  // 2. Evitar cachear APIs y assets. Las APIs pueden depender del visitante;
  // los assets estáticos ya reciben manejo de caché del adaptador/CDN.
  if (url.pathname.startsWith('/api/') || ASSET_PATH_PATTERN.test(url.pathname)) {
    return next();
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
        const response = new Response(cachedResponse.body, cachedResponse);
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
      newResponse.headers.set('X-Edge-Cache', 'MISS');
      return newResponse;
    } catch (error) {
      console.error('Middleware Edge Cache Error:', error);
    }
  }

  // Fallback normal si estamos en desarrollo local o no hay soporte de caché global
  return next();
});
