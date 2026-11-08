# Auditoría independiente LA-01 — R3

## Veredicto

**Publicable con reservas en su entrega textual: la experiencia de Gonzalo, Luna y Dakota ya desarrolla decisiones reales; quedan dos precisiones puntuales antes de publicar y la fase visual sigue pendiente.**

El problema narrativo de R2 está resuelto. No recomiendo otra reescritura estructural. El artículo ahora tiene un punto de vista propio, conserva contexto regional y conecta la observación doméstica con las recomendaciones sin presentar los recuerdos como ensayos clínicos.

Este veredicto **no autoriza despliegue ni certifica imágenes, funcionamiento en móvil o publicación en producción**. «Con reservas» tampoco significa que las dos frases indicadas abajo ya estén comprobadas: deben precisarse antes de publicar.

### Versión y alcance

- Fecha: 2026-11-08.
- Rama: `claude/gallant-curie-vixi47`.
- Commit del artículo auditado: `a7e5173` — `Reescribe LA-01 con la experiencia del propietario integrada (corrección R2)`.
- Archivo: `src/content/blog/miedo-polvora-perros-mayores.mdx`, 474 líneas.
- SHA-256: `488660fb8051d33fc3d2c164c7cf22243ad17e117ddc27b3b7c2aa99b36c5fd4`.
- Base de comparación: artículo en `4a893e9`, auditoría R2 y encargo narrativo en `33717de`.
- Se leyó el artículo completo y el diff; `correccion-articulo-r2.md` se trató como una declaración del corrector y se contrastó, no como prueba de cumplimiento.
- Norma: `.agents/skills/auditar-articulo-blog/SKILL.md`, control de calidad editorial, guía de voz y tono, política editorial y procedencia de testimonios.
- Criterio vigente: instrucción del propietario de integrar su experiencia, especialmente Luna y Dakota, por encima de las antiguas restricciones del brief v6.2 sobre Dakota, distribución rígida de relatos y ausencia de hilo.
- Se usó el archivo original de testimonios y el mapa nuevo. No se redactó ni corrigió el MDX, el brief o los testimonios durante esta auditoría.
- Se ejecutaron los verificadores de volumen, tono, menciones, aperturas y rutas locales. Se reabrieron las fuentes indicadas en la tabla. No se ejecutó `npx astro build`: el build correcto pertenece al reporte del corrector. No se hicieron pruebas visuales ni de la calculadora.

## Hallazgos

**0 P0 y 0 P1 confirmados en el alcance textual; 2 P2 de precisión.** Las reservas no requieren mover capítulos ni añadir más testimonios.

### P2-1. Falta respaldo para el contexto negativo «No fue con pólvora»

**Ubicación:** MDX:251; mapa de procedencia, fila «Acompañar no es sujetar».

El archivo original sí respalda que Dakota antes no toleraba que la alzaran y que una vez casi mordió la cara de Gonzalo. **No registra en qué contexto ocurrió**. El MDX añade «No fue con pólvora», y el mapa dice que así se aclara que no sucedió con pólvora.

La instrucción de R2 pedía no situar el episodio en una noche de fuegos sin evidencia; eso no acredita el hecho contrario. No se ha demostrado que la frase sea falsa, pero tampoco que ese detalle temporal esté confirmado. El hecho central y su procedencia sí están documentados; no se trata de un caso inventado ni de un resultado terapéutico ficticio.

**Corrección acotada:** confirmar ese contexto directamente con el propietario y registrar la aclaración, o retirar «No fue con pólvora» manteniendo el episodio de manipulación sin asignarle un contexto. No se necesita borrar el testimonio ni crear otro. En esta ronda se ha solicitado la aclaración; mientras no conste respuesta, no se considera una confirmación.

La función de este pasaje —acompañar sin forzar contacto— está bien integrada y debe conservarse. El ajuste afecta a cuatro palabras de contexto, no al valor de la experiencia.

### P2-2. «Solo la 2224 menciona a los animales» quedó desactualizado al incorporar el decreto

**Ubicación:** MDX:393, después del nuevo análisis del Decreto 2174.

El artículo afirma: «De las normas que leímos, solo la colombiana 2224 menciona a los animales…». Ahora se ha leído y citado también el Decreto 2174. Su considerando de la segunda página incluye explícitamente la prevención de daños a la salud **animal**, al citar el artículo 130 de la Ley 9 de 1979.

Por tanto, el cuantificador «solo» ya no corresponde al conjunto declarado de normas leídas. Esto no invalida la explicación práctica anterior ni convierte al decreto en una prohibición general por bienestar animal. El contraste sobre permisos de los artículos 2.2.4.2.5 y 2.2.4.2.8 es correcto.

**Corrección acotada:** retirar la exclusividad y explicar únicamente lo que la Ley 2224 sí exige respecto a la pedagogía sobre impactos en animales. No necesita añadirse un desarrollo del considerando ni ampliar la tabla.

Fuente reabierta: [Decreto 2174 de 2023, copia del INS](https://www.ins.gov.co/Normatividad/Decretos/DECRETO%202174%20DE%202023.pdf), página 2 de 17 y disposiciones citadas. Una mención en considerandos y una obligación operativa no son lo mismo; la corrección debe conservar esa distinción.

### Observaciones de pulido, sin nueva condición de aprobación narrativa

- **MDX:45 y 47:** dos párrafos consecutivos abren con «Por eso». Una transición puede eliminarse; no es una muletilla detectada ni un defecto sustantivo.
- **MDX:238:** el párrafo de la reunión reúne dos momentos del año y es el candidato más claro a dividir si al comprobar móvil ocupa demasiado. El máximo medido es 61 palabras; no se afirma una altura renderizada que no se ha medido.
- **MDX:23:** «Soy Gonzalo y escribo este sitio» queda como frase aislada. Ya identifica una voz coherente; puede unirse con el contexto de la apertura para mejorar el ritmo. No vuelve a ser el problema de un tercero que anuncia que el autor «cuenta en primera persona».
- El contraste de Osa, Baltor y Luna en H2-7 vuelve a hechos ya presentados, pero **los sintetiza para reconocer reacciones**, no reproduce sus historias completas. No lo señalo como repetición defectuosa.

## Lo que sí funciona: integración real, no aumento de nombres

El encargo de R2 no se ha resuelto solo sustituyendo encabezados. Cambiaron la apertura, la secuencia de razonamiento y el uso de cada experiencia:

| Lugar | Qué hace ahora la experiencia | Por qué supera R2 |
|---|---|---|
| Introducción:19–29 | Presenta a las dos beagles, la noche de 2025 y la decisión de dónde pasarla | El lector conoce a la persona y a sus perras antes del inventario de fuentes. |
| Barrio:43 | Contrasta la exposición de la casa en Costa Rica con lo vivido en El Salvador | El contexto doméstico explica por qué el plan se adapta a cada cuadra, sin generalizar a países enteros. |
| Patio:75–101 | Osa buscando entrada conduce al consejo de UNAM y al acceso seguro | Ya no hay un H3 biográfico seguido de otro reservado a «lo que recomiendan». |
| Refugio:109–129 | Baltor y la perra del escritorio sirven para observar un escondite habitual | La experiencia introduce una decisión concreta; no son dos biografías añadidas al margen. |
| Consulta:203 | Los otros sustos de Luna ejemplifican qué contar | El dato personal tiene una función dentro de la lista. No se inventa una visita veterinaria. |
| Casa llena:238–245 | La reunión, películas y conversación permiten comparar compañía y rincón apartado | La escena de 2025 ya se usa donde aporta; el autor no atribuye a la familia la causa de la calma. |
| Contacto:249–251 | Hablar a Dakota y el riesgo al alzarla distinguen acompañar de sujetar | El relato aporta un límite de manejo; conservarlo con la precisión P2-1. |
| Paseo:257 | Cansancio de Dakota y cuestas justifican buscar suelo más plano | Es una adaptación vivida, no el consejo intercambiable «ajusta a su movilidad» sin desarrollo. |
| Señales:291–309 | Contraste de reacciones y episodio incierto de Baltor ayudan a observar sin castigar | Conserva la incertidumbre y no diagnostica por un escape de orina. |
| Portón:325 | La duda real de las fugas recuerda un riesgo concreto | No se transforma una memoria incierta en perro perdido documentado. |
| Enero:427 | Retoma a Luna y Dakota distinguiendo lo observado de su causa | Cierra el punto de vista sin inventar un diario, programa de aprendizaje o tratamiento ya realizado. |

**Prueba de utilidad:** retirar el dato de las cuestas de Dakota deja sin explicación la adaptación del paseo; retirar la escena familiar deja sin ejemplo el criterio para elegir compañía. Ahora los recuerdos sí forman parte del razonamiento. El texto no depende de que el lector salte de un capítulo «humano» a uno «científico».

También es acertado que no se fuerce una experiencia en normativa, medicación o postración. Una voz personal no exige haber vivido todos los escenarios. No se presenta a Dakota como inmóvil ni se le añade un diagnóstico de columna no confirmado.

## Procedencia personal: contraste con el mapa de la corrección

| Hecho publicado | Fuente documental comprobada | Resultado |
|---|---|---|
| Luna 2015, Dakota 2014; ambas mayores en Costa Rica | Archivo original, apartados Luna y Dakota | Coincide; no se deduce fecha exacta de cumpleaños. |
| Nerviosas/alerta en 2025, dentro con familia | Matiz de Luna y viñeta de 2025 de Dakota | Coincide. No se convierte su nerviosismo en fobia grave ni una estancia tranquila en efecto demostrado de compañía. |
| Películas, conversación y reunión familiar | Viñeta de 2025 de Dakota | Coincide. El texto distingue los recuerdos sin afirmar que una intervención las curara. |
| Luna dentro/patio y búsqueda de familia ante otros sustos | Apartado Luna | Coincide. Los otros desencadenantes se usan como observación, no como diagnóstico. |
| Dakota cansada, cuestas, parque nivelado | Aclaración de salud de Dakota | Coincide. No se añade ni se necesita el diagnóstico de columna. |
| Hablar a Dakota y casi mordida al alzarla | Apartado Dakota | Hecho central coincide; contexto «no fue con pólvora» pendiente: P2-1. |
| Osa, patio, mesa, pila, reacción al intentar sacarla | Hechos y aclaraciones originales de Osa | Coinciden; sin edad senior, fecha de cena o desenlace inventados. |
| Posibles fugas de los perros de la casa del tío | Aclaraciones de Osa | La incertidumbre se conserva. |
| Baltor, cuartos, chow chow posterior y episodio de esfínteres | Apartado Baltor, aspecto añadido el 27-10 y brief §2 | Coincide; no se elimina la duda sobre orina/heces ni se afirma patrón crónico. |
| Perra del escritorio | Mensaje del compañero registrado en el archivo, uso anónimo autorizado | Coincide; no se relaciona con el paciente postrado. |
| Identidad de Gonzalo | Política editorial, «Quién escribe» | Coincide; sin credenciales veterinarias añadidas. |

El mapa entregado es útil y casi íntegramente corresponde al artículo. La reserva de P2-1 no puede cerrarse repitiendo lo que afirma ese mapa: una tabla de procedencia no sustituye la fuente de cada detalle.

## Cierre de la R2 y conservación de la seguridad de R1

| Hallazgo de R2 | Resultado en R3 |
|---|---|
| P1-1 Experiencia principal ausente/segregada | **Cerrado.** Las decisiones y pasajes de la tabla anterior demuestran la integración. |
| P1-2 Bogotá: promesa por delante del recorrido | **Cerrado como orientación limitada.** Cuerpo y FAQ ya enlazan el sitio oficial, atribuyen el anuncio y reconocen que no se localizó el enlace directo. No se certifica un formulario funcional; la limitación ha dejado de ocultarse. |
| P2-1 Voz de expediente y alternancia por bloques | **Cerrado.** Primera persona estable y fuentes ligadas al consejo; retirados los encabezados biográficos y la presentación en tercera persona. |
| P2-2 Temperatura inferida por postura | **Cerrado.** 135–139 y FAQ 8 usan condiciones del cuarto y no ordenan abrigar por encogerse. El jadeo no se presenta como diagnóstico único. |
| P2-3 Capacidades, micción y alcance del estudio | **Cerrado.** 153 reconoce preferencias; 179 prohíbe improvisar y respeta indicación previa; 185 limita el estudio a lo que se comprobó. |
| P2-4 Autorización general/categoría 3 | **Cerrado.** 381 distingue ambos artículos con fuente primaria. La reserva nueva P2-2 afecta a otra frase de exclusividad, no vuelve a acusar de falsa la regla de autorización. |

Se mantienen las correcciones importantes de R1: paciente crónico definido, consulta ante incapacidad nueva, higiene separada de micción, no forzar alimentación, alternativas para necesidades nocturnas, ampliación de búsqueda de fugas y elección individual de fármacos. No se reintroduce «la acepromazina o algo parecido» ni la predicción de que un perro perdido no irá lejos.

## Recuentos y distribución comprobados

Se ejecutó el mismo verificador independiente que en R1/R2 sobre los bytes de esta versión. **5.541 palabras**, exactamente la cifra que declara la corrección. Frente a 5.946 en R2: 405 palabras menos, con más experiencia integrada. Cumple el rango global 5.300–6.000; no necesita ampliación.

| Sección | Medido | Presupuesto propuesto en la corrección | Evaluación |
|---|---:|---:|---|
| Introducción | 249 | 250 | Dentro |
| Barrio | 420 | 420 | Dentro |
| Patio | 426 | 430 | Dentro |
| Cueva | 465 | 460 | Dentro |
| No se levanta | 678 | 680 | Dentro |
| Consulta | 480 | 480 | Dentro |
| Casa llena | 666 | 660 | Dentro |
| Señales | 339 | 340 | Dentro |
| Portón | 419 | 420 | Dentro |
| Ley | 435 | 430 | Dentro |
| Consejos/enero | 399 | 400 | Dentro |
| Conclusión + FAQ | 565 | 560 | Dentro |

La suma del presupuesto nuevo es 5.530. Acepto su justificación por funciones: se eliminan bloques duplicados, se trasladan relatos y se preserva la seguridad añadida. No exijo volver a los targets del brief anterior después de haber autorizado un cambio narrativo que los supera. El verificador conserva las desviaciones frente al presupuesto antiguo como dato histórico, no como motivo de rechazo.

Mediciones complementarias:

- **Luna:** 9 líneas con mención, repartidas entre introducción, contexto, consulta, compañía, señales y cierre. **Dakota:** 7 líneas, frente a cero en R2. Son posiciones, no nueve/siete episodios diferentes.
- Aperturas de H3 centradas en fuente, bajo el mismo patrón descriptivo: **7/38**, frente a **14/36**. La reducción acompaña una mejora que se comprobó leyendo; no hay una cuota de fuentes ni un detector de IA.
- `metricas.mjs`: 122 párrafos, media 33, mediana 33, 2 % por encima de 50 palabras, máximo 61; 38 H3 y 11 H2 contando conclusión. No equivale a medir altura móvil.
- `tono.py`: 0 muletillas/1.000; cuenta 5.063 palabras bajo sus exclusiones, distintas del contrato.
- Ninguna coincidencia de ocho palabras en texto visible con España bajo el verificador, excluyendo bibliografía y marcado. No es una prueba de rendimiento SEO; la diferenciación sustantiva sigue en los escenarios, normativa y cuidados del perro inmóvil.
- Los **14 destinos internos** siguen correspondiendo a archivos/rutas locales. Se verificaron de nuevo estáticamente; no se afirman 14 pruebas HTTP en producción.
- Tres `AlertBox`, ocho preguntas en `FAQ`, bibliografía plegada y tabla presentes; meta de 156 caracteres y SEO title de 55, sin cambios. La FAQ de Bogotá contiene ahora un enlace HTML compatible con `set:html` de `FAQ.astro`.

El script oficial continúa produciendo falsos positivos porque no interpreta este formato de targets/rango/matriz y busca una bibliografía antigua en `AlertBox`. La bibliografía real tiene 20 entradas y usa `data-editorial-bibliography`/`details`. No se confunde esa incompatibilidad con cinco defectos nuevos del artículo.

## Fuentes y recursos: qué se volvió a comprobar

No se afirma una nueva descarga de todas las fuentes históricas. Los documentos y verificaciones de R1/R2 se conservan identificados; se contrastaron las afirmaciones conservadas y se reabrieron los destinos que resuelven las reservas actuales.

| Fuente o recurso | Afirmación / uso | Comprobación de R3 y límite |
|---|---|---|
| Testimonios originales | Todos los pasajes personales | Releídos y comparados con el mapa y el MDX. P2-1 distingue hecho central documentado de contexto añadido. |
| Salonen 2020; Riemer 2019 | Edad, diferencias de salud y recuperación | Misma identidad/datos que en R1; cotejo con evidencia de texto completo conservada. No nueva descarga declarada. |
| Gähwiler 2020; Lopes Fagundes 2018 | Señales grupales, serie de 20 perros y dolor | Sin nuevos resultados atribuidos; evidencia previa. Aplicación al perro postrado sigue declarada como criterio editorial. |
| ESVCE 2026; COLVET/Delfino y Teletica; UNAM/N+ | Refugio, manejo, medicación y recomendaciones regionales | Atribuciones principales conservadas; acceso secundario y límites del expediente original. No se añaden dosis o eficacia. |
| [Riemer 2020, resumen publicado en AGRIS](https://agris.fao.org/search/en/records/65dec3727c7033e84bebc12e) | Feed/Play y porcentajes de percepción | Reabierto. Se conserva resultado agrupado y carácter de encuesta. No texto completo editorial leído en esta ronda. |
| Bogotá 2024 y diciembre de 2025 | Reportes históricos y sus denominadores | Mismos datos ya contrastados; no se presentan como prevalencia regional o resultados de la campaña de 2026. |
| Chile Ley 21.310; Colombia Leyes 670 y 2224 | Sanción sin autorización y pedagogía | Mismos pasajes y límites de R1; no certificación completa del derecho consolidado de cada municipio. |
| [Decreto 2174, PDF del INS](https://www.ins.gov.co/Normatividad/Decretos/DECRETO%202174%20DE%202023.pdf) | Regla general, categoría 3 y frase de exclusividad | Reabierto, considerando de salud animal y arts. 2.2.4.2.5/2.2.4.2.8. P2-2. |
| [Alcaldía, campaña 2026–2027](https://bogota.gov.co/mi-ciudad/ambiente/2026-10/bogota-presenta-campana-de-proteccion-animal-por-el-uso-de-polvora) | Fechas y anuncio de formulario | Reabierto. El artículo ya anuncia correctamente su límite de acceso. |
| [IDPYBA](https://www.animalesbog.gov.co/) | Canal general y 123 | Reabierto; 123 coincide con el canal publicado. Sin formulario enviado ni URL final certificada. |
| VCA, Merck y Cornell | Triaje, micción y salidas acompañadas | Afirmaciones centrales preservadas y cotejadas con la comprobación de R2; no se declara haber repetido esos recorridos ahora. |
| Tabla, avisos, FAQ y tarjetas | Recursos del artículo | Inspección estática; no prueba responsive, de teclado ni captura renderizada. |
| Calculadora de calidad de vida | Enlace contextual | Ruta local válida. No se auditó lógica o interacción de la herramienta. |
| Diez apoyos temáticos y portada | Fase visual encargada al propietario | Diez comentarios de ubicación, cero imágenes incrustadas en el cuerpo. No se valida una portada solo porque su ruta esté en frontmatter. |
| Build/publicación | Entrega técnica | Build declarado por el corrector; no repetido. No se despliega ni se certifica producción. |

## Qué corregir y qué conservar

1. Confirmar documentalmente o retirar la asignación «No fue con pólvora». Mantener el hecho real de Dakota y su función en la explicación del contacto.
2. Quitar la exclusividad de la frase legal: explicar directamente la obligación pedagógica de la Ley 2224, sin afirmar que es la única norma leída que menciona animales.
3. Pulir las dos transiciones o el párrafo largo solo si mejora el ritmo. **No** sustituir los relatos por resúmenes institucionales ni volver a aislarlos bajo títulos biográficos.
4. Conservar volumen y funciones. No aumentar menciones de Luna/Dakota por cuota, no forzar un caso propio en el perro postrado y no volver a desarrollar CBD/acepromazina en varios bloques.
5. Cerrar después la fase visual y técnica: recursos reales, identificación de la foto si se utiliza, móvil/escritorio, accesibilidad y build. La aprobación textual condicionada no sustituye esos controles.

Esta es la **tercera auditoría del artículo**. Se cierra la revisión estructural con reservas puntuales, no con otra solicitud de reescritura general. La comprobación de estas dos precisiones y de una eventual aclaración del propietario debe registrarse como cierre de hallazgos de R3, sin renumerar el documento ni declarar una R4 independiente implícita.
