# SDD F4A — Herramientas compartidas, API de cálculo y WebMCP

Estado: **implementación aceptada** (F4A-1 [PASS 1/5](../evidencia/f4a/1/cierre.md), F4A-2 [PASS 1/5](../evidencia/f4a/2/cierre.md)); **publicada en producción** en `35e2c158` el 2026-10-12 ([propuesta](../evidencia/f4a/publicacion/propuesta.md), [resultado](../evidencia/f4a/publicacion/resultado.md)); auditoría de publicación pendiente. SDD ratificada y congelada (2026-10-12) tras [PASS del ciclo 2, revisión 1/2](../evidencia/f4a/auditoria/sdd-c2-r1.md), con [ratificación](../evidencia/f4a/ratificacion-sdd.md). Historial: El ciclo 1 terminó en STOP tras R2 FAIL ([registro](../evidencia/f4a/stop-sdd/README.md), [R1](../evidencia/f4a/auditoria/sdd-r1.md), [R2](../evidencia/f4a/auditoria/sdd-r2.md)). El propietario eligió la salida (a) del auditor y autorizó un ciclo nuevo con presupuesto propio de dos revisiones del mismo auditor ([cambios del ciclo 2](../evidencia/f4a/ciclo2/README.md)). Fecha: 2026-10-12. Normativa: este documento, [contratos F4A](f4a-contratos.md), [anexo de skill](../evidencia/f4a/contratos/buscar-leer-citar.SKILL.md), [decisiones D21–D32](../evidencia/f4a/decisiones.md) y [fuentes/sondeo](../evidencia/f4a/referencias/README.md). Lo no modificado de F3 ([SDD](f3-api-y-descubrimiento.md), [contratos](f3-contratos.md)) sigue vigente. Si dos reglas F4A se contradicen: STOP de SDD; el ejecutor no elige.

## 1. Problema y resultado observable

Tras F3 un agente HTTP descubre, busca, lee y cita, pero no puede usar las dos calculadoras del sitio sin manipular su UI, y un agente en navegador no encuentra herramientas registradas (control `webMcp` en fail: «No tools registered via document.modelContext or navigator.modelContext»).

Después de F4A:

- `GET /api/agent/v1/tools/calidad-vida?...` y `GET /api/agent/v1/tools/movilidad?...` devuelven exactamente el resultado que la UI muestra para la misma entrada, descritos en OpenAPI y anunciados en API Catalog, ARD y la skill.
- Al cargar cualquier página pública en un navegador con WebMCP, quedan registradas `search_guides`, `read_guide`, `evaluate_quality_of_life` y `recommend_mobility_aids`; un cliente externo las invoca y obtiene resultados iguales a API/UI, con cancelación y errores definidos.
- En navegadores sin WebMCP el sitio funciona como antes, sin errores ni peticiones nuevas.

Control objetivo: `webMcp`. Previsión 67/100 general (10/15) **no es criterio de aceptación**: la aceptación exige el registro y las llamadas reales.

## 2. Base y autoridad

| Concepto | Valor |
|---|---|
| Base de esta SDD | `eff4ce13a1f4b996f3d9b523799012bc668da318`, tree `d46f6baf5e4a6eb0bcbc001882488e5944c52513` (rama `agent-ready/f3-c`) |
| Producto publicado / main | `aad2a6624c24d7425c5ad5329b82c77a8a86b619`; `main` no avanzó al redactar. `eff4ce1` = main + sólo `docs/agent-readiness/**` |
| Aceptación vigente F3 | [resultado](../evidencia/f3/publicacion/cierre/resultado.md) y [ratificación](../evidencia/f3/publicacion/cierre/cierre-arquitectonico.md): 86 contenido / 60 general, nivel 4 |
| Rama de SDD | `agent-ready/f4a-sdd` |
| Build base (oráculo) | `npx --no-install astro build` de la base: `corpusSha256` `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`, 28 documentos, `tool--calidad-vida.md` `00028fb4…6705db5`, `tool--movilidad.md` `bbde905e…7190bd37`, `query-index.json` `fbb2dda2…4b2323` |

Si `main` avanza antes de un issue o de la promoción, se revisa su diff y los gates afectados antes de continuar; no se incorpora en silencio ni se impone una base histórica. Cada evidencia se vincula al build del SHA que la produce: los commits documentales pueden alterar CSS/HTML (Tailwind), así que nunca se copian hashes de otro build.

## 3. Alcance y exclusiones

Entrega: módulo de lógica compartida de las dos herramientas; adaptación de sus páginas para consumirlo sin cambiar UI ni metodología; dos endpoints de cálculo en el Worker F3; evolución aditiva de schema/OpenAPI/registro/API Catalog/ARD/skill/llms; registro WebMCP imperativo; pruebas y evidencia.

Invariantes: corpus F2 y sus 28 Markdown **byteidénticos** a la base (`corpusSha256` igual; `htmlSha256` puede cambiar por el nuevo `<script>`); fórmulas, umbrales, textos y opciones de la UI iguales; contratos F3 de catálogo/búsqueda/lectura sin cambios de comportamiento; Link, robots, Content Signals, sitemap, `_headers`, middleware, `wrangler.jsonc`, `astro.config.mjs`, package/lock y asistente sin cambios. Política `search=yes, ai-input=yes, ai-train=no`.

Fuera de alcance: MCP remoto y server card (F4B), DNS (F5), auth/OAuth (F6), comercio y enlaces de afiliado, token de origin trial, API declarativa WebMCP, widget de edad de la home, asistente generativo, cuotas globales, cambio de stack.

## 4. Diseño cerrado

1. **Lógica compartida** `src/lib/agent-tools/`: `calidad-vida.ts`, `movilidad.ts`, `movilidad-afiliados.ts` (sólo URLs de afiliado, importado sólo por la página del selector) y `contract.ts`, TypeScript sin dependencias ni acceso a DOM/red. Exportan los datos legados exactos (criterios, opciones, `RES` sin URLs, textos de franja, alerta), funciones puras `evaluateQualityOfLife(input)` y `recommendMobilityAids(input)` que devuelven los objetos 200 de contratos §2, validadores de entrada estructurada comunes a API y WebMCP, y `ToolInfo`.
2. **UI**: en cada página de herramienta sólo se sustituye el `<script is:inline>` por un `<script>` procesado por Astro que importa el módulo compartido; navegación, DOM, clases, animaciones, copiar/WhatsApp/ICS/imprimir y `SHOW_AFFILIATE_LINKS=false` permanecen en la página. El cálculo de puntaje/franja/textos y la elección de resultado salen del módulo. El marcado estático no cambia.
3. **API**: `src/lib/agent-api/runtime.ts` añade las dos rutas con la precedencia F3. El parser de query se generaliza dentro de `src/lib/agent-api/` para servir a F3 y F4A con las mismas reglas; ninguna regla F3 cambia.
4. **Contratos y descubrimiento**: se editan las fuentes de producto `src/agent-api/{schema.json,openapi.template.json,capabilities.json}` y `src/agent-skills/buscar-leer-citar/SKILL.md`; `scripts/agent-readiness/agent-api.mjs` valida el nuevo conjunto exacto y genera los descriptores; `scripts/agent-readiness/discovery.mjs` cambia sólo la línea OpenAPI de la sección F3 de llms.
5. **WebMCP**: `src/scripts/agent-tools.ts` implementa contratos §5; `src/layouts/BaseLayout.astro` añade un único `<script>` que lo importa. Sin polyfill: sin API no hay efectos.

## 5. Issues, ownership, dependencias y orden

Se implementan **dos issues secuenciales** en la misma sesión autora, autorizada por el propietario para implementar directamente. Cada issue tiene su auditor independiente fijo (≤5 revisiones totales). No hay solapamiento: F4A-2 parte del cierre exacto de F4A-1.

| Issue | Base / rama / PR draft | Propiedad exclusiva | No toca |
|---|---|---|---|
| **F4A-1** Lógica compartida, API de cálculo y contratos | SHA ratificado de esta SDD → `agent-ready/f4a-1` → draft contra `agent-ready/f4a-sdd` | `src/lib/agent-tools/**`; `src/lib/agent-api/**`; en `src/pages/herramientas/*.astro` sólo el bloque de script; `src/agent-api/**`; `src/agent-skills/buscar-leer-citar/SKILL.md`; `scripts/agent-readiness/agent-api.mjs`; en `discovery.mjs` sólo la constante de sección F3; `scripts/agent-readiness/cdp.mjs` (cliente CDP mínimo con WebSocket nativo de Node, reutilizable por F4A-2 sin modificarlo) y `scripts/agent-readiness/tools-ui-parity.mjs` (harness C4A-04); `tests/agent-readiness/f4a-*.test.*` y `fixtures/f4a/`; en tests F3 sólo las expectativas listadas en §6.3; `.github/workflows/ci.yml` (pasos F4A); `evidencia/f4a/1/` | layout, WebMCP, F2, routing, config |
| **F4A-2** Registro WebMCP y verificación en navegador | cierre exacto F4A-1 → `agent-ready/f4a-2` → draft contra `agent-ready/f4a-1` | `src/scripts/agent-tools.ts`; una línea `<script>` en `src/layouts/BaseLayout.astro`; `scripts/agent-readiness/webmcp-browser.mjs` (harness CDP sin dependencias nuevas); `tests/agent-readiness/f4a-webmcp.test.ts`; paso CI de ese test; `evidencia/f4a/2/` y `evidencia/f4a/publicacion/` | lógica/API/contratos de F4A-1 salvo bug aceptado |

Documentación de estado (`plan.md`, README del programa, esta cabecera) la mantiene el coordinador. Un cambio fuera de ownership → bug de SDD y STOP del trabajo dependiente.

## 6. Aceptación y validación

### 6.1 Criterios

| ID | Resultado exigido | Nivel / evidencia |
|---|---|---|
| C4A-01 | SDD PASS ≤2 revisiones mismo auditor, ratificada y congelada en SHA/tree | Documental antes de programar |
| C4A-02 | Datos compartidos = literales legados de la base (CRITERIA, OPT1/OPT2, RES con URLs, textos de franja) por comparación profunda contra los bytes de la base; alerta y ToolInfo = HTML/JSON-LD construido | F4A-1 offline, oráculo independiente de la implementación |
| C4A-03 | Paridad de cálculo: dominio **completo** calidad-vida (11⁷ combinaciones) comparando `score` y `band` contra oráculo «suma y umbrales 50/35»; cuerpos 200 completos contra fixtures en umbrales 34/35/49/50, 0, 70, los dos ejemplos normativos y las 6 combinaciones de movilidad | F4A-1 unitario |
| C4A-04 | Paridad UI↔API: en navegador (cualquiera, sin WebMCP) se completa la UI real por clics para un conjunto fijo (umbrales, extremos, 20 vectores con semilla fija, 6 combinaciones de movilidad) y el `textContent` visible coincide campo a campo con la respuesta API del mismo build (alerta paliativa mediante `alertItemText` de contratos §1.2; espacios colapsados en todos los campos). Harness `scripts/agent-readiness/tools-ui-parity.mjs` (no es `*.test.*`, no corre en CI), Chrome indicado por argumento, salida en `evidencia/f4a/1/` | F4A-1 local workerd del build |
| C4A-05 | API: valores normales/extremos/umbrales, todos los inválidos de contratos §2, keys faltantes/extra/duplicadas, percent/UTF-8 inválido, >2048, `%` en path, rutas desconocidas, 405/HEAD/OPTIONS, headers exactos, sin acceso a ASSETS | F4A-1 unitario + workerd |
| C4A-06 | OpenAPI/schema/registro/Linkset/ARD/skill/llms válidos y exactos; ejemplos 200 validan contra schema; digest skill real; sólo capacidades implementadas | F4A-1 offline + build |
| C4A-07 | Invariantes: Markdown y `corpusSha256` F2 idénticos a la base; F3 runtime/contratos/discovery/negociación y CI existentes pasan; respuestas F3 de catálogo/búsqueda/lectura sin cambios | F4A-1/F4A-2 build + CI |
| C4A-08 | Registro real: Chrome 155 + `WebMCPTesting` carga home, una guía, una herramienta y una página editorial; el anexo de `inputSchema` es ASCII puro (check offline en F4A-2) y `WebMCP.toolsAdded` del cliente CDP entrega exactamente las cuatro tools con `name`, `description`, `inputSchema` (igualdad profunda con el anexo) y `annotations.readOnly:true`; `getTools()` en la página también devuelve los cuatro `inputSchema` con igualdad profunda; `title` (que el dominio CDP no expone) se verifica con `Runtime.evaluate` de `document.modelContext.getTools()` en el mismo frame | F4A-2 local workerd y preview |
| C4A-09 | Llamadas reales vía `WebMCP.invokeTool`: búsqueda `cushing` → `read_guide` del resultado con `corpus` → JSON idéntico a la API; cálculos idénticos a la API para el conjunto de C4A-04; inválidos → cuerpo `INVALID_REQUEST` sin red; `read_guide` con ID que intenta salir del namespace no hace fetch | F4A-2 local y preview |
| C4A-10 | Cancelación: `cancelInvocation` durante una búsqueda/lectura → `Canceled` y fetch abortado; señal ya abortada vía `executeTool` → `AbortError`; transporte fallido → error; sin reintentos | F4A-2 local |
| C4A-11 | Sin soporte: Chrome 155 sin flag y Chromium 141 cargan las mismas páginas sin errores de consola atribuibles, sin peticiones a `/api/agent/v1` al cargar, y completan ambas calculadoras con resultados iguales a C4A-04 | F4A-2 local y preview |
| C4A-12 | Ausencia de efectos: HTML construido sin atributos declarativos WebMCP; ninguna tool de contacto/feedback/asistente/admin; ninguna escritura de storage/cookies **atribuible a `execute`** (medición con hosts de terceros bloqueados vía `Network.setBlockedURLs` y comparación de `document.cookie`/`localStorage`/`sessionStorage` antes y después de cada llamada) y ninguna petición durante las llamadas salvo GET same-origin a `/api/agent/v1/` | F4A-2 build + navegador |
| C4A-13 | Auditorías independientes por issue ≤5, mismo auditor; PR draft; preview del SHA final con recibo independiente | F4A-1/2 |
| C4A-14 | Publicación autorizada y gates P4A-01–03 (§7) | Producción |

### 6.2 Comandos

CI conserva todos sus pasos; los tests nuevos `tests/agent-readiness/f4a-tools.test.ts`, `f4a-runtime.test.ts` (y en F4A-2 `f4a-webmcp.test.ts`, unitario con `modelContext` simulado: prueba lógica del adaptador, **no** acredita integración) entran por el glob existente de `npm test`, y `f4a-contracts.test.mjs` por el glob existente `node --test tests/agent-readiness/*.test.mjs`; no hacen falta pasos nuevos salvo que el autor quiera nombrarlos por separado. Ningún archivo `*.test.*` requiere navegador ni build. Checks locales del autor por issue: `astro sync`, `astro check`, `npm test`, suites offline existentes y nuevas, `npx --no-install astro build`, checks post-build del CI, `wrangler types` sin diff y dry-run. Verificación de runtime en workerd con la configuración compilada del mismo build (`dist/server/wrangler.json`, sólo bindings locales, sin mutaciones). No se repiten matrices F2/F3 históricas: los tests existentes sirven de regresión y la paridad F3 se comprueba con las lecturas/búsquedas que usan las tools.

Harness de navegador (`scripts/agent-readiness/webmcp-browser.mjs`, F4A-2, usa `cdp.mjs` de F4A-1): lanza un binario de Chrome indicado por argumento con perfil temporal, habla CDP por WebSocket nativo de Node, usa el dominio `WebMCP` para listar/invocar/cancelar y `Runtime`/`Network` para comprobar DOM y peticiones; recibe la URL base (workerd local o preview) y escribe un JSON de resultados con SHA del commit, URL, versiones de navegador y hashes. Sin dependencias npm nuevas. Chrome for Testing se descarga a un directorio temporal con SHA-256 registrado, fuera del repo.

### 6.3 Tests F3 que evolucionan

Sólo estas expectativas cambian, a los valores de contratos F4A: en `f3-contracts.test.mjs` versión OpenAPI, lista de paths/operationIds, items del Linkset y entrada API de ARD; en `f3-discovery.test.mjs` la línea OpenAPI de la sección llms; en `f3-generation.test.mjs`/`f3-runtime.test.ts` sólo aserciones que fijen el número de operaciones o la versión, si las hay. Prohibido borrar tests o aflojar el resto de sus aserciones.

## 7. Gates, evidencia, publicación y rollback

**Local** (por issue): §6.2 completo, exit codes y manifest SHA-256/bytes de artefactos F4A del build del SHA entregado. **Preview** (F4A-2, condición de aceptación de fase): push de la rama → versión preview de Cloudflare Workers Builds del SHA final con recibo independiente (comentario del bot o registro equivalente con SHA visible); sobre esa URL se ejecutan el harness (C4A-08–11) y la matriz HTTP de cálculo/descriptores. Sin preview o recibo: bug y STOP del gate; localhost no la sustituye.

**Promoción**: tras aceptar F4A-2, el coordinador propone la promoción concreta (SHA/tree, diff contra `main`, CI, recibo, rollback) y solicita autorización del propietario si no está vigente para esta entrega; sin ella no hay merge. Si `main` avanzó, se revisa el diff y se repiten los gates afectados.

- **P4A-01** HTTP producción: identidad del build promovido; endpoints de cálculo GET/HEAD/OPTIONS/errores y paridad con fixtures; OpenAPI/Linkset/ARD/skill (digest)/llms del build; recorrido F3 `cushing`→lectura; headers y política F1 intactos. Fallo de transporte o redirect inesperado → FAIL/STOP con captura, sin retry que borre el fallo.
- **P4A-02** Navegador producción: home con Chrome 155 + flag registra las cuatro tools (mismo método que C4A-08, `title` vía `getTools()`); llamadas reales search→read y cálculos; navegador sin soporte funcional.
- **P4A-03** Exactamente un scan content y uno all-ui con CLI/perfiles/selección/fórmula F3 congelados (harness F0, `request.json` de F3), comparados con el cierre F3. `webMcp` debe pasar con las llamadas de P4A-02 funcionando; reportar diferencias de controles/denominadores. Caída o error del evaluador → STOP sin retries ni puntuación simulada. `webMcp` en fail con la integración real funcionando → bug (posible navegador del evaluador sin API/origin trial) y STOP; no polyfill.

Evidencia autor en `evidencia/f4a/{1,2,publicacion}/`; informes de auditor en `evidencia/f4a/auditoria/`. Originales completos (raw del evaluador, capturas con headers/IDs) se conservan privados con índice SHA-256; se publican proyecciones curadas y manifests, como en F3.

**Rollback**: antes de main, descartar ramas. Después de main, PR de reversión **F4A-2 → F4A-1** sobre el main publicado, con autorización: retirar registro WebMCP (los cálculos de la UI siguen) y después endpoints, contratos y extracción junto con sus adaptadores UI (restaurando los scripts legados), dejando un único algoritmo en cada estado. Conservar evidencia e historial. Build nuevo y verificación de que F3 y las calculadoras siguen funcionando.

## 8. STOP, auditorías y modelos

Auditor de SDD: sesión independiente distinta del autor, máximo dos revisiones totales del mismo auditor, sólo bloqueantes; segunda FAIL → STOP. Auditor de implementación por issue: independiente del autor/corrector, mismo auditor por issue, ≤5 revisiones totales; quinta FAIL → bug asociado a la SDD y STOP sin sexta. Hueco esencial de contrato, datos, base o entorno → `[SDD bug] F4A: <bloqueo>` y STOP del trabajo dependiente; no se debilitan comprobaciones.

Modelos: el encargo pide GPT-6.1 Sol/high para autoría y auditorías y Luna 6/low para tareas mecánicas. En esta plataforma `gpt-6.1-sol` **no está disponible** (la sesión de prueba hizo fallback automático por `model_not_found` y se archivó sin trabajo) y no hay MCP, conector, credencial ni CLI de OpenAI. El propietario autorizó el 2026-10-12 homologar a modelos disponibles:

| Rol pedido | Homologación vigente F4A |
|---|---|
| Autor/coordinador Sol/high | `claude-opus-5-5`, esfuerzo high (esta sesión) |
| Auditores independientes Sol/high (SDD y cada issue) | `claude-opus-5-5`, esfuerzo high, cada uno en sesión propia distinta del autor; modelo servido verificado en la sesión antes de encargar |
| Tareas mecánicas Luna 6/low | `claude-haiku-5-5`, esfuerzo low, sólo si aportan valor |

Cada informe registra el modelo configurado y servido. Un fallback de modelo en una sesión auditora invalida esa revisión como homologada y se informa; no se sustituye en silencio.
