# Fase 2 — propuesta, sin implementación

Investigación de solo lectura del 2026-11-11 mediante el conector Cloudflare.
No se añaden llamadas de analítica al Worker, secretos ni rastreadores.

## Evidencia específica del proyecto

- GET `/accounts/{account}/rum/site_info/list`: sitio cuidatuperroviejo.com,
  auto_install=true, ruleset.enabled=true, lite=false. Web Analytics está activo
  en configuración. Las políticas del sitio también describen la inyección automática.
- Una descarga del HTML público con curl no mostró beacon. Eso por sí solo no
  invalida la configuración (la inyección depende de la respuesta/solicitud).
  No se ha verificado la entrega del beacon en un navegador público ni su cobertura.
- POST `/graphql`: consulta real a viewer.accounts.rumPageloadEventsAdaptiveGroups,
  filtrada por siteTag del sitio, devolvió datos sin errors para siete días.
- Introspección: agregados count, sum.visits, avg.sampleInterval, confidence;
  dimensiones date, requestHost, requestPath, countryName, refererHost/Path,
  navegador, dispositivo y navegación, entre otras. No se encontró un campo
  de visitantes únicos en ese conjunto.
- settings.rumPageloadEventsAdaptiveGroups: enabled=true, maxDuration=8035200 s
  (93 días), notOlderThan=15897600 s (184 días), maxNumberOfFields=30.
  Son valores observados en esta cuenta, no una garantía universal ni permanente.
- Consulta real 2026-10-13T00:00:00Z a 2026-11-12T00:00:00Z, filtro siteTag:
  agrupación por date devuelve 30 grupos; top por requestPath y countryName
  devuelve 5 grupos cada uno, sin errors. Ambos intervalos 7/30 son posibles.
  Los datos del día actual son parciales. No se publican aquí cifras privadas de audiencia.

## Qué puede mostrarse

| Concepto | Definición y límite |
| --- | --- |
| Páginas vistas | count de eventos de carga observados por RUM; documentación: respuesta HTML satisfactoria. No es el total de recursos HTTP. Hay pérdidas por bloqueadores, JS deshabilitado, entrega o muestreo. |
| Visitas | sum.visits; una vista cuyo referer no coincide con el host, incluyendo entrada directa. Una visita puede incluir varias páginas; no equivale a una sesión deduplicada por persona. |
| Visitantes estimados | No hay contador de personas únicas en este esquema. Mostrar «No disponible» para únicos; no renombrar visitas como visitantes ni sumar únicos diarios para deducir personas mensuales. |
| Solicitudes HTTP | Peticiones de HTML, recursos y APIs a la red, potencialmente automatizadas. Son otra fuente; no sustituir páginas vistas ni audiencia humana por estas cifras. |
| Tendencia, páginas, países | Agrupar count y/o visits por date, requestPath y countryName. País aproximado de la conexión, no residencia ni identidad. Top de páginas vistas no prueba lectura completa del artículo. |

La finalidad es aproximar audiencia humana con las limitaciones de RUM, nunca
identificar personas exactas. No se propone un tablero de bots ni otro rastreador.
Antes de desarrollar fase 2, acordar los rótulos «visitas» y «páginas vistas» en vez
de prometer un total de visitantes únicos que la fuente no proporciona.

## Acceso y caché propuestos

Token propio de solo lectura, restringido a la cuenta: `Account > Account Analytics > Read`
para GraphQL. Para descubrir/inspeccionar la configuración RUM, `Account Settings > Read`
(el spec REST consultado lo exige); no hace falta conceder ese segundo permiso al
Worker si accountId y siteTag se configuran previamente. Sin permisos de edición,
D1, DNS o despliegue. El acceso del conector usado aquí no demuestra que exista un
secreto de lectura utilizable por el Worker. No se creó ni se obtuvo ese secreto.

Guardar el token únicamente como secreto del Worker en la fase autorizada; accountId
 y siteTag como configuración del servidor. Consultas a `/client/v4/graphql` solo
tras autenticar al administrador, con filtro fijo de sitio y host público, límites
acotados, timeout y manejo de HTTP 429, errors GraphQL, permisos insuficientes y datos
vacíos. Comprobar settings de nuevo antes de fijar intervalos de consulta.

Reutilizar KV existente con prefijo exclusivo `admin:audience:v1:` si se autoriza:
clave por sitio, rango y filtros normalizados; respuesta agregada con fetchedAt,
TTL 15 minutos, nunca datos individuales. No cachear errores como ceros. Si API
falla, mostrar dato previo explícitamente fechado y limitado (p.ej. máximo 24 h),
o No disponible. Cachear datos en servidor no cambia el no-store del HTML privado.
Agrupar en una solicitud las series y rankings; no consultar en cada navegador.
KV tiene consistencia eventual: podrían duplicarse algunas actualizaciones, tolerable
para este volumen; no introducir coordinación nueva salvo necesidad medida.

## Fuentes oficiales consultadas

- [Métricas y definición de visita](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/).
- [Dimensiones](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).
- [Autenticación GraphQL](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).
- [Descubrimiento de límites reales](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/).
- [Muestreo](https://developers.cloudflare.com/analytics/graphql-api/sampling/).
- OpenAPI de Cloudflare mediante el conector: GET /accounts/{account_id}/rum/site_info/list.

La conexión futura requiere autorización de fase 2 y validación con el token mínimo
real. La tarjeta de fase 1 seguirá sin números de audiencia hasta entonces.
