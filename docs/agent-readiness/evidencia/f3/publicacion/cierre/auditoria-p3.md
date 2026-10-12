# Auditoría independiente final de evidencia P3 — F3

**Dictamen: PASS de P3-01, P3-02, P3-03 y C3-12 sobre la evidencia entregada. Cero bloqueantes.** Fecha: 2026-10-12. Auditor original `/root/f3c_auditor`, **GPT-6.1 Sol, esfuerzo high**, independiente del autor/coordinador de ejecución, de arquitectura y del preparador del adaptador. Sin autoría ni corrección de producto/evidencia. Esta auditoría de publicación es distinta del código C y del registro STOP80: **C permanece PASS R1/5, contador1/5 intacto**. SDD/A/B mantienen sus aceptaciones; no se repiten sus auditorías.

Producto: **`aad2a6624c24d7425c5ad5329b82c77a8a86b619`**, tree **`add06deb2647988846525fcfbeb5bb6b754b7006`**. Checkout de publicación `/workspace/f3-publicacion`, detached y limpio al SHA/tree exactos antes y después de la revisión. Base desplegada anterior **`d2bd342050811d41ee212730cb11fe07783994bd`**. Paquete sellado `/workspace/f3-publicacion-desbloqueo`:139 originales, índice SHA256 **`e5a307b1180d4a91789ba7ff39a2b870d8bf8475c9602d475e6c46186976aae8`**. La revisión se hizo en lectura; sólo se escribieron informe/scripts/resultados propios bajo `/workspace/f3-publicacion-cierre-audit`.

## Identidad del despliegue y alcance de la admisión

La autorización de PR79/promoción/P3 y posterior autorización de pushes necesarios dentro de F3 se conservan. La promoción exacta sin force a main a02:26:22Z y PR79 merged fueron corroboradas en la auditoría STOP previa; no se incorpora el cierre documental posterior al producto. Nueva metadata archivada de main a12:43:45.761783Z confirma aad2 completo; CI38194214000 está completed/success para el mismo SHA.

Cuatro capturas Cloudflare aportadas por el usuario fueron inspeccionadas sólo por root. Esta sesión lee **su transcripción declarada**, no las imágenes. Según esa fuente: servicio cuidatuperroviejo/Producción, versión prefijo **ec329197** activa100%, fila main/Listo55s, título truncado compatible con el candidato, dominio cuidatuperroviejo.com y timestamp02:27:09.864Z posterior al fast-forward y al inicio del nuevo check. Arquitectura Sol/high admitió explícitamente esa correlación prospectiva en decision-admision.md. La normalización `production.conclusion=success` se atribuye al estado visual Cloudflare; **no es una conclusión GitHub falsificada**.

El SHA completo procede de git/GitHub/promoción; la atribución de plataforma es contextual entre esos datos y la transcripción. No se vio SHA completo ni UUID completo de versión en capturas; no hay originales de imágenes accesibles, bytes o hashes. ec329197 se conserva sólo como versionIdPrefix, fullVersionId=null. No se equipara a BuildID o SHA git. Las respuestas originales posteriores del dominio comparan byteexactamente los siete artefactos, corpus/F2 y representaciones esperadas del build autorizado, reforzando la correlación admitida. Esto es suficiente para el alcance operativo exigido por SDD §7; no se afirma una lectura independiente de imágenes/UUID ni digest del paquete interno Cloudflare.

Workers check114637987659 permanece **in_progress**, conclusion/completed_at null en workers-actual.json observado12:43:46.324721Z. La suite histórica103426668387 conserva agent-ready/f3-c. No se diagnostica la causa de la discrepancia con la UI ni se inventa success del callback. La nueva evidencia de plataforma/HTTP permite resolver prospectivamente la carencia operativa; **el STOP80 y su PASS de registro siguen válidos para sus observaciones históricas**. Sus23 originales se rehashearon intactos y no se reclasifican como PASS P3.

## Criterios y comprobaciones independientes

| Gate | Resultado y fundamento |
|---|---|
| P3-01 | **PASS.** Primera matriz del dominio contractual,117 peticiones,28 IDs completos y dos recorridos. Siete assets con bytes/SHA/MIME/CORS/no-store/Link correctos; OpenAPI3.1.1/nueve operaciones, skill real/digest, ARD byteidénticos/dos entries. Catálogo paginado recompone exactamente el índice. Todas las lecturas comparan metadata, UTF-8 reencodificado, bytes/hash y links con F2/query-index originales del mismo build. Search cushing/artrosis y vacío contrastados mediante ranking recalculado independientemente; selección/corpus/canónica/Markdown/cita completos. |
| P3-02 | **PASS.** Home HTML/Markdown/HEAD, API/errores/HEAD/OPTIONS/405/guard409, Link y cuatro headers de seguridad, CORS/no-store y representación fija comprobados. API sin ETag/Last-Modified; condicional nativo304 del API Catalog observado. Robots/llms/sitemap/catálogo asistente byteexactos y redirect301 representativo esperado. No se exige identidad global de HTML exterior ni se amplía allowlist F2. |
| P3-03 | **PASS.** Una POST content y una all-ui registradas,200/complete/exit0 y sin error de transporte/evaluador. CLI, selección, fórmula, universo de controles y denominadores F2 conservados. Raw→summary→score→comparación recalculados sin importar helper bajo prueba: contenido86→86; general40→60, nivel4. Sólo apiCatalog/agentSkills/ard cambian fail→pass; cero regresiones. |
| C3-12 | **PASS de evidencia de publicación.** Autorización/promoción exacta, nueva admisión de plataforma con límites declarados, build/capturas reales y P3-01–03 completos. Ratificación/cierre final de F3 y actualización de bug80 corresponden a coordinación después de este dictamen. |

Capturas HTTP con Date12:45:23–12:45:36GMT, posteriores al receipt registrado12:45:03.685648Z. Content está registrado12:45:59.004Z y scannedAt12:46:06.190Z; all-ui registrado12:46:45.189Z y scannedAt12:46:52.533Z. Esa secuencia respeta HTTP PASS antes de scans. Ejecucion.json registra una matriz y una POST por perfil; adaptador/CLI conservan persistencia de originales, directorios exclusivos y ausencia de retries. No hubo una ejecución fallida de producción que se sustituyera por otra: antes de esta admisión los gates tenían contadores0/0.

El auditor ejecutó exclusivamente los siguientes análisis offline propios, exit0, además de lecturas locales de contratos, metadata, diffs y git:

```text
python3 /workspace/f3-publicacion-cierre-audit/replay.py
python3 /workspace/f3-publicacion-cierre-audit/verify-evidence.py
git -C /workspace/f3-publicacion rev-parse HEAD HEAD^{tree}
git -C /workspace/f3-publicacion status --porcelain
```

Replay.py usa literales de contrato, cuerpos originales y entidades del build; valida117 capturas, metadata/Markdown/hash/links de todos28 IDs, siete assets, catálogo completo, ranking y headers. Se comprobaron adicionalmente cuerpos de errores con schemaVersion, shape cerrado y mensajes literales. Verify-evidence.py rehashea139 originales nuevos,23 anteriores y350 archivos del build; verifica receipt/metadata, freezing, scans/comparaciones y proyección pública. Resultados en capture-replay.json, verification.json y source-digests.json. **No se ejecutaron nuevos HTTP, scans, builds, pruebas de producto, correcciones, commits/push o cambios a main.**

Los350 archivos capturados como buildFiles coinciden por path/bytes/SHA con el manifest fresco f6f35c895ee1a8d8b4c9bf8a51920f62aaa29ac987b95fde60b3450b3be4d931 y con dist actual. La diferencia de orden de listas no cambia sus entradas. El adaptador externo conserva SHA256 ca9445e54aa9216698b5fa33632547fbc4f69dec73bbc8c9f4aefd9e52106464; toda la cola desde save/request/assertions/recorridos/gate es byteidéntica a fuente C. Index.mjs/shared.mjs son byteidénticos a F2 desplegada. No se importó el checker como oráculo completo ni se reutilizaron hashes de otra revisión para este manifest.

## Comparabilidad y resultados del evaluador

| Perfil | Antes→después | Conteos actuales | Nivel observado |
|---|---|---|---|
| content | 86→86 | 6 pass / 1 fail / 15 neutrales; denominador 7 | 5 del perfil parcial |
| all-ui | 40→60 | 9 pass / 6 fail / 7 neutrales; denominador 15 | **4 general** |

Requests son byteidénticos a los respectivos requests F2 archivados: SHA256 content `94daf42c1ee9ecfce1528d303e4b19d35e7544d8d38b6ac72ff56436708d2c21`; all-ui `d7533cffd3ab7c60b2e1ef9ac0a5c96cf6a0631192a16d2f5ba76194ab8fff8a`. Target/perfil/enabledChecks/universo/fórmula/comercio/IDs puntuables/denominadores son iguales; ambas comparaciones son comparable=true, reasons[]. Fórmula redondeada pass/scoredTotal reproduce86 y60. deploymentCommit=null se preserva en ambos summaries: la identidad se acredita mediante la cadena separada, no una anotación ficticia del evaluador. El nivel5 del perfil content **no significa nivel5 general**. Los siguientes niveles/recomendaciones del raw no añaden tareas o capacidades futuras a F3.

## Integridad y privacidad

| Original sellado | SHA256 |
|---|---|
| decision-admision.md | `0e5a83724014d8508f3b6c6b78bb1aab78587cd5cde02a8d1349badf31b0e079` |
| receipt-produccion.json | `717583d189ace56eeb0c812d5af93c550abb3af1035af7930f49ac19289ce1af` |
| capturas-transcripcion.json | `1bf9d2f85de3bfe5e524139d602fe8cdb225aa1368293bd19beeaac3b7c15177` |
| produccion/manifest-private.json | `a35b4f1322543f7f6b524a2f0e6995db8319dc7717a01a4cc616c4e25884b25c` |
| Content response.raw.json | `2100ba0fa9ae746fc4f10e6c4c714d79c41e49c6a63ceee8be599b4b8cf72372` |
| All-ui response.raw.json | `75973266dc330db036cdfc065eaf833f3a28213f61f79e78e3dfe2cdf4dab67b` |
| comparacion-content.json | `bd0abf190f555a43c64340c6eb38f338ac26d63e6a8b8f176d5eac4aa467b55d` |
| comparacion-all-ui.json | `c0f4f4f2e3f548c75b6ce677aa9ea3005d509407c28901d159df2e95259bfff5` |

Corpus `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a` y las entidades F2 se conservaron completos; no se clasificaron automáticamente enlaces externos como evidencia científica ni se consultaron fuentes remotas. La política sigue **search=yes, ai-input=yes, ai-train=no**.

La proyección pública preparada bajo evidencia/f3/publicacion/cierre se contrastó en lectura: request/metadata/summary/manifests/receipt/admisión/transcripción/ejecución/comparaciones/índice son copias literales donde corresponde. Produccion-manifest.json conserva datos/digests y filtra únicamente headers fuera de su allowlist técnica, con nombres omitidos y SHA del original explícitos. Sin cuerpos HTTP/raw del evaluador, URLs dashboard o telemetría pública. La proyección declara sus omisiones y no se presenta como copia íntegra del original privado.

## Límites y efecto

PASS sobre originales y ventana temporal entregados; no certifica estado futuro, identidad global de chunks/HTML exterior o causa del callback GitHub pendiente. La lectura visual transcrita de root es una dependencia declarada de la atribución; el auditor no tuvo imágenes originales ni hashes y no simula observación directa. Las capturas y scans proporcionan comprobación funcional real contra el build autorizado; no sustituyen ese límite por UUID/SHA visibles ficticios.

Los números de ejecuciones se contrastan con scripts congelados, archivos originales/directorios exclusivos y registro de ejecución; no son una investigación forense de toda actividad externa posible. Los anteriores fallos CI/TMPDIR, workerd503 y STOP80 permanecen históricos, sin ocultamiento ni reasignación de sus resultados. No hay regresiones o incumplimientos de contrato evidenciados en estos gates.

**PASS final de evidencia P3/C3-12 permite la ratificación y cierre de publicación por coordinación**, con archivo documental separado del producto y actualización justificada de bug80. No ejecuta esas mutaciones ni inicia F4/F5/F6, auth/comercio/MCP o nuevas promociones. El código C sigue PASS R1/5; ningún contador de implementación se reinicia.
