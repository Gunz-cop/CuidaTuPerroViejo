# Auditoría independiente de la entrega

Fecha: 17 de octubre de 2026. Auditor distinto del corrector; no se han modificado artículos, código de producto ni pruebas en esta revisión.

## Resultado

**Conforme para el alcance implementado y documentado, con una discrepancia menor de recuento y sin bloqueantes nuevos de producto detectados. No procede solicitar todavía la revisión de AdSense basándose en esta entrega local.** Primero deben comprobarse publicación efectiva, funcionamiento público y rastreo. El PR continúa abierto y en borrador; CI y Workers Builds correctos no acreditan por sí solos esos pasos. No se garantiza aprobación de Google.

Se revisó la entrega del [PR #117](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/117), rama `correccion/editorial-adsense-2026-10-16`, HEAD `21503b67a2b25faa77d9490ceb19dbe7ce23952c`. El diff de trabajo se contrastó con `8b53656`, que ya incorpora la herramienta de edad de main; esa incorporación no se atribuye a las correcciones editoriales. El árbol estaba limpio antes de añadir exclusivamente este informe y sus tres evidencias.

## Hallazgo

|Severidad|Archivo y ubicación|Evidencia y efecto|
|---|---|---|
|Menor, documental|`auditoria-final-editorial.md:59`|Dice «18 PMID» de los 16 artículos modificados. `evidencias/auditor-final-pmids.json` contiene **17 identificadores únicos**, coincidentes con los 17 conservados actualmente en esos artículos. La cobertura es 17/17; el error es de recuento, no una fuente omitida. Se deja esta rectificación trazada sin alterar el informe histórico. No cambia el veredicto.|

No se ha encontrado en esta pasada un problema nuevo que justifique reabrir un documento cerrado en tercera ronda.

## Comprobaciones realizadas ahora y evidencia reutilizada

Esta es una revisión global de cumplimiento y trazabilidad de la entrega, **no otra ronda clínica exhaustiva**. Se aplicaron `AGENTS.md`, la referencia de calidad editorial y las skills de auditoría ya leídas. Se reutilizan las comprobaciones directas anteriores de este auditor, separado del corrector, con sus límites y resultados originales. No se reinicia la numeración ni se presenta lo reutilizado como una nueva verificación completa.

Comprobaciones nuevas:

- Diff y estado local/remoto del SHA indicado; lectura de la entrega, inventario de materiales, resumen de correcciones y registros pertinentes. No hay cambios de dependencias, configuración de Astro/Workers ni workflow de CI respecto a la base indicada.
- Integridad de los manifiestos editoriales, adicionales, de paridad del aviso y de navegación: **43 archivos en su última versión auditada coinciden con sus hashes actuales**. Las copias referenciadas conservan el hash de contenido. Las extensiones de snapshots son `.txt` para evitar que Astro los compile; no se ha modificado la configuración para ocultarlos.
- Comparación de los PMID retenidos con las consultas conservadas; búsqueda de restos de los errores y promesas retirados en contenido, páginas y componentes. Los 16 MDX modificados están cubiertos; ojos/oídos, baño y callosidades siguen sin cambios respecto a la base.
- Consulta de PR y CI en GitHub: [ejecución 38990996524](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38990996524), completada con `success` en el mismo HEAD. También figura Workers Builds correcto. El workflow hace empaquetado de Worker con `--dry-run`; no equivale a desplegar producción.
- Ejecución propia de `node --import tsx --test tests/image-srcset.test.ts tests/agent-readiness/f4a-tools.test.ts`: salida 0, dos archivos de pruebas aprobados, cero fallos. Este contador no se suma a los 104 tests del registro general ni significa que se hayan repetido ahora.

Evidencias nuevas: [estado del PR](evidencias/auditoria-entrega-pr.json), [resultado de CI y pasos](evidencias/auditoria-entrega-ci.json) y [hashes, cobertura de PMID y ejecución focal](evidencias/auditoria-entrega-comprobaciones.json).

## Cumplimiento del encargo

|Prioridad|Resultado contrastado y alcance de la evidencia|
|---|---|
|Fuentes y afirmaciones clínicas|Se conserva la cadena de consultas, textos recuperados y correcciones de Cushing y del resto del archivo en `auditoria-fuentes-resto-r1.md`, su anexo y `auditoria-final-editorial.md`. Se verificaron entonces identidad y pasajes, no solo apertura de enlaces. Los falsos PMID 24118359, 16298516 y 37071661 no permanecen como respaldo veterinario. Dosis, recetas, intervalos universales, pronósticos y atribuciones sin respaldo identificados se retiraron o acotaron. El texto actual de Fefer distingue cinco respuestas a 90 dB, dos perros no probados y uno sin respuesta en el grupo de ocho. La coincidencia de hashes vincula esas revisiones con la entrega actual.|
|Procedencia e imágenes|El anexo visual anterior registra rutas, observaciones y límites, sin afirmar ficción por falta de procedencia. Se retiraron atribuciones y desenlaces no acreditados; Luna/Dakota conserva aporte del propietario documentado en el briefing, sin convertirlo en prueba de causa o recuperación. Las imágenes problemáticas señaladas se retiraron y las ilustraciones se contextualizaron. `HomeCareStory` ya ofrece orientación general, sin presentar como historia real el relato no acreditado de las uñas. No se ha reabierto ojos/oídos R3.|
|Materiales|El calendario de medicación con 404 y otras promesas de recursos no disponibles se retiraron o reformularon, manteniendo instrucciones útiles. `materiales-pendientes.md` identifica calendario de medicación, checklist mensual y hoja HHHHHMM, con finalidad, contenido y lugar de integración. No hay archivos vacíos ni enlaces ficticios. Las vistas de Drive solo permitieron obtener títulos; no validaron el contenido descargable. La descarga fue rechazada por auto-review al quedar Drive fuera del alcance autorizado de esa fase; no se presenta como material revisado.|
|Vídeo dental|Se eliminó el identificador expuesto y la promesa de vídeo. La búsqueda de YouTube quedó limitada por acceso y no se acreditó revisión suficiente ni permiso de reproducción embebida. No se insertó un vídeo presentado falsamente como validado; las instrucciones propias y la referencia dental accesible permanecen. Esta alternativa estaba expresamente permitida por el encargo.|
|Institucionales y confianza|Las páginas contrastadas describen la responsabilidad editorial disponible, el contacto real y el tratamiento efectivo de datos, incluida la huella de IP del voto en servidor. Se retiraron afirmaciones obsoletas sobre Blogger y funciones locales ficticias. No se inventan nombre civil, credenciales ni revisión veterinaria. No se evalúa ni configura Adsterra.|
|Coherencia y navegación|Las revisiones adicionales documentan textos del selector/API, cuatro intents, componentes de portada y selección de imágenes responsive. Los cambios de expectativas de pruebas corresponden a textos aprobados; mantienen las clasificaciones y destinos del contrato. La adenda técnica de anclas/foco conserva el texto clínico: no constituye una cuarta ronda editorial.|

## Estado de las auditorías y pruebas

Las rondas y cierres por documento se mantienen en `auditoria-final-editorial.md` y `auditoria-adicional-final.md`. Ansiedad, incontinencia fecal, IPE y poliquezia terminaron en R3 según sus pasadas registradas; el selector también conserva su R3 editorial y una comprobación técnica posterior de paridad. No se reauditaron clínicamente en este cierre. Ojos/oídos mantiene su aprobación R3 previa, sin modificación ni reinicio.

Se reutilizan las pruebas directas anteriores de imágenes y procedencia, fuentes completas disponibles, semántica de las adendas y navegación de teclado. Sus resultados detallados están en los informes `auditoria-srcset-r1.md`, `auditoria-movilidad-catalogo-r1.md`, `auditoria-paridad-aviso-r1.md` y `auditoria-anclas-tecnica-r1.md`, además de los dos informes finales citados.

Los registros de la entrega y el CI del HEAD respaldan los controles generales: 104 tests principales, 77 controles offline, tipos sin errores ni advertencias (59 hints), build y contratos/proyecciones/API/semántica correctos. No se repitió ahora toda esa batería. Los registros locales del navegador documentan 36 páginas en dos anchuras, 120 destinos/recursos comprobados y seis recorridos de herramientas; la adenda documenta 953 anclas sin rotas ni IDs duplicados y recorridos de teclado. Son evidencia de la versión local, no de producción. La prueba de impresión comprueba la invocación del flujo del navegador; no valida un PDF alojado ni un archivo exportado concreto.

## Límites y pasos pendientes

La revisión de afirmaciones reutiliza los pasajes accesibles y las limitaciones de acceso expresamente registradas. Ni un HTTP 200 valida una afirmación ni un bloqueo del navegador demuestra falsedad de una fuente. No es una certificación veterinaria, legal ni una garantía de ausencia de cualquier error posible en todo el sitio.

El último intento público registrado en `evidencias/publicacion-observada-cierre.json` devolvió 403; la última lectura pública legible anterior todavía mostraba la versión antigua. La entrega lo declara correctamente y no presenta como publicados los cambios locales. Será necesario revisar las URLs públicas, recursos, navegación móvil y estado de rastreo tras la publicación efectiva; este expediente no acredita indexación mediante Search Console.

**Veredicto sobre AdSense: esperar a esas comprobaciones públicas.** No se detecta otro bloqueante nuevo de la corrección auditada. Una vez comprobados publicación y rastreo podrá evaluarse solicitar revisión conforme a las políticas oficiales, sin mínimos inventados de artículos, palabras, visitas o días. Las recomendaciones de trazabilidad, revisión editorial y mantenimiento son criterios del proyecto; no se convierten en requisitos numéricos oficiales de Google. No se ha solicitado revisión, desplegado ni fusionado nada durante esta auditoría.
