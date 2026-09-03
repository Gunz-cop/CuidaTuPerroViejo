# Postmortem: migración Astro 4 → 7 sobre Cloudflare Workers

**Autor:** sesión de postmortem, sin participación en la ejecución de ninguna fase.
**Fecha de cierre de este documento:** 2026-09-03.
**Alcance:** de la compuerta (F0, PR #9) a la promoción a producción (PR #38) y
el cierre de la deuda de seguimiento (PR #39, issues #25 y #37).

Cada afirmación lleva una etiqueta:

- **Verificado** — cita exacta (SHA, PR, archivo) que la sostiene.
- **Diferencia aceptada** — la spec decía X, la realidad es Y, y ambas están
  bien: se explica por qué.
- **No verificado** — no se pudo confirmar con las herramientas disponibles;
  se dice qué haría falta.
- **Deuda de seguimiento** — hueco conocido, con el issue que lo rastrea.

Este documento no repite el método (vive en la skill compartida
`upgrade-astro-cloudflare`); documenta lo que pasó en este repo.

---

## 1. Arquitectura de partida y de llegada

**Partida (Verificado, `docs/migracion-stack/README.md:13-20`, commit `ac7a9bb`
como línea base de F0):** Astro 4.16.19 (dist-tag `legacy` en npm) con
`@astrojs/cloudflare` 11, `wrangler` clavado en `~4.107.0` para que `npm ci`
resolviera. El sitio se comportaba como un despliegue de Cloudflare Pages
aunque corría como Worker.

**Llegada (Verificado, `docs/migracion-stack/fase-4-evidencia.md:41-44` y
`wrangler.jsonc` en `38bdb33`):** Astro `^7.2.10`, adaptador
`@astrojs/cloudflare` `^14.2.6`, `output: 'static'`, `main` apuntando a
`@astrojs/cloudflare/entrypoints/server`, MDX `^7.0.8`, procesador Markdown
Sätteri `0.3.8`, Tailwind vía `@tailwindcss/vite` (sin `@astrojs/tailwind` ni
`tailwind.config.mjs` con contenido activo — Verificado,
`fase-3-evidencia.md:35`), bindings leídos por `cloudflare:workers` en vez de
`locals.runtime` (Verificado, `fase-3-evidencia.md:33-34`, 0 ocurrencias).

## 2. Cronología de fases y orden de dependencia

Fuente: `docs/migracion-stack/README.md:65-96` (tabla de fases + diagrama
Mermaid) y `gh pr list`.

| Fase | PR | Rama base | Depende de | Merge |
|---|---|---|---|---|
| F0 — compuerta y línea base | #9 | `main` | — | 2026-08-31 |
| F1A — entrega y config (bindings, `_headers`) | #19, corregido por #20 | `main` | F0 | 2026-08-31 |
| F1B — Worker: caché admin, catálogo, rate limit, D1 | #26 | `main` | F1A | 2026-09-03 |
| F2 — Astro 4→5 (Content Layer) | #30 | `migracion/astro-7` | F1A | 2026-09-01 |
| (corrección de specs F1B/F2) | #34 | `main` | — | 2026-09-03 |
| Integración main→migracion/astro-7 tras F1B | #35 | `migracion/astro-7` | F1B fusionada | 2026-09-03 |
| Retiro del hook `postbuild` | #36 | `migracion/astro-7` | — | 2026-09-03 |
| F3 — Astro 5→6 (runtime Cloudflare, Tailwind 4) | #32 | `migracion/astro-7` | F2 + F1B | 2026-09-02 |
| F4 — Astro 6→7 | #33 | `migracion/astro-7` | F3 | 2026-09-02 |
| Promoción a producción | #38 | `main` | F4 verificada | 2026-09-03 |
| Cierre de deuda (#25, #37) | #39 | `main` | #38 | 2026-09-03 |

Todas las fechas son las de `mergedAt` reportadas por
`gh pr list --state all --json ...mergedAt`.

## 3. Por qué F1B y F2 podían correr en paralelo

**Verificado**, `docs/migracion-stack/README.md:98-121` y las listas de
"Archivos que posee" de `fase-1b-worker.md:47-59` y (por referencia) la spec de
F2. El paralelismo no salió de que las tareas fueran independientes en
abstracto: salió de tres decisiones de diseño explícitas que evitaron que las
dos sesiones tocaran el mismo archivo:

1. F1A declaró los bindings `ASK_LIMIT`/`ADMIN_LIMIT` en `wrangler.jsonc` pero
   no los usó — así F1B no necesitaba tocar ese archivo, que es de F1A.
2. F1B no editó `src/lib/assistant/catalog.ts`: importó `getArticleCatalog()`
   tal cual, dejando ese archivo entero para que F2 lo migrara a la Content
   Layer API.
3. F1B no tocó `package.json` (ni scripts ni dependencias), que es el archivo
   que F1A y F2 sí comparten.

El criterio de aceptación de F1B lo hace verificable, no solo declarado:
`git diff --name-only origin/main...HEAD` contenido en la lista de "Archivos
que posee" (`fase-1b-worker.md:194`). PR #26 tocó exactamente
`src/middleware.ts`, `src/pages/api/{ask,feedback,assistant-catalog.json}.ts`,
`src/pages/api/admin/contact-messages/[id].ts`,
`src/pages/admin/contact-messages.astro` y `migrations/0002_feedback_counts.sql`
— ninguno de la lista de F2.

## 4. Por qué F2 debía verificarse antes de fusionar `main` en `migracion/astro-7`

**Verificado**, `docs/migracion-stack/README.md:123-148`. La regla escrita:

```
1. F2 se verifica contra la base sobre la que se construyó   ← NO tocar la base antes
2. Se fusiona el PR de F2 en migracion/astro-7
3. Se fusiona main en migracion/astro-7                       ← aquí, y en un commit propio
4. Se verifica ESE merge por separado
5. Empieza F3
```

El motivo es de atribución, no de proceso: si `main` (con F1A y F1B) se
fusiona en la rama de integración mientras la verificación de F2 está
pendiente, el verificador ve simultáneamente cabeceras nuevas, middleware
distinto y otro bundle, y "no puede atribuir ninguno" a su causa
(`README.md:140-144`, citando `references/verificacion.md` de la skill: "para
atribuir un cambio, construí las dos versiones sobre la misma base"). F1A tocó
`src/middleware.ts`, `wrangler.jsonc` y `public/_headers`; que Git no reporte
conflictos textuales al fusionar no prueba que el resultado funcione
(`README.md:146-148`).

En la práctica esto se cumplió: F2 se verificó de forma independiente
(`fase-2-evidencia.md:28-38`, con CI y Workers Builds en verde sobre
`2b43626`) **antes** de que PR #35 fusionara `main` en `migracion/astro-7`.

## 5. Topología exacta de merges

**Verificado** con `git log --graph --all` y `git show <sha> --format='%H %P %s'`
sobre `origin/main` y `origin/migracion/astro-7` después de `git fetch`.

```
main:      ac7a9bb (F0) ── ... ── #19/#20 (F1A) ── #26 (F1B, merge 66366f0)
                                                          │
migracion/astro-7 se crea desde main tras F1A ───────────┘ (antes de F1B)
                                                          │
migracion/astro-7: ed14710 ── #30 (F2) ── #31 (tooling) ─┤
                                                          │
                    b55a36e = Merge remote-tracking branch 'origin/main'
                              into integrate/main-into-migracion-astro7
                              (PR #35)
                              parents: migracion/astro-7@771823d  main@66366f0
                                        (F4 ya fusionada)          (F1B ya fusionada)
                                                          │
                    c9978ea docs: cerrar specs F1B y F2 tras la integración
                    6b00681 fix: fijar id del KV namespace SESSION
                    02f4a5a chore: regenerar worker-configuration.d.ts
                    00ca256 fix: quitar hook postbuild (PR #36, contenido)
                                                          │
main ← PR #38 "Promote Astro 7 migration to production"
        fast-forward de main a 00ca256 (mismo SHA, sin merge commit con
        2 padres: GitHub reporta merge_commit_sha=00ca256, parent único
        02f4a5a — confirmado con `git log -1 --format='%P' 00ca256`)
                                                          │
main: codex/maintenance-issues-25-37 se crea desde main@00ca256
      ff745ab fix: use Content Layer post ids on recent posts (issue #25)
      38bdb33 docs: refresh postbuild references (issue #37)
                                                          │
main ← PR #39 (fast-forward a 38bdb33) ── HEAD actual de main y de
       este postmortem
```

Nota de orden real: cuando se abrió PR #35, `migracion/astro-7` ya tenía F4
fusionada (`771823d`, PR #33) — el nombre del PR ("tras F1B") describe el
propósito de traer F1B a la rama de integración, no el momento exacto dentro
de la secuencia F2/F3/F4. **Diferencia aceptada:** el README de la spec
describe el punto de reunión como si ocurriera antes de F3
(`README.md:59-61`, "se fusiona a `main` de una sola vez cuando la fase 4 haya
pasado la verificación completa" describe el merge final, no éste); la fusión
de `main` en la rama de integración (PR #35) en la práctica se hizo después de
F2, F3 **y** F4 estar ya en `migracion/astro-7`, no solo tras F2. El efecto
buscado por la regla del §4 (no mezclar F2 sin verificar con F1A/F1B) se
cumplió igual porque F2 se verificó contra su propia base antes de que
cualquier merge de `main` ocurriera.

## 6. Astro 4 → 5: migración a Content Layer

**Verificado**, PR #30, commits `cdff6a4` (upgrade de dependencias),
`6e51022` (`output: 'hybrid'` → `'static'`), `95a577e` (colecciones migradas a
`src/content.config.ts` con loaders `glob`), `2b43626` (fix: preservar slugs y
orden de artículos), `9a7d735` (evidencia). Consumidores actualizados de
`entry.slug`/`entry.render()` a `entry.id`/`render(entry)`
(`fase-2-evidencia.md:16`). Build base 465 rutas registradas → build F2 con 34
rutas HTML idénticas a la base (`fase-2-evidencia.md:26,34`); `dist/`
completo cambia de 465 a 340 archivos, diferencia aceptada por ser efecto
esperado del cambio de adaptador y Content Layer (`fase-2-evidencia.md:42`).

**Deuda de seguimiento surgida de F2, cerrada después:** `src/pages/index.astro`
necesitaba un shim (`.map((entry) => ({ ...entry, slug: entry.id }))`) porque
`HomeRecentPosts.astro` seguía leyendo `post.slug` y no estaba en la lista de
archivos de ninguna fase — tocarlo desde F2 habría violado el criterio de
propiedad de archivos frente a F1B/F3 en curso. Issue #25 lo documenta
explícitamente como "deuda que quedó sin dueño", no como defecto de F2. Se
cerró en PR #39, commit `ff745ab`: `HomeRecentPosts.astro` ahora lee
`entry.id` directamente y el shim de `index.astro` se eliminó.

## 7. Astro 5 → 6: runtime Cloudflare + Tailwind 4

**Verificado**, PR #32, base `59d11ec`. Runtime: `locals.runtime` con 0
ocurrencias en `src/`, `as any` asociado a `runtime` en `src/pages/` con 0
ocurrencias (`fase-3-evidencia.md:33-34`) — migración completa a
`cloudflare:workers`. Tailwind: `@astrojs/tailwind` en `package.json` = 0,
`tailwind.config.mjs` sin contenido activo (`fase-3-evidencia.md:35`).

**El problema `<alpha-value>`** (Verificado, `fase-3-evidencia.md:13-22`):
`src/styles/global.css` tenía 11 tokens `brand-*` usando la sintaxis
`/ <alpha-value>` de Tailwind 3 para opacidad configurable; Tailwind 4 no la
soporta y había que eliminar los 11 usos, comprobado con `grep` de 0
ocurrencias en `dist/client` y verificación de que el CSS generado emite
`color-mix()` en su lugar (`fase-3-evidencia.md:20,77`).

**El problema de line-height responsive** (Verificado,
`fase-3-evidencia.md:14-17`): en Edge real, modo oscuro, viewport 1280×900, el
selector `lg:text-[4rem]` de `HomeHero` producía 64px de line-height en la
base y 80px en F3 — 617.883/1.124.585 píxeles distintos reportados por PR #32.
Corrección aplicada **solo en `src/styles/global.css`** (no en el componente):
fijar `line-height: 1` para ese breakpoint, más una regla general para que las
variantes `sm:/md:/lg:text-*` usadas por el sitio no quedaran subordinadas a
`--tw-leading` de Tailwind 4. La regresión global reportada llegó a 68.14% de
píxeles distintos en `/salud-perros-mayores.html` antes de la corrección.

## 8. Astro 6 → 7

**Verificado**, PR #33, commits `406f023` (migrar a Astro 7),
`5264a40` (migrar el procesamiento de Markdown a Sätteri),
`3759733` (corregir SVG inválido para el compilador de Astro 7),
`9401989` (preservar espacios inline con compresión JSX),
`cbfc6d9` (preservar `backdrop-filter` en Safari 16.4-17),
`1389231` (refrescar lockfile para `npm ci` en CI),
`ee623dc`/`9e94b9e`/`28fc3e8` (alcance de `BaseLayout`, cierres de tags del
asistente), `2011244` (restaurar prefijo Safari del navbar), `62fbf05`
(evidencia). 34 rutas HTML idénticas en base y F4
(`fase-4-evidencia.md:27`). `npm ci`: 455 paquetes, 0 vulnerabilidades;
`wrangler deploy --dry-run`: 279 archivos de assets, 1275.64 KiB de subida,
362.21 KiB gzip (`fase-4-evidencia.md:34-40`).

## 9. `/api/ask`: extracción del catálogo a ASSETS estático

**Verificado**, spec `fase-1b-worker.md:104-129`, implementado en PR #26
(commit `313c1bb`, ajustado por `3895e21`). Causa del problema: `catalog.ts`
llamaba a `getCollection('blog')` leyendo `article.body`, y como `/api/ask`
importaba `catalog.ts` y corría en el Worker, el bundler incluía el cuerpo MDX
completo de los 16 artículos — `dist/_worker.js` pesaba 2.6 MB en 189 chunks.

Solución: `src/pages/api/assistant-catalog.json.ts` con
`export const prerender = true`, generado en build a
`dist/api/assistant-catalog.json`; `/api/ask` dejó de importar `catalog.ts` y
lee el JSON vía `env.ASSETS.fetch(...)` con URL absoluta construida desde
`request.url`. Criterio de aceptación verificable:
`du -sk dist/_worker.js` < 500 KB (`fase-1b-worker.md:187`) y 0 imports de
`astro:content` alcanzables desde una ruta con `prerender = false`
(`fase-1b-worker.md:124-126,191-193`). **No verificado en este postmortem**:
no se re-ejecutó `du -sk dist/_worker.js` de forma independiente; se toma la
evidencia de PR #26 y el paso de CI en verde como fuente.

## 10. Deduplicación de feedback en D1

**Verificado**, `fase-1b-worker.md:143-165`, PR #26 commit `5b8f63d` (ajustado
por `e60384e`). Antes: `/api/feedback` hacía `get → parseInt + 1 → put` sobre
KV, eventualmente consistente y sin deduplicación — dos votos simultáneos se
pisaban y el contador era incrementable sin límite desde el navegador.
Después: tabla D1 `feedback_counts (slug TEXT, kind TEXT, n INTEGER, PRIMARY
KEY (slug, kind))` con UPSERT atómico y deduplicación por hash de IP
(reutilizando `hashIp` de `src/lib/contact/security.ts`, no un hash nuevo).

**Diferencia aceptada, explícita en la spec:** los votos que ya estaban en KV
no se migraron — no hubo acceso a la cuenta para leer los valores legacy
(PR #26, descripción: "No hubo acceso a la cuenta para leer los valores
legacy de KV, por lo que los contadores nuevos empiezan en cero, tal como
permite la spec"). La spec preveía explícitamente esta salida
(`fase-1b-worker.md:161-165`: "Si no lo tenés, no lo inventes ni te
bloquees... Es una salida legal").

## 11. Endurecimiento de la caché del panel admin

**Verificado**, `fase-1b-worker.md:76-103`, PR #26 commit `380372f`.
Vulnerabilidad real en producción antes del fix: `/admin/contact-messages`
tenía `prerender = false`, devolvía 200 `text/html` sin `Cache-Control`, y el
middleware lo cacheaba con `public, s-maxage=86400` en la Cache API
compartida de Cloudflare — una petición posterior **sin `Authorization`**
podía recibir el panel completo (nombres, correos, hashes de IP) desde caché,
sin que `hasValidBasicAuth` se ejecutara. Dos defensas independientes, no una
sola: (1) `contact-messages.astro` devuelve `Cache-Control: no-store` también
en la respuesta autenticada, y (2) el middleware no cachea ninguna respuesta a
una petición con cabecera `Authorization`, sea cual sea la ruta —
deliberadamente redundante con la lista de prefijos, para no depender de que
alguien recuerde actualizarla. Criterio de sabotaje explícito en la spec:
quitar `/admin/` de la lista de prefijos y comprobar que sigue sin cachearse
(`fase-1b-worker.md:100-103,197`).

## 12. Rate limiting

**Verificado**, `fase-1b-worker.md:130-141`, PR #26 commit `d9ac872`.
`ASK_LIMIT` (10/60s) y `ADMIN_LIMIT` (20/60s) declarados en `wrangler.jsonc`
por F1A (Verificado, `wrangler.jsonc:45-46`), aplicados por F1B con
`limit({ key })` sobre el hash de `cf-connecting-ip` (nunca la IP en claro),
antes de invocar el binding `AI`, devolviendo 429 con `Retry-After`. La spec
documenta explícitamente su propia limitación: "El límite es local a cada
ubicación de Cloudflare y eventualmente consistente: sirve para frenar abuso,
no para contabilidad exacta. No lo documentes como otra cosa"
(`fase-1b-worker.md:139-141`) — se traslada esa misma limitación aquí.

## 13. Bindings

**Verificado**, `wrangler.jsonc` en `38bdb33` (HEAD actual de `main`):
`ASSETS` (línea 14), `CONTACT_KV` (21), `SESSION` (25), `CONTACT_DB` (31),
`AI` (37), `EMAIL` (41), `ASK_LIMIT` (45), `ADMIN_LIMIT` (46). Confirmado
también por `wrangler deploy --dry-run` en F3
(`fase-3-evidencia.md:31`: mismos 8 bindings detectados) y F4.

`SESSION` es el binding más reciente: commits `6b00681` (fijar el id del
namespace KV en `wrangler.jsonc`) y `02f4a5a` (regenerar
`worker-configuration.d.ts` tras agregarlo), ambos en la rama que se
convirtió en PR #38, posteriores al cierre de F1B/F2/F3/F4.
**No verificado en este postmortem:** para qué se usa `SESSION` en runtime —
no se buscó su consumidor en el código; solo se confirma su declaración en
`wrangler.jsonc` y en los tipos generados.

## 14. Retiro del hook `postbuild` y ejecución explícita del SDI

**Verificado**, PR #36 (`fix/issue-21-remove-postbuild`, fusionado en
`migracion/astro-7`), descripción del PR: se verificó **en el dashboard real
de Cloudflare Workers Builds** que el build command configurado era
`npm run build && npx tsx lib/discovery/run.ts` — dependía del hook
`postbuild` y de hecho lo duplicaba (el log de Workers Builds mostraba el
runner de indexación SDI corriendo dos veces). Se cambió el build command en
el dashboard a `npx astro build && npm run sdi:run` (confirmado guardado y
persistente tras recargar el dashboard), y solo **después** de ese cambio
verificado se retiró `postbuild` de `package.json`. `npm run build` ya no
dispara indexación; `sdi:run` es ahora el paso explícito, igual en local que
en Cloudflare. AGENTS.md (raíz del repo) documenta la regla resultante: "Para
compilar de forma explícita, usá `npx astro build`; el CI hace eso."

Este es el ejemplo más claro de todo el proceso de un side effect de
producción que **no se puede ver leyendo el repo**: el hook estaba en
`package.json`, pero solo el dashboard de Cloudflare confirmaba si realmente
se ejecutaba en el build de producción, y con qué comando exacto. Cambiar el
código primero y verificar el dashboard después habría dejado una ventana con
indexación duplicada o, peor, con `sdi:run` sin ejecutarse nunca en
producción.

## 15. Compatibilidad CSS / Tailwind: resumen

Cubierto en detalle en el §7. Dos problemas distintos, dos correcciones
distintas, ambas confinadas a `src/styles/global.css`:

1. `<alpha-value>` (sintaxis Tailwind 3, incompatible con Tailwind 4) — 11
   tokens `brand-*` reescritos.
2. Line-height responsive (`--tw-leading` de Tailwind 4 pisando los valores
   fijos de Tailwind 3 en `sm:/md:/lg:text-*`) — regla explícita de
   compatibilidad, no un ajuste puntual del componente afectado.

Ninguna corrección tocó `HomeHero.astro` ni otro componente: la spec de F3
prioriza deliberadamente arreglar la causa (el CSS global) sobre el síntoma
(un componente puntual), siguiendo la regla de la skill compartida.

## 16. CI y compuertas de Workers Build

**Verificado**, `.github/workflows/ci.yml` (HEAD actual): workflow
`CI (pull requests)`, dispara en `pull_request` (`opened, synchronize,
reopened`), pasos en orden: checkout completo (`fetch-depth: 0`) → fetch
explícito de la rama base (`git fetch ... refs/heads/${GITHUB_BASE_REF}`,
necesario porque el checkout de un PR no crea ese remote-tracking ref por
default — PR #28/#29 lo arreglaron) → `npm ci` → `astro sync` (genera
`astro:content`, ausente en un checkout limpio) →
`node scripts/audit-specs-migracion.mjs` (coherencia de las specs de
migración, corre primero porque no tiene dependencias) → `astro check` →
`npm test` → `astro build` → verificación de que `worker-configuration.d.ts`
generado coincide con `wrangler.jsonc` (después del build, porque
`wrangler types` solo emite `GlobalProps.mainModule` cuando `dist/` existe).

Ese workflow no existía antes de F0: el comentario en el propio archivo lo
documenta ("Hasta ahora este repositorio no compilaba nada en CI... Cuando se
montó este workflow aparecieron de inmediato 19 errores de tipos ya
fusionados en `main`"). Es la compuerta a la que se refiere la skill
compartida ("que `npm run build` pase en verde significa que el sitio
compila, no que se vea ni funcione igual que antes").

**Workers Builds (Cloudflare) como segunda compuerta:** `fase-2-evidencia.md:32`
cita "CI de GitHub y Workers Builds estaban verdes para `2b43626`" como
condición de aprobación. **No verificado en este postmortem:** no se tuvo
acceso al dashboard de Cloudflare Workers Builds para confirmar el estado
actual de los últimos builds sobre `main`; se toma la cita de la evidencia de
fase como fuente, más la confirmación textual de PR #36 sobre el build
command real.

## 17. Limitaciones de verificación visual

**Verificado, documentado explícitamente en cada evidencia de fase —
no es un hueco oculto:**

- **F2** (`fase-2-evidencia.md:46-49`): no se aprobó el diff visual base/F2
  porque la API del navegador disponible no permitió inyectar CSS para
  desactivar animaciones/transiciones. El iframe de Turnstile no se pudo
  observar (error externo `Invalid or missing type for parameter "sitekey"`,
  no atribuido a la migración: la API oficial respondió bien por `curl`).
- **F3** (`fase-3-evidencia.md:52-73`): el intento de verificación visual con
  Edge externo contra servidores locales (`http://127.0.0.1:4331`/`4332` y
  `http://localhost:...`) fue bloqueado por el navegador con
  `net::ERR_BLOCKED_BY_CLIENT` en **todos** los intentos. Resultado: 0
  capturas, 0 comparaciones por píxeles, ThemeToggle sin verificar en esa
  sesión. El documento es explícito: "No se sustituye esta prueba por
  inspección visual integrada, HTML o métricas inventadas."
- **F4** (`fase-4-evidencia.md:60-70,94-100`): sí se logró capturar en
  Chromium (1265×8077px), pero el control de determinismo (base contra sí
  misma) dio 0.9468% de píxeles distintos en el primer intento y 0.1015% tras
  recargar — no es cero, así que el 52.6774% de diferencia entre base y F4 no
  se considera concluyente. Explícitamente: **Safari 16.4–17 no quedó
  verificado**, pese a que la corrección del §7/§8 (`backdrop-filter`,
  prefijo WebKit del navbar) apunta justamente a ese rango de versiones.

**Conclusión honesta para este postmortem:** en ningún salto de la migración
hubo una herramienta de regresión visual real y estable disponible para las
sesiones ejecutoras/verificadoras. Las comparaciones de texto plano (HTML
tokenizado sin etiquetas) y de conteo de rutas fueron sólidas y consistentes
en las tres fases de versión; las comparaciones de píxeles fueron parciales
(F2, F3) o no concluyentes (F4) por limitaciones del entorno de navegador
disponible, no por falta de intento.

## 18. Referencia final de producción — resolución de la contradicción

El brief de esta tarea señalaba correctamente una discrepancia: el worktree
donde arrancó esta sesión tenía `main` en `736d6c1`, sin `00ca256` ni
posteriores. La investigación (con `git fetch`, `gh pr list --state all`,
`git merge-base`, `git log --format='%P'`) da esta secuencia verificada:

1. `736d6c1` era efectivamente el HEAD de `main` en GitHub en el momento en
   que arrancó esta sesión de postmortem (antes del primer `git fetch`).
2. **PR #38** ("Promote Astro 7 migration to production", base `main`, head
   `migracion/astro-7`) se fusionó el **2026-09-03T13:25:00Z**. Fue un
   fast-forward: el commit de merge que reporta GitHub
   (`merge_commit_sha=00ca256`) tiene un único padre (`02f4a5a`), no dos —
   confirmado con `git log -1 --format='%P' 00ca256`. Esto llevó `main` a
   `00ca256`, que ya incluía F1A, F1B, F2, F3, F4, la integración de `main`
   en la rama (PR #35) y el retiro del `postbuild` (PR #36).
3. **PR #39** ("chore: close Content Layer and postbuild maintenance", base
   `main`, head `codex/maintenance-issues-25-37`) se fusionó el
   **2026-09-03T14:06:04Z**, también fast-forward, llevando `main` a
   `38bdb33` — el commit actual.
4. `codex/maintenance-issues-25-37` **no** desciende de `migracion/astro-7`
   de forma independiente: se creó directamente desde `main@00ca256`
   (después de que PR #38 ya lo hubiera fusionado), y solo añadió los dos
   commits de cierre de issues (§6 y §14 más arriba).

**Conclusión:** no hay contradicción lógica en el proceso de migración — la
hubo en el estado *observado* por esta sesión, por timing: el worktree se
creó antes de que PR #38/#39 se fusionaran, o no se había hecho `git fetch`
todavía. Al momento de escribir este documento, **`origin/main` en
`38bdb33` es la única referencia de producción**, contiene la migración
completa a Astro 7 y el cierre de los issues #25 y #37, y `AGENTS.md` en ese
mismo commit sigue afirmando "main despliega a producción. Cloudflare
Workers Builds está conectado al repositorio" (`AGENTS.md:11`) — afirmación
que PR #36 verificó contra el dashboard real de Cloudflare, no solo contra el
repo.

**No verificado:** no se confirmó por fuera de GitHub/git (es decir, no se
accedió al dashboard de Cloudflare Workers Builds en esta sesión) que el
build de producción actualmente desplegado corresponda exactamente a
`38bdb33`. La evidencia disponible es: (a) AGENTS.md lo declara como regla
operativa, (b) PR #36 lo verificó una vez contra el dashboard real para el
build command (no para el commit desplegado), (c) Workers Builds se dispara
por push a `main` según esa misma declaración. Confirmar el commit
efectivamente vivo en `cuidatuperroviejo.com` requeriría acceso al dashboard
de Cloudflare o una comparación de artefactos servidos contra `dist/` de
`38bdb33`.

**Deuda de seguimiento:** `docs/migracion-stack/README.md` sigue describiendo
la migración como si estuviera en curso ("Fases 1 a 4 pendientes", tabla de
fases con estados `🔒`/`🟢`) y las reglas de rama en `AGENTS.md:11` ("las
fases de versión van contra `migracion/astro-7`, nunca contra `main`") ya no
aplican tras el cierre de F4 y la promoción a producción. Ninguno de los dos
archivos se tocó en este postmortem por estar fuera del alcance permitido
(specs de `docs/migracion-stack/` protegidas). Se recomienda una sesión
aparte, con dueño explícito, que actualice el estado de esos dos documentos
para que dejen de describir una migración en curso que ya terminó.

## 19. Issues #25 y #37 — verificación de existencia y contenido

**Verificado**, `gh issue view 25` y `gh issue view 37`, ambos `state: CLOSED`.

- **#25** — "Quitar el shim de slug en index.astro cuando HomeRecentPosts lea
  entry.id". Nace de la revisión de PR #22 (F2): la Content Layer sustituyó
  `entry.slug` por `entry.id`, pero `HomeRecentPosts.astro` no estaba en la
  lista de archivos de ninguna fase, así que F2 no podía tocarlo sin romper
  el criterio de propiedad. La sesión de F2 hizo lo correcto (un shim
  documentado en `index.astro`, fuera del componente) y abrió el issue en vez
  de improvisar. Cerrado por PR #39, commit `ff745ab`.
- **#37** — "Actualizar referencias documentales tras retirar postbuild". PR
  #36 retiró el hook y dejó Cloudflare Builds con
  `npx astro build && npm run sdi:run`, pero quedaron referencias
  desactualizadas en `AGENTS.md`, `.github/workflows/ci.yml` (comentarios),
  `docs/asistente-ia/STATUS.md` y `docs/sdi-stage-6-5/README.md`. Cerrado por
  PR #39, commit `38bdb33`.

Ambos issues son un ejemplo del mismo patrón: un ejecutor que encuentra algo
fuera de su propiedad de archivos, no lo toca, y lo convierte en issue en vez
de en improvisación silenciosa.

## 20. Lecciones y reglas de revisión reutilizables

1. **La propiedad de archivos, verificada con `git diff --name-only`, es lo
   que hace posible el paralelismo — no la buena voluntad.** Sin un criterio
   de aceptación que compare el diff contra una lista explícita, "no deberían
   pisarse" es una esperanza, no una garantía.
2. **El orden de los merges determina qué se puede atribuir.** Fusionar la
   rama con más cambios en la rama con menos cambios, antes de verificar la
   más pequeña, destruye la capacidad de saber qué introdujo qué defecto.
3. **Un side effect de producción (el hook `postbuild`) no se verifica
   leyendo el repo.** Solo el dashboard del proveedor (Cloudflare Workers
   Builds) confirmó el build command real, y ese build command duplicaba una
   llamada a una API externa (SDI/indexing) sin que ningún test lo detectara.
4. **La verificación visual real no siempre está disponible, y hay que
   decirlo, no simularlo.** Las tres fases de versión documentan bloqueos
   distintos (API del navegador, `ERR_BLOCKED_BY_CLIENT`, control de
   determinismo no-cero) y ninguna finge haber visto algo que no vio.
5. **Un fast-forward no es un merge commit, y confundirlos rompe la
   topología que se reporta.** `git log -1 --format='%P'` sobre el SHA que
   reporta `gh pr view --json mergeCommit` es la única forma de saberlo con
   certeza.
6. **Un worktree desactualizado puede parecer una contradicción real.**
   Antes de reportar un estado de `main` como definitivo, `git fetch` y
   comparar contra `origin/main`, no contra la copia local.
7. **Un shim documentado con un issue abierto es mejor que un archivo tocado
   fuera de su propiedad.** Los issues #25 y #37 no son defectos de las fases
   que los generaron: son la forma correcta de pagar deuda sin romper el
   paralelismo de otra fase en curso.
