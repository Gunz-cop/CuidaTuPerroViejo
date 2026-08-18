# MIGRATION-PLAN — Migración por fases, reversible y verificable

Principio: la página `/asistente-ia` y `/api/ask` actuales siguen sirviendo tráfico sin cambios hasta la fase 7. Cada fase es pequeña, tiene criterio de salida verificable y rollback inmediato.

## Fase 0 — Preparación (sin tocar producción)
- Crear `src/content/assistant/` (intents, topics, safety) con sus schemas; redactar los 16 documentos de intención + 10–15 temas externos + prototipos de triage (trabajo editorial).
- Congelar dataset de evaluación (EVALUATION-PLAN.md) y ejecutar el bake-off (MODEL-EVALUATION.md) contra Workers AI **fuera del sitio** (scripts sueltos).
- **Salida:** documentos aprobados por revisión editorial; modelos y umbrales preliminares elegidos.
- **Rollback:** borrar archivos; nada desplegado.

## Fase 1 — Índice
- Implementar `build-routing-index.ts` (embeddings vía REST con caché por hash, umbrales, versión); integrarlo en `npm run build` sin que ningún código runtime lo consuma aún.
- **Salida:** `routing-index.json` reproducible (dos builds → mismo artefacto salvo re-embeddings); smoke test de routing en CI en verde.
- **Rollback:** quitar el paso del build.

## Fase 2 — Retrieval en shadow mode
- Nuevo módulo `src/lib/assistant/v2/` con `triage/retrieve/decide` (sin generación). En `/api/ask`, tras responder con el flujo actual, ejecutar v2 vía `ctx.waitUntil` y **loggear solo la comparación** `{queryHash, v1Slug, v2Decision, scores}`; la respuesta al usuario no cambia.
- **Salida:** ≥2 semanas o ≥300 consultas de datos shadow; tasa de acuerdo analizada; umbrales recalibrados si hace falta (los desacuerdos se auditan con el dataset, no con las consultas reales crudas).
- **Rollback:** eliminar el `waitUntil` (una línea).

## Fase 3 — Evaluación formal
- Correr la suite completa (170 casos × 10 repeticiones de decisión, fallas simuladas, concurrencia) contra preview con v2 completo (aún sin exponer).
- **Salida:** todas las métricas de EVALUATION-PLAN.md en objetivo; resultados publicados en `docs/asistente-ia/eval/`.
- **Rollback:** n/a (no hay exposición).

## Fase 4 — Generación desacoplada + AI Gateway
- Implementar `generate/validate/fallback` v2; crear el gateway (timeouts, retry, fallback de modelo, logging mínimo); probar solo en preview y en los tests.
- **Salida:** tasa de plantilla ≤5 %, cero violaciones de seguridad en 200 generaciones, p95 ≤4 s en preview.
- **Rollback:** n/a.

## Fase 5 — Integración frontend (retrocompatible)
- `/api/ask` v2 mantiene el contrato `{answer, recommendations, source, retrieval}` + `confidence`. Ajustar frontend solo para degradación (mostrar respuesta genérica en vez de ocultar el panel ante error) — mejora válida también para v1.
- **Salida:** frontend funciona idéntico con respuestas v1 y v2 (test manual + live suite).
- **Rollback:** revertir commit de frontend (independiente del backend).

## Fase 6 — Canary
- Flag de entorno `ASSISTANT_V2_PERCENT` (0–100) en el Worker: enrutado determinista por `queryHash % 100` (la misma consulta siempre cae en la misma variante → consistencia durante el canary). Empezar 10 % → 50 % → 100 %, ≥3 días por escalón, vigilando: 5xx (=0), tasa de plantilla, latencia p95, decisiones con confidence baja.
- **Salida:** 100 % durante 1 semana sin regresiones.
- **Rollback:** `ASSISTANT_V2_PERCENT=0` (cambio de variable, sin deploy de código).

## Fase 7 — Producción y retirada del flujo anterior
- Fijar v2 como único camino; eliminar `generateAssistantDecision`, `verifyCatalogRecommendation`, `findFallbackRecommendations` y el catálogo-en-prompt; conservar `guidance.ts` refactorizado como plantillas del triage.
- Actualizar scripts npm (`test:assistant*` → suites v2); actualizar AGENTS.md si el flujo editorial cambia (documento de intención obligatorio al publicar).
- **Salida:** código v1 eliminado; suites en verde; STATUS.md cerrado.
- **Rollback:** revert del commit de retirada (v1 sigue en la historia de git; el canary flag se mantiene una release más como seguro).

## Riesgos de migración y mitigación
- **Doble coste durante shadow/canary:** acotado (retrieval v2 ≈ $2·10⁻⁶/consulta; en shadow no se genera texto).
- **Divergencia editorial (intents desactualizados):** gate de CI de la Fase 1 lo bloquea en build.
- **Cambio de umbral tras recalibrar en Fase 2:** requiere re-ejecutar Fase 3 antes de avanzar (regla explícita).
