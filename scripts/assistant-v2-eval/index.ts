import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { calculateMetrics, type OfflineMetrics } from './metrics';

export type GoldTriage = 'emergency' | 'non-emergency';
export type GoldDecision = 'article' | 'topic' | 'none';

export type EvaluationGold = {
  readonly triage: GoldTriage;
  readonly decision: GoldDecision;
  readonly slug: string | null;
};

export type EvaluationCase = {
  readonly id: string;
  readonly question: string;
  readonly gold: EvaluationGold;
  readonly tags: readonly string[];
  readonly category: string;
  readonly pairId?: string;
};

export type EvaluationNamespaces = {
  readonly articleSlugs: ReadonlySet<string>;
  readonly topicSlugs: ReadonlySet<string>;
};

export type DatasetLoadOptions = {
  /** Supply the editorial namespaces before freezing a dataset. */
  readonly namespaces?: EvaluationNamespaces;
};

export type RoutingPrediction = {
  readonly triage: GoldTriage;
  readonly decision: GoldDecision;
  readonly selectedSlugs: readonly string[];
};

export type RoutingCallback = (evaluationCase: EvaluationCase) => RoutingPrediction | Promise<RoutingPrediction>;

export type RoutingRun = {
  readonly caseId: string;
  readonly run: number;
  readonly prediction: RoutingPrediction;
};

export type EvaluationResult = {
  readonly cases: readonly EvaluationCase[];
  readonly runs: readonly RoutingRun[];
  readonly metrics: OfflineMetrics;
};

export class EvaluationDatasetError extends Error {
  readonly line: number | null;
  readonly issues: readonly string[];

  constructor(message: string, issues: readonly string[] = [], line: number | null = null) {
    super(message);
    this.name = 'EvaluationDatasetError';
    this.line = line;
    this.issues = issues;
  }
}

export type EvaluationPredictionFailure = 'callback-threw' | 'malformed-prediction';

export class EvaluationPredictionError extends Error {
  readonly caseId: string;
  readonly run: number;
  readonly failure: EvaluationPredictionFailure;

  constructor(caseId: string, run: number, failure: EvaluationPredictionFailure) {
    super(`Routing evaluation failed [${failure}] for case ${caseId}, run ${run}.`);
    this.name = 'EvaluationPredictionError';
    this.caseId = caseId;
    this.run = run;
    this.failure = failure;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isSlug = (value: string): boolean => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

const assertAllowedKeys = (value: Record<string, unknown>, allowed: readonly string[], path: string, issues: string[]) => {
  const known = new Set(allowed);
  for (const key of Object.keys(value)) {
    if (!known.has(key)) issues.push(`${path}.${key} is not allowed`);
  }
};

const validateNamespaces = (namespaces: EvaluationNamespaces): void => {
  for (const slug of namespaces.articleSlugs) {
    if (namespaces.topicSlugs.has(slug)) {
      throw new EvaluationDatasetError('Invalid evaluation namespaces', [`slug appears in both namespaces: ${slug}`]);
    }
  }
};

const parseCase = (value: unknown, line: number, namespaces?: EvaluationNamespaces): EvaluationCase => {
  const issues: string[] = [];
  if (!isRecord(value)) {
    throw new EvaluationDatasetError('Invalid JSONL case', ['case must be an object'], line);
  }
  assertAllowedKeys(value, ['id', 'question', 'gold', 'tags', 'category', 'pairId'], 'case', issues);
  if (!isNonEmptyString(value.id)) issues.push('id must be a non-empty string');
  if (isNonEmptyString(value.id) && value.id.length > 160) issues.push('id must be at most 160 characters');
  if (!isNonEmptyString(value.question)) issues.push('question must be a non-empty string');
  if (typeof value.question === 'string' && (value.question.length > 500 || value.question.includes('\n'))) {
    issues.push('question must be at most 500 characters and stay on one JSONL line');
  }
  if (!isNonEmptyString(value.category)) issues.push('category must be a non-empty string');
  if (!Array.isArray(value.tags) || value.tags.length === 0 || value.tags.some((tag) => !isNonEmptyString(tag))) {
    issues.push('tags must be a non-empty array of strings');
  } else if (new Set(value.tags).size !== value.tags.length) {
    issues.push('tags must not contain duplicates');
  }
  if (value.pairId !== undefined && !isNonEmptyString(value.pairId)) issues.push('pairId must be a non-empty string when present');

  let gold: EvaluationGold | null = null;
  if (!isRecord(value.gold)) {
    issues.push('gold must be an object');
  } else {
    assertAllowedKeys(value.gold, ['triage', 'decision', 'slug'], 'gold', issues);
    if (value.gold.triage !== 'emergency' && value.gold.triage !== 'non-emergency') {
      issues.push('gold.triage must be emergency or non-emergency');
    }
    if (value.gold.decision !== 'article' && value.gold.decision !== 'topic' && value.gold.decision !== 'none') {
      issues.push('gold.decision must be article, topic or none');
    }
    if (value.gold.slug !== null && !isNonEmptyString(value.gold.slug)) issues.push('gold.slug must be a slug string or null');
    if (typeof value.gold.slug === 'string' && !isSlug(value.gold.slug)) issues.push('gold.slug must use lowercase slug format');
    if (value.gold.decision === 'article' && (typeof value.gold.slug !== 'string' || !isSlug(value.gold.slug))) {
      issues.push('gold.slug is required when gold.decision is article');
    }
    if (value.gold.decision === 'topic' && (typeof value.gold.slug !== 'string' || !isSlug(value.gold.slug))) {
      issues.push('gold.slug is required when gold.decision is topic');
    }
    if (value.gold.decision === 'none' && value.gold.slug !== null) {
      issues.push('gold.slug must be null when gold.decision is none');
    }
    if (namespaces && (value.gold.decision === 'article' || value.gold.decision === 'topic') && typeof value.gold.slug === 'string' && isSlug(value.gold.slug)) {
      const expectedNamespace = value.gold.decision === 'article' ? namespaces.articleSlugs : namespaces.topicSlugs;
      const otherNamespace = value.gold.decision === 'article' ? namespaces.topicSlugs : namespaces.articleSlugs;
      if (otherNamespace.has(value.gold.slug)) {
        issues.push(`gold.slug crosses namespaces for gold.decision ${value.gold.decision}`);
      } else if (!expectedNamespace.has(value.gold.slug)) {
        issues.push(`gold.slug is not present in the ${value.gold.decision} namespace`);
      }
    }
    if (issues.length === 0) {
      gold = {
        triage: value.gold.triage as GoldTriage,
        decision: value.gold.decision as GoldDecision,
        slug: value.gold.slug as string | null,
      };
    }
  }

  if (issues.length > 0) throw new EvaluationDatasetError('Invalid JSONL case', issues, line);
  return {
    id: value.id as string,
    question: value.question as string,
    gold: gold!,
    tags: value.tags as string[],
    category: value.category as string,
    ...(value.pairId === undefined ? {} : { pairId: value.pairId as string }),
  };
};

/** Parse and validate JSONL without retaining or printing source text outside the returned cases. */
export const loadDatasetText = (text: string, options: DatasetLoadOptions = {}): readonly EvaluationCase[] => {
  if (options.namespaces) validateNamespaces(options.namespaces);
  const cases: EvaluationCase[] = [];
  const ids = new Set<string>();
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const sourceLine = lines[index]!;
    if (sourceLine.trim() === '') continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(sourceLine) as unknown;
    } catch {
      throw new EvaluationDatasetError('Invalid JSONL case', ['line is not valid JSON'], index + 1);
    }
    const evaluationCase = parseCase(parsed, index + 1, options.namespaces);
    if (ids.has(evaluationCase.id)) {
      throw new EvaluationDatasetError('Duplicate dataset id', [`duplicate id: ${evaluationCase.id}`], index + 1);
    }
    ids.add(evaluationCase.id);
    cases.push(evaluationCase);
  }
  const pairCounts = new Map<string, number>();
  for (const evaluationCase of cases) {
    if (evaluationCase.pairId) pairCounts.set(evaluationCase.pairId, (pairCounts.get(evaluationCase.pairId) ?? 0) + 1);
  }
  for (const [pairId, count] of pairCounts) {
    if (count < 2) throw new EvaluationDatasetError('Invalid pairId', [`pairId must identify at least two cases: ${pairId}`]);
  }
  return cases;
};

export const loadDatasetFile = async (filePath: string, options: DatasetLoadOptions = {}): Promise<readonly EvaluationCase[]> =>
  loadDatasetText(await readFile(filePath, 'utf8'), options);

const validatePrediction = (value: unknown): RoutingPrediction => {
  const issues: string[] = [];
  if (!isRecord(value)) throw new Error('prediction must be an object');
  assertAllowedKeys(value, ['triage', 'decision', 'selectedSlugs'], 'prediction', issues);
  if (value.triage !== 'emergency' && value.triage !== 'non-emergency') issues.push('triage must be emergency or non-emergency');
  if (value.decision !== 'article' && value.decision !== 'topic' && value.decision !== 'none') issues.push('decision must be article, topic or none');
  if (!Array.isArray(value.selectedSlugs) || value.selectedSlugs.some((slug) => !isNonEmptyString(slug) || !isSlug(slug))) {
    issues.push('selectedSlugs must be an array of lowercase slugs');
  } else if (new Set(value.selectedSlugs).size !== value.selectedSlugs.length) {
    issues.push('selectedSlugs must not contain duplicates');
  }
  if (value.decision === 'article' && (!Array.isArray(value.selectedSlugs) || value.selectedSlugs.length === 0)) {
    issues.push('article decision requires at least one selected slug');
  }
  if (Array.isArray(value.selectedSlugs) && value.selectedSlugs.length > 2) {
    issues.push('selectedSlugs may contain at most two slugs');
  }
  if (value.decision === 'article' && Array.isArray(value.selectedSlugs) && (value.selectedSlugs.length < 1 || value.selectedSlugs.length > 2)) {
    issues.push('article decision requires one or two selected slugs');
  }
  if (value.decision === 'topic' && (!Array.isArray(value.selectedSlugs) || value.selectedSlugs.length !== 1)) {
    issues.push('topic decision requires exactly one selected slug');
  }
  if (value.decision === 'none' && Array.isArray(value.selectedSlugs) && value.selectedSlugs.length > 0) {
    issues.push('none decision must not select slugs');
  }
  if (issues.length > 0) throw new Error(issues.join('; '));
  return {
    triage: value.triage as GoldTriage,
    decision: value.decision as GoldDecision,
    selectedSlugs: value.selectedSlugs as string[],
  };
};

/** Execute a deterministic routing seam locally; this function never calls a model or network. */
export const evaluateDataset = async (
  cases: readonly EvaluationCase[],
  route: RoutingCallback,
  options: { readonly runs?: number } = {},
): Promise<EvaluationResult> => {
  const runs = options.runs ?? 1;
  if (!Number.isInteger(runs) || runs < 1) throw new RangeError('runs must be a positive integer');
  const results: RoutingRun[] = [];
  for (let run = 1; run <= runs; run += 1) {
    for (const evaluationCase of cases) {
      let rawPrediction: unknown;
      try {
        rawPrediction = await route(evaluationCase);
      } catch {
        throw new EvaluationPredictionError(evaluationCase.id, run, 'callback-threw');
      }
      try {
        results.push({ caseId: evaluationCase.id, run, prediction: validatePrediction(rawPrediction) });
      } catch {
        throw new EvaluationPredictionError(evaluationCase.id, run, 'malformed-prediction');
      }
    }
  }
  return { cases, runs: results, metrics: calculateMetrics(cases, results) };
};

const usage = () => `Usage: npx tsx scripts/assistant-v2-eval/index.ts <dataset.jsonl>\n       npx tsx scripts/assistant-v2-eval/index.ts --help\n\nValidates the editorial JSONL dataset locally. Routing evaluation is exposed through evaluateDataset().`;

const isMainModule = (): boolean => {
  if (!process.argv[1]) return false;
  return resolve(process.argv[1]) === fileURLToPath(import.meta.url);
};

const runCli = async (): Promise<void> => {
  const [argument] = process.argv.slice(2);
  if (!argument || argument === '--help' || argument === '-h') {
    console.log(usage());
    if (!argument) process.exitCode = 1;
  } else {
    try {
      const cases = await loadDatasetFile(argument);
      console.log(JSON.stringify({ event: 'assistant_v2_dataset_validated', cases: cases.length }));
    } catch (error) {
      if (error instanceof EvaluationDatasetError) {
        const location = error.line === null ? '' : ` at line ${error.line}`;
        console.error(`${error.name}${location}: ${error.issues.join('; ')}`);
      } else {
        console.error(error instanceof Error ? error.message : 'Unable to load dataset');
      }
      process.exitCode = 1;
    }
  }
};

if (isMainModule()) void runCli();
