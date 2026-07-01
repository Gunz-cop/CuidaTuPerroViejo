CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('allowed', 'quarantine', 'rejected')),
  spam_score INTEGER NOT NULL DEFAULT 0,
  ham_score INTEGER NOT NULL DEFAULT 0,
  final_score INTEGER NOT NULL DEFAULT 0,
  reasons TEXT NOT NULL DEFAULT '[]',
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_contact_status_created
ON contact_messages(status, created_at);

CREATE INDEX idx_contact_ip_hash_created
ON contact_messages(ip_hash, created_at);
