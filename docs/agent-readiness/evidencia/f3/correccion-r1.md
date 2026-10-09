# F3 — Único ciclo de corrección documental tras R1

Autor: coordinador arquitectónico, GPT-6.1 Sol/high. Fecha:2026-10-09. Estado: **corrección entregada, pendiente de R2 por el mismo auditor independiente**; no dictamen propio PASS ni ratificación. La revisión R2 consume el último intento de SDD; FAIL2→STOP sin otras correcciones ni tercera revisión.

R1 snapshot `e8498091d8e285dc41576fc00228541efc1bd65b`, tree `0c97d664d831da29deade1b538a49c462bcd7903`. Base de este ciclo tras archivo del informe: `fbebb78f6788af1a4e97e2e6ac679e060ceb6af5`. [Informe R1 intocable](auditoria/sdd-r1.md), SHA256 `6de72f50760407c85ae6fd851c18d57b15f2058743ac418c4cd082a10950f21d`. Lista cerrada de corrección: exclusivamente B3-SDD-01 y B3-SDD-02.

## B3-SDD-01 — Etapas de validación de q coherentes

[Contratos §2](../../fases/f3-contratos.md) distinguen las reglas sobre query raw y q decodificada de las reglas de longitud posteriores a NFC/trim. q decodificada no tiene límite200/800 propio; conserva tipo, UTF-8 estricto, ausencia de C0/DEL y reglas generales de query. El límite1..200 codepoints/800 bytes se aplica sólo a q normalizada. No se amplía búsqueda, corpus, tokens ni presupuesto raw2048 bytes.

[OpenAPI](contratos/openapi.json) ajusta únicamente q de GET/HEAD search: retira minLength/maxLength del schema del valor decodificado, mantiene type:string y describe ambas etapas semánticas. La descripción explicita que JSON Schema no realiza NFC/trim, evitando que un cliente rechace antes de normalizar una entrada permitida. El schema compartido de respuestas no define input q y no necesita cambio. [README de anexos](contratos/README.md) registra esa frontera.

[Evidencia documental exacta](contratos/q-normalizacion-casos.json) y [ejemplos](contratos/ejemplos.md) contienen cuatro entradas completas con query serializada, string decodificado/normalizado, métricas y resultado exigido para GET/HEAD:

| Caso | Raw bytes | Codepoints decodificados→normalizados | Bytes normalizados | Resultado |
|---|---:|---|---:|---|
| Padding positivo |209|207→7|7|200|
| Padding negativo |409|407→207|207|400 INVALID_REQUEST|
| NFC positivo |1384|397→200|397|200|
| NFC negativo |1391|399→201|399|400 INVALID_REQUEST|

NFC usa secuencias e+U+0301, separadas en grupos que no exceden64 codepoints por token; el negativo cambia47 a48 en el último grupo y falla exclusivamente por201 codepoints normalizados. Los ejemplos no son HTTP observado ni pruebas del runtime. Cálculos Unicode/form-url-encoding documentales confirman las métricas; OpenAPI qGET/qHEAD sólo tiene type:string, las restricciones normalizadas están expresas en descripción/texto.

## B3-SDD-02 — Ownership acotado de la prueba Link compartida

[SDD §5](../../fases/f3-api-y-descubrimiento.md), [contratos §6](../../fases/f3-contratos.md) y [traspaso F3C](../../fases/f3-traspaso.md) autorizan explícitamente al implementador C a modificar `tests/agent-readiness/negotiation.test.ts` **únicamente para adaptar expectativas Link** al conjunto F3 exacto, incluido el valor F1. El coordinador conserva la propiedad de integración del archivo compartido.

Todas las aserciones restantes de negociación/Accept, status/cuerpos, otros headers, ETag/condicionales/HEAD/304, verificadores y ejecución del archivo en CI se conservan. No eliminar/omitir pruebas ni relajar checks, modificar comportamiento F2, reabrir su aceptación o repetir matrices/scans. El archivo real de tests no se modificó en esta entrega documental.

## Archivos y comprobaciones mecánicas

Modificados sólo los tres documentos de fases F3, OpenAPI, README de anexos y ejemplos; añadidos únicamente los casos q y este registro. Informe R1, fuentes primarias, schemas de respuestas y demás artifacts permanecen intactos. No runtime, nuevos requisitos, implementación, issues, build, workerd, scans, deploy, main ni commit de este autor.

Comprobaciones de autoría: JSON parse, longitudes/bytes/form encoding de casos, igualdad de schema qGET/qHEAD/type:string, referencias locales, diff documental/ownership y `git diff --check`; hash informe R1 conservado. Son comprobaciones mecánicas del material corregido, no una auditoría formal ni sustituyen el dictamen R2. El coordinador raíz congela el siguiente SHA/tree antes de entregar al mismo auditor.
