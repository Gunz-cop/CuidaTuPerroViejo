# Auditoría independiente de SDD F3 — R2 final

**Dictamen: PASS. Intento 2/2 total, último permitido. Cero bloqueantes pendientes.**

Mismo auditor independiente GPT-6.1 Sol/high de R1, distinto del autor/corrector; sin implementación ni corrección de especificaciones. Revisión offline documental del único ciclo correctivo y su coherencia con el paquete auditado. La SDD es apta para ratificación técnica del coordinador; este PASS no acredita implementación ni publicación y no autoriza promoción a main.

## Identidad y preservación

| Identidad | Valor verificado |
|---|---|
| Snapshot R2 | `6dbaf2c97d81dd6433dd7d1f75e0a8d8943bea92` |
| Tree R2 | `ae19b2be649711aa5ebeb405eb8e3eebd09c1ef2` |
| Base documental original | `67dacfec405935567f71b403cd80a56f5aebe952` |
| Tree base original | `d024a161e85b32c1cc783e1db9886c7ffa1e6d76` |
| Snapshot R1 | `e8498091d8e285dc41576fc00228541efc1bd65b` |
| Tree R1 | `0c97d664d831da29deade1b538a49c462bcd7903` |
| Archivo previo de informe R1 | `fbebb78f6788af1a4e97e2e6ac679e060ceb6af5` |
| Rama inspeccionada | `agent-ready/f3-sdd` |

HEAD/tree y working tree limpio coincidían con la admisión antes de esta escritura. El informe [R1](sdd-r1.md) permanece byteexacto, SHA256 `6de72f50760407c85ae6fd851c18d57b15f2058743ac418c4cd082a10950f21d`. El diff desde su archivo previo comprende exactamente ocho documentos: tres documentos de fase, OpenAPI, README y ejemplos de contratos, casos q y registro de corrección. El diff desde el snapshot R1 además incorpora su informe archivado. No hay cambios a fuentes, schemas de respuestas, demás artifacts originales, runtime, tests, CI, dependencias o configuración de producto.

## Cierre de la lista de R1

| ID | Resultado | Evidencia y condición satisfecha |
|---|---|---|
| B3-SDD-01 | **CERRADO** | `fases/f3-contratos.md:38` separa valor decodificado y valor posterior a NFC/trim. OpenAPI `contratos/openapi.json:1059` y `:1509` define q GET/HEAD como string decodificada sin minLength/maxLength del valor normalizado, y sus descripciones fijan las restricciones semánticas posteriores. `contratos/README.md:14`, `contratos/ejemplos.md:79` y `contratos/q-normalizacion-casos.json:1` documentan la misma frontera. Los cuatro casos completos positivos/negativos padding/NFC tienen métricas y resultados contractuales coherentes. |
| B3-SDD-02 | **CERRADO** | `fases/f3-api-y-descubrimiento.md:60` y `:62`, `fases/f3-contratos.md:117` y `fases/f3-traspaso.md:49` y `:51` incluyen expresamente `tests/agent-readiness/negotiation.test.ts` en C, sólo para expectativas Link. Se fija implementador C y coordinador integrador, se exige igualdad al conjunto F3 incluido F1 y se preservan todas las demás aserciones y el paso CI. No se autoriza cambiar comportamiento F2 ni reabrir aceptación/matrices/scans. |

No quedan entradas abiertas de la lista cerrada R1 ni se identificaron nuevos bloqueantes introducidos por el ciclo documental.

## Evidencia documental de R2

Se comparó íntegramente el diff del ciclo con el registro `evidencia/f3/correccion-r1.md`, los documentos normativos y los requisitos del informe R1. La comparación estructural completa de OpenAPI contra R1, sustituyendo sólo schema/descripción de q GET/HEAD, devuelve igualdad del resto del documento. GET y HEAD conservan q obligatoria, paths, operationIds, respuestas y headers. Ninguna capacidad o límite normalizado se amplía; siguen raw2048 bytes, q normalizada1..200 codepoints/800 bytes, 1..12 tokens distintos de≤64 codepoints.

Los casos se comprobaron con `URLSearchParams`, normalización NFC/trim de JavaScript, conteo de codepoints, bytes UTF-8 y tokenización documental NFKD/marcas/lowercase/Unicode según la spec. Se validó además estructura de los cuerpos de error contra el schema existente mediante Python Draft202012Validator. Resultados exigidos son expectativas documentales, no respuestas HTTP observadas:

| Caso | Raw bytes | Codepoints decode→NFC/trim | Bytes normalizados | Resultado contractual |
|---|---:|---|---:|---|
| padding-positivo | 209 | 207→7 | 7 | 200 |
| padding-negativo | 409 | 407→207 | 207 | 400 INVALID_REQUEST |
| nfc-positivo | 1384 | 397→200 | 397 | 200 |
| nfc-negativo | 1391 | 399→201 | 399 | 400 INVALID_REQUEST |

Todas las queries respetan raw2048, UTF-8 y ausencia C0/DEL. Los tokens normalizados respetan cantidad/longitud; los negativos aíslan la longitud normalizada. Los schemas q GET/HEAD admiten los strings decodificados positivos, y sus descripciones exigen rechazar los negativos tras normalización. Las reglas restantes de §2 siguen obligatorias: type:string es la restricción estructural, no una declaración de que toda string sea una consulta válida.

`git diff --check` del ciclo termina sin diferencias de whitespace inválidas. Los controles de identidad, diff exclusivamente documental y SHA256 del informe R1 pasan. Las conclusiones de R1 sobre corpus F2, fuente primaria ARD actual/legacy, skills0.2.0 y URI opaco, RFC9727/9264, schemas de respuesta, seguridad/límites, build/routing, orden A→B→C, aceptación, promoción/rollback y STOP se conservan: esos contratos y fuentes no fueron modificados por R2. La corrección de ownership hace compatible el cambio Link con los checks heredados obligatorios.

## Límites y gate siguiente

No se ejecutó build, instalación de dependencias, runtime/workerd, tests de producto/F2, CI de producto, HTTP externo, preview, scan, deploy ni mutación externa. No se consultaron nuevamente fuentes remotas. Se conserva la limitación R1 de no afirmar compilación integral Ajv2020 en este checkout sin dependencias. Los checks de casos son documentación ejecutable limitada y no prueban cómo responderá una API implementada.

F2 continúa como dependencia aceptada mediante su evidencia archivada; no se revalida su producción ni se atribuye una puntuación nueva. F3 continúa como SDD, sin afirmar endpoints funcionales, acceso de proveedores, autorización de implementación o publicación. El coordinador puede ratificar técnicamente este snapshot y registrar el SHA final documental de admisión antes de abrir los encargos A→B→C. La autorización específica de promoción a main y los gates de implementación/preview/producción siguen separados.

Este dictamen cierra el presupuesto de auditoría SDD en **dos revisiones totales** por el mismo auditor. No hay tercer intento ni otro ciclo correctivo posterior a un hipotético FAIL R2. El resultado efectivo es PASS con ambos bloqueantes cerrados.

**Fin de escrituras del auditor:** sólo `evidencia/f3/auditoria/sdd-r2.md`; informe R1 y todos los demás archivos intactos. Sin commit.
