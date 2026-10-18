# Propuesta de publicidad y consentimiento

Fecha: 2026-10-18. Base: `9d05e9b95bb39679826134810ca864d3952bf15e`.

**Actualización tras «Adelante» del propietario:** retirada aplicada en la rama del PR121; comprobación y publicación registradas en [retirada-aplicada/README.md](retirada-aplicada/README.md). Las recomendaciones siguientes conservan el contexto de la propuesta inicial. El contrato, componente e imágenes de movilidad no se modifican; su golden HTML se regenera por retirar el banner y su Markdown permanece idéntico. La sesión anterior del PR120 está cerrada; no se solicita otra revisión de AdSense. Los builds duplicados quedan fuera de este trabajo.

## Configuración recomendada para decidir

1. Retirar Adsterra por completo y mantener temporalmente el sitio sin publicidad mientras se cierra la configuración. El respaldo se conserva fuera de `src/` y `public/`; no se dejan etiquetas dormidas, espacios vacíos, flags que puedan reactivarlas ni scripts publicitarios en el build.
2. Cuando se pueda servir AdSense, empezar con **anuncios no personalizados** como elección de producto, no como supuesto requisito de aprobación. No se garantiza mayor ingreso ni aprobación. Si Gonzalo prefiere personalización, solo podrá usarse con las señales de consentimiento aplicables.
3. Recomiendo la **CMP certificada de Google, desde Privacidad y mensajes**, para el caso de usar exclusivamente Google como red publicitaria. Configurar el mensaje europeo para EEE/Reino Unido/Suiza y los mensajes de normativa estatal estadounidense si se monetiza ese tráfico y corresponde; revisar otros territorios que se elijan. No se conoce aún la distribución geográfica ni la decisión de monetización. El idioma español no demuestra ausencia de usuarios europeos o estadounidenses.
4. En los territorios que exijan decisión previa, sin una señal válida no se solicita publicidad con almacenamiento sujeto a consentimiento. La propuesta inicial para rechazo/retirada es **no servir anuncios**, en lugar de activar automáticamente otra modalidad. La carga técnica de la CMP se distingue de la solicitud de anuncios. No se añade un panel casero como sustituto del TCF ni una variable local `consent=true` como prueba suficiente.
5. Mantener por ahora Cloudflare Web Analytics y **describirlo correctamente**: el beacon ya está identificado y no es publicidad. Si Gonzalo prefiere desactivarlo, se modifica solo Web Analytics de esta zona; no se desactiva Cloudflare, el alojamiento, Turnstile ni la seguridad. Si se decide que también la analítica espere a opt-in, hay que quitar la inyección automática y controlar una integración manual, no asumir que la CMP publicitaria controla el beacon externo.

La elección de Google CMP es una recomendación operativa. Google exige CMP certificada+TCF para servir anuncios personalizados en EEE/Reino Unido/Suiza; no se presenta como condición universal de toda solicitud AdSense. Los anuncios no personalizados también pueden usar cookies/identificadores y requerir consentimiento. Una CMP no certificada puede ser elegible para ciertas modalidades no personalizadas/limitadas según Google, pero no es la opción propuesta. **Consent Mode no sustituye a una CMP.**

Para poder comprobar el comportamiento sin disparos automáticos imprevistos, propongo empezar con anuncios automáticos desactivados y ubicaciones manuales que solo soliciten anuncios cuando corresponda. La carga y la señal se integrarán con el código real admitido por Google, no con un parámetro obsoleto copiado. No se incorporan formatos sticky, viñetas o inserciones que interfieran con las herramientas durante esta preparación.

## Decisiones y datos que faltan

| Punto | Propuesta | Qué necesita concretar Gonzalo |
|---|---|---|
| Momento de retirada | Primera entrega: sin Adsterra y sin anuncios nuevos | Autorizado avanzar por el propietario con «Adelante». Estado de pruebas/publicación en el informe de aplicación. |
| Modalidad Google | No personalizados inicialmente | Elegir ANP, personalizados tras consentimiento o continuar sin anuncios. Pregunta enviada durante el trabajo. |
| Visitantes monetizados | Territorios permitidos que se acuerden; nunca inferirlos del idioma | Todos incluidos EEE/UK/CH, excluirlos de publicidad o lista concreta de países. Pregunta enviada. Excluir anuncios no debe bloquear el acceso al contenido. |
| CMP | Google CMP; mensajes y proveedores estrictamente necesarios | Confirmar proveedor. Hace falta configuración real en la cuenta: dominio, ID público de editor y código/mensaje generado. No contraseñas. No encontré identificador de editor ni cargador Google en el código. No tengo una herramienta conectada para operar el panel AdSense. |
| Beacon | Conservarlo, documentado | Se mantiene la configuración de Cloudflare; la información legal se actualiza con su función comprobada. |

Si el mensaje real de Google no estuviera disponible para el dominio en su estado actual, se documentará ese límite: la alternativa sería esperar sin anuncios o elegir una CMP certificada independiente con configuración real. No se simularán aceptación/rechazo para declarar la CMP validada.

## Retirada de Adsterra: alcance concreto

El parche [retirada-propuesta.patch](retirada-propuesta.patch), comprobado con `git apply --check`, elimina:

- Los cuatro componentes `src/components/ads/AdBanner300x250.astro`, `AdStickyMobile320x50.astro`, `AdNativeBanner.astro` y `AdSlotLoader.astro`.
- Las dos cadenas HTML con `atOptions` y `highperformanceformat.com` y su algoritmo de inserción en `PostReader.astro`. El lector utiliza directamente `processedHtml`; mantiene su índice, IDs, contenido y recursos.
- Imports, instancias y comentarios de anuncios en páginas de artículos, pilares y las tres herramientas: edad, calidad de vida y **selector de movilidad**.
- Referencias a Adsterra de privacidad/cookies, sustituidas por un estado provisional sin publicidad. La posterior activación de Google exige otra actualización coherente con la configuración real.

El formato nativo estaba pausado por contenido de citas fuera de marca y el sticky era un placeholder sin script. Se eliminan también esos espacios: no se consideran anuncios funcionales que haya que restaurar automáticamente. No apareció un `ads.txt` en `public/`; comprobar también la URL pública al implementar y, si se incorpora Google, utilizar únicamente la línea real proporcionada por la cuenta. No inventar un `pub-`.

La ausencia se comprueba sobre todo el output publicado, no buscando la palabra Adsterra en los documentos históricos. No se cambian cabeceras globales/CSP, DNS, Workers, afiliación ni contratos de herramientas como atajo.

## Recuperación si se decide volver a Adsterra

[Restauración y códigos exactos](restauracion-adsterra.md) documenta los archivos, los dos snippets, los lugares donde se insertan y los formatos que siguen sin código. [Inventario](adsterra-inventario.json) incluye líneas, hashes y copias completas de doce archivos bajo `adsterra-respaldo/`.

El parche inverso permite recuperar exclusivamente los cambios de retirada si sigue aplicando. **No se debe hacer checkout de toda una herramienta o volver main a este commit**: se perderían cambios posteriores. Las snapshots son referencia; si el contexto cambia, hay que reinsertar solo los bloques publicitarios necesarios. Una reinstalación debe adaptar consentimiento, políticas y revisar códigos/zonas vigentes; los snippets históricos no son una configuración de consentimiento válida.

## Beacon Cloudflare: identificado antes de decidir

Comprobación API de Cloudflare, solo lectura:

- Zona `cuidatuperroviejo.com`: `settings/rum.value=on`.
- Web Analytics: `auto_install=true`, ruleset habilitado y `lite=false`.
- Regla activa de host/ruta `*`; esto no demuestra cobertura de todos los países ni obliga a inferir excepciones geográficas.
- El navegador de producción cargó `static.cloudflareinsights.com/beacon.min.js/...` y emitió una solicitud a `https://cuidatuperroviejo.com/cdn-cgi/rum`.
- No se encontró su cargador en el repositorio. La inyección se hace desde Cloudflare; quitar código Astro no la elimina.

Función: medición de visitas y rendimiento real de páginas, incluida la Performance API/Core Web Vitals; no es el motor publicitario ni Google Analytics. Cloudflare declara que esta analítica no usa cookies/localStorage ni fingerprinting para sus métricas. En la visita aislada no aparecieron cookies, pero eso no certifica el comportamiento de todos los proveedores ni una exención legal universal. No hay que confundir esta función opcional con los registros de alojamiento/seguridad.

Evidencia sin tokens ni datos de visitantes: [beacon-evidencia.json](beacon-evidencia.json). Se bloquearon recursos publicitarios en esa visita para aislar la identificación: no es comprobación de consentimiento ni de retirada de Adsterra.

## Privacidad y cookies: cambios previstos

| Momento | Cambio concreto |
|---|---|
| Al retirar Adsterra | Quitar su mención como proveedor activo y su enlace de política; indicar que no se sirven anuncios. Mantener Gonzalo/contacto y las funciones reales de formulario, asistente, votos y preferencias. |
| Conservar RUM | Identificar expresamente Cloudflare Web Analytics, finalidad de visitas/rendimiento, recursos observados y enlace al proveedor. Distinguirlo de seguridad y de publicidad. Evitar promesas absolutas sobre IP/transmisión de datos no comprobadas. |
| Antes de activar Google | Identificar Google, modalidades elegidas, cookies/identificadores y proveedores efectivos; actualizar finalidades, información sobre derechos y enlaces. Revisar duraciones desde documentación/configuración reales, sin inventarlas. |
| CMP real | Añadir acceso permanente «Configuración de privacidad y cookies» en pie y políticas, conectado a revocación real; rechazo disponible y lectura accesible en móvil. No ocultar el rechazo mediante optimización automática de mensajes. Revisar mensajes por idioma y región. |
| Retirada de consentimiento | Explicar que puede modificarse en ese navegador y que no borra automáticamente tratamientos previos, correos enviados o cookies de terceros ajenos al dominio. No prometer eliminación retroactiva universal. |

El mecanismo oficial Google para reabrir la decisión es `googlefc.callbackQueue.push(googlefc.showRevocationMessage)`. Su integración debe esperar a que la API real exista y ofrecer una salida útil si la CMP falla. No se entrega un enlace `javascript:` ni una apariencia de botón que no funcione. La fuente de Google señala que su enlace automático depende de que el sitio aprobado tenga su código: no se da por disponible antes de comprobarlo.

No se instala Google Analytics ni GTM para resolver el consentimiento de AdSense. Tampoco se considera que las preferencias locales de tema/listas equivalgan a aceptar publicidad.

## Implementación y verificación posterior

Puedo preparar el PR de retirada, la actualización legal, integrar el código real de la CMP elegida, controlar las solicitudes y revalidar herramientas y navegación. Puedo consultar/cambiar el RUM de esta zona cuando se decida su tratamiento. La elección de publicidad, cobertura territorial y proveedor sigue siendo del propietario; la cuenta AdSense debe aportar la configuración real sin enviar aún una solicitud de revisión.

La entrega aplicada sigue [pruebas-previstas.md](pruebas-previstas.md). No se declara que aceptación, rechazo o retirada del consentimiento hayan pasado: aún no se ha integrado una CMP real. No se inventa un ID de editor ni se activa Google mientras falta esa configuración. El estado histórico previo de Adsterra se conserva en las snapshots; el estado vigente de la retirada está en el informe de aplicación.

Verificación de esta propuesta: `npm ci` correcto; doce snapshots idénticas a la base; `git apply --check` correcto; aplicación y reversión del parche en copias temporales recuperan los doce archivos byte a byte; hashes de movilidad/fixtures intactos. Evidencia: [verificacion-propuesta.json](verificacion-propuesta.json). Esto comprueba la recuperación documental, no equivale al build ni a los controles del código una vez aplicado el parche. No se ejecutó otra ronda de auditoría clínica ni de las herramientas.

## Fuentes oficiales consultadas 2026-10-18

- [Google: CMP certificada y ámbitos territoriales](https://support.google.com/adsense/answer/13554116?hl=es).
- [Google: personalizados y no personalizados](https://support.google.com/adsense/answer/9007336?hl=es).
- [Google: configurar y gestionar CMP](https://support.google.com/adsense/answer/7670013?hl=es).
- [Google: revocación](https://support.google.com/adsense/answer/10959060?hl=es).
- [Google: mensajes estatales de EEUU](https://support.google.com/adsense/answer/10961479?hl=en) y [configuración](https://support.google.com/adsense/answer/10960771?hl=en).
- [Cloudflare: función de Web Analytics](https://developers.cloudflare.com/web-analytics/about/), [recogida](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/), [inyección/endpoints](https://developers.cloudflare.com/web-analytics/faq/) y [declaración de cookies/fingerprinting](https://www.cloudflare.com/web-analytics/).

Limitación de acceso: la página de creación del mensaje europeo10960768 devolvió un bloqueo del lector; no se utiliza para atribuir opciones del panel que no se hayan comprobado en la cuenta. Las fuentes oficiales no sustituyen la comprobación de la configuración efectiva ni garantizan cumplimiento legal por sí solas.
