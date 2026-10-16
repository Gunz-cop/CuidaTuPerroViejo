# Evidencia — calculate_dog_age (WebMCP + MCP remoto)

PR #116, rama `herramientas/edad-mcp`, producto `8ed5c7c`. Build: `npx astro build`, servido con `wrangler dev --local --config dist/server/wrangler.json`.

| Archivo | Qué prueba | Resultado |
|---|---|---|
| `local/webmcp-chrome155.json` | `webmcp-browser.mjs`, Chrome for Testing 155.0.8059.39 (zip SHA-256 `55672d1f…a8ea`, el de F4A) + `WebMCPTesting`: cinco tools en cinco páginas (también la calculadora), `WebMCP.invokeTool` de `calculate_dog_age` = MCP remoto | PASS 121/121 |
| `local/webmcp-chromium141-sin-api.json` | El mismo harness sin API WebMCP | PASS 35/35 |
| `local/ui-parity.json` | `ui-parity.mjs`: UI real de la calculadora = `structuredContent` del MCP | PASS 5/5 |
| `local/mcp-client-workerd.json` | `mcp-client.mjs --local-http` (SDK real): las dos eras con `calculate_dog_age` (Luna 68 Senior; gigante 83 longevo; years 26 → INVALID_REQUEST) | Funcional PASS; la matriz de transporte posterior falla por la inestabilidad local de `wrangler dev` (ver F4B) y queda para la vista previa |

Casos: cachorro 0 a 1 m → 1, Cachorro · Luna (pequeña, 11 a) → 68, Senior · Dakota (mediana, 12 a) → 76, Senior · gigante 10 a → 83, Senior longevo.

Decisión: la página sigue siendo `page--calculadora-edad-perro`; promoverla a `tool--` cambiaría IDs públicos y necesita consultarlo con el propietario.
