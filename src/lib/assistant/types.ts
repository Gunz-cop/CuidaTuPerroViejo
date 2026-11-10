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

export type AssistantSource = 'claude' | 'emergency' | 'clarification' | 'ai' | 'articles';

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
