# Correctivo MCP discovery — publicado y verificado

**D08 completado el 2026-10-14. All-ui general:73/100 y nivel5 Agent-Native; Content Site:86/100 y nivel5 parcial.** La CLI congelada calcula el score desde11/15 y6/7 controles contabilizados respectivamente; el nivel5 proviene literalmente del evaluador. [Resultado final](produccion/resultado.md), [comparación general](produccion/comparison-all-ui.json), [respuesta original general](produccion/live-all-ui/response.raw.json).

El propietario autorizó literalmente «Autorizo» la propuesta concreta. Main recibió exactamente7e389a83c87cd5f14537f4b07f0cd783ca572251/tree6a2c50cc3e28c30389668bd70070b8cb545c36bd mediante FF desdeb2ab108 sin force. El receipt propio de producción es build8d1bf392-1efb-4a80-b045-2c66d21a45d5/version4fad00fc-f88e-4abc-878c-f7d50742f069; [receipt](produccion/receipt-production.json). Smoke producción realPASS20/24,19EOF+1AbortErrorintencional tras frame completo; rollback no ejecutado. Una medición por perfil, sin retries/regresiones/selección cambiada: contentdelta0, all-uidelta+6; único cambio general mcpServerCard fail→pass.

Los [originales de producción](produccion/indice-originales.json) se archivan byteexactos, completos y sin cookies/credenciales. ÍndiceR2,STOP105/FAIL históricos,normaF4B/C09/deadline/WAF y contrato permanecen intactos. No schema nuevo validado, auditoría nueva ni pruebas/HTTP/scans de cierre. Producto/main/PR siguen exactamente7e389; esta rama documental no se promueve. El push puede activar build automático y no se le atribuye el receipt7e389.

## Archivo previo R2: estado anterior a la autorización

Los párrafos siguientes conservan el estado preparado y revisado en8f27b51. Su D08 pendiente quedó resuelto por el resultado final enlazado arriba; la propuesta y el informe R2 mantienen su alcance histórico.

**R2/5 PASS independiente, sin bloqueantes previos a promoción**, sobre candidato `7e389a83c87cd5f14537f4b07f0cd783ca572251`, tree `6a2c50cc3e28c30389668bd70070b8cb545c36bd`. [Informe literal](r2/auditoria-implementacion-r2.md), 13081 bytes, SHA-256 `043a2da30222f6bfa5f2bb463a7138fdbb9defd0f78e62e21177a18b6e43b758`. Autor y auditor GPT-6.1 Sol/high separados; mismo auditor, contador **R1/5 contrato PASS → R2/5 implementación PASS**, sin reset.

El correctivo genera y sirve el descriptor `/.well-known/mcp/server-card.json` desde las mismas autoridades reales de identidad y capabilities. La card nativa `/api/mcp/server-card`, el endpoint `/api/mcp` y F4B permanecen preservados. El descriptor nuevo mide233 bytes; no se le atribuye un JSON Schema ni aceptación del parser privado del evaluador.

Build, checks, CI/Workers y HTTP real local/CommitPreview pasaron. Ambos smokes tienen20/24 peticiones; GET200 y HEAD200sin cuerpo de ambas cards, headers/bytes/hash/no redirects, SDK2.3.1 real en ambas eras/listas y cuatro calls con paridad API/lectura/hash, robots y Origin403. Son19EOF+1AbortErrorintencional tras frame SSE completo por entorno, no20EOF. Preview corresponde a build `b45f8c12-3724-4928-9074-663c4af6f1b5`/VersionID `55ccf415-671c-47f3-8d4f-adec1193eb4b`, no a producción. [Receipt](r2/receipt-preview.json), [identidad de árbol CI](r2/identidad-ci.json), [smoke preview](r2/smoke-preview.json).

El diff de build compara todos357 archivos base y358 candidato. Hay una sola ruta pública añadida y cero bajas;328 artifacts existentes byteexactos, `_headers` cambia sólo su bloque autorizado y contacto sólo su posición startedAt con guard/prefijo/sufijo íntegros. Las diferencias compiladas de servidor están declaradas como referencias/paths/metadata de build y las tres modificaciones autorizadas de capabilities, sin rawserverbyteigual. [Regresión pública](r2/regresion-publica.json), [disposición del bundle](r2/disposicion-bundle-servidor.json).

Rollback específico `0f3c03ef72a5f53d268d354bc7b3210d01e0674a`, tree `2553b9fbe96711e7cc72138174f3a13051476066`, preparado y ensayado localmente8/8. Restaura los once archivos del correctivo a b2ab, preserva F4B y todos los documentos; no usa el revert histórico F4B. [Ensayo local](r2/smoke-rollback-local.json). No se publicó en producción.

STOP105 y los tres FAIL offline originales de55dc4e permanecen intactos. La respuesta del propietario «Ok, autorizo» admitió únicamente la entrada faltante del fixture y la continuación; [admisión prospectiva](../admision105.md). La suite posterior7e389 pasó77/77; ese resultado no reetiqueta los FAIL anteriores ni autoriza publicación.

**D08 pendiente, sin score nuevo:** no main/merge/producción/scans del correctivo. El baseline histórico curado F4A86content/nivel5parcial y67all-ui/nivel4general tiene procedencia propia y no es medición del correctivo. CLI/perfiles congelados permanecen intactos. C09 remoto aceptado no determinable sigue NO PASS, sin protección efectiva acreditada; deadline externo pendiente/no bloqueante/no deuda/NO PASS; historial F4B R1FAIL/R2FAIL/R3PASS sin cambios.

Este archivo y las copias de auditoría/entrega/índice se archivan en **rama documental separada `agent-ready/mcp-discovery-104-cierre`**, hija del candidato. La rama fuente y draft [PR106](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/106) permanecen exactamente7e389. El push documental puede activar builds automáticos; no se ejecuta HTTP ni se atribuye a su nueva imagen la evidencia del candidato auditado. [Entrega literal](r2/entrega.md), [índice literal de118 fuentes](r2/indice-originales.json) y [manifest de archivo](manifest.json) conservan los bytes/hashes y aclaran qué originales siguen privados fuera de Git.

La [propuesta concreta de promoción](propuesta-promocion.md) deja la decisión final del propietario como paso pendiente. Ninguna auditoría ni autorización histórica sustituye esa decisión.
