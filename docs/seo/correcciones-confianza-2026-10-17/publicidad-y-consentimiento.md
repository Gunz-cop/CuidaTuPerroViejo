# Configuración publicitaria: decisión y cierre pendiente

Fecha: 2026-10-17. Decisión explícita del propietario durante esta sesión: **mantener Adsterra por ahora y coordinar su retirada antes de solicitar revisión**. No se retiraron scripts ni se añadió AdSense. No se solicitó revisión a Google.

## Servicios observados en el código

| Servicio | Uso real | Consentimiento / acción |
|---|---|---|
| Cloudflare Workers, KV, D1, Workers AI y Turnstile | Alojamiento/seguridad, formulario, votos, asistente bajo petición | Describir datos técnicos y tratamientos efectivos; no confundir funciones necesarias con publicidad. No se enviaron formularios ni preguntas al asistente. |
| Google Fonts | Tipografías servidas desde Google | Declarado en privacidad/cookies. No equivale a Google Analytics. |
| Almacenamiento local | Tema, lista de cuidados y valoración recordada | Declarado. Borrarlo reinicia preferencias; no constituye consentimiento publicitario. |
| Adsterra: highperformanceformat.com | Scripts diferidos de banners, tanto componente como HTML de PostReader | Continúa activo por decisión del propietario. La carga por visibilidad NO es control de consentimiento. No existe CMP propia validada ni bloqueo previo por consentimiento; no certificar esta configuración como cerrada. |
| Google AdSense | No hay cargador instalado para servir anuncios de AdSense | Modalidad futura y CMP pendientes de decisión/configuración. Una etiqueta de verificación de propiedad, si existe, no demuestra que se sirvan anuncios. |
| Google Analytics | No se encontró cargador propio en la aplicación | No crear controles de una analítica que no se ha instalado. |

No hay acceso a estadísticas de audiencia ni a la configuración del panel AdSense en esta sesión. No se presupone que el tráfico del EEE/Reino Unido/Suiza sea inexistente por estar el sitio en español. Tampoco se deduce una obligación universal de CMP certificada solo de que se planee solicitar revisión.

## Cuándo corresponde CMP

Fuente oficial revisada: https://support.google.com/adsense/answer/13554116?hl=es (apartados de requisito TCF y tráfico de CMP certificada/no certificada).

Si se servirán anuncios personalizados de Google a usuarios del EEE, Reino Unido o Suiza, Google exige CMP certificada integrada con TCF. La opción no personalizada/limitada no equivale automáticamente a ausencia de requisitos de consentimiento: hay que revisar almacenamiento, identificadores, proveedores y políticas aplicables. Google admite ciertos anuncios no personalizados/limitados con CMP no certificada cuando corresponda; no es correcto extender el requisito certificado a toda solicitud de revisión.

Fuente operativa: https://support.google.com/adsense/answer/7670013?hl=es. La configuración real de mensajes debe hacerse en el proveedor o en Privacidad y mensajes de AdSense, con dominio e identificadores reales. No se inventa un ID ni se implementa un panel local que solo simule consentimiento.

## Secuencia acordada antes de la revisión

1. El propietario concreta cuándo retirar Adsterra. En esa entrega: quitar tanto `AdBanner300x250.astro` como las cadenas publicitarias de `PostReader.astro`, revisar formatos inactivos y rastrear bundles/HTML públicos. Una simple eliminación de un componente no cubre los anuncios insertados por el lector.
2. Confirmar qué publicidad y analítica quedarán activas, qué modalidades/territorios se cubrirán y qué proveedores se permitirán. La modalidad de AdSense no fue decidida en la respuesta del propietario.
3. Si aplica el supuesto de personalización anterior, configurar e integrar una CMP certificada con TCF usando la cuenta real. Si no aplica, determinar los controles necesarios para el funcionamiento elegido; no omitirlos solo por llamar a los anuncios «no personalizados».
4. Actualizar privacidad/cookies a los servicios efectivos de ese despliegue. Hoy siguen mencionando Adsterra porque sigue integrado; no anunciar su retirada antes de ejecutarla. Publicar solo «Gonzalo» según autorización; no usar el apellido proporcionado en conversación ni inventar dirección o identidad jurídica.
5. Probar en navegador limpio: antes de decidir, rechazo, aceptación, preferencias parciales si existen, retirada/reapertura y visita posterior. Inspeccionar solicitudes y cookies/almacenamiento por proveedor y territorio. No basta con que aparezca un banner.
6. Verificar producción tras publicar y conservar evidencia. No solicitar AdSense automáticamente ni fijar un número inventado de días.

Estas comprobaciones siguen pendientes. La prueba remota de los registros y la guía dental bloqueó scripts publicitarios de terceros para aislar funcionalidad: **no verifica anuncios ni consentimiento**.
