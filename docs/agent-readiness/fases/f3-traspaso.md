# F3 — Partición y contratos de lanzamiento

Estado: **propuesta de issues**, no issues creados ni instrucciones para programar ya. [SDD](f3-api-y-descubrimiento.md) y [contratos](f3-contratos.md) completos requieren PASS independiente y ratificación técnica del coordinador. Este archivo fija la partición para que, después de ese gate, el coordinador publique encargos con datos de admisión reales.

## 1. Cadena y bases

```text
SDD auditada (≤2 revisiones, mismo auditor) → ratificación coordinador/SHA fijo
→ F3A (Luna6/high; auditor Sol/high ≤5) → cierre A/SHA fijo
→ F3B (Luna6/high; auditor Sol/high ≤5) → cierre B/SHA fijo
→ F3C (Luna6/high; auditor Sol/high ≤5) → cierre C/SHA fijo
→ promoción propuesta concreta → autorización propietario → main → P3-01–03
```

No lanzar B/C sobre una rama móvil o SHA anterior a aceptación. No crear en paralelo ni resetear auditor por issue. El coordinador registra antes de abrir cada issue: SHA/tree completos de base, links permanentes a SDD/contratos/ratificación en ese SHA, dependencias cerradas, rama de trabajo y destino de PR draft. Campos sin datos reales significan issue **no lanzable**; nunca placeholders publicados como base ejecutable.

Ramas propuestas fijas: A `agent-ready/f3-a` desde SHA SDD ratificado; B `agent-ready/f3-b` desde cierre A; C `agent-ready/f3-c` desde cierre B. Destinos draft respectivamente `agent-ready/f3-sdd`, `agent-ready/f3-a`, `agent-ready/f3-b`. Integración secuencial por coordinador en la cadena; ninguna rama es main. Si se cambia la estructura de ramas, coordinador fija equivalencia/base/ownership antes de abrir issue, sin alteración de contratos ni dependencia aceptada. El SHA final ratificado puede incluir informe+ratificación posteriores al snapshot auditado; ratificación declara que el delta es exclusivamente esos documentos, y no afirma igualdad de build por ello.

## 2. F3A — Generar contratos y assets desde F2

Título propuesto: `F3A: generar índice íntegro de búsqueda y contratos públicos de contenido`.

Problema/resultado: convertir los bytes públicos F2 aceptados en soporte de búsqueda/links completo y artifacts de discovery válidos del mismo build, antes de exponer la API.

Ownership: `scripts/agent-readiness/agent-api.mjs`, `src/agent-api/{capabilities.json,schema.json,openapi.template.json}`, `src/agent-skills/buscar-leer-citar/SKILL.md`, `tests/agent-readiness/f3-generation.test.mjs`, `f3-contracts.test.mjs`, fixtures bajo `tests/agent-readiness/fixtures/f3/`, evidencia `evidencia/f3/a/`; cambios acotados `astro.config.mjs` (hook posterior a proyección), package/lock (4 devDependencies existentes directas), `.github/workflows/ci.yml` (checks F3 offline/build). No editar proyección/checker F2. Namespace de soporte F3 `/agent-api/v1/query-index.json` evita el orphan detector exclusivo de `agent-content/v1`.

Materializar §4–5 de contratos y anexos: query-index, OpenAPI, Linkset,2manifests ARD, índice skills y artifact. Hook genera todos y manifiesto técnico de evidencia offline; no agrega Link/llms todavía. Los paths del runtime quedan reservados, no se fabrica response con API aún inexistente. Los descriptors A son assets preparados en rama/preview propia, **no capacidad publicada en producción**; el conjunto sólo se anuncia/integrará como fase completa después de B/C.

Aceptación específica: C3-02/03/04, partes generación de C3-10/11. Índice/documentos F2 comparados completos; búsqueda fixture >4000 char y enlaces GFM; schema/query/ARD válidos, closed-shape/invariantes comprobadas;2 builds deterministas; fails por límite/colisión/corpus/digest/missing/unresolved/ref/huérfano. CI existente conservado y `agent-api.mjs check` read-only. Pruebas que afirman API funcional esperan B, no se marcan PASS por generar JSON.

Entrega: draftPR, base/head/tree/ownership, evidencia/schemas/artifacts bytes/hash, tests/build/CI/dry-run, sin deploy/main ni scans. Auditor independiente Sol/high mismo≤5; aceptar sólo A y emitir cierre con SHA base B concreto. Rollback A: revertir hook/deps/checks/artefactos nuevos propios en rama, preservando F2/F1/evidencia.

## 3. F3B — Servir catálogo, búsqueda y lectura en Worker

Título propuesto: `F3B: servir API v1 de catálogo, búsqueda íntegra y lectura por ID`.

Dependencia: A aceptada/ratificada con SHA completo en issue. Ownership: `src/lib/agent-api/runtime.ts` y módulos propios auxiliares, `src/worker.ts` composición limitada, `tests/agent-readiness/f3-runtime.test.ts`, nuevas fixtures específicas B bajo ruta F3, evidencia `evidencia/f3/b/`. Si falta CI invocation TS, ajuste exclusivamente del paso nuevo por coordinador/ownership del issue declarado antes de lanzamiento. No tocar métodos/negociación/cache F2, corpus editorial o asistente; sólo usar exports existentes de índice.

Contrato: §1–4 completan tres endpoints GET/HEAD/OPTIONS, validación UTF-8/query/ID, errors/headers exactos, paginación/guard/ranking, Markdown íntegro+metadata+links, ASSETS-only con límites/hash/schema. No ETag API ni CORS fuera de ella; no leer/docs en origen arbitrario, prompt execution o proxies.

Aceptación específica: C3-05/06/07/08/10/11 en unitarios/workerd del build real. Todos IDs recuperables byteexactos, no sólo home; límites inclusivos/+1, Unicode/AND/ranking/tie/noresult/offset, corpus409, paths/query desconocidos/duplicates/invalidUTF8/encodedID/method, índices/missing/hash/bytes503, HEAD parity/error/OPTIONS/noauth/nofetch; fixtures de final>4000 chars. Workerd compilado exacto y sin remote bindings. No llama `/api/ask` ni componentes con efecto para verificar invariantes.

Entrega: draftPR, SHA/tree, resultados/requests sanitizer, manifest del build, CI/dry-run y preview receipt si disponible; ninguna prueba local acredita acceso público. Auditor independiente Sol/high mismo≤5, cierreBexacto para C. Rollback B preserva A/F2; quita dispatch F3 y runtime junto con tests específicos propios, manteniendo evidencia.

## 4. F3C — Conectar discovery y aceptar la fase en preview

Título propuesto: `F3C: conectar discovery RFC 9727, skills y ARD y verificar recorrido público`.

Dependencia: B aceptada con SHA completo. Ownership: `public/_headers`, `src/middleware.ts`, `src/lib/agent-content/runtime.ts` **solamente valores/composición Link**, cambios acotados `scripts/agent-readiness/discovery.mjs`, `agent-api.mjs` (Link/llms/check), `src/agent-api/capabilities.json` sólo referencia discovery si falta, testsF3 headers/discovery, actualización CI estrictamente F3, evidencia `evidencia/f3/c/`. No corregir runtime B/proyección con cambios ajenos a issue; fallo de B se informa para determinar presupuesto/origen antes de modificar.

Implementar §6 contratos: Link exacto preservando F1, MIME/no-store/CORS sólo assetsF3, llms prefijoF1byteexacto+sección final generada una vez y checks actuales evolucionados de forma explícita. Conjunto de destinos generado y funcional antes de anunciarlo; catálogo RFC 9727GET/HEAD con Link,9 operacionesOpenAPI, skillsartifact/digest, ARD actual+compatibilidad misma entries. No HTML head ni robots/DNS nuevos.

Aceptación específica: C3-04/06/07/08/09/10/11 sobre preview **del SHA final real**, con recibo independiente. Recorrido1 catalogue/OpenAPI→search cushing→readIDreal/corpus→canónica/source; recorrido2 skillsindex/digest/artifact→search artrosis→read; todos linksdescriptor reales200sinredirect y skillbytes/hash, todas lecturas F2 originales del build, matrices acotadas de errors/HEAD/CORS, headershomeHTML/MD y catalogueHEAD, F1política/sitemap/redirects/asistente conservados. No repetir scansF2: producción/scans son P3gates posteriores. Si preview/receipt no existe o faltan originales esenciales, bug/STOP, no simularla con localhost.

Entrega: PRdraft/SHA/tree/buildmanifest/preview receipt, todos criteriosfase y gaps explícitos, pruebas/CI, promoción propuesta concreta y rollback. AuditorSol/high mismo≤5 independiente. PASS+coordinador permite aceptación técnica de F3 y propuesta de promoción, **no merge ni deploy autorizado**.

Rollback C restaura discoveryF1/headers/llms en rama; rollback fase conjunto C→B→A después de autorización separada si publicado. Conservar toda evidencia y política.

## 5. Prompts normativos para publicar después del gate

El coordinador genera cada issue con el contenido específico anterior y esta cabecera, sustituyendo únicamente datos reales de admisión:

```text
Rol: implementador F3[A|B|C]. Modelo: gpt-6-luna, razonamiento high.
Repo Gunz-cop/CuidaTuPerroViejo. Lee AGENTS.md y programa agent-readiness.
Spec auditada y ratificada: links permanentes al paquete F3 en SHA documental completo.
Base exacta: SHA y tree completos; dependencia aceptada y cierre enlazados.
Rama propia y destino de PR draft: los fijados en este issue; nunca main.
Ownership, contratos, criterios, comandos y rollback: contenido específico de este issue
más f3-api-y-descubrimiento.md, f3-contratos.md y anexos normativos en esa base.
No implementar fuera de scope ni rellenar huecos esenciales; bug SDD/STOP inmediato.
Auditor Sol/high independiente y distinto del autor/corrector: sesión fija indicada;
máximo 5revisiones totales por issue, incluida primera; quinta FAIL→bug/STOP sin sexta.
Entrega SHA/tree/CI/build real/preview receipt/evidencia/PRdraft antes de auditoría.
No deploy, main, calls con efectos, scansF2, auth/comercio/MCP/calculadoras ni AssistantV2.
```

Prompt auditor de implementación: verificar **sólo bloqueantes** del issue sobre SHA/tree fija y base/dependencias exactas; inspeccionar ownership y criterios/evidencia, ejecutar pruebas pertinentes sin mutaciones externas; informe separado intentoN/5 por criterio/PASS–FAIL/limitaciones, no corregir producto o contrato ni contar observaciones opcionales como FAIL. Repeticiones mantienen mismo auditor/contador. La entrega y el informe son distintos archivos/roles.

Prompt auditor de SDD: Sol/high distinto del autor; sobre snapshotSHA/tree del paquete, verificar coherencia/base/alcance/contratos/errores/límites/sources/ownership/dependencias/aceptación/publicación/rollback/STOP, **sólo bloqueantes**. Máximo2revisiones totales mismo auditor, primera+un ciclo documental; no escribir implementación/corregir SDD. Informe bajo `evidencia/f3/auditoria/auditoria-sdd-rN.md`, con SHA/tree/contador/criterios/resultado/fuentes/limitaciones. PASS permite ratificación coordinador; no crea issues o deploy por sí mismo.
