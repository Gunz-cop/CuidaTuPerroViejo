import type {
  PendingHybridThresholds,
  PendingLexicalOnlyThresholds,
  RerankerConfig,
} from './types';

export const ASSISTANT_V2_CONFIG = {
  schemaVersion: 'assistant-v2-config/v1',
  normalization: {
    language: 'es',
    maxQuestionCharacters: 500,
    fingerprint: {
      algorithm: 'HMAC-SHA-256',
      secretEnvironmentVariable: 'ASSISTANT_QUERY_FINGERPRINT_SECRET',
      keyIdEnvironmentVariable: 'ASSISTANT_QUERY_FINGERPRINT_KEY_ID',
      inputVersion: 'normalized-query-v1',
    },
  },
  routing: {
    indexPath: 'src/content/assistant/routing-index.json',
    indexVersionEnvironmentVariable: 'ASSISTANT_V2_INDEX_VERSION',
    embeddingModel: null,
    embeddingModelVersion: null,
    thresholds: {
      hybrid: {
        status: 'pending-bakeoff',
        mode: 'hybrid',
        version: 'pending-bakeoff:hybrid',
        high: null,
        low: null,
        margin: null,
        reranker: {
          status: 'pending-bakeoff',
          minimum: null,
        },
      } satisfies PendingHybridThresholds,
      lexicalOnly: {
        status: 'pending-bakeoff',
        mode: 'lexical-only',
        version: 'pending-bakeoff:lexical-only',
        high: null,
        low: null,
        margin: null,
      } satisfies PendingLexicalOnlyThresholds,
    },
    reranker: {
      status: 'optional-pending-bakeoff',
      model: null,
    } satisfies RerankerConfig,
  },
  generation: {
    primaryModel: null,
    fallbackModel: null,
    selection: 'pending-bakeoff',
    maxAttemptsTotal: 2,
    timeoutMilliseconds: 5_000,
    adviceWordRange: { min: 40, max: 130 },
  },
  cache: {
    enabled: false,
    keyPrefix: 'assistant:v2',
    ttlSeconds: 7 * 24 * 60 * 60,
    invalidatedBy: 'routing-index-version',
  },
} as const;

export type AssistantV2Config = typeof ASSISTANT_V2_CONFIG;
