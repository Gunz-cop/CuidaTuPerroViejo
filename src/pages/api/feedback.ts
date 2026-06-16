import type { APIRoute } from 'astro';

export const prerender = false; // Indica a Astro que esta ruta se ejecute dinámicamente en el servidor (Cloudflare Worker)

// GET: Obtiene las estadísticas de feedback para un artículo
export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug')?.trim();

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Falta el parámetro slug.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cfEnv = (locals as any).runtime?.env || {};
    const contactKv = cfEnv.CONTACT_KV;

    let yesCount = 0;
    let noCount = 0;

    if (contactKv) {
      const yesVal = await contactKv.get(`feedback:yes:${slug}`);
      const noVal = await contactKv.get(`feedback:no:${slug}`);
      
      yesCount = yesVal ? parseInt(yesVal, 10) : 0;
      noCount = noVal ? parseInt(noVal, 10) : 0;
    } else {
      console.warn('SDI Feedback: No se encontró la vinculación CONTACT_KV en GET.');
    }

    return new Response(
      JSON.stringify({ yes: yesCount, no: noCount }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=15, s-maxage=15' // Cachear por 15 segundos en navegador y CDN
        } 
      }
    );
  } catch (error) {
    console.error('SDI Feedback GET Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST: Registra un voto para un artículo (útil o no útil)
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Cuerpo de petición inválido. Debe ser JSON.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { slug, type } = body;

    if (!slug || (type !== 'yes' && type !== 'no')) {
      return new Response(
        JSON.stringify({ error: 'Parámetros inválidos. Se requiere "slug" y "type" ("yes" o "no").' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cfEnv = (locals as any).runtime?.env || {};
    const contactKv = cfEnv.CONTACT_KV;

    let newCount = 1;

    if (contactKv) {
      const kvKey = `feedback:${type}:${slug}`;
      const currentVal = await contactKv.get(kvKey);
      
      if (currentVal) {
        newCount = parseInt(currentVal, 10) + 1;
      }
      
      await contactKv.put(kvKey, newCount.toString());
      console.log(`SDI Feedback: Registrado voto "${type}" para ${slug}. Nuevo total: ${newCount}`);
    } else {
      console.warn('SDI Feedback: Vinculación CONTACT_KV ausente en POST. Ejecutando de forma simulada.');
    }

    return new Response(
      JSON.stringify({ success: true, count: newCount }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('SDI Feedback POST Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
