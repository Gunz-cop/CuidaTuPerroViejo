# Brief de fase 2 · Síndrome de Cushing en perros mayores

**25 de noviembre de 2026 · Para auditoría independiente.** Base editorial: MDX publicado y PR #186, commit `fbdfd53`. Flujo: brief → auditoría del brief en otra sesión → implementación → auditoría de implementación. La publicación queda condicionada a la medición del PR #186 y al cierre de las auditorías.

## 1. Ficha y decisión de publicación

| Campo | Base publicada |
|---|---|
| Artículo | `src/content/blog/sindrome-cushing-perros-mayores.mdx` |
| URL canónica | `https://cuidatuperroviejo.com/salud-perros-mayores/sindrome-cushing-perros-mayores` |
| Pilar | `salud-perros-mayores` (enum de `src/content.config.ts`) |
| H1 | Síndrome de Cushing en perros mayores: causas, síntomas y tratamiento |
| Título SEO | Síndrome de Cushing en perros: síntomas y tratamiento (53 caracteres) |
| Meta descripción | Qué es el síndrome de Cushing en perros mayores, qué síntomas orientan la consulta y cómo se aborda el tratamiento, la alimentación y el pronóstico. (148 caracteres) |
| Keyword principal | `sindrome de cushing en perros` |
| Fechas en MDX | Publicación 2026-07-21, modificación 2026-11-25 |
| Frontmatter | Usar la ficha publicada como base. Actualizar `dateModified` cuando se publique la fase 2. |

**Medición antes de publicar.** Tres semanas se cumplen el **16/12/2026** y cuatro el **23/12/2026**. Objetivo de cierre: 23/12 con datos consolidados. Filtrar Rendimiento → Resultados de búsqueda por **página exacta** (canónica anterior). En exportación Web, comparar 26/11–16/12 con 04/11–24/11 (21 días), o 26/11–23/12 con 28/10–24/11 (28 días). Excluir el 25/11 y usar fechas completas con sus datos ya consolidados. Exportar clics, impresiones, CTR y posición media por consulta y país (España y México), además de totales de la URL. Revisar en el tipo de búsqueda Imagen, por separado, con el mismo filtro si hay datos. Agrupar variantes ortográficas y consultas por intención de §6. Registrar fecha de exportación e indexación observada, datos escasos/anonimizados y posibles cambios de demanda o SERP. Tomar el resultado como comparación observacional. Guardar exportaciones de audiencia fuera del repo público. Ninguna publicación antes del 16/12 ni antes de cerrar la comparación y contar con autorización.

## 2. Procedencia y valor propio

Guía sin caso en esta fase. Hilo de lectura: entender el origen → observar y anotar → distinguir cuándo consultar → hablar de confort y decisiones. Reservar en el plan, al final de «Un registro doméstico útil» y antes de «Pruebas diagnósticas…», un punto de inserción para el futuro recuadro de experiencia del propietario con su beagle Luna (sospecha leve en estudio, diagnóstico pendiente). En fase 2 la reserva solo vive en el brief. En fase 3 encaja como recuadro dentro del H2 de síntomas, con hechos y permisos aportados por el propietario. Evitar atribuirle síntomas, pruebas, medicación, pronóstico o desenlace. Las ilustraciones representan al cocker editorial del artículo.

Voz: español neutro de tú, frases cortas y verbos de acción. Usar «alimento», «sed», «orina», «pérdida de pelo», «servicio de urgencias veterinarias». Explicar ACTH y «polo craneal» al primer uso. Hablar de eutanasia con claridad y cuidado. Validar la redacción futura con la [guía de voz](../.agents/skills/references/guia-voz-tono.md) y su script.

## 3. Evidencia clínica y anatómica

Comprobación documental 25/11/2026. IDs usados en la estructura y el guion. Las ubicaciones identifican el pasaje que debe cotejar la auditoría.

| ID | Fuente y pasaje | Afirmación autorizada y límite |
|---|---|---|
| F1 | FDA, *Cómo tratar la enfermedad de Cushing en los perros* (versión española), «Dos tipos comunes» y tratamiento. [FDA](https://www.fda.gov/consumers/articulos-para-el-consumidor-en-espanol/como-tratar-la-enfermedad-de-cushing-en-los-perros) | Hipófisis en la base del cerebro, ACTH por sangre estimula suprarrenales, que producen cortisol. Tumor suprarrenal puede producir cortisol con independencia de la señal hipofisaria. Opciones y seguimiento según origen. |
| F2 | Laura Van Vertloo, *Cushing Syndrome (Hyperadrenocorticism) in Animals*, MSD, revisión 2024, «Etiology» y «Clinical Findings», más *Corticosteroids in Animals*, «Adverse Effects». [MSD endocrinología](https://www.msdvetmanual.com/endocrine-system/the-adrenal-glands/cushing-syndrome-hyperadrenocorticism-in-animals), [MSD farmacología](https://www.msdvetmanual.com/pharmacology/inflammation/corticosteroids-in-animals) | Término técnico y sentido estricto de enfermedad hipofisaria. Los glucocorticoides exógenos pueden suprimir el eje y reducir la producción propia. Pueden aparecer signos de sed/orina, apetito, jadeo, pérdida muscular, abdomen péndulo, piel fina y alopecia. El hígado puede aumentar de tamaño (también F3, «Diagnostic Imaging»). Representar la vejiga en relación con más orina, sin atribuirle lesión. |
| F3 | Behrend et al., consenso ACVIM 2013, «Clinical Presentation», tabla 1 y «Ultrasonography», DOI 10.1111/jvim.12192. [ACVIM](https://onlinelibrary.wiley.com/doi/10.1111/jvim.12192) | Historia, exploración y pruebas se valoran juntas. Infección urinaria o poliuria intensa pueden contribuir a escapes. Resistencia a insulina puede favorecer diabetes y la hipercoagulabilidad puede asociarse a tromboembolismo. Los patrones ecográficos varían, incluido tamaño normal en algunos perros hipofisarios. Complicaciones posibles, sin secuencia ni frecuencia individual. |
| F4 | *Textbook of Veterinary Anatomy*, Dyce, Sack y Wensing (4.ª ed.), figs. 14–21 y 3–53, y guía de disección de University of Minnesota, «Peritoneal Cavity». [Riñones y suprarrenales](https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000141.htm), [hígado](https://elsevier-elibrary.com/contents/fullcontent/58986/epubcontent_v2/OEBPS/B9781416066071000037.htm), [vejiga](https://pressbooks.umn.edu/dogcatanatomylabguide/chapter/part-1-peritoneal-cavity-and-inguinal-canal/) | Riñones dorsales y escalonados, derecho más craneal. Suprarrenales próximas al extremo craneal de su riñón, mediales o craneomediales según lado, separadas del riñón. Hígado inmediatamente caudal al diafragma. Vejiga caudoventral hacia la entrada pélvica, su proyección cambia con el llenado. |
| F5 | *The use of ultrasonographic adrenal dimensions and the adrenal dimension-to-aorta ratio in the diagnosis of benign and malignant adrenal diseases in dogs* (2023), Methods y Discussion. [Estudio veterinario](https://pmc.ncbi.nlm.nih.gov/articles/PMC9967719/) | Permite comparar patrones morfológicos junto a F3: tamaño normal variable, posible agrandamiento bilateral en origen hipofisario y masa unilateral con opuesta pequeña en origen suprarrenal. Serie retrospectiva ecográfica. Excluir umbrales, equivalencias diagnósticas y simetría perfecta. |
| F6 | MSD, tabla *When to See a Veterinarian*, columnas inmediata y dentro de 24 h. Cornell, *Emergency and Critical Care*. [Tabla MSD](https://www.msdvetmanual.com/multimedia/table/when-to-see-a-veterinarian), [Cornell](https://www.vet.cornell.edu/hospitals/services/emergency-and-critical-care-0) | Dificultad para respirar, colapso/debilidad extrema e intentos de orinar sin lograrlo requieren atención urgente. Sed excesiva nueva o claramente aumentada justifica consulta dentro de 24 h según MSD. Triaje general aplicable a perros, sin asignar causa. |
| F7 | FDA/DailyMed, ficha *VETORYL Capsules (trilostane)*, «Information for Dog Owners» y «Effectiveness». [Ficha de trilostano](https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=22a5e838-c9a3-40d2-84cd-15df6ada913b) | Vómitos, diarrea, decaimiento, inapetencia nueva o debilidad durante trilostano requieren llamada inmediata. La ficha indica interrumpir ante intolerancia. Redacción de sitio: llamar de inmediato para recibir instrucciones antes de continuar, colapso o dificultad para respirar a urgencias, sin pautas ni reinicios por cuenta propia. Sustenta observar sed, frecuencia urinaria, jadeo, apetito y actividad en seguimiento. |
| F8 | Bishop et al., *2016 AAHA/IAAHPC End-of-Life Care Guidelines*, resumen (PMID 27685363), e IAAHPC, marco y evaluación del confort. [Guía clínica](https://pubmed.ncbi.nlm.nih.gov/27685363/), [Guía IAAHPC](https://iaahpc.org/veterinary-guidelines/general-practice-guidelines/) | Plan individual de final de vida y alivio del sufrimiento. Hablar con el equipo veterinario sobre paliativos y eutanasia humanitaria cuando el confort ya cuesta mantenerlo. El registro doméstico prepara la conversación. Excluir umbrales automáticos, instrucciones de procedimiento o un itinerario universal. |
| F9 | Schofield et al., *Survival analysis of 219 dogs with hyperadrenocorticism attending primary care practice in England* (2020), Abstract/Results. [Veterinary Record](https://doi.org/10.1136/vr.105159) | Conservar el contexto de la cohorte inglesa y su mortalidad por todas las causas en el H2 de pronóstico. No extrapolar a vida restante, probabilidad de muerte por Cushing ni efecto causal del trilostano. No añadir cifras al bloque de final de vida ni a FAQ. |

## 4. Contrato Astro y Markdown

Reutilizar `AlertBox`, `FAQ` y `TablaApilable` del sitio en la futura implementación. Para la secuencia, seguir el patrón `BanoAnimation.astro` en `src/components/article/` con HTML estándar y atributos `data-*`. Aplicar estilos locales para claro y oscuro, incluidas las reglas de `.content-body`. Mantener TOC, metadatos y schema automáticos. Perros y órganos son imágenes 2D generadas por el implementador. Código visual limitado a flechas, resaltados, etiquetas y transiciones. Sin 3D, formularios ni campos de entrada en el cuerpo. Preferir imágenes HTML rastreables con alt, tamaños intrínsecos, carga diferida y `srcset` cuando proceda. Para la proyección Markdown exigir texto de cada variante, leyendas, acciones de triaje y descarga, en el orden del artículo. Ver §10.

## 5. Enlaces internos

| Destino en inventario o ruta del repo | Uso |
|---|---|
| `/salud-perros-mayores` | Pilar, desde pronóstico. |
| `/salud-perros-mayores/chequeo-geriatrico-canino` | Spoke publicado, conservar en cuidados. |
| `/salud-perros-mayores/mi-perro-viejo-defeca-mucho-poliquezia` | Spoke publicado disponible si el seguimiento de cambios digestivos requiere contexto. El triaje de trilostano va directo al veterinario. |
| `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores` | Conservar en cuidados para escapes y goteo. |
| `/alimentacion-perros-senior` | Conservar en alimentación. |
| `/cuidados-paliativos-perros` | En el apartado de confort, ancla «cuidados paliativos para perros». |
| `/herramientas/calculadora-calidad-vida-perros` | En el mismo apartado, ancla «calculadora de calidad de vida HHHHHMM». |

Los destinos de paliativos, calculadora y poliquezia devolvieron HTTP 200 el 25/11/2026. La pieza principal ya ocupa su intención en el inventario. El artículo reservado sobre suprarrenales y Luna tiene un ángulo de hallazgo ecográfico y permanece fuera del encargo. Comparación breve dentro del Cushing, sin página nueva ni optimización separada para «suprarrenales agrandadas».

## 6. Oportunidades y estructura de implementación

### Prioridades de búsqueda

| Prioridad | Datos del encargo, 25/11, anteriores a #186 | Acción |
|---|---|---|
| Alta · intención de final de vida | ES «muerte por cushing en perros», 260/mes, hueco editorial. «esperanza de vida», 140/mes. GSC dominio 3 meses: 167 impresiones, posición 24 para el grupo de esperanza de vida. | Resolver con H3 de fase avanzada dentro de pronóstico y una FAQ breve que conduzca allí. Separar contexto de cohorte, urgencias y sufrimiento sostenido. |
| Alta · explicación central | ES «cushing en perros», «cushing perro(s)», «(s)índrome de cushing en perros», 2.400/mes cada variante, SD 16–17, posiciones 48–55. MX «sindrome de cushing en perros» 3.600/mes y «que es el síndrome…» 140/mes. | Agrupar variantes sin sumar volúmenes. Mostrar pronto qué es y usar el eje visual junto a la explicación del origen. |
| Media · variantes y seguimiento | ES «enfermedad de cushing perros» 720–880/mes, pos. 35, «hiperadrenocorticismo perros» 210/mes y tratamiento 210/mes. MX «enfermedad de cushing» 590/mes (ambigua por especie), síntomas 20–70/mes. GSC dominio: «hiperadrenocorticismo en perros», 116 impresiones, pos. 65. | Mantener ambos sinónimos en el primer H2, con matiz clínico. La FAQ y el guion refuerzan el significado. Absorber tratamiento en su H2 actual. |
| Seguimiento · alimentación | GSC dominio: «…alimentacion», 222 impresiones, pos. 34. | Mantener el H3 incorporado en #186 y observar la URL. Priorizar registro y consulta individual. |
| Transversal · búsqueda visual | SERP ES aportada: AI Overview, Otras preguntas, bloque de imágenes, FDA/MSD/Merck, Purina, vídeo de muerte por Cushing y un dominio DA 7 en posición 9. | Usar figuras útiles e indexables, alts descriptivos y leyendas junto al texto. Dar respuesta breve al principio del bloque y explicar límites; DA 7 y el bloque de imágenes indican espacio competitivo, no rendimiento garantizado. |

Fuentes de métricas: fotografía Ubersuggest aportada (España locId 2724, México 2484) y GSC de dominio aportada. Las consultas de autocompletado siguientes son una extracción independiente, sin volumen, de Ubersuggest `google_suggestions`, 25/11/2026, idioma `es`, países `es` y `mx`. Semillas «cushing en perros», «muerte por cushing en perros» y «esperanza de vida cushing perros». Son sugerencias de Google devueltas por la herramienta.

### Mapa por H2 y extensión incremental

| H2 publicado | Encargo, ubicación y respaldo | Incremento orientativo |
|---|---|---:|
| Introducción | Aprovechar el `info` «Qué puedes hacer hoy» y su decisión inmediata. | 0 |
| Qué es el síndrome de Cushing y por qué importa su origen | Mantener «enfermedad de Cushing» en lenguaje habitual y «hiperadrenocorticismo» como término veterinario; si se precisa, el uso técnico de «enfermedad» designa el origen hipofisario. Insertar eje tras las frases sobre los tres orígenes, antes del párrafo de manifestaciones. Conservar `warning` de corticoides. Sustentado en F1–F4. | 35–50 |
| Síntomas: qué observar y qué te dicen | Comparación de siluetas tras el párrafo de signos. En H3 «Un registro doméstico útil», enlace al PDF tras la tabla existente. Tras el registro e inmediatamente antes de las pruebas, integrar tabla de triaje e infografía con el `danger` actual como aviso breve y visible de entrada. El lugar reservado para Luna va después del registro y antes del aviso de urgencias. Sustentado en F2, F3, F6, F7. | 55–80 |
| Pruebas diagnósticas: por qué se interpretan en conjunto | Comparación suprarrenal después de la viñeta de imágenes, antes de la ilustración de consulta. Leyenda de patrones posibles y rótulo exacto «Esquema orientativo; no sirve para diagnosticar». Usar el mismo rótulo en la comparación de siluetas. Sustentado en F3–F5. | 30–45 |
| Tratamiento: qué decide el veterinario | Mantener `warning` del tratamiento y remitir al triaje donde ayude. Diferenciar intolerancia durante tratamiento del deterioro progresivo. Sustentado en F1, F7. | 0 |
| Cuidados en casa: agua, alimentación y comodidad | Mantener H3 de alimentación y acceso libre al agua; aquí basta recordar llevar el registro a consulta. Sustentado en F2, F7 y las fuentes nutricionales ya citadas en el MDX. | 0 |
| Pronóstico y esperanza de vida | Tras la cohorte y su límite, añadir H3 «Cushing avanzado y final de vida: cuándo pedir ayuda». Organizar en qué puede empeorar, cuándo actuar y cómo hablar de confort. Trasladar o aprovechar los enlaces existentes al final del H3. Mantener los tres orígenes y la cohorte en el H2. Sustentado en F2, F3, F6–F9. | 180–230 |
| Preguntas frecuentes | Usar el `FAQ` final. Reformular la de supervivencia, incluir mortalidad y seleccionar causas, diagnóstico y control según tabla. Conservar preguntas de seguridad útiles y evitar duplicar respuestas extensas. Sustentado en F1–F3, F7–F9. | 100–135 |

Total de texto editorial nuevo estimado **400–540 palabras**, sin contar rótulos, estados accesibles ni PDF. Priorizar respuestas accionables, no un mínimo de longitud. Conservar el `info` de fuentes y alcance con citas próximas a cada afirmación nueva y el crédito editorial vigente.

**Fase avanzada y final.** Explicar que la evolución varía y que un deterioro sostenido puede expresarse como menos fuerza, dificultad para moverse o descansar y cambios en el apetito o en los hábitos de orina. Un síntoma nuevo puede tener otra causa o aparecer durante el tratamiento. Dar como ejemplos clínicos seleccionados diabetes o infección urinaria asociadas (F3); mencionar tromboembolismo solo si ayuda a explicar por qué se atiende de inmediato una dificultad respiratoria, sin pedir que el lector identifique su causa. Enlazar al triaje. Plantear hablar de confort ante pérdida sostenida de actividades habituales, mal descanso o sufrimiento difícil de aliviar, sin esperar a una crisis. Pedir un plan con el equipo veterinario (qué se puede aliviar y a quién llamar si empeora), y abordar la eutanasia como conversación compartida si el sufrimiento es difícil de controlar. Usar paliativos y HHHHHMM para preparar esa conversación. Evitar etapas numeradas, signos de muerte inminente, sentencia clínica y detalles de la muerte.

**Tabla de triaje e infografía.** Repetir exactamente las mismas tres acciones en ambos formatos. Urgencias primero y el aviso crítico visible incluso si el resto del artículo está plegado.

| Qué observas | Cuándo consultar |
|---|---|
| Le cuesta respirar, se desploma, presenta debilidad intensa o hace intentos de orinar y no sale orina. | **Urgencias ahora.** Acude a urgencias veterinarias. No esperes a rellenar la hoja. F6. |
| Con trilostano aparecen vómitos, diarrea, decaimiento, inapetencia nueva o debilidad inusual. | **Llama de inmediato** al veterinario para recibir indicaciones antes de continuar. Si se desploma o le cuesta respirar, urgencias. F7. |
| Sed claramente mayor o nueva, con más orina o escapes, y sin signos de urgencia. | **Contacta hoy** para orientar la consulta y adelantar la revisión. Mantén el acceso al agua y anota los cambios. F6 para sed y plazo, F2–F3 para orina y escapes. |

### FAQ basada en preguntas observadas

| Consulta literal observada y mercado | Pregunta propuesta | Puntos de respuesta |
|---|---|---|
| «por qué se da el síndrome de cushing en perros» · ES/MX | ¿Por qué aparece el síndrome de Cushing en perros? | Resumir los tres orígenes en lenguaje común, enlazar al eje. F1, F2. |
| «como se diagnostica cushing en perros» · ES/MX | ¿Cómo se diagnostica el Cushing en perros? | Historia, exploración y pruebas veterinarias adecuadas; conservar la utilidad de la pregunta sobre el abdomen en la misma respuesta. F3. |
| «como se controla el cushing en perros» · ES/MX | ¿Cómo se controla el Cushing en perros? | Manejo según origen y revisiones, registro de cambios, sin dosis. F1, F7. |
| «cuánto vive un perro con el síndrome de cushing» · MX, «cushing esperanza de vida» · ES | ¿Cuánto puede vivir un perro con Cushing? | Pronóstico individual, enlazar al H2 y evitar una cifra aislada. F9. |
| «el cushing en perros es mortal» · ES, «síndrome de cushing en perros es mortal» · MX, «como es la muerte por cushing en perros» · ES/MX | ¿Puede ser grave el Cushing y cuándo debo pedir ayuda? | Responder directamente que puede haber complicaciones graves y que la evolución varía. Llevar al H3, referir urgencias claras y confort con el veterinario. F3, F6, F8. |

## 7. Conversión editorial

Acciones de lectura: preparar consulta con la descarga y conversar sobre confort con la calculadora y el pilar. Sin afiliación ni captación de datos.

## 8. Dirección visual y prompts de generación

**Identidad.** El hero publicado muestra un cocker spaniel senior dorado, orejas largas onduladas, hocico claro y cuerpo compacto, de pie en una consulta domiciliaria. Derivar el perro de ese hero. Del recorte aprobado del baño se toma el acabado realista, la edad visible, el cuerpo entero y el borde limpio; su dogo de pelo blanco corto y su postura no se trasladan al cocker. Referencias recientes cotejadas con el registro visual y las rutas de recursos: beagles de «Perro viejo se cree cachorro», beagle de «Picadura de abeja» y perro de aguas español de «Procesionaria del pino». Se repite el cocker dentro del mismo artículo para continuidad editorial. Ambas referencias de Cushing y baño se inspeccionaron a 400 y 390 px respectivamente.

**Paleta y archivos.** Etalonaje natural, ámbar apagado para señal hormonal, terracota para hígado y músculo, rosa ciruela para glándulas, gris azulado para vías urinarias y verde salvia para apoyos. Verificar contraste contra las superficies del tema y usar etiquetas, formas y contornos además de color. Imágenes 2D con canal alfa real, sin cuadrícula falsa ni halos. Originales PNG 1200 × 675 o mayores en la proporción indicada, conservar los originales. Archivos de publicación WebP versionados en `public/images/blog/sindrome-cushing-perros-mayores/`. Todos los nombres de la sección son propuestos. Las etiquetas se componen fuera de las imágenes.

### 8.1 Eje del cortisol · perro base y capas

**Vista.** Perfil lateral izquierdo con cabeza a la izquierda, de pie, cámara ortográfica a la altura del tronco. Permite unir base del cerebro, abdomen y pelvis y leer pelo y masa muscular en móvil. La vista ventral de cuerpo entero facilita distinguir ambos lados, pero acorta el recorrido visual y solapa estructuras profundas con las ventrales. Usar solo un detalle dorsoventral con orientación explícita para comparar el par de suprarrenales. En el perfil, mostrar el lado lejano con contorno tenue y un recuadro de detalle si hay solapamiento. Indicar que es una proyección simplificada, sin desplazar órganos para hacerlos caber.

**Prompt base · `cocker-senior-perfil-eje-cortisol-v1.webp`.** A partir del hero, genera el mismo cocker spaniel dorado senior, compacto, orejas largas onduladas, canas claras en hocico, cejas y párpados, ojos algo hundidos y párpados suavemente caídos, lomo suavizado y menos tono en hombro y cuartos traseros. Apoyos prudentes y cuatro patas asentadas, cabeza a la altura del lomo o un poco más baja. Sin heridas, cojera, velo ocular ni delgadez extrema. Perfil lateral izquierdo estricto mirando a la izquierda, cuerpo entero dentro de x=8–93 % e y=10–88 %, suelo sugerido por apoyos sin dibujar el entorno, cámara ortográfica. Luz suave desde arriba a la izquierda, detalle de manto natural a todo foco. Recorte editorial realista con exterior legible y tronco semitransparente de densidad suave, sin corte abierto ni órganos incorporados. Lienzo 16:9 1200 × 675, alfa transparente. Rechazar si a tamaño móvil parece un adulto joven.

**Registro común de capas.** Receta obligatoria para cada prompt de la tabla: «Usa el PNG base como referencia de escala y perspectiva, mismo lienzo 1200 × 675 y misma orientación. Genera únicamente la capa indicada en dibujo médico 2D de acabado mate, luz suave desde arriba a la izquierda y fondo alfa transparente. Conserva el origen del lienzo y escala del perro. Sin animal visible en la capa, texto, líneas de llamada, sombra externa ni órganos ajenos». Registrar anclas normalizadas sobre el recorte final: base del cráneo, diafragma, margen lumbar, polos renales craneales y entrada pélvica. La posición se decide con las referencias F1/F4 y se registra en el montaje final. Comprobar encaje primero en PNG superpuesto. Si se optimizan los recortes por caja alfa, conservar sus offsets y escala relativos al lienzo. Generar las capas una a una a partir de la misma referencia. Si el modelo desplaza órganos, corregir alineación por traslación/escala uniforme del recurso y regenerar si falla la forma o perspectiva.

| Capa y nombre | Instrucción específica que se añade al prompt común | Texto equivalente de la capa |
|---|---|---|
| `capa-hipofisis-canina-v1.webp` | Pequeña glándula oval rosa ciruela en la base del encéfalo dentro del cráneo, sin situarla en el hocico o la garganta. Usar detalle ampliado separado si la forma real resulta ilegible. | «Hipófisis, en la base del cerebro». F1. |
| `capa-suprarrenales-caninas-v1.webp` | Dos glándulas pequeñas y separadas del tejido renal, una cerca del extremo craneal de cada riñón, medial o craneomedial según el lado. Rosa ciruela más oscuro. Vista lateral coincidente con riñones, lado lejano tenue mediante el montaje. | «Suprarrenales, cerca del extremo de cada riñón que mira hacia la cabeza». F1, F4. |
| `capa-rinones-caninos-v1.webp` | Dos riñones en región lumbar dorsal, derecho más craneal, gris azulado oscuro; mostrar relación de profundidad con el lado lejano. | «Riñones dorsales, como referencia para ubicar las suprarrenales y explicar la producción de orina». F4, F2. |
| `capa-higado-canino-v1.webp` | Hígado lobulado terracota en abdomen craneal justo detrás del diafragma, bordes suaves, sin hígado humano ni textura de lesión. | «Hígado, en la parte delantera del abdomen; puede aumentar de tamaño». F4, F2. |
| `capa-vejiga-canina-v1.webp` | Saco pequeño gris azulado con llenado moderado y aspecto simple, caudoventral junto a la entrada pélvica. | «Vejiga, hacia la pelvis; el perro puede producir más orina». F4, F2. |
| `capa-musculo-canino-v1.webp` | Zona muscular superficial del muslo y el lomo lateral, terracota suave con textura de fibras muy discreta, contenida en el cuerpo. | «Músculo; puede perder masa y fuerza». F2. |
| `capa-piel-pelo-cocker-v1.webp` | Dos muestras alineadas y recortadas al flanco del mismo cocker spaniel dorado senior: piel superficial beige y hebras doradas; sutileza clínica, sin lesión ni sangre. | «Piel y pelo; la piel puede afinarse y el pelo puede caer». F2. |

**Vista estática del eje · `eje-cortisol-perro-mayor-esquema-v1.webp`.** Derivar de los PNG validados a 1200 × 675 y alfa, sin volver a generar anatomía. Componer las mismas capas con focos visibles y recorrido trazable. Anotar en HTML el orden y la explicación de variantes. Alt de la figura «Cocker spaniel mayor de perfil con la hipófisis en el cráneo, las suprarrenales junto a los riñones y el resto de las zonas señaladas». Capas ornamentales dentro de la misma figura con alt vacío y fuera del árbol accesible, equivalentes textuales de la tabla en pie/pasos. Exponer el nombre y la función de cada foco relevante en HTML.

#### Guion de tres pasos y tres orígenes

| Estado | Hipofisario | Suprarrenal | Por corticoides |
|---|---|---|---|
| 1 · Hipófisis y ACTH | Resaltar base del encéfalo. Una flecha «ACTH» va de hipófisis a ambas suprarrenales. La ACTH viaja por la sangre y la señal puede ser excesiva. | Atenuar la flecha hipofisaria. El exceso empieza en la suprarrenal y la ACTH propia puede ser baja. | Atenuar ruta de ACTH. Etiqueta externa «Corticoides administrados», sin representar pastilla ni recomendar una pauta. |
| 2 · Suprarrenales y cortisol | Foco en ambas glándulas y flecha «Cortisol» hacia circulación. | Foco en una glándula como ejemplo de tumor productor de cortisol. La otra se conserva como referencia. | Foco en la entrada de glucocorticoides externos. La producción propia puede disminuir. Nunca dibujar una flecha de exceso de cortisol desde las suprarrenales en esta ruta. |
| 3 · Manifestaciones | Foco sucesivo o conjunto en músculo, piel/pelo, hígado y sistema urinario. Pérdida muscular, alteraciones de piel/pelo, posible hígado aumentado y más orina/sed. | Mismas manifestaciones posibles con señal «Cortisol». | Mismas manifestaciones posibles con señal «Efecto de los glucocorticoides». |

Foco urinario compartido y flechas con sentido explicativo, sin representar vasos, movimiento de órganos ni daño renal o vesical. «Eje del cortisol» identifica la secuencia didáctica simplificada. F1–F4. Botones nativos «Hipofisario», «Suprarrenal», «Por corticoides» con nombre de grupo y estado `aria-pressed`; al cambiar origen, volver al paso 1 y quedar en pausa. «Anterior», «Siguiente», «Reproducir/Pausar» y «Repetir» junto a la figura, indicador «Paso n de 3», foco constante. Listo en paso 1 sin autoplay. Una reproducción finita de 3 pasos de unos 3 s cada uno, transición de 150–250 ms; pausa conserva estado, navegación manual pausa y último paso detiene. Repetir es una acción explícita que vuelve al inicio. Detener temporizador si se oculta la pestaña o se desmonta, sin reanudación automática. Cambios manuales con anuncio breve, sin leer en voz alta cada avance automático. Con movimiento reducido, sin interpolación ni reproducción automática/temporizada, vista estática y pasos manuales. Sin JS o al imprimir, figura estática y texto de los tres orígenes completo.

### 8.2 Comparación exterior y suprarrenal

**Prompt exterior · `cocker-senior-silueta-referencia-v1.webp` y `cocker-senior-cambios-posibles-cushing-v1.webp`.** Editar en dos pasadas desde el cocker spaniel dorado senior del hero, mismas orejas largas y onduladas, escala y apoyos. Canas en hocico, cejas y párpados, ojos algo hundidos y mirada serena, lomo suavizado y menor tono natural de hombros y cuartos traseros, cabeza cerca de la altura del lomo. Sin heridas, cojera, emaciación ni sufrimiento escenificado. Perfil lateral mirando a la izquierda, patas completas en el mismo plano, imagen realista 2D, luz difusa superior izquierda, detalle a todo foco, alfa limpio; 4:3 1200 × 900 por panel, línea de apoyo y contorno de cabeza idénticos. Pasada A: perro mayor de referencia, contorno adulto mayor y pelo uniforme. Pasada B: mantener el sujeto y cambiar solo tres rasgos moderados posibles definidos por F2, menor volumen en lomo/muslo, abdomen más péndulo, pelo ralo en el flanco con piel íntegra. Rechazar si a tamaño móvil parece un adulto joven. Alt A «Cocker spaniel mayor de perfil, con contorno de referencia». Alt B «El mismo cocker ilustrado con menos volumen muscular, abdomen más péndulo y pelo ralo en el flanco». Rótulos HTML «Referencia sin esos cambios» y «Cambios posibles con Cushing». Alineación lado a lado cuando quepa; a 320 px apilar si las etiquetas o el contraste visual se degradan.

**Prompt suprarrenal común.** Ilustración médica 2D de ambos riñones y las dos suprarrenales en detalle dorsoventral, craneal arriba, izquierda del perro marcada después en HTML y orientación constante en los tres paneles. Mostrar riñón derecho algo más craneal y glándulas junto al polo craneal y hacia medial según lado, separadas del tejido renal. Riñones gris azulado, glándulas ciruela mate, luz suave homogénea, alfa transparente, 4:3 1200 × 900 por panel. Clavar posición y tamaño renal con el mismo archivo maestro en las tres ediciones. Sin cortes, cifras, reglas, texto ni aspecto de ecografía. Añadir a ese prompt una sola variante por generación:

| Archivo y variante | Cambio pedido | Alt |
|---|---|---|
| `suprarrenales-caninas-referencia-v1.webp` | Mantener las dos pequeñas, con leve asimetría anatómica. | «Dos suprarrenales pequeñas junto a los riñones». |
| `suprarrenales-caninas-aumento-bilateral-v1.webp` | Aumentar moderadamente el tamaño de las dos glándulas, conservar contorno y ligera asimetría, sin cambiar los riñones. | «Las dos suprarrenales aparecen agrandadas en el esquema». |
| `suprarrenales-caninas-masa-unilateral-v1.webp` | Mostrar una masa localizada en una suprarrenal y la opuesta pequeña y visible, como variante ilustrativa, sin invasión escenificada. | «Masa en una suprarrenal, con la glándula opuesta pequeña». |

Rótulo visible bajo ambas comparaciones: «Esquema orientativo; no sirve para diagnosticar». Los pies explican la variación real y el papel de las pruebas. Revisar que el patrón de dos glándulas grandes se lea sin usar solo el color. F2–F5.

### 8.3 Infografía de alerta

**Prompt · `senales-alerta-cushing-perros-iconos-v1.webp`.** Crear una hoja 4:3 de 1200 × 900 con tres viñetas 2D sin texto, centradas a la misma escala en una cuadrícula fija de tres celdas de 400 × 900 que permita recortes individuales. Objetos inequívocos de triaje: teléfono de llamada urgente con acento terracota; teléfono junto a un envase de medicación cerrado, sin marca, en ámbar; cuenco con agua junto a una libreta sin texto, con acento verde salvia. Vista de tres cuartos compartida, luz superior izquierda, materialidad sobria, contornos legibles, alfa real, margen de 12 % dentro de cada celda. Sin perros, manos, pastillas expuestas, síntomas escenificados ni indicaciones clínicas dibujadas. Mostrar junto a los tres rótulos vivos de la tabla del §6, apilados en móvil y en ese orden. Alt vacío para iconos redundantes. Si se ofrece una imagen compuesta para búsqueda de imágenes, derivar el archivo `senales-alerta-cushing-perros-triaje-v1.webp` a partir de las viñetas y el texto validado, 1200 × 900 con alfa; alt «Tres niveles de actuación ante señales en un perro con Cushing: urgencias, llamada inmediata durante trilostano o consulta hoy». Equivalente completo en la tabla HTML. Ninguna acción crítica depende de leer el texto rasterizado.

### 8.4 Hoja de registro descargable

**Maqueta · `/descargas/hoja-registro-cushing-perros.pdf`.** Modelo HHHHHMM comprobado en web: cabecera de marca, ficha breve, aviso clínico destacado, matriz por fechas y hoja de instrucciones. Tomar ese orden y hacerlo imprimible en A4 y Carta con márgenes seguros y legible en blanco y negro. Página 1: identificación opcional del perro y fecha inicial, contacto veterinario para completar en papel, siete columnas de fecha y filas de agua (cantidad aproximada si puede medirla, sin reducir acceso), orina (salidas, volumen aparente, accidentes o esfuerzo), apetito, jadeo (reposo, duración/contexto), peso si es seguro medirlo, medicación (nombre y hora, registrar lo administrado y la pauta indicada), y espacio de notas. Página 2 si hace falta: ejemplo de formato de anotación sin caso clínico y cómo llevarlo a consulta. Aviso visible de urgencias según F6 y llamada por intolerancia según F7. Sin puntuación HHHHHMM ni interpretación de dosis. Tipografía seleccionable, idioma es, orden de lectura y encabezados de tabla etiquetados. Sin imágenes decorativas. Ancla visible «Descargar la hoja de registro de Cushing (PDF)» bajo la tabla doméstica, con tamaño real si se informa. En Markdown incluir el enlace y la lista de observaciones. El enlace hace de equivalente textual, sin alt artificial. Responsable futuro: sesión de implementación.

## 9. Contrato de entrega y peso

| Recurso incremental | Tope objetivo transferido |
|---|---:|
| Perro base del eje, variante cargada | 95 KiB |
| Siete capas juntas | 70 KiB |
| Estática del eje, solicitada solo donde se use | 105 KiB |
| Comparación exterior, los dos paneles | 110 KiB |
| Comparación suprarrenal, los tres paneles | 75 KiB |
| Infografía, incluidas variantes efectivamente solicitadas en la misma carga | 60 KiB |
| JS y CSS locales, comprimidos | 15 KiB |
| PDF, únicamente por clic | 160 KiB |

Techo de **530 KiB** de web adicional aun contando eje y alternativa estática juntos, PDF aparte. Objetivo de carga inicial antes de acercarse a los apoyos, hasta **15 KiB** adicionales de código comprimido; diferir recursos bajo el pliegue. No solicitar todas las variantes de tamaños ni precargar PDF. WebP transparente de 400/800/1200 según ancho renderizado y densidad, con las capas usando la misma geometría en todas las variantes. Medir transferencia real con caché fría a 390 px y escritorio y documentar decodificación. Si no se cumple, reducir variantes, peso o detalle superfluo con revisión visual, manteniendo la información anatómica.

Trazabilidad mínima a marcar en auditoría: [ ] origen y eje F1–F4; [ ] comparación exterior F2; [ ] suprarrenales F3–F5; [ ] tabla, infografía y PDF F2/F3/F6/F7; [ ] pronóstico y final de vida F2/F3/F6–F9; [ ] preguntas F1–F3/F7–F9. Confirmar los tres tipos de AlertBox, las referencias de origen al lado de cada afirmación, la voz neutra, la posición de la reserva de Luna y el arco práctico del §2. El inventario conserva el estado publicado de la ficha existente.

## 10. Criterios de aceptación para implementación y auditoría

- Verificar a **320, 390 y 1366 px**, cada uno en claro y oscuro. Capturas de los estados representativos, alturas de cada recurso a 390 px (objetivo ≤900 px por apoyo inicial, figura, controles y paso activo juntos), igualdad de `scrollWidth` y ancho de ventana, comparación y tabla apilables, orden de lectura, fuente y leyenda legibles. A 1366 px acotar ancho de contenido.
- Contraste de texto normal ≥4,5:1, controles y foco ≥3:1 respecto de adyacentes, etiquetas y formas redundantes con color, botones de al menos 44 × 44 px, foco visible y orden lógico. Ensayar Tab, Enter y Espacio, lectores de pantalla, estados de origen y avance. Validar ampliación de texto y ausencia de solapamientos.
- Revisar cada perro a tamaño grande y a 390 px, por separado, con notas sobre los cinco rasgos senior, apoyos, identidad y alfa. Revisar anatomía y alineación de cada capa y comparación con F1/F4 y criterio veterinario. Un hallazgo ilustrado puede sugerir una consulta. Solo las pruebas contextualizadas orientan el diagnóstico.
- Probar pausa, último paso, repetición, cambio de causa, pestaña oculta y retorno, sin duplicar temporizadores. Probar movimiento reducido desde arranque y al cambiar preferencia, sin JS e impresión. La misma información y todos los plazos deben seguir accesibles.
- Ejecutar `npx astro build`, `npx astro check` sin errores nuevos y control de tono en el MDX. Abrir HTML público de vista previa y su proyección Markdown con la negociación vigente del repo y cotejar el documento generado `/agent-content/v1/documents/article--sindrome-cushing-perros-mayores.md`. Cotejar encabezados, pasos por origen, aviso de esquemas, filas de triaje, FAQ, alts significativos y enlaces, sin controles huérfanos ni texto duplicado. Comprobar que no se emite la reserva de fase 3.
- Comprobar URL, tipo y apertura del PDF, texto seleccionable, impresión en ambas hojas, legibilidad a 100 % en escala de grises y espacio para escribir. Abrir enlaces internos y decodificar variantes de imágenes. Versionar sustituciones y revisar `public/_headers`. Guardar evidencias futuras en `docs/contenido/sindrome-cushing-perros-mayores/`.

## 11. Recursos, riesgos y decisiones pendientes

Eje y estática (§8.1), dos comparaciones (§8.2), tabla e infografía (§6/§8.3) y registro PDF (§8.4) quedan **planificados** para la sesión de implementación. Su aceptación exige los archivos y pruebas de §10. Abrir y verificar los destinos de paliativos y HHHHHMM en la vista previa y tras el despliegue autorizado.

- La búsqueda sobre muerte puede leerse como un reloj clínico. Revisar el H3 y la FAQ con atención a lenguaje de posibilidad, confort, urgencia y conversación sin presión. Duda para el propietario: disponibilidad de revisión veterinaria del triaje, la eutanasia y las capas anatómicas antes de publicar. Acreditarla solo si ocurre.
- La ilustración comparativa puede confundirse con una prueba diagnóstica. Evaluar leyendo la figura aislada y junto a su pie. Pedir al propietario que valide el cocker y la claridad de ambas comparaciones en la revisión visual futura.
- La proyección lateral puede llevar a superponer o intercambiar glándulas. Revisar referencias antes de trazar flechas y mantener visible el recuadro con orientación si el solapamiento lo exige.
- GSC puede tardar más en consolidarse o dar pocas consultas de esta URL. Decisión del propietario al cierre: fecha concreta de publicación tras la comparación, con preferencia por cuatro semanas completas.
- Confirmar en fase 3 qué hechos y fotos de Luna desea aportar el propietario y su consentimiento para publicarlos. La reserva admite ese recuadro dentro del H2 existente.
