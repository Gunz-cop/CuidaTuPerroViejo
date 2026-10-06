# Cierre y ratificación arquitectónica F0

Fecha: 2026-10-05. Responsable: coordinador de arquitectura y SDD. **F0 aceptada técnicamente; sin promoción a producción.**

La [auditoría independiente R3](auditoria/auditoria-f0-implementacion-r3.md) da PASS 3/5, cero bloqueantes y C01–C12 satisfechos. Se conservan R1 y R2; no se reinicia el contador. Issue #43 y [PR draft #48](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/48) registran el cierre de implementación, separado del despliegue.

| Identidad | Valor |
|---|---|
| Base normativa de la ejecución | `4dced4155788af926ef7b4e3d2d7e8259e1978be` |
| Entrega local | `2c30a7ec8f3f104dfe1d664d659e55e998f5dfa7` |
| Entrega publicada | `6c74dbc5a61decee96465b5b6ab2c10a2ddb094c` |
| Tree idéntico, verificado por Git | `505eff7447cd7f637cd0f700a5c07cfd9e7a35fc` |
| Spike aislado final | `926f3c0e2929ac9ad6caaca8d16c88b301f446b7` |
| Runtime probado del spike | `4d0863c67e147027cf734e8333f978be5bcbe285`; el commit final solo corrige identidad de fixture |

CI del HEAD publicado: [run 37333440890](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37333440890) success y [Workers Builds 111842606233](https://github.com/Gunz-cop/CuidaTuPerroViejo/runs/111842606233) success. No se atribuyen esos checks a otro SHA.

## Decisiones del coordinador

Estas decisiones ratifican las [cinco propuestas del implementador](decisiones.md). El código del spike permanece fuera del producto; las decisiones se incorporan mediante specs posteriores.

| ID | Decisión ratificada | Evidencia y límite que conserva |
|---|---|---|
| D01 | Mantener Astro 7 estático y el adaptador 14. F2 usará un entrypoint propio que delega al handler vigente `@astrojs/cloudflare/handler`. Worker-first se limita a las rutas documentales generadas y `/api/*`, `/admin/*`; no se activa globalmente. F1 conserva el entrypoint actual. | Build compilado y 40 checks workerd del spike. F2 debe verificar todo el corpus y preview pública; no copiar el spike como entrega terminada. |
| D02 | Generar desde HTML construido mediante integración `astro:build:done`, en `config.build.client`, antes de empaquetar. Si se utiliza inventario completo, colocar la integración después de sitemap. Un error hace fallar `npx astro build`; sin postbuild, red externa o indexación. | Build positivo, negativo y dry-run del spike. El orden de hooks del Astro instalado es secuencial; F1 verifica expresamente sitemap antes del generador. |
| D03 | Selección DOM por tipo de documento, H1 editorial independiente de main cuando corresponda, conservación de avisos, FAQ cerradas y fuentes; excluir nodos concretos de UI/ads/scripts, sin descartar todos los aside. | Siete fixtures y manifest permanente corregido. F0 no entrega un serializador completo: F2 congela las reglas y verifica las rutas restantes. |
| D04 | Preferir representaciones precompiladas servidas por ASSETS en paths distintos. Negociación con `Vary: Accept` y validadores por representación. No añadir una Cache API propia para esas páginas sin necesidad demostrada; si una ruta sí usa caché propia, su clave distingue formato y no guarda Authorization. | Alternancias y ETag/304 probados. Las páginas del spike no atravesaron Cache API: no se observó HIT/MISS. CDN, TTL/purga y alternancia pública quedan como gate de F2. |
| D05 | Identidad semántica estable: `home`, `pillar--<slug>`, `article--<slug>`, `tool--calidad-vida`, `tool--movilidad`, `page--acerca-de`, `page--politica-editorial`. Canonical distinto de path de representación; índice v1 y allowlist explícita. El inventario construido es la autoridad común. | Inventario valid de 34 HTML/28 documentos en esta base. 28 es baseline, no límite de crecimiento: F1 reemplaza esa comprobación por correspondencia exacta con las fuentes públicas. F2 fija schema completo del índice/Markdown. |

## Resultado y continuidad

Los dos scans LIVE originales siguen siendo 43/100 Content Site y 20/100 All Checks, nivel 1. Proceden de la producción observada con sourceCommit `35e767647a05034baa3b4e371bee4f7a3849545d`, dirtySource=false y deploymentCommit=null. No demuestran cambios de esta rama en producción. Sus bytes y procedencia se conservan.

F1 puede desarrollarse sobre la entrega aceptada y su SDD auditada sin desplegar. La publicación y medición posteriores son un gate separado. F2–F6 siguen en planificación hasta tener sus propias specs. El cierre de F0 no modifica retrospectivamente su normativa fijada ni concede permiso para promocionar la cadena de PR a main.
