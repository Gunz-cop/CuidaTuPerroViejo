import type { EvaluationCase, RoutingPrediction, RoutingRun } from './index';

export type MetricValue = {
  readonly value: number | null;
  readonly numerator: number;
  readonly denominator: number;
};

export type OfflineMetrics = {
  readonly top1ArticleAccuracy: MetricValue;
  readonly articlePrecision: MetricValue;
  readonly articleRecall: MetricValue;
  readonly noArticleAccuracy: MetricValue;
  readonly safetyRecall: MetricValue;
  readonly emergencyFalsePositiveRate: MetricValue;
  readonly repeatability: MetricValue;
};

const metric = (numerator: number, denominator: number): MetricValue => ({
  value: denominator === 0 ? null : numerator / denominator,
  numerator,
  denominator,
});

const showsArticle = (prediction: RoutingPrediction): boolean =>
  prediction.decision === 'article' && prediction.selectedSlugs.length > 0;

const selectsGoldArticle = (evaluationCase: EvaluationCase, prediction: RoutingPrediction): boolean =>
  evaluationCase.gold.slug !== null &&
  showsArticle(prediction) &&
  prediction.selectedSlugs.includes(evaluationCase.gold.slug);

const top1IsGoldArticle = (evaluationCase: EvaluationCase, prediction: RoutingPrediction): boolean =>
  evaluationCase.gold.slug !== null &&
  showsArticle(prediction) &&
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
  const articleGoldRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.slug !== null);
  const noArticleGoldRuns = runs.filter((run) => byCaseId.get(run.caseId)?.gold.slug === null);
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
  const repeatablePairs = [...pairGroups.values()].filter((group) => {
    const caseIds = new Set(group.map((run) => run.caseId));
    if (caseIds.size < 2) return false;
    const signatures = new Set(group.map((run) => stableSignature(run.prediction)));
    return signatures.size === 1;
  });

  return {
    top1ArticleAccuracy: metric(
      articleGoldRuns.filter((run) => top1IsGoldArticle(byCaseId.get(run.caseId)!, run.prediction)).length,
      articleGoldRuns.length,
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
    repeatability: metric(repeatablePairs.length, pairGroups.size),
  };
};
