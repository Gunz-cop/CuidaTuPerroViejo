# Diagnóstico aislado: `no-transform` y ETag en home

Este spike temporal observa si añadir `no-transform` a la respuesta exterior de la home cambia la entrega del ETag nativo. El PR #62 sigue **draft y NO MERGE**. El resultado es favorable en las muestras del Commit Preview, pero no demuestra por sí solo la causa única ni constituye una solución general.

## Identidades y procedencia

- Rama: `spike/f2b-no-transform`; PR [#62](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/62), draft contra `spike/f2b-etag-observabilidad`.
- Base pública exacta: `a7c942bd5a2c551e020ed226265d00e4d22e82dd`, tree `1668ece48abde4fb243d439400af32b597286b1a`.
- Source de tratamiento y build/preview fijado: `69a50652f62cec62d5355056a54eab0722b676a5`, tree `ac053a942e9aada3c5571a3d55dbc9ecd5084318`, cambio de código único `src/worker.ts`. Checks exact-head CI `112542694606` y Workers `112542812635`, ambos success. Recibo oficial PR #62 comment `6026971114`, `2026-10-06T22:57:35Z`, Commit Preview `https://6b2c9502-cuidatuperroviejo.g1721m.workers.dev`.
- Control fijo: `b87616f72d4ff3446f005f87761bfd65d9f43b62`, tree `e0b4f080984b24241ddd4a68767ff82f334ec00f`, Commit Preview `https://5c55fc8d-cuidatuperroviejo.g1721m.workers.dev`, recibo PR #61 comment `6022505218` (2026-10-06T18:11:43Z).
- Runtime sujeto `src/lib/agent-content/runtime.ts`, contrato, configuración y datos del sitio no cambiaron. La variante temporal conserva el ETag nativo; añade dos headers diagnósticos de Content-Encoding y agrega `no-transform` sólo al Cache-Control exterior de `/`.

## Captura hospedada

La nueva captura fue una sola ejecución `push` del workflow temporal, con `permissions: {}`, sin checkout, dependencias, secretos, llamadas API ni deploy. Source del workflow: `e7cfdf45eba576ff78a99b6b8098802c0ef815ba`, tree `a30c980d24836ac390aaf5a514149e472712781a`; run `37544456977`, attempt 1, job `112544967268`, final success. El cliente usó `ctpv-f2b-etag-spike/1.0`, `Accept-Encoding: identity`, sin retries ni seguimiento de redirecciones. Preflight registró `proxy_configured=false` sin mostrar valores. Las URLs de control y tratamiento apuntaron a sus Commit Previews fijos; el SHA del workflow se registra aparte de ambos sources HTTP.

El runner intentó exactamente **8/8** solicitudes: control (HEAD/GET HTML y Markdown) y tratamiento (HEAD/GET HTML y Markdown). Las ocho respuestas fueron HTTP 200 y `curl_exit_code=0`. Headers crudos, estados, cuerpos GET y summaries se conservan en [`hosted/`](hosted/). Las trazas TLS/HTTP exactas, el log completo y el manifest local de requests se conservan fuera del árbol Git por el gate automático de publicación; sus rutas, tamaños y SHA-256 están en [`publication-omissions.json`](publication-omissions.json), sin contenido de red ni entorno. El artefacto oficial de Actions fue ID `11449199667`, SHA-256 `d657a634e0b2fd9777a2ee53c5a55e8ccc53b05454ca1ad7747fb0484d62a32c`, 85.775 bytes; la copia ZIP descargada se guardó fuera del repo en `/workspace/ctpv-sdd-correcciones/f2b-no-transform-37544456977-1.zip`. El manifiesto original de Actions conserva 30 entradas: 28 raws más `provenance.txt` y `summary.txt`. Se archiva byte por byte y valida contra el artefacto completo local, incluidos los archivos omitidos. `manifest.bytes` conserva el recuento emitido por el runner.

## Observaciones

| Muestra | ETag ASSETS | ETag wrapper | ETag exterior | Cache-Control | Content-Encoding ASSETS / wrapper / exterior |
| --- | --- | --- | --- | --- | --- |
| Control HTML, HEAD y GET | `"a791cc206d8b7a5dc2c8f993dce7c454"` | mismo | ausente | `private, no-store` | desconocido / desconocido / ausente |
| Tratamiento HTML, HEAD y GET | `"a791cc206d8b7a5dc2c8f993dce7c454"` | mismo | mismo | `private, no-store, no-transform` | ausente / ausente / ausente |
| Control Markdown, HEAD y GET | `"c262365b8aeb7213ef529ce3e9d9fa15"` | mismo | mismo | `private, no-store` | desconocido / desconocido / ausente |
| Tratamiento Markdown, HEAD y GET | `"c262365b8aeb7213ef529ce3e9d9fa15"` | mismo | mismo | `private, no-store, no-transform` | ausente / ausente / ausente |

En el control no se expusieron headers diagnósticos de Content-Encoding en ASSETS ni en el wrapper; por tanto, sus valores internos son **desconocidos**. El summary usa un fallback `absent` para esos campos de control, que no constituye una observación de ausencia. En tratamiento, ambos puntos sí se instrumentaron y registraron Content-Encoding ausente.

Los GET de control y tratamiento devolvieron los mismos bytes construidos: HTML 119.418 bytes, SHA-256 `4e33d05483812c0627846b34a841caacd0e9a54d8c22d4b6fab768860e320a8b`; Markdown 12.878 bytes, SHA-256 `859f77287af9e57173b1ca1c9d84db55efee18ee95e608763550aaf21eb0a079`. Todos los bodies crudos quedaron preservados, no convertidos a texto.

Workerd local en modo `--local` también devolvió 200 para cuatro GET/HEAD home. En esas respuestas el ETag real exterior coincidió con ASSETS/wrapper y Cache-Control conservó `private, no-store` al añadir `no-transform`. Los GET locales igualaron byte por byte `dist/client/index.html` y `dist/client/agent-content/v1/documents/home.md`. Headers y cuerpos locales están en [`local/`](local/); el manifest con URLs loopback se conserva sólo fuera del árbol Git. El build provino del árbol `ac053a94` y no hizo requests públicos.

## Alcance del resultado

El contraste observado es consistente con que `no-transform` evita que falte el ETag exterior de HTML en estas respuestas del Commit Preview, sin cambiar contenido ni ETag seleccionado. La evidencia no aísla causalidad definitiva: el tratamiento también añade dos headers diagnósticos de Content-Encoding y corresponde a otro Commit Preview; se observaron sólo las dos representaciones de home en una tanda. No prueba producción, otros modos de encoding, otras rutas ni la matriz completa de validadores.

Por ello, el hallazgo no cambia el contrato y **no acredita B05 ni la aceptación F2B**. El bug #60 y el STOP se mantienen; auditoría formal B sigue 0/5. No se integra el cambio al candidato B ni se propone `no-transform` como fix de producción sin decisión arquitectónica y validación completa.

## Guardas y límites

El workflow se publicó primero desactivado (`if: ${{ false }}`) y el run `37544307168`/job `112544502182` terminó skipped con `steps: []`. Tras la única captura, se publicó el guard falso en el commit `2aded1688e363833e6bac47d3fdcfb8312a589b3`, tree `9ccaaf826eb39b8eb1ad870574bd08d873419807`; run `37544609829`/job `112545490053` también skipped con `steps: []`. El branch queda con el guard apagado antes de archivar documentos. No hubo HTTP manual, retries, reruns, producción ni merge. El total de esta prueba fue 8/8; la tanda histórica anterior conserva su propio 8/8 y no se mezcla con ésta.

## Archivo documental sellado

Se archivan aquí la decisión de arquitectura, la verificación independiente completa y sus datos detallados, el método independiente y la aprobación previa al gate, además de recibos, procedencia, snapshots del workflow activo y del guard final, headers/estados/cuerpos y un log de omisiones. Las trazas TLS/HTTP y el log completo no están incluidos en Git; el lector del archivo versionado no puede reproducir desde aquí la traza de red original. Los informes, decisión, recibos y raws publicados preservan sus bytes y SHA-256 originales; el informe de activación incluye una copia derivada mínima con identidad de commits, árboles y blobs, sin autoría ni metadata personal. Los originales omitidos permanecen fuera del repositorio en el área documental local. Los hashes están en [`audit/`](audit/), [`decision/`](decision/) y [`workflow/`). `SHA256SUMS` cubre todos los archivos de esta carpeta salvo a sí mismo; el `manifest.sha256` original de Actions corresponde al artefacto completo local, no sólo a este subconjunto. El ZIP binario no se duplica en Git: se conserva fuera del repositorio y su digest/tamaño de Actions constan arriba y en las copias de procedencia.

La decisión archivada cierra la prueba en 8/8 y mantiene F2B en STOP, B05 pendiente y auditoría formal en 0/5. No se integró el tratamiento ni se cambiaron runtime, contrato o SDD. El commit que contiene este archivo es documentación de evidencia; el guard público permanece desactivado.
