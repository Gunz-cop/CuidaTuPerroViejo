# Informe de auditoría R3 — `briefings/briefing-miedo-petardos-perros-mayores.md` (v3)

Auditor: agente independiente (sesión distinta de las que generaron, corrigieron y auditaron antes el brief). Fecha: 2026-10-25. Brief auditado: v3, commit 984ff81. Informe transcrito sin cambios de contenido desde la respuesta del auditor. **Veredicto: NO APTO. Es la tercera y última ronda: según `calidad-editorial-adsense.md` §6, se detiene la corrección y se consulta al propietario.**


Rama `claude/brief-miedo-petardos-perros-mayores`, HEAD `984ff81`. Auditor independiente, sin participación previa. No modifiqué ningún archivo del repositorio (`git status` limpio). Temporales y descargas en `/tmp/claude-0/-home-user-CuidaTuPerroViejo/eca6bf97-2eb5-5d3e-8ec3-082c2fd5e029/scratchpad/auditor3/` (descargas en carpetas nuevas, scripts aparte, Python con `-I`).

## Veredicto: **NO APTO**

Queda un P1 sin resolver. Es el P1-C de R2 (fidelidad de los testimonios), que solo se corrigió en parte: los dos primeros bullets de testimonio del §6 reescriben lo que dijo el propietario de una forma que cambia su sentido. El resto del brief está muy cerca de estar listo. No hay P0: ningún identificador falso, ningún enlace roto, ninguna dosis, ninguna incoherencia espacial en las imágenes. Según la regla de esta última ronda, hay que detener la corrección y consultar al propietario. La corrección es de seis ediciones breves (instrucciones en N-1) y la sesión de redacción puede arrancar después.

## 1. Estado de los hallazgos de R2

| R2 | Estado | Línea y evidencia |
|---|---|---|
| **P1-A** Uso de S11 | **Resuelto** (con 3 residuos P2) | Abrí PMC6730926 completo. L. 238 reproduce fielmente la Discusión: en perros sanos la prevalencia sube hasta los 10 años y baja desde los 11; en perros con problemas de salud sube hasta los 8 y baja desde los 9; la autora lo atribuye a la pérdida de oído y a muestras pequeñas, y dice que el efecto de la salud «did not appear to be strong». Ya no hay «crece con la edad»: el AlertBox info (l. 225) y la respuesta práctica (l. 67) están corregidos. Ficha de S11 (l. 154-157) reescrita. Residuos en N-5. |
| **P1-B** Un hecho, un H2 | **Resuelto en la asignación**; queda un residuo léxico P2 | Comprobado H2 por H2: H2-1 solo Dakota (salud), H2-2 solo el último diciembre y la perra vecina, H2-6 solo coger en brazos y elevar la voz. H2-3, 4, 5, 7, 8, 9 y 10 no contienen testimonio. La introducción solo declara a los sujetos y el país. §6 (l. 210) y §9.4 (l. 513) coinciden. Osa y Baltor no aparecen en ningún H2. Residuo: «portón»/«patios» en l. 372 (N-6). |
| **P1-C** Fidelidad | **PARCIAL → P1 pendiente (N-1)** | Corregidos: «lo que ayudó», «parálisis», «perdió el control por el miedo» (para otros perros), «costumbre de esa casa»; la voz es «yo/nosotros». Aparecen defectos nuevos del mismo tipo en l. 243, 257 y 259. |
| **P1-D** Volumen | **Resuelto en el contrato; residuo aritmético P2 (N-4)** | Contrato 5.300–6.000, target 5.700 (l. 483). Suma de targets = 5.700 (350+540+560+500+640+550+600+440+400+300+280+540). Cada H2 coincide con la suma de sus H3. Eliminadas las listas «Si hace falta más». El cierre ya no repite las cinco decisiones. Se conserva «parar y consultar». |
| P2-1 S5 medidas ambientales | Resuelto | L. 319 lo dice una vez y asigna el refugio a S6 y S10. El abstract de S5 confirma que solo «Feed/Play» se asoció con mejoría. |
| P2-2 Trazabilidad | Resuelto | Script propio: §3, §6 y §9.2 idénticas en las 11 fuentes; ninguna cita fuera de «Sustentado en». |
| P2-3 Datos sin usar | **Parcial** | El 26 % de miedo a los fuegos de S1 sigue sin usarse, y `correccion-r2.md` (l. 20) afirma que «no aparece en el texto»: es falso (N-3). Falta además el país de S5/S11 (N-5). S2 sí se añadió al H3 de separación y está bien. |
| P2-4 Artículo de ansiedad | Resuelto | L. 81 y §9.8 describen bien el H3 de feromonas (`ansiedad-separacion-perros-senior.mdx` l. 340). |
| P2-5 H2-3 y FAQ 6 | Resuelto | H3 de etiqueta condensado a 90 palabras; Hogueras y San Fermín añadidos «a contrastar»; FAQ 6 abre con «Depende…». |
| P2-6 Grupo e individuo | Resuelto | L. 254 y 261. |
| P2-7 Atribuciones legales | Resuelto | Chapa y arnés marcados como criterio editorial; 65.7 y 24.2.b formulados como apoyo. |
| P2-8 Seguridad menor | Resuelto | Masticable adecuado a la dentadura, «no hay estudios en >17 años», «puede querer revisar», sin «4–6 semanas». |
| P2-9 Prompts | Resuelto en lo sustancial; residuos (N-7) | La geometría que preocupaba cuadra (ver §5). |
| P2-10 Americanismos | **Parcial** | «pólvora» y «alzar» añadidos a las listas de evitar. Quedan «portón» y «patios» (N-6). |
| P2-11 Identificación repetida | Resuelto | Vive en H2-9; H2-6 y H2-7 remiten. |
| P2-12 Detalles | Resuelto | Gate de `datePublished` (l. 53); «cinco semanas»; sin «no sustituyen»; P1-02 aclarado (el artículo está en `origin/main`, PR #146). |

## 2. Verificación de fuentes (abiertas hoy, 2026-10-25)

| Fuente | Qué abrí | Confirmado | Matiz o límite |
|---|---|---|---|
| **S1** | Texto completo (Europe PMC, PMC7058607) | 32 % de sensibilidad al ruido; «la prevalencia aumentó con la edad, especialmente el miedo al trueno». **También: «fear of fireworks… prevalence of 26 %»** (Results, Prevalence). | El brief no usa el 26 %, que es el dato más pertinente para petardos. |
| **S2** | Resumen en Bristol y Crossref | DOI y paginación correctos. Cuarta parte frente a casi la mitad; fuegos como desencadenante más frecuente; «less than a third sought professional advice». Fuegos, disparos y truenos co-ocurren y **no** con conducta de separación (uso en H2-1 correcto). | Texto completo no abierto: limitación de acceso, ya marcada por el brief. |
| **S3** | Texto completo (PMC7525486) | 36 perros (17 mestizos y 19 de 15 razas), 6 meses a 12 años. Orejas d = 0,68 (el resumen dice 0,69), movimiento 0,54, jadeo 0,45. Vocalizar, parpadear y esconderse no superan Bonferroni. Lamerse los labios y bostezar no aumentan. Tres primeros minutos. Comité del cantón de Berna. Excluidos perros con ansiolíticos **y** con «known loss of hearing». | Puntuación de afectación ≥ 2 de 5, no «al menos moderada» (N-5). |
| **S4** | Texto completo (PMC5816950) | 20 casos (10 + 10); en los casos con dolor el inicio fue casi 4 años más tarde; 8 de 10 generalizaron. | — |
| **S5** | Abstract del preprint (API bioRxiv v1 y v2) y Crossref | DOI publicado 10.1016/j.jveb.2020.04.005 correcto (*J Vet Behav* 37:61-70). Todas las cifras de §6 y de la tabla 2 coinciden: 1.225; solo Feed/Play asociado a mejoría; medicación 69 % (N = 202); 27–35 % «not higher than… placebo»; chaleco 44 % (N = 300); contracondicionamiento > 70 % (N = 694); relajación 69 % (N = 433); CD 55 % (N = 377). | Versión publicada no leída (bioRxiv responde 429). Verificación parcial ya declarada. |
| **S6** | PDF ESVCE completo (`pdftotext`) | No acepromazina («lacks anxiolytic properties»; puede aumentar la sensibilización); coincide con AVEC y AVEPA-GRETCA; zona segura «previously positively conditioned… free to come and go»; tres principios activos con indicación EMA; individualizar según comorbilidades. Contiene dosis (imepitoína, tasipimidina) que el brief prohíbe copiar. | «Versión 2.1, junio 2026» solo consta en la URL. |
| **S7** | SPC británico (VMD, marzo 2026) y registro europeo | 3.2, 3.3 (cardiovascular grave; ASA III–IV, p. ej. insuficiencia renal o hepática terminal), 3.5 («over 17 years… has not been studied»), 3.6 (vómitos, sedación, incontinencia urinaria y mucosas pálidas, todos «common»). Registro: autorizado el 10/06/2015; «Disponible en: … España». | Ficha británica, no la española (declarado, con gate). |
| **S8** | Texto consolidado del BOE | 24.2.b, c, f, g («cuarenta y ocho horas desde que se produjo»), h; 51.2 (microchip e inscripción por comunidad); 65.7. «Pirot» aparece una sola vez (65.7); «petard» y «fuegos artificiales» no aparecen. | — |
| **S9** | Texto consolidado del BOE | Art. 8.3.a (F1–F4, «no perjudicial para la salud humana»), 121 (12/16/18), 141.2 y 141.5, DA sexta (8 y 10 años), ITC 2 apartado 2.5.A (120 dB(A, imp); F1 sin petardos; «la categoría se indicará claramente en la etiqueta»). La edad mínima en el etiquetado consta en otro artículo del reglamento (letra f). | — |
| **S10** | Artículo de El Español | Todas las recomendaciones atribuidas están, incluido «si el contacto con la persona le tranquiliza, debe permitirse». Las cifras en dB y la cita del presidente existen y el brief las excluye bien. | La guía original del Colegio sigue sin localizar. |
| **S11** | Texto completo (PMC6730926) y Crossref | Identificadores correctos. Abstract y Discusión como en P1-A. Recuperación: 73,9 % «a la mañana siguiente»; 10,4+1,8 ≈ 12 % hasta una semana; 2,3+1,2 ≈ 3,5 % semanas o meses. | Muestra: 527 respuestas en inglés y 699 en alemán, de unos 27 países **incluida España**, reclutada en «dog-related Facebook groups». El brief aún dice que el país «no se verificó». |

No hay P0 de fuentes. Ningún fallo confirmado en identificadores ni en cifras clave. Las limitaciones de acceso (S2 completo, S5 publicada, S7 en español, guía del Colegio) están documentadas y bloqueadas por gate antes de publicar. El enlace ES-06 de Barcelona devuelve 404, como dice el brief.

## 3. Hallazgos nuevos

### P1 (bloquea)

**N-1. Fidelidad de los testimonios: cuatro cambios de sentido en H2-1 y H2-2 (P1-C sigue abierto).**

Ubicación: §6 H2-1 l. 243; H2-2 l. 257-259; §2(g) l. 76.

Evidencia, frente al archivo `testimonios-propietario.md`:
- **L. 257, «las dos estuvieron algo nerviosas y muy alerta… «Nerviosa y alerta» también es miedo».**
  - El propietario nunca habla de miedo en las perras. Dice «algo nerviosas y muy alerta, **pero tranquilas en casa con la familia**» (Luna, l. 14) y que Dakota «con la pólvora… siempre ha sido muy tranquila» (l. 33).
  - El brief omite «pero tranquilas», omite que en la reunión familiar «estuvieron muy tranquilos», y añade una etiqueta que el archivo no contiene. Es lo que §9.4 prohíbe («Sin etiquetas que no estén en el archivo»).
  - Además, H2-1 (l. 243) dice «siempre ha estado tranquila» y H2-2 dice «también es miedo»: un lector verá la contradicción en dos secciones consecutivas.
- **L. 257, «con bastantes petardos» (Costa Rica).**
  - El archivo dice «bastante pólvora» y aclara que en Costa Rica «no se acostumbra a reventar mucha pólvora… es más bien un tema de luces que de petardos» (l. 33).
  - Traducir «pólvora» por «petardos» contradice la aclaración del propietario. El brief omite además esa aclaración, que cambia cómo un lector español interpreta «siempre tranquila» (y que el archivo cita como posible explicación en l. 43).
  - También cambia «películas puestas» por «una película».
- **L. 243, «Dolor no es lo mismo que miedo».** Usa a Dakota como contraejemplo de S4, pero el archivo no dice que a Dakota le duela nada: dice sobrepeso, displasia inicial, «algo en la columna» y que «se cansa mucho al caminar». El brief infiere dolor.
- **L. 259 y l. 76(g), «ladrido que acaba en búsqueda de un sitio tranquilo» como forma de reaccionar.** Esa secuencia general es una «impresión del propietario (hipótesis suya)» según el archivo (l. 78). El brief la presenta como un patrón de reacción sin atribuirla, contra §9.4 («las hipótesis del propietario… se atribuyen como suyas»).

Instrucción exacta para una sesión aparte (6 ediciones):
1. L. 257: reescribir como «el último diciembre hubo bastante pirotecnia; las dos estuvieron algo nerviosas y muy alerta, pero se quedaron en casa, con la familia, con películas puestas y la gente hablando». Usar «pirotecnia» o «cohetes», no «petardos», para Costa Rica. Borrar ««Nerviosa y alerta» también es miedo». Si se quiere el puente, una frase dirigida al lector: «si tu perro está nervioso y alerta, mira las señales de abajo».
2. Añadir, en un solo H2 (H2-2, junto a ese bullet), la aclaración del propietario: «en Costa Rica no se acostumbra a reventar mucha pirotecnia; es más un tema de luces». Mantener «sin atribuir causa».
3. L. 243: suprimir «Dolor no es lo mismo que miedo». Dejar solo hechos: sobrepeso, displasia inicial, problema de columna sin nombre, se cansa al caminar. Sustituir el cierre por «cada perro es distinto; si el miedo aparece de golpe, se revisa». Añadir a H2-1 la cautela «no sabemos si le duele; eso lo dice el veterinario».
4. L. 259 y l. 76(g): sustituir «ladrido que acaba en búsqueda…» por los hechos («aullaba y ladraba en lo más fuerte y, cuando era demasiado, buscaba un sitio donde se oyera menos») y, si se quiere generalizar, atribuirlo: «mi impresión es que…». Quitar «patrón».
5. Mantener «no atribuir causa a la calma de Dakota» (archivo l. 43).
6. Añadir a §9.4 una casilla «El último diciembre se cuenta con “pirotecnia/cohetes”, no “petardos”, y con la aclaración de las luces».

### P2 (corregir en la misma sesión; ninguno bloquea por sí solo)

**N-2. Elevar la voz en H2-6 (l. 337).** El texto dice «le elevamos un poco la voz solo para que nos oiga y nos vea». El archivo dice «para que los escuche y los vea y sepa que está con ellos»; el «solo» es añadido. La frase «No es una pauta» cubre explícitamente coger en brazos pero no la voz, que choca con la propia H2-5 («castigar, regañar»).
- Instrucción: ampliar la salvedad a «ninguna de las dos cosas es una pauta» y decir que a un perro asustado se le habla con calma (S10, S6). Quitar «solo». Cambiar «con Luna funciona porque ella lo busca» por «con Luna lo hago porque ella lo busca» (§9.4 prohíbe atribuir causa a la calma). Añadir que, si el perro tiene problemas de cadera o columna (como Dakota, H2-1), cómo levantarlo lo enseña el veterinario.

**N-3. Registro falso en `correccion-r2.md` y dato pertinente sin usar.** El registro afirma (l. 20) que el 26 % de fuegos de S1 «no aparece en el texto que descargué». Sí aparece (Results, Prevalence: «fear of fireworks was the most common subtrait with a prevalence of 26 %»).
- Instrucción: usar el 26 % en el H3 de H2-1 (l. 238) junto al 32 % de «algún ruido», con localización, y rectificar ese renglón del registro.

**N-4. Aritmética del volumen sin ajustar.** §6 (l. 204) declara que los targets incluyen títulos H2 y H3 y avisos. Pero los H3 de cada H2 suman exactamente su target (4.810), los párrafos de la introducción suman 350 y el cierre más el FAQ suman 548.
- Quedan fuera de cualquier H3 los 10 títulos H2 (96 palabras), los 3 AlertBox (44, 44 y 55 = 143) y los encabezados de la conclusión.
- Resultado si cada H3 cumple su target: **≈5.944** palabras (si el target del H3 incluye su título) o **≈6.176**, por encima del techo de 6.000 (si no lo incluye, hay 32 títulos H3 = 232 palabras más).
- La holgura real bajo el techo es de entre 0 y 56 palabras.
- Instrucción: declarar que el target de cada H3 incluye su título, y restar de los H3 de H2-2 (−44), H2-4 (−55) y la introducción (−44), y los títulos H2, hasta que la suma completa sea 5.700.

**N-5. Residuos de fuentes y de precisión.**
- **L. 238 y FAQ 1 (l. 391).** «La mayoría lo desarrolla en el primer año». Es la frase del abstract, pero el texto completo da 45 % antes del año (tabla 2: 178 de 395) y 73 % antes de los dos años; la mediana es 1 año. Reformular a «casi la mitad antes de cumplir un año».
- **L. 242.** «Cambios en el oído, que pueden aumentar o disminuir la reacción (S11)». S11 solo propone que la pérdida de oído puede **atenuar** el miedo. Atribuir solo eso a S11 y dejar «aumentar» como criterio clínico sin fuente.
- **L. 94 y l. 161.** «El país de S2, S5 y S11 no se verificó». S5 y S11 comparten muestra y S11 lista ~27 países, incluida España. Decir «muestra internacional en inglés y alemán, reclutada en grupos de Facebook; incluye respuestas de España». No afirmar nada «de España».
- **L. 254.** «Entraron perros con afectación al menos moderada». S3 incluyó puntuaciones ≥ 2 de 5. Copiar la fórmula correcta de la ficha (l. 117).
- **Enlace opcional.** `limpieza-ojos-oidos-perros-ancianos` (publicado) encajaría con «cambios en el oído» en H2-1.

**N-6. Léxico y restos de Osa/portón.**
- L. 372 «mirar… en patios… Una puerta o un portón abiertos bastan» contradice l. 513 («El portón, el patio… no se usan»). Sustituir por «portal» y «la puerta de casa».
- L. 538 (§9.6.15) aún habla de «lo que hacía la familia de Osa».
- L. 61 y l. 515 piden atribuir hipótesis (la calle ruidosa, el «montón de sonidos») que ya no se usan; l. 92 y l. 518 mantienen vocabulario regional (lavadero, cuneta, tirar de) de hechos que ya no están.
- L. 540 (§9.7) dice «testimonios en primera persona del plural», frente a «yo» en §9.4.
- Instrucción: retirar o marcar «si se usan» todo lo anterior.

**N-7. Prompts de imagen (§8), residuos.**
1. **Imagen 1 y H2-5.** El dormitorio tiene «la ventana a la calle» (l. 445) y la perra mira hacia ella a 3 m. H2-5 (l. 317) aconseja «lejos de la ventana… de la fachada que da a la plaza» y la portada es el ancla visual de H2-5. Decidir: o el dormitorio da a un patio interior, o la perra no mira la ventana; o aceptar «a 3 m» y ajustar el pie.
2. **Imagen 2, rasgos de miedo y pie.** La ficha pone orejas atrás en la base y cola baja (l. 449), que son las señales que H2-2 enseña como miedo (S3), mientras el pie dice «un paseo tranquilo». Poner orejas relajadas, o cambiar el pie.
3. **Imagen 2, aceptación a 390 px.** Los dos mosquetones y la chapa no serán legibles a 390 px (la chapa mide unos 3 cm y la perra ocupa menos de la mitad del ancho). Pedir que se vean a tamaño grande y, a 390 px, solo «dos ramales que parten de una mano».
4. **Imagen 3.** Falta decir si la veterinaria está en el lado de la mesa de la cámara (taparía los cuartos traseros) o en el opuesto (usar el opuesto).
5. **Collares.** Collar «liso sin marca» en las imágenes 1 y 3, y con chapa en la 2; el artículo insiste en la identificación. Poner la chapa en las tres.
6. **Imagen 1, mano y cabeza.** Fijar en profundidad que la mano está en el suelo, delante de la cama, y el brazo no tapa el costado. Además, la cabeza «apoyada a la altura del lomo» (l. 448 y 459) choca con «sobre las patas delanteras»: decir «algo por debajo de la línea del lomo». El bloque de edad no es literalmente íntegro (el prompt 1 cambia «cabeza a la altura del lomo o algo baja»).

**N-8. Titular y metadato que prometen más de lo que el contrato permite.**
- **H2-7 (l. 342) «Lo que se vende y lo que funciona».** Contradice §3-S5 (l. 127) y §9.6.5, que prohíben «funciona». Proponer «Lo que se vende y lo que dicen los dueños».
- **`metaDescription` y frontmatter (l. 25 y 43).** «Cuándo es edad o dolor» promete algo que §9.6.9 prohíbe (no diagnosticar por conducta). Cambiar a «cuándo conviene descartar dolor». Mide 154; el cambio debe seguir ≤ 160.

**N-9. Duplicación y relleno acotado.**
- **Medir el relleno.** Calculé la expansión nota→prosa por H3 (palabras de las instrucciones frente al target): media 1,73. Siete H3 piden ≥ 2,6× (990 palabras): «Si necesitas medicarle» (ratio 5,8; duplica el AlertBox warning), «Por la noche» (3,5), «Lo que debe mirar el veterinario» (3,3), «Qué es y cómo funciona» (2,9), «Refugio accesible» (2,8), «Si empiezas ahora, para marzo» (2,8) y «Cómo comprar con criterio» (2,6). Además, «Lo que hemos visto» tiene unas 100 palabras de hechos para 150 de target.
- **Veredicto del volumen:** 5.700 es alcanzable, pero con unas 250–400 palabras de estiramiento en esos H3. El suelo de 5.300 sí es alcanzable. Mis recuentos de los artículos hermanos (golpe de calor 4.368 frente a 4.400; leishmaniosis 4.779 frente a 4.550, con FAQ y avisos) indican que la redacción suele caer dentro de ±5 % del target. El riesgo real es rebasar el techo (N-4), no quedarse corto. La salida «parar y consultar» está bien puesta.
- **Instrucción.** Fusionar «Si necesitas medicarle» en el H3 previo (el enlace a `como-dar-medicacion-perro` y la advertencia ya están en el AlertBox) y repartir sus 70 palabras en el 5.200 → o aceptar la caída. Recortar el párrafo 4 de la introducción (l. 221, «Promesa», que repite el índice, patrón que la guía de tono prohíbe) a unas 30 palabras.

**N-10. Detalles menores.**
- L. 401 dice que las respuestas del FAQ miden «42–52 palabras»; la 6 tiene 54 (las 8 miden 51, 49, 44, 45, 45, 54, 44 y 42; 448 con preguntas).
- L. 506 («pilar, 3 spokes y 5 cruzados; el de golpe de calor es opcional») cuenta mal: son 5 obligatorios y 1 opcional.
- «Encías pálidas» aparece como señal de urgencia en el AlertBox danger y como efecto adverso transitorio frecuente del gel (H2-4). Añadir una frase de «pregunta al veterinario qué esperar».
- Declarar en §2 que no hay hilo narrativo principal (los testimonios son ilustraciones sueltas), como pide la skill de generación.
- Hogueras (junio), San Fermín (julio) y Fallas (marzo): son meses de dominio público y están marcados «a contrastar»; conviene comprobarlos contra los programas oficiales antes de publicar (barato).

## 4. Lo que sí comprobé y está bien

- **Conteos.** `seoTitle` 44 y `metaDescription` 154 caracteres (script). Alt del frontmatter idéntico al de la imagen 1 (script). FAQ: 8 preguntas, 448 palabras con preguntas. AlertBox: `info` 44 palabras en Introducción, `danger` 44 en H2-2 junto a la lista y `warning` 55 en H2-4. Una tabla en H2-3 y otra en H2-7 (§4 y §9.3 coinciden), de tres columnas con celdas de una frase. H2-2 usa lista. 32 H3, media ≈ 178 palabras.
- **Matrices.** §3, §6 y §9.2 idénticas en las 11 fuentes (script); sin fuentes decorativas.
- **Enlaces.** Los 9 enlaces internos de §5 existen, están publicados y coinciden con `INVENTARIO_CONTENIDO.md` (incluidos `cama-ortopedica…` y `prevencion-caidas-perro-mayor`, ambos con `status: "Publicado"`). El `pilar` está en el enum. No hay canibalización: solo el artículo de ansiedad y el brief de feromonas mencionan tormentas, y ambos están declarados en §2 y §9.8. Ningún otro brief cita estas fuentes (no hay efecto cascada).
- **Seguridad clínica y política editorial.** Sin dosis, marcas, plazos ni porcentajes por fármaco. La ficha de la dexmedetomidina va atribuida y con gate de contraste con la ficha española. Acepromazina y calmantes de personas desaconsejados. Señales de urgencia junto a la lista. Los 15 requisitos de §9.6 se cumplen en el cuerpo planificado; matizo coger en brazos (cubierto) y elevar la voz (N-2). La política editorial dice «no prescribimos fármacos ni dosis» y el brief no prescribe.
- **Español de España.** Sin voseo, usted ni ustedes en instrucciones, FAQ ni AlertBox (grep). Vocabulario peninsular real (persiana, estor, rebeca, mesilla, pipicán, tarima flotante). Las listas de evitar incluyen «pólvora» y «alzar». Hogueras de Alicante y San Fermín como contexto «a contrastar» es una formulación prudente y no inventa hechos regionales.
- **Imágenes: geometría.** La razoné con coordenadas.
  - Imagen 1: la perra mira a la derecha, así que su costado derecho da a la cámara y el ojo del antifaz se ve; ventana y destellos a la derecha, lámpara a la izquierda.
  - Imagen 2: con tutor y perra avanzando de izquierda a derecha, su costado derecho da a la cámara. La perra va a la derecha del tutor (lado de la fachada, cerca de la cámara) y el tutor del lado de la calzada, con la mano derecha en el bucle del lado de la perra. Los sentidos de marcha coinciden y el antifaz es visible.
  - Imagen 3: la perra mira a la derecha y la veterinaria (izquierda) queda junto a los cuartos traseros.
  - Alt, ficha, prompt y pie coinciden en las tres.
  - Los cinco rasgos de edad y la línea de rechazo están en los tres prompts. Raza no repetida: «bodeguero» no aparece en `src/`, `public/` ni `briefings/`; la elección se justifica y el motivo de no usar beagle está documentado. Prompts con paleta propia, cámara, grano y contexto español concretos, sin aspecto de banco de imágenes.
- **Procedimiento.** El historial es veraz: R1 (0 P0, 6 P1, 9 P2, APTO con reservas, commit `fa88f47`), R2 (0 P0, 4 P1, 12 P2, `bcf6483`), R3 pendiente. No hay rondas ocultas en `git log --all`. Los números de los informes coinciden. El único cambio en `testimonios-propietario.md` en v3 fue añadir la decisión del propietario sobre Osa y Baltor.
- **Honestidad de fuentes.** Ningún identificador inventado, URL profundas, verificaciones parciales marcadas, el «120 perros → 36» corregido y el 404 de ES-06 confirmado. No «completar» nada de esto al corregir.

## 5. Límites de la auditoría

- No leí el texto publicado de S5 (bioRxiv 429; verifiqué el abstract y el DOI), el texto completo de S2 (solo ficha y resumen), la ficha técnica en español de S7 (solo la británica) ni la guía original del Colegio de Málaga. Son limitaciones de acceso, no fallos del brief.
- No verifiqué ordenanzas municipales, la disponibilidad en España de imepitoína y tasipimidina, ni los programas de fiestas. No ejecuté `tono.py` ni `npm run build` (el brief no es un `.mdx`).
- No hay imágenes generadas: la coherencia espacial es un juicio sobre el texto, no sobre un archivo.
- Los testimonios se contrastaron con el archivo del repositorio, que es un dictado, no con el propietario.
- Mis recuentos de palabras son aproximados y no reproducen exactamente las cifras de los otros artículos (4.575 y 5.134 en el brief); la conclusión de N-4 y N-9 no depende de esa diferencia.

**Archivos relevantes:** `/home/user/CuidaTuPerroViejo/briefings/briefing-miedo-petardos-perros-mayores.md` (l. 76, 243, 257-259, 337, 372, 513, 538), `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`, `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/correccion-r2.md` (l. 20).