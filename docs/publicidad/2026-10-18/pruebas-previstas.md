# Pruebas exigidas al aplicar la configuración

Estado2026-10-18: **pendientes de implementación**. Este documento no afirma resultados futuros.

## Ausencia de Adsterra

1. Buscar `Adsterra`, `atOptions`, sus dos claves y dominios publicitarios en `src/`, `public/`, HTML/JS/CSS de `dist/`; excluir solo documentación y snapshots. Comprobar también importaciones, `<template>`, placeholders, slots/espacios vacíos, carga diferida y navegación cliente. Revisar `ads.txt` público si existe; no borrar entradas ajenas sin identificarlas.
2. Navegador limpio, sin bloquear Adsterra en el propio test: portada, cada pilar, artículo largo/corto, las tres herramientas y legales. Scroll completo para activar cualquier IntersectionObserver, esperar tareas diferidas y navegar entre páginas. Inspeccionar solicitudes, iframes y recursos anidados; registrar todos los terceros observados, no solo `highperformanceformat.com`.
3. Repetir390/820/1366px, claro/oscuro y navegación posterior. No hacer clic en anuncios ni generar impresiones artificiales de AdSense. Si existen viejos documentos cacheados, comprobar con y sin caché y resolver la capa concreta; no purgar infraestructura sin evidencia.
4. Criterio: cero scripts/slots/claves de Adsterra en el build y cero solicitudes de esa integración en las visitas. La documentación archivada con sus nombres no es una solicitud residual. Solo declarar «retirado en producción» tras comprobar el despliegue efectivo.

## Consentimiento real

| Situación | Acción | Comprobación |
|---|---|---|
| Primera visita | Perfil limpio en territorio real o mecanismo oficial de prueba | Mensaje pertinente; no solicitudes publicitarias que requieran consentimiento previo antes de decidir. Scripts técnicos CMP se inventarían separadamente. |
| Rechazo | Pulsar rechazo en el mensaje real | Señales TCF/GPP pertinentes denegadas/opt-out; no solicitudes/almacenamiento incompatible. Propuesta inicial: no servir anuncios tras rechazo. |
| Aceptación | Aceptar selección mostrada | Señal válida y solo modalidad/proveedores permitidos. Si se eligió ANP, no se activa personalización por aceptar cookies. |
| Preferencias parciales | Cambiar finalidades/proveedores si se ofrecen | Cada selección se conserva y se respeta en solicitudes; ninguna casilla implícita se da por válida. |
| Reapertura y retirada | Abrir control permanente, retirar y volver a navegar/recargar | Mensaje real reabierto, señal actualizada, se detienen solicitudes posteriores incompatibles y se retiran slots según política elegida. No se promete deshacer tráfico ya enviado. |
| Persistencia | Recargar, otra URL y nueva sesión | Persistencia/validez real de la elección; nueva petición cuando corresponda. No preaceptar por localStorage propio. |
| CMP bloqueada/error | Bloquear proveedor CMP o simular fallo | Sitio legible y herramientas útiles; sin servir anuncios dependientes de consentimiento por defecto. |
| Territorios | EEE, UK, Suiza, EEUU aplicable y un país elegido fuera de esos grupos | Cobertura territorial real de mensajes/anuncios. No falsificar IP o declarar prueba geográfica solo por cambiar idioma/viewport. Si no hay punto de observación adecuado, dejar ese caso pendiente. |

Conservar HAR/resumen de dominios, estados de señales sin identificadores personales, cookies/almacenamiento por nombre/finalidad, commit, versión, fecha y evidencia de acciones. No confundir un mock de CMP con la validación del proveedor real. Si AdSense no está aprobado, se puede validar lo que esté disponible de la CMP pero no certificar una impresión real de anuncio que no puede servirse. Nunca solicitar revisión para completar una prueba.

## Preservación de movilidad y contratos

- No editar `MobilityTool.astro`, `src/lib/agent-tools/movilidad.ts`, `src/lib/mobility-sources.ts`, ilustraciones ni decisiones de producto para retirar banners.
- Al aplicar el parche, el HTML de `selector-movilidad-perros-mayores.astro` sí cambia: regenerar golden F2 `tool--movilidad` con el `.html` y `.md` del nuevo `dist/`, actualizar hashes/bytes del manifest y revisar el diff. Revisar igualmente `tool--calidad-vida` y cualquier golden cuyo HTML cambie (incluida privacidad si estuviera inventariada); no borrar ni neutralizar asserts.
- Mantener JSON-LD `lastReviewed`, `#m5alert[role=alert]`, último `<p>` de `#m5s3` y aviso «Estas opciones orientan preguntas para el veterinario». Conserva Apoyo total, urgencia por pérdida súbita, plan individual y `SHOW_AFFILIATE_LINKS=false`.
- Oráculo válido `movilidad-v1.1.json`; no recuperar el borrado `editorial-2026-10-16.json`. Los hashes de base están en `movilidad-base.sha256`.
- QA móvil del selector y sus seis resultados, API/MCP1.1, calidad de vida (extremos y dolor0/total60), edad, guía dental, copia/impresión y registros. Comparar preview/producción después del despliegue autorizado.

## Controles antes de subir cambios ejecutables a main

```sh
npx astro check
npm test
node --test tests/agent-readiness/*.test.mjs
npx astro build
node scripts/agent-readiness/agent-api.mjs check --build-dir dist
node scripts/agent-readiness/projection.mjs check --build-dir dist
node tests/agent-readiness/projection-semantic.mjs dist
```

Si la actualización de golden necesita un build previo, hacerlo antes y ejecutar después todos los controles. No declarar este checklist cumplido por la instalación de dependencias o por pruebas de otra rama. La propuesta actual solo añade documentación y un parche inerte; no se subió a main ni se desplegó.
