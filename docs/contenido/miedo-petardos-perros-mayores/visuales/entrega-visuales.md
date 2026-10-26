# Producción visual — miedo a los petardos en perros mayores

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`, desde la rama de redacción, base `486d55f`.

**Producción detenida tras cuatro versiones de la Imagen 1, ninguna seleccionada.** Se aplica el límite expreso del encargo: «Máximo 4 versiones por imagen; si a la cuarta sigue fallando, detente y pide decisión». Las imágenes 2 y 3 no se generan porque el proceso exige que la primera supere todas las comprobaciones antes de utilizarla como referencia de identidad. No se emite auditoría independiente ni se declara aprobado el conjunto.

## Archivos y método

Los cuatro PNG son copias íntegras de los originales generados, sin retoque, recorte, cambio de color ni recompresión con pérdida. Se conservan todos, sin sobrescrituras. [generaciones.json](generaciones.json) contiene rutas, dimensiones nativas, bytes, SHA-256 y comparación binaria con el original de la herramienta. La herramienta devolvió imágenes de 1672×941; no se han convertido a WebP final ni asignado a las rutas públicas, porque fueron rechazadas.

Cada archivo se abrió en grande y también como reducción real a **390×219 px**, sin ampliar esa reducción para juzgar la edad. Solo esas reducciones de revisión usan escalado; no son finales editados para ocultar defectos.

| Imagen / versión | Original conservado | Revisión a 390 px | Resultado y motivo |
|---|---|---|---|
| 1 / v1 | [imagen-1-v1.png](originales/imagen-1-v1.png) | [390 px](capturas/imagen-1-v1-390.png) | Rechazada: cabeza elevada respecto a las patas, lámpara visible y cálida, edad corporal y ocular insuficientemente legible. |
| 1 / v2 | [imagen-1-v2.png](originales/imagen-1-v2.png) | [390 px](capturas/imagen-1-v2-390.png) | Rechazada: mejora el apoyo de la cabeza, pero la lámpara continúa visible y cálida; no se acreditan simultáneamente los cinco rasgos senior a 390 px. |
| 1 / v3 | [imagen-1-v3.png](originales/imagen-1-v3.png) | [390 px](capturas/imagen-1-v3-390.png) | Rechazada: lámpara visible y cálida; mirada muy abierta, cuerpo sin reducción muscular inequívoca a 390 px. |
| 1 / v4 | [imagen-1-v4.png](originales/imagen-1-v4.png) | [390 px](capturas/imagen-1-v4-390.png) | Rechazada: lámpara ya fuera de campo, pero edad ocular/corporal sin acreditación suficiente y la ventana sigue pareciendo inmediata al refugio. Cuarta versión: parada obligatoria. |
| 2 / — | No generada | No realizada | No existe todavía una Imagen 1 seleccionada para identidad. |
| 3 / — | No generada | No realizada | Mismo motivo. |

### Uso literal de los prompts

Los textos de §8 se extrajeron automáticamente, conservando palabras, orden, puntuación y marcadores Markdown: [imagen 1](prompts/imagen-1-literal.md), [imagen 2](prompts/imagen-2-literal.md), [imagen 3](prompts/imagen-3-literal.md). No se reescribió ni mejoró el brief. Las cuatro generaciones repitieron el mismo prompt de la Imagen 1, sin adendas correctoras, sin referencias visuales y sin escoger otro perro como referencia.

La única instrucción técnica separada fue «Formato de salida solicitado: imagen horizontal 16:9, 1200×675», tomada del encargo. [Entrada exacta enviada a la herramienta](prompts/imagen-1-entrada-herramienta.txt). Las líneas finales del prompt se trataron como instrucciones, no como texto a pintar. No se observa texto impreso en ninguna de las cuatro imágenes.

## Revisión rasgo a rasgo de la Imagen 1

Son observaciones del productor, realizadas sobre los archivos reales, no mediciones clínicas ni una auditoría. **«No verificable» se trata como «no» y obliga a rechazar**, no como autorización para pasar a la siguiente imagen. La distancia de varios metros se juzga por la composición; no se afirma poder medir una distancia real en una imagen generada.

### Edad a 390 px

| Comprobación | v1 | v2 | v3 | v4 |
|---|---|---|---|---|
| Canas en hocico, cejas y párpados; fuego decolorado y blanco apagado | **No**: hocico gris visible; cejas y párpados no se distinguen con igual claridad. | **No**: hocico aclarado; los detalles de cejas/párpados quedan pequeños y el fuego sigue marcado. | **No**: hocico claro, cejas todavía intensas; insuficiente lectura conjunta. | **No**: hocico gris, blanco apagado; sin lectura inequívoca de los tres puntos faciales a esa escala. |
| Ojos algo hundidos, párpados caídos y mirada serena | **No**: ojo grande y muy abierto. | **No**: mirada atenta, sin hundimiento/caída claros. | **No**: ojo abierto, sin caída clara. | **No**: mirada más reposada, pero sin hundimiento y caída inequívocos a 390 px. |
| Lomo suavizado/hundido, hombros y cuartos traseros con menor masa, relieve discreto de costillas/pelvis | **No**: grupa redondeada y gran parte de la silueta oculta por la cama. | **No**: dorso/grupa se ven llenos; no se acreditan los rasgos corporales exigidos. | **No**: cuerpo parcialmente tapado; el reducido tono muscular no es claro. | **No**: la cama oculta la línea y los apoyos; el conjunto corporal no acredita ese envejecimiento. |
| Postura natural, echada de pecho, cabeza baja, sin pose atlética | **No** para el requisito completo: está echada, pero la cabeza elevada no descansa en las patas como pide la escena. | **Sí**, postura baja y recogida. | **Sí**, cabeza baja, cuerpo recogido. | **Sí**, postura baja y reposada; el apoyo exacto del mentón no se acredita con precisión. |
| Sin enfermedad inventada ni sufrimiento visible | **Sí**: boca cerrada, sin lesiones, jadeo o temblor visibles. | **Sí**, mismos criterios. | **Sí**, mismos criterios. | **Sí**, mismos criterios. |
| Edad senior inequívoca por los cinco rasgos simultáneos | **No** | **No** | **No** | **No** |

### Identidad, anatomía y geometría

| Comprobación | v1 | v2 | v3 | v4 |
|---|---|---|---|---|
| Tipo bodeguero tricolor, antifaz en ojo derecho visible, manchas de lomo y marcas fuego | **Sí**, tipo y marcas generales visibles. | **Sí**, tipo y marcas generales. | **Sí**, tipo y marcas generales. | **Sí**, tipo y marcas generales. |
| Mismo perro entre las tres escenas | **No verificable**: solo candidata de portada. | **No verificable** | **No verificable** | **No verificable** |
| Collar gris y chapa metálica lisa, sin texto | **Sí**, visibles en grande y localizables a 390. | **Sí** | **Sí** | **Sí** |
| Base de orejas algo hacia atrás y punta plegada | **Sí**, orejas recogidas con punta plegada. | **Sí**, sin orejas erguidas. | **Sí**, punta plegada. | **Sí**, punta plegada y base recogida. |
| Cola larga y fina | **No verificable** en la postura/encuadre. | **No verificable** | **No verificable** | **No verificable**: se ve una porción, sin acreditar longitud completa. |
| Cuatro patas correctas, sin fusiones/duplicaciones | **No verificable completo**: delanteras visibles, traseras plegadas/ocultas. | **No verificable completo**, mismo límite. | **No verificable completo**, mismo límite. | **No verificable completo**, mismo límite. |
| Mano con cinco dedos bien formados | **No verificable completo**: algunos dedos se solapan. | **No verificable completo**, dedos en escorzo. | **No verificable completo**, solapamiento. | **No verificable completo**, solapamiento. |
| Perfil mirando a derecha, costado derecho y ojo del antifaz visibles | **Sí** | **Sí** | **Sí** | **Sí** |
| Cabeza apoyada sobre las patas delanteras | **No**, elevada. | **Sí**, mentón junto/sobre patas. | **Sí**, mentón apoyado junto a patas. | **No verificable con precisión**, mentón próximo al borde acolchado. |
| Persiana bajada a la derecha, franjas rojas/amarillas y reflejos sobre pared | **Sí**, rendijas y reflejos visibles; amarillos más tenues. | **Sí**, franjas visibles. | **Sí**, franjas/reflejos. | **Sí**, franjas/reflejos. |
| Refugio entre cama matrimonial y armario, a varios metros de ventana | **No**: cama y armario presentes, pero la ventana se lee próxima. | **No**, ventana próxima al refugio. | **No**, ventana próxima. | **No**, no se lee separación de unos tres metros. |
| Lámpara fuera de campo a izquierda y luz neutra-fría | **No**, lámpara visible y cálida. | **No**, lámpara visible y cálida. | **No**, lámpara visible y cálida. | **Parcial / no**: lámpara fuera de campo, persiste componente cálido; no acredito la luz neutra-fría indicada. |
| Mano por borde inferior derecho, plana, sin contacto ni tapar ojo/costado | **Sí**, posición y ausencia de contacto visibles. | **Sí** | **Sí** | **Sí** |
| Separación de mano respecto al hocico ≈20 cm | **No verificable** con precisión por profundidad/escala. | **No verificable** | **No verificable** | **No verificable** |
| Agua y juguete relleno | **Sí** | **Sí** | **Sí** | **Sí** |
| Sin fuegos visibles, humo ni persona completa | **Sí** | **Sí** | **Sí** | **Sí** |
| Sin objetos eléctricos, velas o cables peligrosos al alcance | **Sí**, no se ven esos riesgos junto al perro. | **Sí** | **Sí** | **Sí** |

### Estética y relación con alt/pie

| Comprobación | v1 | v2 | v3 | v4 |
|---|---|---|---|---|
| Texturas de tela/pelo/tarima y pequeñas imperfecciones | **Sí**, arañazo y textiles usados; detalle en grande. | **Sí** | **Sí**, calcetín/arañazo. | **Sí**, textiles y marcas de uso. |
| Acabado documental, saturación contenida, sin texto/logos/HDR evidente | **Sí**, con salvedad de la paleta. | **Sí**, misma salvedad. | **Sí**, misma salvedad. | **Sí**, misma salvedad. |
| Paleta propia sin predominio cálido/dorado | **No**, iluminación de lámpara cálida. | **No**, dominante cálida. | **No**, dominante cálida. | **No**, mejora por fondo azulado pero suelo/cama siguen cálidos; no alcanza lo pedido. |
| Grano fino visible a escala grande y sin suavizado plástico | **Parcial / no**: texturas visibles, grano de captura no claramente separado del detalle. | **Parcial / no** | **Parcial / no** | **Parcial / no** |
| Alt del §8 sostenido completo: perra senior, persiana/reflejos y mano | **No**: persiana, reflejos y mano sí; edad senior no acreditada por los cinco rasgos. | **No**, mismo motivo. | **No**, mismo motivo. | **No**, mismo motivo. |
| Pie del §8 sostenido completo: refugio lejos de ventana, agua, juguete y cama | **No**: objetos sí, separación de ventana no. | **No**, mismo motivo. | **No**, mismo motivo. | **No**, mismo motivo. |

No se corrigen el alt o el pie para ajustarlos a estas candidatas rechazadas. Tampoco se retocan edad, manos o distancias para disimular los defectos.

## Imágenes 2 y 3

| Comprobación requerida | Imagen 2 | Imagen 3 |
|---|---|---|
| Original y WebP final | **No**, no generada | **No**, no generada |
| Edad a 390 px, cinco rasgos | **No comprobada** | **No comprobada** |
| Identidad de la portada | **No comprobada** | **No comprobada** |
| Cuatro patas y manos anatómicas | **No comprobadas** | **No comprobadas** |
| Geometría de marcha y doble sujeción | **No comprobada** | No aplica |
| Geometría de consulta y manos de ambas mujeres | No aplica | **No comprobada** |
| Paleta y estética documental | **No comprobadas** | **No comprobadas** |
| Coherencia con alt y pie | **No comprobada** | **No comprobada** |

## Integración, pruebas y discrepancias

- Se inspeccionaron las referencias del MDX sin editarlo: heroImage apunta a la portada exacta; las dos img de cuerpo apuntan a consulta y paseo, con `width="1200" height="675"`, alt y pie coincidentes con §8. El hero adquiere esas dimensiones del layout, no de un img escrito en el MDX.
- **Discrepancia de pie de portada ya existente:** el pie previsto en §8 no está escrito en el cuerpo y el layout usa el alt como figcaption. Se anota; no se cambia ni el texto ni el layout por cuenta propia.
- La ficha de imagen 2 mezcla «28–35 mm» y «50 mm», y el prompt dice «ligeramente picado hacia arriba». Para una futura generación, la lectura conservadora sería la cámara baja de 45 cm y el gran angular del prompt literal; no se reescribió el brief. La cláusula de cabeza/orejas/cola se entiende referida a la perra, conforme al encargo, no al tutor.
- La postura recogida de la portada oculta parte de las patas y del dorso. Se registra como dificultad de comprobación, sin declarar visibles rasgos que quedan tapados.
- **No hay WebP finales** en las tres rutas públicas. No se actualiza la entrega de redacción para afirmar que existen binarios finales: siguen pendientes. Los cuatro PNG aquí conservados son descartes de producción.
- **No se ejecuta un nuevo build ni una prueba Playwright de integración con los finales**, porque no existe una primera imagen seleccionada y se ha alcanzado el límite de parada. El build anterior del texto no valida estos PNG ni la integración de tres imágenes nuevas.
- Capturas realizadas: cuatro reducciones PNG de cada original a 390 px, abiertas una a una. **No** son capturas Playwright del artículo.
- Pendiente sin probar en esta producción: artículo con tres imágenes decodificadas; CLS; 390/1366 px claro/oscuro; tablas apiladas; alturas; tres avisos; contraste y desbordamiento. No se presentan pruebas previas como pruebas repetidas.
- Artículo, brief y testimonios intactos: [integridad inicial](integridad-inicial.json) y [comparación final](integridad-final.json). No se ha creado copia permanente ni temporal en `src/content/blog/`, ni PR, merge o publicación.

## Decisión que necesita el propietario

Se solicita decisión antes de un quinto intento de portada o de producir las escenas dependientes. La opción técnica propuesta es autorizar una adenda correctora al prompt, conservando su texto original y los descartes: reforzar los rasgos senior legibles y corregir encuadre, separación de ventana y luz. **Esa adenda no se ha aplicado ni se ha modificado el brief.** El propietario también puede revisar estas candidatas antes de decidir otra vía. El conjunto todavía no está listo para la auditoría visual de tres finales.
