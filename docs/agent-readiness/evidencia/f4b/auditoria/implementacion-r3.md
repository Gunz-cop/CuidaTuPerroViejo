# Auditoría independiente de implementación F4B — issue90 — R3/5

**Dictamen: PASS de la entrega fija R3/5, conforme a la SDD y las adendas/decisiones vigentes. No se detecta un bloqueante pendiente dentro de ese alcance.** El dictamen conserva las limitaciones expresamente aceptadas: C09 remoto no determinable no obtiene PASS; la prueba externa del deadline permanece pendiente, no bloqueante, no deuda y sin PASS. No acredita integración, publicación ni producción.

Fecha del informe: 2026-10-14, UTC. Revisión exclusivamente de bloqueantes por el mismo auditor independiente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor y corrector. La interrupción técnica por cuota y esta continuación pertenecen a la misma R3/5; no consumen una nueva revisión.

## Identidades y contador

| Elemento | Identidad revisada |
|---|---|
| Candidato | `b2ab1082c02799dab4306a7c167a6114c0163a90` |
| Tree | `59dd444439b4f78018eba4a010b25840c4bdd87b` |
| Producto funcional corregido en R2 | `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821` |
| Base ratificada de desarrollo | `8669d9d6dd4b03685500d67a9332786ad474ff6b` |
| Base técnica F4A final | `cb8e10f1ead55ef0dafc666672cd3003252afc59` |
| Cierre documental F4A recibido y aceptado | `a42a18522b7cf4143aff56d11d4632dc3c1050da` |
| Worktree del auditor | `/workspace/ctpv-f4b-auditoria`, DETACHED sobre el candidato, limpio |
| Workers Build final | `0294af69-8878-451c-846b-04c6ddd3bc3c` |
| VersionID final | `5a43d748-8268-4770-868d-e8d7109cfa5b` |
| CommitPreview final | `https://5a43d748-cuidatuperroviejo.g1721m.workers.dev` |
| Revert preparado | `14e3bed40fcfab672ff4d81ba524f16ffc64e522`, tree `3c9f1eca54a579ee6b63333cc1cfb74306e02895` |

Historial inalterado: SDD R1 FAIL → R2 FAIL/STOP → excepción expresa para una R3 adicional → R3 PASS y ratificación. Adenda1 A1-R1/2 PASS y ratificación; adenda2 y adenda3 admitidas por el mismo auditor. Implementación issue90: **R1/5 FAIL → R2/5 FAIL → esta R3/5 PASS**. El presupuesto máximo sigue siendo cinco revisiones del mismo auditor; no se reinicia por continuidad técnica, cambios de harness ni adendas. Los FAIL históricos y sus reproducciones conservan íntegramente su validez para sus snapshots y normas entonces aplicables.

## Norma aplicable y método

Se aplican AGENTS.md, ownership/admisión discovery de issue91, SDD `docs/agent-readiness/fases/f4b-mcp-remoto.md`, contratos F3/F4A y seguimiento D33, adenda1 ratificada, adenda2 admitida con su precisión del propietario, decisiones sobre384f520 y adenda3 admitida. La SDD histórica sigue intacta, SHA-256 `8ccf7da5d77ef89e0e8ff82183e589e56ee9552485c3f6e2ebe01b72b4d9ed63`.

La adenda1 cambia únicamente la lista de métodos modernos y el comparador C12 de contacto: moderno no incluye ping, legacy lo conserva; C12 exige80 archivos byteexactos y un contacto con equivalencia restringida, inventario81 intacto, sourceguard y receipt de la imagen concreta. Su informe A1-R1/2 PASS tiene11848 bytes y SHA-256 `db9684f3fc49c4b1fbf86c6244827d1280ffdf06e6ac151526fb879e7b335065`; ratificación `b204442`. Las primarias fijadas distinguen retirada de ping en Major5 moderno y contrato legacy vigente, sin cambiar SDK2.3.1.

La adenda2 y las decisiones expresas cierran el gate local fallido como **limitación documentada**, conservando sus FAIL; exigen controles pertinentes en Workers CommitPreview real y una decisión expresa sobre los límites por isolate no determinables. Esa decisión existe. La adenda3 difiere exclusivamente la prueba externa del deadline como requisito previo: el propietario dijo «Que la hago después. La prueba no la considero bloqueante. Continúa sin eso.» No modifica el deadline funcional10s, salida/cancelación, cap, protección del trabajo residual ni criterios de una ejecución futura. El informe de admisión A3 tiene7310 bytes, SHA-256 `be6956eeaf598f63ad674f8a3101584040a54256ab6aa395f050d22363786495`.

No se ejecutaron HTTP nuevos, builds, instalaciones, matrices, herramientas de producto ni mutaciones externas durante esta R3 por el auditor. Se revisaron fuentes y originales existentes en lectura, integridad, identidades, diferencias de fuente y cuerpos capturados. No se modificó el worktree del autor, main, PR, issues o producción. No se delegó a otro auditor/agente ni se corrigió código o documentación del autor.

## Procedencia e integridad

Entrega externa `/workspace/f4b-r3-entrega/entrega.md`, SHA-256 comprobado `df2fe8f847c1012747bd5df91742045dadc90df362b0f282ac57ae3063d73619`.

Se cotejaron los **27 documentos** de `contratos-evidencia-indice.json` con el snapshot auditado: bytes y SHA-256 coinciden, sin diferencias. Se comprobaron los **181 originales finales** de `indice-originales.json` bajo `/workspace/f4b-originales-privados/r3-final`, y nuevamente los índices previos de **385 originales R2,9 de preview-adenda2 y182 de preview-reanudacion**: todos accesibles y coincidentes con sus bytes/digests. Los índices usan las raíces declaradas; no se atribuye su contenido a otro build. El estado local efímero de bindings excluido del índice final no es una captura HTTP ni una prueba de resultado.

| Artefacto de la entrega externa | Bytes | SHA-256 |
|---|---:|---|
| `contratos-evidencia-indice.json` |5692| `33bf05fee0d103e7508247fdf1ca6c8b30d72ec6588f67b960997387f7d0c18f` |
| `indice-originales.json` |40063| `ef24e043e61c7b10396e82240d46419a3b9ce270445499c37fa43fb6ad96c979` |
| `receipt.json` |546| `7739b220cd15be1fd913d1e80b81c7aece08516bb409b55f503815a242a02001` |
| `sdk-result.json` |1546| `4d88a9b2abc1f8d7c2e94412456aefb4a4432b2a5210e7208ee355bb0c960e8b` |
| `identity-final.json` |239775| `76d3218e54df2820c0d43f40d388b123d8bc125018d708c550d02f4caf8dd889` |
| `rollback-local.json` |111386| `fae4128baef267385dc93aff8d5a45d8a213b47417c26291eaa6e70ed4f7bed1` |
| `budget.json` |257| `baa9a66ee234ec2849ab33d6b21872aef328bbd4baf7e06a8ec057d6d6947a50` |

El producto funcional no tiene diferencias entre192dcdd yb2ab108 en `src`, `public`, package/lock, configuración Astro/Wrangler/TypeScript y generadores de API/discovery comprobados. Los nuevos documentos/harness mantienen su alcance separado. Esta igualdad permite reutilizar evidencia funcional pertinente del producto192 con identidad y alcance declarados; **no transfiere receipts HTTP** de imágenes anteriores a la imagen final.

## Cierre de los cuatro bloqueantes R1 y del STOP R2

| Hallazgo histórico | Estado en la entrega R3 |
|---|---|
| I-B1/C05: catálogo20 presentado como28 | **Corregido, PASS reconocido en R2 y vigente.** Paginación20+8, cardinalidad contra índice/total, IDs únicos y metadata exactos;28 lecturas completas con hash/bytes y paridad real. El original R1 conserva20 y su FAIL. |
| I-B2/C09: output encolado consumible después de10s, slots retenidos | **Corregido, PASS del caso.** `boundedResponse` aborta proactivamente salida y reader; la prueba de lectura después de10,3s rechaza salida y recupera cap2. El lease sigue reteniendo trabajos F3 residuales hasta settle. El código es el revisado en R2, sin cambio posterior. No convierte la prueba externa ausente enPASS. |
| I-B3/C12:80/81 byteexactos insuficientes bajo norma original | **Resuelto conforme adenda1 ratificada.** Comparador restringido y81 pares preservados; nueva C12 de la imagen final comprobada abajo. El comparador original fallido no se edita ni se llama81byteexactos. |
| I-B4/C03/C07:ping moderno de SDD incompatible con SDK | **Resuelto conforme adenda1.** Allowlist moderna sinping,404/-32601; legacy200/result vacío. SDK2.3.1 y legacy intactos. |
| R2-B1/C08:workerd local500 frente a413 y fallo posterior400 | **Limitación local aceptada por adenda2, sin PASS local.** El FAIL R2 y los posteriores ensayos fallidos permanecen. El gate vigente requiere controles reales de CommitPreview, que se acreditan; no se afirma causa probada ni que cambiar harness solucionó Miniflare. |

C08 real: previewe21374c/40fed98d conserva32768bytes streaming→200,32769→413, petición inmediata legacy válida→200 y batch siguiente→400; profundidad16→200/17→400, metadata8192→200/8193→400. Se mantienen los originales y casos unitarios inclusivos/+1 de wire8MiB, list/card256KiB, framing y cancelPromise rechazado del producto192. Los cuerpos, statuses y recuperación HTTP real añaden la comprobación que el entorno local no completaba. Esta conclusión usa la sustitución explícita del gate, no una excepción implícita ni una afirmación de PASS de la matriz local.

## SDK y runtime reales, paridad y alcances

La entrega final usa `Client` y `StreamableHTTPClientTransport` reales SDK2.3.1 con Node24.19.0, Undici7.29 y Node fetch. El helper de captura guarda headers/status/Cf-Ray/cuerpos/digests, restringe origen/rutas y presupuesto, fuerza redirect manual y rechaza redirecciones. El transporte tiene maxRetries0; las capturas no requieren releer un clon del upload antes de enviarlo. No existe sustitución por mocks o adaptador node:http en la prueba final remota.

Las diez peticiones finales registran: legacyinitialize200, notifications/initialized202, GET automáticoSDK405 y tools/list200; moderno server/discover200, tools/list200 y cuatro tools/call200. Los listados contienen exactamente `search_guides`, `read_guide`, `evaluate_quality_of_life`, `recommend_mobility_aids` en el orden contractual. La negociación, validación/metadata y reutilización de schemas/funciones F3/F4A siguen siendo las revisadas; no hay búsqueda editorial duplicada.

La lectura moderna conserva Markdown íntegro, bytes y SHA-256 `621ece8b53f598a4bb6ae04ab9ed7899f4426a43b9620926f5c5fe651ec40dd3`; QoL devuelve35/compromised, y las cuatro salidas coinciden con los originales reales API192, cuyos datos y código permanecen idénticos. Las cuatro capacidades y28 lecturas de ambas eras completas corresponden a evidencia histórica del producto funcional192, especialmente preview142 intercambiosPASS; no se presenta esa matriz como repetida en5a43d748. La imagen final vuelve a comprobar legacyinitialize/list y las cuatro llamadas modernas, con C12 propia.

Observación de captura, **no bloqueante**: la petición4 tools/list legacy registra HTTP200, un mensaje SSE JSON-RPC completo con id1, cuatro herramientas y terminador de evento, pero `responseComplete:false`, `terminal:error` y AbortError. El stack original procede de `Client.close()` en `core.mjs:26`, después de que `listTools()` resolvió y se validó el listado. Es cierre intencional del cliente antes del EOF capturado, no una respuesta de error del producto. Se preserva tal cual; no se declara que los diez cuerpos terminaron por EOF: nueve sí, uno conserva ese aborto de cierre. Los digests/cuerpos observados son válidos y la respuesta funcional requerida está íntegra.

La evidencia de perfiles exitosos192 corresponde a cuatro herramientas reales `isError=false`: heap máximo observado entre llamadas18415160bytes y CPU activa agregada muestreada168899µs, incluyendo framework/handshake/inspector. No demuestra CPU facturable por petición, picoRSS del isolate, costo, protección distribuida ni viabilidadFree. Perfil fallido y500/503 locales históricos no se reutilizan como éxitos.

## C09: límites aceptados y prueba ausente

Cap2/3 remoto: dos uploads abiertos y tercero200, cancelación de ambos sources observada y recuperación200. Cuotas:121POST, incluidos91calls, desde misma IP/coloORD sin429; recuperación posterior200 tras ventana nueva. Las esperas20+20+20+1,2s sin solicitudes respetan la ventana60s; no se confunde20s conTTL. Cf-Ray/colo preservados **no prueban identidad de isolate**.

El propietario acepta expresamente **no determinable con limitación**, noPASS, para90/91calls,120/121POST ycap2/3. El límite en memoria por isolate no acredita protección efectiva de Cloudflare ante ese tráfico. WAF issue103 queda fuera de implementación F4B. La aceptación global de esta entrega usa esa decisión; no presenta la plataforma como si devolviera429 en las fronteras.

El request deadline previo obtuvo503 a15033,70219ms, cuerpo Envoy85bytes y sinCf-Ray; el propietario lo clasificó como corte del proxy de ejecución y prohibió reintento allí. La captura se conserva: no constituye un PASS de deadline ni una causalidad probada sobre Cloudflare/producto. Por A3, el verificador externo sigue **pendiente/no bloqueante/no deuda/NO PASS**. El contrato10s y el criterio futuro500JSON-RPC sanitizado exacto entre10–12s más recuperación inmediata no cambian. Si se ejecuta después, rigen su tarball fijado, una sola ejecución≤6requests y STOP si falla, sin variantes. Esta revisión no consume esas peticiones.

Presupuesto acumulado: **314/320** =223 anteriores +81 C12 final +10 SDK final. Los6 restantes se reservan al posible verificador futuro; no se gastaron por el auditor ni se declaran deuda.

## C12: imagen final y CI

Los checks originales finales están completed/success para **b2ab108 exacto**: Workers Builds apunta al build0294af69 y «Criterios de aceptación» al run `38524058978`, job `115720143119`. Receipt, bot y CommitPreview fijan la versión5a43d748; no se usa un alias mutable ni un receipt F4A como prueba de F4B. Los logs/results originales de CI anteriores conservan su propio SHA; no se inventa una nueva ejecución por el auditor.

Se comprobaron los81 pares de cuerpos finales, statuses200, tamaños/digests y el resultado constructivo: **80 byteexactos + contacto con equivalencia restringida PASS**. Contacto no es byteexacto. Ambos cuerpos tienen35686bytes, una sola ocurrencia literal de P, valorV decimal positivo de13 dígitosASCII y S contractual. V ocupa bytes18256..18269: local1791960310092 y remoto1791960356295. Prefijo antes deV y sufijo después deV son idénticos byte a byte. No hay normalización HTML general ni sustituciones fuera deV.

Hashes de contacto: local `bd04e98c3429d6fbac39d09ad5d25ffcc5c7b40f0621ca9bd6fdaec639e4582b`; remoto `c8856a45b56ef922ac4118e84b22fc1bf9f57ab608df44d2f6b73d705eadd445`. Sourceguard de `src/pages/contacto.astro` permanece `d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`. Inventario81, cuerpos, headers, digests y receipt se conservan. Esta C12 pertenece a b2ab108/5a43d748, no se hereda de927916b4 ni de81e32ad7.

## Criterios C01–C13

| Criterio | Dictamen para R3 y límite de evidencia |
|---|---|
| C01 admisión/ownership/F4A | **PASS**. Bases/cierre documental recibidos, separación de roles, discovery compartida y adendas válidas; no promoción realizada. |
| C02 SDK/bundle/startup | **PASS del alcance vigente**. SDK2.3.1, CI/Workers real y cliente final; limitación de composición local admitida, no PASS local global. |
| C03 negociación/eras/métodos | **PASS**. Ambas eras reales, métodos modernos/legacy conforme adenda, muestra final propia y cobertura completa histórica del mismo producto. |
| C04 schemas/nombres/metadata | **PASS**. Listado exacto, validación de input/output, metadata y schemas F4A preservados; sin delta material posterior aR2. |
| C05 corpus/search/read/hash | **PASS**. Corrección20+8/28 exacta, paridad/hash/bytes reales conservados; lectura final propia adicional. |
| C06 cálculos/4canales | **PASS del alcance funcional**. FronterasD33, seis combinaciones movilidad y paridad previas pertinentes; cuatro outputs modernos finales y código de dominio intacto. |
| C07 errors/methods/headers | **PASS**. Capturas pertinentes de errores/headers/Origin/CORS/negociación yping conformes;503 del proxy no se convierte en respuesta contractual correcta. |
| C08 caps/composición | **PASS conforme gate vigente de adenda2**. Fronteras unitarias y controls streaming reales con continuidad en CommitPreview. Local histórico sigueFAIL/limitación, no omitido. |
| C09 rate/concurrency/deadline/cancel | **Estado mixto aceptado, no PASS global del criterio**. Corrección output/cancel/recuperación/residual positiva; cuotas/cap remotos noDet aceptados; externo deadline pendiente no bloqueante por A3. |
| C10 card/discovery | **PASS**. Card experimental fijada, generación ARD/Link/llms/schema/referencias y checks; artefactos finales incluidos en identidad. No se promete URI remoto experimental inexistente. |
| C11 regresiónF1–F4A | **PASS de evidencia pertinente reutilizable**. Dominio/UI/JS/DOM y fuenteF4A intactos, staticdiff/focales preservados; UI36/WebMCP91 anteriores mantienenSHA propio. No matrices amplias finales simuladas. |
| C12 CI/receipt/identidad | **PASS final**. CI y buildSHAexactos,81 pares,80 byteexactos+contactoequivalencia restringida. No81byteexactos. |
| C13 auditor/entrega/rollback | **PASS de la entrega previa a promoción**. Esta R3PASS, contador intacto, original completo y revert concreto con nuevo ensayo local. Receipt/smoke de producción pendientes de una promoción autorizada. |

Los estados aceptados por decisión normativa explícita no son aprobaciones retrospectivas de casos fallidos. El PASS global corresponde a los requisitos vigentes de entrega; no es una suma de PASS parciales que compense un bloqueante esencial aún exigible.

## Rollback y gates posteriores

El revert14e3bed se revisó contra la base técnica F4A: no hay diferencias en `src`, `public`, `scripts`, `tests`, package/lock, configuración Astro/Wrangler/TypeScript y tipos Worker comprobados. Retira los26 deltas de producto/harness/tests F4B y preserva documentación/historial. El patch parte del candidato auditado; no revierte archivos compartidos íntegros aF3.

Nuevo ensayo local C13: build del revert14e3bed, Wrangler4.128.0 `--local`, estado propio y puerto8935. OchoGET acreditan MCP/card404, ARD/llms200 sinMCP, catálogo28, búsquedaF3, QoL35/compromised y movilidad operativos. Logs originales muestran startup y esas ocho respuestas; puerto liberado al cierre. No se atribuye el ensayo antiguo a este tree. La igualdad de fuenteF4A sustenta la preservación de las rutas restantes; este ensayo no se presenta como una nueva matriz remota completa ni como rollback de producción.

P01 todavía exige revisión del diff/base y autorización de promoción aplicable, conservar gates afectados/CI e identidad del **SHA realmente integrado**, y cotejar el revert frente a eseSHA antes de promover. La autorización condicional del propietario se aplica cuando se cumplan sus condiciones; no se pide de nuevo por este informe ni se ejecuta main por el auditor. Si cambia fuente o identidad de entrega, no transferir automáticamente este receipt.

P02, después de una promoción autorizada, necesita receipt del nuevo build/SHA de producción y smoke real del dominio conforme el encargo vigente, máximo20 peticiones, con herramientas/paridad/lectura/errores/card/descriptors/headers/Origin pertinentes. Si falla el smoke, rollback concreto inmediato conforme autorización, con receipt y comprobación de retirada/preservación. **Nada de ello consta ejecutado aquí**; preview no es producción. La prueba externa del deadline diferida no vuelve a imponerse como precondición por este informe.

Scans/puntuaciones no forman parte de esta entrega ni del encargo vigente; P03 no se declara realizado, F5/F6 quedan separados. No hay puntuación inventada ni conclusión de protecciónWAF/viabilidadFree.

## Disposición final

**Issue90, implementación F4B: R3/5 PASS para b2ab108/tree59dd444 y el paquete fijo revisado, con los estados explícitos anteriores.** No hay corrección exigida por un bloqueante en esta R3. Puede archivarse literalmente el informe y avanzar a los gates de integración/promoción aplicables, manteniendo el mismo contador e identidades concretas. No constituye receipt de producción ni ejecución de integración/publicación.

Informe íntegro externo: `/workspace/f4b-auditoria-implementacion-r3.md`. Sus bytes y SHA-256 se comunicarán fuera del contenido para evitar un hash autorreferente.
