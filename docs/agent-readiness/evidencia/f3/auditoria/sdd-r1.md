# Auditoría independiente de SDD F3 — R1

**Dictamen: FAIL. Intento 1/2 total. Dos bloqueantes, lista cerrada B3-SDD-01 y B3-SDD-02.**

Auditor: sesión independiente GPT-6.1 Sol/high; no autor, corrector ni implementador. Revisión offline documental del paquete, con código actual exclusivamente en lectura para factibilidad e integración. No se corrigió la SDD ni el producto. Informe escrito por el auditor; sin commit.

## Identidad y alcance

| Identidad | Valor verificado |
|---|---|
| Snapshot R1 | `e8498091d8e285dc41576fc00228541efc1bd65b` |
| Tree R1 | `0c97d664d831da29deade1b538a49c462bcd7903` |
| Base documental | `67dacfec405935567f71b403cd80a56f5aebe952` |
| Tree base | `d024a161e85b32c1cc783e1db9886c7ffa1e6d76` |
| Rama inspeccionada | `agent-ready/f3-sdd` |
| Producto F2 de referencia | `d2bd342050811d41ee212730cb11fe07783994bd` |

HEAD/tree coincidían con el snapshot al comenzar y al cerrar la inspección; el working tree estaba limpio antes de escribir este informe. El diff base→R1 contiene sólo documentación. F2 se toma como dependencia aceptada mediante su cierre archivado, sin repetir pruebas, matrices HTTP ni scans: 86 contenido, 40 general, nivel 4 general, bugs70/71 cerrados. No se verificó nuevamente el despliegue.

Leídos `AGENTS.md`, método SDD, README, plan, arquitectura, los tres documentos F3, decisiones/evidencia/anexos/fuentes F3, cierre F2, contratos y sucesoras pertinentes, referencias legacy del evaluador y los archivos actuales necesarios de build, routing, proyección, descubrimiento, Worker, CI y pruebas. La revisión considera base, datos, contratos, límites, errores, seguridad, versiones, ownership, orden, aceptación, promoción, rollback y STOP. Sólo se dictamina sobre bloqueantes de fondo/coherencia; no se añaden capacidades ni recomendaciones estilísticas.

## Lista cerrada de bloqueantes

### B3-SDD-01 — OpenAPI rechaza valores de q que el contrato textual admite

**Evidencia:** `docs/agent-readiness/fases/f3-contratos.md:28` y `:38` fijan validación tras decode/NFC/trim y longitud 1..200 codepoints del valor normalizado. `docs/agent-readiness/evidencia/f3/contratos/openapi.json:1059`–`:1064` y `:1511`–`:1516` imponen `maxLength:200` al parámetro query de GET/HEAD, aunque su descripción menciona NFC/trim. La fuente OAS archivada `referencias/openapi31.txt:1512` define `schema` como schema del parámetro, sin una transformación NFC/trim incorporada a JSON Schema.

**Reproducción documental:** q decodificado = 100 espacios + `cushing` + 100 espacios. La query serializada como `q=` + 100 signos `+` + `cushing` + 100 signos `+` mide 209 bytes, no contiene controles, y normaliza a `cushing`: siete codepoints, siete bytes y un token válido según §2. El valor decodificado tiene 207 codepoints y no pasa el schema del parámetro OpenAPI. Python `Draft202012Validator` confirma rechazo del valor decodificado y aceptación del valor recortado; no es una prueba HTTP.

**Requisito incumplido:** equivalencia de los contratos normativos y ausencia de discrepancias estructurales entre texto/anexos, exigidas por `f3-api-y-descubrimiento.md:5`, `f3-contratos.md:88` y `contratos/README.md:14`.

**Impacto:** un cliente/validador que siga el schema OpenAPI puede rechazar una consulta admitida por la API textual. El implementador debe escoger entre aplicar el límite antes o después de normalizar; esa decisión no le corresponde y afecta entradas frontera de C3-05/C3-08.

**Condición de cierre:** texto y schemas GET/HEAD deben admitir el mismo conjunto de inputs para q, dejando inequívoco qué restricciones se aplican al valor decodificado y cuáles al normalizado. Incorporar evidencia documental positiva/negativa que cubra padding y una forma Unicode cuya longitud cambie con NFC. No requiere ampliar la capacidad de búsqueda.

### B3-SDD-02 — F3C exige cambiar una prueba compartida F2 sin incluirla en su ownership

**Evidencia:** `f3-contratos.md:107`–`:117` exige cinco valores Link también en respuestas negociadas F2, HEAD y 304. `f3-api-y-descubrimiento.md:79` y `:85` conserva CI vigente, incluida negociación. La prueba compartida `tests/agent-readiness/negotiation.test.ts:189`, `:215` y `:261` compara por igualdad estricta Link contra el único valor histórico F1. Esa expectativa falla necesariamente con el conjunto nuevo. `f3-traspaso.md:49` limita los tests de ownership C a «testsF3 headers/discovery»; no incluye el archivo compartido F2. `f3-api-y-descubrimiento.md:62` prohíbe extender unilateralmente ownership. La autorización de `:48` para evolucionar checks F1 no resuelve expresamente la propiedad de esta prueba Worker F2.

**Requisito incumplido:** la SDD debe fijar los archivos compartidos y su propietario de integración (`sdd.md:15`), y permitir satisfacer los checks obligatorios dentro del ownership de la entrega. El contrato específico de C y los checks heredados quedan incompatibles con la frontera declarada.

**Impacto:** C no puede cumplir simultáneamente el nuevo Link contractual y la prueba vigente conservada. Un implementador que respete el ownership tendrá que abrir un bug y detenerse ante un cambio necesario ya identificable desde esta spec; editar la prueba por su cuenta viola la frontera.

**Condición de cierre:** fijar en los documentos normativos el propietario y la autorización acotada para adaptar las expectativas Link de `tests/agent-readiness/negotiation.test.ts` al conjunto F3. Deben conservarse sus verificaciones de negociación, cuerpos, headers y validadores; no omitir el archivo ni eliminar sus checks de CI. No supone reabrir F2 ni repetir sus matrices/scans.

## Comprobaciones documentales sin otros bloqueantes

| Área | Resultado y evidencia |
|---|---|
| Prerrequisito F2 y estado | Cierre archivado y SHA/base coherentes; propuesta separada de implementación/despliegue. Política `search=yes, ai-input=yes, ai-train=no` preservada. |
| Fuente de datos y límites | Corpus único índice/Markdown F2, lectura íntegra, metadata exacta, GFM, búsqueda AND determinista, límites, errores y guard409 definidos. Namespace query F3 evita el orphan detector F2. |
| Factibilidad de build/runtime | Orden actual discovery→projection admite hook F3 posterior; entrypoint compone F3 antes de F2 y `/api/*` ya pasa por Worker. Exports de índice disponibles. Las cuatro versiones propuestas existen en lockfile: 2.0.3/3.0.0/3.1.0/8.20.0. Sólo inspección, sin build ni instalación. |
| Anexos de API | JSON parseable; schemas de componentes API equivalentes a los mismos `$defs` locales tras rebasing de refs. Los 29 `$ref` OpenAPI resuelven internamente. Nueve operationIds y rutas/métodos coherentes; HEAD/204 sin contenido. OpenAPI mide 106300 bytes, dentro del cap documental. B3-SDD-01 limita este resultado para q. |
| Ejemplos | Los tres cuerpos JSON completos pasan validación estructural. Corpus, total y entrada Catalog coinciden con el índice F2A archivado declarado; no se les atribuye deployment actual. Read completo se exige a la implementación contra entidad F2 original, sin ejemplo truncado ficticio. |
| API Catalog | Linkset RFC9727/9264 con contextos, item targets funcionales propuestos y service-desc; MIME/profile, GET/HEAD y descubrimiento previstos coherentes. Sin templates presentados como hyperlinks. |
| Skills | Fuente primaria discovery0.2.0 define URI schema opaco; falta de descarga remota declarada. Índice, tipo, campos/digest/MIME y frontmatter conformes al subset elegido. Artifact de 3350 bytes, flujo público de lectura y manejo de errores, sin mantenimiento repo ni operaciones con efectos. |
| ARD actual y legacy | Primaria v0.91 exige ard.json/rel ard y admite miembros de transporte; compatibilidad ai-catalog/evaluador expresamente separada. Manifest concreto pasa schema F3 local y `$defs/ArdManifest` primario con Python Draft202012Validator. Dos entries URN, URLs/tipos/query examples y ausencia de registry/trust ficticios coherentes. |
| Integridad de fuentes | Verificados bytes/SHA256 de todas las fuentes publicadas con archivo en manifest y de cada HTML original local referenciado. Copias íntegras y extractos públicos están diferenciados. No se descargaron fuentes de nuevo. |
| Seguridad y aceptación | Inputs cerrados, no fetch arbitrario/externo, ASSETS interno acotado, no auth/cookies/reflejo, CORS API limitado, no-store y límites de trabajo establecidos. Aceptación exige corpus completo, oráculo independiente, workerd/preview del SHA real y evidencias sanitizadas. B3-SDD-02 limita factibilidad de CI C. |
| Gobernanza y cierre | A→B→C sin solapamiento, bases admitidas antes de issues, SDD máximo2 mismo auditor e implementación máximo5/issue; FAIL final→STOP sin reset. Promoción autorizada separada, recibo/build real, scans finitos comparables y rollback coherente C→B→A preservando F1/F2/evidencia. |

## Límites y siguiente gate

No se instalaron dependencias del producto. Ajv no está instalado en este checkout, por lo que no se afirma compilación integral Ajv2020 del schema con patrones Unicode. Se usó validación estructural Python para los ejemplos y manifests ARD, comparación directa de schemas API y resolución documental de refs. No se ejecutó API F3, build, workerd, preview, HTTP de producción, deploy, scan ni CI del producto. No se afirma cumplimiento funcional, acceso de proveedores, puntuación nueva o implementación publicada.

Esta revisión consume R1 del máximo de dos revisiones totales de SDD. FAIL permite un único ciclo de corrección documental y R2 por este mismo auditor sobre nuevo snapshot fijo. No ratificar ni abrir issues/lanzar programación basándose en R1. Si R2 falla, STOP sin nuevas correcciones ni tercera revisión. La lista de bloqueantes de R1 queda cerrada en los dos IDs anteriores.

**Fin de escrituras del auditor:** únicamente este informe. No se modificaron otros archivos ni se creó commit.
