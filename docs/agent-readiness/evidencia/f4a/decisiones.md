# F4A — Decisiones arquitectónicas

Autor de la SDD, 2026-10-12, base `eff4ce13a1f4b996f3d9b523799012bc668da318` (tree `d46f6baf5e4a6eb0bcbc001882488e5944c52513`). Pendientes de auditoría independiente y ratificación. [SDD](../../fases/f4a-herramientas-webmcp.md), [contratos](../../fases/f4a-contratos.md), [fuentes](referencias/README.md).

| ID | Decisión | Evidencia y consecuencia |
|---|---|---|
| D21 | Base = cierre documental F3 `eff4ce1`, no `main` desnudo | `main` = `aad2a66` (producto F3 aceptado) y no avanzó; `eff4ce1` = `main` + sólo `docs/agent-readiness/**` (60 archivos, verificado con `git diff --name-only`). Partir de ahí conserva el historial y el cierre F3 en la rama F4A sin cambiar producto |
| D22 | Paridad por extracción: datos y funciones puras en `src/lib/agent-tools/`, consumidos por UI, Worker y WebMCP | La lógica vive hoy en `<script is:inline>` de cada página. Mover sólo datos/cálculo y dejar DOM/estilos en la página evita un segundo algoritmo y no toca el HTML estático que proyecta F2. Oráculo independiente: bytes legados de la base, no la implementación |
| D23 | Cálculo HTTP como GET/HEAD/OPTIONS con query en el namespace F3 | Cálculo puro, sin efectos ni body; reutiliza decodificador estricto, errores, headers y routing `/api/*` existente. Sin bindings, routing ni config nuevos. POST no aporta nada y añadiría superficie |
| D24 | Salida = textos visibles de la UI (`textContent`) + entrada + puntaje/franja/plan; sin URLs de afiliado | Paridad comprobable en navegador. Afiliados ocultos en la UI y comercio fuera de alcance; publicarlos cambiaría el producto |
| D25 | Alerta paliativa: marcado estático intacto + dato compartido con test contra el HTML construido | Reescribir el marcado arriesga los bytes Markdown F2 (selector `#m5alert` en `projection-dom.mjs`). Réplica textual única, vigilada por test obligatorio |
| D26 | WebMCP imperativo en todas las páginas de `BaseLayout`, cuatro tools read-only; sin API declarativa | El evaluador carga la home; agentes pueden aterrizar en cualquier guía. Ningún formulario se anota: contacto/feedback tienen efectos |
| D27 | search/read vía `fetch` same-origin a la API F3; cálculos locales con la función compartida | Reutiliza F3 sin duplicar índice; cálculo sin red es cancelable y offline. ID validado por patrón antes de construir la URL |
| D28 | Sin polyfill, sin token de origin trial, sin `navigator`-only | La spec es `document.modelContext`; fallback a `navigator` sólo si existe nativo. Simular la API para el escáner está prohibido. El token requiere cuenta del propietario y expira; queda como decisión separada |
| D29 | Verificación real con Chrome for Testing 155 + `WebMCPTesting` y cliente externo CDP `WebMCP.invokeTool` | Disponible y probado en este entorno ([sondeo](referencias/README.md)). Un mock unitario no acredita integración. Sin ese navegador → STOP del gate afectado |
| D30 | Dos issues secuenciales: F4A-1 lógica/API/contratos → F4A-2 WebMCP/preview | Separa el cambio de producto verificable sin navegador WebMCP del registro en navegador; cada uno con auditor fijo y ≤5 revisiones |
| D31 | Sin rate-limit nuevo | Igual que D14: cálculo O(1), sin coste, sin I/O; WebMCP hace ≤1 fetch same-origin. Cuota global = SDD futura |
| D32 | Cadenas de `inputSchema` WebMCP en ASCII (ciclo 2) | B4: Chrome 155 omite `inputSchema` en `WebMCP.toolsAdded` si una cadena del schema tiene caracteres Latin-1 no ASCII. ASCII evita el fallo en la verificación y el riesgo de que un agente reciba la tool sin schema; las descripciones de las tools siguen en español con tildes porque no se ven afectadas ([comprobación](ciclo2/README.md)) |

Riesgo conocido: el evaluador puede usar un navegador sin la API o exigir origin trial. Si `webMcp` no pasa en producción con las llamadas reales funcionando, se abre bug y STOP; no se añade polyfill ni token sin decisión del propietario.
