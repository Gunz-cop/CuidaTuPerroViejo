# F4A — Seguimiento: umbrales HHHHHMM, carga condicional de WebMCP y estado de la migración

Estado: **borrador para auditoría SDD** (2026-10-13). Base: `agent-ready/f4a-2` en `9c96847625f4952aca699905b05fc6cd92e84248`. Su código es idéntico a `main` = `35e2c1583f197cb0f5e7a878a5227f39897740b7`, publicado y cerrado ([cierre F4A](../evidencia/f4a/publicacion/cierre.md)). Rama de trabajo: `agent-ready/f4a-seguimiento`.

Este documento **modifica** la [SDD F4A](f4a-herramientas-webmcp.md) y los [contratos F4A](f4a-contratos.md) sólo en lo que dice aquí. Todo lo demás sigue vigente. Si una regla de este documento choca con una de F4A, gana este documento; si dos reglas de este documento chocan entre sí, STOP de SDD.

## 1. Origen y decisiones del propietario

El cierre de F4A dejó tres decisiones al propietario. El 2026-10-13 eligió las tres opciones recomendadas:

| ID | Decisión | Opción elegida |
|---|---|---|
| D33 | Puntuación exacta de 35 (y de 50) en la calculadora de calidad de vida | **Alinear con Villalobos**: «aceptable» exige más de 35 y «buena» más de 50 |
| D34 | JS de WebMCP en todas las páginas | **Carga condicional**: los navegadores sin WebMCP no descargan nada nuevo |
| D35 | `docs/migracion-stack/README.md` desactualizado | **Actualizarlo** (sólo documentación) |

## 2. D33 — Umbrales de la escala HHHHHMM

**Problema.**
- La página de la calculadora, la escala original de la Dra. Alice Villalobos (que la página cita) y la FAQ dicen «superior a 35 … aceptable» y «por encima de 50 … buena».
- El script legado y la extracción de F4A-1 usan `>= 35` y `>= 50`.
- Una puntuación de exactamente 35 o 50 recibe en la UI una franja que contradice el texto de la propia página.

**Regla nueva** (sustituye a la de [contratos F4A §1.2](f4a-contratos.md), «Franja: `score >= 50` → `good`; `score >= 35` → `acceptable`»):

- `score > 50` → `good`
- `score > 35` → `acceptable`
- resto (`score <= 35`) → `compromised`

La suma y `maxScore = 70` no cambian. Tampoco cambian los textos de cada franja (`BANDS`, interpretación, mensaje, recomendación y guía).

**Vectores normativos de frontera** (sustituyen a «Sumas 34/35/49/50 → `compromised`/`acceptable`/`acceptable`/`good`»):

| Suma | Antes | Ahora |
|---|---|---|
| 34 | compromised | compromised |
| 35 | acceptable | **compromised** |
| 36 | acceptable | acceptable |
| 49 | acceptable | acceptable |
| 50 | good | **acceptable** |
| 51 | good | good |

Se mantienen todo 0 → 0 `compromised` y todo 10 → 70 `good`.

**Contrato de la API** (`GET /api/agent/v1/tools/calidad-vida`):

- **Forma sin cambios.** `QualityOfLifeResult` conserva campos, orden y `schemaVersion: "agent-api/1"`. `thresholds` sigue siendo `{ "good": 50, "acceptable": 35 }` (los `const` del schema no cambian).
- **Semántica nueva.** Cada umbral es un **mínimo exclusivo**: la franja exige `score > umbral`. Se documenta en la `description` de `thresholds` en `schema.json`/OpenAPI y en la `description` de la operación. Esa descripción decía «good si >=50, acceptable si >=35» y pasa a «good si >50, acceptable si >35».
- **Versión.** `info.version` de OpenAPI pasa de `1.1.0` a `1.2.0`. No se cambia `schemaVersion` porque la forma es idéntica.
- **Justificación.** La API lleva menos de un día publicada y sólo cambia la franja en dos sumas exactas, para alinearla con el texto que la acompaña. No hay consumidores conocidos.
- **Ejemplo normativo.** El de todo 5 (suma 35) pasa a `band: "compromised"`, con los textos de esa franja. [`ejemplo-calidad-vida-200.json`](../evidencia/f4a/contratos/ejemplo-calidad-vida-200.json) se regenera desde la lógica nueva; el anterior queda en el historial git (`9c96847`). Sigue siendo **byte a byte** el cuerpo 200 de la API para esa consulta.
- **Sin cambios:** los demás campos y errores, las rutas, `movilidad` y su ejemplo.

**Textos de la página** (los visibles y el JSON-LD de la FAQ, sin otros cambios de redacción):

1. JSON-LD FAQ: «Por debajo de 35 indica que la calidad de vida está comprometida…» → «Con 35 o menos, la calidad de vida está comprometida…». Se mantienen «superior a 35 … aceptable» y «Por encima de 50 indica buena…».
2. FAQ visible: «Un puntaje inferior a 35 indica que la calidad de vida está gravemente comprometida…» → «Un puntaje de 35 o menos indica que la calidad de vida está gravemente comprometida…».
3. FAQ visible: «Un puntaje bajo (menor a 35)…» → «Un puntaje bajo (35 o menos)…».

Con esto, 35 y 50 dejan de ser ambiguos en el texto y coinciden con la regla.

**Consecuencias derivadas, que se aceptan y verifican:**

- **Proyección F2 de la herramienta.** La proyección de `tool--calidad-vida` incluye la FAQ, así que cambian su Markdown y su `markdownSha256`, el `corpusSha256`, el `query-index` y los hashes que se derivan de ellos.
- **Proyección F2 de las demás páginas.** Nada más cambia: los otros 27 documentos y su Markdown quedan byte a byte iguales.
- **Expectativas de F2/F3.** Si una prueba fija esos hashes, se actualiza al valor regenerado por la propia herramienta de proyección, nunca a mano.

**Oráculo de pruebas.**
- El oráculo legado de F4A-1 (los blobs git `3ea5ef22` y `196c0661`) sigue siendo la fuente de **textos, criterios y suma**.
- Para la franja, el test declara la regla D33 de forma explícita y comprueba que difiere del legado **sólo** en las sumas 35 y 50, en todo el dominio de 11^7 entradas.
- No se crea un algoritmo nuevo: la UI, la API y WebMCP siguen usando la única función `qualityBand` de `src/lib/agent-tools/calidad-vida.ts`.

## 3. D34 — Carga condicional del adaptador WebMCP

**Problema.**
- La [SDD F4A](f4a-herramientas-webmcp.md) (línea de objetivos) dice: «En navegadores sin WebMCP el sitio funciona como antes, sin errores ni peticiones nuevas».
- Hoy cada página carga `<script>import '../scripts/agent-tools.ts';</script>`, y eso son 4 módulos de `/_astro/` (unos 16,7 KB, 7,4 KB con gzip) en todos los navegadores, también sin WebMCP.
- C4A-11 sólo comprobaba las peticiones a `/api/agent/v1`.

**Diseño:**

1. **Componente nuevo `src/components/AgentToolsScript.astro`.** Su único contenido es `<script>import '../scripts/agent-tools.ts';</script>`, el script procesado de Astro.
2. **Plantilla inerte en `BaseLayout.astro`.** La línea actual se sustituye por:
   - `<template id="agent-tools-webmcp"><AgentToolsScript /></template>`;
   - un `<script is:inline>` mínimo, sin imports. Comprueba si `document.modelContext` o `navigator.modelContext` tienen una función `registerTool`. Sólo si es así, inserta en `document.head` una copia de la plantilla (`document.importNode(template.content, true)`), y es entonces cuando el navegador descarga y ejecuta el módulo.
3. **Sin API, ninguna petición.** El `<script type="module" src>` dentro de un `<template>` es inerte: el navegador no lo descarga ni lo ejecuta. Astro no genera `modulepreload` para él. Un navegador sin API no hace ninguna petición nueva por WebMCP.
4. **`src/scripts/agent-tools.ts` no cambia.** Sigue haciendo su propia detección (`findModelContext`) y su registro. La comprobación inline es sólo una puerta de carga: no sustituye a la del adaptador ni registra nada.
5. **Sin cambios en tools ni registro.** Siguen iguales las cuatro tools, sus nombres, títulos, descripciones, `inputSchema`, `readOnlyHint`, la señal compartida, la cancelación, los errores y los límites.
6. **Fuera del alcance de D34.** Las páginas de las dos herramientas cargan los módulos compartidos de su propia calculadora, `calidad-vida`/`movilidad` + `contract`. Viene de la extracción de lógica de F4A-1 (sin lógica duplicada), no de WebMCP, y no cambia.

**Viabilidad comprobada antes de redactar.** Prototipo local (sin commit), build de Astro y workerd:
- Chromium 141 y Chrome 155 sin flag sólo piden en la home el JS que ya existía antes de F4A.
- Chrome 155 con `WebMCPTesting` carga el adaptador y registra las cuatro tools.
- El chunk del adaptador mantiene el mismo contenido que en `35e2c15`.

## 4. D35 — Estado de la migración de stack

`docs/migracion-stack/README.md` dice «fase 0 cerrada… Fases 1 a 4 pendientes». La migración a Astro 7 se promovió a producción en el PR #38 (2026-09-03), según el [postmortem](../../migracion-stack/postmortem-astro-4-a-7.md).

Cambio: la línea de estado pasa a decir que la migración está **completada**, con enlaces al PR #38, al postmortem y a las evidencias de fase que ya existen en la carpeta, y que el documento queda como registro histórico del plan. No se cambia nada más del README.

**Fuera de alcance:** `AGENTS.md` también presenta la migración como «en curso». Sus dos reglas operativas siguen siendo ciertas (`main` despliega a producción; el hook `postbuild` fue eliminado). Cambiarlo afecta a las instrucciones de todos los agentes, así que se informa al propietario y no se toca aquí.

## 5. Issue y propiedad

- **F4A-3**, un único issue que cubre D33, D34 y D35.
- **Autor:** sesión coordinadora `claude-opus-5-5`/high, homologado de Sol/high.
- **Auditor SDD:** el de F4A, independiente.
- **Auditor de implementación:** el de F4A-1/F4A-2 y de la publicación, independiente.
- **Ficheros permitidos:**
  - `src/lib/agent-tools/calidad-vida.ts` (sólo `qualityBand` y el comentario de cabecera);
  - `src/pages/herramientas/calculadora-calidad-vida-perros.astro` (sólo los 3 textos de §2);
  - `src/agent-api/schema.json` y `src/agent-api/openapi.template.json` (descripciones y `info.version`);
  - `src/components/AgentToolsScript.astro` (nuevo) y `src/layouts/BaseLayout.astro` (sólo la sustitución de §3);
  - tests y fixtures afectados;
  - `scripts/agent-readiness/webmcp-browser.mjs` (comprobación nueva de C4A-17);
  - el ejemplo normativo;
  - `docs/migracion-stack/README.md`;
  - la documentación y la evidencia bajo `docs/agent-readiness/`.

## 6. Criterios de aceptación

| ID | Criterio |
|---|---|
| C4A-15 | Franjas D33 en la función compartida. Los vectores de frontera de §2 dan exactamente la tabla. Recorriendo los 11^7 vectores, la franja difiere del oráculo legado sólo cuando la suma es 35 o 50. La API devuelve byte a byte el ejemplo regenerado. UI, API y WebMCP coinciden en los vectores de frontera (34, 35, 36, 49, 50, 51, todo 0, todo 10) en Chrome 155 sin API, Chromium 141 y, por WebMCP, en Chrome 155 con flag |
| C4A-16 | Textos de §2 en el HTML construido, visibles y en el JSON-LD. La proyección F2 sólo cambia en `tool--calidad-vida` y en los hashes derivados; los otros 27 Markdown son byte a byte iguales a `9c96847`. Las descripciones OpenAPI y del schema dicen «>». `info.version` es `1.2.0`. Los descriptores siguen anunciando sólo lo implementado |
| C4A-17 | **Sin WebMCP no hay peticiones nuevas.** En Chrome 155 sin flag y en Chromium 141, en las 4 páginas del harness, no se pide el chunk de `AgentToolsScript`. Además, el conjunto de `/_astro/*.js` pedido es igual al conjunto de `<script src>` del HTML que están fuera del `<template>`, así que no hay peticiones a módulos no referenciados. En la home y la página editorial ese conjunto coincide con el JS que ya cargaban antes de F4A |
| C4A-18 | **Con WebMCP, comportamiento F4A intacto.** Se repiten C4A-08 a C4A-12 con el harness F4A (81/81 o más, si C4A-17 añade comprobaciones) |
| C4A-19 | Regresión: los 18 pasos del CI, `astro check` sin errores, CSS idéntico a la base, F1/F2/F3 sin cambios fuera de lo declarado en C4A-16, `movilidad` sin cambios (incluido su ejemplo byte a byte) |
| C4A-20 | `docs/migracion-stack/README.md` con el estado de §4, enlaces válidos y nada más cambiado |

## 7. Verificación y gates

- **Local:** `npm test`, `node --test tests/agent-readiness/*.test.mjs`, `npx astro check`, `npx astro build`.
- **Workerd:**
  - `webmcp-browser.mjs` en modo supported (Chrome 155 + flag, con field trials desactivados) y unsupported (Chrome 155 sin flag y Chromium 141);
  - `tools-ui-parity.mjs` con los vectores de frontera añadidos;
  - la matriz HTTP de F4A-1 con las expectativas de D33.
- **Preview:** lo mismo contra la Commit Preview de Workers Builds del commit de código. La identidad del build se demuestra byte a byte con un manifest.
- **Producción:** sólo con **autorización explícita y separada del propietario**, que se pide como último paso.
  - Promoción: fast-forward de `main` al commit de código.
  - Gates: identidad, matriz HTTP **sólo con GET/HEAD/OPTIONS**, navegador y un scan por perfil con la CLI congelada. Se compara con el cierre F4A (86 contenido / 67 general).
  - Se espera que la puntuación no cambie. No es criterio de aceptación; sí lo es que `webMcp` siga en pass.
- **Rollback:**
  - D34: volver a la línea `<script>` de F4A.
  - D33: restaurar `>=` y los tres textos.
  - D35: documental.
  - Los tres son independientes, y ningún estado intermedio deja dos algoritmos.

## 8. STOP y modelos

- **Auditoría SDD:** como máximo 2 revisiones del mismo auditor. Un FAIL en la segunda es STOP.
- **Auditoría de implementación:** como máximo 5 revisiones del mismo auditor. Un FAIL en la quinta abre bug y es STOP.
- **Hueco esencial:** se abre bug y se para; no se inventan ni se debilitan checks.
- **Modelos:** la homologación de F4A sigue vigente (`claude-opus-5-5`/high, homologado de GPT-6.1 Sol/high). No se usa Astra.
