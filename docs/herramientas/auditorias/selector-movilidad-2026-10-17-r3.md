# Auditoría, ronda 3 (final): Selector de ayudas de movilidad (2026-10-17)

- **Herramienta:** `/herramientas/selector-movilidad-perros-mayores`
- **Rama / commit auditado:** `herramientas/movilidad-rediseno` @ `b090d68` («fix(movilidad): corregir hallazgos de la ronda 2 de auditoría»)
- **Ronda:** 3 de 3, la última permitida. Rondas previas: [ronda 1](selector-movilidad-2026-10-17.md) (NO APTA) y [ronda 2](selector-movilidad-2026-10-17-r2.md) (APTA CON CAMBIOS).
- **Skill aplicada:** `.agents/skills/auditar-herramienta-interactiva/SKILL.md`. También se leyeron `crear-herramienta-interactiva`, `docs/herramientas/decisiones-del-propietario.md` y `docs/herramientas/movilidad-revision-1.1.md`.
- **Auditor:** sesión externa, distinta de la que construyó y de las que corrigieron. No ha tocado el código.

## Veredicto

**APTA** (en la escala de la skill: `LISTA`).

N1 (importante), N2 y los menores M1–M5 de la ronda 2 están corregidos y verificados contra la fuente y en el navegador. No hay bloqueantes ni importantes nuevos, y las correcciones no han introducido regresiones. Quedan dos observaciones menores y opcionales (R3-1 y R3-2) que no impiden fusionar, y el pendiente heredado de AAHA 2023, que solo puede cerrar alguien con acceso al texto completo.

## Verificaciones ejecutadas (sobre `b090d68`)

| Comprobación | Resultado |
| --- | --- |
| `npx astro build` | OK |
| `npm test` | OK, 103 pass / 0 fail |
| `node --test tests/agent-readiness/*.test.mjs` | OK, 77 pass / 0 fail |
| `node --test tests/agent-readiness/projection-growth.mjs` | OK, 2 pass |
| `node tests/agent-readiness/projection-semantic.mjs dist` | PASS, 32/32 |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | OK |
| `tools-ui-parity.mjs` (Chromium 141, preview :4322) | PASS, 36 casos UI↔API, 0 diferencias (`/tmp/claude-0/parity-r3.json`) |
| `npx astro check` | 0 errores |
| JSON-LD | `WebPage` (`citation` ×6), `BreadcrumbList`, `SoftwareApplication` 1.1, `FAQPage` (4 preguntas, iguales al texto visible, ya con el texto nuevo de N1) |
| `<figure>` en la página | 0 |
| Consola (6 resultados × 7 contextos: 390/820/1366, claro, oscuro, y `reduced-motion` a 390) | 0 errores |
| Scroll horizontal | Ninguno en los tres anchos |
| Foco tras el resultado | `#m5rtit` en todos los casos |
| Barra fija móvil | `right` = 306 px; no tapa el botón del asistente |
| Tarjetas descargadas | Las 6 (`tarjeta-LA…SB.png`, montaje `tarjetas-6.png`) |

Capturas en `/tmp/claude-0/auditoria-movilidad-r3/`: páginas completas a 390/820/1366 en claro y oscuro; resultados SA y SB en todos los contextos; los 6 resultados a 390 en claro; `390-light-rm-res-S*.png` (movimiento reducido); `390-light-res-SA-reposo.png` (flujo con pausas reales); las 6 tarjetas.

## Seguimiento de hallazgos previos

| Hallazgo | Estado | Evidencia |
| --- | --- | --- |
| **N1 (r2).** Explicación del 72 % frente al 47 % exagerada | **Corregido** | `selector-movilidad-perros-mayores.astro:26` (FAQ y `FAQPage`) y `:164`: «Los autores lo atribuyen en parte a que eran casos más difíciles y a que pocos veterinarios tienen formación en estos dispositivos». Narum 2024, §4 (texto completo, frontiersin.org): «This may **in part** be due to selection bias; more challenging cases may be more likely to present for veterinary care. **Another consideration is the variability of veterinary training.** Rehabilitation is not included in the core veterinary curriculum…». Recoge las dos explicaciones con el matiz «en parte». La recomendación práctica («busca a alguien con formación en rehabilitación») es un consejo propio, no se atribuye al estudio, y es coherente con la segunda explicación. `movilidad.ts:76` y `:88` cambian a «un rehabilitador o un veterinario con formación en rehabilitación»; oráculo 1.1, ejemplo de contrato y golden F2 regenerados; fila de `movilidad-revision-1.1.md` actualizada. Ver la observación R3-2 |
| **N2 (r2).** Urgencia ausente de la página estática y su proyección | **Corregido** | `:170`: párrafo fijo en negrita al inicio de `#si-no-se-levanta`. `:182`: «consulta cuanto antes…; si ha perdido la fuerza de las patas de golpe, ese mismo día». Presente en `dist/client/agent-content/v1/documents/tool--movilidad.md:74` y en el golden F2 |
| **M1.** «1.200 cuidadores» | **Corregido** | `:26` y `:160`: «más de 1.200 respuestas de cuidadores». Narum §3: «1,221 survey responses were available for review» |
| **M2.** Caraty sin decir que eran cadáveres | **Corregido** | `:172` y `mobility-sources.ts:53`: «con cadáveres de tres perros» |
| **M3.** La urgencia no destacaba | **Corregido** | `MobilityTool.astro:212` (`.mt__urgent`) y `:326-332`: en `S*` las dos primeras frases van en un bloque `<strong>` con fondo; el `textContent` no cambia (paridad 36/36). Contraste alto en claro (rgb 27,28,25 sobre beige) y oscuro (rgb 248,255,247 sobre marrón oscuro). Con pausas reales a 390×844 el título queda en y = 346 y el bloque termina en y = 570, por encima de la barra fija (y = 768) |
| **M4.** «Justo debajo» en la API | **Corregido** | `movilidad.ts:74` y `:86`: «Revisa también los cuidados diarios de este resultado.», válido en web, API y MCP |
| **M5.** Hueco en tarjetas cortas | **Corregido** | `MobilityTool.astro:423` (`imgH` hasta 580). En `tarjeta-LA.png` y `tarjeta-LB.png` la imagen crece y el hueco sobre el pie se reduce de forma visible; las 6 tarjetas son legibles y la SA conserva sus 4 pasos |
| Menor 7 (r1). `role="alert"` + `aria-live` | Deuda de contrato registrada | Sin cambios; justificado en `movilidad-revision-1.1.md` |
| Menor 12 (r1). AAHA 2023, texto completo | **Sigue parcial** | Metadatos correctos (JAAHA 59(1):1-21); el texto completo no es accesible desde este entorno. Lo debe confirmar el propietario o alguien con acceso. No bloquea: la afirmación (alfombras, tracción, acolchado) es genérica y la respaldan también COAST |
| P2, P3, P4 (r2) | Propuestas, sin cambios | Ver abajo |

## Hallazgos nuevos

### Bloqueantes

Ninguno.

### Importantes

Ninguno.

### Menores (opcionales)

- **R3-1. El bloque de urgencia depende de una cadena literal.** `MobilityTool.astro:328`: `r.description.indexOf('ya está valorado. ')`. Si alguien reescribe esa frase en `movilidad.ts`, el destacado desaparece sin que falle ningún test (el texto sigue llegando, solo pierde el estilo). Riesgo bajo. **Cambio opcional:** añadir un test que compruebe que las descripciones `SA` y `SB` contienen esa cadena, o mover el corte a una constante compartida.
- **R3-2. Pequeña diferencia de redacción entre la página y la API sobre quién ajusta la silla.** `selector-movilidad-perros-mayores.astro:164` empieza «Tu veterinario o un rehabilitador puede ajustar la altura…» y termina recomendando «alguien con formación en rehabilitación»; la API (`movilidad.ts:76`, `:88`) dice «un rehabilitador o un veterinario con formación en rehabilitación». No se contradicen, pero la primera frase de la viñeta podría alinearse: «Un rehabilitador o un veterinario con formación en rehabilitación puede ajustar…». Además, Narum §4 añade que «even with advanced rehabilitation training, assistive mobility cart fitting education is not standardized»; el texto no promete que la formación lo resuelva, así que es correcto tal como está.

### Nota de método (no es hallazgo)

En un primer barrido automático con clics sin pausa, a 390 px el resultado SA/SB a veces quedaba con el título en y ≈ 600–700 (el desplazamiento suave seguía en curso al tomar la medida). Repetido con pausas realistas (700 ms entre pasos, flujos `SA`, `SB` y `LA→SA→SB→MB`), el título queda siempre en y = 346 (402 en MB) y estable a los 300, 900 y 2000 ms. Con `reduced-motion`, también 346. No es un problema para una persona.

## Tabla de fuentes (ronda 3)

| Fuente | DOI | Cifra o afirmación | ¿Verificada? |
| --- | --- | --- | --- |
| Cachon et al. 2023, COAST, Front Vet Sci | 10.3389/fvets.2023.1137888 | Entorno primero, carros en casos avanzados | Sí (sin cambios) |
| Dhaliwal et al. 2023, AAHA, JAAHA 59(1):1-21 | 10.5326/JAAHA-MS-7343 | Alfombras, tracción, acolchado | Parcial (texto completo no accesible) |
| Monteiro et al. 2022, WSAVA, JSAP | 10.1111/jsap.13566 | El dolor crónico lo valora el veterinario | Sí |
| Narum, Miscioscia, Repac 2024, Front Vet Sci 11:1466405 | 10.3389/fvets.2024.1466405 | Más de 1.200 respuestas (1.221); 60 % de perros con complicaciones; heridas como la más frecuente; zonas; 72 % frente a 47 %; dos explicaciones de los autores | **Sí** (texto completo, §3, §4, tablas 4 y 5) |
| Caraty et al. 2019, JSAP 60(10):623-630 | 10.1111/jsap.13061 | Puntos de presión; espuma insuficiente; cadáveres de tres perros | Sí |
| Freeman 2012, JVIM 26(1):3-17 | 10.1111/j.1939-1676.2011.00838.x | Sarcopenia, pérdida de masa muscular | Sí |

## Casos reproducidos

Las 6 combinaciones en la UI (Playwright, 7 contextos), contra la API (paridad 36/36) y la tabla de la página, que sale de `RESULTS`.

| Entrada | Mostrado | Urgencia destacada | Aviso diario | Tarjeta |
| --- | --- | --- | --- | --- |
| LA | Calcetines y botas antideslizantes | No | No | 2/2, sin hueco excesivo |
| LB | Alfombras antideslizantes por toda la casa | No | No | 2/2 |
| MA | Arnés de soporte trasero + rampa de acceso | No | No | 3/3 |
| MB | Rampa de acceso + alfombras de ruta | No | No | 3/3 |
| SA | Silla de ruedas canina + cama ortopédica + soporte de cadera | Sí, bloque | Sí | 4/4 |
| SB | Silla de ruedas + cama ortopédica + entorno adaptado | Sí, bloque | Sí | 3/3 |

**Tono:** cálido. El bloque de urgencia es condicional («Este plan es para cuando ya está valorado») y no alarma. Ninguna cifra de cuenta atrás. Todos los resultados remiten al veterinario.

## Decisiones del propietario respetadas

Las cinco decisiones del selector (datos compartidos 1.1 y MCP; «Apoyo total» y «Cuidados diarios si ya no se levanta solo»; cambios de postura cada 2–4 h como pauta de enfermería; sin enlaces de afiliado; el mismo beagle en toda la app) se comprobaron y ninguna se trata como hallazgo.

## Propuestas para el propietario

- **P2 (heredada).** Registrar en `decisiones-del-propietario.md` si el selector se queda como asistente de una columna en escritorio (menor 8 de la ronda 1). Hoy no se ha marcado como fallo porque el formato asistente es razonable, pero la skill pide dos columnas.
- **P3 (heredada, sobre la decisión n.º 4).** Cuando existan las comparativas propias, enlazar cada resultado a la suya.
- **P4 (heredada).** Si una versión 1.2 del contrato añade un campo explícito de urgencia (`urgentNotice`), el destacado dejaría de depender del texto (cerraría también R3-1).
- **P5.** Confirmar con acceso al texto completo de AAHA 2023 que respalda alfombras, tracción y acolchado.

## Instrucciones para la sesión que corrija (opcional)

No hay correcciones obligatorias. Si se quiere pulir, en otra sesión:

1. **R3-1:** añadir en `tests/` una aserción de que `RESULTS.SA.description` y `RESULTS.SB.description` contienen «ya está valorado. ».
2. **R3-2:** en `src/pages/herramientas/selector-movilidad-perros-mayores.astro:164`, cambiar «Tu veterinario o un rehabilitador puede ajustar» por «Un rehabilitador o un veterinario con formación en rehabilitación puede ajustar»; regenerar el golden F2 `tool--movilidad`.
3. Verificar con `npx astro build`, `npm test`, `node --test tests/agent-readiness/*.test.mjs` y `node tests/agent-readiness/projection-semantic.mjs dist`.
