CREATE TABLE feedback_counts (
  slug TEXT,
  kind TEXT,
  n INTEGER,
  PRIMARY KEY (slug, kind)
);

CREATE TABLE feedback_votes (
  slug TEXT NOT NULL,
  kind TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  PRIMARY KEY (slug, kind, ip_hash)
);
