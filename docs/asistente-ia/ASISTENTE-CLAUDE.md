# Asistente IA sobre Claude (rediseño de noviembre de 2026)

Sustituye al flujo de Workers AI como motor principal del asistente y reemplaza al plan
«Assistant V2» de este directorio, que quedó en contratos y nunca se conectó a producción.

## Qué hace

1. El visitante escribe en el widget flotante o en `/asistente-ia`.
2. `POST /api/ask` envía la consulta a Claude junto con el catálogo del sitio (título, descripción y
   ruta de cada guía, herramienta y sección).
3. Si el tema está cubierto, Claude pide el texto completo de la guía con la herramienta `leer_guia`
   (hasta tres documentos por consulta) y responde con base en él. Si no lo está, responde con
   conocimiento veterinario general.
4. Las guías se recomiendan con enlaces dentro de la respuesta. El servidor comprueba cada enlace
   contra las páginas realmente publicadas: lo que no existe se deja como texto y de los enlaces
   válidos salen las tarjetas «Guías recomendadas».
5. Bajo cada respuesta la interfaz pone un aviso fijo de que no sustituye la consulta veterinaria.
   No depende del modelo.

No hay un índice propio. El asistente lee la proyección `agent-content/v1` que el build ya genera
para agentes externos (`dist/client/agent-content/v1/`), así que responde con el contenido publicado
tal cual y una guía nueva queda disponible con solo desplegar.

## Piezas

| Archivo | Responsabilidad |
|---|---|
| `src/pages/api/ask.ts` | Orquesta: límite por IP, validación, Claude, respaldo, métricas. JSON o streaming NDJSON |
| `src/lib/assistant/claude.ts` | Llamada a la Messages API con streaming y bucle de `leer_guia` |
| `src/lib/assistant/prompt.ts` | Instrucciones y catálogo. Estable entre consultas para que se cachee |
| `src/lib/assistant/knowledge.ts` | Catálogo y lectura de guías desde `agent-content/v1` |
| `src/lib/assistant/links.ts` | Validación de enlaces y tarjetas |
| `src/lib/assistant/request.ts` | Validación de la consulta y del historial |
| `src/lib/assistant/metrics.ts` | Registro en D1 y tope diario |
| `src/lib/assistant/{generation,retrieval,guidance,catalog}.ts` | Flujo anterior, ahora respaldo |
| `src/scripts/assistant-chat.ts` + `src/components/AssistantChat.astro` + `src/styles/assistant-chat.css` | Chat compartido por widget y página |
| `src/pages/api/assistant-event.ts` | Clics en guías y votos de utilidad |
| `src/pages/admin/asistente.astro` | Panel de uso |

## Respaldo

Si falta `ANTHROPIC_API_KEY`, se supera el tope diario, Claude falla o declina, responde el flujo
anterior (Workers AI y, si tampoco está, textos fijos de urgencia y coincidencia por palabras). El
detector de urgencias por frases se conserva: activa el banner rojo en la interfaz y da el texto fijo
cuando Claude no está disponible.

## Puesta en producción

Dos pasos manuales, una sola vez. Sin ellos el sitio sigue funcionando con el flujo anterior.

```bash
# 1. Clave de la API de Anthropic (console.anthropic.com)
npx wrangler secret put ANTHROPIC_API_KEY

# 2. Tablas de métricas
npx wrangler d1 migrations apply cuidatuperroviejo-contact --remote
```

Variables opcionales (panel de Cloudflare → Worker → Settings → Variables):

| Variable | Por defecto | Para qué |
|---|---|---|
| `ASSISTANT_MODEL` | `claude-sonnet-5-5` | Cambiar de modelo, p. ej. `claude-haiku-5-5` para abaratar |
| `ASSISTANT_EFFORT` | `low` | `medium` o `high` para más razonamiento (más lento y caro) |
| `ASSISTANT_DAILY_LIMIT` | `200` | Consultas diarias atendidas por Claude; al superarlo entra el respaldo |
| `ASSISTANT_LOG_QUESTIONS` | activado | `off` para no guardar el texto de las consultas |
| `ANTHROPIC_BASE_URL` | — | Enrutar por Cloudflare AI Gateway |

## Coste (estimación, no medido con tráfico real)

Cada consulta envía el catálogo (~4.500 tokens, cacheable) y, si lee guías, entre 3.000 y 14.000
tokens por guía. Con Sonnet 5.5 (2 USD por millón de tokens de entrada, 10 de salida) sale en torno a
0,03–0,08 USD por consulta; con Haiku 5.5, unas veinte veces menos. El tope diario por defecto acota
el peor caso a unos 6–16 USD al día con Sonnet. Conviene además fijar un límite de gasto en la
consola de Anthropic. El panel muestra los tokens reales consumidos.

## Métricas

`migrations/0003_assistant_metrics.sql` crea `assistant_interactions` (una fila por consulta) y
`assistant_clicks`. El panel está en `/admin/asistente`, con el mismo usuario y contraseña que
`/admin/contact-messages`: consultas, visitantes y conversaciones por día, porcentaje con guía
recomendada, clics en guías, votos, guías más recomendadas, consultas sin guía (candidatas a
artículo nuevo) y tokens.

No se guarda la IP: `visitor_hash` es una huella que rota cada día. El texto de las consultas se
borra a los 180 días. Todo esto está descrito en la política de privacidad.

## Pruebas

- `npm test` incluye `tests/assistant.test.ts`: catálogo, limpieza de guías, validación de enlaces e
  historial, y el bucle de Claude contra una Messages API simulada.
- Prueba local de extremo a extremo: `.dev.vars` con `ANTHROPIC_API_KEY`, luego
  `npx wrangler d1 migrations apply cuidatuperroviejo-contact --local`, `npx astro build` y
  `npx astro preview`.

## Pendiente

- Validar la calidad de las respuestas con la API real: este rediseño se probó de extremo a extremo
  contra una API simulada, no contra Claude.
- Ajustar `ASSISTANT_EFFORT` y el modelo con los datos del panel.
- Decidir si se retira el código de «Assistant V2» (`src/lib/assistant/v2/`, `src/content/assistant/`,
  `tests/assistant-v2/`, `scripts/assistant-v2-eval/`), que sigue sin uso.
