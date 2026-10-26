# Producción visual — miedo a los petardos en perros mayores

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`, desde la rama de redacción, base `486d55f`.

**Estado actual: producción detenida tras ocho versiones de la Imagen 1, ninguna seleccionada; dos ciclos de cuatro intentos, ambos autorizados.** Se aplica el límite expreso del encargo: «Máximo 4 versiones por imagen; si a la cuarta sigue fallando, detente y pide decisión». El segundo ciclo fue autorizado por el propietario el 2026-10-26 con «Autorizar adenda y cuatro intentos» y comprende v5–v8. Las imágenes 2 y 3 no se generan porque el proceso exige que la primera supere todas las comprobaciones antes de utilizarla como referencia de identidad. No se emite auditoría independiente ni se declara aprobado el conjunto.

## Archivos y método

Los ocho PNG son copias íntegras de los originales generados, sin retoque, recorte, cambio de color ni recompresión con pérdida. Se conservan todos, sin sobrescrituras. [generaciones.json](generaciones.json) contiene rutas, dimensiones nativas, bytes, SHA-256 y comparación binaria con el original de la herramienta. La herramienta devolvió imágenes de 1672×941; no se han convertido a WebP final ni asignado a las rutas públicas, porque fueron rechazadas.

Cada archivo se abrió en grande y también como reducción real a **390×219 px**, sin ampliar esa reducción para juzgar la edad. Solo esas reducciones de revisión usan escalado; no son finales editados para ocultar defectos.

| Imagen / versión | Original conservado | Revisión a 390 px | Resultado y motivo |
|---|---|---|---|
| 1 / v1 | [imagen-1-v1.png](originales/imagen-1-v1.png) | [390 px](capturas/imagen-1-v1-390.png) | Rechazada: cabeza elevada respecto a las patas, lámpara visible y cálida, edad corporal y ocular insuficientemente legible. |
| 1 / v2 | [imagen-1-v2.png](originales/imagen-1-v2.png) | [390 px](capturas/imagen-1-v2-390.png) | Rechazada: mejora el apoyo de la cabeza, pero la lámpara continúa visible y cálida; no se acreditan simultáneamente los cinco rasgos senior a 390 px. |
| 1 / v3 | [imagen-1-v3.png](originales/imagen-1-v3.png) | [390 px](capturas/imagen-1-v3-390.png) | Rechazada: lámpara visible y cálida; mirada muy abierta, cuerpo sin reducción muscular inequívoca a 390 px. |
| 1 / v4 | [imagen-1-v4.png](originales/imagen-1-v4.png) | [390 px](capturas/imagen-1-v4-390.png) | Rechazada: lámpara ya fuera de campo, pero edad ocular/corporal sin acreditación suficiente y la ventana sigue pareciendo inmediata al refugio. Cuarta versión: parada obligatoria. |
| 2 / — | No generada | No realizada | No existe todavía una Imagen 1 seleccionada para identidad. |
| 3 / — | No generada | No realizada | Mismo motivo. |

### Primer ciclo: uso literal de los prompts

Los textos de §8 se extrajeron automáticamente, conservando palabras, orden, puntuación y marcadores Markdown: [imagen 1](prompts/imagen-1-literal.md), [imagen 2](prompts/imagen-2-literal.md), [imagen 3](prompts/imagen-3-literal.md). No se reescribió ni mejoró el brief. Las cuatro generaciones del primer ciclo repitieron el mismo prompt de la Imagen 1, sin adendas correctoras, sin referencias visuales y sin escoger otro perro como referencia.

La única instrucción técnica separada fue «Formato de salida solicitado: imagen horizontal 16:9, 1200×675», tomada del encargo. [Entrada exacta enviada a la herramienta](prompts/imagen-1-entrada-herramienta.txt). Las líneas finales del prompt se trataron como instrucciones, no como texto a pintar. No se observa texto impreso en ninguna de las cuatro imágenes.

## Primer ciclo: revisión rasgo a rasgo de la Imagen 1

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
- **No hay WebP finales** en las tres rutas públicas. No se actualiza la entrega de redacción para afirmar que existen binarios finales: siguen pendientes. Los ocho PNG aquí conservados son descartes de producción.
- **No se ejecuta un nuevo build ni una prueba Playwright de integración con los finales**, porque no existe una primera imagen seleccionada y se ha alcanzado el límite de parada. El build anterior del texto no valida estos PNG ni la integración de tres imágenes nuevas.
- Capturas realizadas: ocho reducciones PNG de cada original a 390 px, abiertas una a una. **No** son capturas Playwright del artículo.
- Pendiente sin probar en esta producción: artículo con tres imágenes decodificadas; CLS; 390/1366 px claro/oscuro; tablas apiladas; alturas; tres avisos; contraste y desbordamiento. No se presentan pruebas previas como pruebas repetidas.
- Artículo, brief y testimonios intactos: [integridad inicial](integridad-inicial.json) y [comparación final](integridad-final.json). No se ha creado copia permanente ni temporal en `src/content/blog/`, ni PR, merge o publicación.

## Decisión del primer ciclo y su resolución

La petición de autorizar una adenda y un segundo ciclo se resolvió el 2026-10-26 con «Autorizar adenda y cuatro intentos». Se ejecutó ese alcance, sin modificar el brief. El segundo ciclo y la decisión ahora pendiente se documentan a continuación.


## Segundo ciclo autorizado — versiones 5 a 8

Se conserva el prompt original íntegro en las cuatro entradas. Las adendas se guardan separadas y cada entrada completa queda versionada, sin modificar las de los intentos anteriores:

- v5: [adenda inicial](prompts/adenda-portada-ciclo-2.md), [entrada completa](prompts/imagen-1-v5-entrada-herramienta.txt). Prioriza envejecimiento, suelo libre entre refugio/ventana, fuente de luz fuera de campo y dedos distinguibles.
- v6: [adenda v6](prompts/adenda-portada-v6.md), [entrada completa](prompts/imagen-1-v6-entrada-herramienta.txt). Refuerza los rasgos faciales y la silueta corporal, con precisiones en inglés; mantiene el original en español íntegro.
- v7: [adenda v7](prompts/adenda-portada-v7.md), [entrada completa](prompts/imagen-1-v7-entrada-herramienta.txt). Coloca las correcciones antes del original para darles prioridad, sin retirar texto original.
- v8: [precisión v8](prompts/adenda-portada-v8.md), [entrada completa](prompts/imagen-1-v8-entrada-herramienta.txt). Conserva la adenda v7 y explicita que el requisito original de cero texto también afecta a los grabados del juguete.

Las cuatro son generaciones nuevas, sin edición posterior ni referencias de identidad tomadas de una candidata rechazada. Los cambios de adenda se limitan a hacer visibles las condiciones originales y las correcciones autorizadas. No se cambiaron raza, edad declarada, escena, alt ni pie. No se produjeron las otras dos escenas con un sujeto que no hubiese superado la revisión.

| Imagen / versión | Original conservado | Reducción real | Resultado |
|---|---|---|---|
| 1 / v5 | [PNG](originales/imagen-1-v5.png) | [390 px](capturas/imagen-1-v5-390.png) | Rechazada: mejora luz/profundidad, pero ojos abiertos y cuerpo lleno; no acredita el conjunto senior. |
| 1 / v6 | [PNG](originales/imagen-1-v6.png) | [390 px](capturas/imagen-1-v6-390.png) | Rechazada: mantiene mejora de encuadre, sin resolver caída palpebral y lectura de masa muscular. |
| 1 / v7 | [PNG](originales/imagen-1-v7.png) | [390 px](capturas/imagen-1-v7-390.png) | Rechazada: mejor lectura del ojo y perfil, pero no acredita todos los rasgos corporales; se observan posibles caracteres grabados en el juguete a tamaño grande. |
| 1 / v8 | [PNG](originales/imagen-1-v8.png) | [390 px](capturas/imagen-1-v8-390.png) | Rechazada: juguete sin caracteres discernibles, pero ojo muy abierto y dorso/reducción muscular insuficientemente verificables a 390. Cuarto intento adicional: parada. |

### Edad y anatomía — comprobación por versión a 390 px

| Rasgo | v5 | v6 | v7 | v8 |
|---|---|---|---|---|
| Canas simultáneas en hocico, cejas y párpados, fuego decolorado y blanco apagado | **No completo**: hocico/contorno claros, cejas menos resueltas. | **No completo**: pelo plateado visible, detalle palpebral pequeño. | **Sí en lectura general**, ceja y contorno plateados; no se acreditan pelos individuales. | **Sí en lectura general**, hocico y contorno aclarados; mismo límite de detalle. |
| Ojos algo hundidos y párpados algo caídos, mirada serena | **No**, ojo grande y abierto. | **No**, ojo abierto sin caída clara. | **Sí**, párpado superior más bajo y mirada reposada, más claro en grande. | **No**, vuelve el ojo más abierto. |
| Dorso ligeramente hundido y menor masa en hombros/cuarto trasero, pelvis/costillas discretas | **No**, grupa llena y silueta poco reveladora. | **No**, músculo/silueta no inequívocos. | **No completo**, perfil más visible pero no acredita todo el conjunto corporal a esa escala. | **No**, dorso y menor masa no verificables con claridad. |
| Postura natural, cabeza baja apoyada en patas, sin pose atlética | **Sí**, recogida y cabeza baja. | **Sí**, mentón junto a patas. | **Sí**, mentón apoyado en las patas. | **Sí**, mentón apoyado en patas. |
| Sin enfermedad inventada: lesiones, cojera aparente, ojos rojos, jadeo o sufrimiento | **Sí**, nada de ello se ve. | **Sí** | **Sí** | **Sí** |
| Cinco rasgos de edad simultáneos claramente legibles | **No** | **No** | **No** | **No** |
| Anatomía de las extremidades sin fusiones/duplicaciones visibles | **Sí en lo visible**; las traseras plegadas impiden contar todos los apoyos. | **Sí en lo visible**, mismo límite. | **Sí en lo visible**, mismo límite. | **Sí en lo visible**, mismo límite. |
| Mano con cinco dedos individualmente contables | **No verificable completo** por superposición/escorzo. | **No verificable completo** | **No verificable completo** | **No verificable completo** |

### Identidad, geometría, estética y alt/pie — segundo ciclo

| Comprobación | v5 | v6 | v7 | v8 |
|---|---|---|---|---|
| Bodeguero tricolor, perfil derecho y antifaz visibles | **Sí** | **Sí** | **Sí** | **Sí** |
| Collar gris con chapa lisa, orejas con punta plegada | **Sí** | **Sí** | **Sí** | **Sí** |
| Cola larga/fina | **Parcial**, una porción visible. | **Sí**, extensión visible junto a grupo trasero. | **Sí**, contorno visible. | **Sí**, curva junto a cuartos traseros. |
| Misma identidad en tres escenas | **No comprobada**, escenas 2/3 no generadas. | **No comprobada** | **No comprobada** | **No comprobada** |
| Cabeza hacia derecha, boca cerrada, sin jadeo | **Sí** | **Sí** | **Sí** | **Sí** |
| Persiana bajada derecha, franjas rojas y amarillas/reflejos | **Sí** | **Sí** | **Sí** | **Sí** |
| Cama entre cama matrimonial/armario; profundidad hacia ventana | **Sí**, suelo libre y ventana al fondo; distancia no medible exactamente. | **Sí**, misma lectura. | **Sí**, misma lectura. | **Sí**, misma lectura. |
| Mano granate desde abajo/derecha, plana, sin contacto ni tapar perro | **Sí** | **Sí** | **Sí** | **Sí** |
| Mano a unos 20 cm | **No medible con precisión** en perspectiva. | **No medible con precisión** | **No medible con precisión** | **No medible con precisión** |
| Lámpara fuera de campo y ambiente menos cálido | **Sí**, relleno más frío y sin lámpara visible. | **Sí** | **Sí**, con franjas amarillas localizadas. | **Sí**, sin lámpara visible, tonos cálidos localizados. |
| Textura documental de tela, pelo y madera; sin aspecto plástico evidente | **Sí** | **Sí** | **Sí** | **Sí** |
| Grano fino inequívoco, separado de la textura de objetos | **No verificable con claridad** | **No verificable con claridad** | **No verificable con claridad** | **No verificable con claridad** |
| Cero texto/logos en objetos | **Sí a simple inspección**, sin inscripción discernible. | **Sí a simple inspección** | **No**, posibles caracteres grabados en el juguete; se rechaza conservadoramente. | **Sí a simple inspección**, juguete sin caracteres discernibles. |
| Agua y juguete relleno junto al perro | **Sí** | **Sí** | **Sí** | **No completo**: agua y juguete sí, relleno no visible. |
| Sin fuegos visibles, humo, persona completa o riesgo eléctrico al alcance | **Sí** | **Sí** | **Sí** | **Sí** |
| Alt/pie completos sostenidos por la imagen | **No**, edad completa sin acreditar. | **No**, mismo motivo. | **No**, mismo motivo. | **No**, edad completa y relleno del juguete sin acreditar. |

Estos son juicios de producción sobre el archivo grande y su reducción real, no un certificado clínico ni una auditoría independiente. Se conserva el criterio conservador: no afirmar que se ven los rasgos que no se distinguen y no asignar una ruta pública final a un descarte.

## Estado de integración tras el segundo ciclo

Hay ocho PNG originales, ocho reducciones a 390 px y las entradas de generación versionadas. **Cero WebP finales y cero llamadas para imágenes 2/3.** Se mantienen pendientes build y pruebas Playwright de la integración final con tres imágenes, CLS, desbordamiento, tablas y avisos. No se ha alterado ningún archivo de src ni se ha instalado Playwright de nuevo.

Artículo, brief y testimonios siguen idénticos a los hashes iniciales. La entrega de redacción permanece intacta: no se actualiza su apartado de recursos para afirmar que existen binarios finales cuando no existen.

## Decisión ahora pendiente

Se ha agotado el segundo ciclo autorizado; no se hace un noveno intento por inercia. Se propone que el propietario abra las v7/v8 y decida si el criterio de edad corporal debe seguir exigiéndose íntegramente a 390 px en esta postura recogida o si autoriza ajustar el encuadre/postura para hacerlo comprobable. Cualquier relajación de criterios, aceptación de candidata o nuevo ciclo requiere su decisión explícita. El conjunto de tres finales sigue sin estar listo para auditoría visual independiente.
