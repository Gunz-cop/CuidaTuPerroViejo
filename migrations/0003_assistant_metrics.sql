-- Métricas del asistente IA. Una fila por consulta respondida.
-- No se guarda la IP: `visitor_hash` es una huella que rota cada día, suficiente
-- para contar visitantes únicos diarios y nada más.
CREATE TABLE assistant_interactions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  conversation_id TEXT,
  turn INTEGER NOT NULL DEFAULT 1,
  surface TEXT NOT NULL,
  source TEXT NOT NULL,
  model TEXT,
  question TEXT,
  question_chars INTEGER NOT NULL DEFAULT 0,
  answer_chars INTEGER NOT NULL DEFAULT 0,
  guides_read TEXT NOT NULL DEFAULT '[]',
  recommended TEXT NOT NULL DEFAULT '[]',
  recommended_count INTEGER NOT NULL DEFAULT 0,
  urgent INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  cache_write_tokens INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  feedback TEXT
);

CREATE INDEX assistant_interactions_day ON assistant_interactions (day);

-- Clics en las guías recomendadas por el asistente.
CREATE TABLE assistant_clicks (
  interaction_id TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (interaction_id, href)
);
