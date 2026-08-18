# ADR-005 — Caché segura y privacidad de consultas

**Estado:** Propuesto (pendiente de aprobación humana) · **Fecha:** 2026-08-17

## Contexto
Las consultas contienen lenguaje libre con nombres de mascotas y, potencialmente, datos personales. Se quiere cachear para coste/latencia sin exponer PII en claves, valores ni logs, y sin servir jamás una emergencia desde caché obsoleta.

## Decisión
1. **Caché KV** con clave `assistant:v<indexVersion>:<keyId>:<HMAC-SHA-256(consulta normalizada)>`; valor: `{decision, slugs, advice, source, confidence}` — la consulta original nunca se almacena. TTL 7 días. Escritura asíncrona (`waitUntil`). El secreto no se registra y su `keyId` forma parte de la clave para soportar rotación.
2. El **gate de triage corre siempre antes de consultar la caché**; solo se cachean respuestas no urgentes ya validadas. Cambiar `indexVersion` en cada deploy con índice nuevo invalida todo.
3. **Logs sin texto de consulta**: solo `queryHash`, códigos de fase, scores, latencias y modelo. `logError` registra `error.name` + fase, nunca el mensaje completo del proveedor (puede contener el prompt).
4. **AI Gateway**: retención de logs al mínimo (o logging deshabilitado para esta ruta); no se activan logs de payload. El caching exacto del gateway puede activarse solo para el endpoint de embeddings (entrada = consulta ya enviada al proveedor de todos modos).
5. El dataset de evaluación nunca incorpora consultas reales literales; se re-redactan editorialmente.

## Alternativas consideradas
- Caché por texto normalizado en claro: legible en la consola KV → PII expuesta. Rechazada.
- Similarity caching (estilo AI Search, MinHash/LSH): útil a futuro, pero introduce riesgo de servir la respuesta de una consulta *parecida pero clínicamente distinta* ("vomita" vs "vomita sangre"). Solo se consideraría con triage previo garantizado y evaluación específica. Aplazada.
- Sin caché: viable (el coste por consulta es bajo), pero pierde latencia en repetidas triviales. La caché es **opcional y desactivable**; el sistema debe funcionar idéntico sin ella.

## Consecuencias
- (+) Sin PII en reposo fuera del propio Workers AI transitorio; repetidas exactas a ~10 ms; invalidación atómica por versión.
- (−) Solo acierta en repeticiones exactas post-normalización (aceptable: las sugerencias-chip del frontend son repetidas exactas frecuentes).
