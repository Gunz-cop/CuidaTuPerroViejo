# Panel de monetización

## Estado del encargo

El propietario pidió un panel privado para conocer qué fichas afiliadas generan clics y desde qué países, y poder incorporar Amazon, AdSense y publicidad contratada en el futuro. La implementación está pendiente. Este documento conserva el encargo para retomarlo en otro chat con poco contexto.

El piloto de AliExpress ya está publicado en la guía de camas. La referencia aprobada es `src/components/CamaAfiliada.astro`. Tiene video a petición, un único enlace afiliado directo y aviso breve de comisión debajo del CTA. La ubicación estable es `cama-guia-01`, identificada por `data-affiliate-placement`. Su enlace usa el Tracking ID `default` y actualmente carece de contador propio.

## Lo pedido por el propietario

- Panel en el área privada `/admin`, siguiendo la experiencia de `/admin/asistente`.
- Clics por enlace o ficha y país de origen estimado del clic.
- Datos suficientes para decidir qué ubicaciones mantener o mejorar.
- Impacto pequeño en el rendimiento del sitio.
- Posibilidad de incorporar otras fuentes de monetización cuando se activen.
- Conservar el recorrido comercial aprobado de un clic desde el CTA hasta AliExpress.

## Propuesta para la primera versión

Esta es una propuesta de implementación que la siguiente sesión debe contrastar con el código y los informes disponibles.

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

> Quiero continuar el panel de monetización de CuidaTuPerroViejo. Lee `AGENTS.md`, `TODO.md` y `docs/seo/panel-monetizacion.md`. Comprueba el estado del checkout y su relación con `origin/main`, preservando el trabajo existente. El piloto afiliado ya está publicado y debe conservar un único CTA directo. Retoma el panel privado tomando `/admin/asistente` como referencia, con clics por ficha y país estimado, y una carga pequeña para el sitio. Distingue los datos propios de los informes del comercio y revisa el consentimiento del mecanismo que propongas. Antes de implementar, identifica qué datos podemos obtener ahora y qué decisiones faltan. Usa este documento como encargo y contrasta sus propuestas con el código vigente.
