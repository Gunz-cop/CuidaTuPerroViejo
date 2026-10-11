# Auditoría independiente F3A — R1/5

Fecha: 2026-10-11. Dictamen: **FAIL, cuatro bloqueantes reparables de implementación**. Lista cerrada B3A-01–04. No se identifica hueco esencial de SDD ni se modifica el contrato ratificado. Contador del issue #73: **1/5**, incluida esta primera auditoría; quedan cuatro revisiones posibles con el mismo auditor. Un quinto FAIL exige bug/STOP, sin sexto intento ni reinicio.

Auditor: sesión fija `/root/f3a_auditor`, GPT-6.1 Sol/high, independiente del autor Luna6/high `/root/f3a_programador` y del coordinador. El auditor no corrige código, tests de producto ni norma. Este informe se escribe exclusivamente en el worktree auditor, sin commit; las reproducciones y logs permanecen fuera de Git.

## Identidad y alcance

| Dato | Identidad verificada |
|---|---|
| Issue / PR draft | Gunz-cop/CuidaTuPerroViejo #73 / #74; destino `agent-ready/f3-sdd` |
| Snapshot de entrega fijo | `df1a121d79f36d507dff0107617e2f9b8bbea20e` |
| Tree de entrega | `86cd9f0fd4c0e662120cb63ad32e5bb734a710d2` |
| Base de admisión | `32949d0f8a565eaac7b58520781ab09ccbeba9a5` |
| Tree base | `236a28c11bbe875165b0e8c6bf212e75d87c145b` |
| Commit de código anterior al reporte | `480a02e4356cca8d86c7b0d447e30c8187a057d2` |
| Worktree auditor detached | `/workspace/f3-a-audit` |

Fuentes leídas: `AGENTS.md`, método SDD, spec/contratos/traspaso F3, anexos schema/OpenAPI/skill/ARD, ratificación técnica PASS SDD R2/2, instrucciones vigentes del issue #73 y `evidencia/f3/a/entrega.md`. Se leyó también la spec de migración para los ajustes acotados de config/dependencias. La base y el snapshot se comprobaron por Git, sin usar HEAD móvil del autor como autoridad.

Se evalúan C3-02/03/04 y partes de generación/ownership/CI/evidencia de C3-10/11. Runtime B, discovery integrado C, HTTP funcional, preview funcional y producción quedan pendientes de sus encargos. No se exigen ni se presentan como PASS en A. No hubo HTTP de preview/producción, scans F2, despliegue, cambios de main ni llamadas con efectos.

El diff frente a la base contiene sólo las 16 rutas propias/autorizadas de A. `astro.config.mjs` añade el hook después de projection; no cambia el resto de integraciones ni añade postbuild. Package/lock promueven las cuatro dependencias directas exactas fijadas; no cambian versiones/resolved/integrity de paquetes. El resto del delta lock son flags `dev`. Los checks actuales de CI permanecen y se añaden tests F3 y el check tras build. Proyección, contenido, Worker, negociación y headers F1/F2 no se modifican.

## Resultado por criterio

| Criterio | Resultado sobre alcance A | Evidencia / motivo |
|---|---|---|
| C3-02 | **FAIL** | El corpus actual se deriva íntegro de F2 y conserva IDs/hashes; el fixture largo y los assets actuales pasan. B3A-01 y B3A-02 rompen texto visible/enlaces GFM válidos. |
| C3-03 | **FAIL** | Los dos originales del SHA final tienen manifests/llms idénticos y el build independiente reproduce el manifest. B3A-03 y B3A-04 muestran límites/ref checks que no fallan cerrado. |
| C3-04 | **FAIL** | Schema/OpenAPI/skill fuente coinciden con anexos; assets actuales y ARD primario validan; digest/entries actuales correctos. B3A-04 permite un OpenAPI con referencia interna inexistente. |
| C3-10, parte A | Verificado con límites | Ownership/hook/CI conservado y build real del snapshot verificados. Recibo remoto de CI successful leído; no se vuelve a acreditar runtime ni matriz F2. |
| C3-11, parte A | Verificado para esta entrega; aceptación pendiente | Snapshot/base/tree fijos, draft PR y evidencia identificada. Este informe registra intento 1/5. FAIL impide cierre aceptado A y lanzamiento B. |

## Lista cerrada de bloqueantes

### B3A-01 — Los nodos inline insertan espacios dentro de palabras visibles

Contrato afectado: contratos F3 §4, recorrido de texto AST completo con separación de bloques; C3-02. Fuente: `scripts/agent-readiness/agent-api.mjs:100` y `:165`. El recorrido recoge fragmentos inline pero `chunks.join(' ')` inserta un separador entre todos ellos; además añade un espacio al terminar inlineCode. El oráculo de tests también une fragmentos con espacios y no detecta este fallo.

Reproducción independiente con corpus F2 válido y hashes recalculados exclusivamente para declarar el input: Markdown `# X\n\nart**rosis** y cu\`sh\`ing\n`. Texto visible esperado: `artrosis y cushing`; tokens de cuerpo esperados `artrosis,cushing,x,y`. Resultado real: `art,cu,ing,rosis,sh,x,y`. Se pierden los términos completos que usa la búsqueda léxica, pese a aparecer en el texto editorial.

Para cerrar: preservar continuidad del texto entre nodos inline y mantener separadores de bloque según el contrato; una expectativa independiente debe detectar estos casos, sin copiar la extracción defectuosa del generador.

### B3A-02 — Una referencia GFM duplicada apunta a la última definición

Contrato afectado: contratos F3 §4, URL real de los enlaces de referencia y orden/deduplicación; C3-02. Fuente: `scripts/agent-readiness/agent-api.mjs:126`. `definitions.set` reemplaza una definición anterior de igual identifier. La resolución GFM usa la primera definición coincidente. El oráculo de tests repite el mismo reemplazo.

Input válido: `[Fuente][ref]`, seguido de `[ref]: https://example.org/primera` y después `[ref]: https://example.org/segunda`. El AST contiene ambas definiciones. El enlace visible GFM resuelve a `/primera`; el generador entrega `{label:"Fuente",url:"https://example.org/segunda"}`. Esto cambia el destino citado en `links` respecto del Markdown íntegro.

Para cerrar: resolver las referencias con la semántica GFM del parser fijado y probar de forma independiente la precedencia ante definitions repetidas.

### B3A-03 — El build admite una lectura posible que excede 2 MiB

Contrato afectado: contratos F3 §3, «Build falla si cualquiera de las lecturas posibles excede límite» de **2097152 bytes UTF-8**, sin truncamiento; C3-03. Fuente: `scripts/agent-readiness/agent-api.mjs:303`, validación y construcción de artifacts sin guard de tamaño de Read. `F3_LIMITS` tampoco incluye el techo de respuesta.

Reproducción con una entrada F2 válida: título de 400000 caracteres `x`, Markdown con un label de 510000 comillas y URL HTTPS. Markdown **510031 bytes**, índice F2 **400944 bytes**, query-index **1420676 bytes**: todos dentro de sus caps y con hashes/corpus correctos. `buildArtifacts` termina con éxito. El Read completo contractual —schemaVersion,corpusSha256,document,mediaType,markdown,links— mide **2441005 bytes** con serialización normativa; incluso compactado mide **2440869 bytes**, ambos superiores a 2 MiB.

Para cerrar: el build debe rechazar ese corpus por el límite de lectura antes de escribir outputs, con verificación del límite inclusivo y +1 sobre la respuesta real. La defensa runtime B sigue siendo adicional y no sustituye este guard de A.

### B3A-04 — Se acepta un `$ref` OpenAPI local inexistente

Contrato afectado: contratos F3 §5, refs internos resolubles y errores de contrato/ref fail closed; C3-03/04. Fuente: `scripts/agent-readiness/agent-api.mjs:255`. La validación comprueba equivalencia de component schemas y sólo exige que los refs del documento empiecen por `#/`; no resuelve los refs de parámetros/respuestas/operaciones.

Reproducción fuera del repo de producto: copiar las fuentes propias a un root temporal y cambiar únicamente el schema de respuesta 200 GET catalog a `$ref:"#/components/schemas/Missing"`. No existe `Missing`. `buildArtifacts(fixture,rootTemporal)` termina con éxito y emite el OpenAPI inválido, en lugar de fallar. El template real entregado conserva los refs válidos del anexo, pero el guard obligatorio no detecta este caso.

Para cerrar: comprobar resolución de todos los refs internos del OpenAPI antes de emitirlo y conservar rechazo de refs remotos; fixture negativo independiente con referencia local ausente.

## Evidencia original e independiente

Los originales del autor se inspeccionaron en `/workspace/f3-a-evidence/`. `final-head-sha.txt` identifica df1a completo; `build-delivery-{1,2}.log` terminan en build Complete y generación de 28 documentos. Ambos `manifest-delivery-{1,2}.json` tienen **7151 bytes** y SHA256 **`1b59c7e2ef9c03949ea09ecf958d06cf399f63eac81b722ba9a052d0d1e1c867`**. Los dos `llms-delivery-*.sha256` registran **`aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e`**. Se distinguen de los originales `build-final-{1,2}.log` del commit de código 480a; el reporte versionado se refiere a ese par anterior. La evidencia posterior del HEAD completo está declarada también en el issue y los originales finales, sin inferir igualdad por diff documental.

Verificaciones ejecutadas por este auditor sobre df1a con Node v24.19.0:

| Acción | Resultado |
|---|---|
| `npm ci --include=dev --cache /tmp/f3a-audit-npm` | Exit 0; 469 paquetes; log original externo. |
| Primer `XDG_CONFIG_HOME=/tmp/f3a-audit-xdg npx --no-install astro build` | Exit 0; 28 documentos, query-index 585422 bytes; manifest independiente idéntico al final original. |
| `node --test tests/agent-readiness/f3-*.test.mjs` | Exit 0; runner informa 2 archivos, 2 passes, 0 fails. Este dato no se convierte en un conteo de 7 subtests no observado en esta ejecución. |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | Exit 0, assets actuales verificados. El test entregado incluye comprobación del treeDigest read-only y detector de huérfanos. |
| Ajv2020 contra `$defs/ArdManifest` del schema primario archivado | Ambos ARD actuales válidos; se usa el subconjunto primario y URI local sin red. Aviso de formato date-time no configurado en un campo opcional ausente; no se atribuye a validación de fechas de transporte. |
| Comparación fuente schema/OpenAPI template/skill con anexos normativos | `cmp` exit 0 en los tres archivos. |
| Cuatro probes independientes | Exit 0; registran los cuatro resultados defectuosos de la lista cerrada. |

Evidencia propia fuera de Git: `/workspace/f3a-audit-evidence/npm-ci.log`, `build-1.log`, `manifest-1.json`, `llms-1.sha256`, `sync.log`, `f3-tests.log`, `artifact-check.log`, `probes.mjs` y `probes.log`. Reproducción: `node /workspace/f3a-audit-evidence/probes.mjs` desde el worktree auditor; sólo crea inputs temporales y lee la implementación, sin corregirla.

| Original independiente | SHA256 |
|---|---|
| `probes.mjs` | `4e214ad6e7519e5ef40384c719384be1354ed1d4a78e564dce91780663c120d6` |
| `probes.log` | `8faa8e2c74f9d21295b92d8e47326fe990cd1e252823e40b033427fe823d941a` |
| `manifest-1.json` | `1b59c7e2ef9c03949ea09ecf958d06cf399f63eac81b722ba9a052d0d1e1c867` |

El recibo curado remoto `/workspace/f3-a-evidence/remote-receipt.json`, recopilado por el coordinador y leído por el auditor, identifica el SHA df1a: CI run **38109370315**, completed/success; comentario Cloudflare **6105139041**, deployment successful y Commit Preview `https://2fa09116-cuidatuperroviejo.g1721m.workers.dev`. Este informe no afirma haber repetido la consulta remota de CI ni haber llamado esa URL. Recibo metadata no es aceptación funcional HTTP F3.

## Límites, reversión y cierre

No se repitieron todas las suites preexistentes ni dry-run Wrangler local. La cadena sync/check/tests existente se detuvo en sync, antes de esos pasos: Astro telemetry intentó crear `/home/agent/.config/astro` y recibió ENOENT. El reintento usando XDG task-specific y permisos de sandbox adecuados fue **rechazado por revisión automática por límite de uso**, no por una determinación de acción insegura; no se ejecutó. No se eludió ese control. El segundo build independiente no se lanzó tras ese rechazo; el par final original del autor y el primer build independiente sí se verificaron. Las limitaciones no invalidan las reproducciones ni convierten los cuatro fallos de código en hueco de SDD.

Rollback A está definido por issue/traspaso: revertir hook/dependencias/checks/artefactos propios como conjunto en la rama, conservar F1/F2 y evidencia; sin main/deploy. No se ejecutó reversión ni integración.

**FAIL R1/5** devuelve únicamente B3A-01–04 al autor para corrección dentro del ownership A. No hay observaciones opcionales que abran ciclos. No aceptar/cerrar A ni iniciar B hasta una nueva entrega fija y PASS del mismo auditor. La SDD PASS R2/2 permanece intacta. Fin de escrituras de esta revisión: sólo este informe en el worktree auditor y originales de auditor fuera de Git; sin commit.
