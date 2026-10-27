# Auditoría independiente de la corrección de antiparasitarios — R1 (delta)

| Campo | Valor |
|---|---|
| Fecha | 27 de octubre de 2026 |
| Ronda | R1 de máximo 3, alcance delta sobre el commit `b868aa7` |
| Rol | Auditor independiente. No participó en los hallazgos LEI-A-101 a 103 ni en la corrección. No corrige nada: este informe es el único archivo que escribe |
| Documento | `src/content/blog/leishmaniosis-perros-mayores.mdx` |
| Versión anterior | `65287ab`, SHA-256 `f449151f705f33b2493ccaa9816e9ce4ba78bfbf9b533ff1dffbab603ebb0220` (recalculado: coincide) |
| Versión auditada | `b868aa7`, SHA-256 `871ff7fadc0fa352e9e2cd809fd8dd6c5b0b2fe8ee2310d50cb54ac743788d18` (recalculado: coincide con el expediente) |
| Fichas contrastadas | CIMAVet 3212 ESP (spot-on con permetrina, RCM revisado 09/2026), PDF SHA-256 `4346656d7bcd78887fdf1bd7409228481aae8cd3cda19257a0bd363847e1bf48`; CIMAVet 1326 ESP (collar con deltametrina, 5 páginas), PDF SHA-256 `a934544570ce4f864eecc7515d752ba4a0b2892d69c16a14e2b8d19372fa3318`. Descargadas el 2026-10-27 en una carpeta aislada y extraídas con `pdftotext -layout` |
| Método | `auditar-articulo-blog`, `calidad-editorial-adsense.md` §4, guía de voz y tono, y la propuesta de proceso editorial de `claude/propuesta-proceso-editorial` (README §5-6, `plantillas.md` §6, `pruebas/leishmaniosis-articulo.yaml`) |

**Qué no se ha comprobado:** la auditoría visual y la interacción de los componentes (el diff solo cambia texto y enlaces); el brief y su contrato, que no se reabren; la vigencia de otras fichas de productos con permetrina o deltametrina distintas de las dos citadas; los componentes `Leishmaniosis*.astro`, que el diff no toca. El build se hizo tras `npm ci --ignore-scripts`. Este informe no es una revisión veterinaria ni certifica nada desde el punto de vista clínico.

## Veredicto

**APROBADO con P2 abiertos.** 0 P0 y 0 P1 abiertos, en regresión o sin verificar. Quedan P2 abiertos (LEI-A-104, 105, 106, 108 y 109) y uno diferido (LEI-A-107). Los P2 no bloquean ni se repasan en otra ronda.

## Criterios de cierre de los hallazgos de origen

| ID | Sev. | Criterio de cierre | Evidencia en `b868aa7` | Estado |
|---|---|---|---|---|
| LEI-A-101 | P2 | El aviso de gatos nombra permetrina y deltametrina | Dentro del AlertBox, l. 315: «La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos»; l. 317: «La ficha del collar con deltametrina citado también prohíbe usarlo en gatos». Ficha 1326 §3.3: «No usar en gatos». El título no cambió (ver 3b y LEI-A-104) | **cerrado** |
| LEI-A-102 | P1 | `grep` de «niños» en el H2-5 devuelve la frase, atribuida a las fichas | L. 255: «Su ficha indica que no debe dormir con vosotros el día del tratamiento, especialmente con niños» (ficha 3212). L. 257: «La [ficha técnica de un collar con deltametrina…] indica que los niños no deben jugar con el collar ni metérselo en la boca» (ficha 1326). Las dos están en el H2 «Protegerlo de los flebotomos» y atribuidas a su ficha | **cerrado** |
| LEI-A-103 | P2 | La precaución ambiental aparece remitida a la ficha | L. 259: «La ficha del spot-on citado prohíbe que el perro se bañe en cursos de agua durante los dos días siguientes a la aplicación». L. 261: «Para el collar citado, la ficha exige retirarlo…» | **cerrado** |

Ninguno muestra regresión.

## Contraste línea a línea con las fichas

| Línea en `b868aa7` | Texto del artículo | Texto de la ficha | Resultado |
|---|---|---|---|
| 253 | `### Precauciones en casa y en el agua` | — | Título descriptivo; correcto |
| 255 (1.ª frase) | «Con el spot-on de permetrina citado, evita manipular al perro o jugar con él hasta que se seque el punto de aplicación.» | 3212 §3.5: «Los animales tratados no deben manipularse, ni se debe jugar con ellos, hasta que el punto de aplicación esté seco.» | Fiel. No afirma más que la ficha |
| 255 (2.ª frase) | «Su ficha indica que no debe dormir con vosotros el día del tratamiento, especialmente con niños.» | 3212 §3.5: «Los animales tratados no deben dormir con sus propietarios el día del tratamiento, especialmente con los niños.» | Fiel |
| 257 (1.ª frase) | «La [ficha técnica de un collar con deltametrina autorizado en España](…1326_ESP_ft.pdf) indica que los niños no deben jugar con el collar ni metérselo en la boca.» | 1326 §3.5: «No se debe permitir que los niños jueguen con el collar o lo introduzcan en su boca.» | Fiel. El enlace abre el RCM del collar con deltametrina (comprobado en el PDF descargado) |
| 257 (2.ª frase) | «Sigue también sus precauciones de contacto.» | 1326 §3.5: hipersensibilidad conocida, manipular con precaución, lavarse las manos, evitar contacto prolongado, síntomas y consulta médica | Correcta pero genérica: remite a la ficha sin resumirla. Ver 3c (LEI-A-105, LEI-A-106) |
| 259 (1.ª frase) | «Protege también a los peces y otros organismos acuáticos.» | 3212 §3.5: «La permetrina puede tener efectos adversos en los organismos acuáticos.» 1326 §3.5: «la sustancia activa es peligrosa para peces y otros organismos acuáticos» | Frase introductoria de los dos párrafos. «Peces» procede de la ficha del collar, no de la del spot-on junto a la que aparece. Precisión menor (LEI-A-108) |
| 259 (2.ª frase) | «La ficha del spot-on citado prohíbe que el perro se bañe en cursos de agua durante los dos días siguientes a la aplicación.» | 3212 §3.5: «Los perros no deben bañarse en cursos de agua durante los 2 días siguientes a la aplicación.» | Fiel. «Prohíbe» traduce un «no deben» de la ficha; no la refuerza |
| 261 (1.ª frase) | «Para el collar citado, la ficha exige retirarlo antes de que nade o se bañe y evitar esos baños durante los cinco primeros días de uso.» | 1326 §3.5: «este debe retirarse siempre antes de que el perro nade o se bañe […]. Debe evitarse que los perros naden o se bañen durante los 5 primeros días de llevar puesto el collar.» | Fiel |
| 261 (2.ª frase) | «Comprueba las restricciones del producto elegido antes de llevarlo al río o al estanque.» | — | Instrucción de lectura, sin dato nuevo. Evita generalizar los plazos a otros productos |
| 317 | «La ficha del collar con deltametrina citado también prohíbe usarlo en gatos.» | 1326 §3.3: «No usar en gatos.» | Fiel. No equipara la contraindicación del collar con el riesgo de exposición secundaria de la permetrina, como pretendía el expediente |
| 320 | «La ficha del spot-on de permetrina advierte también del riesgo si el gato lame el punto de aplicación del perro.» (antes: «La ficha de la AEMPS…») | 3212 §3.5: «Es importante asegurarse de que los gatos no laman el lugar de aplicación del medicamento veterinario en perros tratados con este medicamento.» | Fiel. La atribución gana precisión: con dos fichas de la AEMPS citadas, «la ficha de la AEMPS» habría sido ambigua |
| 341 (bibliografía) | «AEMPS, CIMAVet. Resumen de las características de un collar con deltametrina para perros. Contraindicaciones y precauciones para personas y medio acuático.» | RCM 1326 §3.3 y §3.5 | Fiel. El enlace es el mismo PDF que el de la l. 257 |

Ninguna frase afirma más de lo que dice su ficha. Las URL del HTML generado y del publicado son exactamente las de los PDF descargados (`3212%20ESP/3212_ESP_ft.pdf` y `1326%20ESP/1326_ESP_ft.pdf`, dos apariciones cada una).

## Decisiones razonadas

### 3a. Días concretos (2 tras la pipeta, 5 con el collar recién puesto)

**Compatibles con `calidad-editorial-adsense.md` §4 y con `politica-editorial.astro`. No es un hallazgo.**

Lo que prohíben las reglas:

- §4: «No diagnosticar por aspecto ni publicar pautas de inicio/ajuste de fármacos para uso del lector. No añadir dosis mg/kg, escalados o suspensiones por cuenta propia».
- Política pública (l. 55): «No diagnosticamos, no prescribimos fármacos ni dosis».

Lo que hacen las líneas 259 y 261:

- No fijan cantidad, frecuencia ni momento de aplicación del medicamento. Tampoco deciden cuándo empezarlo, cambiarlo o dejarlo.
- Transcriben una **precaución medioambiental** de la ficha: dónde no debe bañarse el perro tratado y durante cuántos días. La atribuyen al producto citado.
- Cierran con «Comprueba las restricciones del producto elegido», así que no la presentan como regla universal.

La única lectura que podría rozar la regla es «retirarlo antes de que nade». Es una retirada temporal que impone la ficha para proteger el agua; no es una suspensión del tratamiento decidida «por cuenta propia». Es la misma categoría que el aviso de la l. 251 sobre el baño con champú, que ya estaba aprobado.

Distinción aplicada: una **precaución de ficha atribuida** dice qué no hacer alrededor del producto y deja la elección y la pauta en la ficha y la clínica. Una **pauta de tratamiento** dice cuánto, cuándo o hasta cuándo administrarlo. Estas líneas son lo primero.

### 3b. Título del AlertBox «Permetrina: precaución especial con los gatos»

**P2 de precisión (LEI-A-104), no una ambigüedad relevante para la salud.**

Prueba de la ruta de daño: alguien con un perro con collar de deltametrina lee solo el título, piensa que su producto no afecta al gato y se lo pone. Esa ruta queda bloqueada por la l. 315, la segunda frase del mismo aviso: «No apliques al gato un producto para perros». La bloquea también la l. 317, que nombra el collar, y la FAQ 6, que empieza con «No utilices en el gato un producto para perros».

Queda una imprecisión: el título anuncia un solo principio activo y el cuerpo ya trata dos. El AlertBox se modificó en este diff, así que el P2 queda abierto, no diferido.

### 3c. Precauciones de ficha que no aparecen

Búsqueda negativa: «hipersensib», «alergi», «médico», «síntoma», «pipetas usadas», «alcance» y «deltametrina» en el H2 «Protegerlo de los flebotomos» completo (l. 241-322) y en la FAQ (l. 348-356). No se encontraron menciones de hipersensibilidad, consulta médica de las personas ni eliminación de pipetas. «Deltametrina» aparece en las l. 245, 257 y 317, y en la bibliografía.

| ID | Precaución ausente | Ruta de daño (quién, qué línea, qué daño) | Por qué no llega a P1 | Clasificación |
|---|---|---|---|---|
| LEI-A-105 | 1326 §3.5: «Las personas con hipersensibilidad conocida a la deltametrina deben evitar todo contacto con el medicamento veterinario y el perro tratado». 3212 §3.5: «Las personas con hipersensibilidad conocida a piretroides deben evitar todo contacto con el medicamento veterinario» | Una persona con alergia conocida a la deltametrina elige el collar porque la l. 245 lo menciona entre las opciones. Siguiendo la l. 257 («Sigue también sus precauciones de contacto»), convive en contacto prolongado con el perro y sufre una reacción | La alergia es **conocida**: quien la tiene ya está advertido por su médico y la reconoce en el envase y el prospecto. El texto remite expresamente a las precauciones de contacto de la ficha. El artículo tampoco recomienda un producto concreto: cita el RCM como ejemplo. La parte menos deducible (evitar también al perro que lleva el collar) es una mejora de utilidad, no una omisión que el lector no pudiera conocer | **P2, abierto** (texto modificado) |
| LEI-A-106 | 1326 §3.5: ante eritema, urticaria, prurito o erupción tras la exposición, consultar con un médico inmediatamente; taquicardia, edema laríngeo o dificultad respiratoria «requieren atención médica urgente». 3212 §3.5: ante irritación persistente o ingestión accidental, consultar con un médico | Un cuidador manipula el collar, tiene síntomas y no los relaciona con el producto | Ante dificultad respiratoria o hinchazón de garganta cualquier lector busca atención urgente, sin necesidad de este artículo. Los síntomas leves no comprometen la vida. La l. 257 remite a las precauciones de contacto de la ficha, que las incluyen | **P2, abierto** |
| LEI-A-107 | La FAQ 6 nombra solo la permetrina | Alguien lee solo la FAQ, ve «permetrina» y cree que un collar de deltametrina sirve para el gato | La primera frase de la FAQ 6 bloquea la ruta: «No utilices en el gato un producto para perros». La FAQ no cambió en este diff | **P2, diferido** (texto no modificado) |
| LEI-A-109 | 3212 §3.5: «Para evitar que los niños tengan acceso a las pipetas usadas, eliminarlas inmediatamente de manera adecuada» | Un niño encuentra una pipeta usada y se la lleva a la boca | Guardar los envases de medicamentos fuera del alcance de los niños es una precaución general que el lector deduce. No es específica de este producto | **P2, abierto** (precisión de la nueva sección sobre niños) |

### 3d. H2 de prevención, +27,7 % sobre su target

**Sin repetición ni relleno que bloquee.** Medidas:

- El H2 pasa de 1.034 a 1.197 palabras con `metricas.mjs` (de 1.149 según el expediente, que usa otro contador).
- El H3 nuevo tiene 151 palabras sin URL y cuatro párrafos. Cada uno aporta una precaución distinta con su fuente: contacto y dormir con la pipeta, niños y collar, agua con la pipeta, agua con el collar.
- Ninguna frase repite contenido previo.

Lo más parecido a una repetición es la remisión a la ficha del producto, que ya aparecía en las l. 249, 251 y 315 y que ahora suma «Sigue también sus precauciones de contacto» (l. 257) y «Comprueba las restricciones del producto elegido» (l. 261). Cada una se refiere a un riesgo distinto. Es la mitigación que corresponde a un tema con varios productos, no relleno.

El desvío respecto al target del H2 se debe a contenido de seguridad autorizado por el propietario, según el expediente. Ninguna regla escrita convierte ese volumen en un bloqueo.

**Observación para el propietario:** el total del artículo queda en 5.211 palabras según `metricas.mjs`, a 21 del máximo del contrato (5.232). Cualquier corrección que añada texto (por ejemplo, LEI-A-105) tendrá que compensarse.

## Regresiones

| Comprobación | Resultado |
|---|---|
| Avisos borrados | Ninguno. El diff tiene 14 líneas añadidas y 1 cambiada (l. 320, solo la atribución). Ninguna línea eliminada contenía un aviso |
| Lavado con champú o jabón y consulta inmediata | Intacto en la l. 322: «la ficha indica lavarlo con champú o jabón y consultar inmediatamente con un veterinario». Coincide con 3212 §3.5 |
| Coherencia con la FAQ | La FAQ no cambia. La FAQ 6 («No utilices en el gato un producto para perros… contacta inmediatamente con el veterinario») es coherente con el aviso ampliado. No hay contradicciones |
| Marcas comerciales | El texto añadido no nombra ninguna marca. Las fichas son de Piretrón y Scalibor, pero el artículo las describe como «un spot-on con permetrina» y «un collar con deltametrina». El único nombre de marca del archivo está en la URL de la EMA (`…/EPAR/letifend`, l. 342), que ya existía y no forma parte de este diff |
| Español de España, tú/vosotros | «evita», «Sigue», «Protege», «Comprueba» (tú); «dormir con vosotros» (vosotros). Sin voseo ni «ustedes» |
| Enlaces nuevos | `…/1326%20ESP/1326_ESP_ft.pdf` abre el RCM del collar con deltametrina (5 páginas, §3.3 y §3.5 contrastados). El enlace de la l. 249 sigue abriendo el RCM del spot-on con permetrina |
| Copias sincronizadas | `docs/contenido/leishmaniosis-perros-mayores/articulo-borrador.mdx` es idéntico byte a byte al MDX publicado. `articulo-lectura.md` contiene las frases nuevas y los dos enlaces al collar. `visuales/texto-aprobado-r2.mdx` conserva el hash `fb0c7709…a2b` que declara el expediente |

## Barrido acotado a P0 (H2 «Protegerlo de los flebotomos» y FAQ)

Se revisaron dosis, tóxicos, urgencias, datos inventados y avisos borrados en las l. 241-322 y 348-356.

- **Dosis:** no hay cantidades en mg, ml o kg ni pautas de administración.
- **Tóxicos:** la toxicidad de la permetrina para los gatos y la contraindicación del collar están señaladas. La mención de mosquiteras tratadas con piretroides (l. 282) mantiene la cautela con los gatos.
- **Urgencias:** la exposición del gato lleva a consultar inmediatamente al veterinario (l. 322 y FAQ 6).
- **Datos inventados:** ninguno. Todas las cifras del diff están en las fichas.
- **Avisos borrados:** ninguno.

**No se encontró ningún P0.**

## Diferidos

- **LEI-A-107 (P2):** la FAQ 6 nombra solo la permetrina. El texto no se modificó, así que se difiere sin discusión.

## Mecánica

| Comprobación | Resultado |
|---|---|
| `tono.py` | 0 muletillas; 0,0/1000 (límite ≤ 3/1000). Cuenta 4.083 palabras, como el expediente |
| `metricas.mjs` | Total 5.211 (contrato 3.868–5.232): OK. Densidad: media 38, mediana 39, 1 % > 50. Declara «NO APTO» por 3 bloqueos (cuadro de fuentes, tabla de trazabilidad y targets no interpretables). Son **anteriores** a este diff: en `65287ab` el script da los mismos 3 bloqueos. Es un desajuste entre el script y el formato del brief, no un defecto introducido por esta corrección |
| `npx astro build` | Código 0. La proyección Markdown genera 37 documentos. `dist/client/agent-content/v1/documents/article--leishmaniosis-perros-mayores.md` y el HTML generado contienen el H3 nuevo y las frases nuevas |
| URL pública (`curl -L`) | HTTP 200 en `https://cuidatuperroviejo.com/salud-perros-mayores/leishmaniosis-perros-mayores`. Contiene «Precauciones en casa y en el agua», «especialmente con niños», «metérselo en la boca», «cursos de agua durante los dos días», «cinco primeros días de uso», «también prohíbe usarlo en gatos», «La ficha del spot-on de permetrina advierte» y dos enlaces al PDF 1326 |

## Discrepancia de registro

Se anota como hecho:

- El expediente `correccion-seguridad-antiparasitarios.md` dice: «No se modifica `main`, no se abre PR y no se despliega» y «Tampoco se ha verificado una publicación nueva, porque no se publica».
- Sin embargo, el commit `b868aa7` es la punta de `origin/main` (padre `65287ab`) y su contenido está en producción.
- El expediente declara como rama `codex/leishmaniosis-articulo-revision` y como base `381b7ac86fd51426fc54dcd76e44006af9970ba2`. Esa rama no existe en el remoto y ese objeto no está en el repositorio clonado. La base real del commit es `65287ab`.
- El expediente habla de 36 documentos en la proyección Markdown; este build genera 37.

## Lo que sí funciona

- Las nueve frases nuevas reproducen su ficha sin reforzarla ni generalizarla. Cada una dice a qué producto se refiere («el spot-on citado», «el collar citado»).
- Las restricciones de agua se separan bien de la pérdida de eficacia por baño (l. 251). Se mantienen los plazos de cada producto sin mezclarlos, y la l. 261 frena la extrapolación.
- La aclaración del collar en el aviso de gatos no exagera: dice «no usar en gatos» y no habla de riesgo por convivencia.
- La atribución del lamido a la ficha del spot-on elimina la ambigüedad que habría creado tener dos fichas de la AEMPS.
- La voz de las frases nuevas es correcta (tú/vosotros, frases cortas, sin muletillas). El texto se publicó tal cual, con la proyección Markdown sincronizada.

## Correcciones propuestas para otra sesión (P2, no bloquean)

No hay P0 ni P1, así que no hay correcciones obligatorias. Si el propietario decide aplicar los P2, estas son las instrucciones exactas para una sesión distinta de esta:

- **LEI-A-104** (l. 314): cambiar `title="Permetrina: precaución especial con los gatos"` por `title="Antiparasitarios para perros: precaución con los gatos"`. Cierre: `grep -n 'title="Antiparasitarios para perros' <mdx>` devuelve la l. 314.
- **LEI-A-105** (l. 257): sustituir «Sigue también sus precauciones de contacto.» por «Si alguien de casa tiene alergia conocida a la deltametrina, la ficha indica evitar el contacto con el collar y con el perro que lo lleva.» (+11 palabras; compensar en el mismo H2). Cierre: `grep -c "alergia conocida a la deltametrina"` = 1 en el H2 de prevención.
- **LEI-A-106**: opcional. Si se aplica LEI-A-105, añadir «Ante síntomas tras manipularlo, consulta con un médico y muéstrale el prospecto.» Cierre: `grep -c "consulta con un médico"` ≥ 1 en el H2.
- **LEI-A-108** (l. 259): «Protege también a los peces y otros organismos acuáticos.» → «Protege también a los organismos acuáticos.» Cierre: la frase de la l. 259 no contiene «peces».
- **LEI-A-109** (l. 255): opcional, añadir «Tira las pipetas usadas fuera del alcance de los niños.» Cierre: `grep -c "pipetas usadas"` = 1.

Cualquier cambio necesita su propia auditoría delta R2, sobre el nuevo hash.
