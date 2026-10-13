# Dependencias F4A y partes detenidas

**Borrador no ratificado. Todas las filas D01–D10 están PENDIENTES de F4A.** La sesión prepara documentos sobre cierre F3, no una base implementable. No se solicita seguimiento continuo a la otra sesión.

## 1. Evidencia disponible

Base inspeccionada: `eff4ce13a1f4b996f3d9b523799012bc668da318`, tree `d46f6baf5e4a6eb0bcbc001882488e5944c52513`. El [plan](../../plan.md) exige F4A→F4B; sus paths de F4A/F4B son ownership **previsto**, no contratos finales. En esa tree, listado de archivos de docs y ramas remotas de la clonación del 2026-10-12 no contiene SDD/contratos/cierre F4A. No se inspeccionó un worktree ajeno ni se tomó código en curso como autoridad.

La autoridad existente de contenido es [F3](../../fases/f3-contratos.md), incluida su ratificación y anexos. UI actual no autoriza deducir el contrato futuro de cálculo. El índice/publicación F3 tiene 28lecturas verificadas en su cierre; el límite contractual98 no significa que haya98 documentos publicados.

## 2. Entrega precisa que necesita F4B

| ID | Dependencia F4A | Evidencia exigida al incorporar | Parte F4B que se detiene sin ella |
|---|---|---|---|
| D01 | Cierre aceptado y autoridad documental | SHA/tree completos de producto y documentos, rama/PR, SDD ratificada, auditoría independiente y criterios aceptados; estado de publicación explícito | Base ejecutable y lanzamiento de cualquier issue de implementación |
| D02 | Superficie final de herramientas | Inventario exacto de operaciones públicas activas, nombres/identificadores/versiones, descriptions y relación con WebMCP/API | Names tool MCP, orden/listado final y descriptors |
| D03 | Contrato real de reutilización | Módulos/exports/firmas de dominio, política de errores/signal y bindings; búsqueda/lectura compartidas si existen o interfaz HTTP conservada | Adaptador definitivo, imports y llamadas; prohibido inventar nombres de funciones |
| D04 | Schemas y normalización | Inputs/outputs cerrados, required/defaults/nulls, unidades, enums, rangos y restricciones cruzadas; fixtures válidas e inválidas | Schemas MCP de cálculo y validadores finales |
| D05 | Metodología y paridad de cálculo | Algoritmos/versiones aceptados, redondeos, umbrales, recomendaciones, limitaciones y avisos, matrices mínimo/máximo/frontera | Resultados esperados UI/API/WebMCP/MCP; no portar lógica por suposición |
| D06 | Errores y cancelación | Códigos/mensajes exactos, precedencia, comportamiento de abort y cálculo síncrono; evidencia real y límites declarados | Mapeo final isError/JSON-RPC y criterio de cancelación compartida |
| D07 | Límites y operación | Máximos de body/resultado/trabajo, máximos de cálculo, dependencias de runtime y privacidad de datos de entrada | Budget MCP definitivo, tamaño envelope y prueba de abuso/paridad |
| D08 | Registro/discovery aceptados | Registro real de capacidades y schemas; OpenAPI/ARD/llms/skills/Link finales F4A y forma de generarlos | Extensión discovery sin overwrite ni anuncios divergentes |
| D09 | Ownership y liberación de archivos compartidos | Diff final y responsables de entrypoint/routing/config/CI/deps/generadores; secuencia de integración acordada | Paths autorizados de implementación y distribución de issues |
| D10 | Evidencia/build y reversión | CI/build/preview del SHA real, manifest/receipt, casos reproducibles, limitaciones y rollback F4A | Comparaciones futuras, no regresión y rollback F4B que conserve API/UI/WebMCP |

El cierre debe distinguir aceptación técnica de publicación. F4B necesita una base aceptada estable; el anuncio conjunto en producción requiere que sus destinos y los F4A referidos estén funcionales en ese build y pasen su admisión. No exigir un hash de producción F4A inventado para aparentar secuencia; registrar el estado real y decidir la admisión aplicable.

## 3. Huecos esenciales y bloqueos concretos

### G01 — Contratos F4A no disponibles en la captura

**Estado: PENDIENTE F4A; parte dependiente detenida.** Esperado: documentos/extractos de cierre real enumerados D01–D10. Observado: sólo plan y bases F3; ninguna SDD F4A en esa tree/ramas visibles. Reproducción documental: listar paths con `git ls-tree -r --name-only eff4ce13a1f4b996f3d9b523799012bc668da318 docs` y contrastar F4A con el plan; la clonación inicial no mostró ramas F4A. No prueba ausencia fuera de esa captura.

Impacto: no fijar cálculos, schemas, rutas finales, exports, bases ni issues ejecutables. Owner: coordinador del programa después del cierre F4A. Resolución: incorporar D01–D10 por links permanentes y cotejo de contratos, no contactar continuamente a la otra sesión ni crear supuestas bases futuras. Auditorías de este borrador:0; sin implementación/spike/issue padre.

### G02 — Estado y fuente normativa de Server Card discrepantes

**Estado: hueco esencial con evidencia; congelado de card/discovery detenido.** Esperado: fuente vigente coherente y versión publicada del wire contract. Observado: [SEP Final](fuentes/card-sep.txt) remite a extensión, pero [README](fuentes/card-readme.txt) declara Experimental/no oficial y [discovery](fuentes/card-discovery.txt) declara draft. HEAD real `526201bbc80231daa40ffcdecfc9da4e54e5dc93`, el mismo snapshot histórico citado por SEP; paquete0.0.0private. SHA-256/fechas de consulta en [manifest](fuentes/manifest.json).

Impacto: no congelar schema URI, card de producto, ruta, media type final ni nuevos entries ARD/AI Catalog. Los campos/convenciones de ese snapshot se describen sólo como candidato. Owner: coordinador/arquitectura, mediante consulta posterior a la autoridad de extensión y consumidores reales. Resolución exigida: documentar dónde está el contrato vigente y su estado/versionado; si se adopta un draft, decisión explícita, fuente fijada y compatibilidad demostrada. **Este borrador no toma esa decisión.** No se rellena el hueco con un formato legacy supuesto, un schema externo no recuperado ni una card inventada. Auditorías:0; ninguna card implementada.

### G03 — Compatibilidad Workers y presupuesto de plataforma sin evidencia ejecutada

**Estado: PENDIENTE de verificación autorizada posterior.** La documentación y el artefacto SDK2.3.1 incluyen handler web/validador Workers, pero no acreditan bundle/CPU/cancelación en Astro7+adaptador14.2.6 y configuración real posterior a F4A. Docs `agents@0.28.0` y SDK2.3.1 tienen peers que requieren cuidado; no sustituir el SDK recomendado por ese wrapper sin evaluación.

Impacto: versión final/imports, capCPU y plan/budget no congelables aún. Owner: arquitectura fija un encargo posterior acotado de compatibilidad tras F4A; plataforma confirma plan/quota/receipts sin publicar secretos. Si hay incompatibilidad esencial, detener transporte y volver a SDD. No ejecutar ese spike/build/test ahora.

### G04 — Cancelación legacy sin correlación por sesión

**Estado: PENDIENTE de funciones y garantías F4A; criterio dependiente detenido.** Fuentes: [cancelación moderna](fuentes/cancel.txt), [transporte legacy](fuentes/legacy-http.txt), [fallback SDK](fuentes/sdk-publicado-extractos.txt). El handler stateless construye otra instancia por POST. Una notificación con requestId no identifica globalmente a un cliente público; un202 no prueba interrupción de otra petición. F3 no propaga signal a sus lecturas internas.

Impacto: no afirmar cancelación efectiva entre peticiones legacy, cancelación total de F3 o preempción síncrona de cálculos. Owner: arquitectura al incorporar D03/D06/D07. Resolución: medir señales y trabajo residual en versión fija, ratificar garantías por revisión y operaciones. Si cancelación correlacionada resulta esencial, diseñarla con aislamiento real o revisar compatibilidad; no añadir sesiones/auth sin necesidad de producto. Mientras tanto, sólo propuesta de ejecución breve acotada y cancelación moderna; sin PASS de cancelación.

## 4. Decisiones restantes para congelar

Además de los huecos, quedan decisiones normales propuestas: nombres/versiones MCP, soporte legacy concreto, ruta de transporte propuesta por el plan, mapeo sanitizado exacto, límites medidos, allowlist Origin/Host por entorno, identifiers/routing/generación finales, namespace limiter real, consumo/coste disponible y client matrix. No se asignan placeholders como valores ejecutables.

El método SDD exige bug/STOP durante una **implementación** sin contrato. Esta sesión de preparación registra el mismo contenido del bloqueo en esta carpeta, conforme al ownership y encargo del usuario; no abrió issues externos ni escribió en evidencia compartida. Si el bloqueo persiste al preparar el lanzamiento, el coordinador resolverá/publicará el bug aplicable antes de encargar código. Las partes independientes están documentadas sin transformar pendientes en decisiones ratificadas.
