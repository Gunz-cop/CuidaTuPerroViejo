# F4A-1 — Entrega del autor

Issue [#81](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/81). SDD congelada `1571da481881a4bbcac714dbcf263b68e320d0a9` (tree `325e685e5d9e9b8d1b23b6c658bd031a3685db56`). Rama `agent-ready/f4a-1`. **Commit de código entregado: `dad30d81c6d4687a0b6bdb3475c6a823cf2c5064`**, tree `3183676e2bf5ac1c6cddec08a4f71e81888a8ce5`. El commit que añade esta carpeta es sólo de documentación. La identidad de su build se comprueba en la sección final y no se presupone.

Autor: sesión coordinadora `claude-opus-5-5`/high (homologado de Sol/high). Sin deploy, sin `main` y sin llamadas con efectos.

## Qué se entrega

- `src/lib/agent-tools/`: datos y funciones puras de las dos herramientas (`calidad-vida.ts`, `movilidad.ts`, `contract.ts`) y las URLs de afiliado aparte (`movilidad-afiliados.ts`, que sólo importa la página del selector).
- Páginas de herramientas: sólo cambia el bloque de script, que ahora importa el módulo compartido (verificado: líneas anteriores al script idénticas a la base). Se mantienen el DOM, las clases, la navegación, copiar/WhatsApp/ICS/imprimir y `SHOW_AFFILIATE_LINKS=false`.
- Worker: `GET/HEAD/OPTIONS /api/agent/v1/tools/calidad-vida` y `/api/agent/v1/tools/movilidad`, con el decodificador de query F3 compartido. No acceden a ASSETS ni a la red.
- Contratos: schema (+`ToolInfo`, `QualityOfLifeResult`, `MobilityResult`), OpenAPI 1.1.0 (5 paths, 15 operationIds, 10 componentes), capabilities, Linkset (+2 items), ARD (descripción y consultas de la entrada API), skill = anexo normativo y línea OpenAPI de llms.
- `agent-api.mjs check` añade la verificación post-build de C4A-02 contra el HTML construido (alerta con `alertItemText`, avisos, guías y ToolInfo del JSON-LD).
- Tests: `f4a-tools.test.ts`, `f4a-runtime.test.ts`, `f4a-contracts.test.mjs`, fixtures legados (blobs git de la base) y las expectativas F3 autorizadas en §6.3.
- Harness de navegador (no son tests de CI): `scripts/agent-readiness/cdp.mjs` y `tools-ui-parity.mjs`.

## Criterios

| ID | Resultado | Evidencia |
|---|---|---|
| C4A-02 | PASS | `f4a-tools.test.ts` compara con los literales legados (fixtures = blobs `3ea5ef22…`/`196c0661…` de la base). `agent-api.mjs check` compara alerta, avisos, guías y ToolInfo con el HTML construido ([checks](checks.json), paso `agent-api`) |
| C4A-03 | PASS | Dominio completo 11⁷ = 19 487 171 combinaciones (score y franja) contra el oráculo declarado. Cuerpos completos en 0/34/35/49/50/70 y vectores mixtos, las 6 combinaciones de movilidad y los dos ejemplos normativos byte a byte |
| C4A-04 | PASS | 34 casos (28 vectores HHHHHMM: extremos, umbrales, mixtos y 20 con semilla fija; más las 6 de movilidad) completados por clics en la UI real servida por workerd, comparados campo a campo con la API: [Chrome 155](ui-parity-chrome155.json), [Chromium 141](ui-parity-chromium141.json). Además, **la UI legada de la base** (`eff4ce1`, servida en workerd) contra la API nueva: [34/34](ui-parity-ui-base-vs-api.json). La UI no cambió |
| C4A-05 | PASS | `f4a-runtime.test.ts`: 200/400/404/405/HEAD/OPTIONS, headers exactos, más de 30 entradas inválidas, sin ASSETS ni delegación. [Matriz HTTP en workerd](http-matrix-workerd.json) ([script](http-matrix.mjs)) |
| C4A-06 | PASS | `f4a-contracts.test.mjs`: OpenAPI, ejemplos contra schema, Linkset, ARD, skill (digest), llms y registro cerrado con casos negativos. Checks `agent-api` y `discovery` post-build |
| C4A-07 | PASS | `corpusSha256` `912082d0…` y los 28 Markdown F2 **idénticos** a la base; `query-index.json` idéntico (`fbb2dda2…`). Cambian sólo `htmlSha256` de las dos páginas de herramientas. El CSS es idéntico (`BaseLayout.VWxkXcFk.css`). Todos los checks del CI pasan ([checks](checks.json)). En workerd, la búsqueda F3 `cushing` → lectura verifica su hash |

[Manifest](build-manifest.json) SHA-256/bytes del build de `dad30d8`. Navegadores: Google Chrome for Testing 155.0.8059.39 (zip `55672d1f…ea8ea`) y Chromium 141.0.7390.37. workerd con `dist/server/wrangler.json`, `--local` y estado temporal; sin bindings remotos.

## Observaciones del autor

- La FAQ de la calculadora dice «superior a 35» y el código trata 35 como aceptable. Se conserva el código (contratos §1.1); queda como decisión editorial del propietario.
- Los dos scripts de UI llevan `// @ts-nocheck`: son JS legado sin tipos, y ahora `astro check` los procesa al dejar de ser `is:inline`. La lógica tipada vive en `src/lib/agent-tools/`.
- El test del dominio completo tarda unos 49 s dentro de `npm test`.

## Rollback

Antes de `main`: descartar la rama `agent-ready/f4a-1`. La extracción se revierte junto con sus adaptadores de UI (los scripts legados vuelven tal cual), sin dejar dos algoritmos.
