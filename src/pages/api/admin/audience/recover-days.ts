import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleRecovery } from '../../../../lib/admin/audience-recovery';

export const prerender = false;
export const POST: APIRoute = ({request}) => handleRecovery(request,env);
