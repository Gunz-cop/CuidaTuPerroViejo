# Cierre arquitectónico F1

Fecha: 2026-10-05. Responsable: coordinador de arquitectura y SDD. **F1 aceptada técnicamente, sin promoción a producción.**

La [auditoría independiente de implementación](auditoria/auditoria-f1-implementacion-r1.md) da **PASS 1/5**, I01–I09 satisfechos y cero bloqueantes. El informe se preserva byte a byte, SHA-256 `26b77e5fc9a0425c876aa290c7d6477a9e44c14de1f1323211d9fa97096ac547`. SDD F1 mantiene PASS 2/2 y F0 mantiene PASS 3/5; sus contadores son distintos. Issue #50 se cierra por implementación, no por publicación.

Este registro separa la aceptación de implementación de su publicación. El código entregado permanece congelado en el [PR #51](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/51); esta rama añade únicamente documentación. La entrega original se conserva como evidencia histórica y no se reescriben sus resultados locales.

## Identidad y comprobaciones remotas

| Objeto | Identidad |
|---|---|
| Base normativa de implementación | `0b7c0e127fc3beac099ff577a570db9c75d56441` |
| Entrega publicada auditada | `28749e3e31d9d04adb32561af4e3da4e5870a9e4` |
| Entrega local equivalente | `9c0e86f326a9df39b903e68a38ae7610d5eb936a` |
| Tree idéntico de ambas entregas | `4bec1493f49c0009b7499f48bd0cdcfe4affefa6` |
| Source real de las mediciones del programador | `252e4df137492c6c74562480584acc8b7a09d811`, limpio |
| Tree del código medido, también final | `dad7d9e54d744517bfdce5379cb73d4c23669a51` |

El coordinador verificó mediante el endpoint público de checks del commit final que [CI, run 37372045523](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37372045523), job `111971352731`, y [Workers Builds, check 111971558055](https://github.com/Gunz-cop/CuidaTuPerroViejo/runs/111971558055), están `completed/success`, ambos con `head_sha=28749e3e31d9d04adb32561af4e3da4e5870a9e4`. No se utiliza el CI de la SDD o de un antecesor para acreditar esta entrega.

## Resultado público pendiente

La política elegida es `search=yes, ai-input=yes, ai-train=no`. F1 construye `llms.txt` desde el HTML del mismo build y entrega descubrimiento mediante Link en assets y middleware. Mantiene el stack y las URLs existentes. No incorpora todavía lectura Markdown ni APIs nuevas.

P01–P03 siguen pendientes: requieren promoción autorizada, comprobación HTTP pública y dos scans con los perfiles F0 congelados. El éxito de Workers Builds de una rama no acredita publicación de esos cambios en el dominio de producción. No se declara mejora de puntuación: la última medición pública sigue siendo 43/100 Content Site y 20/100 All Checks, nivel 1.

## Reversión y siguiente fase

Los commits publicados mantienen la política separada del descubrimiento: `644f50225e2f00969bf70fa499e566153668d497` contiene solo robots; `dc304c73044fd19976f98300334f75739ba2a8ea` es el commit de descubrimiento y su padre es el de política. Revertir descubrimiento conserva la preferencia del propietario. La promoción debe conservar estos commits mediante merge, sin squash ni force-push.

F2 requiere su propia SDD auditada sobre una base fija derivada de esta entrega. La preparación de paridad de herramientas, negociación HTTP y preview pública no autoriza programar contratos incompletos. Se conservan el máximo de cinco auditorías por implementación y el mecanismo de `[SDD bug]` ante huecos normativos.
