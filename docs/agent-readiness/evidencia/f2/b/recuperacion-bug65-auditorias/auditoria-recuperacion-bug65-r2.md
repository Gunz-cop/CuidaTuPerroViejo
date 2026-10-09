# Recuperación bug65 — auditoría independiente R2/5

**FAIL por un único bloqueante reparable del gate: no comprueba los literales GET400/406.** R1-B01–B07 están corregidos/acreditados. El déficit de insumos B07 que causó STOP en R1 está resuelto con nuevos originales, sin reconstruir los históricos. Este FAIL vuelve al autor dentro del contador recuperación: segundo de cinco intentos, tres disponibles. No habilita HTTP público ni aceptación formal B, que sigue **0/5**. SDD sucesora **PASS2/2 intacta**; no es otra revisión normativa.

## Fuente y método

Entrega fija `b69521d6b8ddc4a3aac1c18c7cc0a99e7750ebe6`, tree `59c454ad222781d2cb9bce43e85eb777e361bfb3`; padre `e3492afd661d6d96535717d8d5caa3bfc3d9498d`, tree `a00ab14cbf28c929c9762321b05786a5746079db`. Checkout limpio y diff exclusivamente87 archivos nuevos de `docs/agent-readiness/evidencia/f2/b/recuperacion-bug65-r2` (en adelante paquete R2). No cambia producto, tests de producto, configuración, editorial ni norma.

Fuente efectiva del registrador reensamblada por el wrapper público: SHA-256 `09d2ca7f7ab60158e4c9fac91e3780331fa6056129778035ceaaa244169a439e`, idéntica al original privado. Fuente tests pública/privada idéntica. Contrato sucesor SHA `842c225f79f3eda680e968dbcd673ee760f9d75b83299d241480dc4ae86068f0` y R1 informe/comprobante/scripts intactos.

Se ejecutaron once pruebas offline del paquete y una matriz independiente con **executor default run_one, sin sustituirlo**, únicamente transporte curl simulado. Se usaron bytes de build conservados y codecs gzip/Brotli reales offline, nunca JS del producto. La matriz independiente validó1284 IDs:1274 casos sintéticos y10 N/A de HTML identity home con GET+HEAD exactos sin tag;72 fixtures de nativo débil en br y32 HEAD200 con omisión válida de Content-Encoding. Verificados raw/base64/métrica HEAD0 y destino de copia retargetada. Ninguno de estos casos es HTTP real ni aceptación pública.

**Cero HTTP nuevos del auditor, builds, Workerd, calibraciones, llamadas IA, evaluador o mutaciones remotas.** Se leyeron y cotejaron los ocho requests reales locales ya emitidos por el autor, separados de la preparación fallida y de R1. No se corrigió nada.

## Único bloqueante — R2-B01

Los seis GET de `accept-negotiation` siguientes tienen `expected` con status y MIME, sin literal/hash del cuerpo:

| ID | Status esperado |
| --- | --- |
| `accept:accept-home-bad-q-over-one` |400 |
| `accept:accept-home-bad-q-precision` |400 |
| `accept:accept-home-duplicate-q` |400 |
| `accept:accept-home-json-only` |406 |
| `accept:accept-home-none-acceptable` |406 |
| `accept:accept-home-unsupported-media-param` |406 |

`validate_response` del helper, líneas310–342, compara hash sólo si `expected.bodySha256` existe (323). Estas filas omiten ese campo y tienen formato esperado text/plain; un cuerpo vacío o `wrong error text\n`, con status/MIME/no-store/Vary/Link/seguridad correctos, **pasa** en400 y406. Las pruebas propias reprodujeron ambas aceptaciones incorrectas y los controles de literal correcto. La simulación fuente también devuelve entidad vacía para status400/406 (`response_for`: entidad sólo cuando200) y acaba con PASS1274/1284, por lo que no demuestra el cuerpo de esos errores.

El requisito ya existe en contratos F2 §6 (`docs/agent-readiness/fases/f2-contratos.md`):400 literal `Invalid Accept header.\n`,406 literal `No acceptable representation.\n`. La sucesora§2 hereda esos errores y§5 exige STOP en la primera regla incumplida. Son **23 bytes / SHA `a5e285f4ea4df7aa7c0a38457d808fb819113874ce120b5c4b092d1412a871d3`** y **30 bytes / SHA `7414baeed275ad5e3d23b32ca6c4e3b2acdcafb9922eb77f074ffcfaff541c6c`**, respectivamente. El salto de línea final forma parte del literal.

**Corrección mínima:** ligar esas seis expectativas al literal/hash vigente, o imponerlo por clase de error documental en el validador; fixtures positivas con bytes correctos y negativas vacía/incorrecta a través del pipeline real, acreditando STOP/parciales/restantes. Mantener los seis IDs y el presupuesto1284, sin pedir HTTP nuevo ni retocar runtime/SDD/editorial. No es hueco normativo ni carencia de datos: los literales autoritativos están disponibles.

## Cierre de R1 y regresiones

| Criterio | Resultado R2 y evidencia |
| --- | --- |
| R1-B01 Date |PASS. Date legítimo aceptado; requests/respuestas documentales siguen sus restricciones aplicables. |
| R1-B02 retarget/procedencia |PASS. CLI exige `--base-url` ligado a source.preview y allowlist; no BASE histórico. Copia sintética retargetada conserva IDs y envía únicamente a su destino. Plan publicado inactivo con preview/checks vacíos. /contacto delegado conserva MIME HTML/cuerpo/hash observado sin SHA histórico del startedAt; corpus57 intacto. |
| R1-B03 dependencias suplemento |PASS. Plan/dependencias/orden/IDs verificados; fila diferente-tag200 y demás200 del suplemento atraviesan run_one/validate_response sin KeyError, comparando cuerpo con baseline seleccionado del mismo contexto. |
| R1-B04 formato y native MD |PASS. Formato desde plan/selección, MIME recibido auditado. Negativas MD con MIME HTML o sin tag fallan, incluidos wildcard304. Accept mixtos/q0 que seleccionan HTML respetados. |
| R1-B05 alternancias |PASS. Native distinto del baseline exacto y cambios en secuencia causan STOP; no compara otros despliegues/codificaciones. Matriz con weak nativo br válida y sin W/W. |
| R1-B06 CDN no-store |PASS. Ambos campos CDN presentes incorrectos fallan; no-store válido pasa. Assets/delegados conservan su política aplicable y no se les fuerza private/no-store/VaryAccept. |
| R1-B07 insumos |PASS del déficit concreto: árboles retenidos **315 archivos sin índice /316 con índice inválido48 bytes**, SHA de índice `5f18c94e8fdbf511fa6cbcdc42a29c98ff20f4a85acaeedaac9ea45e68132d89`; parse independiente falla. Manifests originales/publicados son exactos; configs corregidas resuelven a esos árboles y entry/bundle26 archivado. Se conservan tras captura y rebuild. No se afirma cobertura formal completa B07 de límites/duplicados/path inseguro desde sólo estos dos casos. |
| Ocho fallos iniciales del helper |PASS de regresiones aplicables: HEAD output de headers separado de entidad0; strings y baseline200; bloque bytes/base64 CRLF; codecs no aplicados a vacío HEAD/304; omisiones HEAD válidas; weak nativo; MD200/304 obligatorio cuando seleccionado; excepciones/STOP/parciales/restantes. |

## Procedencia e integridad de originales

Índice público UTF8 SHA `e4635b62f14e0a0dd6ff7f83c6b79741a402a4844285e801a0b2308af1d15258`:73/73 referencias exactas. Índice de objetos SHA `49e10b2a49096d2c89a55052690418d5c4b1a8f39c590e8311ec4ca1d16f287a`:13/13 originales exactos, incluido índice inválido y raw CRLF.73 referencias+13 objetos+freeze-index propio corresponden al conjunto87; no se publican pyc ni originales de infraestructura completos.

Preparación privada de insumos SHA `1a6eb386fad337525c7bb808c55c04e722c19dbba6c1404ad1c7601472844d8d`; corrección de rutas antes de HTTP SHA `4f1974c74b7cd1dd7e5e0273e5bd66160cd2e5e17fd39fdb9420c3c9c948ec02`. Se conservan también los configs iniciales erróneos; no se atribuye su uso a la captura válida. El capturador verifica inputs/bundle/config antes de iniciar Workerd y guarda request/raw/observación antes de validar respuesta; los requests enlazan source/árbol/input/config/entry concretos. Es un recibo operativo y vínculo de bytes, no notarización temporal externa.

La preparación fallida conserva14 archivos y STOP original con contador **1 slot intentado**. Recibo SHA `8da1b4e8a82b78f78c894d5f0abc81145f0bea91b6da922ea61a26b051edc6b6` y shutdown SHA `218451178886bafb50e437da57a2bfa3051c4c0bbb4e31c5ca7ba3b9e6a2eb20` distinguen FileNotFound antes de spawn curl, **0 requests emitidos**. No se reescribe el STOP ni se lo suma como HTTP; la serie válida posterior es otra captura autorizada, no un retry de respuesta HTTP.

Serie válida nueva: receipt SHA `796300c2498e43f1d23a4e84ea57172b7bddefcae5773469041f65d9301d2ef8`, exactamente8 locales (dos fixtures ×HTML/MD×GET/HEAD), todos503. Cuatro GET: literal real37 bytes SHA `763ce9c206d57dbc240314521af33125e8850245d373ee0f6e7c5f5834cc6cc1`; cuatro HEAD: descarga0, output headers420 bytes, entidad vacía. Status line, headers exhaustivos CRLF, métricas, requests, MIME/privado/Vary/Link/seguridad y objetos públicos cotejados. Configs sólo ASSETS+SESSION locales; no bindings AI/D1/correo/servicios remotos. Manifiesto privado SHA `cc4136506ef9f7927fbf8c3f64a1ca831857dea704a719debfd5bd6fae0dd2f2`:87/87 archivos actuales coinciden. Exits143/shutdown propio conservados; lectura de procesos no encuentra Wrangler/Workerd de recuperación.

Cotejo posbuild privado SHA `f69e3275e0318b79270ba4f9a15bfb4e73bd83c5ce8b27f40ef61f357db7c452`: inputs/configs/bundle/raws aún coinciden por lectura independiente.57 artefactos actuales y predecessor exactos (28HTML+28MD+índice). Build receipt original31.393 bytes SHA `4970d9192dbaabc49705d6820a9c55e26c94a8eb24c96b5df12c5ed06f7d9af5`; derivado público declara la omisión y conserva exactamente las57 filas path/bytes/SHA. No se compiló para comprobarlo.

Las752 omisiones publicadas se cotejaron contra originales privados:631 archivos de inputs,26 bundle,64 metadata/archivos de captura no curados,14 preparación fallida, cinco receipts operativos, cuatro configs, siete fuentes/procedimientos y un build receipt. Logs, traces, URLs/puertos/PIDs y configs completos permanecen privados, disponibles para revisión; no se afirman presentes en Git. R1 y resúmenes históricos incompletos permanecen con sus hashes previos.

## Comprobante y alcance del veredicto

[Comprobante JSON](auditoria-recuperacion-bug65-r2-comprobante.json), SHA-256 `58417d80c75cdf56ab8c6121bdd963a15977f7c9c84a00f574c4909028aef2a1`, y siete scripts/logs/resultados offline en `bug65-auditoria-r2/` conservan hashes y comandos. La ejecución usa `PYTHONDONTWRITEBYTECODE=1`, TMPDIR externo y datos preservados; se leyeron Git, contrato, source y originales, sin tocar checkout.

Lista cerrada: **R2-B01 únicamente**. Autor puede reparar helper/plan/tests offline dentro del contador recuperación, conservando las ocho capturas nuevas completas; no hace falta reconstruir ni recapturar B07 para este defecto. Una futura entrega fija requerirá nueva auditoría de recuperación. PASS de recuperación posterior sólo permite preparar CI/Workers/receipt de último HEAD y su copia de ejecución; no es PASS B01–B10 ni permiso de main/deploy. Público sigue0 solicitudes y SDD2/2 permanece intacta.
