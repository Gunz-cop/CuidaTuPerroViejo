# Receipt oficial histórico de Commit Preview F2A

Procedencia: bundle reproducido por el auditor de implementación R1, no captura nueva del implementador. El receipt JSON íntegro se conserva en [auditoria-r1-bundle/receipt.json](auditoria-r1-bundle/receipt.json) y cada archivo del bundle está cubierto por [manifest.sha256](auditoria-r1-bundle/manifest.sha256), SHA-256 `a212172c2d1e1ffa22cbf0f2c8111c92b1e17d7ccf2500eadc18b72f570aea6d`.

- Aplicación autora: `cloudflare-workers-and-pages[bot]`.
- Comentario oficial: [PR #57, comentario 6010340357](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357).
- Receipt actualizado: `2026-10-06T06:04:42Z`.
- SHA medido: `d628f371b32cd7c4bb698ba906b2648c4cd6178a` (tree `279a754c5ed26d53958baa556d0584db40b1ad89`).
- Commit Preview URL publicado por el bot: `https://a9654c00-cuidatuperroviejo.g1721m.workers.dev`.
- Resultado del bot: deployment successful.

La medición HTTP conservada corresponde a la auditoría R1 sobre d628: 58 GET/HEAD explícitos para índice y documentos con resultado correcto, y home mantiene HTML al enviar `Accept: text/markdown`. No identifica ni valida las correcciones locales posteriores a R1. La captura del candidato local queda pendiente del bloqueo #58.
