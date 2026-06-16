import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Sólo interceptar peticiones GET
  if (context.request.method !== 'GET') {
    return next();
  }

  const url = new URL(context.request.url);

  // 2. Evitar cachear la detección geográfica a nivel de borde (CDN)
  // dado que depende del IP de cada visitante individual
  if (url.pathname === '/api/geo') {
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

      // Si la respuesta fue exitosa (200) y tiene directivas de caché que no sean privadas
      const cacheControl = response.headers.get('Cache-Control');
      if (
        response.status === 200 && 
        cacheControl && 
        !cacheControl.includes('no-store') && 
        !cacheControl.includes('private')
      ) {
        // Guardar la respuesta clonada en la caché de Cloudflare
        await cache.put(context.request, response.clone());
      }

      // Retornar la respuesta original con cabecera de diagnóstico MISS
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Edge-Cache', 'MISS');
      return newResponse;
    } catch (error) {
      console.error('Middleware Edge Cache Error:', error);
    }
  }

  // Fallback normal si estamos en desarrollo local o no hay soporte de caché global
  return next();
});
