# Retirada de Adsterra y estado sin publicidad

Fecha2026-10-18. Base actualizada `9d05e9b`; continuación de PR121 tras autorización «Adelante». No se solicita revisión AdSense.

## Cambio implementado

- Eliminados los cuatro componentes publicitarios, sus imports/slots en pilares, artículos y tres herramientas, y las dos cadenas de scripts300×250/320×50 insertadas por PostReader. Su contenido pasa directamente por `processedHtml`, conservando navegación y recursos.
- Eliminados también native pausado, sticky vacío, loader diferido y espacios reservados. El respaldo original sigue en `../adsterra-respaldo/`, fuera del código/publicación, con hashes y guía de recuperación. Los códigos no se reactivarán automáticamente por un rechazo de Google.
- Privacidad/cookies indican estado sin publicidad y describen Cloudflare Web Analytics/RUM con su función y referencias verificadas. No se cambia su inyección automática ni servicios de seguridad.
- No se instala Google, CMP ficticia ni botón de consentimiento sin función. El dato pendiente requerido al propietario es ID público de editor/código/configuración real de la CMP. La modalidad ANP recomendada y la cobertura por territorio se configurarán antes de servir publicidad, no se suponen activas.

## Movilidad preservada

`MobilityTool.astro`, `src/lib/agent-tools/movilidad.ts`, fuentes, ilustraciones, oráculo1.1 y decisiones del propietario permanecen byte a byte como en9d05e9b. No se reinician sus auditorías históricas. La página del selector solo pierde imports y slots de anuncios.

Golden F2 `tool--movilidad` copiado desde el nuevo build: HTML SHA256 `da1fcb469a5b1be12981eb7473eb34b9816c6e7769e4fa9ceb344bc2e7a6403e`; Markdown idéntico, SHA256 `69151537b874ce9acb13b42ed2831a858e995cc2630b04bfe0431ef69ca6951f`,15307bytes. Solo cambia su hash HTML en el manifest. Los otros goldens históricos no se sustituyen como si fueran snapshots nuevos; el corpus actual completo se valida contra su build por los guards de API/proyección/semántica.

## Comprobaciones

Resultados locales y evidencias finales se conservan en `evidencias/`. Las comprobaciones públicas se anexan alPR con commit/build/versiones después de publicar, para distinguir build local, preview y producción.

- Astro build correcto,32documentos. `astro check`:0errores,0advertencias,61hints.
-107pruebas TypeScript y77MJS correctas.
- `agent-api.mjs check --build-dir dist`, `projection.mjs check --build-dir dist` y guard semántico32documentos correctos.
- Búsqueda en fuente/public/output sin dominios, claves, scripts ni slots Adsterra. La documentación de respaldo queda excluida de esa búsqueda funcional y no se publica en los assets.
- Se verifica en navegador sin bloquear Adsterra en la propia prueba, con scroll y carga diferida; no se envían formularios/votos ni se pulsa publicidad. QA de seis resultados de movilidad contra el oráculo1.1, copia con aviso, ausencia de enlaces afiliados, edad y calidad de vida; guía dental e impresión y páginas afectadas. Resultado final en JSON/log.

Resultado local final:34recorridos Chromium a390/1366px; tres herramientas en claro/oscuro y once rutas adicionales en claro. Movimiento reducido para evitar esperas de transiciones durante la regresión (no modifica configuración del sitio). Seis resultados de movilidad por contexto, calidad de vida0/70/dolor0-total60, teclado de edad, copia, imágenes y pasos imprimibles. Cero slots/solicitudes publicitarias o errores de página. La búsqueda estática cubre todos los archivos textuales del build; JSON con cantidad y resultados en `evidencias/navegador-local.json`. Contrato e imágenes preservados según `preservacion-movilidad.json`.

Limitación del primer oráculo local: `innerText` añade un salto visual entre el aviso destacado y el resto de la descripción severa; se usa `textContent` para cotejar el contrato, igual que la prueba de paridad existente. No se corrige producto para satisfacer esa diferencia de presentación.

## Pendiente de CMP y publicidad futura

Aceptación, rechazo y retirada requieren la CMP real del dominio. Están **pendientes**, no aprobadas por un mock ni por ausencia de anuncios. Mientras tanto no se sirven anuncios de Google en ninguna región. No hay un proveedor publicitario al que enviar una elección simulada.

Cuando se aporte la configuración real: integrar proveedor, configurar ANP/territorios y señales aplicables, verificar mensaje/reapertura/rechazo/retirada/persistencia y fallos por territorio con cookies/solicitudes observadas; ajustar políticas. Si no se dispone de una ubicación real o mecanismo oficial de prueba para una región, mantener esa comprobación como pendiente. No solicitar AdSense para provocar disponibilidad de anuncios durante una prueba.
