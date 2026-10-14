# Encargo F4B — cierre local y gate en preview

Fecha: 2026-10-14. Autor: propietario. Este encargo sustituye el STOP automático por las reglas de la sección 5. Todo lo demás de la SDD, los contratos y la política sigue vigente.

## 1. Decisión del propietario sobre el gate local

Tres ejecuciones de la matriz local (`9449137`, `235f666`, `842577a`) fallaron en el mismo punto: la petición inmediatamente posterior a un POST rechazado de forma temprana sin que se lea su cuerpo (403/415) recibió un 500 `Network connection lost` del ProxyWorker de `wrangler dev`. Ocurrió con Miniflare 5 alpha y con Miniflare 4.20260730.0, y con o sin consumo de respuestas. El cuerpo del 500 apunta a `miniflare/.../entry.worker.js`, no al producto. Es el patrón de cloudflare/workers-sdk#15203 (y #15451/#15709), y esa capa no existe en Cloudflare Workers en producción.

Decido:
- **Cerrar el gate local como «limitación del entorno local, documentada».** Lo acreditado en local se conserva tal cual: ambas eras, las 4 tools, el corpus 20+8 y las 28 lecturas, la paridad con la API, las fronteras de calidad de vida y movilidad, la card/ARD y parte de métodos/headers. No se reescribe ni se reinterpreta ningún FAIL histórico.
- **Las comprobaciones pendientes se ejecutan contra un Commit Preview de Cloudflare.** Esto modifica de forma explícita la regla «no sustituir local por preview» solo para F4B y solo para esas comprobaciones. Registrar esta decisión como adenda con este texto y su motivo. El auditor la valida como admisión, no como R3.
- No se cambia el producto para acomodar el bug de la herramienta. En particular, no se drena el cuerpo de la petición antes de 403/415/406.

## 2. Qué se ejecuta en el preview

Producto `192dcdd` sin cambios. Rama de trabajo propia (nunca `main` ni `migracion/astro-7`), con push solo para obtener el Commit Preview que crea Workers Builds. Registrar la URL del preview, el Version ID, el Build ID y el SHA desde el comentario del bot.

Cliente: SDK real 2.3.1 con **Node fetch** (el transporte remoto existente; el adaptador node:http es solo para loopback). User-Agent identificado, como en F2 (`ctpv-independent-...`), para no recibir 1010.

Comprobaciones pendientes, una sola ejecución:
1. Negativos restantes de C07/C08: 406, `[batch]`→400, `{`→400, cancelled legacy→202, ping moderno 404 / legacy 200, preflight 204.
2. Streaming 32768 válido / 32769→413, y continuidad: ping 200 y batch 400 justo después.
3. Metadata 8192/+1 y depth 16/+1.
4. C09: cap de 2 bodies abiertos y el tercero→429; abort/cancel y recuperación; deadline de 10 s y la petición posterior; cuotas 90/91→429 y 120/121→429 con recuperación.

Presupuesto: como máximo 320 solicitudes, sin retries ni redirects.

## 3. Límites de seguridad del preview

- El preview comparte bindings con producción (CONTACT_KV, SESSION, D1). **Prohibido** llamar a contacto, admin, AI o cualquier ruta que escriba. Solo `/api/mcp`, `/api/mcp/server-card`, `/api/agent/v1/*` y discovery.
- Sin scans, sin carga fuera del presupuesto y sin tráfico al dominio de producción.

## 4. Advertencia de interpretación para C09

El rate limit y el contador `active` viven en memoria **por isolate**. En Cloudflare, peticiones seguidas pueden caer en isolates o colos distintos. Por eso:
- Si 90/91 o 2/3→429 no se reproducen de forma determinista, **no** es un FAIL del producto ni un PASS. Registrarlo como «no determinable en plataforma» con la evidencia exacta: status por petición, `Cf-Ray` y colo si viene en headers.
- Ese resultado es información real: así se comportarán los límites en producción. El propietario decide si basta o si hace falta otro mecanismo de límite. No se reintenta para buscar un 429.

## 5. Reglas de parada (sustituyen al STOP inmediato)

- Ante un fallo: diagnosticar y, si es corregible dentro del alcance admitido, corregir y reintentar. **Máximo 3 intentos o 2 horas por bloqueo**, lo que llegue antes. Cada intento queda archivado con sus originales.
- Es STOP directo, sin intentos, si el fallo exige cambiar el producto, el SDK, la configuración o los contratos, o si aparece cualquier riesgo de escritura en datos reales. Reportar y esperar decisión.
- Es STOP directo un 500 o un error cuyo origen sea el producto en el preview. No aplica la regla de limitación de entorno: el preview es plataforma real.
- Al agotar el límite: documentar qué se intentó, el resultado y una hipótesis con su nivel de evidencia, y detenerse.

## 6. Criterios para pasar a producción

1. Las comprobaciones del preview pasan (o C09 queda en «no determinable», con decisión explícita del propietario).
2. **R3/5** con el mismo auditor sobre: evidencia local, evidencia del preview y esta adenda.
3. Con R3 aprobado: merge según el flujo vigente y despliegue a producción.
4. Smoke de producción breve (no la matriz entera): `tools/list` en ambas eras, una llamada por tool, un `read_guide` con verificación de hash, card/ARD y un negativo (403 por Origin null). Como máximo 20 solicitudes.
5. Revert preparado antes del merge (commit y comando listos). Si el smoke falla, revert inmediato, sin diagnosticar en producción.

## 7. Lo que no cambia

R1/R2 FAIL históricos, `focal.log` y todos los originales, la política search=yes/ai-input=yes/ai-train=no, F5/F6 fuera, sin scans ni score. El bug 100 se cierra o no según la evidencia del preview, no por esta decisión.
