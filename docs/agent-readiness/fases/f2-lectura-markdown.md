# F2 — Lectura íntegra y negociación Markdown

**Estado: especificada; auditoría de SDD pendiente.** Arquitecto: coordinador. Implementadores: sesiones distintas de **Luna 6, razonamiento alto**. Auditor independiente del autor. F2 se entrega en **F2A → F2B**, sin ejecución simultánea; cada issue tiene su contador de hasta cinco auditorías. Ninguna entrega parcial equivale a F2 publicada.

## 1. Problema, resultado y base

F1 publicada permite descubrimiento, pero `Accept: text/markdown` todavía devuelve HTML. F2 proporciona una edición mecánica completa del HTML editorial construido, con enlaces, fuentes, FAQ y avisos, sin una segunda redacción. El resultado observable es leer cada documento tanto en su URL Markdown explícita como en su URL canónica, sin afectar la representación HTML.

Base de producto: **`28bd92ecd424ff11b31e13e4a2ba499cb196a870`**, tree `f4a7ceb2f067844dd0ea5ba9ccd4cc0763e65082`, `main` publicado y F1 verificada: 71 contenido / 33 general, nivel 2. El objetivo estimado tras publicar F2 completa es 86 / 40, nivel 3; no sustituye pruebas funcionales ni garantiza nivel. [Plan](../plan.md), [método SDD](../sdd.md), [D01–D05 F0](../evidencia/f0/cierre-arquitectonico.md) y [contratos F2](f2-contratos.md) son lecturas obligatorias.

F2A parte del **SHA público completo de esta SDD auditada**, fijado en su issue: debe descender de la base anterior y diferir solo en documentación del programa. Destino `docs/agent-readiness-f2`; trabajo `agent-ready/f2a-proyeccion`. F2B queda bloqueada hasta PASS de F2A; su issue recibirá el SHA público aceptado de F2A más cierre documental, con tree comprobado y sin cambios ajenos. Destino `agent-ready/f2a-proyeccion`; trabajo `agent-ready/f2b-negociacion`. No resolver bases móviles, usar la antigua rama de migración ni arrancar F2B sobre la base de F2A sin su implementación.

Leer AGENTS.md, postmortem de la migración Astro 4→7, `docs/asistente-ia/FILE-OWNERSHIP.md` y skill oficial Wrangler suministrada por el coordinador antes de modificar configuración. La migración terminó; no actualizar stack. Conservar Astro 7.2.10, adapter 14.2.6, Wrangler 4.128.0, parse5 7.3.0 y lock actuales; sin dependencias nuevas.

## 2. Decisiones y alcance

Ratificación complementaria [D06–D10](../evidencia/f2/decisiones.md):

- Proyección en `astro:build:done`, inmediatamente después de integración F1 y sitemap; salida en `config.build.client`. Ejecutable en el build real `npx --no-install astro build`, sin postbuild ni red.
- Corpus derivado del inventario F1: hoy 28 documentos, **1 home + 7 pilares (6 de salud y herramientas) + 16 artículos + 2 herramientas + 2 editoriales**. No fijar 28 como gate. Hasta 98 documentos en v1 por límite de 100 reglas Worker-first, reservando dos reglas API/admin. Crecimiento concordante 29 pasa; 99 falla explícitamente. No truncar ni comprimir reglas con glob generales para evadir el límite.
- Índice y Markdown precompilados en paths públicos versionados. Runtime lee índice mediante ASSETS, nunca import estático del artefacto producido después del bundle.
- Documentos canónicos GET/HEAD: servir HTML o Markdown mediante **ASSETS.fetch(Request)**. Esta precisión sustituye la delegación documental del spike D01: el handler actual sirve estáticos con URL y pierde método/condicionales. El handler Astro permanece como delegado para el resto.
- Respuestas negociadas: `Vary: Accept` y `Cache-Control: private, no-store`; sin Cache API propia ni paso por middleware de caché para documentos. ASSETS mantiene su almacenamiento interno por paths de representación distintos. Esta política se prueba en preview y producción; no declarar HIT/MISS o purga de CDN no observados.

F2A publica artifacts en preview, conserva home HTML aunque reciba Accept Markdown y no anuncia negociación. F2B añade entrypoint/routing y negociación. No cambiar MDX/páginas/layout/JSON-LD, metadatos editoriales, enlaces internos, metodología o scripts de calculadoras, Assistant/SDI, robots/llms de F1, redirects, DNS, APIs/skills/MCP/auth/ARD ni selección/fórmula del evaluador. No `llms-full.txt`, URLs espejo ni contenido generado por modelos.

## 3. Ownership exclusivo y secuencial

El coordinador reserva los archivos compartidos para la sesión de plataforma de la subfase activa; Assistant V2 y migración no los modifican a la vez.

| Subfase | Archivos propios | Cambios permitidos |
|---|---|---|
| A | `scripts/agent-readiness/projection.mjs`, `projection-dom.mjs` | Integración, serializador, perfiles, schema/check offline. |
| A | `astro.config.mjs` | Importar y añadir integración de proyección después de F1; nada más. Astro inserta el adapter primero: orden efectivo adapter → sitemap → F1 → proyección. |
| A | `public/_headers` | MIME específico de índice y `.md`; mantener seguridad, Link y reglas de caché previas. |
| A | `.github/workflows/ci.yml` | Test node de proyección y check offline después de build; preservar checks anteriores. |
| A | `tests/agent-readiness/projection.test.mjs`, `fixtures/f2/` | Goldens reales, perfiles negativos y crecimiento. No editar goldens históricos F0. |
| A | `docs/agent-readiness/evidencia/f2/a/` | Entrega, hashes, pruebas, previews, auditorías. |
| B | `src/worker.ts`, `src/lib/agent-content/` | Wrapper del handler, parser Accept, lector de índice y respuesta documental. |
| B | `wrangler.jsonc` | Solo `main: "./src/worker.ts"`; conservar bindings, flags y reglas fuente API/admin. |
| B | `scripts/agent-readiness/projection.mjs` | Generar reglas exactas en config compilada, verificación de empaquetado; preservar contrato A. |
| B | `tests/agent-readiness/negotiation.test.ts`, `routing.test.mjs` | Matriz HTTP, validación host/índice, routing empaquetado y regresiones. |
| B | `.github/workflows/ci.yml` | Tests de negociación y check offline de routing compilado. |
| B | `worker-configuration.d.ts` | Solo regeneración con comando vigente si entrypoint requiere actualización; no editar a mano. |
| B | `docs/agent-readiness/evidencia/f2/b/` | Entrega, configuración workerd sanitizada, HTTP público, auditorías. |

No modificar `src/middleware.ts`: los documentales ya se resuelven antes de Astro; el resto conserva comportamiento. No editar inventario F1, package/lock, tipos ajenos ni skill local. Si el contrato exige otro archivo o el generador no puede cumplir con este orden en el stack fijado, abrir bug de SDD y parar; no reconfigurar el framework.

## 4. Implementación F2A

`projectionIntegration()` conserva resolved config en `astro:config:done`. En `astro:build:done`, ejecutar inventario vigente sobre el build, exigir `state=valid`, verificar todas las entradas `disposition=document`, seleccionar DOM con parse5 y generar los artefactos de [contratos](f2-contratos.md). Procesar DOM construido, no MDX ni extractos Assistant. Fixtures permanentes F0 son regresiones adicionales; siete muestras no sustituyen el corpus actual.

Construir todo en memoria/directorio temporal antes de publicar en `assetRoot/agent-content/v1`. Ninguna salida parcial es desplegable si hay error. Destino preexistente, huérfano, falta/duplicación, límite excedido o cardinalidad de selector incorrecta falla build con documentId/código/motivo sin datos de visitante. No sobrescribir silenciosamente `public/agent-content`. El check exige exactamente índice y un `.md` por documento, sin `.env`, fuentes de repo, manifiestos privados, resultados de tests ni otros archivos.

Serialización determinista: UTF-8 sin BOM, LF, un newline final; orden ASCII, sin hora de build, sourceCommit o IDs de infraestructura. Dos builds limpios del mismo checkout producen los mismos bytes del índice y Markdown. El hash de HTML se calcula sobre los bytes construidos; si Astro produjera HTML no determinista y afectara índice, reproducir y abrir bug antes de atribuir determinismo falso.

CLI obligatorio: `node scripts/agent-readiness/projection.mjs check --build-dir dist`. Solo lectura, verifica inventario, índice/schema/allowlist, hashes/bytes, correspondencia exacta y reconstrucción idéntica. Exit 0=PASS, 1=contrato incumplido, 3=uso/IO/entorno; nunca reparaciones con `check`. CI llama después del build. Tests: `node --test tests/agent-readiness/projection.test.mjs`. Usar exports puros para fixtures; no introducir comandos que consulten red.

La evidencia de extracción previa está en [inventario editorial](../evidencia/f2/inventario-editorial.md), cuyo JSON conserva 34 HTML y cada H1/hash. Sus cifras son baseline, no constantes futuras. Validar profiles actuales y 29 documentos concordantes sin editar código; una nueva plantilla/tag semántico sin regla no autoriza fallback genérico.

## 5. Implementación F2B

Entry point exporta handler `fetch` compatible con Worker. Importar `handle as astroHandler` desde `@astrojs/cloudflare/handler` y llamar con request/env/ctx intactos para las rutas delegadas. Nada de API de adapter obsoleta. Evitar index lookup en `/api/`, `/admin/` y métodos distintos de GET/HEAD, que delegan directamente. Assets no documentales continúan assets-first y no pasan por este wrapper.

Para GET/HEAD de rutas Worker-first restantes, cargar índice estricto con Request interno a `/agent-content/v1/index.json` en origin del request (funciona en commit preview y dominio canónico). Solo ASSETS, sin fetch global, cookies, auth, Accept de visitante, query, condicionales, Range o redirects externos. Exigir 200, tamaño máximo, JSON válido y schema/allowlist completa antes de usarlo. Guardar únicamente índice válido y mapas de metadatos en WeakMap por binding ASSETS/isolate; coalescer solicitudes concurrentes. Fallo no se memoriza permanentemente; devolver 503 no-store sin contenido parcial ni revelar excepciones. No index fijo/import circular, caché de responses o claves de visitante.

Match exacto de `URL.pathname` contra canonicalPath validado, query ignorada. No decodeURIComponent, paths aproximados, basename, transformaciones de slash o lookup arbitrario del cliente. Si no existe match delegar al handler, manteniendo redirect/404; no negociar la página de error. Seleccionar variante con Accept según contrato; 400/406 no-store con HEAD vacío. Request interno de representación usa mismo origin y **path ya validado del índice**, GET/HEAD según petición, solo `If-None-Match` permitido. No transferir If-Modified-Since/If-Range/Range: v1 ignora esos condicionales y devuelve representación completa si no hay ETag coincidente. No enviar credenciales; no convertir Request del visitante directamente a un asset.

ASSETS devuelve body/status/ETag para la representación elegida. Encabezados de cuerpo pertenecen a esa representación: no copiar Content-Length/Content-Encoding de HTML al Markdown, ni alterar bytes bajo un ETag viejo. Preservar headers del asset elegido excepto reglas normativas que se reemplazan, eliminar Accept-Ranges/Last-Modified (no se ofrecen condicionales por fecha/rangos en negociación v1) y cualquier X-Edge-Cache; Content-Length si existe debe coincidir con el método/asset elegido. Nunca borrar Content-Encoding dejando body comprimido. Permitir compresión de plataforma; hashes se contrastan sobre bytes de entidad decodificados y Accept-Encoding se añade a Vary si ya lo requería respuesta. No implantar compresión propia.

Exigir 200 o 304 (HEAD también); missing asset/index inválido/status inesperado para un documento conocido devuelve 503 no-store, sin fallback HTML que esconda un Markdown roto. Un 304 no tiene body; conservar ETag/Vary/política/Link/seguridad. `If-None-Match` evalúa **solo asset seleccionado**, matching débil para GET/HEAD, lista y `*`; cruzar ETag HTML a MD y viceversa produce 200. La implementación puede aprovechar la evaluación nativa ASSETS demostrada por el probe, sin reimplementar parser de ETag; la matriz completa es obligatoria.

Generar `assets.run_worker_first` en **config compilada `dist/server/wrangler.json`** durante hook final: `/api/*`, `/admin/*`, seguido de canonicalPaths documentales únicos en orden ASCII. Lista exacta, sin `true`, otras reglas o prefijos amplios; preservar todos los demás campos producidos por adapter, incluso directorio relativo de assets. Validar límite total≤100 y gramática/longitud con Wrangler fijado. Si el adapter vuelve a escribir la configuración después, check/dry-run deben detectarlo: es bloqueo. No editar archivos construidos a mano después del build.

Check CLI adicional en B: `node scripts/agent-readiness/projection.mjs check-routing --build-dir dist`, códigos 0/1/3 anteriores. Contrasta config compilada con índice y presencia del bundle del entrypoint propio. Test negativo retira una ruta/cambia `true`/añade glob y debe fallar. Source `wrangler.jsonc` mantiene reglas API/admin; el dry-run usa **config compilada**, no source con solo dos rutas. Guardar resumen y hashes, no bundle entero ni secretos.

## 6. Preview, evidencia y seguridad de las pruebas

Instalar lock en worktree propio. Checks vigentes: `npm run check`, `npm test`, node tests agent-readiness existentes/nuevos, build, inventory, discovery, projection, tipos Worker y Wrangler dry-run según CI. En B cambiar el paso de empaquetado a `npx --no-install wrangler deploy --config dist/server/wrangler.json --dry-run --outdir=/tmp/wrangler-dry-run`: no basta validar el source que omite las rutas documentales. Sin upgrade o login. Workerd con Wrangler del lock y una copia de config compilada: retirar AI/email/D1/rate limits y bindings remotos; mantener ASSETS y SESSION local solo si handler lo necesita. No cambiar configuración de producto para aislar tests. Guardar diff de nombres/campos, sin IDs/tokens. AI es remoto incluso en modos locales; no invocarlo. Probar `/api/geo` solo en este entorno aislado para verificar delegación de una API real.

Abrir PR draft activa Workers Builds existente. Obtener **Commit Preview URL** del comentario oficial `cloudflare-workers-and-pages[bot]` del propio PR, vinculado al mismo HEAD y check exitoso. Guardar permalink, HEAD completo, check y URL exacta; el alias Branch Preview es móvil y no sirve como evidencia final. No fabricar URL desde workerName/versionId ni adoptar URLs de otro PR. Si faltan versión pública/receipt/check, o la URL no corresponde al SHA, bug de entorno/SDD y STOP.

Las Version URLs existentes funcionan con Wrangler 4.128: no habilitar el nuevo producto Workers Previews que exige upgrade. Comparten bindings con producción, por lo que allí solo hacer GET/HEAD **de rutas documentales del índice, índice y `.md` explícitos**, redirects/404 puramente estáticos de la matriz. No navegar con JS, llamar APIs/admin/contacto/asistente/calculadoras, hacer POST ni ejecutar herramientas generativas. Preservar proxies/CA del entorno. No solicitar tokens pegados ni inventar credenciales.

Las pruebas públicas se hacen después de congelar el candidato y CI/Workers éxito. Cada registro incluye request, URL, HEAD, timestamp, status, headers relevantes, hash de body decodificado/bytes y resultado; guardar archivo crudo y manifiesto SHA256. HEAD se prueba con método HEAD real, no GET descartando body. Un fallo de ensayo local por permisos del sandbox no se clasifica como caída del evaluador.

Version URL prueba runtime/plataforma pero no reglas de zona de producción. Los gates de producción de §8 siguen pendientes hasta promoción autorizada; nunca reportar que preview comprobó WAF/CDN del dominio. No ejecutar evaluator live en preview ni repetir scans buscando score.

## 7. Aceptación independiente por issue

| ID | F2A: resultado obligatorio | Evidencia |
|---|---|---|
| A01 | Diff solo ownership, base auditada exacta; HTML/editorial/JSON-LD/redirects/F1 sin cambios | git diff, hashes baseline y build nuevo. |
| A02 | Integración real después de sitemap/F1; artefactos completos antes de empaquetar | `npx astro build`, compiled paths, dry-run y CI del mismo HEAD. |
| A03 | Índice closed schema, IDs/paths únicos, hashes exactos, 28 baseline y crecimiento29 | check offline, tests válidos/negativos; sin fijar 28. |
| A04 | Selección/paridad de todo corpus y golden F0/F2: H1, headings, prosa, listas/tablas, autor/fechas visibles, avisos, FAQ completas, URLs profundas e imágenes/captions | Tabla 28/28 con verificación de cada bloque; auditor inspecciona goldens esperados antes de aprobar. |
| A05 | Ningún placeholder/estado calculado/UI/form/ads/script; advertencia condicional explícita y límites intactos | Negativas herramientas, fuente/DOM y muestras Markdown. |
| A06 | Determinismo dos builds; ausencia/duplicación/cardinalidad/límites/huérfanos fallan sin artefacto entregable | hashes y pruebas de mutación, no edición de source editorial. |
| A07 | Recursos explícitos GET/HEAD index+28 MD, MIME/seguridad/Link/bytes correctos | workerd y commit preview público fijo; HEAD vacío. |
| A08 | Checks CI vigentes más proyección PASS; ninguna negociación anunciada/activa en A | CI; home Accept MD sigue HTML; entrega completa y rollback. |

| ID | F2B: resultado obligatorio | Evidencia |
|---|---|---|
| B01 | Base F2A aceptada, ownership; HTML y Markdown conservan sus bytes | diff, comparación artefactos; ninguna edición editorial. |
| B02 | Entry propio + config compilada exacta, ≤100 reglas; adapter/bindings intactos | check-routing, Wrangler dry-run compilado, CI. |
| B03 | Las 28 canónicas baseline (y crecimiento) GET/HEAD HTML/MD tienen status/MIME/bytes correctos | workerd + commit preview público del HEAD auditado, recorrido completo. |
| B04 | Matriz Accept de contratos completa, errores locales a documentos; query misma identidad | tests parser, HTTP real con ejemplos del contrato. |
| B05 | Validadores separados: mismos304, cruzados200, débil/lista/*, HEAD; Range/fecha ignorados de forma consistente | HTTP ambas variantes; headers/body. |
| B06 | HTML→MD→HTML y MD→HTML→MD repetidos dos veces en `/` y artículo Cushing; private/no-store/Vary constantes; sin Cache API documental | workerd + público; registrar headers cache observados sin inventar HIT/MISS. |
| B07 | Índice ausente/malformado/límites/duplicados/path inseguro→503; no fetch arbitrario, recursión, credenciales o fallback parcial | fixtures/mocks estrictos y workerd con artefacto corrupto local. |
| B08 | API/admin/métodos se delegan intactos; discovery-only/assets/legacy/404 sin negociación accidental | workerd aislado, `/api/geo`; matriz estática pública permitida. |
| B09 | Seguridad/Link F1 preservados en ambos200/304/HEAD/errores, sin auth ni cookies a ASSETS | inspección HTTP y tests de requests internos. |
| B10 | Checks vigentes y nuevos PASS; entrega fija con preview, configuración efectiva y limitaciones explícitas | CI/Workers del HEAD final, auditoría y rollback. |

Goldens F2 se obtienen del HTML real base: home, pilar salud, pilar herramientas, artículo Cushing (FAQ/avisos), comida casera (tablas/blockquote), salud dental (code inline), chequeo geriátrico (sin FAQ), ambas editoriales y ambas herramientas. Un mismo artículo puede cubrir dos casos, pero no suprimir uno. Guardar HTML y Markdown esperado junto con manifest de bloques/URLs y sha256; el esperado se inspecciona, **no se regenera automáticamente desde serializador como oráculo**. Checks por corpus incluyen cobertura semántica independiente del output: todos los bloques seleccionados conservan texto normalizado y URLs; conservar orden y multiplicidad, no simple substring de una palabra. Tests de pérdida de un aviso/FAQ/celda/fuente/autor deben detectar la mutación. Paridad es por contenido, no fidelidad visual.

## 8. Entrega, promoción y reversión

Cada sesión abre PR draft apilado con base/diff, criterios, comandos, evidencia, SHA fijo, preview exacta y rollback. Lanza auditor independiente sobre SHA fijo (no es el autor ni corrector), máximo **cinco revisiones totales por issue**. FAIL de código vuelve al implementador; FAIL5→bug y STOP, sin sexta revisión/corrección. Hueco normativo/base/entorno→bug y STOP inmediato según método SDD. Informe obligatorio con intento, SHA/tree, criterios, PASS/FAIL por bloqueantes y limitaciones. Observaciones no bloqueantes no abren ciclos. PASS permite aceptación técnica, nunca main/deploy por cuenta del programador.

La SDD F2 tiene auditoría separada por fondo/coherencia: solo bloqueantes; como máximo primera revisión y **un ciclo de corrección** del coordinador. Si no pasa segunda revisión, parar y estudiar con propietario. Publicar issues de desarrollo únicamente después de PASS y fijar sus bases completas.

F2A y F2B se integran en orden con sus cierres y auditorías preservadas. La promoción completa a main requiere autorización específica del propietario, pues despliega. Antes de pedirla: entregar commits concretos/CI/preview/PASS y plan reversible. No fusionar A sola para declarar negociación ni nivel3. Revalidar cambio concurrente de main; no integrar base ajena silenciosamente.

Gates posteriores a promoción autorizada:

- P01: Worker build del main autorizado éxito e identidad exacta; recursos/28 canónicas GET/HEAD/Accept/validadores en dominio de producción, robots/llms/sitemap previos conservados, redirecciones y404. No hacer llamadas con efectos.
- P02: ambas alternancias repetidas en dominio, cache-control privado/no-store/Vary; registrar CF-Cache-Status/Age/ETag/Content-Type observados y evidencia de ausencia de contenido cruzado. No inventar HIT/MISS. Con no-store no hay TTL exterior que esperar/purgar: documentar capas deshabilitadas y cache interna ASSETS con invalidación por nueva versión del build. Si CDN/zona sirve contenido incompatible o ignora política, falla gate y abrir bug de entorno; no prometer purga sin acceso/autorización a zona. Nunca ocultar el fallo alterando score.
- P03: un scan LIVE content y uno all-ui con perfiles/selección/fórmula congelados; conservar JSON crudo/request/metadata/manifests y comparar controles/denominadores contra F1. Caída real del evaluador→STOP global, sin retry/offline; no seguir fases ni declarar score. `deploymentCommit=null` del evaluador no se reescribe: receipt de build separado.

Rollback antes de main: cerrar/revertir la rama propia sin modificar producción. Después de main: PR de reversión **conjunto B→A** (worker/main/routing/generador/headers/checks) sobre main desplegado, revisar y obtener autorización de despliegue de reversión. Conservar política F1 y toda evidencia. Volver al entrypoint/config original de F1, no al spike/cache propia; nuevo build sin artifacts F2, sin referencias huérfanas. No borrar redirects, retocar dates ni restaurar versiones antiguas de bindings.
