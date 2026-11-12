# Archivo diario · Evidencia de implementación

Fecha: 2026-11-12. Base main `a41db3f`. Rama `feature/admin-archivo-diario`.
Esto es validación del desarrollador; la auditoría independiente corresponde a
Claude Code. No se fusionó, migró ni recuperó audiencia en producción.

## Comprobaciones locales

Entorno Node 24.22.1, dependencias de `package-lock.json` sin modificaciones,
Wrangler 4.128.0. `npm ci --ignore-scripts`; no se añadieron dependencias.

| Comprobación | Resultado |
| --- | --- |
| `astro check` | 0 errores, 0 advertencias; 82 hints existentes |
| `astro build` | Correcto, interfaz sin cambios |
| `npm run types:worker` | Correcto; worker-configuration.d.ts sin diferencias |
| `npm test` | 177 tests correctos |
| Tests focales finales de audiencia y archivo diario | 27 correctos |
| `node --test tests/agent-readiness/*.test.mjs` | 78 correctos |
| Auditor de specs de migración | Correcto |
| Inventario, discovery, projection, API y routing del build | Correctos |
| Crecimiento de proyección con build +1 documento | 2 tests correctos |
| Guardia semántica independiente | 41 documentos concordantes |
| `wrangler deploy --dry-run` con configuración del build | Empaquetado correcto; no despliegue |
| `node scripts/admin/verify-archive-runtime.mjs` | Correcto con workerd/D1 locales y fixtures |
| Migraciones 0001–0006 con `--local` | Aplicadas únicamente a D1 local |

Los tests nuevos usan SQLite real mediante Python. Cubren conversión UTC/local,
margen de cierre diario y mensual (justo antes/en/después), separación de series,
cron sin días antiguos, reintentos que salen de la ventana, reanudación por lotes,
truncamiento/división hasta horas, presupuesto agotado, incoherencia global y
diaria, día vacío/cero, muestreo real 1/2,5, cobertura y retención, idempotencia,
transacción, trigger, meses previos inmutables y ausencia de tabla 0006.

El verificador de workerd usa respuestas RUM sintéticas y D1 efímera. Ejecuta el
handler con ExecutionContext real como tercer argumento (nunca se interpreta
como transporte de pruebas). Comprueba cron con siete días elegibles, archivo
mensual, reanudación/idempotencia de recuperación, trigger, rollback real de D1
batch y continuación mensual después de retirar solo la tabla diaria local.
No usa el token real ni modifica Cloudflare remoto.

El runtime compilado se abrió con `wrangler dev --local --test-scheduled` y
credenciales de prueba exclusivamente en `dist/server/.dev.vars` ignorado:

| Petición local | Resultado |
| --- | --- |
| `/admin` sin Basic | 401, private/no-store |
| `/admin` con Basic de prueba | 200, private/no-store |
| POST recuperación con Basic y sin secret específico | 503, recuperación deshabilitada, private/no-store |
| `/cdn-cgi/local/scheduled?format=json&cron=0+8+*+*+*` | outcome=ok, noRetry=false; fallos de configuración aislados |

En este sandbox los subprocesos síncronos Node→Python no recibían EOF y el build
no podía enumerar interfaces de red. Se reprodujo el bloqueo con un programa
mínimo; SQLite, workerd y build se ejecutaron fuera de ese sandbox con la misma
copia local. No se modificaron el producto ni los tests para sortearlo.

## Lectura de RUM real

A través del conector, sin escrituras: settings reales habilitado, retención
184 días, maxDuration 93 días, maxPageSize 10000. Se generó `daysQuery()` desde el
código y se ejecutó para el 8–9 de noviembre locales: sin errores, 37 horas
presentes, suma de los dos contadores concordante con el agregado del lote,
sampleInterval=1 para los dos aliases diarios. No se publican totales privados.
Un segundo lote ordinario real de siete días (3–9 noviembre) devolvió 39 grupos:
sus horas cuadraban con el total global, pero seis aliases diarios discrepaban
por las diferentes muestras de consulta (señal 10 en el día 3 y 1 en los demás).
Se añadió división por días para este caso: el padre se descarta y cada hijo se
valida antes de escribir. Test sintético de regresión incluido. Las siete
consultas individuales posteriores cuadraron con sus totales y aliases diarios,
conservando las señales 10/1 observadas.
No se usó la función de escritura ni la ruta de recuperación en producción.

## Lo no verificado

- **Latencia a +1/+24/+48 h del mismo día:** pendiente. La documentación oficial
  encontrada no garantiza un plazo de estabilización. La observación requiere
  dos días reales; consultar hoy fechas distintas no la sustituye. Se entrega
  script de solo lectura y calendario en `archivo-diario.md`. No se afirma que
  el margen de 48 horas esté validado empíricamente.
- Migración 0006 remota, despliegue del nuevo código, propagación del cron y su
  primera ejecución real: requieren autorización de producción y merge.
- Recuperación histórica real, su secret operativo, el token mínimo del dueño
  contra esta consulta y el comportamiento bajo latencia/incidencias reales.
  El procedimiento se entrega sin ejecutar, para auditar y autorizar aparte.
- No se provocó truncamiento ni discrepancia deliberada en producción. Se
  verificaron con fixtures y límites reducidos en los tests. La discrepancia
  espontánea observada en el lote amplio real sí se documenta arriba.

Cota ordinaria: **36 peticiones HTTP GraphQL** por ejecución; en el caso coherente sin divisiones **3**
cuando hay siete días contiguos pendientes y ningún mes pendiente (1 settings y
1 datos diarios + 1 settings mensual). El caso de mes pendiente sin complemento
suma una más: **4**. Sin huecos diarios ni meses pendientes: **1**.
La derivación completa, 295 nodos como cota conservadora, está en
`archivo-diario.md`. No hay recuperación diaria histórica en el cron.
