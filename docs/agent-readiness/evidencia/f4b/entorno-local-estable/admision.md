# Admisión expresa de toolchain externa

2026-10-14. El propietario autoriza literalmente «los tres pins solo para la toolchain externa ... fuera del repo, con lockfile propio, sin tocar package.json ni la configuración, con un solo arranque y STOP si falla».

Pins admitidos: Wrangler4.116.0, Miniflare4.20260730.0, workerd1.20260730.1; Node24.19.0. Ubicaciónprivada externa `/workspace/f4b-originales-privados/entorno-local-estable/toolchain`, lockfilepropio. Mantenerpackage/lock/config/deps/flags/bindings/stackproducto192dcdd y SDK2.3.1 intactos. No overrides ni parches de node_modules del repo, no bundlenuevo ni cambiarcompatibilitydate. El CLIexterno lee misma configuración del build existente; desconocido/incompatible→STOP, no adaptarconfig.

MismoauditorSol/high ya confirmó que requiere esta autorización explícita y no cambioSDD: §8 exigeWranglerlocal/workerdreal sin pin numérico; §2 protegeconfig/flags/depsproducto. Esa consulta no esR3 ni aceptación de entorno. Propuesta5a0cbd9 sigue como texto histórico; estaadmisión la habilita exclusivamente en el alcance anterior.

Instalarconlockpropio fuera repo, verificarpaquetes/Workerdreal/integridadesySDK, hashentryyconfig/manifests antesdearranque. Un único arranque --local (no remotebindings); mismoClient/StreamableHTTPClientTransport reales,harness235f666sin cambios, misma matriz320 sin retries/redirects, outputnuevoprivado separadosstdout/stderr/lognativo. Inicialización incompatible/FAIL→STOP sin versiónalternativa/reintento; PASS→evidenciafija yR3/5 mismoauditor, sinreset. No afirmarcompatibilidaduniversal ni causalidad de bug100 por unPASS.

R1/R2FAIL y originales intactos; se levantaSTOP sólo para esta prueba local acotada. STOPpublicación permanece: sinmain/integración/producción/scans ni cambiosloggingproducto. Nodefetchremoto intacto; guía-incidente y capturas de errores preservadas. Política vigente/F5F6 sin cambios.
