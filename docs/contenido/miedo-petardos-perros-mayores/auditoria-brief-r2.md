# Informe de auditoría R2 — `briefings/briefing-miedo-petardos-perros-mayores.md` (v2, rama `claude/brief-miedo-petardos-perros-mayores`, HEAD `6a43217`)

Auditor: agente independiente (sesión distinta de las que generaron y corrigieron el brief). Fecha: 2026-10-25. Brief auditado: v2, commit 6a43217. Informe transcrito sin cambios de contenido desde la respuesta del auditor.


Auditor independiente. No he modificado ningún archivo del repositorio. Temporales y descargas en `/tmp/claude-0/-home-user-CuidaTuPerroViejo/eca6bf97-2eb5-5d3e-8ec3-082c2fd5e029/scratchpad/auditor2/` (descargas en `dl/`, scripts `chk.py` y `mx.py`; Python con `-I`).

## Veredicto

**APTO con reservas. No está listo para redactar hasta cerrar 4 P1.**

El motivo: la v2 resuelve los 6 P1 de R1 y no hay P0 (ningún identificador falso, ningún enlace interno roto). Pero la v2 introduce cuatro fallos nuevos:
- Un uso de S11 que el texto completo de la fuente contradice en el público objetivo.
- Una regla de «un testimonio, un H2» que el propio brief incumple.
- Tres alteraciones de fidelidad en los testimonios.
- Un contrato de volumen cuyo techo supera lo que pidió el propietario.

Esta es la ronda R2 de un máximo de tres. Si R3 falla, hay que detener y consultar al propietario.

## 1. Los hallazgos de R1, uno por uno

| R1 | Estado | Evidencia propia |
|---|---|---|
| **P1-1** Matrices distintas | **Resuelto en lo esencial, con restos (P2-2)** | Con `mx.py`, §3 (líneas «H2»), §6 («Sustentado en») y §9.2 (líneas 500-510) coinciden en las 11 fuentes. Quedan citas en el cuerpo fuera de «Sustentado en»: S3 en H2-4 (l. 297), S8 en H2-6 (l. 347), H2-7 (l. 361) y H2-8 (l. 374). S1 y S4 en H2-8 son menciones de pasada. |
| **P1-2** Fármacos | **Resuelto** | Sin marcas en el cuerpo (Sileo solo aparece en el título de S7, l. 134, y en el registro de S5, l. 126). Sin porcentaje por fármaco (solo 69 %, N = 202). Sin dosis ni plazos. La excepción de la ficha técnica está justificada por escrito en §9.6.2 (l. 534), que es la opción que R1 admitía. |
| **P1-3** Feromonas | **Parcial** | El solapamiento se declara en §2 (l. 80), la tabla 2 y la FAQ 4 no emiten veredicto, y §9.8 pide reconciliar. Pero la descripción del artículo ya publicado es inexacta (P2-4). |
| **P1-4** Geometría imagen 2 | **Resuelto** | Lo recalculé con vectores. Con el perro a la derecha del tutor, la mano derecha en el bucle y ambos de izquierda a derecha con el costado derecho hacia la cámara, todo cuadra. El antifaz del ojo derecho queda visible. La doble sujeción está marcada como criterio editorial. Quedan matices en P2-9. |
| **P1-5** Pie corto/largo | **Resuelto** | El pie (l. 478) y H2-6 (l. 339) dicen «tranquilo y a su ritmo». |
| **P1-6** Alt y mirada | **Resuelto** | El alt del frontmatter (l. 47) es idéntico al de la imagen 1 (l. 471), comprobado por script. La mirada es «serena y atenta» y la cabeza «a la altura del lomo» en ficha, prompt y bloque de edad. |
| P2-1 RD/Ley | **Resuelto** | Lo verifiqué contra el BOE: ITC 2, apartado 2.5.A; DA sexta (8 y 10 años); art. 51.2; art. 24.2.b. |
| P2-2 Relleno H2-3 | **Parcial** | Bajó de 640 a 560 y se añadió la salida «parar y consultar» (l. 494). Pero el H3 de categorías (l. 282-284) sigue sin una decisión práctica para el lector (P2-5). |
| P2-3 Riemer 2019 | **Incorporado, pero mal usado** | Se añadió como S11. Ver P1-A. |
| P2-4 País S3 | Resuelto | S3 se atribuye a Suiza. |
| P2-5 FAQ | Resuelto | Respuestas de 42-52 palabras (suma 372). La FAQ 6 ya no dice «muchas normas locales», aunque no responde a la pregunta (P2-5). |
| P2-6 Prompts | **Parcial** | Dormitorio con persiana, izquierda/derecha del encuadre y «luz anaranjada» están corregidos. Las líneas «Ilustración generada…» y «Rechazar…» siguen dentro del párrafo del prompt, aunque marcadas como instrucción. Es aceptable porque la dirección visual las pide al final del prompt. |
| P2-7 Ventana | Resuelto con un error aritmético | Del 25 de noviembre al 31 de diciembre hay 36 días (5 semanas), no «unas cuatro» (l. 33). Es irrelevante. |
| P2-8 S9/S10 | Resuelto | |
| P2-9 | Resuelto | |

## 2. Verificación de fuentes (abiertas hoy, 2026-10-25)

| Fuente | Qué abrí | Confirmado | No confirmado o matiz |
|---|---|---|---|
| **S1** Salonen 2020 | Texto completo (Europe PMC, PMC7058607). Identificadores contra el registro | DOI, PMID 32139728, *Sci Rep* 10:2962. 13.715 perros, 264 razas, 32 % «muy miedosos» a algún ruido. «La prevalencia aumentó con la edad, especialmente el miedo al trueno» (Age and sex differences). Reclutamiento por Facebook; edad media 4,7 años | El 26 % de miedo a los fuegos artificiales (el dato más pertinente) no se usa (P2-3) |
| **S2** Blackwell 2013 | Resumen en Bristol; Crossref | DOI y volumen/páginas correctos. n = 3.897 y 383; casi la mitad frente a una cuarta parte; fuegos como desencadenante más frecuente; el riesgo aumenta con la edad | Texto completo no abierto (limitación de acceso, marcada por el brief). El resumen aporta que fuegos, disparos y truenos co-ocurren y no se asocian a la separación; el brief no lo usa en el H3 de separación |
| **S3** Gähwiler 2020 | Texto completo (PMC7525486). PMID real 32994423 | 36 perros (17 mestizos y 19 de 15 razas), 6 meses a 12 años. Orejas d = 0,68 (el resumen dice 0,69), movimiento 0,54, jadeo 0,45. Vocalizar, parpadear y esconderse no superan Bonferroni. Lamerse los labios y bostezar no aumentan. Tres primeros minutos codificados; excluidos perros con ansiolíticos o sordera | Efectos de grupo, no diagnóstico individual (P2-6) |
| **S4** Lopes Fagundes 2018 | Texto completo (PMC5816950) | PMID 29487858, DOI, 20 casos (10 + 10). Inicio medio 6 años y 6 meses frente a 2 años y 8 meses. Generalización 8/10 frente a 2/10. «No atribuir significación estadística». La hipótesis del mecanismo es de los autores | Ninguno |
| **S5** Riemer (preprint + publicada) | Resumen vía API de bioRxiv (v1 y v2); Crossref para la versión publicada | DOI publicado 10.1016/j.jveb.2020.04.005 correcto (*J Vet Behav* 37:61-70, mayo 2020). Todas las cifras de §6 coinciden con el resumen: N = 1.225; solo Feed/Play asociado a mejoría; medicación 69 % (N = 202); 27-35 % «no superior al placebo»; chaleco 44 % (N = 300); contracondicionamiento > 70 % (N = 694); relajación 69 % (N = 433); CD 55 % (N = 377) | La versión publicada no se leyó (bioRxiv responde 429). El componente «Environmental modification» incluye refugio, persianas y música, y no se asoció con mejoría (P2-1) |
| **S6** ESVCE 2026 | PDF completo (`pdftotext`) | Confirma que no se use acepromazina, que coincide con AVEC y AVEPA-GRETCA, la zona segura «previamente condicionada» y los tres principios activos EMA. El PDF contiene dosis (imepitoína, tasipimidina) y la brief las prohíbe correctamente. «Versión 2.1, junio 2026» solo consta en la URL | Disponibilidad en España de imepitoína y tasipimidina no verificada (declarado) |
| **S7** Ficha de dexmedetomidina gel | SPC del VMD (marzo 2026, AN 03168/2024); ficha del registro europeo | 3.2, 3.3 (cardiovascular grave, ASA III-IV), 3.5 («más de 17 años» no estudiado) y 3.6 (vómitos, sedación, incontinencia urinaria, mucosas pálidas, todos «common») literales. Primera autorización 10/06/2015 | Es la ficha británica, no la española (declarado). PDF español no abierto |
| **S8** Ley 7/2023 | Texto consolidado BOE (API) | 24.2.b, c, f, g («cuarenta y ocho horas desde que se produjo»), h; 51.2 (microchip e inscripción por comunidad); 65.7. «Pirot» aparece una sola vez, en el 65.7; «petard» y «fuegos artificiales» no aparecen | |
| **S9** RD 989/2015 | Texto consolidado BOE (API) | Art. 8.3.a (F3 y F4 «no perjudicial para la salud humana»); art. 121; art. 141.2 y 141.5; ITC 2, apartado 2.5.A (120 dB(A, imp) en F1-F3; F1 sin petardos); DA sexta (8 y 10 años) | |
| **S10** El Español (Málaga) | Artículo completo | Todas las recomendaciones atribuidas están, incluido «si el contacto tranquiliza, debe permitirse». Las cifras de dB y la cita del presidente existen y el brief las excluye bien | La guía original del Colegio sigue sin localizar |
| **S11** Riemer 2019 | Registro y **texto completo** (PMC6730926) | DOI, PMID 31490926, autoría (solo Riemer), *PLoS One* 14(9):e0218150. Resumen: N = 1.225; 52 %; primer año; menos casos hasta los 7; casi tres cuartos recuperados a la mañana siguiente, 10 %, 12 %, > 3 % | Contradice el uso que hace el brief (P1-A). Muestra internacional: 527 respuestas en inglés y 699 en alemán, de unos 27 países (incluida España), reclutada en grupos de Facebook de conducta canina |

Los identificadores de S1, S3 y S4 también resuelven en Europe PMC. El enlace ES-06 de Barcelona devuelve 404, como dice el brief.

**Matriz fuente → H2.** §3, §6 y §9.2 son idénticas. No hay fuente huérfana. Las menciones sin desarrollo y las citas fuera de «Sustentado en» están en P2-2.

## 3. Hallazgos nuevos

### P1 — cerrar antes de redactar

**P1-A. S11 mal usada: el texto completo contradice «crece con la edad» en los perros más mayores.**
- Ubicación: §2 l. 67; AlertBox `info` l. 223 («se agrava con la edad»); H3 l. 234-235 («crece con la edad… hay más perros afectados entre los mayores»); l. 238 (S11 interacción salud × edad como respaldo de «mirar la salud si es nuevo»); ficha S11 l. 156 y «verificación parcial» (S11 no figura en las listas de l. 166, 558 y 588).
- Evidencia (S11, Discusión): «hubo un claro aumento de la prevalencia con la edad en perros sanos hasta los diez años, pero un descenso en los de 11 o más. En perros con problemas de salud, el miedo aumentó hasta los ocho años y **disminuyó desde los nueve**… desde los nueve años la incidencia fue **menor** en perros con problemas de salud». La autora lo atribuye a la pérdida de audición y a muestras pequeñas, y concluye que el efecto de los problemas de salud «no pareció fuerte». El resumen, que es lo que el brief leyó, solo dice que la interacción fue predictor significativo.
- Por qué importa: el público son perros de 10-15 años. El brief usa la interacción para respaldar «revisa la salud» cuando, en los perros mayores, apunta en sentido contrario. «Crece con la edad» no es cierto para los más ancianos en S11 y el brief lo da por conciliado sin haber abierto el texto, que es de acceso abierto.
- Instrucción exacta:
  - Abrir S11 completo y registrar la localización (Discusión, párrafo de «health problems × age»).
  - Reescribir el H3 de l. 234 sin «crece con la edad». Por ejemplo: «El miedo al ruido es frecuente; con la edad suele aumentar, pero en los perros más mayores los datos no son uniformes». Citar S1 y S2 (aumento) y S11 (descenso desde los 9-11 años, con la pérdida de audición como explicación posible de la autora).
  - Quitar de l. 238 la frase sobre la interacción. Conservar S4 como respaldo de «descartar dolor», con sus límites.
  - Corregir el AlertBox `info` («se agrava con la edad») y la «Respuesta práctica» (1) de §2.
  - Añadir la hipoacusia a los puntos a descartar de H2-1, citada como hipótesis de S11.
  - Actualizar la ficha de S11 (muestra internacional, grupos de Facebook, 27 países incluida España, N compartido con S5) y añadir S11 a las verificaciones parciales de l. 166, 558 y 588 hasta que se cierre.

**P1-B. Incumple su propia regla «cada testimonio en un solo H2».**
- Ubicación: §6 l. 208 y §9.4 l. 524, frente a H2-1 l. 240; H2-2 l. 250 y 255-261; H2-5 l. 318 y 326-328; H2-6 l. 343 y 345; H2-9 l. 383.
- Evidencia:
  - Osa aparece en H2-2, H2-5 y H2-9; Baltor en H2-2 y H2-5.
  - La anécdota de diciembre de 2025 («algo nerviosas y muy alerta», en casa, con película y gente hablando) aparece en H2-1 (l. 240), H2-2 (l. 257) y H2-6 (l. 343).
  - §9.4 asigna «las cuatro formas» a H2-2 **y** «Osa y Baltor» a H2-5.
- Por qué importa: el contrato es contradictorio, un auditor no puede darlo por cumplido y el redactor repetirá relatos para llegar al volumen. Son unas 500 palabras de testimonio repartidas sin control.
- Instrucción exacta (la asignación): H2-1 solo Dakota (salud), sin la anécdota de 2025. H2-2 solo las cuatro formas, incluida la anécdota de 2025. H2-5 sin Osa ni Baltor: retirar ese H3 y sustituirlo por contenido con fuente (S6 y S10) o por la verificación de que la puerta y la terraza están cerradas. H2-6 solo Luna y Dakota en consuelo, sin la anécdota de la película. H2-9 solo el portón. Alinear la cabecera «Testimonios» de cada H2 (l. 231, 250, 318, 335) y la casilla de §9.4 con esa asignación.
- Sobre el encaje con «español de España»: sí encajan si se mantienen en unas 300 palabras, declaradas con el país una vez y una frase de puente («en un piso, lo equivalente es…»). El patio y el portón de Osa apenas se transfieren a un lector en piso, así que reservarlos para la versión latinoamericana es coherente con la decisión del propietario.

**P1-C. Tres deslices de fidelidad en los testimonios (el archivo y la guía dicen «nada que no esté en el archivo»).**
- (i) l. 343: «lo que ayudó en casa fue estar todos juntos con una película puesta». El archivo solo dice que se quedaron en casa con películas y gente hablando, y prohíbe atribuir causa a la calma o la reacción (testimonios-propietario.md, l. 41). Cambiar por «estuvimos todos juntos en casa, con una película puesta y hablando; las dos estuvieron algo nerviosas y muy alerta», sin «ayudó».
- (ii) l. 327 y 383: «Osa llegó a salir cuando abrían el portón… no se lastimó» y «en casa de Osa, a veces los perros salían disparados». El archivo dice «cree que a veces… los perros» (plural), «no recuerda con seguridad si se escapó» y «en una ocasión salieron, pero fueron a esconderse». Hay que individualizar menos y mantener la duda: «el propietario cree recordar que, al abrir el portón, a veces los perros salían de golpe; nunca se hicieron daño». Conviene también quitar a Osa de la frase.
- (iii) Etiquetas que no están en el archivo:
  - «parálisis» (l. 76 y 261) para Baltor, que «no salía de las habitaciones»;
  - «perdió el control por el miedo» (l. 260), que además se confunde con el «pierde el control» de Dakota. El archivo dice que «se orinó o se defecó, no recuerda cuál»;
  - «era la costumbre de esa casa» (l. 327) para regañar y mojar. El archivo solo atribuye la costumbre a tener los perros en el patio.
- Instrucción: reformular con los hechos del archivo y quitar «parálisis». Si se conserva el título «Cuatro maneras», definir las cuatro con palabras del archivo: alerta y nerviosas, ladrido y escondite, buscar sitio donde se oiga menos, quedarse dentro de las habitaciones.
- Además, la voz mezcla «nosotros» con «el propietario» en tercera persona (l. 345): decir «yo / nosotros», porque la firma del sitio es la del propietario.

**P1-D. El contrato de volumen excede lo que pidió el propietario y el método de conteo es ambiguo.**
- Ubicación: l. 31, 202 y 494.
- Evidencia:
  - Pidió 5.000-6.000; el contrato es 5.500-6.500 con target 6.000.
  - Suma de targets: 350 + 560 + 620 + 560 + 640 + 600 + 640 + 480 + 420 + 330 + 280 + 520 = **6.000** (correcto). La suma de H3 de cada H2 coincide con su target.
  - Pero los targets no incluyen: 32 títulos H3 (230 palabras), 10 títulos H2 (97), 3 AlertBox con título (149) y 8 preguntas de FAQ (74). Son **550 palabras**.
  - Si cada sección alcanza su target en prosa, el artículo ronda **6.550 > techo 6.500**. Si los targets ya los incluyen, la prosa queda en unas 5.450 y por debajo del suelo de 5.500 que el brief declara «sin tolerancia».
  - La conclusión suma 130 + 372 = 502, no 520.
- ¿Es alcanzable el 6.000 sin relleno? 5.500, sí. 6.000 solo con relleno probable en H2-3 («categorías», «ayuntamiento»), H2-7 («Cómo comprar con criterio»), H2-8 (sin pautas, 420 palabras) y la conclusión, que repite las cinco decisiones de la introducción. Dos listas de «Si hace falta más» (l. 245 y 349) duplican H2-9 y H2-1.
- Instrucción exacta: fijar contrato 5.300-6.000, target 5.700, techo 6.000 (el tope del propietario). Declarar si los targets incluyen títulos, AlertBox y FAQ, y ajustar los números en consecuencia. Mantener «parar y consultar» (l. 494). Eliminar las dos listas «Si hace falta más» y la repetición de las cinco decisiones en la conclusión, sustituida por una síntesis nueva.

### P2

- **P2-1. Informe selectivo de S5 en H2-5.** La l. 324 dice que la música «no se asoció con mejoría». Pero el componente «Environmental modification» de S5 incluye también el escondite y las persianas cerradas, es decir, el refugio que el artículo recomienda. Decirlo una vez y explicar que el refugio se recomienda por S6 y S10 (opinión experta), no por una asociación en la encuesta. La FAQ 5 solo lo insinúa.
- **P2-2. Trazabilidad fina.**
  - Añadir a «Sustentado en» las fuentes que el cuerpo ya cita (S3 en H2-4; S8 en H2-6, H2-7 y H2-8) o retirar esas citas, y propagar el cambio a §3 y §9.2.
  - S1 y S4 en H2-8 son menciones de pasada (l. 372 y 374), es decir, fuentes decorativas en ese H2.
  - «Cada elemento con la lectura de S3» (l. 263) no vale para «tiembla», «no come ni juega» ni «busca contacto», que S3 no mide. Limitar la lectura de S3 a orejas, movimiento, jadeo, labios y bostezo.
- **P2-3. Datos disponibles sin usar o desactualizados.**
  - S1: el 26 % de miedo a los fuegos es el dato pertinente; el brief solo usa el 32 % de «algún ruido».
  - S5 y S11 comparten una muestra internacional, así que «el país no se verificó» ya es verificable.
  - S2 respalda el H3 de separación (l. 242-243: los fuegos no co-ocurren con la conducta de separación).
- **P2-4. Descripción inexacta del artículo publicado.** §2 l. 81 dice que `ansiedad-separacion-perros-senior` solo nombra la tormenta de pasada. Ese artículo publicado tiene un H3 completo («Feromonas: lo que la evidencia dice de verdad», l. 336-342) con «moderada solo en miedo a tormentas». El brief de petardos lo enlaza desde H2-1. Declarar ese solapamiento y comprobar que la tabla 2 y la FAQ 4 no choquen con él.
- **P2-5. H2-3 y FAQ 6.**
  - El H3 de categorías (l. 282-284) no ayuda a decidir: los 120 dB(A) y «F1 sin petardos» son curiosidades para el tutor. Condensar a 2-3 frases o sustituir por qué mirar en la etiqueta y en el bando.
  - El calendario es delgado (Nochevieja, Fallas, San Juan «litoral» y «según localidad»). Para un artículo «realmente español», añadir como contexto de calendario fiestas con fecha pública (Hogueras de Alicante, San Fermín…), señaladas como a contrastar con el programa oficial.
  - La FAQ 6 no responde a «¿es legal?»: abrir con «Depende de la fecha, del lugar y de la ordenanza».
- **P2-6. De grupo a individuo.** H2-2 l. 255: «si pasea, jadea y tiene las orejas atrás, está asustado». S3 son diferencias entre noches en 36 perros y el jadeo también es calor. Decir «son señales que subieron como grupo» y pedir observar el cambio respecto a lo habitual.
- **P2-7. Atribuciones legales de más.**
  - La l. 361 («chapa con teléfono y arnés… seguridad, S8») y la §7 l. 418 («ítems que exige la ley en espíritu») no están en S8, que exige vigilancia, evitar la huida e identificación con microchip.
  - La l. 347 usa el 65.7 para justificar no llevar al perro a la verbena; el artículo habla de animales utilizados en el evento.
  - El 24.2.b es «educar y manejar»; usarlo como respaldo de no regañar es una extensión que hay que formular como tal.
- **P2-8. Seguridad clínica menor.**
  - H2-5 y H2-6 proponen «masticable» a perros mayores. Matizar: textura adaptada a la dentadura, vigilado y sin dar a un perro con náuseas o sin hambre. Existe un artículo del sitio sobre perros sin dientes.
  - «No estudiado en > 17 años» (l. 301) puede tranquilizar de más: dice que no hay estudios en > 17 años, no que se haya estudiado hasta los 16.
  - «Algunos tratamientos exigen revisar corazón, riñón e hígado» (l. 297): S7 contraindica con enfermedad grave; no «exige revisar».
  - «4-6 semanas antes» (l. 281) es un número editorial sin fuente que sostiene la tesis del artículo («decisiones semanas antes»). Dar la razón (tiempo para descartar dolor y construir el refugio condicionado) o quitar el número.
  - El resto de la seguridad de §9.6 se cumple (ver §4).
- **P2-9. Prompts de imagen.** Lo físico que comprobé:
  - **Imagen 1.** «Tumbada sobre el costado izquierdo, vemos el lado derecho de la cara», con «cámara a la altura del perro»: con el perro echado de lado, el lado derecho de la cara mira hacia arriba. Para verlo hace falta cámara elevada (≈ 45°) o poner a la perra en decúbito esternal (de pecho) con el cuerpo de perfil. Además falta decir a qué lado del encuadre queda la persiana y hacia dónde mira, y el decúbito lateral es una postura de relajación, que contradice «cuerpo recogido, orejas atrás».
  - **Imagen 2.** La cámara está «desde el lado de la calzada» y la perra «en el lado más cercano a la cámara», así que la perra va **entre el tutor y la calzada**. Poner al tutor del lado de la calzada (cambiar el sentido de marcha y la mano, o la cámara al lado del edificio). Con un «plano americano» a la cadera, los mosquetones y la chapa a 390 px serán casi ilegibles, contra la aceptación de l. 464. Usar un plano que encuadre al perro grande y recorte al tutor por la cintura.
  - **Imagen 3.** Falta indicar hacia qué lado mira la perra (para que quede de perfil con el ojo del antifaz visible) y en qué lado de la mesa está la veterinaria (el lado de cámara la taparía). No lleva el collar gris que la ficha fija «en las tres imágenes».
  - Los prompts 2 y 3 omiten «manchas negras en el lomo» y el 3 omite «pelo corto» del sujeto fijo.
  - El pie de la imagen 1 dice «un masticable» y el prompt pinta un juguete de goma relleno. El alt dice «su tutora» y solo se ve una mano.
  - Lo que sí cumple: raza no repetida (comprobado), cinco rasgos de edad y línea de rechazo en los tres prompts (script), ficha completa y concreción real.
- **P2-10. Español de España.** No hay voseo ni «usted» en las instrucciones, la FAQ ni los AlertBox. Sí hay residuos latinoamericanos que el redactor copiará:
  - «pólvora» como sustituto de «petardos» (l. 240 y 327; en España, «los petardos», «cohetes» o «pirotecnia»);
  - «alzar» (l. 345 y §9.6.14; en España, «coger en brazos» o «levantar»);
  - la lista de términos a evitar (l. 90) debería incluir ambos.
- **P2-11. Repetición.** El consejo de chapa y microchip aparece en H2-6, H2-7, H2-9, la FAQ 7, la FAQ 8 y la conclusión (más 24.2.f). Asignarlo a un solo H2, H2-9, con remisión breve en los demás.
- **P2-12. Detalles.**
  - `datePublished` queda como placeholder en el bloque que el redactor copia «exactamente» (l. 49). Poner una fecha real o añadir un gate «sustituir antes de commit».
  - La instrucción de la l. 359 contiene «no sustituyen», una de las muletillas que mide `tono.py`.
  - P1-02 figura como «hecho», pero el inventario lo marca `[~]` (l. 11 del brief).

## 4. Lo que sí comprobé y está bien

- Conteos: `seoTitle` 44 y `metaDescription` 154 caracteres (script). FAQ de 8 respuestas con 51, 49, 44, 45, 45, 52, 44 y 42 palabras (372 en total, 74 en las preguntas). AlertBox: `info` 40 palabras en Intro, `danger` 39 en H2-2 junto a la lista, `warning` 44 en H2-4, un tipo cada uno. Dos tablas planificadas, coherentes entre §4 y §9.3, de tres columnas y celdas de una frase.
- `pilar` en el enum de `src/content.config.ts`. Los 7 enlaces internos existen y están publicados (incluidos `chequeo-geriatrico-canino` y `golpe-de-calor-perros-mayores`, que no declaran `status` pero el valor por defecto es «Publicado»). La calculadora está omitida con motivo documentado.
- Canibalización: no hay artículo ni brief sobre petardos, fuegos artificiales ni pirotecnia, salvo este. Los temas vecinos están bien delimitados (P1-14, P1-15, P1-25, P1-29). El brief de feromonas no menciona petardos.
- Seguridad clínica (§9.6, los 15 requisitos): sin dosis, sin marcas, sin porcentaje por fármaco; la información de la ficha va atribuida, y la acepromazina y los calmantes de personas están desaconsejados. Alzar a un perro asustado, regañar, mojar y elevar la voz se cuentan, no se aconsejan, y el cuerpo planificado no los contradice. Los usos de terremotos y temblores del propietario no se trasladan a España.
- Honestidad de fuentes: ningún identificador inventado, URL profundas, verificaciones parciales marcadas, el «120 perros → 36» corregido, el 404 de ES-06 reconocido. No «completar» nada de esto al corregir.
- Testimonios: sin edades, fechas ni lugares inventados para Osa, Baltor ni la perra vecina; el país se declara; las hipótesis del propietario (calle ruidosa, apartamento de arriba, «montón de sonidos») no aparecen como causa; Dakota se usa sin atribuir causa a su calma; no hay Jaspe; el tono está en primera persona del plural y sin culpa hacia la familia de Osa.
- Razas: el bodeguero andaluz no aparece en `public/images/blog/`, en los `heroImageAlt` ni en `briefings/`. El registro de la sección 8 es veraz en lo esencial.
- Restos de la v1: no hay «guía sin caso», «S9 colegial», «ocho/nueve semanas» como defecto, «Sileo» en el cuerpo ni «paseo largo/corto» como instrucción.

## 5. Límites de la auditoría

- No abrí el texto publicado de S5 (bioRxiv responde 429; verifiqué el resumen y el DOI en Crossref). No abrí el texto completo de S2 (resumen en Bristol). No abrí la ficha técnica en español de S7. No localicé la guía original del Colegio de Málaga (la prensa sí está contrastada).
- No verifiqué ordenanzas municipales, la disponibilidad en España de imepitoína y tasipimidina, ni los hechos de calendario de Fallas, San Juan y fiestas patronales.
- No hay imágenes generadas: la coherencia espacial es un juicio sobre el texto de los prompts, no sobre un archivo.
- Los testimonios se contrastaron contra el archivo del repositorio, que es un dictado, no contra el propietario.
- No ejecuté `tono.py` ni `npm run build`, porque el brief no es un `.mdx`.
- Efecto cascada: el artículo aún no existe. Hay que comprobar que el brief de feromonas y el artículo de ansiedad por separación (ya publicado) no contradigan la tabla 2 ni la FAQ 4. No hay otro brief que cite estas fuentes con un error.