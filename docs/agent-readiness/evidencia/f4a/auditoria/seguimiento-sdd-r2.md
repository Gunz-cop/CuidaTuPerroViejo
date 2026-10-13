# Auditoría independiente SDD del seguimiento F4A (D33–D35) — revisión 2/2 (última)

| Campo | Valor |
|---|---|
| Intento | **2 de 2** (FAIL = STOP) |
| Objeto | `docs/agent-readiness/fases/f4a-seguimiento.md` |
| Commit auditado | `78f4d120cfdbce5260fe2dc54c6849a73474172a` (`git fetch` + checkout exacto; HEAD verificado; `git ls-remote`: `refs/heads/agent-ready/f4a-seguimiento` = este SHA) |
| Tree auditado | `de78460ecd0d7dda69c09df10bef24262a5aaf87` |
| Diff contra R1 | `072e8af..78f4d12`: 1 commit; sólo `fases/f4a-seguimiento.md` y el R1 archivado. Desde la base `9c96847` sólo cambian esos dos ficheros de `docs/`. `main` sigue en `35e2c1583f197cb0f5e7a878a5227f39897740b7` |
| R1 archivado | `evidencia/f4a/auditoria/seguimiento-sdd-r1.md`: `cmp` contra mi original = **idéntico** (10693 bytes, sha256 `6b36064dae4def81044df2c8df195d2bb9a44cac0538a2072adb1642dad64622`) |
| Sesión auditora | `session_011k5uFc2VrmGa3CVCgb2eSm` (la misma de R1), distinta del autor |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (`get_session` en R1; sin fallback desde entonces), esfuerzo `high` |
| Fecha | 2026-10-13 (UTC) |
| Alcance | El mismo de R1, sobre el documento completo. Sólo bloqueantes. Sin commits, push, despliegues ni correcciones |

## Cierre de los bloqueantes de R1

| R1 | Estado | Verificación |
|---|---|---|
| **B1** chips de `#qol-intro` | **Resuelto** | Ver el detalle debajo de la tabla |
| **B2** C4A-17 imposible en la calculadora | **Resuelto** | Ver el detalle debajo de la tabla |
| **B3** ficheros fuera de la propiedad | **Resuelto** | §5 añade `agent-api.mjs` (sólo la versión `1.1.0`→`1.2.0`, que es la que fija la línea 239), `tools-ui-parity.mjs` (vectores), `webmcp-browser.mjs` (C4A-17, SHA-256 de los JS pedidos y vectores de C4A-15) y el script de comparación de (c) en `evidencia/f4a/seguimiento/`. Las demás expectativas que fijan `1.1.0` (`f3-contracts.test.mjs:39`, `f4a-contracts.test.mjs:27`) son tests y quedan cubiertas por «tests y fixtures afectados». El fixture legado `fixtures/f4a/legacy/*.astro.txt` es un oráculo verificado por hash de blob y no se compara con el marcado actual, así que no tiene que cambiar |

Detalle de B1:
- §2 fija cuatro textos con la frase completa resultante, y §5, C4A-16 y el rollback los incluyen.
- Comprobé contra el fuente de `9c96847` que cada cadena «antes» de los tres textos de la FAQ y de los tres chips aparece **exactamente una vez**: la sustitución es inequívoca.
- La nueva redacción de los chips (`> 50 Buena`, `36–50 Aceptable`, `≤ 35 Comprometida`) coincide con la regla sobre sumas enteras.
- Se declara la actualización de `projection.test.mjs:81` y del fixture F2, que son los únicos tests que fijan los textos anteriores.

Detalle de B2:
- C4A-17(a) compara lo que se pide con el cierre transitivo de imports estáticos de los `<script src>` de fuera del `<template>`. En mi prototipo de R1 (Chrome 155 sin flag sobre `9c96847` + D34) eso da la igualdad exacta en la home (`CanineAiAssistant`) y en la calculadora (`CanineAiAssistant`, script de la página, `calidad-vida` y `contract`).
- La lista de (b) coincide con el grafo de chunks real del build.
- Para (c) construí `aad2a66` en el clon del scratchpad (exit 0). La home, la política editorial y la guía de Cushing sólo cargan `CanineAiAssistant.astro_astro_type_script_index_0_lang.BGkTvlqC.js` (sha256 `75386c46…981a`). Es el mismo fichero con hash de contenido que en `9c96847`, de modo que (c) es satisfacible y verificable.

**Observaciones de R1:**
- La 1 (`band` documenta `>` y «usar `band`»), la 2 (textos completos), la 3 (el 50 se atribuye al sitio, no a Villalobos), la 4 (`htmlSha256` frente a Markdown), la 5 (todos los pasos del job «Criterios de aceptación») y la 6 (referencia `aad2a66`) quedan incorporadas.
- No introducen contradicciones con la SDD F4A ni con los contratos F2/F3.
- Mantener `agent-api/1` y los `const` de `thresholds` con semántica exclusiva, más OpenAPI `1.2.0`, sigue siendo aceptable.

## Bloqueantes

Ninguno.

## Observaciones no bloqueantes

1. §2.1 sitúa el texto del JSON-LD en la «segunda pregunta», pero el `FAQPage` de la base tiene **una sola** pregunta. La sustitución sigue siendo inequívoca porque la frase anterior completa es única en el fuente; conviene corregir el localizador.
2. La aserción nueva de `projection.test.mjs` debe fijar los chips «tal como los serializa la proyección». Es previsible que `>` al inicio de línea salga escapado (`\>`), igual que hoy `<` sale como `\<`. Lo correcto es tomar el valor del fixture regenerado por la herramienta, como ya dice §2.

## Limitaciones

- Sin workerd, preview, la suite de CI ni scans. No probé Chromium 141.
- Para (c) comparé los JS referenciados en el HTML construido y sus hashes de contenido; no medí con navegador las peticiones del build `aad2a66`.
- La verificación de B2 se apoya en el prototipo y las mediciones de R1 (`c4a17-probe.mjs`, sha256 `a0b9313c…fedb`; salida `a9465058…cf58`).

## Dictamen

**PASS** — sin bloqueantes en el snapshot `78f4d120cfdbce5260fe2dc54c6849a73474172a` (tree `de78460ecd0d7dda69c09df10bef24262a5aaf87`).
