# Decisión arquitectónica tras la captura no-transform

2026-10-06. Experimento diagnóstico cerrado: 8/8 nuevas solicitudes, sin repetición autorizada. No es aceptación de F2B, cambio de SDD ni autorización de promoción a main.

## Hallazgo y alcance

La comparación desde GitHub Actions conserva las fuentes HTTP por preview: control b87616f72d4ff3446f005f87761bfd65d9f43b62 y tratamiento 69a50652f62cec62d5355056a54eab0722b676a5. El workflow e7cfdf45eba576ff78a99b6b8098802c0ef815ba produjo el run37544456977/job112544967268. Artifact11449199667: 85775 bytes, SHA256 d657a634e0b2fd9777a2ee53c5a55e8ccc53b05454ca1ad7747fb0484d62a32c. El guard posterior 2aded1688e363833e6bac47d3fdcfb8312a589b3 quedó skipped/steps0 en run37544609829/job112545490053 antes de publicar documentos.

HTML GET/HEAD del control pierde el ETag exterior pese a observarlo en ASSETS/wrapper. En el tratamiento con Cache-Control privado/no-store y no-transform, el ETag exterior coincide con el nativo en ambos métodos. Markdown conserva el ETag nativo en ambos previews. Los cuatro cuerpos GET coinciden byte a byte con los respectivos artefactos de build/índice; todas las solicitudes usan identity. El auditor confirmó la evidencia offline sin bloqueantes.

Esto demuestra una asociación favorable con el tratamiento en dos previews y estas muestras. No identifica la opción o capa causal concreta de Cloudflare, no acredita If-None-Match/304, el corpus completo, otras codificaciones ni el rendimiento en producción.

## Coste que impide adoptar el experimento automáticamente

La documentación oficial de Cloudflare sobre compresión describe que no-transform en la respuesta de origen impide modificar la compresión. En consecuencia, adoptarlo para HTML que sale sin comprimir podría impedir una optimización útil para los lectores. En esta captura identity ambos previews transfieren el mismo HTML, 119418 bytes; no se midieron transferencias gzip o Brotli. Una compresión gzip local de esos bytes produce 22731 bytes, sólo como estimación reproducible de la oportunidad de ahorro: no es medida de red, rendimiento ni configuración activa.

La SDD vigente fija Cache-Control: private, no-store y preservación del ETag nativo para HTML y Markdown, incluyendo sus verificaciones condicionales. Referencias: docs/agent-readiness/fases/f2-contratos.md, sección de headers, y f2-lectura-markdown.md, arquitectura de respuestas. Añadir no-transform al producto altera esa política. Eximir sólo HTML también altera requisitos de validación. Ninguna alternativa está incluida retrospectivamente en el PASS2/2 existente.

## Recomendación

Para este blog, priorizar compresión de HTML para los lectores y el contrato verificable de Markdown para agentes. Preparar una decisión explícita de alcance para revisar la obligatoriedad del ETag exterior y las condiciones de revalidación de HTML, manteniendo integridad, ETag nativo y negociación de Markdown. No inventar validadores ni relajar garantías de Markdown. Esta recomendación se fundamenta en la diferencia entre contenido destinado a lectura humana y representación para agentes, y en el coste de transferencia; no busca convertir un fallo de la especificación antigua en PASS.

Alternativa: exigir ETag exterior nativo también en HTML y adoptar no-transform en respuestas negociadas, con una política de compresión previamente diseñada y validada. Requiere evaluar esa política; la captura actual no demuestra que esta alternativa mantenga los tiempos de carga ni resuelve por sí sola todas las páginas.

## Estado y siguiente acción concreta

Cerrar este experimento, archivar sus raws y dictamen, conservar #60 y #56 abiertos/STOP y las auditorías formales B en0/5. El resultado experimental no se mezcla en las ramas de producto ni en main. Conservar los dictámenes previos y el límite de revisión de la SDD original.

La propuesta anterior queda lista para una decisión del dueño sobre el nuevo alcance. Si acepta revisar el alcance para preservar compresión de HTML, el arquitecto preparará un contrato sucesor explícito con procedencia del cambio, casos condicionales completos y revisión independiente previamente autorizada; no será una tercera revisión ni sustitución del PASS de la SDD original. Si mantiene la obligatoriedad del ETag HTML, habrá que definir y validar compresión compatible antes de implementar. Mientras no se resuelva esta contradicción de producto, el programador se detiene y el bug documenta el bloqueo.
