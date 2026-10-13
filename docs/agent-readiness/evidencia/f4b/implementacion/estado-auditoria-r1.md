# F4B — estado tras el dictamen R1/5

2026-10-13. Producto auditado fijo `e6897f38fa3c80913d66ab7b044929b003a0abb5`, tree `ff2466e4132077a7348b9e7e324fcad5f97a67ee`. Mismo auditor independiente Sol/high de SDD; implementación R1/5 FAIL finalizada. No PASS global ni promoción.

**Corrección de afirmación del autor:** README/resumen inicial dijeron todos28IDs. Es incorrecto: mcp-client.mjs recorrió sólo la página default20 de catalog. Los resultados originales siempre registraron20. El auditor lo detectó y se comunicó expresamente al propietario. C05 está pendiente/FAIL, bug[#96](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/96); quedan ocho lecturas por acreditar. No modificar originales ni convertir el PASS de casos cubiertos en un PASS de cobertura completa. Corregir paginación y cotejar universo exacto después del informe formal, dentro del contador del mismo issue90.

CI del snapshot PASS:82tests TS,66offline y todos los gates del workflow; receipt real [archivado](receipt-e6897f3.json). Preview378d1f4a:122exchanges MCP reales, UI36/36, WebMCP91/91; son resultados sobre los casos ejecutados, con cobertura20IDs. No prueban producción. Primeros fallos del proxy permanecen privados;[#94](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/94) se resolvió al usar proxy/CA de sesión, Node NODE_USE_ENV_PROXY=1 y navegador con confianza TLS acotada al SPKI de esa CA (sin bypass general). No cambió producto ni harness F4A.

Identidad bug[#95](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/95) **STOP confirmado en dictamen R1/5 FAIL**:80/81assets exactos. Única diferencia numérica startedAt Date.now() de contacto sin cambios F4B, fuera corpus28; [diagnóstico](identidad-diagnostico.json). Conservar FAIL original y no retirar checks ni sustituir hashes. Auditor dictaminó I-B3:80/81 no satisface C12 byteexacto, STOP esencial confirmado.

[Rollback local](rollback-local.json) PASS8/8 en workerd del commit real `a1fa4ef755e650b1536890f4ba60045f83f77a00`, tree idéntico a base ratificada. Retirada endpoint/card y referencias; búsqueda, lectura y dos cálculos F4A funcionan. Este ensayo no demuestra rollback en producción y no lo autoriza.

[Índice de originales](indice-originales-preview.json). Los documentos de este estado se incorporarán a una entrega posterior sin atribuirlos al snapshot de producto ya fijado. Cierre final documental F4A/análisis de integración, gates finales y autorización de main separados. F5/F6 pendientes sin cambios; política search=yes, ai-input=yes, ai-train=no intacta.
