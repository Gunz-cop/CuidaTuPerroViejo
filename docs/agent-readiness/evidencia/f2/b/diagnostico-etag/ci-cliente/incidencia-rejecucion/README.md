# Incidencia: reejecución de las HEAD del cliente CI

Este anexo registra una segunda ejecución automática, distinta de la captura del run `37511028097` documentada en el directorio padre. La primera evidencia y su manifiesto permanecen intactos como estado histórico de 6/8 solicitudes en ese momento. El run aquí archivado añadió dos HEAD: el total observado pasó a 8/8. El presupuesto está agotado; no se deben enviar requests, repetir jobs ni hacer rerun.

## Origen de la reejecución

La publicación del cierre documental `2f64180f7951b91a38d164cac36ef4efd0338ac9` sincronizó el PR #61. Aunque el último commit sólo añadía documentos, `pull_request.paths` compara los archivos cambiados en el diff acumulado del PR contra la base: `.github/workflows/f2b-etag-diagnostic.yml` seguía siendo parte de ese diff. El workflow se ejecutó por segunda vez con source head `2f64180…`; el job entonces sólo condicionaba PR #61 y nombre de rama, así que sus dos HEAD volvieron a ejecutarse. No se había añadido todavía la guarda por SHA.

El job de reejecución fue run `37511444678`, job `112433328883`, conclusión `success`. No fue un PASS funcional: ambas capturas repitieron el síntoma observado. El source HTTP siguió siendo el Commit Preview fijo de `b87616f72d4ff3446f005f87761bfd65d9f43b62`, con recibo `6022505218`; no se midió el source `2f64180…`.

## Captura adicional observada

El log completo decodificado recuperado por GitHub API está en `raw/job-112433328883.log`, 26.960 bytes, SHA-256 `cc0f5dd28b6fe53205f565096e88c092dba5f3a7eec4a7dff7c10ebc25514101`. El job registró `proxy_configured=false`, TLS normal y no imprimió valores de proxy.

| Variante | UTC | Status / curl | ASSETS seleccionado | Wrapper | Cliente exterior | Ray |
| --- | --- | --- | --- | --- | --- | --- |
| HTML | 18:27:29Z–18:27:30Z | HTTP/2 200 / 0 | `"a791cc206d8b7a5dc2c8f993dce7c454"` | mismo valor | ETag ausente | `a466b86d1ff9bfd1-ATL` |
| Markdown | 18:27:29Z–18:27:30Z | HTTP/2 200 / 0 | `"c262365b8aeb7213ef529ce3e9d9fa15"` | mismo valor | mismo valor | `a466b8705e12b48a-MEM` |

Las respuestas repiten lo documentado en la primera captura CI: HTML pierde el ETag entre la Response del wrapper y el cliente; Markdown conserva el ETag. Esta ejecución no localiza el componente causante.

## Guarda publicada y ejecución bloqueada

Antes de añadir este anexo se publicó un commit operativo que cambió exclusivamente el workflow temporal. La condición del job ahora exige simultáneamente PR #61, ref `spike/f2b-etag-observabilidad` y `github.event.pull_request.head.sha == '1c77bd14e217ba70ed6cadc5bad3b08a25f3fe94'`. Ese SHA es el único source que puede lanzar la captura fijada; los commits posteriores al workflow hacen que el job se omita.

- Source local de la guarda: `183ed860487b78e7a03d1396b9ad76a1d1eeb0f2`.
- Source público de la guarda: `52596d254b114326f91c68cf66f096549f6db96b`, tree `cfb66576b9b89205e0bcee9b38e39350da6c8945`, parent `2f64180f7951b91a38d164cac36ef4efd0338ac9`. Único cambio: `.github/workflows/f2b-etag-diagnostic.yml`.
- Run de comprobación posterior a publicar la guarda: `37511989881`, job `112435202003`, ambos `skipped` con nuevo PR head `52596d254b114326f91c68cf66f096549f6db96b`. Se confirmó este resultado antes de crear el anexo documental actual.
- El anexo actual no contiene el hash de su propio commit para evitar autorreferencia; el cierre se reporta por separado.

La serie documentada totaliza 8/8 solicitudes permitidas. La primera captura conserva su reporte 6/8 como fotografía temporal histórica; este anexo corrige el conteo actual. No se emitirá otra solicitud ni se relanzará el workflow. La causa del bug #60 sigue sin aislar; F2B permanece sin aceptar, B05 no pasa y auditoría formal B continúa 0/5. PR #61 permanece draft y NO MERGE.
