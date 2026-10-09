# Recuperación R3 de bug #65

## Estado

Paquete para auditoría independiente R3/5. **Listo para auditoría; no aceptado.** La auditoría R2 cerró R1-B01–B07 y confirmó que la serie local previa conserva sus ocho respuestas y fuentes. R2-B01 detectó que seis expectativas GET 400/406 no obligaban a observar sus literales contractuales. Esta entrega corrige únicamente esa validación y la simulación offline. No se hicieron nuevas capturas Workerd, requests HTTP públicos ni cambios de runtime, contrato o stack.

## Corrección R2-B01

Los seis IDs de negociación ahora fijan los SHA-256 y bytes base64 del literal correspondiente en el plan. El helper aplica además una comprobación obligatoria independiente del campo opcional de expectativa: status 400 debe contener `Invalid Accept header.\n` (23 bytes, SHA-256 `a5e285f4ea4df7aa7c0a38457d808fb819113874ce120b5c4b092d1412a871d3`); status 406 debe contener `No acceptable representation.\n` (30 bytes, SHA-256 `7414baeed275ad5e3d23b32ca6c4e3b2acdcafb9922eb77f074ffcfaff541c6c`). El salto de línea final es parte de cada entidad.

Las 12 pruebas offline pasan por el `run_one` y `validate_response` reales con transporte sintético. Seis respuestas exactas atraviesan `execute_plan`; cuatro controles negativos (cuerpo vacío e incorrecto para cada status) acreditan STOP, preservación de bytes/cabeceras parciales y lista de pendientes en `error-body-test-result.json`. La simulación completa conserva exactamente 1.284 IDs, grupos, rutas y presupuesto; usa 1.274 transportes simulados y 10 N/A documentados, sin requests de red. Incluye los seis GET 400/406 con sus literales correctos. Ver `full-plan-simulation-result.json` y `test-suite-output.txt`.

## Serie local B07 reutilizada

Esta entrega referencia, sin duplicar ni reconstruir, los insumos y capturas originales R2: árboles de assets de 315 y 316 archivos, bundle compilado de 26 archivos, configs aisladas ya corregidas y manifiesto privado de capturas de 87 archivos. Sus orígenes son los recibos R2 de preparación (`1a6eb386fad337525c7bb808c55c04e722c19dbba6c1404ad1c7601472844d8d`), corrección de configuración (`4f1974c74b7cd1dd7e5e0273e5bd66160cd2e5e17fd39fdb9420c3c9c948ec02`) y la tanda local previa de ocho requests (`796300c2498e43f1d23a4e84ea57172b7bddefcae5773469041f65d9301d2ef8`). Se conservan los objetos raw CRLF y los cuatro GET de 37 bytes; los cuatro HEAD tienen entidad vacía y métrica de descarga cero. R3 no reejecutó Workerd ni curl real.

Los manifests públicos son la proyección curada; las omisiones nombran archivos privados por ruta relativa, bytes y SHA-256. Trazas, logs íntegros, configs completas, direcciones locales, PIDs y demás metadatos de infraestructura continúan fuera del paquete. El recibo `post-build-r2-retention-cotejo.json` verifica de nuevo, después del build R3, los mismos manifests R2: 315/316 archivos de entrada, bundle 26, dos configs y 87 archivos de captura para los mismos ocho casos. Los recibos originales permanecen sin modificar.

## Build y alcance

El build R3 es documental sobre el runtime inalterado en `e3492afd661d6d96535717d8d5caa3bfc3d9498d` (tree `a00ab14cbf28c929c9762321b05786a5746079db`). Los 57 artefactos fijos se cotejan por bytes y SHA contra el predecessor conservado; `/contacto` mantiene su observación dinámica sin hash histórico fijo. La matriz propuesta permanece inactiva hasta que el coordinador incorpore los recibos oficiales vigentes en una copia posterior del plan. Este paquete no es aceptación pública, no autoriza `main` y no cambia la norma.
