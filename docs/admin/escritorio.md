# Escritorio administrativo — fase 1

Implementación: rama `feature/admin-escritorio`, desde `main` `33ca627`.
Astro 7 confirmado en `package.json`; migración completada según
`docs/migracion-stack/README.md` (PR #38). El encabezado antiguo de AGENTS.md
no implica que siga pendiente. No se ha ejecutado ninguna migración remota.

## Rutas y fuentes

Solo existen tres paneles secundarios; se conservan sin cambios.
No se incluyen herramientas públicas como si fueran paneles administrativos.

| Tarjeta / enlace | Definición verificable | Fuente |
| --- | --- | --- |
| `/admin/monetizacion` | SUM(clicks), environment = produccion, últimos 7 y 30 días UTC incluidos hoy | CONTACT_DB.affiliate_clicks_daily; migración 0004; registro en src/lib/affiliate/clicks.ts |
| `/admin/asistente` | COUNT(*) de consultas registradas, últimos 7 y 30 días UTC incluidos hoy; misma unidad que el panel | CONTACT_DB.assistant_interactions; migración 0003; src/lib/assistant/metrics.ts |
| `/admin/contact-messages` | COUNT(*) con status = quarantine, todo el historial | CONTACT_DB.contact_messages; migración 0001; panel y endpoint de moderación existentes |
| Audiencia, sin enlace | Pendiente de configuración en el escritorio; no hay números | Propuesta en web-analytics-propuesta.md |

Día inicial = hoy menos N−1 días; se excluyen fechas futuras. Las dos ventanas
se resuelven juntas por fuente y aprovechan índices existentes por día. Contacto
usa el índice por status. Consultas fijas con parámetros enlazados; sin filtros
procedentes de la URL, sin cargar filas individuales ni textos privados.

El asistente no tiene columna de entorno: no puede aislarse producción con los
datos actuales. Tampoco se convierten sus consultas en conversaciones o personas.
Contacto tiene moderación, no lectura/respuesta: cuarentena no equivale a pendiente.
Un agregado vacío vale cero; un error, fila ausente o binding ausente es «No disponible».
Las fuentes se leen por separado y en paralelo para que un fallo no oculte las otras.
No se aplican migraciones automáticamente ni se imprimen excepciones SQL en el HTML.

## Acceso y privacidad

`/admin` es SSR y ejecuta `requireAdmin` antes de `loadOverview`. Reutiliza
`hasValidBasicAuth`, `hashIp`, las credenciales y ADMIN_LIMIT del área existente.
Sin credenciales configuradas falla cerrado; sin binding opcional de límite
mantiene la autenticación como los otros paneles. Si el limitador falla devuelve 503.
401 conserva WWW-Authenticate; 429 conserva Retry-After.

Todas las respuestas de la nueva portada llevan private, no-store, noindex/nofollow
y no-referrer. El middleware añade las cabeceras de seguridad existentes. No hay
endpoint nuevo, secretos serializados, scripts de seguimiento, cookies ni identificadores
nuevos. Los tres paneles y el POST `/api/admin/contact-messages/[id]` ya autentican
antes de sus consultas; se verifican por HTTP sin autenticación en la vista previa.
No se ha cambiado el contrato de ese POST ni su moderación.

### Cambios mínimos de configuración justificados

- Middleware: excluir `/admin` exacto de caché de edge, además de `/admin/*`.
- Adaptador de contenido para agentes: bypass de `/admin` exacto, para no depender
  del índice público antes de autenticar. No se añade a la proyección pública.
- `astro.config.mjs`: excluir `/admin` exacto del sitemap. El primer build falló
  con SITEMAP_UNEXPLAINED_DIFFERENCE por esa ruta privada.
- `wrangler.jsonc`: añadir `/admin` a assets.run_worker_first. La prueba real de
  Wrangler devolvió 404 antes de Astro con solo `/admin/*`.

No se modifica package.json, tsconfig, estilos globales, dependencias, bindings
ni esquema D1. Estilos de la portada aislados, paleta crema/verde de los paneles,
modo oscuro por preferencia del sistema, sin JavaScript de interfaz ni ilustraciones.

El generador `scripts/agent-readiness/projection.mjs` también fija las rutas del
Worker compilado: se añade `/admin` a sus tres rutas reservadas y el límite de
documentos baja de 98 a 97 para respetar las 100 reglas. El corpus actual tiene
40 documentos; su prueba del límite se ajusta y se ejecuta, sin ampliar el corpus.

## Validación y capturas

Vista previa: Worker compilado, Wrangler local en este entorno cloud, D1 local con
las cuatro migraciones existentes y tablas vacías. No se usan secretos ni datos
personales de producción; los ceros de las capturas son el estado vacío real de
esa base de prueba. No son cifras de producción.

`python3 scripts/admin/verify-preview.py` verifica los tres paneles y la portada:
401 sin credenciales, 200 con ellas y no-store; POST de moderación sin credenciales
con origen válido devuelve 401; HEAD y Accept: text/markdown de la portada tampoco
exponen datos. El POST sin Origin lo rechaza previamente Astro con 403 (CSRF).
Resultados HTTP en [preview-results.json](preview-results.json).

Chromium 390×844 (emulación móvil táctil, no Safari físico) y 1440×1000, claro y
oscuro: sin desbordamiento horizontal, sin excepciones JS; orden de Tab comprobado
desde «Saltar al contenido» hasta las herramientas. Capturas completas:

| | Claro | Oscuro |
| --- | --- | --- |
| Móvil | [iPhone](capturas/iphone-light.png) | [iPhone](capturas/iphone-dark.png) |
| Escritorio | [Escritorio](capturas/escritorio-light.png) | [Escritorio](capturas/escritorio-dark.png) |

Revisadas visualmente en Chromium. Falta prueba en Safari/iPhone físico, revisión
independiente de Claude Code y autorización del propietario. No se ha desplegado
ni fusionado. Las pruebas de SQL usan SQLite real con el esquema de las migraciones:
límites 7/30, producción/pruebas, fechas fuera de rango, consultas repetidas de la
misma conversación y estados de contacto. Las pruebas de carga distinguen errores,
binding ausente y cero; las de acceso cubren credenciales, límite y fallo del limitador.

Resultados ejecutados antes del PR:

- `npx astro build`: correcto; sin /admin en sitemap ni proyección pública.
- `npx astro check`: 0 errores, 0 advertencias, 82 hints.
- `npm test`: 147/147.
- `node --test tests/agent-readiness/*.test.mjs`: 78/78 (incluye F3).
- Negociación del Worker y API pública: correctas.
- Inventario, discovery, proyección, contratos F3A, routing y semántica: correctos.
- Crecimiento sobre build real: 2/2; ajuste necesario de la expectativa antigua de
  98 documentos máximos al nuevo máximo 97; ahora se prueba rechazo de 98.
- Tipos del Worker regenerados con fichero vacío: sin diferencias.
- Wrangler deploy **dry-run**: empaquetado correcto, sin desplegar.

Comandos y códigos de salida adicionales en [ci-local-results.json](ci-local-results.json).
Los primeros intentos de build/test en sandbox fallaron por sockets/interfaces
restringidos; se ejecutaron fuera del sandbox en el mismo entorno cloud. El build
inicial también detectó la exclusión del sitemap y las pruebas HTTP detectaron el
routing exacto ausente: ambos corregidos antes de esta entrega.
