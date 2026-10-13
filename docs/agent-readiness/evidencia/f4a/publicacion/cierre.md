# F4A — Cierre

Fecha 2026-10-13. **F4A está publicada, auditada y cerrada.**

## Cadena

| Paso | Referencia | Resultado |
|---|---|---|
| SDD | Ciclo 1 terminó en STOP ([registro](../stop-sdd/README.md)); ciclo 2 con [PASS R1/2](../auditoria/sdd-c2-r1.md) y [ratificación](../ratificacion-sdd.md) en `1571da4` | Congelada |
| F4A-1: lógica compartida, API de cálculo y contratos | Código `dad30d8`; [PASS R1/5](../auditoria/f4a-1-r1.md); [cierre](../1/cierre.md) | Aceptada |
| F4A-2: registro WebMCP | Código `35e2c15`; [PASS R1/5](../auditoria/f4a-2-r1.md); [cierre](../2/cierre.md) | Aceptada |
| Preview | `35e2c15` y `5a8e78d` en Workers Builds; gates C4A-08 a C4A-13 PASS; build byte a byte | Verificada |
| Promoción | Autorización del propietario; `main` `aad2a66` → `35e2c15` por fast-forward, 2026-10-12T22:51:18Z ([recibo](recibo-produccion.json)) | Publicada |
| Gates de producción | P4A-01, P4A-02 y P4A-03, una ejecución cada uno ([resultado](resultado.md)) | PASS |
| Auditoría de publicación | [R1](../auditoria/f4a-publicacion-r1.md) FAIL sólo por B1 (README, documental); corregido en `c72440b`; [R2/2](../auditoria/f4a-publicacion-r2.md) PASS, con reverificación independiente de producción | PASS |

Autor y coordinador: sesión `claude-opus-5-5`/high. Auditor independiente fijo para F4A-1, F4A-2 y la publicación: otra sesión, también `claude-opus-5-5`/high. Ambos están homologados de GPT-6.1 Sol/high, que no estaba disponible. Por decisión del propietario no se usó Astra.

Archivo de los informes de auditoría: R1 (12585 bytes, `baf9f992…`) es byteidéntico al original, confirmado con `cmp` por el auditor. R2 (4989 bytes, `580c864d…`) se reconstruyó desde su mensaje, con el mismo procedimiento.

## Qué queda publicado

- **Lógica compartida:** un único módulo por calculadora (`src/lib/agent-tools/`), que usan la UI, la API y WebMCP. Fórmulas, textos y DOM de la UI no cambian, y así lo prueban el oráculo legado y el dominio completo.
- **API de cálculo:** `GET /api/agent/v1/tools/calidad-vida` y `/movilidad`, en OpenAPI 1.1.0, API Catalog, ARD, skill y `llms.txt`. Los descriptores anuncian sólo lo implementado.
- **WebMCP:** `document.modelContext.registerTool` con cuatro tools de sólo lectura: `search_guides`, `read_guide`, `evaluate_quality_of_life` y `recommend_mobility_aids`. Sin API nativa, el sitio no hace nada distinto: no hay polyfill ni simulación.
- **Fuera de F4A:** no se registraron formularios con efectos, contacto, feedback, asistente ni administración. Tampoco hay MCP remoto (F4B), DNS (F5), autenticación (F6) ni comercio.
- **Política F1** sin cambios: `search=yes, ai-input=yes, ai-train=no`.

## Puntuación comparable

Medida con el mismo evaluador congelado, la misma selección y la misma fórmula que F3:

- **Content:** 86 (Δ0).
- **All-ui:** **67** (Δ+7). El único cambio es `webMcp`, que pasa de fail a pass porque el evaluador encontró las 4 tools vía `document.modelContext`.

## Limitaciones conocidas

1. **Disponibilidad de WebMCP:** es un Draft CG Report; Chrome lo expone tras `WebMCPTesting` o en origin trial desde Chrome 149. No se añadió token de origin trial, así que los navegadores sin la API reciben el sitio de siempre. Con los field trials de prueba de Chrome for Testing, la API puede aparecer sin el flag.
2. **Check de deploy:** el check de GitHub del build de producción sigue `in_progress`, igual que en F3. La prueba de que producción sirve el build es la identidad por contenido.
3. **Coste en todas las páginas:** el script del layout añade unos 16 KB de JS. Pendiente de decisión del propietario: si encaja con «sin peticiones nuevas» de la SDD §1, que la auditoría no consideró bloqueante.
4. **Desviación del autor:** P4A-01 envió dos peticiones POST/DELETE con respuesta 405 y sin efectos, fuera del límite GET/HEAD/OPTIONS de la propuesta. Está registrada en `resultado.md`.
5. **Originales privados:** los `response.raw.json` del evaluador quedan en el contenedor efímero de la sesión coordinadora. Su referencia durable es el [índice SHA-256](indice-originales.json).
6. **Decisiones heredadas del propietario:**
   - La FAQ de calidad de vida dice «superior a 35», pero el código trata 35 como aceptable. F4A conserva el comportamiento existente.
   - `docs/migracion-stack/README.md` está desactualizado.

## Rollback

Según [propuesta.md](propuesta.md#rollback), con autorización separada. Primero se quita la línea del layout y `src/scripts/agent-tools.ts`; la API y las calculadoras siguen funcionando. Después, si hace falta, se revierte F4A-1. El estado anterior es `aad2a66`.

## Pendiente para F4B (fuera de F4A)

- Servidor MCP remoto y MCP Server Card. Es el check `mcpServerCard`, que sigue en fail.
- Las mismas tools expuestas vía MCP remoto, reutilizando `src/lib/agent-tools/` y la API F3/F4A, con sus propios SDD, auditorías y autorización.
