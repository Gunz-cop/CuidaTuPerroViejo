# Propuesta de corrección offline — bug #67

Estado: **snapshot WIP, no aceptado y no listo para auditoría independiente mientras la paridad final siga sin verificar.** No hubo cambios de producto, SDD, configuración, stack ni dependencias, y no se ejecutó HTTP durante esta corrección.

## Hallazgo y alcance

En la única tanda pública autorizada de R3 el request `resource:resource-stylesheet-get` recibió HTTP 200 con `Content-Type: text/css`. El plan exigía literalmente `text/css; charset=utf-8`. Los 138.037 bytes y el SHA-256 `0f6dc475a0c00022ccd332ead61fbeadb03233ba8649ac70fd19b2d640a95786` coinciden con la entidad CSS que esperaba el plan; el STOP fue por la comparación MIME. El response raw, header block y trazas permanecen en el área privada; este paquete sólo incluye una proyección curada del cuerpo de la captura, estado, MIME y headers de seguridad/Link necesarios para replay.

La corrección restringe una regla semántica de MIME a dos IDs exactos: GET y HEAD de `/_astro/BaseLayout.gPuLvWrC.css`. Acepta media type `text/css` con charset ausente o UTF-8, con mayúsculas y espacios semánticamente válidos. Rechaza tipo distinto, charset incompatible o repetido, parámetros desconocidos, sintaxis malformada y campos Content-Type repetidos. Las demás respuestas y todos los otros assets mantienen comparación MIME exacta; status, hashes de entidad, cabeceras de seguridad/Link y límites HEAD no cambian.

## Plan inactivo

El índice propuesto conserva 1.284 IDs únicos, 43 chunks, grupos, métodos, rutas, dependencias, cuerpos y presupuesto. Sólo cambian los MIME esperados de las dos filas CSS, que declaran explícitamente la regla acotada. El source local es el HEAD vigente `29559a461907f9ba9bbcc148bc6109311a1f484a` / árbol `218d1bcad6ca044989c2998b8586d3e6406ea6c0`; preview, checks, receipt y hosts están vacíos. La copia está **inactiva** y no permite `--execute`. No reutiliza los ETags ni la matriz histórica parcial para ningún candidato futuro. Un próximo plan EXEC debe vincularse al nuevo receipt oficial luego de la revisión y publicación aprobadas por root.

## Pruebas offline disponibles

- Cinco pruebas CSS cubren el scope exacto de IDs/plan, aceptación de MIME semántico, rechazo de charset/params/tipo duplicados, status/hash/cuerpo vacío y rigidez de los otros assets.
- Una prueba reinterpreta la captura GET retenida contra el `validate_response` y `policy_checks` reales, sin curl ni nueva solicitud. La respuesta HEAD es únicamente un control sintético vacío; no se presenta como captura real.
- Suite completa: 17 pruebas PASS. La simulación real del runner mantiene 1.284 IDs únicos, 1.274 transportes simulados, 10 N/A, cero Workerd/curl/HTTP y sin STOP. El último build que terminó conservó los 57 artefactos contra el predecessor y produjo el stylesheet con los bytes/hash de la entidad retenida; ocurrió antes del ajuste final de rutas de fixtures y del recibo de salida de pruebas. El build final solicitado falló en el entorno antes de generar `dist/client`; el reintento con red fue rechazado por auto-review. Por eso no se afirma paridad vigente para este snapshot. `build-check-closure.json` registra ambos estados y el bloqueo.

## Límites

La tanda pública R3 quedó detenida y no se completa ni se reintenta. Este cambio no cierra la auditoría formal B, no es aceptación pública, no habilita `main` y no modifica el registro original de STOP o su índice privado. La aceptación futura requiere revisión independiente, un candidato nuevo si hay cambios, sus CI/Workers/preview oficiales y autorización explícita antes de cualquier nueva matriz.
