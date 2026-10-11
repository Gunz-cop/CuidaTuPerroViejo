# Entrega F3B — issue #75

Base: `ce6c491757a165b22973a7bf717fd0d6ed069ac8`, tree `51521631e0e0dc235d46a128b8c7af36bc2fd8c3`. Rama `agent-ready/f3-b`, destino draft `agent-ready/f3-a`. Contrato F3 ratificado PASS R2/2; A aceptada PASS R2/5. Producción continúa en F2; esta entrega no acredita publicación pública ni autoriza promoción.

El usuario pidió explícitamente que el coordinador construyera toda B tras el límite de uso de la sesión Luna. El autor es `/root`; no se atribuye a Luna. Auditor independiente fijo `/root/f3b_auditor`, GPT-6.1 Sol, esfuerzo alto. Contador inicial B: 0/5; el primer informe consume R1/5. El auditor no modifica la implementación.

## Implementación y ownership

`src/lib/agent-api/runtime.ts` compone catálogo, búsqueda AND y lectura por ID antes del handler F2 en `src/worker.ts`. Sólo intercepta `/api/agent/v1` y descendientes. Reutiliza el validador/cache F2 sin modificarlo, valida el índice léxico y sus relaciones, limita streaming y respuestas, valida hash/UTF-8 y conserva Markdown completo. Cache de éxitos por binding; fallos eliminados, sin cache de errores o documentos. No requiere bindings, dependencias, fetch externo ni acciones con efectos.

Se añade únicamente el paso runtime autorizado a CI. Pruebas y evidencia pertenecen a B. Contratos, generadores A, F2, contenido, stack, headers globales y discovery permanecen bajo sus owners. La integración de superficies compartidas corresponde a C. Política vigente: `search=yes, ai-input=yes, ai-train=no`.

## Criterios y evidencia reproducible

| Criterio | Comprobación |
|---|---|
| C3-05 catálogo | Schema cerrado, metadata F2 exacta, filtro antes de página, offset vacío; catálogo completo en workerd |
| C3-06 búsqueda | Pesos 8/3/1, AND, empate ASCII, repetición/acentos, vacío y coincidencia después de 4000 caracteres; oráculo sobre artifact A en workerd |
| C3-07 lectura | Bytes/hash/metadata íntegros, aviso/fuente finales y links; todos los IDs reales comparados con entidades F2 originales |
| C3-08 entrada/HTTP | Percent y UTF-8 estrictos, duplicados/desconocidos, límites, casos NFC/padding normativos, precedencia, corpus, HEAD/OPTIONS/405, CORS/no-store/seguridad/Link |
| C3-10 integridad | Fixtures corruptas/ausentes, límites streaming y JSON, hash/UTF-8, esquema cerrado, fallos recuperables y aislamiento entre bindings |
| C3-11 runtime | Build del snapshot fijo; workerd con configuración compilada y `--local` (remote bindings desactivados), sin astro dev como evidencia |

Pruebas: `node --import tsx --test tests/agent-readiness/f3-runtime.test.ts`. Para detalle de cada caso se conserva además `node --import tsx tests/agent-readiness/f3-runtime.test.ts` (el runner Node de este entorno puede resumir el archivo como una prueba). No se importa el runtime para construir expectativas: fixture declarada, schemas aprobados, hashes Node crypto, documentos originales y artifact A.

Congelar este documento, scripts, código y tests en un commit antes del build final. Identidad real en manifiesto externo y recibo posterior; no insertar aquí un SHA autorreferencial ni atribuir al cierre documental el build anterior. Documentación puede afectar CSS. Logs originales y cuerpos en `/workspace/f3b-evidence/`, fuera de Git; el recibo curado registra SHA/tree, comandos/exit codes, hashes y omisiones.

Secuencia: npm ci con lock; astro sync/check; tests proyecto/offline/negociación/runtime; `npx --no-install astro build`; inventory/discovery/projection/agent-api/check-routing/growth/semantic; tipos Worker sin diff; dry-run. Nunca npm deploy, main, SDI ni indexación.

Serving local: `XDG_CONFIG_HOME=/tmp/f3b-xdg npx --no-install wrangler dev --config dist/server/wrangler.json --local --ip 127.0.0.1 --port 8798 --inspector-port 9298 --persist-to /tmp/f3b-workerd-state`. La bandera `--local` del Wrangler fijado desactiva remote bindings; se verifica en el log. Ejecutar `node docs/agent-readiness/evidencia/f3/b/verificar-workerd.mjs http://127.0.0.1:8798 /workspace/f3b-evidence/workerd`. Sólo localhost, GET/HEAD/OPTIONS y POST rechazado en la API F3; no llamadas al asistente/contacto/admin.

Manifest incluye respuestas y hashes de cada archivo compilado; no contiene credenciales. CI y receipt de preview deben corresponder al SHA entregado. Preview funcional de fase corresponde a C, sin dar por publicado desde localhost.

## Auditoría y STOP

Entregar commit/tree exactos y evidencia al mismo auditor Sol/high. Máximo cinco revisiones totales; quinta FAIL implica bug asociado a SDD y STOP. Hueco esencial de contrato, datos, entorno o ownership: bug asociado a #75/SDD y detener trabajo dependiente. No ampliar contrato para obtener PASS. Aceptación posterior por arquitectura Sol/high; C espera cierre aceptado B.

Rollback antes de promoción: retirar composición/runtime/tests B y su paso CI, preservando A/F2 y evidencias. Cualquier promoción o rollback publicado requiere la autorización correspondiente a la versión concreta.
