# ADR-003 — Fuentes veterinarias externas: colección curada en el repositorio

**Estado:** Propuesto (pendiente de aprobación humana) · **Fecha:** 2026-08-17

## Contexto
Para consultas sin artículo propio (tos, diarrea, bultos, vómito…) el asistente debe dar orientación fundamentada en fuentes veterinarias autorizadas, sin búsquedas web abiertas y no auditables por consulta.

## Decisión
Crear `src/content/assistant/topics/*.md`: ~10–15 documentos editoriales de "tema sin artículo", cada uno con (a) síntesis prudente redactada por el equipo, (b) señales de urgencia del tema, (c) citas explícitas a las fuentes usadas (WSAVA, AAHA, AVMA, Merck Veterinary Manual, VCA Hospitals u otras primarias, con URL y fecha de consulta), (d) `fallbackAdvice` determinista. Se indexan igual que los intents y el LLM solo parafrasea la síntesis.

## Alternativas consideradas
- **Búsqueda web en runtime:** no auditable, latencia y coste variables, riesgo de fuentes basura. Prohibida por requisitos. Rechazada.
- **RAG sobre las webs de las fuentes (AI Search sobre dominios externos):** contenido de terceros cambiante, posible incumplimiento de términos, chunks fuera de contexto clínico. Rechazada.
- **Confiar en el conocimiento paramétrico del LLM:** inventa fuentes y no es auditable. Rechazada.

## Consecuencias
- (+) Cada afirmación del asistente es trazable a un archivo versionado con sus citas; el mismo flujo editorial (redactor/auditor separados de AGENTS.md) aplica a los topics.
- (−) Trabajo editorial inicial (~10–15 documentos) y revisión anual programada de vigencia de las fuentes.
- Los temas se eligen por frecuencia real: síntomas comunes de perros senior sin guía propia (tos, diarrea, vómito, bultos, ojo rojo, prurito ótico, miedo a ruidos, cojera aguda, halitosis súbita, anorexia).
