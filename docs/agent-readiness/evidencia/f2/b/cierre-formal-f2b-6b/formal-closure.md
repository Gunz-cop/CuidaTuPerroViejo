# Cierre formal de F2B — candidato 6b

**Estado:** evidencia completa preparada para auditoría formal independiente R1/5. No constituye aceptación formal ni autorización de integración a `main`. El contador B sigue en 0/5 hasta la auditoría.

## Fuente y alcance

La matriz pertenece al candidato público exacto `6b0d3d5abd0c175d2acae56ab7892edaf18cc157`, árbol `af7fa106cdd9eebe25846208bda2b9137e041fb2`, PR 64 y preview oficial registrado en [el recibo del candidato](candidate-pipeline-receipt.json). La copia local `7bb30d5134a02a5f9232d0a958c1335a8bd6b257` tenía diferencia de árbol cero. La posterior entrega de este paquete sólo añade documentación y evidencia; las capturas no se atribuyen a ese futuro commit documental.

La ejecución completó el plan congelado de 1.284 IDs GET/HEAD, con 964 respuestas HTTP validadas, 320 N/A justificados por sus dependencias, cero fallos y cero casos sin intentar. [El resumen de matriz](matrix/pass-summary.json) da el desglose por grupo y estado HTTP; [las observaciones](matrix/observations/) conservan una fila pública por cada ID. Los raws completos —headers, cuerpos, métricas curl y trazas— quedan fuera del repositorio, sellados para revisión independiente; [la referencia privada](private-audit-source-reference.json) liga sus hashes.

El plan y sus 43 chunks se conservan en [plan](plan/); el índice corresponde al preflight congelado previo a la ejecución. [El recibo de ejecución](matrix/execution-receipt.json) registra la terminación posterior sin modificar el plan.

## Evidencia de fuente y pipeline

[La procedencia](source-provenance.json) ata el runtime, tests y SDD a sus SHA de fuente. [El recibo CI de 23 pasos](ci-step-receipt.json) corresponde al commit 6b exacto; todos los pasos finalizaron con éxito, incluidos tests, build, routing compilado de F2B y empaquetado de Worker. [El recibo de candidato](candidate-pipeline-receipt.json) conserva los checks PASS y el preview oficial. [El resumen contractual de configuración](compiled-config-summary.json) publica sólo entrypoint y binding de assets; los valores completos de configuración quedan privados.

La paridad publicada de 57 artefactos y el CSS se documentan en `../bug69-etag-equivalence/build-parity-57.json`; el cambio de código que permite la equivalencia débil del ETag en 304 ya pasó auditoría #69 R1 y los controles offline heredados permanecen enlazados allí. El informe fuente de 42/42 pruebas de producto corresponde al código `05ecae3c1356e393f26a5831dec41b7e4b84db77`; runtime y tests no cambiaron en la línea documental hasta 6b. El CI exacto 6b también informa el paso de Tests PASS, sin publicar una cantidad.

## Criterios B01–B10

La matriz [criterio por criterio](criteria-b01-b10.json) distingue observaciones de la matriz, controles previos y limitaciones históricas.

| Criterio | Evidencia incluida | Límite explícito |
|---|---|---|
| B01 | Fuente/hashes, SDD y paridad 57/CSS | La paridad histórica se enlaza al candidato documental code-equivalente; el build exacto de 6b consta en CI. |
| B02 | CI exacto de 23 pasos, routing y empaquetado | No se repitió Wrangler ni Workerd fuera de CI. |
| B03 | Matriz completa 1.284/964/320 y raws sellados | 320 N/A permanecen visibles con dependencias y razón; no se ocultan IDs. |
| B04 | 25 casos Accept, cuerpos 400/406 y hashes | Las negativas del runner son sintéticas offline y están etiquetadas como tales. |
| B05 | Corpus de 28 documentos y plan GET/HEAD | Las capturas corresponden sólo al candidato 6b. |
| B06 | 24 filas de alternancia presentes en HTTP validados | Los registros completos permanecen privados. |
| B07 | 8 capturas Workerd R2 retenidas | Cuatro resúmenes B07 antiguos se marcan incompletos y no sustituyen las ocho nuevas capturas. |
| B08 | Delegación, desconocidas, redirección y routing CI | Los artefactos geo/admin/POST locales siguen privados y no se repitieron. |
| B09 | Headers contractuales, Link, bytes y hashes en la proyección | Headers y cuerpos wire completos sólo están en el archivo privado. |
| B10 | Checks, preview oficial y contrato de rollback | `main` y deploy no están autorizados. |

[La evidencia histórica local de 313 requests](local313-history-summary.json) no se atribuye al candidato 6b. La serie R2 de [ocho capturas B07](retained-b07-r2-summary.json) mantiene sus recibos y archivos originales en el manifiesto privado; no hubo nueva captura para este paquete.

## Privacidad e índice

Los 1.284 casos aparecen en la proyección, pero ésta omite URLs de origen, valores de cookies/autenticación, cabeceras raw, cuerpos raw, trazas, logs operativos e índices completos. El manifiesto privado cotejó por SHA los 7.714 archivos de matriz sellados, además de las fuentes local313 y B07 R2.

El índice público enumera sólo los archivos UTF-8 de esta entrega; el manifiesto de raws y configuraciones completas permanece fuera de GitHub. Este paquete se entrega para auditoría formal independiente; no declara aceptación, publicación del futuro HEAD documental ni promoción a `main`.

## Historia de ejecuciones y auditorías

[Los contadores históricos](matrix/historical-stop-counters.json) permanecen separados del PASS actual: conserva los STOP de 295, ae815 y c8de con sus fallos y pendientes originales; la matriz 6b es una ejecución nueva y completa. Los contadores de auditoría permanecen por issue: #65 R3/5, #67 R1/5, #68 R2/5 y #69 R1/5 PASS; la auditoría formal B comienza en 0/5.
