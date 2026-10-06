# Diagnóstico aislado de ETag para F2B

Este spike temporal responde dónde se observa el ETag de la representación seleccionada: ASSETS, la respuesta del wrapper F2B o el cliente exterior. Es un diagnóstico de PR draft #61 y no cambia el contrato ni el runtime de producto. No se integró, no se fusionó, no consume una revisión formal de B y no constituye aceptación B05. El estado de F2B permanece bloqueado; auditoría B continúa en 0/5.

## Procedencia

- Base pública: `39ffb4cc7484da7b1145be40e9c19766c12b5bbf`, tree `c0efe1d3b313b765977e2a7785669c41c8848fc5`.
- Fuente local congelada y usada para las validaciones: `9d6ad480ce1234fefd6e2be476f762f2fc734734`, tree `e0b4f080984b24241ddd4a68767ff82f334ec00f`.
- Commit público del candidato de preview: `b87616f72d4ff3446f005f87761bfd65d9f43b62`, mismo tree, parent `39ffb4cc7484da7b1145be40e9c19766c12b5bbf`. Se distinguió el SHA GitData público del SHA local; root verificó igualdad exacta de tree y diff local/público cero.
- Único archivo de código modificado: `src/worker.ts`. `src/lib/agent-content/runtime.ts` permaneció intacto; blob SHA `42dc14f36ab12858107f0aa4cb250c6d39b6d3af`.
- PR draft #61: <https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/61>, contra `agent-ready/f2b-negociacion`, diagnostic-only y NO MERGE.
- Checks del SHA público: CI check `112425303103` success; Workers check `112425434177` success.
- Recibo de Cloudflare Workers bot: comentario `6022505218`, actualizado `2026-10-06T18:11:43Z`; Commit Preview `https://5c55fc8d-cuidatuperroviejo.g1721m.workers.dev`. [Permalink](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/61#issuecomment-6022505218).

## Validaciones de fuente

Sobre el commit local limpio `9d6ad480ce1234fefd6e2be476f762f2fc734734` se ejecutaron Astro check (0 errores, 0 warnings, 50 hints preexistentes), build de Astro (28 documentos; índice de 26.284 bytes), Wrangler compiled dry-run (354 assets; 24 módulos; 690,96 KiB de upload, 169,69 KiB gzip; sin deploy), proyección/routing y prueba `routing.test.mjs` (1/1 PASS). La ejecución inicial `node --test tests/agent-readiness/negotiation.test.ts` falló porque Node no cargó TypeScript directamente (`MODULE_NOT_FOUND`); se conserva como error de invocación. La invocación corregida `node --import tsx --test tests/agent-readiness/negotiation.test.ts` pasó (1/1). No hubo llamadas explícitas a AI.

La validación local aislada utilizó un runtime compilado con bindings locales ASSETS y SESSION, puerto 8810, y se detuvo antes del sellado. Cuatro solicitudes locales GET/HEAD a `/` devolvieron los mismos ETags en las fronteras instrumentadas; los GET igualaron byte por byte los archivos compilados. Véanse `local/manifest.json` y `local/raw/`.

## Resultado observado

| Representación | ETag de ASSETS seleccionado | ETag en wrapper | ETag exterior | Cuerpo GET |
| --- | --- | --- | --- | --- |
| HTML (`Accept: text/html`) | `"a791cc206d8b7a5dc2c8f993dce7c454"` | mismo valor | ausente | 119.418 bytes; SHA-256 igual a `dist/client/index.html` |
| Markdown (`Accept: text/markdown`) | `"c262365b8aeb7213ef529ce3e9d9fa15"` | mismo valor | mismo valor | 12.878 bytes; SHA-256 igual a `dist/client/agent-content/v1/documents/home.md` |

En ambos casos el ETag del índice observado fue `"e0a08d20cffa737788d0811bd118b755"`. El índice es distinto de ambos ETags de representación. Las dos solicitudes HTML (HEAD y GET) recibieron status 200 sin ETag exterior pese a que el ETag nativo se observó en la respuesta de ASSETS y en la Response del wrapper. Las dos solicitudes Markdown conservaron su ETag exterior. Los GET confirmaron igualdad de bytes del cuerpo con los assets construidos.

Esto localiza la primera pérdida de ETag HTML después de la Response del wrapper y antes de que el cliente reciba los headers. La evidencia no localiza la causa más abajo: ASSETS, la rama de runtime y el wrapper preservan el valor observado; no se distingue entre edge, proxy u otro tramo del transporte. El cliente usó el proxy configurado y `Accept-Encoding: identity`; el experimento no cambió ni inspeccionó credenciales o configuración de proxy. No se afirma que la ausencia sea imposible según el contrato ni que este spike resuelva el bug #60.

Se hicieron exactamente cuatro requests públicos del Commit Preview propio (#61): HEAD HTML, HEAD Markdown, GET HTML y GET Markdown; quedan cuatro del límite inicial de ocho sin usar. No se consultaron otras rutas ni se hicieron requests adicionales. Raws, traces y hashes están en `public/raw/` y `public/manifest.json`.

## Límites y traspaso

Los headers `X-F2B-Diag-*` son metadatos temporales de esta rama de diagnóstico. El wrapper no sintetiza ni modifica el ETag real y el runtime sujeto permanece idéntico a la base. El experimento sólo observó home HTML y Markdown por Commit Preview en un momento; no generaliza a otros assets, rutas o redes.

La desaparición observada puede justificar diagnóstico específico de la capa posterior al wrapper en #60. No se cambia producto, contrato, SDD, branch B ni main. La rama spike queda sin merge hasta decisión de root.
