# Propuesta de corrección offline — bug #68

Estado: **corrección offline preparada; pendiente auditoría independiente. No aceptada.** Este paquete sólo agrega evidencia y el helper del registrador bajo ownership de bug68; no cambia producto, SDD, stack, dependencias ni configuración. No se hizo HTTP durante la corrección.

## Hallazgo observado y alcance

La única matriz autorizada de bug67 se detuvo en `delegation:delegation-discovery-contacto-get`: GET `/contacto` respondió 200 con `Content-Type: text/html`; el plan esperaba `text/html; charset=utf-8`. La entidad real, de 35.067 bytes, es UTF-8 válido e incluye una declaración meta de UTF-8. Está retenida byte por byte en partes binarias curadas; el hash de la fixture no se usa como hash histórico esperado en el nuevo plan. Los headers completos, solicitudes, métricas y trazas siguen privados. El HEAD de `/contacto` no fue capturado en esa matriz; toda prueba HEAD de este paquete es un control sintético.

La corrección extiende la política MIME semántica, estrictamente acotada a diez IDs: GET/HEAD de `/contacto`, `/gracias`, `/politica-de-cookies`, `/politica-de-privacidad` con status 200, y GET/HEAD de `/__f2b-does-not-exist__` con status 404. Para esos IDs acepta sólo un `Content-Type` `text/html`, con charset omitido o UTF-8. Rechaza otro tipo, charset incompatible, parámetros desconocidos, parámetros duplicados, sintaxis inválida y múltiples campos. Los GET de estos IDs requieren decodificación UTF-8 estricta. Las ocho respuestas 200 mantienen body hashes existentes cuando estaban especificados; `/contacto` sigue guardando y validando su cuerpo observado, sin exigir SHA histórico. La fila 404 mantiene status y cuerpo esperados. B08 conserva el requisito de cuerpo no vacío para el GET de `/contacto`.

Estos diez IDs son HTML nativo de páginas delegadas o de error. Aunque sus requests envíen `Accept: text/markdown`, el helper no los clasifica como representación Markdown negociada ni les aplica el requisito ETag de Markdown. Las otras respuestas HTML/Markdown, errores negociados, `/_astro` CSS, recursos explícitos, redirects y 28 rutas del corpus conservan sus reglas exactas. La política CSS previa de bug67 permanece limitada a sus dos IDs originales.

## Plan inactivo

El plan conserva 1.284 IDs únicos, 43 chunks, los mismos grupos, presupuesto, métodos GET/HEAD, rutas, dependencias y hashes de entidad. Sólo declara MIME y política semántica para los diez IDs nativos indicados. El source es el commit público `ae815733001d893792e515a8edf7cbb79a5b37ac` / árbol `83125ec6a070dd61f839e82dc630ccd3e551297b`; preview, checks y hosts están vacíos. El plan está **inactivo** y no habilita ejecución. La próxima matriz requiere auditoría independiente, un candidato nuevo con su propio receipt/checks/preview y autorización root específica.

## Verificación offline

Suite: 24 pruebas PASS. Incluye replay del GET real de `/contacto` por `validate_response` y `policy_checks`, controles HEAD sintéticos, parser MIME positivo/negativo, UTF-8 válido/inválido, status incorrecto, separación de representación nativa frente a Accept Markdown, alcance exacto de políticas y reglas CSS/error body existentes. Una simulación TEST ejecuta el `run_one` y `validate_response` reales con transporte simulado para los 1.284 IDs: 1.274 respuestas sintéticas y 10 N/A, sin curl, Workerd ni HTTP real. No representa una aceptación pública.

El build y la comparación de los 57 artefactos se registran en `build-parity-57.json`. El CSS capturado anteriormente se conserva sólo como fixture de regresión; no se importan ETags ni resultados del preview histórico.

## Límites

La matriz bug67 permanece detenida y sellada. Este trabajo no la completa ni la repite, no cierra la auditoría formal F2B, no habilita `main` y no publica nada. Los resultados de esta propuesta requieren auditoría independiente antes de un nuevo candidato o matriz pública.
