# Auditoría del artículo — Leishmaniosis en perros mayores (R2 de 3, solo bloqueantes)

- **Fecha:** 2026-10-24 · **Ronda:** R2 de máximo 3 · **Rol:** auditor externo; no se corrigió ningún archivo (único archivo escrito: este informe).
- **Material:** `docs/contenido/leishmaniosis-perros-mayores/articulo-borrador.mdx`, rama `codex/leishmaniosis-articulo-revision`, worktree de solo lectura.
- **SHA-256 auditado (recalculado):** `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b` (coincide con el esperado y con el declarado en `correcciones-articulo-r1.md`).
- **Contrato:** `briefings/briefing-leishmaniosis-perros-mayores.md` (§6, §9, §11). Informe de partida: `auditoria-articulo-r1.md`.
- **Alcance de la validación:** local (copia en el scratchpad con el MDX en `src/content/blog/`). Sin publicación real ni despliegue.

## Veredicto

**APTO para la parte textual.** Los tres P1 de R1 quedan resueltos en lo que compete al texto y no introduje ningún bloqueante nuevo. **El artículo sigue sin poder publicarse**: el gate de recursos del §11 (§9.7) continúa abierto porque ninguna imagen, recorte, animación ni infografía existe (P1-3 se mantiene como gate, no como defecto del texto). Esto no es un APTO de publicación.

## Bloqueantes restantes

**Ninguno en el texto.** El único elemento abierto es el gate de recursos del §11 (ver P1-3 abajo), que ya era conocido y no depende de reescribir.

## 1. Estado de los P1 de R1

### P1-1 — Nueve párrafos administrativos: RESUELTO

| Líneas R1 | Contenido actual (líneas nuevas) | Resultado |
|---|---|---|
| 64, 66 (H3 «Qué llevar a la primera conversación») | H3 eliminado. Nuevo H3 «Una infección puede permanecer silenciosa» (62-66): evolución crónica, subclínica no permanente, inmunosupresión o enfermedad concurrente | Contenido útil, respaldado por LeishVet (abrí el texto: «insidious and chronic pattern»; «not necessarily permanent… immunosuppression or concomitant diseases») |
| 107, 109 | H3 «Lo que se detecta en los análisis» (97-101): proteinuria, anemia, proteínas en sangre | Útil; LeishVet, tabla de alteraciones («Mild to severe proteinuria», «non-regenerative anaemia», hiperglobulinemia/hipoalbuminemia) |
| 161, 163 | 159-163: concluyente con título alto, niveles bajos, test rápido desaconsejado (AEMPS), serología tardía (ESCCAP), citología/PCR según muestra y técnica | Útil; AEMPS Fig. 1 y LeishVet Tabla 3 |
| 207, 209 | 205-213: calendario de revisiones, anticuerpos que bajan más despacio que los síntomas, cálculos urinarios como efecto adverso, controles tras el primer año | Útil; LeishVet Tabla 6 y nota, Tabla 5 («Xanthine urolithiasis»); AEMPS («análisis del sedimento urinario y ecografía») |
| 215 | 217-219: enfermedades concurrentes y coinfecciones | Útil; AEMPS lista ehrlichiosis/anaplasmosis, babesiosis, hipotiroidismo, diabetes, neoplasias |

**Repetición del consejo «lleva informes / anota fechas»:** cuento **1** aparición (línea 105, «Reúne los cambios con su fecha, las fotos y los informes en un único registro», dentro de «La revisión de cinco puntos»; R1 contaba 14). La línea 221 («Comparte el registro con tu veterinario») es el uso de la calculadora, otra acción. Los «pide / pregunta / solicita a la clínica» que quedan (18, 167, 173, 187, 195, FAQ 1 y 4) son preguntas concretas de cada decisión (qué prueba, qué fecha, qué estadio, qué objetivo), no el mismo consejo administrativo. No lo trato como relleno.

### P1-2 — Columna «Qué no te dice»: RESUELTO

Las cinco celdas (líneas 148-152) son concretas y sin «deja pendiente / abierta» (grep de «pendiente» y «abierta»: 0 resultados en todo el MDX).

| Prueba | Celda actual | Comprobación |
|---|---|---|
| Serología cuantitativa | «Un nivel bajo exige otras pruebas para aclarar si hay enfermedad.» | LeishVet Tabla 3: «Low antibody levels will require further work-up». Confirmado |
| Test rápido | «Puede dar falsos negativos, especialmente en infecciones subclínicas.» | LeishVet Tabla 3 («risk of false negatives»); ESCCAP (subclínicos, ya verificado en R1). Confirmado |
| Citología | «Con pocos parásitos, la muestra puede resultar negativa…» | LeishVet Tabla 3: «Low sensitivity… Requires… other tests… when parasites are not visualized». Confirmado |
| PCR | «Puede ser positiva tanto en perros enfermos como en infectados clínicamente sanos.» | LeishVet Tabla 3: «a positive result confirms Leishmania infection but not disease». Confirmado |
| Analítica | «Anemia o proteínas en la orina también aparecen en enfermedades distintas…» | Coherente con «wide and non-specific» (LeishVet). Sin cifras de corte |

### P1-3 — Gate de recursos: SE MANTIENE COMO GATE; el texto es limpio

- Frontmatter sin `heroImage`/`heroImageAlt`; cuerpo sin imágenes, animación, infografía ni descarga. Busqué menciones a recursos inexistentes («animación, infografía, ilustración, imagen, vídeo, descarga, gráfico, figura, calendario visual»): ninguna que apunte a un recurso que no exista.
- La corrección declara el gate abierto y no lo oculta (`correcciones-articulo-r1.md`); no se retira el contrato visual.
- Consecuencia que ya recogía R1 (P2-8, no se reabre): la página de prueba muestra la firma «Ilustraciones generadas con IA» y `og:image` genérico. Se resuelve al producir los recursos.

**Tabla recurso prometido → ruta → prueba → resultado**

| Recurso (§11) | Ruta | Prueba pedida | Resultado |
|---|---|---|---|
| Tabla de señales | MDX | 390 px sin desbordamiento | Existe; estructura y 33 `data-label` verificados. 390 px no medido |
| Tabla de pruebas | MDX | 390 px; sin cifras | Existe, sin cifras |
| 3 imágenes (hero, anochecer, análisis) | `public/images/blog/leishmaniosis-perros-mayores/` | Revisión imagen por imagen, senior rasgo por rasgo | **No producido** (gate abierto) |
| Recorte transparente senior | `mestizo-senior-recorte-perfil.webp` | Alfa, claro/oscuro a 390 px | **No producido** |
| Animación «Revisión de cinco puntos» | `src/components/article/` | §11 | **No producida**; la lista numerada del H3 ya recoge el contenido |
| Infografía «Calendario de riesgo» | componente SVG/HTML | §11 | **No producida**; las tres posturas constan en texto atribuido |

## 2. Conteos propios frente al contrato

Método propio (`cnt.py` en el scratchpad): se excluyen frontmatter, imports y bibliografía; se incluyen H2/H3, títulos de `AlertBox`, `caption`, celdas, listas y preguntas/respuestas de la FAQ. Contrasto con `medir-texto.py` de la otra sesión (SHA coincide, 4.367).

| Sección | Mi conteo | `medir-texto.py` | Target | Desviación (mío) |
|---|---:|---:|---:|---:|
| Introducción | 240 | 240 | 250 | −4,0 % |
| H2-1 Qué es y por qué un perro mayor… | 575 | 579 | 650 | −11,5 % |
| H2-2 Qué mirar en casa | 667 | 663 | 700 | −4,7 % |
| H2-3 Pruebas | 747 | 740 | 800 | −6,6 % |
| H2-4 Estadios y tratamiento | 646 | 650 | 700 | −7,7 % |
| H2-5 Protegerlo de los flebotomos | 964 | 974 | 900 | +7,1 % |
| Cierre y FAQ (FAQ: 448) | 521 | 521 | 550 | −5,3 % |
| **Total** | **4.360** | **4.367** | 4.550 | **−4,2 %** |

- Rango del contrato 3.868–5.232: **cumple** con ambos métodos. Diferencia con las 4.367 declaradas: −7 palabras (0,2 %), dentro de la variación entre métodos (R1 la medía en +77 y ya la acepté). Las 4.367 son **ciertas en lo que importa**; la suma por sección que declara (240+579+663+740+650+974+521) cuadra con el total.
- Todas las secciones dentro de ±15 %. La más baja es H2-1 (−11,5 %), por debajo de la tolerancia por 3,5 puntos de margen; no bloquea.
- El volumen ya no se sostiene con el relleno de R1: en R1, sin los nueve párrafos, el texto quedaba en ≈3.912 (mi método); ahora, con contenido nuevo, está en 4.360.
- Densidad (script del repo y de la otra sesión coinciden): media 39,1; mediana 39; 1,2 % de párrafos >50 palabras. `tono.py`: **0 muletillas, 0,0/1.000** (3.879 palabras medidas).
- Frontmatter sin cambios respecto a R1 (seoTitle 54, metaDescription 158).

## 3. Bloqueantes nuevos introducidos por las correcciones: ninguno

Abrí de nuevo las fuentes (descargas de R1 en el scratchpad) para cada afirmación nueva o cambiada.

| Pasaje nuevo o cambiado | Fuente y localización | Resultado |
|---|---|---|
| L56 Cabré: «segundo pico tras los ocho años»; hipótesis inmunitaria y enfermedades concomitantes | Cabré 2021, Introducción: «second peak observed in dogs older than 8 years»; «immune system declines or present a concomitant morbidity» | Confirmado. Se separa bien de Miranda (L54, «desde los siete años») y queda presentada como hipótesis. Los 25 mayores de ocho años y el «no el destino de cada perro» se conservan (L58) |
| L46 Fuenlabrada: foco atípico, brote humano, baja prevalencia canina, liebres y conejos | Alten 2016: «outbreak of both VL and CL since mid 2009… nearly 600 cases mainly recorded in Fuenlabrada. In contrast to a low prevalence of CanL, lagomorphs—the hare… and the wild rabbit—identified as unusual reservoir» | Confirmado. Las capturas se separan de un recuento canino. Sin cifras en el texto (el «600» no se traslada) |
| L133 y FAQ 3 inmunomoduladores a criterio veterinario | AEMPS: «SON SUSCEPTIBLES DE RECIBIR TRATAMIENTOS INMUNOMODULADORES… A CRITERIO» | Confirmado, sin fármacos ni pautas |
| L195 combinaciones de fármacos en otros estadios; L197 «actúa contra el parásito» y «frena su multiplicación»; selección por estadio y función renal (sin «las demás enfermedades») | AEMPS: «combinación de un principio activo leishmanicida con un leishmaniostático»; tabla por estadio; IRIS | Confirmado. «Pueden seguir infectados» intacto en L199 y FAQ 1 |
| L211 cálculos urinarios; controles de sedimento y ecografía | LeishVet Tabla 5 («Xanthine urolithiasis»); AEMPS («análisis del sedimento urinario y ecografía») | Confirmado; el fármaco no se nombra |
| L205, L213 revisiones tras el primer mes, serología desde los seis meses, controles más espaciados tras el primer año | LeishVet Tabla 6: «Later on, if the dog is fully recovered clinically…, every 6 months or once a year»; «Not before 6 months after initial treatment» | Confirmado. Son intervalos de seguimiento, autorizados por el §9.6; ninguna duración ni pauta de fármaco |
| L233 el baño reduce la protección | CIMAVet: «Si el perro tratado se moja en exceso (por ejemplo, necesita ser bañado con champú), el periodo de…» | Confirmado; remite a la ficha del producto, sin duraciones |
| L247, L249 materia orgánica; leña y piedras; mosquiteras tratadas con piretroides en ventanas, puertas y camas | ESCCAP («retirar la basura y cúmulos de materia orgánica»; «mosquiteras tratadas con piretroides en las ventanas, en las puertas y en las camas»); LeishVet (piles of wood, stones) | Confirmado. La cautela con gatos es consejo del redactor sin atribución a ESCCAP, coherente con el AlertBox y la ficha |
| L217-219 comorbilidades y coinfecciones | AEMPS (ehrlichiosis/anaplasmosis/babesiosis; endocrinopatías; neoplasias) | Confirmado |
| L275 enfoque integrado de LeishVet | LeishVet: «The future for CanL control should be an integrated approach… with an effective canine vaccine» | Ahora datado («En 2011…») y condicionado a una vacuna eficaz. Correcto en su contexto. Sin pauta de vacuna |
| L265-267 Valdeorras: asociación, retrospectivo, una clínica, patrocinio, ventas | Olmeda 2024: ventas de ectoparasiticidas y vacunas, correlación negativa con casos nuevos; «high-risk area» | Confirmado; verbo «coincidían» |
| L273 y FAQ 5: ausencia de resultados de vacunación para mayores de diez años | Brief, laguna 2 («ninguna fuente abierta ofrece resultados… para perros de más de 10 años») | Coherente con el contrato. Voz de proceso eliminada (P2-10) |

**§9.6 ítem por ítem sobre la versión corregida:** sin dosis, duraciones de tratamiento ni pautas (solo intervalos de seguimiento); sin marcas (Elanco es patrocinador declarado; «letifend» solo en la URL de la EMA); sin cifras de creatinina, UPC, título o prevalencia («25 perros», «veinte años», «diez años» son tamaños de estudio o edad); «pueden seguir infectados» presente; «anual o bianual» literal (L167 y FAQ 4); tres posturas del calendario atribuidas y la decisión a la clínica (L253-261, FAQ 7); vacuna solo existencia y «perros no infectados»; AlertBox de gatos y permetrina con la ficha; umbral de urgencia como «criterio editorial» (L123); sin lista de razas ni raza alguna; tratamiento sin prometer eliminación. Cataluña, Barcelona, Ourense y Madrid siempre con su lugar. **Cumple.**

**Componentes y forma:** 3 `AlertBox` (info, danger, warning); `FAQ` con 7 preguntas, cerradas en el HTML generado (8 `<details>` en total = 7 FAQ + el índice, ninguno `open`); 2 `TablaApilable` con `label`, 33 `<td>` y 33 `data-label`; enlaces internos presentes (`/salud-perros-mayores`, chequeo geriátrico, vacunas y desparasitación, Cushing, calculadora) y comprobados en R1; MDX bien formado (compila). Sin fuga de contrato (0 resultados para «brief», «fuente N», «redactor», corchetes). Tuteo y vosotros, sin usted ni voseo.

**Build (ejecutado, viable):** copia en el scratchpad (`aud/build`, repo git inicializado en R1) con el MDX en `src/content/blog/leishmaniosis-perros-mayores.mdx` (mismo SHA). `npx astro build`: **EXIT 0**, genera `/salud-perros-mayores/leishmaniosis-perros-mayores.html` y la proyección `agent-content/v1/documents/article--leishmaniosis-perros-mayores.md`. Los avisos del log son del entorno (proxy, bindings de IA). El build de esta versión **no** lo había ejecutado la otra sesión; confirmo que compila.

## Lo que funciona (no tocar al corregir el gate visual)

- La distinción infección/enfermedad de la apertura y de «La diferencia que decide si hay tratamiento» (L129-135).
- El calendario con tres posturas y su fecha (L251-261) y FAQ 7.
- «Pueden seguir infectados» y «no la suspendas ni la alargues por tu cuenta» (L199-201).
- La tabla de pruebas, ahora con limitaciones concretas respaldadas por LeishVet Tabla 3.
- El alcance geográfico de Cataluña, Ourense y Madrid y la atribución con fecha del enfoque integrado de LeishVet.

## Qué quedó sin abrir

- **Apariencia móvil y escritorio:** no se capturó a 390 y 1366 px; sin alturas, modo oscuro ni teclado en tablas y FAQ. Verificación de estructura y compilación solamente.
- **Imágenes, recorte, animación e infografía:** no existen; la comprobación senior de cinco rasgos queda íntegra para cuando existan.
- **Miranda 2008:** solo resumen (verificación parcial declarada en el brief). **EMA/vacuna:** solo la página EPAR.
- **AEMPS, LeishVet, ESCCAP, CIMAVet y Olmeda:** comprobación por búsquedas dirigidas sobre el texto completo descargado en R1, no lectura lineal. No repetí la verificación de las afirmaciones que no cambiaron desde R1.
- **`metricas.mjs` del repo:** no ejecutado en R2 (en R1 devolvió 3 bloqueantes de formato del propio script que no son defectos del artículo).
- **Publicación real:** ninguna URL pública ni despliegue; el artículo no está en `src/content/blog/` del worktree.
- **Documentos releídos no repetidos:** `politica-editorial.astro`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` (sin recursos visuales no aplican).
- Dos matices de redacción menores, no bloqueantes y no registrados como hallazgo: L209 («durante los primeros meses» concreta algo más que la nota de LeishVet) y L243 («Por eso la medida doméstica abarca del anochecer al amanecer» sugiere una causalidad que las fuentes de la recomendación no establecen). No cambian ninguna cifra ni conclusión clínica.

## Qué hacer ahora

1. **Texto:** no tocar. No hace falta R3 para el texto.
2. **Gate §11 / §9.7:** producir los recursos con `crear-animaciones-articulo-blog` y `direccion-visual-editorial.md`, o que el propietario modifique explícitamente el contrato visual. Auditar los recursos en una ronda aparte (esa sería la R3 y última; si falla, detener y revisar con el usuario).
3. Al integrar en `src/content/blog/`: `npx astro build`, revisar la proyección Markdown, medir cada recurso a 390 y 1366 px y resolver la firma «Ilustraciones generadas con IA» y el `og:image` genérico.
