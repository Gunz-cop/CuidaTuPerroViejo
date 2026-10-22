# Investigación del segundo artículo — 2026-10-22

Autor investigador: `/root/autor_brief`. Este expediente registra producción, no auditoría. Base leída `main`, SHA `9ca247aff3546d3eba41253dda5236504efba32a`; trabajo en `contenido/mal-aliento-perros-viejos`. Primer artículo fuera del alcance. Sin métricas, consultas ni exportaciones de Search Console.

El registro fuente → afirmación → localización → H2 → límites está en [§3 del brief](../../../briefings/briefing-mal-aliento-perros-viejos.md#3-fuentes-científicas-de-autoridad-source-first). No se guarda el contenido íntegro de fuentes de terceros. Todos los enlaces F1–F12 fueron abiertos con herramienta web el 22 de octubre; la extracción entregó contenido sustantivo, no solo HTTP/resultado buscador. No se presenta revisión veterinaria del artículo.

## Cobertura y decisiones editoriales

| Pregunta | Fuentes verificadas | Uso / límite |
|---|---|---|
| Cuándo llamar y con qué prioridad | PDSA halitosis; Merck When to See a Veterinarian | Urgencia por signos y estado; no plazo universal de espera |
| ¿Envejecimiento normal? ¿Se puede adivinar por olor? | UC Davis; PDSA halitosis | Edad no justifica normalizar; no mapa olor→enfermedad |
| ¿Qué puede ocurrir en boca/labios? | Merck periodontal y mouth; UC Davis; Illinois | Proceso, lesiones y signos; no catálogo diagnóstico ni maniobras |
| ¿Qué otros signos importan? | PDSA renal; Merck pancreas; UC Davis | Sed/orina/peso/ingesta/estado; no pruebas ni tratamientos caseros |
| ¿Qué observar y comunicar? | Cornell dental; Merck mouth; AAHA assessment | Registro práctico editorial de ocho datos, no escala validada |
| ¿Cómo se estudia? | Cornell; AAHA assessment y Senior 2023; Merck periodontal | Evaluación, pruebas según caso, riesgo individual |
| ¿Qué evitar mientras tanto? | FDA xilitol; Merck mouth; Cornell | No perfumar/medicar/manipular para ocultar dolor |
| ¿Qué evolución seguir? | AAHA Senior 2023; PDSA halitosis | Confort/ingesta y contacto por persistencia, sin prometer resultado |

No se usan cifras de prevalencia, sensibilidad/especificidad, dosis, productos/afiliados ni afirmaciones de causalidad sistémica dental. Fuentes clínicas secundarias son aceptables y se identifican como tales; no se completó una cuota artificial de papers.

## Acceso limitado o fuentes no incorporadas

- WSU, `Chronic kidney disease and failure`: apertura devolvió 403. No afirmar que la referencia sea falsa; se sustituyó por PDSA renal con contenido completo.
- PubMed 16397199: apertura entregó únicamente aviso HHS; no abstract verificable. No figura en referencias ni se atribuyen autores o datos.
- Guía WSAVA 2026: identificada por búsqueda pero no contrastada íntegramente. No usarla como leída. AAHA 2019 se cita por recomendaciones específicas abiertas, sin llamarla la más reciente.

## Duplicación y trabajo abierto

Leído completo `src/content/blog/salud-dental-perros-mayores.mdx`: guía de higiene, rutina y procedimiento profesional; el nuevo brief excluye esos desarrollos y conecta mediante enlace. Leídos inventario, schema, política editorial, componentes/rutas y mapa de enlaces.

Consulta de PR abiertos mediante conector GitHub (22 octubre): #122 plan, #125 corrección de alimentación sin dientes; no se vio trabajo de halitosis en los resultados. Ramas remotas clonadas tampoco muestran slug equivalente. No se modifica ningún archivo del primer artículo ni se heredan sus rondas.

## Lecturas normativas realizadas

AGENTS raíz (no se encontraron instrucciones AGENTS adicionales en directorios); plan del PR #122; calidad-editorial-adsense; guía-voz-tono; generar-briefing con plantilla y referencia de componentes; auditar-briefing; redactar-articulo con reglas MDX, plantilla, experiencias visuales y análisis del corpus; auditar-articulo; crear-animaciones con patrón baño; apoyos-visuales-responsive; enlazado-interno-sitio y sus tres recursos de implementación. La plantilla/corpus históricos no acreditan casos ni fuentes para este artículo.

Divergencia documentada: la plantilla de redacción conserva firma manual, pero `ArticleByline.astro` y ruta actual ya la generan con fechas e IA. Se usará el componente real sin duplicar firma. El schema vigente también admite dateModified; no hace falta para contenido nuevo. El estado del frontmatter no filtra publicación: el gate real mantiene incompleto fuera del contenido servible y esta tarea no despliega.

## Comprobación del autor previa a auditoría

Metadatos medidos con Python: seoTitle 55 caracteres; metaDescription 148. Targets sumados: 6.000 palabras útiles. Se distinguen de conteo MDX bruto y bibliografía para impedir inflación. Se registrará cuadro por H2 en redacción. Contrato visual R1–R7 con rutas/ubicación/función y criterios; todos siguen planificados hasta producción tras APTO. Inventario actualizado a En Briefing. No hay dictamen independiente ni MDX redactado.
