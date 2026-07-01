# CuidaTuPerroViejo

Sitio estático en Astro para guías, recursos y herramientas interactivas sobre el cuidado de perros senior.

## Comandos

```bash
npm install
npm run dev      # Servidor de desarrollo local
npm run build    # Compila el sitio (y ejecuta automáticamente la indexación)
npm run preview  # Previsualiza la build de forma local
npm run sdi:run  # Ejecuta el script de indexación (Search Discovery) manualmente
```

## Contacto: Turnstile, D1 y email

El formulario publica en `/api/contact`, valida Cloudflare Turnstile en servidor, guarda todos los mensajes válidos en D1 y solo envía email cuando el scoring queda en `allowed`. Los mensajes `quarantine` y `rejected` quedan guardados sin notificación inmediata.

Variables necesarias:

```bash
TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
CONTACT_IP_HASH_SALT=...
CONTACT_ADMIN_USER=...
CONTACT_ADMIN_PASSWORD=...
CONTACT_DESTINATION_EMAIL=...
```

El envío usa el binding actual de Cloudflare Email Sending:

```jsonc
"send_email": [{ "name": "EMAIL" }]
```

Crear la base D1 y reemplazar el `database_id` de `wrangler.jsonc`:

```bash
npx wrangler d1 create cuidatuperroviejo-contact
npx wrangler d1 migrations apply cuidatuperroviejo-contact --remote
```

La migración está en `migrations/0001_contact_messages.sql` y crea `contact_messages` con índices por estado/IP hash.

El admin está en `/admin/contact-messages` y exige Basic Auth con `CONTACT_ADMIN_USER` y `CONTACT_ADMIN_PASSWORD`. Permite filtrar por `quarantine`, `rejected` y `allowed`, cambiar estados y reenviar email al marcar como `allowed`.

Rate limiting recomendado en Cloudflare para `/api/contact`: máximo 3 a 5 envíos por IP cada 10 minutos. Configurarlo como regla en Cloudflare, ya que no se puede crear de forma portable desde el código del proyecto.

## Indexación y Descubrimiento (SDI)

El script de indexación local (`lib/discovery/run.ts`) está automatizado para ejecutarse en el ciclo de vida de Node.js después de cada compilación mediante el script **`postbuild`** de `package.json`.

- **Indexación automática**: Cada vez que se compila el proyecto (`npm run build` o `npm run deploy`), se ejecuta `npx tsx lib/discovery/run.ts`.
- **Destinos**: Envía automáticamente las URLs nuevas o modificadas a **Google Indexing API** y a **IndexNow**.
- **Configuración**: Lee las claves API y de servicio directamente desde el archivo `.env` local (`INDEXNOW_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`).
- **Logs de envío**: Puedes monitorear los resultados y envíos consultando el archivo de estado generado en `lib/discovery/state/sdi-submissions.json`.
