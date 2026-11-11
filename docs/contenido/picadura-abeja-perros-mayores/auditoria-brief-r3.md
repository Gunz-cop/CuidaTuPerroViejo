# Auditoría del brief: picadura de abeja en perros mayores (R3/5)

- **Alcance:** `briefings/briefing-picadura-abeja-perros-mayores.md` (brief v3) completo. Se comprobaron los hallazgos de R2 (N1–N7 y el R1-2, que había quedado parcial) y se revisó de nuevo todo el brief desde cero. Contrastado con `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md`, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts`, los `.mdx` enlazados, `src/pages/herramientas/`, `direccion-visual-editorial.md`, `calidad-editorial-adsense.md`, `guia-voz-tono.md` y `src/pages/politica-editorial.astro`. Skill aplicada: `auditar-briefing-contenido`.
- **Fecha:** 2026-11-12
- **Versión auditada:** `dcd22e7` (último commit que toca el brief)
- **Ronda:** R3/5 (el propietario autorizó hasta cinco rondas)
- **Auditor:** sesión independiente; no generó ni corrigió el brief y no lo corrige.

## Veredicto

**NO APTO (por poco).** N1 está corregido donde R2 lo señaló, es decir, en la AlertBox `danger`, en su nota de fuentes y en el grado 2 de §3 F4. Pero la misma atribución errónea de la diarrea sigue en otro punto de §3: la ficha de Shmuel y Cortes autoriza al redactor a «describir vómitos, diarrea y colapso como señales de alarma apoyándose en el Manual Merck y Fitzgerald». El resumen de Fitzgerald no menciona ni la diarrea ni el colapso, y Merck solo habla de diarrea con sangre en picaduras múltiples. Esa instrucción choca con la nota de la AlertBox, que dice que la diarrea «no se añade». Es un P1 de una sola línea. También quedan dos P2 de R2 a medio corregir.

## Hallazgos de R2: estado

| # | Sev. R2 | Hallazgo | ¿Resuelto? | Evidencia en v3 |
|---|---|---|---|---|
| R1-2 | P1 (parcial en R2) | Signos de la AlertBox `danger` mal atribuidos | **Sí** | La nota «Fuentes de cada signo» (H2-2) asigna cada signo a Chapman tabla 2, a Chapman (análisis de riesgo, boca) o a Merck, y dice: «la diarrea no está en esa tabla y no se añade a la lista». |
| N1 | P1 | Diarrea atribuida a la tabla 2 y «debilidad» sin fuente | **Sí en los puntos señalados; queda un resto (R3-1)** | §3 F4 transcribe el grado 2 literalmente: «dyspnea, stridor, wheeze, nausea, vomiting and/or abdominal pain; la diarrea no figura». Lo comprobé contra la tabla 2 de PMC11591281. La AlertBox dice «vómitos o dolor de barriga», y la «debilidad» desapareció. Pero §3 F3, línea 130, conserva «vómitos, diarrea y colapso… apoyándose en el Manual Merck y Fitzgerald». |
| N2 | P2 | La AlertBox `warning` contradice H2-4 | **Sí** | «si tu veterinario no te dio una indicación previa para tu perro, llámalo antes de darle un medicamento que tengas en casa», coherente con H2-4. |
| N3 | P2 | «Nos indicó tener en casa» | **Parcial (R3-2)** | H2-4 está corregido («sus veterinarios saben que tiene en casa (le preguntan si lo tiene)»). Pero §2 D1, «Cómo se cuenta», que es la frase que el redactor copiará, sigue diciendo «y nos indicó tener en casa». |
| N4 | P2 | Restos de v1 | **Sí** | En §8 ya no aparece «si el propietario lo autoriza». §10 dice «D1–D3 están resueltas». §11 habla de «máximo cinco rondas». El encabezado dice «corrige las auditorías R1 y R2». |
| N5 | P2 | Ubicación ambigua de la Imagen 3 | **Parcial (R3-3)** | §8 la fija en «H2-1, al final de "Los 10 minutos que importan"». Pero la tabla de §11 sigue diciendo «Portada, H2-1 y H2-2». |
| N6 | P2 | Matices de Merck | **Sí** | En §3 F5 constan «within minutes» y «more aggressive treatment», sin «hospitalario». H2-2 pide «de minutos a unas horas» citando las dos fuentes, y la FAQ 1 usa solo a Fitzgerald («en horas»). |
| N7 | P2 | Procedencia de Costa Rica | **Sí** | La fila de §2 dice: «Relato; país, decisión D3 del propietario». |

## Hallazgos nuevos

### P1

**R3-1. §3 F3 sigue atribuyendo la diarrea y el colapso a Fitzgerald y a Merck como señales de alarma de la anafilaxia.**
- *Ubicación:* §3, fuente 3 (Shmuel y Cortes), viñeta «Datos sin verificar en el texto completo», línea 130: «Puede describir vómitos, diarrea y colapso como señales de alarma apoyándose en el Manual Merck y Fitzgerald».
- *Evidencia:* el resumen de Fitzgerald y Flood (PMID 17265905, efetch) no contiene «diarrh» ni «collapse». Sus signos son «erythema, edema, and pain at the sting site», las reacciones regionales y la anafilaxia en 10 minutos. Merck solo dice «bloody diarrhea, bloody vomiting» entre los efectos sistémicos de «multiple stings», y no habla de colapso. La instrucción contradice la nota de la AlertBox `danger` («la diarrea… no se añade a la lista»). Además autoriza al redactor a citar a Fitzgerald como fuente de dos signos que no da. Es el mismo error de N1, que se ha quedado en otra sección.
- *Instrucción:* sustituir la frase por: «Para la lista de signos de alarma, usar la tabla 2 de Chapman (vómitos, dolor abdominal, dificultad para respirar, palidez, colapso) y, solo en picaduras múltiples, Merck (diarrea o vómitos con sangre, convulsiones). No atribuir signos a Fitzgerald más allá de eritema, edema y dolor en el sitio y la ventana de 10 minutos».

### P2

**R3-2. La frase «Cómo se cuenta» de D1 (§2) conserva «nos indicó tener en casa».** Es el resto de N3. El README dice: «Los veterinarios le preguntan si lo tiene en casa y le indicaron darles una tableta como máximo ante un dolor puntual». *Instrucción:* «el antiinflamatorio que su veterinario ya le había recetado para episodios de dolor, con la indicación de darle una tableta ante un dolor puntual», en línea con H2-4.

**R3-3. §11 sitúa las ilustraciones en «Portada, H2-1 y H2-2».** §8 ya pone la Imagen 2 y la Imagen 3 en H2-1. Es el resto de N5. *Instrucción:* en §11, escribir «Portada y H2-1 (dos)».

Nota para el propietario, que no es un hallazgo del brief: el README del expediente mantiene «el dueño eligió una tableta a propósito, para desinflamar y aliviar sin pasarse». H2-4 y §9.5 lo neutralizan (sin pauta y sin atribuir la mejoría), y el redactor no debe tomarla del expediente.

## Revisión completa desde cero (sin otros hallazgos)

- **Metadatos:** `seoTitle` tiene **50** caracteres y `metaDescription` **151**, contados con `len()` en Python. Coinciden con el YAML y con la tabla de §1. `pilar: "salud-perros-mayores"` está en el enum de `src/content.config.ts`. `status` tiene el valor por defecto «Publicado».
- **Presupuesto:** 350 + 650 + 700 + 600 + 650 + 600 + 350 + 550 = **4.450**. El rango es de 3.780 a 5.120 (±15 %), y la justificación se apoya en la utilidad, no en AdSense.
- **Enlaces (7):** `procesionaria-pino-perros`, `golpe-de-calor-perros-mayores` y `chequeo-geriatrico-canino` llevan `pilar: "salud-perros-mayores"`. `cama-ortopedica-perros-mayores-displasia-artrosis` lleva `movilidad-dolor-perros-mayores` y `como-dar-medicacion-perro` lleva `cuidados-paliativos-perros`. Todos coinciden con la URL del brief y están publicados en el inventario. `src/pages/herramientas/calculadora-calidad-vida-perros.astro` existe.
- **Inventario:** la entrada está en `[~]` En Briefing (línea 243). No hay otro artículo sobre picaduras ni anafilaxia, así que no hay canibalización.
- **Procedencia:** el relato depurado, la tabla de hechos y D1–D3 coinciden con el README, incluida la sección «Decisiones del propietario». La tabla de §2 declara los límites (la picadura no se vio, el peso es estimado, no hubo veterinario). La línea de procedencia para el lector identifica las fotos y las ilustraciones.
- **Límites clínicos:** no hay dosis, potencia, días ni marca. No se atribuye la mejoría al meloxicam. No se afirma que tragarse el aguijón sea inocuo. La edad como factor de riesgo se presenta solo en personas. Todo esto es coherente con la política editorial.
- **Componentes y arco:** AlertBox `info`, `danger` y `warning`; FAQ con 7 preguntas; ficha copiable en H2-5. El arco abre en la Introducción, se desarrolla en H2-3 y cierra en H2-6 como sección propia.
- **Visual:** las tres imágenes llevan el sujeto fijo, los cinco rasgos senior, la aceptación por rasgo a 390 px y «Rechazar si a tamaño móvil parece un adulto joven». Las acciones son físicamente coherentes (la tarjeta raspa en paralelo y el paño no lleva hielo directo). El entorno es latinoamericano, sin casa estadounidense. Se justifica que la raza se repita. Las fotos reales tienen el recorte obligatorio y el pie «Fotografía».

## Verificación de fuentes (R3, desde cero)

| # | Fuente | Identificador | Identidad | Dato atribuido | Resultado |
|---|---|---|---|---|---|
| 1 | Fitzgerald y Flood 2006, *Clin Tech Small Anim Pract* 21(4):194-204 | PMID 17265905 · DOI 10.1053/j.ctsap.2006.10.002 | Correcta (efetch) | Aguijón con arpón; avispas que pican varias veces; cuatro reacciones; eritema, edema y dolor; 10 min; no depende de la dosis; ≈20/kg; manejo conservador; «resolve in a few hours»; vigilar | **Verificada.** No contiene diarrea ni colapso: R3-1 |
| 2 | Visscher, Vetter y Camazine 1996, *Lancet* 348(9023):301-2 | PMID 8709689 · DOI 10.1016/s0140-6736(96)01367-0 | Correcta | Habón mayor con el retraso, «even within a few seconds»; raspar = pellizcar; quitarlo rápido | **Verificada** |
| 3 | Shmuel y Cortes 2013, *J Vet Emerg Crit Care* 23(4):377-94 | PMID 23855441 · DOI 10.1111/vec.12066 | Correcta | Tipo I; veneno de insectos; diagnóstico clínico; adrenalina de elección; coadyuvantes que no la sustituyen | **Verificada** (resumen) |
| 4 | Chapman et al. 2024, *Animals* 14(22):3220 | PMID 39595273 · PMC11591281 · DOI 10.3390/ani14223220 | Correcta (7 autores en orden) | 178 perros; pata 46/163 (28 %); OR 2,11 / 2,06 / 2,43 / 4,48 (IC 1,28–15,71). En el apartado 3.2, 24 perros con síntomas «only cutaneous» → 14 (58 %) leves y 10 (42 %) sistémicos; 12 de 19 (63 %). Tabla 2: grado 1 piel, grado 2 «dyspnea, stridor, wheeze, nausea, vomiting and/or abdominal pain», grado 3 «cyanosis, pallor… collapse, loss of consciousness». Mediana de 1,7 años (0,2–14,7); edad en personas | **Verificada**, y la tabla 2 está bien transcrita |
| 5 | Nagy, *Merck Veterinary Manual* | URL profunda (HTTP 200) | «Full Review: Apr 2026», revisión por pares de Brutlag | Dolor e hinchazón en minutos; aguijón y absceso; «resolve quickly, within minutes»; aguijón fuera, compresa fresca, antihistamínicos; «more aggressive treatment»; africanizadas: parálisis facial, ataxia, convulsiones, hematuria y hematoquecia | **Verificada.** La diarrea con sangre solo aparece en picaduras múltiples: R3-1 |
| 6 | FDA CVM, «Get the Facts about Pain Relievers for Pets» | URL profunda (HTTP 200) | «Content current as of: 09/29/2022» | «Dogs are Not Small People»; vómitos, diarrea, heces negras o con sangre, menos apetito y actividad, color amarillo en ojos o encías; úlceras y perforaciones, fallo renal y hepático; no dos AINE ni AINE con prednisona; análisis en tratamientos largos; «don't give any medication… until you talk to your veterinarian» | **Verificada** |

Trazabilidad fuente → H2: las seis fuentes tienen un H2 que desarrolla su dato. No hay fuentes decorativas.

## Qué corregir, en orden

1. **R3-1 (P1):** reescribir la línea 130 de §3 F3 según la instrucción.
2. **R3-2 y R3-3 (P2):** cambiar la frase «Cómo se cuenta» de D1 y la ubicación de las ilustraciones en §11.

Después, R4/5 en una sesión distinta de la que corrija. Si solo cambian estas tres líneas, la R4 puede limitarse a verificarlas con grep y a comprobar que no se haya introducido nada nuevo.
