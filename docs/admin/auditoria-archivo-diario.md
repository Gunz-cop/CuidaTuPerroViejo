# Auditoría independiente · Entrega 1: archivo diario

- **Auditor:** Claude Code. No corrige código.
- **Objeto:** [PR #176](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/176), commits `c0732ac` y `1f0805d`, de Codex.
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO con observaciones.** Nada bloquea el merge, con la migración `0006` aplicada antes. La recuperación histórica sigue necesitando su propia autorización.

## Contra el encargo

| Requisito | Resultado |
|---|---|
| `sampleInterval` por día; «estimado» frente a «sin muestreo indicado» | Cumple. La migración lo exige con un CHECK: `estimated = (sample_interval > 1)`. |
| Margen común de 48 horas para el diario **y el mensual** | Cumple. `ARCHIVE_CLOSE_DELAY_HOURS` y `archiveEligible()` se aplican en `closedMonths()`. Los meses guardados no cambian. |
| Archivado ordinario separado de la recuperación histórica | Cumple. El cron llama a `archiveRecentDays()` (ventana de 7 días elegibles) y a `archive()` (un mes por ejecución). `recoverDays()` no está en el cron. |
| Número de consultas acotado | Cumple: máximo 36 consultas GraphQL por ejecución, documentado. |
| Lotes con detección de truncamiento y coherencia entre horas y total | Cumple. Además, se detectaron con una lectura real diferencias de muestreo entre lotes amplios y días sueltos, y se resolvieron dividiendo y validando sublotes, con test de regresión. Es un buen hallazgo. |
| Día vacío nunca guardado como 0 | Cumple. La migración lo refuerza con `pageviews > 0`. |
| Recuperación idempotente y reanudable | Cumple: `ON CONFLICT DO NOTHING`, un trigger contra sobrescrituras y tests de interrupción y reanudación. |
| Merge sin autorizar la recuperación | Cumple. La ruta de recuperación responde **503** si no existe el secret `AUDIENCE_RECOVERY_TOKEN`, que no está creado. |
| Fallos aislados | Cumple. Si falta `0006`, el archivo mensual sigue funcionando, y al revés. |
| Sin cambios en la interfaz | Cumple |

## Observaciones

1. **Latencia de RUM sin medir.** No hay garantía oficial y la medición a +1, +24 y +48 horas sigue pendiente (hay script y calendario preparados). Las 48 horas son un valor conservador, así que no bloquean. Hay que completar la medición en los próximos días y ajustar la constante si los datos lo indican.
2. **Ruta de recuperación permanente.** `POST /api/admin/audience/recover-days` queda inactiva sin el secret y, cuando se activa, exige credenciales de administrador, el secret propio, una confirmación literal, un motivo, el mismo origen, un cuerpo de 2 KB como máximo y 7 días por petición. Es una superficie pequeña y bien protegida. Al terminar la recuperación hay que borrar el secret, como ya indica el procedimiento.
3. **Activar o borrar el secret publica una versión.** Lo exige el procedimiento antes de ejecutar: comprobar que la última versión subida es la de `main` auditado (que no haya una vista previa más reciente) o aplicar el secret a la versión concreta de `main`. Es el mismo riesgo que publicó la vista previa del PR #170.
4. **Un día real con 0 páginas vistas no se puede archivar** (CHECK `pageviews > 0`) y aparecerá como «Sin datos». Es coherente con «nunca inventar ceros» y muy improbable con el tráfico actual. Basta con documentarlo.
5. **Urgencia.** Mientras no se ejecute la recuperación, el cron solo cubre la ventana reciente y cada día se pierde un día del principio del histórico diario recuperable. Conviene autorizar el procedimiento poco después del merge.

## Antes del merge

1. Aplicar la migración `0006` en producción, con verificación simple y separada.
2. Autorización del propietario.
3. Merge: el cron pasa de `0 8 2 * *` a `0 8 * * *`. Hay que verificar que es el único cron activo.

No verificado por esta auditoría (sin acceso a Cloudflare): ejecución real del cron diario, latencia y comportamiento ante incidencias reales.
