# Resultado verificado F3B

Fecha: 2026-10-11. Issue [#75](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/75), PR draft [#76](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/76), destino `agent-ready/f3-a`.

**Implementación verificada y auditoría independiente PASS R1/5, cero bloqueantes.** La aceptación arquitectónica se registra por separado. Autor `/root`, por petición explícita del usuario tras el límite de uso de Luna; auditor fijo `/root/f3b_auditor`, GPT-6.1 Sol/high, independiente del autor/corrector. No se atribuye la implementación a Luna. El contador B queda en 1/5.

| Identidad | Valor |
|---|---|
| Base A aceptada | `ce6c491757a165b22973a7bf717fd0d6ed069ac8` |
| Tree base | `51521631e0e0dc235d46a128b8c7af36bc2fd8c3` |
| Código, tests y documentación de entrega auditados | `e1c971fbfe8770c0da27ef38fbeed788470f53d6` |
| Tree auditado | `22a55b9b3955e3f1b63e18ebb794d48ceea7e6cb` |
| Corpus real | `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a` |
| Documentos | 28 |
| main remoto observado al cerrar verificación | `d2bd342050811d41ee212730cb11fe07783994bd` |

Este archivo y los recibos se archivan **después** del build auditado: el commit documental posterior no hereda por inferencia sus hashes de build. El cierre para C se fijará explícitamente sobre el commit que contenga la aceptación. No se anuncia promoción a producción ni aceptación pública global F3.

## Verificaciones del autor

[Verificaciones](verificaciones.json) conserva los 19 comandos con exit0 y duraciones: sync, check (0 errores/0 warnings; 51 hints), specs, pruebas proyecto (54), offline (55), negociación (41), runtime B (12 en salida detallada), build, inventory, discovery, projection, artifacts A, routing, crecimiento, semántica, tipos Worker sin diff y dry-run. El runner `--test` de este entorno resumió B como un archivo; la ejecución detallada y npm test acreditan sus 12 casos individuales.

[Manifest workerd](workerd-manifest.json): **97 peticiones PASS**, catálogo y filtros, ranking/AND, lectura GET/HEAD de los **28 IDs**, metadata F2 exacta y Markdown original completo con bytes/hash/links concordantes. Pruebas de errores/precedencia, OPTIONS/405, corpus, condicionales y representación única. Incluye hashes de los350 archivos del build auditado. Workerd usa `dist/server/wrangler.json` compilado, `--local` y bindings locales; AI no disponible, sin invocarla. No se usa Astro dev ni preview remoto como sustituto.

Los límites, corrupción, streaming, recuperación y cache se ejercitan mediante fixtures de las12 pruebas runtime; no se afirma haber inyectado todas esas corrupciones dentro de workerd. Fixtures declaradas y schemas aprobados, sin llamar al runtime para generar expectativas. El script reproducible [verificar-workerd.mjs](verificar-workerd.mjs) utiliza bytes F2 originales y el artifact A aceptado.

## Auditoría independiente

[Informe R1](../auditoria/f3b-r1.md) archivado byteidéntico, SHA256 `a9335806949847043769952d3b9299ab8c966e21eb4979e29309e1e93c6833b7`. El auditor reprodujo build y workerd en checkout propio: 12/12 pruebas,97 peticiones del verificador y103 sondas propias,28 documentos íntegros; verificó además los350 archivos y97 cuerpos originales del autor. Sin bloqueantes. La matriz del informe emplea los identificadores normativos de SDD: C3-05 operaciones/consulta, C3-06 lectura, C3-07 búsqueda, C3-08 errores/HTTP, C3-10 y C3-11 en su alcance B.

No se infiere igualdad global entre builds en paths distintos. El auditor documentó322/323 assets client iguales; contacto.html contiene un `startedAt` generado por Date.now heredado y sin delta B. Config/chunks server pueden variar con la ubicación del checkout. Ambos manifests conservan su procedencia; esto no reabre F2.

## CI, preview y límites de publicación

[Recibo curado](recibo-ci-preview.json): [CI38147246125](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38147246125) **completed/success**, SHA e1c971f completo. [Comentario Cloudflare](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/76#issuecomment-6110047163), updated2026-10-11T14:28:50Z, confirma publicación de la **Commit Preview** `https://2ac6e105-cuidatuperroviejo.g1721m.workers.dev` y enlaza el mismo SHA completo. Se conserva este recibo histórico aunque el bot actualice después su comentario al publicar commits documentales.

Sólo se consultó el recibo; no se realizaron requests funcionales públicos. El gate público y descubrimiento compartido corresponden a C. Main permanece en F2; PASS B no autoriza merge/promoción de otra versión. Política conservada: `search=yes, ai-input=yes, ai-train=no`.

## Originales y hashes

[Índice de originales](indice-originales.json) conserva rutas relativas, bytes y SHA256 de logs, cuerpos y manifest del autor. Raíz externa `/workspace/f3b-evidence`; el recibo remoto, creado posteriormente, tiene digest separado abajo. Cuerpos/logs voluminosos permanecen fuera de Git; el manifest, índice y recibos curados quedan versionados. Se omite el log activo del servidor del índice inicial; no contiene comprobaciones adicionales indispensables. Recibo curado omite dashboard IDs y metadata ajena a la prueba.

| Original | SHA256 |
|---|---|
| `checks.json` → verificaciones.json | `c3b39382bdc9570ef973c7bc7b3a3b349e8565a2ed412487d380453ee9708e1b` |
| `workerd/manifest.json` | `6ebfcd70fbb79b166d59f629bc1304250c00e80ea2819e6ce9e18ecbc170a428` |
| `evidence-index.json` → indice-originales.json | `be40e304e6a08009d5455f9934fe8dab2d479c01ad4b8f3e9de84362fad6507b` |
| `remote-receipt.json` → recibo-ci-preview.json | `22c02d7d9d6ef4c9b654c624202e733381f0483e1cf5fcfda347deea1820cc19` |

Originales independientes en `/workspace/f3b-audit-r1-evidence`, inventariados con digests y límites en el informe propio. Rollback y STOP siguen el contrato de entrega/SDD. No hubo cambios de contrato, correcciones tras auditoría, bugs bloqueantes o segunda revisión.
