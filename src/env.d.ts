/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace Cloudflare {
  interface Env {
    CF_ANALYTICS_TOKEN?: string;
    /** Ausente por defecto. Solo habilitar para una recuperación histórica autorizada aparte. */
    AUDIENCE_RECOVERY_TOKEN?: string;
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
    CONTACT_IP_HASH_SALT?: string;
    CONTACT_ADMIN_USER?: string;
    CONTACT_ADMIN_PASSWORD?: string;
    CONTACT_DESTINATION_EMAIL?: string;
    /** Motor del asistente: "workers-ai" (por defecto) o "anthropic". */
    ASSISTANT_PROVIDER?: string;
    /** Modelo del motor elegido; por defecto @cf/deepseek-ai/deepseek-v4.1-flash-1017. */
    ASSISTANT_MODEL?: string;
    /** Razonamiento. Workers AI: none, low (por defecto), high o max. Anthropic: low, medium o high. */
    ASSISTANT_EFFORT?: string;
    /** Tope de consultas diarias atendidas por el motor principal; por defecto 200. */
    ASSISTANT_DAILY_LIMIT?: string;
    /** Solo con ASSISTANT_PROVIDER=anthropic: clave de la API de Anthropic. */
    ANTHROPIC_API_KEY?: string;
    /** Solo con Anthropic: enrutar por Cloudflare AI Gateway u otro proxy compatible. */
    ANTHROPIC_BASE_URL?: string;
    /** "off" para no guardar el texto de las consultas en las métricas. */
    ASSISTANT_LOG_QUESTIONS?: string;
  }
}
