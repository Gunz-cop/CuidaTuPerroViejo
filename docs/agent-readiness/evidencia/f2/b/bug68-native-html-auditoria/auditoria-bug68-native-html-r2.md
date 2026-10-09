# Bug #68 — auditoría independiente R2/5

**PASS. B01 cerrado; lista de bloqueantes vacía.** Segundo intento de máximo cinco para #68. R1 FAIL se conserva íntegro. Formal B sigue0/5; SDD sucesora PASS2/2 intacta. Este resultado acepta la reparación documental y permite preparar los siguientes gates; no acepta formalmente B ni autoriza capturas nuevas, main, merge o deploy.

Fuente fija `0184e00b02fd2edd00979504d83eefa2841f9089`, árbol `3da45c663545fbb1f844f88fc468a31ca57164e6`; padre `ae815733001d893792e515a8edf7cbb79a5b37ac`, árbol `83125ec6a070dd61f839e82dc630ccd3e551297b`. Git confirma identidad, checkout limpio y sólo70 archivos de evidencia nuevos en `docs/agent-readiness/evidencia/f2/b/bug68-native-html`. Comparación byte por byte con R1: exactamente dos archivos modificados, `plan-provenance.json` y `public-subset-index.json`; los otros68 son idénticos. No cambia producto, stack, configuración, editorial ni norma.

| Criterio | Resultado |
| --- | --- |
| Hash de paridad en procedencia | PASS: `buildParityFileSha256` coincide con el archivo final, SHA `c25a36f6195ea7838029903e265b8c5b082cd3de7de2507f5a5515e84c0c7901`. |
| Índice sin referencia circular | PASS: elimina `publicSubsetIndexSha256`; declara path y autoridad de hashes en una sola dirección. El índice excluye su propio hash y referencia correctamente la procedencia actualizada. |
| Índice final | PASS:69 referencias+índice=70 archivos; hashes, tamaños y UTF-8 exactos. Máximo24.425 bytes, inferior a24KiB. |
| Alcance de la reparación | PASS: sólo los campos de cierre B01 y el índice cambian; otros campos de procedencia intactos. Helper, tests, fixtures, plan/chunks y paridad57 son byteexactos a R1. |
| Historia y contrato | PASS: informe/comprobante R1 conservan sus hashes sellados; contrato sucesor intacto. |

Procedencia corregida SHA `b466fb9674f231ea0628e2c2b85b591d01fa1ab4bc000e174e4c9458c511aa68`; índice final SHA `3cd9ba8faa42643a2f42594610b56a9c337919aef63187fbd1f4c071d9ba552e`. Ya no existen las dos referencias actuales falsas que bloquearon R1. No hay autorreferencia mutua de hashes ni reinterpretación del snapshot anterior.

Se reutiliza la conclusión conductual sellada R1, pues su fuente no cambia:24/24 pruebas offline, pipeline default independiente1284=1274 transportes sintéticos+10N/A, diez filas nativas y controles GET/HEAD/UTF-8, reglas CSS #67, MIME/validators y literales heredados. Helper ensamblado SHA `a652040934017f6677b816e788bd614d129b5b97c5cb67d3202d465774902301`; plan1284/43 SHA `63bf1ed7fb2c65118c616dbc619207acb7620ad295dc4edc66a432fca340a1df`; paridad57 y fixtures del STOP #68 permanecen idénticos. Estos resultados offline no se convierten en aceptación pública.

Comprobaciones exclusivamente de lectura: Git `rev-parse`, `diff --name-only`, `status --porcelain`, comparación de conjuntos/bytes de archivos y hashes mediante `verify.py` con `PYTHONDONTWRITEBYTECODE=1`, fuera del checkout. No se repiten tests, pipeline, build, Workerd ni HTTP. Norma SHA `842c225f79f3eda680e968dbcd673ee760f9d75b83299d241480dc4ae86068f0` intacta; R1 informe SHA `4c74484f3149688a2a248824461c8590b157642634cc4a6e2f5709b4c8912783` y comprobante SHA `5129d808499efbb0fa3245bcfd350cb077089eadb4c2d46fb36e77835d4ca82f` conservados.

[Comprobante JSON](auditoria-bug68-native-html-r2-comprobante.json),2.510 bytes, SHA-256 `093a15c483e4555041462d3923460a8e99ad725bce81db972772d1a467050005`. Dos artefactos propios de auditoría, script y salida de cotejo, están sellados en `bug68-auditoria-r2/`. No se incluye enumeración operativa privada, raw de transporte ni datos locales/personales.

Lista cerrada: ningún bloqueante ni hueco normativo/de datos. PASS #68 R2/5 limitado a este paquete. La matriz histórica sigue detenida; cualquier nueva ejecución requiere publicación exacta, CI/Workers y receipt oficial del propio PR y mismo HEAD, copia EXEC congelada y autorización específica del propietario. Formal B permanece0/5.
