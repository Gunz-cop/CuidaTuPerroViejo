/**
 * Contador propio de clics en fichas afiliadas (tabla de
 * `migrations/0004_affiliate_clicks.sql`).
 *
 * Solo guarda totales por día, ubicación, país estimado por Cloudflare y
 * entorno. No guarda IP, huellas, identificadores de visitante ni la URL
 * completa de la que viene el clic. Es una medición de mejor esfuerzo: si D1
 * falla o la tabla no existe, el enlace afiliado sigue funcionando igual.
 */

export type AffiliateProvider = 'aliexpress';

export type AffiliatePlacement = {
  /** Identificador estable, igual al `data-affiliate-placement` del HTML. */
  id: string;
  provider: AffiliateProvider;
  /** Ruta canónica de la página donde vive la ficha. */
  page: string;
  /** Nombre corto para el panel. */
  label: string;
  /** Tracking ID del programa con el que se emitió el enlace. */
  trackingId: string;
};

/**
 * Registro de ubicaciones aceptadas. El servidor rechaza cualquier otra, así que
 * una ficha nueva necesita una entrada aquí antes de contar clics.
 */
export const AFFILIATE_PLACEMENTS: readonly AffiliatePlacement[] = [
  {
    id: 'cama-guia-01',
    provider: 'aliexpress',
    page: '/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis',
    label: 'Cama tipo sofá · guía de camas',
    trackingId: 'default',
  },
  {
    id: 'camas-cmp-a',
    provider: 'aliexpress',
    page: '/movilidad-dolor-perros-mayores/camas-entrada-baja-perro-mayor-comparativa',
    label: 'Cama tipo sofá · comparativa de camas',
    trackingId: 'camas-cmp-a',
  },
  {
    id: 'camas-cmp-b',
    provider: 'aliexpress',
    page: '/movilidad-dolor-perros-mayores/camas-entrada-baja-perro-mayor-comparativa',
    label: 'Colchón plano XL · comparativa de camas',
    trackingId: 'camas-cmp-b',
  },
  {
    id: 'camas-cmp-c',
    provider: 'aliexpress',
    page: '/movilidad-dolor-perros-mayores/camas-entrada-baja-perro-mayor-comparativa',
    label: 'Cama elevada L · comparativa de camas',
    trackingId: 'camas-cmp-c',
  },
];

export const PROVIDER_LABEL: Record<AffiliateProvider, string> = {
  aliexpress: 'AliExpress',
};

const PLACEMENT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

export const findPlacement = (value: unknown): AffiliatePlacement | null => {
  if (typeof value !== 'string' || value.length > 64 || !PLACEMENT_ID.test(value)) return null;
  return AFFILIATE_PLACEMENTS.find((placement) => placement.id === value) ?? null;
};

/** Código que se guarda cuando Cloudflare no da país. */
export const UNKNOWN_COUNTRY = 'XX';

/**
 * Normaliza el país que Cloudflare asigna a la solicitud. Cloudflare usa `XX`
 * cuando no lo sabe y `T1` para Tor; ambos se conservan como códigos aparte.
 */
export const normalizeCountry = (value: unknown): string => {
  if (typeof value !== 'string') return UNKNOWN_COUNTRY;
  const code = value.trim().toUpperCase();
  return /^(?:[A-Z]{2}|T1)$/u.test(code) ? code : UNKNOWN_COUNTRY;
};

export const countryFromRequest = (request: Request): string => {
  const cf = (request as Request & { cf?: { country?: unknown } }).cf;
  return normalizeCountry(cf?.country ?? request.headers.get('cf-ipcountry'));
};

export type ClickEnvironment = 'produccion' | 'prueba';

export const PRODUCTION_HOSTS: ReadonlySet<string> = new Set(['cuidatuperroviejo.com', 'www.cuidatuperroviejo.com']);

/**
 * Solo cuenta como producción lo que llega al dominio público. Las vistas
 * previas, `workers.dev` y el entorno local quedan marcados como prueba para
 * que el panel pueda separarlos sin depender de lo que diga el navegador.
 */
export const classifyEnvironment = (requestUrl: string): ClickEnvironment => {
  try {
    return PRODUCTION_HOSTS.has(new URL(requestUrl).hostname) ? 'produccion' : 'prueba';
  } catch {
    return 'prueba';
  }
};

/**
 * Acepta el evento solo si lo envía una página del mismo sitio. Los navegadores
 * añaden `Origin` a `sendBeacon` y a `fetch` con cuerpo; sin esa cabecera se
 * mira `Referer`. No es una defensa contra quien fabrique peticiones a mano
 * (para eso está la limitación por minuto), pero descarta envíos desde otras
 * webs.
 */
export const isSameOrigin = (request: Request): boolean => {
  let expected: string;
  try {
    expected = new URL(request.url).origin;
  } catch {
    return false;
  }
  const origin = request.headers.get('origin');
  if (origin) return origin === expected;
  const referer = request.headers.get('referer');
  if (!referer) return false;
  try {
    return new URL(referer).origin === expected;
  } catch {
    return false;
  }
};

export const utcDay = (date = new Date()): string => date.toISOString().slice(0, 10);

export type ClickRecord = {
  day: string;
  placement: AffiliatePlacement;
  country: string;
  environment: ClickEnvironment;
};

export const recordAffiliateClick = async (db: D1Database | undefined, record: ClickRecord): Promise<void> => {
  if (!db) return;
  await db
    .prepare(
      `INSERT INTO affiliate_clicks_daily (day, placement, provider, page, country, environment, clicks)
       VALUES (?, ?, ?, ?, ?, ?, 1)
       ON CONFLICT (day, placement, country, environment)
       DO UPDATE SET clicks = clicks + 1, updated_at = datetime('now')`,
    )
    .bind(
      record.day,
      record.placement.id,
      record.placement.provider,
      record.placement.page,
      record.country,
      record.environment,
    )
    .run();
};

/** Nombre del país en español para el panel; si el código no se reconoce, se muestra tal cual. */
export const countryName = (code: string): string => {
  if (code === UNKNOWN_COUNTRY) return 'Sin determinar';
  if (code === 'T1') return 'Red Tor';
  try {
    return new Intl.DisplayNames(['es'], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
};
