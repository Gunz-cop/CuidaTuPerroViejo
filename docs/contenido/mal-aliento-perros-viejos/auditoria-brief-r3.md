# Auditoría independiente del brief — ronda 3 de 3 (última)

- Fecha: 2026-10-22.
- Auditor: `/root/auditor_brief`; autor/corrector: `/root/autor_brief`. El auditor no ha corregido producción.
- Documento: `briefings/briefing-mal-aliento-perros-viejos.md`.
- SHA-256 comprobado: `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`.
- Historial: [r1 NO APTO](auditoria-brief-r1.md), [r2 APTO](auditoria-brief-r2.md). Reapertura por defectos de origen detectados en [artículo r1](auditoria-articulo-r1.md), sin reiniciar contadores.
- Alcance: correcciones de contrato y conservación de requisitos. No cierra el artículo ni sus pruebas integradas.

## Veredicto

**APTO — Válido para continuar la redacción y corrección del artículo:** el contrato expresa correctamente la indicación de dolor y encarga un frontmatter compatible con el catálogo real.

Esta es la tercera y última ronda del mismo brief. La aprobación corresponde al hash indicado; no habilita una cuarta ronda ni un contador nuevo. El artículo mantiene su contador independiente vigente de hasta tres rondas, incluida su revisión provisional ya emitida.

## Hallazgos y cierres

### P1 de origen: dolor intenso o constante — cerrado

He abierto de nuevo por mi cuenta [Merck, «When to See a Veterinarian»](https://www.merckvetmanual.com/multimedia/table/when-to-see-a-veterinarian). La columna de atención inmediata dice «Severe or constant pain», en la fila 37 de la extracción. El brief exige ahora **«dolor intenso o constante»**, tanto en F6 (§3, línea 114) como en la instrucción de urgencias (§6, línea 237).

La disyunción importa: cualquiera de esas características justifica la acción; no exige reunir las dos. Debí detectar en las rondas anteriores que la instrucción resumida «dolor intenso constante» estrechaba lo que decía la fuente. Ese control quedó incompleto en mi aprobación r2; queda corregido y documentado aquí. Los informes anteriores se conservan como historial, no se reescriben.

### P1 de origen: status incompatible con catálogo — cerrado en el contrato

He leído directamente `src/content.config.ts` y `src/lib/assistant/catalog.ts`. El schema aplica `z.string().default('Publicado')`; `getArticleCatalog()` incluye solo entradas con estado indefinido o exactamente `Publicado`. `[slug].astro` genera las rutas de la colección sin usar ese mismo filtro. Por eso una etiqueta editorial personalizada podía generar HTML y quedar fuera del catálogo de clasificación.

El frontmatter encargado omite ahora `status`. Su explicación distingue el default técnico del estado real de publicación, conserva inventario/expediente no publicados y prohíbe tocar el catálogo global. Los archivos de schema y catálogo no tienen cambios locales. Es una corrección acotada, compatible con el código vigente.

**Límite de esta comprobación:** he comprobado el mecanismo por lectura del código, no he ejecutado el build de integración ni atribuyo como propia la ejecución fallida de coordinación. El artículo debe aplicar este frontmatter y repetir build/proyección antes del cierre. El estado de inventario sigue `[~] En Briefing`; no se ha marcado publicado por introducir el default técnico.

### Hallazgo r1 del brief

La definición no respaldada de regurgitación/vómito continúa retirada. El H3 corregido pide describir lo observado, con F1/F7 para el contexto; no se ha reintroducido clasificación doméstica ni tratamiento digestivo.

### Hallazgos nuevos

Ningún P0, P1 o P2 nuevo confirmado en la versión del contrato auditada.

## Integridad y métricas

Se leyó la versión real y el registro de correcciones. Como el archivo aún era nuevo respecto de HEAD, comprobé el cambio completo reconstruyendo **en memoria** la r2: restauré la línea de `status`, su explicación anterior y las dos formulaciones anteriores del dolor. El SHA-256 resultante fue `60a2a79ab94344c766e15fbbf2e598723a431d9b7e357d245c208e033f9f9d0d`, idéntico al de r2. No se escribieron ni restauraron bytes del brief durante esta comprobación. Esto acredita que no existen otros cambios respecto al contrato ya revisado.

| Control repetido mediante Python/lectura real | Resultado |
|---|---|
| `seoTitle` / `metaDescription` | 55 / 148 caracteres |
| Targets por bloque | 200 + 650 + 450 + 900 + 800 + 650 + 800 + 600 + 400 + 550 = **6.000** |
| Rango contractual | 5.100–6.900 útiles, bloques ±15%; bruto y componentes aparte |
| Fuentes | 12; sin referencias ni afirmaciones nuevas |
| Prompts | Tres con la misma ficha completa senior |
| Estructura | Nueve H2, guía sin caso, tres cajas narrativas y cuarta bibliográfica, FAQ siete |
| Enlaces | Mismos cuatro destinos reales del inventario; no nuevos slugs |
| Alcance | Causas, acompañantes, decisiones, consulta y seguimiento; mantiene exclusión de tutorial de cepillado/profilaxis |

## Fuentes y trazabilidad

La [tabla independiente de r1](auditoria-brief-r1.md#verificación-independiente-de-fuentes) conserva identidad, URL profunda, afirmación, localización, H2 y límites de las doce fuentes abiertas personalmente el mismo día. La comparación de hashes demuestra que los únicos cambios clínicos de esta ronda son las dos formulaciones del dolor. **En r3 se reabrió F6; no se afirma haber repetido las otras once aperturas.**

| Fuente / identificador | Afirmación y localización comprobadas | Resultado vigente / H2 |
|---|---|---|
| F1 UC Davis, `halitosis-dogs` | Preguntas de causas y evaluación; boca, biofilm, piel húmeda y posibilidades extraorales | Verificada r1; sin cambios; 2/3/4/6 |
| F2 Merck, `periodontal-disease-in-small-animals` | Etiology/Pathogenesis, Plaque, Clinical Findings, Diagnosis | Verificada r1; sin cambios; 3/6 |
| F3 PDSA, `bad-breath-in-dogs` | Overview/Causes/When to contact: cambio, dieta y consulta | Verificada r1; sin cambios; 1/2/8 |
| F4 Merck, `disorders-of-the-mouth-in-dogs` | Inflamación, labios, lengua, lesiones y biopsia en Oral Tumors | Verificada r1; sin cambios; 3/5/7 |
| F5 Cornell, `dental-disease-and-home-dental-care` | Signs y Treatment: acompañantes, evaluación completa y cuidados posteriores | Verificada r1; sin cambios; 5/6/7 |
| F6 Merck, `when-to-see-a-veterinarian` | Columna inmediata, fila «Severe or constant pain» y signos de alarma | **Reabierta r3; disyunción corregida**; 1 |
| F7 PDSA, `chronic-kidney-disease-in-dogs` | Symptoms y Diagnosis: acompañantes, sangre/orina y pruebas según caso | Verificada r1; sin cambios; 4 |
| F8 Merck, `disorders-of-the-pancreas-in-dogs` | Diabetes Mellitus: signos, evaluación y urgencia de cetoacidosis | Verificada r1; sin cambios; 4 |
| F9 AAHA, `history-and-physical-examination` | Historia, dieta/masticación, exploración integral y pruebas | Verificada r1; sin cambios; 5/6 |
| F10 AAHA Senior 2023, DOI `10.5326/JAAHA-MS-7343` | Identidad/DOI y apartados de anestesia, odontología, objetivos/QOL | Verificada r1; sin cambios; 6/8 |
| F11 FDA, `paws-xylitol-toxic-dogs` | Productos que pueden contener xilitol y llamada ante posible ingestión | Verificada r1; sin cambios; 7 |
| F12 Illinois, `oral-tumors-in-dogs-and-cats` | Risk Factors and Signs/Catch Changes Early: sangre, bultos/llagas y evaluación | Verificada r1; sin cambios; 3 |

Se mantienen los límites: sin diccionario olor→enfermedad, dosis, maniobras domésticas ni falsa certeza por comer o carecer de sarro visible. Las ayudas son síntesis editoriales, no escalas validadas. Ninguna fuente nueva ni falsa revisión veterinaria se añaden para resolver el fallo.

## Recursos comprometidos

| Recurso | Ruta/ubicación contractual | Gate de artículo completo |
|---|---|---|
| R1 referencia/hero | `public/images/blog/mal-aliento-perros-viejos/labrador-senior-observacion-v1.webp` | Anatomía/edad/identidad y variantes decodificadas |
| R2 escena comida | Misma carpeta, `labrador-senior-registro-comida-v1.webp`; H2 5 | Derivación de R1, observación segura, alt/caption y carga |
| R3 conversación | Misma carpeta, `labrador-senior-consulta-v1.webp`; H2 6 | Continuidad; ilustración diferenciada de fotografía clínica |
| R4 prioridades | `HalitosisRecursos.astro`, `prioridad`; H2 1 | Aplicar disyunción correcta; texto/anclas, alturas y contraste |
| R5 proceso | Mismo componente, `proceso`; H2 3 | Biofilm/zona/detalle, controles/pausa/fin, teclado, reduced-motion, noJS/impresión |
| R6 tabla | `TablaApilable` en MDX; H2 7 | Cuatro filas breves, apilado sin desbordamiento |
| R7 registro | Mismo componente, `registro`; H2 5 | Ocho campos plegados, accesibilidad e impresión de valores, sin envío/puntuación |

Este informe conserva los gates del brief y no sustituye la inspección de archivos ni las pruebas del artículo integrado, aunque la producción haya avanzado durante el flujo. No acredita por sí mismo recursos terminados. Deben verificarse 375/390/1366 px, claro/oscuro, interacciones, contraste, anclas, proyección y checks vigentes antes del APTO final del artículo.

## Efecto cascada y lo que funciona

El artículo r1 heredó las dos instrucciones defectuosas del contrato. El auditor de artículo las detectó y remitió correctamente a esta tercera ronda; no es un reinicio. El autor del artículo y el productor visual deben aplicar la formulación del dolor y el frontmatter aprobado. El catálogo global y otros artículos quedan fuera de esta corrección.

Se conserva el enfoque diferenciado, la guía sin caso y la prioridad de consulta antes de causas; el perro ilustrativo no adquiere historia clínica. El volumen sigue ligado a utilidad, con cómputo de bibliografía separado, y todos los recursos mantienen su función y sus pruebas.

## Qué corregir, en orden

No quedan correcciones del brief para esta versión. Aplicar el contrato aprobado al artículo/componentes; completar las pruebas; continuar con la ronda vigente del artículo y cierre integrado independiente. Mantener las evidencias de estado real en inventario y expediente, sin alterar el brief aprobado solo para actualizar etiquetas.

No se ha editado producción ni ejecutado fusión/despliegue. La compatibilidad de código comprobada aquí debe corroborarse con el build completo posterior; la publicación sigue fuera de la autorización de esta tarea.
