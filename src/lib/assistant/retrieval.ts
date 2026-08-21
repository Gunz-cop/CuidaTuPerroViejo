import type { ArticleCandidate, CatalogRanking, Recommendation } from './types';

const CATALOG_SCORE_THRESHOLD = 0.4;

type RankingResponse = {
  response?: Array<{ id?: number; score?: number }>;
};

const STOP_WORDS = new Set([
  'algo', 'anos', 'como', 'con', 'cuando', 'desde', 'donde', 'esta', 'este', 'esto', 'hace',
  'mayor', 'mayores', 'para', 'pero', 'perro', 'perros', 'porque', 'puede', 'quiero', 'senior',
  'sobre', 'tiene', 'tengo', 'unos', 'unas', 'viejo', 'viejos', 'mucho', 'poco', 'ahora',
]);

export const normalizeText = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9ñ\s-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const meaningfulTokens = (value: string) => normalizeText(value)
  .split(/[\s-]+/)
  .filter((token) => token.length >= 5 && !STOP_WORDS.has(token));

const toRecommendation = ({ title, description, href, pillar }: ArticleCandidate): Recommendation => ({
  title,
  description,
  href,
  pillar,
});

export const verifyCatalogRecommendation = async (
  ai: Ai,
  question: string,
  catalog: ArticleCandidate[],
  recommendedSlug: string | null,
): Promise<CatalogRanking> => {
  const article = recommendedSlug ? catalog.find((item) => item.slug === recommendedSlug) : null;
  if (!article) return { recommendations: [], topScore: null, topCandidateHref: null };

  const result = await ai.run('@cf/baai/bge-m3', {
    query: question,
    contexts: [{ text: article.routingText }],
    truncate_inputs: true,
  }) as RankingResponse;
  const score = result.response?.[0]?.score;
  if (typeof score !== 'number' || !Number.isFinite(score)) {
    throw new Error('Workers AI devolvió una puntuación de relevancia no válida.');
  }
  return {
    recommendations: score >= CATALOG_SCORE_THRESHOLD ? [toRecommendation(article)] : [],
    topScore: score,
    topCandidateHref: article.href,
  };
};

/**
 * Zero-cost contingency used only when the catalog router is unavailable.
 * It deliberately favors precision and never drives the normal production path.
 */
export const findFallbackRecommendations = (
  question: string,
  catalog: ArticleCandidate[],
): Recommendation[] => {
  const queryTokens = new Set(meaningfulTokens(question));

  return catalog
    .map((article) => {
      const articleTokens = meaningfulTokens(article.routingText);
      const score = articleTokens.reduce(
        (total, token) => total + (queryTokens.has(token) ? 1 : 0),
        0,
      );
      return { article, score };
    })
    .filter(({ score }) => score >= 2)
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map(({ article }) => toRecommendation(article));
};
