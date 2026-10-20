# Corrección editorial solicitada el 20 de octubre de 2026

## Alcance y ajuste propuesto antes de editar

Se aplica el encargo explícito de `instrucciones-correccion-2026-10-20.md`, recibido en la rama del revisor `claude/sin-dientes-visuales-movil` (base local `86f0a12`). El cometido es corregir utilidad y tono del artículo v2, no producir otro artículo ni ampliar su extensión. Se conservan sus imágenes, dos secuencias, registro y tablas apilables.

Antes de modificar el MDX se registra este ajuste razonado al contrato histórico de 6.000 palabras (5.700–6.300): quitar frases defensivas repetidas y condensar la conservación puede reducir total y secciones por debajo de aquellos presupuestos. La nueva instrucción del propietario exige utilidad y desduplicación, por lo que la cobertura de decisiones, seguridad y referencias prevalece sobre reponer palabras eliminadas. No se fija un mínimo nuevo para fabricar un aprobado; se medirá el resultado y su desviación respecto del presupuesto anterior. Los objetivos clínicos y las fuentes verificadas del brief se mantienen.

Esta es una corrección separada de la auditoría. El artículo v2 ya tiene R1 y R2; su siguiente auditoría independiente es R3/3. Este informe no emite APTO, no reinicia rondas y no autoriza publicación. No se hace commit ni push.

## Procedencia y decisiones

Guía sin caso, como antes. No se añade paciente, conversación, diagnóstico, dosis ni resultado. Los dos ejemplos aritméticos siguen identificados como ficticios y sin ración recomendada. Imágenes IA y recursos existentes conservan su identificación y ubicación.

Cambios, trazabilidad y mediciones documentados a continuación.

## Cambios aplicados

1. La respuesta «Qué puede comer» aparece tras dos párrafos de introducción, antes del primer H2: cuatro líneas con húmedo completo, pienso de tamaño adecuado, base humedecida/triturada autorizada y receta casera formulada. El enlace a UC Davis queda junto a su afirmación.
2. El AlertBox inicial propone partir de la indicación vigente, elegir presentación, preparar y observar. Se retiró la frase «acertar una receta mediante ensayos».
3. El desarrollo prioriza acciones: leer la declaración de adecuación, medir por separado, registrar cambios, concretar el alta y coordinar cuidadores. Se quitaron cierres que repetían lo que una guía o un registro no prueba. El mismo repaso se aplicó a las FAQ; se conservan sus ocho preguntas.
4. «Cambia la presentación» describe la uniformidad **si esa es la adaptación indicada**: textura parecida en todo el plato, sin grumos duros, zonas secas ni exceso de líquido separado que permita lamer solo el agua. No ofrece proporción, remojo universal ni una textura para disfagia. La advertencia de no ensayar mezclas para encontrar una que tolere sigue junto a la explicación de Merck.
5. «Sirve para que coma por sí mismo» incorpora plato llano, ancho, estable y base antideslizante. El mecanismo explicado es el acceso de la lengua a la superficie de alimento y la estabilidad del recipiente. Se presenta como organización doméstica observable, **sin atribuirle eficacia clínica, mejora de deglución ni respaldo de un ensayo no encontrado**. No se ha usado evidencia de gatos ni de cirugías de mandíbula como si estudiara perros desdentados. La altura y las posturas especiales siguen sujetas a la indicación individual.
6. El H2 de conservación se concentra en preparaciones blandas/humedecidas: material limpio, separación de sobras, conservación según producto, identificación y retirada del producto sospechoso. Desaparecen las citas FDA en los apartados de preparación y registro: quedan una a cada uno de sus dos documentos en el H2 de conservación, más sus entradas bibliográficas.
7. Sin nuevas tablas, fuentes, escenas o recursos. Se mantienen las tres `TablaApilable` con sus `data-label`, las cinco imágenes y las variantes `base`, `ingesta`, `registro`. Ninguna edición en componentes corresponde a este corrector.

## Trazabilidad comprobada por el corrector

Comprobación directa el 20-10-2026. Se abrieron y leyeron las páginas siguientes; un 200 no fue el criterio de respaldo. No se afirma haber vuelto a auditar la totalidad de las 14 fuentes: el registro completo anterior se conserva en el brief y en los informes R1/R2. Estas reaperturas se centran en las opciones adelantadas, los límites clínicos conservados y la sección condensada.

| Fuente e identidad leídas | URL profunda y pasaje | Afirmación conservada y ubicación | Límite |
|---|---|---|---|
| UC Davis Veterinary Medical Teaching Hospital, *Dentistry and Oral Surgery Service* | https://www.vetmed.ucdavis.edu/hospital/small-animal/dentistry-oral-surgery-service · FAQ «How will my animal eat if most or all of the teeth are extracted during dental treatment?» | Perros y gatos sin dientes pueden comer alimento habitual, incluido seco de tamaño adecuado; apertura y presentación del pienso. | Capacidad posible, no pauta posoperatoria inmediata ni garantía para todo perro. |
| Alice Defarges / Merck, *Dilatation of the Esophagus in Small Animals* · revisión octubre de 2022, actualización mayo de 2025 | https://www.merckvetmanual.com/digestive-system/diseases-of-the-esophagus-in-small-animals/dilatation-of-the-esophagus-in-small-animals · signo cardinal regurgitación; manejo «The consistency of the diet… varies from dog to dog». | La consistencia se individualiza en enfermedad esofágica; H2 de observación y preparación. | No trasladar tratamientos, elevación, tiempos, formas concretas de comida ni ensayos al hogar. No respalda una receta universal de textura. |
| Ned F. Kuehn / Merck, *Pneumonia in Dogs* · revisión junio de 2018, actualización septiembre de 2024 | https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs/pneumonia-in-dogs · introducción «food (forced feeding)»; «Aspiration Pneumonia», dificultad respiratoria y alteración de deglución. | Riesgo de aspiración con alimentación forzada y prioridad de síntomas respiratorios; H2 de señales y de preparación. | No diagnosticar por tos ni indicar medicación o técnicas de desobstrucción. |
| Courtney Barnes, Lorraine Hiscox y Jan Bellows / VCA–LifeLearn, *Oral Surgery in Dogs* · actualización 26-04-2024 | https://vcahospitals.com/know-your-pet/oral-surgery-in-dogs · «How will my dog eat after surgery?» | Comida blanda durante cicatrización y revisiones; H2 de extracción. | Se conserva la referencia y su hecho general ya usado. Sin copiar protocolo, plazo o medicación; el alta decide el caso concreto. |
| FDA, *Tips for Safe Handling of Pet Food and Treats* · «Content current as of: 05/23/2024» | https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats · «Tips for Preparing Pet Food» y «Tips for Storing Pet Food». | Manos, utensilios y platos limpios; cuchara de servicio distinta; tapar comida refrigerada. H2 de conservación. | No extrapolar a duración universal de papillas/remojados. No se incorporan temperaturas/plazos no encargados. |
| FDA, *Proper Storage of Pet Food & Treats* · «Content current as of: 05/23/2024» | https://www.fda.gov/animal-veterinary/animal-health-literacy/proper-storage-pet-food-treats · lista de conservación y «What to do When There’s a Problem». | Envase original/lote/caducidad; recipiente limpio y seco entre bolsas; refrigerar o desechar sobrantes de lata/bolsa; producto hinchado/fugas/olor/cuerpo extraño y consulta. H2 de conservación. | No afirmar causa de síntomas por temporalidad ni asegurar inocuidad por aspecto. |
| FEDIAF, *Nutritional needs of cats and dogs* · sin fecha editorial visible | https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/nutritional-needs-of-cats-and-dogs/ · apertura «Pet food can be complete or complementary». | Completo/complementario; húmedo completo en apertura y sección de adecuación. | Fuente de industria identificada; terminología, no superioridad de fabricantes o recomendación clínica individual. |
| FEDIAF, *Home Made Diets* · sin fecha editorial visible | https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/home-made-diets/ · apertura «unless you have developed a meal plan with a dedicated veterinary nutritionist» y «Expert formulated diets». | Receta formulada como opción y necesidad de conservar ingredientes/cantidades; apertura, presentaciones y FAQ. | No copiar porcentajes de estudio citado sin abrir original, recetas, tóxicos ni promesas de equilibrio de una mezcla casera. |

La descripción de uniformidad es una comprobación doméstica de la preparación que se haya indicado, **no un hallazgo clínico atribuido a Merck**. La recomendación del plato es una sugerencia práctica de acceso solicitada por el propietario. Se buscaron referencias específicas, pero los resultados recuperados eran principalmente comparativas comerciales; no se convierten en evidencia veterinaria. Dos rutas candidatas PDSA/Dogs Trust devolvieron 404; no se citan ni se inventa su contenido.

## Autocontrol del corrector, separado de la auditoría

- MDX final SHA256: `fd1033851fb70cd61c040ce1c4f0c83fba6952e53541fd4e2113a531de5df376`.
- Frontmatter y fecha original conservados. No se añade byline duplicado: el contrato v2 y el layout vigente lo excluyen; la autoría real sigue en la página y en la bibliografía.
- Comprobación de enlaces externos escritos en Markdown antes de la bibliografía, agrupados por H2: **cero URL repetidas dentro de un H2**. FDA conserva dos documentos diferentes, una cita enlazada de cada uno en conservación. Las entradas del cuadro bibliográfico se cuentan aparte.
- En el desarrollo antes de la bibliografía, las frases literales «no demuestra», «no sustituye» y «no es una pauta» pasan de nueve apariciones en la base recibida a cero. Es un indicador de edición, no una prueba automática de tono; también se leyó el texto por H3.
- Se conservan las advertencias sobre aspiración, alimentación forzada, dificultad respiratoria/urgencias, recuperación quirúrgica, no manipular heridas ni alterar medicación; los ejemplos siguen marcados como ficticios. Las instrucciones de seguridad pueden contener varias prohibiciones concretas porque cambian la acción ante riesgo; no se recortaron para obtener una cuota de negaciones.
- AST preliminar sobre copia temporal que conserva el texto de las tablas: **5.274 palabras** (no es el conteo final de DOM). Media de 117 párrafos de prosa: **34,78**, mediana **36**, máximo **43**, ninguno >50. La FAQ se cuenta una vez; se excluyen bibliografía, pies, imports, props y tres recursos interactivos.
- Advertencia del método: el script AST histórico excluye cualquier componente con mayúscula excepto AlertBox/FAQ y por ello **excluye también las nuevas `TablaApilable`**. Para el diagnóstico se reemplazaron solo esas envolturas por `div` en `/tmp/alimentacion-conteo-tablas.mdx`, sin cambiar el producto. La coordinación realizó el conteo contractual del DOM compilado; su tabla final se reproduce abajo.
- Build, capturas, móvil/escritorio, accesibilidad y auditoría R3 corresponden al cierre de coordinación y al auditor independiente. Este informe no los presenta como ejecutados por el corrector.


## Conteo contractual del DOM recibido de coordinación

La coordinación compiló el artículo y midió el DOM final; el corrector leyó su JSON, no presenta esa ejecución como propia. Evidencia: [`correccion-2026-10-20/conteo-editorial-dom.json`](correccion-2026-10-20/conteo-editorial-dom.json). El hash de la fuente medido coincide con el MDX congelado de este informe.

Método: `.content-body` compilado, preguntas y respuestas FAQ desplegadas y contadas una vez; incluye prosa, encabezados, AlertBox y texto de las tres tablas. Excluye los tres recursos con `data-editorial-visual`, bibliografía completa, pies, código, atributos, campos y controles. El AST preliminar de arriba no sustituye esta medición.

| H2 / sección | Palabras reales DOM | Target histórico del brief | Desviación histórica |
|---|---:|---:|---:|
| Introducción | 191 | 200 | -4.50% |
| Antes del menú: identifica qué parte de comer le cuesta | 536 | 600 | -10.67% |
| Elige una base que cubra sus necesidades y entiende su ración | 728 | 800 | -9.00% |
| Qué presentación puede encajar: húmedo, pienso, triturado o casero | 548 | 650 | -15.69% |
| Prepara una comida adaptada sin perder la cuenta de lo que come | 620 | 700 | -11.43% |
| Después de una extracción: sigue un plan de cicatrización propio | 491 | 550 | -10.73% |
| Conserva las preparaciones blandas y humedecidas | 285 | 450 | -36.67% |
| Si además tiene otra enfermedad o empieza a comer menos | 504 | 650 | -22.46% |
| Registra lo que ocurre y lleva una pregunta concreta a la revisión | 593 | 650 | -8.77% |
| Conclusión | 138 | 150 | -8.00% |
| Preguntas frecuentes | 654 | 600 | +9.00% |
| **Total** | **5288** | **6000** | **-11.87%** |

Densidad DOM de prosa, sin FAQ ni recursos: **113 párrafos; media 35,4; mediana 36; máximo 43; 0% por encima de 50 palabras**. Estas palabras no se traducen en una promesa de tres líneas físicas en un teléfono: la legibilidad real corresponde a las capturas de navegador de coordinación y del auditor.

El total pasa de **5.858 a 5.288 palabras editoriales visibles**: 570 menos (−9,73%). Queda 412 palabras por debajo del antiguo mínimo de 5.700. No se oculta la desviación: corresponde a la instrucción posterior de quitar repeticiones y reducir conservación por utilidad, documentada antes de editar. Los recortes mayores están en conservación y en las salvedades duplicadas del manejo de otras enfermedades. Se mantienen ocho decisiones de desarrollo, las ocho FAQ, ejemplos, citas, etiquetas, higiene, alertas y recursos completos; no se repone el texto eliminado para alcanzar una cifra.

**Estado de entrega del corrector:** corrección textual y registro de fuentes terminados, sin cambios pendientes del corrector. El veredicto corresponde exclusivamente a la auditoría independiente R3/3. Las verificaciones técnicas nuevas, el estado de publicación y los artefactos de lectura son responsabilidad de coordinación y se informan por separado.
