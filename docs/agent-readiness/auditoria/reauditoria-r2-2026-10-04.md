# Reauditoría r2 definitiva de SDD: únicamente bloqueantes

Fecha: 2026-10-04. Auditor: misma sesión independiente de la auditoría original y r1. Intento de reauditoría de ajustes: **2, definitivo**.

**Dictamen: PASS.**

**Lista de bloqueantes: [] — ningún bloqueante pendiente dentro del alcance de esta revisión.**

**SHA publicado auditado: 6a1a317fe4d27154bff2a29ce12e2cdd74987315.**

R1-B01 y R1-B02 quedan resueltos. No se observaron regresiones bloqueantes asociadas. Este PASS habilita preparar el lanzamiento de F0 mediante un issue que fije este SHA exacto, este informe y sus contratos. **No acepta la implementación de C01–C12, no autoriza merge ni despliegue y no convierte fases posteriores planificadas en encargos ejecutables.**

## Entrada y verificaciones locales

Snapshot inmutable: /workspace/audits/agent-readiness-ajustes-r2-2026-10-04/input/. Manifest: input-manifest.json. Evidencia de publicación archivada: publication-proof.json.

- Los **32 hashes SHA-256** coinciden con los bytes del snapshot.
- Los **32 hashes Git de blob** calculados localmente coinciden con el árbol remoto registrado en publication-proof.json, sin diferencias.
- El SHA publicado del manifest, el SHA de la prueba y el SHA de su respuesta de commit coinciden. La respuesta de tree no está truncada.
- Respecto de r1, cambian únicamente fases/f0-medicion-y-contratos.md, fases/f0-contratos.md y auditoria/ajustes-2026-10-04.md. Se añade el informe de r1 intacto.
- El H1 autorizado y el resto del código incluidos en el snapshot permanecen sin cambios respecto de r1. Conservan el diff y hash comprobados en la revisión anterior.
- HEAD local 493f82e93cdfca3ea804dcea656ad8bdd2151212 no se confunde con la versión publicada auditada. La base de producto sigue siendo cdb0adece5d629f6b2473be7ea6e30c0b372ef1c.

Se revisaron los dos ajustes, sus contratos dependientes y las reglas de lanzamiento, bugs, detención y auditoría. Las líneas citadas corresponden al snapshot r2.

## Cierre de los bloqueantes de r1

| ID | Dictamen | Evidencia y efecto |
|---|---|---|
| R1-B01 | **Resuelto** | fases/f0-medicion-y-contratos.md:157 elimina continuar offline después de detectar indisponibilidad del escáner. Exige bug, entrega del estado/commits y evidencia parcial ya existentes y detención. Prohíbe aceptar F0 o C05 y reserva la reanudación al coordinador. Es coherente con F0:185, sdd.md:36–40 y el prompt de detención. |
| R1-B02 | **Resuelto** | fases/f0-contratos.md:128–134 permite canonicalPath=null cuando una página inválida no pueda resolverlo, y canonicalUrl/canonicalPath=null para document sin canonical. No inventa URL desde archivo ni cambia la disposición. Separa requisitos de state=valid de registros diagnósticos inválidos y permite null para metadata/clasificación no resolubles con error y htmlFile. |

El caso negativo obligatorio de contratos:132 fija una salida concreta: selector con H1 y sin canonical conserva kind=tool, disposition=document e ID tool--movilidad, con canonicalUrl/canonicalPath=null, state=invalid, CANONICAL_INVALID y exit 3. Así el implementador puede conservar la evidencia y cumplir el schema sin descartar o reclasificar la página.

Las filas conocidas conservan su clasificación. Los null diagnósticos no autorizan state=valid ni un índice público parcial. El orden por canonicalPath admite null al final; el hash de sourceDigest sigue basado en bytes HTML y nombres de archivo, por lo que los campos diagnósticos no impiden calcularlo cuando se haya leído el corpus.

## Coherencia obligatoria y regresiones

Los cambios no alteran perfiles ni scoring, metadata HTTP, reconstrucción de requests, distinción sourceCommit/deploymentCommit, ownership de tooling/spike, política editorial, 28 documentos previstos o siete fixtures más negativos. Se mantiene la obligación de conservar fuentes/avisos/FAQ y no publicar un corpus parcial como válido.

Las normas de implementación permanecen coherentes:

- Implementadores: **Luna 6 con razonamiento alto**, identificadores gpt-6-luna/high.
- Base y lanzamiento: SHA publicado exacto, informe PASS y contratos enlazados en el issue; no resolver una rama móvil como versión auditada.
- Imposibilidad de avanzar sin inventar, contrato insuficiente o dependencia/entorno requerido indisponible: bug de SDD enlazado y detención; fallback local si GitHub no está accesible.
- Autor y auditor separados; auditoría sobre SHA de entrega fijo.
- Máximo **cinco auditorías totales por issue implementador**, contando la primera. Tras quinto FAIL: bug y detención, sin nuevas correcciones ni sexta auditoría.
- Un fallo normativo detiene inmediatamente; los fallos reparables de código pueden corregirse dentro del número de intentos autorizado.
- PASS por ausencia de bloqueantes y evidencia obligatoria; observaciones opcionales no crean ciclos. PASS no autoriza promoción.

El contador de cinco auditorías de implementación es independiente de esta revisión de ajustes de SDD. R2 agota la única ronda adicional autorizada después del FAIL de r1; no se propone una tercera ronda.

## Recomendaciones opcionales y límites

Las recomendaciones de proporcionalidad, aplicabilidad y nivel 3/4 frente a nivel 5 del informe original permanecen disponibles para decisiones arquitectónicas posteriores. No se reabrieron ni condicionan este PASS.

Esta es una auditoría estática de contratos y evidencia local de publicación. No se ejecutaron red, scans, npm, builds, tests, workerd, CI, permisos adicionales o despliegues. No se demuestra todavía cumplimiento funcional de los criterios C01–C12.

La publicación se verifica contra las respuestas archivadas y los blobs del snapshot; no establece estado de producción ni deploymentCommit. La vigencia del evaluador y sus requisitos efectivos de nivel 5 permanecen fuera del alcance y no verificados al 4/oct.

El H1 deberá comprobarse en HTML construido durante F0. Los casos negativos y la detención ante indisponibilidad deberán verificarse durante implementación; la existencia del contrato no prueba que el código los cumpla.

No se modificaron specs, código, snapshots ni informes anteriores. La única escritura del auditor es este informe nuevo.
