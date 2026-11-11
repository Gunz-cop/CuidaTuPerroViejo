# Auditoría del brief: picadura de abeja en perros mayores (R1/3)

- **Alcance:** `briefings/briefing-picadura-abeja-perros-mayores.md` (brief v1), contrastado con `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md` y sus fotos, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts`, los `.mdx` enlazados, `direccion-visual-editorial.md`, `calidad-editorial-adsense.md`, `guia-voz-tono.md` y `src/pages/politica-editorial.astro`. Skill aplicada: `auditar-briefing-contenido`.
- **Fecha:** 2026-11-12
- **Versión auditada:** `5aae9f8` (último commit que toca el brief)
- **Ronda:** R1 de 3
- **Auditor:** sesión independiente; no generó el brief y no lo corrige.

## Veredicto

**NO APTO (No válido para redacción todavía).** El dato que el brief presenta como la aportación central del artículo (el 42 % de Chapman et al. 2024) se aplica a reacciones locales como la de Dakota, cuando en el estudio «leve» es una reacción anafiláctica de grado 1 (eritema generalizado, urticaria o angioedema) en perros ya diagnosticados de alergia al veneno.

Las seis fuentes existen, sus identificadores son correctos y se abrieron todas (cuatro resúmenes en PubMed, el texto completo de Chapman en Europe PMC y las páginas de Merck y la FDA). La corrección es acotada: reencuadrar un dato y ajustar atribuciones. No hay que rehacer la estructura.

## Hallazgos

### P0 (bloqueante)

**1. Chapman et al. 2024: «reacción leve» no es una reacción local. La aportación propia y la FAQ 6 aplican el dato a una población que el estudio no contiene.**
- *Ubicación:* §2 «Aportación propia», punto 2; §3 Fuente 4, «Historia natural»; §6 H2-5, «Lo que encontró el estudio de Zúrich» («por eso "esta vez fue leve" no promete que la próxima lo sea»); §6 FAQ 6; §9 tabla de fuentes.
- *Evidencia:* en el texto completo (PMC11591281), la tabla 2 («Clinical grading system for anaphylaxis») define **1, Mild = Skin: generalized erythema, urticaria and/or angioedema**; 2, Moderate = digestivo o respiratorio; 3, Severe = cardiovascular o neurológico. En el apartado 3.2, los 24 perros «leves» son los que tuvieron «only cutaneous symptoms at their first sting», es decir, una reacción cutánea **generalizada**. Además, los 178 perros son casos de alergia al veneno de himenópteros, atendidos en un hospital de referencia de Dermatología o Medicina Interna, y los diferenciales de urticaria y anafilaxia se descartaron antes de incluirlos. El resumen dice «local reactions», pero el método muestra que no se refiere a una reacción en el sitio de la picadura. La reacción de Dakota (almohadilla roja, lamidas, sin ronchas por el cuerpo según `foto-09` y el README) es una reacción local que el estudio no incluye.
- *Por qué importa:* es el dato que justifica H2-5, la ficha y la FAQ 6. Contado como está, le dice al lector con un perro como Dakota que tiene un 42 % de probabilidad de reacción sistémica en la próxima picadura. El estudio no lo dice. Además, el brief redondea «SSR» (reacción sistémica grave, grados 2–3) a «reacción sistémica».
- *Instrucción:* reformular en §2, §3 F4, H2-5 y FAQ 6: «De los 24 perros cuya primera reacción alérgica solo afectó a la piel de forma generalizada (ronchas, enrojecimiento o hinchazón por el cuerpo), 10 tuvieron una reacción sistémica grave al volver a ser picados». Añadir de forma explícita que el estudio no incluye reacciones solo locales, como la de Dakota, y que no hay dato canino sobre su riesgo de repetirse. Mantener la ficha para la próxima picadura, pero justificarla por la utilidad clínica del registro y no por el 42 %. Para la FAQ 6, proponer: «Si tu perro ya tuvo ronchas o hinchazón por el cuerpo, la siguiente puede ser peor: 10 de 24 en el estudio de Zúrich; si fue solo en el sitio de la picadura, no hay datos en perros». Cambiar «sistémica» por «sistémica grave» donde se cite el 42 %.

### P1

**2. Signos de la AlertBox `danger` atribuidos a fuentes que, en lo leído, no los contienen.**
- *Ubicación:* §6 H2-2, nota «Fuentes de cada signo» bajo la AlertBox `danger`; *Sustentado en* de H2-2.
- *Evidencia:* «ronchas por el cuerpo», «encías pálidas», «desmayo» y «respiración difícil» se atribuyen a Shmuel y Cortes y a Merck. El resumen de Shmuel solo nombra los órganos (piel, pulmón, tubo digestivo), no estos signos. En Merck no aparecen urticaria, palidez, colapso ni disnea: solo «prostration», vómitos y diarrea con sangre y signos neurológicos en picaduras múltiples. Esos signos sí están en la tabla 2 de Chapman (urticaria, angioedema, disnea, estridor, vómitos, palidez, cianosis, colapso, pérdida de consciencia), pero Chapman no figura como sustento de H2-2. La propia nota prohíbe al redactor añadir signos que no estén en las fuentes, así que la atribución equivocada se propagará.
- *Instrucción:* añadir «Chapman et al. 2024, tabla 2 (grados de anafilaxia)» al *Sustentado en* de H2-2 y a la tabla de §9. Reasignar ronchas, hinchazón de cara y garganta, respiración difícil o ruidosa, vómitos y diarrea, encías pálidas y colapso a esa tabla. Dejar Merck para los signos de picaduras múltiples y la boca, y Shmuel para el diagnóstico clínico y la adrenalina.

**3. H2-4 atribuye eficacia al meloxicam y contradice H2-3 y el contrato.**
- *Ubicación:* §6 H2-4, «Lo que hicimos nosotros…», segundo punto: «lo que hicimos funcionó porque el veterinario ya conocía a Dakota».
- *Evidencia:* H2-3 («No atribuir la mejoría al meloxicam como causa… "no sabemos si fue el antiinflamatorio, el frío del suelo o que la reacción iba bajando sola"») y §9.5 lo prohíben. Fitzgerald dice que la mayoría de las picaduras se resuelven en horas sin tratamiento.
- *Instrucción:* sustituir por «lo hicimos así porque su veterinario ya conocía a Dakota y nos había dado esa indicación; no sabemos si la tableta influyó». Sin el verbo «funcionó».

**4. Keyword secundaria «meloxicam picadura perro» en tensión con la política editorial.**
- *Ubicación:* §1, Keywords secundarias.
- *Evidencia:* `politica-editorial.astro`: «no prescribimos fármacos ni dosis». Esa keyword atrae justo a quien busca darle meloxicam a su perro. El artículo no puede responder esa intención sin contradecir la política, y si la persigue en el texto refuerza el problema del hallazgo 3.
- *Instrucción:* retirarla o sustituirla por una intención compatible, como «qué darle a mi perro por una picadura de abeja», que el artículo responde con «nada sin llamar al veterinario». Si el propietario quiere mantenerla, dejar documentado en §1 que se responde con «no se da por tu cuenta» y nunca con pauta.

**5. Procedencia: un hecho del relato depurado no está en el expediente y las decisiones D1–D3 no constan en él.**
- *Ubicación:* §2, relato depurado, párrafo 1 («vimos caer la abeja al suelo, **ya moribunda**»); §2 D1.
- *Evidencia:* el README del expediente dice solo «la abeja cayó al suelo». El brief afirma «No se añadió ningún dato». D1 (meloxicam recetado por sus veterinarios, episodios de Luna y Dakota, displasia de cadera), D2 y D3 viven solo en el brief. El README sigue diciendo que «el dueño eligió una tableta a propósito» y no recoge la indicación veterinaria. Según `calidad-editorial-adsense.md` §3, la procedencia tiene que estar en el expediente.
- *Instrucción:* quitar «ya moribunda» del relato depurado o, si el propietario lo dijo, pedirle que lo confirme y añadirlo al README. Pedir que las decisiones D1–D3, con fecha y en palabras del propietario, se registren en `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md` (lo hace el propietario o una sesión de corrección, no el auditor). H2-4 y H2-1 de la Introducción dependen de D1.

**6. Prompt y aceptación de la Imagen 2: el requisito senior queda incompleto.**
- *Ubicación:* §8, Imagen 2, fila «Exclusiones y aceptación» y prompt.
- *Evidencia:* la aceptación dice «el hocico canoso del fondo cumple la edad». `direccion-visual-editorial.md` dice: «el hocico canoso tampoco basta». No hay casilla por rasgo, como sí tienen la 1 y la 3. En el prompt, el rasgo 3 («menos masa en los cuartos traseros») no aparece y el lomo queda «en el borde del encuadre» de un macro, lo que hace los rasgos 2–4 poco comprobables.
- *Instrucción:* cambiar la aceptación a «canas sí/no, ojos sí/no, lomo sí/no, postura sí/no, sin enfermedad sí/no a 390 px». Añadir «menos masa en cuartos traseros» al prompt. Encuadrar el plano para que se vean la cabeza y parte del lomo, aunque estén desenfocados, o justificar por qué el macro no puede mostrarlos y qué imagen del artículo los acredita.

### P2

**7. Registro de razas recientes incompleto en §8.** No menciona la fila «Miedo a la pólvora: testimonios» (Luna y Dakota, beagles en fotografía) ni la portada beagle de `como-dar-medicacion-perro`, que además es un enlace puente de este artículo. La repetición sí está justificada por el caso real y es correcta. *Instrucción:* completar la lista de razas recientes con esas dos entradas. Quitar la nota «Al cerrar el brief: añadir al registro…», porque la fila ya existe en `direccion-visual-editorial.md` (línea 101).

**8. Selección de fotos inconsistente entre secciones.** En H2-3 dice «`foto-05` o `foto-04`» y en H2-6 «`foto-11`/`foto-12`», mientras que la tabla de §8 fija `foto-05`, `foto-10`, `foto-12` y `foto-02` opcional. *Instrucción:* dejar una sola selección en §6 y §8. Los recortes propuestos son viables: se revisaron `foto-05`, `foto-10` y `foto-12`. En `foto-12` hay que quitar también el sofá y la alfombra del fondo, además de la transportadora y el escritorio.

**9. Afirmación sin fuente en el límite de Visscher.** «La propia literatura posterior lo califica de evidencia débil» no lleva cita. No pasa al artículo, pero es una afirmación no verificada dentro de §3. *Instrucción:* citar la fuente o dejarlo en «estudio en personas, con pocos voluntarios».

**10. Edad de Dakota.** «Beagle de 12 años» depende del mes de nacimiento: el expediente solo dice «nacida en 2014». *Instrucción:* confirmar el mes con el propietario o escribir «de 12 años» solo si se confirma (ya cumplidos en noviembre de 2026).

## Verificación de fuentes

| # | Fuente | Identificador | Identidad | Dato atribuido | Resultado |
|---|---|---|---|---|---|
| 1 | Fitzgerald y Flood 2006, *Clin Tech Small Anim Pract* 21(4):194-204 | PMID 17265905 · DOI 10.1053/j.ctsap.2006.10.002 | Correcta (efetch) | Aguijón con arpón; avispas pican varias veces; cuatro tipos de reacción; anafilaxia en 10 min; no depende de la dosis; ≈20 picaduras/kg; manejo conservador; resolución en horas; vigilar | **Verificada**, todo en el resumen |
| 2 | Visscher, Vetter y Camazine 1996, *Lancet* 348:301-2 | PMID 8709689 · DOI 10.1016/s0140-6736(96)01367-0 | Correcta | Habón crece con el retraso «even within a few seconds»; raspar = pellizcar a los 2 s; quitarlo rápido sin importar el método | **Verificada** (el límite de «evidencia débil» no tiene fuente; hallazgo 9) |
| 3 | Shmuel y Cortes 2013, *J Vet Emerg Crit Care* 23(4):377-94 | PMID 23855441 · DOI 10.1111/vec.12066 | Correcta | Tipo I, sistémica, a menudo mortal; veneno de insectos; diagnóstico clínico por patrón; adrenalina de elección; coadyuvantes «do not substitute» | **Verificada.** Bien excluido «hígado y tubo digestivo»: el resumen nombra piel, pulmón y tubo digestivo. No sustenta los signos concretos de la AlertBox (hallazgo 2) |
| 4 | Chapman et al. 2024, *Animals* 14(22):3220 | PMID 39595273 · PMC11591281 · DOI 10.3390/ani14223220 | Correcta (7 autores en orden) | 178 perros, Zúrich 2018–2022; 163 sitios documentados (cara 39 %, pata 28 %, boca 21 %); OR 2,62 / 2,11 / 2,06 / 2,43 / 4,48 (IC 1,28–15,71); 24 → 14 leves y 10 SSR; 19 → 12 (63 %); mediana 1,7 años (0,2–14,7); edad avanzada como riesgo en personas; inmunoterapia | **Cifras verificadas literalmente.** **Interpretación errónea** de «leve» (hallazgo 1, P0) |
| 5 | Nagy, *Merck Veterinary Manual*, «Wasp, Bee, and Ant Stings to Animals» | URL profunda | Correcta: «Full Review: Apr 2026», revisión por pares de Brutlag | Dolor e hinchazón en minutos; aguijón clavado y absceso; resolución rápida; retirar el aguijón, compresa fresca, antihistamínicos según necesidad; tratamiento hospitalario; africanizadas, parálisis facial, ataxia, convulsiones, hematuria y hematoquecia | **Verificada.** Saco de veneno arrancado y aguijón con arpón también presentes. No contiene urticaria, palidez, colapso ni disnea (hallazgo 2) |
| 6 | FDA CVM, «Get the Facts about Pain Relievers for Pets» | URL profunda | Correcta: «Content current as of: 09/29/2022» | «Dogs are Not Small People»; llamar al veterinario; señales (vómitos, diarrea, heces negras o con sangre, apetito, actividad, ictericia); úlceras, perforaciones, fallo renal y hepático; no dos AINE ni AINE con prednisona; vigilancia en tratamientos largos | **Verificada** |

La candidata descartada (Quantz 2009) está bien descartada y documentada. Nadie debe recuperarla al corregir sin verificarla.

### Trazabilidad fuente → H2

| Fuente | H2 asignado | ¿Desarrolla su dato clave? |
|---|---|---|
| Fitzgerald | H2-1, H2-2 (y Intro, FAQ 1) | Sí |
| Visscher | H2-1 | Sí |
| Shmuel | H2-2, H2-4 | Sí (adrenalina, antihistamínicos) |
| Chapman | H2-3, H2-5 (y FAQ 5–6) | Sí, pero con la interpretación del hallazgo 1. Debería sumarse a H2-2 (hallazgo 2) |
| Merck | H2-1, H2-2, H2-3, H2-4 | Sí |
| FDA | H2-4 | Sí |

No hay fuentes decorativas. Cobertura inversa: los H2 científicos tienen sustento. H2-6 es narrativo y se apoya solo en la experiencia, como corresponde.

## Comprobaciones mecánicas

- `seoTitle`: **50** caracteres (`len()`) ≤ 55. `metaDescription`: **155** ≤ 160. Coinciden con lo declarado.
- `pilar: "salud-perros-mayores"` existe en el enum de `src/content.config.ts`. Slug, ruta y nombres de imagen sin `ñ`, tildes ni espacios.
- Presupuesto: 350 + 650 + 700 + 600 + 650 + 600 + 350 + 550 = **4.450**, igual al objetivo. El rango 3.780–5.120 es ±15 %. La justificación del volumen es razonable y no hay H2 de relleno: cada uno responde una decisión distinta.
- AlertBox: `info` en Introducción, `danger` en H2-2 y `warning` en H2-4. Correcto.
- FAQ: 7 preguntas en borrador. Correcto.
- Arco: apertura en la Introducción, desarrollo en H2-3 y cierre propio en H2-6 antes de la Conclusión. Dakota está declarada como hilo principal. Correcto.
- Enlaces internos (7): los cinco `.mdx` existen con el `pilar` que da la ruta y están marcados `[x]` en el inventario. `/salud-perros-mayores` y `/herramientas/calculadora-calidad-vida-perros` existen. `procesionaria-pino-perros` está en `origin/main` y responde 200 en producción, aunque en el inventario la nota dice «sin fusionar ni publicar». Esa incoherencia es del inventario, no del brief. Sin enlaces rotos.
- Inventario: el artículo figura como `[~]` En Briefing. Correcto. Sin canibalización: no hay otro artículo sobre picaduras, abejas, avispas o alergias.
- Prompts: los tres nombran la misma beagle con la misma ficha y terminan con «Rechazar si a tamaño móvil parece un adulto joven». Las imágenes 1 y 3 cumplen los cinco rasgos y la aceptación por rasgo. La 2 no (hallazgo 6). No se planifican recortes ni animaciones, y está declarado. Las escenas son concretas, con materiales y luz, sin estética de catálogo.
- Voz: remite a la guía de voz, tuteo en español neutro, primera persona del plural en la experiencia y objetivo `tono.py` ≤ 3/1000. Las advertencias van concentradas en las AlertBox.
- Límites clínicos: sin dosis, mg/kg, potencia ni marca en el artículo. Bloqueados en §9.5. Bien, salvo el hallazgo 3.
- Recursos prometidos (§11): la ficha es una lista en el propio texto, sin PDF prometido. Tiene ruta y prueba antes de publicar. Solo planificada, como corresponde a un brief.

## Efecto cascada

- No existe todavía `src/content/blog/picadura-abeja-perros-mayores.mdx`: nada heredado.
- Ningún otro brief ni artículo cita Chapman 2024 (PMID 39595273); el error del hallazgo 1 no se ha propagado.
- Si el artículo se redacta antes de corregir, el hallazgo 1 contaminaría H2-5, la ficha, la FAQ 6 y probablemente la metaDescription o el resumen social.

## Lo que sí funciona (no romperlo al corregir)

- Identificadores leídos con efetch y texto completo, no de memoria. La sexta candidata se descartó en lugar de inventarle un PMID.
- Se excluyó honestamente «hígado y tubo digestivo» de Shmuel. El resumen confirma que esa afirmación no está.
- Los límites de Chapman (población joven, sin dato canino de edad avanzada, la asociación OR 4,48 no es causa) son exactos.
- Las salvaguardas clínicas: no atribuir la mejoría al meloxicam (en H2-3), no afirmar que tragarse el aguijón sea inocuo, la media hora como margen del artículo y no de la fuente, y no publicar las indicaciones individuales de D1.
- El cierre del arco en H2-6, con Rookie y el límite «no la vio un veterinario».
- La repetición de beagle está justificada por las fotos reales de Dakota, y las ilustraciones no se presentan como ella.

## Qué corregir, en orden

1. **Hallazgo 1:** reencuadrar el 42 % de Chapman en §2, §3 F4, H2-5, FAQ 6 y donde se cite (primera reacción cutánea generalizada, SSR; el estudio no incluye reacciones solo locales). Rejustificar la ficha sin ese dato.
2. **Hallazgo 2:** añadir Chapman (tabla 2) como sustento de H2-2 y reasignar los signos de la AlertBox `danger`. Actualizar la tabla de §9.
3. **Hallazgo 3:** quitar «funcionó» de H2-4.
4. **Hallazgo 4:** retirar o documentar la keyword «meloxicam picadura perro».
5. **Hallazgo 5:** quitar «ya moribunda» o confirmarlo, y pedir que D1–D3 queden en el README del expediente.
6. **Hallazgo 6:** completar el prompt y la aceptación de la Imagen 2.
7. **Hallazgos 7–10:** registro de razas, selección de fotos, cita de Visscher y edad.

Después, pasar la auditoría R2 en una sesión distinta de la que corrija.
