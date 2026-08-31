# F1 — Plataforma, sobre Astro 4

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `main` · **Depende de:** F0 (fusionada)
**Método:** skill `upgrade-astro-cloudflare` (`~/.claude/skills/`)

## Objetivo

Cobrar las mejoras de plataforma que ya son válidas hoy y que sobreviven
intactas a las cuatro fases de versión: caché, cabeceras de seguridad, límite de
abuso, tamaño del Worker y limpieza. **No se toca ninguna versión de
dependencia.**

Importa hacerlo antes: llegar a la migración con un Worker diez veces más
pequeño y con la entrega ya resuelta reduce lo que hay que verificar en cada
salto.

## Contrato de entrada

Ya existe y **no** hay que crearlo:

- La compuerta de CI (`.github/workflows/ci.yml`) con ocho pasos. Todo lo que
  esta fase añada tiene que seguir pasándola.
- `worker-configuration.d.ts` generado y `npm run types:worker` para
  regenerarlo. **Si esta fase toca `wrangler.jsonc`, hay que regenerarlo y
  commitearlo**, o CI falla.
- Bindings ya declarados: `CONTACT_KV`, `CONTACT_DB` (D1), `EMAIL`, `AI`,
  `ASSETS`.
- `migrations/0001_contact_messages.sql` como ejemplo del formato de migración.

## Contrato de salida

- `public/_headers` con las reglas de caché y seguridad.
- `src/middleware.ts` exportando `onRequest`, que aplica las cabeceras de
  seguridad a las respuestas generadas por el Worker.
- `dist/api/assistant-catalog.json` generado en build, y `/api/ask` leyéndolo
  desde `env.ASSETS` en vez de importar `astro:content`.
- Tabla D1 `feedback_counts` y `/api/feedback` operando contra ella.
- Binding `ratelimits` declarado y aplicado.

## Archivos que posee

- `public/_headers` (nuevo)
- `src/middleware.ts` (nuevo)
- `src/pages/api/assistant-catalog.json.ts` (nuevo)
- `scripts/` — nada nuevo salvo que haga falta para el punto 3
- `src/lib/assistant/catalog.ts` (editar)
- `src/pages/api/ask.ts` (editar)
- `src/pages/api/feedback.ts` (editar)
- `src/pages/api/admin/contact-messages/[id].ts` (editar — solo el rate limit)
- `src/pages/admin/contact-messages.astro` (editar — solo el rate limit)
- `wrangler.jsonc` (editar)
- `worker-configuration.d.ts` (regenerar con `npm run types:worker`)
- `migrations/0002_feedback_counts.sql` (nuevo)
- `package.json` (editar — solo scripts, **ninguna dependencia**)
- `README.md` (editar — el comando de build cambia)
- `sw.js` (borrar), `src/utils/images.ts` (borrar)

## PROTEGIDOS

No se modifican bajo ninguna circunstancia:

- `.github/workflows/` — la compuerta es el examen; el examinado no la edita
- `tests/`
- `docs/migracion-stack/`
- `public/_redirects`
- `src/data/internal-links.ts`

## Instrucciones

Seis trabajos independientes. Hacelos en este orden y **un commit por trabajo**,
con su motivo escrito.

### 1. `public/_headers`

Cloudflare sirve los assets con `Cache-Control: public, max-age=0,
must-revalidate` por defecto. Hay 199 WebP (11 MB) y los bundles hasheados de
`/_astro/*` revalidando en cada visita.

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`immutable` es seguro en `/_astro/*` porque los nombres llevan hash.

**Sin CSP en esta fase.** El sitio carga Google Fonts y tiene un slot de
Adsterra preparado; una CSP mal calibrada rompe cosas en producción sin avisar.
Se hace aparte, en modo `report-only` primero.

### 2. `src/middleware.ts`

`_headers` **no se aplica a las respuestas que genera el Worker**. Las rutas
`/api/*` y `/admin/*` necesitan las mismas cabeceras por middleware.

Astro 4 lo soporta con `defineMiddleware` de `astro:middleware`. Aplicá el mismo
juego de cabeceras del bloque `/*` de arriba, sin duplicar la lista a mano:
exportá las cabeceras de un módulo y usalo en los dos sitios si se puede, o
dejá un comentario cruzado en ambos ficheros si no.

### 3. Sacar el blog del bundle del Worker

**El trabajo con más impacto de esta fase.** `dist/_worker.js` pesa 2,6 MB en
189 chunks, y los mayores son artículos completos. La causa:
`src/lib/assistant/catalog.ts` llama a `getCollection('blog')` y lee
`article.body`, y ese módulo se importa desde `/api/ask`, que corre en el
Worker. El bundler mete el cuerpo MDX de los 23 artículos dentro.

El sitio es estático: nada de eso hace falta en runtime.

**El patrón ya está probado en `DescargasIA`** (`src/pages/api/catalog.json.ts`
+ `worker/agents/catalog.ts`). Copialo:

1. `src/pages/api/assistant-catalog.json.ts`, **prerenderizado**
   (`export const prerender = true`), que exporta `GET` y devuelve el resultado
   de `getArticleCatalog()` como JSON. Se emite en build a
   `dist/api/assistant-catalog.json`.
2. `/api/ask` deja de importar `catalog.ts` y lee el JSON con
   `env.ASSETS.fetch(new URL('/api/assistant-catalog.json', request.url))`.
3. `catalog.ts` se queda como el generador de build. **No debe quedar ningún
   import de `astro:content` alcanzable desde una ruta con
   `prerender = false`.**

Una sola fuente de verdad: el JSON sale de la misma colección que genera el
HTML.

### 4. Contador de feedback a D1

`/api/feedback` hace `get` → `parseInt + 1` → `put` sobre KV. KV es
eventualmente consistente y admite del orden de una escritura por segundo y
clave: dos votos simultáneos sobre el mismo artículo se pisan.

`migrations/0002_feedback_counts.sql` con una tabla `feedback_counts (slug TEXT,
kind TEXT, n INTEGER, PRIMARY KEY (slug, kind))` y un `UPSERT` atómico:

```sql
INSERT INTO feedback_counts (slug, kind, n) VALUES (?, ?, 1)
ON CONFLICT(slug, kind) DO UPDATE SET n = n + 1;
```

**Sobre los votos que ya existen en KV:** son un número de prueba social, no un
dato de registro. Si tenés acceso a la cuenta, sembrá la tabla con los valores
actuales (`wrangler kv key list --binding CONTACT_KV` y generar los INSERT). **Si
no lo tenés, no lo inventes ni lo bloquees:** dejá los contadores empezando en
cero, decilo en el PR, y anotalo como pendiente. Es una salida legal de esta
fase.

**Añadí deduplicación**, que hoy no existe: el contador es incrementable sin
límite desde el navegador. Usá el hash de IP que ya sabe generar
`src/lib/contact/security.ts` (`hashIp`, con `CONTACT_IP_HASH_SALT`).

### 5. Rate limit en `/api/ask` y `/admin/*`

`/api/ask` es público, anónimo y sin ningún límite, y hace **dos** llamadas al
binding `AI` por petición. Un script trivial consume la cuota de la cuenta.

En `wrangler.jsonc`:

```jsonc
"ratelimits": [
  { "name": "ASK_LIMIT",   "namespace_id": "1001", "simple": { "limit": 10, "period": 60 } },
  { "name": "ADMIN_LIMIT", "namespace_id": "1002", "simple": { "limit": 20, "period": 60 } }
]
```

`namespace_id` es un identificador libre, **no hay que aprovisionar nada en la
cuenta**. `period` solo admite 10 o 60.

Llamá a `limit({ key })` con el hash de `cf-connecting-ip` antes de tocar el
binding `AI`, y devolvé 429 con `Retry-After`. El límite es local a cada
ubicación de Cloudflare y eventualmente consistente: sirve para frenar abuso, no
para contabilidad exacta.

### 6. Configuración de assets y limpieza

En `wrangler.jsonc`, `assets` no declara `not_found_handling` ni
`run_worker_first`. Las dos van **en el mismo commit**, y el orden importa:

```jsonc
"assets": {
  "binding": "ASSETS",
  "directory": "dist",
  "not_found_handling": "404-page",
  "run_worker_first": ["/api/*", "/admin/*"]
}
```

> **Trampa documentada en `DescargasIA`:** con `not_found_handling: "404-page"`
> el router de assets responde el 404 **él mismo** y el Worker no llega a
> ejecutarse nunca. Las rutas `/api/*` y `/admin/*` no son ficheros en `dist/`,
> así que sin `run_worker_first` dejarían de funcionar. Poner una sin la otra
> rompe el sitio en producción y no lo detecta ninguna build.

Después: `npm run types:worker` y commitear `worker-configuration.d.ts`.

Y borrar:

- **`sw.js`** — service worker de una red de push ads que hace `importScripts`
  desde un dominio externo. Hoy es inerte (no está en `public/`, nada lo
  referencia), pero está versionado y a un `git mv` de activarse.
- **`src/utils/images.ts`** — código muerto que importa `sharp` y `node:fs` desde
  dentro de `src/`, donde un import accidental desde una ruta con
  `prerender = false` metería sharp en el Worker.

### 7. Quitar el hook `postbuild`

`npm run build` dispara `lib/discovery/run.ts`, que lee `.env` (incluida
`GOOGLE_PRIVATE_KEY`) y envía URLs a la Google Indexing API y a IndexNow.
Cualquier build local es una acción hacia fuera.

> **Comprobalo antes de quitarlo.** Cloudflare Workers Builds está conectado a
> este repositorio y despliega desde `main`. **Si su comando de build configurado
> es `npm run build`, quitar el hook deja el sitio sin notificar a los buscadores
> tras cada despliegue.** Mirá el comando en el panel de Cloudflare antes de
> tocar nada. Si no tenés acceso, **no lo quites**: reportalo en el issue y dejá
> el resto de la fase hecha. Es una salida legal.

Si se puede quitar: `sdi:run` se queda como paso explícito, y el `README.md`
tiene que decir cuándo se ejecuta.

## Fuera de alcance

- **Cualquier cambio de versión de dependencia.** Si necesitás subir algo para
  terminar, el bug es de la spec: reportalo, no lo resuelvas.
- **CSP.** Va aparte, en `report-only` primero.
- **El pipeline de imágenes** (`scripts/optimize-images.mjs`, `src/utils/image.ts`,
  `imageService: 'passthrough'`). Se retira cuando el adaptador nuevo traiga
  `imageService`, después de la fase 4.
- **`astro:page-load`** en `AdSlotLoader` y `CanineAiAssistant`. Decidir si se
  adopta `ClientRouter` es otra conversación.
- **Migrar `locals.runtime`.** Es la fase 3.

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] **El bundle del Worker baja de 500 KB:** `du -sk dist/_worker.js` da menos de 500
- [ ] **No queda contenido en el Worker:** `ls dist/_worker.js/chunks/ | wc -l` da menos de 40
- [ ] `test -f dist/api/assistant-catalog.json` y el JSON tiene 23 entradas
- [ ] `grep -rn "astro:content" src/pages/api/ask.ts src/lib/assistant/` no devuelve nada alcanzable desde `/api/ask`
- [ ] `test -f public/_headers` y contiene `immutable`
- [ ] `wrangler.jsonc` declara `not_found_handling` **y** `run_worker_first`
- [ ] `test ! -f sw.js` y `test ! -f src/utils/images.ts`
- [ ] `git diff --name-only origin/main...HEAD` no contiene ningún archivo de PROTEGIDOS
- [ ] `[manual]` Con `wrangler dev`: `/api/ask` responde 200 a una consulta normal, y devuelve 429 a la petición número 11 en menos de un minuto
- [ ] `[manual]` Con `wrangler dev`: dos votos seguidos en `/api/feedback` para el mismo slug incrementan el contador a 2, y el tercero desde la misma IP no lo incrementa
- [ ] `[manual]` Una ruta inexistente (`/no-existe`) devuelve el 404 del sitio, y `/api/ask` sigue respondiendo

## Riesgos conocidos

- **`not_found_handling` sin `run_worker_first` rompe las rutas dinámicas en
  producción** y ninguna build lo detecta. Es el riesgo más grave de la fase; el
  criterio manual está para eso.
- **El PR se va a hacer grande.** Son siete trabajos. Si pasa de unos 15
  archivos, partilo en dos PR contra `main` (entrega y limpieza por un lado,
  Worker por otro) en vez de entregar algo irrevisable.
- **Dos trabajos pueden quedar bloqueados por falta de acceso a la cuenta** (la
  siembra de los contadores y el comando de build de Cloudflare). Los dos tienen
  salida legal escrita arriba: hacé el resto y reportá.
- **`env.ASSETS.fetch` necesita una URL absoluta.** Construila desde
  `request.url`, no con una ruta relativa.
