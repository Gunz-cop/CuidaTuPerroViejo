# Resultado final — correctivo104 publicado y verificado

Fecha2026-10-14. **All-ui general:73/100, nivel5 Agent-Native. Content Site:86/100, nivel5 parcial.** Se completó D08 con producción/smoke/mediciones reales, sin ejecución adicional para este archivo documental.

## Publicación y smoke

El propietario autorizó literalmente **«Autorizo»** la [propuesta concreta8f27b51](../propuesta-promocion.md). [Guardias y autorización](authorization-and-prepromotion.json) precedieron al [push FF](promotion.log): main pasó deb2ab1082c02799dab4306a7c167a6114c0163a90 a **7e389a83c87cd5f14537f4b07f0cd783ca572251**, tree **6a2c50cc3e28c30389668bd70070b8cb545c36bd**, sin force ni cambios de fuente. [PR106](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/106) quedó merged con merge_commit_sha7e389 exacto; [original](pr106-merged.raw.json). La rama documental de cierre no se promovió.

[Receipt propio de producción](receipt-production.json): Workers Build **8d1bf392-1efb-4a80-b045-2c66d21a45d5**, VersionID **4fad00fc-f88e-4abc-878c-f7d50742f069**, check115995845983 completed/success17:19:33UTC para7e389. No contiene Preview URL; es distinto del previewb45f8c12/version55ccf415, cuya evidencia mantiene su propio alcance.

[Smoke real de producción](smoke/result.json),17:20:39UTC: **PASS20/24**, Node24.19.0 y SDK2.3.1 reales, sin retries ni redirects. Comprueba ambas cards GET200/HEAD200sin cuerpo, MIME/cache/CORS/nosniff y hashes exactos; initialize/list ambas eras, discover moderno, identidad/capabilities y cuatro herramientas; cuatro calls modernas con paridad API, lectura íntegra/hash, QoL35/compromised, movilidadsevere/stressed; robots/política y Origin:null403. Descriptor233bytes/hash`efd754491893bb08e2e76456d2f18acb9899694e4c8c4fe0445ee93be284a092`; card nativa559bytes/hash`aeea988a8e92d68085716e88755dae917215708953bbd0002a80ebd576ae1f84`, preservada.

[Originales HTTP completos](smoke/http-originals.json):17statuses200, initialized202, GETautomáticoSDK405 y Origin403; **19EOF y1AbortError intencional después de un frame SSE completo/id coincidente**, no veinteEOF. Sin truncación ni request incompleto. Cuerpos/base64/bytes/hash/headers y terminal real se conservan. [Integridad mecánica](integrity-verification.json) no constituye otra auditoría o petición HTTP.

La [ejecución](smoke-execution.json) declara `rollbackTriggered:false`. La reversión específica **0f3c03ef72a5f53d268d354bc7b3210d01e0674a**, tree2553b9fbe96711e7cc72138174f3a13051476066, permanece preparada/ensayada localmente8/8; no se ejecutó ni publicó en producción. Preserva F4B y documentación; no utiliza el revertF4B14e3bed.

## Medición y procedencia

Una sola ejecución por perfil desde fuente limpia7e389, después del smokePASS, mediante CLI y universos congelados. No retries, selección mutada ni repetición para obtener otra puntuación. Requests/responses/metadata/summaries/manifests y comparaciones se copian literalmente; los envelopes conservan `deploymentCommit:null` como fueron generados, sin rellenarlo. La identidad de publicación se acredita aparte por receipt y main real.

| Perfil | Estado | Score CLI | Nivel literal del evaluador | PASS / FAIL / neutral | Comparación |
|---|---|---:|---|---|---|
| content,17:21:52.212UTC | complete |86/100 |5 Agent-Native, parcial de contenido |6 /1 /15; scoredTotal7 |comparable=true,delta0,sin cambios |
| all-ui,17:23:02.101UTC |complete |**73/100** |**5 Agent-Native,general** |11 /4 /7; scoredTotal15 |comparable=true,**delta+6**,único cambio mcpServerCard fail→pass |

El raw del evaluador **no contiene un campo numérico score**. La CLI congelada calcula `round(pass/scoredTotal*100)` mediante `pass-over-counted-round/1`:11/15→73 y6/7→86; los niveles5/Agent-Native vienen literalmente de los raws. Se reportan nivel y puntuación por separado, sin atribuir al raw un score que no tiene.

[Respuesta original all-ui](live-all-ui/response.raw.json), [summary](live-all-ui/summary.json), [comparación](comparison-all-ui.json): `checks.discovery.mcpServerCard.status=pass`, mensaje **MCP Server Card found at /.well-known/mcp/server-card.json**. [Respuesta content](live-content/response.raw.json) conserva el mismo hallazgo como neutral por exclusión del perfil. La nueva ruta es descubierta; esto no acredita validación contra un JSON Schema inexistente en la guía ni revela el algoritmo privado del parser.

Los requesthashes son byteidénticos al baseline histórico: content`94daf42c1ee9ecfce1528d303e4b19d35e7544d8d38b6ac72ff56436708d2c21`; all-ui`d7533cffd3ab7c60b2e1ef9ac0a5c96cf6a0631192a16d2f5ba76194ab8fff8a`. Baseline público curadoF4A archivado desdea42a185, summaries source2b6f41c8:86content/nivel5parcial y67all-ui/nivel4general. Sus rawHTTP históricos siguen ausentes en este workspace; no se fabricaron. Las comparaciones no detectan regresiones ni cambios de universo; único cambio de control general es MCPfail→pass. No se infiere una regla causal privada del nivel5.

CLI intacta: index.mjs SHA256`e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438`; shared.mjs SHA256`89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`; perfiles exactoscontent7/all-ui20. Las neutralidades se contabilizan tal como establece esa CLI, sin denominador selectivo.

## Cierre y límites conservados

**Correctivo104 completo; D01–D07 aceptados por R2/5 PASS y D08 ejecutado/verificado con sus resultados reales.** No nueva auditoría ni pruebas/HTTP/scans de cierre. R1/5PASS→R2/5PASS, mismo auditorSol/high distinto del autor, contador intacto; STOP105 y tresFAIL originales preservados. ÍndiceR2 y118 originales permanecen íntegros, no reemplazados por el índice nuevo de producción.

Restan cuatro FAIL generales: DNS-AID, OAuth discovery, OAuth Protected Resource y auth.md; pertenecen a otros alcances. F4B R1FAIL/R2FAIL/R3PASS permanece aceptada, C09 remoto no determinable con limitación aceptada sigue NO PASS/sin protección efectiva acreditada, deadline externo pendiente/no bloqueante/no deuda/NO PASS y WAF103 separado. No cambios de SDK/transporte/tools/límites/WAF/UI ni schema nuevo declarado válido.

[Índice de originales de producción](indice-originales.json): lecturas públicas, sin cookies/credenciales, archivadas byteexactas. [Manifest global actualizado](../manifest.json) registra este cierre documental separado. Producto/main/PR siguen exactamente7e389; un build automático de la rama de cierre no hereda este receipt ni se prueba contra HTTP.
