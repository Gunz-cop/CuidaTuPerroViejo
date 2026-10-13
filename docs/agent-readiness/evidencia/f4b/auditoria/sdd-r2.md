# Auditoría independiente de SDD F4B — R2/2 FINAL

Fecha: 2026-10-13. Dictamen: **FAIL por un bloqueante nuevo introducido en el delta de corrección (B5)**. Los cuatro bloqueantes de R1, B1–B4, están resueltos en su objeto original. Conforme al encargo, **segundo FAIL implica STOP de este ciclo: no tercera revisión, nueva corrección dentro del ciclo, implementación ni reset del contador**.

## Identidad y alcance

- Intento: **2 de 2, final**, mismo auditor y sesión del intento1.
- Auditor independiente: `/root/f4b_auditor`, configuración asignada explícitamente **GPT-6.1 Sol / high** (`gpt-6.1-sol`, `high`); distinto del autor/corrector Sol/high.
- Snapshot: `84e983abe3650b54f30a1e4367711ce8cd340225`.
- Tree comprobado: `564d20ab045f8750462182b705113e021cb0e8a5`.
- Base técnica: `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773`.
- Captura documental F4A adicional: `01ec8f879197b7dd21aa3344726fb0731477c127`. No se presume cierre de producción final.
- R1: snapshot `d45c76e1da40b0465022f455b9edf7efba2785db`, tree `a445586d013c0843e4f03a729bfc17ade9b32c85`, **FAIL 1/2**. Informe original16614bytes, SHA-256 `636ebb6a670782ecd95d7e5bec47b0ee060e7e95137e595cf147d2538c898e5b`.
- Worktree propio actualizado limpio en **DETACHED**: `/workspace/ctpv-f4b-auditoria`. Worktree autor sin modificaciones por el auditor.

Se revisó la resolución B1–B4 y la ausencia de contradicciones nuevas en el delta documental R1→R2. El delta contiene únicamente cuatro documentos: SDD F4B modificada, copia literal del informeR1, correcciónR1 y fixtures de negociación. No hay cambios de producto. Esta revisión no reabre observaciones opcionales ni cuenta como un ciclo nuevo.

No se ejecutaron builds, instalaciones, tests del producto, SDK, herramientas MCP, llamadas al sitio, preview, despliegues ni mutaciones externas. No se crearon subagentes, sesiones, main, push, PR o issues. Las comprobaciones son lecturas de Git/fuentes y verificaciones estáticas de datos documentales.

## Fuentes y comprobaciones

Se conserva la lectura de AGENTS, plan/método SDD, contratos F3/F4A y seguimientoD33, cierres técnicos, preparaciónF4B y primarias fijadas del intentoR1. Para R2 se leyeron íntegramente el diff de SDD, `evidencia/f4b/correccion-sdd-r1.md`, `contratos/version-negotiation.json` y copia literalR1. Los ocho originales con archivo del manifest primario continúan coincidiendo en bytes y SHA-256. El informeR1 incorporado coincide exactamente con el original externo, incluido su hash.

Se reutilizó en lectura el tarball oficial server2.3.1 del intentoR1, integritySHA512 coincidente,1537977bytes, SHA-256 `96bc3fe00cbc9a72093a3f91c531387a5f988ea34d09e6c34a9a6b77dd0dc518`, extraído en `/tmp/f4b-auditor-sdk231/package`. Se inspeccionaron exports, export real del validador, codec2026 y metadata validation. No se ejecutó el paquete.

Primarias determinantes para B5:

1. `docs/agent-readiness/evidencia/f4b/referencias/mcp-basic.txt`, sección **Per-request protocol fields**, líneas369–387. Manifest SHA-256 `67a62de95bdc816ff96e8d5c69b0fc19237191f42805846e2ec8f8d7063e123e`,24001bytes. Tabla `clientInfo Required: No`; la recomendación es SHOULD, con excepción explícita por configuración del cliente.
2. `docs/agent-readiness/preparacion/f4b/fuentes/sdk-schema.txt`, definición primaria `RequestMetaObject`: `"io.modelcontextprotocol/clientInfo"?: Implementation`.
3. SDK oficial2.3.1, `dist/src-Cqbh3MYc.mjs`: esquema2026 usa `ImplementationSchema.optional()`; líneas4007–4014 aclaran expresamente que clientInfo no es required y que su ausencia se acepta. `REQUIRED_ENVELOPE_KEYS` contiene únicamente protocolVersion y clientCapabilities; `validateEnvelopeMeta` no impone clientInfo.

## Resultado de B1–B4

| BloqueanteR1 | ResultadoR2 | Comprobación |
|---|---|---|
| B1 — import SDK no exportado | **PASS documental** | SDD§3 línea43 fija `@modelcontextprotocol/server/validators/cf-worker`. La key pública existe y su target exporta realmente CfWorkerJsonSchemaValidator. No cambia SDK/proveedor/fromJsonSchema. |
| B2 — nombre card inválido | **PASS documental** | Identidad común fijada `cuidatuperroviejo.com/guias-herramientas` en SDD§3 línea47; cumple patrón namespace/server del schema archivado, longitud40 dentro3..200. Card/registro derivan la misma identidad; no se inventa otro schema ni se elimina validación. |
| B3 — lecturas antes de cap2 | **PASS documental** | SDD§5 línea103 obliga slot antes de cualquier lectura/parser; rechazo headers/path previo sólo cuando decidible sin body. Tres slow bodies permiten exactamente dos readers, tercero429 sin lectura. Malformed se decide dentro de slot y retención residual preserva cap. Exige pruebas de recuperación/composición posteriores. |
| B4 — requested omitido | **PASS en el objeto original; B5 nuevo separado** | SDD§5 línea90 conserva ambos campos requeridos de -32022; versión acotada10ASCII YYYY-MM-DD; fixtures completas para1900-01-01 y no-version, con header/body/status/error. Ya no se elimina requested ni se refleja excepción arbitraria. La ampliación de§3 introdujo la exigencia incorrecta de clientInfo descrita debajo. |

Estos PASS documentales no acreditan bundle/startup, cliente, workerd, concurrencia/cancelación de red, preview, receipt ni implementación.

## B5 — El delta exige clientInfo, opcional en el protocolo y SDK fijados

**FAIL — C03/C07; afecta interoperabilidad del contrato moderno.** SDD§3, línea57, incorpora esta regla nueva:

> La presencia de `params._meta["io.modelcontextprotocol/protocolVersion"]` selecciona el contrato por petición y exige clientInfo/clientCapabilities modernos, aunque la fecha pedida sea anterior.

Las fuentes primarias y SDK fijados hacen **clientInfo opcional**. Su omisión es un comportamiento permitido y expresamente contemplado, no una metadata inválida. El mismo párrafo de SDD sigue diciendo «conforme schema», pero la exigencia nueva de clientInfo contradice ese schema. El implementador no puede cumplir ambas reglas literalmente sin inventar qué instrucción ignorar.

Reproducción documental completa de una petición moderna válida que el contrato nuevo obligaría a rechazar por ausencia de clientInfo:

```http
POST /api/mcp
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: server/discover
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

Host/origin/path, cuotas, body y demás límites se suponen válidos. **Esperado por protocolo/SDK:** procesar discover; no rechazar porque falte clientInfo. **Exigido por la frase nueva de SDD:** requerir ese campo, por lo que la misma petición no puede pasar. Las dos fixtures añadidas contienen clientInfo y no cubren esta divergencia; su existencia no demuestra que el campo sea obligatorio.

Una metadata clientInfo presente pero malformed sí requiere validación; no se objeta eso. El bloqueante es convertir en requisito de admisión la presencia de un campo que la revisión actual permite omitir. Tampoco se objeta la exigencia de clientCapabilities, que sí es obligatoria. Se trata de una incompatibilidad normativa concreta añadida por el deltaB4, no de una preferencia opcional ni una petición de features adicionales.

**Criterio de bloqueo:** el contrato moderno no puede implementarse con conformidad al schema fijado y a la frase literal simultáneamente. Debe detenerse el alcance dependiente; el auditor no corrige la SDD, no interpreta silenciosamente “exige” como “si se incluye” y no inicia una nueva vuelta.

## Resto del delta y observaciones separadas

- Base, fuentes, versiones SDK/protocolo, paridadF3/F4A/D33, ownership, sesiones y limitaciónlegacy, caps/quotas/deadline, discovery, gates de F4A real, CI/workerd/preview/receipts y promoción/rollback no fueron modificados por el delta. Conservan las evaluaciones documentalesR1, con B1–B4 resueltos como se indica y el nuevo FAIL de interoperabilidadB5.
- La proyección legacy de outputSchema sigue como observación **no bloqueante**. No se convirtió en una exigencia de wire idéntico ni abrió un ciclo opcional.
- Las fixtures son contrato documental etiquetado como no ejecutado; no se presentan como evidencia de servidor funcionando. El cierreF4A final permanece gate de integración/publicación; la autorización de desarrollar en paralelo no lo elimina.
- No se verificó externamente el issue#89 ni se mutó. Su referencia y la declaración del autor no sustituyen la evidencia primaria estática usada para el dictamen.

## Disposición final y contador

**R1/2 FAIL → único ciclo documental → R2/2 FAIL. Contador agotado. STOP.** No PASS, ratificación, congelado, implementación ni promoción derivados de esta auditoría. No tercera revisión, nuevas correcciones dentro de este ciclo, nueva sesión para resetear ni tareas de producto para eludir el bloqueo.

Entregar este informe literalmente a coordinación junto con el estado detenido y B5. Cualquier decisión futura que modifique el proceso agotado pertenece al propietario/coordinación y no está autorizada por este auditor ni por este dictamen. El informe externo se conserva en `/workspace/f4b-auditoria-sdd-r2.md`; el worktree del snapshot permanece limpio.
