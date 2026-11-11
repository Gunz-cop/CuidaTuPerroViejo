# Panel de monetización

## Estado del encargo

El propietario pidió un panel privado para conocer qué fichas afiliadas generan clics y desde qué países, y poder incorporar Amazon, AdSense y publicidad contratada en el futuro.

**Primera versión activa en producción desde el 11 de noviembre de 2026** (commit `6d9f29b` en `main`). El propietario aplicó la migración `0004` en `cuidatuperroviejo-contact` y verificó en `/admin/monetizacion` el primer clic real desde el sitio público (Costa Rica, `cama-guia-01`). Lo que queda son las «Decisiones pendientes del propietario».

El piloto de AliExpress ya está publicado en la guía de camas. La referencia aprobada es `src/components/CamaAfiliada.astro`. Tiene video a petición, un único enlace afiliado directo y aviso breve de comisión debajo del CTA. La ubicación estable es `cama-guia-01`, identificada por `data-affiliate-placement`. Su enlace usa el Tracking ID `default`. La v1 le añade un contador propio sin cambiar el `href`.

## Implementación v1

| Pieza | Archivo | Qué hace |
| --- | --- | --- |
| Registro de fichas | `src/lib/affiliate/clicks.ts` | `AFFILIATE_PLACEMENTS` lista las ubicaciones aceptadas con proveedor, página, nombre y Tracking ID. Una ficha nueva necesita entrada aquí para contar clics. También normaliza el país, separa producción de pruebas y valida el origen. |
| Tabla | `migrations/0004_affiliate_clicks.sql` | `affiliate_clicks_daily`: una fila por día UTC, ubicación, país y entorno con el total. Sin IP, huella ni identificador. `XX` = sin determinar, `T1` = Tor. |
| Recepción | `src/pages/api/affiliate-click.ts` | `POST {"placement":"…"}`. Rechaza otro origen (403), ubicaciones no registradas (400) y cuerpos grandes (413). Limita ráfagas con `CLICK_LIMIT` (20/min por IP, la clave no se guarda). Si D1 falla, responde 204 y solo se pierde la medición. |
| Aviso del navegador | `src/scripts/affiliate-clicks.ts`, importado por `CamaAfiliada.astro` | Delegación sobre `[data-affiliate-placement] a[rel~="sponsored"]`: `sendBeacon` y, si no, `fetch` con `keepalive`. No cancela ni reescribe la navegación. Un doble clic en menos de 2 s cuenta una vez. Solo se carga en páginas con ficha. |
| Panel | `src/pages/admin/monetizacion.astro` | Misma protección que `/admin/asistente` (Basic Auth + `ADMIN_LIMIT`, `no-store`). Rangos 7/30/90 días, filtro por país, conmutador sitio público / pruebas, totales, tabla por ficha con desglose por país y Tracking ID, tabla por país, tendencia diaria, fuentes pendientes y cobertura. |
| Rate limit | `wrangler.jsonc`, `worker-configuration.d.ts` | Binding `CLICK_LIMIT` (`namespace_id` 1003). |
| Políticas | `politica-de-privacidad.astro`, `politica-de-cookies.astro` | Describen el recuento: qué se envía, qué se agrega y qué no se guarda. |
| Pruebas | `tests/affiliate-clicks.test.ts` | Registro, CTA único y directo, país, entorno, origen y agregado SQL. |

**Tráfico de prueba.** El entorno lo decide el servidor por el host de la solicitud: solo `cuidatuperroviejo.com` y `www.` cuentan como `produccion`; vistas previas, `workers.dev` y local quedan como `prueba` y el panel los muestra aparte.

**Verificación local del 11 de noviembre** (`wrangler dev` con D1 local y la migración aplicada, salidas a AliExpress interceptadas): clic, Enter y clic con rueda registran un aviso y abren `https://s.click.aliexpress.com/e/_c4FQx8UJ`; doble clic abre el enlace y cuenta una vez; con el endpoint caído y sin JavaScript el enlace abre igual (sin aviso en el segundo caso). Endpoint: sin `Origin` 403, otro origen 403, ficha desconocida 400, válido 204. Panel: sin credenciales 401, con credenciales 200 y `no-store`, sin desbordamiento horizontal a 390 px. `astro check` 0 errores, `npm test` 132/132, `astro build` correcto.

**Activación** (hecha el 11 de noviembre; se conserva como referencia para entornos nuevos):

1. Revisar y fusionar el PR.
2. Aplicar la migración en producción: `npx wrangler d1 migrations apply cuidatuperroviejo-contact --remote`. Si se fusiona antes, el endpoint responde 204 sin guardar nada y el panel muestra el aviso de la migración.
3. Hacer un clic real desde el sitio público y comprobar que aparece en `/admin/monetizacion`.

**Retirada.** Quitar el `import` del script en `CamaAfiliada.astro` detiene el envío; el enlace no cambia. La tabla puede quedarse o borrarse con una migración nueva.

## Decisiones pendientes del propietario

- **Consentimiento.** Criterio aplicado: el aviso solo se envía cuando el lector pulsa el CTA, no usa cookies ni almacenamiento local, no lee nada del dispositivo, no guarda IP ni identificadores y solo produce totales agregados de primera parte para decidir qué fichas mantener. Con ese diseño no se añadió banner, igual que con las métricas del asistente. Riesgo residual: las directrices 2/2023 del EDPB interpretan de forma amplia el «acceso» al terminal y podrían incluir una petición iniciada por JavaScript; la AEPD admite exenciones para medición de audiencia con condiciones que deben comprobarse caso a caso. Si el propietario prefiere no asumirlo, la alternativa es condicionar el script a un consentimiento o quedarse solo con los informes del comercio.
- **Tracking ID por ficha.** Crear en AliExpress Portals un ID propio para `cama-guia-01` permitiría contrastar el contador propio con los clics, pedidos y comisión del informe. Cambiar el ID implica regenerar el enlace y actualizar `trackingId` en el registro.
- **Informe del comercio.** Comprobar si AliExpress Portals ofrece clics por país y Tracking ID, y en qué formato se exporta, antes de diseñar la importación (manual por CSV o API).
- **Vistas del artículo.** Para calcular clics por 100 vistas hace falta un token de lectura de la API GraphQL de Cloudflare (Web Analytics) guardado como secreto del Worker.

## Datos disponibles hoy

| Dato | ¿Disponible? |
| --- | --- |
| Clics propios por ficha, día y país estimado | Sí, desde el 11 de noviembre de 2026. |
| Vistas del artículo | En el panel de Cloudflare; en este panel no, falta el token. |
| Clics, pedidos y comisión del comercio | En AliExpress Portals bajo `default`, mezclados con cualquier otro uso de ese ID. |
| País del pedido o de envío | Solo el que reporte el comercio. No se deduce del contador. |

## Lo pedido por el propietario

- Panel en el área privada `/admin`, siguiendo la experiencia de `/admin/asistente`.
- Clics por enlace o ficha y país de origen estimado del clic.
- Datos suficientes para decidir qué ubicaciones mantener o mejorar.
- Impacto pequeño en el rendimiento del sitio.
- Posibilidad de incorporar otras fuentes de monetización cuando se activen.
- Conservar el recorrido comercial aprobado de un clic desde el CTA hasta AliExpress.

## Propuesta original de la primera versión

Propuesta del encargo, conservada como referencia. La «Implementación v1» de arriba la contrasta con el código.

Reutilizar la protección de `src/pages/admin/asistente.astro` y la base D1 ya vinculada al sitio. Ruta propuesta `/admin/monetizacion`, con rangos de 7, 30 y 90 días, una tendencia diaria y una tabla por proveedor, página y ubicación. El país puede actuar como filtro y como desglose de clics.

Para registrar clics propios, evaluar un evento pequeño enviado al servidor con `sendBeacon` o `fetch` con `keepalive` al activar el enlace. El CTA conserva su `href` afiliado y la navegación funciona aunque falle la medición o el lector tenga JavaScript deshabilitado. Comprobar activación por teclado y clic auxiliar para entender la cobertura del contador.

El servidor valida una ubicación registrada y agrega por día, ubicación y país estimado por Cloudflare. El país se obtiene de la solicitud recibida por Cloudflare. La tabla de métricas guarda el código de país y el total agregado. La primera propuesta prescinde de identificadores de visitantes, historial individual y almacenamiento de IP.

Reutilizar los mecanismos de protección y limitación de abuso existentes cuando correspondan. Las ubicaciones aceptadas deben proceder de un registro conocido. Definir un alcance acotado para filtrar tráfico de prueba y manejar reintentos, sin presentar el contador como exacto o como visitantes únicos.

El evento es de mejor esfuerzo. Los bloqueadores, la falta de conexión o la salida rápida pueden impedir recibirlo. La medición propia y los clics que reporte el comercio pueden diferir. Antes de activar el evento, revisar el tratamiento real de datos, sus requisitos de privacidad y la información publicada en las políticas.

## Datos y procedencia

| Dato | Fuente propuesta | Interpretación |
| --- | --- | --- |
| Clics salientes por ficha | Evento propio, si se implementa | Activaciones observadas del CTA, con cobertura declarada |
| País del clic | País estimado por Cloudflare en ese evento | Puede reflejar una VPN o quedar sin determinar |
| Vistas del artículo | Cloudflare Web Analytics, si se pueden extraer con el alcance necesario | Vistas de página, distintas de impresiones visibles de la ficha |
| Clics atribuidos por el comercio | Informe del programa | Identificar Tracking ID, periodo y cobertura |
| Pedidos pendientes, confirmados y rechazados | Informe del programa, si ofrece esos estados | Conservar la fecha y el estado de la fuente |
| Comisión confirmada | Informe del programa | Mantener monedas separadas |
| Fecha de actualización | Cada fuente o importación | Mostrar la antigüedad del dato |

El país del clic, el país del pedido y el destino de envío son datos diferentes. Mostrar «Sin determinar» cuando falte la geolocalización. Comprobar primero si el informe de AliExpress permite obtener clics por país y Tracking ID. El uso compartido de `default` impide atribuir automáticamente todo su rendimiento a una sola ficha.

Calcular clics por 100 vistas únicamente con periodos, zona horaria y poblaciones compatibles. Para la conversión del proveedor, usar los clics y pedidos de ese mismo informe y explicar el desfase de atribución. La comisión por clic y por 1.000 vistas requiere también una cobertura compatible. Los datos ausentes deben distinguirse de cero. Los pedidos pendientes requieren tiempo para madurar antes de evaluar resultados.

Empezar con carga manual o importación de informes si resuelve el volumen real. Una integración de API se justifica cuando haya una necesidad concreta. Para AdSense, conservar sus propias métricas de impresiones e ingresos estimados cuando se active. Para publicidad contratada, definir después los compromisos de cada campaña.

## Recursos que debe leer la siguiente sesión

- `AGENTS.md` y `TODO.md`.
- `docs/seo/afiliacion-aliexpress.md`, para el producto y sus limitaciones.
- `src/components/CamaAfiliada.astro`, para el recorrido comercial aprobado.
- `src/pages/admin/asistente.astro` y las funciones de seguridad que utiliza, para el acceso privado.
- `src/pages/api/assistant-event.ts`, para evaluar patrones existentes de recepción de eventos.
- La configuración de D1 y todas las migraciones vigentes, antes de proponer la siguiente migración.
- Las políticas de privacidad y cookies del sitio.

La documentación de Cloudflare Web Analytics indica que carece de eventos personalizados. El panel de clics propios necesita un mecanismo distinto o datos del proveedor. La petición de incluir el país puede resolverse con los datos de geolocalización que Cloudflare proporciona al Worker. [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/faq/), [solicitudes de Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/request/).

Los informes de Amazon muestran clics, pedidos, artículos enviados y comisiones. Awin permite examinar transacciones por estado. Son referencias para decidir qué datos mostrar, sujetas a lo que entregue cada programa utilizado. [Informes de Amazon Associates](https://affiliate-program.amazon.com/help/node/topic/GMWAK55DQX8JEK7C), [informe de transacciones de Awin](https://help.awin.com/docs/transactions-report).

## Comprobaciones del futuro panel

Comprobar que el acceso requiere la autenticación privada existente, que una visita normal al artículo conserva su carga estática y que el clic llega directamente al comercio con el registro activado, desactivado o fallando. Interceptar las salidas externas en pruebas.

Verificar agregados por ubicación, día y país, datos sin país, rangos vacíos, monedas separadas y fechas de actualización. Las pruebas de captura deben poder distinguirse de los datos reales. Validar el origen de los eventos, las ubicaciones admitidas y la limitación de abuso.

Preparar cualquier migración como un cambio revisable. La autorización de publicar esta documentación no autoriza por sí sola mutaciones de la base de producción.

## Encargo para pegar en otro chat

> Quiero continuar el panel de monetización de CuidaTuPerroViejo. Lee `AGENTS.md`, `TODO.md` y `docs/seo/panel-monetizacion.md`. La v1 (contador propio de clics por ficha y país, panel `/admin/monetizacion`) está activa en producción desde el 11 de noviembre de 2026. Conserva el único CTA afiliado directo. Revisa las «Decisiones pendientes del propietario» y continúa por la que haya resuelto: Tracking ID por ficha, importación del informe de AliExpress o vistas desde Cloudflare Web Analytics. Distingue siempre los datos propios de los del comercio.
