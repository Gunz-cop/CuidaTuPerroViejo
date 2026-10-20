# Auditoría independiente del brief v2 — ronda 1 de 3

Fecha: 2026-10-20. Auditor distinto de creación y corrección. No se ha editado el brief, el artículo ni el inventario. Esta serie corresponde al reinicio explícito ordenado por el propietario; no sustituye ni renumera las auditorías de la entrega rechazada.

Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md`.
SHA-256 auditado: `cc0a17cb8d7073424ebf3b72dd1877243e03a73ff187161bc2108f0bf044c91e`.

## Veredicto

**NO APTO / No válido para redacción:** el contrato de conteo exige excluir la bibliografía por un límite H2 que la estructura no define, dejando ambiguo el control principal que motivó este reinicio.

La investigación, las decisiones editoriales y la cantidad de recursos sí resultan suficientes para el nuevo enfoque. El bloqueo es acotado: definir una exclusión de bibliografía inequívoca antes de encargar las 6.000 palabras. No se pide alargar ni reescribir la arquitectura ni inventar fuentes.

## Hallazgos

### P0

Ninguno confirmado. Las catorce URL corresponden al documento atribuido y las afirmaciones centrales se encuentran en los pasajes examinados. No hay PMID/DOI generados de memoria ni historia clínica fabricada.

### P1 — límite de bibliografía incompatible entre estructura y conteo

**Ubicación:** Sección 6, Conclusión (línea 215), frente a Sección 9.1 (línea 270).

La estructura manda una bibliografía dentro de un `AlertBox` antes del FAQ, sin planificar un H2 bibliográfico. El contrato exige excluir «desde el H2 de bibliografía hasta antes de FAQ por sus límites DOM». `AlertBox.astro` produce su título como h3; ese H2 no existe por la instrucción actual. Dos implementaciones fieles podrían incluir la bibliografía en las 6.000 palabras o añadir otro H2 no presupuestado. Dado el motivo del rechazo anterior, el alcance de medición debe ser inequívoco en el brief, sin quedar a una decisión posterior del contador.

**Instrucción para otra sesión:** conservar el `AlertBox` y establecer un envoltorio HTML identificable para toda la bibliografía, por ejemplo `data-editorial-bibliography`, excluido íntegramente del cómputo principal. Definir que los recursos completos usan `data-editorial-visual`, que el FAQ se conserva una vez y que no se requiere crear un H2 bibliográfico. Actualizar de forma coherente Secciones 6, 9 y checklist, sin alterar presupuesto ni artículos ajenos. El script final debe registrar esas exclusiones y selectores.

### P2 — convención explícita del cuadro de fuentes

**Ubicación:** Sección 6, Conclusión, línea 215. La skill de redacción exige el título `Fuentes científicas y de autoridad`; el brief ordena `Fuentes y límites de esta guía` sin documentar una razón funcional para apartarse de la convención. El cuadro existe y tiene la función correcta; no es una falta de bibliografía.

**Instrucción:** usar el título convencional en el contrato y conservar la explicación de límites dentro del cuadro. No añadir un quinto AlertBox.

### P2 — metadatos recuperables al reabrir las fuentes

**Ubicación:** Sección 3, F1/F7/F8, y registro del creador. El creador declaró honestamente lo que no vio en su extracción; **no lo trato como invención**. La apertura independiente recuperó datos adicionales:

- F1 UC Davis: pie «Last update: October 9, 2026». Registrar como actualización de la página, sin afirmar fecha de revisión clínica.
- F7 Merck: autor Ned F. Kuehn; revisión junio de 2018 y actualización septiembre de 2024, visibles sobre el texto.
- F8 VCA: Courtney Barnes, Lorraine Hiscox y Jan Bellows; actualización 26 de abril de 2024 al final del documento. Mantener distinguido del copyright LifeLearn 2024.

**Instrucción:** completar identidad/fechas en el registro y brief con esas distinciones. No añadir años no visibles en F5/F9/F10/F11/F12/F13/F14 ni inferirlos del copyright.

## Verificaciones mecánicas y de alcance

Comprobaciones propias con Python sobre el archivo auditado:

| Control | Resultado |
|---|---|
| seoTitle | 43 caracteres; límite 55 |
| metaDescription | 155 caracteres; límite 160 |
| Suma de targets | 200+600+800+650+700+550+450+650+650+150+600 = **6.000** |
| Rango total | 5.700–6.300 palabras editoriales visibles, más estricto que ±15 % |
| Estructura | Introducción, ocho H2, conclusión y FAQ de ocho preguntas |
| Cajas | Cuatro: info inicial, danger H2 1, warning H2 4, info de fuentes |
| Imágenes | Dos nuevas obligatorias I4/I5; I1/I2 reutilizables, I3 opcional |
| Animaciones | Dos, con procesos y cambios didácticos distintos |
| Estado editorial | En curso en inventario; v1 rechazada; PR en borrador según encargo |

El objetivo de unas 6.000 palabras responde al encargo actual del propietario. No se justifica diciendo que todo el corpus tiene esa longitud: el recuento MDX diagnóstico local da mediana 1.433 y dos artículos largos de 5.996 y 6.620; ese conteo incluye etiquetas y no es el contractual de este brief. No hay requisito de AdSense detrás de la cifra.

### Utilidad distinta por sección

| Bloque | Decisión o aportación que justifica su espacio |
|---|---|
| Introducción | Respuesta temprana y límites de la guía sin paciente |
| H2 1 | Clasificar dificultad oral/deglutoria y reconocer cuándo consultar |
| H2 2 | Comprobar adecuación, energía y cantidad antes de sustituir alimento |
| H2 3 | Comparar presentaciones sin ganador universal ni recetas genéricas |
| H2 4 | Preparar una presentación autorizada conservando identidad de la base |
| H2 5 | Separar cicatrización temporal de alimentación de una boca ya recuperada |
| H2 6 | Conservar producto, lote y utensilios sin plazos domésticos inventados |
| H2 7 | Mantener compatibilidad con otras enfermedades y abordar ingesta insuficiente |
| H2 8 | Convertir observaciones en datos con certeza explícita para una revisión |
| Conclusión/FAQ | Sintetizar y resolver consultas puntuales, sin incorporar nuevas pautas |

La redacción deberá evitar repetir la misma explicación de completo/complementario en H2 2/3/FAQ o las mismas instrucciones de registro en H2 4/8. Es un riesgo de ejecución que el propio contrato ya prohíbe, no un defecto confirmado de una prosa aún no escrita.

## Verificación independiente de fuentes

Abrí las catorce URL profundas con la herramienta web el 20-10-2026. No heredo la verificación del creador ni doy por comprobada una afirmación por HTTP 200. Los localizadores siguientes describen secciones o páginas físicas de los documentos; las líneas del extractor no son paginación editorial. No se han copiado artículos externos al repositorio.

| Fuente e identificador | Afirmación comprobada / localización | Secciones y límites verificados |
|---|---|---|
| F1 [UC Davis: Dentistry and Oral Surgery Service](https://www.vetmed.ucdavis.edu/hospital/small-animal/dentistry-oral-surgery-service) | FAQ sobre alimentación tras extraer dientes: posibilidad de comer habitual/seco, condicionada por tamaño | H2 1/3. No es pauta inmediata posoperatoria ni garantía individual. Página actualizada 09-10-2026. |
| F2 [AAHA: Dentistry](https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/dentistry/) | Párrafos iniciales: dificultad de prehensión/masticación/deglución exige exploración; vídeo del cliente puede ayudar | H2 1/5/8. Guía 2023, página publicada 13-12-2022; vídeo no diagnostica. |
| F3 [Cline y colaboradores: AAHA Nutrition 2021](https://www.aaha.org/wp-content/uploads/2021/06/new-2021-aaha-nutrition-and-weight-management-guidelines-with-ref.pdf) | Portada autores/título; evaluación pp.2–5, planes pp.5–8, enfermedades concurrentes p.11, comunicación pp.11–14, senior pp.17–18 | H2 2/3/4/7/8. Perros y gatos, consenso y evidencia; no fórmula universal ni protocolo hospitalario doméstico. |
| F4 [WSAVA: Guidelines on Selecting Pet Foods](https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf) | PDF completo de una página, etiqueta y preguntas al fabricante: adecuación, etapa, calorías, control | H2 2/3/4. Actualización 10-03-2021. No sello de marcas ni idoneidad universal por ser completo. |
| F5 [FEDIAF: Nutritional needs of cats and dogs](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/nutritional-needs-of-cats-and-dogs/) | Apertura define completo y complementario; el segundo no cubre solo la dieta | H2 2. Fuente industrial identificada, usada para terminología, no eficacia clínica. |
| F6 [Defarges: Dilatation of the Esophagus in Small Animals](https://www.merckvetmanual.com/digestive-system/diseases-of-the-esophagus-in-small-animals/dilatation-of-the-esophagus-in-small-animals) | Signos y manejo: regurgitación y consistencia variable por paciente | H2 1/4. Revisión octubre 2022/actualización mayo 2025. No equiparar a desdentado ni trasladar posturas/medicación. |
| F7 [Merck: Pneumonia in Dogs](https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs/pneumonia-in-dogs) | Introducción y Aspiration Pneumonia: alimentación forzada/deglución alterada y signos respiratorios | H2 1/4. Kuehn, revisión junio 2018/actualización septiembre 2024; no diagnóstico por tos ni tratamiento. |
| F8 [VCA: Oral Surgery in Dogs](https://vcahospitals.com/know-your-pet/oral-surgery-in-dogs) | How will my dog eat after surgery?: blando habitual hasta cicatrización y revisiones | H2 5. Barnes/Hiscox/Bellows; actualización 26-04-2024. No días ni recuperación universal. Hecho clínico breve, sin adaptar su prosa. |
| F9 [FDA: Tips for Safe Handling of Pet Food and Treats](https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats) | Preparing/Storing: lavado tras uso, utensilios limpios, refrigerar o desechar sobrante húmedo | H2 4/6. No plazo específico para papilla/remojado ni inocuidad por aspecto. |
| F10 [FDA: Proper Storage of Pet Food & Treats](https://www.fda.gov/animal-veterinary/animal-health-literacy/proper-storage-pet-food-treats) | Lista de almacenamiento y What to do When There’s a Problem: envase/lote, lavado entre bolsas, detener producto sospechoso y contactar | H2 6/8. Coincidencia temporal no prueba causalidad. |
| F11 [Tufts: Nutrition FAQs](https://vet.tufts.edu/foster-hospital-small-animals/specialty-services/nutrition/nutrition-faqs) | Ingredient list y Feeding Tubes: ingredientes no bastan para valorar dieta; soporte ante ingesta insuficiente | H2 2/7. No trasladar plazos ni protocolo de sondas a casa. |
| F12 [Cornell: Choosing food for your senior dog](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/choosing-food-your-senior-dog) | Introducción, calorías y apetencia: individualización, condición/peso y olor | H2 3/7/8. Excluir dosis, suplementos, marcas y diagnósticos por preferencia. |
| F13 [Cornell: Dental disease and home dental care](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/dental-disease-and-home-dental-care) | Signs y Treatment: signos para contactar y retomar cuidado doméstico según veterinario después de recuperación | H2 1/5. Brian Collins identificado; no higiene sobre heridas ni autodiagnóstico. |
| F14 [FEDIAF: Home Made Diets](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/home-made-diets/) | Apertura y Expert formulated diets: complejidad del equilibrio y plan con nutricionista | H2 3/7. Naturaleza industrial reconocida; sin usar porcentajes de estudio no abierto ni su lista genérica de tóxicos. |

Las frases clínicas del brief son paráfrasis limitadas y compatibles con los pasajes. No se afirma ensayo específico en perros senior sin dientes. El nuevo plan usa sus propios ejemplos aritméticos de organización, expresamente ficticios y no raciones; no toma cantidades de los documentos para prescribir.

## Enlaces, procedencia y política

Comprobados contra inventario y archivos: pilar Alimentación, comida casera, salud dental y chequeo geriátrico. Los tres artículos de destino constan en el inventario de publicados y sus rutas coinciden con `pilar`+slug. Solo existe un spoke previo de Alimentación; la contingencia está documentada sin fabricar segundo enlace. Los puentes a Salud continúan el problema del lector y no reemplazan automáticamente la arquitectura de silos.

Guía sin caso: no se exige ni inventa desenlace. `ArticleByline.astro` muestra responsabilidad editorial real y fecha desde frontmatter; duplicar la antigua firma manual de la skill sería un error en el stack actual. La política del sitio no permite diagnóstico ni prescripción: el contrato excluye dosis, suplementos universales, recetas completas improvisadas, alimentación forzada y plazos posoperatorios genéricos. El valor técnico `status: Publicado` no se interpreta como autorización de despliegue ni como publicación verificada.

## Recursos y gate

| Recurso | Ruta/ubicación prevista | Comprobación propia en esta fase |
|---|---|---|
| I1 hero | Carpeta pública del slug, `beagle-senior-comida-blanda-v1.webp` | Imagen abierta: beagle canoso, cuatro apoyos plausibles, identidad apta como referencia; no prueba de desdentado. Integración final pendiente. |
| I2 e I3 | Carpeta pública, preparación y observación v1 | Reutilización condicionada, I3 opcional. No se certifica nueva inspección de esas dos imágenes en esta ronda de brief. |
| I4 e I5 | Medición y consulta v2, misma carpeta | Planificadas, todavía no generadas; dos imágenes nuevas expresamente obligatorias y prompts coherentes. |
| A1 y A2 | H2 4 y 8, componentes Astro | Cuatro estados por proceso y cambios conceptuales distintos; controles y alternativas definidos. No están producidas. |
| D1/D2/D3 | H2 1/3/2 | Matriz, comparación y ficha semánticas con finalidad diferente; producción pendiente. |
| Registro | H2 8 | Impresión A4, datos preservados, sin envío/almacenamiento; prueba pendiente, sin promesa de descarga ficticia. |
| Lectura PDF | Expediente v2 | Pendiente del conjunto final; animaciones estáticas advertidas y sin despliegue. |

El brief planifica recursos y exige pruebas reales: no necesita que existan ya para aprobar su planificación. Un APTO de brief no equivaldrá a producción visual terminada ni a APTO del artículo.

## Efecto cascada

El artículo v2 no está redactado desde este contrato. Resolver ahora el P1 evita propagar una medición ambigua a redactor, scripts e informe final. El artículo v1 rechazado no hereda un supuesto APTO nuevo ni puede ampliarse para alcanzar el volumen. Los metadatos recuperados no demuestran un error clínico en otros briefs; no se ha identificado atribución falsa que exija intervención en otros artículos.

## Lo que sí funciona

Conservar la respuesta temprana «sin dientes no implica papilla», la separación de cirugía/deglución, la comparación sin ganador, los límites de formulación, el registro con incertidumbre y las dos animaciones distintas. Mantener fuentes secundarias identificadas y no convertirlas en ensayos ni en experiencia propia. Mantener el conteo principal visible excluyendo todos los componentes visuales completos; el recuento MDX heredado es solo diagnóstico.

## Qué corregir, en orden

1. Precisar el marcador y exclusión de bibliografía en las tres secciones del contrato afectadas, sin H2 bibliográfico artificial.
2. Ajustar título convencional del cuarto AlertBox.
3. Incorporar identidad/fechas recuperadas de F1/F7/F8 en brief y registro, distinguiendo actualización web de revisión clínica.
4. Entregar archivo y hash corregidos para **ronda 2 de 3**. No redactar desde la versión aquí auditada. No fusionar ni desplegar.
