# F2: verificación final de producción

Producto ya desplegado: `d2bd342050811d41ee212730cb11fe07783994bd`. Helper/contrato aceptado por separado: `f91a95b7f49f3b5e8c80f667ee7d1b67aa0267d6`. No hubo nuevos builds, deploys ni cambios a main en esta ejecución.

La matriz nueva y finita completó 1284 IDs: 964 solicitudes HTTP verificadas y 320 N/A derivados de dependencias/validadores de esta misma tanda. Ningún error, retry, redirect seguido o ID pendiente. Los dos STOP anteriores se conservan con sus contadores y sellos; no se reanudaron ni se reinterpretaron como PASS.

## Medición real P03

Se ejecutó una sola POST por perfil, con la CLI, selección y fórmula congeladas. Ambas devolvieron HTTP200, estado complete y cero errores; ambas comparaciones F1 son comparables.

| Perfil | F1 | F2 real | Controles puntuables | Nivel devuelto por el evaluador |
|---|---:|---:|---|---|
| Contenido, parcial | 71 | 86 | 6/7 | 5, Agent-Native, sólo para este perfil |
| General, all-ui | 33 | 40 | 6/15 | 4, Agent-Integrated |

El cambio comparable es `markdownNegotiation: fail → pass`. Permanecen 7 controles neutrales en all-ui; comercio se conserva neutral para este blog. El nivel es metadata del servicio, no una fórmula inferida ni el nivel3 estimado en el plan. No se presenta el nivel5 del perfil parcial como resultado general.

DNS-AID sigue fallando en contenido. Las otras ocho faltas puntuables generales corresponden a API Catalog, OAuth discovery/protected resource, auth.md, MCP card, skills, WebMCP y ARD. Se resolverán según las funciones reales y fases del plan; la aceptación F2 no exige inventar autenticación o comercio.

`deploymentCommit=null` en los summaries permanece intacto. La vinculación a producción se demuestra con el recibo independiente, los checks y la admisión del root, no reescribiendo la respuesta del evaluador. Política vigente: search=yes, ai-input=yes, ai-train=no.

## Evidencia y privacidad

[Resultado agregado](resultado-publico.json), comparaciones, request/metadata/summary exactos y manifests públicos positivos acompañan este cierre. Los cuerpos JSON originales del evaluador se conservan privados, completos y referenciados por SHA256/bytes; no se dividen para publicarlos. Capturas de la matriz, listas operativas N/A, trazas y tracking permanecen privados. El sello privado cubre 7714 archivos y 57729474 bytes.

La [auditoría independiente de cierre](auditoria-informe.md) dictaminó **PASS P01–P03 por evidencia archivada**, sin bloqueantes. El coordinador acepta el cierre de F2 y la resolución de los bugs70/71. No cuenta como nueva revisión de código ni reinicia los presupuestos de las SDD o bugs70/71. El auditor verificó todos los paths/tamaños del sello y226 digests de28casos raw representativos más summary/result; no afirma rehash independiente de los7714 archivos.

Siguiente fase del plan: F3, contratos públicos de catálogo/búsqueda/lectura, OpenAPI, skills y ARD. Se concreta y audita su SDD antes de programar.
