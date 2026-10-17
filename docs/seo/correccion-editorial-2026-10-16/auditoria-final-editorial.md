# Auditoría independiente final del archivo editorial

Fecha: 2026-10-16. Auditor separado del corrector. Encargo y excepciones históricas leídos en `contrato-correccion.md`.

**APTO editorial dentro del alcance descrito.** La limitación específica UCCR de Cushing se resolvió retirando la afirmación, sin presentarla como falsa ni dar por leído un pasaje inaccesible. No hay APTO general de publicación: el auditor no ha ejecutado navegador móvil, build ni despliegue. Las comprobaciones técnicas del corrector se conservan por separado y no se presentan aquí como repetidas.

## Versiones, independencia y rondas

Se leyeron los 16 MDX modificados y las cuatro páginas institucionales modificadas; la quinta página modificada es el texto de recurso en HHHHHMM. Los originales de los 21 archivos finales observados están congelados en `evidencias/auditor-final-snapshot/src/`; manifiesto SHA256 en `manifest.json`. No se modificó producto, ni se produjo contenido para aprobarlo como auditor. Las observaciones se enviaron al corrector; este cambió el producto y se verificaron sus cambios como rondas siguientes explícitas. No se reinicia numeración. La comprobación focal de una corrección **no equivale a una nueva auditoría clínica exhaustiva de toda la guía**.

La primera lectura final detectó restos que se comunicaron en mensajes y se enumeran abajo. No se conservó una copia ni hash de cada estado intermedio mientras el corrector trabajaba; por ello esos estados se identifican por pasajes/hallazgos registrados, sin inventar hashes. Sí se conservan las versiones finales completas y hashes. El informe R1 inicial y su anexo conservan alcance, fuentes y errores de partida.

La búsqueda en `docs/contenido` y su historia no localizó informes previos de los siete artículos excluidos inicialmente del barrido de fuentes: su contador arranca R1 en este expediente. Esto no afirma que nunca hayan sido revisados fuera de los registros disponibles. Ojos/oídos conserva su aprobación R3 y no fue reabierto. Baño y callosidades no fueron corregidos: se hizo mantenimiento de fuentes e imágenes, documentado en anexo R1, sin un nuevo ciclo editorial; callosidades conserva su informe previo `docs/contenido/higromas/auditoria-articulo-r1.md` y su aprobación.

|Documento|Rondas, alcance y resultado final|SHA256 de la versión observada|
|---|---|---|
|`src/content/blog/agresividad-tardia-perros-mayores-dolor.mdx`|R1 NO APTO → R2 satisfactorio, lectura editorial completa y fuente Fefer exacta.|`07196a2f5bf4bd15ea2affb4c80489e63dfc2a81b561d69e2a2e69cc2ab06889`|
|`src/content/blog/ansiedad-separacion-perros-senior.mdx`|R1 NO APTO → R2 NO APTO por hallazgos/desenlace de viñeta → R3 comprobación focal satisfactoria.|`62691ceb04adcdd05fe4f7d9b05a0064d2c7040414d6cdc0a111b8ea1b8242b8`|
|`src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx`|R1 NO APTO → R2 satisfactorio, lectura completa.|`a5b160cceb6a65fdd460b145fc9570e45eac90310b5b3cb2eb9110d9ff20cc14`|
|`src/content/blog/chequeo-geriatrico-canino.mdx`|R1 NO APTO → R2 satisfactorio, lectura completa.|`898e24a2b22449cc5ffec18d12d65742227b7137d3a2a37719733fc1f492876f`|
|`src/content/blog/comida-casera-perros-mayores.mdx`|R1 satisfactorio, lectura completa; imagen con promesas ya retirada antes de esta ronda.|`da7256e45bd872845bed5dece52c3c17a466535b522e4be4527876f95fa33a4a`|
|`src/content/blog/como-dar-medicacion-perro.mdx`|R1 NO APTO por promesa de cinco técnicas en metadatos → R2 comprobación focal satisfactoria.|`ff5edebe4b57c71ba64095a4ddefd0586b4436647cc3a40ddaccf3910e7b1408`|
|`src/content/blog/disfuncion-cognitiva-canina.mdx`|R1 satisfactorio, lectura completa.|`62c7bdd570f48e6a4927816debdbf9a60023bc71705167db383bb561b93a1cb6`|
|`src/content/blog/incontinencia-fecal-perros-senior.mdx`|R1 NO APTO → R2 NO APTO por definición/FAQ, capítulo inaccesible y cronología → R3 nueva lectura completa satisfactoria.|`b300a5b4fe3cb1906ae8688ac4ba3906e1b94fa50419915dda5645e50759f82c`|
|`src/content/blog/incontinencia-urinaria-perros-mayores.mdx`|R1 NO APTO por higiene universal, materiales, alt y metadatos → R2 comprobación de correcciones y lectura completa satisfactoria.|`fcfd825840d536f9735c64cd1577c58fa4ac2546c765cfb66526a48a06e9042a`|
|`src/content/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion.mdx`|R1 NO APTO → R2 NO APTO por preincubación atribuida sin pasaje → R3 comprobación focal satisfactoria.|`dbdff4583a901905972548f2b191c520c8bbd0ef03f34e59b9e10e244473d549`|
|`src/content/blog/mi-perro-viejo-defeca-mucho-poliquezia.mdx`|R1 NO APTO → R2 NO APTO hasta declaración explícita de IA documentada → R3 comprobación focal satisfactoria.|`a0ed2f3b369fb8c85746268c7d53a129e1d2de4f4983d93533e8d35926e70d92`|
|`src/content/blog/prevencion-caidas-perro-mayor.mdx`|R1 NO APTO → R2 satisfactorio, lectura completa.|`0ccda5a9924ca2a6e06daa687c7546ffaa0bd236ceb67bc0b7dc586f515c14dc`|
|`src/content/blog/salud-dental-perros-mayores.mdx`|R1 NO APTO por alt que describían otras escenas → R2 comprobación focal satisfactoria.|`39c9807bf853c8bc221c3a8d1a4fe9d988cd434f3fc6fb6ae5fc1ec5fe86feed`|
|`src/content/blog/sindrome-cushing-perros-mayores.mdx`|R1 NO APTO por afirmación UCCR sin pasaje accesible → R2 comprobación focal satisfactoria tras retirarla.|`8e7c9ad6dd03ca8dc0b5741d68d64a0dfb2cf15bc534aa39d0cbf9a1dbe42d4f`|
|`src/content/blog/ulceras-presion-perros.mdx`|R1 satisfactorio, lectura completa; diagrama erróneo ya retirado antes de esta ronda.|`bab9911864d6970d3cfb1faf04cf431a707c0631e8514a82cb3337fdceb29efe`|
|`src/content/blog/vacunas-desparasitacion-perros-senior.mdx`|R1 NO APTO → R2 satisfactorio, lectura completa frente a WSAVA2024 y CAPC.|`6f8fd1b45f5d7e8c1e85dda1a5d5c8b1f2483e0947cefc972261e9f120a53454`|
|`src/pages/acerca-de.astro`|R1 satisfactorio: responsabilidad real de proyecto y contacto; no se añaden credenciales.|`0538d021eac95d56981018caf865843e9de4c109ed353201b2339b98b113e49e`|
|`src/pages/herramientas/calculadora-calidad-vida-perros.astro`|R1 satisfactorio SOLO texto de recurso: anuncio externo retirado, impresión del navegador existente; no es nueva auditoría de lógica clínica de la herramienta.|`88e6305c1270914c9123f20249d23ddc4c5d302a1afde03ae8337c243c7c51fe`|
|`src/pages/politica-de-cookies.astro`|R1 satisfactorio respecto a funcionamiento inspeccionado; no certificación jurídica ni revisión publicitaria.|`13c50ae4b013d9bd41a83e7c188c8bf890f45e414ef8eeb5b348a543e5c46343`|
|`src/pages/politica-de-privacidad.astro`|R1 NO APTO: omitía voto/huella IP en servidor → R2 comprobación focal satisfactoria contra feedback.ts.|`7d6dc4a35a4f1a86539dd3e81a60fb79a75b84c2c16431b39ab05aa2c4243c94`|
|`src/pages/politica-editorial.astro`|R1 satisfactorio: responsabilidad, procedencia y fuentes; no veterinario ficticio.|`7c852b120a54d932079e14c583544a02a2e7a65f47475928a890a04eff2bfacc`|

Los documentos que alcanzan R3 quedan cerrados: si se detectase un bloqueante que exija corregirlos de nuevo, hay que detener ese documento y elevarlo al propietario, sin R4 ni reiniciar el expediente.

## Correcciones finales comprobadas

- Cushing: retirado UCCR tras no poder leer el pasaje concreto del consenso. R1 no apto y R2 focal satisfactorio; copia previa y posterior conservadas, sin reiniciar la numeración. Los otros cambios de Cushing ya habían sido revisados.
- IPE: retiradas dosis, promesa100% y trayectoria no acreditada; Watson limitado al resumen. La preincubación no aparecía en PMID9656030 y se retiró cuerpo/bibliografía. Respuesta variable conserva magnitud y población históricas sin garantía individual.
- Fecal: relectura completa de versión compacta. VCA respalda pérdida con conciencia o sin ella; postura no diagnostica. Retirados capítulo Wiley no leído, regla universal e infografía diagnóstica. Kim §2.2: continencia6días, revisión3meses, muerte9meses después de cirugía; no9meses añadidos a revisión. Texto coincide con XML leído por el auditor.
- Poliquezia: experiencia del dueño conservada desde transcripción del brief, sin causa ni recuperación añadida. Bosch queda como resultado nulo hormonal/tendencia de ingesta; Weber como dietas formuladas y saciedad. No umbral senior universal. Declaración visible de generaciónIA donde el brief la acredita.
- Ansiedad: viñeta se mantiene identificada, pero exploración y resultado clínico se sustituyen por hipótesis/objetivos, sin reducción marcada garantizada. Encuesta318veterinarios no se transforma en ensayo de eficacia. Se preservan límites de feromonas/cachorros.
- Medicación: ya no promete cinco técnicas en metadatos ni anuncia PDF. Prescripción, límites de manipulación y registro quedan en página. No se fuerza la boca ni se improvisa suspensión.
- Urinaria: meta sin promesa de piel libre de infección; alt describen escena gris/pata, sin paciente Toby. Retiradas exigencias de productos específicos, secador y espuma obligatoria. Dieta y tratamientos quedan individualizados.
- Dental: alt de exploración/cepillado coinciden con imágenes observadas; no montaje de resultados clínicos, vídeoID ni descarga externa no leída. Cornell respalda cepillado diario gradual y tratamiento profesional. AVMA bloqueada no se marca falsa; las afirmaciones relevantes se contrastaron con Cornell/Merck.
- Cama/caídas: no densidad, grosor, porcentaje de mercado, vida útil ni pendiente clínica universales; sin recuperación doméstica no acreditada ni pruebas de propiocepción caseras.
- Vacunas/chequeo: WSAVA2024/CAPC respaldan marco individual, leptospirosis esencial condicionada, rabia según ley/ficha y límites de desparasitación trimestral; tabla individual sustituye calendario estacional. AAHA tabla de pruebas sí indica6–12meses y otras por indicación; no triple atribución institucional universal.
- Privacidad: se explica envío de voto y huellaIP al servidor, además del indicador local, contra `src/pages/api/feedback.ts`; formulario, asistente y almacenamiento local contrastados con código. No se acreditan nombre civil ni credenciales no disponibles. Adsterra permanece fuera de evaluación/configuración.

## Fuentes: nueva comprobación independiente

El auditor realizó consultas propias, no solo leyó la evidencia del corrector:

- `evidencias/auditor-final-pmids.json`: los18PMID presentes en los16artículos modificados, identidad/autores/año/resumen. Cushing24112317 es Behrend2013,16233969 es Sieber-Ruckstuhl2006(15perros),23701195 es Burkhardt2013(40perros),33274787 GarcíaSanJosé2021(51perros). Los identificadores ajenos24118359/16298516/37071661 ya no se citan como veterinarios. AAHA DOI10.5326/JAAHA-MS-7368 verificado aparte en `auditor-final-aaha-doi.json` (Bugbee etal.,2023).
- `evidencias/auditor-final-web.json`:19destinos adicionales abiertos por el auditor, con crudos `fuentes/auditor-final-*.txt`. Los41destinos iniciales,17consultas y suplemento siguen documentados en los archivos R1. Un HTTP200 no se interpreta como contenido sin lectura.
- Nuevos textos completos `fuentes/auditor-PMC10937496.xml` (consenso urinario) y `auditor-PMC7848348.xml` (presión arterial Cushing). Conservados textos completos Kim, Fefer, ISCAID y otrosPMC del barrido inicial.

|Fuente/pasaje leído|Afirmación actual respaldada y límite|
|---|---|
|Behrend24112317, resumen|Sospecha desde signos/historia y ninguna prueba perfecta. El detalle UCCR no quedó verificado y fue retirado; no se utiliza para fundamentar un consejo.|
|Sieber-Ruckstuhl16233969, resumen|Cambios hormonales15perros; no reversibilidad universal de efectos adversos.|
|Burkhardt23701195, resumen|40perros; cortisol basal/ACTH/cociente no sustituyen estimulación bajo su protocolo; no guía de ajustes domésticos.|
|GarcíaSanJosé33274787, resumen y texto|51perros; presión cada visita, puede persistir/aparecer hipertensión pese a control clínico.|
|AAHA endocrino2023, identidad/index y copia específica previa del corrector identificada|Origen espontáneo/iatrogénico y marco terapéutico. El auditor no repitió acceso exitoso a todos los subapartados; obtuvo403.|
|AAHA diagnostic tests, tabla propia abierta|Hemograma,bioquímica,urianálisis6–12meses,imagen por indicación/riesgo.|
|AAHA cognitive, texto propio abierto|DISHAA, diagnóstico diferencial, dietas estudiadas y evidencia limitada para otros suplementos.|
|AAHA homemade, texto propio abierto|Precisión de ingredientes/suplementos/cocción; sustituciones alteran formulación.|
|Burrows6286909, resumen|Fibra,digestibilidad,tránsito; no beneficio probado de licuado senior.|
|FDA dietas crudas, texto propio abierto|Riesgo microbiológico; no plazo universal de conservación de receta cocinada.|
|VCA Giving Pills y Tips, textos propios abiertos|Porción pequeña compatible, observar toma, consulta ante dificultad y alternativas específicas.|
|FDA Client Information Sheets, texto propio abierto|Conocer indicaciones/efectos/instrucciones; no receta propia.|
|AAHA Client Education, texto propio abierto|Comunicación, seguimiento e instrucciones del cuidador.|
|Merck Initial Wound Management, texto propio abierto|Evaluar tejidos/estado antes de elegir cura; agua oxigenada tóxica para tejido sano.|
|Cornell periodontal y Merck, textos propios abiertos|Cepillado gradual/diario tolerado, placa frente a sarro, limpieza/evaluación profesional con anestesia y riesgo individual.|
|VCA bowel, texto propio abierto|Reservorio/esfínter; pueden conocer necesidad y no controlarla; examen/pruebas individualizados.|
|KimPMC9960280, texto§2.2|Caso cocker19años8,7kg; cirugía de rescate/reconstrucción;6días/3meses/9mesesposcirugía.|
|ACVIM38217372, identidad/resumen y texto completo|Incontinencia urinaria,diferenciales y selección individual; no diagnóstico por olor/postura aislados.|
|Merck urinaria y UC Davis, textos propios abiertos|Almacenamiento/neurológica/ITU y opciones médicas individualizadas, sin dosis.|
|Seis fuentes IPE, resúmenes propios|cTLI, cobalamina, manejo y variabilidad; Watson solo4casos, no trayectoria reconstruida.|
|Weber18196727 y Bosch19144213, resúmenes propios|Saciedad de dietas formuladas, no tratamiento de poliquezia; Bosch no efecto hormonal medido.|
|Salvin20005753 y DOI10.1016/j.tvjl.2010.05.014, resúmenes propios|497respuestas14,2/1,9%, CCDR13 en estudio distinto; sin prevalencia universal.|
|FeferPMC9511086, texto§3.2|5respuestas90dB+2no probados+1sinrespuesta=grupo8; asociación no causalidad.|
|WSAVA2024PDF completo, tabla1 y vacunaciónadulta|Core condicionada/región, rabia ley/ficha y ausencia de programa especial solo por edad.|
|CAPC General Guidelines, texto propio|Todo el año y control según riesgo; trimestral alternativa condicionada, no dirofilaria universal.|

Se conservaron bibliografías y citas junto al pasaje en los documentos corregidos. No se exige cuota de fuentes ni palabras. Esta revisión de divulgación no equivale a revisión médica veterinaria firmada.

## Recursos y comprobaciones locales propias

El barrido estático sobre los16MDX no halló imágenes locales referenciadas ausentes; los seoTitle finales están≤55 y metaDescriptions≤160. Se comprobaron la retirada de personajes no acreditados, dosis de uso doméstico, enlacePDFmedicación, vídeoID dental y falsas infografías. No se crearon PDF vacíos ni enlaces ficticios. `materiales-pendientes.md` identifica tres materiales para otra sesión. El texto HHHHHMM describe impresión real: el código contiene botónGuardarPDF y `window.print()`; **no se ejecutó aquí el diálogo en navegador**.

La inspección visual inicial63imágenes está en el anexoR1. Esta comprobación final confirma retirada de integraciones defectuosas y alt corregidos; no afirma que todas las imágenes fueran abiertas de nuevo ni que el móvil haya pasado por un build correcto. Los archivos ilustrativos no se presentan como expediente real; falta de procedencia de una historia no se convirtió en acusación de invención.

## Fuera de esta auditoría y condición de cierre global

No se ejecutaron por este auditor los93tests/77mjs, el control de tipos, build o navegación móvil comunicados por el corrector. Deben consultarse sus logs y la versión exacta sobre la que se corrieron. No se envió formulario, se usó Drive, se solicitó AdSense, se desplegó ni se verificó indexación.

El resultado editorial es APTO dentro de este alcance, con pruebas técnicas y públicas pendientes por separado. La recomendación de solicitar revisión solo procede después de pruebas indispensables finales y comprobación de versión pública/recursos y rastreo. Son condiciones distintas: un PR o build local no publica ni acredita indexación. No hay garantía de aprobación ni mínimos oficiales inventados de artículos,palabras,visitas o días. Los controles clínicos y de fuentes aquí utilizados son reglas editoriales del proyecto; no se presentan como una lista oficial de admisión de Google.

## Última comprobación de integridad

Tras congelar el árbol se permitió un único cambio de producto: retirar la viñeta UCCR de Cushing. La comparación independiente confirmó solo esa eliminación. `evidencias/auditor-final-snapshot/cushing-r1-antes-retirar-uccr.mdx.txt` conserva la versión R1, SHA256 `476cdaebe24a63f0696df100500e183aff55294d8ed2dc257937ce1720a6a6bc`; el manifiesto y la tabla superior registran R2. No se reabrieron otros documentos.

Formato de copias: véase `formato-evidencia.md`; las extensiones de código llevan sufijo `.txt`, con bytes/hashes originales conservados y campo `snapshot_path` en manifiestos.
