# Cierre arquitectónico F2A

2026-10-06. Coordinador de arquitectura y SDD. **F2A aceptada técnicamente: PASS 3/5, cero bloqueantes, A01–A08 satisfechos.** Issue [#55](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/55); PR draft [#57](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57).

La [auditoría independiente R3](auditoria-r3-implementacion.md) cierra R2-B01: las listas de tres niveles conservan su estructura, incluido UL → OL start 4 → UL y las 11 listas reales del artículo de medicación. El coordinador verificó el informe byte a byte, SHA-256 `c98eaa399b4d16c17d397e8b609677ed0d5c5d07cf7fae610f5e1c9760ae5c6f`, y los 282 archivos del [bundle](auditoria-r3-bundle/bundle.sha256), manifiesto SHA-256 `7d964133ecdc75b4a2e8210906b0a343806afb0cf0dfb213315b226e74133a5e`. R1 y R2 se conservan íntegros. Tres auditorías consumidas; quedan dos. SDD mantiene PASS 2/2 con contrato intacto.

## Identidad y procedencia

| Objeto | Identidad |
|---|---|
| Base aprobada | `cac7ee039607ee9923a403a4e2f299437ff94af2` |
| Público fijo auditado | `644cd3d8ace36ac69fee4938a115d22c158e5e63` |
| Local equivalente | `99f4616268276ad6dee4ac56fb6ff1a845da0c49` |
| Tree idéntico | `03f49e2a67d8fa028b6c174a7329412caa7ad2f9` |
| Builds del programador | `97cfa4361944837bb6ea7f4402c8d622837cdf8e` |
| HTTP público del programador | `810f5b7d1a05b910db7cd4016e9d225a49267489` |

El auditor midió el preview de 644: https://aa84910a-cuidatuperroviejo.g1721m.workers.dev, obtenido del [comentario oficial](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357), actualizado 2026-10-06T13:52:04Z. CI `112304086619` y Workers `112304454923` están completed/success para ese mismo SHA. Los recibos están en el bundle. Las capturas anteriores mantienen su procedencia original; la equivalencia de código se acredita mediante diff documental.

R3 verificó 41 tests principales y dos de crecimiento, corpus 28/28, dos builds con 57 hashes iguales, CLI, typecheck, dry-run y 60/60 casos HTTP tanto en Workerd propio aislado como en el preview fijo. Conserva límites, contenido clínico, fuentes, seguridad y descubrimiento F1. La home sigue siendo HTML ante Accept Markdown: la negociación corresponde a B.

## Traspaso y publicación

Este cierre agrega solamente documentación y evidencia. La base ejecutable de F2B será el SHA público de este cierre y su tree verificado, fijados en issue #56; el commit auditado anterior permanece identificado arriba. F2B usa una sesión distinta de Luna 6 alto y contador propio 0/5. No se usa una HEAD móvil ni una base documental sin A.

F2 completa requiere implementación y auditoría PASS de B. Su promoción a main y las pruebas P01–P03 requieren autorización específica posterior según §8. Aceptación de A no publica F2 ni acredita mejora de puntuación. Producción conserva F1: 71 Content Site / 33 All Checks, nivel 2. No se ejecutaron scans nuevos.

La reversión anterior a promoción consiste en retirar los PR apilados de B y A, conservando F1. Tras una promoción autorizada se revertirán conjuntamente B → A con su validación y autorización de despliegue; no eliminar evidencia, bindings o redirects existentes. Preferencia vigente: search=yes, ai-input=yes, ai-train=no.
