# Entrega de rama sin despliegue automático

Comprobado el 2026-10-22 mediante la API de Cloudflare Workers Builds.

El disparador «Deploy non-production branches» incluía `*` y ejecutaba una subida de versión en cada push. Para cumplir el encargo, se añadió exclusivamente `contenido/mal-aliento-perros-viejos` a `branch_excludes`, conservando las exclusiones anteriores (`main` y la rama del primer artículo). Una segunda lectura confirmó el cambio.

No se inició ningún build remoto ni se cambió el disparador de producción, sus comandos o sus ramas. Las pruebas de este expediente son locales. La exclusión debe conservarse mientras el encargo siga siendo revisión sin despliegue.

Referencia: [ramas de build](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/). Operación verificada en el schema vigente: `PATCH /accounts/{account_id}/builds/triggers/{trigger_uuid}`, con el único campo `branch_excludes`.
