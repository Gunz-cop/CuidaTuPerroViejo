/**
 * Historial local de la calculadora de calidad de vida (HHHHHMM).
 *
 * Los registros viven solo en el navegador de quien responde (localStorage):
 * no hay cuentas ni servidor. Este módulo es lógica pura para poder probarla
 * sin DOM; el componente `QualityOfLifeTool.astro` se encarga del almacenamiento.
 *
 * Igual que el resto de la adaptación, comparar dos registros describe cambios
 * en las respuestas: no clasifica el bienestar ni interpreta la suma.
 */
import { CRITERIA, CRITERION_MAX, QUALITY_KEYS, type QualityInput, type QualityKey } from './agent-tools/calidad-vida.ts';

export const HISTORY_STORAGE_KEY = 'ctpv:calidad-vida:historial:v1';
/** Tope de registros guardados; al superarlo se descartan los más antiguos. */
export const HISTORY_LIMIT = 60;
export const NOTE_MAX_LENGTH = 280;

export interface QualityRecord {
  id: string;
  /** Fecha y hora del registro en ISO 8601. */
  at: string;
  answers: QualityInput;
  score: number;
  note: string;
}

export interface CriterionChange {
  criterion: QualityKey;
  label: string;
  from: number;
  to: number;
  delta: number;
}

const isScore = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= CRITERION_MAX;

export function sumAnswers(answers: QualityInput): number {
  return QUALITY_KEYS.reduce((total, key) => total + answers[key], 0);
}

function parseRecord(value: unknown): QualityRecord | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.id !== 'string' || !raw.id) return null;
  if (typeof raw.at !== 'string' || Number.isNaN(Date.parse(raw.at))) return null;
  const rawAnswers = raw.answers;
  if (!rawAnswers || typeof rawAnswers !== 'object') return null;
  const answers = {} as QualityInput;
  for (const key of QUALITY_KEYS) {
    const score = (rawAnswers as Record<string, unknown>)[key];
    if (!isScore(score)) return null;
    answers[key] = score;
  }
  const note = typeof raw.note === 'string' ? raw.note.slice(0, NOTE_MAX_LENGTH) : '';
  // La suma se recalcula: no se confía en la guardada.
  return { id: raw.id, at: raw.at, answers, score: sumAnswers(answers), note };
}

const newestFirst = (a: QualityRecord, b: QualityRecord) => Date.parse(b.at) - Date.parse(a.at);

/** Lee el JSON guardado y devuelve solo registros válidos, del más reciente al más antiguo. */
export function parseHistory(raw: string | null | undefined): QualityRecord[] {
  if (!raw) return [];
  let data: unknown;
  try { data = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(data)) return [];
  const seen = new Set<string>();
  const records: QualityRecord[] = [];
  for (const item of data) {
    const record = parseRecord(item);
    if (!record || seen.has(record.id)) continue;
    seen.add(record.id);
    records.push(record);
  }
  return records.sort(newestFirst).slice(0, HISTORY_LIMIT);
}

export function createRecord(answers: QualityInput, at: Date, id: string, note = ''): QualityRecord {
  return { id, at: at.toISOString(), answers: { ...answers }, score: sumAnswers(answers), note: note.slice(0, NOTE_MAX_LENGTH) };
}

export function addRecord(history: readonly QualityRecord[], record: QualityRecord): QualityRecord[] {
  return [record, ...history.filter((item) => item.id !== record.id)].sort(newestFirst).slice(0, HISTORY_LIMIT);
}

export function removeRecord(history: readonly QualityRecord[], id: string): QualityRecord[] {
  return history.filter((item) => item.id !== id);
}

export function updateNote(history: readonly QualityRecord[], id: string, note: string): QualityRecord[] {
  return history.map((item) => (item.id === id ? { ...item, note: note.slice(0, NOTE_MAX_LENGTH) } : item));
}

/** Registro inmediatamente anterior al indicado (por fecha), o null si es el primero. */
export function previousRecord(history: readonly QualityRecord[], id: string): QualityRecord | null {
  const sorted = [...history].sort(newestFirst);
  const index = sorted.findIndex((item) => item.id === id);
  return index === -1 ? null : sorted[index + 1] ?? null;
}

/** Cambio por criterio entre dos registros, en el orden de la escala. Incluye los que no cambian (delta 0). */
export function compareAnswers(current: QualityInput, previous: QualityInput): CriterionChange[] {
  return CRITERIA.map(({ key, label }) => ({
    criterion: key,
    label,
    from: previous[key],
    to: current[key],
    delta: current[key] - previous[key],
  }));
}

/** Texto corto de un cambio para el desglose: «antes 7», o cadena vacía si no cambió. */
export function changeLabel(change: CriterionChange): string {
  if (change.delta === 0) return 'sin cambio';
  return `antes ${change.from}`;
}

export function formatRecordDate(iso: string, timeZone?: string): string {
  return new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric', timeZone }).format(new Date(iso));
}

export interface ShareTextInput {
  record: QualityRecord;
  previous: QualityRecord | null;
  message: string;
  warnings: readonly string[];
  recommendation: string;
  notices: readonly string[];
  url: string;
  timeZone?: string;
}

/** Texto plano para copiar o enviar al veterinario: fecha, desglose, cambios, nota y límites. */
export function buildShareText({ record, previous, message, warnings, recommendation, notices, url, timeZone }: ShareTextInput): string {
  const lines = [
    `📊 *Registro HHHHHMM del ${formatRecordDate(record.at, timeZone)}*`,
    `Suma: ${record.score}/${CRITERIA.length * CRITERION_MAX}`,
    '',
  ];
  for (const { key, label } of CRITERIA) lines.push(`  • ${label}: ${record.answers[key]}/${CRITERION_MAX}`);
  if (record.note) lines.push('', `Nota: ${record.note}`);
  if (previous) {
    const changed = compareAnswers(record.answers, previous.answers).filter((change) => change.delta !== 0);
    lines.push('', `Cambios desde el registro del ${formatRecordDate(previous.at, timeZone)} (${previous.score}/${CRITERIA.length * CRITERION_MAX}):`);
    if (changed.length) for (const change of changed) lines.push(`  • ${change.label}: ${change.from} → ${change.to}`);
    else lines.push('  • Mismas respuestas en las siete áreas.');
  }
  lines.push('', message, ...warnings, recommendation, notices.join(' '), `🔗 ${url}`);
  return lines.join('\n');
}
