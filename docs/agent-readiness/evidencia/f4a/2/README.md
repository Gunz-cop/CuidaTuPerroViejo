# F4A-2 — Entrega del autor

Issue [#82](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/82), PR draft [#84](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/84) (`agent-ready/f4a-2` → `agent-ready/f4a-1`). Base: cierre de F4A-1 `ee00fd8ca463a540425eff2c91b687635bbd7b48`. **Código entregado: `35e2c1583f197cb0f5e7a878a5227f39897740b7`**, tree `936781880833a8df156cff6b2298427e6d2e5543`. El commit que añade esta carpeta es sólo documentación. Autor: sesión coordinadora `claude-opus-5-5`/high (homologado de Sol/high). No hay `main`, producción ni llamadas con efectos.

## Qué se entrega

- `src/scripts/agent-tools.ts`: registra al cargar las cuatro tools de contratos §5.2 con `document.modelContext.registerTool(tool, { signal })`. Usa `navigator.modelContext` sólo si existe y es nativo. Las cuatro llevan `readOnlyHint` y comparten una única señal; si un registro falla, se aborta todo (nunca queda un conjunto parcial). `inputSchema` es el anexo ASCII literal. Búsqueda y lectura hacen un GET same-origin a la API F3 (`credentials:"omit"`, `cache:"no-store"`, `redirect:"error"`), y los errores contractuales de la API pasan sin modificar. Los cálculos llaman a las funciones de F4A-1 sin red. Una entrada inválida devuelve `INVALID_REQUEST` sin red. La cancelación sigue a la señal de `execute`. Sin API no se hace nada.
- `src/layouts/BaseLayout.astro`: una línea `<script>import '../scripts/agent-tools.ts';</script>`. Cubre todas las páginas públicas; el admin no usa este layout.
- `scripts/agent-readiness/webmcp-browser.mjs`: harness con cliente CDP externo (`WebMCP.enable`/`toolsAdded`/`invokeTool`/`cancelInvocation`/`toolResponded`). `title` se lee con `getTools()` porque CDP no lo expone. Bloquea terceros y gestiona su propio `Fetch` para retener y fallar peticiones. Usa `cdp.mjs` de F4A-1 sin modificarlo.
- `tests/agent-readiness/f4a-webmcp.test.ts`: test unitario del adaptador con un `modelContext` simulado. Prueba la lógica, no acredita integración.

## Navegadores y condición «sin soporte»

- **Con soporte:** Google Chrome for Testing 155.0.8059.39 (zip `55672d1f…ea8ea`) + `--enable-features=WebMCPTesting`.
- **Sin soporte:** el mismo Chrome 155 sin ese flag y Chromium 141.0.7390.37.
- **Field trials de prueba:** Chrome for Testing aplica por defecto la configuración de *field trials* de prueba de Chromium, que ya activa WebMCP sin el flag ([sondeo](probe-fieldtrial.out.txt), [script](probe-fieldtrial.mjs)). Para que el flag sea la única variable, Chrome 155 se lanza en ambos modos con `--disable-field-trial-config` ([wrapper](chrome155-sin-field-trials.sh)). Así la prueba es más estricta, no más débil. Además indica que la API puede aparecer en navegadores con field trials activos aunque no tengan el flag.

## Criterios

| ID | Resultado | Evidencia |
|---|---|---|
| C4A-08 | PASS | `toolsAdded` entrega exactamente las 4 tools con `description`, `inputSchema` (igualdad profunda con el anexo) y `readOnly:true`; `getTools()` da `title`, `inputSchema` y `readOnlyHint`. Probado en home, una guía (Cushing), una herramienta y una página editorial; sin peticiones a `/api/agent/v1` ni excepciones al cargar. Workerd: [81/81](webmcp-workerd-chrome155-webmcp.json). **Preview: [81/81](webmcp-preview-chrome155-webmcp.json)** |
| C4A-09 | PASS | Vía `WebMCP.invokeTool`: `search_guides {q:"cushing"}` → `read_guide` del primer resultado con `corpus`, igual a la API. Iguales a la API también 7 vectores HHHHHMM (extremos, umbrales y uno mixto) y las 6 combinaciones de movilidad. 8 entradas inválidas (incluidas `../../admin/contact-messages` y una URL externa como ID) devuelven `INVALID_REQUEST` sin red. `DOCUMENT_NOT_FOUND` y `CORPUS_CHANGED` llegan sin modificar |
| C4A-10 | PASS | `cancelInvocation` durante una lectura retenida da `Canceled`, y el fetch se aborta (`Network.loadingFailed` `net::ERR_ABORTED`). Un transporte fallido da `Error` con un solo intento (sin reintentos). `executeTool` con señal ya abortada da `AbortError`. En los unit tests, abortar antes o durante rechaza con el motivo |
| C4A-11 | PASS | Chrome 155 sin API y Chromium 141: sin `modelContext`, sin excepciones y sin peticiones a `/api/agent/v1` al cargar en las 4 páginas. Workerd: [16/16](webmcp-workerd-chrome155-sin-api.json), [16/16](webmcp-workerd-chromium141.json). Preview: [16/16](webmcp-preview-chrome155-sin-api.json), [16/16](webmcp-preview-chromium141.json). Calculadoras completadas por clics e iguales a la API, 34/34 en cada caso: [workerd 155](ui-parity-workerd-chrome155-sin-api.json), [workerd 141](ui-parity-workerd-chromium141.json), [preview 155](ui-parity-preview-chrome155-sin-api.json), [preview 141](ui-parity-preview-chromium141.json) |
| C4A-12 | PASS | El HTML no lleva atributos declarativos WebMCP. Durante las llamadas sólo hay 2 GET same-origin a `/api/agent/v1/` (búsqueda y lectura; los cálculos no usan red). Cookies, `localStorage` y `sessionStorage` quedan iguales, con terceros bloqueados. No hay tools de contacto, feedback, asistente ni admin. El bundle común no incluye URLs de afiliado |
| C4A-13 | PASS (autor) | PR draft #84. CI «Criterios de aceptación» y «Workers Builds» con success en `35e2c158`. **Recibo independiente:** comentario del bot de Cloudflare con Commit Preview URL ([recibo](recibo-preview.json)). Identidad: los 22 archivos del [manifest local](build-manifest.json) son byte-idénticos en la preview. [Matriz HTTP en preview](http-matrix-preview.json) PASS (cálculo, F3, descriptores, páginas). Queda pendiente la auditoría independiente |
| C4A-07 (regresión) | PASS | Pasan los 18 pasos del CI ([checks](checks.json)). Corpus F2, los 28 Markdown, `query-index` y CSS son idénticos a la base. Cambian `htmlSha256` de todas las páginas (por el nuevo `<script>` del layout) y aparecen chunks JS: `BaseLayout…js`, `calidad-vida…js`, `movilidad…js`, `contract…js` (~16 KB por página en total) |

## Observaciones del autor

1. **Representación de `output` en CDP.** `WebMCP.toolResponded.output` llega como string JSON en algunas respuestas de `search_guides` (títulos con tildes y sin emoji) y como objeto en el resto. Coincide con la ruta de cadenas Latin-1 de B4. El contenido es completo y la spec define `executeTool` como JSON serializado; el harness compara el valor JSON y registra el tipo recibido (entrada `info`). No es un fallo del sitio.
2. **`wrangler dev`** puede caer tras peticiones abortadas o fallidas. Es el mismo artefacto local que observó el auditor de F4A-1, y también ocurre en la base. Por eso cada ejecución local usa un workerd nuevo ([helper](with-workerd.sh)). La preview no lo presenta.
3. **Widgets previos:** `/api/geo` (home) y `/api/feedback` (artículos) siguen haciendo sus peticiones al cargar. No forman parte de F4A.

## Rollback

Antes de `main`: descartar la rama `agent-ready/f4a-2`. Basta con quitar la línea del layout y `src/scripts/agent-tools.ts`; las calculadoras y la API de F4A-1 siguen funcionando.
