# Auditoría independiente · Investigación de tráfico humano (previa a la fase 2)

- **Auditor:** Claude Code. No participó en la investigación y no corrige el documento.
- **Objeto:** `docs/admin/investigacion-trafico-humano.md`, [PR #169](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/169), de Codex.
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO.** La investigación responde las seis preguntas con evidencia trazable y sin datos privados. Recomendación al final; la decisión es del propietario.

## Contra el encargo

| Pregunta | Resultado |
|---|---|
| 1. Qué hace «Exclude Bots» | Cumple. Cita fielmente la documentación y reconoce que Cloudflare no publica la señal que usa. |
| 2. Filtro equivalente en GraphQL | Cumple. `bot: 0` verificado con introspección y consulta real: −1,02 % de páginas vistas y −1,36 % de visitas en 7 días cerrados. La paridad con el panel queda abierta, y Codex lo declara. |
| 3. Otras fuentes en nuestro plan | Cumple. Comprobó en la cuenta: Bot Score denegado; categorías de bots verificados en HTTP disponibles; eventos de firewall deshabilitados. |
| 4. Definiciones | Cumple. Advierte bien que los «únicos» de HTTP son IP únicas, no personas, y que RUM no tiene únicos. |
| 5. Indicadores honestos | Cumple, con una lista explícita de lo que no debe mostrarse. |
| 6. Hora de Costa Rica | Cumple. Ventanas de 06:00 a 06:00 UTC, agrupadas por hora y reagrupadas por día; las sumas cuadran al 0 %. |
| Solo lectura, sin tokens ni cambios | Cumple. Solo cambian el documento y `TODO.md`. |
| Sin cifras absolutas ni identificadores | Cumple. Busqué identificadores hexadecimales y correos en el documento y no encontré ninguno. |

## Verificaciones propias

Contrasté con la documentación oficial (lectura del 2026-11-12):

- **Exclude Bots:** «Exclude bot traffic from the dataset», «a closer representation of real user traffic». La página no menciona la señal, el Bot Score ni el User-Agent. Coincide con D1.
- **Páginas vistas:** «A successful HTTP response with a content-type of HTML». **Visitas:** vista cuyo referer no coincide con el host; «One visit can consist of multiple page views». No aparecen los visitantes únicos. Coincide con D14.
- **Workers Paid:** «separate from any other Cloudflare plan (Free, Professional, Business)». Coincide con D6.
- **Muestreo (dato que el informe no destaca):** la FAQ dice que Cloudflare conserva los beacons sin muestrear 7 días y después los agrega a «around 10%». Eso explica el `sampleInterval` de 10 a 12,5 de la consulta de 30 días: **la tendencia de 30 días siempre será una estimación**, y la de 7 días será exacta solo mientras caiga dentro de esa ventana.

No tengo acceso a la cuenta de Cloudflare, así que no pude repetir las consultas Q1–Q7. Las doy por válidas porque el anexo es reproducible, las consultas son coherentes entre sí (las particiones y sumas cuadran) y el tratamiento de los errores es honesto (el Bot Score aparece como denegado, no como cero).

## Observaciones menores

1. Los porcentajes de bots verificados en HTTP (≈14 %) y el −1 % de RUM no son comparables. El documento lo advierte; el panel debe advertirlo igual si algún día muestra ambos.
2. El −1 % en una sola semana es una muestra pequeña. Se puede repetir, pero no bloquea nada.
3. En `TODO.md`, «despliegue y protección comprobados» mezcla una comprobación mía (401, cabeceras y sitemap) con la revisión visual del propietario. Es correcto, solo conviene saberlo.

## Recomendación técnica

**Alternativa A** (audiencia RUM sin los bots detectados), con estos ajustes:

1. **Tarjetas:** páginas vistas y visitas, siempre con `bot: 0`, en 7 y 30 días; tendencia diaria; top de 10 páginas y top de 10 países. Días en hora de Costa Rica.
2. **Nombres:** «Páginas vistas» y «Visitas», con el subtítulo «sin bots detectados · estimación». Nunca «personas» ni «lectores». La tarjeta de únicos dice «No disponible en esta fuente».
3. **Muestreo visible:** si `sampleInterval` > 1, marcar la cifra como «estimada». Por la retención de la FAQ, esto ocurrirá casi siempre en la vista de 30 días.
4. **Dato metodológico:** el porcentaje excluido por `bot: 0` puede ir en el pie de página, no como tarjeta.
5. **Paridad con el panel: criterio de aceptación, no bloqueo.** El propietario compara una vez, en el panel de Web Analytics, la semana del 4 al 10 de noviembre con «Exclude Bots» en Yes y en No. Si la diferencia ronda el −1 %, la paridad es suficiente.
6. **Fuera de esta fase:** la alternativa B (bloque de bots HTTP) y cualquier cambio de mitigación, como Bot Fight Mode. Se pueden retomar si el propietario quiere ver los rastreadores de IA.
7. **Acceso y caché:** según la propuesta anterior. Token de solo lectura, `Account Analytics: Read`, creado por el propietario como secret del Worker; caché de 15 minutos en KV y último dato fechado (máximo 24 h) si Cloudflare falla.

No recomiendo la alternativa C: ningún plan de Cloudflare da personas exactas, así que esperar no mejora la respuesta de fondo.
