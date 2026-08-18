# Evaluation offline — Assistant V2

Este directorio contiene la infraestructura de evaluación local. El dataset
editorial todavía no está congelado y, por eso, `dataset.jsonl` no se crea en
esta fase. Cuando Editorial entregue los casos, se añadirá como JSONL
versionado en este mismo directorio.

## Contrato de cada caso

Cada línea no vacía de `dataset.jsonl` debe ser un objeto JSON con esta forma:

```json
{
  "id": "clear-001",
  "question": "Se pierde por la casa durante la noche",
  "gold": {
    "triage": "non-emergency",
    "decision": "article",
    "slug": "disfuncion-cognitiva-canina"
  },
  "tags": ["clear-match", "senior"],
  "category": "clear-match"
}
```

Campos obligatorios:

- `id`: identificador único y estable dentro del archivo.
- `question`: consulta editorial en español. Se conserva únicamente dentro del
  dataset versionado; el harness no la imprime ni la guarda en resultados.
- `gold.triage`: `emergency` o `non-emergency`.
- `gold.decision`: `article`, `topic` o `none`.
- `gold.slug`: slug del artículo cuando `decision` es `article`; `null` para
  `topic` y `none`.
- `tags`: una o más etiquetas editoriales.
- `category`: categoría principal no vacía.

Campo opcional:

- `pairId`: agrupa dos o más consultas semánticamente equivalentes para medir
  repeatability. No cambia los gold labels y no se usa para seleccionar una
  respuesta.

El loader rechaza JSON inválido, campos desconocidos, tipos incorrectos,
strings vacíos, slugs no válidos, combinaciones incoherentes entre
`gold.decision` y `gold.slug`, etiquetas duplicadas, IDs duplicados y
`pairId` vacío. Se permiten líneas vacías; no se permiten comentarios.

No se incluye un número objetivo de casos en el schema. La distribución de 170
casos y sus categorías pertenece a `EVALUATION-PLAN.md`; Editorial debe
entregar los casos y sus etiquetas antes del freeze.

## Seam del harness

`scripts/assistant-v2-eval/index.ts` separa tres operaciones:

1. `loadDatasetText` / `loadDatasetFile`: parseo y validación del JSONL.
2. `evaluateDataset`: ejecuta un callback de routing sobre cada caso, con un
   número configurable de runs, sin depender de Workers AI.
3. `calculateMetrics`: cálculo puro en `metrics.ts` sobre casos y predicciones.

El callback recibe el caso del dataset y devuelve solo esta predicción:

```ts
{
  triage: 'emergency' | 'non-emergency';
  decision: 'article' | 'topic' | 'none';
  selectedSlugs: readonly string[];
}
```

`selectedSlugs` representa la selección determinista del router. Puede tener
hasta dos artículos en una decisión ambigua y puede representar un topic en
una ruta `topic`. Para las métricas de artículos, solo cuenta una selección
cuando `decision` es `article`; el primer slug es el top-1.

La ejecución valida también la forma de cada predicción y rechaza respuestas
malformadas con el `id` del caso y el número de run, sin incluir el texto de la
consulta en el error.

## Métricas offline

`calculateMetrics` devuelve `{ value, numerator, denominator }` para cada
métrica. `value` es `null` si no hay casos aplicables; no se inventan ceros.

- `top1ArticleAccuracy`: en casos con gold de artículo, el primer slug
  seleccionado coincide con el gold.
- `articlePrecision`: entre las predicciones que muestran artículo, la
  selección incluye el gold de artículo.
- `articleRecall`: entre los gold de artículo, la selección incluye el gold.
- `noArticleAccuracy`: entre los gold sin artículo (`topic` o `none`), no se
  muestra un artículo.
- `safetyRecall`: emergencias gold clasificadas como `emergency`.
- `emergencyFalsePositiveRate`: casos no emergentes clasificados como
  `emergency`.
- `repeatability`: pares `pairId` con una predicción idéntica en todos sus
  casos y runs, dividido entre los pares con al menos dos casos. Si no se
  pasan pares, el denominador es cero.

Las métricas se calculan sobre todas las predicciones recibidas. Para medir
repeatability de routing, se recomienda ejecutar al menos 3 runs; el plan de
evaluación exige 10 runs para el escenario de consultas repetidas. El harness
no genera pares ni consulta modelos.

Las métricas live de latencia, HTTP 5xx, coste, generación, concurrencia,
validación semántica y fallas de Workers AI no se simulan aquí. Pertenecen a
preview/bake-off/QA.

## Fronteras con las fases siguientes

- **Editorial** debe entregar los slugs, exclusiones, categorías, pares y gold
  labels. Evaluation solo valida el contrato y calcula resultados; no decide
  qué respuesta es correcta.
- **Retrieval** conectará su router determinista mediante `evaluateDataset`.
  Evaluation no importa ni modifica `retrieval.ts`, no calcula embeddings y no
  calibra thresholds.
- **Bake-off** consumirá un dataset ya congelado y una autorización explícita
  de red. Allí se compararán embeddings, lexical-only/hybrid, reranker y
  modelos; este esqueleto mantiene todos esos valores pendientes.

El seam de callback permite que QA añada posteriormente escenarios de fallo
sin cambiar el dataset ni este loader: embedding unavailable → lexical-only,
reranker unavailable, generation unavailable, Workers AI unavailable,
respuesta malformada y timeout. Esos escenarios requieren un adaptador o
runner de la fase correspondiente; no se simulan aquí ni se crean stubs de
runtime V2.

## Uso local

Validar un dataset entregado por Editorial:

```text
npx tsx scripts/assistant-v2-eval/index.ts docs/asistente-ia/eval/dataset.jsonl
```

Consultar la ayuda:

```text
npx tsx scripts/assistant-v2-eval/index.ts --help
```

Para evaluar routing, una fase posterior importa `loadDatasetFile`,
`evaluateDataset` y `calculateMetrics`, y conecta su función determinista de
routing. El harness no es propietario de `retrieval.ts`, embeddings,
reranking, thresholds ni generación.

## Proceso de freeze posterior

1. Editorial entrega intents, topics, safety y la lista definitiva de slugs y
   exclusiones.
2. Editorial redacta los casos según la distribución de `EVALUATION-PLAN.md`,
   incluyendo las semillas históricas solo después de revisarlas.
3. Evaluation carga el JSONL, corrige errores de schema y verifica IDs/pairs;
   no inventa gold labels.
4. El Product Owner/editor responsable aprueba los gold labels y el commit que
   congela el archivo.
5. Se registra la versión del dataset y del índice en los resultados del
   bake-off. Solo después de esa autorización se puede hacer cualquier llamada
   externa.

Thresholds (`T_alto`, `T_bajo`, `M`, `R_min`) y modelos permanecen pendientes
hasta el bake-off. Esta infraestructura no los calibra.

## Preguntas de arquitectura

- El plan menciona topics externos, pero su contrato mínimo solo exige `slug`
  de artículo o `null`. Este esqueleto conserva el slug del topic únicamente
  en la predicción futura, no en el gold; si se necesita medir accuracy de
  topic por slug, Editorial/Architecture Owner debe aprobar una extensión del
  contrato antes del freeze.
- El plan usa tanto pares semánticamente equivalentes como consultas
  repetidas. `pairId` cubre las equivalencias; los runs cubren repetición de la
  misma línea. No se añaden campos de texto duplicado al dataset.
