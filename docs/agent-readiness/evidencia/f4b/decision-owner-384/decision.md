# Decisiones del propietario sobre el estado 384f520

Recibidas el 2026-10-14. Texto conservado; no sustituye dictámenes ni originales anteriores.

1. C12: PASS registrado. Sin observaciones.

2. C09, cuotas 90/91, 120/121 y cap 2/3: aceptadas como «no determinables en plataforma», con limitación documentada. No son PASS. Constan como hallazgo: con 121 POST desde la misma IP y el mismo colo, ningún 429. El límite en memoria por isolate no ofrece una protección efectiva en Cloudflare. Para F4B lo acepto, dado que las herramientas son de solo lectura. Abre un issue aparte con este hallazgo y una propuesta de regla de Rate Limiting de Cloudflare (WAF) sobre /api/mcp como mitigación de plataforma, sin cambio de producto. No se implementa en F4B.

3. Deadline: el 503 de 15,033 s, sin Cf-Ray y con cuerpo de Envoy, se clasifica como corte del proxy del entorno de ejecución, no como resultado del producto ni de Cloudflare. No cuenta como FAIL del producto ni se reintenta desde ese entorno. Admito el verificador externo (verificador-deadline-externo.tar.gz, SHA256 2ab84cd3…0673a) en los términos de propuesta-runner.md: una sola ejecución, como máximo 6 peticiones, criterios sin cambios (500 exacto entre 10 y 12 s y recuperación inmediata). Lo ejecutaré yo desde mi equipo, con salida HTTPS directa, contra el preview 927916b4. Prepárame:

- los comandos exactos para Windows 11 (PowerShell), incluida la instalación de Node 24.19.0 si hace falta y la verificación del SHA256 del tarball;
- qué archivos de salida debo devolverte y cómo, para que los archives como originales con su hash.

Si el verificador falla en mi equipo: STOP sin variantes, como indica la propuesta.

4. Después del deadline: con el resultado archivado, prepara el paquete para R3/5 con el mismo auditor: evidencia local, preview 384f520/927916b4, C09 aceptado con limitación, y las adendas 1 y 2. Sin merge, main ni producción hasta que R3 se pronuncie. El revert d6f4bdd debe actualizarse si cambia el SHA que se integre.

## Aplicación y estados

C12 PASS sólo para384f520/927916b4 y receipt declarado; C09 aceptado con limitación, no PASS. La clasificación del503 como corte de proxy es decisión expresa del propietario; las capturas/dictámenes antiguos conservan su alcance sin edición retrospectiva. Verificador admitido sin modificación del tarball, ejecución pendiente a cargo del propietario, una vez≤6 requests, presupuesto actual223/320. No solicitar R3 hasta archivar el resultado. R1/R2 FAIL y contadores intactos; sin main/merge/producción/scans. Propuesta WAF issue103 separada, sin implementación F4B. Rollback actualizado5988ef3 conservado con d6 histórico; revisar el patch contraSHA final antes de integrar.
