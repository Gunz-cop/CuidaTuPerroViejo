# Auditoría de la publicación F4A — revisión 1

| Campo | Valor |
|---|---|
| Objeto | Publicación F4A en producción (P4A-01 a P4A-03, C4A-14) y su documentación |
| Revisión | 1 (mismo auditor independiente que F4A-1 y F4A-2) |
| Rol | Auditor independiente. Sólo bloqueantes. No corrige |
| Sesión auditora | `session_018Qh7gCo3pKMrMHbqaC86br` (hija de `session_01WrWNMhCy51TqDSjjHwBTVS`) |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (`get_session` al recibir el encargo; esfuerzo `high`). Sin fallback |
| `main` auditado | `origin/main` = `35e2c1583f197cb0f5e7a878a5227f39897740b7`, tree `936781880833a8df156cff6b2298427e6d2e5543` |
| Evidencia auditada | `ab022b725f81627665da12ff665b3ab479343b75` (`agent-ready/f4a-2`); `5a8e78d..ab022b7` = 28 ficheros, todos bajo `docs/` |
| Fecha | 2026-10-13 (UTC) |

## Método (evidencia propia)

- Fetch de `main` y `agent-ready/f4a-2` y checkout exacto de `ab022b7`.
- Comprobaciones git de la cadena de promoción.
- Contra `https://cuidatuperroviejo.com` **sólo GET, HEAD y OPTIONS** y navegación de sólo lectura. No hubo POST, DELETE, formularios ni scans del evaluador.
- Identidad por contenido de los 326 ficheros de `dist/client` de mi build de F4A-2 (`5a8e78d` ≡ `35e2c15`, verificado en la R1 de F4A-2).
- Reejecución del verificador del autor y de una copia de `http-matrix.mjs` filtrada a GET, HEAD y OPTIONS.
- Mis harness de navegador:
  - `webmcp-auditor.mjs`: Playwright con CDP crudo, independiente de `webmcp-browser.mjs`.
  - `ui-parity-auditor2.mjs`: 38 casos.
- Navegadores:
  - Chrome for Testing 155.0.8059.39 (zip con SHA-256 `55672d1f…ea8ea` verificado), con `--disable-field-trial-config`, que Playwright pone por defecto.
  - Chromium 141.0.7390.37.
- Sin escrituras en `main` ni en producción. GitHub sólo se leyó.

## Resultado por punto del encargo

| # | Punto | Resultado | Evidencia propia |
|---|---|---|---|
| 1 | Cadena de promoción | **PASS** | `origin/main` = `35e2c15`, con el tree aceptado en F4A-2. `aad2a66` es ancestro de `main`, y `aad2a66..main` tiene 17 commits lineales con **0 merges** (fast-forward). El diff de código `aad2a66..35e2c15` (sin `docs/`) es **exactamente** la unión de los diffs auditados `1571da4..dad30d8` (F4A-1) y `ee00fd8..35e2c15` (F4A-2). Los tramos `aad2a66..1571da4` y `dad30d8..ee00fd8` no tienen cambios fuera de `docs/`. PR #85: `merged:true`, head `release/f4a-35e2c158` = `35e2c15`, base `main` = `aad2a66`, `merged_at` 2026-10-12T22:51:21Z, coherente con el push de 22:51:18Z. El check «Criterios de aceptación» `115026562988` del candidato es success. El check de Workers Builds de producción `115042365837` (build `86bbb0d9…`) sigue `in_progress`, tal como declara el recibo, que no lo usa como prueba |
| 2 | Identidad de producción | **PASS** | Los **326 ficheros** de `dist/client` de mi build, comparados uno a uno por GET contra producción, dan SHA-256 iguales en 325; `contacto.html` difiere sólo en la marca `startedAt`. Producción sirve por tanto `35e2c15` por contenido, no sólo los 22 del manifest. El verificador del autor reejecutado por mí da «PASS identity 22/22, examples 2/2, policy true, byteIdentical true». Los dos ejemplos normativos son byte a byte iguales a los anexos (`application/json; charset=utf-8`, `private, no-store`). `robots.txt` es byteidéntico al build, con la señal única `Content-Signal: search=yes, ai-input=yes, ai-train=no`. La matriz `http-matrix.mjs` filtrada a GET, HEAD y OPTIONS da **26/26 PASS**, el recorrido F3 `cushing` → lectura verifica `markdownSha256` y el primer resultado es `article--sindrome-cushing-perros-mayores`. En esos 26 casos, el status y el SHA-256 del cuerpo coinciden con `http-matrix-produccion.json` del autor |
| 3 | WebMCP real en producción | **PASS** | Chrome 155 + `WebMCPTesting` (field trials off) con 189 aserciones: 186 PASS, y las 3 restantes sólo por el «Failed to load resource» que Chrome escribe en consola al transmitir los 404, 409 y 400 de la API. Es el mismo caso que la observación 3 de F4A-2: la llamada es correcta, el cuerpo es igual a la API, hay un único GET y no hay efectos. El registro nativo da exactamente las 4 tools en 7 páginas, con metadatos e `inputSchema` iguales al anexo y `readOnly`. Las llamadas reales dan resultados iguales a la API: búsqueda → lectura, 38 cálculos sin red, 31 inválidos con `INVALID_REQUEST` sin red, `cancelInvocation` con `Canceled` y fetch abortado, `AbortError` y 6 fallos de transporte con `Error` en un único intento. Peticiones sólo GET same-origin a `/api/agent/v1/` sin `Cookie`, y storage, historial y DOM sin cambios. **Sin soporte:** Chrome 155 sin API 28/28 y Chromium 141 28/28 (sin `modelContext`, sin peticiones a `/api/agent/v1` al cargar y sin `pageerror`). **Calculadoras en producción:** 38/38 UI = API en ambos navegadores sin soporte, sin errores de consola ni peticiones API al cargar. La evidencia del autor es coherente: `webmcp-prod-*` 81/81 y 16/16 ×2 con `commit` `35e2c15` y `baseUrl` de producción, y `ui-parity-prod-*` 34/34 ×2 |
| 4 | P4A-03 | **PASS** | En los dos perfiles, `request.json` es byteidéntico al de F3 (`evidencia/f3/publicacion/cierre/live-*/request.json`), y `requestSha256` = SHA-256 de ese fichero = el de F3 (`94daf42c…` content, `d7533cff…` all-ui). `scoringRuleId`, `checkUniverseHash`, `enabledChecks`, perfil y target también son iguales a F3. `state: complete`, sin errores. Recalculé los `counts` desde los checks (`counted`) y coinciden. `score` = round(100·pass/scored): content 6/7 → **86** (nivel 5), igual que F3, sin cambios; all-ui 10/15 → **67** (nivel 4) frente a 60 en F3, y el **único** check que cambia es `webMcp` fail → pass, con el mensaje «Found 4 WebMCP tools via document.modelContext: search_guides, read_guide, evaluate_quality_of_life, recommend_mobility_aids». Fails restantes en all-ui: `dnsAid`, `oauthDiscovery`, `oauthProtectedResource`, `authMd` y `mcpServerCard`. `comparacion-*.json`: `before.responseSha256` = el `responseSha256` del summary F3, `after` = el `manifest.json` F4A, `comparable:true`, deltas 0 y +7. Las cifras de `resultado.md` coinciden con todo esto. **CLI congelada:** `scripts/agent-readiness/index.mjs` `e2ea8f3db000e241…` y `shared.mjs` `89581c2a8750946f…` son iguales en `aad2a66`, `eff4ce1`, `main` y `ab022b7`. **Un scan por perfil:** cada perfil tiene un único `summary` y un único `response.raw.json`, con `scannedAt` 22:54:49Z y 22:54:54Z, y el `indice-originales.json` registra exactamente uno por perfil. Las copias publicadas (summaries, manifests, requests, comparaciones y los JSON de gates) tienen el mismo SHA-256 y tamaño que el índice. No lancé scans (ver Limitaciones) |
| 5 | Afirmaciones de los documentos | **FAIL** | Ver **B1**. El resto es coherente: `resultado.md` y `recibo-produccion.json` dicen «PASS según el autor» y «pendiente de auditoría», no usan el check `in_progress` como prueba y sus cifras coinciden con la evidencia. `plan.md` (línea 7 y tabla) y la cabecera de la SDD distinguen implementación aceptada (F4A-1 y F4A-2 PASS 1/5), preview y producción (`35e2c158`, auditoría pendiente). `2/cierre.md` dice «No está publicada», lo que era correcto en su fecha, antes del push. `propuesta.md` conserva su texto original y marca el estado «autorizada y ejecutada». La autorización del propietario («Pushea a main») sólo consta en los documentos de la sesión coordinadora; no la puedo verificar de forma independiente (Limitaciones) |

## Bloqueantes

### B1 — El README del programa afirma que F4A está pendiente de publicación

- **Ubicación:** `docs/agent-readiness/README.md`, línea 49, en la sección «Estado actual y continuación», en `ab022b7`. Texto: «Actualización posterior: F4A especificada en su SDD ; SDD ratificada tras el ciclo 2 e implementación aceptada, **pendiente de publicación**; F4B–F6 siguen planificadas.»
- **Problema:** la evidencia que audito, y mi propia comprobación de producción, muestran que F4A **está publicada** desde el 2026-10-12 (`main` = `35e2c15`, producción byteidéntica). El mismo README, en la línea 19, dice «publicada en producción en `35e2c158`», así que el documento de estado del programa se contradice sobre el hecho que esta auditoría verifica. Esa frase la escribió `2d8dfdc` antes del push, y `ab022b7`, que registra la publicación, no la actualizó.
- **Reproducción:** `git show ab022b7:docs/agent-readiness/README.md | sed -n '19p;49p'`.
- **Por qué bloquea:** el punto 5 del encargo exige que README, `plan.md`, `resultado.md`, recibo y SDD no afirmen nada que la evidencia no respalde y que distingan implementación, preview y producción. Una afirmación de estado que contradice la publicación en el README «Estado actual» incumple ese punto. No afecta al producto ni a los gates.
- **Condición de resolución:** un commit **sólo de documentación** en el que la línea 49 deje de decir «pendiente de publicación» y sea coherente con la línea 19, es decir, publicada en `35e2c158` con la auditoría de publicación pendiente o resuelta. No hace falta repetir ningún gate, scan ni prueba en producción. Recomendación no exigida: en la línea 43 de la misma sección, «Producto main `aad2a66`» describe el cierre F3; conviene marcarlo como estado F3 o actualizarlo, para que no se lea como el `main` actual.

## Observaciones no bloqueantes

1. **Métodos no seguros en producción.** `http-matrix-produccion.json` muestra que el autor envió a producción `POST /api/agent/v1/tools/calidad-vida?…` y `DELETE /api/agent/v1/tools/movilidad` (los dos 405, sin cuerpo), aunque `propuesta.md` paso 3 limitaba P4A-01 a «sólo GET/HEAD/OPTIONS». No tuvo efectos, porque el Worker responde 405 sin procesar nada, y el 405 es un error que la SDD §7 pide comprobar. Aun así, la propuesta autorizada y la ejecución difieren en este detalle. Por eso mi reejecución excluyó esos dos casos (26/28).
2. **Check de deploy abierto.** El check `115042365837` de Workers Builds de `main` sigue `in_progress` (lo confirmé). La identidad por contenido (326/326, salvo `startedAt`) prueba que producción sirve el candidato, y el recibo lo declara así; hay precedente en F3.
3. **Consola del navegador en 4xx transmitidos.** Es la misma situación que la observación 3 de F4A-2, inherente a contratos §5.3.2.
4. **`sourceCommit` de los summaries.** Es `2d8dfdc` (checkout de documentación). Su código, sin `docs/`, es idéntico a `35e2c15` (`git diff --name-only 2d8dfdc 35e2c15 -- . ':!docs'` vacío). `deploymentCommit` es `null` por diseño de la CLI. `resultado.md` lo explica correctamente.
5. **El archivo de recibos funciona.** `2/recibo-preview-vigente.json` recoge la observación 1 de F4A-2, y mi informe F4A-2 R1 está archivado byteidéntico (`cmp`).

## Limitaciones

- **Autorización del propietario.** Consta en `recibo-produccion.json` y `resultado.md` como un mensaje en la sesión coordinadora. No tengo acceso a esa conversación, así que la registro como declarada.
- **Originales de los scans.** Los `response.raw.json` son privados. Verifiqué la cadena de hashes (summary → `responseSha256` → manifest → índice), pero no su contenido. Que hubo exactamente un scan por perfil lo verifico a partir de los artefactos e índices, no del registro del evaluador. Siguiendo el encargo, no lancé scans.
- **Matriz HTTP.** La reejecuté sin los casos POST y DELETE por la restricción de métodos (observación 1). El 405 en producción lo tomo de la evidencia del autor y de la lectura del código auditado.
- **Navegador con proxy.** Mis pruebas de navegador en producción pasaron por el proxy del agente con TLS verificado (CA en el almacén NSS). Bloqueé los terceros con `route`.
- **Ficheros en el scratchpad:** `prod-identity.tsv`, `prod-identidad-auditor.json`, `http-matrix-safe.mjs` → `http-matrix-prod-auditor.json`, `webmcp-auditor-prod-*.json`, `ui-parity-f4a-prod-*.json` y `p4a03-check.mjs`.

## Dictamen final

**FAIL**, sólo por **B1** (documental). Lo técnico de la publicación pasa en mi verificación independiente:

- La cadena de promoción es un fast-forward exacto del código auditado.
- Producción sirve `35e2c15` byte a byte.
- P4A-01 y P4A-02 se reproducen.
- P4A-03 es coherente y comparable con F3: content 86 (Δ0), all-ui 67 (Δ+7, `webMcp` pass).

Para resolver B1 basta un commit sólo de documentación que corrija la línea 49 del README, sin repetir gates. La revisión 2 lo comprobará.
