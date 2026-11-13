# Auditoría independiente · Recuperación inicial del histórico mensual

- **Auditor:** Claude Code. No participó en la ejecución y no corrige nada.
- **Objeto:** la operación del 2026-11-12 documentada en `docs/admin/recuperacion-inicial-evidencia.md` y `.json`, ejecutada por Codex según `docs/admin/recuperacion-inicial-procedimiento.md` con los dos ajustes de `docs/admin/auditoria-paises-recuperacion.md`.
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO. Operación cerrada.**

## Contra el procedimiento autorizado

| Requisito | Resultado |
|---|---|
| Autorización explícita del propietario antes de ejecutar | Cumple |
| Comprobación previa: migración 0005, tabla, trigger, bindings y presencia del secret (sin leer su valor) | Cumple, a las 14:26:19 UTC |
| Misma cadena que el cron (`scheduled → archive()`), sin INSERT manuales ni lógica paralela | Cumple. La invocó Cloudflare con el Worker activo. |
| Trigger temporal con más de 30 minutos de margen y conservando `0 8 2 * *` | Cumple: programado a las 14:27:17 para las 14:59 UTC. |
| Retirada obligatoria y verificada | Cumple: retirado a las 14:59:38 UTC. Un GET devolvió solo `0 8 2 * *` y el deployment no cambió. |
| No fusionar el PR #172 durante la ventana del trigger | Cumple: el PR #172 se fusionó después de la retirada. |
| Igualdad estricta en `sqlite_schema`, `d1_migrations` y las filas previas de `audience_months` | Cumple. El estado previo estaba vacío; solo se añadieron 6 filas. |
| Tablas vivas registradas solo como información | Cumple. Ningún recuento descendió. |
| Sin duplicados, sin recálculos y metadatos coherentes | Cumple: `updated_at` y `update_reason` en NULL, y origen, filtro, zona, versión e intervalos verificados. |
| Sin cifras de audiencia, identificadores ni secret en el repositorio | Cumple |

## Resultado

- 2026-05: **parcial**, 19 días (del 13 al 31). El plan preveía 20 porque partía de una instantánea anterior. La retención avanzó durante el día y la evidencia lo explica con las mismas funciones de producción. Es el comportamiento esperado.
- De 2026-06 a 2026-10: **completos**.
- Los 6 meses están marcados como **estimados**, lo que es coherente con datos de más de 7 días.
- Noviembre sigue abierto; lo archivará el cron.

## Verificación propia

Sin acceso a Cloudflare ni a D1, revisé la coherencia interna de la evidencia: las horas, el orden de las operaciones, la cobertura y los invariantes. Comprobé además en producción que `/` responde 200 y `/admin` responde 401.

## Nota de proceso

El PR #173 (orden descendente de los meses) se fusionó sin auditoría previa, por decisión del propietario, al tratarse de un cambio de una línea solo de presentación. Lo revisé después y es correcto. Este caso dio origen a la «vía exprés» que se propone en `docs/metodologia-agentes.md`.
