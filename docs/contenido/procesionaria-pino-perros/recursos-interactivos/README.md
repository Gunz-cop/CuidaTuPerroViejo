# Recursos interactivos — procesionaria (2026-11-08)

Componente: `src/components/article/ProcesionariaRecursos.astro` (variantes `ruta`, `llamada`, `niza`). Sin dibujos de perro: trazos SVG, iconos y datos.

| Recurso | Ubicación en el MDX | Qué hace el lector | Fuente |
|---|---|---|---|
| `ruta` — ¿Qué has visto? | Tras el AlertBox de la introducción | Elige entre 3 situaciones; la ruta se dibuja paso a paso; en el lavado marca 4 condiciones y se muestra «lavar» u «omitir» (gotas animadas solo si las 4 se cumplen) | Texto del artículo; COLVET/Murcia 2026 |
| `llamada` — Tu frase para urgencias | H2-3, final de «Cuenta cuándo, dónde y qué contacto has visto» | Toca qué pasó, cuándo, signos, qué se hizo y edad; compone la frase y la copia. Los signos graves pasan al principio. No envía ni guarda nada | Texto del artículo |
| `niza` — 41 perros | H2-3, tras «Se trata de una serie retrospectiva» | 41 cuadrados por tiempo hasta la consulta; un botón colorea la necrosis lingual (8/27, 5/5, 9/9) | Niza et al. 2012, PMID 21824369 (resumen verificado) |

## Verificación (Playwright, build local estático)

- Sin errores JS; `scrollWidth` = ancho de ventana a 390 y 1366, claro y oscuro.
- Altura en móvil 390 px: ruta 443 (abierta en el paso 3, 885), llamada 970, niza 532. **La llamada supera en ~70 px el presupuesto de ~900.**
- Sin JS: se muestran todos los resultados como texto (ruta 1109 px) y se ocultan los controles.
- `prefers-reduced-motion`: anula animaciones y transiciones; todo sigue accesible paso a paso.
- Objetivos táctiles ≥ 44 px; foco visible.
- Capturas en esta carpeta. Pendiente: aprobación visual del propietario.
