# Auditoría independiente de fuentes del resto del archivo — ronda 1

Fecha: 2026-10-16. Auditor distinto del corrector. **NO APTO en esta lectura inicial**: pautas clínicas contradictorias con la política editorial, afirmaciones no respaldadas y referencias que no entregan el documento atribuido. No se modificaron artículos, briefs, inventario ni código. No se solicitó AdSense ni se desplegó.

## Alcance y versión

Base de trabajo HEAD: `b46f7c72e3dadebb1d25ae9b0653651c648d3254`. Lectura inicial de los once artículos fuera de Cushing, comida casera, úlceras, dental, medicación, incontinencia urinaria, disfunción cognitiva y ojos/oídos. Los siete primeros se corrigen y auditan separadamente; ojos/oídos conserva su aprobación R3 y no se ha reabierto. El corrector puede modificar el árbol mientras recibe estos hallazgos; las líneas siguientes corresponden a la lectura inicial, no constituyen un juicio sobre la versión corregida. Esta es R1 para cada documento evaluado aquí; la comprobación final debe ser R2, sin reiniciar numeración.

Leídos AGENTS.md, control compartido de calidad, ambas skills de auditoría y política editorial. Se audita aquí principalmente identidad/afirmación y procedencia, no se certifica todavía navegación, imágenes vistas ni presentación móvil. Las referencias clínicas internas son reglas editoriales del proyecto, no requisitos mínimos de palabras/artículos impuestos por Google.

## Hallazgos e instrucciones para el corrector

### P0 — IPE: pautas, promesa universal y trayectoria clínica no acreditada

Archivo `src/content/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion.mdx`.

- L262: dosis inicial de polvo 2,8–3 g por 10 kg y por comida; L284–286: inyecciones de cobalamina por peso; retirar la pauta aplicable por el lector y explicar prescripción/seguimiento individual. Revisar también la advertencia de triturar universalmente tabletas: depende de formulación y no autoriza alterar cualquier preparado.
- FAQ L397 promete enfermedad «100% controlable»; contradice PMID 9656030: respuesta buena en aproximadamente la mitad, pobre en una quinta parte, en esa cohorte. Sustituir por pronóstico condicionado sin promesa universal.
- Watson PMID 12866928: el resumen acredita cuatro perros, dos con diabetes previa, supervivencia de uno de ellos de 48 meses, otro eutanasiado a cinco meses; otros dos vivos a 78 y 57 meses. **No acredita** Setter Gordon, edad de muerte once años, muerte por causa ajena al páncreas, estabilidad durante todos los 48 meses, normalización fecal/peso narrada ni controles de glucosa cada dos horas (L330–350). Obtener texto completo o retirar esos detalles; no llamarlos falsos solo por ausencia en abstract.
- L355: cronograma semanal de recuperación no acreditado en fuentes accesibles. Retirar o documentar datos aplicables, sin convertirlos en pronóstico de todos los perros.
- Los seis PMID tienen identidad veterinaria correcta (registro debajo). Grützner 23019243 estudia concentraciones por raza y asociación con cTLI, no prueba por sí solo una pauta de B12 ni prevalencia general de déficit en todos los perros con IPE. Enlazar cada fuente junto a su afirmación, actualmente solo hay enlaces en bibliografía.

### P0 — Poliquezia: atribución invertida a Bosch y explicación causal excesiva

Archivo `mi-perro-viejo-defeca-mucho-poliquezia.mdx`.

- L104 y L219: Bosch PMID 19144213 estudió dieciséis perros sanos adultos. No encontró efecto del tratamiento en glucosa, PYY, GLP-1 ni ghrelina; solo tendencia a menor ingesta voluntaria (P=0,058). El artículo le atribuye efecto directo hormonal y volumen/frecuencia fecal. Retirar esas atribuciones o reflejar resultado nulo y población reales. No se midió colecistocinina entre los marcadores listados.
- Weber PMID 18196727: prueba de saciedad en seis hembras adultas y palatabilidad en 105; apoya menor ingesta voluntaria de dieta formulada, no demuestra reducción de robo de comida en Dakota ni resolución de poliquezia. Limitar extrapolación.
- L44 y L216: página WSAVA de nutrición no entrega un rango clínico validado 1–3 deposiciones ni máximo senior 1–2; retirar atribución y rigidez del umbral.
- L72: colitis alimentaria no acredita secreción digestiva naturalmente reducida por ser senior, cartílago intacto y fermentación causal en Dakota/Luna. L96: revisión humana de reflejo gastrocólico no demuestra activación «dos veces» ni causa individual en estas perras. Sustituir inferencias por posibilidades y límites, sin diagnóstico retrospectivo.
- La experiencia Dakota/Luna se afirma real. Buscar procedencia aportada por propietario en documentación existente; si no se acredita, quitar atribución y explicación causal individual sin declararla inventada. El alt hero identifica Dakota: una ilustración no debe fingir foto clínica suya.

### P0 — Cama y caídas: especificaciones convertidas en requisitos clínicos sin respaldo

`cama-ortopedica-perros-mayores-displasia-artrosis.mdx`, L74, tabla L121–124, L160–171, FAQ y JSON-LD L457–465: 70–80% del mercado sin soporte, densidades clínicas mínimas 40/48–55 kg/m³, duración exacta de cada espuma y prevención de rigidez no están acreditadas por las páginas generales citadas. Retirar cifras de mercado y universalidad; mantener criterios prácticos de estabilidad/confort/higiene con límites. Sin fuente específica, no presentar umbrales comerciales como prescripción para displasia. Corregir también JSON-LD para no conservar las afirmaciones retiradas del cuerpo.

ACVS enlaza homepage, no «protocolos de displasia» identificables. Sustituir por documento profundo revisado o eliminar atribución. En `prevencion-caidas-perro-mayor.mdx`, L190 y FAQ L277, se propagan requisito 40 kg/m³ y rampa universal con pendiente máxima 20% y superioridad universal a escaleras. Individualizar sin umbral clínico no demostrado. Su enlace NCSU redirige a homepage: no entrega toolkit.

### P0 — Agresividad: grupo Fefer no equivale a respuestas individuales

`agresividad-tardia-perros-mayores-dolor.mdx`, apartado «El perro que no te oye llegar» y FAQ: corregir ocho respuestas a 90 dB. Fefer DOI 10.1111/jvim.16510, texto completo §3.2, muestra cinco perros con onda V a 90 dB; otros dos sin ondas a 70 no fueron probados a 90; otro no tuvo ondas a 90 en ninguno de los oídos. Los ocho integraron el grupo estadístico de audición disminuida/ausente. Citar texto completo (EuropePMC/PMC9511086) junto al dato.

La meta descripción «casi siempre es dolor» no se demuestra con serie seleccionada de doce perros derivados por agresividad relacionada con dolor. Limitar a dolor como causa a descartar. La apertura cuenta un perro de trece años sin declarar procedencia: reformular como situación general, o acreditar/identificar la viñeta. No convertir serie UAB en seguimiento ni asumir edad geriátrica de todos sus pacientes. El resumen institucional sí acredita 66,7% displasia y mayor impulsividad/manipulación; no una prevalencia de dolor en toda agresividad tardía.

### P1 — Fecal: no usar ausencia de conciencia como definición universal

`incontinencia-fecal-perros-senior.mdx`, FAQ L287: «en la incontinencia real no hay postura ni conciencia» excluye indebidamente pérdidas con urgencia consciente/enfermedad de reservorio. Corregir también cualquier regla diagnóstica derivada. Texto completo Kim PMC9960280 confirma cocker de 19 años y reconstrucción esfinteriana; caso publicado atribuido correctamente (Kim, Nam, Kim y Yoon), no experiencia editorial. DOI 10.1354/vp.46-2-241 confirma cohorte anatomopatológica de dieciocho corgis; abstract no basta para afirmar detalle temporal de incontinencia final. Capítulo Wiley bloqueado: no es fuente falsa; obtener pasaje o limitar uso. PMID 41287451 trata **orina**, no prueba eficacia de protocolo para dermatitis fecal; explicitar límite o retirar extrapolación. Los enlaces están solo al cierre: colocar citas en cuerpo.

### P1 — Chequeo: atribuciones institucionales y suplementos

`chequeo-geriatrico-canino.mdx`: no enlaza ninguna fuente clínica. El intervalo semestral atribuido conjuntamente a AAHA, AVMA y WSAVA y calendario rígido de edad/pruebas requieren documentos concretos y matiz individual. No presentar revisiones como prevención asegurada. Apartado de suplementos (glucosamina/condroitina/omega3) atribuye beneficio antiinflamatorio conjunto sin diferenciar evidencia. Retirar universalidad, explicar valoración veterinaria y diferencias de evidencia. La cita doméstica Dakota/Luna requiere conservar procedencia del propietario si existe; no equivale a prueba de beneficio de sujetar entre varias personas.

### P2 — Ansiedad: diseño de fuente

`ansiedad-separacion-perros-senior.mdx`, bibliografía L430: Frontiers DOI 10.3389/fvets.2025.1685430 es encuesta online a 318 veterinarios estadounidenses (enero–mayo 2025), no revisión de eficacia. Corregir etiqueta y evitar interpretar frecuencia de uso como eficacia. MacQuiddy sí publica los porcentajes 8,1/18,8/45,3/67,3, con límites de grupos «<11», «<13», etc. DOI Salvin 10.1016/j.tvjl.2010.05.014 sí desarrolla CCDR de 13. Denenberg PMID19072600 es ensayo de 45 cachorros12–15semanas; mantener límite de extrapolación. Veterinary Evidence 421 califica evidencia débil; preservar ese límite. Viñeta compuesta está declarada. Citas están solo en bibliografía: integrarlas en afirmaciones.

## Comprobaciones favorables y límites

- Callosidades: DOI jsap.12315 coincide con Pavletic/Brum, San Bernardo de un año (no senior), drenaje de succión tres semanas, cama blanda y ausencia de recidiva izquierda a dieciocho meses; derecha no operada creció. Angelou32043576 acredita21 higromas/19 perros; Verhoeven37567180 cuatro lesiones/tres perros. ISCAID vde.13342, texto completo tabla 2, diferencia callo no infectado de piodermia; no extrapolar tratamientos entre ambos. AAHA2022/2023 y Clinician’s Brief sostienen adaptar entorno/proteger tejidos. No se ha hallado nuevo error de identificador en estas ocho fuentes.
- Baño: resumen institucional UAB acredita doce casos y 66,7% displasia; AAHA manejo dolor respalda vídeos, camas y apoyos. Lee DOI1717581 tiene población de 45 retrievers sanos de 2–8 años, no ensayo de rutinas de baño senior; artículo mantiene esa limitación. PDF Rayburn y estudios de manejo son orientación clínica, no prueban superioridad de técnica doméstica concreta en todos los perros. No convertirlos en pauta de sujetar ante dolor.
- Vacunas: WSAVA/AAHA/CAPC tienen documentos institucionales pertinentes y contenido disponible; AVMA entrega respuesta mínima de bloqueo pese a 200 (212 bytes), por tanto verificación parcial y no fuente falsa. Revisar que las citas de cuerpo correspondan a recomendaciones exactas, edad no sustituye evaluación individual. Esta lectura no certifica cada intervalo vacunal geográfico de todas las guías.
- No se inspeccionaron visualmente todas las imágenes ni se ejecutaron recorridos móviles: pendientes de la validación final. Un 200 en PMC/NCBI Bookshelf devolvió desafío antibot (unos 21 KB), no el documento. Para tres artículos PMC se obtuvo XML oficial EuropePMC alternativo; Fefer e ISCAID también se revisaron allí. Ningún bloqueo se contó como identificador falso.

## Registro de identidad y afirmación de cada identificador comprobado independientemente

Consultas propias EuropePMC preservadas en `evidencias/auditor-consultas-independientes.json`, con URL, respuesta y metadatos/resumen completos. Fecha 2026-10-16. La lectura de resumen limita cualquier afirmación no contenida en él.

|Identificador|Título real, autoría/año|Afirmación que permite comprobar / límite|
|---|---|---|
|EXT_ID:12866928 AND SRC:MED|Exocrine pancreatic insufficiency as an end stage of pancreatitis in four dogs. Watson PJ. 2003|Cuatro perros IPE tras pancreatitis; dos diabetes; supervivencias descritas. No trayectoria clínica detallada accesible.|
|EXT_ID:23019243 AND SRC:MED|Evaluation of serum cobalamin concentrations in dogs of 164 dog breeds (2006-2010). Grützner N, Cranford SM, Norby B, Suchodolski JS, Steiner JM. 2012|28.675 análisis, 164 razas, asociación cobalamina-cTLI; no pauta terapéutica.|
|EXT_ID:37944252 AND SRC:MED|Exocrine pancreatic insufficiency in dogs and cats. Cridge H, Williams DA, Barko PC. 2024|Revisión: enzimas,dieta,cobalamina,disbiosis; pronóstico generalmente bueno condicionado.|
|EXT_ID:3258306 AND SRC:MED|Sensitivity and specificity of radioimmunoassay of serum trypsin-like immunoreactivity for the diagnosis of canine exocrine pancreatic insufficiency. Williams DA, Batt RM. 1988|25 con IPE,100 controles,50 con enfermedad intestinal; TLI sensible/específica en esa muestra.|
|EXT_ID:14552166 AND SRC:MED|Exocrine pancreatic insufficiency in dogs. Westermarck E, Wiberg M. 2003|Revisión PAA,cTLI y reemplazo; respuesta buena aproximadamente la mitad.|
|EXT_ID:9656030 AND SRC:MED|Response to long-term enzyme replacement treatment in dogs with exocrine pancreatic insufficiency. Wiberg ME, Lautala HM, Westermarck E. 1998|76 perros con IPE y145 controles; respuesta variable, mala una quinta parte.|
|EXT_ID:32043576 AND SRC:MED|Complete surgical excision versus Penrose drainage for the treatment of elbow hygroma in 19 dogs (1997 to 2014). Angelou V, Papazoglou LG, Tsioli V, Psalla D, Anagnostou T, Chatzimisios K, Pavlidis L. 2020|21 higromas/19 perros; recidiva4/12 trasPenrose.|
|EXT_ID:37567180 AND SRC:MED|Novel approach for the treatment of canine elbow hygroma with extracorporeal shockwaves. Verhoeven A, Huels N, Harms O. 2023|Cuatrolesiones/tres perros; no universalizar ondaschoque.|
|EXT_ID:18196727 AND SRC:MED|A high-protein, high-fiber diet designed for weight loss improves satiety in dogs. Weber M, Bissot T, Servet E, Sergheraert R, Biourge V, German AJ. 2007|Dietas formuladas y saciedad/ingesta;6hembras adultas, no ensayo poliquezia.|
|EXT_ID:19144213 AND SRC:MED|The effects of dietary fibre type on satiety-related hormones and voluntary food intake in dogs. Bosch G, Verbrugghe A, Hesta M, Holst JJ, van der Poel AF, Janssens GP, Hendriks WH. 2009|16 adultos; no efecto hormonas medidas; ingesta tendencia P = 0,058.|
|EXT_ID:41287451 AND SRC:MED|Clinical and histopathological features of urine scalding in dogs and cats. McMahill BG, Lau C, Declercq J, Liu S, Johnson T. 2026|10 perros y 2 gatos; lesión por orina, no protocolo fecal.|
|DOI:10.1111/jvim.16510|Relationship between hearing, cognitive function, and quality of life in aging companion dogs. Fefer G, Khan MZ, Panek WK, Case B, Gruen ME, Olby NJ. 2022|Fefer39perros; §3.2 texto completo diferencia5respuestas ygrupo8.|
|DOI:10.1111/jsap.12315|Successful closed suction drain management of a canine elbow hygroma. Pavletic MM, Brum DE. 2015|San Bernardo de 1 año; drenaje 3 semanas, seguimiento 18 meses; límite caso único.|
|DOI:10.1111/vde.13342|Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases (ISCAID). Loeffler A, Cain CL, Ferrer L, Nishifuji K, Varjonen K, Papich MG, Guardabassi L, Frosini SM, Barker EN, Weese JS. 2025|ISCAID piodermia; tabla 2 callo versus infección; citología antes antimicrobianos.|
|DOI:10.1354/vp.46-2-241|Degenerative myelopathy in 18 Pembroke Welsh Corgi dogs. March PA, Coates JR, Abyad RJ, Williams DA, O'Brien DP, Olby NJ, Keating JH, Oglesbee M. 2009|18 corgis, anatomopatología; no detalle de fase de incontinencia en abstract.|
|DOI:10.1016/j.tvjl.2010.05.014|The canine cognitive dysfunction rating scale (CCDR): a data-driven and ecologically relevant assessment tool. Salvin HE, McGreevy PD, Sachdev PS, Valenzuela MJ. 2011|CCDR de 13ítems;957 perros,validación muestraindependiente.|
|EXT_ID:19072600 AND SRC:MED|Effects of dog-appeasing pheromones on anxiety and fear in puppies during training and on long-term socialization. Denenberg S, Landsberg GM. 2008|45 cachorros de 12–15 semanas; no demostración senior.|

## Registro de destinos sin identificador y alternativas

`evidencias/auditor-web.json` conserva cada destino solicitado independientemente, redirección, tamaño, error y clave de archivo crudo `fuentes/auditor-<clave>.txt`. No es por sí solo verificación de afirmaciones: los pasajes revisados se describen arriba. Incluye los 41 destinos encontrados en el alcance. Textos completos adicionales: `fuentes/auditor-PMC9960280.xml`, `auditor-PMC10340034.xml`, `auditor-PMC7071134.xml`; Fefer `auditor-36b79f901d03b7ec.txt`; ISCAID `auditor-f4133fa1e65619e0.txt`.

No hay APTO global: falta resolver hallazgos y releer versiones finales, completar fuentes bloqueadas o retirar afirmaciones dependientes, y pruebas visuales/funcionales. La decisión de revisión AdSense debe esperar a esa evidencia y a distinguir contenido local del sitio público/rastreo.

### Suplemento de identidad abierto durante esta misma ronda

No constituye otra ronda ni aprobación de correcciones. `evidencias/auditor-consultas-suplemento.json` conserva consultas independientes adicionales:

- Salvin, McGreevy, Sachdev y Valenzuela, *Under diagnosis of canine cognitive dysfunction*, DOI 10.1016/j.tvjl.2009.11.007 (2010): resumen leído, muestra analizada 497 de 957 respuestas elegibles; prevalencia estimada 14,2% y diagnóstico veterinario 1,9%. No confundir esta fuente con validación de CCDR.
- Kim y Hao, *Recent advances in diagnostic and therapeutic strategies for canine cognitive dysfunction*, DOI 10.2460/ajvr.25.02.0053 (2025): resumen leído, respalda dominios DISHAA y límites diagnósticos; cuerpo editorial AVMA bloqueado, por lo que no se atribuyen al artículo protocolos no contenidos en resumen.
- Lee et al., DOI 10.3389/fvets.2025.1717581: resumen leído, confirma 45 retrievers sanos, quince por grupo (2–3, 4–6 y 7–8 años), descenso de hidratación cutánea con edad. No demuestra frecuencia óptima de baño. Metadatos de revista indican 2025; primera publicación electrónica 12 de enero de 2026.
- Nakonechny et al., DOI 10.3389/fvets.2025.1634970 (2025): encuesta de conveniencia a 691 profesionales, no experimento de eficacia; describe prácticas declaradas y factores asociados a contención. Mantener ese diseño explícito.
- Crossref abierto por DOI 10.1002/9781119187240.ch16 confirma *Urinary and Fecal Incontinence*, Faith Banks, 2017 (`evidencias/auditor-capitulo-wiley-crossref.json`). La identidad es correcta; el texto completo sigue bloqueado y las afirmaciones específicas del capítulo no quedan verificadas por esos metadatos.
