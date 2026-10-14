# Rollback preparado antes de integración

Base final aceptada de producto F4A: cb8e10f1ead55ef0dafc666672cd3003252afc59, confirmada como main mediante lectura de ref. No se modifica main. Worktreepropio `/workspace/ctpv-f4b-rollback-a2`, rama `agent-ready/f4b-rollback-a2`.

Commit real preparado: **d6f4bddc6b1325f49aac0736a2fbfd0707a0c918**, tree **6a6f20213fabae745dfc8490b6b75cc748a1280b**. Patch retira23archivos/deltas de producto,SDK/harness/testsF4B, restaura src/public/scripts/tests/package/lock a cb8e10f; conserva todos los documentos/historialesdeauditoría. API/UI/WebMCP/F3/F4A se preservan byteexactos a base aceptada. No es un ensayo HTTPnuevo ni un deployrollback; el ensayoR1a1fa4ef8/8local queda histórico con su alcance.

Comando previsto sobre checkoutlimpio de main despuésdepromociónautorizada, si fallael smoke:

```sh
git cherry-pick d6f4bddc6b1325f49aac0736a2fbfd0707a0c918
git push origin HEAD:main
```

Push disparará WorkersBuilds según flujo vigente. Confirmar nuevo build/SHA/version/receipt de reversión; no inventar identidad de un merge futuro. Antes del merge, revisar patchcontraentrega final y actualizarcommit si nuevosarchivosfuera delpatch afectanproducto; verificar source y configuraciónfinalF4A y autorización. Aún no se ejecuta este comando ni se publica la rama de rollback.

Este commit se prepara sobre a66d391 (evidenciaadmisiónA2pendiente); nuevasfuentes de captura/harnessremoto que no existían allí deberán declararse/retirarse en la versiónfinaldelpatch. No repetir matrices históricas ni atribuir testsR1 como pruebas deeste nuevo tree. Pruebas/identidad/receipts de rollback que exija SDD deben quedar explícitas en la entregaR3 antesdepromoción.
