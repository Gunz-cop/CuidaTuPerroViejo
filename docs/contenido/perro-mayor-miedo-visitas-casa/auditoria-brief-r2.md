# Auditoría del brief — R2

| Campo | Valor |
|---|---|
| Documento | Brief v2 completo en el Google Doc privado del propietario («Expediente privado — artículo miedo a las visitas (brief v2)»), leído con el conector de Google Docs |
| Versión auditada | Doc: `revisionId` `AHj4eMTt7jigxAWSG0TZE7RpuNXvB8b91LYuILijwtE0FZyTMbQnQB5hhe-L7SC7cS3dZckDjJA6-FetGxAsPu8CF-7NEGyZjjSfFOP3Kg`, leída el 2026-11-23. Repositorio: `origin/claude/happy-ride-8leguk` en `6c2f0c9` (brief saneado, R1, adenda de Ágata y Jaspe) |
| Ronda | **R2 de 4** (límite ampliado por el propietario el 2026-11-23) |
| Fecha | 2026-11-23 |
| Método | skill `auditar-briefing-contenido`, `calidad-editorial-adsense.md`, `guia-voz-tono.md`, AGENTS.md, `docs/metodologia-agentes.md` |
| Rol | auditor independiente: no generó ni corrigió el brief, y no lo modifica. Tampoco modifica el Doc |

> **Nota de privacidad.** Este archivo está en un repositorio público. No copia ningún contenido del caso: los hallazgos remiten a secciones del Doc («Sección 2, hecho 9», «Adenda R1, viñeta *Uso*»). La procedencia, la lista de exclusiones y los hechos solo están en el Doc.

## Veredicto

**APTO con observaciones** para redactar el borrador **en el Doc privado**. Hay dos condiciones:

1. **Antes de redactar el párrafo de la adenda**, corregir P1-1 y P1-2. También vale quitar el párrafo, porque el propio brief prevé que el artículo funciona sin él.
2. **Antes de publicar nada**, resolver P0-1: la versión v1 del brief sigue accesible en GitHub y es la que contiene los datos del caso. **Este punto bloquea la publicación, no la redacción.**

El brief v2 corrige los 12 hallazgos de R1. Las seis fuentes vuelven a estar verificadas, y las dos cifras que R1 señaló ya son exactas.

## Hallazgos

### P0 — Bloquea la publicación (no la redacción)

**P0-1. La versión v1 del brief sigue publicada en GitHub, y el informe R1 dice dónde encontrarla.**
- *Evidencia:* la rama remota se recreó: `git ls-remote` devuelve `claude/happy-ride-8leguk` → `6c2f0c9`, y el commit de v1 ya no está en ninguna rama remota (`git branch -r --contains` no devuelve nada). Sin embargo, la API de GitHub (`get_commit`) **sigue devolviendo ese commit por su SHA**, con la URL pública `github.com/…/commit/<sha>`. GitHub conserva los commits que ya no están en ninguna rama hasta que su soporte los purga. Además, la cabecera y el apartado «Efecto cascada» del informe R1, que sí está en la rama pública, citan ese SHA. Basta leer R1 para llegar a la v1, que contiene la Sección 2 sin sanear.
- *Por qué bloquea:* el día que se publique el artículo, el slug enlazará con R1 y R1 enlazará con la v1. Es exactamente lo que el P0-1 de R1 quería evitar. En R1 este punto quedó abierto: su instrucción 1(c) pedía valorar la purga de la vista en caché.
- *Lo que no hay:* en el árbol actual de la rama y en los dos commits que tiene por encima de `origin/main` (incluidos los mensajes de commit) **no hay datos identificativos** de la lectora. Busqué el tipo racial, el año de nacimiento, el país, el canal, el nombre del hilo, las fechas de los correos, las circunstancias de la muerte, el accidente, la baja y la causa de la reparación. No aparece ninguno.

### P1 — Se propagarían al artículo

**P1-1. El H3 «Lo que el perro trae de antes» pide generalizar a partir de un solo caso.**
- *Ubicación:* Sección 2, Adenda R1, viñeta *Uso*: «Muestra que esa tensión entre animales de la misma casa es más común de lo que parece». Y Sección 6, H2 «Por qué…», H3 «Lo que el perro trae de antes», segunda viñeta: la «frase prudente» que afirma, como hecho general, que la tensión entre perros de la misma casa es un estrés diario que se nota en todo lo demás.
- *Por qué:* las dos frases son afirmaciones generales sin fuente. La primera habla de frecuencia y se apoya en dos casos: el de la lectora y una gata. La segunda describe un mecanismo. La Sección 3 no respalda ninguna, y la nota de lagunas solo cubre la interpretación de la lectora. `calidad-editorial-adsense.md` §2 y §4 lo prohíben: un caso no demuestra nada general, y una experiencia doméstica no demuestra causalidad. Con la adenda, el redactor tendría dos anécdotas en el mismo H3 y una instrucción que le pide sacar de ellas una regla.

**P1-2. La adenda permite contar la pupila dilatada como posible efecto del estrés, en un artículo sobre una perra con epilepsia.**
- *Ubicación:* Sección 2, Adenda R1, resumen (episodio de la pupila) y viñeta *No usar*. Esa viñeta prohíbe el estrés «como causa probada», pero no dice nada de la pupila.
- *Por qué:* según `docs/experiencias/agata-jaspe-convivencia-2026-11-23/README.md`, el veterinario dijo que la pérdida de pelo, la pupila dilatada y otros cambios «podían deberse al estrés». El propio README advertía antes que la anisocoria es motivo de consulta y no debe atribuirse al estrés. Pupilas desiguales en un artículo que también habla de crisis convulsivas es la combinación peligrosa. El lector puede quedarse con la idea «pupilas desiguales = estrés» y no consultar un signo que puede ser neurológico. La opinión del veterinario fue sobre un caso concreto, y aquí acabaría leyéndose como regla general.
- *Sobre la pregunta del encargo:* el resto del uso propuesto **es honesto**. Es un párrafo como máximo, en primera persona del equipo, deja claro que se trata de una gata y que no prueba nada en perros, cuenta la opinión del veterinario como suya y de ese caso, deja fuera a Rookie y hace la adenda prescindible. Lo que falla es solo lo señalado en P1-1 y aquí.

**P1-3. Riesgo operativo: el historial local de la rama puede volver a subir la v1.**
- *Evidencia:* en el clon de esta sesión, la rama local `claude/happy-ride-8leguk` todavía apuntaba al commit de v1, mientras la remota está en `6c2f0c9`. Las dos historias no tienen ancestro común en esa rama. La regla de Git de AGENTS.md y de la sesión dice que, si un push se rechaza, se hace `fetch` y `merge`. **Hacer ese merge volvería a poner la v1 en la rama pública.** Cualquier sesión que se reanude con un clon antiguo correría ese riesgo.
- *Por qué es P1:* no está en el texto del brief, pero el brief es lo que lleva a otras sesiones a trabajar en esta rama. Este informe se subió desde `6c2f0c9`, no desde la rama local.

### P2 — Calidad; corregir al tocar el Doc

**P2-1. El `heroImageAlt` dice «su cuidadora» y el prompt dice «an adult».** El alt da por hecho que es una mujer. Además, en la imagen de apertura del caso, el lector la identificará con la lectora. La corrección de P2-3 de R1 se aplicó al prompt, pero no al alt.

**P2-2. Falta decir dónde viven, antes de las dos aprobaciones, los productos que no son el `.mdx`.** Se trata de `PlanVisitaRecursos.astro`, el script y el PDF de registro, y el **informe de auditoría del artículo**. Las Secciones 9.5 y 11 solo protegen el `.mdx`, las imágenes y el PDF para la lectora. La skill `auditar-articulo-blog` escribe su informe en `docs/`, y si cita el borrador expone el caso en la rama pública antes de que la lectora lo lea.

**P2-3. La adenda deja una frase sin contenido documentado.** «Hoy el propietario gestiona de otra manera la llegada de un animal nuevo»: el README marca como pendiente qué hizo distinto. Si el redactor la usa, tendrá que inventar el cómo.

**P2-4. La rama pública ya contiene hechos del caso que no identifican a nadie.** El informe R1 y la sección *Uso previsto* del README los mencionan (el episodio, la casa y la otra perra) antes de que la lectora haya leído nada. No permiten identificarla, y el artículo los contará. Aun así, la Sección 9.5 dice «nada del caso en ramas». Es una contradicción con la letra de la regla, no una fuga, y la decide el propietario.

## R1 contra el Doc, hallazgo por hallazgo

| R1 | Estado en v2 | Dónde |
|---|---|---|
| P0-1 brief en el repo público | **Corregido en el árbol**; el commit de v1 sigue accesible por SHA → **P0-1 de R2** | brief saneado en el repo; Doc privado; recuadro inicial |
| P0-2 rama/PR no protegen | Corregido: borrador solo en el Doc; nada en ramas, PR ni vistas previas; PDF y respuesta fuera del repo; registro mínimo; cita los motivos (`recuperacion-diaria-procedimiento.md:43`, `audiencia-fase-2.md:127-131`) | recuadro inicial, Secciones 9.5 y 11 (falta lo de P2-2) |
| P1-1 hechos añadidos | Corregido: «Lleva la cuenta» sin la nota; ancla «chequeo geriátrico» limpia; la conclusión dice que es una opción no probada; la cita inexistente se quitó | Sección 5; Sección 6 |
| P1-2 regla de citas | Corregido: solo dos frases literales, «ninguna otra frase… es cita usable»; hechos 2 y 10 sin comillas | Sección 2 |
| P1-3 apertura fundida | Corregido: el párrafo 1 se limita al hecho 5 y remite el hecho 2 a después | Sección 6, Introducción |
| P2-1 cifras | Corregido: tiempo atmosférico 9/37 (24 %), calor 8/37; Mills «en algunos casos» | Sección 3 |
| P2-2 orden de aprobaciones | Corregido y alineado con `TODO.md`; añade los cambios de la lectora y el «si no responde, no se publica» | recuadro inicial |
| P2-3 rasgos de la cuidadora | Corregido en la tabla y el prompt; queda el alt → **P2-1 de R2** | Sección 8, Imagen 1 |
| P2-4 cuerpo de AlertBox | Corregido: «o antes si tu veterinario te ha dado otra pauta»; los dos cuerpos marcados como borrador | Sección 6 |
| P2-5 orden temporal | Corregido: «no consta… se confirma con la lectora» | Sección 2 |

## Verificación de fuentes (rehecha en R2)

Identidad: PubMed E-utilities (`esummary`) para los seis PMID. Comprobé título, revista, volumen, páginas, autores, DOI y PMC. Afirmaciones: texto completo de PMC (`efetch`), el PDF oficial de AAHA (17 páginas, `pdftotext`) y el resumen de PubMed para Shihab.

| # | Fuente | Identidad | Afirmación del brief → localización | Resultado |
|---|---|---|---|---|
| 1 | Hammerle y cols., 2015 AAHA Behavior Management Guidelines, JAAHA 51(4):205–21 | PMID 26191821, DOI 10.5326/JAAHA-MS-6527, 7 autores coinciden | Tabla 1 (*Panting; Increased respiration and heart rate; Trembling…*); «Avoidance and safety are the cornerstones of behavioral treatment»; «Protection is the first treatment step»; «sequestering the dog at the back of the house»; «medical and behavioral conditions can exist concurrently and exacerbate each other» (p. 214); *Senior*: «loss of either visual or auditory acuity and physical flexibility… clear verbal signals augmented by either visual or tactile cues»; «Flooding is never recommended»; «opposes training methods that use aversive…» | **Verificada** |
| 2 | Forsgård y cols., JVIM 33(2):701–707 | PMID 30576009, DOI 10.1111/jvim.15402, PMC6430923 | 74 % (37/50); visitas en casa 11/37 (30 %); cambio vital 10/37 (27 %); rutina, sueño, lugares desconocidos y tiempo atmosférico 9/37 (24 %); «hot weather for 8 dogs (8/37, 22 %)»; resumen: estrés, sueño, tiempo, hormonas | **Verificada** (la cifra de R1 ya es exacta) |
| 3 | Shihab, Bowen y Volk, Epilepsy Behav 21(2):160–7 | PMID 21531631, DOI 10.1016/j.yebeh.2011.03.018 | Resumen: n = 80; «Drug-naïve dogs showed an increase in… Fear/Anxiety… In dogs receiving antiepileptic medication, there were still increases in Fear/Anxiety» | **Verificada** (solo el resumen, como declara el brief) |
| 4 | Mills y cols., Animals 10(2):318 | PMID 32085528, DOI 10.3390/ani10020318, PMC7071134 | «around a third of referred cases… in some instances… nearly 80%»; «An animal in pain will naturally be more cautious and potentially anxious» (sección 2); «better… to treat suspected pain first» | **Verificada** («en algunos casos» ya es exacto) |
| 5 | Bhatti y cols., IVETF, BMC Vet Res 11:176 | PMID 26316233, DOI 10.1186/s12917-015-0464-z, PMC4552371 | *Common adverse effects*: «dose dependent, occur early after treatment initiation or dose increase and generally disappear or decrease in the subsequent weeks»; «sedation, ataxia, polyphagia, polydipsia and polyuria» | **Verificada** |
| 6 | Podell y cols., 2015 ACVIM Consensus, JVIM 30(2):477–90 | PMID 26899355, DOI 10.1111/jvim.13841, PMC4913615 | «ictal event ≥5 minutes or ≥3… generalized seizures within a 24-hour period» (criterio para empezar el tratamiento, y el brief lo usa así); cambios de conducta que se resuelven en «1–2 weeks»; «psychogenic polydipsia with associated polyuria» | **Verificada** |

**Trazabilidad:** cada fuente sostiene al menos un H2 que desarrolla su dato. No hay fuentes decorativas. **Cobertura inversa:** «Y tus nervios» y la parte vital del H2 «Por qué…» declaran su laguna, salvo las dos frases generales de P1-1. **Efecto cascada:** no hay errores de fuente que se propaguen a otros briefs.

## Comprobaciones mecánicas

| Control | Medido | Resultado |
|---|---|---|
| `seoTitle` | 48 caracteres (`len()`) | ≤55 ✔ |
| `metaDescription` | 147 caracteres | ≤160 ✔ |
| `pilar` | `salud-mental-emocional-perros` | en el enum de `src/content.config.ts` ✔ |
| `status` / fecha | `"Publicado"`, fecha provisional; el `.mdx` solo se sube tras las dos aprobaciones | coherente ✔ |
| Suma de targets | 250+350+450+650+350+450+400 = 2.900; ±15 % = 2.465–3.335 | ✔ |
| AlertBox | `info` en la intro, `warning` en el plan, `danger` en salud | ✔ |
| FAQ | 6 preguntas, respuestas como instrucciones | ✔ |
| Enlaces internos | los 4 spokes son de `salud-mental-emocional-perros` con `status: "Publicado"`; el chequeo existe en `salud-perros-mayores` (status por defecto `Publicado`); la calculadora está en `src/pages/herramientas/`; el pilar existe | ✔ |
| Componentes | `AlertBox`, `FAQ`, `article/TarjetaRelacionada` existen; `PlanVisitaRecursos` es nuevo, planificado con gate, sobre el patrón `PolvoraRecursos.astro` | ✔ |
| Prompts | los 3 nombran el mismo sujeto y llevan el bloque senior íntegro (canas en hocico, cejas y párpados; ojos; lomo y musculatura; postura; sin enfermedad) y el criterio de rechazo a tamaño móvil; sin recortes porque el apoyo no lleva perro; ninguna raza del registro repetida; ningún `heroImageAlt` publicado describe una mestiza crema | ✔ (alt: P2-1) |
| Voz | español neutro declarado (no es de la serie P1) | ✔ |
| Afiliación | «No aplica», con motivo | ✔ |
| Inventario | `[~] (En Briefing)` | ✔ |

## Qué corregir, en orden

1. **(P0-1, decisión y acción del propietario; antes de publicar):**
   - (a) Pedir a GitHub Support que elimine los datos sensibles del commit de v1 («remove sensitive data» / purga de vistas en caché), indicando el SHA que figura en el expediente privado o en R1.
   - (b) Comprobar después, por la API o en el navegador sin sesión, que la URL del commit devuelve 404.
   - (c) Quitar el SHA de la cabecera y del apartado «Efecto cascada» de R1. Una línea basta: «versión v1, retirada; SHA en el expediente privado». Lo hace una sesión distinta de la mía, porque el auditor no corrige. Es un cambio solo de texto y no hace falta una nueva ronda.
   - (d) Anotar en la Sección 9.5 del Doc un gate: «antes del PR de publicación, comprobar que el commit de v1 da 404 en GitHub».
2. **(P1-1) Adenda, viñeta *Uso*:** sustituir «Muestra que esa tensión… es más común de lo que parece» por algo que no generalice, por ejemplo: «La contamos porque se parece al caso de la lectora, no porque demuestre nada». En el H3 «Lo que el perro trae de antes», reescribir la «frase prudente» como consejo, sin afirmar un mecanismo: «si en tu casa hay tensión entre animales, coméntalo con un profesional del comportamiento». La otra opción es respaldarla con una fuente verificada en la Sección 3, lo que sería un cambio de contrato.
3. **(P1-2) Adenda, viñeta *No usar*:** añadir que **el episodio de la pupila no se menciona en el artículo**. Si el propietario quiere mantenerlo, solo con esta forma: «lo vio un veterinario; unas pupilas de distinto tamaño siempre son motivo de consulta, y más en un perro con crisis». Nunca como ejemplo de estrés.
4. **(P1-3) Añadir al recuadro inicial del Doc y a la entrada de `TODO.md`:** la rama `claude/happy-ride-8leguk` se recreó. Toda sesión debe trabajar desde `origin/claude/happy-ride-8leguk` (`git fetch` y `git checkout -B claude/happy-ride-8leguk origin/claude/happy-ride-8leguk`). Si un push se rechaza, **no hacer merge**: detenerse y avisar al propietario.
5. **(P2-1) `heroImageAlt`:** sustituir «junto a su cuidadora» por «junto a una persona sentada en el suelo». Fijar el alt definitivo después de ver la imagen generada.
6. **(P2-2) Sección 9.5 y Sección 11:** decir que el informe de la auditoría del artículo no copia texto del borrador ni datos del caso. Remite a secciones del Doc, como este informe, o vive en el Doc. Decidir también si `PlanVisitaRecursos.astro`, el script y el PDF de registro, que no contienen nada del caso, pueden subirse antes a una rama sin PR, o si esperan con el `.mdx`.
7. **(P2-3) Adenda:** quitar «Hoy el propietario gestiona de otra manera…», o marcarlo como «no desarrollar hasta que el propietario documente qué hizo».
8. **(P2-4) Decisión del propietario:** aceptar de forma explícita que R1 y el README nombran hechos no identificativos del caso, o trasladarlos al Doc. Si se aceptan, matizar la Sección 9.5 («nada identificativo del caso en ramas»).

Las correcciones 2, 3, 5 y 7 solo quitan o acotan texto. Si se aplican tal cual, puede comprobarlas la auditoría del artículo sin gastar R3. Si el corrector añade contenido nuevo, por ejemplo una fuente para P1-1, hace falta R3, hecha por otra sesión.
