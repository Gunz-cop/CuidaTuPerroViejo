# Archivo diario de audiencia · Entrega 1

Implementación para auditoría de Claude Code. Base: main `a41db3f`.
No hay autorización de merge, migración remota ni recuperación histórica.
La interfaz no cambia. La serie diaria es independiente de `audience_months`:
no se suman días para sustituir sus totales ni se cambia `rum-v1`.

## Datos y precisión

`0006_audience_days.sql` guarda día de Costa Rica, límites UTC semiabiertos,
visitas (`sum.visits`), páginas vistas (`count`), fuente, filtro, versión
`rum-days-v1`, fecha de consulta, `sample_interval` y `estimated`.

Una consulta común pide horas por `datetimeHour`, el total del lote y un
agregado separado por cada día local mediante aliases. Cada día empieza a las
06:00 UTC y termina a las 06:00 UTC siguiente. Se comprueba igualdad estricta de
ambos contadores: horas contra total del lote, y horas del día contra su agregado.
Si las horas discrepan del total del lote, este falla sin escribir. Si el total
del lote cuadra pero sus horas no coinciden con los aliases diarios, se descarta
el lote padre y se divide por días: cada sublote debe superar de nuevo todas las
comprobaciones antes de escribir. Así se evita mezclar muestras diferentes. Un
día indivisible incoherente falla. No hay tolerancia ni redondeo corrector; el
operador debe investigar los fallos persistentes.

`sample_interval` conserva literalmente `avg.sampleInterval` del agregado de
ESE día, incluso al dividir la consulta de horas. No es el del lote, la media de
medias horarias ni un valor supuesto. Mayor que 1: **estimado**. Igual a 1:
**sin muestreo indicado**. No se usa «exacto». Un día sin grupos, con agregado
vacío o con cero páginas vistas falla y sigue pendiente de archivo; visitas 0
con páginas vistas positivas sí es un agregado válido de RUM.

Una fila por `(day, query_version)`. Las escrituras comunes usan D1 `batch`
transaccional e `INSERT ... ON CONFLICT DO NOTHING`: nada de UPDATE/DELETE.
El trigger exige fecha nueva y motivo para una corrección SQL explícita,
igual que 0005. Días ya guardados se omiten incluso de los filtros de consulta.

## Margen común y archivo ordinario

`ARCHIVE_CLOSE_DELAY_HOURS = 48`, en `audience.ts`, es la única constante del
margen. Se aplica a días y meses: elegibles desde cierre +48 h, inclusive.
No cambia las consultas en vivo de la interfaz. Los meses existentes no cambian.
El mes anterior pasa a ser elegible el día 3 a las 00:00 de Costa Rica; el cron
de ese día ocurre a las 02:00 (08:00 UTC).

Cron único: `0 8 * * *`. Ejecuta `archiveRecentDays()` y después `archive()`
mensual, con fallos aislados. Falta de 0006 no bloquea 0005.
`RECENT_RETRY_DAYS = 7`: los siete días elegibles más recientes, incluidos ambos
extremos. Por ejemplo el 12 de noviembre a las 08:00 UTC intenta 3–9 noviembre.
No busca una cola de días viejos en D1. Cada ejecución solo lee ese rango.
Un fallo vuelve a intentarse al día siguiente mientras permanezca en la ventana;
al salir requiere recuperación explícita. No hay reintentos en bucle del mismo
error de transporte dentro de una ejecución.

El mensual mantiene sus meses retenidos pendientes, formato y filtro anteriores,
pero atiende como máximo **un mes pendiente** por ejecución diaria (más antiguo
primero). No recalcula los ya guardados ni amplía los parciales. Esta cota evita
una ráfaga mensual al cambiar la frecuencia; los restantes se intentan en días
posteriores. No ejecuta recuperación diaria histórica.

### Cota de consultas por ejecución

- Diario: hasta 1 petición de settings y `MAX_DAY_REQUESTS = 32` peticiones de
  datos, incluidas divisiones por truncamiento. Sin huecos diarios: 0 peticiones.
  Caso coherente sin divisiones con siete días contiguos pendientes: 1 settings + 1 datos.
- Mensual: 1 settings y, como máximo, 1 informe (4 nodos), más 1 complemento si
  alcanza 1000 referidos. Total máximo mensual: 3 peticiones HTTP GraphQL.
- **Máximo ordinario: 36 peticiones HTTP GraphQL.** Cada petición diaria tiene
  como máximo 9 nodos (horas + total + 7 días); cota conservadora de nodos de
  datos/settings de ambos archivos: 32 × 9 + 2 + 5 = **295**.
  Sin meses pendientes ni huecos diarios solo se consulta settings mensual.
  Si el lote amplio requiere dividir hasta siete días individuales, son hasta
  13 peticiones de datos (árbol de siete hojas) más ambos settings: 15 HTTP
  sin mes pendiente. Todas las divisiones comparten el presupuesto de 32.

Las llamadas son secuenciales. Cada transporte tiene timeout de 12 segundos.
La cota conservadora de espera HTTP es 432 segundos más D1/CPU; el cron diario
no usa el presupuesto de una petición HTTP de recuperación. En una petición de
recuperación el cliente debe conservar la conexión y, si la pierde, consultar
D1 antes de reanudar. No se promete que un cliente desconectado cancele el lote.

## Recuperación separada

`recoverDays(env, desde, hasta)` no es alcanzable desde `scheduled`.
Los extremos son fechas locales incluidas (máximo 366 días en la función).
Comparte `fetchDays()` y `writeDays()` con el ordinario.

Lotes de hasta siete días contiguos, reducidos según `maxDuration`. No se intenta
archivar parcialmente un día si maxDuration no permite cubrirlo entero: falla
con explicación. Se usa `limit = min(maxPageSize, 1000)`. Un resultado con tantos
grupos como limit siempre se considera truncado, aunque su suma parezca cuadrar.
Se divide por días y después por horas si hace falta; una hora al límite es un
truncamiento irreducible y falla. Cada subdivisión verifica su propio total.
La comprobación adicional de cada día y del lote se hace antes de escribir.

Cada lote completo es una transacción independiente. Una interrupción conserva
solo lotes completos y la misma llamada se puede reanudar sin cambiar filas.
El presupuesto de 32 peticiones también limita una recuperación; lo no intentado
queda `pendiente`. Resultado por día: `archivado`, `pendiente` (margen o
presupuesto), `fallido` (vacío/error/incoherencia), `fuera de retención`.
Los fallidos no son ceros y siguen sin fila para futuros reintentos.
La retención se recalcula con el reloj durante la ejecución. Un día cortado por
la retención queda fuera; no se guarda como día completo.

La entrada operativa es POST `/api/admin/audience/recover-days`, sin interfaz,
con Basic administrativo y secret separado `AUDIENCE_RECOVERY_TOKEN`, ausente por
defecto. Requiere JSON, token en cabecera, motivo y confirmación literal; limita
cada petición a siete días. Registra inicio/fin con identificador de operación,
rango y cobertura, nunca el token ni totales de audiencia. Ni GET ni el cron
invocan la recuperación. El procedimiento aparte está en
[recuperacion-diaria-procedimiento.md](recuperacion-diaria-procedimiento.md).

## Despliegue, solo después de auditoría y autorización de merge

1. El propietario aplica **0006 antes del merge**, verificando que 0001–0005 ya
   están registradas. `npx wrangler d1 migrations apply CONTACT_DB --remote`
   aplica TODO lo pendiente: revisar la lista antes. Verificar tabla, trigger y
   registro con lecturas separadas. No ejecutar recuperación.
2. Merge del PR autorizado: Workers Builds despliega main y reemplaza el cron
   mensual por el diario. Confirmar `0 8 * * *` como único schedule y que no exista
   ningún temporal anterior. El despliegue no invoca `recoverDays()`.
3. Verificar logs `audience_days_archive` y `audience_archive`, filas recientes y
   conservación de las filas mensuales. No habilitar `AUDIENCE_RECOVERY_TOKEN`.
4. La recuperación histórica necesita auditar el procedimiento separado y
   recibir otra autorización específica. Autorizar el merge no la autoriza.

## Fuentes oficiales y evidencia de lectura (2026-11-12)

- [FAQ de Web Analytics](https://developers.cloudflare.com/web-analytics/faq/):
  explica envío del beacon al cargar/salir, siete días de datos sin reducción
  histórica y muestreo adaptativo de consultas. No establece una garantía de
  cierre a +48 horas.
- [Origen y recogida](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/):
  describe eventos del navegador; no establece una latencia máxima de ingestión.
- [FAQ de Observatory](https://developers.cloudflare.com/speed/observatory/faq/):
  reconoce demora de población de RUM, sin plazo numérico para estabilización.
- [Límites GraphQL](https://developers.cloudflare.com/analytics/graphql-api/limits/)
  y [settings](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/):
  consultar límites efectivos, no inferirlos del plan del sitio.
- [D1 batch](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch):
  las sentencias de un batch se ejecutan como una transacción y se revierte si
  alguna falla.

Lecturas mediante conector: settings habilitado, retención 15897600 s,
maxDuration 8035200 s, maxPageSize 10000. Se comprobó la consulta EXACTA generada
por `daysQuery()` para 8–9 noviembre: sin errores GraphQL, 37 grupos horarios,
sumas de visitas y páginas vistas coherentes con el total; aliases diarios
con sampleInterval=1. No se publican cifras absolutas. Esto verifica sintaxis y
coherencia puntual, **no la latencia ni la estabilización**.

También se consultó el lote ordinario exacto de siete días (3–9 noviembre):
39 grupos horarios, total del lote coherente, pero discrepancias en seis aliases
diarios. El día 3 indicó sampleInterval=10 y los demás 1. Esa diferencia confirma
la necesidad de descartar y dividir el padre antes de guardar los sublotes; no
se ejecutó ninguna escritura. El test de muestra amplia diferente reproduce
este comportamiento con fixtures y comprueba los días finalmente guardados.
Se repitieron después las siete consultas individuales, siempre en solo lectura:
las siete cuadraron tanto con su total como con su alias diario; el día 3
conservó señal 10 y los demás 1. No se guardó ninguna fila en producción.

No se encontró documentación oficial que garantice que +48 h baste. No es posible
reconstruir observaciones pasadas a +1/+24/+48 consultando hoy el mismo día: esas
mediciones deben hacerse en momentos distintos. El margen de 48 h se implementa
como política solicitada; su validación empírica sigue **pendiente**.

Preparado `scripts/admin/probe-rum-latency.ts`: solo consulta GraphQL, sin D1,
KV ni cambios de configuración. Con token de lectura en el entorno, ejecutar
`npx tsx scripts/admin/probe-rum-latency.ts 2026-11-12` en estas tres horas:

| Observación | Hora UTC | Horas desde cierre del día 12 en Costa Rica |
| --- | --- | ---: |
| Primera | 2026-11-13 07:00 | +1 |
| Segunda | 2026-11-14 06:00 | +24 |
| Tercera | 2026-11-15 06:00 | +48 |

Guardar salidas privadamente fuera del repo. Contienen totales y grupos horarios.
Comparar visitas, páginas vistas, muestreo y horas; registrar horas reales y
desviación del horario objetivo. Una igualdad con muestreo no prueba completitud.
No se programó ninguna automatización ni se ejecutaron estas observaciones futuras.
Si a +48 h siguen cambiando, no declarar validado el margen: revisar la constante
con el propietario y valorar otra observación posterior, sin sobrescribir D1.

## Validación

Resultados reproducibles y límites finales en el PR y
[archivo-diario-validacion.md](archivo-diario-validacion.md).
