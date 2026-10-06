# F2 platform probe (exploración, no producto)

Fecha: 2026-10-06. Worktree detached: `/workspace/ctpv-f2-probe-platform`, base `28bd92ecd424ff11b31e13e4a2ba499cb196a870`, árbol de base `f4a7ceb2f067844dd0ea5ba9ccd4cc0763e65082`. Lock SHA-256 `d6439177ad547f56d7b9faf4f8307aa0720abdb3d41e4b56019bfc60fe0cf54b`; versiones instaladas desde lock: Astro 7.2.10, `@astrojs/cloudflare` 14.2.6, Wrangler 4.128.0. `npm ci --offline --cache /tmp/ctpv-f0-npm-cache` terminó bien después de dar acceso adicional al postinstall de esbuild; el primer build necesitó acceso de red local para enumerar interfaces del prerenderer.

## Secuencia build y routing

Verificado en fuentes instaladas: Astro ejecuta `astro:build:done` en orden secuencial sobre `config.integrations` (`node_modules/astro/dist/integrations/hooks.js:460-476`). Sitemap escribe `sitemap-index.xml` en ese hook. La integración F1 `discoveryIntegration()` está después de sitemap y escribe `llms.txt` al final de su hook. El adaptador Cloudflare registra su hook en `node_modules/@astrojs/cloudflare/dist/index.js:436-458` después de integraciones del proyecto; su hook conserva el client dir y puede normalizar `assets.directory` si el `base` cambia. En el build del probe la integración exploratoria, registrada después de F1, leyó HTML+sitemap ya terminados, generó el índice/Markdown en `config.build.client` y modificó el `dist/server/wrangler.json` compilado antes de concluir el build. No hubo `postbuild`, edición manual de artefactos después del build ni import del índice dentro del bundle.

El inventario válido de esta base dio 28 documentos. La lista generada tenía 30 patrones: los 28 `canonicalPath` exactos y `/api/*`, `/admin/*`. Su longitud máxima fue 84 caracteres en `/salud-perros-mayores/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion`. Wrangler local 4.128.0 establece `MAX_ROUTES_RULES = 100`, rechaza `input.length > 100`; establece `MAX_ROUTES_RULE_LENGTH = 100` y rechaza `rule.length > 100` (admite longitud 100 aunque el mensaje diga “less than 100”). Por tanto, el tope matemático son 98 documentos más los dos patrones reservados; una SDD puede imponer límite más estricto si quiere margen, y debe fallar build ante exceso, inválidos o duplicados. El parser también rechaza patrones no absolutos, duplicados y ciertas reglas redundantes con `*` terminal.

`npx --no-install astro build` terminó con el generador después de sitemap. El config compilado resultante recibió exactamente la lista calculada. Un `wrangler deploy --dry-run` sobre una copia saneada del config pasó: 354 assets leídos, 736.61 KiB total / 168.67 KiB gzip, y salida explícita `--dry-run: exiting now`. La copia contenía solo el Worker probe, ASSETS y SESSION local; quitó AI, EMAIL, D1, KV remoto y rate limits. También ejecuté Wrangler dev 4.128.0 con loopback `127.0.0.1:8796`, `--local`, ASSETS y SESSION local únicamente. No hice deploy, `--remote`, requests a API/admin, ni writes de bindings.

## Runtime ASSETS, índice y delegación

Un Worker puede leer el índice que se creó tarde con una llamada fija a `env.ASSETS.fetch(new Request(new URL('/agent-content/v1/index.json', request.url)))`. En workerd devolvió 200 JSON; el fetch interno fue servido por ASSETS y no volvió a entrar al Worker. El probe guardó en una promesa por instancia solo metadata del índice, no cuerpos ni respuestas privadas, y resolvió `canonicalPath`/ruta de representación contra ese índice. El runtime no importó el archivo generado, así que no hay ciclo con el bundle. El Worker delegó las rutas restantes al worker actual.

La lectura del source instalado expone un límite importante para los documentales Worker-first: `matchStaticAsset()` del handler de Astro invoca `env.ASSETS.fetch(requestUrl.replace(...))`, pasando un string URL, no el `Request` original. Así pierde HEAD y validators entrantes. En el probe final, servir el documento con un `Request` nuevo a un path de ASSETS obtenido y validado desde el índice preservó los semánticos observados. En workerd, para `/` y para la representación Markdown:

| Petición | HTML | Markdown |
|---|---:|---:|
| GET | 200, `text/html` | 200, `text/markdown; charset=utf-8` |
| HEAD | 200, cuerpo vacío | 200, cuerpo vacío |
| ETag de la misma variante en `If-None-Match` | 304 | 304 |
| ETag de la otra variante en `If-None-Match` | 200 | 200 |

Los ETags difirieron entre `/index.html` y `/agent-content/v1/documents/home.md`; ASSETS aplicó los validators por path. El probe añadió `Vary: Accept` tanto a HTML como a Markdown. La ruta de documento debe servir HTML y Markdown mediante Requests de ASSETS que preserven GET/HEAD y conditional headers; las rutas `/api/*` y `/admin/*` y el resto del tráfico se delegan al handler actual. Esta conclusión motivó actualizar explícitamente D01 en la SDD; el patch es exploratorio, no implementación a promover.

ASSETS respondió JSON con `application/json`, Markdown con `text/markdown`, y HTML con `text/html`. La regla legacy `/p/guia-para-cuidar-tu-perro-senior.html` siguió fuera de Worker-first y devolvió 301 `Location: /`, con los headers de seguridad que ya suministra el sitio. Wrangler local anunció 23 redirects válidos y 5 reglas de headers.

La salida local mostró `Cache-Control: public, max-age=0, must-revalidate` y `CF-Cache-Status: HIT`. Eso describe la simulación local y no acredita Cache API ni CDN. No se simuló ni se afirma comportamiento público de CDN, TTL, purge, cache key ni alternancia a través de la zona. La candidata de la SDD `private, no-store` para las respuestas negociadas no mostró incompatibilidad local: deja intactos los ETags de ASSETS por paths distintos, pero su comportamiento en CDN requiere el gate público. No se puede convertir el header local `CF-Cache-Status` en evidencia HIT/MISS de Cache API.

## Preview disponible y límites

Help instalado de Wrangler 4.128.0 confirma `wrangler versions upload`/`versions deploy` y `wrangler preview` (marcado private beta). `versions upload --help` admite `--preview-alias`; no ejecuté ninguno porque implican operaciones remotas. No requiere actualizar Wrangler para que existan esos comandos, pero el help no demuestra que el account tenga habilitación ni concede una URL pública. Para el gate de F2 el root encontró la Commit Preview ya emitida por Cloudflare bot para el HEAD publicado exacto; esa URL es la evidencia pública a fijar, con allowlist solo de documentos/representaciones/índice. Este probe local no verifica CDN ni reemplaza esa preview.

## Artefactos y reproducción

El patch experimental está en [patch exploratorio](plataforma.patch); config local saneado en [wrangler.runtime.sanitized.json](/workspace/ctpv-f2-probe-platform/probe-artifacts/wrangler.runtime.sanitized.json); hashes en manifest local del worktree de exploración. El hash del patch es `b1235fd1eea17da67b3aab0fb1a4fb05870d8ee11ad8e9ff6719c81cd6bec667`; hashes adicionales cubren lock, config compilado, índice, `home.md` y config runtime saneado. El trabajo solo modifica en este worktree `astro.config.mjs` y añade dos scripts temporales. La build generó `dist/`, ignorado por Git; no hay commit ni rama publicada.

Reproducción resumida en worktree:

```sh
npm ci --offline --cache /tmp/ctpv-f0-npm-cache
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f2-config npx --no-install astro build
WRANGLER_WRITE_LOGS=false XDG_CONFIG_HOME=/tmp/ctpv-f2-config npx --no-install wrangler deploy --config probe-artifacts/wrangler.runtime.sanitized.json --dry-run --outdir /tmp/ctpv-f2-dry-run
WRANGLER_WRITE_LOGS=false XDG_CONFIG_HOME=/tmp/ctpv-f2-config npx --no-install wrangler dev --config probe-artifacts/wrangler.runtime.sanitized.json --local --ip 127.0.0.1 --port 8796 --inspector-port 9236 --persist-to /tmp/ctpv-f2-probe-state
```
