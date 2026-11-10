export type Recommendation = {
  title: string;
  description: string;
  href: string;
  pillar: string;
};

export type ArticleCandidate = Recommendation & {
  slug: string;
  keyword: string;
  routingText: string;
};

export type RetrievalMethod = 'site-guides' | 'catalog-router' | 'fallback' | 'none';

export type AssistantSource = 'workers-ai' | 'claude' | 'emergency' | 'clarification' | 'ai' | 'articles';

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type AssistantSurface = 'widget' | 'page' | 'api';

export type TextGenerationResponse = {
  response?: unknown;
  choices?: Array<{
    message?: { content?: unknown };
    text?: unknown;
  }>;
};

export type GeneratedAnswer = {
  answer: string;
  recommendedSlug: string | null;
};

export type CatalogRanking = {
  recommendations: Recommendation[];
  topScore: number | null;
  topCandidateHref: string | null;
};

export type AssistantUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
};

/** Lo que devuelve cualquiera de los motores (Workers AI o Claude). */
export type EngineAnswer = {
  answer: string;
  guidesRead: string[];
  model: string;
  usage: AssistantUsage;
  truncated: boolean;
};

export type EngineEvents = {
  /** El asistente va a consultar una guía del sitio. */
  onReading?: (guide: { id: string; title: string }) => void;
  onText?: (delta: string) => void;
  /** El texto emitido hasta ahora no forma parte de la respuesta: descartarlo. */
  onReset?: () => void;
};
