# F3C — Cierre y aceptación arquitectónica

Fecha: 2026-10-12. Coordinador arquitectónico: **`/root/f3_arquitectura`, GPT-6.1 Sol/high**, distinto del autor y del auditor. **Acepto técnicamente F3C sobre el snapshot de implementación identificado abajo**, a partir del [dictamen independiente PASS R1/5](../auditoria/f3c-r1.md), cero bloqueantes, y del [resultado archivado](resultado.md). C queda completada y la implementación A→B→C aceptada en su alcance de rama/preview. Se habilita la propuesta concreta de autorización de promoción; **F3 no se declara publicada y C3-12/P3-01–03 siguen pendientes**.

La SDD ratificada PASS R2/2 y las aceptaciones A/B son dependencias vigentes. No se reabren sus auditorías, se amplía el contrato ni se reescriben encabezados históricos. Este cierre registra la autoridad y el estado técnico actuales; no autoriza main, merge o deploy.

## Identidades, cadena y roles

| Concepto | Identidad |
|---|---|
| Issue / PR draft C | [#77](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/77) / [#78](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/78), destino `agent-ready/f3-b` |
| Código, tests y entrega auditados y construidos | `aad2a6624c24d7425c5ad5329b82c77a8a86b619` |
| Tree auditado | `add06deb2647988846525fcfbeb5bb6b754b7006` |
| Base C, cierre B aceptado | `ac4c5ada06325056c22f9baab60fcd6e72e5d4a5` |
| Tree base C | `018977233fdc3b076bf880bf99d4724f40f3270f` |
| Archivo de evidencia e informe C | `f48a82a37ac98627bb89e982e8c64228170a7080` |
| Tree documental con evidencia C | `b3b6da4693dd55683c2cdd1198d0ac69e4a0a1f9` |
| Snapshot normativo SDD ratificado | `6dbaf2c97d81dd6433dd7d1f75e0a8d8943bea92` |
| Tree normativo SDD ratificado | `ae19b2be649711aa5ebeb405eb8e3eebd09c1ef2` |
| Rama / worktree C | `agent-ready/f3-c` / `/workspace/f3-c` |
| Main/F2 observado, base de promoción | `d2bd342050811d41ee212730cb11fe07783994bd` |

Autor C: **`/root`**, por instrucción explícita nueva del usuario cuando C aún no había iniciado desarrollo, documentada en issue77 y [entrega](entrega.md). La asignación normativa Luna6/high fue sustituida por esa instrucción; no se atribuye el trabajo a Luna ni se extrapola la excepción anterior de B. Auditor independiente fijo: **`/root/f3c_auditor`, GPT-6.1 Sol/high**, distinto del autor/corrector y de esta coordinación. Contador C: **1/5 revisiones totales**, R1 PASS sin bloqueantes; no se reinicia por la aceptación o el archivo documental.

Informe R1 preservado, SHA256 **`c3c4bb7811880cc02dc9b634607bb9cd72282c1db82f750180a9e47c1178c257`**. Se leyeron dictamen, resultado, entrega, recibo, manifests y decisión del incidente; se comprobaron en lectura HEAD/tree, hash del informe y delta del archivo. Entre `aad2…` y `f48a…` se añadieron exactamente **13 documentos de evidencia**, sin cambios de producto, contrato o tests. Esta comprobación de procedencia no constituye otra auditoría de implementación.

Se mantienen [A aceptada PASS R2/5](../a/cierre-arquitectonico.md), sobre `e2b935ddf9d419942bba39c20cbba9f055bc31da`, cierre `ce6c491757a165b22973a7bf717fd0d6ed069ac8`, y [B aceptada PASS R1/5](../b/cierre-arquitectonico.md), sobre `e1c971fbfe8770c0da27ef38fbeed788470f53d6`, cierre `ac4c5ada06325056c22f9baab60fcd6e72e5d4a5`. F2 continúa aceptada/publicada conforme a su [cierre](../../f2/b/bug71-native-baseline-auditoria/produccion-cierre/resultado.md), con bugs70/71 cerrados,86 contenido/40 general/nivel4 general. No se repiten sus matrices o scans ni se infiere un score nuevo.

## Alcance y criterios aceptados

Dentro de [SDD](../../../fases/f3-api-y-descubrimiento.md), [contratos](../../../fases/f3-contratos.md) y [traspaso C](../../../fases/f3-traspaso.md), se acepta la integración de cinco valores Link preservando F1, siete reglas de assets F3 MIME/no-store/CORS y extensión llms generada después de destinos válidos. Prefijo F1 byteexacto, sección F3 literal/idempotente y checks de tamaño, destinos, headers y ausencia de anuncios futuros quedan acreditados. Política: **search=yes, ai-input=yes, ai-train=no**.

Ownership C aceptado según dictamen: once archivos sobre B; `_headers`, middleware y runtime F2 sólo en sus fronteras de discovery/Link; generador F3 y checker discovery sólo integración/check; fixtures y expectativas del checker en `discovery.test.mjs`; negociación sólo expectativas Link; tests C y entrega. Se preservan serializer F1, negativos, restantes aserciones y verificadores. No cambian runtime B/dispatch, proyección/corpus/contenido F2, fuentes/schema/registro A, CI, stack, bindings, robots, redirects o asistente. El aislamiento TMPDIR se limita a la suite C.

| Criterio | Aceptación |
|---|---|
| C3-04 | Schemas/checks conservados, OpenAPI3.1.1 con nueve operaciones, Linkset, skills0.2.0/artifact/digest y ambos ARD byteidénticos; assets con headers exactos. |
| C3-06 | Los28 IDs, GET/HEAD y metadata/Markdown completo/bytes/hash/links contra originales del mismo build. |
| C3-07 | Búsqueda/ranking de cushing y artrosis con oráculo independiente, sin match y pruebas heredadas de contenido posterior al carácter4000. |
| C3-08 | Inputs, errores/métodos, GET/HEAD/OPTIONS/405, CORS/no-store/seguridad/Link; API sin validadores y304 nativo del asset API Catalog comprobado. Defensas503/límites offline. |
| C3-09 | Dos recorridos completos catálogo/OpenAPI→búsqueda→lectura→cita y skills/digest→búsqueda→lectura; destinos200 sin redirect. |
| C3-10 | Manifest real HTML/CSS incluido, conservación F1/F2 acotada, headers home HTML/Markdown/HEAD, canónicas, redirect301 esperado y CI. |
| C3-11 | Bases/snapshot, ownership, evidencia/recibos, independencia y contador; aceptación completada por este cierre. |

C3-03, integración, conserva los ocho hashes F3/llms entre dos builds del autor y un tercero del auditor. C3-01/02/05 mantienen sus cierres predecesores. No se añade autenticación, comercio, herramientas calculables, MCP u otra capacidad fuera de contrato; no se promete nivel5.

## Evidencia, incidentes y límites

[Verificaciones](verificaciones.json):19 comandos exit0 del autor. [Workerd final](workerd-manifest.json) y [preview](preview-manifest.json): cada matriz PASS117 peticiones/28 documentos/dos recorridos, con350 archivos de build. La matriz pública se ejecutó una sola vez tras PASS local y recibo/CI vigentes. [Recibo](recibo-ci-preview.json): [CI38174797432](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38174797432) completed/success; [comentario Cloudflare6113704992](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/78#issuecomment-6113704992), actualizado2026-10-11T21:04:33Z, vincula el SHA completo a [Commit Preview exacta](https://dd2a6ab6-cuidatuperroviejo.g1721m.workers.dev). No se usa alias móvil ni producción anterior.

| Evidencia | SHA256 |
|---|---|
| Índice de420 originales privados | `1c86bc61df9aa70946361f3826cb01db418648964389a00bbb4705d7fe18858e` |
| Manifest privado workerd-final | `41c3b63c20f5eb02699471dba2c6b9b6af93021078f98b5cda87aa8bfae7a317` |
| Manifest privado preview | `b1f0cfa55a0e971f8097c2183e5e702fe8d91f98967c08c1be8398c12d564c41` |
| Recibo CI/preview versionado | `23d98c974a45272c1cec5e0967d610b13b387110cbd26503121f9089d46c7fd4` |
| Proyección pública workerd | `d233c39ebd3e09b9fd6b645b36dfee986da8ba2b251dcf79966d377dd7fe316b` |
| Proyección pública preview | `525b742555c20eb84800a389a56a44268f539162e10a6aa03e98fa6d935502ad` |

[Índice de originales](indice-originales.json) y manifests declaran las proyecciones y omisiones; cuerpos completos/headers exteriores permanecen en `/workspace/f3c-evidence`. Originales independientes del auditor: `/workspace/f3c-audit-r1-evidence`, con [índice separado](indice-originales-auditor.json). Según su dictamen, el auditor rehasheó420 entradas, cinco originales del incidente,350 archivos del build y117 cuerpos por modo; reprodujo pruebas/build/workerd y replay sin helpers de producto. No repitió HTTP público: su comprobación pública se basa en capturas originales y recibos corroborados. Esta coordinación no ejecutó código, build, HTTP o tests para aceptar C.

Se preservan dos fallos principales: CI38174586480 del snapshot `1c7c25c9b643544523f9c0c023f91f13fc8c586f`, por scratch compartido C/F1, y primer gate local de `aad2…`, FAIL/STOP503 por servidor propio huérfano y conflicto del inspector9300. [Corrección CI](ci-correccion.md) aísla sólo TMPDIR de tests C, sin relajar F1; la CI fallida no se reintentó ni aporta hashes al snapshot actual. [Decisión local](incidente-local-decision.md) e [índice](incidente-local-indice.json) conservan el503 y admiten ejecución nueva diferenciada después de detener procesos propios/verificar instancia/config/build/readiness, sin rebuild durante matriz. `workerd-final` no reemplaza ni reclasifica ese fallo. Los diagnósticos de permisos/IPC también conservan su procedencia. El dictamen no identifica hueco esencial pendiente.

Corpus: `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`. Skill3350 bytes/SHA256 `0e4b1055e79a7b14e49d44322ee0aaccdb3c9cf248042f9b0ab870577db1888d`; llms4022 bytes/SHA256 `fbe46b104654f4e0bdb089a6cd7f926dc9ea2d4abdb072dea513ba0ba1b641a5`. Hashes de entidades descomprimidas. JSON/descriptors/skill/Markdown exigen originales byteexactos; HTML exterior se verifica funcionalmente por canónica/estado/headers, sin afirmar igualdad global ni ampliar allowlist F2. Metadata conserva dominio canónico; el transporte usa path/query en preview. Enlaces científicos se preservan para cita sin fetch/evaluación científica; URI opaco de skills no se declara descargado/validado.

## Candidato concreto y cierre documental separado

**Ratifico técnicamente la propuesta de publicación del candidato exacto `aad2a6624c24d7425c5ad5329b82c77a8a86b619`, tree `add06deb2647988846525fcfbeb5bb6b754b7006`**, ya construido/auditado/verificado, mediante rama fija propuesta **`release/f3-aad2a662`** y PR draft contra main `d2bd342050811d41ee212730cb11fe07783994bd`. Root preparará esa propuesta; este documento no crea rama/PR ni autoriza promoción.

El diff completo main→candidato, leído durante coordinación, comprende271 archivos:23 producto/generadores/tests/CI, cinco índices documentales,195 evidencias históricas F2 de bugs70/71 y48 documentos F3. El delta main→cierre F2 `67dacfec405935567f71b403cd80a56f5aebe952` es sólo documental; la propuesta declara su publicación adicional. La documentación puede afectar CSS/HTML: su inclusión queda respaldada por el build real del candidato, no por inferencia de igualdad entre trees documentales.

El archivo `f48a…` y el futuro commit que añada **sólo este cierre** permanecen en `agent-ready/f3-c`. Root fijará SHA/tree completos del cierre al commitear/publicar y los vinculará con permalinks/hashes desde la admisión y PR de promoción. No existen durante esta escritura y no se inventan. **Los hashes de build/CI/HTTP pertenecen a `aad2…`, no a `f48a…` ni al futuro cierre.** No se incorporan silenciosamente documentos posteriores al candidato. Con el cierre publicado, root puede cerrar issue77 como aceptado y conservar PR78 draft histórico, sin atribuirle publicación de fase.

Recibos de admisión externos `/workspace/f3c-evidence/admission/main-branch.json` y `main-rules.json`: lecturas GitHub200,2026-10-12T01:53:53.971636Z/01:53:54.307261Z, main `d2bd…`, protected=false y reglas aplicables `[]`. Permiten técnicamente hoy un fast-forward que conserve `aad2…`; **no constituyen autorización**. Antes de la acción autorizada se releen base/reglas y se verifica ancestry; sin force ni incorporación concurrente. Si merge/squash/rebase o nueva evidencia dentro del candidato producen otro SHA, se congela ese SHA y se obtienen nuevo CI/build/manifest/recibo y gates afectados antes de actualizar la propuesta/autorización. No se reutilizan hashes por igualdad aparente de tree.

La siguiente acción técnica es publicar este cierre y concretar la solicitud de autorización para ese candidato/base/método. C3-12/P3-01–03 se ejecutan después de promoción autorizada, con recibo independiente del dominio/build reales, matrices finitas F3 y exactamente un scan content y uno all-ui con parámetros/comparación congelados. Fallo/transporte/redirect inesperado conserva originales y FAIL/STOP; sin retries para borrar fallos, fallback o resultados imaginarios. Se preserva `deploymentCommit=null` si lo devuelve el evaluador. No se repiten los1284 IDs históricos F2 ni se deduce puntuación por el PASS de preview.

## Rollback y STOP

Antes de main, descartar/revertir cambios propios de rama conservando evidencia. Rollback C acotado retira Link/extensión llms/headers propios y conserva A/B/F2. Después de publicación, preparar PR de reversión coherente **C→B→A**, retirar juntos endpoints/descriptors/skill/query-index/hook/discovery/CI específicos y restaurar discovery/runtime F2 de una base real conocida, preservando política, Content Signals, asistente e informes. Nuevo build verifica ausencia de rutas/references F3 huérfanas y lectura F2. Revisión y autorización de promoción del rollback son separadas; no se ejecuta automáticamente.

Contador C1/5 y auditor fijo permanecen. Si otra revisión es necesaria, máximo5 totales; quinta FAIL→bug/STOP sin sexta/correcciones posteriores/reset. Hueco esencial de contrato/base/dependencia/datos/entorno, evidencia indispensable ausente o cambio fuera de ownership→bug SDD/STOP del trabajo dependiente. No se identifica uno nuevo por la cadena aceptada. La aceptación técnica y ratificación de propuesta no sustituyen autorización específica de main ni gates de producción.

Fin de escrituras: únicamente `docs/agent-readiness/evidencia/f3/c/cierre-arquitectonico.md`. Sin commit/push, otros archivos, código/contratos/informes, pruebas/HTTP, nueva auditoría o acciones GitHub/main/deploy. Root fija el archivo de cierre y tramita la propuesta concreta autorizable.
