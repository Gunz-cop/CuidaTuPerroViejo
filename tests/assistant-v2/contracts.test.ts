import assert from 'node:assert/strict';
import {
  EditorialSchemaError,
  validateEmergencyProtocol,
  validateExternalTopicDocument,
  validateIntentDocument,
  validateSafetyPrototype,
} from '../../src/content/assistant/config';
import { ASSISTANT_V2_CONFIG } from '../../src/lib/assistant/v2/config';
import type {
  BuildFallback,
  Retrieve,
  Triage,
  Validate,
} from '../../src/lib/assistant/v2/contracts';
import type {
  AssistantDecision,
  AssistantV1JsonResponse,
  AssistantV2Response,
  CalibratedHybridThresholds,
  FallbackContext,
  FallbackResult,
  GenerationContext,
  GenerationResult,
  GroundingContext,
  IntentDocument,
  LexicalStatistics,
  ModelVersion,
  NormalizedQuery,
  RoutingIndex,
  RoutingIndexEntry,
  RoutingIndexVersion,
  SafetyPrototypeIndexEntry,
  SemanticRepresentation,
} from '../../src/lib/assistant/v2/types';
import type { AssistantV2ToV1Adapter } from '../../src/lib/assistant/v2/contracts';

const model: ModelVersion = { id: 'test-embedding', version: 'test-version' };
const version: RoutingIndexVersion = {
  indexId: 'test-index',
  schemaVersion: 'assistant-routing-index/v1',
  artifactVersion: 'artifact-2026-08-17.1',
  embeddingModel: model,
  lexicalStatisticsVersion: 'lexical-2026-08-17.1',
  editorialManifestHash: 'sha256:editorial-manifest-test',
  safetyPrototypeVersion: 'safety-2026-08-17.1',
  thresholdSetVersions: { hybrid: 'hybrid-pending', lexicalOnly: 'lexical-only-pending' },
  builtAt: '2026-08-17T00:00:00.000Z',
};

const intent: IntentDocument = {
  kind: 'intent',
  schemaVersion: 'assistant-intent/v1',
  slug: 'disfuncion-cognitiva-canina',
  articleHref: '/salud-mental-emocional-perros/disfuncion-cognitiva-canina',
  title: 'Disfunción cognitiva canina',
  primaryIntents: ['se pierde en casa', 'parece desorientado'],
  colloquialExamples: ['se queda mirando la pared'],
  misspellings: ['desorientao'],
  exclusions: ['tos aislada'],
  groundingSnippet: 'La desorientación persistente requiere una revisión veterinaria.',
  fallbackAdvice: 'Anota los cambios y solicita una revisión veterinaria.',
  editorialVersion: '2026-08-17.1',
};

const source = {
  name: 'Merck Veterinary Manual',
  url: 'https://www.merckvetmanual.com/',
  authority: 'veterinary-reference' as const,
  accessedAt: '2026-08-17T00:00:00.000Z',
};

const topic = {
  kind: 'topic' as const,
  schemaVersion: 'assistant-topic/v1' as const,
  slug: 'tos-en-perros-mayores',
  title: 'Tos en perros mayores',
  intents: ['tose por la noche'],
  exclusions: ['se ahoga y no respira'],
  groundingSummary: 'La tos persistente necesita valoración veterinaria.',
  fallbackAdvice: 'Contacta con el veterinario si la tos persiste o empeora.',
  approvedSources: [source],
  lastReviewedAt: '2026-08-17T00:00:00.000Z',
  editorialReviewStatus: 'approved' as const,
  reviewedBy: 'editorial-veterinary-review',
  editorialVersion: '2026-08-17.1',
};

const safetyPrototype = {
  kind: 'safety-prototype' as const,
  schemaVersion: 'assistant-safety/v1' as const,
  slug: 'respiratory-distress',
  title: 'Dificultad respiratoria',
  protocolSlug: 'respiratory-emergency',
  canonicalExamples: ['no puede respirar'],
  lexicalPatterns: ['respira con dificultad'],
  riskTags: ['emergency', 'respiratory-distress'] as const,
  editorialVersion: '2026-08-17.1',
};

const protocol = {
  slug: 'respiratory-emergency',
  title: 'Emergencia respiratoria',
  urgency: 'immediate' as const,
  riskTags: ['emergency', 'respiratory-distress'] as const,
  responseTemplate: 'Acude a urgencias veterinarias ahora.',
  doNotDo: ['No fuerces comida o bebida.'],
  editorialVersion: '2026-08-17.1',
};

const normalizedQuery: NormalizedQuery = {
  text: 'se pierde en casa',
  fingerprint: {
    algorithm: 'HMAC-SHA-256',
    value: 'hmac-test',
    keyId: 'test-key',
    input: 'normalized-query-v1',
  },
  language: 'es',
  charCount: 18,
  tokenCount: 4,
};

assert.doesNotThrow(() => validateIntentDocument(intent));
assert.doesNotThrow(() => validateExternalTopicDocument(topic));
assert.doesNotThrow(() => validateSafetyPrototype(safetyPrototype));
assert.doesNotThrow(() => validateEmergencyProtocol(protocol));

const assertSchemaError = (action: () => unknown, issue: string) => {
  assert.throws(
    action,
    (error: unknown) => error instanceof EditorialSchemaError && error.issues.some((item) => item.includes(issue)),
  );
};

assertSchemaError(() => validateIntentDocument({ ...intent, groundingSnippet: undefined }), 'groundingSnippet');
assertSchemaError(() => validateExternalTopicDocument({ ...topic, approvedSources: [] }), 'approvedSources');
assertSchemaError(() => validateExternalTopicDocument({ ...topic, approvedSources: [{ ...source, authority: 'unverified' }] }), 'authority');
assertSchemaError(() => validateExternalTopicDocument({ ...topic, approvedSources: [{ ...source, url: 'http://example.com' }] }), 'url');
assertSchemaError(() => validateExternalTopicDocument({ ...topic, intents: [] }), 'intents');
assertSchemaError(() => validateIntentDocument({ ...intent, primaryIntents: [] }), 'primaryIntents');
assertSchemaError(() => validateIntentDocument({ ...intent, colloquialExamples: [] }), 'colloquialExamples');
assertSchemaError(() => validateIntentDocument({ ...intent, articleHref: 'https://evil.example/article' }), 'articleHref');
assertSchemaError(() => validateIntentDocument({ ...intent, articleHref: '//evil.example/article' }), 'articleHref');
assertSchemaError(() => validateEmergencyProtocol({ ...protocol, urgency: 'later' }), 'urgency');
assertSchemaError(() => validateEmergencyProtocol({ ...protocol, riskTags: [] }), 'riskTags');
assertSchemaError(() => validateEmergencyProtocol({ ...protocol, riskTags: ['not-a-risk'] }), 'riskTags');
assertSchemaError(() => validateEmergencyProtocol({ ...protocol, doNotDo: [] }), 'doNotDo');
assertSchemaError(() => validateEmergencyProtocol({ ...protocol, articleHref: 'javascript:alert(1)' }), 'articleHref');
assertSchemaError(() => validateSafetyPrototype({ ...safetyPrototype, riskTags: [] }), 'riskTags');
assertSchemaError(() => validateSafetyPrototype({ ...safetyPrototype, riskTags: ['not-a-risk'] }), 'riskTags');
assertSchemaError(() => validateSafetyPrototype({ ...safetyPrototype, canonicalExamples: [] }), 'canonicalExamples');
assertSchemaError(() => validateSafetyPrototype({ ...safetyPrototype, lexicalPatterns: [] }), 'lexicalPatterns');

const lexical: LexicalStatistics = {
  representation: 'char-ngram-bm25',
  n: 3,
  termFrequency: { des: 2, eso: 1 },
  documentFrequency: { des: 1, eso: 1 },
  documentLength: 3,
  averageDocumentLength: 3,
  corpusDocumentCount: 1,
  parameters: { k1: 1.2, b: 0.75 },
};
const entry: RoutingIndexEntry = {
  documentId: 'intent:disfuncion-cognitiva-canina',
  kind: 'intent',
  slug: intent.slug,
  editorialPayload: intent,
  editorialHash: 'sha256:intent-test',
  editorialVersion: intent.editorialVersion,
  embedding: [0.1, 0.2, 0.3],
  embeddingModel: model,
  lexical,
};
const safetyEntry: SafetyPrototypeIndexEntry = {
  prototypeId: 'safety:respiratory-distress',
  prototype: safetyPrototype,
  editorialHash: 'sha256:safety-test',
  editorialVersion: safetyPrototype.editorialVersion,
  embedding: [0.4, 0.5, 0.6],
  embeddingModel: model,
};
const index: RoutingIndex = {
  version,
  thresholds: ASSISTANT_V2_CONFIG.routing.thresholds,
  embeddingDimensions: 3,
  entries: [entry],
  safetyPrototypes: [safetyEntry],
  reranker: ASSISTANT_V2_CONFIG.routing.reranker,
};
assert.equal(index.entries[0]?.documentId, 'intent:disfuncion-cognitiva-canina');
assert.equal(index.entries[0]?.lexical.representation, 'char-ngram-bm25');
assert.equal(index.entries[0]?.embedding.length, 3);
assert.equal(index.safetyPrototypes[0]?.embedding.length, 3);
assert.notEqual(index.thresholds.hybrid.version, index.thresholds.lexicalOnly.version);
assert.equal(index.thresholds.hybrid.reranker.minimum, null);
assert.equal('rerankerMinimum' in index.thresholds.hybrid, false);

const decision: AssistantDecision = {
  kind: 'intent',
  selectedSlugs: [intent.slug],
  confidence: 'high',
  reason: 'clear-match',
  indexVersion: version,
  deterministic: true,
};
const grounding: GroundingContext = {
  kind: 'intent',
  selectedSlugs: [intent.slug],
  text: intent.groundingSnippet,
  approvedSources: [],
  documentEditorialVersions: [intent.editorialVersion],
  indexVersion: version,
};
const generationContext: GenerationContext = {
  query: normalizedQuery,
  decision,
  grounding,
  riskTags: [],
  editorialRules: {
    language: 'es',
    minWords: 40,
    maxWords: 130,
    forbiddenPatterns: ['dosis', 'slug'],
    requiredRiskMentions: {},
  },
};
const generation: GenerationResult = {
  advice: 'Solicita una revisión veterinaria y anota cuándo aparecen los cambios.',
  model: { id: 'test-model', version: 'test-version' },
  attempts: 1,
  route: 'primary',
};

// Compile-time guard: a generator result cannot carry a selected slug.
type Assert<T extends true> = T;
type GenerationHasNoSlug = Assert<'slug' extends keyof GenerationResult ? false : true>;
type FallbackHasNoSlugs = Assert<'selectedSlugs' extends keyof FallbackResult ? false : true>;
void (generation satisfies GenerationHasNoSlug extends true ? GenerationResult : never);
assert.equal('slug' in generation, false);
assert.deepEqual(decision.selectedSlugs, [intent.slug]);
assert.equal('advice' in decision, false);

// The validator receives the grounding, decision, risks, model and attempt together.
const validate: Validate = (receivedGeneration, receivedContext) => {
  assert.equal(receivedContext.grounding.text, intent.groundingSnippet);
  assert.deepEqual(receivedContext.decision.selectedSlugs, [intent.slug]);
  assert.equal(receivedGeneration.model.id, 'test-model');
  assert.equal(receivedGeneration.attempts, 1);
  return { ok: true, reasons: [], wordCount: receivedGeneration.advice.split(/\s+/).length };
};
assert.equal(validate(generation, generationContext).ok, true);

const fallbackContext: FallbackContext = {
  decision,
  grounding,
  decidedDocuments: [intent],
  emergencyProtocol: null,
  riskTags: [],
};
const buildFallback: BuildFallback = (receivedContext) => {
  assert.equal(receivedContext.decision, decision);
  assert.equal(receivedContext.decidedDocuments[0]?.slug, intent.slug);
  assert.equal(receivedContext.grounding.text, intent.groundingSnippet);
  return { advice: intent.fallbackAdvice, source: 'articles', retrieval: 'none' };
};
const fallback = buildFallback(fallbackContext);
assert.equal(fallback.advice, intent.fallbackAdvice);
assert.equal('selectedSlugs' in fallback, false);
void (fallback satisfies FallbackHasNoSlugs extends true ? FallbackResult : never);

// Async triage/retrieval can share one semantic representation without an external call here.
const semanticRepresentation: SemanticRepresentation = {
  kind: 'embedding',
  vector: [0.1, 0.2, 0.3],
  model,
  inputVersion: 'normalized-query-v1',
};
const triage: Triage = async (_query, reusableRepresentation) => ({
  emergency: null,
  riskTags: [],
  semanticRepresentation: reusableRepresentation ?? semanticRepresentation,
});
const retrieve: Retrieve = async (_query, reusableRepresentation) => ({
  candidates: [],
  path: reusableRepresentation ? 'hybrid' : 'lexical-only',
  indexVersion: version,
  rerankerUsed: false,
});
const triageResult = await triage(normalizedQuery, semanticRepresentation);
const retrievalResult = await retrieve(normalizedQuery, triageResult.semanticRepresentation);
assert.equal(retrievalResult.path, 'hybrid');

const calibratedHybrid: CalibratedHybridThresholds = {
  status: 'calibrated',
  mode: 'hybrid',
  version: 'hybrid-test-1',
  high: 0.8,
  low: 0.4,
  margin: 0.1,
  reranker: { status: 'disabled', minimum: null },
};
assert.equal(calibratedHybrid.reranker.minimum, null);

const internalResponse: AssistantV2Response = {
  answer: generation.advice,
  decision,
  generation,
  fallback: null,
  recommendations: [{ title: intent.title, description: 'Guía editorial', href: intent.articleHref, pillar: 'Mente y comportamiento' }],
  source: 'ai',
  retrieval: 'hybrid',
  confidence: decision.confidence,
};
const adapter: AssistantV2ToV1Adapter = (response) => ({
  answer: response.answer,
  recommendations: response.recommendations,
  source: 'ai',
  retrieval: 'catalog-router',
});
const frontendJson: AssistantV1JsonResponse = adapter(internalResponse);
assert.equal(frontendJson.answer, generation.advice);
assert.equal(frontendJson.retrieval, 'catalog-router');

console.log('Assistant V2 contract tests passed.');
