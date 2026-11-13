# B1 · Pasada en seco del archivo diario de audiencia

**Solo lectura, sin recuperación ni cambios de criterio.** Datos consultados el
12 de noviembre de 2026, desde `main` `51ebd22ad1678275e5d4aa8b13f380262c529b6f`.
Los pasos de migración, merge y despliegue del PR #176 quedan cerrados conforme
al mensaje del propietario y la comprobación independiente de Claude.

Resultado de esta lectura: **170 días coinciden, 13 están vacíos y uno está fuera
de retención; cero días difieren y cero presentan error**. Entre los días con
datos, 162 tienen `sampleInterval > 1` y ocho tienen `sampleInterval = 1`.
Las diferencias relativas de visitas y páginas vistas son cero en todos los
170 días con datos. No se observó una diferencia no nula compatible con coma
flotante ni una diferencia de magnitud mayor. Esto describe esta pasada; no
establece una garantía para consultas futuras ni cambia el `===` publicado.

## Rango y límites reales

Settings consultados antes de preparar el rango: `enabled=true`,
`notOlderThan=15897600 s` (184 días), `maxDuration=8035200 s` (93 días),
`maxPageSize=10000`. Preparación: `2026-11-12T20:29:33.826521+00:00`.

- Fechas locales examinadas: **12 mayo–11 noviembre de 2026**, 184 días.
- El 12 de mayo está cortado por la retención y se marca **fuera de retención**;
  no se consulta ni se presenta como un día completo.
- Se consultan los **183 días completos** del 13 de mayo al 11 de noviembre.
  Cada ventana es `[día 06:00 UTC, día siguiente 06:00 UTC)`, Costa Rica.
- Se incluyen el 10 y el 11 de noviembre, aunque todavía no han cumplido el
  margen de 48 horas para archivarse. Es un diagnóstico de lectura, no una
  ejecución del archivo ni una declaración de que sean elegibles para escritura.
- No se consulta el 12 de noviembre, que sigue abierto en Costa Rica.
- La ventana ordinaria vigente es 3–9 noviembre. Sus siete días coinciden en
  esta pasada; el día 3 indica **10**, y los otros seis **1**. Estar dentro de
  esa ventana no se usa como garantía de ausencia de muestreo.

Primera consulta de datos: `2026-11-12T20:30:43.560Z`. Última:
`2026-11-12T20:35:22.098Z`. No se observaron salidas de retención adicionales durante
la captura; el primer día completo seguía cubierto al consultarlo.

## Mecanismo y reproducibilidad

Se importó **el `fetchDays()` real de main**, que llama al `queryHours()` real,
sin copiar ni modificar sus comprobaciones. SHA-256 de
`src/lib/admin/audience-archive.ts`:
`ec56562419492410548e5e27060de631e2e587773a70d7d9f1ef5a3e5cca45cc`. Su código no difiere del auditado en `1f0805d`.

Un adaptador privado capturó las peticiones que genera `fetchDays()` para cada
fecha y las ejecutó mediante el conector GraphQL de lectura. Después reprodujo
las respuestas locales contra el mismo `fetchDays()` y verificó el hash de cada
petición original. **No se llamó a `writeDays`, `recoverDays`, la ruta HTTP ni al
cron.** El entorno del adaptador no tiene bindings D1 ni KV; su transporte solo
captura o reproduce archivos locales. No contiene el secret real.

La única ampliación de selección de la consulta fue pedir
`avg { sampleInterval }` también en las horas, para informar el rango requerido.
No se cambiaron filtros, variables, ventanas, agrupación, orden, límite ni los
campos de los contadores. Las validaciones numéricas siguen usando las mismas
respuestas y el mismo orden horario. La selección observada fue:

```graphql
query($account:string!,
      $filter:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!,
      $limit:uint32!,
      $d0:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!) {
  viewer { accounts(filter:{accountTag:$account}) {
    hours:rumPageloadEventsAdaptiveGroups(
      limit:$limit,filter:$filter,orderBy:[datetimeHour_ASC]
    ) { count sum {visits} avg {sampleInterval} dimensions {datetimeHour} }
    total:rumPageloadEventsAdaptiveGroups(limit:1,filter:$filter) {
      count sum {visits}
    }
    d0:rumPageloadEventsAdaptiveGroups(limit:1,filter:$d0) {
      count sum {visits} avg {sampleInterval}
    }
  } }
}
```

En esta pasada `$filter` y `$d0` son idénticos: sitio configurado, `bot:0`, los
hosts públicos `cuidatuperroviejo.com` y `www.cuidatuperroviejo.com`, y los límites
UTC de cada día. `$limit=1000`, menor que `maxPageSize`; cada intervalo dura
86400 segundos, menor que `maxDuration`. No se rellenan horas ausentes con ceros.

**Los días se consultaron sueltos. Ninguna consulta tuvo que dividirse ni alcanzó
el límite.** No se usaron lotes de varios días ni se cambió el criterio tras
observar un resultado. Esto examina directamente el fallo persistente de días
sueltos descrito en B1; no es una simulación de toda una recuperación por lotes.

La captura contiene **183 peticiones de datos**, tres nodos por petición, más
**una petición de settings**: **184 peticiones HTTP GraphQL**, 550 nodos en total.
Se dejó un mínimo programado de 1100 ms entre inicios dentro de cada grupo de
transporte; el mínimo observado fue aproximadamente 1,1 s. La agrupación del
transporte en 23 archivos privados no es agrupación de días en una consulta.
El máximo observado en cinco minutos fue 183 peticiones de datos. No hubo
HTTP 429, errores GraphQL ni reintentos. Esto respeta la
[cuota documentada de 300 peticiones por cinco minutos](https://developers.cloudflare.com/analytics/graphql-api/limits/)
y el ritmo de una petición por segundo de la modalidad por cuenta.

## Cómo se informa cada diferencia

Para cada contador se conserva privadamente:

- suma de horas y agregado diario, sin redondeo;
- diferencia con signo `suma_horas − agregado_diario` y su magnitud absoluta;
- diferencia relativa respecto del agregado diario y el resultado estricto;
- comparación adicional de las horas contra el total del lote (aquí, el día).

La tabla pública solo muestra **diferencias relativas**, estados y señales de
muestreo. `Δ V` y `Δ PV` son porcentajes con signo, respecto del agregado diario.
Una base ausente o cero produce «—», no un porcentaje inventado. En los 170 días
con datos también coinciden las horas con el total del lote, comprobación que
precede a la del agregado diario en `queryHours()`.

«FP» indica si hay una diferencia no nula de magnitud menor que `1e-9` en todos
los contadores que difieren; es una etiqueta diagnóstica de posible coma flotante,
**no una tolerancia aplicada al código**. «Sin diferencia» significa que la
igualdad estricta se cumplió. No hubo casos FP ni diferencias mayores en esta
pasada. Las sumas se comprobaron además de forma independiente con acumulación
secuencial IEEE-754 en Python, manteniendo el orden de la respuesta.

«Vacío» significa que no se devolvieron horas ni agregado diario. Los 13 casos
no se convierten en cero ni se interpretan como ausencia demostrada de visitas:
pueden reflejar los datos que conserva y devuelve RUM. `fetchDays()` no obtiene
un día válido para guardar de esas respuestas. Sin señal devuelta se muestra
«—», nunca se supone `sampleInterval=1`.

## Resumen por estado y muestreo

| Estado | Días |
| --- | ---: |
| Coincide | 170 |
| Difiere | 0 |
| Vacío | 13 |
| Error | 0 |
| Fuera de retención | 1 |
| **Total examinado** | **184** |

| Señal del agregado diario | Coincide | Difiere | Vacío/error/fuera | Mayor magnitud relativa Δ V | Mayor magnitud relativa Δ PV | Casos FP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `= 1` · sin muestreo indicado | 8 | 0 | 0 | 0 % | 0 % | 0 |
| `> 1` · estimado | 162 | 0 | 0 | 0 % | 0 % | 0 |
| Sin señal disponible | 0 | 0 | 14 | — | — | — |

Las señales diarias observadas van de 1 a 15; las horarias, de 1 a 20. Nueve días
mezclan señales horarias diferentes. Se conservan los valores reales, incluidos
los decimales: no se redondean a 1 o 10 ni se sustituye el agregado diario por una
media de promedios horarios. `=1` se describe como «sin muestreo indicado», nunca
como «exacto».

## Detalle diario

`S día` es `avg.sampleInterval` del agregado diario. `S horas` muestra mínimo y
máximo de las señales realmente devueltas en sus horas. «Div.» indica división
de consulta. Las filas vacías se mantienen, con muestreo y diferencias ausentes.

| Día de Costa Rica | Estado | S día | S horas mín.–máx. | Δ V | Δ PV | FP | Consulta | Div. |
| --- | --- | ---: | --- | ---: | ---: | --- | --- | --- |
| 2026-05-12 | fuera de retención | — | — | — | — | — | — | — |
| 2026-05-13 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-14 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-15 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-16 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-17 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-18 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-19 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-20 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-21 | vacío | — | — | — | — | — | Suelta | No |
| 2026-05-22 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-23 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-26 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-28 | coincide | 10 | 10–10 | — | 0 % | Sin diferencia | Suelta | No |
| 2026-05-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-05-31 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-01 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-03 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-04 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-05 | vacío | — | — | — | — | — | Suelta | No |
| 2026-06-06 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-07 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-08 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-09 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-10 | vacío | — | — | — | — | — | Suelta | No |
| 2026-06-11 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-12 | coincide | 10 | 10–10 | — | 0 % | Sin diferencia | Suelta | No |
| 2026-06-13 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-14 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-15 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-16 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-17 | coincide | 11.428571428571429 | 10–15 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-18 | coincide | 10 | 10–10 | — | 0 % | Sin diferencia | Suelta | No |
| 2026-06-19 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-20 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-21 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-22 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-23 | vacío | — | — | — | — | — | Suelta | No |
| 2026-06-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-26 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-28 | coincide | 10 | 10–10 | — | 0 % | Sin diferencia | Suelta | No |
| 2026-06-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-06-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-01 | coincide | 10 | 10–10 | — | 0 % | Sin diferencia | Suelta | No |
| 2026-07-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-03 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-04 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-05 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-06 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-07 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-08 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-09 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-10 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-11 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-12 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-13 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-14 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-15 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-16 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-17 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-18 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-19 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-20 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-21 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-22 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-23 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-26 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-28 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-07-31 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-01 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-03 | vacío | — | — | — | — | — | Suelta | No |
| 2026-08-04 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-05 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-06 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-07 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-08 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-09 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-10 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-11 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-12 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-13 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-14 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-15 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-16 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-17 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-18 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-19 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-20 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-21 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-22 | coincide | 15 | 10–16.666666666666668 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-23 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-26 | coincide | 12.857142857142858 | 10–20 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-28 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-08-31 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-01 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-03 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-04 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-05 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-06 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-07 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-08 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-09 | coincide | 11.25 | 10–15 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-10 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-11 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-12 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-13 | coincide | 13.333333333333334 | 10–20 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-14 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-15 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-16 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-17 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-18 | coincide | 12.222222222222221 | 10–16.666666666666668 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-19 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-20 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-21 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-22 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-23 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-26 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-28 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-09-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-01 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-03 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-04 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-05 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-06 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-07 | coincide | 11 | 10–20 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-08 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-09 | coincide | 11.666666666666666 | 10–20 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-10 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-11 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-12 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-13 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-14 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-15 | coincide | 10.666666666666666 | 10–12.5 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-16 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-17 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-18 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-19 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-20 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-21 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-22 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-23 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-24 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-25 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-26 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-27 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-28 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-29 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-30 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-10-31 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-01 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-02 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-03 | coincide | 10 | 10–10 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-04 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-05 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-06 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-07 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-08 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-09 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-10 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |
| 2026-11-11 | coincide | 1 | 1–1 | 0 % | 0 % | Sin diferencia | Suelta | No |

## Privacidad y límites de la evidencia

Los valores absolutos, magnitudes absolutas de las diferencias, respuestas
horarias completas, plan de consultas, sus hashes y el adaptador de captura y
reproducción permanecen en `/workspace/private-audience-20261112/`, fuera del
repositorio. El directorio tiene permisos privados. Este documento no contiene
totales de visitas, páginas vistas ni rankings. No se escribió en D1 ni en KV,
no se creó `AUDIENCE_RECOVERY_TOKEN` y no se invocó la ruta de recuperación.

Es una única observación por día, no una garantía de que la misma consulta
adaptativa devolverá siempre los mismos resultados. No mide estabilización a
+1/+24/+48 horas. Los dos días más recientes se observan antes del margen de
archivo y pueden cambiar. No verifica una recuperación con escrituras ni la
composición de lotes amplios. La decisión sobre el criterio queda en manos del
propietario; este PR no propone ni aplica modificaciones.

## Origen observado del HTTP 403 del entorno

En una lectura sin credenciales de `/`, el 12 de noviembre a las 20:28 UTC:

- HTTP 403, cuerpo de texto `error code: 1010`.
- Cabecera `cf-ray` presente (centro DFW); `cf-mitigated` ausente.
- `server: envoy` y `x-envoy-upstream-service-time` presentes. No se devolvió
  una página explicativa propia del proxy.
- El cliente era Python `urllib` con su agente predeterminado.

La [documentación oficial del error 1010](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/)
lo relaciona con la firma del cliente y menciona clientes automatizados como
Python urllib. Esto es compatible con un bloqueo de este cliente en la ruta de
salida, no demuestra una regresión de la aplicación y tampoco permite atribuirlo
exclusivamente a la IP o al proxy. Las cabeceras de Envoy solo confirman una capa
intermedia. No se cambió Cloudflare ni se intentó eludir el bloqueo.

Según la comprobación independiente de Claude comunicada por el propietario,
main `51ebd22` responde `/` 200, `/admin` 401, una página pública 200 y POST de
recuperación sin credenciales 401. El propietario dio por cerrados los pasos
operativos 1–3; B1 se realizó por el conector GraphQL y no depende de esas rutas.
