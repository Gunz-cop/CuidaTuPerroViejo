/**
 * Métricas del asistente sobre D1 (tablas de `migrations/0003_assistant_metrics.sql`).
 *
 * Todo aquí es «mejor esfuerzo»: si la tabla no existe todavía o D1 falla, el
 * asistente sigue respondiendo y solo se pierde la medición.
 */
import { hashIp } from '../contact/security';
import type { AssistantSource, AssistantSurface, AssistantUsage } from './types';

export const QUESTION_RETENTION_DAYS = 180;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u;

export const isInteractionId = (value: unknown): value is string => typeof value === 'string' && UUID.test(value);

export const utcDay = (date = new Date()): string => date.toISOString().slice(0, 10);

/** Huella diaria: permite contar visitantes únicos por día sin poder seguirlos entre días. */
export const dailyVisitorHash = (ip: string, salt: string, day: string): Promise<string> => (
  hashIp(ip, `${salt}:assistant:${day}`).then((hash) => hash.slice(0, 32))
);

export type InteractionRecord = {
  id: string;
  day: string;
  visitorHash: string;
  conversationId: string | null;
  turn: number;
  surface: AssistantSurface;
  source: AssistantSource;
  model: string | null;
  question: string | null;
  questionChars: number;
  answerChars: number;
  guidesRead: string[];
  recommended: string[];
  urgent: boolean;
  latencyMs: number;
  usage: AssistantUsage | null;
  error: string | null;
};

const logFailure = (event: string, error: unknown) => {
  console.error(JSON.stringify({ event, error: error instanceof Error ? error.message : String(error) }));
};

export const recordInteraction = async (db: D1Database | undefined, record: InteractionRecord): Promise<void> => {
  if (!db) return;
  try {
    await db
      .prepare(
        `INSERT INTO assistant_interactions (
           id, day, visitor_hash, conversation_id, turn, surface, source, model, question,
           question_chars, answer_chars, guides_read, recommended, recommended_count, urgent,
           latency_ms, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, error
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        record.id,
        record.day,
        record.visitorHash,
        record.conversationId,
        record.turn,
        record.surface,
        record.source,
        record.model,
        record.question,
        record.questionChars,
        record.answerChars,
        JSON.stringify(record.guidesRead),
        JSON.stringify(record.recommended),
        record.recommended.length,
        record.urgent ? 1 : 0,
        record.latencyMs,
        record.usage?.inputTokens ?? 0,
        record.usage?.outputTokens ?? 0,
        record.usage?.cacheReadTokens ?? 0,
        record.usage?.cacheWriteTokens ?? 0,
        record.error,
      )
      .run();

    // Limpieza ocasional: el texto de las consultas no se conserva indefinidamente.
    if (Math.random() < 0.02) {
      await db
        .prepare(
          `UPDATE assistant_interactions SET question = NULL
           WHERE question IS NOT NULL AND created_at < datetime('now', ?)`,
        )
        .bind(`-${QUESTION_RETENTION_DAYS} days`)
        .run();
    }
  } catch (error) {
    logFailure('assistant_metrics_write_failed', error);
  }
};

/** Consultas atendidas hoy por el motor principal (el que consume cuota); null si no se puede saber. */
export const countPaidInteractionsToday = async (db: D1Database | undefined, day: string): Promise<number | null> => {
  if (!db) return null;
  try {
    const row = await db
      .prepare(`SELECT COUNT(*) AS n FROM assistant_interactions WHERE day = ? AND source IN ('workers-ai', 'claude')`)
      .bind(day)
      .first<{ n: number }>();
    return Number(row?.n ?? 0);
  } catch (error) {
    logFailure('assistant_metrics_read_failed', error);
    return null;
  }
};

export const recordFeedback = async (db: D1Database, id: string, value: 'up' | 'down'): Promise<boolean> => {
  const result = await db
    .prepare('UPDATE assistant_interactions SET feedback = ? WHERE id = ?')
    .bind(value, id)
    .run();
  return Number(result.meta.changes ?? 0) > 0;
};

export const recordClick = async (db: D1Database, id: string, href: string): Promise<boolean> => {
  const result = await db
    .prepare(
      `INSERT INTO assistant_clicks (interaction_id, href)
       SELECT ?, ? WHERE EXISTS (SELECT 1 FROM assistant_interactions WHERE id = ?)
       ON CONFLICT(interaction_id, href) DO NOTHING`,
    )
    .bind(id, href, id)
    .run();
  return Number(result.meta.changes ?? 0) > 0;
};
