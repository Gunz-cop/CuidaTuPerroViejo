# Verificación independiente offline — resultado no-transform F2B

**PASS de integridad, método y resultado experimental acotado.** En estas muestras, el tratamiento conserva el ETag HTML nativo en el exterior para HEAD y GET; el control continúa sin él. No hay bloqueantes adicionales de evidencia. Esto no aprueba producto, identifica una capa causante ni acredita B05. F2B permanece sin aceptación, bug #60 pendiente de decisión arquitectónica y auditoría formal **0/5**; SDD PASS2/2 intacta.

## Procedencia y ejecución única

| Identidad | Source / recibo | Preview fijo |
| --- | --- | --- |
| Control HTTP | `b87616f72d4ff3446f005f87761bfd65d9f43b62` / bot `6022505218`, PR61 | `https://5c55fc8d-cuidatuperroviejo.g1721m.workers.dev/` |
| Tratamiento HTTP | `69a50652f62cec62d5355056a54eab0722b676a5` / bot `6026971114`, PR62 | `https://6b2c9502-cuidatuperroviejo.g1721m.workers.dev/` |

El snapshot oficial de tratamiento enlaza tree `ac053a942e9aada3c5571a3d55dbc9ecd5084318`, checks `112542694606`/`112542812635` success y bot Cloudflare al preview exacto. El delta source contra base `a7c942…` es únicamente `src/worker.ts`: no-transform exterior home y metadata encoding; no escritura/restauración ETag ni cambios de runtime/config/lock/contenido. La instrumentación copia el cuerpo/headers originales y observa wrapper antes de la Response exterior.

Workflow source activo separado: `e7cfdf45eba576ff78a99b6b8098802c0ef815ba`, tree `a30c980d24836ac390aaf5a514149e472712781a`, parent guard `6cd027d1375fadcbfefbed4216c6c9f945724f81`. Snapshot API de commit y YAML público durable acreditan un único cambio de job.if; SHA-256 del YAML `7961c8d67c3392aa17b999318caa998206dc8b154d9929fbaca7f7fb94ec02fe`, idéntico al preaprobado. No se midió el preview de este commit operativo.

| Etapa | Run / job | Resultado observado en snapshots API |
| --- | --- | --- |
| Guard inicial | `37544307168` / `112544502182` | completed/skipped, steps vacíos |
| Captura única, attempt1/push/ref exacta | `37544456977` / `112544967268` | completed/success; ocho solicitudes 23:04:23–27Z |
| Deshabilitación antes de documentos | `37544609829` / `112545490053` | HEAD `2aded1688e363833e6bac47d3fdcfb8312a589b3`, completed/skipped, steps vacíos |

Total nuevo **8/8**, cerrado. La serie anterior conserva su propio 8/8 e informes históricos; ninguna captura se reetiquetó. No se deben relanzar jobs ni efectuar solicitudes adicionales.

## Integridad del artifact y bytes

Artifact oficial `11449199667`, ZIP durable `f2b-no-transform-37544456977-1.zip`: **85.775 bytes**, SHA-256 `d657a634e0b2fd9777a2ee53c5a55e8ccc53b05454ca1ad7747fb0484d62a32c`, coincide con digest/tamaño en el snapshot API. Sus 32 miembros tienen paths seguros y coinciden byte por byte con el directorio extraído. Los manifiestos contienen 30 entradas válidas de SHA/tamaño: 28 raws y provenance/summary; los otros dos archivos son los propios manifiestos. Todos los hashes emitidos coinciden además con el log del job.

Log completo decodificado, distinto de los raws del artifact: **29.976 bytes**, SHA-256 `9b10081f8c49c271130f3a8899be129ae33ce832643599e44f8854bc53772e26`. No se reconstruyeron capturas HTTP desde él.

Los cuatro GET coinciden byte por byte con el build existente y el índice correspondiente a cada source:

| Representación, control y tratamiento | Bytes | SHA-256 |
| --- | --- | --- |
| HTML home | 119.418 | `4e33d05483812c0627846b34a841caacd0e9a54d8c22d4b6fab768860e320a8b` |
| Markdown home | 12.878 | `859f77287af9e57173b1ca1c9d84db55efee18ee95e608763550aaf21eb0a079` |

## Observaciones verificadas en los ocho raws

Cada trace contiene una solicitud efectiva, sólo `/`, método esperado HEAD/GET, Accept HTML/Markdown, UA `ctpv-f2b-etag-spike/1.0` y `Accept-Encoding: identity`. Todos terminan HTTP/2 200/curl0; proxy configurado false, TLS Google Trust Services WE1/verify ok y servidor Cloudflare. No se observan retry, redirección ni endpoints adicionales. Los headers conservan MIME correcto, Link descrito, Vary Accept, HSTS, Permissions-Policy, Referrer-Policy, nosniff y noindex.

| Variante — HEAD y GET concordantes | ASSETS = wrapper | Exterior control | Exterior tratamiento |
| --- | --- | --- | --- |
| HTML | `"a791cc206d8b7a5dc2c8f993dce7c454"` | ETag ausente | ETag nativo idéntico |
| Markdown | `"c262365b8aeb7213ef529ce3e9d9fa15"` | ETag nativo idéntico | ETag nativo idéntico |

Cache-Control control: `private, no-store`; tratamiento: `private, no-store, no-transform`. Content-Encoding exterior ausente en todas las respuestas. En el tratamiento, los headers diagnósticos ASSETS/wrapper registran ausencia de Content-Encoding. En el control esos headers diagnósticos no existen: su encoding interno es **desconocido**, aunque summary los represente por fallback como absent. Los cuerpos recibidos coinciden con los bytes originales. CF-Cache-Status HIT no permite concluir por sí solo incumplimiento de no-store exterior.

## Conclusión y límites

El resultado respalda no-transform como alternativa concreta para evaluación arquitectónica: preserva el ETag nativo y los bytes de estas dos representaciones de la home. No prueba componente específico que eliminaba el ETag, ajustes de plataforma activos, rendimiento/compresión bajo otros Accept-Encoding ni universalidad: las capturas atraviesan diferentes POP y previews. No acredita If-None-Match/304, errores, demás rutas o toda B05. No autoriza integración, promoción ni cambio retrospectivo de SDD. La decisión de producto y su eventual validación pertenecen al ciclo posterior que disponga arquitectura.

El auditor realizó sólo lectura, Git/hash/diff y análisis offline de ZIP/JSON/raws; cero HTTP, builds, pruebas o modificaciones de producto/spec. Los cinco informes de diagnóstico/preparación anteriores mantienen sus hashes. Prueba detallada con 32 archivos, 30 comprobaciones de manifiesto, ocho registros, metadatos y hashes históricos: `/workspace/ctpv-sdd-correcciones/f2b-no-transform-verificacion-offline.json`, SHA-256 `efc1f54fb04176dd815060bf0a77944fdfa198a1295b67ca5ec6c9aa2fd01a63`.
