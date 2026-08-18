# ARCHITECTURE-OPTIONS — Alternativas para el asistente IA

**Contexto común a todas las opciones** (invariantes que resuelven los defectos estructurales; ver `CURRENT-SYSTEM-AUDIT.md`):

- La **selección del artículo es determinista** (scores + umbrales calibrados); el LLM nunca elige el slug.
- **Documentos de intención** curados por artículo para routing (síntomas primarios, paráfrasis coloquiales, erratas frecuentes), no el cuerpo completo con enlaces internos.
- **Triage de seguridad primero**, determinista, antes de cualquier retrieval o generación.
- Generación **desacoplada**: el LLM recibe la decisión ya tomada + fragmentos de fundamento, y solo redacta.
- **Validación semántica dentro del bucle de reintento**; fallback final 100 % determinista; nunca 503.
- Fuentes externas: colección **curada en el repositorio** de temas sin artículo (tos, diarrea, bultos…), fundamentada en fuentes veterinarias autorizadas; sin búsqueda web en tiempo de consulta.

Las opciones difieren en **dónde vive el índice de retrieval y quién lo opera**.

---

## Opción A — AI Search (servicio gestionado de Cloudflare)

### Componentes
- Instancia de AI Search indexando un bucket R2 con los documentos de intención (o el sitio web).
- Worker: triage → `aiSearch.search()` (híbrida semántica+keyword, reranking opcional) → decisión determinista sobre los scores → generación con Workers AI → validación → respuesta.
- AI Gateway delante de la generación.

### Flujo
Consulta → triage → AI Search (query rewriting + híbrida + rerank, `match_threshold`, `max_num_results`) → decisión por umbrales → generación desacoplada → validación → respuesta.

### Ventajas
- Indexado continuo gestionado (se reindexa al cambiar el bucket); chunking, embeddings, híbrida y reranking resueltos por la plataforma.
- Similarity caching (MinHash+LSH) integrado.
- Menos código propio de retrieval que mantener.

### Desventajas
- **Caja negra parcial**: chunking y modelo de embeddings los decide la plataforma; calibrar umbrales finos (margen top1–top2) depende de los scores que exponga.
- Pipeline de indexado asíncrono: ventana de desfase entre publicar un artículo y que el índice lo refleje; difícil de versionar junto al código.
- Requiere R2 + instancia AI Search adicionales; más superficie de proveedor para un catálogo de 16 documentos.
- El comportamiento puede cambiar con actualizaciones del servicio → riesgo para el requisito de consistencia estricta.
- Query rewriting gestionado añade una llamada LLM no controlada al camino crítico (latencia y no-determinismo).

### Estimaciones
- **Coste:** bajo (embeddings/rerank por uso, catálogo minúsculo); R2 despreciable.
- **Latencia:** media (servicio gestionado + rewriting opcional): ~300–800 ms el retrieval.
- **Complejidad operativa:** baja en código, media en configuración/observabilidad (otra consola).
- **Escalabilidad:** excelente (miles de docs).
- **Riesgo de inconsistencia:** medio (pipeline opaco y actualizable por el proveedor).
- **Dependencias:** R2, AI Search, Workers AI, AI Gateway.
- **Adecuación a 16 artículos:** sobredimensionada.

---

## Opción B — Vectorize + pipeline propio

### Componentes
- Índice Vectorize (vectores bge-m3 de los documentos de intención, metadatos con slug/tipo/umbral).
- Script de sincronización en CI/deploy que hace upsert de los documentos cambiados.
- Worker: triage → embed de la consulta (bge-m3) → `VECTORIZE.query(topK=5)` + canal lexical propio → fusión → rerank (bge-reranker-base) → decisión determinista → generación → validación.

### Ventajas
- Control total del chunking, embeddings, fusión y umbrales; scores estables y auditables.
- Escala a decenas de miles de documentos sin cambiar el diseño.
- Metadatos por vector permiten separar artículos de temas externos.

### Desventajas
- Una dependencia de red más en el camino crítico (query a Vectorize) con su propia latencia y modos de fallo.
- Sincronización índice↔contenido es un proceso aparte: puede divergir del deploy (vector huérfano de un artículo despublicado, etc.).
- El canal lexical (BM25/n-gramas) hay que construirlo igualmente en el Worker: Vectorize no lo aporta.
- Para 16–50 documentos, `topK` sobre un índice remoto no aporta nada frente a un barrido local.

### Estimaciones
- **Coste:** muy bajo (dimensiones almacenadas y consultadas mínimas).
- **Latencia:** media-baja: embed (~50–150 ms) + query Vectorize (~30–80 ms) + rerank.
- **Complejidad operativa:** media (script de sync, migraciones de índice, consistencia).
- **Escalabilidad:** excelente.
- **Riesgo de inconsistencia:** bajo-medio (deriva índice/contenido si falla la sync).
- **Dependencias:** Vectorize, Workers AI, AI Gateway.
- **Adecuación a 16 artículos:** correcta pero innecesaria hoy.

---

## Opción C — Índice estático generado en build (recomendada; ver RECOMMENDED-ARCHITECTURE.md)

### Componentes
- **`routing-index.json` generado en build**: para cada documento de intención (16 artículos + ~10–15 temas externos + prototipos de triage), el script de build llama una vez a la API REST de Workers AI para obtener su embedding bge-m3 y lo serializa junto a los términos lexicales normalizados. El artefacto se versiona con el deploy.
- Worker: triage determinista (reglas + similitud a prototipos de emergencia) → embed de la consulta (única llamada de retrieval en runtime) → coseno contra los ~30–45 vectores **en memoria** + BM25/char-n-gramas local → fusión → rerank opcional de top-3 → decisión determinista → generación desacoplada vía AI Gateway → validación → respuesta.
- Caché KV opcional keyed por hash de la consulta normalizada.

### Ventajas
- **Determinismo máximo**: mismo binario + mismo índice + embeddings deterministas ⇒ misma decisión siempre. El índice viaja con el deploy: imposible que diverja del contenido publicado.
- **Cero dependencias de red para el ranking** (solo el embedding de la consulta); el barrido de ≤50 vectores en el Worker cuesta microsegundos.
- Índice auditable en git: cada cambio de routing es un diff revisable; los umbrales se calibran offline contra el dataset y se versionan.
- Camino degradado natural: si falla el embedding, el canal lexical local sigue funcionando sin red.
- Coste mínimo: embeddings solo en build; en runtime, un embedding de ~30 tokens por consulta.

### Desventajas
- Script de build propio que mantener (aunque pequeño y testeable).
- El tamaño del artefacto crece con el catálogo (~4 KB/documento con vectores fp32 de 1024 dims; ~200 KB con 50 docs) — irrelevante hasta varios cientos de documentos.
- Migrar a Vectorize será necesario si el catálogo supera ~500–1.000 documentos o si se quiere indexar contenido a nivel de chunk; el diseño debe dejar la interfaz de retrieval abstraída para ese salto.
- La búsqueda híbrida y el rerank hay que implementarlos (igual que en B).

### Estimaciones
- **Coste:** el más bajo de las tres (~$0,000002 por consulta en retrieval; generación domina el coste).
- **Latencia:** la más baja: embed (~50–150 ms) + scoring local (<1 ms) + rerank opcional.
- **Complejidad operativa:** baja (un artefacto más en el build; sin servicios nuevos).
- **Escalabilidad:** suficiente hasta cientos de documentos; interfaz preparada para migrar a B.
- **Riesgo de inconsistencia:** el más bajo.
- **Dependencias:** Workers AI (embedding + rerank + generación), AI Gateway. Ni R2, ni Vectorize, ni AI Search.
- **Adecuación a 16 artículos:** óptima.

---

## Comparación resumida

| Criterio | A — AI Search | B — Vectorize | C — Índice estático |
|---|---|---|---|
| Determinismo/auditoría | Medio | Alto | **Máximo** |
| Latencia retrieval | Media | Media-baja | **Mínima** |
| Coste | Bajo | Muy bajo | **Mínimo** |
| Complejidad operativa | Media (servicio extra) | Media (sync) | **Baja** |
| Consistencia índice↔deploy | Eventual | Por script | **Atómica** |
| Escalabilidad | Excelente | Excelente | Cientos de docs |
| Control de umbrales | Parcial | Total | Total |
| Servicios nuevos | R2 + AI Search | Vectorize | Ninguno |

## Crítica a la separación de fases propuesta en el encargo

La separación propuesta (normalización → triage → retrieval → rerank → decisión → grounding → generación → validación → fallback → caché → observabilidad → evaluación) es correcta con tres matices:

1. **El triage no es una fase única**: conviene dividirlo en (a) *gate* determinista de emergencia (reglas + prototipos) que puede cortocircuitar la respuesta, y (b) *anotación* de riesgo (mordedura, ingestión, dolor) que acompaña a la consulta hasta la generación para condicionar el consejo. El sistema actual falla justo por mezclar ambos (P10).
2. **La caché debe consultarse después del triage, no antes**: una emergencia nunca debe servirse desde caché sin pasar por el gate (si cambian las reglas, la caché quedaría desactualizada). Cachear solo decisiones no urgentes.
3. **Rerank y decisión pueden fusionarse**: con ≤3 candidatos, el reranker es una *feature* más de la función de decisión determinista, no una fase que reordena por sí sola. Esto simplifica el razonamiento sobre umbrales.

## Descartadas sin desarrollo completo

- **Búsqueda web abierta en runtime**: prohibida por requisitos (no auditable, latencia, coste).
- **Solo léxico (sin embeddings)**: no tolera paráfrasis ni erratas fuertes (Caso A) — es exactamente el fallback actual.
- **Solo LLM con catálogo en prompt**: es el sistema actual; descartado por la auditoría.
- **LLM externo (Anthropic/OpenAI) como pieza central**: viable vía AI Gateway como *fallback* de generación, pero añade coste/latencia/dependencia; se evalúa solo como contingencia en el bake-off, no como primario.

**Referencias oficiales:** [AI Search](https://developers.cloudflare.com/ai-search/), [retrieval configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval-configuration/), [data sources](https://developers.cloudflare.com/ai-search/configuration/data-source/), [similarity cache](https://developers.cloudflare.com/ai-search/configuration/cache), [Vectorize limits](https://developers.cloudflare.com/vectorize/platform/limits/), [AI Gateway features](https://developers.cloudflare.com/ai-gateway/features/), [Workers AI models](https://developers.cloudflare.com/workers-ai/models/), [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/).
