F3 añade catálogo, búsqueda léxica y lectura íntegra de los 28 documentos, con OpenAPI, una skill pública y manifiestos ARD. Integra su descubrimiento mediante Link y llms, conservando `search=yes, ai-input=yes, ai-train=no`.

## Candidato congelado

- Producto: **aad2a6624c24d7425c5ad5329b82c77a8a86b619**, tree **add06deb2647988846525fcfbeb5bb6b754b7006**.
- Main observado: **d2bd342050811d41ee212730cb11fe07783994bd**; no se ha promovido.
- Rama fija propuesta: `release/f3-aad2a662`. Este draft es la propuesta revisable; no autoriza promoción.
- La promoción solicitada conserva exactamente el SHA mediante fast-forward sin force. No usar merge/squash/rebase que genere otro SHA. Comprobar main y reglas de nuevo antes de ejecutar. Si cambian base, restricciones o candidato, detener y renovar admisión/gates afectados.

## Validación

SDD PASS R2/2; A PASS R2/5; B PASS R1/5; C PASS R1/5, cero bloqueantes. Autor C `/root` por petición explícita del usuario; auditor independiente fijo GPT-6.1 Sol/high.

CI del candidato [38174797432](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38174797432) SUCCESS. [Commit Preview verificada](https://dd2a6ab6-cuidatuperroviejo.g1721m.workers.dev): 117 peticiones, 28 lecturas íntegras byteexactas, dos recorridos descubrimiento→búsqueda→lectura→cita. Workerd autor y auditor también PASS117/28/2. Ocho artefactos F3/llms deterministas en dos builds autor y un build independiente. Manifiesto de350 archivos del build real, incluyendo HTML/CSS. Todos cuerpos originales conservados con SHA256/bytes; proyección pública declara omisiones.

El primer CI fallido por TMPDIR concurrente y el primer gate local503 por instancia huérfana están preservados, junto con corrección y diagnóstico. No se borraron con retries. Gate público único PASS.

## Alcance completo frente a main

271 archivos: 23 de producto/generación/tests/CI y248 documentales (incluyen el cierre histórico F2/bugs70–71 aún no presente en main, SDD y evidencia F3). El delta main→cierre F2 `67dacfec405935567f71b403cd80a56f5aebe952` es documental; ese cierre no es la versión F2 desplegada. El build real del candidato recoge el posible efecto de documentación sobre CSS/HTML.

Los informes y cierre C posteriores se archivan en `agent-ready/f3-c` y se enlazan mediante permalinks. **No forman parte del candidato de producto ni heredan sus hashes**. Publicarlos a main posteriormente requeriría una nueva admisión de su build.

## Publicación pendiente y rollback

La SDD §7 exige: «Tras C aceptada, el coordinador propone promoción concreta y obtiene autorización específica antes de main». Falta esa autorización para aad2a6624c24d7425c5ad5329b82c77a8a86b619. No se han ejecutado P3-01–03 ni C3-12, no se anuncia un score nuevo o nivel5.

Tras autorización: avanzar main exactamente al candidato sin force; obtener recibo real de build/dominio; ejecutar los gates finitos P3-01/02 de API/descriptors/skills/lecturas/headers/invariantes sobre producción con originales del mismo build, y exactamente un scan content y uno all-ui de P3-03 con perfiles/fórmula congelados. Conservar fallos y STOP sin retry, fallback ni ampliación de excepciones F2.

Rollback antes de publicar: no promover y conservar ramas/evidencias. Si fuera necesario después: preparar PR de reversión coherente C→B→A hacia producto F2 conocido, conservando política, lectura F2, contratos del asistente e historial; nuevo build comprueba retirada de rutas/referencias F3 y sin huérfanos. Solicitar autorización separada antes de promover rollback.


## Evidencia y aceptación publicadas

- [Informe C PASS R1/5](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/f48a82a37ac98627bb89e982e8c64228170a7080/docs/agent-readiness/evidencia/f3/auditoria/f3c-r1.md), SHA256 `c3c4bb7811880cc02dc9b634607bb9cd72282c1db82f750180a9e47c1178c257`.
- [Resultado y capturas curadas](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/f48a82a37ac98627bb89e982e8c64228170a7080/docs/agent-readiness/evidencia/f3/c/resultado.md).
- [Aceptación arquitectónica y candidato ratificado](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/e22da43ac1aa200dd606772f774182b5803ba76c/docs/agent-readiness/evidencia/f3/c/cierre-arquitectonico.md), SHA256 `daa4f71d98bb9db7c115c8171e912cceab5bba28fa96e1b2daf9a02e89f5294d`. Cierre documental `e22da43ac1aa200dd606772f774182b5803ba76c`, tree `b9ee1199eea454422600191cfc8a09e42620ec31`, separado del candidato.


CI específica de este PR contra main: [38194214000](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38194214000), **SUCCESS**, 26 etapas del job114633221295. Candidato y SHA permanecen idénticos al auditado. La preview funcionalmente verificada es la enlazada arriba; no se infiere identidad global de otro build a partir de metadata.

