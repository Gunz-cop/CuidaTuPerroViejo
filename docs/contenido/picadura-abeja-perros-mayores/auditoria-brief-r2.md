# Auditoría del brief: picadura de abeja en perros mayores (R2/5)

- **Alcance:** `briefings/briefing-picadura-abeja-perros-mayores.md` (brief v2) completo, revisado de nuevo desde cero además de comprobar los 10 hallazgos de R1. Contrastado con `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md`, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts`, los `.mdx` enlazados, `direccion-visual-editorial.md`, `calidad-editorial-adsense.md`, `guia-voz-tono.md` y `src/pages/politica-editorial.astro`. Skill aplicada: `auditar-briefing-contenido`.
- **Fecha:** 2026-11-12
- **Versión auditada:** `90bc6a0` (último commit que toca el brief)
- **Ronda:** R2/5 (el propietario autorizó hasta cinco rondas para este documento)
- **Auditor:** sesión independiente; no generó ni corrigió el brief y no lo corrige.

## Veredicto

**NO APTO (No válido para redacción todavía).** Los diez hallazgos de R1 están resueltos, incluido el P0 del 42 %. Pero la corrección del hallazgo 2 introdujo una atribución nueva que la fuente no contiene: la tabla 2 de Chapman no incluye la diarrea, y la AlertBox `danger` la presenta como dato de esa tabla. También incluye «debilidad», que no tiene fuente asignada. Es un P1 acotado: se corrige en minutos y no obliga a tocar la estructura.

## Hallazgos de R1: estado

| # | Sev. R1 | Hallazgo | ¿Resuelto? | Evidencia en v2 |
|---|---|---|---|---|
| 1 | P0 | 42 % de Chapman aplicado a reacciones locales | **Sí** | §2 aportación 2, §3 F4 (con la advertencia sobre la tabla 2), H2-5 y FAQ 6 dicen «primera reacción solo en la piel de forma generalizada», «reacción sistémica grave», «el estudio no incluye reacciones solo locales» y «en perros no hay datos». La ficha se justifica por su utilidad clínica y no por el 42 %. Comprobado contra el apartado 3.2 y la discusión del texto completo. |
| 2 | P1 | Signos de la AlertBox `danger` mal atribuidos | **Parcial** | Chapman tabla 2 añadida a H2-2 y a §9; Shmuel queda para diagnóstico y adrenalina. Pero la reasignación incluye «diarrea», que no está en la tabla 2 (ver hallazgo nuevo N1). |
| 3 | P1 | «Funcionó» en H2-4 | **Sí** | H2-4: «lo hicimos así porque su veterinario ya conocía a Dakota…; no sabemos si la tableta influyó». No queda «funcionó» (grep). |
| 4 | P1 | Keyword «meloxicam picadura perro» | **Sí** | Sustituida por «qué darle a mi perro por una picadura de abeja», que se responde con «nada sin llamar al veterinario; nunca con pauta». |
| 5 | P1 | «Ya moribunda» y D1–D3 fuera del expediente | **Sí** | El relato dice «ya se iba a morir, pero igual la matamos», que coincide con el README actualizado. D1, D2, D3 y la edad constan en el README, en la sección «Decisiones del propietario (2026-11-12)». |
| 6 | P1 | Imagen 2: requisito senior incompleto | **Sí** | El prompt añade «menos masa en los cuartos traseros», y el encuadre pasa a plano detalle amplio con la cabeza y el lomo legibles. La aceptación es por rasgo (canas, ojos, lomo, postura y sin enfermedad, sí/no). |
| 7 | P2 | Registro de razas incompleto | **Sí** | §8 menciona los testimonios de pólvora (Luna y Dakota) y la portada beagle de `como-dar-medicacion-perro`. La fila de picadura existe en `direccion-visual-editorial.md`, línea 101. |
| 8 | P2 | Selección de fotos inconsistente | **Sí** | H2-3 usa `foto-05` y `foto-10`, H2-6 usa `foto-12`, y la Introducción `foto-02` como opcional. Coincide con la tabla de §8, que añade el sofá y la alfombra al recorte de `foto-12`. |
| 9 | P2 | «Evidencia débil» sin cita en Visscher | **Sí** | Ahora dice «estudio en personas, con muy pocos voluntarios». |
| 10 | P2 | «12 años» sin mes de nacimiento | **Sí** | No queda «12 años» (grep). Se usa «nacida en 2014», y el README dice que el mes no consta. |

## Hallazgos nuevos

### P1

**N1. La AlertBox `danger` atribuye a la tabla 2 de Chapman la diarrea, que no está en ella, e incluye «debilidad», que no tiene fuente asignada.**
- *Ubicación:* §3 F4, viñeta «Tabla 2 (grados de anafilaxia)», donde dice «grado 2, digestivo o respiratorio (vómitos, diarrea, disnea, estridor)». §6 H2-2, borrador de la AlertBox `danger` («vómitos o diarrea tras la picadura; debilidad, desmayo o encías pálidas») y su nota «Fuentes de cada signo».
- *Evidencia:* la tabla 2 del texto completo (PMC11591281) dice: «2—Moderate | Gastrointestinal, respiratory +/− skin | Dyspnea, stridor, wheeze, nausea, vomiting and/or abdominal pain». Para el grado 3: «Cyanosis, pallor, SpO2 < 92%, hypotension, collapse, loss of consciousness, incontinence». La cadena «diarrh» no aparece en ninguna parte del artículo. La diarrea solo está en Merck: «bloody diarrhea, bloody vomiting» como efecto sistémico de **picaduras múltiples**. La «debilidad» no figura en la nota de fuentes. Lo más cercano es «prostration» o «CNS depression» de Merck, también para picaduras múltiples. La propia nota dice: «El redactor no añade signos que no estén en estas fuentes». Si se deja así, el redactor citará la tabla 2 como fuente de un signo que no contiene, que es el tipo de error que R1 pidió corregir.
- *Instrucción:* en §3 F4, transcribir el grado 2 tal como aparece en la tabla: «disnea, estridor, sibilancias, náuseas, vómitos o dolor abdominal». En la AlertBox, sustituir «vómitos o diarrea tras la picadura» por «vómitos, arcadas o dolor de barriga tras la picadura». Si se quiere conservar la diarrea, atribuirla a Merck como «diarrea o vómitos con sangre» en el caso de muchas picaduras. Quitar «debilidad» o atribuirla a Merck («postración», picaduras múltiples). Actualizar la nota «Fuentes de cada signo» para que cada signo de la lista tenga su fuente exacta.

### P2

**N2. La AlertBox `warning` contradice lo que el artículo cuenta en H2-4.** El borrador dice «llama al veterinario aunque sea un medicamento veterinario que ya tengas en casa». En H2-4, en cambio, se cuenta que se le dio la tableta sin llamar, bajo una indicación previa, y se dice «si tu perro no tiene una indicación así, llama antes». Leídas juntas, el lector ve que la norma no se aplicó a Dakota. *Instrucción:* alinear el borrador con H2-4: «llama al veterinario antes de darle cualquier medicamento, aunque sea veterinario y lo tengas en casa, salvo que su veterinario ya te haya dado una indicación concreta para esa situación».

**N3. «Nos indicó tener en casa» va un paso más allá del expediente.** En §2 D1 («Cómo se cuenta») y en H2-4. El README dice: «Los veterinarios le preguntan si lo tiene en casa y le indicaron darles una tableta como máximo ante un dolor puntual». Que pregunten si lo tiene no es lo mismo que indicarle tenerlo. *Instrucción:* usar «el antiinflamatorio que su veterinario ya le había recetado, con la indicación de darle una tableta ante un dolor puntual», o confirmar la frase con el propietario y anotarla en el README.

**N4. Restos de v1 que ya no son ciertos.** §8, «Plan»: «si el propietario lo autoriza (D2)», cuando D2 ya está resuelta. §10: «las dudas abiertas están en D1–D3», cuando ya están cerradas. §11: «máximo tres rondas», cuando el propietario autorizó cinco. Encabezado: «pendiente de auditoría independiente», que es correcto, pero conviene añadir la ronda. *Instrucción:* actualizar las cuatro frases.

**N5. Ubicación ambigua de la Imagen 3.** En §8 aparece como «H2-2 o H2-1», y en §11 como «Portada, H2-1 y H2-2». *Instrucción:* fijar una sola sección (encaja al final de H2-1, en «Frío local y calma»/«Los 10 minutos que importan») y usar la misma en §11.

**N6. Matices de transcripción de Merck.** En §3 F5, «tratamiento hospitalario» resume a Merck, que dice «more aggressive treatment… might be indicated» sin la palabra «hospital». Además, Merck dice que las reacciones locales se resuelven «within minutes», un dato que choca con el «en horas» de Fitzgerald que usa el artículo. *Instrucción:* escribir «tratamiento más intensivo (fluidos intravenosos, corticoides, adrenalina, antihistamínicos)». Advertir al redactor que, si cita a Merck sobre el tiempo de resolución, no mezcle «minutos» con el «horas» de Fitzgerald, y que use el de Fitzgerald para la FAQ 1.

**N7. Procedencia de «Costa Rica» en la tabla de hechos.** La fila de §2 da «Relato» como fuente, pero el país viene de D3 y no del relato. *Instrucción:* cambiar la fuente a «D3 (README, decisiones del propietario)».

Nota para el propietario, que no es un hallazgo del brief: el README del expediente sigue diciendo «Resolución en menos de 14 horas con una sola tableta de meloxicam 1 mg» y «el dueño eligió una tableta a propósito». El brief no lo arrastra, porque H2-3 y §9.5 prohíben atribuir la mejoría. Aun así, conviene que nadie tome esas frases del expediente al redactar.

## Verificación de fuentes (R2, desde cero)

| # | Fuente | Identificador | Identidad | Dato atribuido | Resultado |
|---|---|---|---|---|---|
| 1 | Fitzgerald y Flood 2006, *Clin Tech Small Anim Pract* 21(4):194-204 | PMID 17265905 · DOI 10.1053/j.ctsap.2006.10.002 | Correcta (efetch) | Aguijón con arpón; avispas pican varias veces; cuatro tipos de reacción; 10 min; no depende de la dosis; ≈20/kg; manejo conservador; horas | **Verificada** |
| 2 | Visscher, Vetter y Camazine 1996, *Lancet* 348(9023):301-2 | PMID 8709689 · DOI 10.1016/s0140-6736(96)01367-0 | Correcta | Habón crece con el retraso «even within a few seconds»; raspar = pellizcar a los 2 s; quitarlo rápido | **Verificada** literalmente |
| 3 | Shmuel y Cortes 2013, *J Vet Emerg Crit Care* 23(4):377-94 | PMID 23855441 · DOI 10.1111/vec.12066 | Correcta | Tipo I, veneno de insectos, diagnóstico clínico, adrenalina de elección, coadyuvantes | **Verificada** (resumen) |
| 4 | Chapman et al. 2024, *Animals* 14(22):3220 | PMID 39595273 · PMC11591281 · DOI 10.3390/ani14223220 | Correcta (7 autores en orden) | 178 perros con HVA, Zúrich 2018–2022; pata 46/163 (28 %); OR 2,11 / 2,06 / 2,43 / 4,48 (IC 1,28–15,71); 24 «solo cutáneos» → 14 (58 %) leves y 10 (42 %) SSR; 19 → 12 (63 %); mediana 1,7 años (0,2–14,7); edad en personas; VIT | **Cifras verificadas.** La «leve» de la tabla 2 está bien transcrita como grado 1. **Grado 2 mal transcrito (diarrea): N1** |
| 5 | Nagy, *Merck Veterinary Manual* | URL profunda (200) | «Full Review: Apr 2026», revisión por pares de Brutlag | Dolor e hinchazón en minutos; aguijón y absceso; retirar el aguijón, compresa fresca, antihistamínicos; africanizadas: parálisis facial, ataxia, convulsiones, hematuria y hematoquecia | **Verificada.** Matiz «hospitalario» y «within minutes»: N6 |
| 6 | FDA CVM, «Get the Facts about Pain Relievers for Pets» | URL profunda (200) | «Content current as of: 09/29/2022» | «Dogs are Not Small People»; señales de efectos secundarios; úlceras y perforaciones, fallo renal y hepático; no dos AINE ni AINE con prednisona; seguimiento a largo plazo | **Verificada** |

Trazabilidad fuente → H2: las seis fuentes tienen un H2 que desarrolla su dato. No hay fuentes decorativas. Los H2 científicos tienen sustento, y H2-6 es narrativo.

## Comprobaciones mecánicas

- `seoTitle`: **50** caracteres; `metaDescription`: **151** (contados con `len()`). El bloque YAML y la tabla de §1 coinciden. `pilar: "salud-perros-mayores"` está en el enum.
- Presupuesto: 350 + 650 + 700 + 600 + 650 + 600 + 350 + 550 = **4.450**. El rango 3.780–5.120 es ±15 %.
- AlertBox `info`, `danger` y `warning` en sus secciones. FAQ con 7 preguntas. Arco: Introducción, desarrollo en H2-3 y cierre propio en H2-6.
- Enlaces (7): `procesionaria-pino-perros`, `golpe-de-calor-perros-mayores` y `chequeo-geriatrico-canino` tienen `pilar` `salud-perros-mayores`. `cama-ortopedica-…` tiene `movilidad-dolor-perros-mayores` y `como-dar-medicacion-perro` tiene `cuidados-paliativos-perros`; todos coinciden con la URL. Están marcados `[x]` o publicados en el inventario. La calculadora existe en `src/pages/herramientas/`.
- Inventario: `[~]` En Briefing. Sin canibalización.
- Prompts: las tres imágenes llevan la ficha fija, los cinco rasgos, aceptación por rasgo y «Rechazar si a tamaño móvil parece un adulto joven». No hay recortes ni animaciones, y está declarado.
- Voz y límites clínicos: sin dosis, potencia, días ni marca. Remite a `tono.py`.

## Efecto cascada

Todavía no existe el `.mdx`. Ningún otro brief cita Chapman 2024. N1 solo afecta a la AlertBox `danger` y a §3 F4 de este brief.

## Qué corregir, en orden

1. **N1 (P1):** grado 2 literal en §3 F4, quitar o reatribuir la diarrea y la debilidad en la AlertBox `danger` y en su nota de fuentes.
2. **N2–N7 (P2):** alinear la AlertBox `warning` con H2-4, ajustar «nos indicó tener en casa», quitar los restos de v1, fijar la sección de la Imagen 3, matizar Merck y cambiar la fuente del país.

Después, R3/5 en una sesión distinta de la que corrija. Si solo cambian N1 y los P2, la R3 puede limitarse a verificarlos y a revisar que no se haya introducido nada nuevo.
