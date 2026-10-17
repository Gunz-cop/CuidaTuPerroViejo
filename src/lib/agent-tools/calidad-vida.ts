// Adaptación digital de HHHHHMM: siete observaciones 0–10; suma 0–70.
// No clasificamos el bienestar por la suma. Avisar de cada respuesta en 0 es
// una regla editorial propia (no un umbral clínico validado); no altera el total.
import { SCHEMA_VERSION, SITE, requireExactKeys, requireInteger, type Guide, type ToolInfo } from './contract.ts';

export const QUALITY_KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'] as const;
export type QualityKey = (typeof QUALITY_KEYS)[number];
export type QualityInput = Record<QualityKey, number>;
export type QualityBand = 'not-classified';

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
export const INTERPRETATION = 'Registro de observaciones; no es un diagnóstico.';
export const RESULT_MESSAGE = 'Una suma alta no garantiza bienestar ni compensa una dificultad importante en un criterio.';
export const RECOMMENDATION = 'Revisa cada respuesta con tu veterinario y describe los cambios respecto a su situación habitual. No cambies tratamientos basándote en esta suma.';
export interface QualityWarning { criterion: QualityKey; message: string }

/** Regla editorial propia: destacar los extremos negativos declarados por quien responde. */
export function qualityWarnings(input: QualityInput): QualityWarning[] {
  return CRITERIA.filter(({ key }) => input[key] === 0).map(({ key, label }) => ({
    criterion: key,
    message: key === 'hurt'
      ? 'Dolor/alivio: has marcado 0/10. Contacta con tu veterinario cuanto antes, aunque la suma sea alta. Si tiene dificultad para respirar o dolor intenso, busca atención veterinaria inmediata; no esperes a repetir el registro.'
      : `${label}: has marcado 0/10. Describe esta dificultad a tu veterinario; los puntos de otras áreas no la compensan.`,
  }));
}

export const GUIDE_PATH = '/cuidados-paliativos-perros';

/** Avisos estáticos de la página (#qol-result-box y .qol-anti-guilt). */
export const QUALITY_NOTICES = [
  'Esta herramienta ordena observaciones y no sustituye una valoración veterinaria.',
  'Una suma alta no descarta dolor ni enfermedad. Si observas dificultad respiratoria o dolor intenso, busca atención veterinaria inmediata.',
] as const;

export const QUALITY_TOOL: ToolInfo = {
  toolId: 'calidad-vida',
  documentId: 'tool--calidad-vida',
  name: 'Calculadora de Calidad de Vida Canina HHHHHMM',
  canonicalUrl: `${SITE}/herramientas/calculadora-calidad-vida-perros`,
  softwareVersion: '3.0',
  lastReviewed: '2026-10-17',
};

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
  thresholds: null;
  warnings: QualityWarning[];
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
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { ...QUALITY_TOOL },
    input,
    score,
    maxScore: MAX_SCORE,
    band: 'not-classified',
    thresholds: null,
    warnings: qualityWarnings(input),
    breakdown: CRITERIA.map((criterion) => ({ criterion: criterion.key, label: criterion.label, value: input[criterion.key], max: CRITERION_MAX })),
    interpretation: INTERPRETATION,
    message: RESULT_MESSAGE,
    recommendation: RECOMMENDATION,
    guide: { label: 'Preparar la consulta sobre cuidados y bienestar', url: SITE + GUIDE_PATH },
    notices: [...QUALITY_NOTICES],
  };
}
