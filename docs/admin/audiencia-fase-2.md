# Audiencia en /admin — fase 2

Rama `feature/admin-audiencia`, creada desde `main`. Desarrollo aprobado;
pendiente de auditoría y autorización explícita del propietario para fusionar.
No se ha desplegado ni cambiado configuración remota. No se fusiona otro PR.
Se leyó `AGENTS.md` y `docs/migracion-stack/README.md` antes de tocar Wrangler.

## Fuente, periodos y límites

Cloudflare RUM `rumPageloadEventsAdaptiveGroups`: `sum.visits` para visitas,
`count` para páginas vistas. No se deduplican visitas ni eventos. Filtro fijo
`bot:0`, siteTag y hosts `cuidatuperroviejo.com`, `www.cuidatuperroviejo.com`.
Zona `America/Costa_Rica` (UTC−6, sin horario estacional). Intervalos semiabiertos:
inicio incluido y fin excluido, a las 06:00 UTC. Hoy nunca entra.
La comparación anterior dura exactamente lo mismo. Base cero: «Sin base de
comparación», salvo ambos ceros («Sin cambio»).

Las cifras siempre dicen «sin bots detectados · aproximado»; cualquier
sampleInterval consultado > 1 marca el informe «estimado». El máximo de las
señales de los agregados se conserva en el resumen. El país aproxima la conexión.
Los títulos proceden del catálogo editorial, de rutas estáticas y del índice público agent-content ya existente; una ruta sin
metadatos conserva su ruta como rótulo. Los enlaces se fijan al host público.

KV CONTACT_KV guarda consultas en vivo 15 minutos (también settings); clave por
cuenta, sitio, hosts, bot, ventana, tops y versión. Se conserva el último éxito
hasta 24 horas para poder mostrarlo fechado ante un fallo. Un error nunca se
convierte en cero. No hay datos individuales. HTML privado mantiene no-store.
Si la retención o maxDuration no cubren una ventana, no se presenta como completa.
El cron consulta settings de nuevo, sin caché.

## Referidos y evidencia real

Regla: host vacío → «Directo o sin referente». Se normaliza caja y punto final;
dominio de Google de la lista oficial (incluidos los de país) o subdominio suyo
→ «Google». El resto conserva el dominio. Lista versionada en
`src/lib/admin/google-domains.ts`, obtenida de
<https://www.google.com/supported_domains> el 2026-11-12.
`google.com.ejemplo.org` y `notgoogle.com` no son Google. El identificador de una
app Android no se interpreta como dominio de Google.

Denominador: `sum.visits` del total con idéntico filtro. No se normalizan grupos.
Se piden hasta 1000 hosts; si se alcanza el límite, otra consulta con
`refererHost_notin` mide el resto y lo muestra como «Otros». No se usa el residual
como si fuera tráfico comprobado. Diferencia = total − grupos devueltos − resto
medido. Puede ser negativa; nunca se reparte. Si existe, se indica el porcentaje
y la señal de muestreo; sin esa señal se informa de discrepancia de agregación o
redondeo, sin afirmar una causa que no se haya demostrado.

Consultas reales por el conector Cloudflare, 2026-11-12; fin cerrado local
2026-11-11 00:00 (UTC 06:00), hasta el 10 de noviembre inclusive. Se omiten las
cifras absolutas privadas. Base indexada: total de visitas = 100 %.

| Ventana local | Total indexado | Suma por refererHost / total | Diferencia | Señal |
| --- | --- | --- | --- | --- |
| 4–10 nov frente a 28 oct–3 nov (evidencia del periodo actual) | 100 % | 100 % | 0 % | sampleInterval = 1 |
| 12 oct–10 nov (30 días) | 100 % | 100 % | 0 % | sampleInterval > 1 |

Ambas consultas devolvieron nueve hosts, por debajo del límite. No hay truncamiento
ni residual observado en ninguna; no corresponde mostrar «Otros». En 30 días hay
muestreo, pero **no produjo diferencia observada** entre esos agregados. No se
atribuye al redondeo una diferencia inexistente. Se verificó también contra la API
la consulta exacta generada por `reportQuery()` con variables, tops de páginas y
países: sin errores, y diferencia 0 %. Settings reales: enabled=true,
notOlderThan=15897600 s y maxDuration=8035200 s; el código los lee, no los supone.

Para repetir con el token mínimo: `npx tsx scripts/admin/check-referrals.ts`.
Su salida contiene totales privados: conservarla fuera del repo. El script y el
Worker comparten consulta y regla. Esta evidencia no valida todavía el token
mínimo del propietario, que no existe en este entorno.

## Archivo mensual y cron

Migración `0005_audience_months.sql`: una fila por periodo y versión `rum-v1`,
UTC del mes local, cobertura efectiva y días, fetched_at, fuente cloudflare_rum,
filtro, señal de muestreo, estado, totales y tops agrupados en JSON.
Solo los días locales completos aún retenidos se archivan: el día cortado por
la retención se excluye. Ese primer mes queda «parcial». Los meses cerrados se
leen de D1; el actual se consulta en Cloudflare hasta ayer, con trazo discontinuo
y etiqueta «provisional». Parcial/provisional no tienen crecimiento mensual.

Cron `0 8 2 * *`: día 2, 08:00 UTC. Recorre meses cerrados aún recuperables,
omite los guardados y recupera los pendientes; un fallo de un mes no impide los
otros. `INSERT ... ON CONFLICT DO NOTHING` resuelve también ejecuciones concurrentes.
Un mes parcial guardado tampoco se amplía automáticamente.

No se construyó una acción adicional: la primera ejecución del mismo cron hace
la recuperación inicial. Los pendientes se calculan al abrir /admin a partir de
settings y D1, no de un registro duplicado del cron. Sin settings se indica que
no pueden determinarse, en vez de afirmar que no hay pendientes. Los fallos del
cron se registran como JSON y terminan sin excepción fatal.

No hay endpoint de recálculo. Una intervención explícita mediante SQL debe
actualizar el resumen junto a `updated_at` (hora ISO nueva) y `update_reason`
(no vacío); el trigger bloquea UPDATE sin esos campos. Registrar el motivo real
y conservar la versión y cobertura correctas; un cambio semántico de consulta
requiere versión nueva. El cron jamás ejecuta UPDATE ni DELETE.

`src/worker.ts` conserva fetch = MCP → API → agent-content → adaptador Astro;
exporta scheduled al lado, sin pasar por fetch. El build del adaptador conserva
ambos exports en `dist/server/entry.mjs`. No cambia runtime.ts.

## Orden de producción — ejecutar después de la autorización

1. Aplicar `npx wrangler d1 migrations apply CONTACT_DB --remote` en la cuenta y
   base configuradas. Revisar que 0005 esté aplicada antes de publicar el código.
2. El propietario crea un API Token personalizado: **Account → Account Analytics
   → Read**, recursos **solo su cuenta**. No necesita permisos de edición ni de
   Account Settings porque accountId y siteTag ya se descubrieron. Guardarlo con
   `npx wrangler secret put CF_ANALYTICS_TOKEN`; introducirlo de forma interactiva,
   nunca en el código ni en chat. Atención: secret put publica una versión del
   Worker actual; en este orden aún es el código anterior, sin el cron nuevo.
3. Verificar `CF_ANALYTICS_ACCOUNT_ID` y `CF_ANALYTICS_SITE_TAG` en `wrangler.jsonc`.
   Están completados con los identificadores comprobados por lectura en esta
   cuenta. El token no se guarda como var. Mantener CONTACT_KV y CONTACT_DB.
4. Tras auditoría y autorización explícita, fusionar únicamente este PR. `main`
   despliega por Workers Builds con cron activo. Alternativa de despliegue manual:
   `npx astro build` y `npx wrangler deploy` con la configuración generada.
5. Verificar /admin y, tras el primer día 2 a las 08:00 UTC, Workers Logs
   (`audience_archive`), meses guardados y ausencia de pendientes recuperables.
   Los meses iniciales parciales deben mostrar sus días de cobertura. Repetir la
   ejecución no debe cambiar fetched_at ni report_json de meses existentes.

No usar el cron local como recuperación de producción: solo modifica D1 local.
Para probar el handler compilado sin tocar remoto:

```bash
npx astro build
# Secretos de PRUEBA en dist/server/.dev.vars; nunca copiar los de producción.
npx wrangler d1 migrations apply CONTACT_DB --local --config dist/server/wrangler.json
npx wrangler dev --local --test-scheduled --config dist/server/wrangler.json
curl 'http://localhost:8787/cdn-cgi/local/scheduled?format=json&cron=0+8+2+*+*'
```

Wrangler 4.128.0 anuncia también `/__scheduled`, pero en este adaptador/assets
esa ruta devolvió 404. La ruta `/cdn-cgi/local/scheduled` sí ejecutó el handler:
`{"outcome":"ok","noRetry":false}` con token ausente, y se registró
`audience_archive_unavailable` sin error fatal. No se invocaron tareas de IA.

## Validación y límites de esta entrega

- Build `npx astro build`: correcto. `astro check`: cero errores y advertencias;
  conserva hints existentes del proyecto.
- Suite completa: 155 tests correctos. Pruebas de audiencia/fase 1 repetidas tras
  los cambios finales: 14 correctas.
- Tests de ventanas, Google/directo, residuales positivos/negativos, muestreo,
  mes completo/parcial/provisional, recuperación tras fallo, idempotencia,
  UPDATE bloqueado y explícito, caché y fallback fechado, ausencia de token,
  cuenta, sitio, KV, D1, tabla y fallo Cloudflare. SQL real ejecutado en SQLite.
- Migraciones 0001–0005 aplicadas también en D1 del runtime local. /admin devolvió
  200 autenticado, 401 sin credenciales. Tarjetas de fase 1 siguieron mostrando
  sus registros al faltar la nueva fuente o la tabla nueva.
- Chromium 390×844 y 1440×1000, claro/oscuro, sin desbordamiento ni errores JS:
  `capturas-fase-2/` y `fase-2-browser*.json`. `sin-config` usa token ausente;
  `sintetico` usa solo fixtures locales (NO datos reales) con meses completo,
  parcial y provisional; `error-migracion` elimina solo audience_months local,
  conservando las tarjetas de fase 1 y la caché de audiencia.

No verificado: despliegue ni migración remota, token mínimo real del propietario,
primer cron real con archivo en D1 producción, propagación global del trigger,
recuperación de un fallo histórico real, exactitud/cobertura del beacon en todos
los navegadores. No se provocó truncamiento de 1000 hosts en producción; la
lógica usa una consulta explícita del complemento, no una estimación residual.
