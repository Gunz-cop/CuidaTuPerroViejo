# Rollback actualizado, sin publicación

La referencia histórica d6f4bdd permanece intacta. Para cubrir los tres nuevos archivos de harness/test posteriores, se preparó un nuevo commit en worktree/rama propios, fuera de main:

- Rama agent-ready/f4b-rollback-reanudacion, worktree /workspace/ctpv-f4b-rollback-reanudacion.
- Base17331169f98ad34747a9947615db200c4353e14d.
- Revert **5988ef374d953f8e49b013db39abff0c93fb81f2**, tree **b62bd353336cee2cea745c6f52480c34b6a64b35**.
-26deltas src/public/scripts/tests/package/lock restaurados exactamente a productoF4A **cb8e10f1ead55ef0dafc666672cd3003252afc59**; diffcontraesabase vacío para esosárboles yconfig. Conserva documentación/evidencias/historial. Sin modificaciones delworktreeF4A ni contratosratificados.

Comando preparado sobre mainlimpio tras promoción congates y si falla smoke autorizado:

```sh
git cherry-pick 5988ef374d953f8e49b013db39abff0c93fb81f2
git push origin HEAD:main
```

**No ejecutado, no publicado.** No es ensayoHTTP ni evidencia de unbuild/VersionID futuros. Revisar diffcontraentregafinal antesdepromover; cualquiercambiosourceposterior exigeactualizarcobertura. El ensayoR1 histórico sigueconalcance original, no seatribuye aestenuevo tree. GateC13/ensayoaplicable todavía depende de cierredeadline/R3/integración, sin repetir suiteshistóricas por esta restauración fuenteexacta.
