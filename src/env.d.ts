/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
    CONTACT_IP_HASH_SALT?: string;
    CONTACT_ADMIN_USER?: string;
    CONTACT_ADMIN_PASSWORD?: string;
    CONTACT_DESTINATION_EMAIL?: string;
    /** Clave de la API de Anthropic. Sin ella el asistente usa el flujo de respaldo. */
    ANTHROPIC_API_KEY?: string;
    /** Opcional: enrutar por Cloudflare AI Gateway u otro proxy compatible. */
    ANTHROPIC_BASE_URL?: string;
    /** Modelo del asistente; por defecto claude-sonnet-5-5. */
    ASSISTANT_MODEL?: string;
    /** Profundidad de razonamiento: low (por defecto), medium o high. */
    ASSISTANT_EFFORT?: string;
    /** Tope de consultas diarias atendidas por Claude; por defecto 200. */
    ASSISTANT_DAILY_LIMIT?: string;
    /** "off" para no guardar el texto de las consultas en las métricas. */
    ASSISTANT_LOG_QUESTIONS?: string;
  }
}
