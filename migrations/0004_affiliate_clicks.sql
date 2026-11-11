-- Clics en fichas afiliadas, agregados. Una fila por día (UTC), ubicación,
-- país estimado por Cloudflare y entorno.
-- No se guarda IP, huella ni identificador de visitante: solo el total.
-- `country` usa el código ISO de dos letras; `XX` = sin determinar, `T1` = Tor.
-- `environment` separa el dominio público ('produccion') de vistas previas y
-- pruebas locales ('prueba').
CREATE TABLE affiliate_clicks_daily (
  day TEXT NOT NULL,
  placement TEXT NOT NULL,
  provider TEXT NOT NULL,
  page TEXT NOT NULL,
  country TEXT NOT NULL,
  environment TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (day, placement, country, environment)
);

CREATE INDEX affiliate_clicks_daily_day ON affiliate_clicks_daily (day);
