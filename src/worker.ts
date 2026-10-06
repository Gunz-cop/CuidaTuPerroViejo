import { handle as astroHandler } from '@astrojs/cloudflare/handler';
import { createAgentContentWorker } from './lib/agent-content/runtime';

const fetch = createAgentContentWorker(astroHandler);

const DIAGNOSTIC_PATHS = new Set([
  '/',
  '/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor',
]);
const INDEX_PATH = '/agent-content/v1/index.json';
const MARKDOWN_PATHS = new Set([
  '/agent-content/v1/documents/home.md',
  '/agent-content/v1/documents/article--agresividad-tardia-perros-mayores-dolor.md',
]);

async function diagnosticFetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  if ((request.method !== 'GET' && request.method !== 'HEAD') || !DIAGNOSTIC_PATHS.has(url.pathname)) {
    return fetch(request, env, context);
  }

  const originalAssets = env.ASSETS;
  let indexEtag = 'absent';
  let representationEtag = 'absent';
  let representationEncoding = 'absent';
  const observedAssets = new Proxy(originalAssets, {
    get(target, property, receiver) {
      if (property !== 'fetch') return Reflect.get(target, property, receiver);
      return async (...args: Parameters<typeof originalAssets.fetch>): Promise<Response> => {
        const response = await originalAssets.fetch(...args);
        const input = args[0];
        const assetUrl = input instanceof Request
          ? new URL(input.url)
          : input instanceof URL
            ? input
            : new URL(input, request.url);
        if (assetUrl.pathname === INDEX_PATH) {
          indexEtag = response.headers.get('ETag') ?? 'absent';
        } else if (assetUrl.pathname === url.pathname || MARKDOWN_PATHS.has(assetUrl.pathname)) {
          representationEtag = response.headers.get('ETag') ?? 'absent';
          representationEncoding = response.headers.get('Content-Encoding') ?? 'absent';
        }
        return response;
      };
    },
  });
  const observedEnv = new Proxy(env, {
    get(target, property, receiver) {
      if (property === 'ASSETS') return observedAssets;
      return Reflect.get(target, property, receiver);
    },
  });

  const response = await fetch(request, observedEnv, context);
  const headers = new Headers(response.headers);
  headers.set('X-F2B-Diag-Assets-Index-ETag', indexEtag);
  headers.set('X-F2B-Diag-Assets-Representation-ETag', representationEtag);
  headers.set('X-F2B-Diag-Wrapper-ETag', response.headers.get('ETag') ?? 'absent');
  headers.set('X-F2B-Diag-Assets-Representation-Content-Encoding', representationEncoding);
  headers.set('X-F2B-Diag-Wrapper-Content-Encoding', response.headers.get('Content-Encoding') ?? 'absent');

  // Isolated treatment: apply no-transform only to the externally returned home response.
  // Keep all existing cache directives and the real ETag untouched.
  if (url.pathname === '/') {
    const cacheControl = headers.get('Cache-Control');
    if (cacheControl && !cacheControl.split(',').some((directive) => directive.trim().toLowerCase() === 'no-transform')) {
      headers.set('Cache-Control', `${cacheControl}, no-transform`);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default { fetch: diagnosticFetch };
