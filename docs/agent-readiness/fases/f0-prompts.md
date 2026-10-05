# Lanzamiento de F0

Estos prompts delegan implementación y verificación a sesiones distintas. No es necesario fusionar los PR previos para leerlos. La base de reanudación incluye los dos ajustes de producto autorizados en §2 de F0: H1 del selector y canonical de la home. El ejecutor abre un PR apilado contra la rama fijada en el issue. Implementación: Luna 6 con razonamiento alto (`gpt-6-luna`, `high`).

## Sesión implementadora

```text
Rol: implementador de F0 del programa agent-readiness de Gunz-cop/CuidaTuPerroViejo.
El coordinador conserva las decisiones de arquitectura y las siguientes specs.

Lee AGENTS.md, docs/agent-readiness/README.md y:
- docs/agent-readiness/fases/f0-medicion-y-contratos.md
- docs/agent-readiness/fases/f0-contratos.md

Lee el issue de lanzamiento: exige el SHA completo publicado y el informe PASS
sobre esa versión. Trae ese SHA exacto y regístralo como base de arranque.
Confirma que contiene ambos documentos F0; compara contra
cdb0adece5d629f6b2473be7ea6e30c0b372ef1c: solo docs/agent-readiness/
y los ajustes H1 y canonical, con los diffs y hashes exactos fijados en §2 de F0.
Otro cambio de producto bloquea el trabajo. Lee también el registro de reanudación
fases/f0-reanudacion-2026-10-05.md; no modifiques esos archivos de producto.

Crea agent-ready/f0-medicion desde esa base. Si reanudas la misma sesión, conserva
el trabajo previo y adopta deliberadamente la nueva base, sin reset/stash ni
sobrescribir trabajo ajeno. El coordinador fija el procedimiento en el issue.
El PR se dirige a docs/f0-reanudacion-canonical mientras su integración siga abierta.
Mantén el spike en otro worktree/rama agent-ready/f0-spike, desde la misma base.

Implementa T0.1-T0.4 y reproduce P1-P4 de la spec. Respeta ownership:
el diff permanente solo contiene tooling, tests, evidencia, dos devDependencies
directas fijadas y dos pasos offline de CI. Los cambios de runtime solo viven
en el spike y se entregan como patch reproducible.

Ejecuta los criterios C01-C12. Guarda JSON originales, requests, hashes,
inventario, fixtures y manifest de paridad. No confundas el commit inspeccionado
con el deploymentCommit; sin prueba independiente este último es null.
Completa las cinco decisiones propuestas y los límites no verificados.

Entrega PR con base/head SHA, commits, criterios, evidencia y rollback.
No despliegues, no fusiones a main, no actives Assistant V2 ni indexación.
Ante un contrato insuficiente, un bloqueo de entorno/dependencias o una
contradicción, DETENTE y crea un issue «[SDD bug] ...» con el formato de sdd.md,
enlazado al issue implementador. No inventes ni cambies la SDD para terminar.
Al entregar un SHA, lanza una sesión independiente de auditoría con el prompt
verificador y los criterios aplicables del issue. Numera el intento desde 1.
Corrige solo bloqueantes de código y audita cada nuevo SHA, máximo 5 auditorías
por issue contando la primera. Tras el quinto FAIL, crea el bug de SDD y
DETENTE sin sexta revisión. PASS exige cero bloqueantes y evidencia completa;
una autoevaluación o ejecución de tests no sustituye la sesión independiente.
```

## Sesión verificadora

```text
Rol: verificador independiente de F0 en Gunz-cop/CuidaTuPerroViejo.
Lee AGENTS.md, README del programa y los dos documentos normativos F0.

Trabaja en un worktree independiente sobre el SHA de entrega indicado por
el implementador, no sobre una rama que pueda moverse. Comprueba su base exacta
y que el diff permanente respeta ownership. No corrijas código ni specs.

Reproduce C01-C12: replay offline 43/20/19, casos de comparación inválida,
validación de raw/hashes, inventario completo y paridad de los siete fixtures y el caso negativo sin H1.
Comprueba las mediciones live entregadas y repite solo lo necesario si quedan
incertidumbres nuevas; no hagas scans repetidos por rutina.

Aplica spike.patch en otro worktree sobre el baseCommit declarado, sin secrets
ni bindings remotos. Repite las pruebas de workerd/build/caché y verifica los
cinco resultados propuestos. No atribuyas a CDN lo demostrado solo localmente.
No uses .env de otra sesión, ni endpoints del sitio con coste/escritura.

Entrega docs/agent-readiness/evidencia/f0/verificacion.md como informe separado,
con base/head/spike SHA, resultado por C01-C12, comandos y límites.
Clasifica cada resultado como verificado, fallo, diferencia aceptable con motivo
o no verificado. Devuelve fallos de código al implementador y de contrato al
coordinador. No declares aceptada una fase con un criterio obligatorio pendiente.
Dictamina PASS/FAIL por bloqueantes: incumplimiento de criterio obligatorio,
contrato, ownership, pérdida editorial o privacidad; no bloquees por preferencias
opcionales. Registra número de intento (1–5) y SHA auditado. No corrijas.
Un hueco normativo produce bug de SDD y detención inmediata del implementador;
un fallo de código puede corregirse dentro del límite de intentos.
```

## Cierre del coordinador

Revisar el informe contra la entrega y ratificar o corregir las cinco decisiones propuestas. Actualizar el estado de F0 en su spec, enlazar evidencia/commits y concretar F1/F2 sobre los resultados verificados. La promoción del tooling se trata por separado de la publicación de una capacidad del sitio.
