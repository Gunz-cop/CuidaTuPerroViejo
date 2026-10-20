# Auditoría independiente del brief — ronda 3 de 3, última

Fecha: 2026-10-19. Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`. SHA256 comprobado: `fb110f500fc009ac86263bd8ca817e361f3f073be6413ae3c5e57d92ec5af0fa`.

Rol exclusivo de auditoría, sin creación/corrección del brief ni producto. Se conserva numeración: R1 NO APTO, R2 APTO, reapertura excepcional R3 por defecto nuevo técnico que afecta al contrato. No hay auditoría del artículo iniciada ni rondas suplementarias del brief.

## Veredicto

**APTO / Válido para redacción e integración:** el estado técnico del contrato ya coincide con el catálogo de proyección, sin autorizar publicación pública ni alterar los requisitos editoriales y visuales aprobados.

Este APTO aprueba el brief; no acredita build final, funcionamiento del artículo o despliegue. El plan adjunto sigue ausente: se revisa el tema explícito solicitado y el inventario, sin simular lectura del adjunto.

## Hallazgos y corrección comprobada

Sin P0, P1 ni P2 abiertos.

El APTO R2 aceptó una etiqueta admitida por schema pero incompatible con la clasificación de proyección. Aquella limitación se corrigió al conocerse el fallo de integración; el informe R2 queda como evidencia histórica, no como prueba de compatibilidad del estado anterior.

Comprobación independiente de esta ronda:

| Evidencia leída | Resultado y efecto |
|---|---|
| `verificacion/build-inicial-borrador.log:71`, SHA256 `4ce6e9c532c981d6247d95836c8387f2c758c4d6ce55e0b2121b42885b4922c3` | Fallo real `UNCLASSIFIED_PAGE` y `SITEMAP_UNEXPLAINED_DIFFERENCE` para la ruta del artículo; no inferido solo del reporte del corrector |
| `src/lib/assistant/catalog.ts:24` | Filtra entradas con estado indefinido o exactamente `Publicado`; el valor previo quedaba excluido |
| `src/content.config.ts:29` | Admite string y usa `Publicado` por defecto; no es un gate de despliegue |
| `src/pages/[pilar]/[slug].astro:13` | Genera rutas a partir de toda la colección sin filtrar estado; explica la divergencia anterior |
| Brief secciones 1 y 9.5 | `status: "Publicado"` solo tras autocontroles antes de guardar en colección; catálogo técnico separado de publicación pública, entrega rama/PR sin fusionar/desplegar |
| Inventario, línea 242 | Tema continúa `[~] (En Briefing)`; no se declara publicado |
| Diff de catálogo/schema/ruta/script de inventario | Sin modificaciones en esos archivos: no se alteró el pipeline para esconder el fallo |

No quedan instrucciones residuales de `Borrador` en el brief. El registro `correcciones-brief-integracion.md` conserva hashes, motivo y separación de roles. No presupongo que cambiar el texto de un brief haga pasar el build del artículo: su integración sigue siendo gate de la auditoría del artículo completo.

## Comprobación de los controles aprobados en R2

Se mantienen tres cajas clínicas y cuarta caja de fuentes antes de las seis FAQ; declaración IA del hero a través del `heroImageAlt` que el layout imprime como pie; secuencia de tres pasos con reproducción opcional finita, anterior/siguiente/reproducir/pausar/repetir, pausa efectiva, limpieza, foco/44 px, reduced motion y todos los pasos sin JS e impresos con/sin JS. Los tres hallazgos R1 siguen resueltos.

Recuento nuevo: seoTitle **44**, descripción **138** caracteres. Target **2.200**, suma **150+350+400+400+250+300+350**; intervalo **1.870–2.530**. Enum y rutas válidos. Conserva guía sin caso, mismo beagle senior ilustrativo, ausencia de credenciales/experiencias inventadas y límites clínicos. Un spoke publicado y puente dental reales; segundo spoke pendiente explícito. Sin calculadora obligatoria en este pilar.

## Verificación de fuentes y trazabilidad

Fuentes/afirmaciones sin cambios. Se reutiliza mi apertura y lectura **independiente R1 del 2026-10-19**, con hashes y extractos en `verificacion/auditor-fuentes-brief-r1.md`; no se afirman consultas de red nuevas en R3. El registro completo fuente→afirmación→pasaje/limitación figura en R1 y fue ratificado en R2. Se contrasta nuevamente que este contrato mantiene esos límites y asignaciones:

| Fuente / identificador profundo de sección 3 | Afirmación y localización de la comprobación propia | H2 / resultado y límites |
|---|---|---|
| F1 WSAVA Guidelines on Selecting Pet Foods (10-03-2021), PDF Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf | What to look for on a label: completo/complementario y calorías por gramo/ración | 2: verificada en R1; no marca ni dieta senior universal |
| F2 Freeman/equipo WSAVA Nutritional Assessment Guidelines (JSAP junio 2011), PDF WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf | Extended Evaluation; Evaluate homemade foods; MONITORING: ingesta/deglución, formulación y observaciones | 2/3/5: verificada en R1; sin ratio agua/pienso ni plazos universales |
| F3 Niemiec/equipo WSAVA Guías Dentales, español sin año afirmado, PDF WSAVA-Dental-Guidelines-Spanish.pdf | Sección 2 tabla 1: preferencia duro→blando y signos posibles de dolor | 1: verificada en R1; no diagnóstico ni causa de desdentamiento |
| F4 Barnes/Hunter/Downing VCA Megaesophagus (28-05-2024), /know-your-pet/megaesophagus | Tratamiento: consistencia individual y aspiración; diagnóstico: signos respiratorios | 1/3: verificada en R1; sin equiparar falta de dientes y megaesófago ni enseñar posturas |
| F5 Weir/Hunter/Barnette VCA Post-Operative Instructions in Dogs (18-09-2025), /know-your-pet/post-operative-instructions-in-dogs | Instrucciones individualizadas y apartado de alimentación tras cirugía general | 1: verificada en R1; no protocolo dental ni cantidades/días importados |
| F6 FDA Tips for Safe Handling of Pet Food and Treats (23-05-2024), /animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats | Preparing/Storing Pet Food: limpieza y refrigeración pronta o descarte de húmedo sobrante | 4: verificada en R1; no vida útil universal de papilla/pienso remojado |

No PMID/DOI inventado, fuente decorativa, caso o resultado clínico añadido. Cada H2 científico conserva respaldo. Cantidades de agua, kcal objetivo, días tras extracción, dosis y alimentación forzada siguen excluidos.

## Recursos prometidos y gate de entrega

| Recurso | Destino previsto | Estado y pruebas todavía exigidas al artículo |
|---|---|---|
| Hero y dos escenas | Carpeta de imágenes/nombres sección 8 | Planificados en contrato; anatomía, edad/continuidad, IA, alt, dimensiones, decodificación/variantes |
| Matriz tres situaciones | H2 1 HTML | Responsive, lectura sin JS y coherencia clínica |
| Secuencia tres pasos | H2 3 componente | Controles y pausa, teclado/foco, reduced motion, limpieza, todos los pasos sin JS e impresión con/sin JS |
| Registro imprimible | H2 5 HTML | Botón funcional, campos/etiquetas, impresión legible de una página y alternativa sin envío de datos |
| Enlaces internos | Tres destinos sección 5 | Abrir contenido local final y confirmar rutas |

El contrato conserva móvil/escritorio, claro/oscuro, contraste, zoom/reflujo, build y proyección Markdown, además de funcionamiento real de recursos. Esta ronda de planificación no sustituye esas pruebas ni el examen independiente del artículo completo.

## Efecto cascada

La corrección afecta al estado técnico de integración del futuro artículo; no modifica fuentes o decisiones clínicas. No justifica revisar otros briefs por fallo bibliográfico. Esta es la última ronda autorizada del brief: no abrir una cuarta ni renumerar; ante otro bloqueo se deberá detener y revisar con el usuario.

## Lo que sí funciona

Se resolvió la divergencia de catálogo usando el contrato compatible, conservando el pipeline y la distinción entre artefacto local y despliegue. Permanecen utilidad práctica, guía sin caso, límites clínicos, continuidad ilustrativa y recursos con pruebas concretas.

## Qué corregir, en orden

Nada pendiente en el brief. Continuar integración y autocontroles del artículo; entregar su versión completa estable con recursos para la auditoría independiente del artículo R1. No fusionar ni desplegar.
