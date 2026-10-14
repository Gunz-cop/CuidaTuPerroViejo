# Admisión prospectiva del fixture — bugs104/105

Después de revisar el STOP105 y la propuesta exacta de agregar `.well-known/mcp/server-card.json` a `DESTINATIONS` de `tests/agent-readiness/f3-discovery.test.mjs`, el propietario respondió literalmente: **«Ok, autorizo»**.

Coordinación precisó la autorización vigente: admitir ese archivo sólo para agregar esa entrada literal al fixture, conservar todos los oráculos/assertions/rechazos, aplicar el parche concreto y continuar los gates del correctivo con el mismo autor y auditor GPT-6.1 Sol/high. No se autoriza main, merge, producción ni scans.

Esta admisión amplía prospectivamente el ownership del contrato R1 únicamente en ese fixture. No modifica el texto auditado `d09d630`, el informe R1/5 PASS, el STOP105 `d272940` ni los tres FAIL offline originales de `55dc4e7`. No hay revisión de adenda separada ni reset: siguiente dictamen del mismo auditor **R2/5**, máximo cinco total incluido contrato.

Luego de aplicar una línea se retoman suite afectada, gates locales pendientes, manifest/diff completo contra el build base `b2ab108`, HTTP real local, rollback específico y CI/CommitPreview con smoke SDK real acotado. Los resultados y receipts deben conservar su SHA/tree propio. La autorización de continuar no acredita PASS ni permite extrapolar autorizaciones anteriores de promoción. Cualquier nuevo bloqueo se registra según las reglas vigentes.
