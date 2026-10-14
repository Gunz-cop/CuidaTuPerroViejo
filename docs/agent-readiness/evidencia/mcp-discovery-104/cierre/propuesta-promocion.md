# Propuesta concreta para terminar el correctivo104

**Listo para decisión del propietario:** publicar exactamente el candidato auditado **7e389a83c87cd5f14537f4b07f0cd783ca572251**, tree **6a2c50cc3e28c30389668bd70070b8cb545c36bd**, mediante fast-forward de main desde **b2ab1082c02799dab4306a7c167a6114c0163a90**, sin force. R2/5 PASS, CI/Workers y CommitPreview de ese SHA ya pasaron; no se repiten sus matrices ni gates. Esta propuesta no ejecuta publicación.

La autorización vigente cubre el fixture concreto105 y la continuación. **main/producción requiere autorización concreta pendiente** conforme al contrato ratificado §6. La rama documental de cierre no es el candidato de publicación y no se integra automáticamente. Si main, candidato, receipt o base cambian, detener y revisar la identidad/diff; no transferir el dictamen a otro árbol.

Una vez autorizada, coordinación realiza estos pasos:

1. Verificar refs/identidad/base y que el candidato/tree/receipt/revert son los revisados, sin nueva implementación ni matriz. Publicar7e389 por FF desde b2ab.
2. Esperar el receipt real de **producción** para7e389; el receipt55ccf415 de preview no se presenta como producción. Ejecutar una sola smokeproducción independiente con el verificador ya aprobado, cap24 contando tráfico automático, sin retries/redirects y raíz nueva de originales.
3. Si falla esa smoke, conservar originales, revertir mediante FF al commit específico **0f3c03ef72a5f53d268d354bc7b3210d01e0674a** sólo si main sigue exactamente7e389 sin deriva, y STOP sin scans. La reversión es hija de7e389, restaurada/ensayada localmente, y conserva F4B/documentación. Si main deriva, revisar antes de aplicar, sin force.
4. Si pasa, ejecutar **una medición `content` y una `all-ui`**, exclusivamente con la CLI y perfiles congelados; conservar solicitudes/respuestas originales, resumen y comparaciones de universo, score y nivel. Declarar `checks.discovery.mcpServerCard.status=pass` sólo ante la respuesta real. Un fail/regresión conserva resultado y bug/STOP según contrato; no cambiar selección ni repetir scans para ocultarlo.
5. Archivar receipt/smoke/mediciones y cerrar D08 con su resultado real. No afirmar incremento de puntuación, nivel general a partir del perfil parcial ni schema validado del descriptor.

Comandos de promoción y reversión propuestos, **NO ejecutados**, después de autorización y guardias de identidad:

```bash
git fetch origin main agent-ready/mcp-discovery-104 agent-ready/mcp-discovery-104-rollback
# Exigir origin/main=b2ab108... y candidato7e389/tree6a2c50cc; no usar HEAD de la rama documental.
git push origin 7e389a83c87cd5f14537f4b07f0cd783ca572251:refs/heads/main

# Sólo ante smokeFAIL, y tras exigir main=7e389 sin deriva:
git push origin 0f3c03ef72a5f53d268d354bc7b3210d01e0674a:refs/heads/main
```

Smoke propuesta con el **receipt propio de producción**, output nuevo y expectativas del candidato ya construidas:

```bash
node --use-env-proxy scripts/agent-readiness/mcp-discovery-104.mjs run --expected /workspace/discovery104-originals/expected-7e389.json --base-url https://cuidatuperroviejo.com --receipt /workspace/discovery104-originals/receipt-7e389-production.json --mode production --out /workspace/discovery104-originals/production-smoke-7e389
```

La CLI congelada sigue `scripts/agent-readiness/index.mjs` SHA-256 `e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438`, `shared.mjs` SHA-256 `89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`, perfiles exactos content7/all-ui20. No hay nueva CLI ni reconfiguración de scoring. Las curaciones históricas de baseline y los raw HTTP históricos ausentes conservan sus límites.

**Estado actual D08: pendiente, sin producción ni score nuevo.** C09/noDet, deadline externo y antecedentes F4B permanecen como fueron aceptados; este cierre no los convierte en PASS ni amplía el trabajo a WAF/UI/SDK/tools/límites.
