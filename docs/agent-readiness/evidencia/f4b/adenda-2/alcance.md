# Alcance de la adenda2 y admisión pendiente

El archivo decision-propietario.md conserva el texto del encargo del propietario. La adenda se aplica sólo a F4B y no reescribe SDD/fallos/informes/normas anteriores. El cierre local tiene estado «limitación del entorno local, documentada», **noPASSretrospectivo**. La asignación a patrónCloudflare es decisión del propietario; los originalesacreditados/capturas mantienen su nivel de evidencia, sin atribuir causalidad nativa exacta no medida.

Sustituciones precisas:

- SDD§8 párrafos de pruebasunitario/SDK/workerd y local/preview, §9C08/C09 y referenciasderivadas C13: pruebaslocales yaacreditadas se conservan; el resto de controles enumerados se verifica en CommitPreviewreal. Sustituyeexclusivamente la prohibición de suplir ese gate local porpreview paraF4B, conservando todos los controles y criteriosdeefectos.
- Las disposiciones deSTOP dependiente deC08local/bug100 de R2 y encargos posteriores permanecen históricas; su vigencia prospectiva se sustituye por §5delnuevoencargo, máximo3intentos/2horas porbloqueo. No cambia contadorissue90/R3quintaFAILSTOP ni presupuestos anteriores.
- InterpretaciónC09 enplataforma:90/91y2/3 no deterministas se registran noDeterminable, noFAIL/PASS; aceptación requiere decisiónexpresa posterior del propietario con la evidencia, no se presupone enestaadmisión.
- Condiciones de integración/publicación prospectivas: §6delencargo concede autorización condicionadaaPreviewgates/decisiónC09/R3PASS/rollbackpreparado/smoke≤20. No habilita main ni tráfico deproducción antesdeesosgates ni puntuar/scans.

Producto192dcdd sin cambios; SDK2.3.1/Nodefetchreal remoto, UAidentificado. RootHTTPpathswhitelist: /api/mcp, /api/mcp/server-card, /api/agent/v1/* ydiscovery; no followlinks al dominio deproducción. Presupuesto≤320sinretries/redirects paraejecución decontrolespendientes; arreglos deharnesspermitidos según§5con originales/intentos ydeadline2horas documentados, sinbuscar429porreintentos. No introducirinstrumentación ni cambios debindings/session/administración alproducto.

Hueco de interpretación detectado antesdeejecución: SDD/15tests vigentes muestran deadlinebodyabierto10s→500RPCsanitizado/recuperación comoresultado esperado; §5nuevoencargo ordenaSTOPante500delproducto. Se preguntó al propietario si sóloese500contractual tieneexcepción. Queda pendiente surespuesta, sin redefinir código ni forventativas. Preparación yvalidación deadmisión pueden avanzar; no ejecutarparte dependiente deesa interpretación sinresolverla.

Auditor validaadmisión de fondo ycoherencia, **noR3 nireset**. Los cambiosnormativos deestaadenda no autorizan programación deproducto. Serávigenteprospectivamente trasadmisión y aclaraciónesencial, manteniendo textooriginal ysuplemento separado si hayaclaración.
