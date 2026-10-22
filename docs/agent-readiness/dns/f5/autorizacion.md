# Autorización DNSSEC y alcance F5

El 2026-10-14, tras mostrar el payload de un único SVCB y explicar la incompatibilidad entre DNSSEC disabled y el requisito del evaluador, el propietario respondió en esta conversación:

> Autorizo para que avances sobre la prohibición.

Se interpreta dentro del encargo F5: permite preparar y, después del PASS y ratificación exigidos, activar DNSSEC en la zona existente y publicar el puntero SVCB. No autoriza otros cambios de NS, WAF, proxy, plan, facturación, producto, contacto o administración. No se repite esta autorización; el coordinador debe completar el cambio revisable y respetar los gates. No se ha aplicado ningún cambio al registrar esta decisión.

GET Registrar actual acredita current_registrar=Cloudflare, cloudflare_registration=true, registrationActive, NS eric/lola y ds_records=[]. DNSSEC inicial disabled con campos de claves nulos. Originales con datos de contacto se conservan privados.

Cloudflare documenta DS automático por CDS/CDNSKEY, plazo de uno o dos días, y estados de rollback que conservan firmas hasta retirar el DS. No inventar valores DS antes de la generación ni prometer propagación inmediata. El estado pending no demuestra resolución validada.

El conflicto de autorización #108 queda resuelto; su historia y el borrador anterior se conservan. La ejecución se sigue en #109. #107 continúa como dependencia de los gates de runner, no como bloqueo de preparación/aplicación por MCP.
