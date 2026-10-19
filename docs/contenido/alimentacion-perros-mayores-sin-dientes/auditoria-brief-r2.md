# Auditoría independiente del brief — ronda 2 de 3

Fecha: 2026-10-19. Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`. SHA256 comprobado: `accdd752038ed26bd5d30971bfecefe8237c26562c9262f23196fa449e8cf79c`.

Auditor independiente sin intervención en creación/corrección. Leídos el brief completo estable, informe R1 y registro de corrección; los arreglos se comprobaron contra el documento, no solo contra el reporte del corrector. Esta es la segunda ronda del brief; no hay rondas adicionales ni auditoría del artículo iniciada.

## Veredicto

**APTO / Válido para redacción:** los tres hallazgos R1 están resueltos y el contrato conserva fuentes verificadas, utilidad diferenciada y gates concretos para el artículo completo.

La aprobación corresponde a planificación, no al artículo, sus recursos ni publicación. No certifica el plan adjunto ausente: el alcance sigue siendo el tema explícitamente encargado y la entrada del inventario.

## Hallazgos y resolución

Sin P0, P1 ni P2 abiertos.

| Hallazgo R1 | Comprobación independiente sobre la versión R2 | Resultado |
|---|---|---|
| P1.1: tres cajas totales y falta de contrato del cuarto cuadro | Sección 6, conclusión, y sección 9.3 exigen tres cajas clínicas y cuarta `info` «Fuentes científicas y de autoridad», seis entradas con título real enlazado y nota de responsabilidad, antes del FAQ final | Resuelto; mantiene info/danger/warning del cuerpo |
| P1.2: controles y alternativas incompletos de la secuencia | Secciones 6 H2 3, 8, 9.5 y 11 especifican anterior/siguiente, reproducir/pausar/repetir, reproducción finita opcional, sin autoplay, pausa del avance/movimiento, limpieza al ocultar/navegar/desmontar, sin inicialización duplicada, foco y 44 px; todos los pasos sin JS y en impresión con/sin JS; consulta manual sin transiciones con reduced motion | Resuelto; criterios futuros de aceptación, no pruebas fingidas del recurso |
| P2.3: mecanismo de declaración IA del hero | El frontmatter incorpora «Ilustración generada con IA» en `heroImageAlt`. El contrato exige comprobar `figcaption`; volví a leer el layout real, que imprime ese valor como pie visible y alt | Resuelto sin duplicar imagen ni añadir campos no admitidos |

La autoría se mantiene en `ArticleByline`, presente en el layout real. No se exige firma manual duplicada por una referencia histórica obsoleta. `Borrador` no evita generar rutas; la entrega autorizada sigue limitada a rama/PR, sin fusión/despliegue.

## Verificación de fuentes

Las seis fuentes, afirmaciones, asignaciones y límites no han cambiado respecto de R1. En R1 las abrí de forma independiente mediante solicitudes nuevas, leí documentos y contrasté autores/fechas/pasajes. Para R2 reutilizo **mi propia verificación del mismo día**, conservada en `verificacion/auditor-fuentes-brief-r1.md` y en el registro fuente→afirmación de `auditoria-brief-r1.md`; no atribuyo aperturas de red nuevas a esta ronda. Volví a contrastar el registro del brief R2 con esos pasajes e identificadores. Ninguna validación depende únicamente del checklist del creador o del corrector.

| Fuente e identificador profundo (sección 3 del brief) | Afirmación / localización comprobada en R1 y ratificada para contrato R2 | H2 / resultado y límite |
|---|---|---|
| F1 WSAVA Global Nutrition Committee, Guidelines on Selecting Pet Foods, actualización 10-03-2021; PDF Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf | «What to look for on a label»: dieta completa/complementaria y calorías por gramo/ración | H2 2: verificada; no marca ni dieta universal |
| F2 Freeman y equipo WSAVA, Nutritional Assessment Guidelines, JSAP junio 2011; PDF WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf | Extended Evaluation: ingesta/masticación/deglución; Evaluate homemade foods: formulación profesional; MONITORING: ingesta, condición, signos GI y actividad | H2 2/3/5: verificada; sin proporciones/plazos universales; procedimiento doméstico identificado como síntesis editorial condicionada |
| F3 Niemiec y colaboradores, Guías Dentales WSAVA, traducción española sin año afirmado; PDF WSAVA-Dental-Guidelines-Spanish.pdf | Sección 2 tabla 1: cambio de duro a blando, masticación unilateral, hipersalivación, sangre; párrafo previo sobre observación del dolor oral | H2 1: verificada; signos posibles, no diagnóstico |
| F4 Barnes, Hunter y Downing, VCA Megaesophagus, actualizado 28-05-2024; /know-your-pet/megaesophagus | Tratamiento: consistencia individual y posible aspiración con licuado; diagnóstico: signos respiratorios | H2 1/3: verificada; no equiparar falta de dientes a megaesófago ni prescribir postura |
| F5 Weir, Hunter y Barnette, VCA Post-Operative Instructions in Dogs, actualizado 18-09-2025; /know-your-pet/post-operative-instructions-in-dogs | Instrucciones posoperatorias individuales y apartado de alimentación | H2 1: verificada; cirugía general, no días ni cantidades tras extracción |
| F6 FDA, Tips for Safe Handling of Pet Food and Treats, actualizado 23-05-2024; /animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats | Preparing/Storing Pet Food: utensilios limpios, refrigeración pronta o descarte de húmedo sobrante | H2 4: verificada; no vida útil universal del alimento modificado |

La tabla R1 conserva las URL completas y la evidencia propia conserva sus hashes y extractos mínimos. No PMID/DOI añadido ni estudio clínico inventado. Todas tienen uso nominal y dato que desarrollar; cada H2 científico tiene respaldo. Los límites de acceso exploratorios excluidos no se convierten en bibliografía.

## Contrato, utilidad y procedencia

- Recuento nuevo: seoTitle **44**, meta descripción **138**; enum vigente `alimentacion-perros-senior`, frontmatter admitido, rutas sin caracteres problemáticos.
- Suma comprobada nuevamente: **150+350+400+400+250+300+350 = 2.200**; rango **1.870–2.530**. Distribución y extensión justificadas por decisiones distintas, sin relleno ni requisito de AdSense. El conteo real final se comprobará en el artículo.
- Guía sin caso, imágenes IA identificadas y sujeto beagle senior consistente en los tres prompts. No experiencia, diagnóstico, revisión veterinaria ni desenlace ficticio. Restricciones clínicas íntegras: no recetas/proporciones universales, no dosis, no alimentación forzada, no presumir que licuar evita aspiración.
- Valor propio conservado: distinguir tres situaciones clínicas, comparar presentaciones conservando adecuación nutricional y registrar alimento base/tolerancia. No duplica la guía de dieta casera o de salud dental.
- Nuevo contraste del inventario/archivos: pilar real, comida casera y salud dental publicados `[x]`; segundo spoke documentado como pendiente. Nuevo tema `[~] (En Briefing)`. Calculadora no obligatoria por pilar.

## Recursos prometidos y pruebas pendientes del artículo

| Recurso | Ruta/destino previsto | Estado legítimo del brief / prueba final exigida |
|---|---|---|
| Hero y dos escenas | `/images/blog/alimentacion-perros-mayores-sin-dientes/`, nombres sección 8 | Planificados; inspección anatomía/edad/continuidad, IA visible, alt, decodificación, dimensiones y variante responsive |
| Matriz tres situaciones | H2 1, HTML artículo | Planificada; orden de lectura, móvil, sin JS, equivalencia con decisiones del texto |
| Secuencia tres pasos | H2 3, componente integrado | Planificada; controles, foco, pausa efectiva, reproducción finita, limpieza, reduced motion, todos los pasos sin JS e impresión con/sin JS |
| Registro imprimible | H2 5, HTML artículo | Planificado; etiquetas/campos útiles, impresión legible de una página, botón funcional y respaldo sin envío de datos |
| Enlaces internos | Tres destinos sección 5 | Identificados y contrastados con inventario/archivos; abrir rutas locales finales para comprobar contenido |

No se ejecutaron pruebas del producto final para aprobar esta planificación. El contrato exige móvil/escritorio, claro/oscuro, teclado, contraste, zoom/reflujo, proyección Markdown y build, además de funcionamiento real de los recursos. Su cumplimiento será auditado en el artículo completo con numeración propia continua máxima de tres rondas, sin ocultar revisiones de recursos.

## Efecto cascada

Los conflictos de componentes se resolvieron antes de autorizar redacción; no hay error bibliográfico heredable que buscar en otros briefs. El brief queda aprobado sin necesidad de tercera ronda. Producir imágenes no reabre este documento por rutina; solo un fallo nuevo que afecte al contrato justificaría reabrirlo conservando el contador.

## Lo que sí funciona

Conservar la distinción entre modificar textura y formular dieta, los límites explícitos de VCA, la contingencia honesta del spoke y el registro de alimento base separado del agua añadida. El lector recibe criterios para actuar y consultar sin simulación de un caso ni promesas de recuperación.

## Qué corregir, en orden

Nada pendiente para el brief. Puede pasar a redacción y producción con este contrato aprobado. La autorización para guardar artículo y entregar PR no equivale a autorización para fusionar o desplegar.
