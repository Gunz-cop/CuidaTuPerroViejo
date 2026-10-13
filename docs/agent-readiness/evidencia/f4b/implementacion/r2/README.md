# F4B — R2/5 FAIL / STOP C08, sin aceptación

Producto fijo: `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`. Base de desarrollo: SDD ratificada `8669d9d`. F4A final: producto `cb8e10f`, documentación `a42a185`, contrastados sin diferencias técnicas ni incorporación automática de documentación concurrente.

**Dictamen independiente final: R2/5 FAIL / STOP esencial C08.** [Informe literal](../../auditoria/implementacion-r2.md): 14.274 bytes, SHA-256 `a1906da89a051267333e4a1bb4ac3f3225d562402b8f3b98b8ad922789fbfcc5`. Los cuatro hallazgos históricos quedan corregidos conforme la norma vigente; no compensan el fallo local. El bug #100 sigue abierto. No continuar trabajo dependiente. Una eventual reanudación exige resolver el bloqueo y presentar snapshot/evidencia fija; siguiente revisión R3/5, mismo auditor.

La SDD permanece intacta. Se aplica la adenda 1 congelada en `6dcbfa5` y ratificada en `b204442` tras **A1-R1/2 PASS** del mismo auditor. La interrupción técnica previa no emitió dictamen y se reanudó la misma revisión. La historia de la SDD, **implementación R1/5 FAIL** y sus cuatro hallazgos y originales se conservan.

## Correcciones y evidencia positiva

- **I-B1:** catálogo paginado 20 + 8 con guard de corpus; cardinalidad, IDs y metadatos idénticos al índice de 28 documentos, sin duplicados. Lectura de los 28 documentos mediante cliente MCP real, comparación íntegra con API, hash y longitud en bytes. La cobertura anterior de 20 sigue siendo parcial.
- **I-B2:** el deadline cancela proactivamente la salida pendiente y descarta el éxito tardío. Cancela el reader y libera el lease sólo cuando la respuesta está cerrada y no queda trabajo residual, preservando la protección F3. Dos respuestas sin consumo ocupan el cap de 2; la tercera recibe 429 antes del deadline. Después de 10,3 s se recupera el cap y ambas lecturas tardías se rechazan. La prueba de trabajo residual F3 sigue pasando.
- **C08 unitario:** fronteras inclusivas y exceso de un byte/un nivel para body 32 KiB, profundidad 16, metadata 8 KiB, salida 8 MiB, expansión del framing y listado/card de 256 KiB. Son fixtures defensivos sobre el pipeline real; no sustituyen la integración de herramientas. Un fallo de cancelación ya no reemplaza el 413 conocido. Content-Length excesivo se rechaza antes del reader; una longitud reducida o ausente mantiene el contador en streaming.
- **Ping:** moderno 404/-32601 y legacy 200 con resultado vacío, conforme a la adenda y conservando SDK 2.3.1.

No se han modificado SDK, dependencias, configuración, contacto ni antispam para estas correcciones.

## CI, preview e identidad

CI del producto `192dcdd`: 88 tests TypeScript y 68 offline; checks de tipos, generación, discovery, projection, routing, semántica, tipos Worker y dry-run aprobados.

Receipt del build real: `97c7ec40-3e66-49c6-92af-5ad978197d80`; versión Workers `81e32ad7-e16a-4b12-aba9-81589f0651e3`. Preview: https://81e32ad7-cuidatuperroviejo.g1721m.workers.dev . El [cliente compatible real](cliente-preview.json) completa 142 intercambios con ambas eras, las cuatro herramientas, los 28 documentos, fronteras de cálculos, errores, MIME, Origin, sesiones y métodos.

C12: [identidad](identidad-preview.json) **80 byteexactos + contacto con equivalencia restringida**, PASS. Se preservan los 81 artifacts, el guard de fuente de contacto y los cuerpos originales local/remoto con sus hashes independientes. El FAIL anterior permanece histórico; [su fixture](fixture-contacto-historico.json) se contrasta con la nueva norma sin convertir el dictamen anterior en PASS.

## CPU, heap y regresiones

[Medición real del producto 192dcdd](cpu-heap-192.json) en una instancia nueva, puerto 8889: cuatro herramientas exitosas (`isError=false`), primera búsqueda con caché editorial fría, hash de lectura, calidad de vida 35/compromised y movilidad SB comprobados. Heap V8 máximo **observado**: 18.415.160 bytes entre llamadas. CPU V8 muestreada activa aproximada: 168.899 µs agregados; idle/program: 60.716 µs. Incluye handshake, framework e inspector. No demuestra CPU facturable por petición, pico RSS/total del isolate ni viabilidad en Free. El profiling fallido de 8787 se conserva y no cuenta como PASS.

[Regresión focal de navegador](navegador-focal-f96.json): cinco comprobaciones UI/API/WebMCP aprobadas en `f96c4cc`, sin atribuirlas a una ejecución en `192dcdd`. La [comparación de 330 assets](diff-assets-final.json) entre ambos productos sólo difiere en el timestamp de contacto, sin archivos ausentes; UI, JavaScript y cálculos conservan bytes. Las matrices anteriores 36/36 y 91/91 se conservan sin repetirlas ni presentarlas como una nueva ejecución. El primer harness focal exigía un orden de getTools que Chrome ordena alfabéticamente; se corrigió para comprobar el universo exacto de cuatro herramientas, manteniendo el orden obligatorio de MCP tools/list. Su FAIL original se conserva.

## Gate local en FAIL: STOP C08

El [bug #100](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/100) permanece abierto. El cliente SDK normal en workerd local acredita las 28 lecturas y cálculos, pero la matriz negativa termina con **500 en lugar de 413**. Tras un rechazo 413 previo, el upload en streaming devuelve `Network connection lost` desde Miniflare y termina Wrangler. El único experimento con `Connection: close` conservó las mismas comprobaciones: superó el overflow pero falló en el siguiente batch JSON con **500 en lugar de 400**. No se adopta como solución ni como PASS; no se repiten variantes.

El [overflow del preview](overflow-preview.json) devuelve 413; no se afirma que los intermediarios no asignen Content-Length. Ese PASS **no sustituye el gate local**. La [evidencia local](overflow-local-fail.json), cuerpos y logs negativos se conservan.

La incidencia primaria https://github.com/cloudflare/workers-sdk/issues/15709 describe una forma similar de fallo tras exceso/cancelación y petición posterior, con Wrangler 4.129.1. Está abierta; la similitud no prueba identidad causal con 4.128.0 utilizado aquí. No se alteran configuración, dependencias, contratos ni comprobaciones para evitar el fallo. El alcance dependiente de C08 queda detenido; no hay aceptación global del autor.

## Trazabilidad y límites de la entrega

El [índice de originales](indice-originales.json) conserva positivos, negativos, fuentes primarias, scripts privados y perfiles completos. Estos documentos se prepararon después del snapshot de producto y no forman parte del tree de `192dcdd`; se archivarán en un commit documental separado.

El último ensayo de rollback sigue siendo el de R1, `a1fa4ef`, 8/8 comprobaciones locales. No se presenta como un nuevo ensayo sobre `192dcdd`. No se integra, modifica main, publica en producción ni ejecuta scans o puntuación F4B. Se mantiene `search=yes, ai-input=yes, ai-train=no`. F5/F6 quedan fuera del alcance.

Contador de implementación: R2/5, mismo auditor, máximo cinco revisiones; quinta FAIL implica STOP, sin reset. La auditoría de adenda tiene su contador propio A1-R1/2 PASS y no renumera las anteriores.
