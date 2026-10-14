# Cierre preparado — prueba externa pendiente, no deuda

El propietario indicó: «Estoy desde mi celular. Esa prueba la haremos luego. Déjala como pendiente (no deuda) y continúa con lo que sigue».

La ejecución externa del deadline queda **pendiente de ejecución por el propietario**, no deuda, no PASS ni defecto nuevo. Se conservan tarball admitido, comandos Windows, hashes y reglas de única ejecución/STOP sin variantes. No se sustituye el gate ni se pide ahora que lo ejecute. Los resultados no existen todavía.

Trabajo independiente completado:

- Revisión de base y archivos compartidos en revision-base.json sobre entrega1ba0857: F4A producto cb8e10f y documentación final a42a185 coinciden técnicamente. Ancestro común comprobado, sin integrar automáticamente ninguna rama.
- Producto F4B idéntico a192dcdd; módulos de búsqueda/lectura F3, cálculos/contratos F4A, contacto y OpenAPI sin delta contra base técnica. Los26deltas F4B de runtime/discovery/dependencias/harness/tests están enumerados por archivo, con nombres reales.
- Sin solapamiento de archivos entre el delta documental final F4A y el delta F4B actual. Esto no equivale a un merge ni garantiza ausencia de conflictos futuros; antes de integrar, volver a revisar contra los SHA realmente seleccionados.
- Cobertura del rollback5988ef3 comprobada contra la fuente actual: revierte esos26deltas exactamente a cb8e10f y conserva documentación. La referencia d6f4bdd sigue histórica. Al fijar SHA de integración, actualizar el commit de revert según encargo y comprobar patch/comando; no afirmar despliegue ni ensayo nuevo.
- Índice de24documentos y hashes listo para el paquete R3: norma/adendas/decisiones, informes históricos, originales indexados, mediciones CPU/heap, evidencia local/preview, C12 y C09 con aceptación de limitación. Cada recibo conserva su SHA/VersionID; no trasladar el C12 de384f520 a un merge futuro.

## Orden después de recibir la prueba

1. Recibir ZIP y archivoSHA256; conservar bytes originales privados, verificar ZIP/índice/manifiesto/tarball y registrar entorno/requests reales. No reformatear ni reemplazar JSON originales.
2. Comprobar deadline500JSONRPCexacto10–12s y recuperación inmediatamente posterior; FAIL externo implica STOP sin variantes. C09 cuotas/cap ya aceptado con limitación, noPASS.
3. Incorporar proyección curada y fijar SHA/tree de entrega. Revisar alcances entre build384f520/927916b4, controles previos e21374c/40fed98d y entrega final; no fabricar equivalencia de build.
4. Remitir R3/5 al mismo auditor /root/f4b_auditor Sol/high con paquete fijo. R1/R2FAIL quedan intactos, contador no reiniciado; máximo5 revisiones. No solicitar ni consumir R3 antes del resultado archivado.
5. Tras dictamen y gates aplicables, preparar integración concreta contra F4A final, revisar diferencias e identidad y actualizar revert. Sin merge/main/producción hasta autorización y gates vigentes. Smoke≤20 sólo en fase autorizada, revert inmediato si falla; sin scans/score.

## Pendientes de F4B y alcance separado

- **Pendiente F4B:** deadline externo; recepción/curación; R3; integración/identidad final/revert actualizado; publicación/smoke posteriores sujetos a gates. No convertidos en deuda para permitir publicar.
- **Fuera de implementación F4B:** issue103, propuesta WAF para protección de frecuencia en plataforma, sin configuración ni cambios de producto. La aceptación C09 no garantiza límites globales ni protección efectiva porisolate.
- **Fuera de F4B:** F5/F6, sin adelantar contratos ni trabajar en ellos.

No builds ni suites locales, nuevas llamadas de preview ni scans en esta preparación. El push documental de la rama propia puede activar CI/Workers Builds; no se ejecuta ninguna comprobación HTTP contra esa nueva imagen ni se le atribuye evidencia de otra. No auditoría de implementación nueva ni seguimiento continuo de otras sesiones.
