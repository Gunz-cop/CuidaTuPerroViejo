# Preparación metodológica — alternativa no-transform F2B

**Conclusión: sin bloqueante en el diseño experimental descrito.** Esta conclusión se limita al plan `/workspace/ctpv-sdd-correcciones/plan-f2b-alternativa-celular.md` y al encargo de coordinación. No valida un workflow concreto aún no entregado, resultados, corrección de producto ni B05. F2B continúa STOP/#60 abierto y auditoría formal 0/5; SDD permanece PASS2/2.

Fecha: 2026-10-06. Base experimental fija: `a7c942bd5a2c551e020ed226265d00e4d22e82dd`, tree `1668ece48abde4fb243d439400af32b597286b1a`. El diagnóstico anterior mantiene 8/8, cerrado e inmutable. El nuevo presupuesto autorizado es independiente: máximo ocho solicitudes, sin reutilizar ni relabelar capturas anteriores como nuevas.

## Comprobaciones previas necesarias

1. Congelar tratamiento y recibo oficial del PR nuevo antes de activar las capturas. Conservar por separado el source de workflow, el source HTTP control `b87616f72d4ff3446f005f87761bfd65d9f43b62` / preview `5c55fc8d` y el source/preview exactos del tratamiento. Comprobar que el delta de código se limita al entrypoint temporal: añadir `no-transform` a la home exterior conservando `private, no-store` y registrar encoding; no modificar/restaurar ETag, runtime, configuración, lock ni producto B.
2. Revisar el YAML real antes de publicarlo activo: evento push, rama y path literales, ejecución sólo con preview conocido y `run_attempt == 1`; sin workflow_dispatch, retries, redirects ni capturas en otros jobs. El filtro push evita el error del diff acumulado de PR. Tras el primer job, deshabilitar la captura y verificar el job omitido antes de archivar documentos. No relanzar workflows históricos.
3. Un único job hospedado debe limitarse a GET/HEAD HTML/Markdown de la home de cada preview: cuatro por control y cuatro por tratamiento. Mismo UA honesto y `Accept-Encoding: identity`; timestamps individuales, HTTP/status/curl exit/proxy-presence/TLS y conteo, incluso si una respuesta falla. Ningún fallo autoriza retry ni sustitución de requests.
4. Sin checkout, dependencias, credenciales explícitas, API/admin/IA, evaluador, producción, despliegue o mutaciones. La excepción autorizada de upload-artifact debe usar SHA fijo revisado y preservar cuerpos GET, headers, traces y metadata originales. Registrar ID/digest del artifact y hashes/tamaños de cada archivo; los logs decodificados permanecen distintos de los raws del artifact.

## Criterios de interpretación offline

La comparación debe verificar bytes GET contra el build/índice correspondiente a cada source, ETag nativo en ASSETS/wrapper/exterior, Cache-Control, Vary, MIME, encoding observado y headers de seguridad. Un status o check verde no basta. Headers HEAD y GET deben conservar identidades separadas; no añadir peticiones condicionales fuera del presupuesto.

Un resultado positivo mostraría asociación entre el tratamiento y el ETag exterior en esos previews/cliente/instantes. No identifica por sí solo una capa causante, settings activos, compresión bajo otros Accept-Encoding ni coste de rendimiento; los dos previews pueden atravesar infraestructura distinta. No acredita If-None-Match/304, el corpus completo o la matriz B05. Un resultado negativo tampoco demuestra imposibilidad general.

Cualquier propuesta posterior de producto requiere discusión arquitectónica del contrato y rendimiento, sin integración automática ni tercera revisión de SDD encubierta. Si el experimento no aporta base suficiente, conservar STOP y expediente; no encadenar nuevas pruebas especulativas.

## Estado de esta preparación

Se leyeron el plan y el anexo de reejecución previo; se comunicó a coordinación que la revisión del YAML concreto está pendiente de entrega. El worktree nuevo todavía no existía al comprobar su disponibilidad. No se ejecutaron HTTP, builds, pruebas, probes ni cambios de producto/spec. Los resultados se verificarán en otro informe, manteniendo esta preparación y los tres informes previos intactos.
