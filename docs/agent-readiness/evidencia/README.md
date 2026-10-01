# Evidencia de línea base

Recogida el 2026-10-01 UTC contra `https://cuidatuperroviejo.com`, con base de código inspeccionada `cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`. El despliegue observado no se vinculó a un SHA desde el dashboard; código y producción se reportan como evidencias separadas.

- `scan-content.json`: respuesta original del perfil Content Site.
- `scan-ui-default.json`: respuesta original con la selección por defecto de la interfaz.
- `scan-all.json`: respuesta original del POST sin opciones; no es la selección de la interfaz.
- `scan-requests.json`: solicitudes exactas y SHA-256 de cada respuesta original.
- `http-observations.json`: peticiones directas, status, headers relevantes y hash del body. No incluye los bodies completos ni cabeceras de analytics.
- `evaluator-ui-excerpts.json`: URL/hash del JavaScript de la interfaz y extractos que demuestran selección de controles y cálculo de score.
- `referencias.json` y `referencias/`: documentación primaria consultada y sus hashes. Son snapshots documentales externos; no son skills de mantenimiento del sitio ni instrucciones que un ejecutor deba aplicar sin su spec.

## Reproducción

Las tres solicitudes se describen en `scan-requests.json`. Usar POST, `Content-Type: application/json` y el body exacto. Guardar la respuesta nueva en otro fichero con timestamp; no sobrescribir la línea base. Una ejecución posterior puede variar por despliegue, propagación, disponibilidad o cambios del evaluador.

Para calcular la puntuación:

1. Usar las categorías no comerciales; incluir comercio solo si `isCommerce=true`.
2. Contar los resultados `pass` y `fail`; excluir `neutral`.
3. Calcular `Math.round(100 * pass / (pass + fail))`.
4. Reportar aparte el `level` que devolvió el servidor.

No reducir el denominador deshabilitando controles que fallen. Comparar puntuaciones únicamente si coinciden los IDs habilitados y las reglas de evaluación. Una capacidad no aplicable se informa explícitamente; no se convierte en pass.

## Fuentes externas

La escala vigente consultada está en `referencias/scan-site.md`. Describe nivel 4 como al menos una integración entre MCP, A2A, skills o API Catalog, y nivel 5 como dos de tres condiciones adicionales. Es una guía del servicio; se revalida contra `nextLevel` después de cada hito.

Las guías de DNS-AID, ARD, MCP card y skills incluyen estándares emergentes. El implementador debe usar el schema/draft que congele su spec. Una réplica externa del evaluador no es fuente de verdad para puntuación o nivel.
