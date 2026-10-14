# F4B — R3/5 PASS y producto publicado

Producto auditado y publicado: **b2ab1082c02799dab4306a7c167a6114c0163a90**, tree **59dd444439b4f78018eba4a010b25840c4bdd87b**. Base final F4A: `cb8e10f1ead55ef0dafc666672cd3003252afc59`; cierre documental aceptado: `a42a18522b7cf4143aff56d11d4632dc3c1050da`. Búsqueda, lectura, cálculos, metodología, UI/WebMCP y OpenAPI existentes se preservan.

Mismo auditor independiente `/root/f4b_auditor`, Sol/high: **R1/5 FAIL → R2/5 FAIL → R3/5 PASS**. Una interrupción por límite de uso se reanudó dentro de la misma R3, sin dictamen nuevo ni reset. Informe literal: [implementacion-r3.md](../../auditoria/implementacion-r3.md), 20004bytes, SHA256 `a4698735e851fbb6c1a7f9ece1ac9f2206b28b2985b75c184c9b059dae1c75d9`. SDD ratificada, adendas1–3, decisiones del propietario y originales históricos intactos.

| Estado | Evidencia y alcance |
|---|---|
| Local | Ambos protocolos y cuatro tools; catálogo20+8/28lecturas/hash; paridad; corrección de output/cancel/recuperación/trabajo residual. Las matrices locales fallidas siguen FAIL y se admiten como limitación de entorno, no PASS retrospectivo. |
| Preview final | SHA b2ab108; build0294af69-8878-451c-846b-04c6ddd3bc3c; versión5a43d748-8268-4770-868d-e8d7109cfa5b. C12 PASS: **80 byteexactos + contacto con equivalencia restringida**. SDK real10requests: initialize/list ambas eras y cuatro llamadas modernas/readhash/paridad con API192. |
| Producción | Mismo SHA auditado; buildc4d174a4-0e9d-450c-ac85-ae76fd331057; versiónc687a397-dff5-4821-84e6-a7ed2a8788c9. [Smoke real14/20 PASS](../../produccion/README.md), cuatro tools, ambas eras, lectura/hash, card/ARD, política y Origin403. |

Las matrices completas anteriores mantienen sus SHA y alcances propios. El perfil exitoso de cuatro tools del producto192 conserva sus mediciones CPU/heap: no se promete CPU facturable, picoRSS, coste ni viabilidadFree. La captura final de listado legacy tiene el mensaje SSE completo validado y un aborto de Client.close antes del EOF. En producción hay dos cierres intencionales equivalentes; no afirmar diez/catorce EOF completos.

C09 sigue con estado mixto aceptado, **no PASS global**: cuotas/cap remotos no determinables con limitación porisolate; deadline externo pendiente/no bloqueante/no deuda/NO PASS por decisión explícita y adenda3 admitida. WAF [#103](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/103) propone mitigación de plataforma y no se implementó en F4B.

Herramientas públicas de lectura/cálculo, sin autenticación, comercio, escrituras administrativas ni lectura arbitraria de URLs. Política verificada: **search=yes, ai-input=yes, ai-train=no**. No scans ni score F4B;73general permanece una previsión histórica. F5/F6 fuera.

Rollback actualizado: **14e3bed40fcfab672ff4d81ba524f16ffc64e522**, tree **3c9f1eca54a579ee6b63333cc1cfb74306e02895**, padre exacto b2ab108. Restaura26deltas a F4A, conserva documentos e historial; nuevo ensayo local8GET PASS y puerto liberado. d6/598históricos intactos. **No ejecutado en producción**. Sobre esa identidad limpia, comandos preparados:

```sh
git cherry-pick --ff 14e3bed40fcfab672ff4d81ba524f16ffc64e522
git push origin HEAD:main
```

Si cambian refs/source, revisar antes; no revertir cambios concurrentes a ciegas. La promoción y el smoke tuvieron un coordinador que ejecutaría inmediatamente este revert si fallaba, sin diagnóstico de producción.

El verificador externo sigue admitido para una sola ejecución posterior≤6 contra927916b4, con tarball intacto, Node24.19/SDK2.3.1 y los criterios500exacto10–12s/recuperación inmediata; si falla, STOP sin variantes conforme ese encargo. Presupuesto preview **314/320**, seis reservadas; producción separada **14/20**. No ejecutado ni convertido en deuda o PASS.

Curación en rama propia `agent-ready/f4b-cierre`; no se promueve ese SHA documental ni se le atribuye el receipt de main. No modifica producto/configuración ni el worktree o los contratos ratificados F4A.
