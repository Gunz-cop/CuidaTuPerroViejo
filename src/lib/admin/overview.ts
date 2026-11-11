export type PeriodTotals = { days7: number; days30: number };
export type MessageTotals = { quarantine: number };
export type Summary<T> = { data: T; error: null } | { data: null; error: string };

export function overviewQueries(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const since = (days: number) => new Date(now.getTime() - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  return {
    today, since7: since(7), since30: since(30),
    affiliate: {
      sql: `SELECT COALESCE(SUM(CASE WHEN day >= ?1 THEN clicks ELSE 0 END), 0) AS days7,
                   COALESCE(SUM(clicks), 0) AS days30
            FROM affiliate_clicks_daily WHERE day >= ?2 AND day <= ?3 AND environment = ?4`,
      values: [since(7), since(30), today, 'produccion'],
    },
    assistant: {
      sql: `SELECT COALESCE(SUM(CASE WHEN day >= ?1 THEN 1 ELSE 0 END), 0) AS days7,
                   COUNT(*) AS days30
            FROM assistant_interactions WHERE day >= ?2 AND day <= ?3`,
      values: [since(7), since(30), today],
    },
    messages: {
      sql: 'SELECT COUNT(*) AS quarantine FROM contact_messages WHERE status = ?',
      values: ['quarantine'],
    },
  };
}

async function read<T>(db: D1Database | undefined, query: { sql: string; values: string[] }): Promise<Summary<T>> {
  if (!db) return { data: null, error: 'Base de datos no disponible. Revisa la configuración de CONTACT_DB.' };
  try {
    const row = await db.prepare(query.sql).bind(...query.values).first<T>();
    if (!row) throw new Error('Missing aggregate');
    return { data: row, error: null };
  } catch {
    // No exponer errores SQL, datos personales ni detalles de infraestructura.
    return { data: null, error: 'No se pudo consultar esta fuente. Revisa su panel y la disponibilidad de sus tablas.' };
  }
}

export async function loadOverview(db: D1Database | undefined, now = new Date()) {
  const queries = overviewQueries(now);
  const [affiliate, assistant, messages] = await Promise.all([
    read<PeriodTotals>(db, queries.affiliate),
    read<PeriodTotals>(db, queries.assistant),
    read<MessageTotals>(db, queries.messages),
  ]);
  return { affiliate, assistant, messages, today: queries.today, since7: queries.since7, since30: queries.since30 };
}
