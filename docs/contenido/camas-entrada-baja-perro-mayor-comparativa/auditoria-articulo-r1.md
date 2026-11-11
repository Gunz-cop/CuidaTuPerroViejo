# Auditoría del artículo r1: camas de entrada baja para perro mayor (comparativa)

- Fecha: 2026-11-11
- Auditor: sesión independiente (no redactó el brief, el artículo ni el registro de fichas)
- Rama: `claude/cool-brown-rj9p62` en `659f7a5`
- Artículo: `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx`
- Contrato: `briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md`
- Datos de producto: `docs/afiliacion/fichas-camas-comparativa.md` (registro del 11/11/2026)
- Skills y guías aplicadas: `auditar-articulo-blog`, `crear-ficha-afiliada`, `docs/seo/afiliacion-aliexpress.md`, guía de voz y tono
- No se corrigió nada. Este informe solo evalúa.

## Veredicto

**Aprobado con cambios.** No hay datos inventados, fugas del contrato ni ablandamiento de los no negociables comerciales, y la ficha afiliada cumple el contrato técnico. Antes de publicar faltan la portada I-1 (o una decisión expresa del propietario de publicar sin ella) y la nueva comprobación de las tres fichas el día de publicación. El brief exige las dos cosas.

Planos del veredicto:

- **Mecánico.** `npx astro build` en verde (exit 0). `npm run check` da 0 errores y `npm test` 141 pass / 0 fail. `projection.mjs check --build-dir dist` da OK. El script `metricas.mjs` da «NO APTO», pero sus cuatro bloqueantes son de lectura del brief, no del artículo (ver P2-1). Medí a mano lo que el script no pudo leer.
- **Verificable a mano.** Cotejé cada dato de producto con el registro de fichas, recorrí los no negociables de §6, §10 y §12, revisé el HTML compilado y la proyección Markdown y tomé capturas a 390 y 1366 px. Quedan sin verificar dos cosas: el destino real de los tres `s.click` (no los abrí, para no enviar clics de prueba al programa; ver P1-3) y el texto completo de F1 y F2, cuyas páginas devuelven 403 (limitación ya documentada en el brief, §3).

## Hallazgos

### P0

Ninguno.

### P1

**P1-1. Falta la portada I-1.** El frontmatter (`mdx:1-9`) no tiene `heroImage` ni `heroImageAlt`. El brief (§8 y §12, «El redactor entrega: … I-1 con el prompt de §8») la incluye en el contrato. La entrega lo declara con honestidad («Falta. No hay herramienta de generación de imágenes»), así que no hay afirmación falsa. Aun así, sin portada el artículo comparte con imagen genérica y la tarjeta queda sin imagen propia. La única alternativa al contrato es que el propietario decida por escrito publicar sin portada.

**P1-2. La revisión de las fichas debe repetirse el día de publicación.** El brief (§6, regla para las tres, y §12) pide repetir la comprobación de disponibilidad, entrega y devolución en México y España el día de publicación. Hoy el artículo fecha todo en el 11/11/2026: `mdx:29`, `:79`, `:159` y `:200`. Además fija plazos concretos de México (`mdx:159`) y el `datePublished: "2026-11-11"`. Si se publica otro día, esos datos y la fecha quedan desfasados, y el registro debe actualizarse antes que el artículo (regla del brief).

**P1-3. Destino de los enlaces afiliados sin verificar de punta a punta.** En `dist` los tres CTA son correctos. Hay un `<a>` por `aside`, con `href` igual al registro (`_c3vqNMIT`, `_c3DVbDzz`, `_c4PdeaEF`), `target="_blank"`, `rel="sponsored noopener noreferrer"` y `aria-describedby` hacia el aviso. También hay `data-affiliate-placement` `camas-cmp-a|b|c`, registradas en `src/lib/affiliate/clicks.ts` con su `trackingId`. Lo que nadie ha comprobado (ni la entrega ni esta auditoría) es que cada enlace corto aterrice en el ID y vendedor esperados (`1005009119696851`, `1005005134788648`, `1005011771728376`). La guía de afiliación (paso 5) lo exige antes de activar. Debe hacerlo el propietario en móvil y escritorio con su sesión, para no generar clics automáticos.

### P2

**P2-1. `metricas.mjs` no sabe leer un brief de afiliados.** Da cuatro bloqueantes: rango del contrato, targets por sección, enlaces y tabla de fuentes «no interpretables». También marca las ocho secciones como «no previstas». La causa es el formato de `generar-briefing-afiliados`: la estructura va en §7 como lista numerada, la trazabilidad en §3 y el contrato en §12. El script espera §6/§9. Medí a mano contra §7:

| Bloque | Real | Target §7 | Estado |
| --- | --- | --- | --- |
| Entradilla (sin tabla) | ~121 | 80–120 | +1 |
| Antes de comparar | 153 | 150–200 | dentro |
| Mide a tu perro | 278 | 250–300 | dentro |
| Los tres modelos | 822 con las props de `FichaAfiliada` (~747 de prosa) | 850–1 000 | −3 % / −12 % |
| México o España | 201 | 180–220 | dentro |
| Cuándo no hace falta comprar | 132 | 120–160 | dentro |
| Al recibirla | 165 | 120–160 | +3 % |
| Cómo elegimos | 84 | 80–120 | dentro |

Total sin tabla ni cuadro de fuentes: unas 2 210 palabras, dentro del rango 1 980–2 480. `tono.py` mide 2 113 palabras con 0 muletillas. Densidad: media de 29 palabras por párrafo, mediana de 31, máximo de 58 y 7 % de párrafos con más de 50. Coincide con la entrega salvo matices menores. Ver «Patrón».

**P2-2. F1 no aparece en todos los H2 que le asigna el brief.** F1 (AAHA 2023) está en H2-1 (`mdx:41`). El brief (§3 y §7) también la asigna a H2-2, H2-5 y H2-6, pero allí solo aparece F5 (la guía de camas). La entrega lo reconoce. No es invención: F5 sostiene esas frases. Para cerrar la trazabilidad hay dos caminos: citar F1 por nombre en H2-5 o H2-6, o anotar en el brief que F5 basta en esos H2.

**P2-3. «Los tres modelos» va corto de prosa.** Son unas 747 palabras de prosa frente al mínimo de 850 (−12 %, dentro de la tolerancia). La ficha más corta es la C. No hay que inflarla. Si se toca, lo útil es la comprobación al recibir la C, que el brief pide para cada ficha («lo que conviene comprobar al recibirla») y que solo tiene la B (`mdx:117`). En la A cumple esa función la pregunta al vendedor. En la C falta: por ejemplo, la estabilidad del marco y la tensión de la malla.

**P2-4. Plazos de México de la cama A simplificados** (`mdx:159`). El registro anota también «19–22 nov» en la gris 107×76×17, que al recargar pasó a 28 nov–11 dic. «Entre el 19 y el 23 de noviembre o entre el 28 de noviembre y el 11 de diciembre» lo engloba sin falsearlo. Basta con revisarlo cuando se repita la comprobación (P1-2).

**P2-5. Compromiso público de mantenimiento** (`mdx:202`): «Revisaremos las fichas cada semana durante el primer mes». Coincide con el plan del brief (§11). Al publicarlo pasa a ser una promesa al lector. Solo debe mantenerse si el propietario lo tiene agendado (TODO.md o tarea programada). Si no, hay que suavizarlo a «revisamos las fichas periódicamente» o quitarlo.

**P2-6. I-2 se lee con dificultad a 390 px.** La captura (Chrome headless, 390 px, tema claro) muestra varios problemas. El texto del SVG se renderiza a unos 10–12 px efectivos. La etiqueta «Interior: lo que usa» queda pegada a la flecha. «lado» queda separada de su flecha (texto en `x=575`, flecha entre 420 y 520 en `CamasMedidaVisual.astro`). Las siluetas de perro son una elipse y un círculo y no se leen como perro. I-3 se lee bien, y su escala es correcta: 2,5 unidades por cm, cuadro de 10 cm y barra de 20 cm. No es bloqueante, porque el `figcaption` y el texto transmiten la información. No revisé el tema oscuro en captura (el CSS usa `:global(.dark)`, como la ficha aprobada).

**P2-7. Generalización sin fuente** (`mdx:69`): «La talla que anuncia un vendedor suele ser la exterior». Es razonable y el diagrama de A la ilustra, pero ninguna fuente la sostiene en general. Puede quedar como «En la ficha A, la talla anunciada es la exterior» o «a menudo».

**P2-8. El título promete más de lo que da la comparativa (nace en el brief).** El H1 dice «Camas de entrada baja … 3 modelos». La C no es de entrada baja (`mdx:133` lo dice bien) y la entrada de la A está «sin declarar». Solo la B acredita entrada baja (10 cm). El texto es honesto. El desajuste está en el `title`/`seoTitle` que fijó el brief, así que la corrección corresponde al brief y al propietario. Una opción: «Camas para perro mayor: 3 modelos comparados por medida y acceso». No es un fallo del redactor.

**P2-9. Teclado y movimiento reducido sin probar en interacción.** La entrega lo declara. `crear-ficha-afiliada` pide comprobar el recorrido con teclado y pantalla táctil y el movimiento reducido. El CSS y el JS son copia del componente aprobado y el foco hereda su estilo, así que el riesgo es bajo. Debe probarse en la preview.

## Lo que sí funciona (no romper al corregir)

- **Todos los datos de producto están en el registro.** Cotejé uno a uno las medidas de A, B y C, la superficie útil (B 105×70, C 87×69), la carga de 50 kg y el límite de ≤35 kg de C, los 40 kg de B en XL, el núcleo («orthopedic foam»/«egg crate foam»; «viscoelástica» frente a «espuma de esponja»), las fundas y el lavado (A a máquina, B a mano), el forro impermeable (declarado en B, solo en el título en A), la base antideslizante, las 24 h de recuperación y la XL de C que no envía a México. También cuadran B «solo España» y «Sin gastos de importación», el envío desde Alemania en 5–9 días, los aranceles de A y C «al finalizar la compra», las devoluciones gratis en 90 días en las tres, la única valoración de C, el cojín que no se ve en C, las reseñas con M/L/XL y las cinco variantes recomendadas y tres excluidas de A. «10–13 cm por eje» cuadra con el diagrama (10,2–12,7 cm), y «19–20 cm» con 7,5–7,9". No encontré ningún dato fuera del registro.
- **No hay ningún precio.** No aparecen `€`, `MX$`, EUR ni MXN en el MDX ni en el HTML compilado. La oferta de comprador nuevo de A se menciona sin cifra (`mdx:169`), como pide el brief. Las variantes excluidas se explican como «precio anómalo» sin cifras.
- **Avisos.** Hay aviso de afiliación en la entradilla (`mdx:21`), aviso bajo cada botón («Podemos recibir una comisión por las compras a través de este enlace.»), un bloque final «Cómo elegimos y cómo ganamos dinero» y la Comisión Europea en el cuadro de fuentes. El schema es `BlogPosting`, sin `Review` ni `AggregateRating`.
- **Honestidad en los puntos de presión comercial.** «Ortopédica» se presenta como descripción del vendedor (`mdx:45`, FAQ). Se dice explícitamente que ningún modelo se probó (`mdx:79`, `:202`). Luna y Dakota aparecen como ejemplo de duración, «no una prueba de alivio» (`mdx:75`). C se presenta en su primera frase como «no es una cama de entrada baja». Cada ficha tiene su «No te la recomendaríamos». Es exactamente lo que el brief protegía.
- **`FichaAfiliada.astro`.** Cumple el contrato: `aside` con `data-affiliate-placement`, un único CTA, el `rel` completo, el aviso bajo el botón, sin precio, stock ni plazos dentro de la ficha, animación con `IntersectionObserver` al 65 % y respeto a `prefers-reduced-motion`. `CamaAfiliada.astro` y la ficha `cama-guia-01` quedan intactas.
- **Proyección Markdown.** Excluye los tres bloques comerciales: no aparecen `s.click`, «Ver tallas» ni el aviso del CTA. Conserva la tabla, la FAQ y los `figcaption`.
- **Enlazado.** Hay enlace entrante desde la guía de camas (`cama-ortopedica…mdx:75`) y desde prevención de caídas (`prevencion-caidas…mdx:70`), y el slug está en `internal-links.ts`. Las anclas salientes existen en el HTML.
- **Sin fugas del contrato.** No aparecen «brief», «F1» ni «redactor», ni tampoco corchetes o `PENDIENTE` en el texto publicado.
- **La entrega.** No encontré ninguna afirmación falsa. Build, check, tests, proyección y las omisiones (I-1, I-4, I-5, F1 en H2-2/5/6, teclado) están declarados como son.

## Qué corregir, en orden

1. **Portada (P1-1).** Generar I-1 con el prompt de §8 del brief y revisarla con el requisito senior (390 px). Añadir `heroImage` y `heroImageAlt` (el alt de §1). La otra opción es que el propietario deje por escrito que se publica sin portada.
2. **Repetir la revisión de fichas el día de publicación (P1-2).** Actualizar primero `docs/afiliacion/fichas-camas-comparativa.md` y después las fechas de `mdx:29, 79, 159, 200`, los plazos de `mdx:159` y `datePublished`. Si cambia el vendedor, la variante o el envío a un país, retirar o ajustar la ficha afectada.
3. **Verificar el destino de los tres enlaces (P1-3).** Lo hace el propietario a mano, en móvil y escritorio, con envío a MX y ES. Hay que anotar el resultado en el registro.
4. **Opcionales al tocar el archivo (P2).** Añadir a C una comprobación al recibirla (P2-3). Citar F1 en H2-5 o H2-6, o anotar la excepción en el brief (P2-2). Matizar `mdx:69` (P2-7). Decidir si se mantiene la promesa semanal de `mdx:202` (P2-5). Ajustar en `CamasMedidaVisual.astro` el tamaño de la letra, la posición de «lado» y la separación de «Interior» (P2-6). Probar teclado y movimiento reducido en la preview (P2-9).
5. **Título (P2-8).** Decisión del propietario sobre el brief. Si se cambia, actualizar `title` y `seoTitle` en el brief y en el MDX.

Prompt para la sesión correctora (no para quien audita):

> En `/home/user/CuidaTuPerroViejo`, rama `claude/cool-brown-rj9p62`, lee `AGENTS.md` y `docs/contenido/camas-entrada-baja-perro-mayor-comparativa/auditoria-articulo-r1.md`. Corrige P1-1 y los P2 que el propietario acepte en `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx` y `src/components/article/CamasMedidaVisual.astro`. No añadas ningún dato de producto que no esté en `docs/afiliacion/fichas-camas-comparativa.md` ni ningún precio. No toques `FichaAfiliada.astro` salvo por un defecto comprobado. P1-2 y P1-3 requieren al propietario: déjalos anotados si no los tienes. Valida con `npx astro build`, `npm run check`, `npm test` y `node scripts/agent-readiness/projection.mjs check --build-dir dist`. Después pide una auditoría r2 en otra sesión.

## Patrón

`metricas.mjs` no interpreta los briefs que produce `generar-briefing-afiliados` (estructura en §7, trazabilidad en §3, contrato en §12). Va a dar los mismos cuatro bloqueantes falsos en cada comparativa de afiliados del listado de prospectos, como las rampas. Conviene que otra sesión haga una de dos cosas: adaptar el parser para reconocer ese formato, o alinear la plantilla de afiliados con las secciones que espera el script. Hasta entonces, el auditor debe medir a mano contra §7, como en este informe.
