# F4B — implementación en curso, issue #90

2026-10-13. Base técnica `cb8e10f1ead55ef0dafc666672cd3003252afc59`; base de desarrollo/ratificación `8669d9d6dd4b03685500d67a9332786ad474ff6b`, tree `0076ca9ed256123f56e2296ed8e5177257015b06`. Rama propia `agent-ready/f4b-implementacion`. Se conserva SDD R1 FAIL, R2 FAIL, STOP y excepción autorizada R3 PASS; no reiniciar contadores. Auditoría de implementación: **0/5**, pendiente de commit/tree fijo y entrega de gates.

## Producto desarrollado

Wrapper exterior `/api/mcp`, Streamable HTTP real con SDK server/client exactos 2.3.1, revisiones 2026-07-28 y 2025-11-25, stateless y cuatro herramientas con schemas F4A. Búsqueda/lectura delegan a la única API F3 mediante ASSETS; cálculos llaman a las funciones puras F4A sin I/O. No cambian fórmulas, unidades, nombres, corpus/routing, OpenAPI ni skill. Card experimental `/api/mcp/server-card` validada contra la referencia local congelada. ARD/capacidades/Link/llms se amplían conjuntamente; [admisión discovery](../admision-discovery.md) declara ownership preciso.

Errores sanitizados, Origin/Host/CORS explícitos, body streaming32KiB, depth16, metadata8KiB, respuesta8MiB preparada íntegra antes de éxito, list256KiB, deadline10s, cap2 incluyendo lector/residual, cuota local120POST/90calls60s y ledger acotado. No autenticación, sesiones persistidas, efectos, URL arbitraria ni cuota distribuida. Legacy cancellation202 no interrumpe cross-POST. El SDK adapta structuredContent legacy con wrapper `result`, verificado por cliente de esa era.

## Evidencia local

- Build Astro/Workers completo; SDK real en workerd local, **122 intercambios**, ambas eras, listado y cuatro capacidades, todos28IDs/hashes/bytes, ocho fronteras HHHHHMM, seis combinaciones movilidad, búsquedas, corpus changed, IDs ausentes, inválidos, métodos/headers/Origin/CORS/body y notifications/cancelled202: [cliente](cliente-workerd.json).
- UI/API **36/36** Chrome154: [proyección curada](ui-workerd.json). WebMCP/API/cancel/metadata **91/91** Chrome155 oficial: [proyección curada](webmcp-workerd.json). Son pruebas del build local, no de preview ni producción.
- Astro check0errors0warnings55hints preexistentes; npm test81/81 en primera pasada completa. Tests nuevos amplían posteriormente fronteras/cuota/deadline/residual; sus resultados finales se indexan antes de auditoría. Checks build discovery/API/projection/routing y specs migración PASS. Dry-run empaqueta1330.93KiB, gzip322.21KiB sin desplegar. Este tamaño no demuestra CPU/memoria Free ni coste de tráfico real.
- Los originales privados están fuera de Git. [Índice](indice-originales-local.json) preserva bytes/hashes; proyecciones públicas reducen resultados, nunca sustituyen originales.

## Fallos preservados

Build inicial y npm/CI offline tuvieron bloqueos de syscalls del sandbox; sólo se reejecutaron con permisos que permiten IPC/interface enumeration/spawnSync, sin cambiar comprobaciones. Tests detectaron fixtures de descubrimiento sin card/expectativas antiguas ARD y dos errores de tipos nuevos; se corrigieron aditivamente. La prueba de cuota inicial esperaba429 en el texto del SDK; se corrigió para inspeccionar su status HTTP.

[#92](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/92) registró STOP de regresión WebMCP: Chrome154 produjo75/91, con16 diferencias de getTools metadata. No se tocó producto/harness F4A. Chrome for Testing155.0.8059.39 descargado de fuente primaria pasa91/91; FAIL154 conservado en originales (27960bytes, sha256 `1434e66c6013f5a48e512b4953a56e5ab5571c7bfb5233fe52dfcd1291120cda`). Se cerró el bloqueo por evidencia nueva del entorno adecuado; no se convierte el FAIL anterior en PASS.

## Gates pendientes

No hay aún PASS global C01–C13, auditoría de implementación, CI/receipt/identidad de preview ni publicación. F4A se observa documentalmente cerrada en seguimiento/publicacion/resultado.md con auditoría R2 PASS, pero el SHA documental final anunciado por el propietario y el diff de integración deben cotejarse antes de integrar. No se incorporan automáticamente archivos concurrentes. Sin promoción a main, sin scans/puntuación F4B. Mantener search=yes, ai-input=yes, ai-train=no.

Rollback previsto: retirar sólo delta de producto F4B desde base de ratificación, dejando F4A cb8e10f y todos sus contratos/artefactos. Fijar commits exactos y comprobar retirada endpoint/card/descriptors y cálculos/API en ensayo local/preview antes de promoción. F5/F6 quedan separados.
