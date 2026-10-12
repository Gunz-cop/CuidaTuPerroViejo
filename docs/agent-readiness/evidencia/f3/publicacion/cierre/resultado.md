# F3 — Resultado de publicación

Producción verificada el 2026-10-12: **86 contenido / 60 general, nivel 4 general**. Comparación contra F2: contenido sin cambios, general +20; exactamente `apiCatalog`, `agentSkills` y `ard` pasan de fail a pass, sin regresiones. [Auditoría independiente](auditoria-p3.md): **PASS P3-01/02/03 y C3-12, cero bloqueantes**, GPT-6.1 Sol/high, mismo auditor de C. [Aceptación arquitectónica final](cierre-arquitectonico.md): **F3 publicada y aceptada**, con autorización vigente.

Producto publicado: `aad2a6624c24d7425c5ad5329b82c77a8a86b619`, tree `add06deb2647988846525fcfbeb5bb6b754b7006`, promovido con autorización mediante [PR #79](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/79). El commit que archive este cierre es documental, en rama `agent-ready/f3-c`; no se atribuye su build a producción. Main permanece en el producto auditado.

## Publicación e identidad

El [STOP anterior](../stop80/resultado.md) y bug [#80](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/80) se conservan como hechos históricos. El callback GitHub Workers seguía `in_progress`/conclusion null en la última observación; no se convierte en success ni se diagnostica la causa. Las cuatro capturas Cloudflare aportadas por el usuario muestran versión `ec329197` activa al 100%, fila main/Listo, servicio y dominio correctos y timestamp `2026-10-12T02:27:09.864Z`, posterior al fast-forward de main. [Transcripción con límites](capturas-transcripcion.json), [decisión de admisión](decision-admision.md) y [recibo](receipt-produccion.json).

`ec329197` es prefijo de versión, no SHA de Git ni UUID completo. El SHA completo se correlaciona mediante promoción GitHub, main vigente, título, rama, dominio y secuencia temporal. No es visible íntegramente en las capturas y no se inventan hashes de imágenes no disponibles en el workspace. La admisión permitió ejecutar por primera vez los gates pendientes; no reclasifica el STOP previo como PASS.

## Gates ejecutados

- **P3-01/02:** matriz de producción PASS, 117 peticiones, 28 lecturas íntegras y dos recorridos de descubrimiento → búsqueda → lectura → cita. [Manifest público](produccion-manifest.json) con hashes y bytes; siete assets, schemas, OpenAPI, skill, ARD, MIME/CORS/no-store, errores/métodos, HEAD/OPTIONS y condicional nativo; home HTML/Markdown, llms, robots, sitemap, redirect y catálogo asistente de sólo lectura. Verificador congelado, nuevo build del candidato con 350 archivos reales; no se repitió la matriz histórica F2.
- **P3-03:** una POST content y una all-ui, ambas completas/exit0, con CLI, selección y fórmula F2 congeladas. [Comparación content](comparacion-content.json) y [comparación general](comparacion-all-ui.json) son comparables. Contenido: 6 pass / 1 fail / 15 neutrales, denominador 7. General: 9 pass / 6 fail / 7 neutrales, denominador 15. El nivel 5 devuelto por el perfil parcial de contenido no es el nivel general del sitio.
- [Ejecuciones](ejecucion.json): sin retries para ocultar fallos, sin rollback ni cambios adicionales de producto. `deploymentCommit=null` en el evaluador permanece intacto: la identidad se prueba por la cadena de publicación separada.

Política preservada: **search=yes, ai-input=yes, ai-train=no**. Catálogo, búsqueda léxica y lectura íntegra, OpenAPI, skill y ARD son capacidades publicadas. Este cierre no inicia F4/F5/F6 ni añade autenticación, comercio, MCP o herramientas futuras.

## Custodia y aceptación

[Índice de originales](indice-originales.json): 139 archivos privados sellados, SHA256 del índice `e5a307b1180d4a91789ba7ff39a2b870d8bf8475c9602d475e6c46186976aae8`. Capturas HTTP y respuestas raw del evaluador se conservan íntegras en `/workspace/f3-publicacion-desbloqueo`. Los manifests de cada scan referencian sus originales raw por bytes/hash; esos raw no se incluyen en esta proyección pública. Request, metadata, summary y comparaciones son copias literales. El manifest HTTP público omite cuerpos y valores de headers no técnicos, declara allowlist y conserva los digests originales. No es una copia íntegra del manifest privado.

Las aceptaciones SDD R2/2, A R2/5, B R1/5 y C R1/5 permanecen vigentes; la auditoría de evidencia de publicación no reinicia esos contadores. Autoría de B/C corresponde a root por excepción explícita del usuario; no se atribuye a Luna. Rollback coherente C→B→A conforme a SDD, conservando F1/F2 y evidencia; no se ejecutó rollback. Una incoherencia nueva de identidad o contrato requiere evidencia y STOP, sin cambiar assertions para obtener PASS.

Informe del auditor archivado byteidéntico, SHA256 `9cfcdb3b6ac9cf9f4c9f92b5d63d518f99f799c720a3933493867d309a6ecaf0`; [índice de sus originales](indice-originales-auditor.json), [verificación independiente](verificacion-auditor.json) y [replay](replay-auditor.json).
