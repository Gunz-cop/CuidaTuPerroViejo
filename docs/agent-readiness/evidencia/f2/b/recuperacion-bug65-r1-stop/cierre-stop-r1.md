# Recuperación #65 — cierre documental R1 y bloqueo #66

**FAIL R1/5; STOP.** [Bug #66](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/66) documenta el insumo de fixture perdido. [#65](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/65) y [#56](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/56) siguen abiertos; [PR64](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/64) permanece draft. El helper y su propuesta de ejecución no se publican ni habilitan en esta carpeta.

El dueño autorizó el 2026-10-08: «Resuelve el bug #65 y continúa». La sesión Luna 6 de razonamiento alto corrigió el registrador original, conservó ocho respuestas HTTP locales nuevas y entregó el candidato local `45a1dc725cf063e54d8955b186ad3824d98e66e3`, tree `da37cc8cf78721906e75f2e5fe305e32d4f493fa`, sobre base pública `5641030535715b54e1e9f61985e8c0cb2ccfde61`. El código de producto sigue siendo el de `05ecae3c1356e393f26a5831dec41b7e4b84db77`; el diff de recuperación es exclusivamente documental.

La misma sesión auditora independiente revisó ese estado fijo. [Informe R1](auditoria-r1.md), SHA-256 `8fbc3a9c3b7044a3db4cf47befe5b65264d349c72a7fc2a98406fa425c6d45c0`, y [comprobante](auditoria-r1-comprobante.json), SHA-256 `b48026cbfa51fab68fbec2d38737af852128aa72c2765f8445eceaff5c86a0d9`, están copiados byte a byte; no son versiones recortadas. El original del programador, incluido su informe de PASS previo a auditoría, se conserva como historia y no equivale a aceptación.

## Resultado y alcance de la evidencia

- Los 65 archivos referidos por el freeze-index, 78 originales del manifiesto previo y 71 del final coinciden con sus hashes. Las ocho respuestas nuevas contienen solicitudes, cabeceras CRLF, métricas y cuerpos GET reales de 37 bytes; HEAD no tiene entidad. Los resúmenes incompletos anteriores se preservan.
- Los 57 artefactos de proyección coinciden: 28 HTML, 28 Markdown e índice. El auditor ejecutó diez tests puramente offline y comprobó la paridad por lectura, sin compilar ni emitir HTTP.
- La simulación independiente del verdadero pipeline llegó a 1.159 casos completos y se detuvo en el 1.160 por una dependencia del suplemento no resuelta. El PASS sintético 1.284 del autor sustituía el executor y no cubría ese camino.
- El informe cierra R1-B01–B06: restricciones de Date incorrectas, destino/expectativas antiguas, dependencia del suplemento, selección/MIME/ETag insuficientes, estabilidad ETag y políticas CDN. Son defectos recuperables del registrador/plan.
- R1-B07 es falta de datos necesarios: un rebuild eliminó los directorios de insumos y no se archivaron bytes o una prueba existente que distinga el índice malformado del ausente. Las etiquetas de fixture y respuestas503 no demuestran esa causa. La búsqueda sólo de lectura fue negativa; no se recreó el dato.

La [SDD sucesora §5](../../../../fases/f2b-contrato-sucesor.md) exige: «si faltan datos necesarios para auditar un criterio, se detiene y abre bug». Por ese déficit se detuvieron autor y auditor; no se asignaron correcciones, otra captura ni R2. La [propuesta de recuperación siguiente](propuesta-recuperacion-r2.md) es revisable y está pendiente de decisión.

## Contadores, omisiones y publicación

Recuperación #65: **1/5**, quedan cuatro revisiones y no se reinicia el contador. Auditoría formal F2B: **0/5**. Capturas públicas del candidato: **0**. SDD sucesora **PASS2/2**; diagnóstico previo cerrado; F2A aceptada; F2B sin aceptación. Main permanece en F1; no hay autorización de promoción F2.

La copia Git contiene únicamente cinco documentos: informe y comprobante independientes completos, este cierre, propuesta e índice de publicación. Los 66 archivos del candidato R1 del autor se mantienen fuera de esta publicación, incluidos su README y resultados anteriores que afirmaban PASS. Los 71 raws privados, el subconjunto curado propuesto por el autor y los cinco soportes del auditor permanecen locales; sus manifiestos y hashes se conservan. En el informe original, las referencias a copias «públicas» describen ese subconjunto preparado y verificado localmente, no una publicación externa efectuada. No afirmar que esos bytes se encuentran en Git. Configs, trazas de red, logs completos e insumos perdidos no se sustituyen por derivados.

Esta publicación archiva el FAIL y el STOP, sin habilitar el registrador, una tanda nueva, el evaluador o producción. No cambia el código, los contratos ni los originales congelados.
