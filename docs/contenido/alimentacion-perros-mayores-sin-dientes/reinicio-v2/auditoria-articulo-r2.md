# Auditoría independiente del artículo v2 completo — ronda 2 de 3

Fecha: 2026-10-20. Auditor distinto de creación, redacción y corrección. Se mantiene la misma ronda R2 iniciada antes de la interrupción del entorno; las pruebas y archivos persistidos no se presentan como una nueva ronda ni se repiten para alterar el contador. No se modificaron los archivos del producto.

## Veredicto

**APTO / Publicable:** el nuevo artículo cumple el contrato editorial y sus imágenes, animaciones, apoyos y registro funcionan en las comprobaciones locales del conjunto congelado. La decisión de publicación sigue reservada al propietario: este informe no autoriza fusión ni despliegue y no afirma aprobación visual por el usuario.

No quedan hallazgos P0/P1/P2 pendientes en el alcance comprobado. La ronda R1 fue editorial y provisional; esta R2 cierra el conjunto con sus recursos. La R3 no se ha consumido. El brief conserva su APTO R2 y su historial separado; no se reabrió por producir imágenes ni se reiniciaron las series de la entrega v1 rechazada.

## Versiones auditadas

Hashes calculados personalmente al iniciar y al retomar el cierre, coincidentes con las versiones congeladas:

| Archivo | SHA-256 |
|---|---|
| `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx` | `8600c7a8ec6a8fb9d58c3ad35d77770a8233ca8684bd38c694f486ef6d314be2` |
| `src/components/article/AlimentacionSinDientesRecursosV2.astro` | `f06a38f052eb430e9b701a671607e93753709dade29905d2bc8749f39a92d899` |
| HTML compilado del artículo en `dist/client/alimentacion-perros-senior/` | `d14b85bc0f44f4ec79775463c7410d739f690d81178f7185c6de1be16a05b826` |
| `revision/lectura-interactiva.html` | `afc5afbceabaaa3eafff3273aa7e3c336b2f81b2991972a4717bae99722a31cc` |
| `revision/articulo-completo.pdf` | `ac68b37d584b84241b37578efc824385c0c75872c96de36f4ad907cec1e9cc93` |

El contrato sigue siendo el brief v2 SHA-256 `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208`. Los quince WebP tienen hashes y dimensiones propios en `imagenes-auditor-r2.json`; no se consideran cubiertos recursos distintos por compartir una carpeta.

## Texto final, cobertura y fuentes

Comparé el snapshot editorial R1 (`articulo-v2-r1-editorial.mdx.txt`, hash `05ffebd06f2adf79a29495907b339bba5edf1f28dda15e09ebce0957172ee9f8`) con el MDX final. Los cambios son el import y las tres llamadas del nuevo componente, los atributos de foco/nombre de las tres tablas y un alt de observación corregido para describir el plato en el suelo. No cambió la prosa editorial, las cifras de ejemplo ni las afirmaciones clínicas aprobadas provisionalmente en R1.

La lectura completa y el contraste con v1 se realizaron en R1 y constan en `auditoria-articulo-r1.md`: ocho decisiones distintas, sin ampliar el texto rechazado; cero párrafos idénticos a v1 y máximo tramo coincidente de ocho palabras comunes de higiene en el análisis orientativo de prosa. La inspección del diff final no revela ampliación ni repetición añadida para sumar volumen.

En R1 abrí personalmente las catorce URL profundas y contrasté cada afirmación exacta. Esas lecturas propias siguen siendo evidencia de esta auditoría; **no afirmo haber hecho otras catorce reaperturas en R2** porque la prosa y las referencias no cambiaron. Sí leí completo el texto nuevo de los recursos y comprobé que no añade pautas clínicas diferentes, cantidades recomendadas, recetas, diagnósticos o promesas de recuperación.

| Fuente | Afirmación/localizador comprobados personalmente en R1 | Uso final y límite conservado |
|---|---|---|
| F1 [UC Davis — Dentistry and Oral Surgery Service](https://www.vetmed.ucdavis.edu/hospital/small-animal/dentistry-oral-surgery-service) | FAQ sobre alimentación sin dientes | Intro/H2 1/3: posibilidad de alimento habitual/seco de tamaño adecuado; no pauta inmediata tras cirugía. |
| F2 [AAHA — Dentistry](https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/dentistry/) | Párrafos de dificultad al recoger/masticar/tragar y vídeo del cliente | H2 1/5/8: valoración y observación espontánea, sin diagnóstico por vídeo ni provocar otra toma. |
| F3 [Cline y colaboradores — AAHA Nutrition 2021](https://www.aaha.org/wp-content/uploads/2021/06/new-2021-aaha-nutrition-and-weight-management-guidelines-with-ref.pdf) | Evaluación, planes individuales, enfermedades concurrentes y seguimiento | H2 2/4/7/8: dieta/cantidad/extras y objetivos compatibles, sin fórmula energética universal ni protocolo hospitalario doméstico. |
| F4 [WSAVA — Guidelines on Selecting Pet Foods](https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf) | Etiqueta, adecuación y calorías por cantidad; PDF 1p | H2 2/3/4: comprobar base y unidad. Las animaciones conservan símbolos de base al añadir agua; no representan absorción ni dosis. |
| F5 [FEDIAF — Nutritional needs of cats and dogs](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/nutritional-needs-of-cats-and-dogs/) | Apertura sobre completo/complementario | H2 2: función distinta; industria identificada sin superioridad comercial atribuida. |
| F6 [Defarges/Merck — Dilatation of the Esophagus](https://www.merckvetmanual.com/digestive-system/diseases-of-the-esophagus-in-small-animals/dilatation-of-the-esophagus-in-small-animals) | Signos y variabilidad de consistencia entre pacientes | H2 1/4: no equiparar ausencia dental y enfermedad esofágica; no regla universal de licuar ni manejo postural. |
| F7 [Kuehn/Merck — Pneumonia in Dogs](https://www.merckvetmanual.com/dog-owners/lung-and-airway-disorders-of-dogs/pneumonia-in-dogs) | Introducción y Aspiration Pneumonia | H2 1/4 y avisos visuales: aspiración/alimentación forzada y signos respiratorios, sin diagnosticar por tos ni enseñar maniobras. |
| F8 [VCA–LifeLearn — Oral Surgery in Dogs](https://vcahospitals.com/know-your-pet/oral-surgery-in-dogs) | Cómo comer durante cicatrización y revisión | H2 5: hechos clínicos breves atribuidos; sin plazos, dosis o adaptación de sus párrafos. |
| F9 [FDA — Tips for Safe Handling](https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats) | Preparing/Storing | H2 4/6: manos/platos/utensilios y sobrante húmedo; sin plazos inventados de papilla. |
| F10 [FDA — Proper Storage](https://www.fda.gov/animal-veterinary/animal-health-literacy/proper-storage-pet-food-treats) | Conservación e incidencia con producto | H2 6/8: envase/lote y comunicar sospecha sin afirmar causalidad por coincidencia. |
| F11 [Tufts — Nutrition FAQs](https://vet.tufts.edu/foster-hospital-small-animals/specialty-services/nutrition/nutrition-faqs) | Ingredient list/Feeding Tubes | H2 2/7: ingredientes no acreditan adecuación; soporte veterinario cuando no ingiere suficiente, sin protocolo doméstico. |
| F12 [Cornell — Choosing food for your senior dog](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/choosing-food-your-senior-dog) | Individualización, masa corporal, calorías y apetencia | H2 3/7/8: grasa/músculo/olor, sin convertir preferencia en diagnóstico ni copiar dosis, suplementos o marcas. |
| F13 [Collins/Cornell — Dental disease and home dental care](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/dental-disease-and-home-dental-care) | Signos y cierre de tratamiento | H2 1/5: consultar y retomar cuidados según clínica tras recuperación; no manipular heridas. |
| F14 [FEDIAF — Home Made Diets](https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/home-made-diets/) | Apertura y Expert formulated diets | H2 3/7: formulación profesional; sin porcentajes del estudio no abierto ni receta universal. |

Todas se citan en un H2 asignado y en la bibliografía, con los límites declarados. Los ejemplos aritméticos siguen siendo ficticios, no raciones: 50 g de A/B representan 50/100 kcal bajo sus datos inventados; 40 g menos 10 g equivale a 30 g únicamente bajo las condiciones expresas. El recurso de ingesta no deduce consumo exacto cuando hay derrames o datos desconocidos.

La apertura conserva la guía sin caso; autoría central real comprobada en DOM: `Equipo Cuida a tu Perro Viejo`. No se acredita revisión veterinaria individual, pacientes, experiencia propia o desenlace inexistentes. No se diagnosticó ni se prescribieron fármacos, dosis, recetas completas improvisadas, proporciones, tiempos o posturas de alimentación.

## Conteo contractual del DOM

Extraje personalmente el texto del HTML compilado desde `.content-body`, con FAQ desplegado una vez, excluyendo íntegros `[data-editorial-visual]`, `[data-editorial-bibliography]`, pies, scripts, estilos y controles. Código reproducible: `verificacion/auditor-dom-extra-r2.py`; texto extraído: `texto-editorial-auditor-r2.txt`; resultado: `verificacion-dom-extra-auditor-r2.json`.

**5.858 palabras editoriales visibles**, dentro de 5.700–6.300. No incluye la prosa adicional de las dos animaciones ni del registro. La diferencia frente a 5.844 AST proviene de la separación del texto al renderizar tablas y FAQ; se conserva cada medida con su método y no se sustituye el DOM por el conteo de sintaxis MDX.

| Bloque | DOM | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 195 | 200 | -2,50 % |
| H2 1: qué parte de comer le cuesta | 558 | 600 | -7,00 % |
| H2 2: base y ración | 764 | 800 | -4,50 % |
| H2 3: presentaciones | 590 | 650 | -9,23 % |
| H2 4: preparación | 679 | 700 | -3,00 % |
| H2 5: extracción | 536 | 550 | -2,55 % |
| H2 6: conservación | 411 | 450 | -8,67 % |
| H2 7: otra enfermedad/menor consumo | 665 | 650 | +2,31 % |
| H2 8: registro/revisión | 627 | 650 | -3,54 % |
| Conclusión | 149 | 150 | -0,67 % |
| FAQ | 684 | 600 | +14,00 % |

Todos los bloques cumplen ±15 % sin compensar déficits con otros apartados. La distribución conserva las ocho decisiones verificadas editorialmente en R1; la cifra no sustituye ese juicio.

## Imágenes y recursos completos

Abrí y miré personalmente las cinco escenas finales, además de comprobar los quince WebP con decodificación PIL y en navegador. Conservan el mismo beagle senior tricolor, hocico/cara canosos, orejas avellana y proporciones plausibles. Los apoyos y la anatomía son coherentes; no hay interior de boca fabricado como prueba de ausencia dental. Las dos imágenes nuevas tienen originales PNG y tres variantes cada una. Dimensiones y hashes: `imagenes-auditor-r2.json`.

| Recurso | Ruta/ubicación real | Resultado propio |
|---|---|---|
| I1 hero reutilizado | Carpeta pública del slug, `beagle-senior-comida-blanda-v1.webp` | Inspeccionado; senior visible, alt fiel, declaración IA en hero, decodificado en cuatro vistas. |
| I2 preparación reutilizada | `preparar-textura-comida-perro-v1.webp`, H2 4 | Inspeccionado; preparación con utensilio mientras espera, sin cantidades o receta implícita en el pie. |
| I3 observación reutilizada | `observar-comida-perro-senior-v1.webp`, H2 8 | Inspeccionado; perro comiendo por sí mismo, sin persona inventada en alt. No se presenta como seguimiento clínico. |
| I4 nueva: medición | `medir-racion-base-beagle-senior-v2.webp`, H2 2 | Imagen real nueva y original conservado: base en recipiente sobre báscula, sin número recomendado ni marca. |
| I5 nueva: registro en consulta | `registro-alimentacion-consulta-beagle-senior-v2.webp`, H2 8 | Imagen real nueva y original conservado: cuaderno/envase y conversación, sin diagnóstico ni credencial inventada. |
| A1 base/presentación | Componente v2, variante `base`, H2 4 | Cuatro estados: base, adaptación, volumen, plato; símbolos de base constantes, cambios de agua/recipiente visibles. No se confunde con vídeo del perro. |
| A2 plato/registro | Componente v2, variante `ingesta`, H2 8 | Cuatro estados distintos: ofrecido, restos/derrame, certeza y registro. No transforma desaparición del plato en ingesta medida. |
| D1/D2/D3 | Tres tablas editoriales en H2 1/3/2 | Caption y th semánticos, nombres y foco sobre la tabla desplazable real. Flecha derecha mueve las tablas que lo necesitan en móvil. |
| Registro | Componente v2, variante `registro`, H2 8 | Diez campos etiquetados, sin envío/almacenamiento de valores; impresión normal y máxima conservadas en una A4 a 10 pt. |

Las cinco imágenes tienen declaración IA visible y no se presentan como pacientes ni evidencia clínica. Las versiones pequeñas existen y decodifican; no se han dado por válidas solo por su nombre o por un build.

## Pruebas propias en navegador

Scripts: `verificacion/auditor-navegador-r2.py`, `auditor-dom-extra-r2.py` y `auditor-cierre-r2.py`. Evidencia final: **98 comprobaciones, cero fallos pendientes**, `verificacion-auditor-r2.json`, más conteo/contraste y manifiesto de imágenes. No se adoptaron las pruebas de coordinación o producción como si fueran ejecuciones del auditor.

- Cuatro vistas Chromium: 390 y 1366 px, claro y oscuro. Cinco escenas decodificadas en cada una, sin desbordamiento global, cero infracciones axe WCAG A/AA en el cuerpo y sin errores JavaScript.
- Comprobación adicional a 320 px: sin desbordamiento global; sin JS a 375 px: ocho pasos visibles y controles no funcionales ocultos.
- Controles de al menos 44 px, foco visible y avance con Enter en ambas secuencias. Tablas móviles realmente desplazadas con teclado, con caption/nombre accesible.
- Las dos secuencias corrieron simultáneamente con temporizadores propios. Avance temporizado real, pausa comprobada durante siete segundos sin avance ni transición visible, final finito, repetición desde el primer paso y reinstalación idempotente de eventos.
- `pagehide`, `visibilitychange` y eventos Astro se simularon explícitamente para comprobar parada y limpieza. No se presentan como una navegación real de Astro o un cambio nativo de pestaña.
- Movimiento reducido: reproducción desactivada, recorrido manual disponible y elementos gráficos sin transición. Impresión con y sin JS conserva los ocho pasos completos.
- Contraste calculado de textos HTML de los tres componentes: mínimo **6,368:1** tanto en claro como en oscuro; sin anclas rotas en el documento completo. Axe y este muestreo no constituyen certificación exhaustiva de accesibilidad o de todos los navegadores.
- Registro: se rellenaron los diez controles con valores normales y hasta sus `maxlength`, se comprobó igualdad exacta en la copia DOM y preservación de los diez valores en PDF. Ambos caben en una A4; inspeccioné el render máximo y sus 10 pt son legibles. No se envió ninguna solicitud al escribir/imprimir ni se encontraron esos valores en localStorage/sessionStorage.

### Lectura móvil medida, sin promesa falsa de tres líneas

La prosa editorial mantiene 120 párrafos, media 38,33 palabras, mediana 39, ninguno de más de 50 y máximo 43, según la medida editorial documentada. La medición visual propia incluyó también 16 párrafos del FAQ: 136 en total, cuerpo a 18 px y FAQ a 14 px. A 390 px da **mediana de seis líneas y máximo nueve** incluyendo FAQ; a 1366 px, mediana de tres y máximo cuatro. No afirmo que treinta o cuarenta palabras equivalgan a tres líneas móviles.

Inspeccioné las capturas: hay tamaño y espaciado legibles, subtítulos frecuentes, controles utilizables y tablas con desplazamiento local. No se detectó un bloque ilegible o cortado que exigiera partir la prosa para una cifra de líneas. Se aplica el contrato vigente del brief v2, que exige medir la lectura real y no certificarla por un contador. No se modificó tipografía global ni se añadió relleno.

### Límites y correcciones del instrumento de prueba

Se conserva la ejecución directa inicial en `verificacion-auditor-r2-ejecucion.json`, con siete alarmas posteriormente explicadas y verificadas de forma focal en la misma R2. No se retiró ningún fallo del producto para obtener el veredicto:

1. Mi instrumento introducía un mínimo arbitrario de 16 px para declarar legibilidad y fallaba por los 14 px del FAQ. Retiré ese criterio no establecido por el contrato y conservé las medidas y la inspección visual; no cambié el artículo.
2. La extracción PDF `-layout` intercalaba columnas y parecía perder el final de cuatro campos. La extracción normal y `-raw` preservan los diez valores, igual que el DOM y la inspección del PDF. Se conserva esa prueba explícita.
3. Un `<title>` SVG no dibujado heredaba una duración global de 0,00001 s y hacía fallar la comparación literal con `0s`. La prueba focal sobre elementos gráficos renderizados confirma `0s`; no había movimiento visible que corregir.

También se corrigieron en el propio instrumento una espera sobre imágenes lazy y una expresión de consulta de anclas mal cerrada. No fueron cambios del producto ni auditorías ocultas: la versión final del instrumento y los resultados conservan el método y las limitaciones.

## Lectura privada y capturas

Probé personalmente el HTML autocontenido final mediante una respuesta local interceptada, bloqueando todas las solicitudes externas: cinco imágenes embebidas decodificadas, ambas secuencias avanzan manualmente, cambio de tema funcional, cero errores JS, cero solicitudes externas y sin desbordamiento a 390 px. `file://` está bloqueado por la política de Chromium del entorno; no afirmo haber abierto esa ruta ni la trato como un fallo del artículo.

El PDF privado final tiene **20 páginas y etiquetado**, y comprobé que contiene las ocho etapas y las FAQ, incluida la última respuesta. El etiquetado no equivale a certificación PDF/UA. La animación se representa estáticamente en el PDF; el HTML es la vista para interactuar. Estos artefactos conservan el mismo contenido con maquetación de revisión y sin navegación general; no son un despliegue público.

Mis trece PNG y cuatro PDF de prueba están en `capturas-auditor-r2/`. Conservaron navegación, asistente y barra de progreso del sitio: en algunas capturas altas esos overlays cruzan el componente. La línea marrón observada sobre el SVG es la barra fija general de lectura, no un elemento de la ilustración ni una alteración de sus cantidades. Las capturas limpias de `revision/` corresponden a la vista privada, que omite esa interfaz general; no se confunden con capturas del sitio sin cambios.

## Build y checks: evidencia ajena identificada

Inspeccioné los registros de coordinación, sin afirmar haber vuelto a ejecutar sus comandos. `verificacion/build.log` confirma build completo y proyección de 33 documentos; `check.log`, cero errores/cero advertencias y 62 hints; `tests.log`, 107/107; `agent-readiness-tests.log`, 77/77. `checks-compilados.json` conserva comandos y salida cero de inventario, discovery, proyección, API, routing y semántica. El HTML compilado que probé personalmente coincide con el hash congelado del build.

No se hizo un despliegue para comprobar este conjunto. Las pruebas son locales y no certifican estado público, todos los navegadores ni un rendimiento de producción. El incidente automático de la entrega anterior conserva su registro propio y no se ha utilizado como autorización para publicar la versión nueva.

## Lo que se conserva y cierre

Se mantienen la respuesta temprana, las ocho decisiones distintas, fuentes verificadas y límites clínicos junto al riesgo, sin caso fabricado ni receta universal. Las dos imágenes nuevas aportan medición y conversación clínica; las dos animaciones enseñan relaciones distintas y tienen alternativas completas. El registro conserva incertidumbre y datos al imprimir en vez de generar un resultado clínico.

El conjunto congelado queda **APTO en R2 de 3 para entrega y revisión del propietario**, con 5.858 palabras editoriales visibles, recursos operativos y artefactos privados comprobados. No hay corrección pendiente que justifique consumir R3. Cualquier modificación posterior del texto o recursos deberá identificarse y evaluarse dentro del contador vigente; no queda cubierta por este hash. No fusionar ni desplegar.
