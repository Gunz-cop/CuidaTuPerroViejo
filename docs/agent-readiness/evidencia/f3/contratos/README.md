# Anexos normativos F3

Estos archivos son **documentos de diseño**, no producto implementado ni respuestas observadas. Complementan [contratos F3](../../../fases/f3-contratos.md) y [SDD](../../../fases/f3-api-y-descubrimiento.md).

- [Ejemplos completos de catálogo, búsqueda vacía e inputs/errores](ejemplos.md): datos archivados explícitos, no HTTP F3 observado.
- [schema.json](schema.json): Draft2020-12 cerrado; `$defs` define todas las respuestas, query-index, skills y envelope ARD. No valida por sí solo igualdad de corpus, orden, origen/URLs derivadas, límites de bytes, UTF-8 ni otros invariantes semánticos de la SDD.
- [openapi.json](openapi.json): OpenAPI3.1.1 concreto,9operaciones GET/HEAD/OPTIONS para3paths. Component schemas conservan equivalencia con los mismos `$defs`; refs internos.
- [api-catalog.linkset.json](api-catalog.linkset.json): cuerpo concreto RFC9727; enlaces a operaciones y service-desc. No tiene hashes simulados.
- [ard.json](ard.json): envelope concreto compartido por ambos well-known ARD; schema externo primario en [fuentes](../referencias/ard-entry.schema.json), `$defs/ArdManifest`.
- [buscar-leer-citar.SKILL.md](buscar-leer-citar.SKILL.md): texto exacto de producto a materializar. Digest futuro se calcula sobre sus bytes reales al generar discovery; esta entrega no presenta un digest ficticio como respuesta pública.

No se descargó el schema URI de skills (proxy403); el RFC primario0.2.0 archivado define todos los campos, límites, digest y HTTP, y aclara que ese URI es opaco/no necesita resolverse. El schema local fija exactamente ese subconjunto sin decir que se validó contra un JSON remoto no obtenido. En implementación Ajv2020 usa schemas locales y ARD archivado, sin red; validadores semánticos complementan sus restricciones.

En publicación la descripción OpenAPI elimina únicamente la frase que marca este archivo como documental, indicada en info.description. Ningún schema, parámetro ni capacidad cambia por esa transformación. La spec textual manda para reglas semánticas no expresables completamente en JSON Schema; discrepancia estructural entre anexos/texto→STOP, no decisión silenciosa del programador.
