# Estudio de refactorización e ingeniería — Astro 7 + Cloudflare Workers

**Repositorio:** `Gunz-cop/CuidaTuPerroViejo`<br>
**Base observada:** `origin/main` en `58b7bc3f121dbbca8116f1fa73d9e3c26593f067`<br>
**Rama de este estudio:** `codex/study-refactor-astro7`<br>
**Fecha:** 2026-09-03
**Alcance:** estudio técnico y plan de modernización. No implementa cambios de producto, configuración, dependencias, CI, Wrangler, despliegue ni contenido.

## Veredicto ejecutivo

La migración Astro 4 → 7 está técnicamente cerrada en el repositorio: `astro check`, tests, build estático, generación de tipos Worker y `wrangler deploy --dry-run` pasan; se generan 34 rutas públicas y el bundle ya no arrastra el cuerpo MDX completo al endpoint de IA. La arquitectura actual —assets estáticos primero y Worker sólo para `/api/*` y `/admin/*`— es razonable para el sitio.

El trabajo prioritario posterior a la migración no es otro salto de versión. Es endurecer los límites de confianza y hacer que el comportamiento operativo sea demostrable:

1. El asistente convierte texto procedente de IA en `innerHTML`; aunque escapa parte del texto, el `href` no está validado como URL segura. Es el riesgo técnico más urgente.
2. Feedback y contacto aceptan tráfico público con controles incompletos: feedback permite slugs arbitrarios y no tiene rate limit; contacto puede devolver éxito al navegador aunque D1, Turnstile o correo fallen.
3. El panel admin protege con Basic Auth, pero sus mutaciones no tienen defensa CSRF/origin explícita.
4. El único test automatizado es de contratos auxiliares; no hay pruebas del Worker con bindings simulados. CI protege compilación, no contratos HTTP, seguridad ni operación en Cloudflare.
5. Hay deuda de mantenibilidad de bajo riesgo (`z` deprecado, `any`, scripts inline sin typecheck, schemas duplicados, lifecycle de navegación), y deuda operativa/documental en los estados de migración.

No recomiendo tocar ahora las decisiones protegidas por la migración: `output: 'static'`, `build.format: 'file'`, `trailingSlash: 'never'`, normalización canónica, `dateModified`, autoría como organización, `_redirects`, `public/_headers`, `AdNativeBanner` vacío, ni el modelo de catálogo estático. Cualquier cambio ahí debe llevar su propia base de comparación, evidencia visual y revisión SEO.

## Estado de evidencia

Se usan estas etiquetas, siguiendo la skill de postmortem del repositorio:

- **Verificado:** observado en este checkout, en una ejecución reproducible o en git/GitHub.
- **Diferencia aceptada:** la realidad difiere de una spec o expectativa, pero la diferencia tiene explicación documentada.
- **No verificado:** requiere dashboard, producción, credenciales o un navegador estable que no estuvo disponible.
- **Deuda de seguimiento:** hueco conocido que debe tener dueño y criterio de cierre.

El estudio se ejecutó en el worktree aislado `C:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo-refactor-study`, creado desde `origin/main` después de `git fetch --all --prune`. El worktree original `CuidaTuPerroViejo` no fue modificado.

## Mapa de arquitectura actual

```text
Contenido MDX + assets públicos
        │
        ├─ Astro Content Layer (glob + schemas) ──┐
        │                                          ├─ Astro 7 / Sätteri / MDX / Tailwind 4
        └─ componentes Astro + layouts ───────────┘
                           │
                           ├─ build estático → dist/client (HTML, CSS, imágenes, sitemap)
                           └─ entrypoint @astrojs/cloudflare/server → Worker
                                      │
                                      ├─ middleware: cabeceras + intento de Cache API
                                      ├─ /api/ask → ASSETS.fetch catálogo → Workers AI
                                      ├─ /api/contact → Turnstile → D1 → Email
                                      ├─ /api/feedback → D1
                                      ├─ /api/geo → headers cf / request.cf
                                      └─ /admin/* → Basic Auth + D1

Cloudflare Worker deployment
  ├─ assets: dist, first asset / fallback 404-page
  ├─ run_worker_first: /api/*, /admin/*
  ├─ bindings: ASSETS, CONTACT_DB, CONTACT_KV, SESSION, AI, EMAIL,
  │             ASK_LIMIT, ADMIN_LIMIT
  └─ observability.enabled = true
```

**Lectura de la arquitectura:** la salida es estática, pero el Worker sigue siendo necesario para endpoints y admin. El catálogo del asistente está correctamente separado del código de runtime. `SESSION` está declarado en `wrangler.jsonc`, pero una búsqueda del checkout no encontró consumidor en `src/`, `lib/` ni `scripts/`; su propósito real y si debe conservarse quedan **No verificados** y requieren acceso/propiedad de producción antes de retirarlo.

## Checks realizados

| Check | Resultado | Alcance y límite |
|---|---:|---|
| `npm ci --ignore-scripts --no-audit --no-fund` | OK | Instalación reproducible; no prueba secretos ni producción. |
| `npx --no-install astro sync` | OK | Genera tipos virtuales locales. |
| `npx --no-install astro check` | OK | 0 errores, 0 warnings, 38 hints. |
| `npm test` | OK | 1 archivo, 1 test pasado: `tests/assistant-v2/contracts.test.ts`. |
| `npx --no-install astro build` | OK | 34 rutas; salida estática y Worker server. |
| `npm run types:worker` + diff | OK | Bindings y `Env` generados coherentes tras regeneración. |
| `wrangler deploy --dry-run --outdir=.wrangler-dry-run-study` | OK | 281 assets; Worker 675.02 KiB / 165.42 KiB gzip en el bundle dry-run local. |
| `npm run audit:migration` | OK | 7 specs y árbol coherentes; no prueba producción. |
| `npm run audit:seo -- --offline` | OK | 15 `legacyUrl` auditadas offline; no prueba que URLs públicas respondan igual. |
| Sitemap generado | OK | No contiene `/api` ni catálogo JSON; 34 URLs indexables observadas. |
| Comparación visual | No verificado | Las evidencias F2/F3/F4 documentan bloqueo o no determinismo del navegador; no se inventa aprobación visual. |
| Commit actualmente vivo en Cloudflare | No verificado | El postmortem no tuvo acceso al dashboard ni a artefactos de producción. |

## Hallazgos priorizados

### R-01 — HTML de IA con URL no validada

- **Categoría / ubicación:** seguridad de frontend; `src/components/CanineAiAssistant.astro:226-247,340-366`.
- **Evidencia:** **Verificado**. `parseMarkdown()` escapa `&`, `<` y `>` en parte del flujo, pero construye anchors interpolando `url` y después los inserta con `markdownDiv.innerHTML = parseMarkdown(text)`.
- **Por qué importa:** una respuesta de modelo o un cambio futuro en el parser puede introducir `javascript:`, `data:` o una URL externa inesperada. El endpoint está públicamente invocable y el HTML se ejecuta en el origen del sitio.
- **Severidad:** **P1**.
- **Clasificación:** cambio seguro y accionable; seguridad.
- **Cambio recomendado:** eliminar `innerHTML` para enlaces o construir nodos DOM; si se conserva el parser, aceptar sólo hrefs relativos del catálogo o `https:` explícitos, normalizar con `URL`, bloquear protocolos peligrosos y no confiar en la respuesta del modelo. Añadir tests de payloads XSS y URLs malformadas.
- **Dependencias:** ninguna de infraestructura; acordar si el asistente puede enlazar fuera del catálogo.
- **Esfuerzo:** M.
- **¿Independiente?:** sí, con tests incluidos.
- **Verificación:** respuesta con texto `<img src=x onerror=...>`, `[x](javascript:...)`, `[x](//host)` y URL relativa; comprobar que no se ejecuta ni se renderiza fuera de la allow-list.
- **Rollback:** revertir el PR; conservar la respuesta de texto sin enlaces si la allow-list rompe casos válidos.

### R-02 — Feedback permite escritura pública arbitraria sin rate limit

- **Categoría / ubicación:** seguridad, abuso y almacenamiento; `src/pages/api/feedback.ts:28-41,49-97`.
- **Evidencia:** **Verificado**. GET y POST no usan `ASK_LIMIT` ni `ADMIN_LIMIT`; el POST acepta cualquier string no vacío como `slug`, sin longitud ni pertenencia al catálogo, y puede crear filas nuevas en D1 para cada slug.
- **Por qué importa:** un tercero puede llenar `feedback_votes`/`feedback_counts` con slugs inventados, contaminar métricas y aumentar coste/retención. La deduplicación por IP y slug no limita el espacio de slugs ni el volumen de IPs.
- **Severidad:** **P1**.
- **Clasificación:** cambio accionable con decisión de producto sobre retención/anónimo.
- **Cambio recomendado:** validar slug contra un conjunto canónico generado del catálogo o una tabla permitida; limitar longitud/formato; aplicar rate limit dedicado a feedback; considerar una única tabla agregada o política de retención si las métricas no necesitan historial por IP.
- **Dependencias:** disponibilidad de `CONTACT_IP_HASH_SALT`, límites de Cloudflare y decisión de privacidad/retención.
- **Esfuerzo:** M.
- **¿Independiente?:** sí, pero debe coordinarse con esquema D1.
- **Verificación:** POST con slug largo, Unicode, rutas arbitrarias y ráfaga; comprobar 400/429, ausencia de filas no canónicas y que un voto legítimo sigue funcionando.
- **Rollback:** desactivar sólo la validación de allow-list manteniendo rate limit y límites de tamaño; no restaurar escritura ilimitada.

### R-03 — Contacto puede confirmar éxito cuando falla la entrega

- **Categoría / ubicación:** fiabilidad y observabilidad; `src/pages/api/contact.ts:38-53,78-132`.
- **Evidencia:** **Verificado**. `verifyTurnstile()` hace fetch sin timeout; el `catch` general registra error y devuelve `jsonOk()` 200. Además `sendContactEmail()` puede no hacer nada cuando falta destino/binding (`src/lib/contact/email.ts:10-28`).
- **Por qué importa:** la persona puede creer que el mensaje fue recibido cuando D1, Turnstile o correo fallaron. Un timeout de un tercero consume la duración de la petición y no hay estado de entrega visible.
- **Severidad:** **P1**.
- **Clasificación:** arquitectura/operación; requiere decidir contrato de UX y si se prefiere respuesta 5xx, cuarentena o cola.
- **Cambio recomendado:** usar `AbortController` con timeout para Turnstile; diferenciar rechazo anti-spam de fallo de infraestructura; devolver un estado neutral pero no exitoso cuando no se persiste, o persistir primero y marcar entrega pendiente; registrar evento correlacionable y alertable.
- **Dependencias:** contrato del formulario, política anti-enumeración, destino de correo y posible cola.
- **Esfuerzo:** M/L.
- **¿Independiente?:** timeout y logging sí; contrato de entrega requiere decisión.
- **Verificación:** simular timeout/HTTP 500 de Turnstile, D1 ausente/error y email fallido; comprobar que no se informa éxito falso y que el mensaje persistido queda operable.
- **Rollback:** mantener el response shape del cliente, pero revertir sólo el cambio de status si rompe integraciones; no eliminar el log/timeout.

### R-04 — Mutaciones admin sin defensa CSRF/origin explícita

- **Categoría / ubicación:** seguridad; `src/pages/admin/contact-messages.astro:138-150`, `src/pages/api/admin/contact-messages/[id].ts:13-56`.
- **Evidencia:** **Verificado**. El panel usa formularios POST con Basic Auth y rate limit, pero el endpoint valida autenticación, id y estado; no comprueba `Origin`, `Referer`, token CSRF ni un método de mutación con protección equivalente.
- **Por qué importa:** si un navegador ya autenticado envía credenciales Basic automáticamente, una página externa podría intentar un POST cross-site que marque o notifique un mensaje.
- **Severidad:** **P1**.
- **Clasificación:** cambio accionable, con decisión de mecanismo de autenticación.
- **Cambio recomendado:** añadir defensa por `Origin`/`Sec-Fetch-Site` y un token CSRF de sesión, o reemplazar Basic Auth por una sesión con cookie `HttpOnly`, `Secure`, `SameSite=Strict` y token anti-CSRF. Mantener `no-store` y rate limit.
- **Dependencias:** binding `SESSION` declarado pero sin consumidor encontrado; requiere verificar su intención antes de convertirlo en sesión.
- **Esfuerzo:** L si se migra auth; M si sólo se añade allow-list de origin + token de despliegue, con menor protección.
- **¿Independiente?:** no del diseño de autenticación.
- **Verificación:** POST con Origin externo, sin token y con token válido; comprobar 403/400/éxito respectivamente, además de flujo manual admin.
- **Rollback:** conservar Basic Auth y deshabilitar sólo la nueva ruta de sesión si falla; no quitar `no-store` ni el rate limit.

### R-05 — Casts de respuestas externas y catálogo sin validación runtime

- **Categoría / ubicación:** calidad y seguridad de contratos; `src/pages/api/ask.ts:33-38`, `src/lib/assistant/generation.ts:3-37,62-95`, `src/lib/assistant/retrieval.ts:43-56`.
- **Evidencia:** **Verificado**. `response.json()` del catálogo se fuerza a `ArticleCandidate[]`; Workers AI se fuerza a `TextGenerationResponse`/`RankingResponse`. Sólo algunas invariantes posteriores se comprueban.
- **Por qué importa:** TypeScript no valida JSON en runtime. Un cambio de formato, respuesta parcial o resultado inesperado puede producir recomendaciones incorrectas o fallar de forma tardía. El prompt exige 50–110 palabras, pero `parseGeneratedAnswer()` sólo comprueba que `answer` sea string no vacío.
- **Severidad:** **P1** para la frontera IA; **P2** para catálogo.
- **Clasificación:** cambio seguro accionable; contrato de dominio.
- **Cambio recomendado:** definir schemas runtime para catálogo, respuesta generativa y ranking; validar longitud y campos permitidos; rechazar hrefs no canónicos; registrar motivo de fallback sin contenido sensible. Mantener las respuestas de emergencia estáticas fuera del modelo.
- **Dependencias:** formato actual de Workers AI y decisión de longitud/Markdown del asistente.
- **Esfuerzo:** M.
- **¿Independiente?:** sí, después de fijar el contrato en tests.
- **Verificación:** fixtures de respuestas incompletas, campos extra, scores `NaN`, slugs inexistentes y respuestas fuera de longitud; comprobar fallback/503 seguro.
- **Rollback:** mantener parser actual detrás de la misma función de validación y permitir fallback de artículos si el proveedor cambia.

### R-06 — La compuerta no prueba el Worker real

- **Categoría / ubicación:** testing; `tests/assistant-v2/contracts.test.ts`, `.github/workflows/ci.yml:65-113`.
- **Evidencia:** **Verificado**. Hay un test de contratos auxiliares y CI ejecuta `astro check`, `npm test`, build, tipos y dry-run. No hay `vitest.config.*`, `@cloudflare/vitest-plugin`, harness Worker ni tests HTTP para bindings, D1, rate limits, ASSETS o endpoints.
- **Por qué importa:** el build demuestra empaquetado, no que `env`, `Request`, D1, Cache API y respuestas de cada ruta funcionen en el runtime de Workers.
- **Severidad:** **P1** como riesgo de regresión; no implica un fallo observado en producción.
- **Clasificación:** cambio seguro accionable.
- **Cambio recomendado:** incorporar Vitest con el plugin oficial de Cloudflare y una primera suite de endpoints: `/api/ask` sin catálogo, rate limit, fallback AI; feedback; contacto; admin; headers/cache. Mantener los tests puros actuales.
- **Dependencias:** versión actual de Vitest/plugin, configuración Wrangler de test y estrategia para no usar secretos reales.
- **Esfuerzo:** L.
- **¿Independiente?:** sí, como PR de infraestructura de tests.
- **Verificación:** tests corriendo en runtime Worker simulado con bindings; cobertura mínima por contrato, no sólo por líneas.
- **Rollback:** retirar el job nuevo si el plugin bloquea CI, conservando los tests puros y una tarea local reproducible.

### R-07 — CI protege PRs, pero no el camino de producción

- **Categoría / ubicación:** entrega; `.github/workflows/ci.yml:1-113`, `.github/workflows/sdi-baseline.yml`.
- **Evidencia:** **Verificado**. El workflow principal sólo dispara en `pull_request`; no hay workflow de push a `main`, smoke post-deploy, auditoría online, comparación de rutas, prueba visual estable ni presupuesto de bundle. Workers Builds de Cloudflare es el proveedor de producción según el repo, pero su estado actual es **No verificado** desde este estudio.
- **Por qué importa:** se puede fusionar un cambio que compile y aun así rompa headers, APIs, SEO, browser UX o el despliegue real.
- **Severidad:** **P2**; subir a P1 si no existe ninguna compuerta equivalente en Cloudflare.
- **Clasificación:** arquitectura de entrega y acceso de producción.
- **Cambio recomendado:** decidir una única fuente de verdad para checks post-merge; añadir smoke controlado contra preview/deploy, validación de sitemap/redirects/headers, bundle budget y, cuando haya navegador estable, accesibilidad/regresión visual. No duplicar un deploy si Workers Builds ya es el dueño.
- **Dependencias:** dashboard Cloudflare, entorno preview, secretos sintéticos y presupuesto de tiempo CI.
- **Esfuerzo:** L.
- **¿Independiente?:** smoke offline y auditorías sí; post-deploy no.
- **Verificación:** un commit de prueba falla si no se publica el artefacto esperado, una ruta API devuelve header incorrecto o el sitemap cambia inesperadamente.
- **Rollback:** mantener sólo checks offline si el proveedor no permite preview; no convertir un smoke público en bloqueo sin estabilidad.

### R-08 — Middleware de caché y headers duplican superficies

- **Categoría / ubicación:** runtime/operación; `src/middleware.ts:6-104`, `public/_headers:1-14`, `wrangler.jsonc:13-17`.
- **Evidencia:** **Verificado**. Assets se sirven primero por Cloudflare salvo `/api/*` y `/admin/*`; el middleware excluye APIs, admin y rutas con extensión, por lo que su Cache API sólo puede afectar rutas Worker no asset sin extensión. Los headers de seguridad se repiten porque `_headers` no cubre respuestas generadas por Worker. La documentación de Cloudflare confirma esa diferencia de superficies.
- **Por qué importa:** el cacheo HTML manual puede ser código muerto o un comportamiento difícil de observar, mientras que dos listas de headers pueden divergir. `caches as any` reduce la seguridad del contrato.
- **Severidad:** **P2**.
- **Clasificación:** decisión de arquitectura; no eliminar sin medición.
- **Cambio recomendado:** medir con `X-Edge-Cache`, trazas y rutas reales; decidir si el sitio necesita Cache API para páginas Worker. Si no, retirar sólo tras demostrar que assets/headers de Cloudflare cubren el caso. Centralizar la intención de headers sin asumir que `_headers` cubre Worker.
- **Dependencias:** acceso a logs/producción y conocimiento de rutas dinámicas futuras.
- **Esfuerzo:** M.
- **¿Independiente?:** diagnóstico sí; refactor de cache no.
- **Verificación:** matriz asset/HTML/API/admin con status, `Cache-Control`, security headers y `X-Edge-Cache` en preview y producción.
- **Rollback:** revertir la eliminación o mantener la capa redundante hasta tener equivalencia observada.

### R-09 — `srcset` anuncia variantes que no necesariamente existen

- **Categoría / ubicación:** frontend/performance; `src/utils/image.ts:1-5`, usos en `src/pages/[pilar].astro:39,113` y `src/pages/[pilar]/[slug].astro:39,188`.
- **Evidencia:** **Verificado**. `buildSrcset()` siempre genera `-400.webp 400w` y el original como `1200w`; el inventario de imágenes contiene hero originales sin variante `-400` en varios artículos.
- **Por qué importa:** el navegador puede pedir 404 para la variante móvil y el descriptor `1200w` no representa necesariamente el ancho real. Eso empeora LCP/bytes y puede causar una segunda descarga.
- **Severidad:** **P2**.
- **Clasificación:** cambio seguro accionable, sujeto a conservar URLs.
- **Cambio recomendado:** generar `srcset` a partir de assets existentes/build metadata o garantizar variantes durante un paso explícito de imágenes; usar anchos reales y pruebas que fallen ante 404s. Evaluar Astro `Image` sólo como una migración separada, porque el adapter está deliberadamente en `imageService: 'passthrough'`.
- **Dependencias:** inventario de imágenes y decisión sobre optimización de Cloudflare/compilación.
- **Esfuerzo:** M.
- **¿Independiente?:** sí si se limita al helper y prueba de assets.
- **Verificación:** parsear HTML de las 34 rutas, resolver cada candidato y comprobar existencia, MIME y dimensiones; medir LCP/bytes antes-después.
- **Rollback:** volver a una URL única válida por imagen si una variante falla.

### R-10 — Lifecycle de scripts y accesibilidad del asistente

- **Categoría / ubicación:** frontend; `src/components/CanineAiAssistant.astro:305-478`, `src/components/PostReader.astro:151-236`, `src/layouts/BaseLayout.astro:77-87`.
- **Evidencia:** **Verificado**. Se registran listeners en `DOMContentLoaded` y `astro:page-load`; PostReader añade listeners/IntersectionObserver sin cleanup. El asistente usa casts DOM sin validación, no implementa explícitamente dialog/focus trap/restore, live region o `aria-expanded`; el acceso a `localStorage` del tema no está protegido con try/catch.
- **Por qué importa:** las transiciones futuras pueden duplicar listeners y coste; teclado/lectores de pantalla pueden perder contexto; almacenamiento bloqueado puede abortar el script de tema.
- **Severidad:** **P2**.
- **Clasificación:** cambio accionable en frontend.
- **Cambio recomendado:** consolidar inicialización idempotente por elemento, cleanup con `AbortController`/desconexión del observer, `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-controls`, live region y restauración de foco; encapsular storage con fallback.
- **Dependencias:** decisión de mantener transiciones de Astro y diseño visual del chat.
- **Esfuerzo:** M.
- **¿Independiente?:** sí por componente, con pruebas browser.
- **Verificación:** navegación repetida, teclado Tab/Escape, lector de pantalla básico, `prefers-reduced-motion`, storage bloqueado y contador de listeners/observers.
- **Rollback:** revertir por componente sin cambiar contenido ni endpoints.

### R-11 — Tipado débil en almacenamiento y correo

- **Categoría / ubicación:** TypeScript/code quality; `src/lib/contact/storage.ts:3-31`, `src/lib/contact/email.ts:4-28`, `src/pages/api/contact.ts:62`.
- **Evidencia:** **Verificado**. D1 y el binding de email se reciben como `any`; `astro check` pasa porque el cast elimina la protección de tipos.
- **Por qué importa:** bindings cambiados o campos mal nombrados fallan en runtime y no quedan expresados en la API de dominio.
- **Severidad:** **P2**.
- **Clasificación:** cambio seguro accionable.
- **Cambio recomendado:** tipar `D1Database`, el shape mínimo del binding Email y metadatos de resultado; separar funciones de persistencia de funciones de transporte; evitar `any` salvo adapter documentado.
- **Dependencias:** tipos emitidos por Wrangler y API actual de Send Email.
- **Esfuerzo:** S/M.
- **¿Independiente?:** sí.
- **Verificación:** `astro check`, fixture de D1 y prueba de email ausente/presente.
- **Rollback:** revertir sólo las anotaciones si el tipo generado difiere; no volver a ampliar el dominio entero a `any`.

### R-12 — Schema de contenido con API deprecada y contrato desigual

- **Categoría / ubicación:** Content Layer/TypeScript; `src/content.config.ts:1-54`.
- **Evidencia:** **Verificado**. `astro check` emite hints de deprecación para `z` importado desde `astro:content` (38 hints totales); Astro documenta `astro/zod` como export recomendado. Blog usa `z.strictObject`, pilares usa `z.object` y `metaDescription` no tiene el mismo límite.
- **Por qué importa:** el código queda en una API de transición y permite drift de frontmatter entre colecciones.
- **Severidad:** **P2**.
- **Clasificación:** cambio seguro accionable; no es una urgencia de producción.
- **Cambio recomendado:** importar `z` desde `astro/zod`, conservar schemas actuales inicialmente y después decidir explícitamente strictness/límites comunes. Añadir fixtures que validen 17 artículos y 7 pilares, incluyendo campos desconocidos y fechas inválidas.
- **Dependencias:** guía de Astro 7 y contrato editorial.
- **Esfuerzo:** S/M.
- **¿Independiente?:** sí para el import; no para endurecer contenido.
- **Verificación:** 0 hints de deprecación relacionados, `astro check`, build y fixtures.
- **Rollback:** revertir el import si una incompatibilidad menor del lockfile aparece; no cambiar frontmatter en el mismo PR.

### R-13 — Deriva entre nombres de pilar y schemas/catálogo

- **Categoría / ubicación:** contenido/SEO/mantenibilidad; `src/pages/[pilar]/[slug].astro:25-35`, `src/content.config.ts:16-24`, `src/data/internal-links.ts`.
- **Evidencia:** **Verificado**. La página mantiene `guia-para-cuidar-tu-perro-senior` como nombre legado, mientras el enum actual y el inventario canónico no lo usan. Hay mapas de nombres y rutas repartidos entre configuración, páginas y datos de enlaces internos.
- **Por qué importa:** un nuevo pilar puede compilar pero quedar con breadcrumb, schema, sitemap o enlace interno incoherente; eliminar el legado sin auditar redirects rompería compatibilidad.
- **Severidad:** **P2**.
- **Clasificación:** arquitectura de datos; requiere preservar SEO.
- **Cambio recomendado:** derivar etiquetas y rutas desde una única fuente canónica, con una tabla explícita de aliases históricos; validar que cada `pilar` del frontmatter tiene página, navegación, sitemap y nombre.
- **Dependencias:** inventario de enlaces internos y `_redirects`; revisión editorial.
- **Esfuerzo:** M.
- **¿Independiente?:** no del mantenimiento SEO.
- **Verificación:** test de consistencia que recorra colecciones y rutas generadas; diff de URLs canónicas y redirects.
- **Rollback:** conservar el mapa legado como fallback hasta completar auditoría de tráfico.

### R-14 — Schema JSON-LD y HTML inline están dispersos

- **Categoría:** SEO/code quality; `src/pages/index.astro:117`, `src/pages/[pilar].astro:92`, `src/pages/[pilar]/[slug].astro:131`, páginas informativas y scripts inline señalados por `astro check`.
- **Evidencia:** **Verificado**. Cada página construye objetos JSON-LD localmente y usa `set:html`; Astro check marca scripts con atributos como `is:inline`, por lo que no reciben el procesamiento TypeScript habitual.
- **Por qué importa:** se pueden introducir campos schema incompatibles, URLs no canónicas o errores de escaping sin una validación común. El build actual pasa, pero no garantiza validez semántica.
- **Severidad:** **P2**.
- **Clasificación:** cambio accionable, sin alterar la semántica protegida.
- **Cambio recomendado:** crear builders tipados para WebPage/BlogPosting/BreadcrumbList y un test que parse JSON-LD de las 34 rutas; documentar qué scripts deben seguir siendo inline por FCP o compatibilidad.
- **Dependencias:** contrato editorial de autoría/dateModified y revisión SEO.
- **Esfuerzo:** M.
- **¿Independiente?:** sí si no cambia los valores públicos.
- **Verificación:** JSON parse, URLs absolutas, un `@id` único por página, sitemap/canonical sin cambios.
- **Rollback:** mantener los objetos actuales como fixture de referencia y revertir sólo el builder.

### R-15 — Observabilidad habilitada, pero no operable de extremo a extremo

- **Categoría / ubicación:** Cloudflare runtime; `wrangler.jsonc:5-7`, `src/pages/api/ask.ts:26-31,116-124`, endpoints de contacto/feedback.
- **Evidencia:** **Verificado:** `observability.enabled` está en true y `/api/ask` emite algunos eventos JSON. **No verificado:** retención, sampling, dashboards, alertas, logs de producción y correlación de una petición entre Worker/Turnstile/D1/email.
- **Por qué importa:** los fallos silenciosos de contacto y los abusos de feedback no tienen una señal operacional consistente.
- **Severidad:** **P2**.
- **Clasificación:** acceso/operación de producción.
- **Cambio recomendado:** definir un esquema mínimo de evento (`requestId`, route, outcome, latency, dependency), no registrar PII, decidir `head_sampling_rate`, dashboards y alertas para 4xx/5xx/429/Turnstile/email/D1.
- **Dependencias:** dashboard Cloudflare, política de datos y volumen/coste.
- **Esfuerzo:** M.
- **¿Independiente?:** el esquema de logs sí; alertas y sampling no.
- **Verificación:** petición sintética end-to-end y localización por `requestId` sin valores personales.
- **Rollback:** dejar logs existentes y retirar sólo campos nuevos si causan ruido; no desactivar observabilidad.

### R-16 — Configuración de secretos y valores opcionales sin contrato de entorno

- **Categoría:** configuración/operación; `src/env.d.ts:3-11`, `src/pages/contacto.astro:9`, `src/pages/api/contact.ts:38-58`, `wrangler.jsonc:19-47`.
- **Evidencia:** **Verificado**. Wrangler declara bindings de recursos, mientras sitekey, secreto Turnstile, salt, credenciales admin y destino email viven como propiedades opcionales de `Cloudflare.Env`. La evidencia F2 ya documentó que la sitekey local puede estar incompleta. Las docs de Cloudflare distinguen `vars` de secretos y exigen repetir valores por environment.
- **Por qué importa:** un checkout puede compilar una página de contacto sin sitekey útil; un Worker puede arrancar con una dependencia crítica ausente y degradar silenciosamente.
- **Severidad:** **P2**.
- **Clasificación:** arquitectura/configuración y acceso de producción.
- **Cambio recomendado:** crear una frontera `getRuntimeConfig()` que clasifique requerido/opcional y falle de forma explícita por ruta; documentar `.dev.vars` no versionado y entornos Wrangler; considerar `secrets.required`/check de despliegue cuando sea compatible con el flujo actual.
- **Dependencias:** dashboard/entornos Cloudflare y contrato de disponibilidad del contacto.
- **Esfuerzo:** M.
- **¿Independiente?:** tipado local sí; política requerida por entorno no.
- **Verificación:** matriz local/preview/prod con cada secreto ausente; build sin secretos y smoke con mensaje seguro.
- **Rollback:** conservar fallback UI sólo para local; no ocultar fallos de producción.

### R-17 — Fonts, publicidad y CSP son una decisión, no una limpieza automática

- **Categoría / ubicación:** performance/privacidad; `src/layouts/BaseLayout.astro:39-40,89-96`, `src/components/PostReader.astro:62-66`, `src/components/ads/AdSlotLoader.astro`, `public/_headers`.
- **Evidencia:** **Verificado**. Se cargan fuentes de Google y Material Symbols; los anuncios se inyectan desde un tercero cuando entran en viewport. No hay CSP declarada. F4 documenta que los anchors externos fueron comprobados con `noopener/noreferrer` en el muestreo de esa fase.
- **Por qué importa:** self-hosting, CSP o retirar publicidad cambia disponibilidad, consentimiento, ingresos y carga; una modificación ciega puede romper anuncios, iconos o el contrato legal.
- **Severidad:** **P3** como oportunidad; P2 si las métricas reales muestran impacto material.
- **Clasificación:** arquitectura/producto; requiere decisión.
- **Cambio recomendado:** medir LCP/CLS/TBT y dominios efectivos; decidir primero política de fonts/ads/consentimiento; después diseñar CSP por report-only y migrar terceros de forma incremental.
- **Dependencias:** producto, privacidad, monetización y producción.
- **Esfuerzo:** L.
- **¿Independiente?:** no.
- **Verificación:** Lighthouse/Chrome DevTools, report-only CSP sin bloqueos inesperados, navegación de contacto/asistente y ads.
- **Rollback:** retirar CSP enforcement o restaurar fuente externa si el presupuesto o UX empeora.

### R-18 — Documentación de migración quedó desactualizada después de la promoción

- **Categoría:** spec/ownership/documentación.
- **Evidencia:** **Verificado** en git y documentos. `origin/main` actual es `58b7bc3`; PR #38 promovió Astro 7, PR #39 cerró issues de mantenimiento y PR #40 incorporó el postmortem. Aun así, `docs/migracion-stack/README.md` conserva “Fases 1 a 4 pendientes” y estados de migración en curso; el propio postmortem de `docs/migracion-stack/postmortem-astro-4-a-7.md` conserva referencias internas que dicen que el HEAD actual era `38bdb33`.
- **Por qué importa:** un agente o mantenedor puede seguir una rama/base de migración ya obsoleta o creer que la promoción no terminó.
- **Severidad:** **P2**.
- **Clasificación:** cambio de spec/ownership; fuera de este estudio y no debe corregirse aquí.
- **Cambio recomendado:** sesión aparte con dueño explícito: actualizar estado de README, reglas de rama post-promoción y referencias SHA del postmortem; dejar intacta la evidencia histórica, añadiendo una nota de cierre y fecha.
- **Dependencias:** decisión del owner del proceso de migración.
- **Esfuerzo:** S.
- **¿Independiente?:** sí, pero no debe mezclarse con refactors de código.
- **Verificación:** `audit:migration`, búsqueda de “pendiente”, consistencia de SHA y revisión humana del histórico.
- **Rollback:** revertir sólo el commit documental; no modificar código ni ramas productivas.

### R-19 — El recuento de redirects de la documentación no coincide con el archivo

- **Categoría:** SEO/documentación.
- **Evidencia:** **Verificado**. `public/_redirects` contiene 23 reglas no comentadas; documentos de migración/evidencia hablan de 24 en algunos pasajes. `npm run audit:seo -- --offline` pasa y encuentra 15 `legacyUrl` auditadas, pero no prueba que el número histórico de reglas sea correcto.
- **Por qué importa:** un recuento equivocado reduce la confianza en los informes y puede ocultar una redirección que quedó sólo en documentación.
- **Severidad:** **P3**.
- **Clasificación:** cambio de documentación/SEO; no tocar redirects sin auditoría de URLs.
- **Cambio recomendado:** inventariar reglas, `legacyUrl`, sitemap y logs de 404; decidir si 23 es el estado esperado y corregir únicamente la documentación en una PR de ownership SEO.
- **Dependencias:** inventario de URLs legado y Search Console/analytics, no disponibles en este estudio.
- **Esfuerzo:** S/M.
- **¿Independiente?:** el recuento documental sí; eliminar/agregar reglas no.
- **Verificación:** parser de `_redirects`, tabla de correspondencia y pruebas HTTP de cada fuente.
- **Rollback:** revertir el cambio documental; no eliminar reglas por el solo recuento.

## Qué mantener, cambiar, retirar e investigar

| Acción | Elementos | Criterio |
|---|---|---|
| Mantener | Astro 7 + Content Layer; `output: static`; `build.format: file`; `trailingSlash: never`; catálogo JSON por ASSETS; `_headers`; `no-store` en APIs/admin; Satteri; autoría y `dateModified` actuales | Ya están cubiertos por evidencia de migración o son decisiones protegidas. |
| Cambiar | Validación de href/HTML IA; límites y allow-list de feedback; contrato de error de contacto; CSRF admin; runtime schemas; `any`; `astro/zod`; tests Worker | Hallazgos R-01–R-07 y R-11–R-12; mejoras locales, verificables y con rollback. |
| Retirar, sólo tras evidencia | Cache API manual si no hay ruta dinámica que la necesite; mapas duplicados y alias sólo después de cubrir redirects; hints unused | R-08/R-13; primero medir y fijar contrato. |
| Investigar | Commit vivo, build command y secrets reales; uso de `SESSION`; sampling/alertas; CSP/fonts/ads; imagen service; Safari/browser visual | Requiere acceso, decisión de producto o herramienta que no estuvo disponible. |

## Roadmap propuesto y secuencia de PRs

Todas las ramas de abajo parten de `main` actual, salvo donde se indica dependencia explícita. Cada PR debe tocar únicamente sus archivos de ownership y mantener el baseline de 34 rutas, HTML canónico, redirects, sitemap y build.

| PR / rama | Base | Ownership exacto | Alcance y aceptación | Tests / rollback / deps |
|---|---|---|---|---|
| 1. `codex/refactor-ai-output-boundary` | `main` | `src/components/CanineAiAssistant.astro`, `src/lib/assistant/{generation,retrieval,schemas}.ts`, `tests/assistant-v2/*` | Eliminar sink HTML inseguro o imponer allow-list; validar catálogo/IA/ranking y límites de answer; emergency guidance intacta | Tests XSS/fixtures; check/build/test. Revertir a texto seguro. Independiente. |
| 2. `codex/harden-public-feedback` | `main` | `src/pages/api/feedback.ts`, `migrations/` sólo si el diseño lo exige, tests Worker | Rate limit, slug canónico, tamaño y métricas sin filas arbitrarias | Tests 400/429/idempotencia. Depende del contrato de R-01 sólo si se comparte harness; código no necesita depender. |
| 3. `codex/harden-contact-delivery` | `main` | `src/pages/api/contact.ts`, `src/lib/contact/email.ts`, `src/lib/contact/storage.ts`, tests | Timeout Turnstile, estados de persistencia/entrega, tipos D1/email, logs sin PII | Tests de timeout/D1/email. Depende de decisión de response contract; rollback conservador. |
| 4. `codex/protect-admin-mutations` | `main` o base de PR 3 si comparte harness | `src/pages/admin/contact-messages.astro`, `src/pages/api/admin/contact-messages/[id].ts`, `src/lib/contact/security.ts`, tests | CSRF/origin o sesión formal; no-store/rate limit intactos | Tests cross-origin/valid/invalid; depende de decidir uso de `SESSION`; no eliminar Basic Auth hasta migración aprobada. |
| 5. `codex/add-workers-vitest-harness` | `main` | `package.json`, lockfile, `vitest.config.*`, `tests/worker/*`, CI sólo pasos de tests | Runtime Worker simulado con bindings y primera matriz de endpoints | CI verde, fixtures sin secretos; infraestructura aislada. Puede preceder 2–4 si se decide primero. |
| 6. `codex/modernize-content-types` | `main` | `src/content.config.ts`, helpers de schema y tests de contenido | `astro/zod`, fixtures de frontmatter, sin cambiar URLs ni campos públicos | check/build y colección completa; independiente. |
| 7. `codex/fix-responsive-image-contract` | `main` | `src/utils/image.ts`, generador/inventario de assets y tests | Ningún `srcset` apunta a 404; anchos reales; no cambiar hero URLs | Test de 34 rutas + medición; rollback a candidato único. |
| 8. `codex/harden-client-lifecycles` | `main` | `CanineAiAssistant.astro`, `PostReader.astro`, `BaseLayout.astro`, tests/browser | Inicialización idempotente, cleanup, teclado/ARIA, storage fallback | Browser/keyboard; depende de herramienta estable, sin afirmar diff visual si no existe. |
| 9. `codex/ci-runtime-gates` | `main` | `.github/workflows/ci.yml`, scripts de auditoría offline, sin despliegue | Añadir contratos HTTP offline, sitemap/redirect/header checks y presupuesto acordado | No incluir post-deploy hasta confirmar dueño Cloudflare. Depende de PR 5 para tests runtime. |
| 10. `docs/close-astro7-migration-state` | `main` | `docs/migracion-stack/README.md`, postmortem y, si el owner lo autoriza, `AGENTS.md` | Actualizar estado, SHA y reglas de rama sin reescribir evidencia histórica | `audit:migration`; PR separada de todo código. Revertible. |

### Orden recomendado

Primero PR 5 (harness) si el equipo acepta la inversión; en paralelo pueden ir PR 1 y PR 6. Después PRs 2–4 por superficie pública y admin. PR 7 y PR 8 son mejoras independientes. PR 9 debe integrar las compuertas cuando sus contratos existan. PR 10 va aparte, porque cambia ownership documental y no debe contaminar una refactorización de runtime.

## Decisiones que deben tomarse antes de implementar

1. **Asistente:** ¿puede enlazar sólo artículos del catálogo o necesita enlaces externos? La respuesta determina la allow-list de R-01.
2. **Contacto:** ¿un fallo de email después de persistir es éxito de recepción, “pendiente” o error visible? Esto determina R-03.
3. **Admin:** ¿se conserva Basic Auth o se estrena una sesión con el binding `SESSION`? No se debe inventar el uso del binding.
4. **Feedback:** ¿se desea historial por IP o sólo contadores por slug? Determina la forma de limitar y conservar datos.
5. **Cache:** ¿hay rutas HTML dinámicas futuras que necesiten Cache API? Si no, medir antes de retirar middleware.
6. **Imágenes:** ¿la optimización será build-time, Astro `Image` o Cloudflare? `imageService: 'passthrough'` no debe cambiarse por reflejo.
7. **CSP/fonts/ads:** producto, privacidad y monetización deben aprobar dominios, consentimiento y presupuesto de rendimiento.
8. **Producción:** ¿quién verifica el commit desplegado, build command, secrets, logs, alertas y retención en Cloudflare?

## Mejoras opcionales de bajo riesgo

- Eliminar imports/variables unused que aparecen como hints, en PRs pequeños y sin mezclar con la migración de schema.
- Añadir `AbortSignal.timeout()` donde el runtime y la compatibilidad definida lo soporten, empezando por integraciones externas.
- Añadir un request ID generado en la frontera Worker y propagarlo sólo a logs/response headers de diagnóstico controlados.
- Crear un script offline que compruebe anchors externos, `rel`, canonical, sitemap y assets para que la evidencia F4 deje de ser manual.
- Medir bundle por entrypoint; el dry-run de este estudio muestra que el Worker generado pesa más que la página estática por módulos de runtime, no por el cuerpo MDX. No imponer un límite sin separar assets, entrypoint y módulos compartidos.
- Sustituir scripts de página inline por módulos sólo donde no afecte FCP, CSP ni el contrato de Astro; los hints son señal de deuda, no una orden de migración masiva.

## Cosas que no se deben hacer en este momento

- No reabrir Astro 4→7 ni cambiar de adapter sin un nuevo estudio de compatibilidad.
- No cambiar `output`, `build.format`, `trailingSlash`, canonical, redirects o `dateModified` como “limpieza”.
- No eliminar `AdNativeBanner.astro` aunque esté vacío: su estado pausado está documentado como decisión de producto.
- No activar `imageService` de Cloudflare, Smart Placement, `run_worker_first` adicional, CSP enforcement ni nuevos secrets sin decisión de producción y preview.
- No convertir el `audit:seo --offline` en prueba de disponibilidad pública: son verificaciones distintas.
- No afirmar que el commit `58b7bc3` está vivo en `cuidatuperroviejo.com`: el acceso al dashboard/artefacto desplegado no estuvo disponible.

## Supuestos y puntos no verificados

- Se asume que el contrato de producción sigue siendo `main` → Cloudflare Workers Builds, porque así lo declara `AGENTS.md` y el historial de PR; el despliegue efectivo no fue comprobado.
- Se asume que el número observado de 34 rutas es el baseline correcto de esta revisión; no se afirma equivalencia visual pixel a pixel.
- No se usaron credenciales de Cloudflare, Google Search Console, D1/KV reales, Turnstile real, panel de logs ni secretos.
- No se verificó Safari 16.4–17; la evidencia F4 documenta la limitación y no se sustituye por una inspección inventada.
- El uso de `SESSION` sigue sin consumidor en el código observado; antes de quitarlo o usarlo debe confirmarlo el owner de infraestructura.
- Las recomendaciones P1 son riesgos de diseño/code review evidenciados en el checkout, no una afirmación de explotación activa en producción.

## Fuentes externas consultadas

Acceso realizado el **2026-09-03**. Se usaron documentación oficial actual como fuente de las recomendaciones de plataforma; no se copiaron cambios de configuración al repositorio.

- [Astro — Upgrade to v7](https://docs.astro.build/en/guides/upgrade-to/v7/) — Vite 8, cambios de compilador, Sätteri y `compressHTML`.
- [Astro — Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) — assets, preview Workerd, bindings, sesiones, `imageService` y APIs retiradas.
- [Astro — Configuration reference](https://docs.astro.build/en/reference/configuration-reference/) — `output: static` y prerender por defecto.
- [Astro — Content Loader reference](https://docs.astro.build/en/reference/content-loader-reference/) — loaders y Content Layer.
- [Astro — `astro/zod`](https://docs.astro.build/en/reference/modules/astro-zod/) — export actual de Zod para colecciones.
- [Cloudflare — Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/) — compatibilidad, secretos, bindings, promises y observabilidad.
- [Cloudflare — Static Assets](https://developers.cloudflare.com/workers/static-assets/) — relación Worker/assets y fallback.
- [Cloudflare — Static Asset binding](https://developers.cloudflare.com/workers/static-assets/binding/) — `run_worker_first` y orden de resolución.
- [Cloudflare — Static Asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/) — Worker script y rutas.
- [Cloudflare — Static asset billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) — coste/riesgo de ejecutar Worker para assets.
- [Cloudflare — Static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/) — `_headers` sólo para respuestas de assets estáticos.
- [Cloudflare — Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) — acceso directo, contexto de request y evitar clientes globales derivados de bindings.
- [Cloudflare — Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) — `vars`, `.dev.vars`, entornos y valores no heredados.
- [Cloudflare — Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) — gestión de secretos fuera del código.
- [Cloudflare — Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) — campos heredables y configuración de bindings.
- [Cloudflare — Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/) — separación de entornos.
- [Cloudflare — Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) — logs, sampling y retención.
- [Cloudflare — Observability](https://developers.cloudflare.com/workers/observability/) — logs y traces.
- [Cloudflare — Workers testing](https://developers.cloudflare.com/workers/testing/) — estrategia de tests de Workers.
- [Cloudflare — Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) — plugin y runtime Worker.
- [Cloudflare — First Vitest test](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/) — configuración actual de `cloudflareTest`.
- [TypeScript — `strict`](https://www.typescriptlang.org/tsconfig/strict) — familia strict.
- [TypeScript — `noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html) — índices no garantizados.
- [TypeScript — `exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html) — opcionales exactos.
- [TypeScript — `useUnknownInCatchVariables`](https://www.typescriptlang.org/tsconfig/useUnknownInCatchVariables.html) — catches seguros.
- [typescript-eslint — `no-floating-promises`](https://typescript-eslint.io/rules/no-floating-promises/) — promesas no esperadas.
- [typescript-eslint — `strict-boolean-expressions`](https://typescript-eslint.io/rules/strict-boolean-expressions/) — booleanos implícitos.
- [typescript-eslint — typed linting](https://typescript-eslint.io/getting-started/typed-linting/) — linting con tipos.
- [ESLint — configure](https://eslint.org/docs/latest/use/configure/) — configuración flat actual.
- [ESLint — language options](https://eslint.org/docs/latest/use/configure/language-options) — globals/parser por runtime.
- [Vitest — guide](https://vitest.dev/guide/) — estructura general de pruebas.

## Evidencia del repositorio consultada

- `AGENTS.md` y `docs/migracion-stack/README.md`.
- Specs y evidencias F0–F4: `docs/migracion-stack/fase-*.md`.
- `docs/migracion-stack/postmortem-astro-4-a-7.md` completo; se comprobó además que sus referencias al estado actual quedaron parcialmente obsoletas tras PR #40.
- PR #38, [Promote Astro 7 migration to production](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/38), merge `00ca256`, 2026-09-03.
- PR #39, [chore: close Content Layer and postbuild maintenance](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/39), merge `38bdb33`, 2026-09-03.
- `git fetch --all --prune`, `git worktree`, `git log --graph`, `git diff --name-only`, checks de esta misma revisión y el dry-run local de Wrangler.

Este archivo es deliberadamente un estudio. No contiene correcciones de código ni cambios de configuración.
