import type { EvaluationCase, RoutingPrediction, RoutingRun } from './index';

export type MetricValue = {
  readonly value: number | null;
  readonly numerator: number;
  readonly denominator: number;
};

export type RepeatabilityMetrics = {
  /** Same caseId produces the same routing decision across all requested runs. */
  readonly sameCaseRuns: MetricValue;
  /** Every case in an eligible pairId group produces the same decision across all runs. */
  readonly equivalentPairs: MetricValue;
};

export type OfflineMetrics = {
  readonly top1ArticleAccuracy: MetricValue;
  readonly top1TopicAccuracy: MetricValue;
  readonly articlePrecision: MetricValue;
  readonly articleRecall: MetricValue;
  readonly noArticleAccuracy: MetricValue;
  readonly safetyRecall: MetricValue;
  readonly emergencyFalsePositiveRate: MetricValue;
  readonly repeatability: RepeatabilityMetrics;
};

const metric = (numerator: number, denominator: number): MetricValue => ({
  value: denominator === 0 ? null : numerator / denominator,
  numerator,
  denominator,
});

const showsArticle = (prediction: RoutingPrediction): boolean =>
  prediction.decision === 'article' && prediction.selectedSlugs.length > 0;

const selectsGoldArticle = (evaluationCase: EvaluationCase, prediction: RoutingPrediction): boolean =>
  evaluationCase.gold.decision === 'article' &&
  evaluationCase.gold.slug !== null &&
  showsArticle(prediction) &&
  prediction.selectedSlugs.includes(evaluationCase.gold.slug);

const top1IsGoldArticle = (evaluationCase: EvaluationCase, prediction: RoutingPrediction): boolean =>
  evaluationCase.gold.decision === 'article' &&
  evaluationCase.gold.slug !== null &&
  showsArticle(prediction) &&
  prediction.selectedSlugs[0] === evaluationCase.gold.slug;

const top1IsGoldTopic = (evaluationCase: EvaluationCase, prediction: RoutingPrediction): boolean =>
  evaluationCase.gold.decision === 'topic' &&
  evaluationCase.gold.slug !== null &&
  prediction.decision === 'topic' &&
  prediction.selectedSlugs[0] === evaluationCase.gold.slug;

const stableSignature = (prediction: RoutingPrediction): string =>
  JSON.stringify({
    triage: prediction.triage,
    decision: prediction.decision,
    selectedSlugs: prediction.selectedSlugs,
  });

/** Pure decision metrics. No thresholds, models, clocks or network are used. */
export const calculateMetrics = (
  cases: readonly EvaluationCase[],
  runs: readonly RoutingRun[],
): OfflineMetrics => {
  const byCaseId = new Map(cases.map((evaluationCase) => [evaluationCase.id, evaluationCase]));
  const articleGoldRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.decision === 'article');
  const topicGoldRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.decision === 'topic');
  const noArticleGoldRuns = runs.filter((run) => {
    const decision = byCaseId.get(run.caseId)?.gold.decision;
    return decision === 'topic' || decision === 'none';
  });
  const shownArticleRuns = runs.filter((run) => showsArticle(run.prediction));
  const emergencyGoldRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.triage === 'emergency');
  const nonEmergencyRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.triage === 'non-emergency');

  const pairGroups = new Map<string, RoutingRun[]>();
  for (const run of runs) {
    const pairId = byCaseId.get(run.caseId)?.pairId;
    if (!pairId) continue;
    const group = pairGroups.get(pairId) ?? [];
    group.push(run);
    pairGroups.set(pairId, group);
  }
  const eligiblePairs = [...pairGroups.values()].filter((group) => new Set(group.map((run) => run.caseId)).size >= 2);
  const repeatablePairs = eligiblePairs.filter((group) => {
    const byCase = new Map<string, Map<number, string>>();
    for (const run of group) {
      const caseRuns = byCase.get(run.caseId) ?? new Map<number, string>();
      caseRuns.set(run.run, stableSignature(run.prediction));
      byCase.set(run.caseId, caseRuns);
    }
    const runNumbers = new Set(group.map((run) => run.run));
    return [...runNumbers].every((runNumber) => {
      const signatures = [...byCase.values()].map((caseRuns) => caseRuns.get(runNumber));
      return signatures.every((signature) => signature !== undefined) && new Set(signatures).size === 1;
    });
  });

  const runsByCase = new Map<string, RoutingRun[]>();
  for (const run of runs) {
    const group = runsByCase.get(run.caseId) ?? [];
    group.push(run);
    runsByCase.set(run.caseId, group);
  }
  const eligibleCases = [...runsByCase.values()].filter((group) => group.length >= 2);
  const repeatableCases = eligibleCases.filter((group) => new Set(group.map((run) => stableSignature(run.prediction))).size === 1);

  return {
    top1ArticleAccuracy: metric(
      articleGoldRuns.filter((run) => top1IsGoldArticle(byCaseId.get(run.caseId)!, run.prediction)).length,
      articleGoldRuns.length,
    ),
    top1TopicAccuracy: metric(
      topicGoldRuns.filter((run) => top1IsGoldTopic(byCaseId.get(run.caseId)!, run.prediction)).length,
      topicGoldRuns.length,
    ),
    articlePrecision: metric(
      shownArticleRuns.filter((run) => selectsGoldArticle(byCaseId.get(run.caseId)!, run.prediction)).length,
      shownArticleRuns.length,
    ),
    articleRecall: metric(
      articleGoldRuns.filter((run) => selectsGoldArticle(byCaseId.get(run.caseId)!, run.prediction)).length,
      articleGoldRuns.length,
    ),
    noArticleAccuracy: metric(
      noArticleGoldRuns.filter((run) => !showsArticle(run.prediction)).length,
      noArticleGoldRuns.length,
    ),
    safetyRecall: metric(
      emergencyGoldRuns.filter((run) => run.prediction.triage === 'emergency').length,
      emergencyGoldRuns.length,
    ),
    emergencyFalsePositiveRate: metric(
      nonEmergencyRuns.filter((run) => run.prediction.triage === 'emergency').length,
      nonEmergencyRuns.length,
    ),
    repeatability: {
      sameCaseRuns: metric(repeatableCases.length, eligibleCases.length),
      equivalentPairs: metric(repeatablePairs.length, eligiblePairs.length),
    },
  };
};
