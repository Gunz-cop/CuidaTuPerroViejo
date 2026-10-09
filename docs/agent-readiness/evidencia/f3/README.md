# Evidencia y documentos F3

Estado2026-10-09: autoría documental en rama `agent-ready/f3-sdd`, base67dacfec405935567f71b403cd80a56f5aebe952/tree d024a161e85b32c1cc783e1db9886c7ffa1e6d76. Pendiente de auditoría independiente y ratificación técnica. Este paquete no prueba producto F3 implementado, preview/deploy, PASS propio ni score nuevo.

- [Decisiones](decisiones.md) y [fuentes primarias/manifest](referencias/README.md).
- [Schemas/OpenAPI y artifacts normativos](contratos/README.md).
- [SDD](../../fases/f3-api-y-descubrimiento.md), [contratos](../../fases/f3-contratos.md), [partición y prompts](../../fases/f3-traspaso.md).

Los informes de SDD los escribe el auditor independiente en `auditoria/`; ratificación posterior identifica su PASS, snapshot y SHA final del paquete. Las futuras carpetas a/b/c/publicacion guardan entregas y resultados reales, con informes independientes en su ownership. No se crean resultados vacíos para aparentar gates hechos. F2 cierre/histórico permanece intacto; no se repitieron sus pruebas ni scans durante esta autoría.

Verificación documental de autoría: parse JSON/referencias locales/diff-only y manifests de fuentes, sin autoauditoría formal ni pruebas del producto. Originals HTML completos fuera de repo según manifest; extractos publicados declarados separadamente. La ausencia de schema remoto skills se registra sin fingir validación; RFC primario define URI opaco y campos suficientes.
