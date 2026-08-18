import type {
  ApprovedSource,
  EmergencyProtocol,
  ExternalTopicDocument,
  IntentDocument,
  RiskTagCode,
  SafetyPrototype,
} from '../../lib/assistant/v2/types';

export class EditorialSchemaError extends Error {
  readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super(`Documento editorial inválido: ${issues.join('; ')}`);
    this.name = 'EditorialSchemaError';
    this.issues = issues;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
);

const requiredString = (value: unknown, field: string, issues: string[]) => {
  if (typeof value !== 'string' || value.trim() === '') issues.push(`${field}: required non-empty string`);
};

const stringArray = (value: unknown, field: string, issues: string[], allowEmpty = true) => {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    issues.push(`${field}: required string array${allowEmpty ? '' : ' (non-empty)'}`);
  }
};

const isoDate = (value: unknown, field: string, issues: string[]) => {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) issues.push(`${field}: valid ISO date required`);
};

const approvedAuthorities = new Set<ApprovedSource['authority']>([
  'veterinary-guideline', 'veterinary-reference', 'primary-study', 'other',
]);

const isHttpsUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.length > 0 && !url.username && !url.password;
  } catch {
    return false;
  }
};

const isSafeLocalHref = (value: unknown): value is string => (
  typeof value === 'string'
  && value.startsWith('/')
  && !value.startsWith('//')
  && !value.includes('\\')
  && !/[\u0000-\u001f\u007f]/.test(value)
  && !/^(?:javascript|data|vbscript):/i.test(value)
);

const checkBase = (value: unknown, kind: string, schemaVersion: string, issues: string[]) => {
  if (!isRecord(value)) {
    issues.push('document: object required');
    return false;
  }
  if (value.kind !== kind) issues.push(`kind: must be ${kind}`);
  if (value.schemaVersion !== schemaVersion) issues.push(`schemaVersion: must be ${schemaVersion}`);
  return true;
};

export const validateIntentDocument = (value: unknown): IntentDocument => {
  const issues: string[] = [];
  if (checkBase(value, 'intent', 'assistant-intent/v1', issues)) {
    const document = value as Record<string, unknown>;
    requiredString(document.slug, 'slug', issues);
    requiredString(document.articleHref, 'articleHref', issues);
    requiredString(document.title, 'title', issues);
    stringArray(document.primaryIntents, 'primaryIntents', issues, false);
    stringArray(document.colloquialExamples, 'colloquialExamples', issues, false);
    stringArray(document.misspellings, 'misspellings', issues);
    stringArray(document.exclusions, 'exclusions', issues);
    requiredString(document.groundingSnippet, 'groundingSnippet', issues);
    requiredString(document.fallbackAdvice, 'fallbackAdvice', issues);
    requiredString(document.editorialVersion, 'editorialVersion', issues);
    if (!isSafeLocalHref(document.articleHref)) issues.push('articleHref: safe site-relative path required');
  }
  if (issues.length > 0) throw new EditorialSchemaError(issues);
  return value as IntentDocument;
};

const validateApprovedSource = (value: unknown, field: string, issues: string[]): value is ApprovedSource => {
  if (!isRecord(value)) {
    issues.push(`${field}: object required`);
    return false;
  }
  requiredString(value.name, `${field}.name`, issues);
  if (!isHttpsUrl(value.url)) issues.push(`${field}.url: valid HTTPS URL required`);
  if (typeof value.authority !== 'string' || !approvedAuthorities.has(value.authority as ApprovedSource['authority'])) {
    issues.push(`${field}.authority: unsupported authority`);
  }
  isoDate(value.accessedAt, `${field}.accessedAt`, issues);
  return true;
};

export const validateExternalTopicDocument = (value: unknown): ExternalTopicDocument => {
  const issues: string[] = [];
  if (checkBase(value, 'topic', 'assistant-topic/v1', issues)) {
    const document = value as Record<string, unknown>;
    requiredString(document.slug, 'slug', issues);
    requiredString(document.title, 'title', issues);
    stringArray(document.intents, 'intents', issues, false);
    stringArray(document.exclusions, 'exclusions', issues);
    requiredString(document.groundingSummary, 'groundingSummary', issues);
    requiredString(document.fallbackAdvice, 'fallbackAdvice', issues);
    if (!Array.isArray(document.approvedSources) || document.approvedSources.length === 0) {
      issues.push('approvedSources: at least one approved source required');
    } else {
      document.approvedSources.forEach((source, index) => validateApprovedSource(source, `approvedSources[${index}]`, issues));
    }
    isoDate(document.lastReviewedAt, 'lastReviewedAt', issues);
    if (!['pending', 'approved', 'needs-review'].includes(String(document.editorialReviewStatus))) {
      issues.push('editorialReviewStatus: pending, approved or needs-review required');
    }
    if (document.editorialReviewStatus === 'approved') requiredString(document.reviewedBy, 'reviewedBy', issues);
    requiredString(document.editorialVersion, 'editorialVersion', issues);
  }
  if (issues.length > 0) throw new EditorialSchemaError(issues);
  return value as ExternalTopicDocument;
};

const riskCodes = new Set<RiskTagCode>([
  'emergency', 'bite', 'ingestion', 'pain', 'person-injured', 'respiratory-distress',
  'urinary-obstruction', 'mobility-loss', 'medication-request', 'unknown-risk',
]);

export const validateEmergencyProtocol = (value: unknown): EmergencyProtocol => {
  const issues: string[] = [];
  if (!isRecord(value)) issues.push('protocol: object required');
  else {
    requiredString(value.slug, 'slug', issues);
    requiredString(value.title, 'title', issues);
    if (!['immediate', 'same-day', 'prompt'].includes(String(value.urgency))) issues.push('urgency: immediate, same-day or prompt required');
    if (!Array.isArray(value.riskTags) || value.riskTags.length === 0 || value.riskTags.some((tag) => typeof tag !== 'string' || !riskCodes.has(tag as RiskTagCode))) issues.push('riskTags: non-empty valid risk tag array required');
    requiredString(value.responseTemplate, 'responseTemplate', issues);
    stringArray(value.doNotDo, 'doNotDo', issues, false);
    if (value.articleHref !== undefined && !isSafeLocalHref(value.articleHref)) issues.push('articleHref: safe site-relative path required');
    requiredString(value.editorialVersion, 'editorialVersion', issues);
  }
  if (issues.length > 0) throw new EditorialSchemaError(issues);
  return value as EmergencyProtocol;
};

export const validateSafetyPrototype = (value: unknown): SafetyPrototype => {
  const issues: string[] = [];
  if (checkBase(value, 'safety-prototype', 'assistant-safety/v1', issues)) {
    const prototype = value as Record<string, unknown>;
    requiredString(prototype.slug, 'slug', issues);
    requiredString(prototype.title, 'title', issues);
    requiredString(prototype.protocolSlug, 'protocolSlug', issues);
    stringArray(prototype.canonicalExamples, 'canonicalExamples', issues, false);
    stringArray(prototype.lexicalPatterns, 'lexicalPatterns', issues, false);
    if (!Array.isArray(prototype.riskTags) || prototype.riskTags.length === 0 || prototype.riskTags.some((tag) => typeof tag !== 'string' || !riskCodes.has(tag as RiskTagCode))) issues.push('riskTags: non-empty valid risk tag array required');
    requiredString(prototype.editorialVersion, 'editorialVersion', issues);
  }
  if (issues.length > 0) throw new EditorialSchemaError(issues);
  return value as SafetyPrototype;
};

export const editorialSchemas = {
  intent: validateIntentDocument,
  topic: validateExternalTopicDocument,
  emergencyProtocol: validateEmergencyProtocol,
  safetyPrototype: validateSafetyPrototype,
} as const;
