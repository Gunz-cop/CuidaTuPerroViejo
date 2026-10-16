# Adenda de contratos — calculate_dog_age

Fecha: 2026-10-16. PR [#116](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/116). Origen: hallazgos H1 y H2 de la [auditoría R1](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/auditoria/edad-mcp-r1/docs/agent-readiness/evidencia/edad-mcp/auditoria/r1.md).

## Decisión

1. **Anexo de `inputSchema` WebMCP.** [`f4a/contratos/webmcp-input-schemas.json`](../f4a/contratos/webmcp-input-schemas.json) pasa de cuatro a cinco tools: se añade `calculate_dog_age`, en ASCII puro como exige la restricción B4/D32. Las cuatro entradas originales no cambian ni un byte. Ese anexo sigue siendo la fuente exacta de `INPUT_SCHEMAS` (`src/scripts/agent-tools.ts`), y `tests/agent-readiness/f4a-webmcp.test.ts` lo comprueba por igualdad.
2. **Harness.** `scripts/agent-readiness/mcp-client.mjs` y `scripts/agent-readiness/webmcp-browser.mjs` esperan ahora cinco tools e invocan `calculate_dog_age`. `webmcp-browser.mjs` también carga `/herramientas/calculadora-edad-perro`. Los cambios solo añaden comprobaciones: ninguna de las anteriores se relaja. El único cambio no aditivo es la cardinalidad del corpus en `mcp-client.mjs`, que ya no es un literal (era 28 en F4A y 32 al abrir este PR) y se comprueba contra el catálogo paginado del mismo build.
3. **Textos congelados.** No se reescribe el texto ratificado de [`f4a-contratos.md`](../../fases/f4a-contratos.md) §5.2 ni el de [`f4b-mcp-remoto.md`](../../fases/f4b-mcp-remoto.md) §1. Ambos remiten a esta adenda con una nota al pie. Donde dicen «cuatro tools», ese es el estado de la fase en su cierre; desde el PR #116, el registro vigente tiene cinco.

## Motivo

El propietario pidió exponer la calculadora de edad como herramienta de agentes en las dos superficies existentes, reutilizando el contrato F4A/F4B sin crear uno paralelo. Se eligió una adenda en lugar de un anexo nuevo porque genera menos cambios: un solo anexo vigente, los mismos tests y el mismo `--schemas` por defecto del harness.

## Reproducir la evidencia histórica

La evidencia de F4A/F4B se produjo con el harness del commit de cierre de cada fase, no con el actual. Para reproducirla, usa ese commit. Referencia: `mcp-client.mjs` de F4B, 22 609 bytes, SHA-256 `12057653df3d2fd9ba514d20562e2e81eb205acdd2a18598613e1830837ffc2a` ([`f4b/consumo-control/indice-originales.json`](../f4b/consumo-control/indice-originales.json), línea 42).
