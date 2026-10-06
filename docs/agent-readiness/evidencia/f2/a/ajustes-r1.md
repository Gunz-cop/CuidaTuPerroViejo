# Correcciones F2A tras auditoría R1

La auditoría independiente R1 del SHA público `d628f371b32cd7c4bb698ba906b2648c4cd6178a` (tree `279a754c5ed26d53958baa556d0584db40b1ad89`) identificó B01–B05. El informe íntegro y sin editar está en [auditoria-r1-implementacion.md](auditoria-r1-implementacion.md), SHA-256 `0673b6955f957059f5be752c3b4477f91bd65c5e137aa143f55dc204176f58b0`. La captura R1 completa, incluida receipt, snapshots, respuestas, cabeceras y manifiestos, se preserva en [auditoria-r1-bundle](auditoria-r1-bundle/); su `manifest.sha256` tiene SHA-256 `a212172c2d1e1ffa22cbf0f2c8111c92b1e17d7ccf2500eadc18b72f570aea6d`. El bundle R1 es evidencia del auditor para d628, no una captura del candidato local corregido.

## B01: orden, multiplicidad y destinos de enlaces

El HTML fijo `home.html` contiene una lista con seis `li` para tarjetas de categorías. Cada tarjeta enlaza encabezado, descripción y CTA; Movilidad incluye además un enlace secundario. La proyección anterior perdía tres destinos de las tarjetas recientes y serializaba el contenido de la lista fuera de su estructura. El serializador ahora recorre bloques en orden, conserva enlaces envolventes al descender por wrappers y aplica indentación Markdown a todas las líneas de cada `li`.

El golden `home.md` se editó manualmente con el HTML de la fixture como fuente. No se generó el golden durante las pruebas. Una aserción separada parsea el resultado con mdast/GFM y exige una lista única de seis entradas, un encabezado, párrafo descriptivo y tres destinos de enlace por tarjeta; comprueba en forma independiente heading/texto/hrefs dentro de cada `li`. Los artefactos Markdown revisados conservan también los tres destinos de las tarjetas recientes. No se alteraron fixtures F0.

## B02: límite de ruta

La validación de `canonicalPath` se ejecuta antes de escribir artefactos y acepta longitud exacta 100. El test construye tres directorios aislados con sitemap, catálogo y HTML concordantes: 100 se proyecta y pasa `check`; 101 y el probe histórico 115 se reconocen en inventario pero fallan `check` y escritura, sin directorio de salida parcial. El caso 115 no retiene el 101 como artefacto inválido previo.

## B03: texto interactivo home

La exclusión apunta exclusivamente a `span#localized-emergency-text`. El HTML de origen conserva intactos el `aside#urgencias`, su copy condicional y su enlace estático de búsqueda; el guard semántico valida el enlace de fallback mientras comprueba que el placeholder dinámico no aparezca en Markdown.

## B04: fidelidad GFM y texto literal

El escape contextual hace que párrafos con prefijos `#`, `1.` y `-` se interpreten como párrafos, no como estructura Markdown nueva. Los bloques `pre/code` mantienen saltos LF internos y finales según el parser GFM. La celda con `A | B` permanece en una sola celda sin doble escape. Los cuatro goldens actualizados son comida, Cushing, home y movilidad; todos se comparan con los HTML fijos, y sus bytes/hashes se verifican por tests. El manifiesto de fixtures no cambia la referencia del HTML fuente. En home, dos espacios finales seguidos de LF aparecen sólo en las tres líneas derivadas de `<br>` (Resultado inmediato, Consejo orientativo y Sin registros); son el hard line break Markdown intencional que conserva ese HTML y deben tratarse como excepción de `git diff --check`.

## B05: procedencia de evidencia y bloqueo actual

Se archivó el bundle de auditoría R1 completo con el origen y SHA de d628 explícitos; la receipt oficial es [el comentario del bot Cloudflare en PR #57](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357), timestamp `2026-10-06T06:04:42Z`, Commit Preview `https://a9654c00-cuidatuperroviejo.g1721m.workers.dev`. El intento del cliente Python sin identificación recibió 403 / `1010`; el auditor identificado `ctpv-independent-f2a-auditor/1.0` recibió 200 y verificó 60 solicitudes. Esa diferencia documenta una limitación de cliente observada, no acceso universal.

No se pudo conservar la carpeta de captura previa del implementador (`dist/f2-preview-evidence-d628`): no existe en el worktree disponible. Se conserva en su lugar el bundle independiente R1 existente, sin atribuirlo al implementador ni modificar la identidad del SHA medido. Para el nuevo candidato siguen pendientes build final, CI, Commit Preview, receipt y manifest de solicitudes de ese SHA. El rechazo automático y el bloqueo completo están registrados en issue #58 y en el archivo `bloqueo-f2a-build-ai-20261006.md` del expediente del coordinador. No se reintentaron comandos/builds ni se publicó un nuevo ref.

Las reparaciones B01–B04 y las pruebas offline son evidencia local, no auditoría R2 ni aceptación A final. El contador independiente permanece R1/5 consumida; root decidirá la siguiente auditoría cuando el bloqueo de validación se resuelva.
