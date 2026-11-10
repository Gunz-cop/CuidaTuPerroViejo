# Asistente IA (rediseño de noviembre de 2026)

Reemplaza al flujo anterior (un modelo pequeño con respuestas de 50–110 palabras) y al plan
«Assistant V2» de este directorio, que quedó en contratos y nunca se conectó a producción.

El motor es **Cloudflare Workers AI**, con el binding `AI` que el proyecto ya tenía: no hace falta
ninguna clave ni cuenta externa. Claude (API de Anthropic) queda implementado como motor opcional,
apagado por defecto.

## Qué hace

1. El visitante escribe en el widget flotante o en `/asistente-ia`.
2. **Selección:** una llamada corta al modelo, con el catálogo del sitio (título, descripción y ruta
   de cada guía, herramienta y sección), elige como máximo dos documentos que leer.
3. **Respuesta:** el modelo recibe el texto completo de esas guías y responde en streaming con base
   en ellas. Si ninguna encaja, responde con conocimiento veterinario general.
4. Las guías se recomiendan con enlaces dentro de la respuesta. El servidor comprueba cada enlace
   contra las páginas realmente publicadas: lo que no existe se deja como texto y de los enlaces
   válidos salen las tarjetas «Guías recomendadas».
5. Bajo cada respuesta la interfaz pone un aviso fijo de que no sustituye la consulta veterinaria.
   No depende del modelo.

No hay un índice propio. El asistente lee la proyección `agent-content/v1` que el build ya genera
para agentes externos (`dist/client/agent-content/v1/`), así que responde con el contenido publicado
tal cual y una guía nueva queda disponible con solo desplegar.

## Modelo

Por defecto `@cf/deepseek-ai/deepseek-v4.1-flash-1017`. Motivos, según el catálogo de Workers AI
consultado el 2026-11-10:

- Modelo grande (552B de parámetros, mezcla de expertos) con contexto de un millón de tokens: caben
  dos guías completas, que llegan a 14.000 tokens cada una.
- Precio moderado: 0,30 USD por millón de tokens de entrada, 1,20 de salida y 0,006 la entrada
  servida desde caché.
- Sin fecha de retirada anunciada. `glm-5.3-flash`, más barato, y `kimi-k2.6` se retiran el
  2026-11-20; `glm-5.3` cuesta casi cinco veces más.
- Requiere el plan Workers Paid, que la cuenta ya tiene.

La elección se hizo con la documentación, no midiendo respuestas: el binding `AI` no funciona en
local y este entorno no tiene acceso a la cuenta. Cambiar de modelo es cambiar `ASSISTANT_MODEL`.

## Piezas

| Archivo | Responsabilidad |
|---|---|
| `src/pages/api/ask.ts` | Orquesta: límite por IP, validación, motor, respaldo, métricas. JSON o streaming NDJSON |
| `src/lib/assistant/workers-ai.ts` | Motor por defecto: selección de guías y respuesta en streaming |
| `src/lib/assistant/claude.ts` | Motor opcional sobre la API de Anthropic (el modelo pide las guías con una herramienta) |
| `src/lib/assistant/prompt.ts` | Instrucciones y catálogo. Estables entre consultas para que se cacheen |
| `src/lib/assistant/knowledge.ts` | Catálogo y lectura de guías desde `agent-content/v1` |
| `src/lib/assistant/links.ts` | Validación de enlaces y tarjetas |
| `src/lib/assistant/request.ts` | Validación de la consulta y del historial |
| `src/lib/assistant/metrics.ts` | Registro en D1 y tope diario |
| `src/lib/assistant/{generation,retrieval,guidance,catalog}.ts` | Flujo anterior, ahora respaldo |
| `src/scripts/assistant-chat.ts` + `src/components/AssistantChat.astro` + `src/styles/assistant-chat.css` | Chat compartido por widget y página |
| `src/pages/api/assistant-event.ts` | Clics en guías y votos de utilidad |
| `src/pages/admin/asistente.astro` | Panel de uso |

## Respaldo

Si se supera el tope diario o el motor principal falla, responde el flujo anterior (el modelo
pequeño `qwen3-30b` y, si tampoco está, textos fijos de urgencia y coincidencia por palabras). El
detector de urgencias por frases se conserva: activa el banner rojo en la interfaz y da el texto fijo
cuando el modelo no está disponible.

## Puesta en producción

Un paso manual, una sola vez, para las métricas. Sin él el asistente funciona igual y solo no mide:

```bash
npx wrangler d1 migrations apply cuidatuperroviejo-contact --remote
```

Variables opcionales (panel de Cloudflare → Worker → Settings → Variables):

| Variable | Por defecto | Para qué |
|---|---|---|
| `ASSISTANT_MODEL` | `@cf/deepseek-ai/deepseek-v4.1-flash-1017` | Otro modelo del catálogo de Workers AI |
| `ASSISTANT_EFFORT` | `low` | Razonamiento: `none`, `low`, `high` o `max` (más lento y más tokens) |
| `ASSISTANT_DAILY_LIMIT` | `200` | Consultas diarias atendidas por el motor principal; al superarlo entra el respaldo |
| `ASSISTANT_LOG_QUESTIONS` | activado | `off` para no guardar el texto de las consultas |

## Coste (estimación, no medido con tráfico real)

Cada consulta envía el catálogo dos veces (~4.500 tokens cada una, cacheables) y entre 3.000 y
14.000 tokens por guía leída: unos 17.000 tokens de entrada y 800 de salida en un caso típico, que
son alrededor de 550 neuronas. Workers AI regala 10.000 neuronas al día, compartidas con cualquier
otro uso de Workers AI en la cuenta; después cobra 0,011 USD por cada 1.000.

- Hasta unas 18 consultas al día: sin coste.
- A partir de ahí: alrededor de 0,006 USD por consulta.
- Peor caso con el tope de 200 consultas diarias: en torno a 1 USD al día.

El panel muestra los tokens reales consumidos, que es lo que permite afinar estas cifras.

## Métricas

`migrations/0003_assistant_metrics.sql` crea `assistant_interactions` (una fila por consulta) y
`assistant_clicks`. El panel está en `/admin/asistente`, con el mismo usuario y contraseña que
`/admin/contact-messages`: consultas, visitantes y conversaciones por día, porcentaje con guía
recomendada, clics en guías, votos, guías más recomendadas, consultas sin guía (candidatas a
artículo nuevo) y tokens.

No se guarda la IP: `visitor_hash` es una huella que rota cada día. El texto de las consultas se
borra a los 180 días. Todo esto está descrito en la política de privacidad.

## Activar Claude más adelante

Si el uso lo justifica:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

y las variables `ASSISTANT_PROVIDER=anthropic` y, si no se quiere el valor por defecto
`claude-sonnet-5-5`, `ASSISTANT_MODEL`. Con Anthropic, `ASSISTANT_EFFORT` admite `low`, `medium` y
`high`, y `ANTHROPIC_BASE_URL` permite pasar por Cloudflare AI Gateway. Coste estimado: 0,03–0,08
USD por consulta con Sonnet 5.5. Antes de activarlo hay que añadir a Anthropic como proveedor en la
política de privacidad.

## Pruebas

- `npm test` incluye `tests/assistant.test.ts`: catálogo, limpieza de guías, validación de enlaces e
  historial, el motor de Workers AI con un binding simulado y el de Claude contra una API simulada.
- La interfaz, el streaming, las métricas y el panel se probaron de extremo a extremo en un
  navegador contra un servidor local, con el motor de Claude apuntando a una API simulada.
- El motor de Workers AI no se ha ejecutado contra el servicio real: el binding `AI` exige la cuenta
  de Cloudflare. La primera comprobación real es en un despliegue.

## Pendiente

- Probar en un despliegue 15–20 consultas reales y revisar formato, calidad y enlaces. Si el modelo
  no convence, cambiar `ASSISTANT_MODEL` o subir `ASSISTANT_EFFORT`.
- Decidir si se retira el código de «Assistant V2» (`src/lib/assistant/v2/`, `src/content/assistant/`,
  `tests/assistant-v2/`, `scripts/assistant-v2-eval/`), que sigue sin uso.
