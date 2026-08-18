import type {
  AssistantDecision,
  AssistantV1JsonResponse,
  AssistantV2Response,
  CalibratedRoutingThresholds,
  FallbackResult,
  FallbackContext,
  GenerationContext,
  GenerationResult,
  NormalizedQuery,
  RetrievalResult,
  RiskTag,
  ScoredCandidate,
  SemanticRepresentation,
  TriageResult,
  ValidationResult,
} from './types';

/** Stable seams for the Foundation pipeline. Implementations may be added in later phases. */
export type Normalize = (question: string) => Promise<NormalizedQuery>;
export type Triage = (
  normalizedQuery: NormalizedQuery,
  semanticRepresentation?: SemanticRepresentation | null,
) => Promise<TriageResult>;
export type Retrieve = (
  normalizedQuery: NormalizedQuery,
  semanticRepresentation?: SemanticRepresentation | null,
) => Promise<RetrievalResult>;
export type Decide = (
  candidates: readonly ScoredCandidate[],
  thresholds: CalibratedRoutingThresholds,
) => AssistantDecision;
export type Generate = (context: GenerationContext) => Promise<GenerationResult>;
export type Validate = (
  generation: GenerationResult,
  context: GenerationContext,
) => ValidationResult;
export type BuildFallback = (context: FallbackContext) => FallbackResult;

export type AssistantV2Contracts = {
  readonly normalize: Normalize;
  readonly triage: Triage;
  readonly retrieve: Retrieve;
  readonly decide: Decide;
  readonly generate: Generate;
  readonly validate: Validate;
  readonly buildFallback: BuildFallback;
};

/** Implemented later by Integration Lead; not a structural type alias. */
export type AssistantV2ToV1Adapter = (response: AssistantV2Response) => AssistantV1JsonResponse;
