# Producción de redacción v2 — autocontrol editorial

Fecha: 2026-10-20. Rol: redactor, distinto de creación del brief y de auditoría. Este documento es un autocontrol de producción, **no un APTO ni una auditoría independiente**.

## Contrato y versión

Brief de partida: `briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md`, SHA-256 `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208`, APTO en auditoría independiente R2/3. Se redactó de nuevo desde sus preguntas, fuentes y decisiones. No se amplió el artículo rechazado ni se utilizó ese texto como fuente.

Documento editorial para auditoría R1: `articulo-v2-en-revision.mdx`, SHA-256 `05ffebd06f2adf79a29495907b339bba5edf1f28dda15e09ebce0957172ee9f8`.

El archivo permanece en el expediente de revisión, fuera de `src/content/blog/`. Las referencias relativas de imports son las que corresponderán a su ubicación final. No se ha guardado el nuevo artículo en la colección, compilado como si estuviera completo ni publicado. `status: Publicado` en el frontmatter es el valor técnico previsto por el contrato; aquí no acredita publicación ni levanta el gate de recursos.

## Conteo comprobado

Se ejecutó `contar-editorial.mjs` sobre el scratch real. Resultado preliminar: **5844 palabras editoriales extraídas del AST**, excluidos frontmatter, imports, etiquetas/atributos/URL, figuras/pies IA, bibliografía y componentes visuales. Se incluyen encabezados, prosa, tres tablas, AlertBox editoriales y las ocho preguntas/respuestas FAQ una vez. El FAQ tiene datos estáticos inline para extracción reproducible.

El conteo contractual **DOM compilado sigue pendiente** de la integración y build finales. No se presenta el AST como si fuera esa comprobación. El contador mecánico del cuerpo MDX da **6.537** palabras, incluyendo sintaxis; es diagnóstico y no el volumen de lectura. El script heredado busca el brief v1 por nombre y no puede dictaminar este contrato v2 sin adaptación: no se reescribió el brief rechazado para obtener un resultado mecánico.

| Bloque | Palabras AST | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 195 | 200 | -2.50% |
| Antes del menú: identifica qué parte de comer le cuesta | 556 | 600 | -7.33% |
| Elige una base que cubra sus necesidades y entiende su ración | 762 | 800 | -4.75% |
| Qué presentación puede encajar: húmedo, pienso, triturado o casero | 588 | 650 | -9.54% |
| Prepara una comida adaptada sin perder la cuenta de lo que come | 679 | 700 | -3.00% |
| Después de una extracción: sigue un plan de cicatrización propio | 536 | 550 | -2.55% |
| Conserva la comida y limpia el material sin inventar plazos | 411 | 450 | -8.67% |
| Si además tiene otra enfermedad o empieza a comer menos | 665 | 650 | +2.31% |
| Registra lo que ocurre y lleva una pregunta concreta a la revisión | 627 | 650 | -3.54% |
| Conclusión | 149 | 150 | -0.67% |
| Preguntas frecuentes | 676 | 600 | +12.67% |

Total target 6.000; intervalo 5.700–6.300. Todos los bloques están dentro de ±15% sin compensar una sección incumplida con otra. La comparación de presentaciones desarrolla además quién puede repetir la preparación y con qué material; ese criterio práctico faltaba en la primera pasada, no se agregaron palabras sueltas para salvar una cifra.

Densidad de prosa según AST: **120 párrafos; media 38,33; mediana 39; cero de más de 50 palabras; máximo 43**. Son medidas textuales: la lectura efectiva a 375–390 px está pendiente de la vista compilada. Se usan 32 H3 en ocho H2 de desarrollo; conclusión aparte. No hay H1, TOC manual, schema o byline duplicados.

## Apertura de fuentes y trazabilidad

Se reabrieron personalmente las catorce URL profundas del brief mediante herramienta web, confirmando título y pasajes aplicables antes del cierre. Para las aperturas se usaron URL completas; los identificadores de resultados de otros agentes no se utilizaron como prueba de identidad. Las lecturas propias no sustituyen la nueva comprobación del auditor. No se incorporaron PMID/DOI, cifras clínicas ni experiencias de memoria.

| Fuente | Localizador usado | Afirmación concreta en el artículo | H2 con uso |
|---|---|---|---|
| F1 UC Davis, Dentistry and Oral Surgery Service | FAQ cómo comer sin todos/casi todos los dientes | Posibilidad de comer alimento habitual/seco de tamaño adecuado; no pauta posoperatoria | 1 y3; también introducción |
| F2 AAHA Dentistry, conjunto senior2023 | Párrafos iniciales y vídeo observacional | Evaluar molestias/dificultad para coger, masticar o tragar; vídeo espontáneo útil si seguro | 1,5,8 |
| F3 Cline/AAHA Nutrition2021 | Evaluación y planes individualizados; nutrición ante enfermedad y seguimiento | Plan de producto/cantidad/reparto/extras, historia dietética y enfermedades concurrentes | 2,4,7,8 |
| F4 WSAVA Guidelines on Selecting Pet Foods2021 | What to look for on a label | Adecuación y energía con unidad; preguntar al fabricante; formato no demuestra equilibrio | 2,3,4 |
| F5 FEDIAF Nutritional needs | Apertura completo/complementario | Función diferente, complementario no cubre solo la dieta; naturaleza industrial declarada | 2 |
| F6 Defarges/Merck Dilatation of the Esophagus | Signos y consistencia variable por paciente | Enfermedad esofágica distinta de ausencia dental; no regla de licuar | 1,4 |
| F7 Kuehn/Merck Pneumonia in Dogs | Introducción y Aspiration Pneumonia | Forzar alimentación tiene riesgo de aspiración; atención urgente respiratoria sin diagnosticar por tos | 1,4 |
| F8 Barnes/Hiscox/Bellows, VCA–LifeLearn Oral Surgery | How will my dog eat after surgery? | Hechos clínicos breves: blando durante cicatrización y revisiones; sin copiar/adaptar su prosa | 5 |
| F9 FDA Tips for Safe Handling | Preparing y Storing | Higiene manos/utensilios/platos; sobrantes húmedos refrigerar pronto o desechar | 4,6 |
| F10 FDA Proper Storage | Lista de almacenamiento y What to do When There’s a Problem | Conservar identificación/lote; material limpio entre bolsas; apartar producto sospechoso y contactar | 6,8 |
| F11 Tufts Nutrition FAQs | Ingredient list y Feeding Tubes | Ingredientes no certifican perfil; soporte veterinario ante ingesta insuficiente, sin enseñar sonda | 2,7 |
| F12 Cornell Choosing food for your senior dog | Introducción, masa corporal, calorías y Palatability | Individualización, condición/peso y papel del olor sin diagnóstico por preferencia | 3,7,8 |
| F13 Collins/Cornell Dental disease | Signs y cierre de tratamiento | Signos para contactar y retomar cuidado doméstico según indicación tras recuperación | 1,5 |
| F14 FEDIAF Home Made Diets | Apertura y Expert formulated diets | Complejidad y formulación profesional; sin porcentajes de estudio no abierto | 3,7 |

La bibliografía conserva las catorce fuentes con sus títulos y enlaces profundos en el cuarto AlertBox convencional, encerrado en `data-editorial-bibliography`; el FAQ queda fuera y después. No se atribuyen años no confirmados. UC Davis se distingue como actualización de página, Merck como revisión/actualización y VCA como actualización del documento.

Los ejemplos numéricos son nuevos y ficticios, señalados expresamente como aritmética y no raciones: comparar 50g de productos inventados a100/200kcal por100g produce50/100kcal; ofrecido40g menos sobrante10g sin otras pérdidas produce30g. No se calculan necesidades del perro ni se atribuyen esos valores a una marca.

## Estructura y enlaces

- Cuatro AlertBox: info de apertura, danger en H2 1, warning en H2 4 y bibliografía info. Ocho FAQ finales.
- Tres apoyos estáticos editoriales: matriz de situaciones (H2 1), ficha de etiqueta (H2 2) y comparación de cuatro presentaciones (H2 3). Tablas con caption, th scope, región con nombre y foco; falta prueba de teclado/reflujo/contraste real.
- Cuatro enlaces internos reales y contextuales, comprobados contra brief/inventario: pilar Alimentación, comida casera, salud dental y chequeo geriátrico. No se inventa segundo spoke ni se añade calculadora ajena al propósito.
- Responsabilidad editorial mediante layout existente; guía sin caso ni desenlace inventado. Sin revisión veterinaria ficticia, paciente Luna/Dakota, dosis, recetas/proporciones universales, tiempos de remojo/cicatrización o manejo postural de disfagia.

## Recursos previstos y límites de esta entrega textual

La producción visual viene después de la auditoría editorial inicial según el encargo. **No hay APTO final del artículo** con estos recursos pendientes:

| Recurso | Ubicación de integración | Estado en esta revisión |
|---|---|---|
| I1 hero existente | Frontmatter/layout | Referencia existente; integración/decode y pie IA visible deben verificarse en conjunto |
| I2 preparación existente | Final H2 4 | Figura referida; inspeccionada por producción visual como evidencia ajena identificada, no prueba propia de navegador |
| I3 observación existente | H2 8 tras primer H3 | Figura referida; productor visual confirmó perro comiendo sin persona, alt acorde; no se presenta como paciente |
| I4 medición nueva | Final H2 2 | Referencias previstas a archivo/variantes; todavía no generado |
| I5 consulta nueva | Final H2 8 | Referencias previstas a archivo/variantes; todavía no generado |
| A1 base/presentación | H2 4, tras explicar modificación y antes de servir | Pendiente `AlimentacionSinDientesRecursosV2 variant="base"` |
| A2 plato/registro | H2 8, tras explicar medición/estimación y antes de comparar | Pendiente mismo componente variant="ingesta" |
| Registro imprimible local | H2 8, antes de figura de consulta | Pendiente mismo componente variant="registro" |

Las llamadas de recursos pendientes no se han fingido como componentes existentes en este scratch; sus puntos de inserción quedan aquí identificados y no como instrucciones al lector. Las imágenes nuevas se referencian para revisar su contrato de alt/contexto, pero sus archivos no existen aún. Todas las figuras llevarán declaración IA visible; la hero la gestiona el layout. El productor visual aún debe generar dos escenas, implementar dos animaciones y registro, optimizar y validar. El redactor integrará los componentes reales y guardará en source únicamente después del autocontrol del conjunto.

Pendientes: auditoría editorial R1 independiente, producción visual, integración, comprobación DOM del conteo y lectura móvil/escritorio, accesibilidad/controles/noJS/reduced/print, proyección Markdown, build/check y cierre independiente dentro del contador vigente. Ninguna de estas pruebas se declara ejecutada aquí. No hubo commit, push ni despliegue desde este rol.

## Adenda de integración posterior al APTO editorial provisional R1

Tras recibir `auditoria-articulo-r1.md` y la confirmación del productor de recursos reales completos, se integraron el import de `AlimentacionSinDientesRecursosV2.astro` y las variantes `base`, `ingesta` y `registro` en los puntos indicados arriba. No se modificó la prosa aprobada, el FAQ, las tablas ni las fuentes. Se corrigió únicamente el alt de I3 a «plato en el suelo», porque la imagen no permite asegurar que esté sobre la alfombrilla.

El original exacto de R1 permanece en `articulo-v2-r1-editorial.mdx.txt`, SHA-256 `05ffebd06f2adf79a29495907b339bba5edf1f28dda15e09ebce0957172ee9f8`. Se comprobó programáticamente que, retirando las tres llamadas y su import y revirtiendo ese alt, el archivo integrado es idéntico al de R1. `metricas-integracion-preliminar.json` repite **5.844 palabras AST**, con los mismos bloques y densidad. El conteo DOM contractual sigue pendiente.

Fuente completa guardada en `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx` y scratch final idéntico: SHA-256 `ca8a606a825162025ba19c9daa3c2f0c814d9e9a4eb2b02ff4ef214b87d51058`. El reemplazo de v1 se hizo una vez existentes el componente y todos los archivos referidos, tras autocontrol textual, de referencias y sintaxis preliminar; no se presentó una ruta vacía como artículo completo.

Inspeccioné personalmente las cinco escenas WebP: mismo beagle senior tricolor de hocico canoso y anatomía plausible. I4 muestra alimento pasando a un recipiente sobre báscula, sin una cifra de ración; I5 muestra registro/cuaderno compartido con profesional junto al perro. I3 no contiene una persona observando. Los alt y pies describen esas escenas como ilustraciones IA, sin paciente ni visita real. Se comprobaron metadatos de quince WebP: cinco originales de 1200×800 y sus variantes de 800×533 y 400×267.

Coordinación ejecutará el único build y los controles de navegador del conjunto; este rol no lanzó builds simultáneos. El componente permanece sujeto a esa prueba real y a la auditoría final R2. La producción visual comunicó diagnóstico cero de sintaxis Astro/TypeScript; se identifica como prueba del productor, no repetida por el redactor ni equivalente a build o accesibilidad. `integracion-redaccion-v2.json` conserva el estado y hashes de esta entrega para compilación.

## Lectura propia del build local v2

Después del primer build v2 ejecutado por coordinación, revisé el formato a 390 y 1366 px en claro y oscuro: nueve H2 del cuerpo más el encabezado del FAQ, ocho respuestas FAQ desplegadas, tres tablas y cinco imágenes referidas; no hubo desbordamiento global ni errores JavaScript en ese recorrido. Los dos screenshots de cabecera conservan overlays normales. Evidencia y script: `verificacion/lectura-redactor.json`, `lectura-redactor.py` y `lectura-redactor-390.png`/`lectura-redactor-1366.png`. Este control comprueba estructura y lectura; no certifica decodificación de todas las imágenes lazy ni sustituye las pruebas específicas de coordinación/productor/auditor.

El resultado medido importa: con los estilos reales del sitio, los párrafos de prosa tienen aproximadamente **seis líneas de mediana y ocho de máximo a 390 px**, frente a tres y cuatro en escritorio. Tener unas 38 palabras no prueba que sean tres líneas en móvil. El brief v2 pide medir lectura real y no certificar ese límite por un contador; el texto mantiene párrafos completos y aireados sin partir frases solo para mejorar una métrica. No se redujo tipografía ni se alteraron estilos globales para simular menos líneas.

Esta lectura se realizó sobre el build previo a los últimos atributos de foco/teclado de tablas aplicados por el corrector (`correccion-tecnica-tablas.md`). Por tanto no se presenta como verificación de esos atributos finales. Las tablas mostraron texto de 15,2 px y desplazamiento horizontal acotado en dos de ellas; su teclado y contorno finales quedan para el build y QA siguientes. El corrector cambió solo atributos del HTML, conservando la prosa y su conteo; el hash ca8a de la adenda anterior corresponde a la fase histórica de integración, no a una congelación posterior de esos arreglos.
