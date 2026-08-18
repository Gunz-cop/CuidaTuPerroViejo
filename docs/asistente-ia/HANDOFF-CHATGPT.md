# Handoff para ChatGPT — Assistant V2

## Objetivo del producto

Rediseñar `/asistente-ia` de Cuida Tu Perro Viejo con prioridad en:

1. rendimiento y experiencia mobile-first;
2. recomendar artículos del sitio cuando exista una coincidencia real;
3. ofrecer orientación general fundamentada cuando no exista un artículo;
4. mantener triage veterinario prudente, sin diagnosticar;
5. producir la misma decisión de artículo para la misma consulta;
6. degradar sin respuestas 5xx cuando falle la IA.

El usuario perdió confianza en la implementación V1 porque consultas repetidas
producían artículos distintos, respuestas malformadas o ninguna respuesta.

## Repositorio y estado operativo

- Repositorio: `C:\Users\grcx1\OneDrive\Documentos\Proyectos\CuidaTuPerroViejo`
- Producción y flujo V1 no deben modificarse todavía.
- No desplegar ni cambiar `/api/ask` o `/asistente-ia.astro` hasta la fase de integración.
- El working tree contiene cambios preexistentes de V1 y otras APIs. No resetearlos,
  sobrescribirlos ni incluirlos accidentalmente en commits de V2.
- Leer `docs/asistente-ia/FILE-OWNERSHIP.md` antes de asignar o editar archivos.
- Dos sesiones no deben editar el mismo archivo en paralelo.

## Diagnóstico de V1

El problema no era solamente Qwen. V1 enviaba aproximadamente 64 KB del catálogo
de 16 artículos a un LLM en cada consulta. El mismo modelo elegía el slug y
redactaba el consejo. La salida estructurada no era fiable, la validación aceptaba
strings malformados, el verificador solo confirmaba el candidato elegido y los
fallbacks podían terminar en 503. Cambiar de modelo no resuelve ese diseño.

Casos reales que fallaron incluyen:

- “Mi Luna de 11 años comienza a ladrar como desesperada cuando salgo de casa”.
- “Stacy ya no mira bien y cuando se levanta en las noches se pierde en la casa”.
- “Mi perro me mordió pero no tiene rabia”.
- Variantes con erratas como “bin”, “ccasa” y “deseperada”.

## Arquitectura decidida

La recomendación es la Opción C de `RECOMMENDED-ARCHITECTURE.md`:

1. Documentos de intención curados por artículo.
2. Índice estático versionado generado en build.
3. Triage determinista antes de caché y generación.
4. Retrieval híbrido: embedding + cosine, BM25 de char-n-gramas y fusión.
5. Umbrales deterministas eligen artículo, ambigüedad o ausencia de artículo.
6. El LLM nunca recibe el catálogo ni puede elegir slugs.
7. Generación desacoplada, con grounding editorial, validación y reintento.
8. Fallback editorial determinista: nunca 503.
9. Temas externos curados y fuentes aprobadas en Git; sin búsqueda web en runtime.
10. Telemetría sin texto de consulta, usando HMAC-SHA-256 con secreto y `keyId`.

Con el tamaño actual no se recomienda Vectorize ni AI Search. Un índice local de
menos de 50 documentos es más simple, rápido, auditable y atómico con el deploy.

## Estado alcanzado

La arquitectura y la Foundation están completas. No existe todavía runtime V2.

Foundation define:

`normalize → triage → retrieve → decide → generate → validate → buildFallback`

Archivos principales:

- `src/lib/assistant/v2/types.ts`
- `src/lib/assistant/v2/contracts.ts`
- `src/lib/assistant/v2/config.ts`
- `src/lib/assistant/v2/README.md`
- `src/content/assistant/config.ts`
- `tests/assistant-v2/contracts.test.ts`

Los contratos ya incluyen:

- entradas de índice con payload, vector, hashes y estadísticas BM25/char-ngram;
- prototipos de seguridad vectorizados;
- umbrales separados para `hybrid` y `lexical-only`;
- reranker opcional;
- representación semántica reutilizable entre triage y retrieval;
- validación con `GenerationResult` y `GenerationContext`;
- fallback con decisión, documentos, grounding, protocolo y riesgos;
- separación entre respuesta interna V2 y JSON V1 mediante adaptador futuro;
- schemas que validan HTTPS, authority, urgency, riskTags y rutas locales;
- telemetría sin almacenar la pregunta.

Verificación reportada y revisada:

- `npx tsc --noEmit`: OK.
- `npx tsx tests/assistant-v2/contracts.test.ts`: OK.
- `npm run build`: OK.
- `npm run check` no existe en `package.json`; no debe inventarse para esta fase.

## Documentación que debe leerse

En este orden:

1. `docs/asistente-ia/STATUS.md`
2. `docs/asistente-ia/RECOMMENDED-ARCHITECTURE.md`
3. `docs/asistente-ia/IMPLEMENTATION-PLAN.md`
4. `docs/asistente-ia/FILE-OWNERSHIP.md`
5. `docs/asistente-ia/EVALUATION-PLAN.md`
6. `docs/asistente-ia/MODEL-EVALUATION.md`
7. `docs/asistente-ia/MIGRATION-PLAN.md`
8. `docs/asistente-ia/RISKS.md`
9. los seis ADRs bajo `docs/asistente-ia/ADR/`
10. `src/lib/assistant/v2/README.md` y los contratos TypeScript.

## Decisiones que deben mantenerse

- La selección de artículos es determinista y no pertenece al LLM.
- No se envía el catálogo completo al prompt.
- No se busca en la web en runtime.
- No se fijan modelos ni umbrales sin bake-off.
- Los umbrales híbridos y lexical-only se calibran por separado.
- El reranker solo se activa si demuestra mejora medible.
- Los fingerprints usan HMAC, no SHA-256 simple.
- Modelo, embeddings, thresholds, índice y caché llevan versiones compatibles.
- Triage corre antes de leer caché.
- Una emergencia no conserva recomendaciones elegidas por otra ruta.
- El fallo de generación no elimina una recomendación ya decidida.
- V2 debe poder responder con plantilla aun cuando Workers AI falle por completo.
- Las fuentes veterinarias requieren aprobación humana/editorial.

## Próximas fases

### Fase 02 — Editorial

Crear los 16 documentos de intención y los temas/protocolos de seguridad. Deben
representar síntomas primarios, paráfrasis coloquiales, erratas, exclusiones,
grounding y fallbackAdvice. No tocar algoritmos ni producción.

Antes de aprobar contenido externo, el usuario debe decidir la lista de fuentes
veterinarias autorizadas. Un documento puede quedar `pending`, pero no debe
presentarse como aprobado ni entrar a producción.

### Fase 03 — Evaluation

Puede preparar en paralelo el schema, harness offline y taxonomía. El dataset
gold no se congela hasta integrar Editorial, porque necesita slugs y exclusiones
definitivos. Debe incluir repeticiones, erratas, negativos cercanos, consultas
sin artículo, emergencias, ambigüedad y fallos simulados.

### Fase 04 — Bake-off

Solo después del dataset congelado y con autorización explícita para llamadas
externas. Evalúa embedding, reranker opcional y modelos de generación. Produce
modelos por rol y umbrales calibrados; no selecciona por intuición o precio solo.

### Fases posteriores

5. Retrieval/index.
6. Safety.
7. Generation/Gateway.
8. Integración API/frontend y shadow/canary.
9. QA, degradación, concurrencia, rollback y despliegue gradual.

## Cómo coordinar las siguientes sesiones

- Editorial y el esqueleto de Evaluation pueden trabajar en paralelo después de
  revisar Foundation.
- Evaluation no congela gold hasta recibir Editorial.
- Bake-off espera a ambos.
- Cada sesión entrega cambios pequeños, pruebas y un resumen; no despliega.
- `STATUS.md` y `PROGRESS.md` se actualizan al integrar una fase, no por todas las
  sesiones simultáneamente.
- El Integration Lead es el único que debe tocar `package.json`, configuración
  compartida, `/api/ask`, frontend, bindings o despliegue.

## Decisiones humanas pendientes

1. Ratificar formalmente Opción C y routing determinista.
2. Aprobar lista de fuentes y temas externos.
3. Autorizar el bake-off de Cloudflare (coste previsto bajo, pero con red).
4. Elegir si KV entra en el primer canary o después.
5. Aprobar presupuesto de latencia y degradación visible.
6. Aprobar cambios de frontend para estados ambiguos/degradados.

## Instrucción inicial para la nueva sesión de ChatGPT

Actúa como coordinador técnico y editorial. Primero lee este handoff y los
documentos listados. No implementes ni despliegues todavía. Revisa que la
Foundation y el plan sigan coherentes, ayuda al usuario a aprobar las decisiones
humanas pendientes y genera encargos separados para Editorial y Evaluation con
propiedad exclusiva de archivos y criterios de salida verificables.
