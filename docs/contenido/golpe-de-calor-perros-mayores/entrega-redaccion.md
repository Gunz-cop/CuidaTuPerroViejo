# Entrega de redacción e imágenes — 24 de octubre de 2026

Artículo redactado desde el brief aprobado por la auditoría independiente R2, en la rama `claude/brief-golpe-de-calor-perros-mayores` (base `475319a`). No se reabre la auditoría del brief. Este informe documenta comprobaciones del autor; no es una auditoría independiente del artículo.

Archivo final: `src/content/blog/golpe-de-calor-perros-mayores.mdx`. Guía sin caso, para lectores de España, sin credenciales clínicas ni pacientes inventados. Imágenes ilustrativas generadas con IA. Se han actualizado el estado del brief y el inventario como redactado, sin marcar publicación.

## Frontmatter entregado

```yaml
title: "Golpe de calor en perros mayores: señales de alarma y plan para las olas de calor en España"
seoTitle: "Golpe de calor en perros mayores: qué hacer en España"
metaDescription: "Cómo reconocer un golpe de calor en tu perro mayor, qué hacer en los primeros minutos y cómo prepararlo para las olas de calor y los avisos de la AEMET."
pilar: "salud-perros-mayores"
keywordPrincipal: "golpe de calor en perros mayores"
heroImage: "/images/blog/golpe-de-calor-perros-mayores/podenco-senior-paseo-amanecer-v2.webp"
heroImageAlt: "Ilustración de un podenco senior de hocico canoso paseando con su cuidadora por una calle en sombra al amanecer"
datePublished: "2026-10-24"
```

## Tabla de verificación

Método exigido por la skill: palabras separadas por espacio del cuerpo MDX, sin frontmatter, imports ni bibliografía; incluye las preguntas y respuestas FAQ y las marcas de componentes. No se presenta como un conteo exclusivo de prosa visible. Reproducción: `python3 docs/contenido/golpe-de-calor-perros-mayores/preparar_entrega.py`.

| H2 / sección | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 247 | 250 | −1,2 % |
| Por qué un perro mayor se sobrecalienta antes | 618 | 700 | −11,7 % |
| Cómo reconocer el golpe de calor: de leve a grave | 693 | 700 | −1,0 % |
| Qué hacer en los primeros minutos | 873 | 850 | +2,7 % |
| En la clínica y después del susto | 450 | 500 | −10,0 % |
| Plan para el verano en España: avisos de la AEMET, casa, paseos y coche | 781 | 850 | −8,1 % |
| Qué llevarte de esta guía (cierre y FAQ) | 596 | 550 | +8,4 % |
| **Total** | **4.264** | **4.400** | **−3,1 %** |

Densidad de párrafo: media **38,6**, mediana **39**, párrafos de más de 50 palabras **0 %**, con el filtro de la skill. `tono.py`: **0 muletillas, 0,0/1.000**; su contador parcial es 3.669 porque excluye FAQ y alertas de peligro/advertencia. Las siete respuestas FAQ tienen 49/45/46/46/46/46/47 palabras.

## Fuentes, seguridad y decisiones de implementación

- Diez fuentes del brief citadas en su sección y enlazadas en bibliografía. Hall 2022/2020 y Bruchim 2017 en H2-1; Hall 2021/2022 y Bruchim en H2-2; Hall 2023/2021, Bruchim y COLVEMA en H2-3; Hall 2021/2022 y Bruchim en H2-4; AEMET, Ministerio, BOE y Hall 2022 en H2-5.
- Se aplicaron las observaciones no bloqueantes de R2: muerte/eutanasia también para Hall 2020; muerte espontánea separada; FAQ del pelo atribuida al Ministerio; definición completa del WBGT, sin compararlo con temperatura ambiental; `TablaApilable` con `label`; URL de AEMET con `www`; avisos descritos como generales.
- Se conservaron exactamente **tres AlertBox** (info/danger/warning), conforme al contrato específico del brief. La bibliografía va en un `div data-editorial-bibliography`, en vez de añadir el cuarto AlertBox de la plantilla genérica. Mantiene todas las fuentes y la compatibilidad con proyección Markdown.
- Sin cifras domésticas de parada del enfriamiento, dosis, medicamentos recomendados ni promesas de supervivencia. La temperatura de 41 °C solo figura en la definición clásica con la matización de Hall 2021. El OR del coche no se convierte en «veces».
- El enlace de urgencia se comprobó contra el HTML generado: Satteri conserva las tildes (`#qué-hacer-en-los-primeros-minutos`).
- Consulta externa propia: AEMET avisos y anexo oficial, resumen climático 2025, COLVEMA, BOE consolidado y PDF del Ministerio accesible con `www`. Las identidades y resultados clínicos parten de la verificación documentada en R2; el intento propio de abrir PMC10385239 devolvió una comprobación del navegador, por lo que no se afirma una nueva verificación íntegra del estudio. El anexo servido por AEMET continúa identificado como versión 1, 31/05/2022.

## Plan visual ejecutado

| Recurso | Pregunta que resuelve / ubicación | Fuente y límites | Estado y evidencia |
|---|---|---|---|
| Paseo al amanecer | Cómo visualizar un paseo preventivo / hero | Guía del Ministerio; ilustración, sin paciente | Creado; `astro-imagen-1-*` |
| Mojado con ventilador | Cómo combinar agua y aire / H2-3 | Hall 2023 y COLVEMA; sin representar colapso ni recuperación | Creado; `astro-imagen-2-*` |
| Zona fresca en casa | Cómo preparar el descanso / H2-5 | Guía del Ministerio; prevención | Creado; `astro-imagen-3-*` |
| Tabla de signos y acción | Qué hacer según lo observado / H2-2 | Adaptación editorial de Hall 2021 | Integrada, 450 px de alto a 390 px; `astro-tabla-1-*` |
| Tabla antes/durante/después | Cómo organizar los cuidados / H2-5 | Síntesis del artículo | Integrada, 473 px de alto a 390 px; `astro-tabla-2-*` |

Las tres escenas mantienen el mismo podenco senior, a partir de la hero inspeccionada como referencia. Se revisaron rostro, edad visible, extremidades y apoyos. No se añadieron animaciones: estas tres escenas y las tablas cubren preguntas diferentes sin necesidad de movimiento. Originales conservados en `originales/`; WebP finales y variantes en `public/images/blog/golpe-de-calor-perros-mayores/`.

Archivos base: `podenco-senior-paseo-amanecer-v2.webp` (186396 bytes), `podenco-senior-enfriamiento-evaporativo-v1.webp` (209.144), `podenco-senior-zona-fresca-casa-v1.webp` (151.910), todos 1200 × 800, más variantes de 800 y 400 px. No se alteró el código global de imágenes. El navegador registra la URL base para la hero con tamaño intrínseco ajustado por `srcset`; las dos imágenes de cuerpo seleccionan el WebP base de 1200 px. Las variantes de 800 px están entregadas, sin afirmar que el sitio actual las anuncie.

## Comprobaciones reales

- `npx astro build`: correcto, incluyendo 35 documentos de proyección Markdown. Evidencia: `build.log`, incluido el segundo build tras corregir el ancla.
- `npx astro check`: 0 errores, 0 advertencias, 64 hints del proyecto. Evidencia: `astro-check.log`.
- Chromium con Playwright sobre la compilación real servida en localhost: 390 y 1366 px, claro y oscuro; tres imágenes decodificadas, sin desbordamiento horizontal, dos tablas apiladas en móvil, siete FAQ cerradas, apertura y cierre con teclado y destino de ancla presente. Evidencia: `navegador-astro.json`, `comprobar_astro.py` y capturas `astro-*`.
- Existe además una vista HTML autónoma (`vista-previa.html`) con imágenes integradas para leer la entrega sin arrancar Astro. Su diseño es una vista de lectura aislada; las capturas `astro-*` corresponden al diseño verdadero.
- `git diff --check`: correcto. Ningún cambio de dependencias ni configuración. Sin commit, push ni despliegue.

La auditoría independiente del artículo y la comprobación pública posterior a un futuro despliegue no forman parte de estas pruebas propias. No se declara aprobación visual del propietario ni publicación.
