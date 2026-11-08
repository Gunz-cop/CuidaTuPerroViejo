# Auditoría independiente del artículo LA-01 — R1

## Veredicto

**No publicable todavía: el texto necesita corregir el encuadre clínico del perro que no se levanta y la equivalencia injustificada entre «algo para dormir» y acepromazina.**

La base editorial es buena y se puede conservar. No necesita una reescritura completa ni más palabras por sistema. Los defectos principales están en ciertas afirmaciones categóricas y en decisiones prácticas que quedan incompletas.

### Alcance y versión

- Fecha: 8 de noviembre de 2026.
- Repositorio: `Gunz-cop/CuidaTuPerroViejo`.
- Rama leída: `claude/gallant-curie-vixi47`.
- Commit: `ae9386811b75610d394992f1b41a181a744b21ea`.
- Archivo: `src/content/blog/miedo-polvora-perros-mayores.mdx`, 451 líneas.
- SHA-256 del MDX: `bec8062184483fe77c22d95f149b35cfe9b4cbe1de773212a4310c28e12e5fd8`.
- Contrato: `briefings/briefing-miedo-polvora-perros-mayores.md`, v6.2.
- Ronda: primera auditoría del artículo localizada en esta rama. Las seis rondas previas son del brief; no las cuento como rondas del artículo ni reabro ese documento.
- Método: skill `.agents/skills/auditar-articulo-blog/SKILL.md`, control de calidad editorial, guía de voz y tono, política editorial, testimonios originales y comprobación de las 14 referencias.
- Entrega solicitada: **solo texto**. Las siete imágenes y las pruebas visuales son una fase pendiente; su ausencia no es la razón del rechazo editorial.
- Se inspeccionaron las rutas y componentes del repositorio. **No se ejecutó el build, no se hicieron capturas ni pruebas de interacción, y no se certifica publicación en producción.** La revisión de imágenes, responsive y herramientas queda expresamente fuera del cierre de esta ronda textual.
- No se modificó el artículo, el brief, los componentes ni el inventario. Este documento contiene instrucciones para otra sesión correctora.
- Evidencia reproducible: carpeta `auditoria-articulo-r1-evidencias/`, con salida del script original, tono, recuento independiente y verificador. El primer snapshot procedente del conector tenía una línea vacía adicional al final; se contrastó con Git y se recalculó el hash sobre los bytes exactos del checkout. No cambian el texto ni los recuentos.

## Hallazgos

Prioridad: P0 bloquea por seguridad o por una afirmación clínica clave sin respaldo; P1 requiere corrección antes de entregar el texto final; P2 mejora precisión o mantenimiento. No se atribuye intención de inventar a quien redactó.

### P0-1. «Ya no puede levantarse» se trata como una situación doméstica estable sin comprobar que lo sea

**Ubicación:** MDX:147–187; especialmente 155–171, 175 y FAQ de la línea 445.

El apartado pasa directamente a elegir cuarto, trasladar al perro de día y pedir una demostración «en noviembre». Falta delimitar que habla de una limitación **crónica, ya evaluada y con un plan veterinario vigente**. Si el perro acaba de perder la capacidad de levantarse, el lector puede interpretar que debe organizar una cueva y esperar la consulta.

La frase «El tuyo no puede cambiar de postura, alejarse del calor, beber ni orinar por su cuenta» convierte una limitación de movilidad en cinco incapacidades universales. No poder caminar no establece por sí mismo ninguna de las otras cuatro. Además, «Orina: empapadores debajo» no responde a una verdadera incapacidad de vaciar la vejiga. Un perro puede gotear y conservar orina retenida.

**Contraste:** VCA incluye no poder ponerse de pie/caminar sin ayuda entre las razones para atención de urgencia. Merck distingue pérdida de almacenamiento, dificultad de vaciado y alteraciones neurológicas de la micción; describe también goteo por rebosamiento. No son problemas intercambiables con ensuciar una colchoneta.

**Riesgo real:** confundir una urgencia nueva con cuidados crónicos; tratar la falta de micción como un problema de higiene.

**Instrucción:** abrir el apartado delimitando su población; indicar atención inmediata si la incapacidad apareció de repente o empeoró de forma aguda. Describir ayudas según las capacidades reales de cada perro. Separar higiene de comprobación de micción; ante imposibilidad de orinar o intentos improductivos, contactar al servicio veterinario. No añadir técnicas de expresión vesical ni tratamientos caseros. Conservar la pauta individual de postura/alimentación y actualizar la FAQ correspondiente.

**Origen:** parte del problema viene del brief, que ya agrupa esas incapacidades. El artículo no queda exento por seguirlo; registrar la incidencia para corregir el contrato en una sesión distinta, sin abrir aquí otra auditoría general del brief.

### P0-2. Se identifica «algo para que duerma» con acepromazina y se extiende el rechazo a «algo parecido»

**Ubicación:** MDX:386, en «Lo que oyes en diciembre»; contraste con 218–220.

Texto: «“Dale algo para que duerma”. Es la acepromazina o algo parecido. Ya viste por qué no: queda quieto, pero sigue asustado».

No se puede deducir el fármaco a partir de ese consejo coloquial. La ESVCE desaconseja específicamente la acepromazina para el miedo agudo porque no ofrece ansiólisis fiable; al mismo tiempo recomienda alternativas farmacológicas individualizadas con efecto ansiolítico. «O algo parecido» deja al lector sin saber qué medicamentos se están descartando y puede extender la objeción a una opción veterinaria adecuada.

**Instrucción:** rechazar la automedicación; explicar por separado la objeción específica a la acepromazina. Conservar que hay tratamiento veterinario posible y que inmovilidad visible no acredita alivio del miedo. Sin nombres nuevos de medicamentos, marcas, dosis ni pautas. No modificar el rechazo correcto de la acepromazina en el H2 de consulta.

**Origen:** añadido del artículo. El brief pedía remitir al apartado de acepromazina, no identificar cualquier sedante como ese fármaco.

### P1-1. La búsqueda del perro fugado comienza con una tranquilidad no respaldada

**Ubicación:** MDX:321 y 335–337.

«Un perro que se sale con la pólvora no suele ir lejos» está inmediatamente después de los reportes de Bogotá. Esa fuente registra intentos de huida/desorientación, no distancias ni rutas posteriores. Ninguna de las referencias aportadas respalda esa frecuencia. «Muchos perros escondidos salen solos cuando para el ruido» tampoco tiene una base cuantificada en el expediente.

Buscar primero los alrededores es una estrategia; afirmar que el perro probablemente sigue cerca es otra cosa. El texto ofrece una ruta local útil, pero no explica qué hacer si esa ruta no da resultado.

**Instrucción:** mantener la revisión inmediata de lugares cercanos como primer paso, retirar la predicción de distancia y añadir cómo ampliar y mantener la búsqueda si no aparece. No sugerir esperar a que vuelva. Mantener avisos con foto, veterinarias y vecinos. Si se contempla dejar una entrada accesible, precisar vigilancia continua y seguridad de los demás animales.

### P1-2. Falta resolver una necesidad inevitable de una noche completa: salir a orinar/defecar

**Ubicación:** MDX:236–265 y FAQ:443.

Se propone paseo previo y después «el perro no sale». No hay alternativa para el perro que necesita hacer sus necesidades durante las horas de pólvora. La versión de España sí resuelve esta situación; omitirla para diferenciar artículos reduce utilidad y seguridad.

**Contraste:** Cornell recomienda planificar las salidas y usar correa incluso en patio cercado si resulta necesario salir durante los fuegos. Es una medida de prevención de fugas, especialmente pertinente en una guía centrada en casas con patio.

**Instrucción:** añadir una contingencia breve: lugar interior habitual si lo usa; si necesita salir, acompañamiento, sujeción segura y el momento de menor ruido posible, sin acceso libre al patio o portón. Adaptar a movilidad y pauta individual. No copiar la sección española ni convertirlo en una receta universal de equipo.

### P1-3. La FAQ de Bogotá promete una ruta de reporte y responde con una fecha histórica

**Ubicación:** MDX:353, 367 y 449. Brief:§11, gate de actualización de Bogotá.

«¿Dónde reporto…?» responde que en diciembre de 2025 se abrió un formulario. No proporciona enlace operativo ni ruta clara al canal vigente. El enlace que hay en el cuerpo lleva a una noticia antigua; el lector debe resolver por su cuenta el trámite que el artículo promete explicar.

La comprobación de esta auditoría encontró una comunicación oficial del **29 de octubre de 2026** para la campaña del **30 de octubre de 2026 al 6 de enero de 2027**, que dirige al IDPYBA y a `https://www.animalesbog.gov.co/`. Por tanto, ya hay una fuente contemporánea para actualizar la orientación. No comprobé el envío de un formulario ni certifico una URL final del formulario.

**Instrucción:** comprobar el recorrido vigente del IDPYBA y enlazarlo. Si no se localiza un formulario funcional, dar la página oficial y explicar dónde consultar la campaña, sin afirmar acceso directo verificado. Separar registro ciudadano, denuncia formal y urgencia veterinaria; no trasladar automáticamente al canal de 2026 la naturaleza jurídica de la encuesta de 2024. Los datos históricos de 2025 pueden seguir en el contexto estadístico.

**Origen:** gate del brief pendiente de ejecución, no falsedad de los reportes históricos.

### P1-4. La actualización legal exigida por el contrato no se cerró

**Ubicación:** MDX:353 y 361; brief:§3 S14 y §11.

El texto cuenta lo que la Ley 2224 «mandó fijar» y remite al decreto de cada alcaldía. Esa descripción histórica no es falsa, pero omite que el **Decreto nacional 2174 de 2023** reglamentó esa ley. El Ministerio del Interior lo confirma expresamente en su comunicación del 17 de diciembre de 2023. El gate del brief exigía comprobar si se había expedido la reglamentación.

**Instrucción:** verificar y citar la reglamentación nacional vigente, situarla junto a las normas municipales y fechar la comprobación. No hace falta desarrollar categorías o cuantías para resolver la consulta del cuidador. Evitar que el rango de multas, de escasa utilidad aquí, ocupe el espacio del canal o procedimiento que sí necesita.

**Límite:** comprobé la existencia mediante comunicación ministerial; el acceso directo a la página jurídica del decreto falló. No certifico en este informe cada disposición consolidada ni su vigencia íntegra al día.

### P1-5. Riemer se simplifica hasta cambiar la unidad del resultado y se añade una población no verificada

**Ubicación:** MDX:179, 255, 257 y 386–390.

El artículo dice «dar comida… fue lo único del manejo» asociado a mejoría. El resumen publicado describe un componente estadístico **Feed/Play**, que agrupa comida, masticables y juego; no aisló la comida como único elemento eficaz. El artículo también añade «pero en perros que se movían»: el resumen accesible no documenta ese criterio de inclusión. No puede presentarse como una característica comprobada de toda la muestra sin localizarla en métodos.

Las cifras **más del 70 % / 694**, **55 % / 377** y **27–35 %** sí coinciden con el resumen publicado. El problema no es el número: es traducir una asociación agrupada a una eficacia exclusiva y afirmar una población que no se ha verificado. «Funcionan a volumen muy bajo» también pasa de valoración de dueños a una promesa de funcionamiento; el volumen bajo corresponde al diseño del aprendizaje, no demuestra eficacia individual.

**Instrucción:** describir el grupo comida/juego/masticables y su asociación observada, sin causalidad ni exclusividad de la comida. Para el perro inmóvil, decir que el estudio no valida una pauta específica para esa situación, en lugar de asegurar que todos los estudiados caminaban. Mantener el porcentaje del contracondicionamiento como percepción de dueños. En la recomendación de comida, hacer local el límite «si la acepta y puede comer con seguridad», ya presente en otro H2. No insistir ni usar el porcentaje como probabilidad individual.

**Origen:** simplificación y restricción de población ya presentes en el brief. La fuente publicada accesible permite mejorar la fidelidad sin cambiar la estrategia del artículo.

### P2-1. Un criterio de observación se convierte en diagnóstico de ansiedad por separación

**Ubicación:** MDX:289: «Si solo le pasa cuando se queda solo, es otro problema: ansiedad por separación…».

La relación temporal con quedarse solo merece consulta; no establece el diagnóstico ni elimina causas urinarias. La política editorial dice que el sitio no diagnostica.

**Instrucción:** presentar la ansiedad por separación como una posibilidad que investigar, conservando la consulta ante escapes nuevos o persistentes. El enlace es pertinente; la certeza de la frase no lo es.

### P2-2. Se confunde falta de estudios localizados con inexistencia demostrada

**Ubicación:** MDX:23 y 151.

La apertura afirma «no hay estudios latinoamericanos» y el H2-4 sí usa la fórmula más defendible «No encontramos estudios». El brief documenta búsquedas limitadas, no una revisión sistemática de toda la literatura regional.

**Instrucción:** describir la evidencia utilizada y lo que no se localizó, sin declarar inexistencia universal. Mantener los límites en una frase útil; no llenar el texto de salvedades.

### P2-3. Algunas frases tranquilizan o garantizan más de lo que sostienen las fuentes

**Ubicación:** MDX:95 («Basta con que esas noches… duerma dentro»); 143 y FAQ:450 (frazada en ciudades altas); 202 («sabe en dos minutos…»); 299 («La mayoría de las noches malas terminan cuando para el ruido»).

Entrar es una protección central, pero no basta para todos los perros; el propio artículo prescribe plan veterinario y preparación. Altitud y mes no sustituyen observar la temperatura real. La promesa de «dos minutos» no tiene base. La recuperación al cesar el ruido no es la misma variable que recuperarse a la mañana siguiente, que es el dato de Riemer que sí se cita después.

**Instrucción:** conservar las acciones concretas y quitar suficiencia, tiempo garantizado y generalización térmica. Antes de urgencias, abrir con señales observables, sin anteponer una garantía de que lo habitual ya terminó.

### P2-4. La firma manual duplica el sistema editorial y mezcla voces sin identificar al narrador

**Ubicación:** MDX:21 y 25; plantilla `src/pages/[pilar]/[slug].astro`:164; `src/components/ArticleByline.astro`.

La plantilla ya imprime autor y fecha. El MDX añade otra firma con «Actualizado», aunque solo declara `datePublished`. Coinciden hoy, pero la segunda fecha queda fuera del mecanismo que sincroniza firma y schema. Además, «cuento», «un tío mío» y «un compañero de trabajo» pasan de una firma colectiva a un yo cuya identidad solo se aclara consultando la política editorial.

**Instrucción:** dejar la autoría/fecha al componente global e identificar una vez al responsable de los recuerdos, según la procedencia real del expediente. No atribuir titulación ni revisión veterinaria. No cambiar todo el relato a plural: eso convertiría recuerdos de una persona en recuerdos del equipo.

### P2-5. Dos secciones quedan ligeramente por debajo del margen contractual, sin justificar añadir relleno

**Ubicación:** H2-1 y H2-7; tabla de recuento más abajo.

El brief exige ±10 %. H2-1 queda aproximadamente a −10,39 % y H2-7 a −11,09 %. Es una desviación marginal de unas dos y cinco palabras respecto al mínimo de sección; no una carencia sustancial de cobertura. Ninguna justifica alargar relatos ni repetir fuentes. Las correcciones útiles pueden resolverlo solas.

**Instrucción:** volver a contar con un método acordado después de corregir. Si se conserva una sección más breve porque funciona, documentar el ajuste de contrato; no declarar un cumplimiento numérico falso.

### P2-6. La entrega textual no debe confundirse con una autorización para publicar la rama

**Ubicación:** frontmatter:7–11; comentarios de imagen; inventario LA-01; `getStaticPaths()` y `TarjetaRelacionada.astro`.

El MDX dice `Publicado`, el inventario aún «En Briefing», no existen los siete recursos finales y los comentarios colocan un pendiente en cada H2, incluso en H2-4, cuyo contrato prohíbe una imagen. No son diez encargos visuales: son siete imágenes, seis ilustraciones y una foto. La tarjeta recíproca de España ya apunta al artículo y lo incluirá por su estado `Publicado`.

**Instrucción para integración:** conservar una lista de publicación separada y corregir estados al cerrar la entrega real. Cambiar solo a `Borrador` no protege la ruta: `getStaticPaths()` genera todas las entradas de la colección. La restricción útil es no integrar/desplegar todavía esta entrega incompleta, o aplicar el mecanismo de exclusión que decida el proyecto. No implementarlo dentro de esta auditoría.

## Lo que sí funciona y debe conservarse

- **Utilidad regional concreta:** patio, portón, pila, visitas, celosías, calor y rutas del barrio. La pieza aporta algo más que traducir «petardos» a «pólvora».
- **Respuesta temprana:** el primer párrafo ya recomienda interior, preparación y consulta. El defecto de su longitud no convierte la apertura en relleno.
- **Procedencia narrativa:** Osa y Baltor coinciden con el archivo original; se conservan dudas de memoria, no se añade edad senior ni desenlace. Luna se limita a los sustos autorizados. La perra del compañero es anónima y no se relaciona con el perro postrado. No se inventan pacientes, titulaciones o curaciones.
- **Bogotá:** 115 reportes; 74 %, 31 %, 21 %; 1.901, 702 y 1.199 coinciden con las noticias consultadas. El texto conserva la ambigüedad del denominador y distingue reporte voluntario de estudio. No presentar esas cifras como prevalencia latinoamericana.
- **Edad:** Salonen y el matiz sanos/enfermos de Riemer están bien atribuidos. La hipótesis del oído está presentada como hipótesis.
- **Dolor:** la serie de 20 perros se usa para pedir evaluación, sin afirmar que pruebe causalidad.
- **Acepromazina:** el rechazo específico está respaldado por ESVCE y Teletica/COLVET. No diluirlo al corregir el P0-2.
- **CBD:** se distingue razonablemente la indicación veterinaria del COLVET de la opinión del veterinario citado. No convertir esa opinión periodística en un ensayo ni en una recomendación propia de eficacia.
- **Cuidados del perro inmóvil:** no forzar comida, detenerse si tose, pauta individual de postura y vigilancia son límites valiosos. Deben conservarse al acotar la población.
- **Componentes:** tres avisos con los tipos exigidos; ocho FAQ en el componente plegado; tabla con encabezados y `data-label`; bibliografía en `details` cerrado. No falta una bibliografía por no usar un cuarto `AlertBox`.
- **Enlaces:** los 14 destinos internos de Markdown existen en la arquitectura local y corresponden a su pilar/página. Hay tarjeta en ambos sentidos y enlace contextual hacia España.
- **Tono:** tuteo, objetos y acciones concretas; cero muletillas detectadas. Sin dosis, marcas, promesa de curación o pautas de prescripción.

## Métricas y límites del script

Se ejecutaron el script de la skill y `tono.py` sobre el archivo final. El script de métricas devuelve **NO APTO**, pero no debe usarse como veredicto editorial en este caso:

1. No interpreta los targets ni el rango de este formato de brief: devuelve `null–null` aunque el contrato sí los contiene.
2. No reconoce la tabla de fuentes del brief. Las 14 referencias no están ausentes: se comprobaron manualmente.
3. Busca la bibliografía en un `AlertBox` antiguo y no reconoce `data-editorial-bibliography` con `details`.
4. Cuenta código/atributos y bibliografía: da 5.986 palabras; no es el recuento de texto útil exigido por el contrato.
5. La portada ausente sí es real, pero pertenece a la fase visual pendiente.

**Recuento independiente:** unas **5.379 palabras**, retirando frontmatter, imports, comentarios MDX, destinos de enlaces, atributos/tags, tarjeta y bibliografía; incluyendo encabezados, contenido y títulos de avisos, tabla y preguntas/respuestas FAQ. Se usa separación por espacios sobre texto visible; las pequeñas diferencias entre segmentadores no cambian que cumple el rango de **5.300–6.000**. El objetivo es 5.700, no un mínimo adicional.

| Sección | Real | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 303 | 320 | −5,31 % |
| H2-1 Barrio | 457 | 510 | −10,39 % |
| H2-2 Patio | 535 | 560 | −4,46 % |
| H2-3 Cueva | 420 | 450 | −6,67 % |
| H2-4 No se levanta | 529 | 520 | +1,73 % |
| H2-5 Consulta | 475 | 520 | −8,65 % |
| H2-6 Casa llena | 437 | 480 | −8,96 % |
| H2-7 Esconderse/familia | 409 | 460 | −11,09 % |
| H2-8 Portón | 345 | 360 | −4,17 % |
| H2-9 Ley | 385 | 420 | −8,33 % |
| H2-10 Consejos/enero | 521 | 560 | −6,96 % |
| Conclusión + FAQ | 563 | 540 | +4,26 % |

Métricas diagnósticas del script original: **116 párrafos; media 33, mediana 32; 6 % por encima de 50 palabras; máximo 86; un fragmento menor de 12 palabras; 11 H2 y 35 H3**. Estas métricas trabajan sobre Markdown y no equivalen a altura renderizada en un teléfono. El primer párrafo es el más claro candidato a dividir: reúne cinco decisiones y la promesa del H2-4.

`tono.py`: **0 muletillas / 1.000**; informa 4.918 palabras bajo sus propias exclusiones, que incluyen FAQ y avisos de seguridad. Esa cifra tampoco es el volumen del contrato. No se detectó usted, voseo o españolismos de vivienda. «Traste», «pila» y «reventar pólvora» encajan con el contexto del brief.

Frontmatter: `seoTitle` de 55 caracteres y meta de 156. Son válidos; no hay obligación general de llenar un número exacto de caracteres. Fecha ISO y fecha manual coinciden hoy. La keyword está en título, SEO title y slug. «Petardos» solo aparece en rutas de la otra versión, no invade los encabezados ni metadatos principales.

## Fuentes: identidad, afirmación y alcance de la comprobación

Numeración S1–S14 del brief. Consulta propia realizada el 8 de noviembre de 2026; no se tomó el informe anterior como comprobación de esta ronda.

| Fuente | Identidad y localización leída | Afirmación / H2 | Resultado y límite |
|---|---|---|---|
| S1 Salonen et al., 2020, Scientific Reports; DOI 10.1038/s41598-020-59837-z | Texto completo PMC7058607; Results, prevalence y Age and sex differences | 13.700 perros finlandeses; fuegos como subrasgo frecuente; edad / H2-1 | Corresponde. El total preciso de respuestas es 13.715; el título y la aproximación a 13.700 son válidos. Estudio transversal, no trayectoria individual. |
| S2 Gähwiler, Bremhorst, Tóth y Riemer, 2020; DOI 10.1038/s41598-020-72841-7 | Texto completo PMC7525486; Methods y Results | 36 perros; orejas, jadeo y movimiento / H2-4 | Corresponde al cambio grupal. Su aplicación al perro inmóvil es extrapolación editorial declarada, no validación diagnóstica. |
| S3 Lopes Fagundes et al., 2018; DOI 10.3389/fvets.2018.00017 | Texto completo Frontiers; muestra y comparación con/sin dolor | 20 perros; inicio tardío y generalización / H2-5 y H2-10 | Adecuado para sugerir revisión del dolor. No demuestra que todo miedo tardío sea dolor. |
| S4 Riemer, 2020, Journal of Veterinary Behavior 37:61–70; DOI 10.1016/j.jveb.2020.04.005 | Identidad Crossref y resumen publicado en FAO AGRIS; contraste adicional con preprint en Europe PMC PPR81538 | Feed/Play, interacción, porcentajes de tratamientos / H2-4, H2-6, H2-10 | Cifras comprobadas. Corregir unidad estadística y la población no verificada: P1-5. DOI/editorial bloqueado; repositorio de Berna devolvió HTML de protección en vez de PDF. No se afirma haber leído el texto completo publicado. |
| S5 ESVCE, v2.1, junio de 2026 | PDF completo, apartados Use of acepromazine, Immediate actions y Longer-term treatment | Rechazo específico de acepromazina; refugio acondicionado; tratamiento individual / H2-2, 3, 4, 5, 10 | Respalda lo principal. No respalda «algo parecido»: P0-2. La disponibilidad local de fármacos no se ha comprobado y no se añaden nombres. |
| S6 Riemer, 2019, PLOS ONE; DOI 10.1371/journal.pone.0218150 | Texto completo PMC6730926; Discussion, Health problems/age, y Time until recovery | Subida/bajada por edad con y sin problemas de salud; recuperación / H2-1 y H2-10 | Correcto el matiz de edad. Recuperación a la mañana siguiente no respalda automáticamente «cuando para el ruido»: P2-3. |
| S7 IDPYBA/Bogotá, 7-12-2024 | Noticia oficial; pasajes sobre noviembre 2022–2024 y naturaleza de la encuesta | 1.901, 702, 1.199; recomendaciones de complementos / H2-1, H2-10 | Cifras correctas y bien limitadas. Una recomendación institucional de esencias no acredita eficacia. |
| S8 Bogotá, 25-12-2025, nodo 282673 | Noticia oficial; resultados y formulario acumulado de 730 respuestas | 115, 74 %, 31 %, 21 % / H2-1, H2-8, H2-9 | Datos presentes; denominador ambiguo reconocido. No contiene distancias de fuga ni resuelve el canal actual. |
| S9 COLVET según Delfino, 10-12-2024 | Nota completa; recomendaciones de Silvia Coto y sección CBD de Daniel Meza | Cueva, paseo/olfato, placa, consulta y CBD / H2-3, 5, 6, 8, 10 | Atribución secundaria conservada. «Énfasis en Analgesia y Anestesia» es la descripción publicada; evitar convertirla en una especialidad acreditada que no se comprobó. Sin comunicado original localizado. |
| S10 COLVET según Teletica, 17-12-2022 | Nota completa; recomendaciones, esfínteres, acepromazina | Cueva, vigilancia, horarios, pánico / H2-3, 5, 6, 7 | Corresponde. Se excluyen acertadamente cifras/afirmaciones cardíacas no sustentadas. Sin original colegial consultado. |
| S11 FMVZ-UNAM según N+, 14-12-2024 | Nota completa; redirección de tendencias a estilo-de-vida; lista de recomendaciones | No patio/terraza, calma, música, no fomentar pólvora, posible juego con restos / H2-2, 6, 7, 10 | Corresponde a lo que dice la prensa. No se certifica el boletín original. No se usan sus cifras dudosas de audición/pérdidas. |
| S12 Chile, Ley 21.310, 3-2-2021 | PDF del Diario Oficial, arts. 1 y 2, nuevo 14 E | Sanción por uso sin autorización / H2-9 | El resumen no inventa penas ni una prohibición por animales. La ley remite a otra norma; no es una comprobación completa del régimen consolidado chileno. |
| S13 Colombia, Ley 670/2001 | Texto Senado; arts. 4 y 7 | Competencia de alcaldes y prohibición de venta a menores / H2-9 | El dato histórico corresponde. Necesita contexto normativo actual: P1-4. |
| S14 Colombia, Ley 2224/2022 | Texto Senado; arts. 2, 8 y 9 | Reglamentación y pedagogía sobre animales / H2-9 | Corresponde. No se presenta como prohibición general por animales. Existencia de reglamentación confirmada, lectura consolidada pendiente. |

Las fuentes S9–S11 ya estaban identificadas como secundarias/parciales en el contrato; esa limitación, declarada, **no se convierte en un nuevo defecto por sí misma**. El resumen publicado de S4 permite comprobar las cifras sin fingir acceso al PDF.

### Fuentes adicionales que sustentan los hallazgos

- Merck Veterinary Manual, *Disorders of Micturition in Dogs and Cats*, Laura Van Vertloo; revisión por Joyce Carnevale; actualización visible octubre de 2026: https://www.merckvetmanual.com/urinary-system/noninfectious-diseases-of-the-urinary-system-in-small-animals/disorders-of-micturition-in-dogs-and-cats . Leídas distinciones entre almacenamiento, vaciado y causas neurológicas.
- VCA, *Urgent Care for Pain or Limping*: https://vcahospitals.com/urgent-care/health-concerns/pain-or-limping . Leída la lista When to seek emergency care.
- Cornell University College of Veterinary Medicine, *Fear of fireworks and thunderstorms*: https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/fear-fireworks-and-thunderstorms . Leídas recomendaciones de identificación, salidas y medicación individual.
- FAO AGRIS, registro del artículo publicado de Riemer: https://agris.fao.org/search/en/records/65dec3727c7033e84bebc12e . Resumen, año, autora, revista y páginas; no texto completo.
- Bogotá, campaña 2026–2027: https://bogota.gov.co/mi-ciudad/ambiente/2026-10/bogota-presenta-campana-de-proteccion-animal-por-el-uso-de-polvora . Leídos fecha, periodo y remisión al IDPYBA. No se envió ningún reporte.
- Ministerio del Interior, comunicación de diciembre de 2023 sobre Decreto 2174: https://www.mininterior.gov.co/noticias/gobierno-establece-medidas-para-uso-y-manejo-de-polvora-por-temporada-de-%EF%AC%81estas-de-%EF%AC%81n-de-ano-en-el-pais/ . Comprobada existencia de reglamentación, no todos sus requisitos.

## Diferenciación con España

El contenido local es sustantivo. No hay base en esta auditoría para afirmar que Google esté canibalizando las páginas: no se consultaron consultas/URLs de Search Console. Los umbrales de seis y ocho palabras son controles internos del contrato, no reglas de Google ni pruebas de penalización.

La comparación literal de ocho palabras aplicada al MDX bruto produce muchos falsos positivos: imports, URLs, nombres de estudios y marcado compartido. Al retirar código, bibliografía y destinos de enlaces, queda una coincidencia de ocho palabras: **«autoría equipo cuida a tu perro viejo actualizado»**. Es la firma manual, no una copia de contenido sustantivo; resolver con P2-4.

En el control focal de seis palabras sobre avisos, FAQ y H2-8/H2-10 quedan **«entre el 27 y el 35»** y **«la esvce pide una zona segura»**. La primera es un dato común; la segunda, una recomendación común atribuida. No conviene deformar un resultado o una recomendación clínica por evitar seis palabras. Si se exige cero coincidencias de forma literal, resolver/documentar esa excepción en el contrato; no presentar estas coincidencias como plagio.

La matriz completa de los 35 H3 y las ocho FAQ está en `auditoria-articulo-r1-comparacion-espana.md`. Evalúa el contenido bajo el encabezado, no solo si el título tiene sinónimos. La pieza tiene apoyos clínicos compartidos y desarrollo regional distinto. No se detectó una subsección entera que sea mera paráfrasis sin aportación propia; eso no exime las mejoras clínicas de este informe.

## Recursos, enlaces y publicación

| Recurso | Ubicación / ruta | Comprobación | Estado |
|---|---|---|---|
| Tres avisos | Introducción, H2-5, H2-7 | Tipos info/warning/danger y contenido | Presentes; revisar contenido según hallazgos. |
| Ocho FAQ | Final del MDX | Componente real y ocho preguntas | Presentes; canal de Bogotá incompleto. |
| Tabla de leyes | H2-9, `TablaApilable` | Encabezados, caption y `data-label` | Presente; actualización legal pendiente; sin medición renderizada. |
| Lista de seis acuerdos | H2-6 | Seis acuerdos concretos | Útil; añadir contingencia de necesidades. |
| Lista de consejos | H2-10 | Seis consejos y límites de encuesta | Presente; P0-2 y P1-5. |
| Enlaces internos | 14 destinos únicos Markdown | Archivos reales, pilar y página de herramienta | Válidos en el código local; no se certifican 14 respuestas HTTP de producción. |
| Tarjetas entre versiones | Ambos MDX; componente existente | Slugs, estados de destino y posición | Presentes en el código. Sin prueba de teclado/móvil/modo oscuro. |
| Portada | Ruta del frontmatter | Árbol Git, no solo checkout disperso | Archivo final ausente: gate visual pendiente. |
| Otras seis imágenes | Osa, escritorio, consulta, Baltor, foto familiar, portón | Contrato §8 y referencias del MDX | No insertadas; pendientes por alcance. H2-4 no lleva imagen. |
| Identificación de Luna/Dakota | Fotografía familiar futura | Expediente mantiene confirmación del propietario como gate | No resuelto aquí; no publicar pie nominativo deducido. |
| Formulario Bogotá 2026 | FAQ/H2-9 | Fuente oficial contemporánea localizada | Recorrido al formulario final pendiente. |
| Build y publicación | Rama de trabajo | No ejecutados | Sin aprobación de integración ni de producción. |

No se promete PDF, vídeo o descarga inexistente. La calculadora sí tiene una página real; no se ha auditado su lógica ni interacción en esta ronda de texto.

## Qué corregir, en orden

1. Delimitar el apartado de movilidad crónica, añadir triaje de incapacidad nueva y separar micción de higiene. Reflejarlo en FAQ.
2. Eliminar la equivalencia entre «algo para dormir» y acepromazina; conservar el criterio específico de ESVCE y la consulta individual.
3. Completar las contingencias de la noche: necesidades fisiológicas y búsqueda que continúa más allá del entorno inmediato.
4. Cerrar canal Bogotá 2026–2027 y reglamentación colombiana con fuentes/recorridos comprobados.
5. Ajustar Riemer a Feed/Play, retirar la restricción de población no verificada y hacer locales los límites de comida y aprendizaje.
6. Rebajar las certezas diagnósticas y las generalizaciones de suficiencia, recuperación, clima y tiempos.
7. Dejar firma y fechas al sistema; identificar una vez la procedencia personal de los recuerdos.
8. Volver a medir texto y distribución, conservando el contenido local y sin rellenar. La entrega visual y el build tienen su gate posterior.

### Encargo listo para una sesión correctora

> Corrige exclusivamente el texto de `src/content/blog/miedo-polvora-perros-mayores.mdx` partiendo del commit `ae9386811b75610d394992f1b41a181a744b21ea` y de esta auditoría R1. Lee AGENTS.md, el brief v6.2 y la skill de redacción. Resuelve P0-1 y P0-2 antes que los demás hallazgos. No inventes casos, estudios, edades, dosis o resultados; no añadas nombres de medicamentos. Conserva Osa/Baltor y sus incertidumbres, Luna y el testimonio anónimo del escritorio con sus límites. Completa salidas para necesidades y búsqueda ampliada; verifica el canal Bogotá 2026–2027 y la reglamentación colombiana vigente. Describe Feed/Play fielmente. No generes imágenes ni cambies componentes, rutas, canonicals o la lógica de tarjetas. Registra cualquier incidencia heredada del brief sin reabrir su auditoría general. Entrega un diff y un cierre por hallazgo con evidencia, vuelve a contar texto visible/FAQ y ejecuta tono.py. No emitas tu propia auditoría independiente ni publiques. Tras la corrección corresponde R2 del artículo; no reiniciar la numeración.

El veredicto se refiere a esta versión, no al potencial del tema. El valor regional y los recuerdos comprobados justifican conservar la pieza; las afirmaciones clínicas categóricas y los recorridos incompletos justifican corregir antes de publicarla.
