# Producción visual — miedo a los petardos en perros mayores

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`, desde la rama de redacción, base `486d55f`.

**Resultado posterior de auditoría independiente R1 (2026-10-26): conjunto NO APTO.** Portada NO APTO por falta de franjas rojas y amarillas sobre la pared; paseo final v8 APTO y consulta v1 APTO. El descarte de paseo v6 contiene tres zapatos; el final v8 contiene dos. [Informe independiente y evidencias](auditoria-visual-r1.md). Las revisiones del productor que siguen se conservan como historial de producción, no prevalecen sobre este resultado. No se han corregido ni regenerado recursos en esta ronda.

**Estado actual: las tres imágenes tienen binario final seleccionado por el productor: portada v9, paseo v8 y consulta v1.** Se han ejecutado build y pruebas de integración con las tres. El conjunto queda documentado para auditoría visual independiente, **sin declarar aprobación**. Pendientes conocidos: altura móvil de las tablas y diferencia preexistente del pie de portada. Véase el cierre de producción al final; las secciones intermedias conservan el historial de descartes y pruebas parciales.

**Historial de los dos primeros ciclos:** producción detenida tras ocho versiones de portada no seleccionadas, dos ciclos autorizados de cuatro intentos. Se aplica el límite expreso del encargo: «Máximo 4 versiones por imagen; si a la cuarta sigue fallando, detente y pide decisión». El segundo ciclo fue autorizado por el propietario el 2026-10-26 con «Autorizar adenda y cuatro intentos» y comprende v5–v8. En esos dos primeros ciclos no se generaron las imágenes 2 y 3: el proceso exigía una primera imagen seleccionada como referencia de identidad. No se emite auditoría independiente ni se declara aprobado el conjunto.

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

## Integración, pruebas y discrepancias de los primeros ciclos (histórico)

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


## Tercer ciclo autorizado: portada v9 y escenas dependientes

El propietario autorizó el cambio de encuadre/postura con «Autorizo», en respuesta a la pregunta sobre hacer comprobable el dorso. Se comunicó un límite de cuatro intentos para este ciclo; se selecciona v9 en el primero y no se consumen v10–v12. La postura ahora es más extendida: sigue tumbada en su cama, apoyada en los codos, con cabeza baja pero sin apoyar el mentón sobre las patas. La cámara queda ligeramente más alta y el borde de la cama es bajo. Son las diferencias autorizadas respecto a la postura inicial del §8; se conservan el significado del alt («tumbada en su cama»), el pie y la identidad. El brief no se modifica.

[Adenda autorizada](prompts/adenda-portada-ciclo-3-v9.md), [entrada íntegra](prompts/imagen-1-v9-entrada-herramienta.txt), [original v9](originales/imagen-1-v9.png), [reducción a 390 px](capturas/imagen-1-v9-390.png), [detalle nativo de mano](capturas/imagen-1-v9-mano-detalle.png). No hay retoque de edad ni anatomía; el detalle de mano es un recorte diagnóstico, no parte del final.

Las escenas 2 y 3 se generaron solo después de abrir y seleccionar la v9, pasando ese PNG como referencia explícita. Se conservó el prompt literal de cada escena y se añadió únicamente el formato técnico. Se produjeron cuatro versiones del paseo y una de consulta. **Seleccionar para producción no equivale a aprobar una auditoría independiente.**

| Imagen | Versiones nuevas de este turno | Selección del productor | Archivo final |
|---|---|---|---|
| 1, portada | v9; ciclos anteriores v1–v8 conservados | v9 | `public/images/blog/miedo-petardos-perros-mayores/bodeguero-senior-refugio-dormitorio-nochevieja-v1.webp` |
| 2, paseo | v1–v4 | Ninguna | Pendiente; no se escribe un descarte en la ruta pública. |
| 3, consulta | v1 | v1 | `public/images/blog/miedo-petardos-perros-mayores/bodeguero-senior-revision-dolor-consulta-v1.webp` |

Los dos WebP finales son **1200×675**, calidad 92. Se conserva cada PNG original, sin sobrescribirlo. La transformación final es solo escalado proporcional, ajuste geométrico subpíxel para 16:9 y codificación WebP; no cambia color, textura, anatomía o contenido para disimular defectos. Se crea además una variante de portada de 400×225 acorde al helper del sitio. No se crean variantes de cuerpo sin uso: el MDX mantiene sus img originales sin srcset. Dimensiones, tamaños y SHA en [binarios-finales-parciales.json](binarios-finales-parciales.json).

### Portada y consulta: revisión del productor rasgo a rasgo

| Comprobación | Portada v9 | Consulta v1 |
|---|---|---|
| Canas en hocico, cejas y párpados, con fuego apagado y blanco mate a 390 | **Sí**, contorno facial plateado y marcas menos intensas; no se pretende resolver cada pelo individual. | **Sí**, conserva las zonas plateadas de referencia. |
| Ojos marrones algo hundidos, párpados algo caídos y mirada serena a 390 | **Sí**, ojo más pequeño con arco superior bajo y contorno retraído. | **Sí**, mirada tranquila al premio y contorno semejante. |
| Dorso ligeramente suavizado/hundido, menor masa en hombros y muslos, pelvis discreta a 390 | **Sí**, ahora se ve la silueta; los muslos estrechos y el flanco suelto resultan legibles. | **Sí**, cintura, muslos y relieve pélvico discretos, sin emaciación. |
| Postura natural de mayor, cabeza a la altura del lomo o baja | **Sí**, tumbada extendida; diferencia de postura autorizada. | **Sí**, de pie con apoyos prudentes y cuello relajado. |
| Sin enfermedad inventada, jadeo, temblor, heridas o sufrimiento | **Sí** | **Sí** |
| Misma identidad: perfil derecho, antifaz, manchas negras, fuego, orejas plegadas y cola fina | **Sí**, sujeto de referencia. | **Sí**, correspondencia de cabeza, marcas, collar y proporciones con v9. |
| Collar de nailon gris y chapa metálica lisa | **Sí**, sin letras discernibles. | **Sí**, sin letras discernibles. |
| Cuatro extremidades naturales sin fusión/duplicación | **Sí**, postura nueva permite localizar delanteras y traseras. | **Sí**, cuatro apoyos sobre la alfombrilla. |
| Manos sin dedos extra ni fusiones visibles | **Sí**, mano en grande revisada también mediante recorte nativo. | **Sí**, manos de ambas mujeres con gestos anatómicos naturales; algunos dedos doblados por la sujeción o premio. |
| Geometría propia de la escena | **Sí**, perfil a derecha, mano desde abajo/derecha sin tocar/tapar; ventana al fondo derecho con suelo libre entre ella y cama. | **Sí**, veterinaria izquierda/detrás en lado opuesto a cámara, una mano bajo abdomen y otra en lumbar/cadera; tutora derecha frente a cabeza, pecho y premio. |
| Edad facial/corporal legible conjuntamente a 390 | **Sí según revisión del productor**; queda para contraste independiente. | **Sí según revisión del productor**; mismo límite. |
| Persiana bajada y franjas finas rojas/amarillas en pared | **Sí**, visibles; sin fuegos ni humo. | No aplica. |
| Lámpara fuera de campo a izquierda, luz neutra-fría | **Sí**, sin lámpara visible; madera conserva su tono propio y destellos cálidos localizados. | No aplica; luz de consulta fría/neutra. |
| Cama junto a cama matrimonial/armario, lejos de ventana | **Sí**, profundidad legible; no se mide una distancia física exacta desde la imagen. | No aplica. |
| Agua y juguete relleno, sin texto/logos | **Sí**, comida visible en abertura del juguete; superficies lisas. | No aplica. |
| Mesa de acero y alfombrilla gris, perra estable | No aplica. | **Sí**, cuatro apoyos sin inmovilización forzada. |
| Veterinaria verde botella con estetoscopio, tutora con rebeca gris | No aplica. | **Sí**, miradas acordes con la exploración/premio. |
| Ordenador apagado, armario con cajones, estor y báscula en fondo | No aplica. | **Sí**, visibles; parte de la zona inferior queda detrás de la mesa. |
| Grano fino/texturas de captura, sin piel plástica, glow, HDR o viñeteado evidente | **Sí en revisión de tamaño grande**, detalle fino y texturas mates. | **Sí**, pelo, tejido y acero sin acabado suave de anuncio. |
| Paleta propia de escena, saturación contenida | **Sí**, noche neutra con franjas rojas/amarillas. | **Sí**, clínica de luz fría. |
| Coherencia con alt y pie existentes | **Sí**, perra tumbada, persiana/reflejos, mano; refugio, agua y juguete. | **Sí**, revisión lumbar/cadera con ayuda de tutora y premio. |
| Escena físicamente segura | **Sí**, sin cables/velas eléctricos al alcance ni contacto forzado. | **Sí**, alfombrilla, apoyo respetuoso, sin sangre, jeringas, collar isabelino o dolor evidente. |

La distancia aproximada de la mano se valora como cercanía sin contacto, no como una medida exacta de veinte centímetros. No se modifican alt o pie para acomodarlos a defectos; el cambio autorizado de postura sí queda expresamente consignado.

### Paseo: cuatro descartes y parada

| Versión | Original / 390 px | Edad/identidad | Geometría/anatomía y motivo de rechazo |
|---|---|---|---|
| v1 | [Original](originales/imagen-2-v1.png), [390](capturas/imagen-2-v1-390.png) | Conserva referencia tricolor, canas, cuello/cuerpo fino y cuatro patas. | Marcha a derecha y posiciones de persona/perra correctas; **no** se acredita caída en J, parecen dos tiras rectas desde mano. |
| v2 | [Original](originales/imagen-2-v2.png), [390](capturas/imagen-2-v2-390.png) | Misma lectura general senior; no seleccionada. | **No**, dos tiras casi paralelas, correa recta; enganche al collar ambiguo. |
| v3 | [Original](originales/imagen-2-v3.png), [390](capturas/imagen-2-v3-390.png) | Misma referencia y anatomía general. | **No**, tramo recto con eslabones/ramales; además signos luminosos en el bar que no permiten asegurar cero letras. |
| v4 | [Original](originales/imagen-2-v4.png), [390](capturas/imagen-2-v4-390.png) | Misma referencia, cuatro patas, sin otros perros. | Mejora el cabo único hasta la zona de bifurcación, pero **no** queda flojo en J ni inequívoco que el segundo mosquetón vaya al collar, separado del arnés. |

En las cuatro: parka oliva, bufanda gris, recorte por el pecho, perra en primer plano junto a fachada, tutor hacia calzada, ambos hacia derecha, cielo azul y farolas cálidas. Ese contexto sí se cumple, pero el alt/pie prometen doble sujeción y correa floja, por lo que **no** se considera suficiente. La estética/edad o el fondo correctos no compensan la geometría fallida. No se declara ninguna de las cuatro apta para final.

Se alcanza el límite de cuatro versiones del paseo y se pide autorización específica antes de una quinta. [Propuesta de adenda todavía no ejecutada](prompts/propuesta-adenda-paseo.md): un solo cabo claramente curvado, bifurcación baja y enganches diferenciados a arnés y collar. No se cambia el brief ni se publica un descarte.

## Prueba de integración parcial real

Se copió temporalmente el MDX intacto a src/content/blog/, se ejecutó `npx astro build` con resultado **0**, incluida la proyección Markdown, y se retiró la copia. [Log](build-parcial.log). No hay movimiento permanente del artículo ni despliegue.

Se sirvió **dist/client con `python3 -m http.server 4466 --bind 127.0.0.1`** y se usó Playwright ya instalado con Chromium del sistema. No se usó astro dev ni se reinstaló Playwright. Son capturas del artículo generado por el layout real, no una maqueta HTML. [Script](verificar-navegador.cjs), [resultados](verificacion-navegador.json), [contraste](contraste.json), [script de contraste](medir-contraste.cjs).

| Medición | 390 claro / oscuro | 1366 claro / oscuro |
|---|---|---|
| scrollWidth | 390 / 390 | 1366 / 1366 |
| Portada y consulta | Decodificadas en ambos modos | Decodificadas en ambos modos |
| Paseo | **404, pendiente**, no comprobado | **404, pendiente**, no comprobado |
| Tabla calendario | **991 / 991 px** | 443 / 443 px |
| Tabla encuesta | **1291,4 / 1291,4 px** | 650,3 / 650,3 px |
| Aviso info | 348,5 / 348,5 px | 243 / 243 px |
| Aviso danger | 424 / 424 px | 273 / 273 px |
| Aviso warning | 394 / 394 px | 243 / 243 px |
| Contraste mínimo de texto/pseudo-labels/pies | **4,50:1 / 5,52:1** | **4,50:1 / 5,52:1** |
| CLS observado en esa carga controlada | 0 / 0 | 0 / 0 |

**Pendiente concreto encontrado:** las tablas se apilan (`td display:block` y data-label presentes), pero superan el presupuesto móvil orientativo de ~900 px. Se registran las capturas/alturas sin cambiar texto o estilos fuera del alcance autorizado. No se declara cumplida la comodidad móvil de las dos tablas. Los tres avisos caben por debajo de ese límite y son legibles en las capturas inspeccionadas.

Se generaron 28 capturas aisladas: dos imágenes seleccionadas, dos tablas y tres avisos × dos anchos × dos temas. En la inspección se abrieron las imágenes/recursos móviles y una selección de sus equivalentes de escritorio; todos los archivos quedan disponibles para que el auditor los abra por separado. No se afirma una auditoría visual independiente ni una inspección individual de cada píxel de las 28 capturas.

Fuentes Lora, Outfit y Plus Jakarta Sans cargadas: se descargaron con curl usando proxy y confianza TLS heredados y se sirvieron a Chromium desde caché. Otros terceros bloqueados. Elementos fijos/sticky del sitio ocultos **solo durante las capturas aisladas** para no tapar los recursos. La medición de ancho y CLS se tomó antes de ocultarlos. No se desactiva la comprobación TLS.

El srcset del hero y la precarga del layout hicieron que el navegador eligiera la ruta principal de 1200 en las cuatro combinaciones registradas, pese a existir variante 400. Las dimensiones naturales informadas por el DOM pueden estar corregidas por densidad; los tamaños reales de archivos están en el manifiesto. Consulta sirve el WebP de 1200 por el img original del MDX. No se afirma servir una variante solo por haberla creado.

No hay errores JavaScript en las páginas probadas. El servidor estático da un 404 adicional para `/api/feedback`, que requiere el backend y no se valida aquí. No se envían formularios ni mensajes. CLS=0 es observación de esta prueba con retraso de carga de imágenes y fuentes, no garantía de rendimiento en todos los dispositivos. No se prueban Safari/Firefox, dispositivo móvil físico, la página desplegada ni los tres finales completos.

Se verificaron las tres referencias exactas y las dimensiones de cuerpo/hero: [rutas-y-dimensiones.json](rutas-y-dimensiones.json). Sigue sin resolverse por cuenta propia la discrepancia del pie de portada: el layout muestra el alt como figcaption, no el pie específico de §8. Artículo, brief y testimonios intactos según los hashes. En entrega-redaccion.md solo se actualizan las dos celdas de recursos para indicar existencia y ruta de los binarios; el veredicto no se cambia.

## Decisión pendiente actual

Portada y consulta quedan disponibles para revisión independiente de esos recursos. El conjunto de tres no está completo. Está pendiente la respuesta a la pregunta sobre **adenda correctora y hasta cuatro intentos adicionales del paseo**. No se genera una quinta versión sin ella. La altura de las tablas y el pie del hero quedan documentados para resolución editorial posterior, sin modificar el artículo ni sus componentes en esta producción.


## Cierre de producción: paseo v8 y conjunto de tres imágenes

El propietario autorizó el segundo ciclo del paseo con **«Autorizar adenda y cuatro intentos»** el 2026-10-26. Se conservó el prompt original completo y se ejecutaron v5–v8. Las adendas se centran en la correa y posición del paseo, sin cambiar raza, edad, entorno o sentido de marcha.

| Imagen | Original seleccionado | Total de versiones | Final público, 1200×675 |
|---|---|---|---|
| Portada | [imagen-1-v9.png](originales/imagen-1-v9.png) | **9**, en tres ciclos autorizados; v1–v8 rechazadas | `bodeguero-senior-refugio-dormitorio-nochevieja-v1.webp` |
| Paseo | [imagen-2-v8.png](originales/imagen-2-v8.png) | **8**, en dos ciclos autorizados; v1–v7 rechazadas | `bodeguero-senior-paseo-antes-de-nochevieja-v1.webp` |
| Consulta | [imagen-3-v1.png](originales/imagen-3-v1.png) | **1** | `bodeguero-senior-revision-dolor-consulta-v1.webp` |

Los tres finales están en `public/images/blog/miedo-petardos-perros-mayores/`. Existe además la variante de portada `bodeguero-senior-refugio-dormitorio-nochevieja-v1-400.webp` de 400×225. [Tamaños, bytes y SHA actuales](binarios-finales.json). Se conservan **18 PNG originales** sin sobrescribir ni retocar, más sus reducciones reales a 390 px. El manifiesto histórico parcial no se reescribe para simular que siempre hubo tres archivos.

### Segundo ciclo de paseo: versiones y motivos

| Versión | Archivo / vista a 390 px | Resultado y motivo |
|---|---|---|
| v5 | [Original](originales/imagen-2-v5.png), [390](capturas/imagen-2-v5-390.png) | Rechazada. Mejora la caída floja y el enganche al collar, pero la unión coincide con la anilla del arnés en vez de una bifurcación separada, y la perra queda adelantada. |
| v6 | [Original](originales/imagen-2-v6.png), [390](capturas/imagen-2-v6-390.png) | Rechazada. Introduce una tira extra que asciende desde la unión hacia la ropa; la topología deja de ser de tres conexiones. |
| v7 | [Original](originales/imagen-2-v7.png), [390](capturas/imagen-2-v7-390.png) | Rechazada. Unión y enganches más claros, pero el cabo principal sigue pareciendo diagonal en vez de caer en la J solicitada. |
| v8 | [Original](originales/imagen-2-v8.png), [390](capturas/imagen-2-v8-390.png), [detalle nativo de enganches](capturas/imagen-2-v8-enganches-detalle.png) | Seleccionada por el productor. Cabo único con curva floja y punto bajo antes de subir a la unión; dos ramales, dos mosquetones, uno al arnés y otro al collar. |

[Adenda v5](prompts/adenda-paseo-v5.md), [v6](prompts/adenda-paseo-v6.md), [v7](prompts/adenda-paseo-v7.md), [v8](prompts/adenda-paseo-v8.md). Las entradas completas están junto a esas adendas con nombres `imagen-2-v5-entrada-herramienta.txt` a `imagen-2-v8-entrada-herramienta.txt`. Cada una conserva íntegro el prompt original. El archivo de propuesta no ejecutada anterior queda como antecedente; las entradas autorizadas sí se ejecutaron.

Las v7/v8 recibieron como referencia auxiliar una [guía de topología](prompts/guia-topologia-correa.png), renderizada desde [SVG](prompts/guia-topologia-correa.svg), solo para aclarar un cabo, una unión y dos extremos. Es material técnico de producción, **no un recurso insertado en el artículo ni una edición de la foto**. La identidad siguió viniendo únicamente de la portada v9. La generación final no contiene el diagrama ni texto explicativo. No se corrigieron cables mediante retoque posterior.

### Paseo v8: comprobación rasgo a rasgo del productor

Se abrió el PNG completo y su reducción de 390 px, después el detalle nativo de mosquetones y las capturas del WebP integrado. Esta tabla es revisión de producción; la auditoría independiente debe abrir los archivos y confirmar o discrepar.

| Comprobación | Sí/no y nota |
|---|---|
| Canas simultáneas en hocico, cejas y contorno palpebral a 390 | **Sí**, gris plateado del hocico y contorno del antifaz, fuego apagado y blanco mate; no se pretende contar pelos individuales. |
| Ojos marrones algo hundidos, párpados algo caídos y mirada serena | **Sí**, conserva la fisonomía de la referencia, ojo pequeño y arco palpebral bajo. |
| Lomo suavizado/hundido y menor masa de hombros y muslos; pelvis/costillas discretas | **Sí según revisión del productor**, cintura y cuartos traseros finos con contorno dorsal suavizado, sin delgadez extrema. |
| Postura natural de mayor, cabeza a la altura del lomo o baja | **Sí**, paseo a ritmo tranquilo, cabeza baja respecto a la cruz, sin salto o carrera. |
| Sin enfermedad inventada, cojera, lesiones, ojos rojos, jadeo o sufrimiento | **Sí**, boca cerrada y apoyos naturales. |
| Misma identidad que portada/consulta | **Sí**, mismo tipo bodeguero tricolor, antifaz derecho, manchas dorsales, marcas fuego apagadas, orejas plegadas, cola larga/fina, collar gris y chapa lisa. |
| Cuatro patas y anatomía del perro | **Sí**, cuatro extremidades separadas, sin duplicaciones ni fusiones visibles. |
| Mano derecha anatómica, sin dedos adicionales/fusionados | **Sí**, agarre natural del bucle; los dedos doblados quedan parcialmente superpuestos como corresponde al gesto. |
| Cámara próxima a fachada, a altura del lomo, con vista del costado derecho | **Sí**, fachada próxima a izquierda, perra en primer plano y calzada detrás. |
| Tutor y perra avanzan juntos de izquierda a derecha | **Sí**, cuerpos, pasos y cabeza de la perra orientados a derecha. |
| Perra junto a la pierna, del lado de fachada y más cerca de cámara | **Sí**, tutor detrás hacia calzada; sin perro distante tirando por delante. |
| Tutor recortado por pecho, sin cabeza/cara; parka oliva y bufanda gris | **Sí**, extremos de bufanda sobre el pecho. |
| Un solo cabo no extensible desde mano derecha | **Sí**, un tramo principal, sin segunda correa paralela ni mecanismo extensible. |
| Curva floja en J/U legible a 390 | **Sí**, punto bajo visible antes de subir a la unión; no línea diagonal recta. |
| Bifurcación en dos ramales cortos | **Sí**, unión separada con dos extremos; no tira adicional ascendente. |
| Mosquetón a anilla dorsal del arnés | **Sí**, comprobado en detalle nativo. |
| Otro mosquetón a collar separado, con chapa lisa | **Sí**, enganche en anilla superior del collar distinto de la cinta del arnés; chapa cuelga de la zona del collar. |
| Dos ramales visibles en móvil; enganches discernibles en grande | **Sí**, se revisaron ambos tamaños y el detalle nativo. |
| Correa sin tensión ni ramales entre patas; cola neutra y orejas relajadas | **Sí**, caída libre, sin tracción visible del cuello. |
| Hora azul, farolas anaranjadas y luces navideñas blancas | **Sí**, sin convertir toda la imagen en filtro dorado. |
| Fondo de ladrillo, coches aparcados, terraza recogida con sillas y contenedores amarillo/azul | **Sí**, detalles presentes; las conexiones de cierre de sillas quedan pequeñas en el fondo, sin lectura de cada eslabón a 390. |
| Sin otros perros, móviles, carrera o sentido contrario | **Sí**, no se ven esos elementos. |
| Sin texto, letras o logos discernibles | **Sí en inspección**, superficies de fondo sin inscripciones legibles ni marca en collar/chapa. |
| Texturas documentales y grano fino, saturación contenida, sin glow/HDR/viñeteado evidente | **Sí en revisión grande**, pelo, tela y acera mates con detalle fino. |
| Imagen sostiene alt/pie: marcha conjunta, arnés/collar con chapa y correa floja | **Sí**, no se modificaron los textos para acomodarlos a un fallo. |

La longitud de unos 1,2 m no puede medirse exactamente desde una perspectiva generada; se comprueba una correa corta, no extensible, con holgura y geometría coherente. No se presenta esa lectura como una medida física precisa. La postura autorizada de portada y la revisión detallada de consulta se conservan arriba; ninguna de esas dos imágenes se ha alterado para producir el paseo.

## Integración de las tres imágenes: prueba completa de esta producción

[Build](integracion-completa/build.log): `npx astro build`, **exit 0**, con las tres imágenes existentes y proyección Markdown generada. La copia temporal del artículo se retiró después. No se modifica el contenido, no se deja el artículo en src/content/blog/ y no se publica.

[Script de navegador](integracion-completa/verificar-navegador.cjs), [resultados completos](integracion-completa/verificacion-navegador.json), [contraste](integracion-completa/contraste.json), [rutas/dimensiones](integracion-completa/rutas-y-dimensiones.json). Se conserva la prueba parcial anterior en sus rutas, sin sustituir su 404 histórico por un éxito retrospectivo.

Se sirvió el build real de `dist/client` con Python HTTP local en 127.0.0.1:4466 y se usaron Playwright ya instalado y Chromium del sistema. No se reinstaló Playwright, no se necesitó astro dev ni se fabricó una maqueta. Tres imágenes, dos tablas y tres avisos × cuatro combinaciones = **32 capturas aisladas** en [integracion-completa/capturas/](integracion-completa/capturas/).

| Resultado | 390 claro / oscuro | 1366 claro / oscuro |
|---|---|---|
| Tres imágenes decodificadas | Sí / Sí | Sí / Sí |
| Archivos de imagen ausentes | Ninguno | Ninguno |
| scrollWidth | 390 / 390 | 1366 / 1366 |
| CLS observado en la carga controlada | 0 / 0 | 0 / 0 |
| Errores JavaScript | 0 / 0 | 0 / 0 |
| Contraste mínimo de textos medidos, incluidas etiquetas de celdas | 4,50:1 / 5,52:1 | 4,50:1 / 5,52:1 |
| Tabla calendario, altura | **991 / 991 px** | 443 / 443 px |
| Tabla encuesta, altura | **1291,4 / 1291,4 px** | 650,3 / 650,3 px |

### Capturas para abrir en la auditoría

| Recurso | 390 claro | 390 oscuro | 1366 claro | 1366 oscuro |
|---|---|---|---|---|
| Portada | [Abrir](integracion-completa/capturas/390-claro-portada.png) | [Abrir](integracion-completa/capturas/390-oscuro-portada.png) | [Abrir](integracion-completa/capturas/1366-claro-portada.png) | [Abrir](integracion-completa/capturas/1366-oscuro-portada.png) |
| Paseo | [Abrir](integracion-completa/capturas/390-claro-paseo.png) | [Abrir](integracion-completa/capturas/390-oscuro-paseo.png) | [Abrir](integracion-completa/capturas/1366-claro-paseo.png) | [Abrir](integracion-completa/capturas/1366-oscuro-paseo.png) |
| Consulta | [Abrir](integracion-completa/capturas/390-claro-consulta.png) | [Abrir](integracion-completa/capturas/390-oscuro-consulta.png) | [Abrir](integracion-completa/capturas/1366-claro-consulta.png) | [Abrir](integracion-completa/capturas/1366-oscuro-consulta.png) |
| Calendario | [Abrir](integracion-completa/capturas/390-claro-tabla-calendario.png) | [Abrir](integracion-completa/capturas/390-oscuro-tabla-calendario.png) | [Abrir](integracion-completa/capturas/1366-claro-tabla-calendario.png) | [Abrir](integracion-completa/capturas/1366-oscuro-tabla-calendario.png) |
| Encuesta | [Abrir](integracion-completa/capturas/390-claro-tabla-encuesta.png) | [Abrir](integracion-completa/capturas/390-oscuro-tabla-encuesta.png) | [Abrir](integracion-completa/capturas/1366-claro-tabla-encuesta.png) | [Abrir](integracion-completa/capturas/1366-oscuro-tabla-encuesta.png) |
| Aviso info | [Abrir](integracion-completa/capturas/390-claro-aviso-info.png) | [Abrir](integracion-completa/capturas/390-oscuro-aviso-info.png) | [Abrir](integracion-completa/capturas/1366-claro-aviso-info.png) | [Abrir](integracion-completa/capturas/1366-oscuro-aviso-info.png) |
| Aviso danger | [Abrir](integracion-completa/capturas/390-claro-aviso-danger.png) | [Abrir](integracion-completa/capturas/390-oscuro-aviso-danger.png) | [Abrir](integracion-completa/capturas/1366-claro-aviso-danger.png) | [Abrir](integracion-completa/capturas/1366-oscuro-aviso-danger.png) |
| Aviso warning | [Abrir](integracion-completa/capturas/390-claro-aviso-warning.png) | [Abrir](integracion-completa/capturas/390-oscuro-aviso-warning.png) | [Abrir](integracion-completa/capturas/1366-claro-aviso-warning.png) | [Abrir](integracion-completa/capturas/1366-oscuro-aviso-warning.png) |

Se han abierto los originales y las reducciones a 390 de las tres selecciones, así como las cuatro capturas integradas del paseo y recursos de portada/consulta/tablas/avisos de la prueba anterior. Las 32 capturas actuales se conservan completas para la revisión independiente; no se presenta la captura automática como auditoría de cada detalle. El estado claro/oscuro y contraste se midió con el estilo computado, incluyendo pseudo-labels.

Los métodos y límites de la prueba parcial siguen aplicando: fuentes descargadas con curl/proxy/TLS heredados, otros terceros bloqueados, elementos fijos/sticky ocultos solo al capturar recursos. La carga se retrasó para observar estabilidad; CLS=0 se limita a esta ejecución de laboratorio, sin afirmar un resultado universal de Core Web Vitals. No se prueban Safari/Firefox, móvil físico, lector de pantalla o despliegue público. El 404 de `/api/feedback` corresponde al backend no servido por Python; no es un fallo de carga de las imágenes y no se envían formularios. Los tamaños efectivamente elegidos están en currentSrc del JSON, sin equiparar naturalWidth corregido por densidad a bytes físicos.

## Pendientes conocidos y límites de la entrega final

1. **Auditoría visual independiente pendiente.** Se entregan tres finales, fuentes de generación, descartes, hashes y pruebas; el productor no los declara aprobados.
2. **Altura móvil de tablas incumple el presupuesto orientativo (~900 px):** 991 y 1291,4 px. Se apilan y no desbordan en horizontal, pero necesitan decisión de diseño/corrección autorizada. No se modificaron ni texto ni componentes para ocultar el problema.
3. **Pie de portada preexistente:** el layout usa el alt como figcaption y no el pie particular del brief. No se cambia por cuenta propia. El cambio de postura de portada sí está expresamente autorizado y documentado; los alt/pies no se reescribieron.
4. **Pendientes clínico-documentales del artículo:** no se cierran por producir imágenes; siguen en la entrega textual.
5. **Integridad:** artículo, brief y testimonios conservan los SHA iniciales. Solo se actualizan las tres celdas de existencia/ruta de recursos en entrega-redaccion.md, sin alterar su veredicto. El resto de esa entrega es histórico de la fase de redacción.
6. Sin PR, merge, publicación ni artículo permanente en src/content/blog/. Se permanece en `claude/imagenes-miedo-petardos-perros-mayores`.
