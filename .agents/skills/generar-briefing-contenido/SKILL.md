---
name: Generar Briefing de Contenido - Cuida Tu Perro Viejo
description: Planifica un artículo nuevo o una revisión con contrato verificable de utilidad, fuentes, recursos y criterios de auditoría en Astro/MDX.
---

# Generar un briefing de contenido

Aplicar [contrato de utilidad editorial 2.0](../references/contrato-utilidad-editorial.md), [calidad editorial](../references/calidad-editorial-adsense.md) y [voz y tono](../references/guia-voz-tono.md). Es una skill de planificación: entrega instrucciones y criterios, no párrafos de artículo terminados.

## 1. Entrada y alcance

- Registrar pregunta/situación observable, público/país, intención, decisión principal y tipo: artículo nuevo o revisión de URL existente. Si faltan título, keyword o slug, proponerlos desde el encargo y el inventario, marcando las decisiones provisionales. No exigir al usuario datos que se pueden investigar.
- Consultar `INVENTARIO_CONTENIDO.md`, `src/content/blog/`, `src/content/pilares/` y `briefings/`; distinguir publicado, en preparación y simplemente reservado. Un campo `status: Publicado` no acredita publicación.
- Ante solapamiento, documentar qué responde cada página y recomendar actualizar la existente o diferenciar el ángulo. Si el encargo ya autoriza esa revisión, continuar. Preguntar solo si la alternativa cambia el alcance sin autorización.
- Search Console afina la intención cuando exista; nunca inventar consultas, volúmenes o resultados. Su ausencia no impide planificar con evidencia y alcance provisional.
- Declarar versión 2.0, autor, fecha, archivos, objetivo y exclusiones. Una revisión conserva URL y fecha original; documenta su delta y auditorías previas.

## 2. Material propio e investigación previa

Elegir experiencia aportada, caso/cohorte publicado atribuido, viñeta compuesta declarada o guía sin caso. Usar solo hechos documentados. Depurar errores de dictado sin alterar hechos; preguntar por ambigüedades personales indispensables. No exigir historia ni desenlace para cumplir la plantilla.

Investigar antes de asignar afirmaciones a secciones. Por fuente registrar título real, autores/institución, año, DOI/PMID/URL profunda comprobados, fecha, afirmación, pasaje/tabla, población/especie y límites. Abrir y contrastar identidad y afirmación por separado; un 200 o resumen de búsqueda no basta. No completar identificadores, cifras, autoría o resultados de memoria.

Seleccionar primero guías vigentes de sociedades veterinarias (AAHA, WSAVA, ACVIM u otras pertinentes), estudios revisados por pares e instituciones universitarias/veterinarias competentes. Evaluar calidad y aplicabilidad, no solo prestigio o indexación: diseño, población, limitaciones y vigencia. Una referencia clínica secundaria puede cubrir una laguna si se identifica como tal y se explica su alcance. Blogs comerciales, competencia y calculadoras de terceros no son respaldo clínico primario.

Fuentes suficientes para las afirmaciones; no hay cuota. Si hay un bloqueo, buscar versión oficial alternativa, registrar verificación parcial y limitar el uso a lo leído. Una afirmación central sin respaldo invalida el enfoque hasta retirarla o sustituirla. `[URL no verificada]` es un estado interno, no una licencia para afirmar datos no comprobados.

Cada fuente debe tener sección asignada y uso real; cada sección científica tiene respaldo. Distinguir asociación/causalidad, resultado de grupo/individual y contexto original/aplicación doméstica. Leer la política editorial vigente (`src/pages/politica-editorial.astro` y página pública) antes de planificar recomendaciones: no diagnóstico por aspecto ni pautas farmacológicas para el lector. Una dosis histórica solo cabe con justificación documentada de estudio y compatibilidad con la política.

## 3. Diseñar el recorrido y los recursos

Primero definir la tarea que resuelve la apertura; después ordenar H2/H3 por preguntas del lector. Colocar acción y señales urgentes antes de explicación extensa si procede. No imponer fisiología, tratamiento, medicación, final de vida o conclusión redundante a todos los temas. Cada sección aporta una respuesta distinta y presupuesto justificado, sin mínimo universal de palabras. La suma de targets debe cuadrar con el rango pactado.

Seleccionar cajas según función y declarar `Componentes de cuerpo: info=N; danger=N; warning=N` con cantidades reales. Cero es válido si se justifica; omitir una señal urgente pertinente no lo es. Bibliografía final separada del conteo. Planificar FAQ según dudas no resueltas, incluso cero si se justifica; conservar formato estructurado cuando se use.

Inventariar recursos existentes antes de crear otros: tarea, ruta, estado, responsable, prueba y gate de publicación. Una ficha o PDF no es obligatorio si el texto ya resuelve la tarea. No prometer un recurso planificado como disponible. Evitar duplicar la misma explicación en texto, gráfico y FAQ.

Si hay historia propia, repartir momentos documentados en H2 prácticos; cierre dentro de la última sección útil, sin H2 narrativo aparte. Si no hay caso, usar observaciones y decisiones concretas. No escribir prosa casi final; títulos/tipos de cajas y borradores cortos de FAQ sí pueden anticiparse como datos estructurados.

## 4. Enlaces y arquitectura

Usar [skill de enlazado](../enlazado-interno-sitio/SKILL.md) y el catálogo real. Pilar y destinos publicados, con motivo y ubicación. No inventar dos spokes ni imponer HHHHHMM por pertenecer a Salud: incluirla cuando sea el siguiente paso útil. Distinguir urgencia, revisión preventiva y seguimiento. No usar una cuota ni enlazar siempre a chequeo desde «consulta».

Rutas `/pilar/slug`, enum de `src/content.config.ts`, frontmatter estricto. No añadir campos de contrato al YAML de Astro: van en la cabecera del brief. Metadatos contados: SEO ≤55 y descripción ≤160. El artículo no escribe H1, hero duplicada, índice, JSON-LD ni tarjetas que ya genera el layout. Ver [componentes MDX](references/astro_components.md).

## 5. Plan visual y entrega

Aplicar [dirección visual](../references/direccion-visual-editorial.md) y [apoyos responsive](../references/apoyos-visuales-responsive.md). Cantidad por utilidad; contar hero y cada recurso/variante. Si hay perro, ficha de identidad, misma raza dentro de su continuidad y cinco rasgos de edad verificables en cada prompt/recorte, salvo excepción documentada. Comprobar razas de los tres últimos trabajos pertinentes y justificar repetición. Precisar escena, materiales, geometría, luz, anatomía, alt, aceptación a 390 px y rechazo si parece adulto joven. Ningún dibujo propio de perros/personas en SVG/CSS.

Planificar referencia visual inspeccionable antes de derivar recursos; producción y animaciones siguen su skill cuando estén encargadas. Cada recurso tiene ubicación, función, ruta, prueba móvil/escritorio, claro/oscuro y alternativas de accesibilidad. No confundir un prompt completo con una imagen terminada.

Usar [plantilla](resources/template_briefing.md), manteniendo secciones 1–11. Completar contrato E01–E08, tabla fuente→sección, cantidades por componente, enlaces y recursos. Guardar `briefings/briefing-<slug>.md` dentro del encargo; ante archivo existente, conservar su historia y usar revisión/adenda explícita, sin sobreescribir trabajo ajeno. Actualizar `INVENTARIO_CONTENIDO.md` como En Briefing, no Publicado.

Entregar ruta, versión, decisiones provisionales, fuentes verificadas/parciales, presupuesto, recursos y pendientes. Solicitar auditoría independiente del brief antes de redactar. Máximo cinco rondas por unidad de cambio según el contrato; correcciones no reinician contador y fallo en R5 detiene la unidad. Los ejemplos históricos no son fuentes ni normativa.

## Validación del implementador (no auditoría independiente)

- E01–E08 tienen evidencia planificada; la respuesta y siguiente paso se encuentran pronto.
- Intención y diferencia comprobadas contra inventario y briefs; sin datos de búsqueda inventados.
- Fuentes verificadas y trazadas, lagunas honestas, sin afirmación central sin respaldo.
- Contrato y plantilla concuerdan: targets, rango, cantidades de cajas, FAQ, recursos y enlaces reales.
- Cero cajas/FAQ o ausencia de caso tienen motivo; las precauciones pertinentes permanecen.
- Prompts y recursos cumplen continuidad, edad, utilidad, accesibilidad y alcance encargado.
- Metadatos, rutas, schema y estado del inventario comprobados; no prosa final ni instrucciones que deban filtrarse al lector.
