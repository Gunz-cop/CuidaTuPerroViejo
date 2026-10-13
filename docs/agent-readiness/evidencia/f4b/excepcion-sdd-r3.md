# Excepción autorizada de SDD F4B: R3 adicional

Fecha 2026-10-13. El propietario respondió **«Autorizo»** a la propuesta de corregir únicamente B5 y añadir un caso contractual de petición válida sin clientInfo, seguido de **una única revisión adicional del mismo auditor GPT-6.1 Sol/high**. Se mantienen los dos FAIL anteriores y sus informes; no se reinicia el contador ni se sustituye la auditoría por otra sesión.

Historial: R1/2 FAIL B1–B4; R2/2 FAIL B5 nuevo, con B1–B4 resueltos. [STOP original](stop-sdd.md) conservado. La excepción autoriza esta corrección documental y **R3 adicional**, no un nuevo ciclo de dos revisiones, cambios opcionales, programación previa al PASS ni promoción.

Cambio único de contrato: clientInfo de metadata moderna es opcional. Cuando está presente, se valida conforme Implementation MCP; cuando falta, la petición válida se acepta y no se modifica admisión/capabilities/cuotas. protocolVersion y clientCapabilities mantienen sus reglas. Se agrega fixture documental server/discover sin clientInfo, con headers y subset de resultado esperado; no prueba ejecutada ni schema nuevo de dominio.

No cambian SDK/protocolo, funciones/contratos F4A, herramientas, umbrales, rutas/identidad/card, caps, seguridad, sesiones/cancelación, ownership ni gates de publicación. Actualizaciones de encabezado/gobernanza sólo registran esta autorización y contador.

Auditor fijo /root/f4b_auditor, configurado gpt-6.1-sol/high. Si R3PASS: archivar literalmente, ratificar/congelar y continuar el encargo de implementación existente. Si R3FAIL: STOP sin revisión o corrección adicional. Cierre F4A y autorización de publicación F4B siguen gates independientes; no se heredan de esta excepción.
