# Entrega del redactor — camas de entrada baja para perro mayor (comparativa)

- Fecha: 2026-11-11
- Brief: [`briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md`](../../../briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md)
- Artículo: [`src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx`](../../../src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx)
- Datos de producto: solo del [registro de fichas del 11/11/2026](../../afiliacion/fichas-camas-comparativa.md). Sin precios en la página.
- Skills aplicadas: `redactar-articulo-blog`, `crear-ficha-afiliada`, `enlazado-interno-sitio`; guía de voz y tono.

## Archivos

| Archivo | Cambio |
| --- | --- |
| `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx` | Artículo nuevo (`datePublished: 2026-11-11`, sin `heroImage`) |
| `src/components/FichaAfiliada.astro` | Ficha afiliada generalizada con props (`placement`, `title`, `href`, `reason`, `checks`, `ctaLabel`, `video` opcional). Mismo CSS, animación y contrato que `CamaAfiliada.astro` |
| `src/components/CamaAfiliada.astro` | **Sin cambios.** La ficha `cama-guia-01` de la guía sigue intacta (el test `tests/affiliate-clicks.test.ts` lee ese archivo literalmente). Migrarla a `FichaAfiliada` queda como tarea aparte, para no tocar la ficha aprobada |
| `src/components/article/CamasMedidaVisual.astro` | I-2 (cómo medir; exterior vs interior) e I-3 (superficies útiles B y C a escala, 1 cuadro = 10 cm). SVG inline con modo oscuro y `figcaption` que se conserva en la proyección |
| `src/lib/affiliate/clicks.ts` | Ubicaciones `camas-cmp-a`, `camas-cmp-b`, `camas-cmp-c` registradas para que el contador acepte sus clics |
| `src/data/internal-links.ts` | `CROSS_PILLAR_LINKS` (guía de camas y prevención de caídas) y `TOOL_LINKS` (selector de movilidad) para el nuevo slug |
| `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx` | Un enlace contextual entrante al final de «Cómo leer lo que promete el vendedor» (regla de canibalización del brief) |
| `src/content/blog/prevencion-caidas-perro-mayor.mdx` | Un enlace entrante en «Cama y zona de descanso» |
| `docs/seo/enlazado-interno.md` | Nota de incorporación |
| `INVENTARIO_CONTENIDO.md` | Entrada del pilar 4 y estado «Redactado y validado localmente» (no «Publicado») |
| Brief | Nota de estado |

## Fichas afiliadas

| Ubicación | Producto | Destino del CTA | Verificado en `dist` |
| --- | --- | --- | --- |
| `camas-cmp-a` | Cama tipo sofá con bordes (Hicarer) | `https://s.click.aliexpress.com/e/_c3vqNMIT` | `aside[data-affiliate-placement]`, un solo `<a>`, `rel="sponsored noopener noreferrer"`, `target="_blank"`, aviso bajo el botón |
| `camas-cmp-b` | Colchón plano XL (Wistand889), título «solo envía a España» | `https://s.click.aliexpress.com/e/_c3DVbDzz` | Igual |
| `camas-cmp-c` | Cama elevada de malla L (One Newgate 4 Choice) | `https://s.click.aliexpress.com/e/_c4PdeaEF` | Igual |

Las fichas no tienen medio (foto o video): el registro dice que los medios del vendedor no se descargaron y no hay procedencia documentada, como permite el brief (§8, I-4). Precio, stock y plazos no aparecen dentro de las fichas.

## Validación

| Comprobación | Resultado |
| --- | --- |
| `npx astro build` | OK |
| `npm run check` | 0 errores |
| `npm test` | 141 pass, 0 fail |
| `node scripts/agent-readiness/projection.mjs check --build-dir dist` | OK |
| Proyección Markdown del artículo | Sin `s.click`, sin «Podemos recibir una comisión por las compras», sin títulos ni comprobaciones de las fichas. Se conservan el aviso editorial de la entradilla y el bloque «Cómo elegimos y cómo ganamos dinero» (disclosure, no texto comercial de ficha) y los `figcaption` de I-2/I-3 |
| Anclas enlazadas | `#cuándo-reemplazar-o-adaptar-la-cama`, `#qué-observar-después-de-un-cambio` y `#cama-y-zona-de-descanso` existen en el HTML |
| `grep PENDIENTE` en el MDX | Vacío |
| Precios (`€`, `MX$`, cifras) | Ninguno en la página |
| Tono (`tono.py`) | 2113 palabras, 0 muletillas, 0,0/1000 |
| Densidad de párrafo | media 34 / mediana 35 / >50 palabras 8 % |
| Capturas | Chrome headless 390 px (claro y oscuro) y 1280 px: tabla apilada en móvil, I-2 e I-3 legibles en ambos temas. No se probó teclado ni movimiento reducido de forma interactiva; el CSS de la ficha es copia del aprobado |

## Tabla de verificación (palabras con `wc -w` por bloque)

| Bloque | Palabras reales | Target (§7) | Desviación |
| --- | --- | --- | --- |
| Entradilla (sin tabla; incluye AlertBox info) | ~121 | 80–120 | +1 % sobre el máximo |
| Tabla comparativa (§5, fuera del presupuesto de §7) | 208 | — | — |
| Antes de comparar | 153 | 150–200 | dentro |
| Mide a tu perro en dos minutos | 278 | 250–300 | dentro |
| Los tres modelos, ficha por ficha | 822 (≈747 sin props de las fichas) | 850–1 000 | −3 % / −12 % (dentro de ±15 %) |
| Comprar desde México o desde España | 201 | 180–220 | dentro |
| Cuándo no hace falta comprar | 132 | 120–160 | dentro |
| Al recibirla: primera semana | 165 | 120–160 | +3 % |
| Cómo elegimos y cómo ganamos dinero | 84 | 80–120 | dentro |
| Cuadro de fuentes | 165 | — | — |
| FAQ (4 preguntas) | 207 | 150–200 | +3,5 % |
| **Total sin tabla ni cuadro de fuentes** | **≈2 211** | 1 980–2 480 | dentro |

Fuentes por H2: AAHA 2023 (F1) y AAHA 2022 (F2) citadas por nombre en «Antes de comparar»; guía de camas (F5) en «Antes de comparar», «Cuándo no hace falta comprar» y «Al recibirla»; diagrama del vendedor (F3) en «Mide a tu perro» y ficha A; registro de fichas (F6) en H2-3, H2-4 y FAQ; Comisión Europea (F4) en el cuadro de fuentes y el aviso de la entradilla y el bloque final. F1 no aparece por nombre en H2-2 ni H2-6 (el brief la asigna también ahí); F5 cubre esas afirmaciones.

Componentes: AlertBox info (entradilla), warning (H2-3), danger (H2-6), cuadro de fuentes info; FAQ plegado con 4 preguntas; `TablaApilable`. Sin H1, TOC, JSON-LD ni firma manual. Schema: `BlogPosting` del layout, sin `Review`.

## Imágenes

| ID | Estado |
| --- | --- |
| I-1 portada | **Falta.** No hay herramienta de generación de imágenes en esta sesión. `heroImage` y `heroImageAlt` omitidos (opcionales). Prompt listo en §8 del brief |
| I-2 cómo medir | Hecha (SVG propio) |
| I-3 esquema a escala | Hecha con B y C. Sin siluetas de perro: dibujarlas exigía inventar tamaños de perro; la A se omite y se dice en el pie |
| I-4 foto por ficha | No incluida (sin foto propia ni derechos documentados) |
| I-5 Luna o Dakota | Falta: pedir foto al propietario (opcional) |

## Pendientes antes de publicar

1. Portada I-1 (generarla con el prompt del brief) o aceptar publicar sin ella.
2. Repetir el día de publicación la comprobación de disponibilidad, entrega y devolución de A, B y C en MX y ES (regla del brief §6) y ajustar fechas del artículo si cambian.
3. Auditoría independiente del artículo (`auditar-articulo-blog`).
4. Opcional: migrar `cama-guia-01` a `FichaAfiliada` con su test, en un encargo separado.
5. El inventario pasa a «Publicado» solo tras comprobar la URL pública.
