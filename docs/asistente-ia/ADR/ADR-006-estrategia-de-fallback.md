# ADR-006 — Estrategia de fallback: degradación en escalera, nunca 503

**Estado:** Propuesto (pendiente de aprobación humana) · **Fecha:** 2026-08-17

## Contexto
Hoy una falla combinada termina en HTTP 503 y deja la interfaz sin respuesta (P8). No hay timeouts, ni fallback de modelo, ni respuesta degradada garantizada.

## Decisión
Escalera de degradación con presupuesto de latencia total (~6 s):

| Nivel | Falla | Degradación |
|---|---|---|
| 1 | Nada | Pipeline completo (embed + híbrido + rerank en zona gris + generación primaria) |
| 2 | Reranker | Decisión solo con fusión (umbrales alternativos calibrados) |
| 3 | Modelo generativo primario (timeout 5 s / error / validación fallida ×2) | Modelo fallback vía AI Gateway Dynamic Routing |
| 4 | Ambos generadores | `fallbackAdvice` editorial del documento decidido (la decisión de artículo se conserva) |
| 5 | Embedding | Canal lexical local (BM25 char-n-gramas) + misma función de decisión |
| 6 | Todo Workers AI | Triage por reglas + lexical local + plantillas deterministas |
| — | KV | Se ignora la caché |

Reglas: timeouts explícitos por llamada (embed 2 s, rerank 1,5 s, generación 5 s); máximo 2 generaciones en total (contando el fallback); la validación semántica vive dentro del bucle; **toda ruta termina en HTTP 200** con `source`/`retrieval` reflejando la degradación. Circuit breaker ligero: si N errores consecutivos de Workers AI en la isolate, saltar directo al nivel 5/6 durante un intervalo corto (estado en memoria del isolate; sin dependencia externa).

## Alternativas consideradas
- Reintentos agresivos multi-nivel: alarga la espera del usuario móvil más allá del presupuesto. Rechazada (1 retry por nivel como máximo).
- Circuit breaker con estado compartido (KV/DO): más preciso pero añade dependencia y latencia a la ruta de fallo. Aplazado; el breaker por isolate basta a este tráfico.
- Responder 503 con `Retry-After`: viola el requisito de UI nunca muda. Rechazada.

## Consecuencias
- (+) Requisito 6 cumplido por construcción; cada degradación es observable (`retrieval`, `source`, logs por fase).
- (−) Más ramas que testear — cubiertas por las fallas simuladas del EVALUATION-PLAN.md (stubs que lanzan, devuelven basura o exceden timeout).
