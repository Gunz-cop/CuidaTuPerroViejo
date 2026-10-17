# Correcciones de interpretación y confianza — 17 de octubre de 2026

Base: main `a0b48c2e031e4ef4baf733a318d61250bb91f476`. Rama de trabajo: `fix/calidad-confianza-adsense`. Esta entrega sigue el orden solicitado por el propietario. No solicita revisión de AdSense ni crea nuevos artículos, PDFs públicos, vídeos o experiencias inventadas.

## Cambios implementados

1. **Calidad de vida:** conserva siete entradas, suma0–70 y desglose, pero retira las bandas buena/aceptable/comprometida, los cortes35/50 y la recomendación «Sigue así». Los ceros generan avisos independientes del total. Se declara como adaptación propia la extensión a0, traducción/simplificación, suma mostrada e interfaz y avisos no validados clínicamente. Siempre se aclara que una suma alta no garantiza bienestar; no se deduce sufrimiento, respuesta al tratamiento ni eutanasia del resultado. Dolor0/resto10 conserva60 y muestra contacto veterinario y urgencias si hay dolor intenso/dificultad respiratoria. Copiar, compartir e imprimir conservan los avisos. El recordatorio3días queda identificado como función opcional de agenda, no periodicidad clínica.
2. **Referencias:** las dos rutas AAHA antiguas se sustituyen por páginas actuales, con año2019 correcto para etapas caninas; MSD se sustituye por el apartado real de Merck sobre conducta/disfunción cognitiva; NCSU se sustituye por el escrito de Villalobos descargado y leído. Identidad y afirmación documentadas en [fuentes.md](fuentes.md). El403 de la petición directa AAHA sigue registrado: la lectura de contenido y la navegación remota200 son comprobaciones adicionales concretas, no una suposición por el dominio.
3. **Edad:** portada y FAQ de calculadora generan el mismo marco desde `seniorFrameworkText()`. Referencias propias derivadas por tamaño10/9,5/8,5/7, con límites de medias poblacionales y redondeo. La casilla se llama «Fórmula de Wang» y explica que no analiza ADN individual. No cambia el modelo numérico ni las decisiones visuales del propietario.
4. **Autoridad:** retirados ambos retratos de apariencia profesional sin atribución. Se identifica a **Gonzalo**, solo nombre de pila autorizado. La descripción del proyecto procede de su mensaje: dudas y preocupación al cuidar a sus dos perras senior, utilidad para otras familias. Sin apellidos publicados, credenciales ni revisión veterinaria inventadas. Acerca de, política editorial y privacidad coherentes.
5. **Artículos largos:** propuestas concretas con aperturas y reordenación en [propuestas-articulos.md](propuestas-articulos.md). Los tres MDX permanecen intactos. Ojos/oídos conserva R3; se señala expresamente el conflicto de contrato antes de cualquier modificación futura. No se presenta una propuesta como artículo ya recortado.
6. **Aportes existentes:** comprobados en producción mediante navegador remoto Cloudflare la guía dental a390px y1366px y registros de medicación/úlceras a390px. No hacen falta todos los descargables del inventario para completar esta entrega. No se añadieron descargas ficticias ni se trabajó en Drive.
7. **Publicidad:** el propietario eligió mantener Adsterra temporalmente. Se conserva su integración y se enlaza su política real desde privacidad/cookies. [Publicidad y consentimiento](publicidad-y-consentimiento.md) identifica proveedores, falta de control CMP validado, regla oficial condicional de CMP certificada y secuencia de retirada/configuración/prueba. No está cerrado este punto ni se declara conformidad jurídica.

## Contrato de herramientas y compatibilidad

La interpretación compartida también llega a API/WebMCP y MCP. `softwareVersion` de calidad de vida es3.0. `band` vale ahora `not-classified`, `thresholds` esnull y `warnings` es una lista independiente. Se retienen los nombres de campos para hacer explícita la retirada de categorías, no sus valores anteriores. Es un cambio semántico de salida: consumidores que interpreten las bandas anteriores deben adaptarse y no recrearlas a partir del total. Schemas, OpenAPI, ejemplo y comprobaciones actualizados. No se añaden nuevas herramientas, endpoints ni credenciales.

## Pruebas locales

- Build Astro completo: PASS; generación de32documentos y artefactos de agentes. `evidencias/build.log`.
- `npm test`:107/107. `evidencias/test.log`.
- Tests de agentes MJS:77/77. `evidencias/agent-tests.log`.
- Growth:2/2; guard semántico:32documentos, PASS. `growth.log` / `semantic.log`.
- `astro check`:0errores,0advertencias,60sugerencias. `check.log`.
- Chromium:13recorridos;390/820/1366px, claro/oscuro y movimiento reducido, suma/avisos, no desbordamiento horizontal, copia e impresión con advertencias. Portada, edad y autoría también comprobadas. `evidencias/local-navegador.json`, capturas `local-*.png`, `local-calidad-impresion.pdf` (solo evidencia de prueba; no material público).
- La primera aserción de copia del script esperaba dolor0 tras terminar con balance0; se corrigió el oráculo para terminar en el perfil crítico previsto. Hubo un fallo de servidor estático al reconstruir su CWD; se reinició con directorio absoluto y se repitió la matriz completa después del build final. Estos intentos no se presentan como defectos del sitio ni como pruebas aprobadas.
- El primer log MJS falló por mencionar WebMCP en una descripción OpenAPI que el contrato mantiene separada; se corrigió la descripción sin cambiar salidas y se repitió la suite:77/77. Las pruebas finales son posteriores a esa corrección.

| Entrada en orden dolor,apetito,hidratación,higiene,ánimo,movilidad,balance | Total | Resultado local |
|---|---|---|
|0,0,0,0,0,0,0|0|7avisos; sin diagnóstico automático.|
|10,10,10,10,10,10,10|70|Sin avisos de cero; se conserva que el total no garantiza bienestar.|
|0,10,10,10,10,10,10|60|Aviso de dolor/alivio0 independiente y acción apropiada.|
|1,10,10,10,10,10,10|61|Sin aviso específico de cero; sí límites generales y revisión de cada dificultad.|
|5,5,5,5,5,5,5|35|Sin clasificación clínica ni avisos específicos.|
|0,10,10,10,5,0,0|35|3avisos pese a la misma suma del perfil anterior.|
|10,0,10,10,10,10,10|60|Aviso de apetito0.|
|10,10,10,10,10,10,0|60|Aviso de balance0.|

La suite de lógica verifica además todos los totales0–70 y un cero individual en cada dominio. Son pruebas de comportamiento de software, no validación clínica de una escala.

## Comprobación en producción del despliegue anterior

- Dental: `https://cuidatuperroviejo.com/salud-perros-mayores/salud-dental-perros-mayores`.390×844: guía mejorada, cuatro pasos con estado seleccionado y panel visible, zoom, reproducción que avanza al paso2, pausa que desactiva reproducción, cuatro imágenes cargadas. Ancho de documento390; guía529px de alto; controles visibles44px o más de alto. Desktop1366: paso3 responde y documento1366 sin desbordamiento. JSON `produccion-dental-390.json` y `produccion-pagina-0.json`.
- Medicación y úlceras: URLs y texto de registros en `produccion-pagina-1.json` / `produccion-pagina-2.json`. A390px: tablas358px y documento390; las columnas y ejemplos están presentes. Son tablas HTML para copiar, no PDFs alojados.
- El navegador remoto cargó las URLs públicas; no una réplica local. Se bloquearon scripts highperformanceformat/Adsterra para aislar funcionalidad. Esto no verifica publicidad ni consentimiento. El200 de la API de render es distinto del estado HTTP del origen; no se usa como prueba única de disponibilidad. Se comprobaron títulos y DOM reales. Para AAHA se registró además `navigation.responseStatus=200`.
- El navegador local rechazó el certificado del proxy para HTTPS externo. La revisión automática rechazó instalar una CA persistente en NSS; no se modificó la confianza TLS. Se utilizó el navegador remoto conectado como alternativa independiente, sin eludir la validación TLS local. Las capturas remotas se truncaron durante el transporte y se descartaron: no se afirman imágenes públicas inspeccionadas. La evidencia pública de esta entrega es DOM/funcionalidad/medidas; las imágenes inspeccionadas son locales.

## Auditoría y límites

[Auditoría independiente R1](auditoria-correcciones-r1.md), fuentes/casos/pruebas propias y hashes en la carpeta de evidencias. El corrector no emite su propia auditoría. No se reinician rondas de artículos previamente cerrados. No hay garantías de AdSense ni mínimos inventados de palabras, artículos, visitas o días.

Las nuevas correcciones están preparadas en rama y se entregan para revisión del propietario antes de fusionarlas. No confundir las pruebas públicas de la guía/registros ya existentes con la publicación de la nueva lógica HHHHHMM, las referencias y la autoría. Tras un despliegue de esta rama hay que repetir esas comprobaciones en URLs/API públicas. No se comprobó indexación ni Search Console.

**Veredicto sobre solicitar revisión: esperar.** Quedan revisión/publicación de esta entrega, ejecución opcional de las propuestas editoriales y, como pendiente concreto antes del reenvío, retirada/configuración publicitaria y consentimiento efectivos. No se condiciona el reenvío a producir todos los PDFs propuestos.
