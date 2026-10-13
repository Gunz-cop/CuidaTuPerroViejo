# F4B — STOP de desarrollo dependiente

2026-10-13. **No aceptada; no lista para integración ni promoción.** El encargo exige «Hueco esencial de contrato, datos, base o entorno: bug y STOP inmediato del trabajo dependiente». Se aplica al hallazgo de SDD§3 de transporte/moderno, sin reinterpretar el permiso anterior de correcciónB5 como permiso para cambiar el contrato.

Producto fijo `e6897f38fa3c80913d66ab7b044929b003a0abb5`, tree `ff2466e4132077a7348b9e7e324fcad5f97a67ee`, base ratificada `8669d9d6dd4b03685500d67a9332786ad474ff6b`, base técnica F4A `cb8e10f1ead55ef0dafc666672cd3003252afc59`. [PR draft93](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/93) contra rama SDD propia; ninguna promoción a main. Auditor independiente Sol/high, mismo de SDD; implementaciónR1/5. SDD conserva R1FAIL/R2FAIL/STOP/excepción autorizadaR3PASS.

## Bloqueantes conocidos antes del informe final

1. [#98 contrato esencial](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/98): SDD§3 permite ping2026-07-28 pero SDK2.3.1 lo rechaza404/-32601; legacy2025-11-25 sí responde200/result{}. No añadir protocolo propio ni una respuesta manual para aparentar conformidad. Detenido el desarrollo dependiente de transporte/contrato y las correcciones de cierre hasta decisión formal de arquitectura.
2. [#96 cobertura y afirmación incorrecta](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/96): el harness consulta catálogo default20 sin paginar. Se afirmó28incorrectamente; los originales dicen20. Corregido al propietario de forma explícita. C05todosIDs no cumplido. Corrección prevista: paginar según contrato F3 y cotejar universo, sin modificar búsqueda/read originales.
3. [#99 deadline/backpressure](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/99): output completo enqueued sin consumo mantiene slots tras10s y entrega éxito tardío. Prueba del auditor negativa con dos responses pendientes/tercer429. Corrección prevista: cancelación proactiva output y recuperación de slots cuando reader/jobs settle, manteniendo retención de I/O residual F3.
4. [#95 identidad](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/95):80/81assets exactos. Diferencia sólo startedAt Date.now() de contacto, ajeno corpus28 y sin deltaF4B. FAIL conservado; dictamen auditor FAIL confirma insuficiencia C12. No retirar comprobaciones ni cambiar hashes.
5. [#97 perfil local](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/97): tras rebuild/reload workerd8787 retornó F3search503 y search/read isError durante perfil. Detenida medición dependiente. Ese perfil no acredita CPU de búsqueda/lectura exitosa ni costes de producción. Sin causa atribuida al producto; originales conservados. Worker local detenido para evitar pruebas ambiguas.

## Resultados que siguen siendo evidencia real

CI final success82tests TS/66offline y todos gates del workflow; Workers Build/version/preview identificados por receipt. Cliente MCP real122intercambios en preview: cuatro herramientas, ambas eras,20IDs, fronteras y errores/cancellegacy; UI36/36, WebMCP91/91 Chrome155. Rollback local8/8 a1fa4ef/treebase. Esos resultados **no equivalen a PASS global**, no prueban producción y no corrigen fallos enumerados. Primera ejecuciónChrome15475/91 y primeraccesodirectonetworkFAIL conservados; bugs92/94 de entorno resueltos con evidencia posterior sin borrar fallos.

## Reanudación necesaria, sin autorización implícita

Resolver #98 mediante decisión explícita de arquitectura apoyada en protocolo/SDK primarios. Preparar delta mínimo del contrato, auditoría y ratificación aplicables; no hay presupuesto nuevo de SDD ni tercera/ cuarta revisión automáticamente autorizados. El permiso R3 sólo cubría B5/clientInfo. Después, si contrato vuelve a ser ejecutable, corregir defectos de implementación y entregar snapshot nuevo al mismo auditor comoR2/5 (contador conservado). Mantener originals y fallos, verificar gates afectados y preview nueva del SHAreal. QuintoFAIL implica STOP conforme encargo.

Antes de integrar/publicar: cierre final F4A documental/SHA anunciados por propietario, diff revisado contra base final y gates afectados; entrega aceptada/CI/preview/rollback completos, autorización aplicable a main. No solicitar promoción de una entrega bloqueada. Sin scans F4B/puntuación;73previsión histórica no prueba. F5/F6 separados. Política search=yes, ai-input=yes, ai-train=no intacta.

## Dictamen final independiente

[Informe R1/5 literal](../auditoria/implementacion-r1.md): **FAIL/STOP**,19203bytes, SHA-256`a4d2ad29efeb3a82c260003d5bd47fdea77523b11dc602b3b8866e9f569da7a1`. Cuatro bloqueantes I-B1cobertura/I-B2deadline/I-B3identidad/I-B4ping; C08parcial y CPU/heap de éxito no verificados. El auditor **NO** admite80/81+receipt como C12byteexacto. No se reinterpreta su fallo ni se concede excepción unilateral. [Índice de auditoría](indice-auditoria-r1.json).
