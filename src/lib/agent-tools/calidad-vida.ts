// Escala HHHHHMM (contratos F4A §1.1). Datos y fórmula copiados sin cambios del
// script de la página en la base eff4ce1: suma de siete criterios 0–10, máximo
// 70, franjas >=50 buena y >=35 aceptable.
import { SCHEMA_VERSION, SITE, requireExactKeys, requireInteger, type Guide, type ToolInfo } from './contract.ts';

export const QUALITY_KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'] as const;
export type QualityKey = (typeof QUALITY_KEYS)[number];
export type QualityInput = Record<QualityKey, number>;
export type QualityBand = 'good' | 'acceptable' | 'compromised';

export const CRITERIA = [
  { key: 'hurt', emoji: '❤️', name: 'Hurt (Dolor)', label: 'Dolor', question: '¿Control adecuado del dolor y la respiración?', lo: 'Mucho dolor', hi: 'Sin dolor' },
  { key: 'hunger', emoji: '🍖', name: 'Hunger (Apetito)', label: 'Apetito', question: '¿Come por su cuenta o necesita ayuda?', lo: 'No come nada', hi: 'Come con ganas' },
  { key: 'hydration', emoji: '💧', name: 'Hydration (Hidratación)', label: 'Hidratación', question: '¿Bebe suficiente agua?', lo: 'Deshidratado', hi: 'Bien hidratado' },
  { key: 'hygiene', emoji: '✨', name: 'Hygiene (Higiene)', label: 'Higiene', question: '¿Se mantiene limpio?', lo: 'Sucio/Llagas', hi: 'Limpio' },
  { key: 'happiness', emoji: '🐕', name: 'Happiness (Felicidad)', label: 'Felicidad', question: '¿Muestra alegría?', lo: 'Deprimido', hi: 'Feliz' },
  { key: 'mobility', emoji: '🐾', name: 'Mobility (Movilidad)', label: 'Movilidad', question: '¿Puede moverse solo?', lo: 'Inmóvil', hi: 'Camina solo' },
  { key: 'moreGoodDays', emoji: '☀️', name: 'More Good Days (Balance)', label: 'Balance', question: '¿Hay más días buenos que malos?', lo: 'Lucha constante', hi: 'Plenitud' },
] as const satisfies ReadonlyArray<{ key: QualityKey; emoji: string; name: string; label: string; question: string; lo: string; hi: string }>;

export const CRITERION_MAX = 10;
export const MAX_SCORE = CRITERIA.length * CRITERION_MAX;
export const THRESHOLDS = { good: 50, acceptable: 35 } as const;

/**
 * Textos por franja. `interpretation` es el contenido del <strong> de
 * #qol-interpretation; `recommendation` reproduce `💡 <strong>…</strong>…` de
 * #qol-recommendation; `guideLabel` es el texto del CTA (null = CTA oculto).
 */
export const BANDS = {
  good: {
    interpretation: '✅ Calidad de Vida BUENA.',
    message: 'Tu perro aún disfruta momentos importantes contigo.',
    recommendation: { lead: '💡 ', strong: 'Sigue así:', rest: ' Mantén los cuidados actuales y visita al veterinario en los controles rutinarios. Tu perro está respondiendo bien.' },
    guideLabel: null,
  },
  acceptable: {
    interpretation: '⚠️ Calidad de Vida ACEPTABLE.',
    message: 'Estás en un punto donde observar y acompañar es clave.',
    recommendation: { lead: '💡 ', strong: 'Atención:', rest: ' Hay áreas que merecen seguimiento. Consulta a tu veterinario pronto para ajustar el plan de cuidados.' },
    guideLabel: '📖 Cómo mejorar la calidad de vida de tu perro',
  },
  compromised: {
    interpretation: '🛑 Calidad de Vida COMPROMETIDA.',
    message: 'Es un momento difícil. Buscar claridad ahora también es una forma de cuidar de él.',
    recommendation: { lead: '💡 ', strong: 'Importante:', rest: ' El puntaje indica sufrimiento significativo. Consulta a tu veterinario lo antes posible para evaluar opciones paliativas.' },
    guideLabel: '📖 Entender los cuidados paliativos y las opciones disponibles',
  },
} as const satisfies Record<QualityBand, { interpretation: string; message: string; recommendation: { lead: string; strong: string; rest: string }; guideLabel: string | null }>;

export const GUIDE_PATH = '/cuidados-paliativos-perros';

/** Avisos estáticos de la página (#qol-result-box y .qol-anti-guilt). */
export const QUALITY_NOTICES = [
  '💛 Esta herramienta es una guía. Tu amor y criterio siempre son lo más importante.',
  'Esta herramienta no toma decisiones por ti. Solo te ayuda a ver con más claridad lo que ya estás sintiendo.',
] as const;

export const QUALITY_TOOL: ToolInfo = {
  toolId: 'calidad-vida',
  documentId: 'tool--calidad-vida',
  name: 'Calculadora de Calidad de Vida Canina HHHHHMM',
  canonicalUrl: `${SITE}/herramientas/calculadora-calidad-vida-perros`,
  softwareVersion: '2.0',
  lastReviewed: '2026-07-21',
};

export function qualityBand(score: number): QualityBand {
  if (score >= THRESHOLDS.good) return 'good';
  if (score >= THRESHOLDS.acceptable) return 'acceptable';
  return 'compromised';
}

/** Valida una entrada estructurada (WebMCP/API): siete enteros 0..10, sin keys extra. */
export function parseQualityInput(value: unknown): QualityInput {
  const raw = requireExactKeys(value, QUALITY_KEYS);
  return Object.fromEntries(QUALITY_KEYS.map((key) => [key, requireInteger(raw[key], 0, CRITERION_MAX)])) as QualityInput;
}

export interface QualityOfLifeResult {
  schemaVersion: typeof SCHEMA_VERSION;
  tool: ToolInfo;
  input: QualityInput;
  score: number;
  maxScore: number;
  band: QualityBand;
  thresholds: { good: number; acceptable: number };
  breakdown: Array<{ criterion: QualityKey; label: string; value: number; max: number }>;
  interpretation: string;
  message: string;
  recommendation: string;
  guide: Guide | null;
  notices: string[];
}

export function evaluateQualityOfLife(value: unknown): QualityOfLifeResult {
  const input = parseQualityInput(value);
  const score = QUALITY_KEYS.reduce((total, key) => total + input[key], 0);
  const band = qualityBand(score);
  const text = BANDS[band];
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { ...QUALITY_TOOL },
    input,
    score,
    maxScore: MAX_SCORE,
    band,
    thresholds: { good: THRESHOLDS.good, acceptable: THRESHOLDS.acceptable },
    breakdown: CRITERIA.map((criterion) => ({ criterion: criterion.key, label: criterion.label, value: input[criterion.key], max: CRITERION_MAX })),
    interpretation: text.interpretation,
    message: text.message,
    recommendation: text.recommendation.lead + text.recommendation.strong + text.recommendation.rest,
    guide: text.guideLabel === null ? null : { label: text.guideLabel, url: SITE + GUIDE_PATH },
    notices: [...QUALITY_NOTICES],
  };
}
