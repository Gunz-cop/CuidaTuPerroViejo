# Bug70 — auditoría independiente de implementación R1/5

**FAIL. Dos bloqueantes de código/evidencia: B01 y B02. Lista cerrada.** Primera revisión de cinco como máximo; quedan cuatro. No se abre una segunda revisión de F2B ni de la SDD correctiva: F2B histórico conserva PASSR1/5 y la SDD conserva PASSR2/2, sin alterar informes o contratos.

Snapshot auditado: **cdfe7f160a13e57768129daee2eb8ec702be28b7**, tree **0f86083c80cb88e0d926aa02921f1d2a50a385e5**, padre **b9dce92590cafb0018143dd1e1b73cc660f0a0de**, equivalente público del padre **4b2d7b2455be742e074ac5ee4db4b3ef239c69c0**. Checkout limpio,75 archivos añadidos exclusivamente al ownership `docs/agent-readiness/evidencia/f2/b/bug70-html-exterior/`. Ningún cambio de producto, runtime, stack, CSS, CI o norma.

La fuente del helper es distinta del deployment target, que permanece **d2bd342050811d41ee212730cb11fe07783994bd**, tree **666f95273609ca67da8a508390c3acf9a141f8ca**. Norma fija `f2-produccion-integridad-exterior.md`, SHA256 **759e8e4dfa260d8f6b94002a383e6abb354eb7bb9dd80a29175b9a0ef19d568e**, con su ratificación separada. No se demuestra hueco esencial de SDD, base o datos: los dos fallos son reparables en el helper/pruebas dentro de su contador.

## Bloqueantes

**B01 — Las alternancias permiten cambiar la entidad exterior real.** En `runner-source/002.pyfrag:109` (`validate_response`, líneas516–532 de la fuente ensamblada), el estado de alternancias compara sólo ETag, tanto contra el baseline identity como entre repeticiones. Falta comparar la entidad E real del mismo contexto ruta/formato/codificación. Con HTML sin ETag, A y A+I pasan individualmente el comparador exterior y el mismo ETag ausente; el helper acepta el cambio en lugar de STOP.

Reproducción independiente: home/HTML/GET/identity, headers contractuales y ETag ausente; baseline E=A seguido de E=A+I y la dirección inversa. También ambas direcciones entre alternancias repetidas sin depender del baseline identity. Los cuatro subcasos no lanzan `Stop`. Esto contradice §4: “Cambiar entre A y A+I dentro de una comparación que exige estabilidad es FAIL aunque cada entidad pase individualmente”, y B06 heredado. Corrección mínima: comparar/guardar E real por contexto contra el baseline pertinente y repeticiones, además del ETag; conservar checks de la construcción individual y variantes restantes. Añadir regresiones para las cuatro direcciones/contextos, sin sustituir E por A ni normalizar la inserción.

**B02 — El registro expectedExterior es falso para la alternativa sin inserción.** En `runner-source/003.pyfrag:92` (`validate_html_exterior`, línea719 ensamblada), `expectedExteriorBytes` y `expectedExteriorSha256` siempre se calculan sobre A+I, incluso cuando `observedForm` es A. §5 exige registrar la comprobación concreta con expectedExteriorHash/bytes y resultado, manteniendo los datos observados de E real.

Reproducción independiente: home E=A,119418bytes, SHA256 **155d5643a5ca769a81481ad064508666ae2530949721c6f7806bb0a24f9016b5**. El resultado declara correctamente formaA y entidad observada, pero atribuye expectativa119785bytes/SHA256 **506b311b84aaa11f1f79a98ecd45b2405246a6d33ae3e93131366eaee376bd82**, que corresponde a A+I. La alternativa insertada sí registra su expectativa correcta en el control positivo. Corrección mínima: registrar tamaño/hash de la construcción realmente elegida; mantener separados A, E observado y fingerprint I, con regresiones de ambas alternativas.

## Criterios y evidencia verificada

| Gate | Resultado | Cotejo independiente |
|---|---|---|
| C70-01 | PASS | SDD ratificada/fingerprint fijo; informes y STOP histórico preservados. |
| C70-02 | PASS |58 artefactos privados completos, índice28 documentos y sus hashes; manifest público coincide con los originales; receta7 archivos verificada. Inputs de comparación permanecen vinculados al sello d2bd. |
| C70-03 | PASS | I367bytes/SHA2be9…, un script completo con atributos fijados y LF, sin código inline u otro nodo; antes del único cierre body. Construcción exacta reproduce sólo offline el antiguo cuerpo127017bytes. El span histórico b4c59… no sustituye este fingerprint. No se publicaron valores de tracking. |
| C70-04 | FAIL | B01/B02. Los demás checks de alcance, gramática/hash/fingerprint, variantes excluidas, HEAD/304, codecs, errores y ejecución bloqueada no presentan otro bloqueante confirmado. Simulación íntegra1284 IDs/43chunks,1274 respuestas sintéticas+10N/A, cero HTTP. |
| C70-05 | FAIL | Este veredicto independiente no acepta la corrección hasta resolver B01/B02. Índice74refs+self75 y archivos UTF-8≤24KiB conformes; omisiones privadas declaradas. |
| C70-06 | PENDIENTE | Gate de admisión/autoridad distinto de codePASS: `ownerAuthorized=false`, `executionBlocked=true`; ninguna nueva tanda o deployment ejecutados. |

El plan tiene exactamente48 cambios de campos frente al helper69: dos paths CSS GET/HEAD;42 `bodySha256` de artefactos afectados y cuatro `expectedBodySha256` HTML suplementarios.1284 IDs,43 chunks, orden, grupos, métodos, headers y dependencias permanecen; ningún cambio de expectativa Markdown. El comparador está limitado a canonical HTML GET200 y no amplía Markdown, recursos nativos, errores, HEAD/304 o CSS. El fingerprint de ejecución real es fijo, sin sustitución CLI.

## Ejecuciones y límites

Tras reinicio no había recibo independiente sobreviviente de suite/reproducción: ninguna ejecución anterior se acredita o reconstruye. Root autorizó expresamente una ejecución offline documentada por esa incertidumbre. Se guardaron fuente/comando/recibo de inicio, stdout y resultado: **40 tests, cinco fallos contractuales —cuatro subcasos B01 y B02—, sin skips**. Hubo además un error de setup del auditor: el transporte mock usaba el subconjunto58 y faltaba el hero-image requerido por el test de simulación.

Se preservó ese primer log. Con autorización explícita adicional se repitió **sólo aquel test**, usando los recursos delegados del dist exacto d2bd existente; A del comparador siguió ligado exclusivamente a los58 originales privados sellados. Resultado **un test PASS**,1284 IDs,1274 transportes mock+10N/A. El error de setup queda resuelto y no es un defecto del autor. Las37 regresiones del autor quedan acreditadas entre36 del primer pase y el test dirigido; los dos bloqueantes nuevos continúan reproducidos. No se repitió la suite completa.

Todo fue offline: cero HTTP, builds, Workerd, Wrangler, scans, mutaciones remotas o cambios del snapshot. Los mocks sustituyen únicamente transporte, conservando `run_one`, `validate_response` y `execute_plan` reales; no acreditan aceptación pública. La reproducción del antiguo STOP no lo relabela como una nueva capturaPASS. P01 continúa STOP; P02/P03 y la nueva tanda permanecen pendientes.

Referencias SHA256:

- Helper ensamblado: **b11daf8d70f8efd0d53b1f5d7c83a4da608edee56f9f404d8ef6b63c3d227aff**.
- Índice público: **3581155dbf771830927ced50ebc924d73bf378df8b918bfef7e647c75b8aec48**.
- Plan: **555348b6a876c7f846aba31dc9a306e1a96fbb4f87d2bc372249815c99ce2046**.
- Primer log de suite: **ddc97cca81c1f0c681945fad5abddc781ee865a19f0ce6d9fdd3d01da4ee22fa**.
- Log del único test de setup corregido: **ed9a9e7565df1201d5230689284f175ef92f72232768376430e2256efaabf9d2**.
- Comprobante independiente: **21bcc729fcaf192c5c70d8243ca8099c17f8b99d19eec27789e8887d2eef2efd**. Scripts, protocolo sintético completo y originales necesarios permanecen privados.

La lista de bloqueantes queda cerrada en B01/B02 para una reparación coherente del autor. No hay observaciones opcionales que abran otro ciclo ni permiso de main, despliegue o ejecución pública en este informe.
