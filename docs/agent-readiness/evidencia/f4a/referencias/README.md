# F4A — Fuentes primarias y sondeo de WebMCP

Consulta: 2026-10-12. Estas notas fijan lo leído y lo observado; no prueban despliegue.

## Especificación

- *WebMCP*, Draft Community Group Report, Web Machine Learning Community Group, **9 de octubre de 2026**, editores Walderman (Microsoft), Sagar y Farolino (Google): <https://webmachinelearning.github.io/webmcp/>. No es estándar W3C ni está en vía de estándares.
- IDL relevante leído: `partial interface Document { [SecureContext, SameObject] readonly attribute ModelContext modelContext; }`; `ModelContext.registerTool(ModelContextTool tool, optional ModelContextRegisterToolOptions options)` → `Promise<undefined>`; `ModelContextTool { required name; title; required description; inputSchema; required execute; annotations }`; `ToolAnnotations { readOnlyHint, untrustedContentHint, consequentialHint, debugging }` (default false); `ToolExecuteCallback = Promise<any> (object inputObject, ToolExecuteCallbackOptions { required AbortSignal signal })`; `ModelContextRegisterToolOptions { exposedTo, signal }`; `getTools()` y `executeTool()` para clientes.
- Reglas: nombre 1–128 caracteres ASCII alfanuméricos, `_`, `-`, `.`; nombre duplicado, inválido o descripción vacía → `InvalidStateError`; política no permitida → `NotAllowedError`; abortar la señal de registro desregistra y no cancela una ejecución en curso; `executeTool` resuelve un string JSON y falla con `NotFoundError`, `DataError`, `OperationError` o `AbortError`. Permissions Policy `tools`, default `'self'`.
- Explainer declarativo (no usado por F4A): <https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md>.

## Chrome

- Chrome for Developers, *WebMCP* (publicado 2026-05-18, actualizado 2026-10-07): <https://developer.chrome.com/docs/ai/webmcp>. Flag de desarrollo local `chrome://flags/#enable-webmcp-testing`; origin trial desde Chrome 149; gate por Permissions Policy `tools` (default self); orientado a flujos locales con persona en el bucle.
- Fechas de fin del origin trial (Chrome 156, ~16–17 nov 2026) y entrada como string JSON en builds ≤154 proceden de fuentes secundarias; F4A no depende de ellas y no añade token de origin trial.
- Guía del evaluador archivada en [webmcp.md](../../referencias/webmcp.md): registra `document.modelContext.registerTool()` con fallback `navigator.modelContext`; detecta cargando la página. Su scan F3 informa `No tools registered via document.modelContext or navigator.modelContext`.

## Sondeo real del entorno ([scripts y salidas](sondeo/))

Binarios: [versiones](sondeo/versiones.txt). Chromium 141.0.7390.37 (Playwright) no contiene `modelContext`. Google Chrome for Testing 155.0.8059.39, zip con SHA-256 `55672d1f…ea8ea`:

| Lanzamiento | `document.modelContext` | `navigator.modelContext` | registerTool/getTools/executeTool |
|---|---|---|---|
| sin flags | undefined | undefined | — |
| `--enable-features=WebMCPTesting` | object | undefined | funciona; `executeTool` devuelve string JSON |

[probe2](sondeo/probe2.out.txt) con el flag: `title` y `annotations.readOnlyHint` se conservan; `execute` recibe `{signal}` y una cancelación de `executeTool` llega a esa señal y rechaza con `AbortError`; nombre duplicado o inválido → `InvalidStateError`; abortar la señal de registro elimina la herramienta; una excepción del callback llega al cliente como `UnknownError` (la spec dice `OperationError`: divergencia de implementación, no contrato del sitio); input no objeto → `TypeError`. El navegador expone además el dominio CDP experimental [`WebMCP`](sondeo/cdp-webmcp-domain.json) (`enable`, `toolsAdded`, `invokeTool`, `cancelInvocation`, `toolResponded`), que F4A usa como cliente externo real en la verificación.
