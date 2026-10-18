# Selector de movilidad: revisión 1.1 (2026-10-17)

Cambio de contrato autorizado por el propietario. Afecta a la web, a la API
(`/api/agent/v1/tools/movilidad`) y al MCP/WebMCP, que leen los mismos datos
de `src/lib/agent-tools/movilidad.ts`.

## Qué no cambia

- Entradas (`level`, `handling`), sus valores, claves de resultado `LA`…`SB`,
  estructura de la respuesta (`schemaVersion` `agent-api/1`) y nombre de los
  campos (incluido `palliativeAlert`).
- Número y orden de pasos de cada plan (las URLs de afiliado, ocultas, siguen
  alineadas por índice).
- Aviso general, guía enlazada e IDs `m5*` de la interfaz.

## Qué cambia

| Punto | Antes (1.0) | Ahora (1.1) | Motivo |
| --- | --- | --- | --- |
| Versión / revisión | `1.0` · 2026-05-14 | `1.1` · 2026-10-17 | La página y la API muestran la misma fecha (sale de `MOBILITY_TOOL`). |
| Etiqueta del nivel severo | «Cuidado paliativo» | «Apoyo total» | Una silla de ruedas no implica final de vida. |
| Título del aviso severo | «Cuidado paliativo importante» | «Cuidados diarios si ya no se levanta solo» | Mismo motivo; tono cálido. |
| Cambios de postura | «cada 4 horas» | «cada 2 a 4 horas, y más a menudo si es delgado o su cama es dura» | Caraty 2019: la espuma reduce la presión pero no basta, y es mayor en perros delgados. 2–4 h es pauta de enfermería veterinaria. |
| Dolor | «Evalúa si hay dolor controlado con…» | «Pide a tu veterinario que valore si su dolor está bien controlado, y sigue su bienestar con…» | WSAVA 2022: el dolor lo valora el veterinario; la HHHHHMM sirve para seguimiento. |
| Silla de ruedas | «Fundamental para su calidad de vida» | Solo si conserva fuerza delante; que la ajuste un profesional; rozaduras como complicación más frecuente | Narum 2024: mejor calidad de vida según cuidadores, pero complicaciones en el 60 % de los perros (sobre todo heridas). La encuesta no muestra que el ajuste veterinario las reduzca (72 % frente a 47 %, en parte casos más graves y formación veterinaria desigual, según los autores): se recomienda como buena práctica, sin atribuirlo al estudio. |
| Cama ortopédica | «Previene úlceras/llagas» | «Reparte el peso y reduce la presión» | Caraty 2019 mide menos presión, no prevención; no hay ensayo controlado de camas. |
| Urgencia en nivel severo | No se mencionaba | Primera frase de la descripción de SA y SB: si perdió la fuerza de golpe (horas o pocos días), al veterinario hoy (el schema público fija 3 puntos en el aviso) | Auditoría 2026-10-17 (B2): una pérdida súbita puede ser una urgencia tratable (p. ej., hernia discal). |
| Orden del resultado | Aviso antes del título | Título y descripción primero; el aviso justo debajo | Auditoría (I4): en móvil el título quedaba tapado. |
| Calcetines/botas | Sin advertencias | Solo para caminar, retirar para descansar | Sin evidencia publicada sobre calcetines; COAST prioriza el suelo. |
| Arnés | «Te protege la espalda» | Paseos y salidas, no todo el día; revisar ingles | Rozaduras por uso continuo. |
| Escaleras adaptadas | «Más compactas» | Exigen doblar articulaciones: si le cuesta, mejor rampa | Coherencia con la FAQ. |
| Alfombras (LB) | «Elimina el riesgo» | «Reduce mucho el riesgo» | Sin sobreafirmar. |

## Fuentes (verificadas en Crossref/PubMed el 2026-10-17)

Lista con DOI y uso en `src/lib/mobility-sources.ts`: COAST 2023, AAHA 2023,
WSAVA 2022, Narum 2024, Caraty 2019 y Freeman 2012.

Descartadas por no verificables o comerciales: el estudio de camas de la
UPenn (piloto sin control, publicado por el fabricante) y los estudios de
ToeGrips (no se encontró la publicación).

## Pruebas actualizadas

- `tests/agent-readiness/f4a-tools.test.ts`: el oráculo de resultados de
  movilidad pasa de la página legada a la tabla congelada
  `fixtures/f4a/movilidad-v1.1.json`. Las opciones y las URLs de afiliado se
  siguen comparando con la base legada `eff4ce1`.
- `docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json`:
  ejemplo regenerado con la respuesta 1.1.
- Golden F2 `tool--movilidad` regenerado.
- Paridad UI↔API (`tools-ui-parity.mjs`): 36/36 casos sin diferencias.

## Correcciones tras la auditoría del 2026-10-17

Informe: [`auditorias/selector-movilidad-2026-10-17.md`](auditorias/selector-movilidad-2026-10-17.md).
Se corrigieron B1, B2, I1–I4 y los menores 1–6 y 11. El aviso mantiene
`role="alert"` porque la proyección y `agent-api.mjs` lo exigen
(`#m5alert[role=alert]`); cambiarlo es un trabajo de contrato aparte (menor 7).
Los menores 8–10 quedan como propuestas para el propietario (P2, P3).

## Correcciones tras la ronda 2 (2026-10-17)

Informe: [`auditorias/selector-movilidad-2026-10-17-r2.md`](auditorias/selector-movilidad-2026-10-17-r2.md).
N1: las dos explicaciones de los autores (casos más difíciles y poca formación
veterinaria en estos dispositivos); el contrato recomienda «un rehabilitador o
un veterinario con formación en rehabilitación». N2: aviso de urgencia fijo en
la sección «Si ya no se levanta solo». M1–M5 aplicados; «Revisa también los
cuidados diarios de este resultado» sustituye a «justo debajo» (también en la API).

## Integración con la corrección editorial de `main` (2026-10-17)

Al fusionar `main` (PR #117 y #120, corrección editorial 2026-10-16) se
conservó esta versión 1.1 como base y se incorporaron de `main`: el aviso
general («Estas opciones orientan preguntas para el veterinario…»), la higiene
(«Revísalos y cambia los húmedos o sucios…»), la etiqueta «Cuidados y señales
para consultar», la descripción de la página y la nota de responsabilidad
editorial. Por decisión del propietario, los cambios de postura pasan a un
**plan individual**; 2–4 h queda solo como referencia general en la página.
El oráculo `editorial-2026-10-16.json` de `main` se eliminó: lo sustituye
`movilidad-v1.1.json`.

## Correcciones tras la ronda 4 post-merge (2026-10-18)

Informe: [`auditorias/selector-movilidad-2026-10-17-r4-postmerge.md`](auditorias/selector-movilidad-2026-10-17-r4-postmerge.md).
Se recuperan las salvedades de la corrección editorial de `main` que el merge
había perdido: higiene de SB igual que la alerta, FAQ de la silla sin el
criterio «apetito y ganas», rampa como opción a valorar y no indicación
automática, encabezado «Exploremos opciones de apoyo», descripciones de LA y MA
condicionadas y enlace a la guía de úlceras acorde con su contenido.
`lastReviewed` pasa a 2026-10-18.
