# Auditoría del selector de movilidad: ronda 5

- **Herramienta:** `/herramientas/selector-movilidad-perros-mayores`
- **Commit auditado:** `50c5b2b` (en `origin/main`), «fix(movilidad): recuperar salvedades editoriales perdidas en el merge (auditoría r4)»
- **Delta revisado:** `git show 50c5b2b` (11 archivos) y el estado final de página, componente, `src/lib/agent-tools/movilidad.ts`, FAQ JSON-LD y `src/content/blog/ulceras-presion-perros.mdx`
- **Fecha:** 2026-10-18. Es la 5.ª ronda y la autorizó expresamente el propietario.
- **Rol:** auditor externo. No he corregido nada.

## Veredicto

**APTA.**

Los siete puntos que pidió la ronda 4 (I1–I3, M1–M4) están corregidos, y también el opcional sobre LA y MA. Los cambios coinciden en la UI, la API/MCP, el oráculo, el ejemplo de contrato y el golden F2. No hay regresiones de las rondas 1–3 ni de la corrección editorial de `main`. Todas las verificaciones salen en verde. Lo que queda son tres detalles menores de redacción y trazabilidad que no bloquean.

## Seguimiento de la ronda 4

| Hallazgo | Estado | Evidencia |
|---|---|---|
| I1. Higiene en SB («para evitar dermatitis») | Corregido | `src/lib/agent-tools/movilidad.ts:92`: «Revísalos y cambia los húmedos o sucios; consulta si la piel se irrita.», idéntico a la alerta (`:102`). No aparece «evitar dermatitis» en `dist/`. |
| I2. FAQ de la silla con «apetito y ganas» | Corregido | `selector-movilidad-perros-mayores.astro:26`: «Puede valorarse… la indicación depende del diagnóstico, el dolor y una prueba de ajuste con el veterinario, no solo del apetito o las ganas de moverse». Se conservan COAST y Narum. El JSON-LD sale del mismo array, y el HTML compilado (`dist/client/herramientas/selector-movilidad-perros-mayores.html`) y la proyección `tool--movilidad.md` llevan el texto nuevo. |
| I3. Rampa como indicación automática | Corregido | `.astro:30`: «coméntalo con tu veterinario; la rampa suele ser más fácil de tolerar». `movilidad.ts:58`: «si le cuesta, valora la rampa». |
| M1. Encabezado «ayuda exacta» | Corregido | `src/components/tools/MobilityTool.astro:33`: «Exploremos opciones de apoyo para tu perro». |
| M2. Tono prescriptivo en LA y MA (opcional) | Corregido | `movilidad.ts:34` («Puede necesitar… valora… si se ajustan bien: no sirven a todos los perros») y `:54` («Puede necesitar… Consulta con tu veterinario… pide que te enseñen a ajustar el arnés»). Lo confirman las capturas `LA-*.png` y `MA-*.png`. |
| M3. Oráculo huérfano `editorial-2026-10-16.json` | Corregido | El archivo se eliminó. En `tests/agent-readiness/fixtures/f4a/` solo quedan `movilidad-v1.1.json` y `legacy/`. Ver la nota N2 sobre una referencia histórica. |
| M4. Texto del enlace a la guía de úlceras | Corregido | `.astro:175`: «explica qué pedir al veterinario y cómo moverlo con cuidado», coherente con `ulceras-presion-perros.mdx:44-50` (plan escrito, sin intervalo universal). |

`lastReviewed` pasa a `2026-10-18` (`movilidad.ts:117`) porque hubo cambios de contenido en esa fecha, como pedía la instrucción 8. Los cambios están documentados en `docs/herramientas/movilidad-revision-1.1.md:85-91`.

## Coherencia final

| Tema | Página | Componente/alerta | API/MCP | FAQ JSON-LD | Guía de úlceras | Estado |
|---|---|---|---|---|---|---|
| Higiene | `.astro:176` «cambiados en cuanto se mojen» | Alerta: «Revísalos y cambia…» | SB why = alerta | — | sin garantía | Coherente (ver N1) |
| Silla | FAQ condicionada | — | SA/SB: ajuste por rehabilitador y revisión diaria de la piel | Igual que la página | — | Coherente |
| Rampa | «coméntalo con tu veterinario» | — | «valora la rampa» | Igual que la página | — | Coherente |
| Postura | Plan individual; 2–4 h solo como referencia (decisión n.º 3) | Plan individual | Igual que el componente | — | «No existe… intervalo universal» | Coherente |
| Aviso general | — | «no diagnostican ni prescriben un dispositivo» (visible en las capturas) | `notices[0]` | — | — | Coherente; la paridad lo confirma |
| Urgencia | Sección fija | SA/SB: «llévalo hoy al veterinario» | Igual que el componente | — | — | Conservado |

**Rondas 1–3:** se conservan «Apoyo total», el aviso de urgencia en SA y SB, «Revisa también los cuidados diarios de este resultado», el ajuste por un rehabilitador o un veterinario con formación en rehabilitación, y Caraty descrito como estudio de laboratorio con cadáveres (`.astro:172`).

**Corrección editorial de `main`:** se conservan el aviso general, la higiene, la etiqueta del enlace, la descripción, la nota de responsabilidad y el plan individual. Los hallazgos R1 n.º 1, 2, 4 y 6 de `docs/seo/correccion-editorial-2026-10-16/auditoria-movilidad-catalogo-r1.md` vuelven a estar aplicados. Los n.º 3 y 5 no reaparecen.

**Tono:** no hay cuenta atrás ni alarma. Cada resultado lleva a una acción y remite al veterinario.

## Hallazgos nuevos

No hay bloqueantes ni importantes.

### Menores

**N1. La higiene se redacta de dos formas.** `selector-movilidad-perros-mayores.astro:176` dice «cambiados en cuanto se mojen», mientras que la alerta y SB dicen «Revísalos y cambia los húmedos o sucios». No se contradicen y la frase de la página no promete ninguna garantía, pero no es literalmente homogénea. Opcional: «revisados y cambiados si están húmedos o sucios».

**N2. Una referencia histórica apunta a un archivo eliminado.** `docs/seo/correccion-editorial-2026-10-16/auditoria-adicional-final.md:39` lista el SHA256 de `tests/agent-readiness/fixtures/f4a/editorial-2026-10-16.json`, que ya no existe. Es un registro de evidencia fechado, así que no debe reescribirse. Como mucho, puede añadirse una nota de que el archivo se eliminó en `50c5b2b`.

**N3. La descripción de SA conserva «Tu perro necesita apoyo total»** (`movilidad.ts:76`). La ronda 4 no lo pidió y el nivel severo lo justifica: es una descripción del nivel, no la prescripción de un dispositivo. Solo lo anoto por homogeneidad con LA y MA.

**Captura:** en `MA-390.png`, la barra fija tapa el paso 3. Es un efecto de capturar solo el elemento con la barra en `position: fixed`, el mismo que se vio en la ronda 4. Las rondas anteriores validaron la barra en la página completa.

## Verificaciones

| Comprobación | Resultado |
|---|---|
| `npx astro build` | OK |
| `npm test` | 107 pass, 0 fail |
| `node --test tests/agent-readiness/*.test.mjs` | 77 pass, 0 fail |
| `agent-api.mjs check --build-dir dist` | OK (contratos F3/F4A y datos de herramientas) |
| `projection-semantic.mjs dist` | PASS (32 documentos) |
| `npx astro check` | 0 errores, 0 advertencias (61 hints) |
| Paridad UI↔API (`/tmp/claude-0/parity-r5.json`) | PASS: 36 casos, 0 diferencias (Chrome 141) |
| Capturas LA, MA, SA y SB a 390 y 1366 px (`/tmp/claude-0/auditoria-movilidad-r5/`) | Textos nuevos visibles y consola sin errores |

Casos reproducidos: L+A da LA, M+A da MA, S+A da SA y S+B da SB. Los títulos y descripciones coinciden con `RESULTS`.

## Propuestas para el propietario

- **P1:** si quiere homogeneidad total, aplique N1 y N3 en una corrección menor. No hace falta otra auditoría.
- **P2:** como ya se señaló en la ronda 4, la referencia de «2–4 h» de la página (decisión n.º 3) es compatible con la guía de úlceras. No propongo cambiarla.

## Instrucciones para una sesión que corrija (opcional)

1. `src/pages/herramientas/selector-movilidad-perros-mayores.astro:176`: cambia «cambiados en cuanto se mojen» por «revisados y cambiados si están húmedos o sucios».
2. Opcional: añade una nota en `docs/seo/correccion-editorial-2026-10-16/auditoria-adicional-final.md` de que el oráculo se eliminó en `50c5b2b`, sin tocar los hashes.
3. Si se cambia N3 (`movilidad.ts:76`), regenera `movilidad-v1.1.json`, el ejemplo de contrato y el golden F2, y vuelve a ejecutar las verificaciones de la tabla.
