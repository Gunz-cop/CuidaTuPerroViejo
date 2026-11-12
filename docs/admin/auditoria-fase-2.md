# Auditoría independiente · Escritorio `/admin`, fase 2 (audiencia)

- **Auditor:** Claude Code. No participó en el desarrollo y no corrige código.
- **Objeto:** [PR #170](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/170), rama `feature/admin-audiencia`, de Codex (commits `00b141a`, `96c77c3` y `eb40c8c`).
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO con observaciones.** Ninguna bloquea la fusión. Las observaciones 1 y 2 conviene resolverlas antes, porque se notan en la pantalla.

## Contra el encargo definitivo

| Bloque | Resultado |
|---|---|
| Rama propia, PR en borrador, sin merge, lectura previa de la spec de migración | Cumple |
| 7 y 30 días cerrados de Costa Rica, comparados con ventanas equivalentes y con el rango indicado | Cumple. `windows()` usa días locales cerrados; los tests cubren medianoche, cambio de año y años bisiestos. |
| Evolución mensual con meses cerrados desde D1 y el mes en curso provisional | Cumple. Los meses provisionales y parciales tienen otro estilo y la pantalla aclara que no se comparan. |
| Referidos con denominador de visitas, Google agrupado, «Directo» aparte y 100 % no forzado | Cumple. La lista de Google viene de la fuente oficial; las imitaciones (`google.com.evil.org`) no se agrupan. La diferencia se calcula y se muestra, nunca se reparte. «Otros» sale de una consulta real del resto, no de una resta. |
| Consistencia de referidos demostrada con consultas reales | Cumple. Diferencia del 0 % en 7 y 30 días. El script `check-referrals.ts` permite repetir la prueba. |
| Meses completos frente a parciales | Cumple. La cobertura se calcula en días locales enteros a partir de `notOlderThan` real, que no se supone. |
| Cron mensual idempotente que recupera los meses pendientes | Cumple. `ON CONFLICT DO NOTHING`, un fallo no impide archivar los demás meses y un trigger de SQLite bloquea las sobrescrituras silenciosas. Probado sobre SQLite real con la migración. |
| Orden de despliegue y fallos aislados | Cumple. Cada dependencia ausente produce «No configurado» o «No disponible»; el cron registra el fallo sin romper nada; las tarjetas de la fase 1 siguen funcionando. |
| Etiquetas honestas: «aproximado», «estimado» con `sampleInterval > 1`, sin «personas» ni «únicos» | Cumple. Además, cuando el periodo anterior es una estimación se marca «base estimada», lo que evita comparar sin aviso un dato exacto con uno muestreado. |
| Alcance | Cumple. No añade asistente, Search Console, Core Web Vitals ni bots. |

## Observaciones

1. **Visible: referidos con 0 visitas.** En RUM, la navegación interna tiene como referente el propio sitio y suma 0 visitas. Si esa fila llega a la consulta, se verá «cuidatuperroviejo.com · 0 · 0 %». Conviene descartar los grupos con valor 0 al mostrarlos.
2. **Visible: la lista de referidos no tiene tope.** Se muestran todos los grupos devueltos (hasta 1000) y «Otros» solo aparece al superar ese límite. En el móvil, la tarjeta puede quedar muy larga. Sugerencia: mostrar los 8 o 10 primeros y sumar el resto en «Otros», sin cambiar el cálculo de la diferencia.
3. **`TODO.md` desactualizado en el PR.** Dice que la fase 2 está «pendiente de implementar». Lo actualiza esta auditoría.
4. **Identificadores en `wrangler.jsonc`.** `accountId` y `siteTag` quedan en el repositorio. No son credenciales (el `siteTag` ya es público en el beacon), y así lo pedía el encargo. Solo se anota porque el documento de investigación sí los ocultaba.
5. **Reintento de meses pendientes.** Solo se reintenta en el siguiente cron mensual; no hay botón para reintentar. Con unos 184 días de retención, el margen sobra.
6. **Archivos de evidencia en `docs/admin/`** (`fase-2-browser*.json`, `relevo-fase2.md`). Es la misma observación de la fase 1.

## Despliegue: aviso para el propietario

En este repositorio, **fusionar en `main` es desplegar** (Workers Builds). Por eso, el paso 1 del orden documentado, aplicar la migración `0005` en remoto, y la creación del secret `CF_ANALYTICS_TOKEN` deben hacerse **antes** de fusionar. Si se fusiona antes, nada se rompe (el código está preparado para fallar de forma aislada), pero el escritorio mostrará «No configurado» hasta completar esos pasos.

No verificado por esta auditoría (sin acceso a Cloudflare): la migración remota, el token real, el primer cron real y las capturas en un dispositivo físico.
