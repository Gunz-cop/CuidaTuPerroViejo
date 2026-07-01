import type { ContactMessageRecord } from './types';

export async function insertContactMessage(db: any, record: ContactMessageRecord): Promise<number | null> {
  if (!db) throw new Error('CONTACT_DB binding is not configured');

  const result = await db
    .prepare(`
      INSERT INTO contact_messages (
        name, email, subject, message, status,
        spam_score, ham_score, final_score, reasons,
        ip_hash, user_agent, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      record.name,
      record.email,
      record.subject,
      record.message,
      record.status,
      record.spamScore,
      record.hamScore,
      record.finalScore,
      JSON.stringify(record.reasons),
      record.ipHash,
      record.userAgent,
      record.createdAt,
    )
    .run();

  return result?.meta?.last_row_id ?? null;
}
