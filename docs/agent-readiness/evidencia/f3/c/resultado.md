# F3C — Resultado de implementación y verificación

Código y entrega congelados: `aad2a6624c24d7425c5ad5329b82c77a8a86b619`, tree `add06deb2647988846525fcfbeb5bb6b754b7006`. Base B aceptada: `ac4c5ada06325056c22f9baab60fcd6e72e5d4a5`, tree `018977233fdc3b076bf880bf99d4724f40f3270f`. Issue #77, PR draft #78 hacia `agent-ready/f3-b`. Autor `/root` por instrucción explícita del usuario; no se atribuye a Luna. Este archivo conserva evidencia del autor. [Auditoría independiente](../auditoria/f3c-r1.md): **PASS R1/5, cero bloqueantes**, GPT-6.1 Sol/high, mismo auditor `/root/f3c_auditor`. Su informe SHA256 `c3c4bb7811880cc02dc9b634607bb9cd72282c1db82f750180a9e47c1178c257` se archiva sin modificación. Aceptación arquitectónica registrada aparte.

Se integraron cinco enlaces HTTP comunes, siete reglas exactas MIME/CORS/no-store y la sección F3 de llms posterior a la generación válida de destinos. Prefijo F1 byteexacto, idempotencia, ausencia de anuncios futuros y política `search=yes, ai-input=yes, ai-train=no`. No cambió runtime B ni contratos/proyección/contenido F2.

## Evidencia reproducible

- [Verificaciones](verificaciones.json): 19 comandos exit0; 54 tests del proyecto, 60 offline, 41 de negociación, 12 runtime B y 5 discovery C. Incluye build, checks, semántica, tipos sin diff y dry-run.
- [Dos builds](determinismo-resultado.json): ocho artefactos F3/llms byteidénticos, manifiestos primero/segundo conservados. No se afirma determinismo de todo HTML/chunks heredados.
- [Recibo](recibo-ci-preview.json): CI 38174797432 SUCCESS; comentario Cloudflare6113704992 vincula el SHA completo a `https://dd2a6ab6-cuidatuperroviejo.g1721m.workers.dev`. No se usa branch alias.
- [Workerd final](workerd-manifest.json) y [preview](preview-manifest.json): cada uno PASS, 117 peticiones, 28 documentos y dos recorridos, 350 archivos de build. Se rehashearon todos los cuerpos capturados y archivos contra originales.
- [Índice de originales](indice-originales.json): archivos bajo `/workspace/f3c-evidence`. Manifests públicos son proyecciones declaradas: cuerpos y headers no técnicos quedan privados con digests/bytes originales. No son copias íntegras ni sustituyen originales.

C3-04: siete assets completos byteexactos, schemas/checks, nueve operaciones OpenAPI, dos ARD idénticos y digest de skill. C3-06: GET/HEAD de todos los IDs y Markdown/hash/bytes/metadata/links del corpus `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`. C3-07/09: catálogo/OpenAPI→cushing→lectura→canónica/Markdown y skills/digest→artrosis→lectura→canónica/Markdown. Se preservan enlaces externos originales para cita, sin convertir su extracción en validación científica ni visitarlos. Fixture de más de 4000 caracteres corresponde a pruebas B ejecutadas. C3-08: errores, métodos, HEAD/OPTIONS/405, CORS/no-store y headers; API Catalog ofreció ETag nativo y respondió304 válido. C3-10: home HTML/Markdown/HEAD, llms, robots, sitemap, redirect intencional301 y catálogo asistente sólo lectura. No scans F2 ni acciones del asistente/admin/contacto/cálculos. C3-11 depende del dictamen y aceptación independientes registrados aparte.

URLs canónicas mantienen dominio público contractual; el transporte del gate usa path/query sobre el host de preview exacto. HTML se verificó por estado/canónica/headers; no se afirma igualdad integral de HTML exterior ni se amplió allowlist F2. JSON/Markdown/skill/descriptors sí requieren bytes originales completos. Hashes son de entidad descomprimida.

## Intentos conservados

El snapshot inicial `1c7c25c9b643544523f9c0c023f91f13fc8c586f` falló CI por interferencia de TMPDIR entre la nueva suite C y F1; la corrección aisló únicamente TMPDIR del test nuevo, manteniendo la prueba F1 intacta. [Explicación](ci-correccion.md), logs originales en `attempt-1`. Su CI no se reintentó y no tuvo HTTP público ni auditoría. La ejecución local de suite bajo sandbox sin IPC también queda conservada; la ejecución con permisos de entorno necesarios pasó60/60.

El primer gate local de `aad2a66` quedó FAIL/STOP con503: nueva instancia no pudo arrancar porque el inspector9300 estaba ocupado; una instancia huérfana previa había recargado dist y atendió la petición. [Decisión arquitectónica](incidente-local-decision.md), [índice inalterado](incidente-local-indice.json). Se cerraron sólo procesos propios identificados; se verificaron puertos, readiness, configuración compilada e identidad de ocho assets y se admitió una ejecución distinta, sin rebuild durante su matriz. `workerd-final` pasó completo. El primer fallo no se reclasifica como PASS. La matriz pública se ejecutó una única vez después del PASS local y recibo/CI vigentes.

## Frontera de publicación

Estos hashes pertenecen a `aad2a66`, no al commit documental que archive este resultado o el informe. La documentación puede afectar CSS: no se infiere identidad de otro build. Main observado `d2bd342050811d41ee212730cb11fe07783994bd`, producto F2 aceptado; su cierre documental `67dacfec405935567f71b403cd80a56f5aebe952` es una identidad distinta. F3 sigue en rama/preview. C3-12 y P3-01–03 requieren promoción específica autorizada y evidencia nueva del dominio real. No hay score nuevo ni promesa de nivel5.

Rollback C en rama retira su composición Link/extensión llms/headers, preservando A/B/F2/evidencia. Rollback de fase publicada requiere PR coherente C→B→A y autorización separada. Hueco esencial o quinta revisión FAIL implica bug/STOP conforme a SDD; el contador no se reinicia.
