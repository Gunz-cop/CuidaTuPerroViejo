# Investigación: audiencia humana y tráfico automatizado

Fecha de las consultas: 2026-11-12 (UTC).
Ámbito: CuidaTuPerroViejo.com. Investigación de Codex para auditoría de Claude Code;
la elección de producto corresponde al propietario. **No implementa la fase 2**.

Solo se hicieron GET de lectura en REST, operaciones `query` en GraphQL y lectura
de documentación oficial. No se crearon tokens, reglas ni cambios del Worker o
Cloudflare. Este PR solo modifica este documento y TODO.md. No contiene totales
absolutos de audiencia, identificadores de cuenta/zona/sitio ni datos de lectores.
Los tamaños de ventanas, límites y grupos horarios son parámetros técnicos, no
cifras de audiencia.

## Resultado principal y grado de evidencia

Hay una separación útil, pero no exacta, entre actividad probablemente humana y
automatización. RUM permite `bot: 0` en esta cuenta: en la ventana cerrada de siete
días reduce páginas vistas un **1,02 %** y visitas un **1,36 %**. No demuestra que
el resto sean personas. El esquema dice «likely from a bot»; no revela cómo genera
esa clasificación. No se ha probado la igualdad numérica con el selector del panel
«Exclude Bots». [Q1, Q3; D1]

La fuente HTTP permite consultar categorías de bots verificados y también datos
no clasificados. No permite Bot Score en esta zona: la consulta devuelve una
denegación de acceso al campo. No se deben restar solicitudes HTTP a vistas RUM,
ni llamar «humanos» al tráfico sin categoría. [Q4, Q5; D4, D7]

Leyenda usada en el documento:

- **Verificado**: respuesta real de API, identificada como Rn o Qn en el anexo.
- **Documentado**: fuente oficial Dn; no implica prueba de acceso en esta cuenta.
- **No comprobado**: se indica el motivo y qué acceso o dato haría falta.
- **Propuesta**: diseño de indicador u opción, no una funcionalidad implementada.

## 1. Planes: cuenta, zona y Workers son cosas distintas

| Objeto | Resultado y procedencia | Qué permite afirmar |
| --- | --- | --- |
| Zona | REST R1: `plan.name = "Free Website"`, `plan.legacy_id = "free"`, `status = "active"` | El plan web de esta zona es Free. |
| Cuenta | REST R2: `type = "standard"`; no devuelve campo `plan` | `standard` es el tipo de cuenta; no significa «Workers Free» ni certifica una suscripción comercial. |
| Workers | El propietario confirma **Workers Paid** en esta conversación; REST R5 devuelve `default_usage_model = "standard"` | Workers Paid confirmado por el propietario. El modelo `standard` observado por API no sustituye la comprobación de facturación. |
| Suscripciones de cuenta | REST R3: HTTP 403, código `10000`, `Authentication error` | Con esta conexión no se puede verificar la lista de suscripciones. El conector explica que el endpoint exige un token con Billing Read/Write y no admite su OAuth actual. No se creó otro acceso. |

Cloudflare documenta expresamente que **Workers Paid es independiente del plan
Free/Pro/Business de la zona**. Por tanto, no hay contradicción entre Workers Paid
y Free Website. Tampoco se deduce que pagar Workers habilite Bot Management:
la denegación real de Bot Score prevalece para esta investigación. [D6; R1–R5; Q5]

## 2. Qué hace «Exclude Bots» y qué no sabemos

**Documentado:** en Web Analytics, la dimensión «Exclude Bots», puesta en Yes,
excluye tráfico bot y acerca los datos al tráfico de usuarios reales. La página
oficial no dice que elimine toda automatización ni publica ahí un algoritmo,
lista de agentes, umbral Bot Score o señal concreta. [D1]

**Verificado:** la introspección expone `dimensions.bot`, descrito literalmente:

> Indicates if the request is likely from a bot (non-human traffic). Returns 1 if from a bot, 0 otherwise.

El filtro `bot` es un escalar `uint8`. La cuenta autoriza `dimensions_bot` en
`availableFields` y las consultas `bot: 0` funcionan con la zona Free Website y
la cuenta indicada. No hizo falta activar Bot Fight Mode, que está desactivado.
Esto demuestra disponibilidad aquí; no una promesa de disponibilidad en todos
los planes o cuentas. [Q1–Q3; R1, R4]

**Señal de detección no comprobada:** las fuentes oficiales consultadas y la
introspección no explican qué combinación de User-Agent, IP, heurísticas o señales
del navegador alimenta el bit RUM. No lo atribuyo a User-Agent, verified bots o
Bot Score. Son señales y productos distintos; que el esquema exponga navegador
parseado del User-Agent no demuestra que ese sea el clasificador. Haría falta una
explicación oficial de Cloudflare sobre este campo. No se intenta ingeniería
inversa ni se generan peticiones de prueba de rastreo. [Q1; D1, D2, D7]

**Equivalencia con la interfaz:** `bot: 0` es el filtro API con semántica de
exclusión de bots que se ha verificado. La correspondencia exacta entre ese
filtro y el selector Yes del panel es **compatible con la documentación, pero no
confirmada por una comparación del panel ni por una descripción explícita de su
consulta interna**. El encargo limita el acceso a REST/GraphQL; no se usó sesión
del dashboard. Para cerrar esa comparación basta que el propietario/auditor
contraste misma ventana absoluta, sitio, hosts, zona horaria y selector, o facilite
la consulta de lectura que realiza el panel. No requiere un cambio de configuración.

### Qué no debe prometer

- No detecta necesariamente bots que evadan la clasificación. El bit significa
  «probable», no identidad humana verificada. [Q1]
- RUM mide beacons recibidos desde el navegador, no todo el tráfico de red:
  un crawler que no ejecute el beacon queda fuera del universo RUM antes incluso
  de aplicar el filtro. Puede haber pérdidas por red, bloqueo del script o JS
  deshabilitado. No se puede calcular la totalidad de bots del sitio con este
  porcentaje. [D2, D3]
- Excluir de una consulta no bloquea solicitudes ni cambia la seguridad del sitio.
  Bot Fight Mode es una mitigación aparte. [Q3; D8]
- No deduplica personas, no mide lectura completa y no quita al propietario ni
  pruebas por el mero hecho de usar `bot: 0`. Los filtros ejecutados acotan hosts
  públicos; no identifican al operador de cada carga. [Q1, Q3; D2]

## 3. Comparación de siete días: mismo universo, con y sin filtro

Consulta Q3, ventana **[2026-11-04 06:00 UTC, 2026-11-11 06:00 UTC)**:
son los días locales completos del 4 al 10 de noviembre en Costa Rica. Se usó el
siteTag del sitio y ambos hosts públicos. Única diferencia entre `all` y
`filtered`: `bot: 0`. También se agrupó por `bot` para comprobar la partición.

| Resultado | Sin filtro | Con `bot: 0` | Cambio relativo |
| --- | --- | --- | --- |
| Páginas vistas RUM (`count`) | Base 100 % | 98,98 % | **−1,02 %** |
| Visitas RUM (`sum.visits`) | Base 100 % | 98,64 % | **−1,36 %** |
| `avg.sampleInterval` | 1 | 1 | Sin muestreo indicado para esta ejecución |

`bot = 0` y `bot = 1` sumaron el agregado de páginas vistas; no hubo `errors`.
La fórmula aplicada es `(filtrado − base) / base × 100`. Se redondea a dos
decimales; no se guardan los numeradores ni denominadores absolutos. [Q3]

**No interpretar:** «98,98 % de lectores humanos» o «solo hay un 1,02 % de bots
en el sitio». Es una diferencia dentro de los eventos RUM recibidos y según el
clasificador de esa fuente, en esa ventana. El panel con Exclude Bots no se ha
comparado directamente por la limitación de acceso descrita arriba.

Una consulta exploratoria previa usó [2026-11-05 06:00 UTC, 2026-11-12 06:00 UTC),
que todavía no estaba cerrada al consultar. Se descartó para la comparación
principal y se repitió con los siete días cerrados. Su variación redondeada fue
−0,98 % en vistas y −1,29 % en visitas; **no es la misma ventana**. El anexo
registra también esas variables para hacer trazable el descarte. [Q3]

## 4. Otras fuentes y herramientas: disponibilidad real, aporte y coste

| Fuente/herramienta | Verificación en esta cuenta/zona | Qué aporta | Coste o riesgo |
| --- | --- | --- | --- |
| `rumPageloadEventsAdaptiveGroups` | `enabled=true`, `bot: 0` aceptado; RUM funciona sin Bot Fight Mode [Q2, Q3; R4] | Vistas, entradas y tendencias del universo del beacon, con clasificación bot | API sujeta a cuotas y muestreo; no implica nuevo rastreador. No es un censo de personas. [D2, D3, D11] |
| `httpRequestsAdaptiveGroups` | `enabled=true`; consulta real de siete días correcta [Q2, Q4] | Universo de peticiones de borde, incluidos bots que no ejecutan JS. Filtro `requestSource:"eyeball"` usado para tráfico entrante; **eyeball no significa humano** | Otra unidad y cobertura; muestreo real. Uso de API y posible almacenamiento/CPU si se integra después. No restar estos valores a RUM. [D4, D10] |
| `verifiedBotCategory` en HTTP | En `availableFields` y consulta real con categorías no vacías, incluidas AI [Q2, Q4] | Separar automatización conocida/verificada por categorías, incluidas búsqueda, monitoring y crawlers AI | Verificado no significa lector ni malicioso; categoría vacía no significa humano. Las categorías pueden cambiar. [D9] |
| User-Agent en HTTP | Figura en `availableFields` de Q2 y en el esquema; no se extraen agentes individuales en el documento | Segmentación adicional de automatización que se identifica por UA | Una cadena UA puede falsificarse; no prueba humanidad. Un filtro propio exigiría mantenimiento y podría clasificar mal. No se propone como sustituto de `bot` ni se implementa. [D9; Q1, Q2] |
| Bot Score granular / Bot Management | El esquema global contiene `botScore`, pero no figura entre los campos autorizados de Q2; Q5 devuelve que la zona no tiene acceso a `botscore` | Escala 1–99 de probabilidad, no una identidad; 0 significa no calculado | No disponible con este acceso/zona. Documentado para Enterprise con Bot Management adquirido; pedir evaluación comercial si se considera, sin deducir precio. Puede introducir detecciones JS y cookie `__cf_bm`; no se activa. [D7] |
| Bot Fight Mode | REST R4 lo expone como `fight_mode=false`; zona Free [R1]. La oferta Free lo incluye [D8] | Mitigación de bots simples/headless según documentación; no es un indicador de audiencia | Sin cargo adicional según documentación, pero riesgo de interferir con tráfico legítimo; actúa sobre dominio y no se puede excluir con Skip de reglas WAF. Activarlo sería un cambio de producto/configuración, fuera de este encargo. No habilita por sí mismo el campo Bot Score. [D8; Q5] |
| AI Crawl Control / informes de AI | REST R6 `ai-audit/robots` devuelve éxito; HTTP Q4 entrega categorías AI. Documentación: producto disponible en todos los planes. **La interfaz de informes no se ha abierto ni se ha comprobado cada tarjeta del dashboard** | Visibilidad específica de accesos automatizados AI, no de todos los bots ni de personas. Hay una vía de datos AI por categoría que sí se ha comprobado | Lectura sin cambios de acceso; modificar políticas bloquearía tráfico y requiere decisión. Referidos y algunas vistas detalladas son de planes de pago según D12; Workers Paid no demuestra habilitación de esas tarjetas de zona. Falta comprobarlas con acceso al panel si se desean. [D12; R6, Q4] |
| `httpRequests1dGroups.uniq.uniques` | Dataset habilitado; consulta real Q6 devuelve estructura `uniq` sin errors [Q2, Q6] | Número de IPs únicas según descripción del esquema | No son personas únicas: NAT agrupa personas y una persona puede usar varias IPs; incluye bots. No mezclar con RUM ni sumar únicos diarios como únicos mensuales. [Q1, Q6; D5] |
| `firewallEventsAdaptiveGroups` | `enabled=false`, `maxDuration=0`, `notOlderThan=0` en esta zona [Q2] | Si estuviera habilitado, eventos de mitigación; no todo el tráfico. Una solicitud puede generar varios eventos | No se puede prometer como fuente aquí. La documentación general de retención no anula settings real; además hay muestreo. Serían necesarios permisos/entitlement que habiliten ese nodo antes de diseñar su integración. [D11, D13] |

Como comprobación de Q4, aproximadamente **14,44 %** de las solicitudes HTTP
seleccionadas tenían categoría de bot verificado no vacía; el resto quedó sin
categoría. Las categorías `AI Crawler`, `AI Search` y `AI Assistant` sumaron
aproximadamente **2,99 %** de las solicitudes seleccionadas. Son porcentajes de
**solicitudes HTTP**, no lectores ni vistas RUM. El `avg.sampleInterval` agregado
fue aproximadamente 1,128 (muestreo); las categorías y el total coincidieron al
sumar en esta ejecución. No se obtuvo una cifra de «total de bots» ni se la dedujo
como complemento de la categoría vacía. [Q4]

La comprobación de AI Crawl Control es parcial: acceso REST al recurso de robots
y datos AI en HTTP; no certifica una suscripción a funciones avanzadas del panel.
No se prueban funciones mediante activación, compra ni creación de reglas.

## 5. Definiciones e indicadores que podrían mostrarse

### Unidades que no deben confundirse

| Dato | Definición de la fuente | Diferencia práctica |
| --- | --- | --- |
| Solicitudes HTTP | Peticiones atendidas en el borde; una página suele generar varias para HTML, recursos y APIs [D4] | Incluyen automatización; dependen de ámbito/filtros, y no equivalen a vistas. Tampoco todo acceso cacheado en el navegador requiere una petición nueva. [D1] |
| Páginas vistas | Documentación: respuesta HTML satisfactoria. En el dataset RUM, `count` se describe como páginas vistas por usuarios finales y procede del beacon [D2, D14; Q1] | Son cargas observadas, no prueba de lectura completa; el universo RUM difiere del HTTP. |
| Visitas | Vista iniciada desde otro sitio o acceso directo; RUM describe `Document.referrer` que no coincide con el host [D14; Q1] | Una visita puede tener varias páginas vistas. No deduplica por persona ni equivale a una sesión de 30 minutos. |
| Visitantes únicos en HTTP Analytics | `uniq.uniques`: «A number of unique IPs» [Q1, Q6]; la FAQ de Analytics explica las diferencias por IP y bots [D5] | No personas reales únicas. NAT, cambios de red y bots impiden esa equivalencia. |
| Visitantes únicos en este RUM | **No hay agregado de únicos disponible en el esquema examinado**: root `avg/confidence/count/dimensions/sum`; `sum` solo tiene `visits`, `avg` solo `sampleInterval`; no hay dimensión de identidad/visitante [Q1] | Se confirma la propuesta anterior para este dataset. Que exista un único de IP en HTTP no corrige ni rellena esa ausencia de RUM. |

La FAQ general de Analytics llega a usar «visit» para una IP identificada [D5];
no trasladar esa frase al campo RUM `sum.visits`, cuya definición específica se
ha leído en el esquema. Mostrar nombres y definiciones ligados a su fuente evita
mezclar productos.

### Propuesta de indicadores, sujeta a auditoría y decisión

| Nombre visible propuesto | Definición en una línea | Limitación que debe acompañarlo |
| --- | --- | --- |
| **Páginas vistas · bots detectados excluidos** | `count` RUM con `bot:0`, sitio/hosts y ventana local elegida | Estimación de cargas observadas; pueden quedar bots sin detectar y faltar visitas sin beacon. No afirmar aún igualdad exacta con el panel. [Q1, Q3] |
| **Visitas · bots detectados excluidos** | `sum.visits` del mismo RUM filtrado | Entradas según referer; no personas ni sesiones deduplicadas. [Q1, D14] |
| **Evolución diaria de páginas vistas** | Suma de grupos horarios RUM por día de Costa Rica | Días en curso parciales; muestreo y cobertura del beacon, con fecha de actualización. [Q7] |
| **Páginas más vistas** | Agrupar `count` RUM filtrado por `requestPath` | Popularidad por cargas, no lectura completa ni tiempo de lectura; mantener filtro de host y avisar límite del ranking. Dimensión disponible; en esta investigación no se extrajo un nuevo ranking. [Q1, Q2] |
| **País de las páginas vistas** | Agrupar el mismo RUM por `countryName` | País de conexión estimado; no nacionalidad ni personas distintas. Dimensión disponible; no se extrajo un ranking aquí. [Q1; D1, D5] |
| **Exclusión aplicada** (dato metodológico, opcional) | Diferencia porcentual entre RUM sin filtro y `bot:0` | Porcentaje detectado por esa fuente; no proporción de todos los bots del sitio. [Q3] |
| **Solicitudes de bots verificados** (bloque técnico separado, opcional) | Solicitudes HTTP por categoría verificada no vacía | Unidad de red y universo distinto; no es una métrica de lectores. No se necesita para la portada de audiencia. [Q4, D9] |

**No mostrar como audiencia:** «personas reales», «lectores humanos exactos»,
«visitantes únicos RUM», complemento de bots verificados llamado humanos,
solicitudes totales llamadas visitas, ni un porcentaje global de bots obtenido
restando HTTP a RUM. Tampoco `Bot Score=0` como humano, ni sumar únicos diarios
para obtener únicos del periodo. [Q1, Q3–Q6; D4, D5, D7]

## 6. Días de Costa Rica y límites reales

La propuesta usa `America/Costa_Rica`, UTC−6 sin cambio estacional, como pide el
encargo. No hay parámetro de zona horaria en los filtros RUM inspeccionados. Sí
se puede seleccionar la ventana UTC equivalente y agrupar por `datetimeHour`.
Para este caso de desplazamiento entero y fijo, cada día local va de 06:00 UTC
incluida a 06:00 UTC excluida del día siguiente. [Q1, Q7]

Q7 se ejecutó en dos ventanas cerradas:

| Ventana UTC | Días locales | `limit` solicitado / grupos devueltos | Resultado |
| --- | --- | --- | --- |
| 2026-11-04 06:00 → 2026-11-11 06:00 | 4–10 de noviembre, 7 días | 168 / 140 grupos horarios | Sin errors; `sampleInterval=1`; suma horaria vs. total: diferencia 0 % en vistas y visitas. |
| 2026-10-12 06:00 → 2026-11-11 06:00 | 12 de octubre–10 de noviembre, 30 días | 720 / 175 grupos horarios | Sin errors; intervalos de muestra horarios entre 10 y 12,5; agregado ≈10,045; suma horaria vs. total: diferencia 0 % en vistas y visitas. |

Los grupos devueltos son horas con estimaciones presentes, **no número de vistas**.
Se reagruparon en memoria restando seis horas al timestamp antes de tomar la fecha;
se obtuvieron las 7/30 fechas locales previstas. No se guardó código de aplicación.
Una implementación futura debería usar el huso IANA y completar el calendario
como representación de la serie, sin tratar la ausencia de un grupo muestreado
como prueba de que no hubo tráfico. Nunca multiplicar otra vez `count` por el
intervalo de muestra: Cloudflare ya devuelve estimaciones. [Q7; D3, D10]

| Dataset / ámbito | `enabled` | `maxDuration` | `notOlderThan` | `maxPageSize` | `maxNumberOfFields` |
| --- | --- | --- | --- | --- | --- |
| RUM / cuenta | true | 8.035.200 s (93 días) | 15.897.600 s (184 días) | 10.000 | 30 |
| HTTP Adaptive / zona | true | 2.592.000 s (30 días) | 2.678.400 s (31 días) | 10.000 | 40 |
| HTTP 1d / zona | true | 31.539.600 s | 31.539.600 s | 10.000 | No solicitado |
| Firewall groups / zona | false | 0 | 0 | 10.000 | No solicitado |

Son respuestas actuales, no límites universales garantizados. [Q2; D11]

Las ventanas RUM de 604.800 y 2.592.000 segundos quedan dentro de 8.035.200;
168/720 quedan bajo 10.000. Q7 solicita menos de 30 campos por nodo y limita solo
la dimensión hora, por lo que no hay explosión de combinaciones de ruta/país.
Si se agregaran dimensiones, el cálculo del máximo ya no sería 24×días. Ambos
resultados quedan por debajo del límite solicitado y se compararon con un nodo
sin dimensiones, descartando truncamiento de esta serie en esta ejecución. [Q2, Q7]

**Muestreo:** la consulta de 30 días sí está muestreada. La igualdad de sumas
observada no garantiza igualdad en futuras consultas ni precisión de cada hora.
El panel debería indicar «estimado», conservar el intervalo de muestra y, si se
necesita más resolución, evaluar consultas por intervalos menores y sus costes
antes de prometer una serie precisa. No se ha probado una estrategia de 30
consultas diarias. Las cuotas generales también aplican: documentación actual,
300 queries por cinco minutos por usuario por defecto; cachear en servidor sería
una decisión de la fase 2, no un cambio hecho aquí. [D3, D10, D11]

## 7. Anexo de evidencia reproducible

Todas las operaciones siguientes se enviaron a
`POST https://api.cloudflare.com/client/v4/graphql` como **query**, nunca mutation.
Se omiten el encabezado de autenticación y los IDs. En las variables, `<ACCOUNT>`,
`<ZONE>` y `<SITE>` representan los valores reales usados; no son ejemplos de otro
sitio. Los resultados resumidos arriba proceden de esas operaciones, no de una
simulación. `errors:null` significa respuesta correcta; el acceso a un campo del
esquema global no equivale a que esté autorizado para la zona.

### REST, lecturas ejecutadas

| Ref. | GET relativo a `/client/v4` | Resultado resumido |
| --- | --- | --- |
| R1 | `/zones/<ZONE>` | active; Free Website; legacy_id free. |
| R2 | `/accounts/<ACCOUNT>` | type standard, sin campo plan. Se omiten nombre/correo/IDs. |
| R3 | `/accounts/<ACCOUNT>/subscriptions` | HTTP 403, código 10000 Authentication error; conector señala Billing Read y falta de soporte OAuth para ese endpoint. No se solicitó ampliación. |
| R4 | `/zones/<ZONE>/bot_management` | fight_mode=false, enable_js=false, ai_bots_protection=disabled; varias políticas AI individuales disabled. No se modificaron. |
| R5 | `/accounts/<ACCOUNT>/workers/account-settings` | success=true; default_usage_model=standard; green_compute=false. No identifica por sí solo una suscripción. |
| R6 | `/zones/<ZONE>/ai-audit/robots` | success=true; resultado con claves userAgents y sitemaps. No se vuelcan sus entradas. |

Los endpoints REST se localizaron antes en el OpenAPI de Cloudflare mediante el
conector. R3 requiere Billing Read; R4 permite Bot Management Read; R6 permite
Zone Settings Read. La investigación usó el acceso existente, sin crear permisos.

### Q1. Esquema y definiciones

```graphql
query InspectEvidence {
  rum: __type(name: "AccountRumPageloadEventsAdaptiveGroups") { description fields { name description } }
  dimensions: __type(name: "AccountRumPageloadEventsAdaptiveGroupsDimensions") { fields { name description } }
  sums: __type(name: "AccountRumPageloadEventsAdaptiveGroupsSum") { fields { name description } }
  averages: __type(name: "AccountRumPageloadEventsAdaptiveGroupsAvg") { fields { name description } }
  filter: __type(name: "AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject") { inputFields { name type { kind name ofType { kind name } } } }
  settings: __type(name: "Settings") { fields { name description } }
  httpDimensions: __type(name: "ZoneHttpRequestsAdaptiveGroupsDimensions") { fields { name description } }
  uniqueIPs: __type(name: "ZoneHttpRequests1dGroupsUniq") { fields { name description } }
}
```

### Q2. Disponibilidad, campos y límites

```graphql
query Capabilities($account: string!, $zone: string!) {
  viewer {
    accounts(filter: {accountTag: $account}) {
      settings {
        rumPageloadEventsAdaptiveGroups {
          enabled maxDuration maxPageSize maxNumberOfFields notOlderThan availableFields
        }
      }
    }
    zones(filter: {zoneTag: $zone}) {
      settings {
        httpRequestsAdaptiveGroups {
          enabled maxDuration maxPageSize maxNumberOfFields notOlderThan availableFields
        }
        httpRequests1dGroups { enabled maxDuration maxPageSize notOlderThan }
        firewallEventsAdaptiveGroups { enabled maxDuration maxPageSize notOlderThan }
      }
    }
  }
}
```

Variables: `{"account":"<ACCOUNT>","zone":"<ZONE>"}`. Resultado: `errors:null`;
valores de límites en §6. En RUM aparecen `dimensions_bot`,
`dimensions_datetimeHour`, `dimensions_requestHost`, `dimensions_requestPath` y
`sum_visits`. En HTTP aparecen `dimensions_verifiedBotCategory` y
`dimensions_userAgent`, pero no `dimensions_botScore`. No se usa la mera existencia
del tipo en Q1 como evidencia de permiso.

### Q3. Comparación de bots RUM

```graphql
query CompareRumBots($account: string!, $site: string!, $start: Time!, $end: Time!) {
  viewer {
    accounts(filter: {accountTag: $account}) {
      all: rumPageloadEventsAdaptiveGroups(limit: 1, filter: {siteTag: $site, datetime_geq: $start, datetime_lt: $end, requestHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"]}) { count sum { visits } avg { sampleInterval } }
      filtered: rumPageloadEventsAdaptiveGroups(limit: 1, filter: {siteTag: $site, datetime_geq: $start, datetime_lt: $end, requestHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"], bot: 0}) { count sum { visits } avg { sampleInterval } }
      classified: rumPageloadEventsAdaptiveGroups(limit: 2, filter: {siteTag: $site, datetime_geq: $start, datetime_lt: $end, requestHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"]}) { count sum { visits } dimensions { bot } avg { sampleInterval } }
    }
  }
}
```

### Q4. Categorías HTTP

```graphql
query EdgeCategories($zone: string!, $start: Time!, $end: Time!) {
  viewer { zones(filter: {zoneTag: $zone}) {
    total: httpRequestsAdaptiveGroups(limit: 1, filter: {datetime_geq: $start, datetime_lt: $end, requestSource: "eyeball", clientRequestHTTPHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"]}) { count avg { sampleInterval } }
    categories: httpRequestsAdaptiveGroups(limit: 100, filter: {datetime_geq: $start, datetime_lt: $end, requestSource: "eyeball", clientRequestHTTPHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"]}) { count dimensions { verifiedBotCategory } avg { sampleInterval } }
  } }
}
```

### Q5. Prueba explícita del campo Bot Score

```graphql
query BotScoreProbe($zone: string!) {
  viewer {
    zones(filter: {zoneTag: $zone}) {
      httpRequestsAdaptiveGroups(limit: 1, filter: {
        datetime_geq: "2026-11-10T06:00:00Z"
        datetime_lt: "2026-11-11T06:00:00Z"
      }) { count dimensions { botScore } }
    }
  }
}
```

Variables: `{"zone":"<ZONE>"}`. Resultado: el conector devuelve `isError:true`,
código `INVALID_ARGUMENT`, con mensaje GraphQL:
`zone '<ZONE>' does not have access to the field 'botscore' from the path`.
No es un cero de tráfico ni una ausencia de bots: es falta de acceso al campo.

### Q6. Acceso al agregado de IPs únicas

```graphql
query EdgeUniqueProbe($zone: string!) {
  viewer {
    zones(filter: {zoneTag: $zone}) {
      httpRequests1dGroups(limit: 1, filter: {
        date_geq: "2026-11-04", date_lt: "2026-11-11"
      }) { uniq { uniques } }
    }
  }
}
```

Variables: `{"zone":"<ZONE>"}`. Resultado: `errors:null`, estructura `uniq`
presente. Se omite el valor; solo se comprueba acceso. La definición «A number
of unique IPs» procede de introspección Q1, no de una inferencia por el nombre.

### Q7. Horas locales

```graphql
query LocalHours($account: string!, $site: string!, $start: Time!, $end: Time!, $limit: uint64!) {
  viewer { accounts(filter: {accountTag: $account}) {
    total: rumPageloadEventsAdaptiveGroups(limit: 1, filter: {siteTag: $site, datetime_geq: $start, datetime_lt: $end, requestHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"], bot: 0}) { count sum { visits } avg { sampleInterval } }
    hours: rumPageloadEventsAdaptiveGroups(limit: $limit, orderBy: [datetimeHour_ASC], filter: {siteTag: $site, datetime_geq: $start, datetime_lt: $end, requestHost_in: ["cuidatuperroviejo.com", "www.cuidatuperroviejo.com"], bot: 0}) { count sum { visits } dimensions { datetimeHour } avg { sampleInterval } }
  } }
}
```

### Variables, resúmenes y tratamiento fuera de GraphQL

| Consulta | Variables efectivas, con IDs sustituidos | Resultado resumido |
| --- | --- | --- |
| Q1 | Sin variables | Sin errors; bit bot, tipo uint8, definición de visitas y de IPs únicas; sin agregado de visitantes únicos RUM. |
| Q3 principal | `account=<ACCOUNT>`, `site=<SITE>`, `start=2026-11-04T06:00:00Z`, `end=2026-11-11T06:00:00Z` | −1,02 % vistas, −1,36 % visitas; sampleInterval 1; partición bot coincide con total. |
| Q3 exploratoria descartada | Mismos IDs, `start=2026-11-05T06:00:00Z`, `end=2026-11-12T06:00:00Z` | Ventana todavía abierta; −0,98 % y −1,29 %. No usada para conclusión principal. |
| Q4 | `zone=<ZONE>`, `start=2026-11-04T06:00:00Z`, `end=2026-11-11T06:00:00Z` | Sin errors; categorías no vacías ≈14,44 %, categorías AI indicadas ≈2,99 %; muestreo ≈1,128. |
| Q7 siete días | `account=<ACCOUNT>`, `site=<SITE>`, `start=2026-11-04T06:00:00Z`, `end=2026-11-11T06:00:00Z`, `limit=168` | 140 grupos horarios; siete fechas locales; diferencia de sumas 0 %; sampleInterval 1. |
| Q7 treinta días | Mismos IDs, `start=2026-10-12T06:00:00Z`, `end=2026-11-11T06:00:00Z`, `limit=720` | 175 grupos horarios; treinta fechas locales; diferencia de sumas 0 %; muestra horaria 10–12,5. |

Las operaciones Q3/Q4/Q7 devolvieron agregados; dentro de la herramienta se
transformaron en porcentajes, intervalos de muestreo y comprobaciones de sumas.
El documento no almacena conteos absolutos. Para Q7 se sumaron `count` y
`sum.visits` por fecha local, calculada del timestamp horario UTC menos seis horas;
no se deduplicaron visitas ni se inventó una identidad.

Se hicieron además lecturas de descubrimiento de tipos mediante introspección
`__schema { types { name } }` y variantes que seleccionaban `fields` o
`inputFields` de los mismos tipos; Q1 reúne la introspección final ejecutada que
sustenta las conclusiones. No se usó una consulta mutation ni una fuente alternativa
para suplir los permisos denegados.

## 8. Fuentes oficiales y límites que quedan abiertos

Fuentes leídas el 2026-11-12. Las referencias Q/R son resultados reales del
anexo, con parámetros reproducibles y sin secretos. La documentación describe
el producto; para disponibilidad concreta se da prioridad a settings y a las
pruebas de acceso de esta zona/cuenta.

- **D1:** [Dimensiones de Web Analytics](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/): Exclude Bots y tipos de navegación.
- **D2:** [Origen y recogida de RUM](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/): beacon, navegador y ausencia de seguimiento individual entre propiedades.
- **D3:** [FAQ de Web Analytics](https://developers.cloudflare.com/web-analytics/faq/): pérdida de beacons, muestreo dinámico y sampleInterval; ninguna muestra en la ingestión del beacon según esa FAQ.
- **D4:** [Analytics de zona](https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/): unidades HTTP, cobertura de tráfico legítimo y automatizado y diferencias de planes.
- **D5:** [FAQ general de Analytics](https://developers.cloudflare.com/analytics/faq/about-analytics/): IPs únicas y discrepancias con medición de navegador.
- **D6:** [Precios de Workers, Fine Print](https://developers.cloudflare.com/workers/platform/pricing/#fine-print): Workers Paid separado de otros planes de Cloudflare.
- **D7:** [Bot Score](https://developers.cloudflare.com/bots/concepts/bot-score/): escala, 0 no calculado, Enterprise Bot Management y cookie `__cf_bm`.
- **D8:** [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) y [oferta Free](https://developers.cloudflare.com/bots/plans/free/): alcance, disponibilidad y límites de mitigación.
- **D9:** [Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/): verificación, identidad declarada y categorías, incluidas las categorías legadas usadas por Q4.
- **D10:** [Muestreo GraphQL](https://developers.cloudflare.com/analytics/graphql-api/sampling/): resultados estimados, tasas adaptativas y ausencia de control directo del muestreo.
- **D11:** [Límites GraphQL](https://developers.cloudflare.com/analytics/graphql-api/limits/) y [descubrimiento de settings](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/): límites por dataset/cuenta/zona y cuota general.
- **D12:** [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) y [analizar tráfico AI](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/): todos los planes para el producto base; algunas funciones, entre ellas referrals, requieren plan de pago.
- **D13:** [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/): eventos, no necesariamente solicitudes distintas, y muestreo.
- **D14:** [Métricas de Web Analytics](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/): páginas vistas y visitas.
- **REST:** [Zona](https://developers.cloudflare.com/api/resources/zones/methods/get/), [cuenta](https://developers.cloudflare.com/api/resources/accounts/methods/get/), [suscripciones](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get/), [Bot Management](https://developers.cloudflare.com/api/resources/bot_management/methods/get/), [Workers account settings](https://developers.cloudflare.com/api/resources/workers/subresources/account_settings/methods/get/); robots de AI Audit: lectura R6, especificación del OpenAPI consultado. Para rutas y permisos REST se consultó además el OpenAPI actual del conector; las rutas exactas ejecutadas están en R1–R6.

Pendiente y motivo:

1. **Señal exacta del bit bot RUM:** no revelada en fuentes consultadas ni en el esquema; necesita explicación oficial de Cloudflare. No se supone que sea Bot Score ni UA.
2. **Paridad con Exclude Bots del panel:** falta contraste con la misma selección de tiempo/hosts. No se accedió al dashboard por el límite de APIs del encargo.
3. **Suscripción Workers Paid vía facturación:** el propietario la confirma; R5 devuelve modelo standard, R3 no permite leer suscripciones. Si se exige evidencia de facturación de API, haría falta Billing Read con un acceso compatible, no creado en esta investigación. No es necesario para validar los campos que ya respondieron.
4. **Tarjetas avanzadas de AI Crawl Control:** disponibilidad del producto base documentada y lecturas parciales comprobadas; falta entrar al panel o disponer de una API de entitlement que confirme cada tarjeta. No equiparar Workers Paid con Pro de la zona.
5. **Precisión de clasificación:** ninguna de estas lecturas ofrece una verdad de terreno de personas reales; no permite cuantificar falsos positivos/negativos. El informe solo mide diferencia entre filtros.

No se ejecutó build ni pruebas de aplicación nuevas para este PR: no cambia código,
configuración ni dependencias. La validación de la investigación son las lecturas
reales anteriores, revisión de referencias, ausencia de IDs/totales privados y diff
limitado a los dos archivos solicitados. Los checks automáticos del PR se informarán
con su estado real, sin confundirlos con auditoría independiente del contenido.

## Opciones para la fase 2

Alternativas para que Claude audite y el propietario decida; **no se elige una**.

| Alternativa | Pros | Contras | Qué necesita del propietario |
| --- | --- | --- | --- |
| **A. Audiencia RUM con bots detectados excluidos** | Vistas, visitas, páginas y países en la fuente ya habilitada; días de Costa Rica probados; sin nueva medición propia | Clasificador incompleto/no descrito, sin personas únicas y con muestreo en 30 días; falta contraste exacto con panel | Acordar nombres y límites de §5, resolver si exige paridad del panel y autorizar fase 2. Para integrar en Worker: token dedicado de solo lectura Account Analytics Read, no creado aquí. |
| **B. RUM más un resumen técnico separado de automatización HTTP** | Mantiene audiencia RUM y añade visibilidad de bots verificados/AI que no ejecutan JS; campos HTTP comprobados | Más consultas, caché y conceptos; no produce una cifra total de bots ni permite restar universos. Puede distraer del escritorio general | Autorizar explícitamente ese bloque técnico, sus métricas y costes operativos; además del acceso RUM, token de lectura de Analytics de la zona acotada. Sin activar mitigación ni adquirir productos. |
| **C. Posponer cifras del escritorio hasta cerrar clasificación/paridad** | Permite contrastar el panel y obtener aclaración oficial del bit bot antes de fijar etiquetas o ampliar el alcance | Retrasa integración; ni siquiera una mejora de plan garantizaría personas exactas | Propietario/auditor contrasta el panel con Q3 y decide tolerancia a estimación; si necesita Bot Score, solicitar propuesta comercial y permisos/entitlement nuevos por separado. No es una consecuencia de tener Workers Paid. |
