# Corrección del brief v2 tras auditoría R1

Fecha: 2026-10-20. Rol: corrección separado de creación y auditoría. Este documento registra cambios y reaperturas de fuentes; no emite APTO ni consume una auditoría adicional.

- Documento corregido: `briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md`.
- SHA-256 recibido y auditado en R1: `cc0a17cb8d7073424ebf3b72dd1877243e03a73ff187161bc2108f0bf044c91e`.
- Informe aplicado: `auditoria-brief-r1.md`, NO APTO, ronda 1 de 3.
- SHA-256 de la versión corregida: `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208`.
- Estado de entrega: corregido tras R1, pendiente de auditoría independiente R2 de 3. No redactar hasta ese resultado.

## Cambios aplicados

| Hallazgo de R1 | Corrección localizada |
|---|---|
| P1: exclusión bibliográfica referida a un H2 no planificado | Secciones 6, 9 y checklist unificados: envolver toda la bibliografía, incluido el cuarto AlertBox, en `<div data-editorial-bibliography>` y excluir íntegramente ese contenedor. No añadir H2 bibliográfico. FAQ después y fuera del contenedor, contado una vez. |
| P2: título del cuadro de fuentes | Título convencional `Fuentes científicas y de autoridad`; explicación de límites dentro del mismo cuadro, sin quinto AlertBox. |
| P2: metadatos F1/F7/F8 recuperables | Reapertura por el corrector de las tres URL exactas; identidad y fechas incorporadas en la tabla de fuentes del brief con las distinciones que figuran abajo. |
| Identificación de la versión | Cabecera marcada «corregido tras auditoría R1; pendiente de auditoría independiente R2 de 3». La referencia a la verificación del creador se distingue de esta adenda posterior. |

Los componentes visuales completos y el registro usarán `data-editorial-visual` y no aportarán palabras al total contractual. Se conserva el conteo de tablas editoriales del MDX, AlertBox editoriales y FAQ una vez; la excepción del cuarto AlertBox bibliográfico queda expresa. No cambiaron la arquitectura, el presupuesto de 6.000, el intervalo 5.700–6.300, los targets por sección, las catorce fuentes ni la cantidad de recursos.

## Adenda de fuentes reabiertas durante la corrección

Abrí las tres páginas con la herramienta web el 2026-10-20. Los localizadores son pasajes de página; las líneas del extractor solo facilitan reproducir esta corrección y no constituyen paginación editorial.

| Fuente y URL profunda | Metadato comprobado / localizador | Distinción conservada |
|---|---|---|
| [F1 UC Davis — Dentistry and Oral Surgery Service](https://www.vetmed.ucdavis.edu/hospital/small-animal/dentistry-oral-surgery-service) | Pie de página, línea 281 del extractor: actualización 9 de octubre de 2026. La FAQ pertinente continúa en las líneas 153–154. | Es actualización de la página. No se afirma que sea fecha de revisión clínica del pasaje. |
| [F7 Merck — Pneumonia in Dogs](https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs/pneumonia-in-dogs) | Cabecera, líneas 21–23: Ned F. Kuehn, revisión completa junio de 2018 y actualización septiembre de 2024. | Se distinguen revisión y actualización. No se infiere el año del copyright. |
| [F8 VCA — Oral Surgery in Dogs](https://vcahospitals.com/know-your-pet/oral-surgery-in-dogs) | Firma, línea 395: Courtney Barnes, Lorraine Hiscox y Jan Bellows. Cierre, línea 417: actualización 26 de abril de 2024. Copyright LifeLearn 2024 en línea 416. | La actualización declarada se registra por separado del copyright. No se copian ni readaptan párrafos de LifeLearn: el brief mantiene solo su atribución factual breve y sus límites. |

El archivo de lecturas del creador, `fuentes/verificacion-creador.md`, se conserva sin cambios (SHA-256 `82d385e8d745b6896bb9fb02c3470470ab552a48fd457b8b9d7d2934ad580fb0`). Esta adenda documenta lo recuperado después y no finge que el creador lo hubiera leído en su extracción inicial. No se añadieron fechas a F5/F9/F10/F11/F12/F13/F14 ni DOI/PMID nuevos.

## Autocontroles de corrección

- La suma de targets sigue siendo `200+600+800+650+700+550+450+650+650+150+600 = 6000`.
- Python vuelve a medir seoTitle 43 caracteres y metaDescription 155, sin cambios de metadatos del artículo.
- Búsqueda literal sin resultados para la antigua instrucción «H2 de bibliografía» y el título sustituido «Fuentes y límites de esta guía».
- No se modificaron el informe de auditoría, el artículo, los recursos, el inventario ni el historial anterior. Sin commit, push, fusión o despliegue.

La suficiencia de la corrección la decidirá el auditor independiente en R2; esta comprobación de trabajo no la sustituye.
