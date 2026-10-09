# Bug #69 — equivalencia débil del ETag en respuestas 304

Estado: **propuesta offline lista para auditoría independiente; no aceptada y no ejecutada en HTTP**.

Base pública fija: `c8de1985e7b4485edba36b222f606c8cd1e32580`, tree `cc93e59338abd7adf4ad41fdb34fd3bf593cd03c`. El paquete no cambia producto, configuración, contratos, dependencias ni matriz.

## Defecto

La matriz detenida de #68 observó en el mismo contexto home/Markdown/gzip un GET 200 con `ETag: W/"c262365b8aeb7213ef529ce3e9d9fa15"`, seguido por GET con ese If-None-Match y respuesta 304 con `ETag: "c262365b8aeb7213ef529ce3e9d9fa15"`. El cuerpo del 304 y la métrica de descarga fueron cero. El token opaco, incluida su capitalización, coincide; sólo cambia el prefijo `W/`.

El runner anterior comparaba el valor completo del ETag de respuesta con el del GET baseline. La corrección acepta equivalencia débil cuando ambos valores son tags válidos y su opaque-tag coincide byte por byte, ignorando sólo un prefijo `W/` válido. No modifica headers capturados ni genera un ETag distinto.

## Alcance y controles

La comparación se aplica exclusivamente a las validaciones del ETag de respuesta 304 frente a la respuesta GET de origen, para las matrices conditional identity y compression supplement. Cada comparación conserva el mismo candidato, ruta, representación, codificación y dependencia GET fijada por el plan.

El plan conserva sus 1.284 IDs, 43 chunks, orden, presupuestos, dependencias, requests, métodos y expectativas. Permanece inactivo, con source c8de, sin receipt, preview, check IDs ni hosts autorizados.

Tags con distinto opaque-tag o distinta capitalización siguen fallando. También fallan tags malformados, repetidos o ausentes para Markdown y fuentes de otro contexto. Status 304, cuerpo vacío, tags nativos de Markdown, comprobaciones 200, alternancias y coherencia GET/HEAD conservan sus reglas previas.

## Evidencia

`fixtures/actual-gzip-markdown-home/` contiene una proyección curada de los GET/HEAD baseline y del 304 observado en #68. El cuerpo gzip GET es un carrier Base64 ASCII que decodifica a los bytes wire capturados exactos; su entidad decodificada conserva el SHA del home Markdown. La proyección incluye sólo headers de contrato seleccionados y no copia URL, proxy, headers intermedios, traces, logs ni índices operativos. Los raws completos permanecen en el conjunto privado de evidencia #68. La HEAD baseline y el 304 no tienen entidad y registran métrica de descarga cero. La fixture se etiqueta como captura real; los demás casos nuevos de protocolo se etiquetan como sintéticos.

Los resultados offline pasan por el `run_one` y `validate_response` originales con transporte curl simulado. Ningún test realiza HTTP. La simulación completa de los 1.284 IDs conserva el stop-first, codecs gzip/Brotli y los diez casos N/A ya respaldados. No se reejecuta Workerd ni la matriz pública detenida.

La verificación de build/paridad se coteja en los 57 artefactos contra el predecesor fijado, incluido CSS. El índice del paquete enumera sólo archivos UTF-8, cada uno de hasta 24 KiB, y excluye su propia referencia circular. La entrega queda pendiente de auditoría #69 R1/5; el bloque formal B sigue en 0/5.
