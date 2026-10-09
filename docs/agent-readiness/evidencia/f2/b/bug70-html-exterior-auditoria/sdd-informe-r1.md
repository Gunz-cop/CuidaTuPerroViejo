# Auditoría independiente SDD correctiva #70 — R1/2

**Dictamen: FAIL. Un bloqueante.** Revisión 1 de 2 de esta sucesora; queda un único ciclo de corrección y revisión. La producción continúa STOP. No se modifica ni consume la aceptación histórica formal F2B R1/5 ni el contador de implementación #70 (0/5).

## Entrada y alcance

Documento fijo: `/workspace/ctpv-bug70-sdd/docs/agent-readiness/fases/f2-produccion-integridad-exterior.md`, SHA256 `a7c484fa48dc486f0db6ba06f28a2a4da6b8b2d470980428c5b37edc8ac2988b`, comprobado antes de revisar. Es un archivo nuevo aún no versionado sobre HEAD d2bd; el digest identifica esta entrada sin atribuirle un commit publicado.

Target de producto: `d2bd342050811d41ee212730cb11fe07783994bd`, tree `666f95273609ca67da8a508390c3acf9a141f8ca`. Revisión de fondo, coherencia y ejecutabilidad normativa exclusivamente por bloqueantes. Se cotejaron las sucesoras y contratos heredados, el plan histórico retenido, el fragmento privado, su comprobante y el build existente. No se emitieron HTTP/scans, no se ejecutaron builds ni suites de tests, no se modificaron fuentes, historia o documento. Sólo lecturas, inspección de bytes/hashes y estos informes privados.

## Bloqueantes

### S70-R1-B01 — Conservación de rutas impide seleccionar el stylesheet real

**Referencia:** SDD §3, línea33, frente a líneas11 y29–31. Evidencia: `/workspace/ctpv-sdd-correcciones/f2-promocion-produccion-d2bd3420/p01-p02-exec/plan/public-plan-requests/038.json`, filas `resource:resource-stylesheet-get` y `resource:resource-stylesheet-head`.

La línea33 exige que el nuevo plan conserve las rutas del anterior y sólo actualice valores de artefactos/procedencia/gates/regla exterior. Las dos filas históricas GET/HEAD apuntan a `/_astro/BaseLayout.gPuLvWrC.css`. El build d2bd y la propia SDD fijan `/_astro/BaseLayout.DiuOmqqC.css`. La diferencia afecta al path de dos solicitudes, además del hash esperado; conservar literalmente el path antiguo impide comprobar el CSS nuevo. Cambiarlo sin excepción expresa incumple la instrucción de conservar rutas.

**Impacto:** el implementador debe escoger entre una solicitud obsoleta y alterar un contrato obligatorio. La tanda no puede declararse coherente ni lista con ambas exigencias simultáneas.

**Corrección recomendada:** autorizar exclusivamente la sustitución del path CSS de esos dos IDs por el stylesheet fijado del build d2bd, con expectativas GET de hash/tamaño reales y HEAD vacío según contrato. Conservar todos los demás paths, IDs, métodos, headers solicitados, dependencias,43 chunks y máximo1284 solicitudes. No añadir solicitudes ni ampliar la excepción de integridad a CSS. Presentar el documento corregido con nuevo digest para R2/2.

## Comprobaciones sin otros bloqueantes detectados

- **Entidad y asset:** líneas39–58 distinguen A generado y E exterior decodificado. `htmlSha256` sigue identificando A; wire/decoded bytes y hashes conservan la respuesta real. La admisión es exactamente A o la construcción A+I; no hay stripping, DOM reserializado, tolerancia por tamaño/hostname ni aprendizaje desde respuestas nuevas.
- **Fragmento privado:** inspección independiente confirma367bytes, SHA256 `2be9ce292ff29562f5d0f9a13c9adf1077e5e6c4d787e4568c5bd5f0eed7a09b`; contiene un único script completo, sin código inline ni otro nodo, atributos type/src/integrity/data-cf-beacon/crossorigin, host `static.cloudflareinsights.com`, y LF final. No se publican sus valores de tracking, SRI o identificadores. El digest histórico del span de alineación no se confunde con este fragmento.
- **Construcción real retenida:** A tiene126650bytes/hash `f8ce9ff898b84a0fbab7b965a112298b143202705dc2c8eb3c245323f6788dc8`; E tiene127017bytes/hash `8585d05ecf77c601511ca5b124b958f8fa95fe6daef817548c747094d2e43f49`. A contiene un único cierre literal body, en posición126636; la igualdad `E = A[:p] + I + A[p:]` se comprobó leyendo los originales. Es evidencia offline del candidato, no aceptación retroactiva ni prueba de otras rutas.
- **Baseline58:** el índice existente contiene28 documentos. Los56 archivos HTML/Markdown referidos coinciden con sus hashes de índice. Índice26284bytes/hash `7c4f0130841f7c009d01cf37bb2c3acf5e1e59ebdc2cb7e14bb6b5a6d3a88273`; CSS138212bytes/hash `9695668496f97178890833317569b4758f5ef6fb1f3e2caeb80e9a7c1aec3ff9`. Total:28 HTML+28 Markdown+índice+CSS=58. La SDD exige sello/procedencia y paridad del delta limitado antes de reanudar; el diagnóstico independiente retenido registra28 HTML afectados sólo por URL CSS, índice sólo por hashes HTML y Markdown íntegros. No se atribuye paridad por mera igualdad del diff de producto.
- **Estabilidad frente a baseline exterior:** runner69 `runner-source/002.pyfrag`, líneas79–86, exige que E200 condicional coincida con `bodyDecodedSha256` del baseline capturado para la misma ruta/formato/codificación. La SDD líneas23 y66 conserva los checks heredados y el comportamiento de las demás filas; esa condición puede coexistir con A/A+I. No se acredita un segundo conflicto inexecutable: pasar la construcción individual no exime de igualdad con el baseline real ni de estabilidad heredada de alternancias. Conviene explicitarlo en R2: no presuponer uniformidad entre rutas/codificaciones permite inspeccionarlas separadamente, pero no autoriza variar A/A+I dentro del contexto donde se exige estabilidad. Conservar hash/tamaño reales de E, nunca reemplazarlos por A. Esta precisión no amplía el comparador ni la excepción.
- **Validators y límites:** líneas50 y58 conservan HEAD/304 sin cuerpo, Markdown exacto/ETag obligatorio, HTML ETag opcional y coherente, tokens de esta tanda/codificación y política de caché/seguridad heredada. La excepción no transforma validators ni concede N/A de integridad, ni aplica a Markdown, CSS, errores o recursos fuera del corpus.
- **Producción/sintéticos:** líneas46 y68 fijan el fingerprint real sin sustitución CLI y separan fixtures sintéticos offline de EXEC real; conservan negativos y la captura FAIL histórica. Su implementación efectiva corresponde a la posterior auditoría de código.
- **Autoridad/ownership:** líneas18–25 y62–85 delimitan precedencia y separan helper documental de producto desplegado; prohíben editar producto/config/plataforma y push/deploy implícitos. Exigen PASS de código, admisión fija y nueva autorización del dueño antes de una tanda nueva finita; mantienen STOP inmediato y los contadores sin reinicio.
- **Aplicabilidad al blog:** preservar la analítica con una única inserción exacta y mantener lectura Markdown íntegra es una decisión de alcance razonable para el producto editorial. No introduce protocolos artificiales para puntuación; Content Signals mantiene search=yes, ai-input=yes, ai-train=no. Nivel5 no se promete.

## Límites y siguiente decisión

Este FAIL afecta a la ejecutabilidad de la SDD, no demuestra un fallo nuevo del producto ni acepta una implementación todavía inexistente. No se verificaron nueva publicación, estado actual remoto, otras rutas exteriores, configuración emisora del beacon, tests del futuro helper ni gates C70-01–06 completos. El mecanismo Tailwind y la paridad histórica se apoyan también en el diagnóstico independiente retenido, sin un nuevo experimento causal. Los checks reales siguen pendientes de implementación/auditoría y autorización.

Corregir únicamente S70-R1-B01 y fijar nueva entrada para la revisión definitiva R2/2. FAIL2 implica STOP con el dueño; no hay tercera revisión. Este informe no autoriza una tanda, merge, deploy ni reanudación de producción.
