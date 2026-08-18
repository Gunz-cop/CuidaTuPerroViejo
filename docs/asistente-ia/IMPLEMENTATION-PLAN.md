# IMPLEMENTATION-PLAN — Assistant V2 después de Foundation

Este plan convierte la arquitectura aprobada en sesiones separables. Foundation
define contratos y schemas; no implementa retrieval, generación ni integración.

## Dependencias y orden de merge

1. **Foundation/contracts**: contratos, tipos, configuración pendiente y
   validadores editoriales. Salida: `npm run build` y pruebas contractuales.
2. **Editorial intents/topics/safety**: documentos curados que cumplen los
   schemas. Depende de Foundation y de la aprobación de fuentes.
3. **Evaluation dataset/harness**: dataset congelado y pruebas offline. Depende
   de los contratos y de los slugs/documentos editoriales.
4. **Cloudflare bake-off**: selección por rol y calibración de umbrales. Depende
   del dataset; requiere autorización explícita para llamadas externas.
5. **Retrieval/index**: índice versionado y función determinista de retrieval/
   decisión. Depende de documentos y bake-off.
6. **Safety**: triage, prototipos y protocolos. Puede avanzar en paralelo con
   retrieval después de Foundation, pero debe mergearse antes de integración.
7. **Generation/Gateway**: generación desacoplada, validación y fallback.
   Depende de decisión, grounding y resultados del bake-off.
8. **API/frontend integration**: adaptador compatible y canary. Depende de
   retrieval, safety y generation integrados.
9. **QA/canary**: preview, fallas simuladas, concurrencia y escalado. Depende
   del commit de integración.

Orden recomendado de merge: `01-foundation → 02-editorial → 03-evaluation →
04-bakeoff → 05-retrieval → 06-safety → 07-generation → 08-integration →
09-qa`. Las sesiones pueden preparar trabajo en ramas separadas, pero nunca
   editar simultáneamente el mismo archivo.

## Criterios de entrada y salida

| Sesión | Entrada | Salida verificable |
|---|---|---|
| Foundation | Arquitectura/ADRs leídos y working tree inventariado | Tipos estables, schemas válidos, umbrales pendientes, `npm run build`, contratos en verde |
| Editorial | Schemas de Foundation y lista de slugs/fuentes aprobada | 16 intents y topics/safety acordados; validación sin errores |
| Evaluation | Documentos y contratos versionados | Dataset congelado, harness offline, métricas y gold explícitos |
| Bake-off | Dataset congelado y autorización de red | Modelos por rol, versiones, resultados y `T_alto/T_bajo/M/R_min` calibrados |
| Retrieval/index | Editorial + bake-off | Índice reproducible versionado, decisión determinista, smoke test en verde |
| Safety | Prototipos y protocolos aprobados | Gate determinista, etiquetas y pruebas de emergencia/negación |
| Generation/Gateway | Decision + grounding + modelos aprobados | Validación semántica, fallback editorial, sin selección de slug por LLM |
| Integration | Capas anteriores mergeadas | `/api/ask` compatible, frontend intacto salvo cambio autorizado, canary reversible |
| QA/canary | Preview desplegado por Integration Lead | 0 respuestas 5xx en pruebas de fallas, objetivos de latencia/seguridad y rollback probado |

## Comandos de verificación

Foundation y cada merge local:

```text
npm run check
npm run build
npx tsx tests/assistant-v2/contracts.test.ts
```

Las sesiones que añadan suites pueden ejecutar además su script específico. No
se invocan modelos ni servicios externos en la suite contractual. Bake-off y
preview requieren autorización y se ejecutan fuera de esta fase.

## Commits

Cada sesión entrega un commit pequeño y atómico con prefijo de fase, por ejemplo
`assistant-v2: foundation contracts`. No se mezclan cambios de producción con
documentos editoriales ni resultados de evaluación. Los resultados llevan fecha,
versión de índice y versión de modelo.

## Rollback

Antes de cada merge, el Integration Lead conserva el commit padre y ejecuta las
verificaciones. El rollback normal es revertir el commit de la fase sin tocar
los commits de otros territorios. Para canary, `ASSISTANT_V2_PERCENT=0` devuelve
el tráfico al flujo anterior. Hasta la fase de integración no hay cambios de
runtime que revertir.

## Regla de edición concurrente

Está prohibido que dos sesiones editen el mismo archivo en paralelo. Si se
necesita una modificación transversal, la sesión propietaria abre una solicitud
al Integration Lead y espera el merge; no se crean variantes silenciosas del
contrato.
