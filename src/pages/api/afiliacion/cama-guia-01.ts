import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = ({ request, url }) => {
  const headers = new Headers({ 'Cache-Control': 'no-store' });
  if (request.headers.get('Origin') !== url.origin) {
    return new Response(null, { status: 403, headers });
  }

  headers.set('Location', 'https://s.click.aliexpress.com/e/_c4FQx8UJ');
  return new Response(null, { status: 303, headers });
};
