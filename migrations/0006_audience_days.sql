CREATE TABLE audience_days (
  day TEXT NOT NULL,
  query_version TEXT NOT NULL,
  timezone TEXT NOT NULL CHECK (timezone = 'America/Costa_Rica'),
  start_utc TEXT NOT NULL,
  end_utc TEXT NOT NULL,
  visits REAL NOT NULL CHECK (visits >= 0),
  pageviews REAL NOT NULL CHECK (pageviews > 0),
  sample_interval REAL NOT NULL CHECK (sample_interval >= 1),
  estimated INTEGER NOT NULL CHECK (estimated IN (0,1) AND estimated = (sample_interval > 1)),
  fetched_at TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source = 'cloudflare_rum'),
  filter_json TEXT NOT NULL,
  updated_at TEXT,
  update_reason TEXT,
  PRIMARY KEY (day, query_version)
);
-- El archivo ordinario y recoverDays nunca actualizan ni borran filas.
CREATE TRIGGER audience_days_explicit_update
BEFORE UPDATE ON audience_days
WHEN NEW.updated_at IS NULL OR NEW.updated_at = COALESCE(OLD.updated_at, '')
  OR length(trim(COALESCE(NEW.update_reason, ''))) = 0
BEGIN
  SELECT RAISE(ABORT, 'Explicit recalculation requires updated_at and reason');
END;
