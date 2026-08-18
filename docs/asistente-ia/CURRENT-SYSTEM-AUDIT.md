# CURRENT-SYSTEM-AUDIT — Asistente IA de cuidatuperroviejo.com

**Fecha de auditoría:** 2026-08-17
**Alcance:** `/asistente-ia` (frontend), `/api/ask` (backend), `src/lib/assistant/*`, scripts de prueba, configuración Cloudflare, catálogo editorial.

---

## 1. Flujo actual completo

1. El usuario escribe una consulta libre (≤500 caracteres) en [asistente-ia.astro](../../src/pages/asistente-ia.astro) y el frontend hace `POST /api/ask` con `{ question }`.
2. [ask.ts](../../src/pages/api/ask.ts:59) (`POST`):
   1. Valida tamaño y formato (`parseQuestion`, líneas 32–57): JSON, 3–500 caracteres, ≤2 KB de cuerpo.
   2. Carga **todo** el catálogo con `getArticleCatalog()` ([catalog.ts:23](../../src/lib/assistant/catalog.ts:23)) — 16 artículos publicados, cada uno con `routingText` de hasta ~4.000 caracteres (título + metaDescription + keyword + extracto del cuerpo).
   3. Ejecuta triage lexical determinista: `getEmergencyAnswer()` y `getUrinaryClarificationAnswer()` ([guidance.ts](../../src/lib/assistant/guidance.ts)) — listas fijas de frases normalizadas.
   4. Calcula un fallback lexical `findFallbackRecommendations()` ([retrieval.ts:63](../../src/lib/assistant/retrieval.ts:63)) por solapamiento de tokens ≥5 caracteres.
   5. Si el binding `AI` existe:
      - `generateAssistantDecision()` ([generation.ts:52](../../src/lib/assistant/generation.ts:52)): **una sola llamada** a `@cf/qwen/qwen3-30b-a3b-fp8` que recibe el catálogo completo en el system prompt y devuelve `{ answer, recommended_slug }` con `response_format: json_schema`, `max_tokens: 300`, `temperature: 0.1`, con 2 intentos (`runWithRetry`).
      - `verifyCatalogRecommendation()` ([retrieval.ts:34](../../src/lib/assistant/retrieval.ts:34)): reranker `@cf/baai/bge-m3` puntúa **solo** el artículo que Qwen eligió contra la consulta; umbral fijo `0.4`.
      - Responde con `answer` (emergencia > clarificación > respuesta de Qwen) y `recommendations` (0 o 1).
   6. Si la ruta de IA lanza excepción: cae al triage determinista, luego al fallback lexical con `getArticleContingencyAnswer()`, y si nada aplica → **HTTP 503**.
3. El frontend pinta `answer` y las tarjetas de `recommendations`; en error muestra el mensaje y oculta el resultado.

### Diagrama (estado actual)

```
Usuario ─▶ asistente-ia.astro ─▶ POST /api/ask
                                     │
                     ┌───────────────┼──────────────────────┐
                     ▼               ▼                      ▼
             parseQuestion    getArticleCatalog()    triage lexical
             (validación)     (16 art. × ~4KB)       (emergencia/urinario)
                                     │
                         ¿binding AI disponible?
                          │ sí                  │ no / excepción
                          ▼                     ▼
        Qwen3-30B (catálogo completo      fallback lexical
        en prompt) → {answer, slug}       (solapamiento tokens)
                          │                     │
                          ▼                     ├─ triage → respuesta fija
        bge-m3 rerank SOLO del slug             ├─ ≥1 artículo → contingencia
        elegido (umbral 0.4)                    └─ nada → HTTP 503
                          │
                          ▼
        JSON {answer, recommendations, source, retrieval}
```

## 2. Responsabilidades por módulo

| Módulo | Responsabilidad | Observación |
|---|---|---|
| [ask.ts](../../src/pages/api/ask.ts) | Orquestación, validación, logging | Mezcla triage, retrieval, generación y formato de respuesta en un solo handler |
| [catalog.ts](../../src/lib/assistant/catalog.ts) | Construye `routingText` por artículo | Extracto de 4.000 chars del **cuerpo completo**, incluye enlaces internos y síntomas secundarios |
| [generation.ts](../../src/lib/assistant/generation.ts) | Llamada a Qwen + parseo | Qwen decide slug **y** redacta el consejo en la misma llamada |
| [retrieval.ts](../../src/lib/assistant/retrieval.ts) | Reranker de verificación + fallback lexical | El reranker no compara candidatos; solo verifica a posteriori |
| [guidance.ts](../../src/lib/assistant/guidance.ts) | Triage por frases fijas + respuestas enlatadas | Frágil ante variantes ("me a mordido", "no respira") |
| [types.ts](../../src/lib/assistant/types.ts) | Tipos compartidos | Correcto |
| [asistente-ia.astro](../../src/pages/asistente-ia.astro) | UI, fetch, render | Sin timeout de cliente ni reintento; un fallo de red deja solo el mensaje de error |

## 3. Problemas encontrados (con evidencia)

### P1 — Catálogo completo en cada prompt (~64 KB)
`routingText` se trunca a 4.000 chars ([catalog.ts:21](../../src/lib/assistant/catalog.ts:21)) y se concatena para los 16 artículos ([generation.ts:58-60](../../src/lib/assistant/generation.ts:58)). ≈64.000 caracteres (~18–22k tokens) por consulta. Coste alto, latencia alta, y el contexto largo degrada la selección: el modelo ve enlaces internos y síntomas secundarios de todos los artículos, fuente directa de falsos positivos (Caso A: elegir "prevención de caídas" por la frase "se pierde… se levanta"). **Confirmado.**

### P2 — Selección y redacción acopladas
Una sola llamada decide `recommended_slug` y redacta `answer` ([generation.ts:62-91](../../src/lib/assistant/generation.ts:62)). No hay forma de hacer determinista la decisión de artículo sin rehacer la generación; dos ejecuciones de la misma consulta pueden elegir artículos distintos (temperature 0.1 reduce pero no elimina la variación, y el orden/contenido del catálogo influye). **Confirmado.**

### P3 — Validación sintáctica, no semántica
`parseGeneratedAnswer` ([generation.ts:19-38](../../src/lib/assistant/generation.ts:19)) valida tipos y que el slug esté permitido, pero no valida el **contenido** de `answer`: puede contener restos de XML (`<articulo…>`), fragmentos JSON, texto del catálogo, "none", o consejo inseguro. No hay lista de comprobaciones semánticas (longitud en palabras, ausencia de dosis/medicación, idioma). **Confirmado.**

### P4 — Validación fuera del reintento
`runWithRetry` ([generation.ts:40-50](../../src/lib/assistant/generation.ts:40)) reintenta solo si `ai.run` **lanza**; el parseo inválido ocurre después ([generation.ts:93-94](../../src/lib/assistant/generation.ts:93)) y lanza sin reintentar. Una respuesta malformada de Qwen tira toda la ruta de IA aunque un segundo intento habría funcionado. **Confirmado.**

### P5 — Reranker que no compara candidatos
`verifyCatalogRecommendation` ([retrieval.ts:34-57](../../src/lib/assistant/retrieval.ts:34)) puntúa únicamente el artículo elegido por Qwen. Si Qwen elige mal pero el artículo comparte vocabulario (score ≥0.4), se confirma el error; si Qwen dice "none", nadie busca alternativas. El reranker está invertido: valida en lugar de seleccionar. **Confirmado.**

### P6 — Umbral único sin calibrar
`CATALOG_SCORE_THRESHOLD = 0.4` ([retrieval.ts:3](../../src/lib/assistant/retrieval.ts:3)) sin evidencia de calibración, sin margen top1–top2, sin distinción entre "claro", "ambiguo" y "sin artículo". **Confirmado.**

### P7 — Fallback lexical frágil
`findFallbackRecommendations` exige coincidencia **exacta** de tokens ≥5 chars tras normalización ([retrieval.ts:23-25](../../src/lib/assistant/retrieval.ts:23)). "bin"/"ccasa" (Caso A) no producen tokens útiles; sinónimos ("llora" vs "ladra") no coinciden. Además devuelve hasta 2 artículos, inconsistente con la ruta de IA que devuelve 0–1. **Confirmado.**

### P8 — Fallo combinado → HTTP 503
Si la ruta de IA falla, no hay triage aplicable y el fallback lexical no encuentra nada, se devuelve 503 ([ask.ts:127](../../src/pages/api/ask.ts:127)) y el frontend muestra solo el error. Viola el requisito "nunca debe quedar la interfaz sin respuesta". **Confirmado.**

### P9 — Sin timeouts, circuit breaker ni fallback de modelo
`ai.run` no tiene timeout propio; no hay `AbortSignal`, ni AI Gateway, ni modelo alternativo, ni presupuesto de latencia. El reranker (`verifyCatalogRecommendation`) ni siquiera tiene retry: una excepción suya invalida también la respuesta ya generada por Qwen ([ask.ts:74-106](../../src/pages/api/ask.ts:74)). **Confirmado y ampliado:** el fallo del reranker desperdicia una generación válida.

### P10 — Triage lexical incompleto y con doble personalidad
`getEmergencyAnswer` depende de frases literales normalizadas ([guidance.ts:5-55](../../src/lib/assistant/guidance.ts:5)). "me a mordido", "no respira" (sin "puede"), "convulsión" (sustantivo) no disparan. Además, cuando la ruta de IA funciona, la emergencia **sobrescribe el answer pero conserva la recomendación de Qwen** ([ask.ts:98-103](../../src/pages/api/ask.ts:98)): el usuario en emergencia ve la respuesta de urgencia junto a un artículo elegido por un modelo que no sabía que era emergencia. La llamada cara a Qwen se hace incluso cuando el triage ya decidió la respuesta. **Hallazgo adicional.**

### P11 — Tests live sin medición de estabilidad
[test-assistant-live.ts](../../scripts/test-assistant-live.ts) ejecuta 30 casos **una vez** cada uno, en lotes de 4, y falla/pasa binariamente. No mide repetibilidad (requisito 5), ni latencia, ni tasa de respuestas inválidas. [test-assistant-retrieval.ts](../../scripts/test-assistant-retrieval.ts) cubre solo parseo y triage con un catálogo sintético de 4 artículos. **Confirmado.**

### P12 — Privacidad
La consulta completa no se registra en `console.log` del flujo feliz (solo slugs y scores, [ask.ts:88-96](../../src/pages/api/ask.ts:88)) — correcto — pero:
- `logError` puede filtrar contenido si el mensaje de error del proveedor incluye el prompt.
- No hay política sobre nombres de mascota/persona en la consulta enviada a Workers AI (dato personal enviado a un tercero procesador, aceptable, pero sin documentar).
- No existe caché, así que no hay riesgo de claves de caché con PII **todavía**; cualquier diseño futuro debe hashear/normalizar.

### P13 — Sin separación de fases
Todo vive en el handler: normalización, triage, retrieval, decisión, generación y formato. No hay contratos entre fases ni puntos de inserción para shadow mode, evaluación o caché.

## 4. Riesgos del sistema actual

| Riesgo | Gravedad |
|---|---|
| Consejo generado inseguro que pasa la validación sintáctica (dosis, remedios caseros) | **Alta** — solo lo frena el prompt |
| Emergencia no detectada por variante léxica y tratada como consulta normal | **Alta** |
| Artículo incorrecto mostrado con apariencia de autoridad | Media-alta |
| 503 en fallo combinado (UI muda) | Media |
| Coste/latencia crecen linealmente con el catálogo (~4 KB por artículo nuevo) | Media, estructural |
| Inconsistencia entre ejecuciones idénticas | Media (daña confianza y SEO del asistente) |

## 5. Qué se puede reutilizar

- **Validación de entrada** (`parseQuestion`): límites de tamaño y formato correctos.
- **`normalizeText`** ([retrieval.ts:15](../../src/lib/assistant/retrieval.ts:15)): base sólida para normalización (quitar tildes, minúsculas).
- **Respuestas de triage redactadas** en [guidance.ts](../../src/lib/assistant/guidance.ts): el *contenido* es prudente y de calidad; el *mecanismo de disparo* es lo débil. Reutilizables como plantillas del fallback determinista.
- **Frontend** [asistente-ia.astro](../../src/pages/asistente-ia.astro): el contrato `{answer, recommendations[], source}` es razonable; solo necesita degradación (mostrar respuesta genérica en vez de ocultar el panel) y quizá metadatos (`confidence`, `triage`).
- **Suite de 30 casos live**: buen embrión del dataset de evaluación.
- **Frontmatter del catálogo** (`keywordPrincipal`, `metaDescription`, `pilar`): útil para construir documentos de routing.
- **Esquema JSON en `response_format`**: patrón correcto, se conserva para la fase de generación.

## 6. Qué debe eliminarse o sustituirse

| Pieza | Acción |
|---|---|
| Catálogo completo en el prompt (`articleContext`) | **Eliminar.** Sustituir por retrieval previo (embeddings + lexical) que entregue 0–3 candidatos |
| Decisión de slug por Qwen | **Eliminar.** La selección de artículo pasa a ser determinista (scores + umbrales calibrados) |
| `verifyCatalogRecommendation` (rerank de 1 candidato) | **Sustituir** por reranking de todos los candidatos recuperados |
| `findFallbackRecommendations` (tokens exactos) | **Sustituir** por índice lexical con normalización tolerante a erratas (o BM25 estático) como capa del retrieval híbrido, no como fallback aparte |
| Triage por listas de frases como única barrera | **Reforzar**: clasificador dedicado + las listas como red mínima determinista |
| 503 final | **Eliminar.** Siempre responder 200 con orientación conservadora determinista |
| Retry sin validación dentro | **Sustituir** por retry que envuelva generación + validación semántica |

## 7. Conclusión

La arquitectura actual es un "router LLM monolítico": un modelo generativo grande recibe todo el catálogo, decide y redacta a la vez, con verificación posterior débil y fallbacks quebradizos. Los problemas señalados en el encargo se confirman todos en el código, y aparecen dos adicionales (P10: emergencia + recomendación incoherente y llamada innecesaria a Qwen; P9 ampliado: el fallo del reranker desecha una generación válida). Cambiar de modelo no corrige nada de esto: el defecto es estructural (acoplamiento decisión/redacción y ausencia de retrieval real).
