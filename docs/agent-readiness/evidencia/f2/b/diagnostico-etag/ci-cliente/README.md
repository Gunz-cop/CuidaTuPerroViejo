# Contraste de cliente externo para el diagnóstico ETag

Esta evidencia agrega dos HEAD ejecutadas por GitHub Actions hosted contra el Commit Preview ya medido en el spike. El workflow sólo observa el servicio; no revisa ni construye el repositorio, no usa secretos y no altera el cuerpo o los headers. El PR #61 permanece draft y NO MERGE. Esto no resuelve el bug #60 ni acredita B05; auditoría formal B permanece 0/5.

## Procedencia separada

- Código instrumentado servido por el preview: commit público `b87616f72d4ff3446f005f87761bfd65d9f43b62`, tree `e0b4f080984b24241ddd4a68767ff82f334ec00f`, parent `39ffb4cc7484da7b1145be40e9c19766c12b5bbf`. Recibo del bot Cloudflare comment `6022505218`, UTC `2026-10-06T18:11:43Z`, [Commit Preview](https://5c55fc8d-cuidatuperroviejo.g1721m.workers.dev).
- Fuente operativa que añadió el workflow: commit público `1c77bd14e217ba70ed6cadc5bad3b08a25f3fe94`, tree `79ea740131c8d7a4012e129e79cebd5c43ece91d`. SHA local correspondiente `5e399b22c46c7236ac68a55644a9a4eaf792f296`. La captura HTTP se dirigió explícitamente al preview fijo de `b87616f`; no corresponde al nuevo SHA.
- PR #61: <https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/61>. El workflow temporal está en `.github/workflows/f2b-etag-diagnostic.yml`; las evidencias de esta ejecución están en `raw/`.
- Evento `pull_request` / `synchronize`; run `37511028097`, attempt 1, job `f2b-etag-client-diagnostic` ID `112431896878`, workflow ID `376706096`, resultado del run y job `success`. El source head indicado por el evento fue `1c77bd14e217ba70ed6cadc5bad3b08a25f3fe94` y la base del PR es `agent-ready/f2b-negociacion`.
- Runner `ubuntu-latest` (Ubuntu 24.04.5). La preflight registró `proxy_configured=false`; por ello se realizaron las dos HEAD sin proxy configurado en el runner. No se imprimieron valores de variables proxy. TLS validó con el almacén de certificados del sistema; el runner negoció TLS 1.3 y HTTP/2.
- El workflow declara `permissions: {}` y no llama acciones, checkout, dependencias, secretos, APIs ni deploy. El job log indica el permiso de metadatos predeterminado de Actions; ningún valor de token se leyó o escribió.

## Capturas y resultado

El job hizo exactamente dos requests, ambos `HEAD /`, UA `ctpv-f2b-etag-spike/1.0`, `Accept-Encoding: identity`, sin redirects ni reintentos. No envió GET ni descargó cuerpos. El log completo decodificado recibido por la API GitHub se conserva en `raw/job-112431896878.log`; su tamaño y SHA-256 están en `manifest.json`. Los tamaños y hashes de los ficheros temporales calculados dentro del runner constan en `manifest.json`; los headers/traces aquí son los contenidos del log con timestamps del runner, no ficheros capturados de forma independiente.

| Variante | Cliente / status | ETag de ASSETS seleccionado | ETag en wrapper | ETag exterior | Otros datos |
| --- | --- | --- | --- | --- | --- |
| HTML (`Accept: text/html`) | Hosted directo; HTTP/2 200; curl 0 | `"a791cc206d8b7a5dc2c8f993dce7c454"` | mismo valor | ausente | `cf-cache-status: HIT`; `server: cloudflare`; `cf-ray: a466b3b50ff7e809-SEA` |
| Markdown (`Accept: text/markdown`) | Hosted directo; HTTP/2 200; curl 0 | `"c262365b8aeb7213ef529ce3e9d9fa15"` | mismo valor | mismo valor | `cf-cache-status: HIT`; `server: cloudflare`; `cf-ray: a466b3b91ee99d6b-PDX` |

La preflight confirmó que este segundo cliente no tenía proxy configurado y el handshake TLS terminó con validación de certificado exitosa. En consecuencia, el síntoma HTML también ocurrió en esta ruta directa del runner; el proxy usado en la primera tanda manual no es necesario para reproducir la ausencia. En el log directo el servidor anuncia Cloudflare. La evidencia sigue ubicando la pérdida después de la Response del wrapper, pero no distingue qué componente de esa frontera posterior elimina el header. No debe atribuirse la causa de forma exclusiva a Cloudflare ni al proxy con estas dos muestras.

La primera tanda del spike queda sin cambios en `../public/raw/` y `../public/manifest.json`: fueron cuatro requests públicos al mismo Commit Preview con el mismo UA, a través del proxy del cliente manual; sus GET conservaron cuerpos idénticos al build. El total documentado asciende a 6 de 8 requests permitidos. No se usa el saldo restante y no se repiten capturas.

## Lectura normativa

Este resultado es observacional, de dos variantes y un único instante. No cubre artículos, otras rutas, negociación condicional, HEAD/GET en todos los estados, demás headers ni matriz B05. F2B permanece bloqueada sin aceptación; el cierre técnico de #60 requiere localizar la causa con evidencia adicional y decisión de root.
