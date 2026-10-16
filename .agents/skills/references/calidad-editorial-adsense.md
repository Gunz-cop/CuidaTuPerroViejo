# Calidad editorial y utilidad antes de publicar

Revisión: 2026-10-16. Lectura obligatoria para generar y auditar briefs, redactar y auditar artículos. Surge de la evaluación pública del sitio del 16 de octubre, conservada en `docs/seo/auditoria-adsense-2026-10-16.md`. Estas reglas prevalecen sobre los ejemplos históricos. Son controles editoriales del proyecto, no una garantía de aceptación por Google.

## 1. Utilidad, extensión y originalidad

- Definir la pregunta del lector, la respuesta práctica y la aportación respecto de lo que ya está publicado: registro útil, criterios de decisión, comparación transparente, experiencia atribuida o síntesis con límites. No basta con reescribir fuentes o alargar una introducción.
- No hay mínimo universal de artículos, palabras o visitas en las políticas enlazadas. No atribuir a AdSense los targets internos. La extensión se justifica por tema y cobertura, no por una cifra fija de 6.000 palabras.
- Cada H2 debe aportar una respuesta o decisión distinta. Quitar repeticiones, dramatización y preguntas retóricas sin respuesta. Mostrar pronto qué hacer y cuándo consultar. Un porcentaje de distribución no justifica relleno.
- Si un contrato anterior exige volumen sin utilidad, documentar una propuesta razonada de ajuste antes de cambiarlo; no falsear conteos ni bajar el target solo para aprobar el texto. Conservar los hechos y controles de seguridad aunque se recorte.

## 2. Registro de fuentes y afirmaciones

Por cada fuente, conservar en el brief/informe: título real, autor/institución, año, identificador/URL profunda resueltos, fecha de comprobación, afirmación concreta respaldada, localización (apartado, tabla o pasaje), H2 de uso y límites. Abrir el documento y contrastar identidad y afirmación por separado. Una respuesta HTTP 200, una coincidencia temática o un resumen del buscador no bastan.

- Comprobar población, especie, tamaño muestral, intervención, grupo estadístico frente a respuesta individual, asociación frente a causalidad y límites de extrapolación. Un caso no demuestra eficacia general.
- No completar autores, DOI, PMID, cifras, dosis, fechas o resultados de memoria. Una URL de institución no respalda cualquier afirmación atribuida a ella.
- Un bloqueo/403 no prueba que la referencia sea falsa. Buscar versión oficial alternativa o resumen identificable y limitar la afirmación a lo que se pudo leer. Marcar verificación parcial en el expediente, sin filtrar instrucciones al lector.
- Si una afirmación clave no puede comprobarse, retirarla, sustituir su respaldo o mantener el documento pendiente. Un aviso final no convierte un dato no verificado en publicable.
- La bibliografía complementa las citas junto a sus afirmaciones. No usar fuentes decorativas ni completar una cuota con referencias débiles.

## 3. Casos, autoría e imágenes

Declarar en la apertura de uso el tipo de material: (a) experiencia propia aportada, con procedencia documentada; (b) caso/cohorte publicados, con atribución y enlace; (c) viñeta compuesta/ilustrativa, identificada como tal; (d) guía sin caso. No es obligatorio tener un paciente ni un final de recuperación.

No añadir conversaciones, medidas, dosis, visitas o desenlaces ausentes de la fuente. No convertir una cohorte transversal en seguimiento. No contar casos publicados como experiencias del equipo. Si no hay desenlace documentado, cerrar con límites y decisiones posibles, no con curación inventada.

Identificar la responsabilidad editorial real, sin credenciales ni revisión veterinaria ficticias. Diferenciar ilustraciones de fotografías clínicas; las generadas con IA llevan declaración visible en pie/hero, además de alt fiel. Ningún cocker ilustrativo se presenta como paciente identificado del estudio. Mantener continuidad anatómica y edad sin fabricar patología.

## 4. Límites clínicos coherentes

Leer `src/pages/politica-editorial.astro` y la política pública vigente. No diagnosticar por aspecto ni publicar pautas de inicio/ajuste de fármacos para uso del lector. No añadir dosis mg/kg, escalados o suspensiones por cuenta propia. Si una dosis histórica resulta indispensable para comprender un estudio, debe estar documentada, claramente atribuida y justificada en el contrato; nunca como recomendación aplicable. Si contradice la política editorial, no publicarla hasta resolverlo.

Recetas, proporciones, suplementos y productos requieren evidencia específica y límites individuales. No prometer dieta completa, prevención de enfermedad, recuperación o supervivencia sin respaldo aplicable. Una experiencia doméstica no demuestra causalidad clínica. Mostrar señales para parar/consultar junto a la maniobra, no solo en el descargo final.

## 5. Promesas y recursos reales

Inventariar todo lo que se anuncia: PDF, vídeo, plantilla, checklist, animación, calculadora y enlaces internos. Para cada uno: ubicación, propósito, ruta/destino, estado (planificado/creado/verificado), responsable y evidencia de prueba.

- Brief: puede planificar un recurso pendiente, pero no presentarlo como disponible. El contrato debe convertirlo en gate de publicación o retirar la promesa.
- Artículo: ninguna promesa de descarga o reproducción sin recurso útil accesible. No IDs de Blogger, placeholders, botones sin destino ni enlaces 404. Una imagen estática no es un vídeo.
- Antes de publicar: abrir enlace/archivo, confirmar contenido y tipo reales (un 200 con página de error no vale), reproducir vídeo y completar recorrido local de herramientas sin enviar mensajes externos. Comprobar alt, dimensiones, carga y teclado/móvil; un build no demuestra funcionamiento.
- Tras desplegar: verificar las URL públicas, imágenes y recursos prometidos, estado HTTP y navegación principal. Si solo se comprobó local, declararlo. No marcar Publicado hasta confirmar el despliegue.

## 6. Auditoría y límite de iteraciones

Quien crea/corrige no emite su auditoría independiente. El auditor lee los archivos finales y verifica por sí mismo; puede inspeccionar evidencia previa identificada como tal, sin afirmar que repitió pruebas. Un APTO mecánico no resuelve fuentes ni utilidad.

Máximo tres rondas por documento auditado. Registrar número, versión/hash, hallazgos, correcciones y pendientes. Si no pasa la tercera, detener la corrección/publicación de ese documento y consultar al usuario con el motivo. No reiniciar la numeración ni abrir rondas ocultas para eludir el límite. Los briefs ya aprobados no se reabren por producir imágenes, salvo fallo nuevo que afecte a su contrato.

Bloquean: identificador erróneo presentado como válido; afirmación clave sin respaldo; caso real sin procedencia aclarada; ilustración presentada como evidencia clínica; pauta contradictoria con la política; recurso prometido ausente/roto; instrucciones editoriales filtradas; prueba indispensable pendiente. Distinguir fallo confirmado de limitación de acceso. No aprobar por longitud ni rechazar solo por brevedad.

## 7. Cierre y evidencias

Informe con alcance, fecha y versión, registro fuente→afirmación→localización, procedencia narrativa, valor propio, recursos prometidos y pruebas, coherencia clínica y pendientes. Registrar separación entre validación local y pública, sin garantías de AdSense ni diagnóstico de acción manual por una captura de rechazo.

Fuentes oficiales consultadas el 2026-10-16:
- https://support.google.com/adsense/answer/10015918?hl=es — contenido original, experiencia y entrega de lo anunciado.
- https://support.google.com/publisherpolicies/answer/11035931?hl=es — servicios prometidos y políticas de spam.
- https://support.google.com/webmasters/answer/9044175?hl=es#thin-content — acciones manuales; enlazarlo no acredita una sanción del sitio.
