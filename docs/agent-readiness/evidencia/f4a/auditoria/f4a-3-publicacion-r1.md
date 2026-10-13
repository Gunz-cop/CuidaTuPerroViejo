# Auditoría de la publicación F4A-3 — revisión 1

| Campo | Valor |
|---|---|
| Objeto | Publicación de F4A-3 en producción (P4A3-01 a P4A3-03) y su documentación |
| Revisión | 1 (mismo auditor independiente que F4A-1, F4A-2, la publicación F4A y la implementación F4A-3) |
| Rol | Auditor independiente. Sólo bloqueantes. No corrige |
| Sesión auditora | `session_018Qh7gCo3pKMrMHbqaC86br` (hija de `session_01WrWNMhCy51TqDSjjHwBTVS`) |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (`get_session` al recibir el encargo; esfuerzo `high`). Sin fallback |
| `main` auditado | `origin/main` = `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773` |
| Evidencia auditada | `88f27669ea3f38401299bdbc7d1b310a033072a3` (`agent-ready/f4a-seguimiento`, checkout exacto). `43cb4c3..88f2766`: 35 ficheros, todos bajo `docs/` |
| Fecha | 2026-10-13 (UTC) |

## Método (evidencia propia)

- Fetch de `main` y `agent-ready/f4a-seguimiento` y checkout exacto de `88f2766`.
- Comprobaciones git de la cadena de promoción. Lectura en GitHub de PR #88 y del check `115329002239`.
- Contra `https://cuidatuperroviejo.com`, **sólo GET, HEAD y OPTIONS** y navegación de sólo lectura (las 4 tools de sólo lectura). Sin POST, DELETE, formularios ni scans.
- Identidad por contenido de los 326 ficheros de `dist/client` de mi build de `cb8e10f` (el mismo de la R1/5 de F4A-3; `git diff cb8e10f 88f2766 -- . ':!docs'` vacío).
- Reejecución del verificador de identidad del autor con el manifest de `cb8e10f`, y de mi matriz HTTP filtrada a GET, HEAD y OPTIONS.
- Mis harness de navegador de la R1/5 de F4A-3: `webmcp-auditor3.mjs`, `c4a17-auditor.mjs` y `ui-parity-auditor3.mjs`, con Chrome for Testing 155.0.8059.39 (field trials desactivados, con y sin `WebMCPTesting`) y Chromium 141.0.7390.37, a través del proxy del agente con TLS verificado y con terceros bloqueados.
- Reanálisis de los artefactos de P4A3-03 y de la primera ejecución fallida (`run1-*`).

## Resultado por punto del encargo

| # | Punto | Resultado | Evidencia propia |
|---|---|---|---|
| 1 | Cadena de promoción | **PASS** | `origin/main` = `cb8e10f`, con el tree auditado en la R1/5 de F4A-3. `35e2c15` es ancestro de `main` y `35e2c15..main` tiene 10 commits con **0 merges** (fast-forward). El código de `main` es exactamente el auditado. PR #88: `merged:true`, head `release/f4a3-cb8e10f1` = `cb8e10f`, base `main` = `35e2c15`, `merged_at` 13:40:29Z, coherente con el push de 13:40:25Z. Check `115329002239` «Workers Builds»: `completed/success`, build `39c2fd8b…`, Version ID `a8532c87…`. Mi informe R1/5 de F4A-3 está archivado byteidéntico (`cmp`) |
| 2 | Identidad de producción | **PASS** | Los **326 ficheros** de `dist/client` de mi build de `cb8e10f`, comparados uno a uno por GET contra producción, dan SHA-256 iguales en 325; `contacto.html` difiere sólo en `startedAt`. Esto incluye el HTML de la calculadora con los textos D33, los chunks nuevos, `tool--calidad-vida.md`, `index.json`, `query-index.json` y el OpenAPI 1.2.0, así que C4A-16 sobre lo servido es lo verificado en mi R1/5. El verificador del autor con el manifest de `cb8e10f` da «PASS identity 22/22, examples 2/2, policy true, byteIdentical true». El ejemplo de todo 5 da `compromised`, y `robots.txt` tiene la señal única `search=yes, ai-input=yes, ai-train=no`. La matriz HTTP con GET, HEAD y OPTIONS da 26/26 PASS. La matriz del autor (`http-matrix-seguro.mjs`) también filtra a esos métodos |
| 3 | WebMCP y comportamiento sin WebMCP | **PASS** | **Con WebMCP** (Chrome 155 + flag), 205 aserciones: 202 PASS, y las 3 restantes sólo por el «Failed to load resource» que Chrome escribe al transmitir los 4xx de la API (observación conocida: cuerpo igual a la API, un único GET y sin efectos). Pasan el registro nativo de las 4 tools, el anexo, las llamadas, los 31 inválidos, la cancelación, los fallos de transporte, la ausencia de efectos y las fronteras D33 (34, 35, 36, 49, 50, 51, 0 y 70). El chunk de la plantilla se carga y se registran 4 tools (20/20). **Sin WebMCP:** 28/28 en Chrome 155 y en Chromium 141. C4A-17 da 24/24 en cada navegador: (a) se pide exactamente el cierre fuera de la plantilla, (b) nunca se piden `AgentToolsScript` ni sus módulos exclusivos, y (c) en la home y la política editorial el SHA-256 del JS es igual al medido con `aad2a66`. **Calculadoras:** 42/42 UI = API con franja D33 en ambos navegadores, sin errores de consola ni peticiones API al cargar |
| 4 | Coherencia de P4A3-03 | **PASS** | En los dos perfiles, `request.json` es byteidéntico al de F3 y `requestSha256` es igual al del cierre F4A y al de F3. `scoringRuleId`, `checkUniverseHash`, `enabledChecks`, perfil y target también coinciden. `state: complete`, sin errores. Recalculé `counts` y `score` desde los checks: content 6/7 → **86** (nivel 5) y all-ui 10/15 → **67** (nivel 4), Δ0 los dos frente al cierre F4A, sin cambios de checks. `webMcp` sigue en pass («Found 4 WebMCP tools…»). En `comparacion-*.json`, `before.responseSha256` es el raw del cierre F4A y `after` el del manifest nuevo, `comparable:true`. CLI congelada: `index.mjs` `e2ea8f3d…` y `shared.mjs` `89581c2a…` en `main`, iguales a `aad2a66`. Hay un único scan por perfil (13:46:54Z y 13:46:58Z), **después** de la convergencia (13:44:31Z). El `sourceCommit` `2b6f41c` tiene el código de `cb8e10f`. El índice de originales coincide con las 24 copias publicadas; los 2 `response.raw.json` son privados. No lancé scans |
| 5 | Afirmaciones de los documentos | **FAIL** | Ver **B1**. `resultado.md` y `recibo-produccion.json` son exactos: declaran el FAIL de la primera ejecución, la convergencia y la segunda ejecución, y sus cifras coinciden con la evidencia. Las correcciones de la observación 2 de la R1/5 en `f4a-contratos.md` (§1.1) son correctas |

## Desviación pedida: primera ejecución de P4A3-01 en FAIL y segunda ejecución

**Dictamen: no bloquea.**

1. **La primera ejecución no fue un fallo del producto.**
   - Contrasté `run1-produccion-identidad.json` con mis builds: de sus 9 discrepancias, **6 son byte a byte los ficheros del build de F4A (`35e2c15`)** y **3 son 404** (los chunks nuevos).
   - Es exactamente la mezcla de versiones de un despliegue que todavía no había convergido. Ningún fichero tenía un contenido distinto de los dos builds conocidos.
2. **Se adelantó al propio paso 2 de la propuesta.** El paso 2 dice «esperar a que producción sirva el build». El autor inició P4A3-01 13 s después de ver una sola respuesta nueva, y lo reconoce como error. Por eso la primera ejecución fue prematura más que un gate válido en FAIL. La propuesta decía «sin reintentos» precisamente para no ocultar fallos reales del producto.
3. **El tratamiento conserva la integridad del gate:**
   - el FAIL quedó registrado (`run1-*`);
   - antes de repetir se exigió un criterio de convergencia explícito y más fuerte: 22/22 en 3 sondeos seguidos con 60 s de separación;
   - P4A3-01 se ejecutó una sola vez más;
   - P4A3-02 y P4A3-03 se ejecutaron una sola vez y sólo después.
   Los scans, que es donde un reintento podía sesgar la puntuación, no se repitieron.
4. **Mi verificación independiente es posterior y completa.** Producción sirve hoy los 326 ficheros de `cb8e10f`, así que la segunda ejecución no ocultó nada.

Recomendación no exigida: incorporar el criterio de convergencia (N sondeos seguidos) al paso 2 de futuras propuestas.

## Bloqueantes

### B1 — Documentos de estado que contradicen la publicación de F4A-3

- **Ubicación** (en `88f2766`, el commit que registra la publicación):
  1. `docs/agent-readiness/plan.md`, línea 7: «F4A-3 (…): SDD ratificada e implementación aceptada (R1/5 PASS); **publicación pendiente de autorización**.»
  2. `docs/agent-readiness/fases/f4a-seguimiento.md`, línea 3 (cabecera de estado): «Implementación aceptada (F4A-3 R1/5 PASS); **publicación pendiente de autorización** (propuesta).»
  3. `docs/agent-readiness/evidencia/f4a/seguimiento/propuesta.md`, línea 3: «Estado: propuesta preparada y revisable; pendiente de autorización del propietario. **Nada de esta propuesta se ha ejecutado contra `main` ni contra producción.**»
  4. `docs/agent-readiness/README.md`, línea 43: «(desde 2026-10-12, **`main` es `35e2c158`**, ver F4A abajo)». Hoy `main` es `cb8e10f`.
- **Reproducción:**
  - `git show 88f2766:docs/agent-readiness/plan.md | sed -n 7p | grep -o 'publicación pendiente de autorización'`
  - `git show 88f2766:docs/agent-readiness/fases/f4a-seguimiento.md | sed -n 3p`
  - `git show 88f2766:docs/agent-readiness/evidencia/f4a/seguimiento/propuesta.md | sed -n 3p`
  - `git show 88f2766:docs/agent-readiness/README.md | sed -n 43p`
  - `git rev-parse origin/main` (= `cb8e10f…`)
- **Problema:** la evidencia y mi comprobación muestran que F4A-3 **está publicada**: `main` = `cb8e10f`, push autorizado a las 13:40:25Z y producción byteidéntica. Los cuatro documentos de estado dicen lo contrario («pendiente de autorización», «nada se ha ejecutado contra `main`», «`main` es `35e2c158`»). Sólo `resultado.md` refleja la publicación.
- **Por qué bloquea:** el punto 5 exige que los documentos no afirmen nada que la evidencia no respalde. Es el mismo criterio que bloqueó la publicación F4A en su R1 (B1) y que el coordinador aplicó entonces actualizando el README y marcando `propuesta.md` como «autorizada y ejecutada». No afecta al producto ni a los gates.
- **Condición de resolución:** un commit **sólo de documentación** en el que:
  - `plan.md` (línea de F4A-3) y la cabecera de `f4a-seguimiento.md` digan que F4A-3 está publicada en `cb8e10f`, con la auditoría de publicación pendiente o resuelta;
  - `propuesta.md` marque su estado como autorizada y ejecutada (con enlace a `resultado.md`), conservando, si se quiere, el texto original como cita;
  - el README deje de afirmar que el `main` actual es `35e2c158`.
  
  No hace falta repetir gates, pruebas ni scans. `seguimiento/cierre.md` es un registro fechado de la aceptación, anterior al push, y no se exige cambiarlo, igual que `2/cierre.md` en F4A. Su sección «Pendiente» puede enlazar el resultado.

## Observaciones no bloqueantes

1. **Ventana de propagación visible para usuarios.** Durante el despliegue, producción sirvió durante segundos o minutos una mezcla de F4A y F4A-3, con 404 en chunks nuevos. Una página nueva que referenciase un chunk aún no servido podía quedar sin su script, por ejemplo la calculadora. Es una característica del despliegue de assets de Workers, no un defecto de F4A-3. Si se quiere evitar, corresponde a otro trabajo.
2. **Consola del navegador en 4xx transmitidos.** Es la observación conocida, inherente a contratos §5.3.2.
3. **Verificación de 22 ficheros frente a 326.** El criterio de convergencia y la identidad del autor usan los 22 ficheros del manifest; los míos cubren los 326. En este despliegue coinciden.

## Limitaciones

- La autorización del propietario («Push a main y dalo por cerrado si se puede») sólo consta en los documentos de la sesión coordinadora.
- Los `response.raw.json` de los scans son privados; verifiqué su cadena de hashes, no su contenido. No lancé scans.
- La primera ejecución y la convergencia no se pueden reproducir: la evalué con sus artefactos (`run1-*`, `convergencia.json`) y contrastando los SHA-256 de `run1` con mis builds de F4A y F4A-3.
- Ficheros en el scratchpad: `prod-identity-f4a3.tsv`, `f4a3-prod-identidad-auditor.json`, `f4a3-http-matrix-prod.json`, `webmcp-auditor-f4a3-prod-*.json`, `c4a17-prod-*.json`, `ui-parity-f4a3-prod-*.json` y `p4a03-check-f4a3.mjs`.

## Dictamen final

**FAIL**, sólo por **B1** (documental). Lo técnico de la publicación pasa en mi verificación independiente:

- La cadena de promoción es un fast-forward exacto del código auditado.
- Producción sirve `cb8e10f` byte a byte (326 ficheros).
- P4A3-01 y P4A3-02 se reproducen.
- P4A3-03 es coherente: 86/67, Δ0, `webMcp` en pass.
- La desviación de la segunda ejecución de P4A3-01 **no bloquea**.

Para resolver B1 basta un commit sólo de documentación, sin repetir gates.
