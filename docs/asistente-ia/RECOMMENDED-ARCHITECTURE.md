# RECOMMENDED-ARCHITECTURE — Router determinista con índice estático + generación desacoplada

## 1. Recomendación final

**Opción C**: índice de routing estático generado en build (documentos de intención + embeddings bge-m3 precalculados), scoring híbrido determinista en el Worker, decisión de artículo por umbrales calibrados, y generación desacoplada vía AI Gateway con validación semántica dentro del reintento y fallback determinista total.

### Justificación

1. **Determinismo (requisito 5):** el índice y sus vectores viajan con el deploy; la decisión es una función pura de scores. La reproducibilidad exige reutilizar el mismo artefacto versionado y no presupone que dos inferencias remotas produzcan bytes idénticos. Dos consultas iguales producen la misma clasificación, la misma decisión y el mismo artículo; solo la redacción del consejo puede variar.
2. **Escala real del problema:** 16 artículos (+~10–15 temas externos). Un barrido de coseno sobre ≤50 vectores en memoria cuesta microsegundos; Vectorize o AI Search añaden red, sincronización y opacidad sin aportar nada a este tamaño (ver ARCHITECTURE-OPTIONS.md).
3. **Los falsos positivos se atacan en la fuente:** se indexan **documentos de intención curados**, no cuerpos con enlaces internos y síntomas secundarios (P1/P5 de la auditoría).
4. **Resiliencia:** el canal lexical local funciona sin red; el fallback final no depende de ninguna IA; nunca 503.
5. **Coste:** retrieval ≈ un embedding de ~30 tokens (~$2·10⁻⁶); la generación pasa de ~20k tokens de entrada a ~1,5k (reducción >90 %).

## 2. Diagrama de componentes

```
BUILD (CI / npm run build)                     RUNTIME (Worker)
┌──────────────────────────────┐   ┌─────────────────────────────────────────┐
│ src/content/blog/*.mdx       │   │ POST /api/ask                           │
│ src/content/assistant/       │   │  1 Normalización                        │
│   intents/*.md   (routing)   │   │  2 Triage determinista ──▶ respuesta    │
│   topics/*.md    (externos)  │   │        │ (gate)            urgente fija │
│   safety/*.md    (triage)    │   │  3 Caché KV (hash) ──▶ hit              │
│        │                     │   │  4 Retrieval híbrido                    │
│  build-routing-index.ts      │   │     · embed consulta (bge-m3)           │
│  (embeddings vía REST,       │   │     · coseno vs índice en memoria       │
│   términos lexicales,        │   │     · BM25 char-n-gramas local          │
│   umbrales calibrados)       │   │     · fusión RRF + rerank top-3         │
│        ▼                     │   │  5 Decisión determinista                │
│  routing-index.json ─────────┼──▶│     artículo / sin-artículo / ambigua   │
│  (versionado con el deploy)  │   │  6 Grounding (snippet del doc elegido)  │
└──────────────────────────────┘   │  7 Generación (AI Gateway:              │
                                   │     primario + fallback + timeout)      │
     AI Gateway                    │  8 Validación semántica (en el retry)   │
  ┌────────────────┐               │  9 Fallback determinista (plantillas)   │
  │ caché·retry·   │◀──────────────│ 10 Respuesta JSON + telemetría anónima  │
  │ fallback modelo│               └─────────────────────────────────────────┘
  └────────────────┘
```

## 3. Fases del pipeline

### 3.1 Normalización
- NFD, minúsculas, sin tildes (reutiliza `normalizeText`), colapso de espacios, recorte a 500 chars.
- **No** se corrigen erratas explícitamente: la tolerancia viene del canal semántico (contexto) y del lexical por **char-n-gramas** (3-gramas: "ccasa"→{cca,cas,asa} solapa con "casa").
- Se calcula `queryFingerprint = HMAC-SHA-256(normalizada, secreto)` para caché y telemetría (nunca se registra el texto). El `keyId` permite rotar el secreto sin confundir fingerprints de generaciones distintas.

### 3.2 Triage de seguridad (determinista, en dos partes)
- **Gate de emergencia:** (a) reglas por patrones ampliadas (variantes "me a mordido", "no respira", "convulsión"); (b) similitud coseno contra **prototipos de emergencia** embebidos en el índice (frases canónicas: obstrucción urinaria, GDV, disnea, colapso, convulsión, ingestión tóxica…), umbral alto calibrado. Ambos deterministas. Si dispara → respuesta urgente de plantilla, **sin generación y sin recomendación de artículo** salvo que el propio protocolo la defina (p. ej. mordedura → agresividad-tardía, Caso C, definido en la plantilla, no por el LLM).
- **Anotación de riesgo:** etiquetas no bloqueantes (`mordedura`, `ingestion`, `dolor`, `persona_herida`) que acompañan la consulta y condicionan el prompt de generación y la validación.

### 3.3 Retrieval híbrido (sobre documentos de intención)
Cada documento de intención (`src/content/assistant/intents/<slug>.md`) contiene: título del artículo, síntomas primarios, paráfrasis coloquiales, erratas/regionalismos frecuentes, y **negativos** ("no cubre: tos, vómito por basura…"). Los negativos no se embeben: se usan como lista de exclusión lexical en la decisión.

- Canal semántico: coseno(embed(consulta), vector del documento). bge-m3 es multilingüe y puntúa bien en español.
- Canal lexical: BM25 sobre 3-gramas de caracteres de los términos del documento (tolerante a erratas).
- Fusión: Reciprocal Rank Fusion (k=60) o combinación lineal calibrada; **empates rotos por orden alfabético de slug** (determinismo total).
- Rerank de top-3 con `@cf/baai/bge-reranker-base` contra el resumen del documento — es *otra feature* opcional de la decisión, solo se activa si el bake-off demuestra beneficio. Si se habilita y falla, la decisión usa solo fusión (mismo camino determinista, umbrales alternativos calibrados).

### 3.4 Decisión determinista (contrato central)
Con `s1, s2` = scores fusionados de top-1 y top-2:

| Condición | Resultado |
|---|---|
| `s1 ≥ T_alto` y `s1 − s2 ≥ M` | Mostrar top-1 |
| `s1 ≥ T_alto` y `s1 − s2 < M` | **Ambigua**: mostrar top-1 y, si top-2 ≥ T_alto, también top-2 como "también puede interesarte" (máx. 2) |
| `T_bajo ≤ s1 < T_alto` | Zona gris: mostrar solo si el reranker confirma (`r1 ≥ R_min`); si no, sin artículo |
| `s1 < T_bajo` | Sin artículo → ruta de temas externos |

- `T_alto`, `T_bajo` y `M` se **calibran offline por separado** para los modos `hybrid` y `lexical-only`, y cada juego se versiona dentro de `routing-index.json`. `R_min` solo existe en el juego híbrido cuando el reranker está habilitado; reranker deshabilitado significa `R_min = null`, no un valor numérico ficticio.
- Los top-N que matcheen la lista de exclusión lexical del documento se descartan antes de decidir (pregunta 4).
- Si el resultado es "sin artículo", se repite el mismo scoring contra los **temas externos** (`topics/*.md`: tos, diarrea, bultos, vómito…); si tampoco superan `T_bajo`, orientación genérica.

### 3.5 Grounding
- Con artículo: snippet curado (~400–600 chars) incluido en el propio documento de intención — redactado editorialmente, sin enlaces.
- Sin artículo con tema externo: el documento de tema contiene la síntesis editorial **ya fundamentada** en fuentes autorizadas (WSAVA, AAHA, AVMA, Merck Veterinary Manual, VCA Hospitals), con las citas en el archivo (auditable en git). El LLM nunca busca fuentes: parafrasea la síntesis.

### 3.6 Generación (desacoplada)
- Entrada: consulta + etiquetas de riesgo + snippet de grounding + decisión ya tomada. **Nunca el catálogo. Nunca elige slug.**
- Salida: `{ advice: string }` con `response_format: json_schema`, 50–110 palabras, temperature ≤0.2.
- Vía **AI Gateway**: timeout por petición (~5 s), 1 retry, fallback de modelo (Dynamic Routing) primario→secundario, analytics.
- Modelos: candidato primario y fallback salen del bake-off (MODEL-EVALUATION.md); no se fija todavía ningún modelo ni pareja de producción.

### 3.7 Validación semántica y de seguridad (dentro del retry)
Checklist determinista sobre `advice`:
1. JSON válido con solo `advice` string no vacío.
2. 40–130 palabras; sin `<`, `{`, "slug", "none", URLs, Markdown.
3. **Lista negra de seguridad**: nombres de fármacos humanos frecuentes (ibuprofeno, paracetamol, omeprazol…), patrones de dosis (`\d+\s?(mg|ml|comprimid)`), "induce/provocar el vómito", "retira el agua/comida", "ayuno".
4. Idioma español (heurística de stopwords).
5. Coherencia con triage: si hay etiqueta `persona_herida`, debe mencionar atención sanitaria humana.
Fallo en cualquiera → reintento (máx. 2 generaciones en total) → si persiste, **plantilla determinista** del artículo/tema decidido (cada documento de intención incluye un `fallbackAdvice` editorial). La decisión de artículo ya está tomada y **no se pierde** aunque falle toda la generación (corrige P9).

### 3.8 Fallback completo (nunca 503)
| Falla | Respuesta |
|---|---|
| Embedding | Solo canal lexical local → misma función de decisión (umbrales lexicales) |
| Reranker | Decisión sin feature de rerank |
| Generación (ambos modelos) | `fallbackAdvice` de plantilla del documento decidido |
| Todo Workers AI | Triage por reglas + lexical local + plantillas → **siempre 200** |
| KV caché | Se ignora la caché |

### 3.9 Caché segura
- KV keyed por `assistant:v<indexVersion>:<fingerprintKeyId>:<queryFingerprint>`; valor: decisión + advice validado + metadatos; TTL 7 días. El fingerprint es HMAC-SHA-256, no SHA-256 simple.
- Solo se cachean respuestas **no urgentes** ya validadas; el gate de triage corre siempre antes de leer caché.
- La clave es un hash de la consulta normalizada: sin PII en claves ni en valores más allá del texto del consejo (que no repite la consulta). Invalidación automática al cambiar `indexVersion` (cada deploy con índice nuevo).
- El similarity caching (AI Search) no aplica; el caching exacto de AI Gateway es redundante con esta capa pero puede activarse para el embedding.

### 3.10 Observabilidad sin PII
- Log estructurado por consulta: `{queryHash, triage, decision, slug?, s1, s2, r1, retrievalPath, genModel, genAttempts, validationFail?, latencyMs por fase, cache}`. **Nunca el texto de la consulta ni el nombre de la mascota.**
- `logError` saneado: solo `error.name` + código de fase (el mensaje del proveedor puede contener el prompt — P12).
- AI Gateway analytics para coste/latencia/errores por modelo; Workers observability ya activada (`wrangler.jsonc`).
- Muestreo opcional **opt-in** para evaluación: el frontend puede ofrecer "¿Te ayudó?"; solo con consentimiento se almacena la consulta para el dataset.

### 3.11 Actualización del índice al publicar artículos
1. Autor publica `.mdx` + crea/actualiza su documento de intención (la skill editorial puede generar el borrador).
2. `npm run build` ejecuta `build-routing-index.ts`: valida frontmatter, embebe documentos nuevos/cambiados (hash de contenido → solo re-embebe deltas), regenera `routing-index.json`, corre un **smoke test de routing** (subset del dataset) y falla el build si la exactitud cae del umbral.
3. Deploy atómico: índice y contenido siempre coherentes.

## 4. Diagrama de secuencia (camino feliz con artículo)

```
Usuario→Frontend: consulta
Frontend→Worker: POST /api/ask {question}
Worker→Worker: normaliza + triage (no emergencia)
Worker→KV: GET hash → miss
Worker→WorkersAI: embed(consulta) [bge-m3, ~100ms]
Worker→Worker: coseno + BM25 + fusión (in-memory, <1ms)
Worker→WorkersAI: rerank top-3 [~80ms]
Worker→Worker: decisión: mostrar disfuncion-cognitiva-canina
Worker→AIGateway→WorkersAI: genera advice (snippet+etiquetas) [~1-2s]
Worker→Worker: validación semántica ✓
Worker→KV: PUT (async, waitUntil)
Worker→Frontend: 200 {answer, recommendations[1], source, retrieval, confidence}
```

## 5. Contratos

### Entrada (sin cambios)
```json
POST /api/ask  { "question": "string 3..500" }
```

### Salida JSON compatible con el frontend actual
```json
{
  "answer": "string",
  "recommendations": [ { "title", "description", "href", "pillar" } ],
  "source": "emergency|clarification|ai|articles|topic|generic",
  "retrieval": "hybrid|lexical-only|cache|none",
  "confidence": "high|ambiguous|low"
}
```
Este JSON es el contrato que consume hoy el frontend. No es el tipo interno V2: la integración futura usará un adaptador explícito V2→V1 y decidirá cómo mapear `topic`, `generic`, `hybrid` y `lexical-only` a los valores legados.

### Contratos internos (interfaces estables para tests y shadow mode)
- `triage(normQuery, semanticRepresentation?) → Promise<{gate: EmergencyProtocol|null, tags: RiskTag[], semanticRepresentation}>`
- `retrieve(normQuery, semanticRepresentation?) → Promise<{candidates: Scored[], path: 'hybrid'|'lexical-only'}>`
- `decide(candidates, thresholdsForMode) → {kind: 'article'|'topic'|'none', slugs: string[], confidence}`
- `generate(context) → Promise<{advice, model, attempts}>`
- `validate(generation, context) → {ok: boolean, reasons: string[]}`
- `buildFallback(context) → {advice, source, retrieval}`; el contexto contiene decisión, grounding, documentos decididos, protocolo y riesgos, y el resultado no puede cambiar slugs.

## 6. Límites de responsabilidad del LLM

| Decisión | Responsable |
|---|---|
| ¿Es emergencia? | **Determinista** (reglas + prototipos) |
| ¿Qué artículo mostrar? ¿Mostrar alguno? | **Determinista** (scores + umbrales) |
| ¿Qué fuentes fundamentan el consejo? | **Editorial** (documentos curados en git) |
| Redacción del consejo | LLM, validado, con plantilla de respaldo |
| ¿La redacción es segura? | **Determinista** (validador) + prompt |

## 7. Privacidad (resumen)
- Consultas: se envían a Workers AI (procesador dentro de Cloudflare, la misma plataforma que ya sirve el sitio) y no se persisten. La caché KV guarda solo el hash como clave y la respuesta como valor; la consulta original nunca se almacena.
- Logs: sin texto de consulta; retención de AI Gateway configurada al mínimo o logging desactivado para la ruta de generación.
- Frontend ya advierte "no incluyas nombres…"; se mantiene.

## 8. Qué NO hace esta arquitectura
- No busca en la web en runtime.
- No deja al LLM elegir slugs ni fuentes.
- No usa el cuerpo completo de los artículos para routing.
- No requiere servicios nuevos (R2/Vectorize/AI Search/D1). La migración a Vectorize queda definida como evolución si el catálogo supera varios cientos de documentos (misma interfaz `retrieve`).
