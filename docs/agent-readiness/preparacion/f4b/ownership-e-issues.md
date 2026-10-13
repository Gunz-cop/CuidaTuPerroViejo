# Ownership, issues y orden propuestos

**Propuesta no ratificada. No son issues creados ni encargos lanzables.** Ninguna sesión programadora/auditora se inició durante esta preparación. No se presupone el ownership final de F4A ni se fija una base futura.

## 1. Ownership actual

Sesión de arquitectura, worktree `/workspace/ctpv-f4b-preparacion`, rama `preparacion/f4b-mcp-remoto`, base documental F3 `eff4ce13a1f4b996f3d9b523799012bc668da318`.

Único path de autoría: **`docs/agent-readiness/preparacion/f4b/`**. El repo se leyó desde una copia aislada; no se inspeccionó/modificó el worktree F4A. Se consultaron fuentes públicas en lectura, sin publicar mensajes/issues ni tocar producto, routing, OpenAPI, ARD, skills, configuración, deps o archivos compartidos. Sin builds/tests del producto ni promoción.

## 2. Secuencia posterior al cierre F4A

```text
F4A aceptada y cierre/contratos reales entregados
→ completar dependencias y resolver G01–G04
→ anexos exactos + SDD F4B final en snapshot fijo
→ auditoría formal independiente del autor
→ ratificación/congelado por coordinador
→ admisión concreta de cada issue (base/tree/ownership)
→ adaptación/paridad → transporte/defensas → discovery/aceptación preview
→ entrega aceptada → propuesta concreta de promoción
→ autorización aplicable → producción/medición final
```

Sin implementación simultánea con F4A. Las fases de implementación internas F4B se integran en serie y entregan cierre exacto para su sucesora; no se inventan SHAs ni ramas. Criterios y archivos compartidos se asignan una vez, no se distribuyen por conveniencia entre sesiones concurrentes.

## 3. Propuesta de responsables y fronteras

| Responsable posterior | Ownership propuesto (debe ratificarse) | Frontera |
|---|---|---|
| Arquitectura/coordinación | SDD/anexos definitivos y admisión, cierre exacto, decisiones de gaps y control de archivos compartidos | No rellenar contracts F4A ni auditar su propio trabajo como independiente |
| Adaptador de herramientas | `src/lib/agent-mcp/` previsto por plan; schemas/adaptación internos y tests/evidencia específicos que se enumeren al congelar | Consume dominio F4A/F3; sin cambios UI/metodología/runtime F3 por defecto |
| Integrador transporte/plataforma | Mismo namespace MCP y cambios necesarios de `src/worker.ts`, `wrangler.jsonc`, deps/lock/tipos y CI, **uno por vez** | Dispatch exacto, defensas y budgets; no apropiarse bindings ASK/admin/SESSION/contacto |
| Integrador discovery | Registro real aceptado (en F3 `src/agent-api/capabilities.json`), generación/card; ajustes mínimos en generadores/Link/llms/headers reales después de F4A | Paths nuevos, schemas/entries y alcance de OpenAPI/ARD se fijan después; no overwrite del registro F4A |
| Auditor formal independiente | Informe separado sobre SHA/tree fija; permisos de escritura sólo a su informe acordado | Verifica bloqueantes y evidencia, no corrige producto ni SDD |
| Operación/propietario | Plan/cuotas, políticas de borde, recibos, presupuesto y admisión de publicación/rollback | No permisos implícitos para auth/DNS/administración o cambios de reglas de otros endpoints |

`src/lib/agent-mcp/` es path **previsto en el plan**, no un módulo existente ni autorización actual. Los tests/evidencia propios y artifacts de card no tienen todavía filenames de producto acordados. No se generan nombres de ruta/función por adelantado.

Archivos compartidos candidatos conocidos en la base: entrypoint/config/deps/lock/CI; `scripts/agent-readiness/agent-api.mjs`, `scripts/agent-readiness/discovery.mjs`, `src/middleware.ts`, `public/_headers` y composición Link en `src/lib/agent-content/runtime.ts`. Su estado/owner puede cambiar con F4A. Antes de admitirlos: cotejar diff final F4A, fijar cambios mínimos y owner único, y liberar explícitamente su uso en serie. No asumir que todos necesiten cambios ni autorizar refactors para simplificar MCP.

Si la integración requiere extraer funciones F3 o cambiar dominio F4A, abrir decisión/issue específico de contrato y ownership **antes** de tocarlo; no esconderlo dentro del transporte. Preferir reutilización del contrato aceptado sin alterar su algoritmo.

## 4. Backlog propuesto, sin números de issue

| Trabajo | Entrada obligatoria | Resultado | Criterios principales |
|---|---|---|---|
| Completar SDD y admisión F4B | D01–D10, fuentes/card resueltas y G03/G04 acotados | Anexos finales, límites/schemas/rutas/versiones/owners exactos; auditoría independiente y congelado | C4B-01; checklist completo |
| Adaptar herramientas aceptadas a MCP | SDD congelada; base F4A real; reutilización definida | Búsqueda/lectura/cálculos sin segundo algoritmo, listado/schema/error mapping y paridad | C4B-05/06/07/08; D02–D07 |
| Integrar Streamable HTTP y defensas | Adaptación aceptada, versiones/imports fijados, presupuesto/plataforma | Moderno+legacy objetivo, dispatch/routing, Origin/CORS/no-store, caps/abuso/cancelación/aislamiento | C4B-02/03/04/09/10/11/14 |
| Generar card y completar discovery/preview | Transporte aceptado, G02 resuelto, registro F4A real | Artifact/schema válidos y correspondencia runtime, preservación F3/F4A, recorrido remoto del SHA final | C4B-12/13 y todas verificaciones de preview de fase |
| Aceptar/promover/medir por separado | Entrega/CI/receipt/auditoría y propuesta revisables, autorización aplicable | Publicación real y comparaciones funcionales/escáner atribuibles | P4B-01/02/03 |

El primer trabajo es **documental**; no se crea ahora un spike o issue de implementación para suplir F4A. La compatibilidad workerd se valida cuando exista un encargo ratificado, al comienzo del transporte y antes de discovery. Si resulta que G03 requiere experimento previo al congelado definitivo, el coordinador debe autorizar un encargo explícito aislado posterior a F4A, con scope/evidencia/STOP; esta preparación no lo lanza.

Un control de transporte puede empezar con herramientas mínimas ya adaptadas en la base aceptada, pero no publicar la card ni anunciar capacidades hasta que las llamadas/paridad estén verificadas. Cada entrega identifica lo aceptado y lo no verificado; aceptación parcial no equivale a F4B terminada.

## 5. Admisión y revisión

Antes de convertir cada propuesta en issue: título/problema/resultado, dependencias cerradas, links permanentes a contrato ratificado, SHA/tree completos de base, rama propia/destino draft real sin main, ownership enumerado, criterios con oracle, comandos CI/runtime/preview reales, budgets y rollback. Si falta un valor esencial, issue no lanzable; no publicar placeholders como datos de base.

Auditoría formal de SDD **después** de incorporar F4A. Propuesta de proceso coherente con traspaso F3: auditor independiente Sol/high, snapshot fijo y hasta2revisiones de SDD; ratificación del coordinador sobre paquete final. Implementación posterior sigue método del programa: auditor distinto del autor, máximo5revisiones por issue y mismo contador; quinto FAIL→bug/STOP. El coordinador fijará sesiones/modelos/contadores en el encargo futuro; no se transfieren ni reinician los contadores F3/F4A, no se elige Astra y esta preparación no lanza programadores.

Roles propuestos no son personas asignadas ni mensajes enviados. No se confunde autoevaluación documental de esta entrega con auditoría formal, ni una autorización histórica F3 con permiso de programar/promover F4B.
