# Auditoría del selector de movilidad: ronda 4 (post-merge)

- **Herramienta:** `/herramientas/selector-movilidad-perros-mayores`
- **Commit auditado:** `679fe15` (merge de `main` en `herramientas/movilidad-rediseno`; coincide con `origin/main` en el momento de la auditoría)
- **Delta revisado:** `git diff 8ec4572 679fe15 -- src tests docs/herramientas docs/agent-readiness/evidencia/f4a`, limitado a lo que afecta a movilidad
- **Fecha:** 2026-10-17. Es la 4.ª ronda y la autorizó expresamente el propietario.
- **Rol:** auditor externo. No he corregido nada.

## Veredicto

**APTA CON CAMBIOS.**

La integración de lo que el propietario pidió explícitamente es correcta y coherente entre la UI, la API/MCP, el ejemplo de contrato y el fixture: aviso general, higiene en la alerta, etiqueta del enlace, descripción, nota de responsabilidad y plan individual de cambios de postura. Todas las verificaciones técnicas salen en verde.

Pero el merge tomó la tabla `RESULTS` y la FAQ de la versión 1.1 completas. Con eso se perdieron varias correcciones de la corrección editorial de `main` (hallazgos 1, 2, 4 y 6 de `docs/seo/correccion-editorial-2026-10-16/auditoria-movilidad-catalogo-r1.md`). Una de esas pérdidas crea una contradicción visible dentro del mismo resultado SB. No hay ningún problema de seguridad clínica grave: todos los resultados severos conservan el aviso de urgencia y la alerta de cuidados. Por eso no es NO APTA.

## Hallazgos

### Importantes

**I1. Contradicción en la higiene dentro del resultado SB (se perdió el hallazgo 6 de main).**
- Archivo: `src/lib/agent-tools/movilidad.ts:92`. El `why` de los pañales en SB dice «Cámbialos cada vez que estén mojados para evitar dermatitis.»
- En la misma pantalla, la alerta (`movilidad.ts`, `PALLIATIVE_ALERT.items[0]`) dice «Revísalos y cambia los húmedos o sucios; consulta si la piel se irrita.»
- Captura: `/tmp/claude-0/auditoria-movilidad-r4/SB-390.png` (alerta y plan, paso 3).
- La auditoría R1 de main pidió quitar «para evitar dermatitis» porque promete una garantía. `main` lo había corregido: lo comprueban `tests/agent-readiness/fixtures/f4a/editorial-2026-10-16.json` (SB.why[2]) y `d94557c:src/lib/agent-tools/movilidad.ts:90`.
- La API y el MCP devuelven también este texto (`tests/agent-readiness/fixtures/f4a/movilidad-v1.1.json`).

**I2. La FAQ sobre la silla de ruedas, visible y en JSON-LD, vuelve a usar el apetito y las ganas como criterio (se perdió el hallazgo 1 de main).**
- Archivo: `src/pages/herramientas/selector-movilidad-perros-mayores.astro:26`. El texto dice «Suele encajar en perros que … conservan fuerza en las delanteras, apetito y ganas de explorar.»
- `main` lo había sustituido por «No se decide solo por el apetito o por arrastrar las patas; necesita ajuste y prueba individual» (`d94557c`, FAQ JSON-LD l.74 y visible l.309).
- Ahora choca con el tono condicionado del nuevo aviso general («no … prescriben un dispositivo») y con la nota de responsabilidad (l.190).
- Atenuante: la frase de COAST que va justo antes («reservan los carros… para los casos más avanzados») está respaldada y la auditaron las rondas 1–3. El problema es solo el criterio de apetito y ganas, que suena a criterio de indicación.

**I3. Vuelven las indicaciones automáticas de rampa (se perdió el hallazgo 2 de main).**
- `selector-movilidad-perros-mayores.astro:30`: «Si le cuesta o cojea al bajar un escalón normal, empieza por la rampa.»
- `movilidad.ts:58` (MA, escaleras): «si le cuesta, mejor rampa.»
- `main` las había matizado hacia «ajuste, capacidad y tolerancia individuales».

### Menores

**M1. El encabezado sigue prometiendo una ayuda «exacta» (se perdió el hallazgo 4 de main).**
- `src/components/tools/MobilityTool.astro:33`: «Encontremos la ayuda exacta para tu perro.»
- Contradice la nueva descripción («orienta sobre opciones de apoyo») y el aviso general («no … prescriben un dispositivo»).

**M2. Quedan descripciones con tono prescriptivo sin las salvedades de main.**
- LA (`movilidad.ts:34`): «Tu perro necesita tracción segura…»
- MA (`:54`): «Necesita apoyo activo…»
- Frente a main («Consulta si necesita apoyo… Pide una demostración de ajuste»). Las rondas 1–3 las aceptaron en este tono. Lo anoto para que el propietario decida si quiere el tono homogéneo con main (ver P2).

**M3. El fixture `tests/agent-readiness/fixtures/f4a/editorial-2026-10-16.json` está huérfano.**
- Ningún test lo carga: solo `movilidad-v1.1.json` (`tests/agent-readiness/f4a-tools.test.ts:49`).
- Su contenido contradice el módulo actual: en `lastReviewed` (2026-10-16 frente a 2026-10-17) y en todas las `description` y `why`.
- `movilidad-revision-1.1.md` lo declara «sustituido», pero el archivo sigue en el árbol y puede confundir a la próxima sesión. Hay que borrarlo o añadir una nota de obsoleto en su ubicación o en el README de fixtures.

**M4. Texto del enlace a la guía de úlceras.**
- `selector-movilidad-perros-mayores.astro:175` dice «La guía de úlceras por presión explica cómo hacerlo sin causarle dolor.»
- La guía revisada (`src/content/blog/ulceras-presion-perros.mdx:44-50`) ya no da una técnica: pide un plan escrito y una demostración con el propio perro («No lo arrastres… Solicita una demostración»).
- La API ya cambió la etiqueta a «Cuidados y señales para consultar». Conviene alinear la frase, por ejemplo: «explica qué pedir al veterinario y cómo moverlo con cuidado».

## Coherencia de los textos combinados (punto 1)

| Tema | Página | Componente/alerta | API/MCP (`movilidad.ts`) | FAQ JSON-LD | Artículo de úlceras | Estado |
|---|---|---|---|---|---|---|
| Cambios de postura | Plan individual; 2–4 h solo como referencia (l.175) | Plan individual, sin intervalo | Igual que el componente | FAQ de la cama: «no la suficiente como para dejar de cambiarle de postura» | «No existe aquí un intervalo universal» (l.46) | Coherente. El 2–4 h de la página es una decisión del propietario (n.º 3) |
| Garantía frente a úlceras | «no hay un intervalo que garantice» | — | SA: «protegen su piel» | — | sin garantía | Aceptable |
| Higiene | «cambiados en cuanto se mojen» | Alerta: «Revísalos… consulta» | **SB why: «para evitar dermatitis»** | — | «no garantizan evitar infección» (l.70) | **I1** |
| Aviso general | — | `MOBILITY_NOTICES[0]` | `notices[0]` (parity OK) | — | — | Coherente |
| Responsabilidad editorial | Nota en l.190 | — | — | — | «sin revisión veterinaria individual» (l.92) | Coherente |
| Silla / indicación | FAQ l.26 (apetito) | «Encontremos la ayuda exacta» | — | Misma FAQ (sale del mismo array) | — | **I2, M1** |

La FAQ visible y la FAQ en JSON-LD salen del mismo array `faq`, así que no divergen entre sí.

## Correcciones conservadas o perdidas (punto 2)

- **Rondas 1–3 (1.1):** se conservan. Siguen en su sitio el nivel «Apoyo total», el aviso de urgencia en SA y SB, «Revisa también los cuidados diarios de este resultado», el ajuste por rehabilitador y Caraty descrito como estudio de laboratorio con cadáveres. `movilidad-v1.1.json` coincide con el módulo (los tests pasan).
- **Corrección editorial de main, conservado:** aviso general, higiene en la alerta, etiqueta del enlace, descripción meta, nota de responsabilidad y plan individual de postura.
- **Corrección editorial de main, perdido:** hallazgos R1 n.º 1 (I2), n.º 2 (I3), n.º 4 (M1), n.º 6 (I1, en SB) y el tono de las descripciones (M2).
- **Hallazgo R1 n.º 3 de main (sesiones de arnés de 20–30 min):** no reaparece. La FAQ del arnés no da duración.
- **Hallazgo R1 n.º 5 de main (cifras de sarcopenia y WSAVA):** no reaparece. La l.152 cita a Freeman 2012, que verificaron las rondas anteriores.

## Verificaciones (punto 3)

| Comprobación | Resultado |
|---|---|
| `npx astro build` | OK |
| `npm test` | 107 pass, 0 fail |
| `node --test tests/agent-readiness/*.test.mjs` | 77 pass, 0 fail |
| `agent-api.mjs check --build-dir dist` | OK (contratos F3/F4A y datos de herramientas) |
| `projection-semantic.mjs dist` | PASS (32 documentos) |
| `npx astro check` | 0 errores, 0 advertencias (61 hints) |
| Paridad UI↔API (`/tmp/claude-0/parity-r4.json`) | PASS: 36 casos, 0 diferencias |
| Capturas SA/SB a 390 y 1366 px (`/tmp/claude-0/auditoria-movilidad-r4/`) | La alerta se ve en ambos resultados severos, la nota muestra el aviso nuevo y la consola no tiene errores. En la captura del elemento a 390 px aparece la barra fija encima de la alerta, pero es un efecto de capturar solo el elemento con la barra `position: fixed`; las rondas anteriores validaron la barra en la página completa. |

Casos reproducidos: severe/calm da SA y severe/stressed da SB, las dos con alerta. Los 36 casos de paridad cubren las seis combinaciones.

## Propuestas para el propietario

- **P1 (decisión n.º 3):** el plan individual queda bien resuelto. La única fricción es que la página sigue citando «2–4 horas» y el artículo de úlceras dice que no existe un intervalo universal. Las dos frases son compatibles tal como están redactadas, porque la página lo presenta como referencia general. No propongo cambiarlo.
- **P2 (decisión n.º 1, versión 1.1 como base):** al elegir 1.1 como base se descartó en bloque el tono condicionado de main en `RESULTS`. Propongo que el propietario confirme si quiere recuperar, como mínimo, las salvedades de no garantía (I1–I3, M1). Esa decisión no exige volver al texto de main, que era más seco y menos útil.

## Instrucciones para la sesión que corrija (autocontenidas)

Trabaja en `herramientas/movilidad-rediseno` (o en una rama desde `679fe15`), nunca en `main`. No cambies las decisiones del propietario (`docs/herramientas/decisiones-del-propietario.md`).

1. `src/lib/agent-tools/movilidad.ts:92` (SB, pañales): sustituye el `why` por «Para la higiene. Revísalos y cambia los húmedos o sucios; consulta si la piel se irrita.» Actualiza `tests/agent-readiness/fixtures/f4a/movilidad-v1.1.json` y comprueba si `docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json` (ejemplo severe/stressed) incluye el plan, para regenerarlo.
2. `src/pages/herramientas/selector-movilidad-perros-mayores.astro:26`: cambia «Suele encajar en perros que … conservan fuerza en las delanteras, apetito y ganas de explorar» por una formulación condicionada, por ejemplo: «Puede valorarse en perros que ya no sostienen bien las patas traseras pero conservan fuerza en las delanteras; la indicación depende del diagnóstico, el dolor y una prueba de ajuste con el veterinario, no solo del apetito o las ganas». Conserva COAST y Narum.
3. `selector-movilidad-perros-mayores.astro:30`: cambia «Si le cuesta o cojea al bajar un escalón normal, empieza por la rampa» por algo como «Si le cuesta o cojea al bajar un escalón, coméntalo con tu veterinario; la rampa suele ser más fácil de tolerar». En `movilidad.ts:58`, cambia «si le cuesta, mejor rampa» por «si le cuesta, valora la rampa».
4. `src/components/tools/MobilityTool.astro:33`: cambia «la ayuda exacta» por «opciones de apoyo para tu perro» o algo equivalente.
5. `selector-movilidad-perros-mayores.astro:175`: cambia «explica cómo hacerlo sin causarle dolor» por «explica qué pedir al veterinario y cómo moverlo con cuidado».
6. Borra `tests/agent-readiness/fixtures/f4a/editorial-2026-10-16.json` o márcalo como obsoleto. Ajusta la línea correspondiente de `docs/herramientas/movilidad-revision-1.1.md`.
7. Opcional, solo si el propietario lo aprueba (P2): suaviza las descripciones de LA (`:34`) y MA (`:54`) con «puede necesitar» o «consulta».
8. Si cambias textos de la API, actualiza `lastReviewed` solo si hay un cambio de contenido en la fecha de la corrección. Vuelve a ejecutar: `npx astro build`, `npm test`, `node --test tests/agent-readiness/*.test.mjs`, `node scripts/agent-readiness/agent-api.mjs check --build-dir dist`, `node tests/agent-readiness/projection-semantic.mjs dist`, `npx astro check` y la paridad (`tools-ui-parity.mjs`).
9. Pide una 5.ª auditoría solo si el propietario la autoriza.
