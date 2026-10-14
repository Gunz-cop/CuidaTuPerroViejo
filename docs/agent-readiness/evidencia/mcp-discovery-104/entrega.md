# Entrega de implementación — issue104

Base `b2ab1082c02799dab4306a7c167a6114c0163a90`. Contrato fijo `d09d63074215a49f648186127a109cab96077833`, ratificado después del **R1/5 PASS** independiente. Siguiente revisión del mismo auditor GPT-6.1 Sol/high: **R2/5**. Máximo cinco total incluido contrato; sin reset. No modificar el snapshot al remitirlo.

La implementación añade el descriptor `/.well-known/mcp/server-card.json` al generador/staging/manifest/checks existentes y un bloque MIME/cache/CORS en `_headers`. Identidad y endpoint derivan del registro usado por la card nativa. La capability tools/listChanged=false se mueve de los dos literales del runtime al mismo registro compartido; sólo se sustituyen esas dos lecturas. La card nativa sigue derivando/validando su forma original. No se declara schema del nuevo formato.

Los tests focales comprueban determinismo, registro corrupto, ausencia/alteración/extra bajo el prefijo reservado, colisión, y comparación de identidad/capabilities contra initialize/discover/list del SDK real en fixture. Se adapta exclusivamente el conjunto exacto de artifacts del test F3. CLI de medición, configuraciones, SDK, tools, límites y UI no cambian.

`scripts/agent-readiness/mcp-discovery-104.mjs` prepara expectativas con SHA/tree limpios, hashes de las dos cards generadas, comparación de card nativa contra el build de base y documento/hash del build. El smoke usa Node fetch y SDK2.3.1 reales, hardcap24 requests incluidas las automáticas, sin retries/redirects; ambas cards GET/HEAD, ambas eras/listas, cuatro calls modernas con paridad API/lectura íntegra, robots y Origin403. Guarda expected/receipt/http-originals/result en una raíz nueva por ejecución. Los originales conservan base64 completo, headers, hashes y terminal real; un cierre SSE intencional sólo se admite después de un frame de resultado completo con id correcto y AbortError. Un error/truncamiento distinto falla.

## Evidencia que acompaña al snapshot fijo

Los resultados locales, manifests completos/diff contra el build base, receipt CI/Workers, preview real y rollback se archivarán fuera de Git e indexarán en un paquete fijo para R2/5. Este documento describe el producto y los gates; no atribuye anticipadamente un build/preview o PASS a un SHA aún no construido. Coordinación conserva ese paquete externo para evitar mover el candidato después de su build o revisión.

El build base pertenece a `b2ab108`, no al correctivo. La selección histórica F4B 80/81 no se reutiliza: la nueva ruta cambia la cardinalidad. El diff de manifests compara todos los artifacts, preserva todos los assets anteriores y declara la excepción restringida de contacto con guard fuente idéntico. Una diferencia no prevista implica bug/STOP.

Reversión propia: restaurar exclusivamente los archivos de producto/checks/test del delta a la base verificada, mantener documentos e historial, preparar commit y probar localmente la ausencia del nuevo descriptor y continuidad F4B. No ejecutar el revert F4B `14e3bed`; no revertir documentos.

D07 requiere receipt exitoso y smoke en CommitPreview de SHA exacto antes de R2/5. D08/producción y medición del evaluador quedan **pendientes**, sin main/merge/producción/scans ni resultado inferido. F4B R1FAIL/R2FAIL/R3PASS, C09 remoto no determinable sin PASS y deadline externo pendiente/no bloqueante/no deuda/NO PASS se conservan intactos.

## Comandos reproducibles

```bash
node scripts/agent-readiness/mcp-discovery-104.mjs prepare --build-dir dist --base-build-dir /workspace/CuidaTuPerroViejo/dist --out /workspace/discovery104-originals/candidate-expected.json
node --use-env-proxy scripts/agent-readiness/mcp-discovery-104.mjs run --expected /workspace/discovery104-originals/candidate-expected.json --base-url http://127.0.0.1:8788 --mode local --out /workspace/discovery104-originals/local-smoke
node --use-env-proxy scripts/agent-readiness/mcp-discovery-104.mjs run --expected /workspace/discovery104-originals/candidate-expected.json --base-url https://VERSIONPREFIX-cuidatuperroviejo.g1721m.workers.dev --receipt /workspace/discovery104-originals/candidate-receipt.json --mode preview --out /workspace/discovery104-originals/preview-smoke
```

`VERSIONPREFIX` se reemplaza únicamente por el prefix del VersionID del receipt. El receipt externo contiene `head/tree/build/version/check_runs` reales, completos y coherentes. Producción requiere un receipt propio y autorización aplicable. Output existente, source sucia, SHA/tree distintos, SDK distinto, origen no admitido o receipt incompleto impiden la ejecución.
