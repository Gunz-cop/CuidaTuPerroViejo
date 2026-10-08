# Recuperación #65 — aceptación técnica R3/5

La recuperación del registrador y de los insumos B07 obtuvo **PASS R3/5, cero bloqueantes**. Este cierre acepta esa recuperación; F2B formal permanece **0/5** y la matriz pública todavía no se ha ejecutado. Los gates del candidato público siguen pendientes. No autoriza integración a main.

## Entrega aceptada

Snapshot local auditado: `147aba2948fef773682d99ba264246eacadeb741`, tree `ec36e1fabd311325f5e4880b2177689efdbb5bd6`, desde público `e3492afd661d6d96535717d8d5caa3bfc3d9498d`. El snapshot preparado tenía 90 archivos. El subconjunto publicado conserva 88 de ellos byte por byte y un índice UTF8 derivado; un índice con metadata operativa permanece privado. El registrador, sus tests, el plan y los objetos de captura conservan los bytes auditados. Sus marcadores «listo para auditoría / no aceptado» registran el estado del autor al congelar; el veredicto independiente posterior y este cierre registran la aceptación de la recuperación.

[Informe R3](auditoria-recuperacion-bug65-r3.md), SHA-256 `143d7d2a2acc441b6c9dc73b8baec2bb08642faf9b095ec12bcbc3d64dd1fe9c`; [comprobante R3](auditoria-recuperacion-bug65-r3-comprobante.json), SHA-256 `fc2e166f88f81bcccebde878d348761956808de8a214339952dea547d8459713`.

Los seis GET400/406 exigen ahora los literales del contrato, incluso si faltan campos opcionales de cuerpo en el plan. Doce pruebas offline y el ejecutor real con transporte sintético verificaron 1.284 IDs: 1.274 capturas sintéticas y diez N/A documentados. Los negativos conservan raw, STOP y pendientes. Estas pruebas no representan HTTP público.

## Historia e insumos

R1 FAIL y su STOP permanecen publicados en `../recuperacion-bug65-r1-stop/`. Sus respuestas históricas no adquirieron pruebas de insumos retroactivamente. El propietario autorizó una nueva serie local de ocho casos con los insumos archivados antes de Workerd.

R2 acreditó esa nueva serie y cerró R1-B01–B07, pero falló por la comprobación ausente de cuerpos400/406. Se conservan byte por byte el [informe R2](auditoria-recuperacion-bug65-r2.md), SHA-256 `ae4cb1fbe597090a3db1a0ac3213b168ce9c9850315896fb45f8d54e713ab21f`, y su [comprobante](auditoria-recuperacion-bug65-r2-comprobante.json), SHA-256 `58417d80c75cdf56ab8c6121bdd963a15977f7c9c84a00f574c4909028aef2a1`. Los paquetes de autor R1/R2 fallidos permanecen privados; esta publicación incorpora exclusivamente el paquete corregido y aceptado R3.

R3 reutiliza las mismas ocho capturas locales de R2, sin repetirlas. Sus índices de assets ausente e inválido, árboles de315/316 archivos, bundle26, configs y87 archivos de captura permanecen intactos tras el build. Cuatro GET conservaron el literal503 de37 bytes; cuatro HEAD conservaron cabeceras y descarga de entidad cero. La preparación fallida por un ejecutable curl inexistente conserva su STOP original y prueba cero peticiones emitidas.

Los originales de infraestructura, logs, traces y scripts privados se identifican mediante tamaños y hashes en las omisiones y comprobantes. No están incluidos íntegramente en Git. El índice UTF8 de publicación es una proyección del original auditado, cuyo SHA-256 es `d3ce08d2d0a0639d7e156b1e1bc873c212317f9808d7efa656a010ebc211b45f`: sella 75 archivos de texto, más 13 objetos y el propio índice, total 89. Un índice operativo privado de 73 referencias se retiene íntegro fuera de Git; no se publica su enumeración. El índice de esta publicación identifica el subconjunto real y los cuatro documentos independientes junto a este cierre. No sustituyen al manifiesto privado completo.

El build de la entrega auditada conserva los57 artefactos del corpus. Producto, tests de producto, configuración, editorial y contrato no cambian con esta recuperación. El contrato sucesor conserva SHA-256 `842c225f79f3eda680e968dbcd673ee760f9d75b83299d241480dc4ae86068f0` y su PASS2/2.

## Curación de publicación

La revisión automática rechazó publicar un índice que enumeraba nombres, tamaños y hashes de capturas, logs, configuraciones y scripts privados sin autorización específica. Se omitió ese archivo completo de esta publicación. No se codificó ni repartió su contenido en otros archivos; sus originales siguen disponibles para auditoría privada. Los informes R2/R3 son copias exactas de revisiones sobre snapshots preparados previos a esta curación. Su descripción de 90 archivos y 752 omisiones corresponde a esos originales; el índice actual describe lo que contiene Git.

## Continuación autorizada

Antes de ejecutar: publicar estos bytes, comprobar identidad local/pública y CI/Workers exitosos del nuevo HEAD, obtener el CommitPreview oficial del PR64 ligado a ese HEAD y congelar fuera de Git una copia de ejecución retargetada con los mismos1284 IDs y presupuesto. El plan versionado permanece inactivo. No usar URLs históricas ni calibraciones.

La matriz finita se detiene ante el primer fallo y conserva parciales y pendientes; no se reintenta para producir verde. La auditoría formal B sólo comienza con su entrega local y pública completa. La promoción conjunta F2A+B requiere autorización específica sobre una entrega aceptada y revisable, conforme a F2§8.
