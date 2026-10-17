# Corrección editorial y preparación para revisión de AdSense

Trabajo realizado el 16 de octubre de 2026; cierre de entrega el 17. Base inicial `main` b46f7c7. Antes del cierre se incorporó `main` da32d5c, cuyo único cambio era documental en la skill de redacción y su referencia visual; se leyeron y conservaron esos cambios. Al cierre también se incorporó `main` 8b53656 (herramienta de edad MCP, sin solapamiento editorial) y se repitieron build, tipos, tests e integración de artefactos. Rama `correccion/editorial-adsense-2026-10-16`.

**Resultado: correcciones implementadas y auditoría editorial independiente apta dentro del alcance. Recomendaría solicitar la revisión después de publicar estos cambios y comprobar su versión pública y rastreo. Ahora todavía corresponde esperar: producción conserva los errores antiguos.** No se envió solicitud a AdSense ni se desplegó esta rama. Adsterra no forma parte de la evaluación.

## 1. Qué se corrigió

Se comprobó el archivo de 19 artículos. Se modificaron 16. Ojos/oídos conserva su aprobación R3 y no se reabrió ni se reescribió; baño y callosidades se conservaron tras comprobar sus fuentes, imágenes y límites.

|Página o grupo|Corrección implementada|
|---|---|
|Cushing|Retirados tres PMID mal asignados: los dos conocidos y un tercero detectado. Fuentes reales localizadas por título y verificadas. Corregidas autoría y conclusiones de seguimiento y presión arterial; retiradas dosis, ajustes, historia Bruno no acreditada y promesas de recuperación/supervivencia.|
|Alimentación casera|Retirada receta/proporciones universales, supuesta absorción superior y protección renal. Formulación individual, textura, higiene, inapetencia y registro útiles; infografía con promesas retirada.|
|Úlceras por presión|Retirados ProtocoloMax, cura doméstica con apósitos/cremas/suplementos y rotación universal. Plan individual, consulta temprana y registro; diagrama mal rotulado retirado.|
|Medicación|Retirada descarga 404 y promesa SEO de cinco técnicas; registro HTML. Sin forzar labios/deglución, triturar por apariencia, suspensiones caseras o regla universal de redosificación.|
|Dental|Retirados falso vídeo/ID, promesa de descarga no acreditada y montaje antes/después. Instrucciones propias de cepillado con fuente y límites; riesgo anestésico individual y alt corregidos.|
|Cognitiva y urinaria|Duke y Toby dejan de presentarse como pacientes documentados. Corregidos denominadores de Salvin, límites de suplementos, garantías de higiene y recomendaciones sin respaldo.|
|IPE|Sin dosis de enzimas/B12, control del 100 % ni trayectoria clínica reconstruida desde un resumen. Watson se limita a la serie y datos accesibles; fuentes junto al pasaje y respuesta variable.|
|Incontinencia fecal|Reservorio con urgencia consciente y fuga pasiva diferenciados. VCA sustituye atribución a capítulo no leído. Caso Kim: continencia a los 6 días, revisión a los 3 meses y muerte a los 9 meses poscirugía, sin extrapolar eficacia general.|
|Poliquezia|Conservado relato del propietario de Dakota/Luna, sin atribuirle causa ni recuperación. Corregidos Bosch, Weber, rango fecal universal y mecanismos no demostrados. Imágenes generadas identificadas como IA.|
|Cama y caídas|Retirados porcentajes de mercado, densidades/grosores/pendientes clínicos universales, prevención garantizada y pruebas caseras de propiocepción. Criterios observables y consulta.|
|Vacunas y chequeo|Clasificación/región de leptospirosis, intervalos específicos de rabia y CAPC contextualizados. Sin calendario estacional universal ni suplementos rutinarios. Fuentes AAHA específicas para pruebas y seguimiento.|
|Agresividad y ansiedad|Fefer: 5 respuestas a 90 dB, 2 no probados y 1 sin respuesta dentro del grupo de 8; corregido cuerpo/FAQ. Serie de 12 casos no demuestra «casi siempre dolor». Viñeta compuesta sin diagnóstico o recuperación ficticiamente documentados; encuesta de 318 no es ensayo de eficacia.|
|Portada y herramientas|Retirada atribución de historia real de uñas sin procedencia. Selector de movilidad sin garantías, pautas universales o citas no identificables; textos visibles, esquema y API coherentes. Cuatro títulos del catálogo del asistente sincronizados.|
|Páginas institucionales|Privacidad sin Blogger; formulario, asistente, votos/huella IP y almacenamiento local descritos contra código. Retirado panel que aparentaba controlar una analítica no incorporada. Responsabilidad editorial y contacto reales, sin credenciales o revisión veterinaria inventadas.|
|Imágenes responsive|Se detectaron cuatro hero sin variante de 400 px. Helper y tarjetas de portada anuncian solo variantes existentes; test y navegador confirman carga. No se editaron/generaron imágenes para simular pruebas clínicas.|

Detalle verificable: [fuentes y correcciones](fuentes-y-correcciones.md), [contrato del alcance](contrato-correccion.md) y [anexo de imágenes/procedencia](auditoria-anexo-imagenes-procedencia-vacunas-r1.md).

## 2. Qué queda pendiente y por qué

- **Publicación:** la rama debe integrarse y desplegarse antes de que el lector reciba las correcciones. `main` despliega automáticamente. Se prepara un PR en borrador para revisión; su existencia no equivale a publicación.
- **Comprobación pública y rastreo:** repetir las páginas afectadas, recursos y navegación tras el despliegue; consultar Search Console para indexación, inspección de URL y posibles acciones manuales. No hubo acceso a los datos internos de Search Console/AdSense y no se infiere una acción manual de un rechazo.
- **Materiales externos:** el contenido/descarga de dos PDF en Drive no se acreditó; la página de vista previa 200 no basta. La descarga fue rechazada por revisión automática por la restricción de no trabajar en Drive, y se respetó el bloqueo. Sus promesas ya no están publicadas en la versión corregida, por lo que producirlos después no bloquea por sí solo esta corrección.
- **Vídeo dental:** la búsqueda en YouTube quedó bloqueada con 403 y no se validaron contenido/autoría/embebido. Se retiró la promesa y se entregan instrucciones útiles. No hay un vídeo obligatorio pendiente.
- **Límites de prueba:** navegador sobre build estático local, con terceros bloqueados para excluir publicidad. No certifica ejecución del Worker público, entrega real del formulario, IA en vivo, consentimiento/publicidad o indexación. No se enviaron mensajes, formularios, votos o preguntas externos durante las pruebas.

## 3. Materiales para la sesión de Drive

1. Calendario de medicación: pauta prescrita copiada, horario previsto/real, toma administrada/rechazada/incierta, incidencias y cuidador.
2. Checklist mensual de salud senior: cambios de peso, apetito, agua, eliminación, boca, sueño, movilidad y preguntas clínicas.
3. Hoja de observación HHHHHMM: fecha, siete dominios, evolución y límites, sin convertir puntuación en decisión médica.

Artículos, finalidad, contenido propuesto, enlaces anteriores y pruebas en [inventario de materiales pendientes](materiales-pendientes.md). No se crearon PDF vacíos, enlaces públicos ficticios ni archivos nuevos en Drive.

## 4. Auditorías y pruebas

El corrector no emitió su auditoría independiente. Un auditor separado leyó versiones, abrió fuentes por su cuenta e inspeccionó 63 imágenes. Los informes explican acceso parcial, rondas y qué fue lectura completa o comprobación focal; ninguna comprobación focal se presenta como nueva revisión clínica exhaustiva.

- [Auditoría inicial del archivo](auditoria-fuentes-resto-r1.md) y [anexo](auditoria-anexo-imagenes-procedencia-vacunas-r1.md).
- [Cierre editorial de 21 archivos](auditoria-final-editorial.md): apto dentro del alcance; documentos que alcanzaron R3 cerrados sin reinicio.
- [Cierre adicional de portada, movilidad, catálogo y expectativas](auditoria-adicional-final.md), [rondas del selector](auditoria-movilidad-catalogo-r1.md).
- [Responsive](auditoria-srcset-r1.md) y [sincronización técnica del aviso ya aprobado](auditoria-paridad-aviso-r1.md), separada de las rondas clínicas.
- [Formato de copias/hash de evidencia](formato-evidencia.md): snapshots terminan en `.txt` para que no se compilen como código.

|Comprobación local|Resultado y límite|
|---|---|
|Build Astro|Correcto; 32 documentos de proyección/API generados.|
|Pruebas principales|104 aprobadas, 0 fallos tras incorporar `main` (94 en la versión editorial previa). Incluye contrato responsive contra archivos reales y regresión de lógica/API.|
|Agent-readiness offline|77 aprobadas, 0 fallos.|
|Comprobaciones del build|Inventario, descubrimiento, proyección Markdown, artefactos/API/herramientas, routing y semántica independientes correctos.|
|SEO offline y specs migración|Sin problemas; 7 specs comprobadas.|
|Navegador Chromium|36 páginas a 1440 y 390 px: 72 visitas, 120 destinos/recursos internos con respuesta 200, sin imágenes fallidas ni desbordamiento horizontal.|
|Herramientas|Seis recorridos: edad actualiza resultado/ARIA, HHHHHMM: 5 × 7 → 35 e invoca impresión, selector muestra resultado/alerta, en ambos anchos. No se alojó un PDF de prueba ni se enviaron mensajes externos.|
|Tipos|0 errores, 0 advertencias y 59 sugerencias; registro en `evidencias/check.log`.|

Resultados reproducibles, capturas móvil/claro/oscuro, scripts y registro de versión en `evidencias/`. Los fallos responsive, aviso UI/API y formato de snapshots encontrados durante el trabajo se corrigieron; no se ocultan tras el primer build aprobado. La primera prueba de edad leyó un span vacío que usa contador CSS; se corrigió la prueba para observar CSS/ARIA, no se alteró la herramienta para satisfacerla.

## 5. Veredicto actualizado y criterios

**Solicitar revisión después de comprobar publicación y rastreo de esta versión. Mientras no se publique, esperar:** en la comprobación pública del 16 a las 18:53 UTC Cushing seguía mostrando los tres PMID erróneos y medicación aún enlazaba el calendario 404. Registro en `evidencias/publicacion-observada.json`.

Los criterios oficiales de Google enlazados exigen valor/contenido propio, navegación y entrega real de lo anunciado. Ver [AdSense: contenido y experiencia](https://support.google.com/adsense/answer/10015918?hl=es) y [políticas para editores](https://support.google.com/publisherpolicies/answer/11035931?hl=es).

La trazabilidad detallada de fuentes, separación de historias/ilustraciones, política de dosis, límites de tres rondas y revisión editorial son controles del proyecto y recomendaciones de fiabilidad. No se presentan como cuotas oficiales de Google ni como requisitos de un número fijo de artículos, palabras, visitas o días de espera. La autoría institucional no se considera por sí sola una infracción. No se garantiza aprobación de AdSense ni se atribuyen a Google motivos internos que no conocemos.

La repetición final está en `evidencias/integracion-main-*.log`. El primer intento de build/tipos encontró una ruta de configuración de Astro no escribible: se repitió con `ASTRO_TELEMETRY_DISABLED=1` y `XDG_CONFIG_HOME=/tmp/ctpv-config`. Las pruebas offline necesitan sockets locales y se repitieron con ese permiso. Estos fallos de entorno no se presentan como pruebas aprobadas.
