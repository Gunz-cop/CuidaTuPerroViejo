# Correctivo de descubrimiento MCP — issue 104

Estado: contrato para revisión independiente, sin implementación. Base de producto `main@b2ab1082c02799dab4306a7c167a6114c0163a90`, tree `59dd444439b4f78018eba4a010b25840c4bdd87b`. Rama propia `agent-ready/mcp-discovery-104`. Issue separado [#104](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/104).

F4B está aceptada y publicada: cierre documental `agent-ready/f4b-cierre@93f67404fe24fd38c7c72df17e642507537bb6b6`, `docs/agent-readiness/evidencia/f4b/produccion/README.md`. R1 FAIL, R2 FAIL y R3/5 PASS conservan su significado y contador. C09 no determinable con limitación aceptada no es PASS ni protección efectiva acreditada; deadline externo sigue pendiente/no bloqueante/no deuda/NO PASS. Este correctivo no modifica esos contratos ni resultados.

## 1. Problema y evidencia

El servidor operativo y la card nativa viven en `/api/mcp` y `/api/mcp/server-card`. Los originales del evaluador en `docs/agent-readiness/evidencia/scan-ui-default.json` muestran consultas a `/.well-known/mcp.json`, `/.well-known/mcp/server-card.json` y `/.well-known/mcp/server-cards.json`; ninguna consulta a la card nativa. El control `checks.discovery.mcpServerCard` falló por ausencia en esas rutas. Esa observación histórica no sustituye una medición posterior al correctivo.

La [guía pública del evaluador](https://isitagentready.com/.well-known/agent-skills/mcp-server-card/SKILL.md), consultada el 2026-10-14 y archivada en el [índice de referencias de este correctivo](../evidencia/mcp-discovery-104/referencias/manifest.json), pide JSON/200 en `/.well-known/mcp/server-card.json`, `serverInfo` con `name/version`, endpoint de transporte y capabilities soportadas. No publica un JSON Schema de esa forma. Se buscó código público del backend con `isitagentready.com mcpServerCard`, `check.mcpServerCard` y el mensaje de ausencia: no se obtuvo código primario del backend. Los resultados de terceros no se usan para atribuirle condiciones de validación.

La UI pública vigente, asset `BEBBOZCS`, conserva los universos de perfiles observados; su código sólo demuestra selección y petición `POST /api/scan`, no el algoritmo de `mcpServerCard`. La card nativa tiene otra forma: `$schema/name/version/remotes`, validada actualmente contra el schema primario congelado en `docs/agent-readiness/evidencia/f4b/referencias/card-schema.txt`. Esa validación no se atribuye al nuevo descriptor de compatibilidad. El enlace SEP-1649 rotulado por la guía apunta a PR2127; no se adopta su rótulo como norma adicional.

## 2. Descriptor y autoridades

Nuevo artifact generado: `dist/client/.well-known/mcp/server-card.json`. Forma exacta, UTF-8 sin BOM, JSON con indentación de dos espacios y un LF final:

```json
{
  "serverInfo": {
    "name": "cuidatuperroviejo.com/guias-herramientas",
    "version": "1.0.0"
  },
  "endpoint": "https://cuidatuperroviejo.com/api/mcp",
  "capabilities": {
    "tools": {
      "listChanged": false
    }
  }
}
```

Sin `$schema`, resources, prompts, capacidades experimentales, autenticación ni capacidades nuevas. La identidad name/version y endpoint proceden de `src/agent-api/capabilities.json`, el mismo registro que ya genera la card nativa y alimenta la identidad del runtime. El generador valida el registro existente antes de derivar ambas formas y no mantiene una segunda copia manual del descriptor.

La autoridad de capabilities se extrae de los dos literales actuales `{ tools: { listChanged: false } }` del runtime hacia `mcp.capabilities` en ese mismo registro. El runtime usa dicho objeto en las mismas dos posiciones: constructor de `McpServer` y `registerCapabilities`. Los valores, posiciones, tools registrados, SDK y comportamiento se conservan. El generador rechaza capabilities distintas o campos añadidos en ese objeto. El schema MCP primario congelado `preparacion/f4b/fuentes/sdk-schema.txt` define `tools` opcional y `listChanged` booleano opcional; `false` conserva la capacidad efectiva actual y no promete notificaciones. La guía del evaluador no exige `tools:{}` ni prohíbe `listChanged:false`.

## 3. Generación y servicio

El hook existente de `agent-api.mjs` genera el descriptor junto con los artifacts actuales, usa su staging/collision detection y lo incluye en `outputPathMap`, manifest y `checkArtifacts`. El check reserva todo el nuevo prefijo `.well-known/mcp/`, exige la ruta exacta, detecta extras/ausencias y compara bytes completos con el resultado derivado. Colisiones o registros inválidos fallan antes de publicar artifacts.

Se sirve mediante Static Assets existente, sin cambiar routing ni introducir endpoint de transporte. `run_worker_first` actual sólo incluye `/api/*` y `/admin/*`; la nueva ruta está fuera. Nueva regla exacta en `public/_headers` y en `F3_ASSET_TYPES` del checker discovery:

```text
/.well-known/mcp/server-card.json
  Content-Type: application/json; charset=utf-8
  Cache-Control: no-store
  Access-Control-Allow-Origin: *
```

Se mantiene `X-Content-Type-Options: nosniff` y los headers globales existentes. GET público devuelve 200 y los bytes generados; HEAD devuelve 200, los mismos MIME/cache/CORS aplicables y cero bytes de cuerpo. La URL exacta no redirige y no necesita Origin, auth, cookies ni sesión. No se exige cambiar métodos de otras rutas ni añadir alias `mcp.json`/`server-cards.json`. La card nativa mantiene su tipo `application/mcp-server-card+json`, bytes, ruta, links y anuncios actuales; `/api/mcp` conserva su contrato.

## 4. Ownership y exclusiones

Archivos de producto permitidos:

1. `src/agent-api/capabilities.json`: únicamente `mcp.capabilities` extraída de los literales existentes.
2. `src/lib/agent-mcp/runtime.ts`: únicamente sustituir esos dos literales por el registro compartido. Ninguna otra línea del manejo del transporte.
3. `scripts/agent-readiness/agent-api.mjs`: derivación, validación, output, límite y checks del descriptor nuevo.
4. `scripts/agent-readiness/discovery.mjs`: únicamente nuevo destino/MIME en `F3_ASSET_TYPES`; conservar links, prefijo llms, sección fija y checks anteriores.
5. `public/_headers`: únicamente el bloque de la ruta nueva.
6. `tests/agent-readiness/f4b-generation.test.mjs` y `tests/agent-readiness/f4b-runtime.test.ts`: checks focales de descriptor/autoridad y comparación contra initialize/discover reales del SDK en fixture del runtime.
7. `tests/agent-readiness/f3-contracts.test.mjs`: únicamente adaptar el conjunto exacto de assets a la adición autorizada.
8. Nuevo `tests/agent-readiness/mcp-discovery-104.test.mjs` si la comprobación focal de generación y headers requiere separar casos; no duplicar asserts existentes.
9. Nuevo `scripts/agent-readiness/mcp-discovery-104.mjs`: verificador externo acotado reutilizable para preview y producción, conforme al siguiente apartado; no modificar ni copiar la matriz pesada de `mcp-client.mjs`.

Documentación/evidencia nueva sólo en este contrato y `docs/agent-readiness/evidencia/mcp-discovery-104/`. Informes históricos y fuentes congeladas permanecen intactos. No cambiar SDK/dependencias, tools, schemas del dominio, límites, WAF, UI/WebMCP, contenido, proyección, worker entrypoint, configuración Astro/Wrangler/TypeScript, CI, llms/ARD/AI Catalog o links. No alterar `index.mjs`/`shared.mjs`, perfiles, scoring ni originales del evaluador.

Si aparece un archivo o cambio esencial fuera de este ownership, registrar bug y STOP; no ampliar silenciosamente el alcance. El inventario F4B C12 tiene 81 artifacts y su checker no se modifica para convertir el correctivo en ejecución F4B; añadir una ruta cambia cardinalidad y se declara expresamente. La identidad de este correctivo se comprueba por su manifest completo y diff contra un build de la base, sin reutilizar la etiqueta histórica 80/81.

## 5. Criterios verificables

| ID | Criterio y evidencia requerida |
|---|---|
| D01 | Registro compartido: descriptor name/version/endpoint coincide con card nativa; capabilities coincide exactamente con initialize legacy y discover moderno del SDK real en fixture; cuatro nombres tools actuales intactos. |
| D02 | Generación determinista, JSON UTF-8/LF exacto, forma/keys exactas, cero anuncios inexistentes. Registro corrupto o capabilities añadidas deben ser rechazados. Dos derivaciones iguales; no dos builds completos innecesarios. |
| D03 | `checkArtifacts` incluye el nuevo archivo y manifest, detecta bytes alterados, ausencia y extras bajo el prefijo reservado. Card nativa y otros artifacts de descubrimiento byteexactos frente a la base. |
| D04 | `_headers` fuente/construido coinciden. Checker discovery exige ruta/MIME/no-store/CORS exactos y conserva todos sus checks previos. |
| D05 | HTTP real con Wrangler local sobre build: GET200 JSON/bytes/hash exactos, HEAD200 cero bytes, MIME/cache/CORS/nosniff y cero redirects. Captura método/URL/status/headers/cuerpo/hash; no usar mock de ASSETS como prueba HTTP. |
| D06 | Build/base: manifest completo y diff explican sólo descriptor añadido y metadata/bundle que deriva de la extracción. Assets de UI, contenido, card nativa/ARD/llms/OpenAPI intactos, salvo timestamp de contacto con la equivalencia restringida ya aceptada y guard fuente idéntico. No atribuir un build al SHA de otro. |
| D07 | Snapshot fijo SHA/tree, checks locales requeridos y CI/Workers exitosos para ese SHA antes de promover. Preview de commit exacto verifica D05 y el smoke acotado de abajo; originales y receipt indexados. No exige repetir matrices UI/WebMCP, cuotas o deadline F4B. |
| D08 | Después de autorización y promoción: smoke acotado de la nueva ruta/card, y medición Content Site/all-ui por la CLI congelada y comparaciones con originales comparables. `checks.discovery.mcpServerCard.status=pass` se declara sólo tras respuesta real; score/nivel separados, sin excluir fallos ni modificar universos. FAIL del control o regresión se registra como resultado y bug/STOP. |

Validación del nuevo formato significa cotejar campos contra guía primaria y autoridades efectivas; no significa validación contra JSON Schema ni prueba de las condiciones privadas del backend. D08 resuelve el resultado real del evaluador. No se hacen scans antes de publicación ni se inventa incremento de puntuación.

El verificador externo usa Client/StreamableHTTPClientTransport reales SDK 2.3.1 y Node fetch, sin retries ni redirects. Recibe URL explícita, SHA/tree fijo y digests esperados de ambos artifacts generados por el build de ese mismo SHA; no usa alias mutable ni atribuye receipt de preview a producción. GET y HEAD de ambas cards: statuses200, MIME correcto, sin Location/redirección, HEAD0, hash/bytes GET iguales al build y card nativa iguales también a la base. initialize/list de ambas eras y discover moderno verifican identidad/capabilities efectivas y nombres exactos de cuatro tools; cuatro llamadas modernas cubren búsqueda, una lectura íntegra con hash del artifact local, QoL35/compromised y movilidadSB. Completa robots/política y Origin:null403. Captura cada request/status/headers/cuerpo completo/hash/terminal real y admite el cierre SSE intencional declarado; error/truncamiento no se normaliza a PASS. Cuenta también requests automáticos SDK y detiene al llegar a 24 requests por entorno; objetivo hasta20. Una ejecución preview y una producción independiente, con raíces nuevas de originales y receipt propios. No cuotas/deadline ni matrices amplias. El smoke de producción se ejecuta sólo tras autorización aplicable.

## 6. Ejecución y revisión

Primero auditoría independiente del contrato documental fijo por el auditor GPT-6.1 Sol/high designado por coordinación. Sólo después de PASS y ratificación aplicables se implementa. Autor y auditor separados; autor no audita su trabajo. Para el nuevo issue se mantiene un contador único propio, máximo cinco dictámenes, incluyendo la revisión de contrato y las de implementación, sin reiniciar el contador. Estado actual 0/5; la primera revisión del contrato será R1/5. Hueco esencial o quinta FAIL produce bug/STOP. El historial F4B no consume ni se reinicia en este issue.

CLI congelada: `scripts/agent-readiness/index.mjs` SHA-256 `e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438`, `shared.mjs` SHA-256 `89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`. Perfiles exactos `content` (7 checks) y `all-ui` (20), incluidos checks neutrales excluidos tal como los procesa la CLI; no usar el perfil parcial de contenido para atribuir nivel general.

Instalación exacta por `npm ci`; `npx --no-install astro build` explícito. Ejecutar los checks CI aplicables una vez; ampliar sólo si fallos/cambios nuevos lo justifican. D05 local focal y luego D07 preview focal, sin matrices remotas amplias. Los datos no producidos quedan pendientes. Coordinación gestiona autorización concreta de promoción, integración/main, receipts y mediciones D08; ninguna autorización histórica de F3/F4B se extrapola al correctivo.

Reversión: preparar un commit que restaure únicamente el delta de este correctivo a la base de integración verificada, conservando documentación/evidencia e implementación F4B. Verificar el diff y comprobar las rutas locales esperadas; no usar el revert F4B `14e3bed` para este correctivo. Si se autoriza promoción y smoke falla, aplicar esa reversión acordada y detener mediciones. No publicar sin autorización aplicable.
