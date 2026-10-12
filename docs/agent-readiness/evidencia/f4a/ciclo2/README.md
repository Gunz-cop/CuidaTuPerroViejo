# F4A — Ciclo 2 de SDD

Fecha 2026-10-12. El ciclo 1 terminó en [STOP](../stop-sdd/README.md) tras R2 FAIL por el bloqueante B4. El propietario eligió la salida (a) del auditor («sigue con la recomendada») y autorizó un ciclo nuevo de SDD con presupuesto propio: como máximo dos revisiones del mismo auditor, sólo bloqueantes, y FAIL en la segunda → STOP. Los informes del ciclo 1 se conservan íntegros.

## Cambios respecto del snapshot R2 `7eceeca` del ciclo 1

| Archivo | Cambio |
|---|---|
| `contratos/webmcp-input-schemas.json` | Todas las cadenas en ASCII (tildes eliminadas por descomposición NFD); `q` describe los límites F3 reales (obs. 1 de R2) |
| `fases/f4a-contratos.md` §5.2 | Regla normativa: cadenas de `inputSchema` ASCII, con motivo B4; nombres, títulos y descripciones de tools sin restricción |
| `fases/f4a-herramientas-webmcp.md` | Estado del ciclo 2; C4A-08 añade el check offline de ASCII y la igualdad de `inputSchema` también vía `getTools()` |
| `decisiones.md` | D32 |
| Estado | `plan.md`, README del programa y resolución en el registro del STOP |

## Comprobación en navegador real

Chrome for Testing 155.0.8059.39 + `WebMCPTesting`. Se registraron los cuatro `inputSchema` del anexo nuevo con descripciones de tool en español con tildes. Resultado: en las cuatro tools `WebMCP.toolsAdded` entrega el `inputSchema` con igualdad profunda, `readOnly:true` y la descripción con tildes intacta, y `getTools()` coincide igualmente ([script](probe-schemas-ascii.mjs), [salida](probe-schemas-ascii.out.txt)). La [reproducción de B4](../stop-sdd/probe-b4.out.txt) muestra el fallo con el anexo anterior.
