# Ejemplos completos de contrato F3

Ejemplos de diseño, no respuestas públicas observadas. El catálogo usa entrada/corpus reales del índice F2A archivado en `evidencia/f2/a/index.json`; no se declara que sea el corpus de un deployment actual o futuro. Cada implementación sustituye estos datos por los del build exacto. Schema e invariantes siguen los [contratos](../../../fases/f3-contratos.md).

## Catalog válido: GET /api/agent/v1/catalog?limit=1

```json
{
  "schemaVersion": "agent-api/1",
  "corpusSha256": "29a6147e978da7d92c4a5f49068e92bb05dc28ecb75a0c9f3231d1aef8f81184",
  "total": 28,
  "limit": 1,
  "offset": 0,
  "nextOffset": 1,
  "documents": [
    {
      "documentId": "article--agresividad-tardia-perros-mayores-dolor",
      "kind": "article",
      "title": "Agresividad de aparición tardía en perros mayores: cuándo es dolor y cuándo es deterioro cognitivo",
      "description": "Tu perro mayor gruñe por primera vez en su vida. Por qué la agresividad tardía casi siempre es dolor, y qué hacer antes de castigarlo.",
      "canonicalPath": "/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor",
      "canonicalUrl": "https://cuidatuperroviejo.com/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor",
      "markdownPath": "/agent-content/v1/documents/article--agresividad-tardia-perros-mayores-dolor.md",
      "language": "es",
      "datePublished": "2026-08-15T00:00:00.000Z",
      "dateModified": "2026-08-15T00:00:00.000Z",
      "htmlSha256": "166b9d4258f950a65b62d71e9b3b16edc5e77b7d231b5b2584dd68be7d9e68f6",
      "markdownSha256": "fa20b6374b189939a29a53cb63134b544a0e34ea82a60a0957efc4757a5dad80",
      "markdownBytes": 44229
    }
  ]
}
```

## Search sin coincidencias: respuesta200 completa

```json
{
  "schemaVersion": "agent-api/1",
  "corpusSha256": "29a6147e978da7d92c4a5f49068e92bb05dc28ecb75a0c9f3231d1aef8f81184",
  "total": 0,
  "limit": 20,
  "offset": 0,
  "nextOffset": null,
  "results": []
}
```

## Input inválido: GET /api/agent/v1/search?q=%ZZ →400 completo

```json
{
  "schemaVersion": "agent-api/1",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request."
  }
}
```

## Inputs válidos e inválidos

| Request | Resultado contractual |
|---|---|
| GET /api/agent/v1/search?q=C%C3%9ASHING |200, mismos tokens que cushing; corpus activo |
| GET /api/agent/v1/catalog?kind=article&limit=20&offset=0 |200, sólo artículos ordenados |
| HEAD /api/agent/v1/documents/home |200 sin body con mismas validaciones de GET |
| OPTIONS /api/agent/v1/documents/home |204 vacío sin cargar corpus |
| GET /api/agent/v1/search?q= |400 INVALID_REQUEST |
| GET /api/agent/v1/search?q=cushing&q=artrosis |400 INVALID_REQUEST |
| GET /api/agent/v1/catalog?limit=01 |400 INVALID_REQUEST |
| GET /api/agent/v1/catalog?url=https%3A%2F%2Fexample.com |400 INVALID_REQUEST |
| GET /api/agent/v1/documents/https%3A%2F%2Fexample.com |400 INVALID_REQUEST |
| GET /api/agent/v1/documents/article--inexistente |404 DOCUMENT_NOT_FOUND, si corpus/data válidos |
| POST /api/agent/v1/search |405 METHOD_NOT_ALLOWED, Allow GET, HEAD, OPTIONS |

Para lectura completa la expectativa es la entidad Markdown F2 original del mismo build, metadata íntegra y todos sus links: no se introduce aquí un cuerpo abreviado o hash ficticio como ejemplo de Read válido. Las fixtures de implementación deben adjuntar Read completo de origen real como exige C3-06.
