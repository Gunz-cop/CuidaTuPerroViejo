# Assistant V2 Foundation

Esta carpeta contiene únicamente la fundación contractual de Assistant V2. No
conecta todavía con `/api/ask`, el frontend, Workers AI, retrieval ni generación.

## Contrato de responsabilidad

La cadena futura queda separada así:

`normalize → triage → retrieve → decide → generate → validate → buildFallback`

`decide` es la única fase que selecciona slugs. `GenerationResult` solo puede
contener el consejo redactado, modelo, intentos y ruta de generación; no puede
seleccionar un artículo ni un topic.

## Formato del índice estático

El artefacto futuro será un JSON versionado con esta forma conceptual; esta
Foundation solo define el contrato, no construye el archivo ni ejecuta scoring:

```text
RoutingIndex {
  version: RoutingIndexVersion,
  thresholds: { hybrid, lexicalOnly },
  entries: RoutingIndexEntry[],
  safetyPrototypes: SafetyPrototypeIndexEntry[]
}

RoutingIndexEntry {
  documentId, kind, slug,
  editorialPayload, editorialHash, editorialVersion,
  embedding, embeddingModel,
  lexical: { char-ngram parameters, termFrequency,
             documentFrequency, documentLength, corpus statistics }
}
```

Cada entrada identifica el documento, conserva el payload editorial mínimo para
grounding/fallback, guarda el vector y las estadísticas serializables para
char-ngram/BM25, y liga hash/versiones editoriales y del modelo. Los prototipos
de seguridad tienen el mismo vínculo editorial y su propio vector en
`safetyPrototypes`.

Los umbrales `hybrid` y `lexicalOnly` tienen versiones independientes. El modo
híbrido puede declarar el reranker habilitado o deshabilitado; al deshabilitarlo
no aparece ningún requisito numérico de `rerankerMinimum`.

## Versionado y privacidad

- El fingerprint de caché y telemetría es HMAC-SHA-256 sobre el texto
  normalizado. La clave secreta y su `keyId` son configuración de runtime; nunca
  se usa SHA-256 simple como identificador de consulta.
- El índice, el modelo de embedding y el conjunto de umbrales llevan versión.
  Cambiar el modelo de embedding obliga a reconstruir vectores, recalibrar
  umbrales y cambiar la versión del índice, invalidando caché por prefijo de
  versión.
- La reproducibilidad de routing significa reutilizar el mismo artefacto
  versionado y aplicar una función determinista. No presupone bytes idénticos
  entre inferencias remotas.
- El reranker está marcado como opcional y pendiente del bake-off. La decisión
  debe seguir siendo válida si se desactiva o falla.

## Umbrales pendientes

`T_alto`, `T_bajo`, el margen y `R_min` se representan como `null` hasta que la
sesión de evaluación los calibre. Ningún valor de producción se fija aquí.

## Flujo de validación y fallback

`validate(generation, context)` recibe el resultado completo de generación y el
contexto que fijó la decisión: grounding, documentos, riesgos y reglas
editoriales. Puede comprobar fidelidad al grounding, restricciones de seguridad,
modelo e intento usados, y consistencia con la decisión antes de permitir el
siguiente intento.

`buildFallback(context)` recibe la decisión de la etapa anterior, sus documentos
ya seleccionados, grounding, `fallbackAdvice`, protocolo de emergencia y
etiquetas de riesgo. Devuelve solo consejo/metadatos de fallback; no devuelve
slugs y por tanto no puede seleccionar ni cambiar documentos.

Triage es asíncrono y puede aceptar una `SemanticRepresentation` ya calculada.
Su resultado devuelve esa representación para que `retrieve` la reutilice:

```text
triage(query, optionalEmbedding) → { ..., semanticRepresentation }
retrieve(query, semanticRepresentation) → retrieval
```

El orquestador debe pasar la representación de triage a retrieval. Si no existe,
retrieval puede solicitar una sola representación y compartirla con las fases
posteriores; esta Foundation no implementa ninguna llamada externa.

## Compatibilidad

`AssistantV2Response` es un tipo interno V2 y no se declara estructuralmente
compatible con el frontend. `AssistantV1JsonResponse` describe exclusivamente
el JSON que consume hoy `asistente-ia.astro`. El tipo
`AssistantV2ToV1Adapter` reserva el adaptador que implementará posteriormente el
Integration Lead.

## Schemas editoriales

Los documentos de `src/content/assistant/` se validarán mediante los contratos
de `src/content/assistant/config.ts`. Los topics exigen fuentes aprobadas y un
estado de revisión editorial explícito; no se aceptan fuentes veterinarias sin
ese estado.
