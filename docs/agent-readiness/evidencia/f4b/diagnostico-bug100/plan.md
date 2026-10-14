# Bug100 — plan finito de diagnóstico local

Autorización del propietario: 2026-10-14. Mantener implementación **R2/5 FAIL**, STOP de aceptación/integración/publicación. No consume R3. Producto preservado `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`; cierre documental R2 `e54e81c`. Originales históricos inmutables. No main, producción, scans ni preview nuevo.

## Versiones y preparación

Wrangler **4.128.0**, Miniflare **5.20260831.0-alpha**, workerd **1.20260831.1**, Node **24.19.0**, Undici incluido **7.29.0**. Se usa el binario instalado, sin instalación ni cambios de dependencias/configuración del producto. Compatibilidad Workers `2026-05-23`, flags `global_fetch_strictly_public`, `nodejs_compat`.

Dos targets diagnósticos privados: (a) Worker mínimo sin SDK/Astro/assets, que copia contador streaming/cancel y clasificaciones 415/406/413; (b) copia del build real 192dcdd con sus módulos, assets y bindings locales, instrumentada sólo con console.log en ingreso, lectura, cancel y respuesta elegida. Se preserva copia previa de entry y diff de instrumentación. No se reconstruye ni modifica el producto. Configs diagnósticas privadas apuntan a copias con rutas absolutas y estados locales nuevos; no son una propuesta de configuración de despliegue.

## Matriz cerrada y presupuesto

**Cuatro lanzamientos, ocho solicitudes cada uno: máximo 32 solicitudes HTTP, cero retries.** Orden: mínimo/Node fetch; aplicación/Node fetch; mínimo/node:http; aplicación/node:http. Un proceso nuevo por pareja, no reiniciar un proceso caído durante su secuencia. Arranque se detecta en stdout, sin solicitudes adicionales. Los puertos locales 8911–8914 se reservan para estos procesos; sólo se detienen procesos propios.

En cada pareja, secuencia fija POST `/api/mcp`:

1. Ping legacy válido, 200 esperado.
2. Mismo JSON con Content-Type text/plain, 415 esperado, body conocido.
3. Mismo JSON con Accept application/json, 406 esperado, body conocido.
4. Ping válido + whitespace final hasta **32768 bytes**, upload en streaming sin Content-Length, 200 esperado.
5. Ping válido posterior, 200 esperado.
6. **32769 bytes**, upload en streaming sin Content-Length, 413 esperado.
7. Ping válido posterior, 200 esperado.
8. Batch JSON inválido, 400 esperado.

Headers válidos: Content-Type application/json, Accept application/json, text/event-stream; MCP-Protocol-Version 2025-11-25. Sin Origin, sesión, auth ni Connection: close. Node fetch usa ReadableStream con una emisión y cierre, duplex half, igual al caso previo observado; node:http escribe el mismo Buffer sin longitud y usa keep-alive. Se registran los headers efectivamente recibidos por el Worker y el framing visto por node:http; no se presume que todo intermediario preserve condiciones. Se registran bytes/hash de payloads, resultados/cuerpos/headers y errores. Timeout de cliente 12 s, salida capturada con cap 64 KiB; no consumo ilimitado de upload ni respuesta.

## Instrumentación y decisiones

Worker: ingreso con identificador secuencial, Content-Length/Transfer-Encoding y headers de protocolo; tamaño acumulado; inicio/settlement de cancelación; excepción; status elegido. Cliente: status/cuerpo recibido o error, socket/framing para node:http. Host: estado de proceso al inicio/final y después de cada petición, logs completos. Contrastar status elegido frente a recibido y petición posterior; registrar alcance de lo que cada log prueba.

Si el mínimo reproduce el fallo sin SDK/Astro, evidencia a favor del transporte local, sin declarar causa definitiva. Si sólo falla una familia de cliente, aislar su contribución sin quitarla del gate. Si sólo falla la aplicación, revisar composición de producto dentro del ownership. Cloudflare#15709 sigue siendo referencia similar, no prueba causal.

No variantes sucesivas. Si falta evidencia, presupuesto o solución sustentada, detener y entregar diagnóstico. Un cambio de entorno/configuración/dependencias requiere propuesta exacta y admisión antes de incorporación; no se elige upgrade por ensayo. Una corrección de producto sustentada puede realizarse dentro del ownership, con un plan adicional finito de verificación afectada declarado antes de ejecutarlo.

R3/5 sólo tras demostrar localmente límites, exceso streaming413 y continuidad posterior, además de deadline/cuotas/recursos; entregar nuevo SHA/tree y evidencia fija al mismo auditor. Si no se resuelve, **no solicitar R3** ni consumir otra auditoría. No debilitar C08 ni cambiar 413/400.
