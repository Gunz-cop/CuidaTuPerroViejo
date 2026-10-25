# Prompt para la sesión que ajusta consulta y recorte (v4), tras la decisión del propietario

Pegar tal cual en la otra sesión. Los prompts de imagen van en inglés a propósito: el generador responde mejor a términos anatómicos precisos en inglés. Guárdalos también en `visuales/prompts.md`.

---

Trabaja en Gunz-cop/CuidaTuPerroViejo, rama `codex/leishmaniosis-articulo-revision` (parte de `903b786`). No toques `main`, no abras PR, no despliegues. Lee `AGENTS.md`, `.agents/skills/references/direccion-visual-editorial.md`, `.agents/skills/crear-animaciones-articulo-blog/SKILL.md` y `briefings/briefing-leishmaniosis-perros-mayores.md` (§8, §9.6, §9.7).

## Decisión del propietario (2026-10-25) que cambia el brief

En este artículo, **la portada y la casa al anochecer muestran a la perra sana y mayor, antes de cualquier problema; la consulta y el recorte de la animación muestran a la misma perra ya con señales de leishmaniosis clínica de grado moderado, que es la razón por la que está en el veterinario**. Por tanto, solo para estas dos imágenes, la regla «sin enfermedad inventada» se sustituye por «con las señales descritas abajo, secas, superficiales y dignas». La portada y la casa no se tocan. La delgadez actual de v3 (lomo hundido, cabeza baja, costillas visibles) **se conserva**: está aceptada.

La consecuencia es honestidad en los textos: ninguna imagen se presenta como diagnóstico visual, y los alt, pies y el texto de los pasos de la animación deben decir que son señales posibles y que muchos perros infectados se ven normales.

## Cómo trabajar el generador (importante)

El generador de imágenes es un modelo aparte del chat y ha dado resultados genéricos con prompts largos y vagos. Haz esto:
1. **Usa el modo de edición con imagen de referencia**, no generación desde cero: adjunta `mestizo-senior-analisis-sangre-consulta-v3.webp` para la consulta y `mestizo-senior-recorte-perfil-v3.webp` para el recorte, y adjunta también `mestizo-senior-colocacion-collar-v1.webp` como referencia de identidad. Empieza cada prompt con: «Edit the attached image. Keep composition, camera, lighting, people, clothing, table, mat, syringe, pose and the dog's body shape exactly unchanged. Change ONLY the following details.»
2. **Describe cada cambio por región anatómica, en afirmativo, con tamaño relativo y textura.** Los modelos de imagen suelen ignorar o invertir las negaciones («no sangre» puede producir sangre): formula límites como propiedades («todas las lesiones son secas, grises y blanquecinas, de superficie mate») y deja las exclusiones para una frase final corta.
3. **Una región por frase**, con orden fijo (ojos → orejas → hocico → pelaje → uñas), y numera los cambios.
4. **Genera al menos 6 candidatos por imagen**, descarta los que cambien la escena, la identidad o el cuerpo, y de los demás elige el que cumpla más puntos de la lista de verificación. Documenta cuántos generaste y por qué descartaste cada uno.
5. **Inspecciona cada región al 100 %** (recorte de 300 px de lado por zona) y luego el conjunto a 390 px. Registra por zona «visible a 390 px: sí/no; visible al 100 %: sí/no».

## Imagen 1 — Consulta v4 → `mestizo-senior-analisis-sangre-consulta-v4.webp` (1200×675, 16:9)

Prompt de edición (copiar íntegro; está en inglés a propósito):

```text
Edit the attached image. Keep composition, camera angle, lighting, both women, their clothes and hands, the steel table, the blue anti-slip mat, the cabinets and sink in the background, the small syringe with the needle under the skin of the lifted front forearm, and the dog's body shape, pose, thinness and head position exactly unchanged. Same dog: a 12-13 year old mixed-breed female, dark brindle short coat, white chest and white socks, semi-dropped dark ears, grey collar. Change ONLY the following details, which show moderate clinical canine leishmaniosis in an elderly dog. Photographic realism, matte skin and fur textures, documentary veterinary photograph.

1. EYES: both eyes are surrounded by a ring of thinned, sparse hair about 8-12 mm wide where pale pink-grey skin shows through, with a few fine white flakes on that skin (spectacle-like pattern). The eyes themselves stay clear, brown, sunken and calm. The hollow above each eye (temporal muscle loss) is slightly deeper.
2. EARS: the visible ear has a dry, fine white scaly edge along the outer margin and tip, sparse thin hair on the last third, and one tiny dry brown crust about 4 mm at the very tip of the ear. The skin of the ear is intact.
3. NOSE AND MUZZLE: the nose leather is slightly dry and matte with a few small pale pink-grey depigmented patches along its upper edge and fine surface cracks. The white whiskered muzzle and white eyebrows stay as they are.
4. COAT: the coat is duller and drier than before, with a light scatter of fine white dandruff-like flakes on the shoulders and along the spine. The brindle pattern stays the same.
5. NAILS: on every visible paw, the nails are thick, overgrown and curve downward and slightly sideways, extending about 15-20 mm beyond the toe pads, with a dull, ridged surface.
6. NOTHING ELSE changes: no bleeding, no open wounds, no pus, no swelling, no extra people or objects, no text or logos.

Final constraints: every lesion is dry, superficial, grey-white or pale pink and subtle at full size. The dog stays dignified, calm and looking at her owner. Hands have five fingers, the syringe stays correctly angled under the skin.
```

Verificación a 390 px y al 100 %:
- A 390 px deben leerse **al menos** el halo de pelo ralo alrededor de los ojos y las uñas largas curvadas. Si no se ven, regenera con más tamaño en 1 y 5 (hasta 14 mm de anillo y 25 mm de uña).
- Al 100 %: escamas del borde de la oreja, costra del extremo, trufa seca con parches claros, caspa fina en el lomo.
- Siguen en pie: mismo perro que en v3 (identidad, hocico y cejas canosos, ojos hundidos, lomo hundido, cuartos finos, cabeza baja), misma escena, jeringa con la aguja bajo la piel y poco rojo solo dentro del cilindro. **Apoyos:** v3 ocultaba un apoyo trasero tras los brazos; intenta que se vean los cuatro o declara de nuevo cuáles se ven.
- Las lesiones son secas y superficiales: si aparece sangre exterior, pus, úlcera abierta o hinchazón, el candidato se descarta.

## Imagen 2 — Recorte v4 → `mestizo-senior-recorte-perfil-v4` (WebP con alfa; 1200, 800 y 400 px)

Prompt de edición:

```text
Edit the attached image of a full-body side-profile cut-out dog. Keep the exact pose (strict side profile facing right, head low with the nose below the withers, four legs separated and visible, tail relaxed), the thin body (sagging spine behind the withers, narrow thighs, visible hip bones and ribs), the grey-white muzzle and eyebrows, the dark brindle coat, the white chest and white socks, the semi-dropped dark ear, the long tail with a white tip, the lighting, the transparent background with no shadow, and the framing with margin around the animal, all exactly unchanged. Same dog as in the reference images. Change ONLY these details, which show moderate clinical canine leishmaniosis. Photographic realism, matte textures.

1. EYE: the visible eye has a ring of thinned sparse hair about 10 mm wide around it where pale pink-grey skin shows, with a few fine white flakes. The eye stays brown, sunken and calm. The hollow above the eye is slightly deeper.
2. EAR: the dark ear has a dry fine white scaly outer edge and tip, sparse hair on the last third, and one tiny dry brown crust about 4 mm at the tip. Skin intact.
3. NOSE: slightly dry matte nose leather with a few small pale pink-grey depigmented patches along its upper edge and fine surface cracks.
4. COAT: duller, drier coat with a light scatter of fine white dandruff-like flakes over the shoulder and along the spine. Brindle pattern unchanged.
5. NAILS: the nails on all four visible paws are thick, overgrown, ridged and curve downward, extending about 15-20 mm beyond the toe pads.

Final constraints: all lesions dry, superficial, grey-white or pale pink, subtle at full size. No blood, wounds, pus or swelling. No collar, no leash, no hands, no text. Transparent background with clean edges and no halo, especially on the fine hair of the ear and chest.
```

Transparencia: si la herramienta entrega PNG con fondo transparente, úsalo. Si no, genera sobre gris plano `#808080` y recorta con un matting cuidadoso del pelo de la oreja y el pecho. Comprueba alfa real (rango 0–255), halo sobre `#ffffff` y `#1a1a1a`, y reduce a 390 px.

Tabla de verificación obligatoria (sí/no a 390 px y al 100 %), para el recorte y la consulta: canas en hocico/cejas/párpados; ojos hundidos; lomo hundido y musculatura reducida; postura (cabeza baja, apoyos prudentes); y las cinco señales nuevas: aro de pelo ralo periocular, borde escamoso y costra de la oreja, trufa seca con parches claros, caspa fina en el lomo, uñas largas y curvas. Más: prueba de la recta cruz–grupa, sin sangre ni úlcera abierta, nada de texto.

## Archivos a actualizar tras elegir los candidatos

1. **Animación** (`src/components/article/LeishmaniosisRevision.astro`): constante `image` → `…recorte-perfil-v4`; alt (solo lo que se ve, incluidas las señales y la frase «ilustración de un perro con señales marcadas; muchos perros infectados se ven normales»); elipses `data-zone` recalculadas si la silueta se mueve (si la pose es idéntica, comprueba que siguen cubriendo oreja, ojo y hocico, uñas y cuerpo). Revisa el texto de cada paso: debe decir que el dibujo muestra señales de un perro con la enfermedad y que **la ausencia de lesiones no descarta nada**; sin diagnóstico por aspecto ni causa atribuida a una señal suelta.
2. **MDX** (`src/content/blog/leishmaniosis-perros-mayores.mdx`, ~línea 179): `src` y `srcset` → `…consulta-v4`; **alt** y pie visible: «Ilustración de una veterinaria extrayendo sangre a una perra mestiza mayor, delgada y con señales de enfermedad (pelo ralo alrededor de los ojos, uñas largas). Son señales posibles; muchos perros infectados se ven normales.» (ajusta a lo que realmente salga). **No cambies ni una palabra del cuerpo de texto aprobado** (SHA-256 R2 `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`).
3. **Brief §8 y dirección visual**: añade una nota fechada 2026-10-25 con la decisión del propietario (sana en portada y casa; con señales en consulta y recorte), para que ningún auditor la tome por fallo ni se copie a otros artículos.
4. `visuales/archivos.json`, `prompts.md`, `entrega-visuales.md`, variantes 800/400, SHA-256, descartes versionados.

## Reglas

- Sin autoaprobación: no escribas «APTO» ni «aprobado visualmente». Entrega capturas por zona al 100 %, el conjunto a 390 px, la tabla de verificación, el número de candidatos y los motivos de descarte. La decisión estética es del propietario.
- Si tras varios candidatos el generador no consigue una señal concreta (por ejemplo el aro periocular), **di cuál falla** y propone la mejor alternativa en lugar de entregarla como cumplida.
- Después: `npx astro build` (o di que no se puede), capturas a 390 y 1366 px, claro y oscuro, de la animación y de la consulta; `scrollWidth` igual al ancho; sin autoplay, teclado, movimiento reducido e impresión como antes.
- Sube a la misma rama y dime el commit.
