# Anexo de alcance pendiente R1: imágenes, procedencia y vacunas

Fecha: 2026-10-16. Mismo auditor independiente y misma ronda inicial R1. Este anexo completa revisiones pendientes; **no abre otra ronda ni certifica versiones corregidas**. No se editó contenido. Excluido ojos/oídos: conserva R3 aprobado. Se observaron 63 imágenes únicas de 18 artículos en siete láminas, y las imágenes 13 y 42 también a tamaño nativo. Las láminas y JSON de inventario están en `evidencias/auditor-lamina-imagenes-1.jpg` a `-7.jpg` y `auditor-inventario-imagenes.json`. Hashes de los documentos al completar esta inspección en `auditor-imagenes-versiones.json`; el corrector trabaja en paralelo, por tanto este anexo describe lo observado y no asegura persistencia de cada problema tras la corrección.

## Bloqueantes visuales nuevos

1. Comida casera, imagen62: las promesas de la infografía sobreviven aunque se retire la afirmación del cuerpo. Retirar/reemplazar esa integración.
2. Úlceras, imagen13: posición dibujada incompatible con título lateral; no usar para localizar apoyos de decúbito lateral.
3. Vacunas, imagen42: calendario con columnas sin sentido, errores y vacuna anual universal; no entrega recurso educativo fiable. Retirar/reemplazar.
4. Dental, imagen50: simulación BEFORE/AFTER no equivale a resultado documentado. Identificar como simulación o retirar; no prometer reversión de periodontitis por limpieza/cepillado.
5. Alt concretos incorrectos: poliquezia24, IPE32, vacunas39; corregir contra contenido visible. La imagen de consulta de DCC22 es otro perro que los oscuros20/21: no vincular a un mismo paciente.

La apariencia fotográfica **no acredita** fotografía real ni permite por sí sola demostrar generación IA. Hay evidencia de prompts de generación en briefs (poliquezia §8, por ejemplo), marcas gráficas en varias imágenes y contexto editorial ilustrativo. No deben presentarse escenas como expediente/fotografía clínica de Bruno, Duke, Toby, Max ni de pacientes publicados. La leyenda visible debe declarar la condición ilustrativa; una marca pequeña en esquina o el nombre del archivo no la sustituye. No se detectaron nuevas razones para reabrir ojos/oídos, cuyo contenido no fue inspeccionado.

## Procedencia de Dakota y Luna

Se localizó fuente documental concreta: `briefings/briefing-mi-perro-viejo-defeca-mucho-poliquezia.md`, §2, líneas50–52, cita de propietario depurada de transcripción; preservada también en commit `1e8c3ac` (verificado con `git show`). Contiene adopción de Dakota con nueve años,23kg, robo de comida, cartílagos compartidos, pérdida de peso de Luna y deposiciones3–4/4–5. **Termina diciendo que no han descubierto la causa**. Es experiencia doméstica aportada, no caso inventado ni diagnóstico acreditado.

El mismo brief, instrucciones posteriores, manda narrar mejoría/resolución con separación y control de peso: ese desenlace NO está en la cita y no puede conservarse por obediencia al contrato. Retirar atribución causal y mejoría no documentada; conservar observaciones y consulta pendiente. §8 registra fotografías reales del tutor como referencia para prompts: escenas generadas a partir de una referencia no pasan a ser fotografías de visitas/comidas reales.

`docs/herramientas/decisiones-del-propietario.md` también identifica Luna/Dakota como Beagles del propietario. Dice progresión desde cachorras; no usarlo para alterar la cita específica de adopción de Dakota con nueve años. No apareció un brief de cama/caídas con relato literal en `briefings/`; el contenido previo publicado en git no demuestra por sí mismo procedencia personal de lesión cervical/CBD/recuperación. Conservar solo experiencia expresamente respaldada; generalizar lo demás sin acusar invención.

## Vacunas: verificación específica ampliada

Fuente completa obtenida independientemente: **Squires et al., WSAVA2024**, DOI10.1111/jsap.13718; PDF oficial y texto en `evidencias/auditor-wsava2024.pdf` y `.txt`. Consultas y bloqueos AAHA profundos en `auditor-vacunas-consultas.json`. La portada AAHA sí abrió en la primera tanda; los subapartados dieron403 en esta: no implica fuente falsa.

- Resumen y tabla1: CDV/CAV/CPV core; rabia core donde endémica; leptospirosis core donde enfermedad endémica, serogrupos implicados conocidos y vacuna adecuada disponible. El artículo la clasifica no core rural sin esos matices: corregir.
- Vacunación adulta (TXT795–830): rabia se rige por legislación y DOI de ficha, habitualmente1o3años; no aplicar intervalo trienal universal de las otras core. Nunca asumir vacuna local anual segura/eficaz para tres años.
- Comprehensive preventative healthcare (TXT250–270): poca evidencia de necesidad de programa core especial/mejorado solo por edad en animales correctamente vacunados; memoria inmunitaria persiste, primaria contra antígeno nuevo puede ser peor. No convertir inmunosenescencia en justificación universal de reducir dosis/refuerzos.
- Tabla1: leptospirosis tras primovacunación, refuerzo anual; otras vacunas/inmunizaciones tienen pautas diferentes. Clasificar leishmaniosis por vacuna autorizada y contexto regional; no equiparar cualquier producto entre América Latina y Mediterráneo ni asumir disponibilidad mundial.
- CAPC General Guidelines (texto propio `fuentes/auditor-6df6645dadb03154.txt`): recomienda protección de amplio espectro durante todo el año y pruebas según riesgo; la pauta adulta cuatro veces/año aparece expresamente bajo **“If Year-Round Broad-Spectrum Parasite Control Cannot Be Maintained”**. No asignarla universalmente ni confundir con prevención de dirofilaria, que tiene producto/intervalo específico. Adultos sanos, análisis fecales al menos dos veces/año y ajuste individual. La tabla por trimestres/estación del artículo no se deduce de CAPC y presupone hemisferio/clima.
- Alt39 no coincide con escena; calendario42 inválido. Las bandejas40 son ilustración, no clasificación legal de frascos reales.

## Baño y callosidades: pendientes de fuentes completados

- Merck *Hygroma in Dogs*, fuente propia `auditor-e5d53a65a744db3e.txt`: describe inicio típico6–18meses en razas grandes, lesiones también posibles después, traumatismo reiterado, cama blanda/protección, cirugía con complicaciones y necesidad de valoración. No imponer caso senior cuando caso Pavletic es joven.
- Clinician’s Brief *Coaptation Devices for Elbow Hygromas*, fuente propia `auditor-4dec22eb5d46a02b.txt`: describe riesgo de presión circunferencial con almohadilla tipo donut y vigilancia/ajuste, respalda advertencia de no fabricar vendajes apretados. No es ensayo que pruebe eficacia universal de cama/protector comercial.
- ISCAID texto completo ya revisado: tabla2 diferencia callo no infectado, piodermia y diagnósticos alternativos; citología y profundidad de lesión guían antimicrobianos, no aspecto por fotografía.
- Rayburn, PDF2022 extraído y leído: manejo con menor estrés, aproximación y contención clínica adaptadas; no protocolo de baño geriátrico. No respalda forzar al perro a tolerar maniobra.
- Fortney2010, fuente propia `auditor-0eb6ea5e4f50505d.txt`: menciona sequedad y menos baños/acondicionamiento como manejo secundario; es texto antiguo, incluye pautas farmacológicas que no se trasladan al lector. El artículo de baño lo usa como contexto y reconoce limitación; no acredita frecuencia universal de baño ni garantiza barrera cutánea senior.
- Lee y Nakonechny comprobados por separado en suplemento R1: población45retrievers2–8años y encuesta691profesionales respectivamente; no ensayo de frecuencia o técnica óptima de baño en perros geriátricos con movilidad reducida.

## Registro visual por ruta

En esta tabla “ilustración” describe el uso editorial que debe tener; no una prueba forense de cómo se produjo el archivo. Sin otro problema visible, se conserva la imagen con identificación ilustrativa y alt fiel. La inspección en lámina evalúa composición/coherencia, no cada píxel de anatomía clínica a resolución nativa.

|N.º|Ruta|Observación concreta|
|---|---|---|
|1|`/images/blog/sindrome-cushing-perros-mayores/hero-perro-cushing-senior.webp`|Cocker dorado senior con cuidadora y veterinaria en domicilio; no prueba diagnóstico.|
|2|`/images/blog/sindrome-cushing-perros-mayores/sindrome-cushing-perros-mayores-diagnostico.webp`|Cocker dorado explorado con fonendoscopio; no muestra prueba endocrina.|
|3|`/images/blog/sindrome-cushing-perros-mayores/cuidado-perro-cushing-en-casa.webp`|Cocker dorado bebiendo agua; no prueba poliuria/polidipsia.|
|4|`/images/blog/callosidades-higromas-codos-perros-senior/san-bernardo-senior-cama-acolchada.webp`|San Bernardo canoso recostado en cama; escena ilustrativa coherente con senior, distinto del paciente de un año del caso.|
|5|`/images/blog/callosidades-higromas-codos-perros-senior/infografia-callo-higroma.webp`|Esquema callo/higroma con consulta y advertencia; texto legible, sin afirmar diagnóstico por imagen.|
|6|`/images/blog/callosidades-higromas-codos-perros-senior/san-bernardo-senior-acceso-cama.webp`|San Bernardo canoso frente a cama accesible; continuidad visual con 4.|
|7|`/images/blog/callosidades-higromas-codos-perros-senior/san-bernardo-senior-observar-apoyos.webp`|San Bernardo en cama y cuidadora observándolo; no se aprecia exploración invasiva.|
|8|`/images/blog/como-dar-medicacion-perro/beagle-rechaza-pastilla-perro-senior.webp`|Beagle canoso frente a pastilla en mesa; ilustra rechazo, no paciente identificado.|
|9|`/images/blog/como-dar-medicacion-perro/perro-senior-examen-dental-gingivitis.webp`|Labrador y exploración oral con guantes; se aprecia encía roja ilustrativa, no fotografía clínica acreditada.|
|10|`/images/blog/como-dar-medicacion-perro/tecnica-manual-dar-pastilla-perro.webp`|Perro sostenido con boca abierta y pastilla; no demuestra técnica segura universal ni autoriza forzar ante resistencia.|
|11|`/images/blog/como-dar-medicacion-perro/triturar-pastillas-perro-mortero.webp`|Mortero con polvo, jeringa y mantequilla de cacahuete; puede sugerir triturar/mezclar, requiere límite de formulación y producto sin xilitol.|
|12|`/images/blog/ulceras-presion-perros/perro-senior-cama-ortopedica.webp`|Perro dorado descansando en cama con etiqueta comercial aparente; no prueba eficacia ni recuperación de úlcera.|
|13|`/images/blog/ulceras-presion-perros/puntos-presion-perro-diagrama.webp`|Esquema mal rotulado: dice decúbito lateral pero perro con tórax apoyado, anteriores extendidos y cabeza erguida; retirar/reemplazar como mapa clínico.|
|14|`/images/blog/incontinencia-fecal-perros-senior/cocker-senior-cama-empapador.webp`|Cocker dorado canoso en cama con empapador; no es fotografía acreditada del cocker publicado.|
|15|`/images/blog/incontinencia-fecal-perros-senior/infografia-reservorio-esfinter-incontinencia-fecal.webp`|Esquema reservorio/esfínter con avisos frente a escape; distinción didáctica, no regla diagnóstica absoluta.|
|16|`/images/blog/incontinencia-fecal-perros-senior/sistema-tres-capas-cama-perro-incontinente.webp`|Capas de cama, empapador y protección; cocker al fondo; ilustración de organización.|
|17|`/images/blog/incontinencia-fecal-perros-senior/rutina-salida-programada-perro-senior.webp`|Cocker con cuidadora saliendo por rampa y paso protegido; ilustra rutina, no resultado clínico.|
|18|`/images/blog/incontinencia-urinaria-perros-mayores/perro-senior-incontinencia.webp`|Perro gris canoso durmiendo con empapador; no prueba episodio de incontinencia.|
|19|`/images/blog/incontinencia-urinaria-perros-mayores/higiene-perro-senior.webp`|Labrador dorado en consulta y limpieza de pata; no muestra limpiado perineal; ajustar alt si atribuye esa maniobra.|
|20|`/images/blog/disfuncion-cognitiva-canina/perro-senior-demencia-senil-desorientado.webp`|Perro oscuro canoso en pasillo; no permite diagnosticar desorientación ni identificar a Duke.|
|21|`/images/blog/disfuncion-cognitiva-canina/perro-senior-caminando-nocturno-ansiedad.webp`|Perro oscuro canoso caminando por pasillo nocturno; no evidencia ansiedad clínica.|
|22|`/images/blog/disfuncion-cognitiva-canina/perro-senior-consulta-disfuncion-cognitiva.webp`|Golden dorado sentado en consulta; cambia de perro respecto a 20/21, no presentarlo como un mismo paciente.|
|23|`/images/blog/disfuncion-cognitiva-canina/espacio-seguro-perro-senior-cama-luz.webp`|Perro oscuro en cama junto a luz; adaptación doméstica ilustrativa.|
|24|`/images/blog/mi-perro-viejo-defeca-mucho-poliquezia/mi-perro-viejo-defeca-mucho-frecuencia-fecal.webp`|Beagle caminando en exterior, persona con bolsa; alt inicial decía descansando alfombra: falso. No foto acreditada de Dakota.|
|25|`/images/blog/mi-perro-viejo-defeca-mucho-poliquezia/chequeo-veterinario-perro-senior-digestivo.webp`|Beagle blanco en camilla con veterinaria; ilustración basada en personaje, no consulta documentada de Dakota.|
|26|`/images/blog/mi-perro-viejo-defeca-mucho-poliquezia/perros-senior-comiendo-separados-saciado.webp`|Dos beagles comiendo separados; ejemplo de manejo, no prueba de mejoría ni escena real acreditada.|
|27|`/images/blog/agresividad-tardia-perros-mayores-dolor/perro-mayor-senal-aviso-manipulacion.webp`|Labrador chocolate canoso recostado ante mano próxima; tensión plausible, no diagnóstico.|
|28|`/images/blog/agresividad-tardia-perros-mayores-dolor/perro-senior-dolor-cadera-incorporarse.webp`|Labrador chocolate canoso levantándose de cama; no permite graduar dolor.|
|29|`/images/blog/agresividad-tardia-perros-mayores-dolor/infografia-que-hacer-perro-mayor-grune.webp`|Infografía detener contacto/distancia/proteger/registrar/consultar y urgencias; mensaje legible y coherente.|
|30|`/images/blog/agresividad-tardia-perros-mayores-dolor/manipulacion-segura-perro-mayor-arnes.webp`|Labrador chocolate con banda de soporte y cuidadora; no enseña ajuste completo ni garantiza ausencia de presión.|
|31|`/images/blog/agresividad-tardia-perros-mayores-dolor/perro-mayor-zona-descanso-respetada.webp`|Labrador chocolate descansando en zona tranquila; continuidad visual.|
|32|`/images/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion/perro-senior-delgado.webp`|Setter moteado blanco-negro canoso en cama; NO Gordon negro-fuego descrito en alt inicial.|
|33|`/images/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion/perro-gordon-setter-delgado.webp`|Setter negro-fuego de pie delgado; puede ilustrar pérdida corporal, no paciente Watson acreditado.|
|34|`/images/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion/preparacion-enzimas-pancreaticas-comida-perro.webp`|Polvo añadido a cuenco y mezclado; no identifica producto ni dosis prescrita.|
|35|`/images/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion/perro-setter-gordon-mayor-feliz.webp`|Setter negro-fuego descansando en cama; no fotografía de recuperación clínica.|
|36|`/images/blog/ansiedad-separacion-perros-senior/perro-senior-espera-puerta.webp`|Cocker dorado canoso junto a puerta; viñeta ilustrativa.|
|37|`/images/blog/ansiedad-separacion-perros-senior/sordera-perro-mayor-senal-manual.webp`|Cocker y señal manual de cuidadora; no prueba sordera.|
|38|`/images/blog/ansiedad-separacion-perros-senior/perro-senior-tranquilo-ausencia-tutora.webp`|Cocker dorado descansando; no evidencia eficacia de intervención.|
|39|`/images/blog/vacunas-desparasitacion-perros-senior/vacunacion-perro-senior-veterinario.webp`|Perro con veterinaria y propietaria mirando folleto; NO se ve vacunación, contrario al alt inicial.|
|40|`/images/blog/vacunas-desparasitacion-perros-senior/vacunas-esenciales-vs-no-core-perros.webp`|Dos bandejas con frascos rotulados esenciales/no core; no permite identificar formulaciones ni clasificación por ubicación.|
|41|`/images/blog/vacunas-desparasitacion-perros-senior/desparasitacion-interna-externa-perros-senior.webp`|Golden y cuidadora aplicando gotero/pipeta; no demuestra cobertura de parásitos internos y externos de cualquier producto.|
|42|`/images/blog/vacunas-desparasitacion-perros-senior/calendario-prevencion-perros-senior-2025.webp`|Calendario defectuoso: Q1 repetido, D3/Q5/Q6/E7/12, errores de texto y vacuna anual universal; retirar recurso.|
|43|`/images/blog/vacunas-desparasitacion-perros-senior/cuidados-postvacuna-perro-senior.webp`|Perro de pelaje largo recostado y mano; no evidencia seguimiento posvacunal real.|
|44|`/images/blog/banar-perro-viejo-movilidad-reducida/bano-dogo-argentino-senior-antideslizante-v2.webp`|Dogo senior blanco mojado sobre superficie antideslizante; anatomía/edad coherentes, escena ilustrativa.|
|45|`/images/blog/banar-perro-viejo-movilidad-reducida/aseo-por-zonas-perro-mayor-tumbado-v2.webp`|Mismo dogo canoso recostado y aseo por zonas; continuidad visual.|
|46|`/images/blog/banar-perro-viejo-movilidad-reducida/secado-toalla-perro-senior-tranquilo-v2.webp`|Dogo canoso secado con toalla; continuidad visual; no prueba temperatura o tolerancia.|
|47|`/images/blog/salud-dental-perros-mayores/perro-senior-sarro-molares-encias.webp`|Perro pequeño de pelo áspero en exploración oral; no permite diagnosticar grado periodontal.|
|48|`/images/blog/salud-dental-perros-mayores/comparacion-dientes-sanos-periodontitis.webp`|Esquema genérico de dientes/encías con recesión; no fotografía diagnóstica canina.|
|49|`/images/blog/salud-dental-perros-mayores/veterinario-cepillando-dientes-perro-mayor.webp`|Perro blanco con cepillo en incisivos; parece de menor edad que otros perros del artículo, no mismo paciente.|
|50|`/images/blog/salud-dental-perros-mayores/comparacion-antes-despues-limpieza-dental.webp`|Montaje fotorealista BEFORE/AFTER de boca con/sin sarro; simulación, no resultado clínico ni prueba de reversión de pérdida ósea.|
|51|`/images/blog/cama-ortopedica/dos-perras-cama-ortopedica-compartida.webp`|Dos beagles sobre cama compartida; no foto doméstica acreditada por inspección visual sola.|
|52|`/images/blog/cama-ortopedica/test-colapso-cama-ortopedica-perro-mayor.webp`|Beagle recostado y mano palpando cama; comprobación orientativa, no test clínico validado.|
|53|`/images/blog/cama-ortopedica/gradita-acceso-cama-perro-displasia.webp`|Beagle usando peldaños de madera; no prueba superioridad universal para displasia.|
|54|`/images/blog/prevencion-caidas/pasillo-runner-antideslizante-perro-mayor-caminando.webp`|Perro oscuro canoso sobre pasillo con alfombra; adaptación ilustrativa.|
|55|`/images/blog/prevencion-caidas/pelo-interdigital-almohadilla-perro-senior-traccion.webp`|Primer plano pata sujeta y tijeras cerca de pelo interdigital; manipulación requiere guía y parar ante dolor, no cortar a ciegas.|
|56|`/images/blog/prevencion-caidas/cama-ortopedica-perro-senior-descanso-digno.webp`|Perro oscuro canoso descansando en cama; continuidad visual, no prevención demostrada.|
|57|`/images/blog/chequeo-geriatrico-canino/perro-mayor-consulta-veterinaria.webp`|Perro mestizo en camilla con veterinaria y auxiliar; escena de consulta, no revisión documentada.|
|58|`/images/blog/chequeo-geriatrico-canino/tutora-acariciando-perro-anciano.webp`|Golden con cuidadora en sala de espera; no Dakota/Luna beagle.|
|59|`/images/blog/chequeo-geriatrico-canino/veterinario-corte-unas-perro-mayor.webp`|Perro sin pelo pequeño con dos profesionales sujetando pata; cambia de sujeto, no escena acreditada de corte de uñas de Dakota.|
|60|`/images/blog/chequeo-geriatrico-canino/infografia-checklist-perros-mayores.webp`|Checklist visual con examen, peso, analítica, presión, vacunas, movilidad, dental, uñas y seguimiento; no todos son obligatorios cada visita.|
|61|`/images/blog/comida-casera-perros-mayores/preparacion-comida-casera-perros-mayores.webp`|Carne cruda y vegetales siendo cortados; requiere contexto de cocción, no sugerir carne cruda por defecto.|
|62|`/images/blog/comida-casera-perros-mayores/comparacion-dieta-licuado-perros-mayores.webp`|Infografía atribuye al licuado absorción superior, más energía/vitalidad y ciencia; promesas clínicas no acreditadas, retirar.|
|63|`/images/blog/comida-casera-perros-mayores/licuado-carne-vegetales-pate-perros.webp`|Puré verde vertido sobre carne que parece picada cruda; no prueba dieta completa ni permite verificar cocción.|

La comprobación visual de archivos locales no acredita despliegue ni rastreo. Se mantienen pendientes la relectura de documentos corregidos, presentación en navegador/móvil y verificación pública posterior.

### Comprobación adicional de cama y chequeo en historia

Se consultó `git log --all --` para ambos artículos y el alta de cama (`acbd00c`, 9 de junio de 2026): incorpora artículo e imágenes, sin un aporte literal del propietario separado. La búsqueda en documentos Markdown y briefs encontró copias/fixtures de esas experiencias, no una transcripción original que acredite cama nueva compartida o sujeción de uñas por varias personas. El brief de corte de uñas declara expresamente que no hay historia personal del autor y se basa en una cohorte publicada. Esto justifica generalizar los pasajes no acreditados, **no** etiquetarlos como invenciones demostradas. La fuente específica de poliquezia sí permite mantener su experiencia doméstica con sus límites.
