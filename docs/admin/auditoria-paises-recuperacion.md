# Auditoría independiente · Nombres de países y procedimiento de recuperación

- **Auditor:** Claude Code. No corrige código ni ejecuta operaciones.
- **Objeto:** [PR #172](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/172), commit `5b90745`, de Codex.
- **Fecha:** 2026-11-12.

## 1. Nombres de países · **APTO**

- `Intl.DisplayNames(['es'], { type: 'region', fallback: 'none' })` solo al mostrar. Los códigos siguen intactos en Cloudflare, KV y D1.
- Alternativas: un valor vacío se muestra como «Sin país»; `ZZ`, `XX`, `T1` y los códigos inválidos muestran el código original, protegidos con `try/catch`.
- Los tests comprueban que el orden y los valores no cambian y que el ranking original no se muta. Se aportan evidencias en `workerd`.
- No toca las consultas, las métricas ni el histórico. Cumple el alcance.
- La agrupación opcional de `com.google.android.googlequicksearchbox` no se incluyó porque no se autorizó. Es correcto.

## 2. Procedimiento de recuperación · **APTO con dos ajustes**

Bien resuelto:
- Usa exactamente la misma cadena que el cron (`scheduled → archive()`), sin SQL manual ni lógica paralela.
- La cobertura se calcula con las funciones reales y debe recalcularse antes de ejecutar.
- Las vías se comparan con honestidad. La recomendada (un cron temporal mediante PUT de schedules) no publica código.
- La retirada del trigger es obligatoria aunque la operación falle, y no hay reintentos a ciegas.
- Integridad: `ON CONFLICT DO NOTHING`, el trigger, snapshot de filas previas y nada de cifras en el repo.

Ajustes antes de ejecutar:

1. **Recuentos de tablas vivas.** `affiliate_clicks_daily`, `assistant_interactions`, `assistant_clicks`, `contact_messages`, `feedback_counts` y `feedback_votes` reciben escrituras del tráfico normal. Exigir que no cambien provocará una detención falsa casi segura. Propuesta: exigir igualdad estricta solo en `sqlite_schema`, `d1_migrations` y las filas previas de `audience_months`; en las tablas vivas, registrar antes y después solo como información, aceptando aumentos coherentes con el tráfico. Detenerse únicamente ante descensos o cambios de esquema.
2. **No fusionar el PR #172 durante la ventana del cron temporal.** El merge despliega con `wrangler deploy`, que restablece los schedules a los de `wrangler.jsonc` y borraría el trigger temporal antes de que se ejecute. Orden recomendado: primero la recuperación (programar, ejecutar, retirar y verificar) y después el merge del PR #172, o al revés, pero nunca a la vez.

Riesgo residual aceptable: si el trigger temporal no se retira, se ejecutaría otra vez al año siguiente. `archive()` es idempotente, así que no dañaría datos. Aun así, el procedimiento obliga a retirarlo y a informar.
