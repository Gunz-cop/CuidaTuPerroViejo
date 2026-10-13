# F4B — estado tras implementación R2/5

2026-10-13. **FAIL / STOP esencial C08**, bug [#100](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/100). No aceptar, integrar ni publicar. La entrega [R2](r2/README.md) corresponde al producto `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`, en rama propia `agent-ready/f4b-implementacion`.

[Informe literal independiente](../auditoria/implementacion-r2.md): 14.274 bytes, SHA-256 `a1906da89a051267333e4a1bb4ac3f3225d562402b8f3b98b8ad922789fbfcc5`. Mismo `/root/f4b_auditor`, gpt-6.1-sol/high, distinto del autor y corrector. Revisión **R2/5** del issue #90; R1 FAIL intacta, sin reset. Adenda 1 **A1-R1/2 PASS** ratificada en `b204442`, con contador propio; no reescribe la SDD ni su historial.

El auditor acredita correcciones de I-B1 (catálogo completo 28 y lectura íntegra/hash), I-B2 (deadline proactivo de salida y liberación sin abandonar residual F3), I-B3 (C12 conforme adenda, **80 byteexactos + contacto con equivalencia restringida**) e I-B4 (ping moderno rechazado y legacy conservado, SDK 2.3.1). Los FAIL anteriores permanecen históricos; no se convierten en PASS retroactivo.

El harness compatible real en workerd local del nuevo producto falla: **500 en lugar de 413**, `Network connection lost`. El único experimento con Connection: close conserva las comprobaciones y falla después con **500 en lugar de 400**. Preview real con 142 intercambios PASS, CI y tests defensivos PASS no sustituyen el gate local. Incidencia primaria workers-sdk#15709 similar, sin causalidad probada. No repetir variantes ni debilitar comprobaciones.

Los 385 originales R2 indexados fueron comprobados por autor y auditor sin diferencias. Se conservan también todos los originales anteriores. CPU/heap se midieron con cuatro herramientas exitosas sobre el producto nuevo, con límites expresos: V8 observado/muestreado, no CPU facturable ni pico RSS/total del isolate. El profiling fallido anterior permanece sin contar como PASS. Último rollback ensayado: R1 `a1fa4ef`, 8/8 local; no nuevo ensayo atribuido a este producto.

Bases finales F4A contrastadas: producto `cb8e10f1ead55ef0dafc666672cd3003252afc59`, documentación `a42a18522b7cf4143aff56d11d4632dc3c1050da`. Esa dependencia está cerrada; el bloqueo actual pertenece a F4B. Sin incorporación automática de documentos concurrentes. La integración requerirá revisar el diff final y los gates y la autorización aplicable.

Para reanudar, resolver el bloqueo de entorno/composición mediante encargo y admisión explícitos si afecta archivos, configuración o dependencias fuera del ownership; entregar snapshot fijo y evidencia real. No se presupone una solución ni una excepción contractual. Próxima revisión posible: **R3/5**, mismo auditor; quinta FAIL implica STOP, sin reset. No se continúa el alcance dependiente mientras siga abierto el hueco esencial.

Este archivo y la curación R2 se archivan en commit documental posterior al producto. No hay main, producción, scans, puntuación F4B ni promoción autorizada por este cierre. Se mantiene `search=yes, ai-input=yes, ai-train=no`; F5/F6 quedan pendientes fuera de este alcance.
