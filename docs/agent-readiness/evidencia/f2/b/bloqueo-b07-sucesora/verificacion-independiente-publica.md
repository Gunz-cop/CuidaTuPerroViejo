> Copia pública derivada del informe independiente sellado. Se sustituyeron únicamente referencias a rutas absolutas locales por identificadores de evidencia; el original se conserva localmente, SHA-256 `b18581d1d60712822de4179cbabdd927c0edf6a24d19e13cec9288e6b6e5acc7`. El comprobante offline citado no está incluido en esta copia Git. Esta derivación no añade capturas ni completa los datos faltantes.

# Verificación offline del bloqueo de evidencia B07 — F2B sucesora

**Bloqueo confirmado: conservar bug y STOP, sin reanudar capturas públicas.** Faltan originales necesarios de B07 y el preflight público contiene defectos verificables por lectura. No se trata de una caída de Cloudflare ni de una contradicción de la SDD. Esta verificación no es auditoría formal de implementación: B permanece **0/5**, público **0 solicitudes** según coordinación, y SDD sucesora **PASS2/2 intacta**. No habilita recapturas, reconstrucción de originales ni publicación de los derivados B07 como evidencia cruda.

## Fuente y límites

Implementación local congelada `worktree sucesor`: `d61dbe2e0888f8045a67d9be6a6f3baccceec80f`, tree `d28b439d13d69ee9696f56c079fb9482947ccea5`, checkout limpio. Equivalente público aportado por coordinación: `05ecae3c1356e393f26a5831dec41b7e4b84db77`, PR64; CI `112568961438` y Workers `112569047368` PASS no sustituyen los originales faltantes.

Base ratificada `e4029a0977d6630671c6ba981bc39c4766cd22e1`, tree `6e34570ddd478cca06b551d92ef79f7245c4db86`. Documento sucesor conserva SHA-256 `842c225f79f3eda680e968dbcd673ee760f9d75b83299d241480dc4ae86068f0`. No se evaluó el cumplimiento integral B01–B10 ni la corrección funcional del producto.

## Evidencia B07

Los únicos originales declarados son JSON de resumen, ambos verificados:

| Archivo en `f2b-sucesora-local/private-raw/` | Bytes | SHA-256 |
| --- | --- | --- |
| `b07-invalid-json-index.json` | 2089 | `b924aa03c062e1910a119503f02627f45155ac3b3d1325646eed7cb38a483d7d` |
| `b07-missing-index.json` | 2022 | `b7f4e00c3038c76050c5bccdc0cdd8c4c3222ef4cc62b736b55bc2d9a7b1254f` |

Cada uno registra GET503 de 37 bytes con SHA `763ce9c206d57dbc240314521af33125e8850245d373ee0f6e7c5f5834cc6cc1` y HEAD503 con cero bytes. Ninguno contiene los bytes del GET, status line/header block original, URL/path ni request completo. El JSON inválido registra Accept; el índice ausente ni siquiera registra ese campo. Las listas de headers no acreditan por sí solas exhaustividad de captura ni ausencia de otros headers. No se encontró archivo de 37 bytes en el paquete entregado que pudiera aportar el cuerpo original; los derivados reconocen explícitamente que no se retuvo y tienen `bodyBlob: null`.

`public-safe/response-cases/017.json` añade a esos casos path `/`, reason `Service Unavailable`, Accept-Encoding y UA; para el caso missing también añade Accept. Esos valores no constan en el original. El derivado no debe publicarse como respuesta/request observado ni como original completo B07. Deben preservarse los JSON originales como evidencia incompleta; conocer el literal503 del source o calcular su hash no recupera la captura perdida.

Se conserva la declaración de 317 solicitudes locales (313+4 B07), sin convertirla en PASS: faltan datos auditables de las cuatro B07. Contratos F2 §6 exige literal503, seguridad/no-store y HEAD vacío; B07 exige evidencia de fallos de índice sin credenciales/fallback. Sucesora §5 exige originales necesarios para auditar y dispone bug/STOP si faltan; §7 no permite ocultar el déficit con un check verde. La evidencia disponible no permite refutar el bloqueo.

## Defectos confirmados del preflight, sin ejecutarlo

Fuente inspeccionada: `f2b-sucesora-local/public-safe/public_acceptance_runner.py`, 16.033 bytes, SHA-256 `b8ef216759c099d2f1dd627466e1da3d61266bc5ae34816ad6e7b70b7a951d46`. Referencias siguientes son líneas de ese archivo congelado.

| Defecto | Referencia y consecuencia |
| --- | --- |
| HEAD confunde headers con entidad | 115–127: curl `--head` escribe sus headers en el output regular, asignado a `body.wire`, además del dump-header. El runner interpreta ese output no vacío como cuerpo HEAD y produciría un falso fallo. |
| Expectativa del plan incompatible con el código | 131–134: llama `expect.get`, pero 1040 de las 1284 solicitudes del plan tienen `expected` como string. Por ejemplo los baseline del suplemento y las condiciones. Llegar a ellas produce AttributeError, no validación ni STOP controlado. |
| Baseline codificado enviado al validador condicional | 136–140: el grupo `compression-supplement-144` incluye `baseline-no-condition`, pero el mapa no contiene esa fila200. Aun resuelto el tipo anterior, un baseline correcto sería rechazado antes de sus checks específicos151–154. |
| Serialización del header block con tipo incorrecto | 27–51 devuelve `block` como lista de líneas bytes;188 llama `base64.b64encode(block)`, que requiere un objeto bytes-like. Un caso que llegue a serialización produciría TypeError. El manejo final captura sólo `Stop`. |
| Decodifica una entidad inexistente | 129–130 llama decoder incluso para HEAD/304 vacíos;61–70 invoca BrotliDecompressSync sobre esos cero bytes si anuncian br, aunque no haya cuerpo que descomprimir. Sería un falso fallo. No se afirma que gzip.decompress de vacío falle. |
| Igualdad de presencia HEAD demasiado estricta | 191–198 rechaza Content-Encoding omitido en HEAD cuando GET lo anuncia. Sucesora §5 permite campos omitibles de HTTP; coherencia de campos anunciados no exige presencia idéntica. Esto no exime ETag Markdown obligatorio ni metadatos presentes falsos. |
| Forma débil mal construida cuando el nativo ya es débil | 85–100 sustituye directamente el tag en `W/${selected-native-tag}` del plan. Un tag observado `W/"x"` genera `W/W/"x"`, inválido; un servidor conforme ignoraría todo el campo y respondería200, que el runner atribuiría erróneamente al servidor. §3 permite formato nativo fuerte/débil. |
| ETag Markdown304 no exigido de forma general | 141–146 sólo compara tag si existe `etagSourceRequestId`;174–177 sólo exige ETag en baseline200. La fila wildcard Markdown del plan no tiene ese source ID, por lo que un304 sin ETag pasa esos checks aunque §§3–4 lo prohíben. |

Son defectos de preparación/captura, no observaciones de HTTP nuevo: ninguno fue reproducido ejecutando el runner. Los casos y consecuencias se deducen del código y sus entradas originales. Corregirlos pertenece al autor bajo una autorización posterior; el auditor no los corrigió ni puede usar sus arreglos para reponer evidencia histórica perdida.

## Verificación y cierre

Se leyeron JSON/código/contrato, comprobaron hashes y objetos Git y analizaron las 43 chunks del plan: sus tamaños/hashes corresponden al índice de 1284 posibilidades. No se ejecutó el runner, decoder, curl, build, tests, red ni pruebas del producto. No se editaron source, SDD, registros originales o informes anteriores. Sólo se escribieron este informe y el comprobante offline fuera de los worktrees.

Comprobante `f2b-sucesora-b07-verificacion-offline.json (comprobante conservado localmente)`, SHA-256 `0d0303e6d81aa33532741023894215ba6674971bf894c71636d822fea2ee8bc0`, conserva fuentes/hashes y alcance de búsqueda. Lista cerrada de esta verificación: carencia B07 y ocho defectos de preflight expuestos arriba; no autorización de reanudación, recaptura o aceptación formal B.
