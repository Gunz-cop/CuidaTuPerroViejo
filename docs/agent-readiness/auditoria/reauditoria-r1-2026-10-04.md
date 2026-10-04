# Reauditoría r1 de SDD: únicamente bloqueantes

Fecha: 2026-10-04. Auditor: misma sesión independiente de la auditoría original. Intento de reauditoría de ajustes: **1**.

**Dictamen: FAIL.**

**SHA publicado auditado: 923c4805d1c0f4441507d2440f05fa11df435bec.**

Lista de bloqueantes: **R1-B01, R1-B02**. Los bloqueantes anteriores sobre H1, publicación, scoring, metadata HTTP y reconstrucción de requests quedan resueltos. El envelope de inventario inválido está añadido, pero su modelo de páginas requiere completar el caso de canonical ausente. El coordinador debe cerrar ambos puntos antes de lanzar implementación.

Este dictamen evalúa la ejecutabilidad y coherencia normativa de la SDD. No acepta C01–C12 como implementados, no autoriza merge ni deploy y no impone preferencias opcionales del informe original.

## Entrada e integridad

Entrada inmutable: /workspace/audits/agent-readiness-ajustes-r1-2026-10-04/input/. Manifest: input-manifest.json. Prueba de publicación entregada: publication-proof.json.

Comprobaciones locales:

- Los **31 hashes SHA-256** del manifest coinciden con los archivos del snapshot.
- El SHA del manifest, el de la prueba y el de su respuesta de commit coinciden con 923c4805d1c0f4441507d2440f05fa11df435bec.
- Los **31 hashes Git de blob** calculados sobre el snapshot coinciden con el árbol remoto registrado en la prueba; no hay diferencias. La respuesta de tree no está truncada.
- El selector contiene un H1. Comparado contra la base de producto cdb0adece5d629f6b2473be7ea6e30c0b372ef1c, sus bytes coinciden exactamente con sustituir únicamente las etiquetas de apertura/cierre del primer título editorial. Texto, clases y resto del archivo se conservan.
- Su hash coincide con el hash normativo de F0: 8c11028f8a8afc50fce0a7df19b0236421eb68191d5e16eedeedc29d05c0767a.

HEAD local 493f82e93cdfca3ea804dcea656ad8bdd2151212 no se utiliza como SHA de esta SDD publicada: contiene un estado anterior y el checkout tiene ajustes locales. La evidencia de publicación se verifica contra el snapshot y las respuestas archivadas, sin nuevas lecturas de red.

Las líneas citadas debajo pertenecen al snapshot r1.

## Bloqueantes pendientes

### R1-B01 — La caída del escáner simultáneamente permite continuar y exige detener la sesión

Referencias:

- fases/f0-medicion-y-contratos.md:157: «el replay y pruebas offline pueden terminar mientras se espera el servicio».
- fases/f0-medicion-y-contratos.md:185: incluye «servicio de scan caído» entre los bloqueos y dispone «La sesión se detiene».
- sdd.md:36: ante entorno/dependencia requerida no disponible o contradicción, exige detenerse, abrir el bug enlazado y «no continúa a pesar del bloqueo».
- fases/f0-prompts.md:37–39: ante bloqueo de entorno/dependencias o contradicción, exige detenerse y crear el issue correspondiente.

Evidencia: una misma condición concreta —servicio de scan indisponible para C05— tiene dos instrucciones incompatibles en la propia spec de F0. La regla más nueva no tiene una excepción explícita para el permiso anterior de terminar offline.

Impacto obligatorio: el implementador debe escoger por su cuenta si sigue trabajando o detiene la sesión. Continuar sigue la línea 157 pero contradice las reglas nuevas; detenerse cumple esas reglas pero deja sin efecto una autorización específica de la misma SDD. La prohibición de inventar decisiones hace que esta inconsistencia sea bloqueante, aunque C05 siga correctamente prohibido como aceptado sin evidencia live.

Corrección mínima recomendada: conservar la entrega parcial documentada y la prohibición de aceptar C05, pero retirar la autorización de continuar offline después de detectar el bloqueo. Indicar bug, entrega del estado/commits existentes y detención. Si el propietario quisiera permitir avance independiente, el coordinador tendría que expresar una excepción coherente en todos los contratos; no corresponde al implementador inferirla.

No se recomienda cambiar el criterio de C05 ni fabricar una medición para resolver este punto.

### R1-B02 — El informe inválido debe conservar documentos sin canonical, pero su schema prohíbe el null necesario

Referencias:

- fases/f0-contratos.md:126: ante errores semánticos exige conservar las páginas inspeccionadas en state=invalid.
- fases/f0-contratos.md:128: canonicalPath admite null «solo para error/excluded sin canonical»; cada página tiene campos cerrados obligatorios.
- fases/f0-contratos.md:130,136: exige canonical válido en documents y contempla CANONICAL_INVALID.
- fases/f0-medicion-y-contratos.md:84–86: el canonical del HTML renderizado es autoridad; una página/canonical inválida produce error y F0 no puede corregir generación.

Caso concreto reproducible del contrato: un HTML de una ruta obligatoria, por ejemplo el selector o un artículo, contiene su H1 pero carece de link canonical. Sigue siendo document según la política y debe conservarse como página inspeccionada con CANONICAL_INVALID. No hay canonicalPath observado; null está prohibido para ese document, aun con state=invalid.

Impacto obligatorio: emitir el diagnóstico exige inventar un canonical desde el nombre de archivo sin contrato/procedencia, reclasificar el documento como excluded/error para satisfacer el tipo o descartar la página inspeccionada. Ninguna alternativa cumple simultáneamente la autoridad editorial, la política de disposición, la conservación de páginas y el schema cerrado. Los null de fallo temprano no resuelven el caso: el error es semántico después de inspeccionar una página. El parche resolvió esta dificultad para title sin H1, pero no para canonical.

Corrección mínima recomendada: definir explícitamente los valores no disponibles en las páginas de state=invalid, incluido canonicalPath=null para documentos cuyo canonical no pueda obtenerse/validarse, sin cambiar su disposición editorial. Revisar conjuntamente los campos obligatorios del registro para que una página no clasificable o con idioma no observado pueda diagnosticarse sin inventar metadata: puede emplearse un registro diagnóstico reducido o null/estado no determinado únicamente en inventarios inválidos. Mantener tipos estrictos y es/canonical/ID obligatorios en state=valid. Añadir un fixture mínimo de documento con canonical ausente que produzca CANONICAL_INVALID, exit 3 y un inventory inválido conforme a schema. No exige corregir páginas del producto.

## Correcciones verificadas

| Hallazgo anterior | Resultado de r1 y evidencia |
|---|---|
| A01: H1 imposible | **Resuelto.** H1 autorizado incluido, hash y diff fijados en F0:27–29. F0 no puede modificar la página. El requisito title=h1 ya dispone de fuente real en esa herramienta. Build pendiente de implementación. |
| A02: base no publicada | **Resuelto.** SDD/H1 están en el SHA publicado según prueba local y blobs. F0:27 y prompts:15–19 exigen SHA exacto e informe PASS en el issue, sin resolver HEAD móvil. El issue de lanzamiento no puede crearse como listo con este FAIL. |
| A03: fórmula/version ausente | **Resuelto.** Contratos:49 añade scoringRuleId. Contratos:100–102 define su comparación y el fixture SCORING_CHANGED, y permite a compare identificar reglas incompatibles sin recalcularlas. No atribuye ese ID a la versión interna del evaluador. |
| A04: metadata HTTP sin formato | **Resuelto.** Contratos:40–42 define response-metadata.json, esquema cerrado, status/MIME, transporte y procedencia, con hash en manifest. Null en replay refleja la evidencia realmente disponible. |
| A06: request histórico exacto no conservado | **Resuelto.** Contratos:40 fija reconstrucción determinista sin espacios/newline y distingue su hash de los bytes históricos no guardados. requestSource distingue reconstructed/captured. |
| A07: inventario inválido sin envelope | **Parcialmente resuelto.** Contratos:126–136 incluye state/errors, null de fallo temprano, DOCUMENT_TITLE_MISSING y separación semántico/I/O. Manifest hashea el informe. R1-B02 impide representar honestamente un document inspeccionado sin canonical. |
| Cobertura ligada a A01 | **Resuelta contractualmente.** F0:90,126,150 y prompts:58 exigen siete fixtures, incluido selector, y caso sintético sin H1 con DOCUMENT_TITLE_MISSING. El caso no puede sustituir H1 por title del head ni excluir artificialmente el documento. |

Las correcciones no cambian los perfiles, la fórmula aritmética de los scans históricos, los 28 documentos previstos, el ownership de tooling/spike ni la prohibición de efectos externos.

## Normas nuevas revisadas

- **Modelo:** sdd.md:34 y el encabezado de prompts fijan Luna 6 con razonamiento alto, identificadores gpt-6-luna/high. Norma dirigida a implementadores; no cambia el rol de este auditor.
- **Bug y detención:** sdd.md:36–38 define formato, vínculo con issue padre, evidencia sanitizada y fallback local si GitHub no está disponible. Su integración en F0/prompts es explícita; queda pendiente armonizar R1-B01.
- **Auditor independiente:** sdd.md:40 y prompts separan autor y auditor, fijan SHA de entrega e informe por criterios.
- **Cinco auditorías máximas por issue implementador:** cuenta la primera. Un fallo de código puede corregirse si quedan intentos; fallo normativo detiene inmediatamente. Tras FAIL número 5, bug y detención sin nuevas correcciones ni sexta revisión. No hay contradicción en ese contador.
- **PASS solo por bloqueantes:** contratos, criterios obligatorios, ownership, integridad editorial y privacidad; observaciones opcionales no fuerzan ciclos. PASS no autoriza promoción.

El límite de **cinco auditorías de implementación** es distinto del límite solicitado para **esta reauditoría de la SDD**: tras este primer FAIL queda una sola ronda adicional de corrección y reauditoría. Si r2 falla, el coordinador debe detener ajustes y creación de encargos implementadores.

## Observaciones opcionales, sin efecto en el FAIL

Se conserva el informe original sobre proporcionalidad, aplicabilidad y objetivos de nivel 3/4 frente a nivel 5. Esas recomendaciones no se reabren ni se convierten en bloqueantes de esta revisión.

La recomendación de desacoplar medición/spike/F1 también permanece opcional. El único punto obligatorio aquí es que la sesión tenga una instrucción única al detectar una caída externa; no se exige rediseñar las fases.

No se exige añadir conversiones, protocolos o cobertura completa del corpus para superar r1. R1-B02 se limita a poder producir los diagnósticos obligatorios de input inválido sin violar el propio contrato.

## Límites

- Revisión estática local de documentos, diff/H1, hashes y prueba de publicación archivada. No se hicieron lecturas de red, scans, npm, build, tests, workerd, CI, permisos adicionales ni despliegues.
- La vigencia del evaluador el 4/oct y sus condiciones efectivas de nivel 5 no son objeto de r1; siguen no verificadas según el informe original.
- Corregir H1 por inspección no equivale a demostrar su renderizado final: el inventario y fixtures de implementación deben comprobarlo.
- La verificación de publicación confirma coincidencia de bytes con el árbol registrado en la prueba entregada. No establece por sí sola estado de producción ni deploymentCommit.
- No se modificaron specs, código, snapshot ni informe original. La única escritura del auditor es este informe nuevo.
