import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { hashIp } from '../../lib/contact/security';
import {
  AssistantRefusalError,
  DEFAULT_ASSISTANT_MODEL,
  answerWithClaude,
  parseEffort,
  type AssistantUsage,
} from '../../lib/assistant/claude';
import { generateAssistantDecision } from '../../lib/assistant/generation';
import {
  getArticleContingencyAnswer,
  getEmergencyAnswer,
  getUrinaryClarificationAnswer,
} from '../../lib/assistant/guidance';
import { loadKnowledge, readGuide } from '../../lib/assistant/knowledge';
import { checkAnswerLinks } from '../../lib/assistant/links';
import {
  countPaidInteractionsToday,
  dailyVisitorHash,
  recordInteraction,
  utcDay,
} from '../../lib/assistant/metrics';
import { MAX_REQUEST_BYTES, parseAssistantRequest, type AssistantRequest } from '../../lib/assistant/request';
import { findFallbackRecommendations, verifyCatalogRecommendation } from '../../lib/assistant/retrieval';
import type {
  ArticleCandidate,
  AssistantSource,
  Recommendation,
  RetrievalMethod,
} from '../../lib/assistant/types';

export const prerender = false;

const DEFAULT_DAILY_LIMIT = 200;

type StreamEvent =
  | { type: 'meta'; id: string; urgent: boolean }
  | { type: 'reading'; title: string }
  | { type: 'delta'; text: string }
  | { type: 'reset' }
  | { type: 'done'; id: string; answer: string; recommendations: Recommendation[]; source: AssistantSource; retrieval: RetrievalMethod; urgent: boolean }
  | { type: 'error'; error: string };

type Emit = (event: StreamEvent) => void;

type Outcome = {
  answer: string;
  recommendations: Recommendation[];
  source: AssistantSource;
  retrieval: RetrievalMethod;
  model: string | null;
  usage: AssistantUsage | null;
  guidesRead: string[];
  /** Motivo por el que no respondió el motor principal, si aplica. */
  degraded: string | null;
};

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) => (
  new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...extraHeaders } })
);

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));

const logError = (event: string, error: unknown) => {
  console.error(JSON.stringify({ event, error: errorMessage(error) }));
};

const readBody = async (request: Request): Promise<unknown | Response> => {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'La consulta es demasiado larga.' }, 413);
  }
  let text: string;
  try {
    text = await request.text();
  } catch {
    return json({ error: 'La consulta debe enviarse en formato JSON.' }, 400);
  }
  if (text.length > MAX_REQUEST_BYTES) return json({ error: 'La consulta es demasiado larga.' }, 413);
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return json({ error: 'La consulta debe enviarse en formato JSON.' }, 400);
  }
};

const dailyLimit = (): number => {
  const configured = Number.parseInt(env.ASSISTANT_DAILY_LIMIT ?? '', 10);
  return Number.isFinite(configured) && configured >= 0 ? configured : DEFAULT_DAILY_LIMIT;
};

/** Motor principal: Claude con lectura de las guías publicadas. */
const answerFromClaude = async (
  httpRequest: Request,
  input: AssistantRequest,
  emit: Emit,
  signal: AbortSignal,
): Promise<Outcome> => {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY no está configurada.');
  if (!env.ASSETS) throw new Error('ASSETS no está configurado.');

  const knowledge = await loadKnowledge(env.ASSETS, httpRequest.url);
  const result = await answerWithClaude({
    apiKey,
    baseURL: env.ANTHROPIC_BASE_URL,
    model: env.ASSISTANT_MODEL || DEFAULT_ASSISTANT_MODEL,
    effort: parseEffort(env.ASSISTANT_EFFORT),
    knowledge,
    readGuide: (guide) => readGuide(env.ASSETS, httpRequest.url, guide),
    question: input.question,
    history: input.history,
    signal,
    events: {
      onReading: (guide) => emit({ type: 'reading', title: guide.title }),
      onText: (text) => emit({ type: 'delta', text }),
      onReset: () => emit({ type: 'reset' }),
    },
  });

  const checked = checkAnswerLinks(result.answer, knowledge);
  return {
    answer: checked.answer,
    recommendations: checked.recommendations,
    source: 'claude',
    retrieval: checked.recommendations.length > 0 || result.guidesRead.length > 0 ? 'site-guides' : 'none',
    model: result.model,
    usage: result.usage,
    guidesRead: result.guidesRead,
    degraded: null,
  };
};

/**
 * Respaldo: el flujo anterior (Workers AI + triage por frases). Entra cuando
 * falta la clave de Anthropic, se supera el tope diario o Claude falla, de modo
 * que el asistente nunca queda peor que antes del rediseño.
 */
const answerFromFallback = async (
  httpRequest: Request,
  question: string,
  emergencyAnswer: string | null,
  degraded: string,
): Promise<Outcome | null> => {
  const base = { model: null, usage: null, guidesRead: [], degraded };
  const urinaryClarificationAnswer = getUrinaryClarificationAnswer(question);
  const fixedAnswer = emergencyAnswer ?? urinaryClarificationAnswer;
  const fixedSource: AssistantSource = emergencyAnswer ? 'emergency' : 'clarification';

  let catalog: ArticleCandidate[] = [];
  try {
    const response = await env.ASSETS.fetch(new URL('/api/assistant-catalog.json', httpRequest.url));
    if (!response.ok) throw new Error(`El catálogo respondió con HTTP ${response.status}.`);
    catalog = await response.json() as ArticleCandidate[];
  } catch (error) {
    logError('assistant_catalog_failed', error);
  }

  let recommendations = findFallbackRecommendations(question, catalog);

  if (env.AI && catalog.length > 0) {
    try {
      const decision = await generateAssistantDecision(env.AI, question, catalog);
      const verification = await verifyCatalogRecommendation(env.AI, question, catalog, decision.recommendedSlug);
      recommendations = verification.recommendations;
      return {
        ...base,
        answer: fixedAnswer ?? decision.answer,
        recommendations,
        source: fixedAnswer ? fixedSource : 'ai',
        retrieval: recommendations.length > 0 ? 'catalog-router' : 'none',
        model: '@cf/qwen/qwen3-30b-a3b-fp8',
      };
    } catch (error) {
      logError('assistant_catalog_router_failed', error);
    }
  }

  // Con una posible urgencia no se acompaña la respuesta de coincidencias por
  // palabras sueltas: una guía poco pertinente distrae de lo importante.
  if (emergencyAnswer) recommendations = [];
  const retrieval: RetrievalMethod = recommendations.length > 0 ? 'fallback' : 'none';
  if (fixedAnswer) return { ...base, answer: fixedAnswer, recommendations, source: fixedSource, retrieval };
  if (recommendations.length > 0) {
    return { ...base, answer: getArticleContingencyAnswer(), recommendations, source: 'articles', retrieval };
  }
  return null;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    if (env.ASK_LIMIT) {
      const key = await hashIp(ip, env.CONTACT_IP_HASH_SALT || 'ask-rate-limit');
      const outcome = await env.ASK_LIMIT.limit({ key });
      if (!outcome.success) {
        return json({ error: 'Demasiadas consultas. Inténtalo de nuevo en un minuto.' }, 429, { 'Retry-After': '60' });
      }
    }

    const body = await readBody(request);
    if (body instanceof Response) return body;
    const input = parseAssistantRequest(body);
    if ('error' in input) return json({ error: input.error }, input.status);

    const startedAt = Date.now();
    const id = crypto.randomUUID();
    const day = utcDay();
    const emergencyAnswer = getEmergencyAnswer(input.question);
    const urgent = emergencyAnswer !== null;
    const abort = new AbortController();

    const run = async (emit: Emit): Promise<Outcome | null> => {
      emit({ type: 'meta', id, urgent });

      let outcome: Outcome | null = null;
      let degraded = 'sin-clave';
      if (env.ANTHROPIC_API_KEY) {
        const usedToday = await countPaidInteractionsToday(env.CONTACT_DB, day);
        if (usedToday !== null && usedToday >= dailyLimit()) {
          degraded = 'tope-diario';
        } else {
          try {
            outcome = await answerFromClaude(request, input, emit, abort.signal);
          } catch (error) {
            if (abort.signal.aborted) return null;
            degraded = error instanceof AssistantRefusalError ? 'declinada' : 'error-claude';
            logError('assistant_claude_failed', error);
            emit({ type: 'reset' });
          }
        }
      }
      outcome ??= await answerFromFallback(request, input.question, emergencyAnswer, degraded);

      const latencyMs = Date.now() - startedAt;
      console.log(JSON.stringify({
        event: 'assistant_decision',
        id,
        surface: input.surface,
        source: outcome?.source ?? 'none',
        retrieval: outcome?.retrieval ?? 'none',
        model: outcome?.model ?? null,
        degraded: outcome ? outcome.degraded : degraded,
        guidesRead: outcome?.guidesRead ?? [],
        recommendationHrefs: outcome?.recommendations.map((item) => item.href) ?? [],
        usage: outcome?.usage ?? null,
        latencyMs,
      }));

      if (outcome) {
        await recordInteraction(env.CONTACT_DB, {
          id,
          day,
          visitorHash: await dailyVisitorHash(ip, env.CONTACT_IP_HASH_SALT || 'assistant-metrics', day),
          conversationId: input.conversationId,
          turn: input.history.length / 2 + 1,
          surface: input.surface,
          source: outcome.source,
          model: outcome.model,
          question: env.ASSISTANT_LOG_QUESTIONS === 'off' ? null : input.question,
          questionChars: input.question.length,
          answerChars: outcome.answer.length,
          guidesRead: outcome.guidesRead,
          recommended: outcome.recommendations.map((item) => item.href),
          urgent,
          latencyMs,
          usage: outcome.usage,
          error: outcome.degraded,
        });
      }
      return outcome;
    };

    const unavailable = 'No pudimos generar la orientación en este momento. Inténtalo de nuevo en unos segundos.';

    if (!input.stream) {
      const outcome = await run(() => {});
      if (!outcome) return json({ error: unavailable }, 503);
      return json({
        id,
        answer: outcome.answer,
        recommendations: outcome.recommendations,
        source: outcome.source,
        retrieval: outcome.retrieval,
        urgent,
      });
    }

    const encoder = new TextEncoder();
    let closed = false;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const emit: Emit = (event) => {
          if (closed) return;
          try {
            controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
          } catch {
            closed = true;
          }
        };
        try {
          const outcome = await run(emit);
          if (outcome) {
            emit({
              type: 'done',
              id,
              answer: outcome.answer,
              recommendations: outcome.recommendations,
              source: outcome.source,
              retrieval: outcome.retrieval,
              urgent,
            });
          } else if (!abort.signal.aborted) {
            emit({ type: 'error', error: unavailable });
          }
        } catch (error) {
          logError('assistant_stream_failed', error);
          emit({ type: 'error', error: 'No pudimos procesar la consulta. Inténtalo de nuevo en unos minutos.' });
        } finally {
          if (!closed) {
            closed = true;
            try { controller.close(); } catch { /* el cliente ya cerró */ }
          }
        }
      },
      cancel() {
        closed = true;
        abort.abort();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-store, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    logError('assistant_request_failed', error);
    return json({ error: 'No pudimos procesar la consulta. Inténtalo de nuevo en unos minutos.' }, 500);
  }
};
