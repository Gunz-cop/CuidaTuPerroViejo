# Auditoría: poliquezia (reescritura de tono y primera persona, PR #132)

- **Archivo:** `src/content/blog/mi-perro-viejo-defeca-mucho-poliquezia.mdx`
- **Versión auditada:** `main` @ `26f9b77`, blob `0d92311` (commit de tono `97cd391`, frente a `97cd391^`)
- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Auditor:** sesión independiente. No se corrigió nada.
- **Contrato:** `briefings/briefing-mi-perro-viejo-defeca-mucho-poliquezia.md` (2026-10-14). Es anterior a la reescritura editorial del 16-oct y quedó desfasado (ver «Contrato» más abajo). El §2 del brief, que trae el relato literal del dueño, se usó como **procedencia** para verificar la primera persona.

## Veredicto

**NO APTO.** El bloqueo principal es preexistente: la línea 56 atribuye al manual MSD de colitis que «la indiscreción alimentaria puede ser un motivo de alteración digestiva», y esa página no lo dice. A eso se suman dos frases que la reescritura amplió en lo clínico (líneas 42 y 58).

**Primera persona (lo que se pidió verificar expresamente): sin datos, diagnósticos ni desenlaces añadidos.** Cada hecho sobre Dakota y Luna se puede rastrear hasta el relato literal del brief (tabla más abajo).

Plano mecánico: `metricas.mjs` da 18 bloqueos contra el brief (volumen −75 a −89 % por sección, fuentes fuera de su H2, StatPearls ausente, 3 enlaces obligatorios y FAQ de 3 en vez de 7). **Los 18 son idénticos en la versión anterior a la reescritura**: no los introdujo el PR #132. Nacen de que el brief es anterior al recorte del 16-oct. Plano manual: levantado.

## Verificación de la primera persona

| Artículo (ahora) | Relato literal (brief §2) | ¿Añade algo? |
|---|---|---|
| «Dakota llegó adoptada con nueve años» | «cuando la adoptamos con 9 años» | No |
| «En el relato pesaba 23 kg» | «Dakota ha llegado a pesar 23 kilos» | No (atribuido al relato) |
| «tenía un apetito voraz» | «tiene un apetito voraz» | No |
| «acceso de vez en cuando a la comida que deja Luna» | «cuando Luna se pone quisquillosa… Dakota entra… en su plato» / «siempre se nos escapa» | No (mismo «ocasional» de antes) |
| «Contábamos cuatro o cinco deposiciones diarias en Dakota y tres o cuatro en Luna» | «Luna 3 o 4 veces al día, y Dakota hasta 5 veces al día» | No hay cifra nueva. Matiz: «Contábamos» presenta como recuento lo que el relato da como estimación («hasta 5»). P2. |
| «pérdida de peso en Luna» | «ha comenzado a perder mucho peso» | No |
| «extras de comida que se repartían» | cartílagos «a las dos»; aditivos a Luna | No |
| «Cuando lo escribimos, todavía no habíamos descubierto por qué» | «todavía no hemos descubierto por qué están defecando tanto» | No |
| «Aquí no hay diagnóstico ni desenlace documentado» | — | Se mantiene el límite |

No aparecen diagnósticos, visitas, dosis ni desenlaces. Tampoco se recupera la recomendación veterinaria del relato sobre las comidas de Luna, que ya estaba fuera y sigue fuera.

Detalles de la primera persona (P2):
- **Línea 52, «la comida que compartían»:** el pasado puede sugerir que dejaron de compartirla, que sería un desenlace no documentado. Mejor «que comparten» o «que compartían cuando lo escribimos».
- **Línea 26, «relato del propietario del sitio sobre nuestras dos perras»:** mezcla tercera y primera persona en la misma frase. Mejor: «Esta guía nació de lo que vivimos con nuestras dos perras, Dakota y Luna.» El cierre de fuentes (línea 110) ya declara «experiencia aportada por el propietario».
- **Registro de la aprobación:** `TODO.md:16` sigue sin marcar («Confirma que te parece bien»). La consigna de esta auditoría dice que el dueño aprobó la primera persona. Conviene marcarlo con la fecha para que la procedencia quede documentada en el repo (§3 de calidad editorial).

## Hallazgos

### P0 (preexistente; nace en el brief)

**1. Línea 56: el MSD de colitis no dice lo que se le atribuye.**
Artículo: «La indiscreción alimentaria puede ser un motivo de alteración digestiva, como señala el [manual MSD de colitis](…).»
Fuente (MSD, Allison Collier, revisada en junio de 2025; texto descargado y buscado): las causas que enumera son «infectious (bacterial, parasitic, fungal), traumatic, uremic, and allergic causes» y «an exaggerated reaction to dietary or bacterial factors» (mecanismo inmune). La página no contiene «indiscretion». El error viene del brief, §3, fuente 2: «La indiscreción alimentaria… es causa común de colitis aguda». **Hay que avisar a quien audite briefs** por si el dato está copiado en otros.
**Corrección:** buscar una página que lo diga de verdad (por ejemplo, la del MSD/Merck sobre diarrea o gastroenteritis aguda en perros), abrirla y comprobar la frase antes de citarla. Si no aparece, quitar la atribución: «Las sobras y la comida robada pueden alterar la digestión, así que anótalas. Eso no significa…».

### P1 (ampliaciones clínicas de la reescritura)

**2. Línea 42: diagnóstico por el conjunto de signos.**

| Antes | Ahora |
|---|---|
| «El número aislado no permite diagnosticar tránsito acelerado, colitis o malabsorción.» | «El tránsito acelerado, la colitis o la malabsorción **se diagnostican con ese conjunto**, no con el número.» |

«Ese conjunto» es «su propio patrón y el resto de signos», es decir, lo que observa el tutor. Ahora la frase dice que con eso se diagnostica. Contradice la línea 36 («la causa se busca con las pruebas») y el §4 de calidad editorial (no diagnosticar por aspecto).
**Corrección:** «Con el número solo no se diagnostica tránsito acelerado, colitis ni malabsorción: lo hace tu veterinario con ese conjunto, la exploración y las pruebas.»

**3. Línea 58: suplementos «cuando se conozca la causa».**

| Antes | Ahora |
|---|---|
| «No retires alimento completo ni añadas fibra, aceites o suplementos para compensar una causa que aún no conoces.» | «Mantén su alimento completo y **espera a conocer la causa antes de añadir** fibra, aceites o suplementos.» |

La versión nueva deja implícito que, una vez conocida la causa, el tutor los añade. Choca con el AlertBox de la línea 81 («No… uses… suplementos por tu cuenta») y con el §4 de calidad editorial.
**Corrección:** «Mantén su alimento completo y añade fibra, aceites o suplementos solo si tu veterinario lo indica.»

### P2

| Línea | Antes → ahora | Problema |
|---|---|---|
| 68 | Weber: «No demostraron que añadir fibra resuelva poliquezia» → «Su estudio es de saciedad: **no midió la poliquezia**…» | Pasa de un límite de conclusión a una afirmación sobre el método. Según el resumen (PMID 18196727) no hay ningún desenlace fecal salvo la digestibilidad proteica, pero el texto completo dio 403. Mejor: «Su estudio es de saciedad y no estudió la poliquezia…», o volver a la forma anterior. |
| 70 | Bosch: «no una demostración de menor frecuencia» → «sin datos sobre la frecuencia» | Verificado en el texto completo de Cambridge: informa consistencia fecal (sin efecto, P = 0,590) y materia seca, y pesa las heces, pero no da frecuencia. La Tabla 3 es una imagen y no se pudo leer. La frase nueva se sostiene. |
| 72 | «mecanismo hormonal probado en estas perras» → «aplicable a estas perras» | Antes decía «no probado» y ahora «no aplicable», que es más tajante. Mejor «probado en». |
| 16 | «no identifican una enfermedad» → «no señalan una enfermedad **concreta**» | Reduce el alcance: deja entender que sí apuntan a «alguna» enfermedad. |
| 52 | «puede aclarar» → «ayuda a aclarar»; «reduzca necesariamente» → «haya reducido» | Se quitan modales. Menor. |
| 16, 28, 52 | «no señala(n)» ×3, «Eso no significa», «dicen poco», «no ofrecen» | Son las mismas salvedades con verbos que `tono.py` no detecta: el 0,0/1000 es literal, no de fondo. La línea 28 sí debe conservar su salvedad (es la declaración de procedencia). Las de las líneas 16 y 52 se pueden reescribir en afirmativo. |
| 26, 16, 94, 58 | Densidad | Párrafos de más de 50 palabras: 4 % → **17 %** (69, 54, 53 y 51 palabras). La línea 26 (69) ya era larga. Las otras tres crecieron con la reescritura. Media 39, mediana 38. Partir la 26 y la 94. |
| 64 | Merck EPI: «apetito conservado o aumentado» | Preexistente. Merck (Steiner, septiembre de 2025) dice «polyphagia» (aumentado). «Conservado» no aparece. |
| 40, 50 | WSAVA: «marco para evaluar animal, dieta y alimentación», «recomienda valorar el conjunto» | Preexistente. La URL es la portada de las guías. El marco está en los documentos enlazados desde ahí (lista de comprobación e historia dietética), no en la página citada. Mejor una URL profunda. |

## Contrato (brief) desfasado: no son fallos del PR #132

- El volumen de 6.000 a 6.900 palabras, la FAQ de 7 preguntas, los 3 enlaces y StatPearls fallan exactamente igual antes de la reescritura de tono.
- El §2 y el §9 del brief exigían cerrar con un desenlace («el protocolo… resuelve el cuadro»), y el §8 pedía pies como «Separar los platos… fue el cambio que más impactó». Ese desenlace no está documentado. El artículo hace bien en no inventarlo: es la honestidad editorial que hay que proteger.
- El §3 del brief atribuía a WSAVA un rango «1-3 defecaciones diarias» que la página no contiene. El artículo dice lo contrario («sin un máximo…»), y está bien.
- Recomendación: rehacer o auditar el brief con `auditar-briefing-contenido` en otra sesión antes de usarlo otra vez como contrato.

## Fuentes: afirmación → localización → comprobación

| Fuente | Afirmación | Comprobación (2026-10-21) |
|---|---|---|
| WSAVA Global Nutrition Guidelines | Marco de evaluación; sin máximo de deposiciones (líneas 40 y 50) | La portada abre y no fija un número de deposiciones. El marco no está en esa página (P2). |
| MSD, *Colitis in Small Animals* | Aumento de frecuencia, poco volumen, esfuerzo, moco o sangre (línea 36) | **Sí:** «increased urgency and frequency of defecation, with decreased fecal volume…», mucus, hematochezia, tenesmus. |
| MSD, *Colitis* | Indiscreción alimentaria (línea 56) | **No lo dice** (P0). |
| Weber M et al., J Vet Intern Med 2007;21(6):1203-8, PMID 18196727 | Menor ingesta voluntaria con dieta alta en proteína y fibra en perros adultos (línea 68) | Autoría, año, revista y resultado coinciden (6 hembras adultas; ingesta un 51 % y un 47 % menor). Texto completo: 403. |
| Bosch G et al., Br J Nutr 2009;102(2):318-25, PMID 19144213 | 16 perros adultos sanos; sin efecto en hormonas; tendencia a menor ingesta (línea 70) | Coincide: «No treatment effects… glucose, PYY, GLP-1 and ghrelin»; VFI P = 0,058. |
| Merck, *EPI in Dogs and Cats* | Heces voluminosas, pérdida de peso, apetito conservado o aumentado (línea 64) | Coincide salvo «conservado» (P2). |

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Hero | `…/mi-perro-viejo-defeca-mucho-frecuencia-fecal.webp` | Playwright 390/1366 | Carga. Beagle tricolor en un paseo. El alt dice que no es Dakota y la línea 30 declara IA. Correcto. |
| Tabla de registro | Cuerpo | Render a 390 px | 493 px de alto, sin scroll. «Puedes copiar la tabla» no promete descarga. |
| Enlaces internos (3) | comida casera, incontinencia fecal, pilar | Rutas compiladas | OK en local |
| Imágenes en disco sin usar | `chequeo-veterinario…`, `perros-senior-comiendo-separados…`, `…-400.webp` | — | No se referencian. No hay nada roto, pero sobran en el repo. |

Comprobación solo local (`npx astro build` OK). No se verificó producción.

## Lo que sí funciona

- **Líneas 26 a 30:** la procedencia queda declarada, con «no hay diagnóstico ni desenlace documentado» y la declaración de IA en las imágenes. El brief empujaba a inventar un final y el artículo no lo hace. No tocar.
- Weber y Bosch se citan con autoría, año y muestra correctos, y con su alcance real (saciedad, no poliquezia).
- La línea 62 queda mejor que antes: «23 kg pueden ser mucho para un perro y poco para otro».
- Los AlertBox danger y warning (líneas 44 y 80) están intactos.
- `tono.py`: 7,4 → 0,0/1000. De tú en todo el texto, sin fugas del brief.

## Qué corregir, en orden

1. Línea 56 (P0): sustituir o retirar la atribución al MSD.
2. Líneas 42 y 58 (P1), con los textos propuestos.
3. Densidad: partir las líneas 26 y 94. Primero partir, después ajustar el texto.
4. P2 al tocar el archivo: líneas 52 («comparten»), 26 (voz), 68 (Weber), 72 y 64.
5. Marcar `TODO.md:16` con la aprobación del dueño y su fecha.

Prompt para la sesión correctora:

> En `src/content/blog/mi-perro-viejo-defeca-mucho-poliquezia.mdx` (rama propia, no `main`): (1) línea 56: la página MSD de colitis no menciona la indiscreción alimentaria. Busca una página MSD/Merck que lo diga (por ejemplo, diarrea o gastroenteritis aguda en perros), ábrela, comprueba la frase y enlázala. Si no la encuentras, deja «Las sobras y la comida robada pueden alterar la digestión, así que anótalas.» sin atribución. (2) Línea 42: «Con el número solo no se diagnostica tránsito acelerado, colitis ni malabsorción: lo hace tu veterinario con ese conjunto, la exploración y las pruebas.» (3) Línea 58: «Mantén su alimento completo y añade fibra, aceites o suplementos solo si tu veterinario lo indica.» (4) Línea 26: empieza con «Esta guía nació de lo que vivimos con nuestras dos perras, Dakota y Luna.» y parte el párrafo en dos; no añadas ni quites ningún dato. (5) Línea 52: «la comida que comparten». (6) Línea 68: «Su estudio es de saciedad y no estudió la poliquezia ni nada parecido al robo de comida de Dakota.» (7) Línea 72: «probado en estas perras». (8) Línea 64: «con apetito aumentado». (9) Parte la línea 94 en dos párrafos. No cambies nada más. Comprueba que `tono.py` sigue ≤ 3/1000 y que `npx astro build` pasa. Avisa también a quien audite briefs del error del §3 (fuente 2) del brief.
