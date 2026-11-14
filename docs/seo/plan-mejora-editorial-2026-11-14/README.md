# Plan de mejora editorial, herramientas y proceso

Fecha: 2026-11-14. Estado: proceso interno implementado en PR #181 y aprobado por auditoría independiente de integración R2 el 2026-11-14. Primero se completaron skills, plantillas y auditorías; Search Console y páginas siguen después. [Ejecución y evidencias](ejecucion.md). No se han fusionado ni desplegado estos cambios.

## Objetivo y decisión inicial

Convertir los aprendizajes de competencia en un proceso reproducible: mejorar lo que planificamos, cómo lo escribimos, cómo lo auditamos y qué recibe la persona que visita el sitio. La demanda de Search Console ordenará los temas y necesidades; el criterio editorial y las fuentes determinan qué respuesta es útil y responsable.

El propietario identifica la calculadora de calidad de vida como la necesidad más buscada. Se toma como prioridad provisional reportada, pendiente del export. El primer conjunto es:

- `/herramientas/calculadora-calidad-vida-perros`: registrar observaciones, comprender el resultado y preparar información para la consulta.
- `/cuidados-paliativos-perros`: comprender opciones de confort y acompañamiento; es el pilar al que PetMetric enlaza.
- Artículos pertinentes que conectan observaciones, cuidados y consulta, seleccionados con datos.

No se presupone que toda búsqueda de calidad de vida tenga intención de final de vida. La calculadora debe servir también a quien observa cambios o sigue una enfermedad crónica. Mantener las necesidades diferenciadas y ofrecer caminos útiles entre ellas.

Referencias previas: [análisis inicial](../analisis-miperromayor-2026-11-13.md), [Claude](../analisis-claude-competencia-2026-11-13.md), [contraste verificado](../contraste-claude-codex-competencia-2026-11-13.md).

## Inventario y contabilización de objetos

La unidad es un archivo identificado por ruta, o una plaza reservada para un archivo nuevo cuyo slug depende de Search Console. Un objeto es una pieza que entra en el alcance; no equivale automáticamente a una modificación.

El registro canónico es [objetos.csv](objetos.csv). Contiene ID, grupo, ruta, existencia, acción prevista, fase, dependencia, responsable de entrega, estado y criterio de cierre. El recuento se obtiene del registro, no de sumar menciones en los documentos.

**Base histórica inicial: 48 objetos: 30 existentes a revisar y 18 nuevos previstos, de los que cuatro son los documentos de esta entrega.** Incluye skills, plantillas, referencias, código a revisar, artículos, contratos e informes. Cada objeto existente termina con una decisión: modificar / conservar con motivo / retirar del alcance. Los nuevos pasan de reservado a creado, verificado y, si corresponde, publicado.

Las plazas de artículo nuevo y sus contratos/informes se reservan sin inventar un slug ni generar páginas prematuras. Cuando se elija, se sustituye la ruta reservada manteniendo el mismo ID. Cada imagen, PDF, componente o prueba adicional se añade como fila antes de encargarlo. Las carpetas no cuentan como un objeto ni esconden múltiples recursos bajo una fila genérica.

Al cerrar cada entrega se informa: objetos revisados, modificados, nuevos, conservados y pendientes; commits y PR; versión del contrato; evidencia y dependencia bloqueante. El total de objetos del programa se distingue del número de archivos modificados en ese PR.

### Ampliaciones condicionales, fuera de la base de 48

- Tercer artículo existente: añadir artículo, adenda/brief y dos informes de auditoría (cuatro objetos), solo si se elige.
- Cambios de métricas automáticas: registrar script y test como archivos separados si hay una comprobación mecánica nueva. La utilidad editorial sigue siendo revisión humana.
- Fixtures de proyección y manifest: cada archivo afectado se cuenta individualmente cuando el diff real lo determine; regenerar un fixture requiere revisar su sentido.
- Cada PDF, imagen original/variante, gráfico, componente de informe, módulo de eventos o test nuevo: una fila propia. No fijar una cantidad decorativa de imágenes.
- Página pública o capacidad MCP nueva: inventario y contrato propios si se encarga. No se incluye por defecto.

## Cómo se transmite el cambio entre skills

El brief ya es el contrato de contenido. La redacción **debe** obedecerlo, pero también tiene reglas y una plantilla propias; las auditorías leen otros documentos y formatos. Cambiar solo el brief dejaría instrucciones contradictorias activas.

Se propone una referencia compartida versionada, `contrato-utilidad-editorial.md` (O01), con criterios y ejemplos breves. No sustituye las normas de fuentes, voz, seguridad o arquitectura. Las cuatro skills y sus plantillas/informes la referencian y verifican el mismo requisito por ID.

| ID | Requisito que se planifica en el brief | Ejecución en redacción | Verificación independiente |
| --- | --- | --- | --- |
| E01 | Consulta real o necesidad identificada, contexto y decisión que resolverá la página | Título y apertura reconocibles; respuesta concreta pronto | La página responde la intención declarada; lenguaje cotidiano sin prometer diagnósticos |
| E02 | Decisiones, observaciones y señales para consultar antes de explicación extensa cuando el tema lo necesite | El lector encuentra qué hacer sin atravesar fisiología primero | Leer el recorrido móvil y comprobar dónde aparece la información; urgencias visibles |
| E03 | Cada sección tiene una pregunta, aportación y evidencia | Explicación suficiente para actuar; sin reiterar la respuesta en varias secciones | Utilidad distinta por sección; longitud justificada y contrato cumplido o ajustado documentalmente |
| E04 | Lo tratable que conviene consultar, observaciones domésticas y límites del autocuidado diferenciados | No atribuir todo a la edad, al carácter o a una enfermedad por el síntoma | Comprobar contra fuentes la acción y su límite; sin pruebas caseras de diagnóstico inventadas |
| E05 | Recurso práctico existente o propuesto; ruta, función, responsable y prueba | Registrar/descargar/usar solo lo realmente operativo y adecuado a esa intención | Completar el recorrido; si no hace falta recurso, aceptar justificación sin crear una descarga ritual |
| E06 | Siguiente paso y motivo del enlace, distinguiendo revisión, manejo y urgencia | Enlaces próximos a la necesidad concreta; productos después de comprender el problema | Destinos reales y adecuados; sin cuota de enlaces ni CTA universal a chequeo/HHHHHMM |
| E07 | Experiencia documentada entretejida o guía sin caso; ninguna historia obligatoria | Conservar hechos y voz propia; explicar desde situaciones concretas | Verificar procedencia y continuidad, sin inventar paciente o desenlace |
| E08 | Versión del contrato, alcance, omisiones justificadas y recursos | Entrega con trazabilidad requisito → sección/recurso → evidencia | Auditar la misma versión, detectar fallos heredados y conservar separación de roles |

Los criterios pueden aplicarse a pilares y texto de herramientas mediante un encargo específico. No forzar el frontmatter, estructura o plantilla de un artículo en esas páginas.

### Cambios internos concretos que debe cubrir la primera entrega

1. **Brief + plantilla:** añadir intención/consulta, decisión principal, respuesta inicial prevista, tareas del lector, recurso y siguiente paso; ordenar por necesidad y conservar investigación previa a las afirmaciones. Investigar primero no obliga a poner fisiología primero.
2. **Redacción + plantilla:** ejecutar ese orden con voz propia; permitir explicación clínica donde ayuda, hacer visible la respuesta y evitar duplicaciones de FAQ, resumen, recurso y conclusión. Reescribir el H2 de cierre de historia de la plantilla como cierre integrado, acorde a la regla actual.
3. **Auditoría de brief + formato/taxonomía:** comprobar que el contrato permite entregar una respuesta útil y recursos factibles, además de fuentes y metadatos.
4. **Auditoría de artículo + formato/taxonomía/métricas:** comprobar qué entiende y puede hacer el lector en el contenido real, no solo presencia de cajas, palabras o enlaces. Los controles automáticos aportan evidencia mecánica; nunca aprueban utilidad ni exactitud clínica.
5. **Referencias compartidas:** preservar y concretar lo que ya exige calidad editorial (respuesta pronta, utilidad, ausencia de relleno) y voz/tono. Añadir solo la diferencia, sin duplicar párrafos de normas en cada skill.
6. **Herramientas:** revisar conjuntamente skill de creación y auditoría. Ambas arrastran ejemplos de la calculadora de edad (años/etapas/longevidad) que deben declararse específicos de ese caso, no reglas para todos los registros. Resolver también la indicación de SVG propio frente a la preferencia vigente de AGENTS.md sobre ilustraciones.
7. **Reglas rígidas que requieren propuesta sincronizada:** los tres tipos de AlertBox y el orden clínico fijo se repiten en skills, plantillas y auditoría. Proponer uso por necesidad con justificación comprobable, en vez de imponer tres cajas a todo tema. No cambiar una sola pieza y dejar a otra rechazando el resultado. Los avisos de seguridad necesarios se conservan.

La prueba de coherencia de la entrega interna debe recorrer E01–E08 a través de generador → plantilla de brief → redactor → plantilla MDX → auditores → informes. Antes de los pilotos, registrar versión/commit y demostrar que un contenido útil no es rechazado por una plantilla antigua ni aprobado solo por cumplir contadores.

## Entregas y dependencias

| Fase | Entrega concreta | Dependencia | Criterio de salida |
| --- | --- | --- | --- |
| F0 — Plan e inventario | Este plan, objetos, medición y manifiesto de pilotos | Investigación ya hecha y corrección de alcance del propietario | Conteo reproducible, rutas existentes verificadas, propuestas diferenciadas de implementación |
| F1 — Proceso editorial | Contrato compartido, cuatro skills, plantillas e informes coherentes; pares de herramientas revisados | F0; la demanda posterior afina ejemplos; no bloquea el proceso interno | Revisión independiente de la versión y entrega verificable; alcance listo para los pilotos |
| F2 — Demanda y línea base | Agrupar consultas por intención y URL; revisar qué mide hoy el sitio | Export de Search Console del propietario | Selección de páginas y tareas, periodos/filtros y datos privados conservados; sin cifras inventadas |
| F3 — Primera aplicación | Página HHHHHMM y pilar de paliativos: claridad de tareas, uso de funciones actuales y enlaces pertinentes | Línea base capturada y contrato del proceso interno aprobado | Móvil, fuentes, enlaces y recursos comprobados; cambio editorial separado de una nueva función |
| F3b — Mejora funcional acotada | Informe de varias fechas y/o calendario integrado si se confirma la necesidad | Inventario funcional, demanda, definición de entrega y medición | Cálculos, historial, impresión, accesibilidad y límites verificados; auditoría independiente |
| F4 — Piloto editorial | Dos artículos existentes + un artículo nuevo; tercero existente opcional | F2 para escoger temas; F1 para producir; briefs/adendas auditados | Cada pieza tiene antes/después o punto de partida, contrato, auditoría, recursos y fecha de publicación verificable |
| F5 — Recepción y ajuste | Informe a 28 y 56 días completos tras cada publicación, con revisión técnica temprana | Publicación y datos comparables | Decisión con evidencia: mantener, corregir, ampliar muestra o esperar; resultado inconcluso permitido |
| F6 — Extensión gradual | Lotes siguientes de dos o tres artículos por intención y rendimiento | F5 y resolución de defectos de proceso | Reutilizar versión validada; inventariar cada lote; revisar el proceso si el mismo fallo se repite |

Las ventanas son de observación, no fechas prometidas de mejoría SEO. F3b puede esperar mientras se valida la mejora editorial. F3 y cada pieza F4 se publican de forma escalonada para registrar cambios y evitar atribuir todo a una modificación simultánea.

No se reescribe todo el sitio antes de revisar un piloto completo. Si el propietario quiere ampliar antes de reunir métricas suficientes, registrar esa decisión como criterio editorial provisional, no como éxito demostrado por Search Console.

## Primer piloto propuesto y alcance de cada pieza

El detalle está en [pilotos.md](pilotos.md). La selección inicial contiene una herramienta, un pilar, dos artículos existentes y una plaza de artículo nuevo. Herramienta y pilar no se contabilizan como artículos del piloto.

- **T01, HHHHHMM:** partir de lo existente (historial, comparación, notas, PDF y recordatorio). Separar claridad editorial de informe longitudinal nuevo.
- **P01, paliativos:** explicar el confort y las decisiones, qué observar y cómo usar el registro para conversar con el veterinario. Revisar conexiones sin duplicar el método de la herramienta.
- **A01, úlceras por presión:** candidato existente vinculado a cuidados y movilidad; pregunta práctica, observación, manejo seguro y siguiente paso.
- **A02, chequeo geriátrico:** candidato existente para preparar la consulta; ficha práctica solo si aporta frente a lo publicado.
- **N01, artículo nuevo:** tema final pendiente de consultas y canibalización. Candidatos: agua/registro o juegos de olfato (ya existe briefing); elegir uno, no encargar ambos automáticamente.
- **A03, opcional:** disfunción cognitiva si los datos justifican una tercera reescritura. No entra en el conteo base.

Las reescrituras necesitan brief o adenda de revisión, conservando fecha de publicación y documentando modificaciones. El artículo nuevo recorre el flujo completo de brief → auditoría → redacción → auditoría; no se presenta como «texto de ejemplo» exento de evidencia o recursos.

## Medición y aprendizaje

El protocolo está en [medicion.md](medicion.md). Search Console ayuda a elegir y observar búsqueda; por sí solo no mide comprensión, lectura ni uso de una calculadora.

Se combinan tres niveles: búsqueda por consulta/página, tareas del lector y funcionamiento/seguridad editorial. Los eventos de uso se consideran disponibles solo después de verificar la instrumentación real. No se prometen tasas de finalización ni retención si no hay datos que las midan.

Se captura la línea base **antes** de cada cambio. No se cambian a la vez slugs, títulos, contenido, navegación y funciones sin registrar el paquete. Si se cambia más de una cosa, se evalúa el conjunto y se declara la limitación causal.

## Responsables, estados y cierre

- Propietario: aporta Search Console, prioriza, revisa el resultado y decide publicaciones/merges conforme a la metodología.
- Implementador: prepara proceso, código o contenido según el encargo y entrega evidencias.
- Auditor independiente: revisa versión identificada; no es quien redactó o corrigió esa pieza. La revisión de skills también debe ser independiente del autor de la modificación.
- Por instrucción del propietario del 2026-11-14: máximo cinco rondas por unidad de cambio, cerrando al aprobar o deteniéndose si falla R5. Las correcciones mantienen contador; la unidad siguiente de alcance distinto empieza en R1. No presentar autoevaluación como auditoría independiente.

Estados del registro: `planificado`, `reservado`, `en_revision`, `modificado`, `creado`, `verificado`, `publicado`, `conservar`, `fuera_de_alcance`, `bloqueado`. Cada transición registra evidencia. Un archivo guardado en una rama no es un cambio publicado.

Los cambios al proceso se agrupan en un PR propio coherente; herramientas y contenido tienen entregas separadas para facilitar revisión y medición. Este PR #180 conserva la investigación y el plan. No mezclar configuración de la migración Astro, secretos o producción con el programa editorial.

## Próximo paso concreto

F1 completada: brief, auditora de brief, redacción, auditora de artículo y el par de herramientas, con auditoría por unidad e integración final. Siguiente F2: analizar Search Console, fijar línea base y decidir qué cambiar, cómo y dónde. El proceso ya tiene su contrato común; los artículos y mejoras funcionales requieren su entrega posterior.

La entrega inicial añadió cuatro documentos. La ejecución interna autorizada se registra por unidad en ejecucion.md y objetos.csv; no confundir el plan histórico con los cambios ya implementados ni con publicación de contenido.

Inventario al cierre de la ejecución interna: **89 objetos** (48 de base histórica más 41 soportes y evidencias incorporados). Incluye piezas futuras aún pendientes; no equivale al número de archivos modificados ni de artículos publicados.
