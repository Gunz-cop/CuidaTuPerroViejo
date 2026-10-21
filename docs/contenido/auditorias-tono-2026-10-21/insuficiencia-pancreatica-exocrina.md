# Auditoría de tono — insuficiencia pancreática exocrina (ronda T1)

- **Archivo:** `src/content/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion.mdx`
- **Versión auditada:** `main` @ `26f9b77`, SHA-256 `eac3aa3b9989b8f81f2dbd951e6c761fe8c56c54b2333a86a93ff1d3427b9d3e`
- **Cambio auditado:** commit `149daf7` (PR #136), reescritura de voz. Consigna: no cambiar afirmaciones clínicas, fuentes, enlaces ni datos.
- **Ronda:** T1 de un máximo de tres para esta edición de tono. Fecha: 2026-10-21.
- **Brief:** no existe (`briefings/` ni `docs/contenido/`). Se audita contra la guía de voz y tono y la guía de calidad editorial.

## Veredicto

**No publicable (NO APTO):** la reescritura vinculó dos frases a fuentes que no dicen lo que ahora se les atribuye (Williams y Batt 1988; Merck sobre grasa y fibra).

- **Mecánico:** `tono.py` da 0,0/1000 (antes, 5,9). Densidad de párrafo correcta (media 36, mediana 37, 10 % por encima de 50 palabras). El script marca 3 bloqueos por falta de brief y por el formato del bloque de fuentes. Ya existían antes del PR y no se deben al tono.
- **Manual:** se contrastaron las 13 frases cuyo sentido cambió y las fuentes que las sostienen. Las imágenes se abrieron.

## Hallazgos

### P1 — bloqueantes (fuente → afirmación)

**B1. Línea 47: comparación que el estudio no hizo.**

| Antes (`149daf7^`) | Ahora |
|---|---|
| «Sus resultados apoyan la prueba en esa población, **no** un diagnóstico basado solo en síntomas.» | «Sus resultados apoyan la prueba en esa población **frente a** un diagnóstico basado solo en síntomas.» |

Williams y Batt (1988, PMID 3258306; resumen leído en PubMed el 2026-10-21) compararon la TLI con la prueba de bentiromida y con la actividad proteolítica fecal, en 25 perros con IPE, 100 controles y 50 perros con enfermedad intestinal. No la compararon con un diagnóstico basado en síntomas. El original no atribuía ninguna comparación al estudio; la versión nueva sí lo hace. Es una afirmación atribuida a una fuente que no la contiene (§2 y §6 de calidad editorial).

**Corrección propuesta:** «Sus resultados apoyan la prueba en esa población; el diagnóstico se apoya en ella y no solo en los síntomas.»

**B2. Línea 82: los dos puntos atribuyen a Merck algo que Merck no dice.**

| Antes | Ahora |
|---|---|
| «…explica el manejo dietético individual y la necesidad de valorar la respuesta. No todos los perros necesitan la misma restricción de grasa o fibra.» | «…explica el manejo dietético individual y la necesidad de valorar la respuesta: la grasa y la fibra se ajustan a cada perro.» |

Esto dice el Merck Veterinary Manual (copia guardada en `docs/seo/correccion-editorial-2026-10-16/evidencias/fuentes/0dbc872ccefcc251.txt`): *«Feeding low-fat diets… may further decrease fat assimilation… and is thus not recommended»* y *«a diet low in insoluble or nonfermentable fiber should be fed»*. Es una pauta general: no restringir la grasa y dar poca fibra insoluble. Cridge y colaboradores (2024) dicen lo mismo en su resumen: *«low-residue diets with moderate fat content»*. La frase original ya era imprecisa, porque daba a entender que algunos perros necesitan restringir la grasa. Los dos puntos la convierten además en una afirmación atribuida a Merck.

**Corrección propuesta:** «El [Merck Veterinary Manual sobre IPE](…) desaconseja restringir la grasa y recomienda una dieta baja en fibra insoluble; a partir de ahí, tu veterinario ajusta según cómo responda tu perro.» La corrección añade contenido de la fuente, así que conviene que el dueño la apruebe. La alternativa mínima es volver a separar las dos frases, pero se mantendría la imprecisión anterior.

### P2 — menores

| Línea | Antes → ahora | Efecto | Propuesta |
|---|---|---|---|
| 65 | «ese **resumen** no establece cómo preparar…» → «el **estudio** no describe cómo preparar cada formulación» | Pasa de una afirmación sobre el resumen a una sobre el texto completo, que no consta como leído (la verificación del 16-oct fue de resumen). | «el resumen del estudio no describe cómo preparar cada formulación». |
| 55 | ecografía «no reemplaza automáticamente» → las pruebas de función «siguen siendo necesarias» | El alcance se amplía un poco y pasa a ser absoluto. Es clínicamente razonable. | Aceptable; se puede dejar. |
| 17 | «La apariencia de las heces no permite diagnosticarlo» → «Las heces te dan pistas; el diagnóstico sale de las pruebas» | Añade un valor orientativo de las heces. Es coherente con el H2 de síntomas. | Aceptable. |
| 76 | «No es correcto afirmar que la vía oral sea necesariamente ineficaz al inicio» → «La vía oral también puede funcionar desde el inicio» | **No cambia el sentido**: «no necesariamente ineficaz» equivale lógicamente a «puede ser eficaz». Ver la verificación más abajo. El H3 no cita ninguna fuente para la frase. | Añadir el enlace a Merck (que da la vía oral como alternativa) o a Chang et al. (2022, PMC9511088). |
| 116-121 | FAQ sin reescribir | Mantiene la voz anterior: «No debe asumirse que la vía oral es siempre ineficaz», «deben revisarse». `tono.py` no mide las FAQ. | Pasarlas a la voz nueva sin cambiar su contenido. |
| 22 | «Las imágenes son ilustraciones» | Las dos imágenes parecen generadas por IA y el pie no lo declara (§3). Ya era así antes del PR. | «Ilustraciones generadas con IA». |

### Verificación pedida: «La vía oral también puede funcionar desde el inicio»

| Fuente | Qué se pudo leer | Qué dice sobre la vía oral |
|---|---|---|
| Cridge, Williams y Barko (2024), *JAVMA* 262(2):246-255, PMID 37944252, DOI 10.2460/javma.23.09.0505 | Solo el resumen (PubMed). El texto completo en avmajournals.avma.org y en ResearchGate devuelve 403 o un muro anti-bot. | El resumen dice «supplementation of cobalamin» y no menciona la vía. **No se pudo comprobar en el texto completo.** |
| Cridge (sin fecha), *Today's Veterinary Practice*, «Canine and Feline Exocrine Pancreatic Insufficiency» (mismo primer autor) | Página abierta | «Oral and subcutaneous cobalamin supplementation are equally effective in correcting B12 deficiency.» |
| Merck Veterinary Manual, EPI (ya citado en el artículo) | Copia del 16-oct | Suplementar «either parenterally… or orally», con la vía oral como alternativa desde el principio. |
| Chang et al. (2022), *JVIM*, PMC9511088 (no citado) | Texto completo (EuropePMC) | Ensayo aleatorizado: 9 perros con IPE recibieron cobalamina oral desde el inicio, y ninguno quedó por debajo de 400 ng/L en las revisiones. Conclusión: «Oral supplementation is an alternative». |

**Conclusión:** la frase nueva conserva el sentido clínico de la original y está respaldada en el fondo. La reescritura no cambió el alcance. El punto débil, que ya existía antes, es que el H3 no enlaza la fuente que la sostiene, y la única revisión que el artículo asocia al manejo de la cobalamina (Cridge) no se pudo leer completa.

### Las otras frases con cambio de sentido revisadas

Sin cambio de alcance clínico: el AlertBox de apertura, el origen de la IPE (línea 33), Grützner (línea 51), la medida del preparado (línea 59), triturar o abrir solo con autorización (línea 63), «Si no mejora, pide que lo revisen» (línea 78), los aceites y MCT (línea 84), Watson (líneas 92-94), el bloque de diabetes (línea 98), el pronóstico de Cridge (línea 104, con «plazo fijo» añadido) y la herramienta (línea 114).

## Lo que sí funciona

- El tono queda en 0/1000 y el texto mantiene los límites que había que mantener: no hay dosis de B12 ni calendario, no hay umbral de cTLI, «no es "100% controlable"» sigue en pie y las cifras de Watson siguen presentadas como «cuatro perros, no una esperanza de vida».
- La advertencia de no ajustar la insulina por una deposición pasó al final del H3 y sigue presente. No hay que tocarla.
- El AlertBox urgente (danger) no cambió.
- Las imágenes coinciden con su alt: un setter senior blanco y negro en una cama, y una cuchara medidora con polvo sobre comida húmeda.

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Enlaces internos (4) | `/salud-perros-mayores/mi-perro-viejo-defeca-mucho-poliquezia`, `/alimentacion-perros-senior/comida-casera-perros-mayores`, `/herramientas/calculadora-calidad-vida-perros`, `/salud-perros-mayores` | Mismos destinos antes y después (diff). Build no verificado en esta sesión: el contenedor no tiene `node_modules` y `npx astro build` resolvió Astro 7.4.1 ajeno al repo | Sin cambios en los enlaces |
| Imágenes (2) | hero y preparación | Archivos en disco, abiertos | OK |

Solo se comprobó en local. La URL pública no se comprobó.

## Qué corregir, en orden

1. B1 (línea 47) y B2 (línea 82), en una sesión aparte. No la abre esta auditoría.
2. Las P2 de las líneas 65 y 76 (enlazar la fuente en el H3 de cobalamina).
3. Las FAQ y el pie de las imágenes.

**Prompt para la sesión de corrección:**

> En `src/content/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion.mdx` (main @ 26f9b77) corrige solo esto, sin tocar nada más: (1) línea 47, sustituye «frente a un diagnóstico basado solo en síntomas» por «; el diagnóstico se apoya en ella y no solo en los síntomas» (Williams y Batt 1988 compararon TLI con BT-PABA y proteólisis fecal, no con síntomas). (2) Línea 82: la frase tras los dos puntos atribuye a Merck «la grasa y la fibra se ajustan a cada perro»; Merck desaconseja dietas bajas en grasa y recomienda poca fibra insoluble. Reescribe: «…desaconseja restringir la grasa y recomienda una dieta baja en fibra insoluble; a partir de ahí, tu veterinario ajusta según cómo responda tu perro.» (3) Línea 65: «el estudio no describe» → «el resumen del estudio no describe». (4) En el H3 de cobalamina, enlaza Merck EPI como respaldo de la vía oral. Comprueba `tono.py` ≤ 3/1000 y `npx astro build`. Rama propia y PR contra main, sin fusionar. Después, auditoría T2 en otra sesión.
