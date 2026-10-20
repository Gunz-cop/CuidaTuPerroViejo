# Versión de prueba automática tras el push

20 de octubre de 2026 UTC. Registro de coordinación; no es una nueva auditoría editorial ni altera el producto aprobado.

## Qué ocurrió

Al subir la rama para crear el PR #123, Cloudflare ejecutó un disparador remoto preexistente que no estaba descrito en las instrucciones del repositorio. Su nombre es «Deploy non-production branches», incluye `*`, excluía ya `main` y ejecuta `npm run build && npx tsx lib/discovery/run.ts` seguido de `npx wrangler versions upload`.

- Build: `2795ce8d-cd44-4f2c-a67c-f7446a5061f4`.
- Commit: `05bc868fb7fbf1f320a175ccb32cd4893c8e9834`.
- Versión creada automáticamente: `c6947c2e-736a-4709-8592-71379fecc3e1`.
- Finalización de la subida: `2026-10-20T01:49:13.477Z`.

El check remoto anunció una URL de versión y un alias de rama. Se comunicó al usuario el efecto automático. No se ejecutó manualmente un comando de upload ni de deploy. No se presenta esta vista previa como un recurso de entrega autorizado.

## Producción comprobada

La API de despliegues, consultada antes y después de la contención, mantiene el mismo despliegue activo:

- Despliegue: `b8577c76-8299-4ae3-b15e-eb0c5dd52e90`.
- Fecha: `2026-10-18T18:15:38.204585Z`.
- Versión: `c5da62e1-d086-4eaf-b55e-a6c4731bb356`, **100 %** del tráfico.

La versión creada por este push no está en ese despliegue. `main` no se modificó ni se fusionó. Las solicitudes HTTP desde este entorno devolvieron 403 tanto para la URL de versión como para producción; ese resultado no demuestra inaccesibilidad pública ni sirve para certificar contenido publicado.

## Contención acotada

Se añadió exclusivamente `contenido/alimentacion-perros-mayores-sin-dientes` a las exclusiones del disparador no productivo `38498719-3307-44bd-b1d5-9880c6a01224`. La lista pasó de `["main"]` a `["main", "contenido/alimentacion-perros-mayores-sin-dientes"]`.

El disparador de producción es otro recurso, `5ec70653-b98c-460e-99f4-623fca73ff06`, que incluye `main` y ejecuta `wrangler deploy`. La comparación de su configuración completa antes y después confirmó que no cambió.

La revisión automática de seguridad rechazó el primer intento por interpretar un riesgo de desactivar producción. Se verificó de nuevo que `main` ya estaba excluida en el disparador no productivo y que el disparador productivo tenía otro UUID. Un segundo intento, con comprobaciones de alcance y comparación de producción dentro de la operación, fue aprobado y completó únicamente la exclusión de esta rama. No se eludió el rechazo mediante otro canal ni se alteró el disparador de producción.

## Límite de retirada

La versión de prueba ya creada permanece registrada. En la API y documentación consultadas no se encontró una operación de retirada individual para esa URL de versión. La opción documentada de desactivar Version URLs afecta al Worker completo y a sus demás versiones; no se aplicó ese cambio global. No se afirma que la versión haya sido eliminada ni que la vista previa se haya retirado.

Referencia consultada: https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/ . El estado posterior filtrado está en `verificacion/cloudflare-contencion.json`.
