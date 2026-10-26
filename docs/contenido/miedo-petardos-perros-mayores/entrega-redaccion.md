# Entrega de redacción — miedo a los petardos en perros mayores

Fecha de trabajo: 2026-10-25. Rama: `claude/redaccion-miedo-petardos-perros-mayores`, creada desde `claude/brief-miedo-petardos-perros-mayores` (base `c73abe7`).

Borrador: [articulo-borrador.mdx](articulo-borrador.mdx). **Redacción y comprobaciones del redactor; no es una auditoría independiente ni una autorización de publicación.** No se modifica el brief v7 ni el archivo de testimonios. No hay PR, fusión ni despliegue. No queda el artículo ni una ruta de revisión en `src/`.

## Recuento reproducible

**5.653 palabras**, dentro del contrato 5.300–6.000 y del objetivo 5.500–5.800. Todas las secciones y H3 están dentro de ±10 %.

Método: separación por espacios sobre el texto visible del cuerpo MDX. Se elimina el frontmatter, imports, comentarios MDX, etiquetas de imagen, pies marcados `*Pie: …*` y el bloque `div data-editorial-bibliography`. Se conservan H2/H3, texto de celdas y cabeceras de tablas, títulos y cuerpo de los tres AlertBox y las ocho preguntas y respuestas del FAQ. Se retiran etiquetas, marcadores Markdown, numeración de listas y destinos de enlaces; se conserva el texto ancla. No se cuentan atributos HTML, llaves ni sintaxis del array del FAQ. El título automático del componente FAQ no está escrito en el cuerpo y no se añade al recuento. Las cifras, unidades y símbolos separados por espacios se cuentan como tokens separados, igual que en `wc -w` sobre ese texto limpio.

Desde la raíz: `python3 docs/contenido/miedo-petardos-perros-mayores/comprobaciones/recuento.py`. Resultado estructurado: [comprobaciones/recuento.json](comprobaciones/recuento.json). El script imprime también los H3 y guarda su resultado temporal en `/tmp/petardos-recuento.json`.

| Sección | Palabras reales | Target §6 | Desviación |
|---|---:|---:|---:|
| Introducción | 335 | 350 | -4,3 % |
| Por qué los petardos asustan a un perro mayor | 544 | 540 | +0,7 % |
| Cómo se ve el miedo: lo que midió el estudio y lo que no | 556 | 560 | -0,7 % |
| El calendario del ruido en España y lo que dice la ley | 507 | 500 | +1,4 % |
| Antes: la visita al veterinario, con semanas de margen | 613 | 640 | -4,2 % |
| El refugio en casa: cómo montarlo en un piso | 552 | 550 | +0,4 % |
| El día señalado: horarios y plan de la noche | 607 | 600 | +1,2 % |
| Lo que se vende y lo que dicen los dueños | 419 | 440 | -4,8 % |
| El trabajo de fondo: acostumbrarlo al ruido sin prisa | 393 | 400 | -1,8 % |
| Si se escapa: qué hacer en las primeras horas | 290 | 300 | -3,3 % |
| Después de la noche: cómo vigilar los días siguientes | 276 | 280 | -1,4 % |
| Conclusión | 561 | 540 | +3,9 % |

## Presupuestos por H3

Incluyen su título; los avisos se cuentan aparte dentro del H2. Imágenes, pies y bibliografía están excluidos con el mismo método.

| H2 | H3 | Real | Target | Desviación |
|---|---|---:|---:|---:|
| 1 | El miedo al ruido es frecuente, pero con la edad los datos no son uniformes | 235 | 220 | +6,8 % |
| 1 | Si el miedo es nuevo: lo que conviene descartar | 222 | 230 | -3,5 % |
| 1 | No confundir con la ansiedad por separación | 78 | 80 | -2,5 % |
| 2 | Qué midió el análisis de vídeo | 171 | 170 | +0,6 % |
| 2 | Lo que hemos visto en casa y alrededor | 154 | 150 | +2,7 % |
| 2 | Lo que ves y cómo leerlo | 84 | 90 | -6,7 % |
| 2 | Señales que piden veterinario enseguida | 84 | 90 | -6,7 % |
| 3 | Un año de petardos: cuándo preparar cada fecha | 181 | 190 | -4,7 % |
| 3 | Qué mirar en la etiqueta y qué mide el ruido | 97 | 90 | +7,8 % |
| 3 | Lo que sí y lo que no dice la Ley 7/2023 | 137 | 130 | +5,4 % |
| 3 | Cómo averiguar las normas de tu ayuntamiento | 80 | 80 | +0,0 % |
| 4 | Qué le cuentas y qué le pides que revise | 202 | 210 | -3,8 % |
| 4 | Qué puede proponer el veterinario y por qué se mira con lupa | 254 | 265 | -4,2 % |
| 4 | La acepromazina no es la respuesta | 90 | 100 | -10,0 % |
| 5 | Dónde: la habitación más silenciosa, lejos de la ventana | 160 | 150 | +6,7 % |
| 5 | Qué poner y qué no | 183 | 190 | -3,7 % |
| 5 | Un refugio accesible para un perro con las articulaciones cansadas | 117 | 120 | -2,5 % |
| 5 | Cómo ensayarlo con semanas de antelación | 83 | 80 | +3,8 % |
| 6 | Por la tarde: paseo, comida y puertas | 186 | 180 | +3,3 % |
| 6 | Por la noche: qué hacer mientras suenan | 146 | 150 | -2,7 % |
| 6 | Consolar: qué hacemos nosotros y qué dice la encuesta | 193 | 190 | +1,6 % |
| 6 | Si tiene que salir a medianoche | 73 | 70 | +4,3 % |
| 7 | Qué dicen los dueños de la encuesta | 255 | 280 | -8,9 % |
| 7 | Cómo comprar con criterio | 154 | 150 | +2,7 % |
| 8 | Qué es y cómo funciona | 163 | 160 | +1,9 % |
| 8 | Si empiezas ahora, para marzo | 121 | 120 | +0,8 % |
| 8 | Cuándo pedir ayuda a un especialista | 100 | 110 | -9,1 % |
| 9 | Las primeras horas | 144 | 150 | -4,0 % |
| 9 | Lo que pide la ley | 137 | 140 | -2,1 % |
| 10 | Lo esperable | 111 | 110 | +0,9 % |
| 10 | Lo que debe mirar el veterinario | 156 | 160 | -2,5 % |

Densidad de prosa medida tras retirar enlaces y bloques técnicos: 151 párrafos, media 27,6 palabras, mediana 28, máximo 46; ninguno supera 50. Se excluyen listas, avisos, pies, bibliografía y FAQ de esta métrica. Es un indicador textual: no se certifican tres líneas en una pantalla sin prueba visual.

## Checklist §9, punto por punto

Las marcas reflejan lo escrito y las comprobaciones de esta entrega; no son un veredicto editorial independiente.

### 9.1. Volumen

- [x] Suelo, techo, objetivo de redacción, método y número real declarados; tablas por sección y H3 arriba.
- [x] Sin ampliar el contrato ni repetir el consejo de llevar informes para completar volumen.

### 9.2. Fuentes y H2

Citas nominales con enlaces profundos en el desarrollo, además de bibliografía complementaria plegada. La bibliografía no introduce afirmaciones nuevas. La matriz del desarrollo es:

| H2 | Fuentes citadas por nombre |
|---|---|
| 1 | Salonen et al.; Blackwell, Bradshaw y Casey; Lopes Fagundes et al.; Riemer 2019 |
| 2 | Gähwiler et al.; Blackwell, Bradshaw y Casey |
| 3 | Ley 7/2023; Real Decreto 989/2015; Colegio de Veterinarios de Málaga según El Español |
| 4 | Gähwiler et al.; Lopes Fagundes et al.; Riemer 2020; ESVCE; ficha técnica británica de dexmedetomidina; Ley 7/2023 |
| 5 | ESVCE; Colegio de Veterinarios de Málaga según El Español; Riemer 2020; Ley 7/2023 |
| 6 | Riemer 2020; ESVCE; Ley 7/2023; Colegio de Veterinarios de Málaga según El Español |
| 7 | Riemer 2020 |
| 8 | ESVCE; Riemer 2020; Lopes Fagundes et al.; Ley 7/2023 |
| 9 | Ley 7/2023; Colegio de Veterinarios de Málaga según El Español |
| 10 | Lopes Fagundes et al.; Riemer 2019 |

- [x] Once fuentes del contrato, todas con uso en sus H2; sin fuentes nuevas ni citas clínicas en otros H2.
- [x] Cifras de Riemer presentadas como percepciones «según los dueños de la encuesta», no ensayos ni resultados españoles.
- [x] La bibliografía identifica S5 como preprint/resumen verificado en el brief y S7 como ficha británica.
- [ ] Cierre de verificaciones parciales antes de publicar: S2 completo, S5 publicado, ficha española de S7 y guía original de S10. Esta sesión utiliza los límites ya documentados; no atribuye una nueva lectura de los originales.

### 9.3. Componentes y enlaces

- [x] Tres AlertBox exactos: info en introducción, danger junto a señales de urgencia en H2-2 y warning en H2-4.
- [x] Un FAQ con las ocho preguntas contractuales; respuestas redactadas sin extender las citas de fuentes fuera de su matriz.
- [x] Importaciones de AlertBox, FAQ y TablaApilable; sin H1 manual, TOC, schema o tarjetas relacionadas duplicadas.
- [x] Dos tablas dentro de TablaApilable, tres columnas y data-label en cada td; H2-2 usa lista.
- [x] Nueve enlaces internos obligatorios: pilar, tres spokes, cinco cruzados; se añade solo el opcional de golpe de calor en H2-3. Diez destinos en total, comprobados contra archivos del repositorio e inventario.
- [x] Sin calculadora ni enlaces a artículos no publicados de feromonas o tormentas.
- [x] Portada solo en frontmatter; dos img de cuerpo con ruta, alt y pie exactos del §8, dimensiones y carga diferida.
- [ ] Los tres binarios de imagen siguen sin generar, por instrucción expresa. No se presentan como recursos terminados.
- [ ] Prueba visual móvil/escritorio, claro/oscuro y alturas reales de las tablas pendiente: el servidor de desarrollo no arrancó. No hay capturas válidas.

### 9.4. Procedencia narrativa

- [x] Introducción: experiencia aportada por el propietario del sitio, Gonzalo; primera persona identificada, países Costa Rica y El Salvador; observaciones diferenciadas de casos clínicos.
- [x] Dakota, salud → H2-1, «Si el miedo es nuevo…»: sobrepeso, displasia inicial, problema de columna y cansancio al caminar. Sin edad, nombre de diagnóstico de columna ni atribución de dolor.
- [x] Luna, calma habitual; ambas perras en 2025; reunión familiar; contexto de luces en Costa Rica → solo H2-2, «Lo que hemos visto…». Año sin mes, películas en plural y «pero tranquilas en casa con la familia».
- [x] Perra vecina → solo el mismo H3 de H2-2: aullaba/ladraba y buscaba la casa y un sitio menos ruidoso. Sin nombre, edad ni desenlace. La impresión general va atribuida como hipótesis personal.
- [x] Coger en brazos a Luna; experiencia al levantar a Dakota; elevar la voz → solo H2-6, «Consolar…», con sus riesgos y sin convertirlas en pautas. El desencadenante de «pierde el control» queda sin precisar.
- [x] Voz familiar «en casa»/«nuestras perras»; singular para vivencias personales. Sin causas inventadas de la calma, visitas, resultados ni cierre narrativo añadido.
- [x] No aparecen Osa, Baltor ni Jaspe en el borrador.
- [x] Vocabulario de los relatos adaptado al español peninsular.
- [x] Cita «casi me muerde la cara»: **confirmado el 2026-10-25** por el propietario con «Sí, era mi propia cara». Texto visible en H2-6 actualizado y confirmación registrada en comentario MDX. El archivo de testimonios permanece sin cambios.

### 9.5. Español de España

- [x] Tuteo y plural peninsular; vocabulario de piso, terraza, persiana, clínica, ayuntamiento, correa y arnés. Sin los términos prohibidos en la prosa.
- [x] Espacio antes de %, coma decimal cuando procede. Los datos extranjeros no se trasladan a España.

### 9.6. Los quince requisitos de seguridad

1. [x] Sin dosis, pautas de inicio, calendarios de toma ni intensidades o duraciones de grabaciones.
2. [x] Principios activos únicamente y decisión veterinaria; sin marcas ni porcentajes individuales por medicamento. La ficha se explica para justificar la valoración previa, sin recomendar un fármaco.
3. [x] Acepromazina desaconsejada con atribución a ESVCE; calmantes de personas desaconsejados.
4. [x] Contraindicaciones y efectos adversos atribuidos explícitamente a la ficha británica. [ ] Falta contraste español previo a publicación, ya señalado por el brief.
5. [x] Porcentajes y evolución de Riemer como valoraciones de dueños; sin afirmaciones de eficacia como hecho.
6. [x] Acompañar sin promesa de cura ni de reforzar miedo; S10 para contacto respetuoso, ESVCE para libre entrada y salida del refugio.
7. [x] Sin promesa de desaparición del miedo.
8. [x] Sin cifras acústicas de S10 ni prevalencias de prensa. Tope reglamentario de 120 dB(A, imp) limitado a F1–F3 y distancia de seguridad, sin inferir daño canino.
9. [x] Sin diagnóstico por conducta; dolor, oído, visión y cognición se plantean para valoración. Serie pequeña de S4 identificada.
10. [x] Urgencias visibles junto a su lista en H2-2; sin ocultarlas en FAQ o bibliografía.
11. [x] Leyes sin sanciones ni cuantías; consulta local, sin declarar ilegal todo uso de petardos.
12. [x] Sin horarios, multas ni normas regionales inventadas; calendario a contrastar con programa oficial local.
13. [x] Datos finlandeses, suizos o internacionales con sus límites; sin porcentaje español.
14. [x] Sin recomendar levantar, abrazar o poner boca arriba a un perro asustado. Experiencias limitadas a su H2, con riesgo de mordisco y molestias.
15. [x] Sin recomendar regañar, tirar del perro, mojarlo ni elevar la voz. La práctica familiar queda diferenciada del acompañamiento tranquilo recomendado.

### 9.7. Voz y tono

- [x] Acciones y datos antes de salvedades; empatía breve en H2-1 y H2-10. Advertencias clínicas concentradas en los avisos correspondientes.
- [x] Ejecución real sobre el archivo final:

```text
articulo-borrador                                               5167 palabras    0 muletillas   0.0/1000
```

Comando: `python3 .agents/skills/references/scripts/tono.py docs/contenido/miedo-petardos-perros-mayores/articulo-borrador.mdx`.

El denominador de tono.py es distinto del contractual: elimina FAQ y avisos danger/warning, además de la bibliografía, y trata la sintaxis de otra forma. **El recuento contractual es 5.653**, no 5.167.

### 9.8. Coordinación sobre feromonas

- [x] Leído el brief de feromonas y el H3 del artículo publicado sobre ansiedad por separación: «moderada solo en miedo a tormentas».
- [x] Tabla de H2-7 y FAQ 4 se limitan a las percepciones de encuesta, sin emitir un veredicto sobre ensayos controlados ni contradecir el pasaje de tormentas. Sin enlazar el artículo todavía inexistente.

## Compilación y límites de las pruebas

- Dependencias instaladas con `npm ci --ignore-scripts --cache /tmp/petardos-npm-cache`; sin cambios en package.json ni lockfile. El primer intento falló por el directorio de caché fuera del espacio escribible; se resolvió usando /tmp.
- Copia temporal en `src/content/blog/miedo-petardos-perros-mayores.mdx`, mismo contenido del borrador. `npx astro check`: **exit 0; 199 archivos; 0 errores, 0 advertencias, 73 hints**. Se usaron `ASTRO_TELEMETRY_DISABLED=1`, `XDG_CONFIG_HOME` y `XDG_CACHE_HOME` bajo /tmp para evitar escrituras fuera del workspace.
- `npx astro build`, repetido tras la confirmación de fecha del propietario: **exit 0**, incluido el prerenderizado del artículo y la generación de la proyección Markdown (37 documentos). La copia temporal usa `datePublished: "2026-10-25"`, fecha real elegida por el propietario. El error anterior `Invalid time value` correspondía al marcador pendiente y queda resuelto. No se modificó el layout. Evidencia actualizada en [comprobaciones/astro-build.txt](comprobaciones/astro-build.txt).
- Las etiquetas img se conservan activas: el build y la proyección Markdown las admiten. Los binarios siguen pendientes y la compilación no acredita su existencia ni su visualización.
- Intento visual con ruta local temporal que renderizaba solo el cuerpo, sin convertir el marcador a fecha: Astro dev terminó antes de arrancar en 4321 y 4399; Playwright recibió ERR_CONNECTION_REFUSED. [comprobaciones/navegador.json](comprobaciones/navegador.json) registra la limitación. Sin capturas, alturas, contraste o interacción certificados.
- Se retiraron todas las copias y la ruta temporal de `src/`. Los artefactos dist/.astro son locales e ignorados; no se despliegan ni se incorporan al commit.

## Recursos visuales pendientes

| Recurso | Función y ubicación | Estado |
|---|---|---|
| Tabla de calendario | Decidir cuándo preparar cada fecha, H2-3 | Escrita; prueba visual pendiente |
| Tabla de encuesta | Comparar percepciones y límites, H2-7 | Escrita; prueba visual pendiente |
| Portada: bodeguero-senior-refugio-dormitorio-nochevieja-v1.webp | Refugio; heroImage | Binario pendiente; alt y ruta del brief |
| bodeguero-senior-paseo-antes-de-nochevieja-v1.webp | Paseo y doble sujeción, H2-6 | Binario pendiente; img y pie del brief |
| bodeguero-senior-revision-dolor-consulta-v1.webp | Revisión de dolor, H2-4 | Binario pendiente; img y pie del brief |

Las tres rutas están bajo `/images/blog/miedo-petardos-perros-mayores/`. No se generaron imágenes, recortes, animaciones ni cambios en prompts. No se promete PDF ni vídeo. El pie de portada permanece en §8: no se duplica la hero ni se modifica el layout para añadirlo.

## Decisiones pendientes y lecturas conservadoras

1. **PÓRTICO RESUELTO — Cita de Dakota:** confirmado el 2026-10-25. Respuesta del propietario: «Sí, era mi propia cara». Se incorpora «una vez casi me muerde la cara al levantarla» en H2-6 y se registra la confirmación en comentario MDX, sin reescribir los testimonios de origen.
2. **PÓRTICO RESUELTO — Fecha:** respuesta del propietario: «La de hoy», recibida el 2026-10-25. Se fija `datePublished: "2026-10-25"` y «Actualizado: 25 de octubre de 2026» en la firma. Se retira el marcador.
3. Antes de publicación: cerrar o limitar documentalmente S2/S5/S7/S10 según el brief; comprobar programas oficiales y completar la prueba visual de tablas y las imágenes pendientes. No son nuevas afirmaciones ni una solicitud de inventar datos al propietario.
4. El marcador se conservó en la entrega inicial siguiendo el encargo. La confirmación posterior del propietario permite retirarlo y cumplir también el gate de fecha del §1 del brief. El artículo sigue fuera de la colección publicada.
5. La skill general pide un cuarto AlertBox bibliográfico; §9.3 exige exactamente tres. Se conserva la bibliografía en un div con details cerrado, sin cuarto aviso ni H2 añadido. Los enlaces de la bibliografía de S7/S10 son descriptivos para evitar una marca farmacológica y no atribuir a la cobertura un título no recogido como tal en el brief.
6. H2-2: las notas del brief incluyen «se esconde» entre lo no medido aunque S3 sí lo observó sin confirmar un aumento estadístico. Se sigue la ficha de S3 y el H3 explicativo: observado, sin convertirlo en regla individual. No se modifica el brief.
7. No se actualizan brief ni inventario a «Publicado»: es un borrador documental con cita y fecha confirmadas, pendiente de revisión independiente y de los recursos y contrastes señalados arriba. Las reglas antiguas sobre umbrales y rondas de auditoría se leen como antecedentes, no como autorización para auditar de nuevo el brief.

## Auditoría independiente del artículo — R1

El 2026-10-25, a petición del propietario, un agente independiente auditó los temas de fondo y bloqueantes. Veredicto: **APTO con reservas; 0 P0 y 0 P1 sustantivos**. Informe completo: [auditoria-articulo-r1.md](auditoria-articulo-r1.md).

El agente no exige correcciones de fondo ni otra ronda. Se cierra el ciclo en R1 de las tres máximas autorizadas; no se consumen R2 ni R3. La versión evaluada en R1 tenía el SHA-256 `f0c0a6e62f4de7f448f53721fac3794e6528c12c19e35682a31096e05bfbddf9`.

Este resultado corresponde al texto, no a una autorización de publicación. Se conservan los pendientes de imágenes, prueba visual y contrastes documentales detallados en el informe. El auditor registró la observación sobre notas de procedencia en la bibliografía como no bloqueante. Tras el reparo del propietario, se corrige el 2026-10-26 como se detalla a continuación; el informe R1 se conserva como evidencia de su versión.


## Corrección de la bibliografía — 2026-10-26

Se retiran las referencias al brief y a tareas internas pendientes de las cuatro entradas señaladas por el propietario. Se conserva el alcance real de la documentación: ficha y resumen en Blackwell, resumen del preprint en Riemer, ficha británica en dexmedetomidina y cobertura secundaria con guía original no localizada en Málaga. No se da por completada ninguna verificación pendiente.

La corrección afecta únicamente al bloque bibliográfico excluido del recuento. El artículo conserva **5.653 palabras** y `tono.py` da **0 muletillas, 0,0/1.000**. No cambian el cuerpo, los testimonios, las citas, la fecha elegida ni la estructura. Los pendientes documentales y visuales anteriores siguen registrados en esta entrega.

SHA-256 del borrador tras la corrección: `be591c192711985ba11ad5a660c24d9c25490fe080a2b195449a9781cf4867fb`. La auditoría R1 corresponde al hash anterior; no se modifica su informe ni se presenta esta comprobación de redacción como una nueva auditoría independiente. El build aprobado documentado arriba se ejecutó sobre la versión anterior a esta corrección de texto; no se repite por estas cuatro sustituciones sin cambios de sintaxis MDX.
