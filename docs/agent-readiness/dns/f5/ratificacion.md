# Ratificación y congelación de SDD F5

El coordinador ratifica el PASS independiente R2/2 del mismo auditor /root/auditor_f5, gpt-6.1-sol/high. Historial: R1/2 FAIL → R2/2 PASS, sin reset. Implementación #109: 0/5, aún no aceptada.

Contrato congelado: commit c0a65c666827387ac19a2aef7bf9fe88a4d6857b, tree62fc3797ff216a32baaea3b785ecbebad9291736. Únicos archivos normativos:
- sdd.md, 20518 bytes, SHA-256 a2cf470aaa5019b12ed727d2ab97db0e21de80d152b11d1ba0c073391fef1cb2.
- patch.json, 3424 bytes, SHA-256 36ef48e1470cba8a7fa8cc2d06432ebf70366fec416b02372090fe66ac1a2c5d.

La autorización del propietario para avanzar sobre la prohibición DNSSEC está registrada en autorizacion.md; no se pide otra vez. Permite aplicar exactamente el SVCB y la activación DNSSEC descritos, después de prechecks. No alcanza NS, WAF, proxy, plan, facturación o producto.

Se revalidan precondiciones antes de cada etapa y se guardan recibos originales separados para evitar truncar evidencia. Aplicación SVCB → GET por ID → PATCH DNSSEC active → GET, sin retries de mutación. La creación o estado pending no son PASS público ni cierre F5. Mantener presupuesto de 32 llamadas de control plane y 36 DNS desde esta congelación, más HTTP/SDK/evaluador según SDD. #107 no permite relajar validación DoH/TLS, originales, autoridad, SDK o CLI.

El rollback conserva firma mientras pueda subsistir DS; no borrar claves con TTL desconocido. Ante hueco esencial o respuesta inesperada, STOP dependiente, sin completar datos por hipótesis. SDD y patch congelados no se editan incidentalmente por resultados de plataforma.

Esta ratificación documental ocurre antes de cualquier modificación de zona. Los informes se archivan sin alterar snapshots revisados. Main/producto siguen 7e389a83c87cd5f14537f4b07f0cd783ca572251.
