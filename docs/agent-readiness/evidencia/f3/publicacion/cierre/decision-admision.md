# F3 — Admisión de nueva evidencia de plataforma para P3

Fecha: 2026-10-12. Coordinador `/root/f3_arquitectura`, **GPT-6.1 Sol/high**. **Admito la nueva evidencia de Cloudflare, junto con la cadena GitHub/promoción/build, para iniciar por primera vez P3-01/02 sobre producción.** No es PASS de esos gates, cierre de bug80 ni aceptación final de producción/F3. La autorización del usuario para promoción/verificaciones y pushes necesarios dentro de F3 permanece vigente; no requiere permiso redundante.

SDD F3 §7 exige vincular SHA/build/dominio mediante recibo independiente; no impone GitHub como única fuente, UUID completo de versión o SHA completo visible en una captura Cloudflare. Se releen §7–8, aceptación STOP y decisión pública; no se modifican norma, criterios o assertions. La falta anterior de evidencia se resolvía obteniendo fuente auténtica de plataforma: estas capturas aportan esa fuente distinta del callback GitHub pendiente.

## Identidades y fuentes

| Dato | Autoridad y alcance |
|---|---|
| Candidato/main | `aad2a6624c24d7425c5ad5329b82c77a8a86b619`, tree `add06deb2647988846525fcfbeb5bb6b754b7006`; promoción exacta sin force/PR79 a2026-10-12T02:26:22Z; nueva lectura GitHub12:43:45.761783Z confirma el SHA. |
| Título completo del commit | `test(discovery): isolate F3 scratch from concurrent F1 checks`, leído con git; coincide con el título truncado observado en Cloudflare, sin afirmar que allí sea visible completo. |
| Cloudflare | Cuatro capturas aportadas por el usuario en este turno, vistas directamente por root: mismo servicio cuidatuperroviejo, entorno Producción, versión prefijo `ec329197`, activa y100% tráfico; fila main/Listo55s; dominio cuidatuperroviejo.com y timestamp2026-10-12T02:27:09.864Z. Versiones documentales/previews diferenciadas. |
| GitHub Workers | Check114637987659/SHA exacto, iniciado02:26:25Z; lectura12:43:46.324721Z conserva `in_progress`, conclusion/completed_at null. No se altera ni se presenta como success. |
| Build esperado | Checkout limpio `/workspace/f3-publicacion` del candidato, manifest real350 archivos incluidos HTML/CSS; root comunica rehash completo sin discrepancias. No se copia como manifest descargado de Cloudflare ni se exige identidad global entre builds distintos. |

Mi fuente visual es **la transcripción declarada de root**, no una inspección directa de imágenes desde esta sesión. `capturas-transcripcion.json` identifica las cuatro capturas y la lectura visual observada2026-10-12T12:43:45.192649Z; esa fecha corresponde al registro de la lectura, no se inventa fecha de creación de las imágenes. No hay originales de imágenes accesibles en workspace, bytes o hashes de ellas. `fullVersionId=null` y `fullCommitVisibleInScreenshot=false` son límites reales, preservados. La transcripción no se publica como copia íntegra/raw de capturas.

| Archivo nuevo leído | Bytes | SHA256 |
|---|---:|---|
| `capturas-transcripcion.json` | 1489 | `1bf9d2f85de3bfe5e524139d602fe8cdb225aa1368293bd19beeaac3b7c15177` |
| `main-actual.json` | 6600 | `419b668f8664f44a8ab4affb077b2a8db5790c7e9bad92d364221c85a550c50a` |
| `workers-actual.json` | 7006 | `4a729d03b588dd8405d141df6b68ac7395cbd39dc7e2fdff87021fc979fa3f7f` |

## Suficiencia y límites de la correlación

La identidad completa del código procede de GitHub/git, no de un SHA inventado en Cloudflare. La atribución a producción procede de la plataforma: servicio/dominio y entorno coincidentes, versión activa100%, fila main con título de candidato y estado Listo, timestamp posterior al avance main y al inicio del check nuevo del mismo SHA. Las versiones preview/documentales visibles por separado evitan confundir su estado con la implementación activa. En conjunto permiten admitir el vínculo operativo del candidato/build/dominio para los primeros gates, sin inferirlo sólo de una URL dashboard, CI verde o main.

La correlación de esa versión con el SHA completo es contextual entre fuentes, **no una lectura directa del commit completo o del digest de build dentro de Cloudflare**. `ec329197` se registra exclusivamente como `versionIdPrefix`; no se inventa UUID, no se identifica con BuildID63463225-fa77-4ee2-8050-aa5577dd72cf ni se declara igualdad entre esos identificadores. La ausencia de UUID completo no impide esta admisión limitada; el gate exigirá los bytes/metadata/rutas contractuales reales del dominio contra originales del build autorizado.

El resultado visual activo/Listo aporta evidencia de publicación que antes faltaba; la metadata GitHub sigue pendiente. Es una discrepancia entre fuentes, compatible con notificación GitHub desactualizada, pero **no se diagnostica su causa ni se reescribe el callback**. La suite histórica103426668387 continúa con head_branch agent-ready/f3-c; no es fuente exclusiva del evento main ni se falsea.

## Receipt y ejecución admitidos

Root compone un receipt nuevo antes del primer HTTP y conserva fuentes anteriores intactas. `production.conclusion=success` será **normalización expresamente declarada del estado visual Cloudflare Listo/activo100%**, junto con `source=cloudflare-user-screenshots`, cuatro referencias de captura, transcripción/hash, estado visual original, dominio, timestamp, branch main y `versionIdPrefix=ec329197`. El SHA/tree completo se atribuye a GitHub/promoción/build; UUID y commit completo visibles en capturas siguen ausentes.

Guardar aparte `githubCheck` con ID114637987659, status in_progress, conclusion/completed_at null y lectura actual; `production.workersCheckId` es sólo correlación histórica con el build/evento, **no prueba de que ese check haya concluido success**. CI y autorización conservan sus identidades auténticas. Receipt de forma mínima no basta por sí solo: esta decisión y las fuentes declaradas fundamentan su admisión. No alterar assertions o adapter para convertir API pending en API success.

El adaptador externo previamente admitido continúa congelado SHA256 `ca9445e54aa9216698b5fa33632547fbc4f69dec73bbc8c9f4aefd9e52106464`; fuente C, diff, CLI/perfiles/fórmula y originales esperados no cambian. Ejecutar desde checkout limpio del candidato contra `https://cuidatuperroviejo.com`, carpeta exclusiva nueva de este desbloqueo. Ésta será la **primera matriz de producción**, no retry de un fallo HTTP ni continuación parcial de STOP: hasta esta decisión los contadores siguen0 HTTP/0 scans.

P3-01/02 mantienen siete assets, todos28 IDs/Markdown íntegro, headers/MIME/CORS/no-store, guard/errores/métodos/HEAD, dos recorridos y citas, F1/invariantes; no se repite la matriz histórica F2. Registrar el total real de requests, incluido condicional nativo304 o N/A según fuente original. Transporte/status/redirect inesperado o discrepancia conserva originales y FAIL/STOP inmediato, sin retry, bypass, cambio de assertions o ampliación de allowlist. No afirmar identidad global de HTML exterior ni fecha editorial basada en hashes.

Sólo después de PASS completo de P3-01/02 se admite P3-03: una POST content y una all-ui con CLI/perfiles/selección/fórmula F2 congelados y comparación contra F2 archivada. Conservar raw/metadata/summary/manifest, denominadores/neutrales y limitaciones de comparabilidad; `deploymentCommit=null` no se reescribe. No prometer nivel5 o score nuevo. Política **search=yes, ai-input=yes, ai-train=no**.

## Preservación, auditoría y STOP

El registro/ratificación/auditoría STOP80 anteriores permanecen válidos respecto a sus fechas y evidencia entonces disponible, intactos en `/workspace/f3-publicacion-evidence` y el paquete documental stop80. La nueva admisión resuelve prospectivamente la carencia de receipt; no borra el STOP ni lo reclasifica como PASS. Bug80 permanece abierto hasta registrar gates/resultados y aceptación correspondiente. C sigue PASS R1/5, contador1/5; SDD/A/B/C no se reauditan por esta admisión.

El auditor original Sol/high independiente recibirá para cierre la cadena completa, incluida fuente visual/limitaciones y primeras capturas de producción; esta decisión no sustituye su evaluación. Las capturas del usuario deben seguir referenciadas como evidencia de conversación; si se obtienen originales después, añadir bytes/hash reales sin retroatribuirlos a esta transcripción. No convertir falta de hashes de imagen en hashes ficticios.

Si aparece cambio concurrente de main/versión activa/dominio, incoherencia de estas fuentes o discrepancia funcional, STOP de trabajo dependiente con evidencia y bug según causa; no usar autorización amplia para eludir identidad. Rollback y cambios de candidato requieren la admisión aplicable, sin acciones automáticas. Fin de escrituras: **sólo `/workspace/f3-publicacion-desbloqueo/decision-admision.md`**, sin HTTP/scans, push, modificaciones de candidato/adaptador/contrato, originales STOP o fuentes remotas desde esta sesión.
