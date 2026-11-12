# Metodología de trabajo entre agentes

Aprobada por el propietario el 2026-11-12. Se aplica a cualquier cambio de código, configuración u operación en producción de este repositorio.

## Roles

- **Propietario:** decide el alcance, autoriza las implementaciones, los merges y las operaciones en producción, y revisa el resultado visible.
- **Codex** (u otro agente implementador): investiga, implementa, ejecuta las operaciones autorizadas y entrega evidencias.
- **Claude Code** (auditor y consultor): audita, aconseja y redacta los encargos. No corrige código; solo escribe documentación de auditoría y de proceso, y `TODO.md`.
- **Quien implementa no audita y quien audita no corrige.**
- Las autorizaciones son independientes: autorizar una implementación no autoriza su merge, y autorizar un merge no autoriza operaciones en producción.

## Vía normal (por defecto)

1. Encargo escrito y autorizado por el propietario.
2. Rama propia y PR. Nunca se trabaja directamente sobre `main`.
3. Evidencias: build, tests y capturas cuando haya interfaz, más lo que no se pudo verificar.
4. Auditoría independiente, documentada en `docs/`.
5. Autorización explícita del merge por parte del propietario.
6. Merge, que en este repositorio **despliega**.
7. Verificación en producción.

## Vía exprés (excepción documentada)

Es una excepción a la auditoría previa. Solo se usa si se cumplen **todas** estas condiciones:

- El cambio es **solo de presentación**: orden, textos, estilos o etiquetas.
- Son pocas líneas y el propietario entiende el cambio completo.
- No toca datos, consultas, D1, migraciones, cron, `wrangler.jsonc`, secrets, autenticación, dependencias, rutas ni seguridad.

Flujo:

1. **PR obligatorio**, con «vía exprés» en el título y el motivo en la descripción.
2. **Checks automáticos correctos** antes del merge.
3. **Autorización explícita** del propietario.
4. Merge y **verificación en producción**. Si algo falla, se revierte el PR.
5. **Auditoría posterior** de Claude Code en la siguiente sesión, que queda registrada. Si encuentra un problema, se corrige por la vía normal.

**En caso de duda, vía normal.**

## Nunca por la vía exprés

- Migraciones y escrituras en D1.
- Cambios de cron o de configuración.
- Secrets y tokens.
- Operaciones en producción, como recuperaciones o triggers temporales. Estas necesitan siempre un **procedimiento escrito y auditado** y una autorización específica antes de ejecutarse. Que se autorice el merge del código que las permite no autoriza su ejecución.

## Reglas operativas

- Fusionar en `main` despliega. Las dependencias (migraciones y secrets) se aplican **antes** del merge.
- En el panel de Cloudflare, usar **«⌄ → Save»**, nunca «Add variable and deploy»: este último publica la última versión subida, aunque sea una vista previa.
- No fusionar ni desplegar mientras haya un trigger temporal activo.
- Si algo no cuadra, detenerse e informar, sin reintentar a ciegas.
- No publicar en el repositorio cifras absolutas de audiencia, identificadores privados ni secrets.

## Antecedentes

- El PR #173 (una línea de orden, fusionado por decisión del propietario y revisado después) dio origen a la vía exprés.
- La publicación accidental de una vista previa desde el panel originó la regla de «Save». Está detallada en `docs/admin/audiencia-fase-2.md`.
