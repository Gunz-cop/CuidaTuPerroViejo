# Guía de voz y tono — cuidatuperroviejo.com

Fuente única de voz para generar briefs, redactar, auditar y corregir artículos. Convive con [calidad-editorial-adsense.md](calidad-editorial-adsense.md): esa guía decide **qué** se puede afirmar; esta decide **cómo** se dice.

## De dónde sale esta voz

Se derivó el 2026-10-21 del rendimiento en Search Console (últimos 3 meses, clics sumando URL limpia y `.html`). Los artículos con más clics fueron comida casera (412), incontinencia urinaria (188), úlceras por presión (105), vacunas (69), prevención de caídas y agresividad tardía. Esos clics los ganaron sobre todo las versiones **anteriores al 16 de octubre**: hablaban de tú a tú, contaban la experiencia del equipo con Luna y Dakota y no tenían ninguna salvedad defensiva («no demuestra», «no sustituye»; 0 por cada 1000 palabras). La reescritura del 16 y 17 de octubre corrigió afirmaciones sin respaldo, pero metió entre 5 y 11 salvedades por cada 1000 palabras en casi todo el sitio.

Límite del dato: Search Console mide posición y clics, no la lectura. El tono no explica por sí mismo el ranking. Esta guía conserva lo que esas versiones hacían bien (cercanía, experiencia y claridad) y mantiene el rigor que se ganó después.

## La voz en una frase

**Una persona que ha cuidado perros viejos, se ha informado bien y te habla con calma y de tú: primero te dice qué hacer y después, solo si cambia tu decisión, dónde está el límite.**

## Reglas

1. **De tú, en español neutro.** «Puedes», «tu perro». Nada de usted ni voseo. El vocabulario sigue al lector hispano general: «pienso» o «croquetas», «veterinario».
2. **Primero lo afirmativo.** Cada párrafo abre con la acción o el dato útil. La salvedad va después y solo si cambia lo que el lector hará.
3. **Una salvedad por subsección (H3), como máximo.** Las advertencias de seguridad (urgencias, atragantamiento, forzar comida, dosis, tóxicos) no cuentan, pero van concentradas en un `AlertBox` y no se repiten en cada párrafo.
4. **Densidad de muletillas ≤ 3 por cada 1000 palabras**, medida con `scripts/tono.py`. Es el umbral de auditoría.
5. **Lo concreto gana.** Objetos, gestos y ejemplos («un plato llano y ancho», «textura uniforme, sin grumos duros») en vez de abstracciones («la presentación acordada»).
6. **Empatía breve y sin culpa.** Reconoce lo que siente el cuidador una vez, al abrir un H2 difícil. Nada de melodrama ni de frases que sugieran que lo hizo mal.
7. **Experiencia propia, con procedencia.** La del equipo (Luna y Dakota) es el activo diferencial del sitio. Se usa en primera persona del plural cuando está documentada según la §3 de calidad editorial y nunca se presenta como prueba clínica: «Con Luna nos funcionó X; consúltalo antes de probarlo con el tuyo». Inventar un caso sigue bloqueando la publicación.
8. **Fuentes como respaldo, no como ritual.** Enlaza la fuente donde sostiene una afirmación concreta, una vez por sección. No abras párrafos con «Según X…» en cadena.
9. **Ritmo.** De 12 a 20 palabras por frase de media. Párrafos de 3 líneas en el móvil como máximo. Alguna pregunta retórica está bien; los signos de exclamación, casi nunca.

## Muletillas prohibidas (las detecta `tono.py`)

«no demuestra», «no sustituye», «no garantiza», «no basta», «no permite», «no convierte», «no confirma», «no autoriza», «no prueba», «no certifica», «no equivale», «no resuelve», «no descarta», «por sí solo», «sin atribuir», «sin convertir», «sin inventar», «sin deducir».

También quedan fuera las del relleno SEO antiguo: «Es vital entender», «A continuación, analizamos», «En este artículo veremos», «¿Por qué el cambio es vital?».

## Antes y después (texto real del sitio)

| Antes | Después |
|---|---|
| «Esta organización doméstica facilita cumplir una indicación; no la sustituye.» | «Tener la pauta y el registro en una sola hoja evita que cada cuidador siga una distinta.» |
| «Que la mezcla final tenga el peso esperado no confirma que se haya preparado correctamente.» | «Pesa cada alimento por separado antes de mezclarlo: así sabes cuánto lleva de cada uno.» |
| «Mezclar carne y verduras, aunque las acepte con entusiasmo, no demuestra que la dieta sea completa.» | «Que le encante no significa que esté completa: pide que un veterinario nutricionista formule la receta.» |
| «Es vital entender que un perro con incontinencia urinaria **no decide orinarse en casa**.» | «Tu perro **no decide orinarse en casa**: la incontinencia es una pérdida que no controla.» |

## Medición

```bash
python3 .agents/skills/references/scripts/tono.py                      # todo el blog
python3 .agents/skills/references/scripts/tono.py src/content/blog/x.mdx  # un artículo
```

El script excluye las FAQ, la bibliografía y los `AlertBox` de tipo danger y warning. Mide también la longitud. Un valor alto no se arregla borrando frases a ciegas: se reescriben en afirmativo.
