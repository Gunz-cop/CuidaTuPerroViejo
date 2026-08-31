# F1A — Entrega y configuración

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `main` · **Depende de:** F0 (fusionada)
**Método:** skill `upgrade-astro-cloudflare` (`~/.claude/skills/`)

> **Es la fase que desbloquea el paralelismo.** Es corta a propósito: en cuanto
> esté fusionada, F1B y F2 pueden ejecutarse a la vez. Priorizala.

## Objetivo

Resolver la capa de entrega —caché, cabeceras de seguridad, enrutado de assets—
declarar los bindings de límite de peticiones, y quitar de en medio el código
muerto y el hook de build con efectos externos.

Nada de esto toca `src/pages/api/`, que es lo que permite que F1B corra después
sin pisarse con nada.

## Contrato de entrada

- La compuerta de CI (`.github/workflows/ci.yml`) con ocho pasos, en verde.
- `npm run types:worker` para regenerar `worker-configuration.d.ts`. **Esta fase
  toca `wrangler.jsonc`, así que hay que regenerarlo y commitearlo** o CI falla.
- Bindings ya declarados: `CONTACT_KV`, `CONTACT_DB`, `EMAIL`, `AI`, `ASSETS`.

## Contrato de salida

Lo que otras fases van a dar por hecho:

- `public/_headers` con caché y cabeceras de seguridad.
- `src/middleware.ts` exportando `onRequest`, que aplica las mismas cabeceras a
  las respuestas del Worker.
- **`wrangler.jsonc` declara los bindings `ASK_LIMIT` y `ADMIN_LIMIT`**, listos
  para que F1B los use. Esta fase los declara pero **no** los usa.
- `assets` con `not_found_handling` y `run_worker_first`.
- `package.json` sin el hook `postbuild`.

## Archivos que posee

- `public/_headers` (nuevo)
- `src/middleware.ts` (nuevo)
- `wrangler.jsonc` (editar)
- `worker-configuration.d.ts` (regenerar)
- `package.json` (editar — **solo scripts, ninguna dependencia**)
- `README.md` (editar)
- `sw.js` (borrar), `src/utils/images.ts` (borrar)

**Nada de `src/pages/`.** Si necesitás tocar algo ahí, el bug es de la spec:
reportalo.

## PROTEGIDOS

- `.github/workflows/`
- `tests/`
- `docs/migracion-stack/`
- `public/_redirects`
- `src/data/internal-links.ts`
- `src/pages/**` — es territorio de F1B y F2

## Instrucciones

Cinco trabajos. **Un commit por trabajo**, con su motivo escrito.

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
Va aparte, en `report-only` primero.

### 2. `src/middleware.ts`

`_headers` **no se aplica a las respuestas que genera el Worker**. Las rutas
`/api/*` y `/admin/*` necesitan las mismas cabeceras por middleware.

Astro 4 lo soporta con `defineMiddleware` de `astro:middleware`. Exportá la
lista de cabeceras de un módulo y usala en los dos sitios, o dejá un comentario
cruzado en ambos ficheros: duplicarla a mano garantiza que diverjan.

### 3. Configuración de assets

`assets` no declara `not_found_handling` ni `run_worker_first`. Las dos van **en
el mismo commit**:

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
> así que sin `run_worker_first` dejarían de funcionar. **Poner una sin la otra
> rompe el sitio en producción y no lo detecta ninguna build.**

### 4. Declarar los bindings de rate limit

`/api/ask` es público, anónimo y sin límite, y hace **dos** llamadas al binding
`AI` por petición. Esta fase **solo los declara**; F1B los usa.

```jsonc
"ratelimits": [
  { "name": "ASK_LIMIT",   "namespace_id": "1001", "simple": { "limit": 10, "period": 60 } },
  { "name": "ADMIN_LIMIT", "namespace_id": "1002", "simple": { "limit": 20, "period": 60 } }
]
```

`namespace_id` es un identificador libre: **no hay que aprovisionar nada en la
cuenta**. `period` solo admite 10 o 60.

Declararlos aquí es lo que permite que F1B no toque `wrangler.jsonc` y pueda
correr en paralelo con F2.

Después de tocar `wrangler.jsonc`: `npm run types:worker` y commitear.

### 5. Limpieza y el hook `postbuild`

Borrar:

- **`sw.js`** — service worker de una red de push ads que hace `importScripts`
  desde un dominio externo. Hoy es inerte (no está en `public/`, nada lo
  referencia), pero está versionado y a un `git mv` de activarse.
- **`src/utils/images.ts`** — código muerto que importa `sharp` y `node:fs` desde
  dentro de `src/`, donde un import accidental desde una ruta con
  `prerender = false` metería sharp en el Worker.

Y el hook: `npm run build` dispara `lib/discovery/run.ts`, que lee `.env`
(incluida `GOOGLE_PRIVATE_KEY`) y envía URLs a la Google Indexing API y a
IndexNow. Cualquier build local es una acción hacia fuera.

> **Comprobalo antes de quitarlo.** Cloudflare Workers Builds está conectado a
> este repositorio y despliega desde `main`. **Si su comando de build configurado
> es `npm run build`, quitar el hook deja el sitio sin notificar a los buscadores
> tras cada despliegue.** Mirá el comando en el panel de Cloudflare antes de
> tocar nada. Si no tenés acceso, **no lo quites**: reportalo en el issue y
> entregá el resto. Es una salida legal.

Si se puede quitar: `sdi:run` se queda como paso explícito y el `README.md` dice
cuándo se ejecuta.

## Fuera de alcance

- **Cualquier cambio de versión de dependencia.**
- **Todo lo que esté en `src/pages/`** — es de F1B y F2.
- **Usar los bindings de rate limit.** Solo se declaran.
- **CSP.** Va aparte, en `report-only`.
- **El pipeline de imágenes.** Después de la fase 4.

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] `test -f public/_headers` y contiene `immutable`
- [ ] `test -f src/middleware.ts`
- [ ] `wrangler.jsonc` declara `not_found_handling`, `run_worker_first` **y** los dos `ratelimits`
- [ ] `test ! -f sw.js` y `test ! -f src/utils/images.ts`
- [ ] `git diff --name-only origin/main...HEAD` **no contiene ningún fichero bajo `src/pages/`**
- [ ] `git diff --name-only origin/main...HEAD` no contiene ningún archivo de PROTEGIDOS
- [ ] `[manual]` Con `wrangler dev`: una ruta inexistente (`/no-existe`) devuelve el 404 del sitio, **y** `/api/geo` sigue respondiendo JSON
- [ ] `[manual]` Una respuesta de `/api/geo` trae las cabeceras de seguridad del middleware

## Riesgos conocidos

- **`not_found_handling` sin `run_worker_first` rompe las rutas dinámicas en
  producción** y ninguna build lo detecta. Es el riesgo más grave de la fase; el
  criterio manual está para eso.
- **El comando de build de Cloudflare puede bloquear el trabajo 5.** Tiene salida
  legal: hacé el resto y reportá.
- **Esta fase bloquea a otras dos.** Si algo se atasca, entregá lo que esté hecho
  y abrí lo que falte como trabajo aparte, en vez de retener el PR.
