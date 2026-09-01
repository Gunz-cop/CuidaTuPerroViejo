/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
    CONTACT_IP_HASH_SALT?: string;
    CONTACT_ADMIN_USER?: string;
    CONTACT_ADMIN_PASSWORD?: string;
    CONTACT_DESTINATION_EMAIL?: string;
  }
}
