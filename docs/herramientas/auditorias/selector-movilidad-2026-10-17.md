# Auditoría: Selector de ayudas de movilidad (2026-10-17)

- **Herramienta:** `/herramientas/selector-movilidad-perros-mayores`
- **Rama / commit auditado:** `herramientas/movilidad-rediseno` @ `b0b0f7e` (comparado con `main` @ `8b53656`, base común)
- **Skill aplicada:** `.agents/skills/auditar-herramienta-interactiva/SKILL.md`. También se leyeron `crear-herramienta-interactiva`, `docs/herramientas/decisiones-del-propietario.md` y `docs/herramientas/movilidad-revision-1.1.md`.
- **Auditor:** sesión externa. No ha corregido nada del código.

## Veredicto

**NO APTA** (en la escala de la skill: `NO LISTA`).

Hay dos hallazgos bloqueantes, los dos de texto y fáciles de corregir: una conclusión que se atribuye a Narum 2024 aunque el estudio dice lo contrario, y la falta de un aviso de urgencia en el nivel severo. Todo lo demás está en buen estado. Las fuentes existen y sus metadatos son correctos, el tono es cálido, el build y las pruebas pasan, el JSON-LD está completo, la proyección para agentes funciona y no hay errores de consola ni scroll horizontal. Corregidos los bloqueantes y los importantes, se espera `APTA CON CAMBIOS` menores o `APTA`.

## Verificaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npx astro build` | OK (incluye las integraciones de agent-readiness, 32 documentos) |
| `npm test` | OK, 103 pass / 0 fail |
| `node --test tests/agent-readiness/*.test.mjs` | OK, 77 pass / 0 fail |
| `node --test tests/agent-readiness/projection-growth.mjs` | OK |
| `node tests/agent-readiness/projection-semantic.mjs dist` | PASS, 32/32 documentos |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | OK |
| `npx astro check` | 0 errores, 0 avisos (60 *hints*) |
| JSON-LD | `WebPage` (con `citation` ×6), `BreadcrumbList`, `SoftwareApplication` (`softwareVersion` 1.1), `FAQPage` (4 preguntas, iguales al texto visible) |
| `<figure>` en la página | Ninguno |
| Consola (7 contextos de Playwright) | 0 errores |
| Scroll horizontal (390/820/1366) | Ninguno (`scrollWidth == clientWidth`) |
| Barra fija móvil | `right: 84px`: deja libre el botón del asistente |
| Imagen por resultado | La escena correcta en los 6 casos (`la`…`sb`) |
| Foco tras el resultado | `#m5rtit` en todos los casos |

Capturas en `/tmp/claude-0/auditoria-movilidad/`: 390, 820 y 1366 px en claro y oscuro, los 6 resultados a 390 px, `prefers-reduced-motion` y las 6 tarjetas descargadas (`tarjeta-XX.png`).

## Hallazgos bloqueantes

### B1. Se atribuye a Narum 2024 una conclusión que su dato contradice (ajuste por el veterinario)

- **Dónde:** `src/pages/herramientas/selector-movilidad-perros-mayores.astro:26` (FAQ: «…sobre todo heridas por roce. **Por eso** conviene que la ajuste tu veterinario o un rehabilitador»). También en `:164` («Mídela con ayuda… para que no roce», justo después del párrafo de Narum) y en `src/lib/agent-tools/movilidad.ts:76` («Que la ajuste tu veterinario o un rehabilitador: las rozaduras son la complicación más frecuente»), que llega a la API y al MCP.
- **Evidencia:** Narum et al. 2024, texto completo (PMC11551849, §3.2): «Animals fitted by a veterinarian had a **higher** reported complication rate (72%) than those not fitted by a veterinarian (47%; p < 0.001)».
- **Por qué importa:** el texto presenta el ajuste profesional como consecuencia del estudio («por eso…»). La única asociación que publica el estudio va en sentido contrario, aunque probablemente esté confundida por la gravedad de los casos. La sección A de la skill lo clasifica como «fuente que no dice eso».
- **Qué cambiar:** se puede seguir recomendando el ajuste profesional como buena práctica, pero sin derivarlo de Narum. Por ejemplo, en la FAQ: «…sobre todo heridas. Que la ajuste un profesional es una buena práctica para evitar rozaduras, aunque esa encuesta no demuestra que el ajuste reduzca las complicaciones». En `movilidad.ts:76`, separar las dos ideas: «Que la ajuste tu veterinario o un rehabilitador, y revisa su piel cada día: las heridas son la complicación más frecuente».

### B2. El nivel severo no avisa de que una pérdida súbita de las patas traseras es una urgencia

- **Dónde:** `src/lib/agent-tools/movilidad.ts:12` (subtítulo «Ya no puede levantarse solo o perdió el uso de las patas traseras») y los resultados `SA`/`SB` (`:70-92`) más `PALLIATIVE_ALERT` (`:98-105`).
- **Evidencia:** ningún texto del resultado severo, en la web, la API o el MCP, menciona la urgencia. La única advertencia sobre cambios bruscos está en la sección editorial «Cuándo repetir el test» (`selector-movilidad-perros-mayores.astro:181`), que no forma parte del resultado y que la API no devuelve.
- **Por qué importa:** quien elige «perdió el uso de las patas traseras» porque le ha pasado hoy o esta semana (hernia discal, embolia fibrocartilaginosa, etc.) recibe un plan de compra con silla de ruedas y pañales en vez de un «ve al veterinario hoy». Es un fallo de prudencia que afecta a la seguridad del perro. Además, la API se lo da igual a un asistente de IA.
- **Qué cambiar:** añadir al principio de `PALLIATIVE_ALERT.items`, o como frase inicial de la `description` de `SA` y `SB`, algo como: «Si la pérdida de fuerza ha sido repentina (horas o pocos días), llévalo hoy al veterinario: puede ser una urgencia tratable. Este plan es para cuando ya está valorado». El cambio altera el contrato 1.1. Hay que regenerar `fixtures/f4a/movilidad-v1.1.json`, el ejemplo `docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json` y el golden F2 `tool--movilidad`, comprobar la paridad UI↔API (`tools-ui-parity.mjs`) y anotarlo en `movilidad-revision-1.1.md`. Si se añade un ítem al aviso, también revisar que la proyección siga separando el icono del texto (`splitIcon`).

## Hallazgos importantes

### I1. La tarjeta para compartir de `SA` pierde el 4.º paso sin avisar

- **Dónde:** `src/components/tools/MobilityTool.astro:428-429` (`if (y > 1180) break;`).
- **Evidencia:** `tarjeta-SA.png`. El título ocupa 3 líneas y la tarjeta muestra solo los pasos 1–3: falta «Pañales caninos + empapadores absorbentes». Las otras 5 tarjetas salen completas.
- **Qué cambiar:** si el título ocupa 3 líneas, reducir el interlineado o la imagen (por ejemplo, imagen de 420 px de alto) para que quepan 4 pasos. Si aun así no cabe alguno, añadir una línea «+N pasos más en la web». Comprobar las 6 tarjetas.

### I2. «Casi dos de cada tres perros» no coincide con el dato para perros

- **Dónde:** `selector-movilidad-perros-mayores.astro:26` (FAQ: «casi dos de cada tres **perros**»). En `:160` se dice «animales», que es correcto.
- **Evidencia:** Narum 2024, tabla 4: todas las especies, 64 % (782/1230). **Perros, 60 %** (575/954). El 64 % incluye gatos (76 %) y conejos (72 %).
- **Qué cambiar:** en la FAQ, «tres de cada cinco perros (60 %)», o decir «animales» como en el cuerpo. Aplicar la misma corrección en `movilidad-revision-1.1.md` («~2/3»).

### I3. «La mayor encuesta publicada» no está respaldada

- **Dónde:** `selector-movilidad-perros-mayores.astro:160`.
- **Evidencia:** el artículo no afirma ser la mayor encuesta, y la búsqueda «largest» en el texto completo solo aparece en otro contexto.
- **Qué cambiar:** «En una encuesta a más de 1.200 cuidadores de animales con carros de movilidad (Narum y colaboradores, 2024)…».

### I4. A 390 px, en nivel severo, el resultado queda bajo el pliegue y el foco cae detrás de la barra fija

- **Dónde:** `MobilityTool.astro:66-84` (el aviso `#m5alert` va antes de `.mt__hero`) y `:290-293` (`scrollIntoView` al inicio del widget y foco en `#m5rtit`).
- **Evidencia:** `390-res-SA.png`. Al llegar al resultado, la imagen y el aviso ocupan toda la pantalla, y el título del resultado aparece cortado detrás de la barra «Enviar por WhatsApp». La skill pide los datos imprescindibles «sin mucho scroll».
- **Qué cambiar:** en móvil, mostrar insignia, título y descripción antes del aviso (o colapsar el aviso en un `<details>` abierto debajo del título), o desplazar la vista hasta `#m5rtit` con `scroll-margin-bottom` suficiente para la barra. Mantener `#m5alert` con el mismo ID y texto, porque la paridad lo lee.

## Hallazgos menores

1. **Localización de las heridas.** `selector-movilidad-perros-mayores.astro:166` dice «ingles, axilas y pecho». Según la tabla 5 de Narum: cara interna del muslo trasero 28 %, cara interna de la pata delantera y axila 22 %, dorso de las patas 14 % y vientre 12 %. El pecho no figura. Cambiar a «ingles, axilas, dorso de las patas y vientre».
2. **Caraty 2019 se hizo con 3 cadáveres.** `:34` y `:171` no lo dicen. Basta con «un estudio de laboratorio (Caraty y colaboradores, 2019)…». La cifra y la conclusión sí coinciden con el resumen.
3. **Sarcopenia «masa y fuerza».** `:152` y `mobility-sources.ts:58`. Freeman 2012 define la sarcopenia como pérdida de masa magra con la edad, sin hablar de fuerza. Dejar «masa muscular», o añadir que la fuerza también disminuye sin atribuírselo a Freeman. Además, Freeman no se cita por nombre en el cuerpo de la página.
4. **Fecha de verificación incoherente.** `src/lib/mobility-sources.ts:2` dice «2026-10-16». `movilidad-revision-1.1.md` y `MOBILITY_TOOL.lastReviewed` dicen 2026-10-17.
5. **Comentario duplicado** en `src/lib/agent-tools/movilidad.ts:96-97`.
6. **Tarjeta:** `fillText(p.name, 160, y, 840)` (`MobilityTool.astro:433`) comprime en horizontal los nombres largos («Cama de memory foam ortopédico (bordes altos)» en `tarjeta-SA.png`). Usar `wrap()` o bajar el tamaño de fuente para esa línea.
7. **Doble anuncio para lectores de pantalla.** `#m5alert` tiene `role="alert"` (asertivo) y además `#m5sr` lleva `aria-live="polite"`. En nivel severo se anuncian los dos y el aviso interrumpe. Usar `role="note"` o `region` con encabezado en el aviso y dejar `#m5sr` como único anuncio. Antes, comprobar si `projection-dom.mjs` depende de `#m5alert[role=alert]`: el comentario de `MobilityTool.astro:4` dice que sí. En ese caso, ajustar ambos lados o mantenerlo y documentarlo.
8. **Patrón de escritorio.** La skill pide dos columnas (formulario | resultado) a partir de 56rem. El selector es un asistente por pasos de una sola columna (`1366-res-SA.png`). Es razonable para un test de 2 preguntas, pero no es lo que dice la skill (ver P2).
9. **La barra fija móvil no muestra el resultado.** Muestra «Repetir» y «WhatsApp». La skill pide una barra con el resultado mientras se ajusta el formulario. Aquí no hay formulario ajustable, así que es menor.
10. **Acción por resultado.** Los 6 resultados enlazan a la misma guía (`/movilidad-dolor-perros-mayores`). La skill pide que cada resultado lleve a la guía que le corresponde: por ejemplo, LA/LB a contenido sobre suelos y casa, y SA/SB a la guía de úlceras o de cuidados en casa.
11. **Tarjeta del pilar.** `src/pages/[pilar].astro:151` sigue usando la imagen antigua `/images/home/selector-movilidad-perro.webp` en vez del beagle nuevo.
12. **AAHA 2023** (`mobility-sources.ts:31-35`, página `:134`): los metadatos son correctos según Crossref, pero el texto completo no se pudo abrir (JAAHA y aaha.org devuelven 403 por Cloudflare). La afirmación sobre «alfombras, tracción y acolchado» queda verificada **parcialmente**. Debe confirmarla quien tenga acceso.

## Tabla de fuentes

| Fuente | DOI | Uso / cifra en la página | Metadatos (Crossref) | Contenido |
| --- | --- | --- | --- | --- |
| Cachon et al. 2023, COAST, Front Vet Sci 10:1137888 | 10.3389/fvets.2023.1137888 | Entorno primero (suelo antideslizante, camas, rampas); en el estadio 4, eslingas y carros; ruedas «si el dolor está controlado en reposo pero no al moverse»; ejercicio y rehabilitación | Sí | **Sí.** PMC10436090: «comfort (beds and rest areas), non-slip flooring… ramps or steps»; «Mobility assistance devices… severe OA (COASTeR Stage 4)… slings… carts»; «wheeled mobility devices… may be considered if the pain is controlled at rest but not when mobile»; «Reducing the distance and effort… eating, drinking, and toileting» |
| Dhaliwal et al. 2023, AAHA Senior Care, JAAHA 59(1):1-21 | 10.5326/JAAHA-MS-7343 | Rampas, alfombras, tracción, acolchado | Sí | **Parcial** (no se pudo abrir el texto completo, 403) |
| Monteiro et al. 2022 WSAVA pain, J Small Anim Pract 64(4):177-254 (2023) | 10.1111/jsap.13566 | El dolor crónico se reconoce, mide y trata; lo valora el veterinario | Sí | Sí (afirmación general, coherente con el objeto de la guía) |
| Narum, Miscioscia, Repac 2024, Front Vet Sci 11:1466405 | 10.3389/fvets.2024.1466405 | Mejor calidad de vida (perros 62 %, cuidadores 61 %); complicaciones; heridas; «por eso, ajuste por veterinario» | Sí (corrección de 2026, PMC13154007: solo añade material suplementario) | **Parcial.** Calidad de vida: sí. «Casi 2/3 de los perros»: no (60 % en perros). Heridas, 53 % de las complicaciones: sí. Ajuste por veterinario: **contradice** (72 % frente a 47 %). Localización «pecho»: no |
| Caraty et al. 2019, J Small Anim Pract 60(10):623-630 | 10.1111/jsap.13061 | Puntos de presión (hombro, trocánter, 13.ª costilla), espuma que reduce la presión sin bastar, más presión en perros delgados, cambiar de postura | Sí | **Sí** (PMID 31364781, resumen). Estudio con 3 cadáveres: no se menciona |
| Freeman 2012, J Vet Intern Med 26(1):3-17 | 10.1111/j.1939-1676.2011.00838.x | Sarcopenia | Sí | **Parcial.** «Loss of LBM that occurs with aging»; la «fuerza» no aparece en el resumen |

La pauta de 2–4 h para los cambios de postura se presenta correctamente como práctica de enfermería y no como dato de un estudio (decisión del propietario n.º 3). La página dice expresamente que la tabla de decisión es criterio editorial (`:186`). Correcto.

## Casos reproducidos (lógica `recommendMobilityAids` = UI = tabla de la página)

El selector no calcula: consulta una tabla. Se comprobaron las 6 combinaciones en la UI (Playwright), en la tabla «Cómo leer el resultado» (generada desde `RESULTS`) y en la proyección Markdown. Las tres coinciden. La paridad UI↔API pasa dentro de `npm test`.

| Entrada | Esperado (`RESULTS`) | Mostrado | Aviso severo | Imagen | Valoración clínica |
| --- | --- | --- | --- | --- | --- |
| light + calm (LA) | Calcetines y botas antideslizantes | Igual | No | `la` | Prudente: incluye alfombras y retirar los calcetines para descansar |
| light + stressed (LB) | Alfombras antideslizantes por toda la casa | Igual | No | `lb` | Correcta (el entorno primero, como COAST) |
| moderate + calm (MA) | Arnés de soporte trasero + rampa | Igual | No | `ma` | Correcta. El arnés no se usa todo el día y se revisan las ingles |
| moderate + stressed (MB) | Rampa + alfombras de ruta (+ cama) | Igual | No | `mb` | Correcta. Falta sugerir que lo valore el veterinario o un rehabilitador si hay debilidad trasera (menor) |
| severe + calm (SA) | Silla + cama + soporte de cadera + pañales | Igual (tarjeta: 3/4 pasos, I1) | Sí | `sa` | Condiciona la silla a la fuerza delantera (bien). Falta el aviso de urgencia (B2) |
| severe + stressed (SB) | Silla + cama + pañales | Igual | Sí | `sb` | Habituar en sesiones cortas (bien). Falta el aviso de urgencia (B2). Ponerle silla y pañales exige manipularlo: quizá convenga mencionar la ayuda del veterinario o etólogo para la habituación (menor) |

**Tono:** sin cifras de cuenta atrás. El nivel severo se presenta como «apoyo total» y la silla, como forma de recuperar el paseo, en línea con la decisión n.º 2. Todos los resultados terminan con «consulta siempre a tu veterinario». No alarma. B2 no es un problema de tono, sino de prudencia.

## Decisiones del propietario respetadas

Se comprobaron las cinco decisiones y no se tratan como hallazgos: datos compartidos en la versión 1.1 y cambio del MCP; «Apoyo total» y el título del aviso; cambios de postura cada 2–4 h; `SHOW_AFFILIATE_LINKS = false` (`MobilityTool.astro:255`) sin enlaces de afiliado visibles; un mismo beagle en el hero y en los 6 estados (verificado en las capturas).

## Propuestas para el propietario

- **P1 (sobre la decisión n.º 1, contrato 1.1).** El oráculo de `f4a-tools.test.ts` ya no compara con la página legada, sino con `fixtures/f4a/movilidad-v1.1.json`, que se genera con los mismos datos que prueba. A partir de ahora, la prueba solo detecta cambios accidentales, no errores de contenido. Propuesta: cada cambio de esa tabla debe pasar por una auditoría de contenido como esta. El cambio B2 es el primer caso.
- **P2.** Decidir si el selector debe seguir siendo un asistente por pasos de una columna en escritorio o seguir el patrón de dos columnas de la skill. Si se mantiene, conviene registrarlo en `decisiones-del-propietario.md` para que futuras auditorías no lo marquen.
- **P3 (sobre la decisión n.º 4).** Cuando existan las comparativas propias (sillas, arneses), enlazar cada resultado a la suya. Eso resuelve también el menor n.º 10.

## Instrucciones para la sesión que corrija (autocontenidas)

Trabaja en la rama `herramientas/movilidad-rediseno`. No toques `src/content/blog/`. No deshagas nada de `docs/herramientas/decisiones-del-propietario.md`.

1. **B1.** En `src/pages/herramientas/selector-movilidad-perros-mayores.astro:26` quita «Por eso» y la relación causal con Narum: recomienda el ajuste profesional como buena práctica y aclara que la encuesta no demuestra que reduzca las complicaciones (en ella, los carros ajustados por un veterinario tuvieron más: 72 % frente a 47 %). Revisa `:164` en el mismo sentido. En `src/lib/agent-tools/movilidad.ts:76` cambia el `why` de la silla de SA a «Le permite volver a moverse por su cuenta. Que la ajuste tu veterinario o un rehabilitador, y revisa su piel cada día: las heridas son la complicación más frecuente.».
2. **B2.** Añade el aviso de urgencia para una pérdida súbita en el nivel severo (en `PALLIATIVE_ALERT`, como primer ítem con icono inicial y `link: null`, o al principio de `description` de SA y SB). Texto sugerido: «🚨 Si ha perdido la fuerza de golpe (en horas o pocos días), llévalo hoy al veterinario: puede ser una urgencia tratable. Este plan es para cuando ya está valorado.». Después regenera `tests/agent-readiness/fixtures/f4a/movilidad-v1.1.json`, `docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json` y el golden F2 `tool--movilidad` (`.html`, `.md` y `manifest.json`). Ejecuta la paridad UI↔API y añade una fila a la tabla de `docs/herramientas/movilidad-revision-1.1.md`.
3. **I1 y menor n.º 6.** En `buildCard()` (`src/components/tools/MobilityTool.astro:396-441`), haz que quepan los 4 pasos de SA (imagen más baja o interlineado adaptable) y que los nombres largos se partan con `wrap()` en lugar de comprimirse. Descarga y revisa las 6 tarjetas.
4. **I2, I3 y menor n.º 1.** En la página: FAQ `:26` «tres de cada cinco perros (60 %)»; `:160` sustituye «la mayor encuesta publicada» por «una encuesta a más de 1.200 cuidadores»; `:166` «ingles, axilas, dorso de las patas y vientre». Corrige «~2/3» en `movilidad-revision-1.1.md`.
5. **I4.** A 390 px, que al llegar al resultado severo se vean la insignia y el título sin quedar debajo de la barra fija: reordena el título antes del aviso en móvil, o ajusta el `scrollIntoView` o `scroll-margin`. Mantén los IDs `m5*`.
6. **Menores n.º 2–5, 7 y 11:** indicar que Caraty se hizo con cadáveres; «masa muscular» para Freeman; fecha `2026-10-17` en `mobility-sources.ts:2`; borrar el comentario duplicado en `movilidad.ts:96`; revisar `role="alert"` frente a `projection-dom.mjs`; cambiar la imagen de la tarjeta del pilar en `[pilar].astro:151`.
7. Verifica: `npx astro build`, `npm test`, `node --test tests/agent-readiness/*.test.mjs`, `node --test tests/agent-readiness/projection-growth.mjs`, `node tests/agent-readiness/projection-semantic.mjs dist`, `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` y `npx astro check`. Haz capturas a 390, 820 y 1366 px en claro y oscuro de SA y SB.
8. Pide una nueva auditoría en otra sesión. Quien corrige no audita.
