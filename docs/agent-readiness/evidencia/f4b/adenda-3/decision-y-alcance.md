# Adenda 3 — prueba externa del deadline pendiente y no bloqueante

## Decisión del propietario

Texto recibido el2026-10-14:

> Que la hago después. La prueba no la considero bloqueante. Continúa sin eso.

Se aplica a la prueba externa del deadline ya admitida para elpreview927916b4. La decisión anterior la conservaba pendiente/no deuda, pero impedía R3 antes de recibirla; esta decisión sustituye **sólo** esa condición de cierre y orden de trabajo. No introduce cambios de producto, SDK, protocolo, deadline, estado ni evidencias simuladas.

## Sustituciones normativas precisas

1. SDD `docs/agent-readiness/fases/f4b-mcp-remoto.md`, §8 pruebas/remoto y §9 criterioC09/C13, únicamente donde la evidencia remota del deadline era requisito previo a cierre/auditoría; encargo de adenda2 §2 punto4 y §6 punto1, únicamente la comprobación de deadline y petición posterior como gate obligatorio previo; suplemento de adenda2 sobre excepción500, únicamente obligatoriedad previa de ejecutar elcaso: el caso externo queda **pendiente de ejecución, no bloqueante y no deuda**, por decisión expresa. No convertirlo enPASS.
2. Decisión sobre384f520, punto4 «Después del deadline: con el resultado archivado, prepara el paquete paraR3/5», y órdenes derivadas en decision-owner-384/paquete-r3-pendiente.md y cierre-preparado/estado.md: se sustituye la precondición de recibir el resultado externo por **R3 puede iniciarse sin esa prueba**, con su ausencia declarada yesta decisión incorporada. Los documentos anteriores permanecen históricos intactos.
3. Condiciones de integración/publicación afectadas exclusivamente por este caso remoto diferido: no exigir su ejecución como gate previo; todoslos demás gates, dictamenR3, revisión de base/identidad/revert y autorización aplicable siguen vigentes. Estaadenda por sí sola no es PASS de implementación ni ejecución de merge/publicación.

## Lo que permanece vigente

- Contrato funcional deldeadline10s, cancelación proactiva de salida, cuotas/cap y protección del trabajo residualF3 sin modificación. Evidencia local de esas propiedades conserva sus límites.
- Si el propietario ejecuta después el verificador admitido: una sola ejecución≤6requests, mismo tarballSHA2562ab84cd380f9bde3fb3bbfcac75d5ae2b583884cf5fddd49640e6b1b1a50673a,500RPCexacto entre10–12s y recuperación inmediata. FAIL implica STOPsinvariantes según eseencargo; no anticiparresultado ni alterarasserts.
- C09cuotas90/91,120/121,cap2/3 aceptadas como noDetconlimitación, noPASS; WAFissue103 separada sinimplementaciónF4B.
- 50315.033s EnvoysinCf-Ray previo clasificado porpropietario como corte delproxy deejecución, noFAILproducto/Cloudflare; originales intactos,no reintento desdeeseentorno.
- R1/5 yR2/5FAIL intactos, siguienteR3/5 al mismo auditor /root/f4b_auditor Sol/high. No reiniciarcontador ni auditor. QuintaFAIL=>STOP. SDD ysu historial,adendas1/2 yoriginales no se reescriben.
- Sin scans/score,F5/F6 fuera, search=yes/ai-input=yes/ai-train=no; herramientas públicas sin efectos/autenticación/comercio.

## Estado de admisión

Propuesta documental que registra decisión expresa delpropietario. Solicitar al mismo auditor admisión independiente sólo bloqueantes sobre fondo/coherencia, sin consumir R3 por esa consulta. Trasadmisión registrar vigencia prospectiva yentregar snapshot/evidencia fijos paraR3/5. No exigir autorización nueva para la excepción ya concedida.
