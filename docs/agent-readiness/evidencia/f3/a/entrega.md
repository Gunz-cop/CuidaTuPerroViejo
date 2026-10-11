# F3A: generación y contratos

Entrega de F3A para el commit de código `480a02e4356cca8d86c7b0d447e30c8187a057d2`, árbol `9cb28a97fc44a8a55387f036d0b13298440dcab6`, creado sobre `32949d0f8a565eaac7b58520781ab09ccbeba9a5`. Este informe y los dos manifests se añadieron después del build como evidencia; su commit no es el SHA probado y no se afirma que el diff documental conserve HTML/CSS.

## Alcance

Se añade el generador determinista de query-index, OpenAPI 3.1.1, Linkset RFC 9727, discovery y artifact de skills, y los dos manifests ARD. La fuente es el índice y todos los Markdown F2 del mismo build; se validan hashes, orden, identidad, límites y referencias antes de escribir. El hook corre tras la proyección. El check compara bytes sin modificar el build y detecta outputs faltantes o huérfanos. No se añadió Link nuevo ni sección nueva a `llms.txt`; el SHA de `llms.txt` se conserva sólo para comparar los dos builds.

Los resultados corresponden a generación offline (C3-02/03/04 y partes locales de C3-10/11). No acreditan Worker F3B, funcionalidad HTTP, anuncio de discovery, preview, producción ni aceptación global de F3.

## Builds del SHA de código

Se ejecutaron dos builds Astro limpios del mismo SHA, sin cambios de fuente entre ellos. Ambos terminaron con exit 0 y generaron 28 documentos y un query-index de 585422 bytes. Los manifests completos están archivados en [build-manifest-1.json](build-manifest-1.json) y [build-manifest-2.json](build-manifest-2.json); sus bytes coinciden y ambos tienen SHA-256 `1b59c7e2ef9c03949ea09ecf958d06cf399f63eac81b722ba9a052d0d1e1c867` (7151 bytes). Los logs originales están fuera del repositorio en `/workspace/f3-a-evidence/build-final-1.log` y `build-final-2.log`.

Datos comunes de ambos manifests:

- Corpus F2: SHA-256 `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`; 28 documentos y 29 archivos fuente (índice más Markdown); el índice F2 mide 26284 bytes y tiene SHA-256 `2337ee8aefa6d7f9ce332756612c78d4283d65b9f46c44f3b4ce30cfeffdf2dd`.
- `/agent-api/v1/query-index.json`: 585422 bytes; SHA-256 `fbb2dda2c984cf1a61011f895bc9eb8311aa1a3907e0b94eb4a2956e4c1b2323`.
- `/agent-api/v1/openapi.json`: 106849 bytes; SHA-256 `f00956738036df554163bbb03ab93c1f248d93151d5d3a05a6455a4e4c6ba0ef`.
- `/.well-known/api-catalog`: 1033 bytes; SHA-256 `fb87dbbc6ef3da72c8fa9a0359f169ac0cb5d0c708445b7e2c9ad90177c7ffd9`.
- `/.well-known/agent-skills/index.json`: 496 bytes; SHA-256 `48c5fb92c9d2403e99a4af7ca015d87a34952abebf3d1ef830241acf2f27fbb7`.
- Skill artifact: 3350 bytes; SHA-256 `0e4b1055e79a7b14e49d44322ee0aaccdb3c9cf248042f9b0ab870577db1888d`.
- Ambos ARD: 1376 bytes cada uno y mismo SHA-256 `ffb733a44bb7002899d1831738d94c988e1a0c5acd85b2783bfca9598933bed2`.
- `llms.txt` se mantuvo byteidéntico entre los builds, SHA-256 `aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e`.

## Verificación

Comandos y resultado local en Node `v24.19.0`:

| Comando | Resultado |
|---|---|
| `npm ci --include=dev` con caché task-specific en `/tmp/f3a-npm-cache` | exit 0; cuatro devDependencies directas en las versiones normativas |
| `npx --no-install astro sync` y `npx --no-install astro check` | exit 0; 0 errores y 0 advertencias; hints existentes y aviso informativo del archivo nuevo |
| `npm test` | exit 0; 42/42 tests |
| `node --test tests/agent-readiness/*.test.mjs` | exit 0; 52/52 tests, incluidos fixtures y contratos F3 |
| `node --test tests/agent-readiness/f3-*.test.mjs` | exit 0; 7/7 tests |
| `node scripts/audit-specs-migracion.mjs` | exit 0; 7 specs |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | exit 0; verificación read-only de bytes y conjunto reservado |
| `node scripts/agent-readiness/projection.mjs check --build-dir dist` | exit 0; índice y Markdown F2 byteexactos |
| `node scripts/agent-readiness/discovery.mjs check --build-dir dist` | exit 0; guard F1 existente |
| `node scripts/agent-readiness/projection.mjs check-routing --build-dir dist` | exit 0; routing compilado F2B |
| `node tests/agent-readiness/projection-semantic.mjs dist` | exit 0; 28 documentos contra HTML/GFM |
| `node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/f3a-inventory-final` | exit 0 |
| `node --test tests/agent-readiness/projection-growth.mjs` | exit 0; 2/2 tests |
| `XDG_CONFIG_HOME=/tmp/f3a-xdg npx --no-install wrangler types --env-file wrangler-types.env --strict-vars=false` y `git diff --exit-code -- worker-configuration.d.ts` | exit 0; ningún cambio de tipos Worker |

Las pruebas de generación usan un fixture GFM de 51389 bytes con contenido después del carácter 4000. Un oráculo AST independiente compara token arrays y enlaces completos. Fixtures cubren integridad/corpus, documento ausente, enlace inválido, colisión sin sobrescritura, artefacto huérfano, igualdad de ARD, schemas y cada techo de bytes en el límite y límite+1. El check se comprobó sin mutación.

La red/proxy de entorno fue necesaria para npm/build y se usó sólo con las variables de entorno del runtime provistas; no se leyeron secretos ni se cambió proxy/CA. Los logs completos quedan fuera del repositorio. No hubo deploy ni requests HTTP públicos. Rollback de A: revertir el commit de código en la rama conservando F1/F2 y esta evidencia.

## Addendum R1: correcciones del candidato revisado

El informe independiente [R1/5](../auditoria/f3a-r1.md) señaló cuatro fallos reparables. Este addendum acompaña el siguiente candidato F3A; no modifica ni reescribe el informe del auditor ni el contrato ratificado.

- El texto del AST inline ahora se concatena sin separar nodos de énfasis, enlaces y code spans; los separadores siguen aplicándose entre bloques. El fixture tiene expectativa explícita `artrosis` y `cushing` para `art**rosis**` y ``cu`sh`ing``.
- Las referencias GFM duplicadas conservan la primera definición, con prueba que exige el destino `/primera`.
- El generador calcula el tamaño UTF-8 de la respuesta Read contractual completa (`JSON.stringify(value,null,2)+'\n'`) para cada Markdown antes de emitir artifacts; el techo es inclusivo de 2097152 bytes. Un fixture independiente mide exactamente el límite y prueba límite+1.
- OpenAPI recorre y resuelve todos los `$ref` locales como JSON Pointer, y falla ante referencias remotas, malformadas o sin destino. Pruebas negativas cambian el schema 200 desde un root temporal y no alteran los contratos de producto.

En este candidato: tests F3 `node --test tests/agent-readiness/f3-*.test.mjs` 10/10; `npm test` 42/42; tests offline de agent-readiness 55/55; Astro sync/check 0 errores/0 advertencias; auditoría de migración 7/7. El manifiesto y log del par final de builds pertenecen al HEAD congelado que incorpora este addendum y sus correcciones; se conservan fuera de Git en `/workspace/f3a-r2-evidence/` con el SHA/tree de ese HEAD. Los manifests anteriores de 480a y df1a documentados arriba siguen siendo evidencia histórica de esos snapshots, no prueba del nuevo candidato.
