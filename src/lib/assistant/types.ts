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

export type RetrievalMethod = 'catalog-router' | 'fallback' | 'none';

export type AssistantSource = 'emergency' | 'clarification' | 'ai' | 'articles';

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
