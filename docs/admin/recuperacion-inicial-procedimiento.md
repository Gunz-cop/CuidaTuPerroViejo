# Recuperación inicial: procedimiento para aprobación

**Procedimiento operativo: requiere autorización para cada ejecución.** El
propietario autorizó la recuperación del 2026-11-12 con los dos ajustes de
[auditoría](auditoria-paises-recuperacion.md). Se ejecutó y se retiró el trigger
temporal antes de continuar con el PR #172; ver
[evidencia de ejecución](recuperacion-inicial-evidencia.md). El cron mensual
permanece como respaldo. Este documento no autoriza repetir la operación.

## 1. Requisitos comprobados por lectura

Comprobación del 2026-11-12, aproximadamente 05:27 UTC, mediante el conector
Cloudflare. No se ejecutó `archive()`, ninguna mutación D1 ni ningún cambio remoto.

- D1, una consulta simple por comprobación: `0005_audience_months.sql` está
  registrada; existen `audience_months` y `audience_months_explicit_update`.
  La definición de la tabla conserva `PRIMARY KEY (period, query_version)` y
  el trigger exige fecha y motivo para UPDATE. La lectura de metadatos devuelve
  todavía cero meses archivados.
- Deployments y Workers Builds: el Worker activo procede de `main`, build
  correcto y 100 % del tráfico. Schedules conserva `0 8 2 * *`.
- Settings del Worker activo, devolviendo **solo nombres y tipos** de bindings:
  CONTACT_DB (`d1`), CONTACT_KV (`kv_namespace`), CF_ANALYTICS_TOKEN
  (`secret_text`), CF_ANALYTICS_ACCOUNT_ID y CF_ANALYTICS_SITE_TAG (`plain_text`).
  No se leyó ni se intentará extraer el valor del secret. Su presencia no prueba
  por sí sola sus permisos efectivos; el handler hará las consultas con ese token.
- GraphQL del conector: `settings.rumPageloadEventsAdaptiveGroups` devuelve
  enabled=true, **notOlderThan=15897600 segundos (184 días)** y
  maxDuration=8035200 segundos (93 días). Esta consulta usa la conexión del
  conector, no extrae el token del Worker.

Consultas simples para repetir las comprobaciones D1 antes de actuar:

```sql
SELECT name FROM d1_migrations WHERE name = '0005_audience_months.sql';
```

```sql
SELECT name, sql FROM sqlite_schema WHERE type = 'table' AND name = 'audience_months';
```

```sql
SELECT name, sql FROM sqlite_schema WHERE type = 'trigger' AND name = 'audience_months_explicit_update';
```

```sql
SELECT COUNT(*) AS n FROM audience_months;
```

Si faltan objetos, bindings, permisos o cambia la versión activa mientras se
prepara la ejecución, detenerse e informar. No volver a aplicar migraciones ni
crear secretos dentro de este procedimiento.

## 2. Meses y cobertura: instantánea, no fechas fijadas

Cálculo realizado con **las funciones existentes** `closedMonths()` y
`coveredMonth()` de `src/lib/admin/audience.ts`, sin invocar `archive()`.
Referencia exacta: **2026-11-12T05:27:42.672Z**. El límite de retención era
2026-05-12T05:27:42.672Z; se excluyen los días locales que estén cortados.
Intervalos UTC semiabiertos, inicio incluido y fin excluido, en Costa Rica:

| Mes local | Estado previsto | Días completos cubiertos | Inicio UTC | Fin UTC |
| --- | --- | ---: | --- | --- |
| 2026-05 | parcial | 20 (12–31 mayo) | 2026-05-12 06:00 | 2026-06-01 06:00 |
| 2026-06 | completo | 30 | 2026-06-01 06:00 | 2026-07-01 06:00 |
| 2026-07 | completo | 31 | 2026-07-01 06:00 | 2026-08-01 06:00 |
| 2026-08 | completo | 31 | 2026-08-01 06:00 | 2026-09-01 06:00 |
| 2026-09 | completo | 30 | 2026-09-01 06:00 | 2026-10-01 06:00 |
| 2026-10 | completo | 31 | 2026-10-01 06:00 | 2026-11-01 06:00 |

Noviembre está abierto y no se archiva. Las ventanas caben dentro de maxDuration.
La cobertura describe días consultables, no garantiza actividad ni entrega de
beacons en cada día. Un agregado vacío no se convierte en cero: el mes falla y
queda pendiente según el código existente.

**Recalcular inmediatamente antes de ejecutar y al comprobar el resultado.**
La retención avanza continuamente: cuando corte otro día local, ese día ya no
entrará en el primer mes. El propio `archive()` recalcula el límite durante la
recuperación; no debe recibir las fechas fijas de esta tabla. Si pasan días hasta
la autorización, cambiarán cobertura y posiblemente meses disponibles.

## 3. Vía de ejecución recomendada con el acceso actual

La cadena debe ser exactamente la de producción:

`Cron Trigger → scheduled(controller, env) → archive(env, new Date(controller.scheduledTime))`

Son `src/worker.ts` y `src/lib/admin/audience-archive.ts`, ya desplegados en main.
No copiar las consultas ni los INSERT en otro script, no usar SQL manual para
fabricar resúmenes y no volver a implementar el bucle de meses.

| Vía | Ventajas | Inconvenientes / acceso actual |
| --- | --- | --- |
| Disparo inmediato directo de scheduled | Mismo código y bindings, sin endpoint nuevo. | El OpenAPI disponible solo expone GET/PUT de schedules; no hay un endpoint de invocación puntual documentado en este acceso. No fingir que la ruta local invoca producción. |
| **Cron temporal con fecha UTC concreta, por el conector (recomendada)** | Invoca el handler real con sus bindings y secret existentes. No publica código ni añade funciones o rutas. Se puede realizar con el acceso del conector, previa autorización expresa. | Cambia temporalmente la configuración de schedules. Hay propagación de hasta 15 minutos, requiere esperar, observar y retirar la expresión temporal. Cron no admite año: sin retirada volvería a ejecutarse el año siguiente. |
| `wrangler dev --remote --test-scheduled` | Podría reutilizar código y recursos remotos si la combinación fuera compatible. | No hay token de CLI. Remote dev sube código a una preview y utiliza bindings remotos; no equivale a invocar la versión activa. No se ha verificado esa combinación de flags en el proyecto; la prueba local existente no la acredita. No recomendada. |
| Acción temporal protegida por requireAdmin | Control explícito mediante POST autenticado y llamada directa a archive(). | Requiere otro PR, tests de autenticación/método/origen, auditoría, despliegue y retirada posterior. No está implementada en este PR; añade superficie y necesita una sesión administrativa autenticada. Alternativa si no se autoriza cambiar schedules. |

El PUT requiere permisos de escritura de Workers Scripts (o un rol equivalente).
Las lecturas realizadas no prueban ese permiso: no se ha intentado ningún PUT en
esta preparación. Si la conexión lo deniega al ejecutar el plan aprobado, detenerse
e informar; no sustituirlo por otra vía ni solicitar el valor del token de RUM.

### Secuencia del cron temporal (ejecución del 2026-11-12 documentada)

1. No fusionar el PR #172 ni publicar código durante la ventana del temporal:
   `wrangler deploy` restablece los schedules de wrangler.jsonc y podría retirarlo
   antes del disparo. Primero programar, ejecutar, retirar y verificar la recuperación;
   solo después continuar con el merge de países.
   Con autorización del propietario, repetir los requisitos y snapshots del
   apartado 4. Leer y conservar la lista actual de schedules. Si hay cambios no
   previstos respecto al cron mensual, detenerse antes de escribir.
2. Acordar y registrar una fecha UTC **al menos 30 minutos en el futuro**, para
   dejar margen a la propagación. Construir la expresión con minuto, hora, día y
   mes concretos; día de semana `*`. Evitar que coincida con el cron mensual.
3. Mediante el conector, PUT de `/accounts/{account}/workers/scripts/{worker}/schedules`
   con el array de expresiones actuales más la temporal. El cuerpo es un array
   de objetos `{ "cron": "..." }`, no un objeto con propiedad schedules.
   Conservar `0 8 2 * *`. GET inmediato para verificar el resultado y comprobar
   que no cambió el deployment activo. No usar el panel ni Add variable and deploy.
4. Esperar a la hora acordada y observar Workers Logs si están disponibles:
   `audience_archive` contiene inserted/failures, sin totales. La comprobación
   definitiva será D1; un outcome exitoso del handler no demuestra por sí solo
   que se hayan archivado todos los meses, porque scheduled captura los errores.
   No invocar de nuevo ni cambiar la hora a ciegas si tarda.
5. En un bloque de limpieza **también si falla la recuperación**, retirar solo
   nuestra expresión temporal, conservando todas las demás. Volver a leer la
   lista justo antes para no sobrescribir cambios concurrentes. Verificar con
   GET que solo permanece el cron esperado y que el deployment no cambió.
   Si no se puede retirar, detenerse y comunicar explícitamente qué trigger
   queda pendiente de retirar; no declarar terminada la operación.
6. Hacer la verificación final del apartado 5. Si transcurren 15 minutos desde
   la hora prevista sin resultado concluyente, retirar el temporal e informar;
   no programar automáticamente otro intento. El cron mensual queda como respaldo.

Fuentes consultadas: [Cron Triggers y propagación](https://developers.cloudflare.com/workers/configuration/cron-triggers/),
[handler scheduled](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/),
[remote dev](https://developers.cloudflare.com/workers/local-development/).
El OpenAPI del conector confirma GET/PUT y el formato del array de schedules.

## 4. Integridad y snapshots antes/después

El cron ya hace SELECT de los meses guardados y los omite. La clave única por
periodo/versión y `ON CONFLICT(period,query_version) DO NOTHING` cubren duplicados
incluso si hay ejecuciones concurrentes. El trigger exige updated_at y motivo
para UPDATE. Esta operación no recalcula: `archive()` no ejecuta UPDATE ni DELETE.
Incluso un parcial guardado permanece igual. No se cambia VERSION (`rum-v1`).

Antes y después de la ejecución autorizada, **una llamada de lectura por consulta**,
sin unirlas con UNION ALL. Los recuentos privados se conservan fuera del repo;
la evidencia pública solo indica si coinciden:

```sql
SELECT COUNT(*) AS n FROM affiliate_clicks_daily;
```
```sql
SELECT COUNT(*) AS n FROM assistant_clicks;
```
```sql
SELECT COUNT(*) AS n FROM assistant_interactions;
```
```sql
SELECT COUNT(*) AS n FROM contact_messages;
```
```sql
SELECT COUNT(*) AS n FROM feedback_counts;
```
```sql
SELECT COUNT(*) AS n FROM feedback_votes;
```
```sql
SELECT COUNT(*) AS n FROM d1_migrations;
```
```sql
SELECT COUNT(*) AS n FROM audience_months;
```

Leer también `sqlite_schema` antes/después y comprobar que no cambia. No consultar
la tabla interna protegida `_cf_KV`; no es una tabla de aplicación. A diferencia
de aplicar una migración, esta recuperación tampoco modifica d1_migrations.
Guardar fuera del repo el snapshot de filas ya archivadas (`SELECT * FROM
audience_months ORDER BY period, query_version`) y comparar íntegramente esas filas
al terminar, sin publicar su report_json. Los meses nuevos son las únicas filas
que pueden añadirse. El código solo escribe en audience_months.

El sitio sigue atendiendo tráfico: los recuentos de las seis tablas vivas son
**informativos**. Registrar antes y después sin exigir igualdad; aceptar aumentos
coherentes con el tráfico y detenerse ante descensos o cambios de esquema. No
atribuir un cambio automáticamente a archive(), no compensarlo con escrituras y
no borrar actividad legítima para igualar un snapshot.

La igualdad **estricta** se exige solo para el snapshot completo de sqlite_schema,
las filas de d1_migrations y las filas ya existentes de audience_months. Las filas
nuevas de audiencia son el resultado esperado de la recuperación.

## 5. Resultado, verificación y fallos

Cada consulta siguiente se ejecutará por separado y solo por lectura:

```sql
SELECT period, query_version, timezone, completeness, covered_days,
       sample_interval, estimated, fetched_at, covered_start_utc, covered_end_utc,
       source, filter_json, updated_at, update_reason
FROM audience_months ORDER BY period, query_version;
```
```sql
SELECT period, query_version, COUNT(*) AS n
FROM audience_months GROUP BY period, query_version HAVING COUNT(*) > 1;
```

Comprobar estados y días contra la retención efectiva; source=cloudflare_rum,
zona America/Costa_Rica, filtro bot=0 y hosts públicos, query_version=rum-v1,
intervalos UTC y fetched_at coherentes, estimated acorde con sample_interval. Los meses previos
deben ser idénticos a su snapshot. No publicar visitas, páginas vistas, tops,
report_json ni otros totales reales en el repo; sí meses, estado, días cubiertos,
estimación y hora de consulta, omitiendo identificadores de cuenta/sitio.

- Si falla un mes, conservar los éxitos. Queda pendiente para el cron mensual
  mientras Cloudflare lo retenga. No reintentar a ciegas ni guardar ceros.
- Si falla una lectura de verificación, cambia el esquema o d1_migrations, una
  fila previa, desciende un recuento vivo, cambia el deployment o la configuración esperada, **detenerse e informar**. No borrar,
  sobrescribir ni declarar éxito. La limpieza del trigger temporal sigue siendo
  obligatoria y se reportará por separado si no puede completarse.
- La evidencia final incluirá resultado por mes, verificaciones de invariantes,
  logs disponibles, horarios del trigger temporal y confirmación de su retirada.
  Nunca el secret ni cifras absolutas de audiencia.

La aprobación de los nombres de países sigue siendo independiente de la
autorización operativa de recuperación. La ejecución del 2026-11-12 fue autorizada
por separado y no habilita repeticiones automáticas ni cambios adicionales.
