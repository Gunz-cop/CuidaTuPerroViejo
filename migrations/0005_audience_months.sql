CREATE TABLE audience_months (
  period TEXT NOT NULL,
  query_version TEXT NOT NULL,
  timezone TEXT NOT NULL CHECK (timezone = 'America/Costa_Rica'),
  start_utc TEXT NOT NULL,
  end_utc TEXT NOT NULL,
  covered_start_utc TEXT NOT NULL,
  covered_end_utc TEXT NOT NULL,
  covered_days INTEGER NOT NULL,
  completeness TEXT NOT NULL CHECK (completeness IN ('completo','parcial')),
  fetched_at TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source = 'cloudflare_rum'),
  filter_json TEXT NOT NULL,
  sample_interval REAL NOT NULL,
  estimated INTEGER NOT NULL CHECK (estimated IN (0,1)),
  report_json TEXT NOT NULL,
  updated_at TEXT,
  update_reason TEXT,
  PRIMARY KEY (period, query_version)
);
-- No hay ruta de recálculo en esta fase. Una intervención explícita debe dejar
-- motivo y hora nuevos. El cron solo usa INSERT ... ON CONFLICT DO NOTHING.
CREATE TRIGGER audience_months_explicit_update
BEFORE UPDATE ON audience_months
WHEN NEW.updated_at IS NULL OR NEW.updated_at = COALESCE(OLD.updated_at, '')
  OR length(trim(COALESCE(NEW.update_reason, ''))) = 0
BEGIN
  SELECT RAISE(ABORT, 'Explicit recalculation requires updated_at and reason');
END;
