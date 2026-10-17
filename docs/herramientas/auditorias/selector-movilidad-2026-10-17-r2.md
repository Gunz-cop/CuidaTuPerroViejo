# Auditoría, ronda 2: Selector de ayudas de movilidad (2026-10-17)

- **Herramienta:** `/herramientas/selector-movilidad-perros-mayores`
- **Rama / commit auditado:** `herramientas/movilidad-rediseno` @ `e95c18f` («fix(movilidad): corregir hallazgos de la auditoría 2026-10-17»)
- **Ronda:** 2 de un máximo de 3. Ronda 1: [`selector-movilidad-2026-10-17.md`](selector-movilidad-2026-10-17.md) (NO APTA).
- **Skill aplicada:** `.agents/skills/auditar-herramienta-interactiva/SKILL.md`. También se leyeron `crear-herramienta-interactiva`, `docs/herramientas/decisiones-del-propietario.md` y `docs/herramientas/movilidad-revision-1.1.md`.
- **Auditor:** sesión externa, distinta de la que construyó y de la que corrigió. No ha tocado el código.

## Veredicto

**APTA CON CAMBIOS** (en la escala de la skill: `LISTA CON CAMBIOS MENORES`).

Los dos bloqueantes de la ronda 1 están corregidos. B1 ya no atribuye a Narum 2024 una conclusión contraria a su dato. B2 avisa de la urgencia en el resultado severo de la web, la API, el MCP, el texto para lectores de pantalla y el texto para copiar o enviar por WhatsApp. Los cuatro importantes también están corregidos. No hay bloqueantes nuevos.

Queda un hallazgo importante nuevo, introducido por la corrección de B1: la explicación de por qué los carros ajustados por un veterinario tuvieron más complicaciones exagera lo que dice el estudio y omite la otra explicación que da, que es justo la que afecta a la recomendación. También hay algunos menores. Ninguno impide publicar, pero N1 debería corregirse antes de fusionar porque es un problema de fidelidad a la fuente.

## Verificaciones ejecutadas (sobre `e95c18f`)

| Comprobación | Resultado |
| --- | --- |
| `npx astro build` | OK (32 documentos de agent-readiness) |
| `npm test` | OK, 103 pass / 0 fail |
| `node --test tests/agent-readiness/*.test.mjs` | OK, 77 pass / 0 fail |
| `node --test tests/agent-readiness/projection-growth.mjs` | OK, 2 pass |
| `node tests/agent-readiness/projection-semantic.mjs dist` | PASS, 32/32 |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | OK |
| `tools-ui-parity.mjs` (Chromium 141, preview :4322) | PASS, 36 casos UI↔API, 0 diferencias (`/tmp/claude-0/parity-r2.json`) |
| `npx astro check` | 0 errores, 0 avisos (60 *hints*) |
| JSON-LD (`dist/client/herramientas/selector-movilidad-perros-mayores.html`) | `WebPage` (`citation` ×6, `lastReviewed` 2026-10-17), `BreadcrumbList`, `SoftwareApplication` 1.1, `FAQPage` (las mismas 4 preguntas del texto visible, ya con «60 %») |
| Consola (14 resultados en 7 contextos: 390/820/1366, claro, oscuro y `reduced-motion`) | 0 errores |
| Scroll horizontal | Ninguno (`scrollWidth == clientWidth` en 390, 820 y 1366) |
| Barra fija móvil | `right` = 306 px. El botón del asistente empieza en x = 310: no lo tapa |
| Foco tras el resultado | `#m5rtit` en todos los casos |
| Tarjetas descargadas | Las 6 (`tarjeta-LA…SB.png`) |

Capturas en `/tmp/claude-0/auditoria-movilidad-r2/`: resultados a 390 px (claro: los 6; oscuro: SA, SB), 820 px (SA, MA, SB oscuro), 1366 px (SA, LA, SB oscuro), páginas completas en claro y oscuro, `390-light-rm-res-SA.png` (movimiento reducido), las 6 tarjetas, `tarjetas-L-M.png` (montaje) y la tarjeta del pilar (`pilar-tarjeta-390.png`, `pilar-tarjeta-1366.png`).

## Seguimiento de los hallazgos de la ronda 1

| Hallazgo | Estado | Evidencia |
| --- | --- | --- |
| **B1.** Ajuste por veterinario atribuido a Narum | **Corregido** (ver N1) | FAQ `selector-movilidad-perros-mayores.astro:26` y viñeta `:164`: el ajuste profesional pasa a ser «buena práctica», y se dice que en la encuesta los ajustados por un veterinario tuvieron más complicaciones. `movilidad.ts:76` separa las dos ideas. La explicación añadida («probablemente/seguramente porque eran los casos más difíciles») abre el hallazgo nuevo N1 |
| **B2.** Sin aviso de urgencia en el nivel severo | **Corregido** (con matices: N2 y menor M3) | `movilidad.ts:74` y `:86`: la primera frase de la descripción de SA y SB es «Si ha perdido la fuerza de golpe, en horas o pocos días, llévalo hoy al veterinario: puede ser una urgencia tratable. Este plan es para cuando ya está valorado.». Llega a la API (`GET /api/agent/v1/tools/movilidad?level=severe&handling=calm`), al texto `#m5sr`, a «Copiar» y a WhatsApp (`resultText()`). A 390 px se ve sin desplazarse (`390-dark-res-SA.png`: título en y = 346, descripción en y = 429–648). Valoración más abajo |
| **I1.** La tarjeta SA perdía el 4.º paso | **Corregido** | `tarjeta-SA.png`: 4 pasos, el 2.º partido en dos líneas. `buildCard()` (`MobilityTool.astro:396-459`) mide el texto antes de dibujar la imagen y, si no cabe, añade «+N pasos más en la web» |
| **I2.** «Dos de cada tres perros» | **Corregido** | `:26` y `:160`: «tres de cada cinco perros (60 %)». Narum, tabla 4: perros 575/954 = 60 % [57–63]. `movilidad-revision-1.1.md`, fila «Silla de ruedas»: 60 % |
| **I3.** «La mayor encuesta publicada» | **Corregido** (ver menor M1) | `:160`: «una encuesta a más de 1.200 cuidadores» |
| **I4.** En el nivel severo a 390 px, el título quedaba bajo la barra fija | **Corregido** | `MobilityTool.astro:69-84`: `.mt__hero` va antes de `#m5alert`. Medido a 390×844: el título queda en y = 346–421 en SA y SB, y la barra empieza en y = 768. Se repitió el flujo SA → Repetir → SB → Repetir → MB con pausas reales: 346, 346 y 402 px |
| Menor 1. Zonas de las heridas | **Corregido** | `:166`: «ingles, axilas, dorso de las patas y vientre». Narum, tabla 5: muslo interno 28 %, pata delantera interna/axila 22 %, dorso de la pata 14 %, vientre 12 % |
| Menor 2. Caraty, con 3 cadáveres | **Parcial** | `:34` y `:171` dicen «estudio de laboratorio», pero `:171` y `mobility-sources.ts:53` añaden «hecho con tres perros» / «tres perros», sin decir que eran cadáveres. Solo el comentario de `mobility-sources.ts:15` lo dice. Ver M2 |
| Menor 3. Sarcopenia, «masa y fuerza» | **Corregido** | `:152` «masa muscular… (Freeman, 2012)» y `mobility-sources.ts:59` |
| Menor 4. Fecha de verificación | **Corregido** | `mobility-sources.ts:2`: 2026-10-17 |
| Menor 5. Comentario duplicado | **Corregido** | `movilidad.ts:96`, una sola línea |
| Menor 6. Nombres comprimidos en la tarjeta | **Corregido** | `wrap()` con 840 px (`MobilityTool.astro:412`). En `tarjeta-SA.png` y `tarjeta-MA.png` los nombres largos se parten en dos líneas sin comprimirse |
| Menor 7. `role="alert"` junto a `aria-live` | **No corregido, justificado** | Sigue en `MobilityTool.astro:77`. `movilidad-revision-1.1.md` («Correcciones…») explica que la proyección y `agent-api.mjs` exigen `#m5alert[role=alert]`. Es aceptable como deuda de contrato registrada |
| Menor 8. Una columna en escritorio | Pasa a propuesta (P2) | No se ha registrado en `decisiones-del-propietario.md` (ver P2) |
| Menor 9. La barra fija no muestra el resultado | Pasa a propuesta | Sin cambios. Es razonable: no hay formulario ajustable |
| Menor 10. La misma guía para los 6 resultados | Pasa a propuesta (P3) | Sin cambios (`MobilityTool.astro:94`) |
| Menor 11. Imagen de la tarjeta del pilar | **Corregido** | `[pilar].astro:151` → `/images/herramientas/movilidad-hero.webp`. `buildSrcset` encuentra `movilidad-hero-400.webp`. Las capturas del pilar muestran el beagle nuevo |
| Menor 12. AAHA 2023, texto completo no verificado | **Sigue parcial** | Los metadatos coinciden con Crossref (59(1):1-21). El texto completo sigue sin abrirse desde este entorno. No lo causa la corrección. Lo debe confirmar quien tenga acceso |
| P1 (oráculo congelado) | Aplicado en este caso | `fixtures/f4a/movilidad-v1.1.json`, el ejemplo de contrato y el golden F2 se regeneraron, y esta ronda revisa el contenido del cambio |

### Valoración de la solución de B2 (aviso en la descripción en lugar de en `palliativeAlert`)

`src/agent-api/schema.json` fija `minItems: 3` y `maxItems: 3` para `palliativeAlert.items`, así que añadir un cuarto ítem rompería el contrato público. Ponerlo en `description` es una solución legítima y, en un aspecto, mejor. La descripción va justo debajo del título, así que es lo primero que se lee del resultado en pantalla, lo primero que anuncia `#m5sr` después del título y lo primero que recibe un agente en la API. En cambio, el aviso actual va después. La frase es condicional y no alarma a quien ya tiene el perro valorado («Este plan es para cuando ya está valorado»).

**Es suficiente para cerrar B2**, con dos matices que no bloquean:

1. Solo existe en el resultado dinámico. La página estática y su proyección Markdown para agentes (`dist/client/agent-content/v1/documents/tool--movilidad.md`) no la incluyen. Ver N2.
2. Visualmente no destaca. Va con el mismo estilo gris que el resto de la descripción, que es un párrafo de 7–9 líneas a 390 px. Ver M3.

## Hallazgos nuevos

### Bloqueantes

Ninguno.

### Importantes

#### N1. La explicación del 72 % frente al 47 % exagera lo que dice Narum y omite la explicación que afecta a la recomendación

- **Dónde:** `src/pages/herramientas/selector-movilidad-perros-mayores.astro:26` (FAQ, que también va al `FAQPage` del JSON-LD: «…las sillas ajustadas por un veterinario tuvieron más (**probablemente porque eran los casos más difíciles**)») y `:164` («…tuvieron más complicaciones, **seguramente porque eran los casos más difíciles**»). También en `docs/herramientas/movilidad-revision-1.1.md`, fila «Silla de ruedas» («probablemente casos más graves»).
- **Evidencia:** Narum et al. 2024, §4 (Discusión), texto completo en frontiersin.org: «We were surprised to find that dogs who were fitted by a veterinarian experienced a higher incidence of complications. This **may in part** be due to selection bias; more challenging cases may be more likely to present for veterinary care. **Another consideration is the variability of veterinary training.** Rehabilitation is not included in the core veterinary curriculum of most veterinary schools, and thus, veterinarians generally lack exposure to assistive devices… Even with advanced rehabilitation training, assistive mobility cart fitting education is not standardized».
- **Por qué importa:** el estudio presenta el sesgo de selección como una explicación parcial («may in part») y da otra: la formación veterinaria en carros es escasa y desigual. La página convierte la primera en la causa «probable» o «segura» y omite la segunda, que es justo la que matiza el consejo «que la ajuste tu veterinario». Es el mismo tipo de fallo que B1 («fuente que no dice eso»), aunque más leve: aquí la explicación va con matices, pero el matiz exagera la fuente y no hay ninguna conclusión invertida.
- **Qué cambiar:** decir lo que dice el estudio y orientar el consejo hacia la formación. Por ejemplo, en `:164`: «Es una buena práctica, aunque no garantiza que no roce: en la encuesta, las sillas ajustadas por un veterinario tuvieron más complicaciones. Los autores lo atribuyen en parte a que eran casos más difíciles y a que pocos veterinarios tienen formación en estos dispositivos, así que, si puedes, busca a alguien con formación en rehabilitación.». Aplicar lo mismo en la FAQ `:26` y en la fila de `movilidad-revision-1.1.md`. Si se quiere reflejar en la API, el `why` de la silla de SA (`movilidad.ts:76`) y de SB (`:88`) puede decir «un rehabilitador o un veterinario con formación en rehabilitación». Eso cambia el contrato 1.1: habría que regenerar el oráculo, el ejemplo y el golden, como en B2.

### Menores

- **N2. El aviso de urgencia no está en la página estática ni en su proyección para agentes.** `dist/client/agent-content/v1/documents/tool--movilidad.md` incluye el aviso «💛 Cuidados diarios si ya no se levanta solo» (línea 25), pero no la frase «llévalo hoy al veterinario», que solo aparece en el resultado dinámico. La sección «Si ya no se levanta solo» (`selector-movilidad-perros-mayores.astro:169-177`) tampoco la menciona. Lo más cercano es `:181` («Si el cambio es brusco, en días… consulta antes con tu veterinario»), que no transmite urgencia y está en otra sección. Un agente que lea la página en vez de llamar a la API, o una persona que lea sin hacer el test, no ve el aviso. **Cambio:** añadir una frase fija al principio de `#si-no-se-levanta`, por ejemplo: «Si ha dejado de levantarse de golpe, en horas o pocos días, no esperes: llévalo hoy al veterinario. Puede ser una urgencia tratable, como una hernia discal.», y en `:181` cambiar «consulta antes» por «consulta cuanto antes; si ha perdido la fuerza de las patas de golpe, ese mismo día». Hay que regenerar el golden F2 `tool--movilidad`.
- **M1. «Más de 1.200 cuidadores» describe respuestas, no personas.** `:26` y `:160`. Narum, §3: «1,221 survey responses were available for review» (y la tabla 4 suma 1,230). Son respuestas por animal, y el estudio no dice cuántos cuidadores distintos respondieron. **Cambio:** «una encuesta con más de 1.200 respuestas de cuidadores».
- **M2. Caraty: «hecho con tres perros» sin decir que eran cadáveres.** `:171` y `mobility-sources.ts:53`. PubMed 31364781: «Three **cadaver** dogs with different body condition scores». «Estudio de laboratorio con tres perros» hace pensar en animales vivos. El comentario de `mobility-sources.ts:15` sí lo dice. **Cambio:** «hecho con tres perros fallecidos» o «con cadáveres de tres perros», o quitar el número y dejar solo «estudio de laboratorio», como pedía la ronda 1.
- **M3. La frase de urgencia no destaca.** En `390-dark-res-SA.png` y `1366-light-res-SA.png` va con el mismo estilo que el resto de `.mt__rdesc`. **Cambio, solo en la interfaz y sin tocar el contrato:** en `showResult()`, si `key[0] === 'S'`, envolver las dos primeras frases en `<strong>` o mostrarlas en un bloque aparte dentro de `#m5rdesc`, de forma que `textContent` quede idéntico (la paridad compara el texto). Comprobar `tools-ui-parity.mjs` después.
- **M4. «Revisa los cuidados diarios justo debajo»** (`movilidad.ts:74`, `:86`) se refiere a la maqueta de la web, pero llega igual a la API y al MCP, donde el aviso es otro campo (`palliativeAlert`). Antes decía «de arriba», que con el nuevo orden ya no era cierto, así que el cambio es correcto para la web. **Cambio opcional** (contrato): «Revisa también los cuidados diarios para cuando ya no se levanta solo».
- **M5. Tarjetas con mucho hueco cuando el plan es corto.** `tarjeta-LA.png` y `tarjeta-LB.png`: la imagen llega como máximo a 500 px (`MobilityTool.astro:415`) y queda una franja vacía de unos 250 px sobre el pie. Es estético. **Cambio opcional:** subir el máximo de `imgH` (por ejemplo a 560) o centrar verticalmente el bloque de texto.

## Tabla de fuentes (ronda 2)

| Fuente | DOI (Crossref) | Cifra o afirmación en la página | ¿Verificada? |
| --- | --- | --- | --- |
| Cachon et al. 2023, COAST, Front Vet Sci 10:1137888 | 10.3389/fvets.2023.1137888, metadatos OK | Entorno primero, carros en casos avanzados, dolor controlado en reposo | Sí (sin cambios desde la ronda 1) |
| Dhaliwal et al. 2023, AAHA, JAAHA 59(1):1-21 | 10.5326/JAAHA-MS-7343, metadatos OK | Alfombras, tracción, acolchado | Parcial (texto completo no accesible) |
| Monteiro et al. 2022 WSAVA, JSAP 64(4):177-254 | 10.1111/jsap.13566, metadatos OK | El dolor crónico se reconoce, mide y trata | Sí |
| Narum, Miscioscia, Repac 2024, Front Vet Sci 11:1466405 | 10.3389/fvets.2024.1466405, metadatos OK (28-10-2024) | Mejor calidad de vida en perros (62 %) y cuidadores (61 %): **sí**. 60 % de perros con complicaciones (575/954): **sí**. 53 % de las complicaciones fueron heridas: **sí**. Zonas (tabla 5): **sí**. 72 % frente a 47 %: **sí**. «Seguramente por casos más difíciles»: **exagerado** (N1). «Más de 1.200 cuidadores»: son respuestas (M1) | Parcial |
| Caraty et al. 2019, JSAP 60(10):623-630 | 10.1111/jsap.13061, metadatos OK | Hombro, trocánter, 13.ª costilla; la espuma reduce la presión, pero no basta; más presión en perros delgados; cambios frecuentes de postura | Sí. Lo de «tres perros» omite que eran cadáveres (M2) |
| Freeman 2012, JVIM 26(1):3-17 | 10.1111/j.1939-1676.2011.00838.x, metadatos OK | Sarcopenia como pérdida de masa muscular con la edad | Sí |

## Casos reproducidos

El selector consulta una tabla (`RESULTS`). Se probaron las 6 combinaciones en la UI (Playwright) y se compararon con la API (paridad 36/36) y con la tabla «Cómo leer el resultado», que se genera desde `RESULTS`. Las tres coinciden.

| Entrada | Esperado | Mostrado | Aviso de urgencia | Aviso diario | Tarjeta |
| --- | --- | --- | --- | --- | --- |
| light + calm (LA) | Calcetines y botas antideslizantes | Igual | No | No | 2/2 pasos |
| light + stressed (LB) | Alfombras antideslizantes por toda la casa | Igual | No | No | 2/2 |
| moderate + calm (MA) | Arnés de soporte trasero + rampa de acceso | Igual | No | No | 3/3 (el 3.º en dos líneas) |
| moderate + stressed (MB) | Rampa de acceso + alfombras de ruta | Igual | No | No | 3/3 |
| severe + calm (SA) | Silla de ruedas canina + cama ortopédica + soporte de cadera | Igual | Sí, primera frase | Sí | **4/4** (antes 3/4) |
| severe + stressed (SB) | Silla de ruedas + cama ortopédica + entorno adaptado | Igual | Sí, primera frase | Sí | 3/3 |

**Tono:** sigue siendo cálido. El aviso de urgencia es condicional y no suena a cuenta atrás. Todos los resultados terminan con «consulta siempre a tu veterinario». El nuevo `why` de la silla en SB («si le cuesta aceptarla, pide ayuda a tu veterinario o a un rehabilitador») cubre la observación menor de la ronda 1 sobre la habituación.

## Decisiones del propietario respetadas

Se comprobaron las cinco decisiones del selector y ninguna se trata como hallazgo: datos compartidos 1.1 y MCP; «Apoyo total» y el título «Cuidados diarios si ya no se levanta solo»; cambios de postura cada 2–4 h como pauta de enfermería (`:174`); `SHOW_AFFILIATE_LINKS = false`, sin enlaces de afiliado visibles; y el mismo beagle en el hero, los 6 estados, las tarjetas y ahora también en la tarjeta del pilar.

## Propuestas para el propietario

- **P1 (sobre la decisión n.º 1).** Ya se ha aplicado: esta ronda revisó el contenido del cambio de contrato. Conviene mantenerlo como norma. N1 (si se cambia el `why`) y M4 serían los próximos cambios de la tabla que deberían pasar por una auditoría.
- **P2.** Sigue pendiente decidir si el selector se queda como asistente de una columna en escritorio (menor 8 de la ronda 1). Si se mantiene, registrarlo en `decisiones-del-propietario.md`. Si no, una ronda 3 lo volvería a encontrar contra la skill.
- **P3 (sobre la decisión n.º 4).** Sin cambios. Cuando existan las comparativas propias, enlazar cada resultado a la suya (cierra el menor 10).
- **P4 (sobre la decisión n.º 1 y el schema público).** El schema fija exactamente 3 ítems en `palliativeAlert`, y por eso la urgencia tuvo que ir en `description`. Si en una versión 1.2 del contrato se quiere un campo explícito (por ejemplo, `urgentNotice`, o pasar a `maxItems: 4`), los agentes podrían destacarlo por separado. No es necesario ahora.

## Instrucciones para la sesión que corrija (autocontenidas)

Trabaja en la rama `herramientas/movilidad-rediseno`. No toques `src/content/blog/`. No deshagas nada de `docs/herramientas/decisiones-del-propietario.md`. Mantén los IDs `m5*` y el texto de `#m5alert`.

1. **N1 (obligatorio).** En `src/pages/herramientas/selector-movilidad-perros-mayores.astro`:
   - `:164`: sustituye «seguramente porque eran los casos más difíciles» por una frase que recoja las dos explicaciones de Narum 2024 (§4): en parte, sesgo de selección (casos más difíciles), y además, que pocos veterinarios tienen formación en estos dispositivos. Por ejemplo: «Los autores lo atribuyen en parte a que eran casos más difíciles y a que pocos veterinarios tienen formación en estos dispositivos, así que, si puedes, busca a alguien con formación en rehabilitación.».
   - `:26` (FAQ): el mismo cambio en lugar de «(probablemente porque eran los casos más difíciles)».
   - `docs/herramientas/movilidad-revision-1.1.md`, fila «Silla de ruedas»: cambia «probablemente casos más graves» por «en parte casos más graves y formación veterinaria desigual, según los autores».
   - Opcional, porque cambia el contrato: en `src/lib/agent-tools/movilidad.ts:76` y `:88`, «tu veterinario o un rehabilitador» → «un rehabilitador o un veterinario con formación en rehabilitación». Si lo haces, regenera `tests/agent-readiness/fixtures/f4a/movilidad-v1.1.json`, `docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json` y el golden F2 `tool--movilidad` (`.html`, `.md`, `manifest.json`), y añade una fila a `movilidad-revision-1.1.md`.
2. **N2.** Al principio de la sección `#si-no-se-levanta` (`:170`), añade una frase fija con el aviso de urgencia: «Si ha dejado de levantarse de golpe, en horas o pocos días, llévalo hoy al veterinario: puede ser una urgencia tratable.». En `:181` cambia «consulta antes con tu veterinario» por «consulta cuanto antes con tu veterinario; si ha perdido la fuerza de las patas de golpe, ese mismo día». Regenera el golden F2 `tool--movilidad`.
3. **M1.** En `:26` y `:160`: «una encuesta con más de 1.200 respuestas de cuidadores» en lugar de «una encuesta a más de 1.200 cuidadores».
4. **M2.** En `:171` y en `src/lib/mobility-sources.ts:53`, indica que eran cadáveres («con cadáveres de tres perros») o quita el número.
5. **M3.** En `showResult()` (`src/components/tools/MobilityTool.astro`, script, alrededor de `$('m5rdesc').textContent = r.description`), en los resultados `S*` presenta las dos primeras frases (hasta «…ya está valorado.») en `<strong>` o en un bloque destacado dentro de `#m5rdesc`, sin cambiar el `textContent` total. Después ejecuta `tools-ui-parity.mjs`.
6. **M4 y M5 (opcionales).** M4 cambia el contrato: si lo aplicas, sigue el mismo procedimiento de regeneración que en el punto 1. M5: en `buildCard()`, sube el máximo de `imgH` o centra el bloque de texto cuando el plan tenga 2 pasos. Revisa las 6 tarjetas descargadas.
7. Verifica: `npx astro build`, `npm test`, `node --test tests/agent-readiness/*.test.mjs`, `node --test tests/agent-readiness/projection-growth.mjs`, `node tests/agent-readiness/projection-semantic.mjs dist`, `node scripts/agent-readiness/agent-api.mjs check --build-dir dist`, `npx astro check` y la paridad `node scripts/agent-readiness/tools-ui-parity.mjs --chrome <chromium> --base-url http://localhost:4322`. Haz capturas de SA y SB a 390, 820 y 1366 px, en claro y oscuro.
8. Pide la ronda 3, que es la última, en otra sesión. Quien corrige no audita. Si la ronda 3 falla, hay que parar y revisarlo con el propietario.
