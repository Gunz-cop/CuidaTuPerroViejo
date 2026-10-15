# Autoverificación mecánica de redacción — 15 de octubre de 2026

Rol: redactor. Este documento no es una auditoría independiente ni valida por sí solo afirmaciones médicas. Archivo congelado: `scratch/higromas/articulo.mdx`; SHA-256 `4ce6483969dc350f603254e6172e17ec8034c95a95f27c77db8574e2e6e05d6d`.

## Palabras medidas

Método reproducible: `python scratch/higromas/contar.py`. Quita frontmatter/imports, bibliografía completa, etiquetas/código/atributos, URLs y alt; transforma enlaces a su ancla y extrae preguntas/respuestas reales del FAQ. Incluye títulos visibles en columna principal; segunda columna excluye también H2/H3. Las descripciones de animaciones no viven en el MDX y se declaran aparte.

| Bloque | Palabras MDX visibles | Target | Desviación | Sin títulos |
|---|---:|---:|---:|---:|
| Introducción | 609 | 600 | +1,5 % | 589 |
| Callo, higroma y otros bultos | 1079 | 1100 | −1,9 % | 1031 |
| Presión repetida y dos codos | 838 | 900 | −6,9 % | 802 |
| Preparar el descanso | 961 | 1000 | −3,9 % | 915 |
| Tratamiento según lesión | 1259 | 1300 | −3,2 % | 1201 |
| Qué ocurrió en el caso | 627 | 600 | +4,5 % | 593 |
| Conclusión y siete FAQ | 841 | 800 | +5,1 % | 840 |
| **Total MDX** | **6214** | **6300** | **−1,4 %** | **5971** |

El componente `HigromaAnimation.astro` añade 98 palabras de descripción (33/29/36), más títulos/etiquetas/fuentes/controles. Solo contando prosa sin títulos y añadiendo esas descripciones: **6069 palabras**. Conteo de sus textos visibles extraídos de su código, sin duplicar title/desc accesibles del SVG: 73/70/91 palabras, antes de numeración. Con esos 234 textos y numeración, el conjunto permanece alrededor de **6455 palabras**. El DOM compilado debe confirmar el total final; no se afirma que este cálculo estático sea un conteo del HTML construido. Las cuatro cabeceras de AlertBox agregan unas pocas palabras visibles más, dentro de 6500.

Densidad con el comando awk de Fase 4 aplicado al archivo real: **media 30,97; mediana 37; párrafos >50 palabras 0 %**. El comando excluye las líneas de arrays FAQ, como la skill; las respuestas se estructuraron en párrafos HTML separados. La revisión visual móvil corresponde a la integración, no se infiere de los conteos.

## Trazabilidad dentro del desarrollo

Se reutilizó el registro leído `/workspace/briefings/evidencia-r1.md`, con sus límites de lectura efectiva. No se fingió acceso al cuerpo de artículos científicos cuando solo se había leído su resumen. El brief canónico del 15 de octubre conserva las ocho URLs y asignaciones.

| Fuente | Uso en el texto, fuera de bibliografía | Alcance |
|---|---|---|
| F1 Pavletic y Brum | Introducción; H2-2 bilateral/manejo; H2-5 resultados | Resumen editorial: San Bernardo macho castrado de un año; izquierdo drenaje cerrado de succión tres semanas y cama blanda; sin recidiva izquierda en 18 meses; derecho no operado algo mayor. No actualización inventada. |
| F2 Verhoeven, Huels y Harms | H2-4 ondas de choque; FAQ7 | Resumen, cuatro lesiones/tres perros; sin garantías ni superioridad universal. |
| F3 Angelou et al. | H2-4 drenaje/cirugía; FAQ6 | Resumen retrospectivo,21higromas/19perros; recidivas y rescate; diferenciado del caso F1. |
| F4 Loeffler/ISCAID | H2-1 callo/infección; H2-4 piodermia; FAQ1/5 | Guía completa registrada: citología, profundidad, antimicrobianos y clorhexidina sin receta. |
| F5 AAHA Pain Management2022 | H2-3 entorno/peso | Página específica no farmacológica; no atribuida como ensayo de higromas. |
| F6 AAHA Senior Care2023 | H2-2 vídeo/movilidad; H2-3 accesos; H2-5 confort | Página de dolor senior; cuidado global, no causalidad/eficacia específica para higromas. |
| F7 Merck | H2-1 definición/diferenciales; H2-2 mecanismo; H2-4 manejo/aspiración; FAQ1–4/6 | Manual clínico secundario, atribuciones de aspiración y corticoides reservadas a esta fuente. |
| F8 Montoya/Tobias | H2-3 descarga/ajuste; H2-4 ulceración/protector | Revisión clínica secundaria; sin tutorial y cautela sobre presión/perfusión. |

Todas las fuentes se nombran y enlazan en su H2 asignado, además del cuadro final con título real y URL profunda. No hay URL marcada como no verificada en el brief vigente.

## Contrato técnico comprobado

- Cuatro AlertBox: info apertura, danger H2-1, warning H2-4 y cuadro final de fuentes.
- FAQ final con siete items, sin H2 manual duplicado.
- Tres momentos del caso: introducción, H2-2 y H2-5; hechos atribuidos, edad real preservada. Las ilustraciones muestran San Bernardo mayor y no al paciente.
- Dos imágenes interiores1200×675 con lazy/async y alt; hero solo frontmatter. Infografía1600×1000 en H2-1 con resumen textual y enlace a ampliar.
- Tres componentes: `presion` H2-2, `acolchado` H2-3 y `seguimiento` H2-4.
- Siete destinos editoriales distintos, coincidentes con el brief; enlace adicional a ampliar imagen es un recurso, no un octavo destino editorial.
- Frontmatter usa claves del schema real `src/content.config.ts`, pilar válido y fecha2026-10-15. Byline normalizado tras primer párrafo. Sin H1, TOC, JSON-LD ni related manual.
- No existe colisión del slug en `src/content/blog/` al iniciar redacción. Inventario y archivos físicos de destinos fueron revisados.
- No se escribió contenido a `src/content/blog/`, no se modificaron inventario, brief ni componentes. El integrador decide el guardado final tras build/auditoría.

No hubo publicación ni cambios remotos. Pendiente de integración: compilación y conteo DOM, revisión visual móvil y auditoría independiente; estos puntos no se presentan como ejecutados por el redactor.
