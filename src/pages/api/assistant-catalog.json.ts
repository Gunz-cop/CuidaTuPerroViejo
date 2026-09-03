import type { APIRoute } from 'astro';
import { getArticleCatalog } from '../../lib/assistant/catalog';

export const prerender = true;

export const GET: APIRoute = async () => new Response(
  JSON.stringify(await getArticleCatalog()),
  {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  },
);
