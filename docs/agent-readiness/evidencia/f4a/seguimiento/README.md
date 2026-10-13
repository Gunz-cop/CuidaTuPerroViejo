# F4A-3 (seguimiento) — Entrega del autor

- **Issue:** [#86](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/86).
- **PR:** draft [#87](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/87), de `agent-ready/f4a-seguimiento` a `agent-ready/f4a-2`.
- **SDD:** [f4a-seguimiento.md](../../../fases/f4a-seguimiento.md), ratificada tras R2/2 PASS ([ratificación](ratificacion-sdd.md)).
- **Código entregado:** `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773`. El commit que añade esta carpeta es sólo documentación.
- **Autor:** sesión coordinadora `claude-opus-5-5`/high, homologado de Sol/high.
- **Fuera de alcance de esta entrega:** `main`, producción y cualquier llamada con efectos.

## Qué se entrega

**D33 — umbrales HHHHHMM.**
- `qualityBand` pasa a usar `> 50` para buena y `> 35` para aceptable. Es la única función de franja; la usan la UI, la API y WebMCP.
- Los cuatro textos de §2 de la página: tres frases de la FAQ (una en JSON-LD) y los chips `&gt; 50 Buena` / `36–50 Aceptable` / `≤ 35 Comprometida`.
- Descripciones de `band`, `thresholds` y de la operación, y OpenAPI `1.2.0`.
- Ejemplo normativo de todo 5 regenerado: `compromised`.
- Nota de modificación en los [contratos F4A](../../../fases/f4a-contratos.md).
- **Tests:**
  - El oráculo legado conserva textos y suma.
  - La regla D33 se declara aparte.
  - Recorriendo los 11^7 vectores, la franja sólo difiere del legado en las sumas 35 y 50.
  - Se añaden los vectores de frontera 34, 35, 36, 49, 50 y 51.
- **Golden F2 de la calculadora.** Al HTML base se le aplican los mismos cuatro cambios de texto. El Markdown esperado lo regenera `projectDocument` y no se edita a mano. La aserción de los chips usa la serialización `\> 50 Buena 36–50 Aceptable ≤ 35 Comprometida`.

**D34 — carga condicional de WebMCP.**
- `src/components/AgentToolsScript.astro` contiene `<script>import '../scripts/agent-tools.ts';</script>`.
- `BaseLayout.astro` lo renderiza dentro de `<template id="agent-tools-webmcp">`, que es inerte.
- Un `<script is:inline>` sin imports inserta la plantilla en `head` sólo si `document` o `navigator` exponen `modelContext.registerTool`.
- `agent-tools.ts` no cambia.

**D35 — migración.** `docs/migracion-stack/README.md` dice ahora que la migración está **completada** (PR #38, 2026-09-03) y enlaza el postmortem y las evidencias de fase.

**Harness.**
- `webmcp-browser.mjs`:
  - registra los `/_astro/*.js` pedidos con el SHA-256 de su contenido;
  - calcula desde el build servido el cierre de imports estáticos de los `<script src>` que están fuera y dentro de la plantilla;
  - añade los vectores de frontera.
- `tools-ui-parity.mjs` añade los vectores 36 y 51 (36 casos en total).
- `agent-api.mjs` espera OpenAPI `1.2.0`.

**Verificadores nuevos** (en esta carpeta):
- [`verificar-c4a16.mjs`](verificar-c4a16.mjs);
- [`comparar-js-base.mjs`](comparar-js-base.mjs);
- [`verificar-identidad.mjs`](verificar-identidad.mjs), que es el verificador de identidad de la publicación F4A.

## Criterios

| ID | Resultado | Evidencia |
|---|---|---|
| C4A-15 | PASS | **Tests:** dominio 11^7 (franja D33; sólo cambian las sumas 35 y 50 respecto al legado), vectores de frontera y ejemplo byte a byte en la API (runtime). **Navegador, workerd y preview:** paridad UI↔API 36/36 en Chrome 155 sin API y en Chromium 141. Por WebMCP (Chrome 155 + flag), los cálculos de las sumas 34, 35, 36, 49, 50, 51, 0 y 70 son iguales a la API: 36 → `acceptable`, 51 → `good` |
| C4A-16 | PASS | [49/49](c4a16-build.json) contra el build de `9c96847`:<br>• los cuatro textos nuevos están una sola vez y no queda ningún texto anterior;<br>• JSON-LD con la frase nueva;<br>• 27 Markdown y `markdownSha256` byte-idénticos; sólo cambia `tool--calidad-vida`;<br>• el Markdown de la herramienta lleva la FAQ y los chips nuevos;<br>• OpenAPI `1.2.0`, con «>» en `band`, `thresholds` y la operación;<br>• los `const` se mantienen en `{50,35}` |
| C4A-17 | PASS | Chrome 155 sin flag y Chromium 141 en las 4 páginas: 28/28 tanto en workerd ([155](webmcp-workerd-chrome155-sin-api.json), [141](webmcp-workerd-chromium141.json)) como en preview ([155](webmcp-preview-chrome155-sin-api.json), [141](webmcp-preview-chromium141.json)).<br>• **(a)** el JS pedido es exactamente el cierre de imports estáticos. En la home, la guía y la política editorial sólo se pide `CanineAiAssistant`; en la calculadora, además el script de la página, `calidad-vida` y `contract`.<br>• **(b)** no se pide `AgentToolsScript` ni `contract`/`calidad-vida`/`movilidad` donde sólo los importa la plantilla, ni `movilidad` en la calculadora.<br>• **(c)** home y política editorial: el mismo JS por SHA-256 (`75386c46…`) que el build `aad2a66` en workerd. Comparación en [workerd 155](c4a17c-workerd-chrome155.json), [workerd 141](c4a17c-workerd-chromium141.json), [preview 155](c4a17c-preview-chrome155.json) y [preview 141](c4a17c-preview-chromium141.json); referencia en [155](ref-aad2a66-chrome155-sin-api.json) y [141](ref-aad2a66-chromium141.json). La referencia falla a propósito sus 4 checks de plantilla, porque `aad2a66` no tiene WebMCP; para (c) sólo se usa su campo `scripts` |
| C4A-18 | PASS | Chrome 155 + `WebMCPTesting` con field trials desactivados: 91/91 en [workerd](webmcp-workerd-chrome155-webmcp.json) y en [preview](webmcp-preview-chrome155-webmcp.json). Son los C4A-08 a C4A-12 de F4A más la carga del chunk de la plantilla y los vectores de frontera |
| C4A-19 | PASS | Los 18 pasos de verificación del job «Criterios de aceptación», reproducidos en local ([checks](checks.json)); en GitHub el job y Workers Builds dan success en `cb8e10f`.<br>• `astro check` sin errores.<br>• CSS idéntico a la base (`BaseLayout.VWxkXcFk.css`).<br>• `movilidad` sin cambios: su ejemplo coincide byte a byte en la API y en la preview.<br>• Matriz HTTP de F4A-1 28/28 en [workerd](http-matrix-workerd.json) y en [preview](http-matrix-preview.json).<br>• F2/F3 sólo cambian en lo declarado en C4A-16 |
| C4A-20 | PASS | [README de la migración](../../../../migracion-stack/README.md): sólo cambia la línea de estado, sus enlaces existen y `audit-specs-migracion.mjs` pasa (excluye el README) |

**Preview (C4A-13 aplicado al seguimiento).**
- Recibo independiente: comentario del bot de Cloudflare en el PR #87 ([recibo](recibo-preview.json)).
- Commit Preview URL `70ec48bf` de `cb8e10f`.
- [Identidad](preview-identidad.json): los 22 archivos del [manifest](build-manifest.json) son byte-idénticos; los 2 ejemplos normativos coinciden byte a byte (el de calidad de vida ya es el regenerado); `robots.txt` y la política F1 no cambian.

## Observaciones del autor

1. **Aserción de los chips.** La proyección escapa `>` al inicio de línea (`\>`). La aserción usa la serialización tal como la produce el fixture regenerado, como prevé la ratificación.
2. **Hashes de chunks.**
   - El script de la página y `calidad-vida` cambian de hash por D33.
   - El chunk de `AgentToolsScript` (`CZ3jEwtI`) coincide byte a byte con el chunk `BaseLayout` de F4A (`BXdX4Wb_`). La única diferencia es el nombre con hash del import de `calidad-vida` (`_vNyTnhK` → `CkucuN4v`); se comprobó con `diff` tras normalizar ese nombre.
3. **Referencia `aad2a66`.** Se construyó en un worktree y se sirvió con un workerd nuevo. No toca el repo ni `main`.

## Rollback

Ver la SDD, §7. Las tres partes son independientes y en ningún estado intermedio quedan dos algoritmos.
