# F2 — auditoría independiente de cierre de producción

**PASS P01–P03 por evidencia archivada.** Lista cerrada sin bloqueantes de integridad, procedencia, comparabilidad o privacidad del cierre. La matriz nueva está completa y los dos scans reales completos son comparables con F1. Este dictamen no abre otra revisión de código, SDD o presupuesto: bug71 PASS R1/5 y correctivo70 PASS R2/5 permanecen intactos.

## Identidades y admisión

Producto ejecutado: `d2bd342050811d41ee212730cb11fe07783994bd`, árbol `666f95273609ca67da8a508390c3acf9a141f8ca`. Release de helper aceptada separadamente: `f91a95b7f49f3b5e8c80f667ee7d1b67aa0267d6`, árbol `53c310a913a996de0a825c3309a2cbab2a804884`; payload `db8b6e6afba885c05c9c57e8e6550ec15bee2e36`, árbol del snapshot auditado `17452c3119b4595a5e8c77245330772d3e6d45e4`.

Se cotejaron el recibo raíz, autorización, archivo EXEC y sus43 partes frente al plan inactivo auditado. Sólo cambió la metadata de admisión permitida; las1284 solicitudes y sus dependencias permanecen. El helper efectivo conserva el SHA ensamblado `3a373712f988fd1b65116ecc2285bc0200a6e0583b753a62f8b82860e8b78670`. Los recibos vinculan la ejecución al target d2bd y sus checks exitosos, no a un deploy de la rama documental. No se modificó main ni se compiló/desplegó durante esta comprobación.

## P01/P02: matriz real completa

| Evidencia | Resultado confirmado |
|---|---:|
| IDs previstos/completados/únicos | 1284 |
| HTTP capturados y validados | 964 |
| N/A justificados | 320 |
| Fallos/IDs pendientes/STOP | 0 |
| Suplemento comprimido | 104 HTTP +40 N/A |
| Baselines gzip/br HTML/Markdown GET/HEAD200 | 16 |
| GET200 HTML canónicos | 151:147 A+I y4 A |
| GET200 nativos estrictos corregidos | 3 |

Summary y result contienen los mismos registros, en el orden exacto del plan; hay964 directorios de captura y964 request originals distintos. Los320 N/A están vinculados a GET/HEAD200 HTML de esta misma tanda y contexto que omiten ETag; no se importaron tags ni N/A históricos. Incluyen las filas Markdown cross-tag cuyo token fuente HTML no existe; no eximen los validators propios Markdown ni las filas wildcard obligatorias.

Se cotejaron todas las metadata de requests, status/headers y registros summary: Link/seguridad, políticas heredadas aplicables, HEAD/304 sin entidad, ETag Markdown obligatorio, igualdad real E de GET200 condicionales/alternancias y las151 comprobaciones constructivas A/A+I contra A/I independientes. Los tres nativos coinciden con los assets d2bd y mantienen igualdad estricta; no reciben la excepción exterior.

El auditor contrastó28 casos representativos con sus originales completos:16 baselines comprimidos,3 nativos, CSS GET/HEAD, HTML canónico,4 GET304 Markdown propios por contexto gzip/br y2 errores400/406. Verificó226 digests de archivos, incluidos summary/result y los raws seleccionados, y decodificó gzip/br seleccionados independientemente. El sello raíz conserva7714 archivos/57729474bytes; se cotejaron todos sus paths/tamaños. **No se afirma haber recalculado independientemente los7714 hashes.** El resto se respalda en el sello completo retenido y en el helper congelado previamente auditado.

## P03 y comparación con F1

Según los recibos e historial del coordinador, se ejecutó una única POST por perfil, sin retry; el sello P03 registra exactamente2. Ambos originales tienen HTTP200, estado complete, errores vacíos, fuente limpia d2bd y `deploymentCommit=null` conservado. El auditor verificó manifests, requests, metadata, summaries y respuestas originales completas por SHA/bytes, su concordancia con los controles del payload y la fórmula congelada.

| Perfil | F1 | F2 | Delta | Controles | Nivel original del servicio |
|---|---:|---:|---:|---|---|
| Contenido, parcial | 71 | 86 | +15 | 6/7;1 fail;15 neutrales | 5, Agent-Native, sólo este perfil |
| General, all-ui | 33 | 40 | +7 | 6/15;9 fail;7 neutrales | 4, Agent-Integrated |

La función congelada `compareSummaries` se ejecutó offline sobre los originales F1/F2 y reprodujo exactamente ambas comparaciones: `comparable=true`, sin razones de incompatibilidad y únicamente `markdownNegotiation: fail → pass`. Selección, fórmula, denominadores y universo permanecen:22 IDs, SHA `9037cb57950a0c49322aae6ca44c3cfd55c65d4826e88d8c4c2284a93566e99a`. A2A/AP2 ya estaban presentes y neutrales/excluidos en F1; no son cambios nuevos de universo.

El nivel se conserva como metadata original del evaluador; no se recalcula ni se extrapola el nivel5 parcial al blog general. Los fallos de controles generales se reportan honestamente; este cierre no inventa funciones API/auth/comercio para elevar el score. Política heredada: search=yes, ai-input=yes, ai-train=no.

## Curación y límites

La proyección pública preparada conserva request/metadata/summary y comparaciones byteexactos. Los cuerpos JSON originales de31985/36794bytes permanecen privados, completos, sin fragmentación; los manifests públicos positivos los referencian expresamente por SHA/bytes. Los archivos preparados son UTF8<=24KiB y no contienen paths privados absolutos, raw de matriz, fragmento/tracking de analítica, trazas, configuración completa ni listas operativas N/A. El estado PENDING del borrador se sustituirá por el veredicto y su digest únicamente por el coordinador; su publicación final no fue ejecutada por el auditor.

El primer STOP70 y el segundo STOP71 mantienen sus digests y resultados fallidos originales; esta matriz es una tanda distinta, completa, sin reinterpretaciones de aquellos resultados. Los scans corresponden a d2bd, no al release documental del helper.

Independencia por inspección offline de evidencia obtenida por el coordinador: cero HTTP nuevo, scans, builds, suites, Workerd o mutaciones del auditor. No se reclama una observación de red nueva ni un rehash completo de los raws. Un primer lector propio asumió una ruta incorrecta para comparaciones dentro del sello P03; se preservó ese error de setup y se corrigió sólo la asociación de paths, reanudando P03 sin repetir los cotejos de raw matriz ya terminados. No fue un defecto de los originales.

Digests SHA256 esenciales:

- Sello matriz: `404605176e833f3c662e241d23cbf6d6d8c0e8c627b7aac4bb2e48c827169c29`.
- Admisión raíz: `af8682ea5b3d9ab54b6bee2c822e37af94f1cb10302311c0e670883b7ac41d44`.
- Plan EXEC: `fd7c9b4807114f45ac28dadd657601b24c6de852f81008329af63dba3299a764`.
- Sello P03: `ab49eb6f82c22f3f342bc7445607f8607eaca0819ae30393d767b776d6fc9aaa`.
- Raw content: `f8e6a2ee6d89f4ac3f9febb25623b571859674202a369f50eda27e13f2fc347f`.
- Raw all-ui: `2dc969e993678b09e4d88ec3886f03040ac5cb49c2734bd4d93780a00529768c`.
- Comprobante independiente: `8afd051637fe8ebadd723681df8c3d27b6bd66193977a9c10bcbafcecfd19212`.

Este PASS habilita al coordinador a cerrar los bloqueos resueltos y publicar el resultado F2 según su ownership. No autoriza cambios adicionales de producto, main, norma o tráfico.
