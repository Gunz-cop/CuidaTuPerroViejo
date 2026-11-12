# Recuperación inicial · Evidencia del 2026-11-12

**Recuperación completada y trigger temporal retirado antes de continuar con el
PR #172.** Autorización explícita del propietario para el procedimiento y los dos
ajustes de `auditoria-paises-recuperacion.md`. No se publicó código ni se fusionó
el PR de países durante la ventana del temporal.

## Ejecución en producción

- Preflight D1: 14:26:19 UTC. Migración 0005, tabla, trigger y bindings comprobados;
  solo se comprobó la presencia del secret. Retención real: 15897600 s (184 días),
  maxDuration: 8035200 s. No había meses guardados.
- Snapshot privado de datos y recuentos, con una consulta por tabla. Se guardó
  también sqlite_schema completo antes de la ejecución. Los snapshots privados
  permanecen fuera del repositorio; no se publican totales de audiencia.
- Configuración del temporal: **14:27:17 UTC**, expresión `59 14 12 11 *`.
  Se conservó `0 8 2 * *`. Hora programada: **14:59 UTC** (08:59 Costa Rica).
  El margen superó los 30 minutos previstos.
- Se vigiló la identidad del deployment y los schedules durante la espera.
  El deployment de main permaneció sin cambios. No se ejecutaron INSERT manuales
  ni lógica paralela: Cloudflare invocó `scheduled → archive()` con los bindings
  y el secret del Worker activo.
- Primera observación de los seis meses: **14:59:29 UTC**.
- **Retirada confirmada: 14:59:38 UTC.** GET devolvió exclusivamente `0 8 2 * *`;
  el deployment seguía siendo el mismo.
- Workers Logs, consultado a las 15:01:09 UTC con el servicio del Worker y la
  ventana de ejecución: evento `audience_archive`, con mayo–octubre en inserted.
  No hubo meses fallidos. La verificación definitiva es la lectura de D1.

## Meses guardados

Todos conservan source `cloudflare_rum`, versión `rum-v1`, zona
`America/Costa_Rica`, filtro bot=0 y los hosts públicos. Todos llevan señal de
muestreo y marca **estimado**. `updated_at` y `update_reason` siguen en NULL:
no fue un recálculo. Intervalos UTC semiabiertos, fin excluido.

| Periodo local | Completitud | Días cubiertos | Inicio cubierto UTC | Fin cubierto UTC | fetched_at UTC |
| --- | --- | ---: | --- | --- | --- |
| 2026-05 | parcial | 19 | 13 mayo 06:00 | 1 junio 06:00 | 14:59:07.292 |
| 2026-06 | completo | 30 | 1 junio 06:00 | 1 julio 06:00 | 14:59:10.435 |
| 2026-07 | completo | 31 | 1 julio 06:00 | 1 agosto 06:00 | 14:59:12.762 |
| 2026-08 | completo | 31 | 1 agosto 06:00 | 1 septiembre 06:00 | 14:59:15.301 |
| 2026-09 | completo | 30 | 1 septiembre 06:00 | 1 octubre 06:00 | 14:59:17.722 |
| 2026-10 | completo | 31 | 1 octubre 06:00 | 1 noviembre 06:00 | 14:59:20.348 |

Los fetched_at son del 12 de noviembre de 2026. Mayo cubre el 13–31, no el 12–31
que figuraba en la instantánea inicial del plan: la retención avanzó durante el
día. Se verificó la cobertura con las mismas funciones de producción, usando la
hora programada y el notOlderThan observado.

Noviembre sigue abierto y no se archivó. No quedan meses cerrados recuperables
pendientes en esta comprobación. El cron mensual continuará con noviembre cuando
cierre. No se volvió a disparar el handler para probar idempotencia ni se hicieron
reintentos: la operación terminó con los seis meses disponibles.

## Integridad y ajuste de auditoría

Verificación final: **15:00:30 UTC**, consultas simples separadas, sin UNION ALL.

- **Igualdad estricta:** sqlite_schema completo sin cambios; d1_migrations sin
  cambios; filas previas de audience_months conservadas. El snapshot previo de
  audiencia estaba vacío; las únicas filas añadidas son los seis meses nuevos.
- **Tablas vivas, informativas:** se registraron antes y después
  affiliate_clicks_daily, assistant_interactions, assistant_clicks, contact_messages,
  feedback_counts y feedback_votes. Ningún recuento descendió; en esta ventana
  todos resultaron iguales. No se exigió igualdad como condición del tráfico vivo.
- Sin duplicados por periodo/versión. Se verificaron origen, filtro, zona, versión,
  límites UTC, covered_days, completeness, estimated frente a sample_interval,
  fetched_at y ausencia de recálculo. No se detectaron discrepancias.
- La retirada del temporal y la estabilidad del deployment quedaron confirmadas
  antes de publicar cambios o continuar con el PR #172.

Datos técnicos saneados en
[recuperacion-inicial-evidencia.json](recuperacion-inicial-evidencia.json).
No contiene visitas, páginas vistas, rankings reales, recuentos privados de tablas,
identificadores de Cloudflare ni el secret.

## Límites de la evidencia

Se verificaron D1, schedules, deployment y Workers Logs mediante el conector. No
se inspeccionó la pantalla privada de /admin con credenciales de producción en
esta operación. La revisión visual de países queda separada; sus pruebas de
workerd y capturas sintéticas pertenecen al PR #172. No se afirma una segunda
prueba de idempotencia en producción: esa protección se conserva en el código,
la clave única, el INSERT con ON CONFLICT DO NOTHING y los tests ya auditados.
