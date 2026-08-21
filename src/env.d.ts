/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime?: {
      env?: {
        AI?: Ai;
        CONTACT_KV?: KVNamespace;
        CONTACT_DB?: D1Database;
        EMAIL?: SendEmail;
        CONTACT_ADMIN_USER?: string;
        CONTACT_ADMIN_PASSWORD?: string;
        CONTACT_DESTINATION_EMAIL?: string;
      };
    };
  }
}
