# Auditoría de tono — `comida-casera-perros-mayores.mdx`

- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Versión auditada:** `main` @ `26f9b77`, blob `482f37afbd66` (commit de la reescritura `debac40`, PR #127)
- **Versión de comparación:** `debac40^` (estado tras `872517c`, 2026-10-16)
- **Brief:** no existe (`briefings/` ni `docs/contenido/` tienen brief para este slug). Se audita contra la guía de voz y tono, la guía de calidad editorial y la consigna de la reescritura («no cambiar afirmaciones clínicas, fuentes, enlaces ni datos»).
- **Producción:** la URL pública `/alimentacion-perros-senior/comida-casera-perros-mayores` responde 200 y ya sirve esta versión (contiene «Triturar cambia la textura»). Los hallazgos bloqueantes están **publicados**.

## Veredicto

**NO APTO (No publicable tal como está).** La reescritura cambió el sentido clínico de cinco frases: convierte «no garantiza» en afirmaciones categóricas sin respaldo y debilita dos instrucciones de seguridad (suplementos e introducción de alimentos).

Plano mecánico: `tono.py` 0,0/1000 (antes 7,9), densidad de párrafo correcta. Plano manual: fuentes, imágenes y diff revisados; captura responsive a 390/1366 px **no realizada** (sin cambios de componentes visuales salvo un `AlertBox` nuevo).

## Hallazgos

### P0 — Cambios de alcance clínico (bloqueantes)

| # | Línea | Antes (`debac40^`) | Ahora | Qué cambió |
|---|---|---|---|---|
| B1 | 39 | «una mezcla casera húmeda no garantiza prevenirla» | «una mezcla casera húmeda **tampoco la previene**» | De «no hay garantía» a afirmar que no previene la enfermedad renal. Nueva afirmación clínica negativa, sin fuente. |
| B2 | 59 (H2) | «Triturar puede cambiar la textura, no garantizar absorción» | «Triturar cambia la textura, **no la absorción**» | Afirma que triturar no modifica la absorción. Burrows et al. (1982) estudia fibra añadida, no tamaño de partícula ni triturado: no respalda ni esto ni lo contrario. |
| B3 | 57 | «**No añadas** calcio, aceite de pescado, vitaminas, vísceras ni caldos concentrados para "completar" una mezcla.» | «…así que **consúltalos antes de añadirlos** para "completar" una mezcla.» | Una prohibición pasa a ser un permiso condicionado: legitima completar una mezcla por porcentajes con suplementos, que es justo lo que el artículo retira en su H2 anterior. |
| B4 | 91 | «No encadenes ingredientes nuevos ni escondas medicación en toda la ración» | «**Ofrece un alimento nuevo cada vez** y **deja la medicación fuera de la ración completa**» | «Un alimento nuevo cada vez» se lee como «cambia de alimento en cada toma», lo contrario de lo que decía. «Deja la medicación fuera de la ración» puede leerse como «no la des con comida», en conflicto con la frase siguiente («pregunta si su medicamento exige alimento»). Toca medicación: política editorial §4. |
| B5 | 99 | «Unas heces firmes o un pelaje brillante no demuestran por sí solos que una dieta sea completa.» | «Con esa hoja, tu veterinario ve en la consulta […] **si la dieta está completa**.» | Atribuye a un registro de ingesta la capacidad de mostrar si la dieta es completa. La completitud depende de la formulación (lo dice el propio artículo); un registro no la mide. |

### P2 — Cambios menores de alcance (no bloquean)

- **L17:** «puede ser una opción» → «puede ser **una buena** opción». Valoración positiva añadida.
- **L29:** «La edad, por sí sola, no […] demuestra que el perro absorba mal» → «cumplir años **no significa que absorba peor**». Pasa de «no lo prueba» a negarlo en general. Sin fuente.
- **L45:** AAHA «pueden modificar» → «**cambian**». La fuente (403, no leída en esta ronda) se cita con un verbo categórico.
- **L63:** añade «Una textura uniforme **facilita comer**». Es plausible, pero es una afirmación nueva.
- **L101:** «no [puede] demostrar prevención de enfermedades» → «la prevención de enfermedades **se valora con tu veterinario**». Da a entender que la dieta podría tener un efecto preventivo que se mide en consulta.

### P2 — Hallazgos previos a la reescritura (no los causó el PR #127)

- **Imagen `licuado-carne-vegetales-pate-perros.webp` (L82):** el `alt` dice «carne y vegetales preparados con textura de paté». La imagen muestra una salsa verde y naranja vertida sobre carne picada granulada, no un paté. Además lleva visible la marca de agua de generación con IA. El pie dice «Ilustración», así que la declaración existe, pero el `alt` no describe lo que se ve.
- **Cadencia de H3:** 2 H3 para 1204 palabras (~602 palabras por H3; la especificación es 150–200).
- 8 archivos en `public/images/blog/comida-casera-perros-mayores/` sin referenciar.

## Fuentes: fuente → afirmación → comprobación

| Fuente | Afirmación en el artículo | Comprobación (2026-10-21) |
|---|---|---|
| Burrows CF, Kronfeld DS, Banta CA, Merritt AM. *J Nutr* 1982;112(9):1726-32, PMID 6286909 | Estudia fibra, digestibilidad y tránsito; no valida un «método del licuado» | **Verificada** (E-utilities): 4 beagles, celulosa añadida al 3/6/9 %; la digestibilidad de la materia seca baja del 90 % al 70 %. No trata triturado ni perros geriátricos. Autoría y año correctos. No respalda B2. |
| WSAVA Global Nutrition Guidelines | Evaluación del animal, la dieta y la alimentación | 200; la página incluye evaluación de condición corporal, historia dietética y checklist nutricional. Correcta por concepto. |
| AAHA, Homemade Pet Food Guidance | Las sustituciones, cantidades y cocción alteran la receta | **403: limitación de acceso**, no fallo. El verbo «cambian» (L45) es más categórico que «pueden modificar». |
| FDA, Raw Pet Food Diets | Riesgo de patógenos para animales y personas | 200. Coherente con el título y el alcance. |
| AAHA 2023 Senior Care Guidelines | Evaluar nutrición y enfermedades | **403: limitación de acceso**. La afirmación no cambió de alcance. |

URLs y enlaces sin cambios respecto de `debac40^` (comprobado en el diff). Enlaces internos `/salud-perros-mayores/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion` y `/alimentacion-perros-senior` resuelven a contenido existente.

## Recursos prometidos

No promete descargas, vídeos ni herramientas. «Un registro que puedes llevar en una libreta» se entrega en el texto. Sin pendientes.

## Métricas

| Métrica | Antes | Ahora |
|---|---|---|
| `tono.py` (muletillas/1000) | 7,9 (8 en 1019) | **0,0** (0 en 1046) |
| Densidad de párrafo (media / mediana / >50) | — | 38 / 38 / 9 % |
| `AlertBox` de cuerpo | 3 | 4 (se añadió `warning` «Ingredientes que nunca deben entrar», L78; el texto del interior no cambió) |

Voz: de tú, sin voseo ni usted, sin relleno SEO, afirmativo. Cumple la guía.

## Lo que sí funciona

- La apertura (L17) es exactamente el ejemplo de la guía de voz: «Que le encante […] no significa que esté completa: pide que un veterinario nutricionista formule la receta.» Que no se toque.
- El H2 «Por qué retiramos las proporciones universales» mantiene la decisión editorial incómoda (no hay receta base). Que no se ablande al corregir B3.
- Mover la lista de tóxicos a un `AlertBox` warning cumple la regla 3 de la guía.
- El `AlertBox` danger de L93 sigue intacto.

## Qué corregir, en orden

Prompt para otra sesión (quien audita no corrige):

> En `src/content/blog/comida-casera-perros-mayores.mdx` (rama nueva desde `main`, no hagas push a `main`), cambia solo estas frases, sin tocar fuentes ni enlaces, y vuelve a medir con `tono.py` (≤ 3/1000):
> 1. L39: «y una mezcla casera húmeda tampoco la previene» → «y no hay pruebas de que una mezcla casera húmeda la prevenga».
> 2. L59, H2: «Triturar cambia la textura, no la absorción» → «Triturar cambia la textura; que nutra bien depende de la receta».
> 3. L57: «Calcio, aceite de pescado, vitaminas, vísceras y caldos concentrados se valoran dentro del conjunto de la dieta, así que consúltalos antes de añadirlos para «completar» una mezcla.» → «Deja el calcio, el aceite de pescado, las vitaminas, las vísceras y los caldos concentrados en manos de la formulación: se valoran dentro del conjunto de la dieta, no para «completar» una mezcla por tu cuenta.»
> 4. L91: «Ofrece un alimento nuevo cada vez y deja la medicación fuera de la ración completa: así sabes qué ha comido y evitas que rechace el plato.» → «Introduce los alimentos nuevos de uno en uno y no escondas la medicación en toda la ración: así sabes qué ha comido y evitas que rechace el plato.»
> 5. L99: «Con esa hoja, tu veterinario ve en la consulta lo que unas heces firmes o un pelaje brillante no cuentan: si la dieta está completa.» → «Llévala a cada revisión. Unas heces firmes o un pelaje brillante son buena señal, pero si la dieta está completa lo dice la formulación, no el aspecto.»
> 6. Opcional (P2): L17, quita «buena»; L45, «cambian» → «pueden cambiar»; L101, «la prevención de enfermedades se valora con tu veterinario» → «si previene enfermedades no se puede saber desde casa».
> 7. Opcional (P2): corrige el `alt` de L82 para que describa la imagen real (salsa vertida sobre carne picada) o sustituye la imagen.
> Ejecuta `npx astro build` y entrega la tabla antes/después de cada frase.
