# Correcciones tras la auditoría R1 del artículo

| Campo | Valor |
|---|---|
| Documento corregido | `borradores/perro-mayor-miedo-visitas-casa.mdx` (sigue en `borradores/`, no se movió a `src/content/blog/`) |
| Informe aplicado | `docs/contenido/perro-mayor-miedo-visitas-casa/auditoria-articulo-r1.md` (APTO con observaciones) |
| Versión de partida | `origin/claude/happy-ride-8leguk` en `f5c67ae` |
| Fecha | 2026-11-24 |
| Rol | Corrector. No generó el brief, no redactó el artículo y no lo auditó. Aplica solo lo que pide el informe y no audita su propio trabajo: la R2 corta la hará otra sesión |

> **Nota de privacidad.** Este archivo está en un repositorio público. No copia texto del caso ni datos de la lectora: los cambios remiten a H2/H3 y a líneas.

## Cambios aplicados

| Hallazgo | Cambio | Línea (`.mdx` corregido) | Evidencia |
|---|---|---|---|
| P2-1 | El umbral del `AlertBox danger` pasa del periodo de un día natural a «en 24 horas» | 234 | En el HTML compilado aparece «en 24 horas» una vez, dentro del `danger` |
| P2-1 (PDF) | El mismo cambio en el recuadro de urgencias de `scripts/generar-hoja-registro-visitas.ts`. La URL del pie va en una línea propia (`<br>` y `white-space: nowrap`) para que no se parta en el guion. PDF regenerado con `npx tsx scripts/generar-hoja-registro-visitas.ts` | script L74–75, L114, L116 | `pdfinfo`: 1 página, A4 (841,92 × 594,96 pt). `pdffonts`: Carlito-Bold, Caladea-Bold y Carlito-Regular, las tres **CID TrueType** incrustadas. `pdftotext -bbox`: la URL es una sola palabra (x de 456,6 a 697,9 pt, dentro de la página) y el recuadro dice «tres crisis en 24 horas» |
| P2-2 | H3 «Epilepsia y estrés»: se precisa que el dato salió al elegir de una lista de posibles factores. FAQ 4: «entre los de una lista» | 215 y 264 | Cambio de pocas palabras. Cifras, enlace y la frase de asociación (L217) sin tocar |
| P2-3 | Las dos imágenes Markdown del cuerpo pasan a `<img src alt width="1200" height="675" loading="lazy" decoding="async" />`, con el mismo `src` y el mismo `alt`. El pie en cursiva va debajo, tras una línea en blanco, como en el artículo de petardos | 119–121 y 185–187 | En el HTML compilado, las dos `<img>` llevan `width`, `height`, `loading="lazy"` y `decoding="async"` |
| P2-5 | Nuevo H3 «Pocas visitas y poca costumbre» delante del pasaje sobre la poca costumbre de ver gente. El texto no cambia | 81 | En el HTML aparece `<h3 id="pocas-visitas-y-poca-costumbre">`. Tamaños: «Lo que el perro trae de antes», 237 palabras con la cabecera (antes unas 320); el H3 nuevo, 75. El H3 «La planta de arriba…» se deja como está, como permite el informe |
| Nota AAHA | La sigla se expande como «Asociación Americana de Hospitales de Animales» | 38 | — |
| P2-6 | **Sin cambio**, como pide el encargo: ya está preguntado a la lectora | — | — |

## P1-1 y P2-4 (hero): pendiente del propietario

**La hero no se cambió.** `heroImage` sigue apuntando a la imagen original y no se añadió ningún archivo `-v2`.

Lo que se intentó:

1. **fal**: el original de `originales/` se subió y se editó con dos modelos (`google/nano-banana-2.1/edit` y `fal-ai/nano-banana-pro/edit`). Salieron cuatro candidatas, todas a partir del original, con la instrucción del P1-1 completa.
2. **Revisión a 390 px**, junto al original. Ninguna cumple:
   - Las canas mejoran algo a tamaño completo, pero a 390 px siguen confundiéndose con el pelo crema.
   - El cuerpo sigue musculado: no se ve el lomo hundido ni las costillas.
   - Mirada: en las dos primeras, la perra sigue mirando a la persona. En las otras dos levanta la cabeza hacia la derecha, pero se lee como si mirara la cara de la persona. La puerta queda justo detrás de ella en el encuadre, así que esa dirección de mirada no se distingue.
   - La cabeza y las orejas siguen siendo de tipo labrador (P2-4).
3. Antes del último intento, más explícito, **la cuenta de fal se quedó sin créditos**. **Higgsfield** rechazó la generación porque exige un plan de pago («Requires basic plan or higher»). No queda ningún conector que permita generar.

Las candidatas no se guardaron en el repositorio porque no superan el criterio de aceptación. La imagen 2 y la 3 no se tocaron. Como la hero no cambia, siguen siendo la misma perra.

**Recomendación para quien la regenere.** Con esta composición, la puerta cerrada queda detrás de la persona, y cualquier giro de cabeza hacia la puerta parece dirigido a ella. Hay dos opciones:

- regenerar desde cero, con la puerta en el lado opuesto a la persona o con la perra de perfil hacia una puerta libre en el encuadre;
- aceptar de forma expresa la hero actual a 390 px y dejar registrada esa decisión, que es la alternativa del propio P1-1.

Para el resto, valen las precisiones del P1-1: canas casi blancas con contraste, lomo hundido, muslos menos marcados, costillas algo perceptibles, cabeza menos ancha y orejas semicaídas más pequeñas. Guardar el resultado con un nombre nuevo (`perra-mayor-habitacion-tranquila-visitas-v2.webp` a 1200×675 y `-v2-400.webp`) y conservar el original en `originales/`.

## Verificación

- **Build:** copia temporal del `.mdx` a `src/content/blog/` y `npx astro build`, que terminó con código 0 (proyección `agent-content/v1` con 43 documentos e índice de Pagefind con 49 páginas). La copia se borró después: `git status --short src/content/blog/` queda vacío y no hay ningún `.mdx` nuevo en `src/content/blog/`.
- **Tono:** `python3 .agents/skills/references/scripts/tono.py borradores/perro-mayor-miedo-visitas-casa.mdx` da 2.729 palabras y **0 muletillas** (0,0/1000).
- **Volumen** (`split()` del cuerpo sin frontmatter ni imports): **3.297** palabras, o 3.058 sin el cuadro de fuentes. Dentro del rango 2.465–3.335 en los dos casos. La subida respecto a la R1 se debe a los atributos de las etiquetas `<img>` y a las pocas palabras añadidas en P2-2.

## Pendiente

- **P1-1 / P2-4:** la hero, para el propietario (ver arriba).
- **P2-6:** la confirmación con la lectora, ya preguntada.
- Sigue fuera del artículo y bloquea la publicación: el P0-1 de la R2 del brief y la doble aprobación de la Sección 9.5.
- **R2 corta del artículo**, en otra sesión: comprobar L38, L81, L119–121, L185–187, L215, L234, L264, el PDF y la decisión sobre la hero.
