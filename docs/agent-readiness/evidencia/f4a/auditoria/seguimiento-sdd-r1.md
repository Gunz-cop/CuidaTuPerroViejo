# Auditoría independiente SDD del seguimiento F4A (D33–D35) — revisión 1/2

| Campo | Valor |
|---|---|
| Intento | **1 de 2** (un FAIL en la segunda es STOP) |
| Objeto | `docs/agent-readiness/fases/f4a-seguimiento.md` |
| Commit auditado | `072e8af9c32a940b9fb6b4a027312982e93e2e39` (`git fetch` + checkout exacto; HEAD verificado; `git ls-remote`: `refs/heads/agent-ready/f4a-seguimiento` = este SHA) |
| Tree auditado | `8525d5c2572f295c08c2def6eb0c4e1dcedcb376` |
| Base | `9c96847625f4952aca699905b05fc6cd92e84248` (cierre F4A). `9c96847..072e8af` sólo añade `fases/f4a-seguimiento.md`. Fuera de `docs/`, `9c96847` es idéntico a `main` = `35e2c1583f197cb0f5e7a878a5227f39897740b7` (verificado) |
| Sesión auditora | `session_011k5uFc2VrmGa3CVCgb2eSm`, auditor SDD de F4A, distinta del autor |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (`get_session`: `configured_model`, `session_context.model` y `external_metadata.last_served_model`), esfuerzo `high` |
| Fecha | 2026-10-13 (UTC) |
| Alcance | Sólo bloqueantes. Coherencia con la SDD, los contratos F4A y los contratos F2/F3, el contrato API, el diseño D34, C4A-15 a C4A-20, propiedad de ficheros, gates, rollback, STOP, vectores de frontera y textos de §2. Sin commits, push, despliegues ni correcciones |

## Verificaciones

1. **Base y build.** Construí `9c96847` en un clon local del scratchpad (`npx --no-install astro build`, exit 0). Grafo de chunks real:
   - `BaseLayout` importa `contract`, `calidad-vida` y `movilidad`.
   - La página de la calculadora importa `calidad-vida`, que importa `contract`.
   - La del selector importa `movilidad`, que importa `contract`.
   - `CanineAiAssistant` no importa nada.
   - No hay `modulepreload`.
2. **D34, prototipo propio.** Lo hice en el clon del scratchpad, no en el repo, y luego lo deshice.
   - Monté `src/components/AgentToolsScript.astro`, el `<template id="agent-tools-webmcp">` y un `<script is:inline>` de detección.
   - Astro 7 emite `<script type="module" src="/_astro/AgentToolsScript….js">` **dentro** del `<template>` y no genera `modulepreload`.
   - Chrome for Testing 155.0.8059.39 sin flag no pide ese chunk ni sus imports exclusivos.
   - Con `WebMCPTesting` lo carga y se registran las cuatro tools.
   - El diseño es implementable y verificable. Prueba: `c4a17-probe.mjs` (sha256 `a0b9313c…fedb`), salida `c4a17-probe.out.txt` (sha256 `a9465058…cf58`).
3. **D33 contra el código.** La única función de franja es `qualityBand` (`src/lib/agent-tools/calidad-vida.ts:68`). Los blobs del oráculo legado `3ea5ef22` y `196c0661` existen y son los scripts de las páginas en la base de F4A. La tabla de §2 es correcta para `>`, y la diferencia con el legado se limita, por construcción, a las sumas 35 y 50.
4. **D35.** `docs/migracion-stack/postmortem-astro-4-a-7.md` registra la promoción a producción en el PR #38 (2026-09-03). Las evidencias de fase existen en la carpeta. El cambio documental es coherente.
5. **Contrato API (pregunta del encargo).** Mantener `schemaVersion: "agent-api/1"` y los `const` de `thresholds` `{50,35}` con semántica de mínimo exclusivo, documentada, y OpenAPI `1.2.0` es aceptable. La forma no cambia y la respuesta trae `band` explícita, que es lo que debe usar un consumidor. No falta nada esencial (ver la observación 1).

## Bloqueantes

### B1 — Los chips de la pantalla de inicio de la calculadora contradicen D33 y quedan fuera de los textos que se permite cambiar

- **Ubicación:**
  - `f4a-seguimiento.md` §2: «Textos de la página… sin otros cambios de redacción», sólo 3 textos, y la frase «Con esto, 35 y 50 dejan de ser ambiguos en el texto y coinciden con la regla».
  - §5, ficheros permitidos: «calculadora-calidad-vida-perros.astro (sólo los 3 textos de §2)».
  - C4A-16.
- **Problema:**
  - La página visible de la base (`src/pages/herramientas/calculadora-calidad-vida-perros.astro:169-171`, pantalla `#qol-intro`) muestra las franjas como chips: `✅ ≥ 50 Buena`, `⚠️ 35–49 Aceptable` y `🛑 < 35 Comprometida`.
  - Con D33, 50 pasa a «aceptable» (el chip dice «≥ 50 Buena») y 35 pasa a «comprometida» (el chip dice «35–49 Aceptable», y «< 35» lo excluye de comprometida).
  - Esos chips forman parte de la proyección F2 (selector `#qol-intro` en `projection-dom.mjs`; fixture `tests/agent-readiness/fixtures/f2/tool--calidad-vida.md:24`).
  - `tests/agent-readiness/projection.test.mjs:81` los fija con `/≥ 50 Buena 35–49 Aceptable/`.
- **Por qué impide ejecutar:**
  - Implementando el SDD al pie de la letra, la página y su Markdown F2 publicarían dos reglas contradictorias en la misma pantalla. Es justo lo que D33 pretende eliminar, y hace falsa la afirmación de §2.
  - Para corregirlo, el implementador tendría que cambiar un cuarto texto fuera de la propiedad permitida y elegir su redacción, decisiones que el SDD prohíbe tomar al ejecutor.
- **Condición de resolución:**
  - §2 fija la redacción exacta y completa de los tres chips. Por ejemplo, `> 50 Buena` / `36–50 Aceptable` / `≤ 35 Comprometida`, u otra que el autor decida.
  - §5 los incluye en los cambios permitidos de la página.
  - C4A-16 los verifica en el HTML construido y en la proyección F2.
  - Se declara la actualización de `projection.test.mjs:81` y del fixture F2.

### B2 — C4A-17 no se puede cumplir tal como está redactado: la página de la calculadora pide chunks importados que no son `<script src>` del HTML

- **Ubicación:** §6, C4A-17: «el conjunto de `/_astro/*.js` pedido es igual al conjunto de `<script src>` del HTML que están fuera del `<template>`». Lo aplica a las 4 páginas del harness, que incluyen `/herramientas/calculadora-calidad-vida-perros` (`webmcp-browser.mjs:16`).
- **Problema:**
  - Con D34 bien implementado, Chrome 155 sin flag en la calculadora pide `CanineAiAssistant`, `calculadora-calidad-vida-perros`, `calidad-vida` y `contract`.
  - Los dos últimos son imports estáticos del script de la página, que §3.6 declara fuera de alcance y legítimos.
  - Fuera del `<template>` sólo hay dos `<script src>`. El conjunto pedido ≠ el conjunto de `<script src>`, y el criterio falla sin que haya ninguna petición nueva por WebMCP.
  - En la home sí coinciden (`CanineAiAssistant`). Medido en el prototipo del punto 2.
- **Por qué impide ejecutar:** un criterio de aceptación obligatorio fallaría de forma determinista en una implementación correcta. El ejecutor tendría que redefinir la medida, que es justo lo que el propio C4A-17 debe fijar.
- **Condición de resolución:** que C4A-17 compare el conjunto pedido con el **cierre transitivo de imports estáticos** de los `<script src>` de fuera del `<template>`, derivado del build, o con un conjunto esperado explícito por página. Y que exija además que no se pida el chunk de `AgentToolsScript` ni ningún módulo que sólo él importe (en la home: `contract`, `calidad-vida` y `movilidad`; en la calculadora: `movilidad`).

### B3 — Faltan ficheros necesarios en la propiedad permitida (§5)

- **Ubicación:** §5, «Ficheros permitidos», frente a §2 (OpenAPI `1.2.0`), C4A-15 y §7.
- **Problema:**
  - (a) `scripts/agent-readiness/agent-api.mjs:239` exige `openapi.info?.version !== '1.1.0'` → `fail('OPENAPI_IDENTITY_OR_PATHS_INVALID')`. Ese generador corre en `astro:build:done`, así que cambiar `info.version` a `1.2.0` **rompe el build** si no se toca ese fichero, y no está en la lista.
  - (b) C4A-15 exige comparar UI↔API en las sumas 36 y 51, y §7 dice «`tools-ui-parity.mjs` con los vectores de frontera añadidos». Sus vectores actuales sólo cubren sumas 0/70/34/35/49/50/10/40 más 20 aleatorios, y `scripts/agent-readiness/tools-ui-parity.mjs` no está en la lista.
  - (c) C4A-15 exige también la paridad por WebMCP en 34, 35, 36, 49, 50, 51, todo 0 y todo 10. Los vectores de `webmcp-browser.mjs` (líneas ~141) no incluyen 36 ni 51, y §5 sólo permite tocar ese fichero para la «comprobación nueva de C4A-17».
- **Por qué impide ejecutar:** la regla vigente de F4A, que este documento no deroga, dice: «Un cambio fuera de ownership → bug de SDD y STOP». Implementar D33 y verificar C4A-15 obliga a modificar esos tres ficheros fuera de la propiedad declarada.
- **Condición de resolución:** §5 añade:
  - `scripts/agent-readiness/agent-api.mjs` (sólo la versión esperada de OpenAPI);
  - `scripts/agent-readiness/tools-ui-parity.mjs` (vectores de frontera);
  - en `webmcp-browser.mjs`, también los vectores de frontera de C4A-15.

## Observaciones no bloqueantes

1. **Contrato API.** Conviene que la `description` de `band` (además de la de `thresholds`) diga que la franja se decide con `>`, y que los consumidores deben usar `band` y no recalcularla. Sin consumidores conocidos, mantener `agent-api/1` y los `const` es razonable.
2. **Textos de §2.** Se dan con «…». Son ejecutables porque sólo cambia el inicio de cada frase, pero conviene fijar la frase completa resultante de cada uno. El JSON-LD queda: «Con 35 o menos, la calidad de vida está comprometida y se recomienda consultar al veterinario.»
3. **Atribución.** «Buena > 50» procede del texto del propio sitio, no de la escala original, que sólo fija el umbral de aceptable. No pude verificar la fuente primaria: el PDF de NCSU enlazado por la página devuelve 404 desde este entorno. La regla es coherente con el texto de la página, pero conviene no atribuir el 50 a Villalobos.
4. **Hashes.** D34 cambia el HTML de las 28 páginas, así que cambian los `htmlSha256` del índice F2 de todas, no sólo la de la calculadora. C4A-16 habla bien de «Markdown», pero §2 dice «los otros 27 documentos y su Markdown quedan byte a byte iguales». Conviene limitarlo al Markdown y a `corpusSha256` o `markdownSha256`.
5. **C4A-19, «18 pasos del CI».** `ci.yml` tiene 22 pasos con nombre (4 de preparación). Conviene decir qué se cuenta.
6. **C4A-17, «el JS que ya cargaban antes de F4A».** Conviene nombrar el build de referencia (`aad2a66`) y comparar por chunk y contenido, no por nombre con hash.

## Limitaciones

- No ejecuté workerd, preview, la suite de CI ni scans. El prototipo de D34 se sirvió como estáticos desde `dist/client` con Chrome for Testing 155.0.8059.39 (con y sin flag). No probé Chromium 141.
- No verifiqué la escala original de Villalobos (404 desde este entorno).
- No reconstruí `aad2a66` para comparar el JS cargado antes de F4A.

## Dictamen

**FAIL** — 3 bloqueantes (B1, B2 y B3). Los tres se resuelven con cambios documentales acotados en `f4a-seguimiento.md` §2, §5 y §6, sin cambiar el diseño de D33, D34 ni D35.
