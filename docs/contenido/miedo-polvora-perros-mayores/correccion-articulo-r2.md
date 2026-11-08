# Corrección del artículo LA-01 tras la auditoría R2

- **Fecha:** 8 de noviembre de 2026.
- **Base:** commit `4a893e9` (texto auditado), auditoría `auditoria-articulo-r2.md` y su anexo `auditoria-articulo-r2-plan-narrativo.md` (commit `33717de`).
- **Archivo:** `src/content/blog/miedo-polvora-perros-mayores.mdx`.
- **Quién corrige:** la sesión que redactó y corrigió la R1. No es una auditoría; la siguiente es la **R3**, en otra sesión.
- **Encargo del propietario (8-11-2026):** que su experiencia, sobre todo con Luna y Dakota, esté integrada en el razonamiento del artículo y no aparezca como una sección aparte de experiencia.

## Partes del brief v6.2 que quedan superadas por la instrucción del propietario

Sin reabrir la auditoría del brief:

1. §2 y §9.4: «Dakota aparece solo en la fotografía y su pie, sin hechos». **Superado:** Dakota aparece con hechos documentados.
2. §6: Luna limitada a H2-7 y «cada hecho en un solo H2». **Superado en parte:** Luna sale en la introducción, en H2-1, H2-5, H2-6 y H2-7, cada vez con un hecho distinto o en función de una decisión distinta.
3. §2: «Hilo narrativo: sin hilo principal». **Superado:** la voz de Gonzalo en Costa Rica, con Luna y Dakota, es el hilo.
4. §6: H3 biográficos («Lo que recuerdo de Osa», «Baltor, que no salía…», «Luna y los temblores»). **Retirados:** cada recuerdo está dentro del H3 que decide algo.
5. §6, presupuesto por H2. **Sustituido** por el presupuesto de la tabla de volumen de abajo.
6. §8, plan de 7 imágenes. Ya estaba superado por la decisión de una imagen por H2 (corrección R1).

## Mapa de procedencia de cada pasaje personal

La única fuente es `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`, salvo donde se indica otra.

| Pasaje (sección) | Hecho usado | Procedencia en el archivo | Límite respetado |
|---|---|---|---|
| Introducción, párrafo 1 | Dos beagles, Luna (2015) y Dakota (2014), en Costa Rica; en 2025 había bastante pólvora; las dos nerviosas y pendientes, dentro con la familia | Luna, «Matiz aportado después»; Dakota, viñeta de 2025 | No se afirma que la compañía evitara el miedo |
| Introducción, «Soy Gonzalo» | Identidad del responsable editorial | `src/pages/politica-editorial.astro`, «Quién escribe» | Sin titulación ni revisión veterinaria |
| H2-1, «No todos los barrios suenan igual» | En casa la pólvora se oye lejos y es más de luces; la familia no revienta pólvora; en casa del tío, el 24 y el 31 solo se oía pólvora | Luna, viñetas 5 y 3; Dakota, «Con la pólvora…»; Osa, viñeta 2 | «Donde vivimos», sin generalizar a toda Costa Rica |
| H2-1, «Por qué la edad cuenta» | Las dos pasan de los diez años | Años de nacimiento | Sin atribuirles pérdida de oído |
| H2-2, «Por qué un perro de patio quiere entrar» | Luna pasa ratos en el patio y duerme con la familia; Osa, mestiza de pastor alemán; perros de patio; entraban corriendo; jalarlos, regañarlos, agua; lloraban; la cena y la mesa | Luna, viñeta 4; Osa, hechos y aspecto | Osa sin edad ni fecha de la cena; sin juzgar a la familia |
| H2-2, «Cómo hacerlo entrar sin jalarlo» | Ladraban y luego se metían bajo la pila; hipótesis de los muchos sonidos | Osa, aclaraciones posteriores | La hipótesis va como impresión |
| H2-2, «Si muerde cuando lo tocan» | Osa muy brava, podía morder en la calle | Osa, aclaraciones | Sin decir que mordiera por miedo |
| H2-3, «Mira dónde se esconde él» | Baltor, chow chow café claro del vecino de arriba; no salía de las habitaciones; con la puerta abierta se quedaba dentro; la chow chow enérgica también se escondía; la duda de si arriba se oía más; la perra del compañero bajo el escritorio | Brief §2 (Baltor, archivo del propietario del 25-10-2026; aspecto del 27-10-2026); testimonio del compañero autorizado el 27-10-2026 | Sin «quieto»; perra del compañero anónima, sin edad ni relación con H2-4 |
| H2-5, lista | Luna se asusta también con temblores, terremotos y choques | Luna, viñeta 7 | Solo como ejemplo de otros sustos que se anotan |
| H2-6, «Con la familia o en un rincón aparte» | 2025: películas, gente hablando, nerviosas y alerta; reunión con la familia de la pareja, en familia y muy tranquilas; Luna busca a la familia ante un susto | Dakota, viñeta de 2025; Luna, viñeta 7 | «No sé por qué lo llevaron así» repite el límite del archivo; «no lo tomo como receta» |
| H2-6, «Acompañar no es sujetar» | Cuando Dakota se pone nerviosa le hablan; antes no se dejaba alzar y una vez casi le muerde la cara | Dakota, viñetas 5 y 6 | Se aclara que no fue con pólvora; no se convierte alzarla en pauta; se omite «alzar un poco la voz» |
| H2-6, «Antes de que lleguen los invitados» | Dakota se cansa al caminar; zona de cuestas; parque más nivelado | Dakota, «Salud» | Sin diagnóstico de columna; sin presentarla postrada |
| H2-7, «Lo que vas a ver esa noche» | Contraste de Osa, Baltor y Luna | Hechos ya citados | Sin hechos nuevos |
| H2-7, «Cuando se orina o se hace del miedo» | Baltor, una vez, orina o heces, sin recordar cuál | Brief §2 | Se mantienen la duda y que fue algo puntual |
| H2-7, «No solo en diciembre» | Los otros sustos de Luna | Luna, viñeta 7 | Sin repetir la escena |
| H2-8, «La placa, puesta desde la tarde» | Duda sobre si escapaban; salían por el portón; una vez fueron a esconderse; nunca se lastimaron | Osa, aclaraciones | Como duda, sin presentarlo como perro perdido |
| H2-10, «Enero tiene once meses por delante» | De Luna y Dakota «sé lo que hicieron, no por qué» | Dakota, límites del archivo | No se inventa un diario ni un programa |

No se usan: la persecución de gatos de Dakota, «alzar un poco la voz», la calle ruidosa de la casa anterior de Luna, la perra de unos vecinos ni Jaspe.

## Cierre por hallazgo de la R2

| Hallazgo | Qué se hizo |
|---|---|
| **P1-1** Vivencia fuera de las decisiones | Reescritura de voz y estructura. La introducción abre con la casa y la noche de 2025. H2-1 contrasta el barrio propio con El Salvador. H2-2 une a Osa con la recomendación de la UNAM y la de la ESVCE en el mismo razonamiento. H2-3 parte de dónde se escondían Baltor y la perra del compañero. H2-5 usa los otros sustos de Luna en la lista. H2-6 usa la noche de 2025, la reunión, la búsqueda de contacto de Luna, la experiencia de Dakota al alzarla y su paseo en llano. H2-7 contrasta las tres reacciones. H2-8 introduce la duda de las fugas de Osa. H2-4, H2-9 y la medicación siguen sin vivencia, como pide el plan. Se retiraron los tres H3 biográficos y «Lo que recomiendan en México». Menciones (`medir-narrativa.py`): Luna en 9 líneas, Dakota en 7, Osa en 7, Baltor en 3. Aperturas con fuente: 7 de 38 H3, antes 14 de 36. |
| **P1-2** Bogotá | No se encontró el enlace del formulario: revisados la campaña de la Alcaldía, la portada del IDPYBA y sus noticias del 30-10 y el 3-11-2026, sin enviar nada. El texto enlaza el anuncio, dice que el formulario «estará en los canales del instituto», reconoce que no encontramos el enlace directo y remite a animalesbog.gov.co. La FAQ lleva ahora un enlace HTML que funciona (comprobado en el HTML compilado). Se conservan la línea 123 y la veterinaria primero. |
| **P2-1** Voz | Se retiraron la presentación en tercera persona y el «cuenta en primera persona». Ahora: «Soy Gonzalo y escribo este sitio». Se quitó la transición vacía de Riemer (2019). |
| **P2-2** Frazada | Se quitaron «Toca el cuarto» y la decisión basada en la postura. Ahora: revisar si el cuarto está caliente o sin aire y ventilar; si refresca, la frazada a su alcance para que la use si quiere; el jadeo que no cede tras la pólvora va a urgencias. La FAQ 8 se ajustó igual. |
| **P2-3** Absolutos del H2-4 | «No puede elegir» pasa a «puede tener preferencias, pero no puede ir hasta ellas»; el H3 pasa a «Tú lo llevas al sitio que él prefiere». «No intentes vaciarla tú» pasa a «No improvises maniobras… sigue solo lo que la veterinaria ya te haya indicado». «No dice nada de perros postrados» pasa a «Lo que pudimos comprobar de ese estudio no da una pauta para un perro postrado». |
| **P2-4** Decreto | Leído el Decreto 2174 de 2023 (copia del INS, extraída de su PDF). Art. 2.2.4.2.5: autorización previa del alcalde para «almacenamiento, uso, manipulación, comercialización, compra y venta». Art. 2.2.4.2.8: solicitud de permiso para demostraciones de categoría 3. Las dos disposiciones se citan por separado, con enlace a la norma primaria, y la tabla se actualizó. |

Repeticiones recortadas: el H2-10 ya no repite «déjalo afuera», «algo para que duerma» ni el CBD (remite a lo ya visto). El aviso `warning` deja de repetir la explicación de la acepromazina. Los «seis acuerdos» pasan a cinco, porque el turno para verlo ya está en el H3 de compañía.

## Volumen (verificador del auditor, `comprobar-snapshot.py`)

**Total: 5.541 palabras**, dentro de 5.300–6.000. Coincidencias de 8 palabras con España en el texto visible: **ninguna**. `tono.py`: 0 muletillas. Densidad de párrafo: media 33, mediana 33, 2 % de párrafos con más de 50 palabras.

Presupuesto actualizado (propuesta razonada para la R3):

| Sección | Real | Target del brief | Presupuesto nuevo propuesto | Motivo |
|---|---:|---:|---:|---|
| Introducción | 249 | 320 | 250 | Abre con la escena; sin el inventario de cinco decisiones |
| H2-1 Barrio | 420 | 510 | 420 | Contraste propio en lugar de explicación genérica |
| H2-2 Patio | 426 | 560 | 430 | Osa integrada sin el H3 duplicado de la UNAM |
| H2-3 Cueva | 465 | 450 | 460 | Baltor movido aquí |
| H2-4 No se levanta | 678 | 520 | 680 | Seguridad de la R1 (triaje y micción) |
| H2-5 Consulta | 480 | 520 | 480 | Sin cambios de función |
| H2-6 Casa llena | 666 | 480 | 660 | Escena de 2025, compañía, paseo de Dakota y salida nocturna de la R1 |
| H2-7 Señales | 339 | 460 | 340 | Baltor pasó a H2-3; sin H3 de Luna |
| H2-8 Portón | 419 | 360 | 420 | Búsqueda ampliada de la R1 |
| H2-9 Ley | 435 | 420 | 430 | Decreto y Bogotá |
| H2-10 Consejos/enero | 399 | 560 | 400 | Sin repetir acepromazina, CBD ni patio |
| Conclusión + FAQ | 565 | 540 | 560 | — |

Build (`npx astro build`) correcto.

## Pendientes que no son de texto

Imágenes (una por H2 más la portada), confirmar qué beagle es Luna y cuál Dakota si se usa su foto, avisar al compañero y la auditoría R3 independiente. No fusionar en `main` antes.
