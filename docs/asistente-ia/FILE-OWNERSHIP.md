# FILE-OWNERSHIP — Assistant V2

Regla general: una sesión solo modifica los archivos de su territorio. No se
editan en paralelo archivos compartidos ni se mezclan fases en un mismo commit.
El Integration Lead integra y verifica cada merge.

| Territorio exclusivo | Sesión responsable | Archivos autorizados principales |
|---|---|---|
| Foundation/contracts | Foundation Lead | `src/lib/assistant/v2/types.ts`; `src/lib/assistant/v2/contracts.ts`; `src/lib/assistant/v2/config.ts`; `src/lib/assistant/v2/README.md`; `src/content/assistant/config.ts`; `tests/assistant-v2/contracts.test.ts`; `docs/asistente-ia/IMPLEMENTATION-PLAN.md`; `docs/asistente-ia/FILE-OWNERSHIP.md` |
| Editorial intents/topics/safety | Editorial Lead | `src/content/assistant/intents/`; `src/content/assistant/topics/`; `src/content/assistant/safety/`; documentos editoriales dentro de esas rutas |
| Evaluation dataset/harness | Evaluation Lead | `docs/asistente-ia/eval/dataset.jsonl`; `docs/asistente-ia/eval/README.md`; `scripts/assistant-v2-eval/index.ts`; `scripts/assistant-v2-eval/metrics.ts` |
| Cloudflare bake-off | Bake-off Lead | `scripts/assistant-v2-bakeoff/index.ts`; `scripts/assistant-v2-bakeoff/README.md`; `docs/asistente-ia/eval/BAKEOFF-RESULTS.md` |
| Retrieval/index | Retrieval Lead | `src/lib/assistant/v2/retrieval.ts`; `scripts/build-routing-index.ts`; `src/content/assistant/routing-index.json`; `tests/assistant-v2/retrieval.test.ts` |
| Safety | Safety Lead | `src/lib/assistant/v2/safety.ts`; `src/content/assistant/safety/`; `tests/assistant-v2/safety.test.ts` |
| Generation/Gateway | Generation Lead | `src/lib/assistant/v2/generation.ts`; `src/lib/assistant/v2/validation.ts`; `tests/assistant-v2/generation.test.ts`; `tests/assistant-v2/validation.test.ts` |
| API/frontend integration | Integration Lead | `src/pages/api/ask.ts`; `src/pages/asistente-ia.astro`; `src/lib/assistant/v2/adapter.ts`; configuración de canary |
| QA/canary | QA Lead | `scripts/assistant-v2-qa/index.ts`; `scripts/assistant-v2-qa/README.md`; `docs/asistente-ia/qa/`; `tests/assistant-v2/qa.test.ts` |

## Archivos compartidos: solo Integration Lead

Solo el Integration Lead puede modificar:

- `package.json` y `package-lock.json`;
- `src/pages/api/ask.ts`;
- `src/pages/asistente-ia.astro`;
- `src/content/config.ts`;
- `wrangler.jsonc`, variables/bindings y configuración de despliegue;
- `tsconfig.json`, configuración de Astro y scripts npm;
- `docs/asistente-ia/STATUS.md` y `docs/asistente-ia/PROGRESS.md` al cerrar una fase o mergear resultados.

La excepción de Foundation es la actualización de estado/progreso que exige su
propio encargo; los propietarios de fase pueden proponer entradas, pero el
Integration Lead conserva la integración final de esos dos archivos. Los demás
territorios entregan un parche o commit para que el Integration Lead lo integre;
no cambian archivos compartidos para “hacer pasar” su suite.

## Protocolo de conflicto

Si una tarea necesita tocar un archivo de otro territorio, se detiene y se
solicita integración al propietario. Nunca se resuelve un conflicto reescribiendo
el trabajo de otra sesión ni haciendo `reset` de sus cambios.
