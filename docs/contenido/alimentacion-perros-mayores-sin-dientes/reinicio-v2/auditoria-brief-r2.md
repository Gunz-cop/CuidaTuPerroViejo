# Auditoría independiente del brief v2 — ronda 2 de 3

Fecha: 2026-10-20. Mismo auditor independiente de R1, distinto de creación y corrección. El corrector actuó en contexto separado; este auditor no modificó el brief, el artículo ni el inventario.

Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md`.
SHA-256 auditado: `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208`.
Antecedente: `auditoria-brief-r1.md`, NO APTO, y corrección documentada en `correccion-brief-r1.md`. La serie de la entrega v1 rechazada sigue intacta; este documento pertenece al reinicio explícito autorizado por el propietario.

## Veredicto

**APTO / Válido para redacción:** el contrato define ahora sin ambigüedad las 6.000 palabras editoriales visibles y mantiene cobertura, fuentes, límites y recursos pertinentes para el nuevo encargo.

No quedan hallazgos P0/P1/P2 pendientes de la ronda anterior. Es un APTO de planificación: no aprueba un artículo aún no escrito ni recursos aún no producidos, y no autoriza publicación.

## Cierre de hallazgos de R1

| Hallazgo | Comprobación propia en la versión actual | Estado |
|---|---|---|
| P1: exclusión bibliográfica por H2 inexistente | Secciones 6, 9.1, 9.4 y checklist exigen `<div data-editorial-bibliography>` para excluir la bibliografía completa; prohíben añadir H2 bibliográfico; FAQ fuera y después, contado una vez | Cerrado |
| P2: título del cuadro | Cuarto AlertBox titulado `Fuentes científicas y de autoridad`; explicación de límites dentro, sin quinta caja | Cerrado |
| P2: metadatos F1/F7/F8 recuperables | Tabla de fuentes distingue actualización web UC Davis 09-10-2026, revisión/actualización Merck y autores/actualización VCA; la adenda conserva honestamente la lectura anterior del creador sin reescribirla | Cerrado |

Se conserva la exclusión completa de recursos mediante `[data-editorial-visual]`, de pies/IA, navegación, controles y bibliografía. No se depende de sumar código, props ni textos duplicados de impresión. El conteo DOM final debe comprobar además que el FAQ colapsado se extrae una vez. La herramienta AST preliminar creada por coordinación es un autocontrol, no sustituye la comprobación del DOM ni este juicio editorial.

## Controles mecánicos repetidos

- SHA-256 calculado sobre el archivo actual, coincidente con el entregado para R2.
- Once targets: 200, 600, 800, 650, 700, 550, 450, 650, 650, 150 y 600; suma exacta **6.000**. Rango total **5.700–6.300**; tolerancia por bloque ±15 %, sin compensar omisiones mediante exceso de otro bloque.
- seoTitle **43** caracteres y metaDescription **155**, límites 55/160. Pilar válido `alimentacion-perros-senior`.
- Ocho H2, introducción, conclusión, FAQ final de **ocho** preguntas, cuatro AlertBox según su función.
- Ruta única conservada para sustituir la entrega rechazada; no otro artículo duplicado. Inventario en curso, sin marca de publicación.
- Dos imágenes nuevas I4/I5, dos animaciones distintas A1/A2, tres apoyos estáticos y registro imprimible. I1/I2 son reutilizables tras verificación; I3 es opcional, sin presentar su reutilización como producción nueva.

No se mide aquí un artículo inexistente ni se confunde el recuento de presupuesto con un conteo real final. El objetivo es el del encargo actual, sin atribuirlo a AdSense ni afirmar que todos los artículos históricos tengan esa longitud.

## Fuentes, trazabilidad y límites

En R1 abrí personalmente las catorce URL profundas, comprobé identidad y los pasajes que sustentan las afirmaciones; la tabla completa y localizadores están en `auditoria-brief-r1.md`. Esas lecturas propias siguen siendo la evidencia de esta misma revisión. **No afirmo haber repetido catorce aperturas en R2:** las URL, afirmaciones y asignaciones sustantivas no cambiaron; contrasté los metadatos corregidos con lo que abrí y documenté en R1.

| Fuente | Resultado y uso conservado |
|---|---|
| F1 UC Davis | Verificada; posibilidad de alimentación habitual/seca sin generalizar a cirugía reciente. H2 1/3. Actualización web diferenciada. |
| F2 AAHA Dentistry | Verificada; evaluación ante dificultad oral y vídeo observacional, no diagnóstico. H2 1/5/8. Año de guía distinto de publicación web. |
| F3 Cline/AAHA Nutrition 2021 | Verificada; evaluación, plan individual, dietas concurrentes y seguimiento. H2 2/3/4/7/8. Sin fórmulas universales ni protocolos hospitalarios trasladados. |
| F4 WSAVA | Verificada; adecuación/calorías y fabricante. H2 2/3/4. No sello ni garantía por marca. |
| F5 FEDIAF necesidades | Verificada; terminología completo/complementario. H2 2. Fuente industrial identificada. |
| F6 Defarges/Merck esófago | Verificada; variabilidad de consistencia y distinción de problema esofágico. H2 1/4. Sin manejo postural doméstico. |
| F7 Kuehn/Merck neumonía | Verificada; aspiración/alimentación forzada y signos respiratorios. H2 1/4. Revisión junio 2018 y actualización septiembre 2024 correctas. |
| F8 Barnes/Hiscox/Bellows, VCA–LifeLearn | Verificada; blando habitual durante cicatrización y revisión. H2 5. Actualización 26-04-2024 distinguida del copyright; no adaptación de su prosa. |
| F9 FDA manipulación | Verificada; higiene y sobrantes húmedos. H2 4/6. Sin plazos de papilla inventados. |
| F10 FDA conservación | Verificada; identificación del producto y actuación ante sospecha. H2 6/8. Sin causalidad atribuida por coincidencia. |
| F11 Tufts FAQs | Verificada; ingredientes frente a adecuación y soporte profesional. H2 2/7. Sin instrucciones de sonda ni esperas caseras. |
| F12 Cornell senior | Verificada; individualización, condición y apetencia. H2 3/7/8. Sin dosis, suplementos o marcas. |
| F13 Collins/Cornell dental | Verificada; signos para consultar y cuidados tras recuperación según clínica. H2 1/5. No manipulación de heridas. |
| F14 FEDIAF casero | Verificada; complejidad de formulación profesional. H2 3/7. Sin porcentajes de un estudio no abierto. |

Todas tienen al menos un H2 con desarrollo previsto y cita por nombre, no solo bibliografía. La naturaleza de guías/documentos secundarios y la falta de ensayo específico sobre una textura universal están declaradas. No se añaden DOI/PMID, pacientes, cifras clínicas ni recetas universales. La política editorial sigue respetada: educación y observación, sin diagnóstico ni prescripción.

## Recursos y revisión final pendiente

| Recurso | Estado real del brief | Gate que se mantiene |
|---|---|---|
| Imágenes I1/I2, I3 opcional | Existentes, reutilización condicionada. Solo el hero fue inspeccionado personalmente en R1 | Nueva inspección de escenas/alt/edad/anatomía; variantes decodificadas, IA visible |
| Imágenes nuevas I4/I5 | Planificadas | Generación desde referencia, originales, WebP responsive y evidencia visual |
| A1 preparación / A2 registro | Planificadas, cuatro estados cada una | Cambios visibles distintos, sin autoplay; controles, fin, pausa real, teclado, reduced motion, sin JS, impresión y limpieza de temporizadores |
| D1/D2/D3 | Planificados | Semántica, contraste y lectura móvil/Markdown |
| Registro | Planificado | Una A4 legible con valores preservados incluso al máximo; sin enviar/guardar datos |
| Lectura completa PDF | Planificada | Artículo y recursos completos; aclarar animaciones estáticas |

La producción todavía no existe en esta versión: no se hereda ningún APTO visual del artículo rechazado. El texto se revisará primero de forma provisional y el conjunto se cerrará dentro de la misma serie de máximo tres rondas de artículo. No crear auditorías ilimitadas por recurso.

## Efecto cascada y lo que se preserva

La redacción v2 ya puede tomar este contrato. La corrección no cambia la arquitectura original de ocho decisiones ni reutiliza el artículo rechazado como texto base. Se preservan límites clínicos, guía sin caso, cuatro enlaces internos comprobados, contingencia de un solo spoke de Alimentación y la autoría central real del layout, sin firma duplicada.

La bibliografía tiene ahora límites medibles antes de que el redactor escriba. El nuevo artículo debe probar cobertura y utilidad mediante su lectura completa, sin convertir el rango en una orden de rellenar; sus fuentes y apoyos se revisarán sobre los archivos y el DOM reales.

No hay correcciones pendientes del brief ni motivo para gastar la tercera ronda. Cualquier cambio sustantivo posterior debe declararse y evaluarse dentro del contador vigente. No fusionar ni desplegar.
