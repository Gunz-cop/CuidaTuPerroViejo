# 📋 BRIEF DE CONTENIDOS TÉCNICO: Mi perro mayor se estresa con las visitas: cómo preparar la casa cuando entra gente
**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud Mental y Emocional | **Tipo:** Artículo spoke (Astro/MDX)

> [!IMPORTANT]
> **Caso especial: publicación con doble aprobación.** El artículo se basa en la experiencia de una lectora que dio permiso por correo el 2026-11-21 («puedes utilizar mi caso si puede ayudar a otros perros y personas»). Gonzalo le prometió anonimato el 2026-11-10: sin su nombre, sin el de su perra y sin ningún detalle que pueda identificarlas. Por eso:
> 1. **Dónde vive (decisión del propietario, 2026-11-23):** el brief y el borrador viven en este repositorio público, anonimizados (sin nombres de personas ni de animales del caso). El propietario considera que los hechos restantes son situaciones comunes y no permiten identificar a nadie. El Google Doc privado usado entre R1 y R2 queda solo como archivo histórico.
> 2. **El borrador no va en `src/content/blog/`** sino en `borradores/perro-mayor-miedo-visitas-casa.mdx`, porque `src/pages/[pilar]/[slug].astro` publica cualquier `.mdx` de la colección sea cual sea su `status`. Se mueve a `src/content/blog/` solo tras las dos aprobaciones.
> 3. **Orden único:** auditoría del artículo → visto bueno del propietario al texto → PDF a la lectora respondiendo su correo (texto del correo aprobado por el propietario) → respuesta de la lectora → cambios (si solo se quita texto, sin nueva auditoría; si se añade o reescribe, revisión independiente del cambio) → aprobación final del propietario → mover el `.mdx`, PR y publicar. **Si la lectora no responde, no se publica.** Si retira el permiso, el caso sale del artículo.
> 4. **Rama recreada el 2026-11-23.** Toda sesión trabaja desde `origin/claude/happy-ride-8leguk` (`git fetch origin claude/happy-ride-8leguk && git checkout -B claude/happy-ride-8leguk origin/claude/happy-ride-8leguk`). Si un push se rechaza, **no hacer merge**: detenerse y avisar al propietario, porque un clon antiguo reintroduciría la versión v1.

---

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| **Título H1** | Mi perro mayor se estresa con las visitas: cómo preparar la casa cuando entra gente |
| **Título SEO (seoTitle)** | Perro mayor estresado con las visitas: qué hacer (48 caracteres) |
| **Keyword Principal** | perro mayor estresado con las visitas |
| **Keywords Secundarias** | perro jadea y ladra cuando vienen visitas · perro con miedo a extraños en casa · zona segura para el perro · obreros en casa y perro miedoso · perro con epilepsia y estrés |
| **Slug** | `perro-mayor-miedo-visitas-casa` |
| **Meta descripción (Máx. 160 car.)** | Jadea, ladra y no se calma cuando entra alguien en casa. Cómo prepararle una zona segura, qué pedir a las visitas y cuándo pasa por el veterinario. (147 caracteres) |
| **Ruta Relativa** | `/salud-mental-emocional-perros/perro-mayor-miedo-visitas-casa` |
| **Pilar** | Salud Mental y Emocional |
| **Ruta Pilar** | `/salud-mental-emocional-perros` |
| **Intención Principal** | Informacional — el cuidador quiere entender por qué su perro mayor lo pasa tan mal cuando entra gente en casa (visitas, obreros, técnicos) y si es solo miedo o puede haber algo de salud detrás. |
| **Intención Secundaria** | Práctica — busca un plan concreto para antes, durante y después de la visita, y saber cuándo consultar. |
| **Objetivo Global** | 2.900 palabras; alcance según utilidad (plan práctico completo + diferencial de salud), no requisito de AdSense |
| **Fecha brief** | 2026-11-23 |

Conteos hechos con `len()` de Python sobre las cadenas exactas: seoTitle 48, metaDescription 147.

### Bloque de Frontmatter MDX
El redactor debe iniciar el archivo `.mdx` copiando exactamente este bloque de metadatos:

```yaml
---
title: "Mi perro mayor se estresa con las visitas: cómo preparar la casa cuando entra gente"
seoTitle: "Perro mayor estresado con las visitas: qué hacer"
metaDescription: "Jadea, ladra y no se calma cuando entra alguien en casa. Cómo prepararle una zona segura, qué pedir a las visitas y cuándo pasa por el veterinario."
pilar: "salud-mental-emocional-perros"
keywordPrincipal: "perro mayor estresado con las visitas"
heroImage: "/images/blog/perro-mayor-miedo-visitas-casa/perra-mayor-habitacion-tranquila-visitas.webp"
heroImageAlt: "Perra mestiza mayor de hocico canoso tumbada en su cama en una habitación con la puerta cerrada, junto a una persona sentada en el suelo"
status: "Publicado"
datePublished: "2026-12-01"
---
```

`datePublished` es provisional: se pone la fecha real al subir el `.mdx`, que solo ocurre tras las dos aprobaciones.

---

## 2. PROCEDENCIA DEL MATERIAL Y VALOR PROPIO

**Tipo:** Experiencia aportada por una lectora (no del equipo), anonimizada y con permiso expreso.

**Procedencia:** dos correos de la lectora al buzón `contacto@` del sitio (formulario del 2026-06-24 y respuesta del 2026-11-21, hilo «Consulta estrés» en Gmail del propietario) y la respuesta de Gonzalo del 2026-11-10, donde pide el permiso y promete el anonimato. No se ha hablado con ella por otra vía ni se ha visto a la perra.

**Hechos documentados (únicos que se pueden usar; depurados de forma, sin añadir datos):**
1. Perra mestiza de tipo pastor, recogida de la calle; la lectora calcula que nació a principios de 2013 (unos 13 años). Siempre fue insegura, con miedos.
2. Cuando hay cambios o entra gente de fuera en casa: jadeo, ladridos que no terminan, no consigue relajarse. Y la cuidadora tampoco consigue controlar sus nervios al verla así.
3. Durante años convivió con otra perra adoptada antes. Al tiempo de llegar, empezó a «controlarla» en cualquier actividad («como si fuera una oveja», en palabras de la lectora) y le ladraba con insistencia. La convivencia fue complicada siempre; la lectora hizo cursos de comportamiento canino y decidieron quedarse con las dos.
4. La lectora cree que la perra vivió en alerta permanente mientras compartió vida con la otra. La otra perra murió (eutanasia de urgencia) y, desde entonces, la lectora la ve «otra perra, para bien»: se acabó esa necesidad de control.
5. El episodio que motivó el correo: la cuidadora estaba convaleciente y sin poder moverse con normalidad, y unos operarios entraron dos mañanas por una reparación. Las dos pasaron esas mañanas en una habitación con la puerta cerrada.
6. Cuando entran personas ajenas, siempre han apartado a la perra, porque su alteración era muy intensa y no podían fiarse de cómo reaccionarían esas personas. Reciben pocas visitas, y la lectora cree que eso les quitó a sus perras la costumbre de ver gente de fuera en casa.
7. En los meses siguientes la perra tuvo su primera crisis convulsiva; después más crisis, diagnóstico de epilepsia, un soplo cardíaco y efectos secundarios del fenobarbital, con mucha poliuria.
8. Lo que más le importa ahora: darle la mayor tranquilidad posible. Le preocupa cuando tiene que entrar un profesional y no hay más opción que dejarla sola o con uno de ellos en una habitación.
9. Opción que **no ha probado**: dejarla en la planta de arriba de la casa (de dos plantas) con una puerta de bebé, para que no pueda bajar pero sí oír y oler a quien entra.
10. Lo que se le sugirió en la respuesta del 2026-11-10 (sitio tranquilo preparado con cama y agua, pedir a las visitas que no la llamen ni la toquen, más distancia si jadea) es, según ella, aproximadamente lo que ya hacen con la familia.

**Anonimización obligatoria (promesa del 2026-11-10):** no usar el nombre de la lectora, el de su perra ni el de la otra perra; no nombrar razas (ni la de la perra ni la de la otra perra); no dar la fecha de la eutanasia; no mencionar el accidente laboral, la baja médica de la pareja ni la causa de la reparación (humedades). Decir «convaleciente», «una reparación», «otra perra de la casa». Edad aproximada («unos 13 años») sí. No citar sus frases textuales salvo «como si fuera una oveja» y «otra perra, para bien», que son las que mejor explican el caso: confirmarlas con ella en la revisión. Ninguna otra frase del brief entre comillas es cita usable.

**Orden temporal:** no consta si el episodio de los operarios fue antes o después de la muerte de la otra perra. El redactor no fija ese orden; se confirma con la lectora en su revisión.

**Lo que no se puede añadir:** ninguna conversación, mejora, resultado de la puerta de bebé, cifra de crisis, dosis ni desenlace. El problema digestivo que menciona al final del correo no entra (es puntual y no forma parte del tema). La salud de la perra se cuenta en la medida exacta de los hechos 7 y 8.

**Declaración para el lector:** en la introducción, una frase: «Esta guía nace del correo de una lectora, que nos dejó contar su experiencia. Hemos cambiado o quitado los detalles que podrían identificarlas». Las imágenes son ilustraciones (declaración global de IA en la firma).

**Pregunta del lector y respuesta práctica:** «Mi perro mayor lo pasa fatal cuando entra gente en casa, y yo también. ¿Qué hago antes, durante y después, y cuándo es algo más que miedo?» → plan en tres tiempos (antes/durante/después), qué pedir a las visitas y a los profesionales, cómo cuidar los nervios del propio cuidador, y qué observar para el veterinario, con el caso de una perra con epilepsia como ejemplo de por qué el estrés también es un asunto de salud.

**Aportación propia:** frente a los artículos ya publicados (petardos y pólvora: ruido de un evento; ansiedad por separación: quedarse solo), este trata la **entrada de personas en el territorio del perro**, incluida la que no se puede evitar (técnicos, operarios, cuidadores). Une tres cosas que no suelen aparecer juntas: (a) el contexto vital del perro (años de tensión con otro perro, poca costumbre de ver gente de fuera); (b) la salud (dolor, epilepsia, medicación) como parte de la respuesta al estrés; y (c) el estado del cuidador, que el caso pone en primer plano.

**Hilo narrativo principal:** la perra protagonista. La otra perra es contexto secundario y no tiene desenlace propio en el artículo (su muerte se menciona una sola vez, con tacto, como el momento en que cambió la casa).

**Adenda R1 — experiencia del propietario (opcional; añadida el 2026-11-23, sujeta a R2):** el propietario aportó por audio su propia experiencia, en el repositorio en `docs/experiencias/agata-jaspe-convivencia-2026-11-23/README.md` (material del propio dueño, sin datos de la lectora). Su gata Jaspe vivió en tensión con otra gata recién llegada que, al crecer, le quitaba la comida y la presionaba por dominar, sin peleas. Jaspe perdió pelo de medio cuerpo hacia abajo y tuvo un episodio con una pupila dilatada. Hubo consulta veterinaria: el veterinario dijo que podía ser estrés y, la pérdida de pelo, también un hongo; el tratamiento antifúngico la redujo un poco, pero no se le quitó. Solo empezó a mejorar cuando la otra gata ya no estaba (añadido del propietario, 2026-11-23). Cuando la otra gata murió, Jaspe se recompuso, más activa y con más valor, y nunca dio señales de echarla de menos: parecía «liberada». 
*   **Uso:** como mucho un párrafo en el H3 «Lo que el perro trae de antes», justo después del hecho 4, en primera persona del equipo, diciendo que es una gata y que no prueba nada para perros. Se cuenta porque se parece al caso de la lectora, no porque demuestre nada.
*   **No usar:** el estrés como causa probada: se cuenta como lo que dijo el veterinario en ese caso («podía ser estrés y un hongo»), sin generalizarlo a otros animales; ni a Rookie (especie y manejo sin documentar). **El episodio de la pupila dilatada no se menciona en el artículo:** en un texto sobre una perra con crisis convulsivas, unas pupilas desiguales podrían leerse como «es estrés» cuando siempre son motivo de consulta. Puede contarse en el correo a la lectora.
*   Si el auditor o el propietario lo descartan, el artículo funciona sin este párrafo y la historia se usa solo en el correo a la lectora.

---

## 3. FUENTES CIENTÍFICAS DE AUTORIDAD (SOURCE-FIRST)

> [!IMPORTANT]
> Las seis fuentes se abrieron y leyeron el 2026-11-23 (texto completo, salvo donde se indica). Las afirmaciones respaldadas y su localización se copiaron del texto, no del resumen del buscador.

1.  **Fuente 1 — Guía AAHA de manejo del comportamiento (2015).** Hammerle M, Horst C, Levine E, Overall K, Radosta L, Rafter-Ritchie M, Yin S. *2015 AAHA Canine and Feline Behavior Management Guidelines.* J Am Anim Hosp Assoc 2015; 51(4):205–221. DOI 10.5326/JAAHA-MS-6527. PMID 26191821. PDF oficial: https://www.aaha.org/globalassets/02-guidelines/behavior-management/2015_aaha_canine_and_feline_behavior_management_guidelines_final.pdf (redirige a la misma ruta en `/wp-content/uploads/globalassets/`; texto extraído y leído).
    *   *Dato clave y localización:*
        *   Tabla 1, «Most Commonly Recognized Signs of Nonspecific Anxiety/Distress»: jadeo, aumento de la respiración y del ritmo cardíaco, temblor, lamido de labios y de nariz, hipersalivación, cambios de conducta con más reactividad.
        *   «Avoidance and safety are the cornerstones of behavioral treatment» (apartado *Changing Behaviors*). Definición de *avoidance*: proteger al perro de los estímulos que lo empeoran; «Protection is the first treatment step»; ejemplo de apartar al perro a la parte de atrás de la casa.
        *   Apartado *Senior Dogs and Cats*: los cambios de reactividad en perros mayores se asocian a menudo a pérdida de vista u oído y de flexibilidad física; recomiendan señales verbales claras acompañadas de señales visuales o táctiles.
        *   «Medical and behavioral conditions can exist concurrently and exacerbate each other».
        *   Derivación a un veterinario especialista en comportamiento en casos graves o que no responden.
    *   *H2:* «Cómo saber que tu perro lo está pasando mal», «Antes, durante y después: el plan para cuando entra gente», «Cuando el miedo también es un asunto de salud».
    *   *Límites:* es una guía de consenso para clínicas, no un ensayo; no da protocolos específicos para visitas en casa. Lo de la habitación y el plan concreto es aplicación del principio de evitación y protección, y debe presentarse así.

2.  **Fuente 2 — Forsgård y cols. (2019), factores desencadenantes de crisis.** Forsgård JA, Metsähonkala L, Kiviranta A-M, Cizinauskas S, Junnila JJT, Laitinen-Vapaavuori O, Jokinen TS. *Seizure-precipitating factors in dogs with idiopathic epilepsy.* J Vet Intern Med 2019; 33(2):701–707. DOI 10.1111/jvim.15402. PMID 30576009. https://pmc.ncbi.nlm.nih.gov/articles/PMC6430923
    *   *Dato clave y localización:* Resultados 3.2: el 74 % (37/50) de los perros tenía algún factor desencadenante según sus dueños. En la lista de comprobación, entre esos 37, el más señalado fue **«visitas en casa»: 11/37 (30 %)**; seguido de cambio en la situación vital 10/37 (27 %), cambios de rutina 9/37, alteración del sueño 9/37, lugares desconocidos 9/37 y tiempo atmosférico 9/37 (24 %; calor en 8/37). Resumen: los factores más frecuentes fueron las situaciones relacionadas con el estrés, la falta de sueño, el tiempo y factores hormonales.
    *   *H2:* «Cuando el miedo también es un asunto de salud».
    *   *Límites:* estudio transversal y retrospectivo con 50 perros con epilepsia idiopática en Finlandia, basado en lo que recuerdan los dueños; muestra asociación percibida, no causalidad. El redactor dice «los dueños señalaron», no «las visitas provocan crisis».

3.  **Fuente 3 — Shihab, Bowen y Volk (2011), conducta y epilepsia.** Shihab N, Bowen J, Volk HA. *Behavioral changes in dogs associated with the development of idiopathic epilepsy.* Epilepsy Behav 2011; 21(2):160–167. DOI 10.1016/j.yebeh.2011.03.018. PMID 21531631. Resumen leído en Europe PMC (la ficha de PubMed devolvió una pantalla de cookies): https://europepmc.org/article/MED/21531631
    *   *Dato clave y localización (resumen, apartado Results):* 80 perros con epilepsia idiopática; tras la aparición de la epilepsia aumentó el factor «miedo/ansiedad», tanto en perros sin medicación como en los tratados con antiepilépticos.
    *   *H2:* «Cuando el miedo también es un asunto de salud».
    *   *Límites:* cuestionario a dueños que comparan el antes y el después; verificación parcial (solo resumen). No permite saber si el aumento lo produce la enfermedad, la medicación o ambas. El redactor no lo aplica al caso concreto como explicación («puede que»), solo como dato general.

4.  **Fuente 4 — Mills y cols. (2020), dolor y problemas de conducta.** Mills DS, Demontigny-Bédard I, Gruen M, et al. *Pain and Problem Behavior in Cats and Dogs.* Animals (Basel) 2020; 10(2):318. DOI 10.3390/ani10020318. PMID 32085528. https://pmc.ncbi.nlm.nih.gov/articles/PMC7071134
    *   *Dato clave y localización:* Resumen: en 100 casos recientes de perros derivados a especialistas, una estimación conservadora de alrededor de un tercio tenía algún problema doloroso, y en algunos casos cerca del 80 %. Sección 2: un animal con dolor será de forma natural más cauto y potencialmente ansioso. Simple Summary: mejor tratar primero el dolor sospechado que considerarlo solo cuando no responde a la terapia de conducta.
    *   *H2:* «Cuando el miedo también es un asunto de salud».
    *   *Límites:* comentario basado en la casuística de los autores (perros derivados, no población general).

5.  **Fuente 5 — Bhatti y cols. (2015), consenso IVETF sobre tratamiento.** Bhatti SFM, De Risio L, Muñana K, et al. *International Veterinary Epilepsy Task Force consensus proposal: medical treatment of canine epilepsy in Europe.* BMC Vet Res 2015; 11:176. DOI 10.1186/s12917-015-0464-z. PMID 26316233. https://pmc.ncbi.nlm.nih.gov/articles/PMC4552371
    *   *Dato clave y localización:* apartado del fenobarbital, «Common adverse effects»: sedación, ataxia, polifagia, polidipsia y poliuria; la mayoría dependen de la dosis, aparecen al empezar o al subir la dosis y suelen disminuir o desaparecer en las semanas siguientes por tolerancia.
    *   *H2:* «Cuando el miedo también es un asunto de salud» (H3 de medicación).
    *   *Límites:* consenso europeo; el artículo no da dosis ni pautas, solo explica por qué hay que contar los cambios al veterinario.

6.  **Fuente 6 — Podell y cols. (2016), consenso ACVIM sobre crisis.** Podell M, Volk HA, Berendt M, Löscher W, Muñana K, Patterson EE, Platt SR. *2015 ACVIM Small Animal Consensus Statement on Seizure Management in Dogs.* J Vet Intern Med 2016; 30(2):477–490. DOI 10.1111/jvim.13841. PMID 26899355. https://pmc.ncbi.nlm.nih.gov/articles/PMC4913615
    *   *Dato clave y localización:* «When Should Treatment Be Started?»: estado epiléptico = crisis de 5 minutos o más, o 3 o más crisis generalizadas en 24 horas. «What Are The Risks Of Treatment?», fenobarbital: cambios de conducta (hiperexcitabilidad, inquietud o sedación) al empezar, que suelen resolverse en 1–2 semanas; efectos crónicos sobre la sed y el apetito, con poliuria asociada.
    *   *H2:* «Cuando el miedo también es un asunto de salud» (`AlertBox danger` y H3 de medicación).
    *   *Límites:* el umbral se da como criterio para empezar tratamiento; el artículo lo usa para «llama o ve a urgencias» junto a la indicación de seguir lo que haya dicho su veterinario. No definir «crisis en racimo» con números que la fuente no da.

**Lagunas declaradas:** no hay estudios sobre «visitas en casa» como intervención en perros mayores ni sobre la puerta de bebé o la planta alta; el plan práctico se presenta como aplicación de los principios de la AAHA (evitación, protección, señales claras, no forzar), no como protocolo probado. Tampoco se encontró evidencia sólida sobre el efecto en el perro de los nervios del cuidador: ese apartado se apoya en la experiencia de la lectora y en consejos prácticos, sin atribuir un mecanismo. La relación entre la convivencia con la otra perra y el cambio posterior es la interpretación de la lectora; se cuenta como suya.

---

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

*   **Importaciones obligatorias** (primeras líneas del cuerpo):
    ```mdx
    import AlertBox from '../../components/AlertBox.astro';
    import FAQ from '../../components/FAQ.astro';
    import TarjetaRelacionada from '../../components/article/TarjetaRelacionada.astro';
    import PlanVisitaRecursos from '../../components/article/PlanVisitaRecursos.astro';
    ```
*   **Formatos semánticos:** el cuerpo no empieza con `#`. Párrafos de 3 líneas en móvil como máximo. H3 cada 150–200 palabras.
*   **Imágenes anti-CLS:** `<img src="/images/blog/perro-mayor-miedo-visitas-casa/{{NOMBRE}}.webp" alt="{{ALT}}" width="1200" height="675" loading="lazy" decoding="async" />`.
*   **TOC:** lo monta `PostReader.astro`; no añadir índice.
*   **Variante de idioma:** español neutro (guía de voz, regla 1). No es de la serie P1 aunque la lectora sea de España.
*   **Componente nuevo `PlanVisitaRecursos.astro`:** ver Sección 8 («Apoyo visual») y Sección 11.

---

## 5. ENLAZADO INTERNO OBLIGATORIO (INTERLINKING)

| Tipo | Texto ancla | URL | Estado en Inventario |
|---|---|---|---|
| **Pilar** | salud mental y emocional del perro mayor | `/salud-mental-emocional-perros` | ✅ Publicado |
| **Spoke 1** | ansiedad por separación en perros mayores | `/salud-mental-emocional-perros/ansiedad-separacion-perros-senior` | ✅ Publicado |
| **Spoke 2** | agresividad que aparece con la edad y el dolor | `/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor` | ✅ Publicado |
| **Spoke 3** | señales de disfunción cognitiva | `/salud-mental-emocional-perros/disfuncion-cognitiva-canina` | ✅ Publicado |
| **Spoke 4** | miedo a los petardos (refugio en casa) | `/salud-mental-emocional-perros/miedo-petardos-perros-mayores` | ✅ Publicado |
| **Salud** | chequeo geriátrico | `/salud-perros-mayores/chequeo-geriatrico-canino` | ✅ Publicado |
| **Calculadora** | escala de calidad de vida | `/herramientas/calculadora-calidad-vida-perros` | ✅ Publicado |

Ubicación: pilar en la introducción; spoke 1 en el H2 «Por qué a algunos perros mayores les cuesta tanto» (diferencia con quedarse solo); spoke 4 en el plan (la idea del refugio ya explicada allí, con `TarjetaRelacionada`); spoke 2 y chequeo en el H2 de salud; spoke 3 en el H3 de sentidos; calculadora en la conclusión (perro con epilepsia y cardiopatía: medir cómo está en conjunto).

---

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 2.900 palabras, justificado por un plan práctico en tres tiempos más el diferencial de salud (dolor, epilepsia, medicación).**
> El redactor debe respetar el presupuesto asignado por sección con una desviación máxima de ±15 %.

### INTRODUCCIÓN — Target: ~250 palabras

**Objetivo:** situar al lector en la escena y prometer un plan.

*   **Párrafo 1 — La escena (hecho 5):** dos mañanas con operarios en casa; una perra de unos 13 años y su cuidadora, convaleciente, pasaron esas mañanas en una habitación con la puerta cerrada. Nada más de esas mañanas: las reacciones (hecho 2) se cuentan después, como lo que le pasa en general cuando entra gente.
*   **Párrafo 2 — Procedencia:** la frase de declaración de la Sección 2 (correo de una lectora, permiso, detalles cambiados). Que no es un caso raro: a muchos perros mayores les cuesta que entre gente en casa, y a veces no se puede evitar.
*   **Párrafo 3 — Promesa:** qué señales mirar, por qué pasa, plan antes/durante/después, qué hacer cuando tiene que entrar un profesional y cuándo es algo de salud. Enlace al pilar.
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="info" title="Si a ti también te pone nervioso">
      [Validar que los nervios del cuidador son normales; adelantar que tener un plan escrito ayuda a los dos. Una o dos frases.]
    </AlertBox>
    ```

---

### H2 — Cómo saber que tu perro lo está pasando mal — Target: ~350 palabras
*   *Sustentado en:* Fuente 1 (Tabla 1).
*   *Momento de la historia:* hecho 2 (jadeo, ladridos sin fin, no se relaja).
*   `### Las señales claras y las que se escapan`
    *   Lista corta de la Tabla 1 de la AAHA: jadeo sin calor ni ejercicio, respiración rápida, temblor, lamerse los labios o la nariz, babear, más reactividad. Citar a la AAHA por su nombre con enlace.
    *   Que los dueños ven bien lo evidente (temblar, ladrar) y se les pasan las señales pequeñas: dar dos ejemplos de la tabla.
*   `### Lleva la cuenta`
    *   Qué anotar después de cada visita: qué la disparó, cuánto tardó en calmarse, si jadea también sin visitas. Remite a la hoja descargable del componente (Sección 11).

---

### H2 — Por qué a algunos perros mayores les cuesta tanto que entre gente — Target: ~450 palabras
*   *Sustentado en:* Fuente 1 (apartado *Senior Dogs and Cats*); experiencia de la lectora como interpretación suya.
*   *Momento de la historia:* hechos 1, 3, 4 y 6.
*   `### Lo que el perro trae de antes`
    *   Perra recogida de la calle, insegura desde siempre (hecho 1).
    *   Años de alerta en casa: vigilaba a la otra perra «como si fuera una oveja» y le ladraba; la lectora cree que vivía en tensión permanente. Tras la muerte de la otra perra la ve «otra perra, para bien» (hechos 3–4). Presentarlo como la lectura de la cuidadora y cerrar con un consejo, sin afirmar mecanismos: si en tu casa hay tensión entre animales, coméntalo con un profesional del comportamiento. Sin cifras ni estudios inventados.
    *   Poca costumbre de ver gente de fuera en su casa (hecho 6), contada sin culpa: apartarla fue una decisión sensata con lo que tenían.
*   `### Lo que cambia con la edad`
    *   AAHA: en perros mayores, muchos cambios de reactividad se asocian a pérdida de vista u oído y a menos flexibilidad física; perros que oyen o ven peor se sobresaltan más. Enlace a disfunción cognitiva para descartar desorientación.
    *   Diferenciar en una frase de la ansiedad por separación (enlace): aquí lo que lo dispara es que entra alguien, no quedarse solo.

---

### H2 — Antes, durante y después: el plan para cuando entra gente — Target: ~650 palabras
*   *Sustentado en:* Fuente 1 («Avoidance and safety are the cornerstones», definición de *avoidance*, «Protection is the first treatment step», señales verbales + visuales/táctiles en mayores).
*   *Momento de la historia:* hechos 6 y 10 (lo que ya hacían con la familia y coincide con lo sugerido).
*   **Componente `PlanVisitaRecursos`** (pasos interactivos antes/durante/después + descarga de la hoja; Sección 8).
*   `### Antes: su sitio tranquilo`
    *   Habitación lejos de la entrada, preparada con tiempo: su cama, agua, algo que masticar o lamer si lo disfruta, ruido de fondo suave. Que entre ahí antes de que llegue nadie, no cuando ya está alterada. Enlace a petardos (refugio) con `TarjetaRelacionada`.
    *   Pasear o dejar que haga sus necesidades antes; con poliuria esto importa (enlaza con el H2 de salud sin adelantar).
*   `### Durante: qué pedir a quien entra`
    *   No llamarla, no acercarse, no mirarla fijamente, no intentar tocarla; puerta cerrada o barrera. Si jadea o ladra, más distancia y el saludo para otro día. Tres frases que se pueden decir en la puerta (borrador corto, ajustable).
    *   ¿Quedarse con ella o no? Si la compañía la calma, quedarse un rato; si la persona está muy nerviosa, alternar con otro miembro de la casa.
*   `### Después: volver a la calma`
    *   Abrir cuando la casa haya vuelto a su olor y su ruido, paseo tranquilo, rutina normal. Anotar en la hoja.
*   `### Y tus nervios`
    *   Hecho 2: la cuidadora tampoco podía controlarse. Consejos prácticos sin atribuir un mecanismo científico: tener el plan escrito, repartir tareas, respirar antes de abrir la puerta, aceptar que algunas visitas saldrán mal. Una sola frase de empatía.
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="warning" title="Lo que no conviene hacer">
      - No obligarla a saludar ni a «acostumbrarse» de golpe con la visita delante.
      - No regañarla por ladrar o gruñir: es su forma de avisar.
      - No darle tranquilizantes, calmantes ni «algo para dormir» por tu cuenta, y menos si toma medicación para las crisis o el corazón: pregunta antes al veterinario.
      - No retirar ni cambiar su medicación porque la veas más alterada.
    </AlertBox>
    ```
    (Cuerpo del AlertBox = borrador: el redactor lo contrasta con las fuentes. La AAHA respalda los dos primeros puntos: se opone a métodos aversivos y advierte contra la exposición forzada, *flooding*; los dos últimos son coherentes con la política editorial.)

---

### H2 — Cuando tiene que entrar un profesional — Target: ~350 palabras
*   *Sustentado en:* Fuente 1 (evitación y protección; ejemplo de apartar al perro a otra parte de la casa).
*   *Momento de la historia:* hechos 5, 8 y 9.
*   `### Lo que se puede organizar`
    *   Pedir cita a primera hora, que no coincida con otra novedad; avisar al técnico de que hay una perra mayor miedosa en una habitación cerrada; dejar un cartel en la puerta («perra dentro, no abrir»); que alguien de la casa haga de enlace.
*   `### La planta de arriba con una puerta de bebé`
    *   Hecho 9 como idea que la lectora todavía no ha probado: oír y oler sin ver ni recibir a nadie. Ventajas e inconvenientes como razonamiento, sin prometer resultado: puede servir a una perra que se calma oyendo la casa, pero puede no servir si escuchar pasos la activa más; con epilepsia, una escalera es un riesgo durante una crisis, así que la barrera debe impedir que llegue a las escaleras (comprobar). Probarla primero con visitas conocidas y anotar.
    *   Cierre en tono honesto: no hay una solución perfecta cuando tiene que entrar alguien; el objetivo es que sea lo más corto y previsible posible.

---

### H2 — Cuando el miedo también es un asunto de salud — Target: ~450 palabras
*   *Sustentado en:* Fuentes 1 (condiciones médicas y conductuales se agravan entre sí), 2, 3, 4, 5 y 6.
*   *Momento de la historia:* hecho 7 (crisis, epilepsia, soplo, fenobarbital y poliuria).
*   `### Dolor y sentidos`
    *   Mills y cols.: alrededor de un tercio de los perros derivados por problemas de conducta tenían algún problema doloroso; un perro con dolor es más cauto y ansioso. Enlace a agresividad tardía y chequeo geriátrico.
*   `### Epilepsia y estrés`
    *   Forsgård y cols.: en 50 perros con epilepsia, los dueños señalaron las visitas en casa como el factor más frecuente antes de las crisis (11 de 37 perros con algún factor); explicar el límite (lo que recuerdan los dueños).
    *   Shihab y cols.: tras empezar la epilepsia, los dueños notaron más miedo y ansiedad, con o sin medicación.
    *   Conclusión práctica: en un perro con epilepsia, reducir el estrés de las visitas también es cuidar su salud. Contárselo al veterinario.
*   `### La medicación también cuenta`
    *   Bhatti/Podell: el fenobarbital puede dar sed, hambre y orinar mucho, y al principio cambios de conducta (inquietud, sedación) que suelen pasar en una o dos semanas. Por qué importa aquí: una perra que necesita salir a orinar a menudo lo pasa peor encerrada en una habitación (hecho 7). Sin dosis.
    *   El soplo: solo decir que, con una enfermedad del corazón diagnosticada, cualquier jadeo nuevo o fuera de lo habitual se comenta con el veterinario. No atribuir mecanismos sin fuente.
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="danger" title="Cuándo llamar al veterinario ya">
      - Una convulsión que dura 5 minutos o más, o tres crisis en un día, o antes si tu veterinario te ha dado otra pauta.
      - Le cuesta respirar, las encías se ven azuladas o pálidas, o el jadeo no se va cuando todo está tranquilo.
      - Se desmaya o se queda sin fuerzas.
    </AlertBox>
    ```
    (Cuerpo = borrador que el redactor contrasta. Primer punto: Podell y cols. Los otros dos son signos de urgencia general; el redactor no los atribuye a esa fuente.)

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~400 palabras
*   *Cierre del caso (hechos 4 y 8):* desde que la casa cambió, la lectora ve a su perra más tranquila; con todo lo que ha pasado, lo que más le importa es darle calma. La planta de arriba es una opción que aún no ha probado (sin desenlace). Terminar con la idea de que el plan es para los dos. Enlace a la calculadora de calidad de vida para valorar cómo está un perro con varias enfermedades en conjunto.
*   **Componente FAQ:**
    ```mdx
    <FAQ items={[
      { question: '¿Es mejor encerrar a mi perro o dejar que salude a las visitas?', answer: '[Si se altera, apartarlo en su sitio tranquilo; no forzar el saludo.]' },
      { question: '¿Puedo acostumbrar a un perro mayor a la gente de fuera?', answer: '[Posible con pasos muy pequeños y ayuda profesional; la AAHA recomienda especialista en casos graves.]' },
      { question: '¿Por qué jadea mi perro cuando viene alguien si no hace calor?', answer: '[El jadeo es una señal de ansiedad (AAHA); si también jadea en calma, al veterinario.]' },
      { question: '¿El estrés de las visitas puede provocar una crisis en un perro epiléptico?', answer: '[Los dueños lo señalan a menudo (Forsgård); es una asociación, coméntalo con tu veterinario.]' },
      { question: '¿Puedo darle algo para tranquilizarlo antes de la visita?', answer: '[Solo lo que indique su veterinario, sobre todo si ya toma medicación.]' },
      { question: '¿Qué hago si tengo que dejarlo solo mientras trabaja un técnico en casa?', answer: '[Habitación cerrada, cartel, agua, salida previa; tiempo corto.]' }
    ]} />
    ```

**Suma de targets:** 250 + 350 + 450 + 650 + 350 + 450 + 400 = 2.900.

---

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

*   **No aplica.** Una puerta de bebé o una cama encajarían, pero el caso es de una lectora y su salud es delicada: no se mezcla con recomendaciones comerciales. Sin enlaces de AliExpress.

---

## 8. GUÍA VISUAL — 3 IMÁGENES Y UN APOYO VISUAL

Flujo de producción: [crear-animaciones-articulo-blog](../.agents/skills/crear-animaciones-articulo-blog/SKILL.md). Las imágenes las genera el propietario (ChatGPT o Higgsfield) o la sesión si el conector lo permite (AGENTS.md, «Ilustraciones y dibujos»). Mientras no llegan, marcador sobrio con la huella de la marca, nunca un dibujo propio.

> [!IMPORTANT]
> **Razas ya usadas en artículos recientes** (registro de `direccion-visual-editorial.md`, comprobado el 2026-11-23): bodeguero andaluz (petardos), mestizo criollo canela (pólvora), perro de aguas español (procesionaria), beagle (picadura, se cree cachorro), mestizo de border collie (pilar movilidad), mestizo pastor-mastín (leishmaniosis), galgo español, teckel, caniche, schnauzer, setter gordon, bóxer, pastor alemán, cocker, dogo, san bernardo, golden, labrador, podenco.
> **Raza elegida y motivo:** **mestiza de tamaño mediano, pelo corto denso color crema con orejas semicaídas**, de aspecto «perra adoptada». No es de tipo pastor ni braca a propósito: así no se parece a las perras reales del caso (anonimato) y no repite ninguna raza reciente. Es creíble para el público hispano, donde la mayoría de perros adoptados son mestizos. **Sujeto ilustrativo, no la perra del caso.**

> [!IMPORTANT]
> **Sujeto fijo en las 3 imágenes:** «perra mestiza mediana, unos 13 años, pelo corto denso color crema con zonas más claras en hocico y pecho, orejas semicaídas, cola larga». Nombrada así en cada prompt.

**Bloque de edad visible (va íntegro en cada prompt):** «hocico, cejas y párpados claramente encanecidos, casi blancos sobre el crema; ojos algo hundidos y párpados un poco caídos; lomo ligeramente hundido, musculatura de los muslos menos marcada y costillas algo perceptibles bajo el pelo, como una perra mayor delgada; postura tranquila y natural; sin heridas, sin cicatrices, sin cojera ni enfermedades visibles. Rechazar si a tamaño móvil parece un adulto joven.»

### Recortes transparentes y animaciones que necesitan al perro
*   No aplica: el apoyo visual (`PlanVisitaRecursos`) no lleva perro; usa iconos geométricos (puerta, reloj, lista) hechos en código y la huella de la marca.

### Imagen 1 — Emocional (hero)
| Decisión | Contenido |
|---|---|
| Función y sección | Hero e introducción: la escena de la habitación cerrada. |
| Público, contexto y entorno | Dormitorio o salón pequeño de una vivienda española o latinoamericana corriente, sin estética de catálogo. |
| Materiales y detalles | Puerta de madera cerrada, cama de perro gastada, cuenco de agua, una manta de sofá, luz de mañana por una persiana a medio subir. |
| Sujeto | La perra mestiza crema descrita. |
| Edad visible | Bloque íntegro. |
| Acción y relaciones | Perra tumbada en su cama con la cabeza levantada y las orejas hacia la puerta, boca cerrada, atenta; persona adulta con ropa de casa sentada en el suelo a su lado, con una mano apoyada en el suelo cerca de ella, sin abrazarla y sin ninguna señal de lesión. |
| Cámara, luz, texturas | Plano medio a la altura de la perra, 35 mm, luz natural lateral de la ventana, profundidad de campo moderada; textura del pelo y de la manta. Fotoperiodismo doméstico. |
| Exclusiones y aceptación | Rechazar: perra joven, sonrisa de catálogo, dientes enseñados, persona mirando a cámara, puerta abierta, gente de fuera visible. Aceptar si a 390 px se ven las canas y la puerta cerrada. |

*   **Nombre de archivo SEO:** `perra-mayor-habitacion-tranquila-visitas.jpg` (se publica como `.webp`)
*   **Prompt visual:** «Documentary-style home photograph, medium shot at dog eye level, 35mm, natural side light from a half-raised roller blind in a modest Spanish bedroom. A medium-sized mixed-breed senior female dog, about 13 years old, short dense cream coat with paler muzzle and chest, semi-floppy ears, long tail, lies on a worn dog bed with her head raised and ears turned toward a closed wooden door, mouth closed, attentive. Muzzle, eyebrows and eyelids clearly greyed almost white over the cream; eyes slightly sunken with slightly droopy lids; slightly sagging back, less defined thigh muscles and ribs faintly visible under the coat like a thin elderly dog; calm natural posture; no wounds, scars, limp or visible illness. Beside her, an adult in casual home clothes sits on the floor, no visible injury, one hand resting on the floor near the dog, not hugging her, looking at the dog. Water bowl, a sofa throw, plain walls. Moderate depth of field, real fur and fabric texture, quiet mood, no stock-photo look. Reject if at mobile size the dog looks like a young adult.»
*   **Caption:** Una habitación preparada antes de que llegue nadie: cama, agua y la puerta cerrada.

### Imagen 2 — Resolutiva (plan: zona segura)
| Decisión | Contenido |
|---|---|
| Función y sección | H2 del plan, H3 «Antes: su sitio tranquilo». |
| Entorno | Rincón de una habitación al fondo de la casa, lejos de la entrada. |
| Materiales y detalles | Cama, cuenco de agua, juguete para lamer o mordedor, una radio pequeña apagada o encendida a bajo volumen, una puerta entreabierta en segundo plano. |
| Sujeto | La misma perra mestiza crema. |
| Edad visible | Bloque íntegro. |
| Acción | La perra lame tranquilamente un juguete relleno, tumbada; nadie más en el plano. |
| Cámara, luz | Plano general corto ligeramente cenital, luz suave de tarde, profundidad de campo moderada. |
| Exclusiones y aceptación | Rechazar: jaula, correa, perra joven, objetos de marca visibles, juguetes de colores chillones. |

*   **Nombre de archivo SEO:** `zona-segura-perra-mayor-visitas.jpg`
*   **Prompt visual:** «Documentary home photograph, short wide shot slightly from above, soft late-afternoon window light, in a quiet back room of a modest Spanish home. The same medium-sized mixed-breed senior female dog, about 13 years old, short dense cream coat with paler muzzle and chest, semi-floppy ears, long tail, lies on her bed calmly licking a stuffed rubber chew toy held between her front paws. Muzzle, eyebrows and eyelids clearly greyed almost white over the cream; eyes slightly sunken with slightly droopy lids; slightly sagging back, less defined thigh muscles and ribs faintly visible under the coat like a thin elderly dog; calm natural posture; no wounds, scars, limp or visible illness. A water bowl, a small radio, a folded blanket; a door slightly ajar in the background. No people. Moderate depth of field, natural textures, no crate, no leash, no brand logos, no stock-photo look. Reject if at mobile size the dog looks like a young adult.»
*   **Caption:** Su rincón, lejos de la entrada y listo antes de la visita.

### Imagen 3 — Educativa (profesional en casa)
| Decisión | Contenido |
|---|---|
| Función y sección | H2 «Cuando tiene que entrar un profesional». |
| Entorno | Pasillo y escalera interior de una casa de dos plantas. |
| Materiales y detalles | Puerta de bebé de madera blanca bien cerrada en lo alto de la escalera, alfombra antideslizante, al fondo de la planta baja la silueta desenfocada de un operario con caja de herramientas. |
| Sujeto | La misma perra mestiza crema. |
| Edad visible | Bloque íntegro. |
| Acción | La perra está en el rellano de arriba, tumbada a un metro de la barrera, con las orejas atentas pero el cuerpo relajado; no asoma la cabeza entre los barrotes; no hay nadie con ella en el plano. |
| Cámara, luz | Plano desde el rellano superior, a la altura de la perra, mirando hacia abajo; operario fuera de foco abajo. Luz interior cálida. |
| Exclusiones y aceptación | Rechazar: perra pegada a la barrera o subida a ella, barrera abierta o mal fijada, operario mirando a la perra, perra joven. La barrera debe estar arriba de la escalera, separando a la perra del primer peldaño. |

*   **Nombre de archivo SEO:** `perra-mayor-planta-alta-puerta-bebe.jpg`
*   **Prompt visual:** «Documentary home photograph from the upper landing of a two-storey Spanish house, at dog eye level, looking down the staircase. The same medium-sized mixed-breed senior female dog, about 13 years old, short dense cream coat with paler muzzle and chest, semi-floppy ears, long tail, lies on a non-slip rug about one metre behind a closed white wooden baby gate fixed at the top of the stairs, ears alert but body relaxed. Muzzle, eyebrows and eyelids clearly greyed almost white over the cream; eyes slightly sunken with slightly droopy lids; slightly sagging back, less defined thigh muscles and ribs faintly visible under the coat like a thin elderly dog; calm natural posture; no wounds, scars, limp or visible illness. Downstairs, out of focus, a workman with a toolbox walks past without looking up. Warm interior light, natural textures, no stock-photo look. The gate is fully closed and the dog cannot reach the first step. Reject if at mobile size the dog looks like a young adult.»
*   **Caption:** Arriba, con la barrera cerrada, puede oír y oler la casa sin cruzarse con nadie.

### Apoyo visual — `PlanVisitaRecursos.astro`
*   **Qué es:** componente del artículo (patrón de `PolvoraRecursos.astro`) con tres pestañas o pasos «Antes / Durante / Después», cada uno con 4–5 acciones cortas marcables, y un botón de descarga de la hoja de registro de visitas.
*   **Móvil:** pasos apilados con botones grandes; nada de tablas anchas ([apoyos visuales responsive](../.agents/skills/references/apoyos-visuales-responsive.md)). Modo oscuro con los tokens del sitio. Teclado y lector de pantalla: pestañas con roles ARIA o, más simple, `<details>`.
*   **Sin dibujos de perros ni personas:** iconos geométricos (puerta, reloj, lista) y la huella de la marca.
*   **Hoja descargable:** PDF de una página A4 «Registro de visitas» con columnas: fecha, quién entró, cuánto tiempo, dónde estaba el perro, señales (jadeo, ladridos, temblor…), cuánto tardó en calmarse, si jadea también sin visitas, notas para el veterinario. Ruta: `public/descargas/registro-visitas-perro-mayor.pdf`, generada por script como la hoja HHHHHMM.

---

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen real:** entre **2.465 y 3.335 palabras** (2.900 ± 15 %), contadas sobre el cuerpo `.mdx`.

**2. Fuentes citadas por nombre en el cuerpo:**
| # | Fuente | H2 asignado | ¿Citada en el artículo final? |
|---|---|---|---|
| 1 | AAHA (Hammerle y cols., 2015) | Cómo saber…; Por qué…; Antes, durante y después; Cuando tiene que entrar un profesional; Salud | ☐ |
| 2 | Forsgård y cols., 2019 | Cuando el miedo también es un asunto de salud | ☐ |
| 3 | Shihab, Bowen y Volk, 2011 | Cuando el miedo también es un asunto de salud | ☐ |
| 4 | Mills y cols., 2020 | Cuando el miedo también es un asunto de salud | ☐ |
| 5 | Bhatti y cols., 2015 (IVETF) | Cuando el miedo también es un asunto de salud | ☐ |
| 6 | Podell y cols., 2016 (ACVIM) | Cuando el miedo también es un asunto de salud (AlertBox danger y H3 de medicación) | ☐ |

**3. Componentes:**
- [ ] 3 `AlertBox`: `info` (introducción), `warning` (plan), `danger` (salud).
- [ ] 1 `FAQ` con 6 preguntas.
- [ ] Enlace a la calculadora de calidad de vida.
- [ ] Enlaces internos de la Sección 5.
- [ ] `PlanVisitaRecursos` funcionando en móvil y escritorio, con la descarga abriendo un PDF real.

**4. Arco documentado:**
- [ ] Apertura con la escena de la habitación (hecho 5) en la introducción.
- [ ] Hechos 1–4, 6, 7, 9 y 10 dentro de sus H2, cada uno enlazado con explicación y acción.
- [ ] Cierre (hechos 4 y 8) en la conclusión, sin inventar resultados de la planta de arriba.

**5. Anonimato y doble aprobación (específico de este artículo):**
- [ ] Ningún nombre propio de personas ni de perras del caso; sin razas del caso; sin fecha de la eutanasia; sin accidente, baja ni humedades.
- [ ] Borrador en `borradores/`, nunca en `src/content/blog/` antes de las dos aprobaciones; sin PR hasta entonces.
- [ ] Visto bueno del propietario al texto auditado.
- [ ] PDF enviado a la lectora en respuesta a su correo (texto del correo aprobado por el propietario).
- [ ] Respuesta de la lectora y cambios aplicados según el recuadro inicial; registro mínimo en el repositorio (fecha y número de cambios).
- [ ] Aprobación final del propietario. Solo entonces se sube el `.mdx` con `status: "Publicado"` y fecha real, PR y merge.

---

## 10. CHECKLIST DE VALIDACIÓN FINAL DEL REDACTOR

**En este brief:**
- [x] Frontmatter con `pilar` válido (`salud-mental-emocional-perros`).
- [x] seoTitle 48 y metaDescription 147 caracteres (contados con Python).
- [x] Seis fuentes con URL profunda, DOI y PMID comprobados; Shihab con verificación parcial (solo resumen) declarada.
- [x] Enlaces internos a artículos publicados que existen en `src/content/blog/`.
- [x] Sin canibalización: el inventario no tiene ningún artículo sobre visitas o personas ajenas en casa; los más cercanos (petardos, pólvora, separación, ferias P1-25, ruido urbano P1-29) tratan otro disparador.
- [x] Suma de targets = 2.900.
- [x] Tabla de trazabilidad completa.

**En el `.mdx` final:** los puntos del template (importaciones, sin H1, párrafos cortos, H3 cada 150–200 palabras, alt fieles, recuento real, fuentes citadas, 3 AlertBox, FAQ, calculadora) más la Sección 9.5.

## 11. RECURSOS PROMETIDOS Y GATE EDITORIAL

| Recurso y utilidad | Ubicación | Ruta/destino | Estado y responsable | Prueba previa a publicación |
|---|---|---|---|---|
| Pasos interactivos antes/durante/después | H2 del plan | `src/components/article/PlanVisitaRecursos.astro` | Planificado — redactor | Recorrer en móvil (390 px) y escritorio, modo oscuro, teclado |
| Hoja de registro de visitas (PDF A4) | H2 señales y componente | `public/descargas/registro-visitas-perro-mayor.pdf` | Planificado — redactor | Abrir el PDF real desde el botón; comprobar tipo y contenido |
| 3 ilustraciones | Hero, plan, profesionales | `public/images/blog/perro-mayor-miedo-visitas-casa/` | Planificado — propietario o sesión con conector | Inspección a tamaño grande y a 390 px (edad, barrera cerrada, sin gente de fuera visible en la 1) |
| PDF del artículo para la lectora | Fuera del sitio (correo) | `docs/contenido/perro-mayor-miedo-visitas-casa/` (anonimizado) | Planificado — tras la auditoría del artículo | Abrir el PDF, comprobar que no contiene datos identificativos ni instrucciones internas |

- [ ] Extensión y cada H2 justificados por una respuesta distinta, sin relleno.
- [ ] Registro fuente→afirmación→localización completo (Sección 3).
- [ ] Procedencia de la lectora declarada; ilustraciones identificadas como tales por la firma global.
- [ ] Sin pautas de fármacos para el lector; fenobarbital solo como efectos descritos por las fuentes.
- [ ] Cada recurso prometido operativo antes de publicar o promesa retirada.
- [ ] Historial de auditoría numerado: R1 hecha (NO APTO por privacidad); R2 hecha (APTO con observaciones; P1-1, P1-2, P1-3, P2-1 y P2-3 corregidos el 2026-11-23 quitando o acotando texto; P0-1 y P2-4 resueltos por decisión del propietario de mantener el caso anonimizado en el repositorio público). Por cambios sustanciales tras R1, el propietario autorizó una ronda adicional: máximo R4.
