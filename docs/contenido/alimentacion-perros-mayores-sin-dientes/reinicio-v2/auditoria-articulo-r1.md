# Auditoría independiente del artículo v2 — ronda 1 de 3

Fecha: 2026-10-20. Rol auditor, distinto de creación, redacción y corrección. No se editaron el artículo, el brief ni los componentes. Esta ronda y el futuro cierre integrado pertenecen al mismo contador del artículo v2, máximo tres; no hay contadores adicionales por recurso.

Texto auditado: `articulo-v2-en-revision.mdx`, fuera de la colección pública.
SHA-256: `05ffebd06f2adf79a29495907b339bba5edf1f28dda15e09ebce0957172ee9f8`.
Contrato: `briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md`, SHA-256 `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208`, APTO R2 del brief. No se reabre ese documento ni se heredan los APTO de v1.

## Veredicto

**APTO EDITORIAL PROVISIONAL para producir e integrar recursos:** el texto desarrolla el nuevo contrato con afirmaciones respaldadas, utilidad por sección y extensión real de lectura preliminar; **el conjunto todavía no es publicable ni tiene APTO final** porque faltan los recursos encargados y sus verificaciones.

No se han confirmado hallazgos P0/P1/P2 en el texto congelado. La ausencia de imágenes nuevas, animaciones y registro se declara como pendiente de la fase siguiente, no como trabajo terminado. Este veredicto no permite omitirlas ni guardar el artículo incompleto en `src/content/blog/`.

## Comprobación de que es una redacción nueva

Leí el texto íntegro y lo contrasté con el brief v2 y con el archivo de v1 rechazado. La nueva redacción separa ocho decisiones y desarrolla lectura de etiquetas, comparación energética, instrucciones de alta, conservación e incertidumbre de registro con ejemplos propios. No conserva la prosa anterior y añade párrafos alrededor para alcanzar una cifra.

Una comparación orientativa de prosa normalizada dio **cero párrafos idénticos** a v1 y un máximo de **ocho palabras consecutivas coincidentes**, en una frase común de higiene. También dio cero párrafos íntegros duplicados dentro de la nueva prosa. Método y resultado: `comparacion-prosa-auditor-r1.json`. Se retiraron imports, encabezados, HTML, bibliografía y puntuación; enlaces se redujeron a su ancla. Este análisis no prueba autoría ni detecta por sí solo repetición de ideas: la conclusión se apoya además en la lectura completa y el cambio de estructura.

El archivo de la colección sigue siendo v1 e idéntico al antecedente archivado; v2 permanece fuera de ella. Se conserva el historial rechazado, sin presentarlo como producto aprobado.

## Utilidad, profundidad y repetición

| Sección | Aportación comprobada en la lectura |
|---|---|
| Introducción | Respuesta temprana: ausencia dental no obliga a papilla; separa adecuación y presentación sin inventar paciente. |
| H2 1 | Diferencia recoger/masticar/tragar, tres situaciones y señales que cambian la acción. No convierte la matriz en diagnóstico. |
| H2 2 | Explica completo/complementario/terapéutico, unidades, etiqueta A/B y ejemplo energético; termina en instrucciones concretas para quien prepara. |
| H2 3 | Compara cuatro presentaciones por uso, preparación y límites; casero formulado no se confunde con ingredientes triturados. |
| H2 4 | Describe una rutina reproducible: tara, base, modificación autorizada, servicio voluntario y sobrante. No receta ni prueba casera de deglución. |
| H2 5 | Separa recuperación quirúrgica de alimentación duradera y coordina alta, revisión y relevo entre cuidadores. |
| H2 6 | Enseña qué información del envase conservar y cómo resolver material/sobrantes, sin extrapolar plazos entre productos. |
| H2 7 | Mantiene objetivos de dietas concurrentes y distingue grasa/músculo/apetencia/consumo; soporte profesional cuando no basta la ingesta. |
| H2 8 | Diferencia medido/estimado/desconocido, muestra límites de una resta y prepara preguntas clínicas con información utilizable. |
| Conclusión y FAQ | Cierre sin promesa de evolución; ocho respuestas recuperables de forma independiente, sin introducir recetas o plazos nuevos. |

Hay recordatorios de adecuación, consulta y medición en varios apartados, pero cumplen funciones diferentes: seleccionar una base, prepararla, conservar un objetivo por enfermedad y describir qué consumió. No encontré desarrollos enteros repetidos para sumar longitud. Las FAQ recapitulativas no se reproducen literalmente del cuerpo y no sustituyen ningún H2. El artículo no repite la guía general de comida casera ni la de tratamiento dental.

## Métricas repetidas por el auditor

Ejecuté `contar-editorial.mjs` sobre el archivo congelado y revisé sus exclusiones. Resultado propio guardado en `verificacion-editorial-auditor-r1.json`: **5.844 palabras editoriales AST**, incluyendo prosa, encabezados, tablas, AlertBox editoriales y FAQ una vez; excluyendo sintaxis, frontmatter/imports, figuras/pies, bibliografía y componentes visuales. Es un conteo preliminar, **no se afirma haber medido el DOM contractual compilado**, que se hará con la integración final.

| Bloque | Palabras AST | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 195 | 200 | -2,50 % |
| H2 1: parte de comer que le cuesta | 556 | 600 | -7,33 % |
| H2 2: base y ración | 762 | 800 | -4,75 % |
| H2 3: presentaciones | 588 | 650 | -9,54 % |
| H2 4: preparación | 679 | 700 | -3,00 % |
| H2 5: extracción | 536 | 550 | -2,55 % |
| H2 6: conservación | 411 | 450 | -8,67 % |
| H2 7: otra enfermedad/menor consumo | 665 | 650 | +2,31 % |
| H2 8: registro y revisión | 627 | 650 | -3,54 % |
| Conclusión | 149 | 150 | -0,67 % |
| FAQ | 676 | 600 | +12,67 % |

Total dentro del intervalo 5.700–6.300 y todos los bloques dentro de ±15 %, sin compensación entre secciones incumplidas. Densidad propia por AST: **120 párrafos, media 38,33, mediana 39, cero >50, máximo 43**. **32 H3** en ocho H2 de desarrollo; no H1 manual. La vista móvil real todavía no se certifica por estos números.

El contador heredado `metricas.mjs` busca el brief v1 por nombre y analiza la colección, donde aún no está v2: no lo utilicé para emitir un resultado sobre otro documento ni modifiqué el brief histórico para obtener un APTO mecánico. El contrato v2 permite método explícito cuando la herramienta heredada no lo interpreta. El futuro conteo DOM debe conservar exclusiones `[data-editorial-bibliography]`, `[data-editorial-visual]`, pies y duplicados de impresión y extraer el FAQ aunque esté colapsado.

## Fuentes reabiertas y afirmaciones exactas

Abrí personalmente las **catorce URL profundas de nuevo para esta ronda del artículo**, mediante URL completas; comprobé título y pasajes aplicables, sin adoptar la tabla del redactor como prueba. Las localizaciones son secciones o páginas físicas del PDF. La bibliografía del artículo conserva nombres/fechas compatibles con los documentos. No hay cifras clínicas, DOI/PMID añadidos ni recuperación o experiencia inventada.

| Fuente | Pasaje comprobado | Afirmación auditada y ubicación del artículo | Resultado/límite |
|---|---|---|---|
| F1 [UC Davis](https://www.vetmed.ucdavis.edu/hospital/small-animal/dentistry-oral-surgery-service) | FAQ sobre alimentación sin dientes | Posibilidad de comida habitual/seca de tamaño adecuado; intro, H2 1/3 y FAQ | Respaldada como posibilidad; se excluye su aplicación automática tras cirugía. |
| F2 [AAHA Dentistry](https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/dentistry/) | Párrafos iniciales: dificultades orales y vídeo del cliente | Explorar ante problemas al coger/masticar/tragar; vídeo espontáneo útil; H2 1/5/8 | Respaldada; vídeo no provoca síntomas ni retrasa atención. |
| F3 [Cline/AAHA Nutrition 2021](https://www.aaha.org/wp-content/uploads/2021/06/new-2021-aaha-nutrition-and-weight-management-guidelines-with-ref.pdf) | Evaluación/historia pp.2–5, planes pp.5–7, enfermedades p.11 y comunicación p.14 | Plan individual de alimento/cantidad/extras, nutrientes concurrentes y seguimiento; H2 2/4/7/8 | Respaldada; no fórmula energética universal, protocolo hospitalario ni dosis para lector. |
| F4 [WSAVA selección](https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf) | Etiqueta, adecuación y calorías; PDF 1p | Comprobar función y unidad energética/pedir datos al fabricante; H2 2/3/4 | Respaldada; sin sello ni rankings de marcas. |
| F5 [FEDIAF necesidades](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/nutritional-needs-of-cats-and-dogs/) | Apertura | Complementario no cubre por sí solo la dieta; H2 2 | Respaldada; industria explícita, sin eficacia clínica atribuida. |
| F6 [Defarges/Merck esófago](https://www.merckvetmanual.com/digestive-system/diseases-of-the-esophagus-in-small-animals/dilatation-of-the-esophagus-in-small-animals) | Signos y consistencia del alimento | Regurgitación/problema esofágico y consistencia variable; H2 1/4 | Respaldada; no equipara falta de dientes y megaesófago ni enseña manejo postural. |
| F7 [Kuehn/Merck neumonía](https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs/pneumonia-in-dogs) | Introducción/Aspiration Pneumonia | Riesgo de alimentación forzada y signos respiratorios; H2 1/4 | Respaldada; urgencia sin diagnosticar aspiración por tos. |
| F8 [VCA–LifeLearn cirugía oral](https://vcahospitals.com/know-your-pet/oral-surgery-in-dogs) | Cómo comer después de cirugía; firma/actualización | Blando habitual durante cicatrización y revisiones; H2 5 | Hechos breves respaldados; no días, dosis o párrafos adaptados del documento. |
| F9 [FDA manipulación](https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats) | Preparing/Storing | Manos, platos/utensilios, no usar comedero para sacar alimento, sobrantes húmedos; H2 4/6 | Respaldada; no fija horas de papilla o remojo. |
| F10 [FDA conservación](https://www.fda.gov/animal-veterinary/animal-health-literacy/proper-storage-pet-food-treats) | Lista y problemas con producto | Envase/lote, lavar entre bolsas, apartar sospechoso/contactar; H2 6/8 | Respaldada; síntomas tras comer no demuestran causa ni olor normal inocuidad. |
| F11 [Tufts Nutrition FAQs](https://vet.tufts.edu/foster-hospital-small-animals/specialty-services/nutrition/nutrition-faqs) | Ingredient list y Feeding Tubes | Ingredientes no bastan para valorar dieta; soporte si no ingiere suficiente; H2 2/7 | Respaldada; sin cuidados/colocación de sonda ni días de espera en casa. |
| F12 [Cornell alimentación senior](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/choosing-food-your-senior-dog) | Introducción, Protein, Caloric needs, Palatability | Individualización, grasa/músculo y olor; H2 3/7/8 | Respaldada; no usa sus suplementos/dosis/marcas ni diagnostica pérdida de olfato. |
| F13 [Collins/Cornell dental](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/dental-disease-and-home-dental-care) | Signs y cierre Treatment | Signos para contactar y retomar cuidados según clínica tras recuperación; H2 1/5 | Respaldada; no obliga a esperar todos los signos ni manipula heridas. |
| F14 [FEDIAF casero](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/home-made-diets/) | Apertura/Expert formulated diets | Formulación profesional; triturar no acredita equilibrio; H2 3/7 | Respaldada; fuente industrial reconocida, sin porcentajes del estudio reseñado no abierto. |

Todas las fuentes tienen uso real en al menos un H2 asignado, no solo en el cuadro final. Las citas repetidas por nombre sin repetir enlace siguen siendo identificables por la cita enlazada anterior y por la bibliografía. La guía declara correctamente sus fuentes como generales/secundarias y no como ensayo específico sobre una dieta para desdentados.

Comprobé los ejemplos nuevos: 50 g de A a 100 kcal/100 g son 50 kcal; de B a 200 kcal/100 g son 100 kcal. 40 g ofrecidos menos 10 g sobrantes, bajo las condiciones señaladas, deja una diferencia de 30 g. Ambos están identificados como ficticios/aritméticos, sin convertirse en ración. La limitación ante agua, derrames y selección se explica junto al cálculo, no en un descargo remoto.

## Formato, enlaces y procedencia

Verificación propia: cuatro AlertBox (info/danger/warning/info), FAQ de ocho preguntas, tres tablas semánticas con caption y encabezados, cuatro enlaces internos correctos a pilar/comida casera/salud dental/chequeo geriátrico. Las rutas coinciden con los archivos e inventario y no se inventa segundo spoke.

Frontmatter dentro del schema, metadatos del brief (43/155 caracteres) y fecha 20-10-2026. No TOC, byline, schema ni H1 manual. La autoría central y fecha se comprobarán renderizadas en R2. `status: Publicado` en este scratch no acredita publicación ni despliegue.

La apertura identifica guía general sin paciente. No hay nombres o desenlaces clínicos inventados, credenciales ni revisión veterinaria inexistente; la bibliografía lo aclara. No encontré referencias al brief/redactor ni instrucciones de producción filtradas al lector. La seguridad excluye recetas universales, proporciones, suplementos, dosis, jeringa forzada, tiempos de cicatrización y posturas de deglución. Las advertencias se sitúan junto al riesgo, sin prometer curación.

## Pendientes obligatorios del conjunto

| Recurso o prueba | Estado real en esta ronda | Qué debe cerrar R2 |
|---|---|---|
| I1/I2/I3 anteriores | Referencias existentes; no heredan APTO visual de v1 | Inspección de las tres, continuidad/alt/anatomía/edad, IA visible y decode responsive |
| I4 medición / I5 consulta | Referencias previstas; archivos nuevos aún no generados | Dos escenas nuevas reales desde referencia, originales, WebP/variantes y contexto fiel |
| A1 base/presentación | No producida ni llamada como componente en el scratch | Proceso didáctico de cuatro estados, cambios reales y todos los controles/alternativas |
| A2 plato/registro | No producida | Segundo proceso distinto, incertidumbre respetada, mismos controles y pruebas |
| Registro imprimible | No producido | Datos normales/máximos preservados en A4 legible, teclado, sin envío/almacenamiento |
| Tablas y lectura | Solo inspección de fuente | Reflujo/teclado/foco/contraste móvil y escritorio claro/oscuro |
| Sin JS/reduced/impresión | No ejecutados | Pasos completos, controles inactivos ocultos, pausa real, fin y cleanup |
| Conteo DOM | Pendiente | Contrato visible reproducible con exclusiones completas y FAQ una vez |
| Build/check/proyección/rutas | No ejecutados sobre v2 | Build y check reales del conjunto; enlaces/anclas/imágenes/Markdown y ausencia de errores nuevos |
| Lectura PDF y capturas | Pendientes | Artículo completo con recursos; aclarar animaciones estáticas; revisión privada sin despliegue |

Las nuevas imágenes y componentes no se presentan como funcionales en esta revisión. Las figuras previstas describen el contexto requerido, pero su alt solo se aprobará al inspeccionar las imágenes reales. No se ha probado navegador ni afirmado acceso público a una versión nueva.

## Lo que sí funciona y siguiente paso

Conservar la respuesta directa de apertura, la comparación con adecuación separada de textura, los ejemplos aritméticos limitados y la incertidumbre explícita del registro. El artículo tiene un cierre útil sin inventar una recuperación. La longitud se acompaña de decisiones distintas y la lectura no depende de una historia fabricada.

Puede empezar la producción visual según el brief APTO. Integrar los recursos reales sin cambiar silenciosamente el texto auditado; conservar hashes e identificar cualquier cambio editorial. Completar autocontroles del conjunto antes de guardarlo en la colección y solicitar **R2 del mismo artículo**, con MDX, recursos y build congelados. R3 queda de reserva para hallazgos. No fusionar ni desplegar.
