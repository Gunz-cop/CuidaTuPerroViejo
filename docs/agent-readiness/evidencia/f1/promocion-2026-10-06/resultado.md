# Publicación y medición F1

Fecha: 2026-10-06. Promoción autorizada expresamente por el propietario: «Autorizo. Realiza el push a main».

**P01–P03 PASS. F1 publicada y verificada.** La cadena PR42 → PR46 → PR47 → PR48 → PR49 → PR51 → PR52 se integró mediante merge commits, preservando la historia y el rollback separado de política/discovery. [Receipts de integración](merge-receipts.json). No se cambió producto para publicar ni para obtener una puntuación.

## Publicación y procedencia

Main promovido y source limpio de ambos scans: `34517cfd8af3c28f4840f9d0abc253741049ee9e`, tree `2d98a3d93e361b95f74565db571c7a9e492e7f55`. El producto coincide con la entrega auditada `28749e3e31d9d04adb32561af4e3da4e5870a9e4`; después se añadieron solo cierre documental y el informe histórico de reanudación F0, preservado exactamente de PR47. No force-push, squash, auto-merge o bypass de protecciones.

[Workers Builds final 112064786528](https://github.com/Gunz-cop/CuidaTuPerroViejo/runs/112064786528) completed/success con head_sha exacto del main promovido. Su recibo identifica el build `68921495-472a-4d6e-a0f6-c1cfd4993c5a`, servicio production y versión `5435c538-b111-44e5-8861-b393b44bdf91`. [Check preservado](workers-final-check.json). Los checks de CI/Workers de todos los HEAD de PR fueron success antes de integrar. El workflow de CI solo se activa por pull_request; no se inventa un run de CI por push a main.

La procedencia del build de producción se conserva por separado. El CLI F0 fija deploymentCommit=null en sus envelopes: se preservan los bytes originales y sus manifests, sin reescribirlos para atribuirles un dato externo. El recibo vincula el build de producción a `34517cfd…`; la comprobación pública acredita los bytes de producto esperados. No se afirma que una respuesta del edge exponga el identificador de versión activo.

## HTTP público — P01

[30 observaciones GET/HEAD](http-observations.json), sin fallos: home con canonical `/`, robots, llms, sitemap index y los once destinos documentales de llms. HEAD sin body, MIME, Link exacto y los cuatro headers de seguridad coherentes. Robots coincide byte por byte con el source promovido, SHA-256 `1804644940a3594aa6b1b52db1b5905a995c7364fbc7174b0909b9fa8e1511f5`; llms coincide con los builds auditados, 3516 bytes y SHA-256 `aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e`. Se preservan ambos textos y sitemap junto al informe. Las observaciones de cache de F1 no acreditan negociación Markdown ni aislamiento CDN de F2.

## Evaluación real — P02/P03

Se ejecutó exactamente una solicitud content y una all-ui, después de P01, mediante el CLI F0 inalterado y Node --use-env-proxy. Ambos scans están complete, sourceCommit real del checkout limpio `34517cfd…`, dirtySource=false y errors=[]; no hubo reintentos. [Captura content](live-content/summary.json), [captura all-ui](live-all-ui/summary.json), requests, responses originales, metadata y manifests se preservan byte a byte.

| Perfil congelado | Antes LIVE F0 | Después LIVE F1 | Denominador | Pass / fail / neutral | Nivel después |
|---|---:|---:|---:|---|---|
| Content Site | 43/100 | **71/100** | 7 | 5 / 2 / 15 | **2/5, Bot-Aware** |
| All Checks, all-ui | 20/100 | **33/100** | 15 | 5 / 10 / 7 | **2/5, Bot-Aware** |

[Comparación content](comparison-content.json): comparable=true, razones vacías, +28 puntos. [Comparación all-ui](comparison-all-ui.json): comparable=true, razones vacías, +13 puntos. Los hashes de request de cada perfil son idénticos a LIVE F0. Se conserva universo, selección, regla de puntuación, clasificación de comercio y denominador. Los únicos cambios son `contentSignals` y `linkHeaders`, fail → pass. `robotsTxt`, `sitemap` y `robotsTxtAiRules` siguen pass. El conteo neutral incluye controles devueltos por el evaluador que no puntúan en el perfil.

## Continuidad

F0 mantiene aceptación PASS 3/5; SDD F1 PASS 2/2; implementación F1 PASS 1/5. Esta verificación posterior de publicación no consume una revisión de código ni cambia sus informes. Issue #50 continúa cerrado.

F2 permanece planificada: debe concretar proyección íntegra del corpus, paridad de avisos de herramientas, negociación Accept, validadores y preview pública antes de lanzar Luna 6 alto. Los dos controles de contenido pendientes son DNS-AID y negociación Markdown; no se anuncia que ya existan.
