# Evidencia de implementación F0

Esta evidencia se generó desde el tooling commit limpio `35e767647a05034baa3b4e371bee4f7a3849545d` el 2026-10-05. Los manifests de cada captura enumeran SHA-256 y bytes de sus archivos.

La carpeta [`../bloqueo-c06-home/`](../bloqueo-c06-home/) es un diagnóstico histórico de la base previa al fix #45, no un bloqueo vigente. Sus archivos de inventario originales se preservan sin cambios; el resultado válido de 34 páginas/28 documentos que sigue es el de esta carpeta.

- `replay/`: reproducción offline byte-preserving del baseline histórico. Los tres perfiles terminaron completos con puntuaciones Content 43, All UI 20 y API sin configurar 19; `dirtySource=false`.
- `inventory/`: inventario del build explícito con estado `valid`, 34 páginas HTML, 28 documentos y home canónica `/` incluida en sitemap.
- `parity/`: siete fixtures de HTML público seleccionado con H1, headings en orden, avisos, FAQ, fuentes externas y exclusiones documentadas.
- `live-content/` y `live-all-ui/`: una llamada HTTPS real por perfil a `https://isitagentready.com/api/scan`, sin reintentos. Ambas respondieron HTTP 200 con estado completo; Content 43 y All UI 20.

El scanner no devolvió un SHA de despliegue (`deploymentCommit: null`). Estas llamadas observaron el sitio público al momento de la captura. No identifican ni validan un build local específico, ni representan los PRs aún no integrados. El perfil `api-unconfigured` solo se reprodujo desde su respuesta histórica; no se envió una tercera solicitud.

Los resultados son evidencia para revisión independiente. No constituyen por sí mismos aceptación de C01–C12 ni cierre de auditoría F0.
