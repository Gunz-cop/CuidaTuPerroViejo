# Revisión independiente de precondiciones para reanudar F0

Fecha: 2026-10-05. **Intento 1 de revisión acotada de reanudación.**

**Dictamen: PASS. Lista de bloqueantes: [].**

Versión local auditada: **e3836f20f23572b09994bb08b50c920eb11354f1**.  
Versión publicada equivalente: **4dced4155788af926ef7b4e3d2d7e8259e1978be**.  
Tree auditado: **7ebd8fe70ec4555d94ecac091e9589dacf1ca3f0**.  
Padre: **307ebffb73dd4f68d64f4ccda851e15a876a0455**.  
Worktree: /workspace/ctpv-reanudacion-f0, limpio.

Las instrucciones permiten adoptar deliberadamente la base que contiene H1 y fix de canonical, sin ceder al implementador F0 ownership de esos archivos. La nueva base/destino, la conservación del trabajo previo y las puertas de comprobación son coherentes. **El PASS de esta revisión no reanuda por sí mismo F0.** La versión publicada equivalente ya está comprobada; aún corresponde fijar su SHA exacto y este informe en #43 y autorizar expresamente por el coordinador.

## Comprobación Git y alcance

git rev-parse y git show confirman SHA, tree y padre indicados. git status --short está vacío y git diff --check termina sin errores.

El diff frente al padre cambia únicamente cinco archivos documentales:

- docs/agent-readiness/README.md.
- docs/agent-readiness/plan.md.
- docs/agent-readiness/fases/f0-medicion-y-contratos.md.
- docs/agent-readiness/fases/f0-prompts.md.
- Nuevo docs/agent-readiness/fases/f0-reanudacion-2026-10-05.md.

No hay diferencias de producto frente a 307ebff…, cuyo fix fue auditado con PASS en #45. Desde la base original cdb0adece5d629f6b2473be7ea6e30c0b372ef1c solo difieren dos archivos de producto: el selector H1 y BaseLayout.astro; los restantes cambios son documentación agent-readiness.

| Archivo | SHA-256 observado | Blob Git observado |
|---|---|---|
| src/layouts/BaseLayout.astro | dd86228f856240d3e05e4e0a09f6b17d58b4c292fd796c229c539d7a88df1a86 | 68990f06839225674cc7fc698c9879bea927e600 |
| src/pages/herramientas/selector-movilidad-perros-mayores.astro | 8c11028f8a8afc50fce0a7df19b0236421eb68191d5e16eedeedc29d05c0767a | 196c066140bfdb25654eccccf9be6775c82a4de6 |

Ambos hashes coinciden con §2 actualizado. El layout es el mismo blob ya auditado en #45. El hash del selector conserva la corrección autorizada previamente. Esta revisión no reaudita sus implementaciones ni amplía el alcance de producto.

## Coherencia de la reanudación

| Punto | Evidencia y resultado |
|---|---|
| Autoridad del ajuste | El registro nuevo declara una decisión de precondiciones/base tras una corrección separada autorizada. §2 incorpora las dos excepciones exactas y enlaza ese registro. No modifica contratos ni criterios. |
| SHA fijo | §2 exige commit publicado y auditado fijado en el issue; no se permite tomar un HEAD móvil ni utilizar el fix con la SDD antigua. |
| Destino PR | Tabla de §2, prompt y registro coinciden en docs/f0-reanudacion-canonical. docs/agent-readiness-plan queda como rama documental histórica de la cadena, no como destino vigente de F0. |
| Cadena de integración | Si una rama se integra o cambia, solo el coordinador fija nueva base/destino. No hay merge ni deploy implícitos. |
| Trabajo previo | Prompt y registro exigen conservarlo sin reset, stash, borrar untracked o sobrescribir trabajo ajeno. Fast-forward solo si existe ancestría y Git no sobrescribe el trabajo; en caso contrario STOP y transferencia acordada. |
| Ancestría | La base anterior 6a1a317fe4d27154bff2a29ce12e2cdd74987315 es ancestro de e3836f20…. Esto permite estudiar fast-forward; no prueba aún que el worktree del implementador pueda avanzarse sin conflicto. |
| Ownership | H1 y canonical deben llegar ya incluidos en la base. §2 dice expresamente que esas correcciones no conceden ownership a F0; no autoriza cambiarlas durante tooling o spike. |
| Verificación antes del spike | El registro, paso 4, exige build explícito e inventario nuevo con home / y 28 documentos justificados. Un nuevo error de base produce bug y STOP; el diagnóstico provisional anterior no cuenta como aceptación. |
| Evidencia final | Mantiene tooling comprometido y checkout limpio, outputs fuera del repo, evidencia en commit separado y deploymentCommit=null sin prueba independiente. |

El mandato de preparar una nueva base no obliga a declarar correcto el inventario antes de ejecutarlo. Su éxito sigue siendo una comprobación real obligatoria después de la publicación y autorización.

## Contratos y gobierno conservados

Se verificó identidad de f0-contratos.md y arquitectura.md frente al padre publicado. El diff de cinco archivos deja las mediciones originales, informes anteriores y sdd.md intactos. La sección de aceptación C01–C12 y el resto de F0 desde esa sección hasta el final coinciden exactamente con el padre.

Permanecen vigentes Luna 6 con razonamiento alto para F0, auditor independiente sobre SHA fijo, bug y STOP ante hueco normativo/entorno/base, máximo cinco auditorías de implementación por issue contando la primera y detención después del quinto FAIL sin sexto intento. El registro mantiene separados los contadores:

- Auditoría de SDD original: r2 PASS conservado.
- Fix #45: PASS independiente, intento 1/5.
- Implementación de F0: **0/5**; no se acepta ningún criterio por esta revisión.
- Revisión de nuevas precondiciones: este intento 1. No reinicia ni reabre los ciclos anteriores.

El reporte del fix conserva el límite de su build local interrumpido y la evidencia de CI. El registro nuevo no lo presenta como una ejecución local adicional del auditor ni como prueba de producción.

## Publicación equivalente verificada dentro del mismo intento

El coordinador publicó la revisión en docs/f0-reanudacion-canonical. GET independiente de GitHub Git commit confirma:

- SHA publicado: 4dced4155788af926ef7b4e3d2d7e8259e1978be.
- Tree: 7ebd8fe70ec4555d94ecac091e9589dacf1ca3f0, idéntico al auditado localmente.
- Padre inmediato: 631dd0c198d1fb7b69038453addeba23411ad2c9.

El padre inmediato difiere del commit local porque Contents API publicó un commit por archivo. No se afirma identidad de historia inmediata. Una comparación independiente por API entre 307ebff… y 4dced415… confirma status=ahead, ahead_by=5, behind_by=0 y merge-base=307ebff…. Los únicos cinco archivos cambiados son exactamente los documentales revisados.

La publicación conserva así el producto y los bytes normativos del árbol auditado, y desciende del fix aprobado. La diferente serialización de commits no requiere otra revisión normativa. La ancestría necesaria existe; la seguridad del avance frente al trabajo local aún debe comprobarse en el worktree implementador antes de ejecutarlo.

Esta incorporación de evidencia de publicación corresponde al mismo intento 1, no a otra auditoría ni corrección.

## Límites y condiciones operativas

No se ejecutaron build, inventario, scans, requests de producto, Wrangler, permisos ampliados ni deploy. Solo se hicieron lecturas Git/docs y GETs de metadata GitHub para comprobar la publicación. No se modificaron código, SDD, ramas, worktrees o issues. La única escritura es este informe.

La actualización de #43 con la base publicada, los enlaces y la autorización corresponde al coordinador; no fue comprobada ni ejecutada por el auditor. No debe reanudarse mediante el SHA local ni por inferencia del PASS.

La adopción concreta del worktree con trabajo previo, el build de la nueva base y el inventario de 28 documentos siguen pendientes de ejecución. El auditor no autoriza reanudar ni cerrar issues: corresponde al coordinador tras fijar en #43 la versión aprobada 4dced4155788af926ef7b4e3d2d7e8259e1978be.
