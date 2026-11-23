# Auditoría del brief — R1

| Campo | Valor |
|---|---|
| Documento | `briefings/briefing-perro-mayor-miedo-visitas-casa.md` |
| Versión auditada | commit `9cd0953`, blob `127f0dc` |
| Ronda | **R1 de 3** |
| Fecha | 2026-11-23 |
| Método | skill `auditar-briefing-contenido`, `calidad-editorial-adsense.md`, AGENTS.md |
| Rol | auditor independiente: no generó el brief y no lo modifica |
| Alcance del caso real | sin acceso al correo; la Sección 2 se toma como transcripción declarada y solo se evalúa su coherencia interna |

> **Nota de privacidad de este informe.** Este archivo vive en un repositorio público. Por eso no repite ninguno de los datos del caso que el brief declara excluidos: los hallazgos remiten a las líneas del brief, no a su contenido.

## Veredicto

**NO APTO** (equivale a «No válido para redacción»). El contrato de anonimato no se sostiene: el brief está en una rama de un **repositorio público** y contiene los mismos detalles que promete no publicar. Además, prevé que el borrador espere la aprobación de la lectora en un PR, que en este repositorio también es público.

La parte científica está bien: las seis fuentes existen, sus identificadores corresponden y los datos clave están donde el brief dice, salvo dos cifras menores. No hay que tocarla. El bloqueo es solo de procedencia y privacidad.

## Hallazgos

### P0 — Bloquean la redacción

**P0-1. El brief publica en GitHub los datos que el anonimato prometía ocultar.**
- *Evidencia:* `list_repos` devuelve `Gunz-cop/CuidaTuPerroViejo` con `visibility: public`. El commit `9cd0953` está en `origin/claude/happy-ride-8leguk` (no en `main`; no hay PR abierto). Cualquiera puede leer la rama.
- *Ubicación:* Sección 2, líneas 58 (canal, nombre del hilo y fechas de los correos), 61 (tipo racial de la perra y año de nacimiento), 63–64 (circunstancias de la muerte de la otra perra), **72** (la lista de «anonimización obligatoria» nombra uno por uno los detalles que no deben publicarse) y Sección 4, línea 142 (país de la lectora). También el mensaje de `TODO.md` repite el nombre del hilo.
- *Por qué es real:* el brief lleva el slug del artículo. Cuando el artículo se publique, quien conozca a la lectora (o cualquiera que busque el slug en GitHub) puede cruzarlo con el brief y recuperar todo lo que el artículo calla. La promesa del 2026-11-10 dice «sin ningún detalle que pueda identificarlas», y la lista de exclusiones convertida en texto público la incumple. Corregir el archivo no basta: el commit sigue accesible por su SHA en el historial de la rama.

**P0-2. «Rama y PR sin fusionar» no protege nada en este repositorio.**
- *Ubicación:* recuadro inicial, punto 3 (línea 8); Sección 9.5 (línea 394).
- *Evidencia:*
  1. El repositorio es público: un PR muestra el `.mdx` completo, con el caso, a cualquiera, antes de que la lectora lo haya leído.
  2. `docs/admin/recuperacion-diaria-procedimiento.md:43`: «Workers Builds sube una versión de vista previa con cada push a una rama con PR». `wrangler.jsonc` no desactiva las URL de vista previa.
  3. `docs/admin/audiencia-fase-2.md:127-131`: el 2026-11-12, «Add variable and deploy» publicó en producción la última vista previa de otra rama. Por tanto, un PR sin fusionar ya llegó a producción una vez en este proyecto.
- *Por qué es real:* el brief da por hecho que el único riesgo es fusionar (lo de `[pilar]/[slug].astro` es correcto: `getCollection('blog')` no filtra por `status`). Sin embargo, el texto queda expuesto en GitHub y en las vistas previas antes de la primera aprobación. Además, el PDF para la lectora y el registro de su aprobación (Secciones 9.5 y 11) también acabarían en `docs/` del repositorio público.

### P1 — Se propagarían al artículo

**P1-1. El brief incorpora hechos que la Sección 2 no documenta.**
- Sección 6, H3 «Lleva la cuenta» (línea 191): «Es lo que Gonzalo le pidió a la lectora que llevara al veterinario». Ningún hecho del 1 al 10 lo recoge.
- Sección 5, ancla del chequeo (línea 156): «(el mismo que Gonzalo le recomendó a la lectora)». Tampoco está documentado, y además es una nota interna metida en la columna del texto ancla.
- Sección 6, Conclusión (línea 271): «Ella misma piensa probar la planta de arriba». El hecho 9 solo dice que **no lo ha probado**; la intención de probarlo no consta.
- Sección 6, H3 «Durante» (línea 217): «Lenguaje de la lectora: «nosotras dos en la habitación»». No hay ninguna cita así en la Sección 2.
- *Por qué:* la propia Sección 2 (línea 74) prohíbe añadir «ninguna conversación». Son cuatro puntos donde el redactor escribiría como hechos de la lectora cosas que ella no dijo, en un texto que ella va a revisar.

**P1-2. Las reglas sobre citas textuales se contradicen.**
- La línea 72 autoriza solo dos frases literales. Sin embargo, la línea 217 ofrece una tercera (inexistente, ver P1-1), y los hechos 2 y 10 llevan entre comillas «interminables» y «más o menos», que el redactor puede tomar por citas usables.

**P1-3. La apertura funde un hecho general con un episodio concreto.**
- Sección 6, Introducción, párrafo 1 (línea 172): pide narrar las dos mañanas con operarios con «jadeo, ladridos que no paraban y una cuidadora que tampoco conseguía calmarse». Ese comportamiento es el hecho 2, descrito en general («cuando hay cambios o entra gente»). El hecho 5 dice solo que las dos pasaron esas mañanas en una habitación cerrada. La misma instrucción pide «no inventar detalles de esas mañanas», pero esta fusión es precisamente un detalle no documentado. La imagen 1 (jadeo en la habitación) lo repite.

### P2 — Calidad; corregir al tocar el archivo

**P2-1. Dos cifras imprecisas en las fuentes** (ver tabla de verificación):
- Forsgård, Sección 3 (línea 102): «calor 9/37». El artículo da *weather* 9/37 (24 %), y de esos casos el calor solo 8/37 (22 %).
- Mills, Sección 3 (línea 112): «en algunas clínicas cerca del 80 %». El texto dice «in some instances, the figure may be nearly 80%», sin hablar de clínicas.

**P2-2. El orden de aprobaciones no coincide con `TODO.md`.** El recuadro inicial y la Sección 9.5 ponen la aprobación del propietario después de la de la lectora. `TODO.md` la pone antes de enviarle el PDF. Además, falta qué pasa si la lectora pide cambios (¿se repasan sin auditoría si solo se quita texto?, ¿hace falta revisión si se añade?) y qué pasa si no contesta (no se publica).

**P2-3. La imagen 1 inventa rasgos de la cuidadora.** «Mujer de unos 50 años» y «una pierna estirada sobre un cojín (convalecencia sugerida)» (líneas 318 y 323) no constan en los hechos. Además, un detalle físico de la convalecencia puede acercarse a una de las causas excluidas en la línea 72 o contradecirla. La escena abre el artículo del caso, así que el lector la asociará a la lectora.

**P2-4. Texto final dentro de los AlertBox.** Los `warning` y `danger` (líneas 224–229 y 260–264) traen el cuerpo redactado, no solo el título y el tipo. Es breve y está justificado, pero el redactor debería volver a contrastarlo. En el `danger`, el umbral de Podell («≥3 generalized seizures within a 24-hour period») es un criterio para empezar tratamiento. La viñeta debería añadir «o antes, si así te lo indicó tu veterinario», como pide la propia línea 124, para que no se lea como «con dos crisis no pasa nada».

**P2-5. El orden temporal del caso no está declarado.** No consta si el episodio de los operarios fue antes o después de la muerte de la otra perra. La Conclusión («desde que la casa cambió… más tranquila») y el H2 «Por qué…» pueden inducir al redactor a fijar un orden. Hay que indicar que no lo fije o confirmarlo con la lectora.

## Verificación de fuentes

| # | Fuente | Identificadores | Cómo se comprobó | Resultado |
|---|---|---|---|---|
| 1 | Hammerle y cols., *2015 AAHA Canine and Feline Behavior Management Guidelines*, JAAHA 51(4):205–221 | DOI 10.5326/JAAHA-MS-6527 · PMID 26191821 | PubMed E-utilities (registro) + PDF oficial de AAHA, texto extraído con `pdftotext` | **Verificada.** Identidad correcta. |
| 2 | Forsgård y cols., *Seizure-precipitating factors in dogs with idiopathic epilepsy*, JVIM 33(2):701–707 | DOI 10.1111/jvim.15402 · PMID 30576009 · PMC6430923 | Texto completo en PMC | **Verificada.** Una cifra menor imprecisa (P2-1). Epub 2018, número 2019. |
| 3 | Shihab, Bowen y Volk, *Behavioral changes in dogs associated with the development of idiopathic epilepsy*, Epilepsy Behav 21(2):160–167 | DOI 10.1016/j.yebeh.2011.03.018 · PMID 21531631 | Resumen de PubMed vía E-utilities (Europe PMC devolvió 403/503) | **Verificada** (solo el resumen, como declara el brief). |
| 4 | Mills y cols., *Pain and Problem Behavior in Cats and Dogs*, Animals 10(2):318 | DOI 10.3390/ani10020318 · PMID 32085528 · PMC7071134 | Texto en PMC (resumen, Simple Summary, sección 2) | **Verificada.** Matiz «clínicas» frente a «instances» (P2-1). |
| 5 | Bhatti y cols., IVETF, *medical treatment of canine epilepsy in Europe*, BMC Vet Res 11:176 | DOI 10.1186/s12917-015-0464-z · PMID 26316233 · PMC4552371 | Texto en PMC | **Verificada.** |
| 6 | Podell y cols., *2015 ACVIM Small Animal Consensus Statement on Seizure Management in Dogs*, JVIM 30(2):477–490 | DOI 10.1111/jvim.13841 · PMID 26899355 · PMC4913615 | Texto completo de PMC vía E-utilities | **Verificada.** |

### Fuente → afirmación → localización

| # | Afirmación del brief | Localización en la fuente | Resultado |
|---|---|---|---|
| 1 | Tabla 1: jadeo, respiración y ritmo cardíaco, temblor, lamido de labios y nariz, hipersalivación, más reactividad | Table 1 «Most Commonly Recognized Signs of Nonspecific Anxiety/Distress in Dogs and Cats»: *Panting; Increased respiration and heart rate; Trembling, shaking; Lip licking; Nose licking; Salivation/hypersalivation; Changes in other behaviors, including increased reactivity* | Correcto |
| 1 | «Avoidance and safety are the cornerstones of behavioral treatment» | apartado *Changing Behaviors* (p. 213) | Literal |
| 1 | Definición de *avoidance*, «Protection is the first treatment step», apartar al perro a la parte de atrás de la casa | *Avoidance:* «…sequestering the dog at the back of the house avoids the stimulus…» | Literal |
| 1 | Mayores: cambios de reactividad ligados a vista, oído y flexibilidad; señales verbales con apoyo visual o táctil | *Senior Dogs and Cats*: «Many early changes in reactivity… associated with loss of either visual or auditory acuity and physical flexibility… clear verbal signals augmented by either visual or tactile cues» | Correcto («a menudo» ≈ «many early») |
| 1 | «Medical and behavioral conditions can exist concurrently and exacerbate each other» | p. 214 | Literal |
| 1 | Derivación a especialista; contra métodos aversivos y *flooding* | «a veterinary behavior specialist should be…»; «This Task Force opposes training methods that use aversive techniques»; «Flooding is never recommended» | Correcto |
| 2 | 74 % (37/50) con algún factor; visitas en casa 11/37 (30 %); cambio vital 10/37 (27 %); rutina, sueño y lugares desconocidos 9/37 | Resultados 3.2, literal | Correcto |
| 2 | «calor 9/37» | *weather* 9/37 (24 %); *hot weather* 8/37 (22 %) | **Impreciso (P2-1)** |
| 2 | Diseño transversal retrospectivo, 50 perros, Finlandia, recuerdo de los dueños | Resumen y 2.1 | Correcto |
| 3 | 80 perros; Fear/Anxiety aumenta con y sin medicación | Resumen: «Drug-naïve dogs showed an increase in… Fear/Anxiety… In dogs receiving antiepileptic medication, there were still increases in Fear/Anxiety» | Correcto |
| 4 | Alrededor de un tercio de los casos derivados, en ocasiones cerca del 80 % | Resumen: «a conservative estimate of around a third of referred cases… in some instances… nearly 80%» | Correcto salvo «clínicas» (P2-1) |
| 4 | El dolor vuelve al animal más cauto y ansioso; tratar primero el dolor sospechado | Sección 2: «An animal in pain will naturally be more cautious and potentially anxious»; Simple Summary | Literal |
| 5 | Fenobarbital: sedación, ataxia, polifagia, polidipsia, poliuria; dosis-dependientes, al inicio o al subir la dosis, disminuyen en semanas por tolerancia | «The adverse effects include sedation, ataxia, polyphagia, polydipsia and polyuria… dose dependent, occur early after treatment initiation or dose increase… generally disappear or decrease in the subsequent weeks» | Correcto |
| 6 | Estado epiléptico ≥5 min o ≥3 crisis generalizadas en 24 h | «When Should Treatment Be Started?», punto (ii) | Correcto, como criterio de tratamiento (ver P2-4) |
| 6 | Cambios de conducta al empezar el fenobarbital que se resuelven en 1–2 semanas; poliuria crónica | «Behavioral changes, such as hyperexcitability, restlessness, or sedation… typically resolve within 1–2 weeks»; «Chronic adverse effects usually affect water consumption… psychogenic polydipsia with associated polyuria» | Literal |

**Trazabilidad:** las seis fuentes figuran como «Sustentado en» de al menos un H2 que desarrolla su dato. No hay fuentes decorativas. Los H2 sin respaldo científico («Por qué…» en lo vital, «Y tus nervios») declaran su laguna en la línea 126. **Cobertura inversa:** correcta.

## Comprobaciones mecánicas

| Control | Medido | Resultado |
|---|---|---|
| `seoTitle` | 48 caracteres (`len()`) | ≤55 ✔ |
| `metaDescription` | 147 caracteres | ≤160 ✔ |
| `pilar` | `salud-mental-emocional-perros` | en el enum de `src/content.config.ts` ✔ |
| `status` | `"Pendiente de aprobación"` | válido (`z.string()`); la portada filtra por `Publicado`, pero `[pilar]/[slug].astro` genera la página igualmente. El brief lo dice bien |
| Slug, ruta e imágenes | sin ñ, tildes ni espacios | ✔ |
| Suma de targets | 250+350+450+650+350+450+400 = 2.900 | coincide con el contrato; ±15 % = 2.465–3.335 ✔ |
| AlertBox | `info` en la intro, `warning` en el plan, `danger` en salud | ✔ |
| FAQ | 6 preguntas, respuestas como instrucciones entre corchetes | ✔ |
| Historia | apertura en la intro, momentos repartidos, cierre en la Conclusión, sin H2 propio, hilo principal declarado | ✔ (con P1-3 y P2-5) |
| Componentes | `AlertBox`, `FAQ`, `article/TarjetaRelacionada` existen; `PlanVisitaRecursos` es nuevo y está planificado con gate; el patrón `PolvoraRecursos.astro` existe; hay script de hoja PDF de referencia (`scripts/generar-hoja-calidad-vida.ts`) | ✔ |
| Inventario | línea 297 `[~] (En Briefing)` | ✔ |
| Afiliación | «No aplica», motivada | ✔ |

### Enlazado interno

| URL | `src/content/blog/` | Inventario | Resultado |
|---|---|---|---|
| `/salud-mental-emocional-perros` | pilar en `src/content/pilares/` | ✔ | ✔ |
| `…/ansiedad-separacion-perros-senior` | existe, `Publicado` | `[x]` l. 287 | ✔ |
| `…/agresividad-tardia-perros-mayores-dolor` | existe, `Publicado` | `[x]` l. 296 | ✔ |
| `…/disfuncion-cognitiva-canina` | existe, `Publicado` | `[x]` l. 286 | ✔ |
| `…/miedo-petardos-perros-mayores` | existe, `Publicado` | `[x]` l. 83 | ✔ |
| `/salud-perros-mayores/chequeo-geriatrico-canino` | existe | l. 137–138 | ✔ (el texto ancla tiene el problema de P1-1) |
| `/herramientas/calculadora-calidad-vida-perros` | `src/pages/herramientas/` | ✔ | ✔ |

### Prompts de imagen

En los tres prompts se comprobaron los cinco rasgos senior: canas en hocico, cejas y párpados; ojos algo hundidos; lomo y musculatura de perra mayor; postura natural; sin enfermedad. Los tres están completos, nombran el mismo sujeto y terminan con el criterio de rechazo a tamaño móvil. No hace falta recorte porque el apoyo no lleva perro. La raza (mestiza crema) no aparece en el registro de `direccion-visual-editorial.md` ni en los `heroImageAlt` publicados, y es distinta a propósito de la perra real. Plano, luz, profundidad y exclusiones están definidos. El único problema es la figura humana de la imagen 1 (P2-3).

### Recursos prometidos

| Recurso | Ruta | Estado en el brief | Gate |
|---|---|---|---|
| `PlanVisitaRecursos` | `src/components/article/` | planificado | prueba a 390 px, modo oscuro y teclado ✔ |
| Hoja de registro PDF | `public/descargas/registro-visitas-perro-mayor.pdf` | planificado | abrir el PDF real ✔ |
| 3 ilustraciones | `public/images/blog/perro-mayor-miedo-visitas-casa/` | planificado; marcador con la huella mientras tanto | inspección a tamaño grande y a 390 px ✔ |
| PDF para la lectora | `docs/contenido/…` | planificado | **la ruta está en un repositorio público (P0-2)** |

Nada se presenta como disponible. Todos los recursos tienen gate.

## Efecto cascada

- **Artículo:** aún no existe. Nada heredado.
- **Otros briefs:** las seis fuentes no reutilizan identificadores erróneos; no hay error de fuente que propagar. Las dos imprecisiones de P2-1 solo afectan a este brief.
- **Historial de Git:** P0-1 no se arregla editando el archivo. El commit `9cd0953` queda en la rama pública mientras exista. Este informe se sube encima de ese commit en la misma rama y no añade datos del caso.
- **`TODO.md`:** repite el nombre del hilo de correo y la decisión «rama y PR sin fusionar»; hay que alinearlo con la corrección de P0-2.

## Lo que sí funciona

- **Fuentes:** las seis son reales, de autoridad, con URL profunda y localización precisa. Los límites están bien declarados (asociación frente a causalidad en Forsgård, verificación parcial de Shihab, umbral de Podell usado como criterio de tratamiento) y la laguna de evidencia (puerta de bebé, nervios del cuidador) está escrita, no tapada. No hay que rehacer la Sección 3.
- **Diagnóstico técnico del riesgo de publicación:** es correcto que `[pilar]/[slug].astro` publica cualquier `.mdx` sea cual sea su `status`, y que `status` es una señal, no una protección.
- **Separación de los dos hilos:** la perra protagonista frente a la otra perra como contexto, cuya muerte se menciona una sola vez. Está bien.
- **Sujeto visual elegido a propósito distinto de la perra real.** No hay que tocarlo.
- **No hay afiliación** con un caso de salud delicado.
- **Seguridad:** el `warning` prohíbe automedicar o retirar la medicación, el artículo no da dosis y el plan se presenta como aplicación de los principios de la AAHA, no como protocolo probado.

## Qué corregir, en orden

Primero la privacidad, porque decide dónde vive el brief. Las fuentes no necesitan cambios de fondo.

1. **(Decisión del propietario: P0-1).** Elegir cómo retirar de la vista pública el expediente del caso:
   - (a) Crear un **expediente privado** fuera del repositorio (Google Drive o Doc privado, o el propio hilo de Gmail con etiqueta) con: procedencia, fechas, lista de exclusiones, país y cualquier dato que no vaya a publicarse.
   - (b) Dejar en el repositorio un brief **saneado**: los hechos 1–10 solo en la forma en que podrían aparecer en el artículo; la Sección 2, línea 72, sustituida por «Lista de exclusiones: en el expediente privado (ver propietario)»; sin año de nacimiento, sin canal ni nombre del hilo, sin circunstancias de la muerte de la otra perra y sin país (línea 142: «español neutro» basta). Aplicar lo mismo a la entrada de `TODO.md`.
   - (c) **Historial:** decidir si se borra la rama `claude/happy-ride-8leguk` y se recrea desde `main` con la versión saneada, o si se reescribe su historia. Cualquiera de las dos exige permiso explícito del propietario (las sesiones no hacen force-push). Valorar además pedir a GitHub que purgue la vista en caché del commit `9cd0953`.
2. **(P0-2) Rehacer el recuadro inicial (punto 3), la Sección 9.5 y la Sección 11** para que el borrador **no pase por un PR ni por una rama empujada a GitHub** hasta tener la aprobación de la lectora. Opciones para que el propietario elija: redactar en local y entregar el PDF por Drive o correo; usar un repositorio privado; o un Doc privado. Solo después de las dos aprobaciones se sube el `.mdx` a una rama y PR para publicar. Añadir que el PDF para la lectora y su respuesta se guardan **fuera del repositorio**, y que en `docs/contenido/perro-mayor-miedo-visitas-casa/` solo queda «aprobación recibida el AAAA-MM-DD; cambios pedidos: N», sin nombre, correo ni citas. Mencionar las vistas previas de Workers Builds (`docs/admin/recuperacion-diaria-procedimiento.md:43`) y el incidente de `docs/admin/audiencia-fase-2.md:127-131` como motivo.
3. **(P1-1) Eliminar o documentar los hechos añadidos:**
   - línea 191: quitar «Es lo que Gonzalo le pidió…»;
   - línea 156: texto ancla limpio («chequeo geriátrico»), sin la nota;
   - línea 271: sustituir «piensa probar la planta de arriba» por «es una opción que aún no ha probado» (hecho 9);
   - línea 217: quitar la cita «nosotras dos en la habitación».

   Si el propietario confirma alguno de esos hechos con el correo, añadirlo como hecho numerado en la Sección 2 y solo entonces usarlo.
4. **(P1-2) Cerrar la regla de citas:** en la línea 72, decir que solo son literales las dos frases autorizadas, y quitar las comillas de «interminables» y «más o menos» en los hechos 2 y 10 (o marcarlas como «no citar»).
5. **(P1-3) Intro, párrafo 1 (línea 172):** limitar la escena al hecho 5 (dos mañanas con operarios, las dos en una habitación cerrada, la cuidadora convaleciente). Las reacciones del hecho 2 se cuentan aparte, como algo que pasa «cuando entra gente». Ajustar en la imagen 1 la boca entreabierta o jadeo si se quiere mantener la coherencia (opcional).
6. **(P2-1) Sección 3:**
   - Forsgård: sustituir «calor 9/37» por «tiempo atmosférico 9/37 (24 %), calor en 8».
   - Mills: sustituir «en algunas clínicas» por «en algunos casos».
7. **(P2-2) Fijar un solo orden** en el recuadro inicial, la Sección 9.5 y `TODO.md`: auditoría del artículo → visto bueno del propietario al texto → PDF a la lectora → respuesta → cambios (si solo se quita texto, sin nueva auditoría; si se añade, revisión del cambio) → aprobación final del propietario → publicar. Si la lectora no responde, no se publica.
8. **(P2-3) Imagen 1:** quitar la edad y la pierna sobre el cojín. Persona adulta sentada en el suelo junto a la perra, sin señales de lesión.
9. **(P2-4) AlertBox `danger`, primera viñeta:** añadir «o antes si tu veterinario te ha dado otra pauta». Marcar en el brief que los cuerpos de ambos AlertBox son borrador que el redactor contrasta.
10. **(P2-5) Sección 2:** añadir una línea: «Orden temporal entre la muerte de la otra perra y el episodio de los operarios: no consta; no fijarlo en el texto», o confirmarlo en la revisión de la lectora.

Tras corregir, la ronda R2 la debe hacer otra sesión distinta de la que corrija. Si el P0-1 se resuelve fuera del repositorio, R2 verificará que el brief saneado ya no contiene esos datos, no el expediente privado.
