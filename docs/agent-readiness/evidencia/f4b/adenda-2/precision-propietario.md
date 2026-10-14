# Precisiones del propietario — adenda 2

Fecha de recepción: 2026-10-14. Suplemento; no sustituye el original ni el dictamen pendiente histórico.

**Decisión del propietario sobre las dos precisiones de la adenda 2.** Ambas quedan admitidas en estos términos exactos:

**1. 500 del deadline de 10 s: exceptuado del STOP solo si se cumplen las tres condiciones a la vez.**
- **Plazo:** el 500 llega entre 10 y 12 s después de iniciar la petición. Antes de 10 s no cuenta como deadline.
- **Cuerpo:** exactamente el error JSON-RPC sanitizado del contrato (`-32603`, `Internal error.`), sin stack, rutas ni detalles internos. Se captura completo antes de evaluar la aserción.
- **Recuperación:** la petición inmediatamente posterior responde con normalidad, lo que acredita que `active` y el lease se liberaron.

Si falla cualquiera de las tres: STOP. Si la respuesta es una página de error de Cloudflare (52x en HTML, con `Cf-Ray`), se clasifica como plataforma, no como producto, y también es STOP para mi revisión. Esta excepción aplica solo al caso del deadline. Cualquier otro 500 del producto en el preview sigue siendo STOP directo.

**2. Cuota POST 120/121: puede quedar «no determinable en plataforma», igual que 90/91.**
Es el mismo mecanismo: un `Map` en memoria por isolate con la clave `CF-Connecting-IP` (`runtime.ts:130-137`). Mismas reglas que 90/91:
- Registrar el status de cada petición, con `Cf-Ray` y colo si vienen en los headers.
- No reintentar para forzar el 429.
- No es FAIL ni PASS. Queda sujeto a mi decisión posterior.

**Precisión operativa:** el contador de 120 suma todos los POST de la misma IP en la ventana de 60 s, incluidos los de pasos anteriores de la matriz. La prueba de cuota debe arrancar en una ventana nueva: esperar en tramos de 20 s como máximo, sin enviar peticiones. Si no, un 429 anticipado no se puede interpretar.

Con esto, la adenda 2 queda completa. Autorizo ejecutar la matriz pendiente en el preview conforme a la instrucción vigente: SDK real con Node fetch, máximo 320 peticiones, sin retries ni redirects, solo rutas de solo lectura, y la regla de 3 intentos o 2 horas por bloqueo. El rollback `d6f4bdd` queda como referencia para la fase de producción. R3 solo tras el resultado del preview. Sin `main`, producción ni scans hasta entonces.
