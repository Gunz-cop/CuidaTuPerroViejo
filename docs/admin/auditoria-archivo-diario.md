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

---

## Revisión focal pedida por el propietario (2026-11-12)

### Veredicto

- **Bloqueantes para el merge del archivo ordinario: ninguno.**
- **Un bloqueante para *ejecutar* la recuperación histórica (B1).** No afecta al merge: la ruta queda cerrada sin su secret y un fallo nunca escribe datos erróneos.

### 1. Muestreo y la igualdad estricta

Cómo funciona (`fetchDays` y `queryHours`): en una misma petición se piden las horas del lote, el total del lote y un agregado por día.
- Se exige que la suma de las horas sea igual al total del lote, salvo si hay truncamiento.
- Se exige que la suma de las horas de cada día sea igual a su agregado diario.
- Si falla un lote de varios días, se lanza `SplitBatch` y se divide por la mitad hasta llegar a días sueltos.
- **Un día suelto que no cumple la igualdad falla y nunca se divide.**
- **El valor que se guarda es el agregado diario.** Las horas solo sirven para comprobar.

Hallazgos:

- **B1 (bloqueante de la recuperación): riesgo de fallo persistente en días válidos y ya muestreados.**
  - Los días de más de 7 días están agregados a alrededor del 10 %. Los nodos agrupado (horas) y sin agrupar (día) son estimaciones independientes. Codex ya observó diferencias entre lotes amplios y días sueltos, y no hay garantía de que, dentro de un mismo día, la suma de las horas estimadas coincida exactamente con la estimación diaria.
  - Además, `sameTotal` compara con `===` sumas que pueden no ser enteras (la migración usa `REAL`), así que un error de coma flotante también puede romper la igualdad.
  - Consecuencia: ese día queda «fallido» en cada intento, sin datos erróneos pero sin archivarse, y se pierde cuando sale de la retención.
  - **No afecta al archivo ordinario:** los días recientes (menos de 7 días) no están muestreados según la FAQ, y la validación con `workerd` y D1 local más la lectura real pasaron.
  - **Exigencia antes de autorizar la recuperación:** una **pasada en seco de solo lectura** (`fetchDays` sin `writeDays`) sobre todo el rango histórico, que informe por día: coincide, discrepa (y en cuánto) o vacío. Si hay discrepancias en días sueltos, el propietario decide entre:
    - (a) una tolerancia documentada para días con `sampleInterval > 1`;
    - (b) para un día suelto, guardar el agregado diario y registrar la discrepancia, sin bloquearlo.

    En ningún caso hay que repartir diferencias.
- La división en sublotes es correcta. Es recursiva, se detiene en días sueltos o en una hora, y el presupuesto la limita.
- El truncamiento es teórico con los parámetros actuales: 7 días × 24 = 168 horas, frente a `limit` = mín(`maxPageSize`, 1000). Se trata como incompleto aunque las sumas coincidan, lo cual es correcto.

### 2. Límites de ejecución

- **Presupuesto:** 32 consultas para días (`MAX_DAY_REQUESTS`) más la consulta de retención y las del archivo mensual (un mes por ejecución) suman como máximo 36.
- **En un día normal**, la ventana de 7 días ya está archivada salvo el día nuevo, así que bastan 1 o 2 consultas para días.
- **Peor caso de tiempo:** 36 consultas × 12 s de timeout ≈ 7,2 minutos de reloj. Un Cron Trigger permite hasta 15 minutos de reloj, y la espera de red no consume CPU (el procesamiento propio es mínimo). Las subpeticiones quedan muy por debajo del límite del plan de pago, y la cuota de GraphQL (unas 300 consultas cada 5 minutos) también.
- **Riesgo de agotar el tiempo de forma sistemática: bajo.** Solo podría ocurrir con Cloudflare degradado y todos los timeouts agotados. En ese caso, los días quedan pendientes y se reintentan durante 7 días. No hay escrituras parciales, porque `D1 batch` es transaccional.
- **Observación O1:** el presupuesto agotado deja días «pendientes» sin un aviso propio en el registro. Conviene que el evento `audience_days_archive` lo indique (por ejemplo, con `budget_exhausted: true`). No bloquea.

### 3. Seguridad de `/api/admin/audience/recover-days`

| Control | Resultado |
|---|---|
| Orden: límite de intentos (`ADMIN_LIMIT`) y Basic **antes** de cualquier otra cosa | Correcto. Sin credenciales responde 401 y no revela si la recuperación está habilitada. |
| Secret independiente | Correcto. Sin `AUDIENCE_RECOVERY_TOKEN` responde 503 y con un token incorrecto, 403. La comparación es en tiempo constante; solo revela la longitud, lo que es aceptable. |
| CSRF | Mitigado. La cabecera personalizada `X-Audience-Recovery-Token` no puede enviarse desde un formulario de otro sitio, y un `fetch` de otro origen requiere una verificación previa de CORS que no se concede. Además se comprueba `Origin` cuando existe. |
| Método y tipo | Solo exporta POST y exige `Content-Type: application/json`. |
| Cuerpo | Lectura por partes con un límite de 2 KB y error 413. `confirm` literal, `reason` obligatorio (200 caracteres como máximo) y fechas validadas (`AAAA-MM-DD` real) con un máximo de 7 días por petición. |
| Registros | Incluyen el identificador de la operación, el rango, el motivo y el resultado por día, sin valores de audiencia ni secrets. El motivo es texto del operador: no hay que escribir datos personales en él. |
| Interrupciones | Cada lote se escribe en una transacción. Las peticiones concurrentes o repetidas se resuelven con `ON CONFLICT DO NOTHING`. Si el cliente se desconecta a mitad, los lotes ya escritos quedan completos y el resto pendiente. Reanudar es seguro. |
| Cabeceras | `private, no-store` y `noindex` en todas las respuestas. |

**Observación O2:** ~180 días a razón de 7 días por petición son unas 26 peticiones manuales. Es manejable, pero el procedimiento debe incluir una lista de control por rango, para no saltarse tramos.

**Observación O3 (ya indicada):** crear o borrar el secret publica una versión. Hay que verificar que la versión publicada es la de `main` auditado.

### 4. Datos y tablas anteriores

- `0006` solo crea `audience_days` y su trigger. No contiene `ALTER`, `UPDATE` ni `DELETE` sobre otras tablas.
- En `archive()`, el cambio solo añade el margen de 48 horas y un mes por ejecución. Usa `INSERT … ON CONFLICT DO NOTHING` y nunca actualiza. Los 6 meses guardados no pueden cambiar; además, el trigger de `0005` impediría cualquier UPDATE implícito. Hay test (`archivo mensual real espera hasta cierre+48h y no altera el mes existente`).
- El cron pasa de `0 8 2 * *` a `0 8 * * *`. El archivo mensual, al ejecutarse a diario, sigue siendo idempotente.
- Efecto visible: `/admin` mostrará noviembre como pendiente a partir del 3 de diciembre (por el margen), no antes. Es correcto.

### Pendiente, sin verificar

- **La latencia a +1, +24 y +48 horas no está medida.** Las 48 horas son una hipótesis conservadora, no un valor comprobado.
