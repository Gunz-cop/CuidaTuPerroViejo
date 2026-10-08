# Aclaración de conteo de STOP R3

El STOP original y su sello se conservan sin cambios. El campo histórico `capturedRequestsIncludingFailing: 1126` cuenta IDs alcanzados, no requests HTTP.

El conteo de tráfico correcto es: 845 respuestas HTTP validadas, 1 respuesta HTTP capturada que causó el STOP, 280 N/A sin request y 158 IDs no intentados. Total: 846 requests HTTP de 1.284 IDs planificados. El ID que causó el STOP aparece primero entre los 159 IDs restantes; los otros 158 nunca se solicitaron. No hubo reintento.
