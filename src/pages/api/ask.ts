import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getArticleCatalog } from '../../lib/assistant/catalog';
import { generateAssistantDecision } from '../../lib/assistant/generation';
import {
  getArticleContingencyAnswer,
  getEmergencyAnswer,
  getUrinaryClarificationAnswer,
} from '../../lib/assistant/guidance';
import { findFallbackRecommendations, verifyCatalogRecommendation } from '../../lib/assistant/retrieval';
import type { AssistantSource, RetrievalMethod } from '../../lib/assistant/types';

export const prerender = false;

const MAX_QUESTION_LENGTH = 500;
const MAX_REQUEST_BYTES = 2_048;

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const logError = (event: string, error: unknown) => {
  console.error(JSON.stringify({
    event,
    error: error instanceof Error ? error.message : String(error),
  }));
};

const parseQuestion = async (request: Request): Promise<string | Response> => {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'La consulta es demasiado larga.' }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'La consulta debe enviarse en formato JSON.' }, 400);
  }

  const question = typeof body === 'object' && body !== null && 'question' in body
    ? (body as { question?: unknown }).question
    : undefined;

  if (typeof question !== 'string' || question.trim().length < 3) {
    return json({ error: 'Cuéntanos un poco más para poder orientarte.' }, 400);
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return json({ error: `La consulta no puede superar los ${MAX_QUESTION_LENGTH} caracteres.` }, 400);
  }

  return question.trim();
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const parsedQuestion = await parseQuestion(request);
    if (parsedQuestion instanceof Response) return parsedQuestion;

    const startedAt = Date.now();
    const catalog = await getArticleCatalog();
    const emergencyAnswer = getEmergencyAnswer(parsedQuestion);
    const urinaryClarificationAnswer = getUrinaryClarificationAnswer(parsedQuestion);
    const ai = env.AI;
    let recommendations = findFallbackRecommendations(parsedQuestion, catalog);
    let retrieval: RetrievalMethod = recommendations.length > 0 ? 'fallback' : 'none';

    if (ai) {
      try {
        const decision = await generateAssistantDecision(ai, parsedQuestion, catalog);
        const verification = await verifyCatalogRecommendation(
          ai,
          parsedQuestion,
          catalog,
          decision.recommendedSlug,
        );
        recommendations = verification.recommendations;
        retrieval = recommendations.length > 0 ? 'catalog-router' : 'none';
        const source: AssistantSource = emergencyAnswer
          ? 'emergency'
          : urinaryClarificationAnswer
            ? 'clarification'
            : 'ai';
        console.log(JSON.stringify({
          event: 'assistant_decision',
          source,
          retrieval,
          proposedSlug: decision.recommendedSlug,
          recommendationHrefs: recommendations.map((item) => item.href),
          relevanceScore: verification.topScore,
          latencyMs: Date.now() - startedAt,
        }));

        return json({
          answer: emergencyAnswer ?? urinaryClarificationAnswer ?? decision.answer,
          recommendations,
          source,
          retrieval,
        });
      } catch (error) {
        logError('assistant_catalog_router_failed', error);
      }
    }

    if (emergencyAnswer || urinaryClarificationAnswer) {
      return json({
        answer: emergencyAnswer ?? urinaryClarificationAnswer,
        recommendations,
        source: emergencyAnswer ? 'emergency' : 'clarification',
        retrieval,
      });
    }

    if (recommendations.length > 0) {
      return json({
        answer: getArticleContingencyAnswer(),
        recommendations,
        source: 'articles' satisfies AssistantSource,
        retrieval,
      });
    }

    return json({ error: 'No pudimos generar la orientación en este momento. Inténtalo de nuevo en unos segundos.' }, 503);
  } catch (error) {
    logError('assistant_request_failed', error);
    return json({ error: 'No pudimos procesar la consulta. Inténtalo de nuevo en unos minutos.' }, 500);
  }
};
