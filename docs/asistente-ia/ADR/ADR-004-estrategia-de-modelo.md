# ADR-004 — Estrategia de modelo: bake-off por rol y pareja primario/fallback

**Estado:** Propuesto (pendiente de aprobación humana; la selección concreta depende del bake-off) · **Fecha:** 2026-08-17

## Contexto
No debe elegirse un modelo por reputación; sustituir Qwen no arregla la arquitectura. Cada rol (embedding, rerank, generación, triage asistido) tiene requisitos distintos.

## Decisión
1. Selección por **bake-off reproducible en español** (MODEL-EVALUATION.md): candidatos, dataset congelado, repeticiones, métricas con umbrales y criterios descalificadores (violaciones de seguridad = 0; retrieval no determinista = fuera).
2. Generación con **pareja primario/fallback de familias distintas** (p. ej. Llama + Qwen/Mistral) enrutada por AI Gateway Dynamic Routing, para no compartir modos de fallo ni ventanas de deprecación.
3. Embedding único para índice y consulta (obligatorio que coincidan); su cambio implica re-build completo del índice y recalibración de umbrales — procedimiento documentado.
4. **Proceso de recambio:** ante deprecación o regresión de un modelo, se re-ejecuta el bake-off reducido (solo el rol afectado) antes de cambiar producción.

## Alternativas consideradas
- Mantener `qwen3-30b-a3b-fp8` sin evaluar: es el statu quo sin evidencia. Rechazada (entra como candidato, no como incumbente).
- Modelo externo (Anthropic/OpenAI vía AI Gateway BYOK) como primario: mejor calidad probable pero coste/latencia/dependencia extra para redactar 100 palabras guiadas. Solo se contempla como fallback de última instancia si ningún modelo de Workers AI aprueba seguridad.

## Consecuencias
- (+) Decisión defendible con datos propios en español; resiliencia ante deprecaciones.
- (−) Coste único del bake-off (<$2 + tiempo); mantenimiento de dos prompts probados (primario/fallback).
