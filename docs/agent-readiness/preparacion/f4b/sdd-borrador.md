# SDD F4B — MCP remoto (borrador)

**Estado: PREPARACIÓN PRELIMINAR. NO RATIFICADA. NO EJECUTABLE.** Auditorías formales:0. Congelado final: pendiente. Base de implementación, contrato F4A, contrato Server Card y autorización de programación: pendientes. Se permite redactar este documento; no implementar lo descrito.

## 1. Problema y resultado observable

F3 permite búsqueda/lectura por HTTP público; F4A debe entregar herramientas compartidas/API/WebMCP aceptadas antes de F4B. El cliente remoto obtendrá descubrimiento MCP, listado real y ejecución de búsqueda, lectura íntegra y sólo cálculos puros aceptados. Resultados equivalentes a API/UI, avisos/fuentes intactos y ningún efecto de producto.

La existencia de una card o un PASS del escáner no sustituye llamadas reales. 73general es estimación del plan, no resultado prometido; comparación final mantiene selección/denominador/neutrales y separa nivel de puntuación.

## 2. Base, alcance y autoridad

Base documental de preparación `eff4ce13a1f4b996f3d9b523799012bc668da318`; producto F3 aceptado `aad2a6624c24d7425c5ad5329b82c77a8a86b619`. **Base/head/tree de programación F4B: PENDIENTES F4A; estos SHAs no los sustituyen.** Ramas/destinos futuros pendientes de admisión, sin main. [Dependencias](dependencias-f4a.md) D01–D10 obligatorias.

Alcance propuesto: adaptador MCP, schemas de tools derivados de autoridad aceptada, transporte con límites/abuso, card generada cuando G02 quede resuelto, registro/ARD y descubrimiento coherentes, evidencia funcional y rollback. Conserva F1/F2/F3 y F4A. Excluye asistente generativo, login, OAuth, comercio, herramientas de contacto/admin/envíos, código arbitrario y cambios editoriales/metodológicos.

Ownership actual **sólo** esta carpeta. Ownership posterior, detalle de paths e integración secuencial en [propuesta](ownership-e-issues.md), pendientes D09. No transferir esos permisos a esta preparación.

## 3. Contrato propuesto y elementos sin congelar

Recomendación técnica y presupuestos en [diseño](diseno-preliminar.md); fuentes fechadas en [referencias](referencias.md). Ningún MUST de este borrador crea un contrato de producto por sí mismo.

- SDK candidato server/client2.3.1; handler web estándar y fábrica por petición, sin sesiones persistentes. Protocolo moderno2026-07-28 y compatibilidad objetivo2025-11-25. No duplicar herramientas ni algoritmos.
- Endpoint único, path/métodos/dispatch/config finales **pendientes**. `/mcp` es propuesta previa del plan. POST JSON-RPC con JSON/SSE; GET/DELETE405 si no se ofrece su capacidad; OPTIONS/CORS de transporte separado. Sin card en GET del transporte por suposición.
- Moderno: `server/discover` y metadatos/headers por petición, resultado `complete`; legacy: initialize/initialized/list/call y negociación de su revisión. Versiones permitidas y errores exactos **pendientes de fixture/cliente**.
- Búsqueda/lectura: F3 es autoridad; `structuredContent` de éxito conserva respuesta exacta y `content` su texto íntegro. Nombres MCP finales **pendientes D02/D03**. Schemas Draft2020-12 autocontenidos; semántica HTTP/JSON documentada, no coerciones silenciosas.
- Cálculos: nombres, inputs/outputs, unidades, metodología, errores, signal y ejemplos **pendientes D02–D07**. No se adjuntan schemas especulativos de cálculo.
- Body32KiB, resultado8MiB, wall10s, descriptors256KiB y rate60POST/30calls por minuto son **propuestas**; pruebas exacto/+1 y consumo real antes de ratificación. Límites de contenido F3 siguen contractuales.
- Seguridad: público sin auth, Origin/Host validados, CORS sólo transporte aprobado, no-store, sin cookie/privilegios/URLs arbitrarias; namespace limiter y budget real pendientes. Logs agregados, sin entradas de usuario.
- Card/schema/ruta/identidad/versiones/type/entries definitivos **detenidos por G02**; cambios discovery **pendientes D08**. Ninguna URL/hashes de artifacts futuros se da por conocida.

Antes de «lista»: anexos exactos con operaciones/schemas, requests/responses completos por revisión, errores/status/headers byteexactos, límites definitivos, cliente/versiones, matrices de paridad y archivos/comandos de validación reales. Esta ausencia es deliberada: **la SDD sigue borrador**.

## 4. Invariantes

1. F3 conserva corpus guard, ranking/paginación y lectura byteíntegra (Markdown reencode/SHA/bytes), metadata y todos los links. No fecha editorial de build ni prosa clínica nueva.
2. IDs sólo de inventario; rechazo de rutas/URLs/encoded traversal antes de I/O; ninguna operación llama a assistant/admin/contacto/AI/DB/EMAIL.
3. Cálculos usan exactamente función/metodología F4A aceptada; UI/API/WebMCP y MCP no divergen en umbrales/redondeos/avisos.
4. Instancias/peticiones aisladas, incluso clientes con el mismo requestId; no estado global anónimo ni SESSION/contacto para MCP.
5. Config/routing/headers discovery se integran en serie; paths ajenos continúan por su handler original; sin negotiating Markdown sobre MCP/descriptors.
6. Fallar cerrado antes de éxito si falta asset, falla integridad o excede presupuesto; no truncar, producir404 ficticio ni fallback generativo.
7. Descubrimiento sólo anuncia el servidor y versiones que su build realmente sirve. Card no contiene tools/capabilities supuestas ni secretos.
8. Resultados y PASS se atribuyen al SHA/build/URL/ventana comprobados; documentación de investigación y preview no se atribuyen a producción.

## 5. Criterios verificables propuestos

Todos **NO EJECUTADOS**. «Pendiente F4A» significa que no hay oracle/base que permita ratificarlos hoy. Una prueba futura no hereda el PASS F3 para afirmar MCP funcional.

| ID | Nivel | Criterio verificable | Evidencia futura / dependencia |
|---|---|---|---|
| C4B-01 | Documental | SDD/anexos completos con base/tree reales, F4A aceptada, fuentes fijadas y ownership sin conflicto; auditor independiente PASS y ratificación posterior | Cierres D01–D10; resolución G01–G04; paquete congelado. **PENDIENTE F4A** |
| C4B-02 | Runtime/CI | SDK versión fija sirve en workerd con stack/config aceptados; bundle/startup/CPU/memoria dentro del presupuesto | Lockfile, build manifest, comando/salida CI y workerd, cold/warm; no Node-only. G03 |
| C4B-03 | Runtime/preview | Cliente moderno descubre (o invoca directamente) y lista/llama; headers/metadata y versiones coinciden; errores modernos exactos | Cliente/versiones fijas; raws para discover/list/call, unsupported/mismatch/method; sin initialize moderno ficticio |
| C4B-04 | Runtime/preview | Cliente legacy objetivo completa initialize→initialized→list→call, sin sessionId persistente, GET/DELETE405 conforme; negociar/rechazar según versión | Raws y headers de cada paso; version compatibility matrix real, ningún PASS por card |
| C4B-05 | Runtime/preview | Listado estable exactamente igual al registro aceptado; sólo búsqueda/lectura/cálculos puros; schemas/annotations coinciden con implementación | Snapshot tools/list, validación JSON Schema/semántica y diff del registro. **PENDIENTE F4A** |
| C4B-06 | Runtime/preview | Búsqueda MCP=F3 en resultados, metadata, pesos/ties, corpus y paginación; lectura de todos los IDs del corpus íntegra y citables | Pares MCP/API del mismo build; reencode/hash/bytes de cada lectura; Unicode/noresult/offset/invalid/corpus cambiado. Punto reutilización **PENDIENTE F4A** |
| C4B-07 | Runtime/preview | Cada cálculo MCP=UI/API/WebMCP aceptados, incluidos mínimos/máximos, inválidos, umbrales y redondeos/avisos | Fixtures reales F4A y salida completa por canal; no oracle copiado de la implementación MCP. **PENDIENTE F4A** |
| C4B-08 | Runtime/preview | Errores diferenciados de transporte, protocolo y negocio; mensajes sanitizados, sin input/path/stack; código de corpus conservado | Matriz request/status/JSON-RPC/isError; id válido preservado, batch/schema/missing method/unknown tool/domain errors. Cálculos **PENDIENTES F4A** |
| C4B-09 | Runtime/preview | Caps exacto/+1 de body/metadatos/profundidad/resultado/descriptors/trabajo; exceso jamás produce éxito truncado | UTF-8/chunked/escaping/máxima lectura; bytes totales del envelope y SSE; deadlines y rechazo antes de ejecutar. Máximos cálculo **PENDIENTES F4A** |
| C4B-10 | Runtime/preview | Público sin auth y sólo namespace permitido: Origin/Host, OPTIONS/CORS/errores/cache seguros, no effects/fetch arbitrario; limiter429/Retry-After/recuperación | Casos sin Origin, aprobado, null/malformado/no autorizado; request counts/I-O negativa; binding namespace real; límites locales explícitos |
| C4B-11 | Runtime/preview | Moderno cancela al cerrar SSE, libera recursos y no emite respuesta posterior; clientes paralelos con mismo id no se interfieren. Garantía legacy exacta y trabajo residual documentados | AbortSignal observado, I/O/counts/streams/concurrencia/restart; sin fingir correlación cross-POST. **PENDIENTE F4A/G04** |
| C4B-12 | Build/preview | Card generada válida contra contrato elegido; identidad/remotes/versiones corresponden a runtime; registry/ARD/llms/Link anuncian sólo activos y preservan F3/F4A | Artifact bytes/SHA reales, schema seleccionado, GET/HEAD/MIME/CORS/condicionales y recorrido catálogo→card→cliente. **DETENIDO G02; PENDIENTE F4A** |
| C4B-13 | Preview | Dispatch de transporte/card alcanza Worker/ASSETS correctos, sin regresión de HTTP API/UI/WebMCP/HTML/Markdown/asistente existente | Pruebas acotadas de composición, no repetir matrices históricas F2; headers/canónicas/política/link y receipt del SHA final. **PENDIENTE F4A** |
| C4B-14 | Operación/preview | Presupuesto/owners/alarma/desactivación y rollback concretos, consumo medido, sin cuota global ficticia | Plan cuenta, CPU/requests/logs/tráfico legítimo/abuso, límites y procedimiento probado en preview; sin secretos |

Gates posteriores de producción, **separados y no autorizados por esta entrega**:

| ID | Criterio | Evidencia |
|---|---|---|
| P4B-01 | Promoción sólo de entrega aceptada, con autorización y receipt/manifest del nuevo build real | SHA/tree/base, diff y origen de CI/deployment; no receipt heredado F4A/F3 |
| P4B-02 | Clientes compatibles realizan discovery, search→read→cite y cálculos; card/descriptors/transporte públicos coherentes; F4A/F3 continúan funcionales | Requests/responses originales con timestamps/versiones/URL, parity/hash/schema, rollback candidato |
| P4B-03 | Control MCP y scores medidos con perfil comparable; no regresiones, errores de scanner conservados | Solicitud/selección/JSON original, fórmula/denominador/neutrales/nextLevel; comparar con baseline aceptado real tras F4A, **PENDIENTE F4A** |

## 6. Plan futuro de pruebas y evidencia

Cliente moderno candidato SDK2.3.1; Inspector2.10.1 candidato para recorrido remoto; cliente legacy compatible con2025-11-25 se selecciona/pinea explícitamente al congelar. Un cliente nuevo con fallback automático no demuestra el camino legacy si no se captura la revisión negociada. Inspector SDK2.2.0 no equivale a una prueba del cliente2.3.1. No instalar ni ejecutar estos clientes ahora.

Pruebas contractuales del adaptador y parser; integración en workerd del build real; preview accesible con clientes y receipt independiente. Cargas de prueba sintéticas sólo bajo presupuesto aprobado para preview. Pruebas negativas confirman ausencia de side effects y de uso de bindings sensibles; no invocar esos servicios reales para «probar lectura». Verificar rate local con instrumentación y reconocer tolerancia eventual. Escáner sólo en gate final aplicable; no repetir scansF2.

Evidencia futura: comando/versiones, base/head/tree, URL y timestamp, request sanitizada, response original preservada, status/headers/body/bytes/hash, artifact/build manifest y receipt real. Usar entradas sintéticas, sin datos reales de perros/usuarios ni tokens; si un raw requiere omisiones, registrar proyección y conservar original conforme al método. Guardar PASS/FAIL/no verificado por criterio; no retries que oculten primer fallo. Si falta entorno/receipt/original esencial, bug/STOP del alcance afectado.

No fijar ahora nombres de scripts de pruebas, comandos inventados, hashes de build ni paths de evidencia de implementación fuera de ownership. El congelado final debe escoger los archivos/comandos existentes o nuevos autorizados, invocación CI real y cómo el build de Cloudflare los ejecuta.

## 7. Entrega y rollback futuros

Entrega de implementación: draftPR sin main, SHA/tree/base/diff, dependencias cerradas, ownership, evidencias de criterios, CI/workerd/preview del SHA final, riesgos y propuesta concreta de publicación. Auditor distinto del autor, contador aplicable del programa; ratificación posterior y promoción separada. Este documento no crea PR/issue/sesión.

Rollback propuesto: retirar anuncio MCP de registro/ARD/llms/Link/card y transporte como conjunto coherente, conservando API/UI/WebMCP de F4A y contenido F3. Revertir sólo deps/config/routing/helpers propios F4B cuando ningún consumidor aceptado los necesite. No restaurar íntegramente un archivo compartido a F3, porque borraría F4A. Evidencia histórica permanece.

Antes de publicación, fijar commits exactos, mecanismo de desactivación, orden según atomicidad/caché del despliegue, TTL/purga si se adoptó cache de card, y prueba preview de «discovery sin referencias muertas + MCP retirado + F4A/F3 operativos». Si anuncio/transporte se publican en un build atómico, rollback conjunto al build aceptado inmediatamente previo; **identidad PENDIENTE F4A/entrega**. Rollback de producción también requiere admisión/autorización aplicable, receipt nuevo y verificación exterior; no se ejecuta como parte de la preparación.

## 8. Condición de salida del borrador

Completar [checklist](checklist-congelado.md), incorporar contratos/cierre reales F4A y resolver huecos esenciales; después snapshot documental fijo, auditoría formal independiente y ratificación final. No auditar este borrador como si ya contuviera contracts de F4A, no congelarlo antes y no usar esta preparación como permiso de programar.
