# Brief de contenidos: Cómo alimentar a un perro mayor sin dientes con seguridad

**Sitio:** cuidatuperroviejo.com · **Pilar:** Alimentación de perros senior · **Tipo:** spoke Astro/MDX · **Versión inicial:** 2026-10-19 · **Estado:** APTO en auditoría R2; reabierto por fallo nuevo de integración del estado técnico, corregido y pendiente de ronda 3 de 3.

## 1. Datos, metadatos y frontmatter MDX

| Campo | Valor |
|---|---|
| H1 | Cómo alimentar a un perro mayor sin dientes con seguridad |
| seoTitle | Perro mayor sin dientes: alimentación segura |
| Keyword principal | alimentación para perros mayores sin dientes |
| Secundarias | comida blanda para perro sin dientes; papilla para perro mayor; pienso remojado; alimento húmedo completo; perro sin dientes no come |
| Slug | `alimentacion-perros-mayores-sin-dientes` |
| Meta descripción | Cómo adaptar la comida de un perro mayor sin dientes: texturas, alimento completo y señales para consultar, sin improvisar dietas caseras. |
| Ruta | `/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes` |
| Pilar/enum | `alimentacion-perros-senior` |
| Intención principal | Resolver cómo ofrecer una comida tolerable conservando su adecuación nutricional y detectar cuándo la textura no es el problema |
| Intención secundaria | Distinguir dieta completa, adaptación de textura, posoperatorio y dificultad para tragar |
| Extensión | Target 2.200 palabras; intervalo real 1.870–2.530 (±15 %), justificado por seis decisiones y FAQ; no requisito de AdSense |
| Fecha | 2026-10-19; fecha propuesta de contenido, sin afirmar publicación pública |

Conteos comprobados con `len` de Python: seoTitle **44** caracteres; meta descripción **138** caracteres, incluidos espacios y signos.

```yaml
---
title: "Cómo alimentar a un perro mayor sin dientes con seguridad"
seoTitle: "Perro mayor sin dientes: alimentación segura"
metaDescription: "Cómo adaptar la comida de un perro mayor sin dientes: texturas, alimento completo y señales para consultar, sin improvisar dietas caseras."
pilar: "alimentacion-perros-senior"
keywordPrincipal: "alimentación para perros mayores sin dientes"
heroImage: "/images/blog/alimentacion-perros-mayores-sin-dientes/beagle-senior-comida-blanda-v1.webp"
heroImageAlt: "Ilustración generada con IA: beagle senior tricolor de hocico canoso ante un plato de comida blanda en una cocina; el plato no representa una receta universal."
status: "Publicado"
datePublished: "2026-10-19"
---
```

Usar el valor técnico `status: "Publicado"` únicamente tras completar los autocontroles de redacción y recursos, antes de guardar el artículo en `src/content/blog/`, conforme al gate de la skill de redacción. El catálogo de proyección acepta este valor y el schema lo usa por defecto; otra etiqueta no impide crear la ruta y puede dejarla fuera de la clasificación del build. Esta etiqueta técnica no prueba ni autoriza despliegue. Mantener el inventario como redactado/validado localmente, sin marcarlo publicado. La entrega sigue limitada a rama y PR: no fusionar ni desplegar; comprobar una URL pública nueva queda fuera de este encargo.

**Encuadre del encargo:** el usuario menciona un plan adjunto que no aparece en el entorno. Se ejecuta la instrucción explícita sobre este tema y su entrada pendiente del inventario; no se certifica haber leído el adjunto. El título de inventario promete «recetas blandas y papillas caseras». Se propone título seguro que resuelve esa intención mediante preparaciones de textura a partir de una dieta completa ya indicada, sin inventar recetas nutricionalmente completas. Registrar esta decisión en expediente, conservando el título original del catálogo.

## 2. Procedencia del material y valor propio

**Tipo:** guía sin caso. No hay historia clínica aportada; no usar nombres, conversaciones, diagnósticos ni recuperaciones de Luna/Dakota, ni presentar al beagle ilustrativo como paciente. Gonzalo es responsable editorial real según política; no atribuir revisión veterinaria inexistente.

**Declaración al lector:** identificar que es una guía general y que las imágenes son ilustraciones generadas con IA, sin paciente real. La autoría visible ya está gestionada por `ArticleByline`; evitar una firma profesional inventada.

**Pregunta:** «Mi perro mayor no tiene dientes: ¿qué puedo poner hoy en su plato y cuándo necesito llamar al veterinario?». La respuesta debe empezar pronto: confirmar que puede comer por sí mismo, mantener una dieta adecuada, adaptar textura si el equipo veterinario la considera apropiada, observar tolerancia y consultar ante problemas.

**Aportación propia:** síntesis con tres situaciones separadas (boca cicatrizada, extracción reciente, dificultad para tragar); comparación de formas de presentación sin clasificar una como universalmente mejor; secuencia didáctica de preparación sin proporciones; registro imprimible de qué se ofreció, cuánto alimento base se consumió y qué ocurrió.

**Canibalización inspeccionada:** inventario y archivos `comida-casera-perros-mayores.mdx` y `salud-dental-perros-mayores.mdx`. El primero explica formulación/higiene y ya advierte que triturar no garantiza absorción; el segundo trata prevención y atención dental. No hay spoke sobre ausencia dental. Este brief conserva el ángulo específico de textura y decisiones al comer: derivar formulación casera y prevención a esos destinos, sin reescribir sus desarrollos. No se necesita arco de paciente; apertura=pregunta, desarrollo=elecciones, cierre=registro y límites.

## 3. Fuentes veterinarias verificadas y registro fuente→afirmación

Todas abiertas y leídas el **2026-10-19**; los identificadores empleados son URL profundas confirmadas, sin PMID/DOI añadidos. Evidencia breve en `docs/contenido/alimentacion-perros-mayores-sin-dientes/fuentes/`; los originales descargados completos se guardaron temporalmente fuera de Git. La auditoría debe volver a abrir las URL de forma independiente. No extrapolar cohortes, porcentajes ni ensayos: se trata de guías clínicas y material clínico secundario, no estudios en perros senior desdentados.

| ID | Identidad y año | URL comprobada | Afirmación y localización | H2 y límites |
|---|---|---|---|---|
| F1 | WSAVA Global Nutrition Committee, *Guidelines on Selecting Pet Foods*, actualización 10-03-2021 | https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf | En «What to look for on a label», distinguir dieta completa de alimentación complementaria/intermitente; conocer calorías por gramo o ración y adecuación individual | H2 2; guía perros/gatos, no prescribe marca ni producto senior universal, ni garantiza adecuación a enfermedad por la etiqueta sola |
| F2 | WSAVA Nutritional Assessment Guidelines Task Force (Lisa Freeman y colaboradores), *Nutritional Assessment Guidelines*, JSAP junio 2011 | https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf | «Extended Evaluation / Animal factors»: cantidad consumida, masticación, deglución, vómito y regurgitación; «Evaluate homemade foods»: receta, preparación, sustituciones y formulación profesional; «MONITORING»: ingesta, apetito, peso/condición, signos gastrointestinales y actividad | H2 2, 3 y 5; consenso perros/gatos, no receta ni ratio agua/pienso, no plazo universal de seguimiento |
| F3 | Brook A. Niemiec y colaboradores / WSAVA, *Guías Dentales de la Asociación Mundial de Veterinarios de Pequeños Animales* (traducción española; sin año explícito comprobado en documento) | https://wsava.org/wp-content/uploads/2020/01/WSAVA-Dental-Guidelines-Spanish.pdf | Sección 2, tabla 1 «Posibles cambios observables asociados con el dolor dental»: preferencia de duro a blando, cambios alimentarios, masticación unilateral, sangre en comida o agua e hipersalivación | H2 1; son signos posibles, no prueba diagnóstica; seguir comiendo no descarta dolor; no inferir causa de pérdida dental por vejez ni por ilustración |
| F4 | Courtney Barnes, Tammy Hunter y Robin Downing / VCA, *Megaesophagus*, actualizado 28-05-2024 | https://vcahospitals.com/know-your-pet/megaesophagus | «How is megaesophagus treated?»: consistencia depende del paciente; licuar puede elevar riesgo de aspiración. «How is megaesophagus usually diagnosed?»: tos, respiración rápida y fiebre entre signos de neumonía por aspiración | H2 1 y 3; información clínica secundaria sobre megaesófago, NO equiparar sin dientes a megaesófago/disfagia ni enseñar manejo postural o diagnosticarlo; se usa para refutar «más líquido siempre más seguro» |
| F5 | Malcolm Weir, Tammy Hunter y Catherine Barnette / VCA, *Post-Operative Instructions in Dogs*, actualizado 18-09-2025 | https://vcahospitals.com/know-your-pet/post-operative-instructions-in-dogs | «Your veterinarian will give you detailed instructions…» y «When can I feed my dog?»: existen instrucciones y excepciones individuales después de cirugía | H2 1; es cirugía general, NO protocolo dental ni respaldo para días de dieta blanda, tiempos de cicatrización o fracciones de ración tras extracciones; omitir sus cantidades generales |
| F6 | FDA, *Tips for Safe Handling of Pet Food and Treats*, contenido actualizado 23-05-2024 | https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats | «Tips for Preparing Pet Food»: manos/utensilios/plato limpios; «Tips for Storing Pet Food»: refrigerar pronto o desechar alimento enlatado/bolsas sobrante y taparlo en nevera | H2 4; instrucciones de seguridad, no establece vida útil universal de papilla ni minutos de remojo; seguir envase y prescripción |

**Lagunas y alcance:** no se ha encontrado aquí un ensayo que establezca textura, proporciones o receta universal para todos los perros mayores sin dientes. Las preparaciones serán opciones condicionadas y observación editorial, no tratamientos de eficacia demostrada. La matriz es una ayuda para ordenar preguntas, no test diagnóstico. No afirmar que todos puedan tragar pienso entero, que las encías sustituyan dientes ni que líquido evite atragantamiento. No prometer absorción mejorada, ganancia de peso o curación. Fuentes bloqueadas o URL exploratorias fallidas se documentan aparte y NO entran en bibliografía.

## 4. Requisitos técnicos Astro/MDX

Importar `AlertBox` y `FAQ` desde `../../components/AlertBox.astro` y `../../components/FAQ.astro`, además del componente didáctico específico si se crea. No añadir H1, schema, breadcrumbs ni TOC manuales: los gestionan las plantillas. Confirmado enum en `src/content.config.ts` y rutas en inventario/MDX.

Párrafos breves: objetivo de máximo tres líneas móviles, comprobar a 390 px y dividir bloques según lectura real; no confiar en un contador. H3 a intervalos orientativos de 150–200 palabras; no añadir subtítulos vacíos para cumplirlos. Imágenes con dimensiones intrínsecas y alt fiel; secundarias `loading="lazy" decoding="async"`. Hero sigue layout. Todos los recursos visuales deben conservar sentido en proyección Markdown/HTML sin JavaScript, con explicación estática y enlaces HTML reales.

## 5. Enlazado interno obligatorio

| Tipo / momento | Ancla descriptiva | Ruta real | Estado |
|---|---|---|---|
| Pilar / contexto nutricional | alimentación de perros senior | `/alimentacion-perros-senior` | Pilar existente |
| Spoke mismo pilar / formulación casera H2 2 | cómo planificar una dieta casera segura | `/alimentacion-perros-senior/comida-casera-perros-mayores` | Publicado [x] |
| Segundo spoke | Pendiente — aún no hay dos artículos publicados en este pilar | Sin enlace | Contingencia explícita skill; no inventar destino |
| Puente clínico / H2 1 | señales y cuidados de salud dental | `/salud-perros-mayores/salud-dental-perros-mayores` | Publicado [x] |

Calculadora de calidad de vida: no obligatoria para este pilar nutricional y no necesaria para decidir textura; no añadirla por cuota. No alterar slugs previos. Si se decide añadir puente automático, hacerlo en `src/data/internal-links.ts` y actualizar mapa documental; no duplicar navegación. Examinar el HTML generado de las rutas.

## 6. Estructura y presupuesto de palabras

Target **2.200**, suma exacta de bloques siguientes. Tolerancia orientativa por sección ±15 %; resolver divergencias por utilidad, sin inflar texto. Los apoyos didácticos acompañan y no sustituyen respuestas textuales.

### Introducción — 150 palabras

- Dar respuesta práctica en primer párrafo y condicionar a boca cicatrizada/deglución normal; no dar por saludable toda boca desdentada.
- Delimitar qué resuelve la guía, procedencia sin caso y diferencia entre modificar textura y formular dieta.
- `AlertBox type="info" title="Puedes adaptar la comida con ayuda"`: acompañamiento empático sin garantizar resultados; invitar a llevar observaciones al veterinario.
- Presentar la imagen hero solo desde el layout. El `heroImageAlt` propuesto incluye la declaración IA y el límite de la escena: el layout actual imprime ese mismo valor en el `figcaption` visible. Verificar ese pie renderizado; no duplicar hero ni añadir campos al schema.

### H2 1. Antes de cambiar el plato: boca cicatrizada, cirugía reciente o dificultad para tragar — 350 palabras

*Sustentado en:* F3 **Guías Dentales de WSAVA**, F4 **VCA Megaesophagus**, F5 **VCA Post-Operative Instructions in Dogs**.

- H3 «Si la boca ya está cicatrizada»: distinguir condición observada de diagnóstico; dolor, sangre y cambio de preferencia requieren revisión aunque falten dientes.
- H3 «Si acaba de pasar por una extracción»: pedir instrucciones concretas a clínica (qué alimento, textura y cuándo revisar), sin receta posquirúrgica, días ni plazos inventados.
- H3 «Si tose, regurgita o no consigue tragar»: parar intento de alimentación; contactar con clínica; dificultad respiratoria requiere urgencias. No continuar licuando ni forzar comida/agua con jeringa. Diferenciar consulta pronta por ingesta reducida/dolor/pérdida de peso de emergencia respiratoria.
- Matriz accesible con tres situaciones, qué comprobar y siguiente paso; aclarar que no diagnostica.
- `AlertBox type="danger" title="Si respira mal, acude a urgencias"`: peligro respiratorio junto a conducta; para tos/regurgitación al comer indicar detener y consultar, sin etiquetar todos los signos como el mismo nivel de urgencia.
- Enlace salud dental. No explicar protocolos anestésicos o periodontal para evitar duplicación.

### H2 2. Qué comida elegir sin perder el equilibrio nutricional — 400 palabras

*Sustentado en:* F1 **WSAVA Guidelines on Selecting Pet Foods**, F2 **WSAVA Nutritional Assessment Guidelines**.

- H3 «Alimento húmedo completo»: enseñar a localizar completo/complementario y adecuación al individuo, incluidas dietas terapéuticas. No recomendar marca ni convertir «senior» en garantía.
- H3 «El alimento que ya utiliza, con otra presentación»: consultar si su pienso/dieta permite humedecer, machacar o equivalente húmedo; no intercambiar terapéuticas por parecido de envase. Agua cambia textura/volumen, no aumenta calorías del alimento base.
- H3 «Qué significa una papilla casera»: fórmula profesional preexistente vs mezcla improvisada; pollo/arroz no se convierten en dieta completa por triturarlos. Mantener ingredientes/suplementos de receta profesional y preguntar antes de modificarla; sin proporciones ni cantidades.
- Tabla breve comparar húmedo completo, seco humedecido si procede y receta formulada adaptada: ventaja práctica, comprobación y límite. Evitar rankings de eficacia.
- Enlace comida casera y pilar.

### H2 3. Cómo adaptar la textura sin forzar a tu perro — 400 palabras

*Sustentado en:* F2 **WSAVA Nutritional Assessment Guidelines**, F4 **VCA Megaesophagus**.

- H3 «Preparar una base que ya es adecuada»: explicar secuencia doméstica editorial condicionada, sin presentarla como protocolo clínico. Separar ración de alimento base indicada, usar utensilios limpios, humedecer si está permitido, deshacer partes duras, comprobar consistencia antes de ofrecer.
- H3 «Observar una toma voluntaria»: plato estable de acceso cómodo, poca distracción; no sujetar hocico ni abrir boca ni imponer posición. Ajustar logística a capacidades del perro y consultar si no se maneja.
- No fijar temperatura, minutos de remojo, proporción de agua, número de tomas ni textura «correcta» para todos. No garantizar que triturar mejore digestibilidad/absorción.
- `AlertBox type="warning" title="Más líquido no siempre es más seguro"`: recordar límite clínico de F4 y que no se usa una jeringa para resolver dificultad de tragar en casa; consulta antes de cambiar consistencia si existe este problema.
- Imagen de preparación; secuencia didáctica de 3 pasos (base adecuada → adaptar cuando proceda → observar/parar), consultable manualmente y con reproducción opcional finita, sin autoplay. Incluir anterior/siguiente, reproducir/pausar/repetir, foco visible y objetivos táctiles de al menos 44 px; comprobar pausa efectiva del avance y movimiento. Limpiar temporizadores al ocultar la página y al navegar/desmontar, sin inicializaciones duplicadas. Con movimiento reducido conservar consulta manual sin animaciones/transiciones y explicar si se deshabilita reproducir. Sin JS mostrar todos los pasos y ocultar controles inertes; impresión debe mostrar todos los pasos con JS activado y desactivado. No animar el cuerpo del perro ni presentar la secuencia como vídeo.

### H2 4. Preparación, sobras y limpieza del plato — 250 palabras

*Sustentado en:* F6 **FDA Tips for Safe Handling of Pet Food and Treats**.

- H3 «Antes y después de la toma»: limpiar manos, utensilios y plato; usar cuchara limpia, no mezclar indefinidamente sobras nuevas y viejas.
- H3 «Conservar lo que todavía no se ha servido»: seguir envase de conservación tras apertura/preparación; tapar y refrigerar pronto el húmedo sobrante o desechar. No inventar regla universal de horas para pienso mojado o receta casera ni aplicarle la duración de otra dieta.
- Distinguir ración preparada de envase abierto; no presentar refrigeración como garantía de seguridad indefinida. No repetir el artículo general de conservación pendiente en inventario.

### H2 5. Cómo saber si la adaptación le está ayudando — 300 palabras

*Sustentado en:* F2 **WSAVA Nutritional Assessment Guidelines**.

- H3 «Registra alimento, cantidad y tolerancia»: anotar fecha, dieta exacta, cantidad de alimento base ofrecida y restante (si se mide, misma unidad), adaptación, apetito, tos/regurgitación/dolor, vómitos/heces y peso si puede medirse de forma segura. No tratar gramos de papilla diluida como calorías equivalentes de otra receta.
- H3 «Cuándo revisar el plan»: descenso de ingesta/peso, dolor o dificultad no se solucionan solo con otra textura; acordar controles y objetivos individuales con clínica; no esperar un número fijo de días si empeora.
- Imagen de observación de toma; registro HTML imprimible de una página con etiquetas legibles. No añadir cálculo diagnóstico ni objetivo calórico universal.
- Cierre de la guía sin caso: decisiones y límites; no desenlace de recuperación inventado.

### Conclusión y FAQ final — 350 palabras

- Resumir criterio de dieta adecuada + tolerancia + seguimiento sin repetir todo el artículo; FAQ estrictamente al final.
- Un `FAQ` con **6** preguntas, respuestas breves sin nuevos hechos sin fuente:
  1. «¿Un perro sin dientes necesita siempre papilla?» — depende de boca, deglución y tolerancia; no universalizar.
  2. «¿Puedo remojar el pienso que ya toma?» — comprobar con clínica/envase que procede; no ratio universal.
  3. «¿El pollo con arroz triturado es una dieta completa?» — triturar no equilibra; receta formulada, remitir a H2 2.
  4. «¿Cuántos días necesita comida blanda tras una extracción?» — lo determina quien operó según procedimiento/evolución; no plazo web universal.
  5. «¿Y si tose o devuelve la comida al comer?» — detener y consultar; urgencias si respira mal, sin diagnosticar.
  6. «¿Cómo comparo una ración húmeda y una seca?» — considerar energía e instrucciones individuales, no equivaler volumen o peso sin información nutricional.
- Antes del FAQ final, añadir un cuarto `AlertBox type="info" title="Fuentes científicas y de autoridad"` con las seis fuentes utilizadas: cada entrada debe enlazar su título real a la URL profunda de la sección 3, identificar institución/autor y aportar una descripción breve. Incluir nota de responsabilidad educativa y consulta veterinaria. Este cuadro de bibliografía no sustituye las citas nominales junto al pasaje; el FAQ queda después del cuadro, al final.

## 7. Afiliados y conversión

No hay afiliación necesaria para resolver la pregunta. No inventar experiencia con marcas, comparativas ni recomendaciones comerciales. El resultado esperado es comprender qué preparar, qué observar y qué preguntar en consulta, no comprar un producto. No enlaces comerciales de relleno.

## 8. Guía visual y tres prompts

Aplicar `.agents/skills/crear-animaciones-articulo-blog/SKILL.md`. **Ficha fija:** beagle senior tricolor de tamaño mediano, hocico naturalmente encanecido, orejas caídas, ojos marrones, cuerpo proporcionado, uñas y patas anatómicamente coherentes, sin patología añadida. Ilustrativo, no paciente ni evidencia de desdentamiento. Falta de dientes no se representa abriendo boca ni deformando mandíbula. Primero generar e inspeccionar referencia; después derivar escenas manteniendo patrón de pelaje y rasgos. No heredar raza del ejemplo de baño.

### Imagen 1 — hero, respuesta emocional y contexto

- Archivo final: `beagle-senior-comida-blanda-v1.webp`.
- Prompt: plano medio a altura de ojos en cocina doméstica vivida, suelo antideslizante; **beagle senior tricolor de tamaño mediano, hocico naturalmente encanecido, orejas caídas y ojos marrones**, en postura cómoda junto a plato bajo ancho estable con alimento húmedo homogéneo; perro tranquilo atento al plato, boca sin abrir de manera forzada. Luz de ventana cálida lateral, profundidad de campo moderadamente corta con patas/plato nítidos, texturas reales de pelaje y cerámica; estilo fotoperiodístico íntimo, sin anuncio ni sonrisa humana. Sujeto ilustrativo generado con IA, anatomía canina correcta y vejez visible sin enfermedad impuesta.
- Alt y pie visible: usar exactamente el `heroImageAlt` definido en frontmatter, cuya declaración IA y límite del plato se imprimen también en el `figcaption` del layout actual. Comprobar la declaración visible en navegador sin duplicar hero ni inventar un campo de pie.

### Imagen 2 — preparación, utilidad práctica

- Archivo final: `preparar-textura-comida-perro-v1.webp`, H2 3.
- Prompt: plano cercano tres cuartos de manos adultas preparando alimento con utensilio limpio sobre encimera, plato estable y una base homogénea sin trozos duros; al fondo, reconocible sin ser un reflejo, el mismo **beagle senior tricolor de tamaño mediano, hocico naturalmente encanecido, orejas caídas y ojos marrones**, descansando a distancia sin acceso a utensilios. Cocina de la primera escena; luz natural lateral, profundidad de campo corta pero preparación legible, texturas de metal y comida realistas, estilo documental doméstico sin producto comercial ni texto generado en imagen. No dosificar suplementos ni mezclar ingredientes crudos. Ilustración IA sin paciente clínico.
- Alt: «Manos que adaptan la textura de un alimento en un plato, con el beagle senior al fondo». Pie: señalar que se modifica presentación de dieta previamente adecuada, no equilibrio por licuadora, más declaración IA.

### Imagen 3 — observación y registro

- Archivo final: `observar-comida-perro-senior-v1.webp`, H2 5.
- Prompt: plano general corto lateral a altura baja de **beagle senior tricolor de tamaño mediano, hocico naturalmente encanecido, orejas caídas y ojos marrones**, comiendo voluntariamente en plato bajo ancho estable en el suelo antideslizante de la misma cocina; postura natural relajada, cuatro apoyos coherentes. Cuidador a distancia observando, registro sobre mesa fuera del alcance, sin texto legible inventado, sin manos en hocico ni cuello. Luz natural suave, profundidad de campo moderada, pelo y entorno reales, estilo fotoperiodístico cotidiano sin sensación de banco de imágenes. Ilustración generada con IA, no demostración clínica ni recuperación.
- Alt: «Beagle senior que come voluntariamente mientras su cuidador observa a distancia». Pie: observar tolerancia y registrar cambios; declaración IA.

**Apoyos pertinentes:** una matriz estática accesible de tres situaciones (H2 1); una secuencia didáctica de tres pasos con consulta manual y reproducción opcional finita (H2 3), sin autoinicio; un registro HTML imprimible (H2 5). La secuencia requiere anterior/siguiente, reproducir/pausar/repetir, foco visible y objetivos de al menos 44 px. Pausar detendrá avance y movimiento; limpiar temporizadores al ocultar/navegar/desmontar y evitar inicializaciones duplicadas. `prefers-reduced-motion` conservará consulta manual sin animaciones/transiciones, explicando si la reproducción se deshabilita. Sin JS se mostrarán todos los pasos y se ocultarán controles inertes; impresión mostrará todos los pasos con y sin JS. Los cambios explicarán preparación, adaptación y observación; no habrá movimiento corporal del perro ni promesa de vídeo. La matriz y la secuencia usarán texto HTML real y no texto diminuto quemado en una imagen. No vídeo, PDF ni calculadora prometidos. El registro debe imprimir solo contenido útil en página legible; botón real con funcionamiento probado y respaldo HTML visible. No recorte de perro adicional si no mejora una pregunta concreta.

## 9. Contrato de entrega

1. Cuerpo MDX real **1.870–2.530 palabras**, target 2.200 con suma de secciones 150+350+400+400+250+300+350. No sumar targets para fingir conteo. Si discrepancia útil se documenta, sin relleno.
2. Citas nominales próximas y bibliografía: F1 H2 2; F2 H2 2/3/5; F3 H2 1; F4 H2 1/3; F5 H2 1; F6 H2 4. Todas deben usarse con su límite y no solo figurar listadas. Casillas a verificar en artículo: F1 ☐ F2 ☐ F3 ☐ F4 ☐ F5 ☐ F6 ☐.
3. Tres `AlertBox` de cuerpo: info introducción, danger H2 1, warning H2 3; además un cuarto `AlertBox type="info" title="Fuentes científicas y de autoridad"` antes del FAQ final, con seis entradas de título real enlazado, institución/autor, descripción breve y nota de responsabilidad. Un `FAQ` final, seis preguntas. Enlaces reales de sección 5; contingencia de segundo spoke explícita solo en brief, no filtrar al lector. Calculadora no aplica.
4. Guía sin caso; no arco de paciente exigido, no testimonios ni tratamientos inventados. Responsabilidad editorial sin revisión veterinaria ficticia. IA declarada visiblemente en hero y cada figura, con alt descriptivo.
5. Tres imágenes reales integradas y funcionando; hero con declaración IA visible mediante el `figcaption` que usa `heroImageAlt`, sin duplicar la imagen. Matriz, secuencia y registro operativos. La secuencia de tres pasos tendrá anterior/siguiente, reproducir/pausar/repetir, reproducción opcional finita sin autoplay, pausa efectiva, foco y objetivos de 44 px. Limpiar temporizadores al ocultar/navegar/desmontar y evitar inicializaciones duplicadas. Movimiento reducido conservará consulta manual sin animaciones/transiciones. Sin JS, todos los pasos legibles y controles inertes ocultos; impresión con y sin JS mostrará todos los pasos. No movimiento corporal del perro ni vídeo. No recursos pendientes presentados como disponibles. `status: "Publicado"` como etiqueta técnica del catálogo solo tras completar los autocontroles, sin declarar publicación pública; inventario en curso/redactado y validado localmente. Entregar en rama/PR sin fusionar ni desplegar.
6. No proporciones, kcal objetivo, cantidad de agua, tiempo de remojo, días tras extracción ni formulación universal. No medicamentos/dosis, no diagnóstico por imagen, no maniobras de alimentación forzada ni cambio de postura para disfagia sin equipo clínico.
7. Verificación local real: móvil/escritorio, claro/oscuro, teclado, foco, contraste, zoom/reflujo, reduced motion, recursos HTTP/tipo/dimensiones, impresión y proyección Markdown, build con `npx astro build`. Capturas e informe ligados a versión. No confundir build con recursos probados.

## 10. Validación previa del creador

Comprobado: metadatos contados y enum; inventario y diferenciación; seis fuentes abiertas con afirmación/localizador/límite y uso H2; presupuesto suma 2.200; componentes; prompts con misma raza; material sin caso; enlaces reales y contingencia; sin colisión de brief al crear. No es auditoría independiente ni APTO. Auditoría independiente R1 completada con NO APTO; correcciones registradas en `docs/contenido/alimentacion-perros-mayores-sin-dientes/correcciones-brief-r1.md`. Auditoría independiente R2: APTO, sobre SHA256 `accdd752038ed26bd5d30971bfecefe8237c26562c9262f23196fa449e8cf79c`. Fallo nuevo de integración: la etiqueta técnica previamente exigida excluye el artículo del catálogo de proyección aunque su ruta se genere; corrección documentada en `docs/contenido/alimentacion-perros-mayores-sin-dientes/correcciones-brief-integracion.md`. Pendiente: auditoría del brief (ronda 3 de 3), producción y todas las pruebas del artículo completo. Esta corrección no es un veredicto independiente.

## 11. Recursos prometidos y gate editorial

| Recurso / utilidad | Ubicación | Ruta prevista | Estado / responsable | Prueba necesaria |
|---|---|---|---|---|
| Hero y dos escenas continuas | Hero, H2 3, H2 5 | `/images/blog/alimentacion-perros-mayores-sin-dientes/` + archivos sección 8 | Planificado / creación visual | Inspección anatomía/edad/continuidad, imágenes abiertas y tipo real, alt/caption IA, dimensiones, móvil/oscuro |
| Matriz tres situaciones | H2 1 | HTML del artículo | Planificado / redacción y desarrollo | Orden de lectura, ausencia JS, tabla/cards responsive, decisiones equivalentes al texto |
| Secuencia didáctica de preparación, tres pasos | H2 3 | Componente específico integrado; ruta del artículo | Planificado / redacción y desarrollo | Anterior/siguiente, reproducir/pausar/repetir por teclado/tacto, foco visible y objetivos ≥44 px; sin autoplay y reproducción finita; pausa detiene avance/movimiento; limpieza al ocultar/navegar/desmontar y sin inicialización duplicada; reduced motion conserva consulta manual sin animaciones; todos los pasos sin JS y controles inertes ocultos; impresión de todos los pasos con/sin JS; sin movimiento corporal ni vídeo |
| Registro imprimible de tomas | H2 5 | HTML integrado en artículo | Planificado / redacción y desarrollo | Abrir, imprimir/guardar PDF desde navegador, revisar página legible; campos/etiquetas, uso sin cuenta ni envío de datos |
| Enlaces internos | H2 1 y 2 | Tres destinos sección 5 | Identificados / redacción | Abrir rutas locales y verificar contenido; sin certificar publicación nueva |

Todo recurso anterior es gate del artículo final: completar y verificar o retirar explícitamente su promesa con justificación antes de aprobar. Auditor final inspecciona artículo y recursos terminados. Máximo **tres rondas por documento**, registrar hashes/versiones y separación de creación/corrección/auditoría. Si la tercera no es APTO, detener y presentar bloqueo al usuario; no renumerar.
