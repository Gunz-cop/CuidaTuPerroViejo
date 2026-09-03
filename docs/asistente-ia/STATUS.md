# STATUS — Rediseño del asistente IA

- **Estado actual:** **Foundation completada.** Contratos TypeScript, configuración pendiente del bake-off, schemas editoriales, ownership y plan de implementación verificados; no se modificó el flujo de producción.
- **Fase actual:** Foundation de Assistant V2 (completada).
- **Última actualización:** 2026-08-17

## Trabajo completado
1. **Auditoría** del sistema actual con evidencia por línea (`CURRENT-SYSTEM-AUDIT.md`): confirmados todos los problemas del encargo + 2 hallazgos nuevos (emergencia con recomendación incoherente de Qwen y llamada innecesaria; fallo del reranker que desecha una generación válida).
2. **Investigación Cloudflare** con documentación oficial (AI Search, Vectorize, AI Gateway, Workers AI modelos/precios) — referencias en `ARCHITECTURE-OPTIONS.md` y `PROGRESS.md`.
3. **Comparación de 3 alternativas** (`ARCHITECTURE-OPTIONS.md`) y **recomendación**: índice de routing estático generado en build + decisión determinista + generación desacoplada vía AI Gateway (`RECOMMENDED-ARCHITECTURE.md`).
4. **Bake-off reproducible** (`MODEL-EVALUATION.md`), **plan de evaluación de 170 casos y métricas** (`EVALUATION-PLAN.md`), **migración en 8 fases con rollback** (`MIGRATION-PLAN.md`), **registro de riesgos** (`RISKS.md`) y **6 ADRs** (`ADR/`).
5. **Contratos V2** en `src/lib/assistant/v2/`: tipos de dominio, seams `normalize → triage → retrieve → decide → generate → validate → buildFallback`, triage asíncrono con representación semántica reutilizable y telemetría sin texto de consulta.
6. **Configuración V2** con HMAC-SHA-256, formato versionado de entradas del índice, juegos de umbrales híbrido/lexical-only separados, reranker opcional y valores de bake-off pendientes; no se fijaron `T_alto`, `T_bajo`, `M` ni `R_min`.
7. **Schemas editoriales** para intents, topics y safety en `src/content/assistant/config.ts`, con fuentes aprobadas y estado de revisión explícito.
8. **Ownership y plan de implementación** en `FILE-OWNERSHIP.md` e `IMPLEMENTATION-PLAN.md`; se prohíbe editar en paralelo los mismos archivos.
9. **Pruebas contractuales** sin modelos ni servicios externos: válidos, campos obligatorios, separación decisión/generación, fallback sin slugs y JSON V1 separado del adaptador futuro.
10. **Corrección puntual** de schemas: authority permitido, HTTPS, urgency enumerada, riskTags no vacíos y válidos, arrays obligatorios no vacíos y `articleHref` local seguro.

## Próxima acción
Revisión humana de las decisiones pendientes. Ya pueden comenzar, en el orden documentado, las sesiones de Editorial intents/topics/safety y Evaluation dataset/harness; el bake-off queda bloqueado hasta congelar el dataset y autorizar llamadas externas.

## Bloqueos
Ninguno.

## Decisiones pendientes (requieren aprobación humana)
1. Aprobar la Opción C (índice estático) frente a AI Search/Vectorize — ADR-001.
2. Aprobar que el LLM no seleccione artículos (decisión determinista por umbrales) — ADR-002.
3. Lista definitiva de fuentes veterinarias autorizadas y de temas externos — ADR-003.
4. Ejecutar el bake-off y ratificar la pareja primario/fallback de generación — ADR-004.
5. Activar o no la caché KV en el primer despliegue (es opcional) — ADR-005.
6. Presupuestos de latencia y niveles de degradación — ADR-006.
7. Cambio de frontend en degradación (mostrar orientación genérica en vez de ocultar el panel).

## Avance documental aproximado
**Foundation: 100 %.** Retrieval, generación, integración API/frontend y despliegue: 0 % (fuera del alcance por instrucción explícita).

## Verificación de Foundation

- Verificación histórica: `npm run build`: **OK** (en ese momento incluía el `postbuild` preexistente, eliminado posteriormente durante la migración).
- `npx tsc --noEmit`: **OK**.
- `npx tsx tests/assistant-v2/contracts.test.ts`: **OK**.
- `npm run check`: **no ejecutable** porque `package.json` preexistente no define el script `check`; no se modificó `package.json` ni se instalaron dependencias para ocultar el problema.
- Producción/v1: sin modificaciones en `/api/ask`, `/asistente-ia.astro` ni `src/lib/assistant/*.ts`.
