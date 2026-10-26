# Informe de auditoría R1 — `briefings/briefing-miedo-petardos-perros-mayores.md`

Auditor: agente independiente (sesión distinta de la que generó el brief). Fecha: 2026-10-25. Brief auditado: commit d766171. Informe transcrito sin cambios de contenido; solo se ha ajustado el formato.

**Alcance.** Auditoría independiente del brief con el árbol de trabajo limpio. El auditor no modificó ningún archivo. Los textos que descargó están en el scratchpad de la sesión de auditoría.

## Veredicto

**APTO con reservas.** Las diez fuentes existen y sus cifras clave coinciden con los documentos, y no hay ningún identificador inventado. Antes de redactar hay que arreglar tres cosas:
- Las tres tablas de trazabilidad fuente→H2 no coinciden entre sí.
- La instrucción de «nombrar solo el grupo» se contradice con los nombres y porcentajes de fármacos que el propio brief pide.
- La imagen 2 está espacialmente mal resuelta y el pie de esa imagen contradice el texto de H2-6.

Además, el brief no declara que se solape con el brief de feromonas, que da mensajes opuestos.

Ningún hallazgo llega a P0. No hay PMID ni DOI mal asignado, ni enlace interno inexistente, ni hecho alterado de una historia real (la guía no tiene caso). Con las correcciones de P1 se puede pasar a redacción.

## 1. Verificación fuente por fuente

| Fuente | Qué abrió | Identidad | Cifras y afirmaciones | No confirmado o matiz |
|---|---|---|---|---|
| **S1** Salonen 2020 | Texto completo en PMC, más esummary de PubMed | Autores, título, *Sci Rep* 10:2962, DOI y PMID 32139728 correctos | 13.715 perros, 264 razas y 32 % con mucho miedo a algún ruido, confirmados. «La prevalencia aumentó con la edad, especialmente el miedo al trueno» está en «Age and sex differences» | El brief omite que el 26 % teme los fuegos artificiales, el dato más pertinente. El «mucho miedo» del artículo significa miedo «al menos a menudo» (40–60 % de las veces) |
| **S2** Blackwell 2013 | Ficha y resumen en Bristol | Autores, título, *Appl Anim Behav Sci* 145:15–25 y DOI correctos | n = 3.897 y 383; «casi la mitad» frente a «una cuarta parte»; fuegos artificiales como desencadenante más citado; riesgo creciente con la edad; menos de un tercio pidió consejo. Confirmado | No abrió el texto completo (el brief ya lo marca como parcial). El resumen dice que las respuestas a fuegos, disparos y trueno suelen coincidir y que no se asocian a la separación; el brief no lo usa en H2-1 |
| **S3** Gähwiler 2020 | Texto completo en PMC, PMID 32994423 | Autores y título correctos; *Sci Rep* 10:16035 y DOI correctos | 36 perros (17 mestizos y 19 de 15 razas), de 6 meses a 12 años. Orejas d = 0,68 (el resumen dice 0,69), movimiento 0,54, jadeo 0,45. Vocalizar, parpadear y esconderse no superan Bonferroni. Lamerse los labios y bostezar no aumentan. Solo 3 min codificados. Excluidos perros con ansiolíticos o sordera. El «120 perros» no está en el artículo | Omite que solo entraron perros con afectación ≥2/5 por los fuegos y que 14 de los 36 recibieron caricias. Métodos habla de Berna (Suiza): el brief dice que el país «no se verificó», pero el comité ético es cantonal suizo |
| **S4** Lopes Fagundes 2018 | Texto completo en Frontiers y esummary de PubMed | PMID 29487858, DOI, autores, *Front Vet Sci* 5:17 y Universidad de Lincoln correctos | 20 casos (10+10). Inicio medio a los 6 años y 6 meses frente a 2 años y 8 meses. Generalización 8/10 frente a 2/10. Piden no atribuir significación estadística y valorar el dolor | Ninguno |
| **S5** Riemer | Resumen del preprint por Europe PMC y por la API de bioRxiv (v1 y v2 idénticas). bioRxiv web devolvió 429; Elsevier solo redirigió | Preprint DOI 10.1101/663294 correcto | N = 1.225; solo «Feed/Play» asociado a mejoría; medicación 69 % (N = 202), alprazolam 91 % y Sileo 74 %; 27–35 % «no superior al placebo»; chalecos 44 % (N = 300); contracondicionamiento >70 % (N = 694); relajación 69 % (N = 433); CD de ruidos 55 % (N = 377). Todo coincide | El brief dice que el DOI publicado «no se verificó»: **Crossref lo da: 10.1016/j.jveb.2020.04.005, *J Vet Behav* 37:61–70, mayo de 2020**. No pudo leer la versión publicada. Con la misma muestra existe Riemer 2019 en PLOS ONE (10.1371/journal.pone.0218150), que el brief ignora (ver P2-3) |
| **S6** ESVCE | PDF completo (`pdftotext`) | Título correcto | No usar acepromazina (carece de propiedades ansiolíticas); coincide con AVEC y AVEPA-GRETCA; zona segura previamente condicionada; tres principios activos con indicación EMA. Confirmado. El PDF contiene dosis y plazos (imepitoína: 30 mg/kg dos veces al día, empezando 2 días antes; tasipimidina: 30 µg/kg una hora antes) | «Versión 2.1, junio de 2026» solo consta en la URL, no en el cuerpo del PDF. La disponibilidad en España de imepitoína y tasipimidina sigue sin verificar |
| **S7** Sileo | SPC británico de VMD (marzo de 2026, AN 03168/2024) y ficha del registro europeo | Coinciden | 3.2, 3.3 (cardiovascular grave, ASA III–IV), 3.5 («más de 17 años» no estudiado) y 3.6 (vómitos, sedación, incontinencia urinaria y mucosas pálidas como «common») confirmados. Registro: autorizado el 10/06/2015 y autorizado y disponible en España | No leyó el PDF español. El apartado 3.8 (potenciación por depresores del SNC) es relevante en un perro mayor polimedicado y el brief no lo recoge |
| **S8** Ley 7/2023 | Texto del BOE | BOE-A-2023-7936 correcto | 24.2.c, f, g (48 h «desde que se produjo») y h citados casi literalmente. 51.2 (microchip obligatorio en perros). 65.7. La única mención a pirotecnia es 65.7 (grep: «pirot», «petard», «fuegos artificiales», «ruid») | Pequeño error: el brief dice que el registro «se nombra en 51.3», pero la inscripción está en 51.2. Omite el art. 24.2.b (educar sin provocar «ansiedad o miedo») y el 24.3 |
| **S9** RD 989/2015 | Texto del BOE | BOE-A-2015-12054 correcto | Art. 8.3.a, con F3 y F4 «no perjudicial para la salud humana»; art. 121 (12/16/18 años); art. 141.2 y 141.5 (10 kg NEC) | Falta la ITC 2, apartado 2.5.A: **nivel sonoro máximo de 120 dB(A,imp) en F1, F2 y F3, y «F1 no incluirá petardos»**. El brief dice haber leído el texto completo y no lo recoge. La disposición adicional sexta *reduce* edades mínimas de F1/F2 (8 y 10 años) por costumbres arraigadas; el brief la llama «excepciones autonómicas» sin más |
| **S10** El Español (Málaga) | Artículo completo | Paula Tejada, 23 de junio de 2026, URL correcta | Todas las recomendaciones atribuidas están. La guía del Colegio sigue sin enlazarse. 140–150 dB y 95 dB, y la cita del presidente, existen y el brief los excluye bien | Ninguno |

**Enlace ES-06 de Barcelona.** Devuelve 404 (comprobado), tal como dice el brief. Está bien descartado.

## 2. Hallazgos

### P1 (arreglar antes de redactar)

**P1-1. Las tres tablas de trazabilidad no coinciden.** Ubicación: §3 («H2:» de cada fuente), §6 («Sustentado en») y §9.2. Es la tabla que usará el auditor del artículo para exigir cumplimiento.

| Fuente | §6 | §3 | §9.2 |
|---|---|---|---|
| S1 | H2-1, 8 | 1 | 1 |
| S3 | H2-2, 6, 10 | 2 | 2, 6 |
| S4 | H2-1, 4, 10 | 1, 4 | 1, 4, 8, 10 |
| S5 | H2-5, 6, 7, 8 | 6, 7, 8 | 5, 6, 7, 8 |
| S6 | H2-4, 5, 6, 7, 8 | 4, 5, 8 | 4, 5, 8 |
| S8 | H2-3, 4, 6, 9 | 3, 9 | 3, 9 |
| S10 | H2-2, 3, 5, 6, 9, 10 | 3, 5, 6 | 3, 5, 6, 10 |

Hay además fuentes decorativas dentro de un H2:
- S6 figura en H2-7 («Lo que se vende»), pero ningún punto de ese H2 la desarrolla.
- S10 figura en H2-2 y en H2-9, pero ningún punto de esas secciones la usa.
- S5 se usa en H2-4 (69 %, alprazolam, Sileo) sin figurar en su «Sustentado en».

*Corrección:* reconstruir una sola matriz fuente→H2 a partir de lo que cada H2 desarrolla. Quitar S6 de H2-7 y S10 de H2-2 y H2-9, o escribir el punto que las desarrolle. Añadir S5 a H2-4 y S4 a H2-8. Copiar esa matriz en §3, §6 y §9.2.

**P1-2. Contradicción sobre nombrar fármacos.** Ubicación: §6 H2-4 (viñetas de S6, S7 y S5), §6 H2-7 (tabla 2) y §9.6 puntos 1 y 2.
- H2-4 ordena «dar solo el nombre del grupo» y §9.6.2 «solo por grupo o principio activo».
- Pero H2-4 y la tabla 2 ordenan escribir «alprazolam 91 %, Sileo 74 %» (Sileo es una marca), el detalle de contraindicaciones de un producto concreto y tres principios activos EMA.
- Un porcentaje junto a un fármaco funciona como ranking. Con un perro mayor, el lector puede acabar pidiendo o usando un benzodiacepínico.
- La política pública dice «no prescribimos fármacos ni dosis» (`src/pages/politica-editorial.astro`). El requisito 6.3 del propio brief prohíbe los «calmantes de personas», y alprazolam es uno.

*Corrección:* decidir una regla única. La opción más segura es una sola fila agregada «medicación con receta: 69 % según los dueños (N = 202)» y retirar los porcentajes por fármaco, la marca Sileo y su lista de efectos adversos del cuerpo. Si se conservan, justificarlos en §9 como atribuidos y no prescriptivos, y quitar «solo el grupo» de H2-4.

**P1-3. Falta declarar el solapamiento con el brief de feromonas, que dice lo contrario.** Ubicación: §2 «Diferenciación comprobada» y FAQ 4 («¿Sirven las feromonas…?»).
- Existe `briefings/briefing-feromonas-terapias-naturales-ansiedad-perros-mayores.md`, en estado `[~]` en el inventario (línea 282).
- Ese brief usa el miedo a las tormentas como el escenario con evidencia «moderada» para las feromonas (8 ensayos, *Veterinary Evidence*), con una imagen titulada «perro-mayor-ansioso-tormenta».
- El brief de petardos dice no haber «ningún briefing» de ruido y presenta las feromonas en el rango 27–35 %, «no superior al placebo».
- Son dos artículos del mismo pilar con keywords cercanas y veredictos distintos. La encuesta de dueños (S5) no es evidencia de ausencia de efecto frente a ensayos controlados, y H2-7 lo trata como si lo fuera.

*Corrección:* añadir al §2 la relación con ese brief. Dar a la tabla 2 una redacción que no contradiga una revisión de ensayos, por ejemplo «los dueños no las valoraron más que el placebo; la evidencia controlada es otro asunto, tratado en el artículo de feromonas». Plantear si el artículo de feromonas debe enlazarse cuando exista.

**P1-4. Imagen 2: geometría de correa incoherente.** Ubicación: §8, ficha y prompt de la imagen 2.
- Dice «ella pegada a su pierna izquierda, él con el bucle de la correa en la mano derecha». Con el perro a la izquierda, sostener la correa en la derecha la cruza por delante del cuerpo.
- «Perfil lateral» no dice desde qué lado se fotografía. Si el perro va a la izquierda del tutor y ambos avanzan de izquierda a derecha, el perro queda del lado alejado de la cámara, tapado por las piernas del hombre. Entonces no se verán «los dos mosquetones y la chapa», que es el criterio de aceptación.
- «Correa de 1,2 m con dos mosquetones» no precisa la forma. Una correa simple lleva un mosquetón; con dos hace falta una correa en Y o un acoplador, y el prompt no lo describe.
- La doble sujeción (arnés más collar con chapa) se presenta como derivada de S8 y S10, pero ninguna de las dos fuentes la recomienda. Es criterio editorial y debe marcarse así.

*Corrección:* fijar el lado del perro, la mano que sostiene la correa y el lado de la cámara (por ejemplo, el perro en el lado cercano a la cámara). Describir la correa en Y o con acoplador. Marcar la doble sujeción como criterio editorial.

**P1-5. El pie de la imagen 2 contradice H2-6.** Pie: «paseo corto y tranquilo». H2-6 y §6: «Paseo largo y tranquilo antes de que empiece el ruido». Para un perro de 13 años, «largo» es además discutible. *Corrección:* unificar. Sugiere «paseo tranquilo, sin prisa».

**P1-6. Frontmatter y alt de la portada no coinciden con §8.** El checklist (§10) marca «Frontmatter idéntico al §1», pero:
- `heroImageAlt` en §1 («perra… senior y tricolor, tumbada… destellos rojos y amarillos») no es el alt de §8 («…de hocico canoso… la mano de su tutora descansa junto a ella sin tocarla»).
- La ficha de la imagen 1 dice «mirada alerta» y «cabeza apoyada en el borde de la cama»; el bloque de edad y el prompt dicen «mirada serena» y «cabeza apoyada a la altura del lomo».

*Corrección:* usar un único alt y una única descripción de mirada y cabeza.

### P2 (corregir al tocar el archivo)

**P2-1. Datos del RD 989/2015 que faltan o están mal planteados.** El brief afirma la lectura completa del texto, pero se le escapó la ITC 2 (120 dB(A,imp) en F1–F3; F1 sin petardos). La frase §2(b) «la norma mide el efecto en personas» es correcta solo para la categorización del art. 8.3. Qué categoría corresponde a un «petardo» de venta común no se verificó. *Corrección:* añadir ese dato a S9 o decir que no se consultó la ITC 2. Reformular «excepción autonómica» como «las comunidades pueden reducir las edades mínimas de F1/F2 en usos tradicionales» y corregir 51.3 por 51.2.

**P2-2. Posible relleno en H2-3.** El H3 «Qué categorías de petardo hay» (≈170 palabras) trata sobre todo de edades mínimas de venta, que apenas ayudan a quien cuida a un perro mayor. «Cómo averiguar las normas de tu ayuntamiento» (≈100) y el apartado «Si hace falta más» no tienen fuente. *Corrección:* condensar, o justificar su utilidad para la decisión del lector («¿qué puedo exigir?»), o reasignar esas palabras. El suelo de 5.500 sin salida de emergencia choca con calidad-editorial §1/§6 («no aprobar por longitud»). Añadir al §9.1: «si no se alcanza el suelo sin relleno, parar y consultar».

**P2-3. Se omite una fuente directa con la misma muestra.** Riemer 2019, PLOS ONE (N = 1.225; Europe PMC, PMID 31490926). Su resumen dice que la mayoría desarrolla el miedo en el primer año, que tras los 7 años los casos nuevos son pocos, que la interacción edad×problemas de salud es predictor significativo, y que tres cuartas partes se recuperan al día siguiente, mientras que el 10 % tarda hasta un día, el 12 % hasta una semana y más del 3 % semanas o meses. Eso:
- matiza el discurso de H2-1 («crece con la edad»);
- respalda mejor el «mirar la salud si es nuevo»;
- sustituye a la prensa en H2-10 («ansiedad que puede prolongarse varios días»).

*Corrección:* leer el artículo completo y valorar incorporarlo (también como respaldo de S5).

**P2-4. Muestras y país.** S3 es suizo (comité ético cantonal de Berna) y el autor de S5 es de Berna, pero el brief no atribuye país a ninguna muestra. Es prudente, y el redactor puede decir «Suiza» solo para S3. Documentar los límites de S3 que faltan (selección de perros con afectación ≥2 y exclusión de medicados).

**P2-5. FAQ.** Las respuestas tienen 34–42 palabras (suma 377 con preguntas), no «45–55» ni «≈390». FAQ 6 afirma «Muchas normas locales son más estrictas» sin ninguna ordenanza verificada, algo que el propio §3 reconoce. *Corrección:* reformular («las ordenanzas pueden ser más estrictas»).

**P2-6. Prompts de imagen: detalles menores.**
- Imagen 1: «dormitorio interior» y a la vez «persiana» (un cuarto interior no tiene ventana exterior); el antifaz «rodea el ojo derecho» pero la perra está echada de lado, así que ese ojo puede quedar oculto.
- Imagen 3: «a la derecha» y «frente a la cabeza» no fijan referencia (¿derecha de la perra o del encuadre?), y la veterinaria «a la izquierda de la perra» sostiene el vientre con la mano izquierda.
- «Farolas de sodio»: en España ya es una iluminación en retirada, casi siempre LED.
- La frase «Ilustración generada; no representa a un paciente» dentro del prompt puede acabar escrita en la imagen. Debería ir fuera del prompt, en una línea de instrucción.
- La ficha de la imagen 1 pide una mirada «alerta» mientras el miedo es «moderado». Definir qué rasgos concretos señalan miedo (orejas atrás en la base) y cuáles no (no hay temblor ni jadeo).

**P2-7. Ventana editorial.** «Publicar antes del 1 de diciembre» deja 4 semanas para la visita al veterinario, que el propio brief sitúa «al menos 4–6 semanas» antes (marcada como criterio editorial). Ajustarlo a la fecha real o adelantar la publicación.

**P2-8. §2 numera mal una fuente.** «la cobertura de prensa de una guía colegial (S9)» debe ser S10. Además el brief da «dos normas del BOE (S8 y S9)» y la prensa también como S9.

**P2-9. Otros.**
- La nota `tono.py` sobre el propio brief da 1 muletilla (0,1/1000), sin importancia, pero conviene vigilarla.
- El art. 24.2.b de la ley es un respaldo directo y no se usa.
- La guía original del Colegio de Málaga sigue sin localizar (ya marcada).

## 3. Lo que sí comprobó y está bien

- **seoTitle:** 44 caracteres. **metaDescription:** 154 caracteres (contados con Python).
- **Suma de targets:** 350+560+520+640+640+540+640+520+460+330+280+520 = **6.000**. Los subtotales de cada H2 también suman su H2. El contrato 5.500–6.500 es coherente con ella.
- **Pilar y esquema:** `salud-mental-emocional-perros` está en el enum, y el esquema admite todos los campos del frontmatter.
- **Enlaces internos:** los 7 existen como `.mdx` publicados y el pilar tiene su página. La calculadora está omitida con un motivo razonado.
- **Canibalización:** no existe ningún artículo ni brief sobre petardos. Los temas vecinos están bien delimitados (P1-14, P1-15, P1-25, P1-29). El solapamiento relevante es el de feromonas (P1-3).
- **Estado:** el inventario marca P1-03 como `[~] (En Briefing)`.
- **AlertBox:** los tres tipos están en sus secciones (`info` en la introducción, `danger` en H2-2 junto a la lista, `warning` en H2-4), de 40, 39 y 44 palabras. El FAQ tiene 8 preguntas.
- **Límite brief/redacción:** las secciones son instrucciones, no prosa final. Solo el FAQ y los textos de AlertBox son borradores, lo cual está permitido.
- **Procedencia:** guía sin caso, sin Luna, Dakota ni Jaspe, con la declaración al lector en la introducción.
- **Español de España:** no hay voseo ni americanismos prescritos. Las apariciones de «tenés», «vos», «carro» o «celular» están en las listas de lo que se debe evitar. Las instrucciones están bien orientadas: tuteo y «vosotros», vocabulario (pipicán, persiana, mascletà, Policía Local), formato decimal, fechas sin horarios inventados y los criterios editoriales marcados como tales.
- **Honestidad de fuentes:** las verificaciones parciales (S2, S5, S7, S10) están marcadas; las correcciones «120 perros → 36» y la del identificador del BOE son reales; se descartó el enlace 404; los datos por raza de S1 y S2, las cifras de dB de S10 y las dosis de S6 quedan prohibidos. Nada de esto debe «completarse» al corregir.
- **Razas recientes:** la raza elegida, bodeguero andaluz, no aparece en ningún `public/images/blog/`, `heroImageAlt` ni brief. El registro es verdadero en lo esencial.
- **Prompts de imagen:** los tres incluyen el bloque de edad íntegro (cinco rasgos), la misma ficha de raza y la línea de rechazo a tamaño móvil. La escena es segura y evita la estética genérica con detalles concretos (arañazo en el rodapié, persiana de PVC, contenedores amarillo y azul, báscula de suelo, cámara y grano).
- **Volumen:** 6.000 es un encargo del propietario y está justificado por diez decisiones. Los antecedentes de golpe de calor (4.400) y leishmaniosis (4.550) son reales.

## 4. Recursos prometidos

| Recurso | Ubicación | Prueba | Estado |
|---|---|---|---|
| Tabla 1 (calendario) | H2-3 | 390 px | Planificada. Apilable en móvil (3 columnas, celdas de una frase) |
| Tabla 2 (encuesta) | H2-7 | Cifras contra S5 y 390 px | Planificada. Las cifras coinciden con el resumen de S5 |
| Lista del plan de la noche | H2-6 | Sin dosis | Planificada |
| 3 imágenes | portada, H2-6, H2-4 | Archivos reales a 390 px | Ninguna generada. Gate bien definido en §11 |

No se promete PDF, vídeo, animación ni calculadora.

## 5. Efecto cascada

- Los fallos de trazabilidad (P1-1) pasarán al artículo si el redactor se guía por el §9.2, y la auditoría del artículo los heredará.
- El contraste entre este brief y el de feromonas afecta a ambos. Hay que comprobar el de feromonas cuando se audite.
- No hay un artículo ya redactado ni otro brief que cite estas fuentes con un error.
- No hay un identificador erróneo que pueda estar copiado en otros briefs.

## 6. Qué corregir, en orden (sesión aparte)

1. Reconstruir una sola matriz fuente→H2 y copiarla en §3, §6 y §9.2, quitando las fuentes decorativas de H2-2, H2-7 y H2-9 o dándoles contenido (P1-1).
2. Decidir la regla de fármacos: sin porcentajes por fármaco ni marca, o con justificación escrita. Alinear H2-4, la tabla 2 y §9.6 (P1-2).
3. Añadir en §2 la relación con el brief de feromonas, y reformular la lectura de «27–35 %» en H2-7 y en FAQ 4 (P1-3).
4. Corregir la geometría de la imagen 2 (lado del perro, mano, cámara, tipo de correa, doble sujeción como criterio editorial) y el pie «largo/corto» (P1-4, P1-5).
5. Unificar `heroImageAlt` y la descripción de mirada y cabeza de la imagen 1 (P1-6), y aplicar P2-6.
6. Añadir la ITC 2 y las precisiones del RD y de la ley (P2-1), y el DOI publicado de Riemer (10.1016/j.jveb.2020.04.005).
7. Valorar Riemer 2019 PLOS ONE como fuente adicional (P2-3).
8. Condensar o justificar H2-3 y añadir la salida «si no hay utilidad, parar» al §9.1 (P2-2).
9. Ajustar FAQ 6 y las longitudes del FAQ (P2-5), la ventana editorial (P2-7) y la numeración S9/S10 en §2 (P2-8).

## 7. Límites de esta auditoría

- No leyó el texto completo de S2 (solo el resumen), ni la versión publicada de S5. bioRxiv web dio 429; Elsevier no dio acceso.
- No abrió el PDF español de la ficha técnica de Sileo ni la guía original del Colegio de Málaga.
- No verificó ordenanzas municipales, la disponibilidad en España de imepitoína y tasipimidina, ni los calendarios y costumbres regionales (Fallas, San Juan).
- No probó si las imágenes se generan bien: no existen todavía. La coherencia espacial es un juicio sobre el texto del prompt.
- No ejecutó `npm run build`, porque el brief no es código.
- Esta es la ronda R1. El historial de auditoría del brief debe anotarse en una sesión aparte.
