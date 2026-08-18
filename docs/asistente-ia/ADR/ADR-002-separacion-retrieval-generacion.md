# ADR-002 — Separación estricta entre selección de artículo y generación del consejo

**Estado:** Propuesto (pendiente de aprobación humana) · **Fecha:** 2026-08-17

## Contexto
Hoy Qwen recibe el catálogo completo (~64 KB) y decide el slug **y** el texto en una sola llamada (P1/P2 de la auditoría). Resultado: decisiones no deterministas, falsos positivos por síntomas secundarios, coste y latencia altos, y validación imposible de acotar.

## Decisión
1. La selección de artículo/no-artículo es una **función determinista** de los scores del retrieval híbrido y de umbrales calibrados (`T_alto`, `T_bajo`, margen `M`, `R_min`), con desempates deterministas. El LLM no ve el catálogo y no puede proponer slugs.
2. La generación recibe la decisión ya tomada + snippet de grounding + etiquetas de riesgo, y produce únicamente `{advice}` bajo json_schema.
3. La validación semántica corre **dentro** del bucle de reintento; si agota intentos, se usa el `fallbackAdvice` editorial del documento decidido — la decisión de artículo nunca se pierde por un fallo de generación.

## Alternativas consideradas
- Mantener al LLM como router con catálogo comprimido: reduce coste pero conserva el no-determinismo y los falsos positivos. Rechazada.
- LLM como "verificador" de la decisión determinista: añade latencia y reintroduce variabilidad en el camino crítico. Rechazada (el reranker cumple ese papel de forma determinista).

## Consecuencias
- (+) Repetibilidad de decisión = 1,0 por construcción; el prompt de generación baja de ~20k a ~1,5k tokens; el fallo de generación degrada a plantilla sin perder la recomendación.
- (−) La calidad del routing depende de documentos de intención y calibración (trabajo editorial + dataset); dos llamadas IA (embed + generación) en lugar de una — compensado de sobra por el tamaño del prompt.
