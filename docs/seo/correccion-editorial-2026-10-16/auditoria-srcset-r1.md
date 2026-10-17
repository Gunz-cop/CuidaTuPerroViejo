# Revisión independiente de la reparación responsive — R1

Fecha2026-10-16. Alcance técnico separado; no modifica ni reabre documentos editoriales aprobados. **Cambio satisfactorio por inspección y prueba local del contrato de candidatos; APTO funcional en navegador pendiente.** No se corrigió código por el auditor.

## Problema y alcance

El corrector detectó candidatos móviles `-400.webp` anunciados aunque no existían. Su informe de navegador identifica nueve apariciones en cuatro originales; esta reproducción inicial es evidencia del corrector, no una repetición del auditor.

`buildSrcset` ahora comprueba el candidato de400en `public` durante prerenderizado. Si existe mantiene400+original; si no, devuelve solo original. No cambia archivos de imagen ni calcula variantes ficticias. El auditor inspeccionó todos los imports: solo las plantillas Astro `[pilar].astro` y `[pilar]/[slug].astro` lo usan, ambas con `getStaticPaths`, y la configuración actual declara `output: static`. Por tanto la comprobación de archivos se hace en construcción, no por cada petición del visitante. No se hallaron imports desde scripts de cliente ni endpoints dinámicos.

## Prueba propia y límites

El auditor ejecutó `node --import tsx --test tests/image-srcset.test.ts`: código0, un test, un aprobado, cero fallos, duración1042,55ms. Comprueba las rutas reales anunciadas para todos los hero de artículos contra archivos de `public` y detectaría el defecto que originó esta reparación. El primer intento `npx tsx --test` no pudo abrir su pipeIPC por EPERM del sandbox; se cambió el arranque de test a Node sin ese IPC, sin alterar el test ni escalar permisos.

La prueba no abre imágenes, no prueba `currentSrc` o `naturalWidth`, no incluye todas las imágenes de herramientas/pilares ni acredita el Worker desplegado. El código depende del directorio de ejecución habitual de construcción del repo; es apropiado para sus llamadas actuales con rutas localesWebP. No amplía el helper a URL remotas o rutas arbitrarias ni valida dimensiones reales del descriptor1200w, comportamiento previo fuera de esta reparación.

Se inspeccionó el árbol disponible de `dist/server` sin encontrar imports literales `node:fs` o `existsSync`, pero el auditor no ejecutó su construcción ni garantiza que ese artefacto corresponda al último cambio. El corrector debe conservar evidencia del build final y navegador posterior, incluyendo candidatos `srcset`, carga real y móvil. No se declara publicada ni validada funcionalmente esa reparación todavía.

## Versiones

- `src/utils/image.ts` SHA256 `4ef99eabf390239282c3494594d870b2cce687f08639e8bf115d4b255e4a053e`.
- `tests/image-srcset.test.ts` SHA256 `d405a2ec547c9c33845ad84ea6590e11173df7ad9b7c2706d3a908755a707a53`.

Copias y manifiesto en `evidencias/auditor-srcset-snapshot/`. Este cambio técnico no cambia los21hashes editoriales aprobados ni consume otra ronda editorial.

Formato de copias: véase `formato-evidencia.md`; las extensiones de código llevan sufijo `.txt`, con bytes/hashes originales conservados y campo `snapshot_path` en manifiestos.
