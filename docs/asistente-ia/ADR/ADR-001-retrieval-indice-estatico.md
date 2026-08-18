# ADR-001 — Sistema de retrieval: índice estático generado en build

**Estado:** Propuesto (pendiente de aprobación humana) · **Fecha:** 2026-08-17

## Contexto
Hay que elegir dónde vive el índice de routing: AI Search (gestionado), Vectorize (BD vectorial), o un artefacto estático generado en build. Catálogo actual: 16 artículos + ~10–15 temas externos. Requisito dominante: dos consultas equivalentes deben producir la misma decisión (consistencia), con evidencia auditable.

## Decisión
Índice estático `routing-index.json` generado en `npm run build`: embeddings bge-m3 (o el ganador del bake-off) precalculados vía API REST, términos lexicales normalizados y umbrales calibrados, versionado y desplegado atómicamente con el sitio. Scoring (coseno + BM25 de char-n-gramas + fusión RRF) ejecutado en memoria en el Worker.

## Alternativas consideradas
- **AI Search:** pipeline gestionado pero parcialmente opaco (chunking/rewriting no controlables al detalle), indexado asíncrono desacoplado del deploy, servicio y consola adicionales. Sobredimensionado para ≤50 documentos. Rechazada.
- **Vectorize:** control total pero añade una llamada de red al camino crítico y un proceso de sincronización que puede divergir del deploy. Sin ventaja alguna a esta escala. Rechazada hoy.

## Consecuencias
- (+) Determinismo máximo; índice auditable en git; cero servicios nuevos; retrieval degradable a lexical puro sin red.
- (−) Script de build propio que mantener; re-embebido al cambiar de modelo de embedding.
- **Disparador de revisión:** si el catálogo supera ~500 documentos, se indexa a nivel de chunk, o el artefacto supera ~2 MB, migrar el backend de `retrieve()` a Vectorize (la interfaz ya lo aísla).
