# Único ciclo de corrección SDD F4B R1 → R2

Fecha: 2026-10-13. Autor/corrector distinto del auditor. **No ratifica ni congela, ni autoriza programación.** Issue [#89](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/89). R1 sobre `d45c76e1da40b0465022f455b9edf7efba2785db`, tree `a445586d013c0843e4f03a729bfc17ade9b32c85`: FAIL B1–B4. Informe [archivado literalmente](auditoria/sdd-r1.md), 16614bytes, SHA256 `636ebb6a670782ecd95d7e5bec47b0ee060e7e95137e595cf147d2538c898e5b`.

| Bloqueante | Cambio documental | Comprobación de autor, no auditoría formal |
|---|---|---|
| B1 export SDK | Import fijo `@modelcontextprotocol/server/validators/cf-worker` | Key pública en metadata npm2.3.1; target interno cfWorker no se confunde con subpath |
| B2 identidad | `name: cuidatuperroviejo.com/guias-herramientas`, igual runtime/card/registro | Cumple patrón namespace/server del schema primario archivado; description permanece76caracteres y dentro de100 |
| B3 admisión/cap | Slot antes de toda lectura/parseo de body; headers/path se rechazan antes cuando basta esa información | Contrato de3slow bodies: sólo2readers, tercero429sinlectura; malformed dentro de slot400 y recuperación; retención residual conserva cota |
| B4 error reservado | Fecha protocolo ASCII YYYY-MM-DD antes de negociación; malformed sin reflexión; -32022 con requested exacta obligatoria y acotada | [Fixtures completas](contratos/version-negotiation.json) para1900-01-01 y no-version, headers/request/status/response; no ejecutadas |

No se cambian versiones SDK/protocolo, base técnica, funciones/contratos F4A, fuentes de card, metodología, ownership, deadlines, quotas, política de sesiones/legacy ni gates de cierre/publicación. Se conserva la observación no bloqueante del auditor sobre proyección legacy de outputSchema: futuras pruebas comparan objeto de dominio después de la adaptación documentada del SDK, sin asumir wire idéntico moderno/legacy.

Se solicita **R2/2 al mismo auditor GPT-6.1 Sol/high** sobre snapshot fijo comunicado por coordinación. SegundoFAIL→STOPsin tercera revisión, nuevos cambios ni reset de contador. Durante este ciclo no hubo cambios de producto, instalaciones, builds, clientes MCP, preview ni promoción.
