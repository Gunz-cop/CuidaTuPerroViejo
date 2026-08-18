/**
 * Public domain types for Assistant V2.
 *
 * These types deliberately keep routing/decision data separate from model
 * output. A generator may write advice, but it cannot choose a document slug.
 */

export type AssistantDocumentKind = 'intent' | 'topic';
export type DecisionKind = AssistantDocumentKind | 'none';
export type Confidence = 'high' | 'ambiguous' | 'low';
export type ResponseSource = 'emergency' | 'clarification' | 'ai' | 'articles' | 'topic' | 'generic';
export type RetrievalPath = 'hybrid' | 'lexical-only' | 'cache' | 'none' | 'catalog-router' | 'fallback';

export type RiskTagCode =
  | 'emergency'
  | 'bite'
  | 'ingestion'
  | 'pain'
  | 'person-injured'
  | 'respiratory-distress'
  | 'urinary-obstruction'
  | 'mobility-loss'
  | 'medication-request'
  | 'unknown-risk';

export type RiskTag = {
  readonly code: RiskTagCode;
  readonly severity: 'high' | 'medium' | 'low';
  readonly source: 'rule' | 'prototype' | 'editorial';
  readonly blocking: boolean;
};

export type QueryFingerprint = {
  readonly algorithm: 'HMAC-SHA-256';
  readonly value: string;
  readonly keyId: string;
  readonly input: 'normalized-query-v1';
};

export type NormalizedQuery = {
  /** Normalized text only; the original question must not be retained here. */
  readonly text: string;
  readonly fingerprint: QueryFingerprint;
  readonly language: 'es';
  readonly charCount: number;
  readonly tokenCount: number;
};

export type EmergencyProtocol = {
  readonly slug: string;
  readonly title: string;
  readonly urgency: 'immediate' | 'same-day' | 'prompt';
  readonly riskTags: readonly RiskTagCode[];
  readonly responseTemplate: string;
  readonly doNotDo: readonly string[];
  readonly articleHref?: string;
  readonly editorialVersion: string;
};

export type IntentDocument = {
  readonly kind: 'intent';
  readonly schemaVersion: 'assistant-intent/v1';
  readonly slug: string;
  readonly articleHref: string;
  readonly title: string;
  readonly primaryIntents: readonly string[];
  readonly colloquialExamples: readonly string[];
  readonly misspellings: readonly string[];
  readonly exclusions: readonly string[];
  readonly groundingSnippet: string;
  readonly fallbackAdvice: string;
  readonly editorialVersion: string;
};

export type ApprovedSource = {
  readonly name: string;
  readonly url: string;
  readonly authority: 'veterinary-guideline' | 'veterinary-reference' | 'primary-study' | 'other';
  readonly accessedAt: string;
};

export type ExternalTopicDocument = {
  readonly kind: 'topic';
  readonly schemaVersion: 'assistant-topic/v1';
  readonly slug: string;
  readonly title: string;
  readonly intents: readonly string[];
  readonly exclusions: readonly string[];
  readonly groundingSummary: string;
  readonly fallbackAdvice: string;
  readonly approvedSources: readonly ApprovedSource[];
  readonly lastReviewedAt: string;
  readonly editorialReviewStatus: 'pending' | 'approved' | 'needs-review';
  readonly reviewedBy?: string;
  readonly editorialVersion: string;
};

export type SafetyPrototype = {
  readonly kind: 'safety-prototype';
  readonly schemaVersion: 'assistant-safety/v1';
  readonly slug: string;
  readonly title: string;
  readonly protocolSlug: string;
  readonly canonicalExamples: readonly string[];
  readonly lexicalPatterns: readonly string[];
  readonly riskTags: readonly RiskTagCode[];
  readonly editorialVersion: string;
};

export type ModelVersion = {
  readonly id: string;
  readonly version: string;
};

export type RoutingIndexVersion = {
  readonly indexId: string;
  readonly schemaVersion: 'assistant-routing-index/v1';
  readonly artifactVersion: string;
  readonly embeddingModel: ModelVersion;
  readonly lexicalStatisticsVersion: string;
  readonly editorialManifestHash: string;
  readonly safetyPrototypeVersion: string;
  readonly thresholdSetVersions: {
    readonly hybrid: string;
    readonly lexicalOnly: string;
  };
  readonly builtAt: string;
};

export type RoutingThresholdBase = {
  readonly version: string;
  readonly high: number | null;
  readonly low: number | null;
  readonly margin: number | null;
};

export type PendingHybridThresholds = RoutingThresholdBase & {
  readonly status: 'pending-bakeoff';
  readonly mode: 'hybrid';
  readonly reranker: {
    readonly status: 'pending-bakeoff' | 'disabled';
    readonly minimum: number | null;
  };
};

export type PendingLexicalOnlyThresholds = RoutingThresholdBase & {
  readonly status: 'pending-bakeoff';
  readonly mode: 'lexical-only';
};

export type CalibratedHybridThresholds = RoutingThresholdBase & {
  readonly status: 'calibrated';
  readonly mode: 'hybrid';
  readonly high: number;
  readonly low: number;
  readonly margin: number;
  readonly reranker: {
    readonly status: 'enabled';
    readonly minimum: number;
  } | {
    readonly status: 'disabled';
    readonly minimum: null;
  };
};

export type CalibratedLexicalOnlyThresholds = RoutingThresholdBase & {
  readonly status: 'calibrated';
  readonly mode: 'lexical-only';
  readonly high: number;
  readonly low: number;
  readonly margin: number;
};

export type PendingRoutingThresholds = PendingHybridThresholds | PendingLexicalOnlyThresholds;
export type CalibratedRoutingThresholds = CalibratedHybridThresholds | CalibratedLexicalOnlyThresholds;
export type RoutingThresholdSet = PendingRoutingThresholds | CalibratedRoutingThresholds;
export type RoutingThresholds = {
  readonly hybrid: PendingHybridThresholds | CalibratedHybridThresholds;
  readonly lexicalOnly: PendingLexicalOnlyThresholds | CalibratedLexicalOnlyThresholds;
};

export type RerankerConfig = {
  readonly status: 'optional-pending-bakeoff' | 'enabled' | 'disabled';
  readonly model: ModelVersion | null;
};

export type AssistantDocument = IntentDocument | ExternalTopicDocument;

export type EmbeddingVector = readonly number[];

export type LexicalStatistics = {
  readonly representation: 'char-ngram-bm25';
  readonly n: number;
  readonly termFrequency: Readonly<Record<string, number>>;
  readonly documentFrequency: Readonly<Record<string, number>>;
  readonly documentLength: number;
  readonly averageDocumentLength: number;
  readonly corpusDocumentCount: number;
  readonly parameters: {
    readonly k1: number;
    readonly b: number;
  };
};

export type RoutingIndexEntry = {
  readonly documentId: string;
  readonly kind: AssistantDocumentKind;
  readonly slug: string;
  readonly editorialPayload: AssistantDocument;
  readonly editorialHash: string;
  readonly editorialVersion: string;
  readonly embedding: EmbeddingVector;
  readonly embeddingModel: ModelVersion;
  readonly lexical: LexicalStatistics;
};

export type SafetyPrototypeIndexEntry = {
  readonly prototypeId: string;
  readonly prototype: SafetyPrototype;
  readonly editorialHash: string;
  readonly editorialVersion: string;
  readonly embedding: EmbeddingVector;
  readonly embeddingModel: ModelVersion;
};

export type RoutingIndex = {
  readonly version: RoutingIndexVersion;
  readonly thresholds: RoutingThresholds;
  readonly embeddingDimensions: number;
  readonly entries: readonly RoutingIndexEntry[];
  readonly safetyPrototypes: readonly SafetyPrototypeIndexEntry[];
  readonly reranker: RerankerConfig;
};

export type ScoredCandidate = {
  readonly kind: AssistantDocumentKind;
  readonly slug: string;
  readonly rank: number;
  readonly score: number;
  readonly semanticScore: number | null;
  readonly lexicalScore: number | null;
  readonly rerankerScore: number | null;
  readonly excluded: boolean;
  readonly indexVersion: RoutingIndexVersion;
};

export type RetrievalResult = {
  readonly candidates: readonly ScoredCandidate[];
  readonly path: RetrievalPath;
  readonly indexVersion: RoutingIndexVersion;
  readonly rerankerUsed: boolean;
};

export type TriageResult = {
  readonly emergency: EmergencyProtocol | null;
  readonly riskTags: readonly RiskTag[];
  /** Reusable representation; retrieval may consume it to avoid a second embed call. */
  readonly semanticRepresentation: SemanticRepresentation | null;
};

export type SemanticRepresentation = {
  readonly kind: 'embedding';
  readonly vector: EmbeddingVector;
  readonly model: ModelVersion;
  readonly inputVersion: 'normalized-query-v1';
};

export type AssistantDecision = {
  readonly kind: DecisionKind;
  /** Slugs are selected by deterministic routing, never by generation. */
  readonly selectedSlugs: readonly string[];
  readonly confidence: Confidence;
  readonly reason: 'clear-match' | 'ambiguous-match' | 'gray-zone' | 'below-threshold' | 'emergency-gate';
  readonly indexVersion: RoutingIndexVersion;
  readonly deterministic: true;
};

export type GroundingContext = {
  readonly kind: DecisionKind;
  readonly selectedSlugs: readonly string[];
  readonly text: string;
  readonly approvedSources: readonly ApprovedSource[];
  readonly documentEditorialVersions: readonly string[];
  readonly indexVersion: RoutingIndexVersion;
};

export type GenerationContext = {
  readonly query: NormalizedQuery;
  readonly decision: AssistantDecision;
  readonly grounding: GroundingContext;
  readonly riskTags: readonly RiskTag[];
  readonly editorialRules: EditorialValidationRules;
};

export type EditorialValidationRules = {
  readonly language: 'es';
  readonly minWords: number;
  readonly maxWords: number;
  readonly forbiddenPatterns: readonly string[];
  readonly requiredRiskMentions: Readonly<Partial<Record<RiskTagCode, readonly string[]>>>;
};

export type GenerationResult = {
  /** Advice only. This type intentionally has no slug or document-selection field. */
  readonly advice: string;
  readonly model: ModelVersion;
  readonly attempts: number;
  readonly route: 'primary' | 'fallback';
};

export type ValidationResult = {
  readonly ok: boolean;
  readonly reasons: readonly string[];
  readonly wordCount: number;
};

export type FallbackResult = {
  readonly advice: string;
  readonly source: ResponseSource;
  readonly retrieval: RetrievalPath;
};

export type FallbackContext = {
  readonly decision: AssistantDecision;
  readonly grounding: GroundingContext;
  readonly decidedDocuments: readonly AssistantDocument[];
  readonly emergencyProtocol: EmergencyProtocol | null;
  readonly riskTags: readonly RiskTag[];
};

export type Recommendation = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly pillar: string;
};

export type AssistantV2Response = {
  readonly answer: string;
  readonly decision: AssistantDecision;
  readonly generation: GenerationResult | null;
  readonly fallback: FallbackResult | null;
  readonly recommendations: readonly Recommendation[];
  readonly source: ResponseSource;
  readonly retrieval: RetrievalPath;
  readonly confidence: Confidence;
};

/** Exact JSON contract currently consumed by asistente-ia.astro. */
export type AssistantV1JsonResponse = {
  readonly answer: string;
  readonly recommendations: readonly Recommendation[];
  readonly source: 'emergency' | 'clarification' | 'ai' | 'articles';
  readonly retrieval: 'catalog-router' | 'fallback' | 'none';
};

export type TelemetryEvent = {
  readonly event: 'assistant_v2';
  readonly stage: 'normalize' | 'triage' | 'retrieve' | 'decide' | 'generate' | 'validate' | 'fallback' | 'response';
  readonly queryFingerprint: QueryFingerprint;
  readonly indexVersion: RoutingIndexVersion;
  readonly outcome: 'ok' | 'degraded' | 'failed';
  readonly latencyMs?: number;
  readonly decisionKind?: DecisionKind;
  readonly selectedSlugs?: readonly string[];
  readonly retrievalPath?: RetrievalPath;
  readonly model?: ModelVersion;
  readonly validationReasons?: readonly string[];
};
