import type { APIRoute } from 'astro';

export const prerender = false; // Indica a Astro que esta ruta se ejecute dinámicamente en el servidor (Cloudflare Worker)

export const GET: APIRoute = async ({ request }) => {
  try {
    // 1. Intentar leer del header estándar de geolocalización de Cloudflare
    let country = request.headers.get('cf-ipcountry') || request.headers.get('CF-IPCountry');

    // 2. Intentar leer de las propiedades cf provistas por Cloudflare Workers
    if (!country) {
      const cfProperties = request.cf as { country?: string } | undefined;
      if (cfProperties?.country) {
        country = cfProperties.country;
      }
    }

    // Normalizar a mayúsculas si existe
    const countryCode = country ? country.toUpperCase().trim() : 'UNKNOWN';

    return new Response(
      JSON.stringify({ country: countryCode }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=3600' // Cachear en el navegador del usuario por 1 hora, no en CDN
        } 
      }
    );
  } catch (error) {
    console.error('SDI Geo GET Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno de geolocalización.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
