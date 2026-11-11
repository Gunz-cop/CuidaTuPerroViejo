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

## Correcciones r1

Sesión correctora, 2026-11-11, a partir de `auditoria-articulo-r1.md` y de las decisiones del propietario del mismo día. Portada (P1-1) y título no se tocan: la portada la gestiona otra sesión y el título lo matiza la entradilla. P1-2 y P1-3 siguen en manos del propietario.

| Hallazgo | Cambio |
| --- | --- |
| P2-1 `metricas.mjs` no lee briefs de afiliados | Sin cambio en el artículo (patrón de herramienta, encargo aparte). `tono.py`: 2 254 palabras, 0 muletillas |
| P2-2 F1 ausente en H2-5/H2-6 | F1 (AAHA 2023) citada por nombre y enlazada en H2-5 «Cuándo no hace falta comprar», donde sostiene adaptar superficies y accesos de casa. En H2-2 y H2-6 basta F5 |
| P2-3 «Los tres modelos» corto; C sin comprobación al recibirla | Añadido a C «Qué comprobar al recibirla»: marco estable sin cojear y malla tensa sin bolsa; si cede, devolver en plazo |
| P2-4 plazos de México de A | Sin cambio: el texto ya engloba ambos rangos sin falsearlos |
| P2-5 promesa de revisión semanal | Eliminada. Sustituida por «Datos revisados el 11 de noviembre de 2026; disponibilidad, envío y condiciones pueden cambiar, así que compruébalos en AliExpress antes de comprar». Brief §11 ajustado: sin revisión periódica (decisión del propietario). `prospectos-afiliados.md` no prometía mantenimiento |
| P2-6 I-2 ilegible a 390 px y siluetas de perro | `CamasMedidaVisual.astro` (I-2) rehecho en vertical (viewBox 360×640, ancho máx. 400 px): texto a ~18–21 px efectivos en 390 px, «Interior» separado de su flecha, «de lado a lado» bajo su flecha. Siluetas de perro sustituidas por contornos geométricos discontinuos (rectángulo y círculo), según AGENTS.md. I-3 intacta. Captura a 390 px revisada |
| P2-7 «la talla que anuncia un vendedor suele ser la exterior» | Acotada a lo verificado: «En la ficha A, la talla anunciada es la exterior…» |
| P2-8 título vs. entrada baja | Título sin cambios. Entradilla: solo B acredita entrada baja (10 cm, sin bordes); A no declara el lado de entrada; C queda a 20 cm y va como contraste |
| P2-9 teclado y movimiento reducido | Probado con Playwright (Chromium, 390 px): con Tab se alcanzan los tres CTA (`camas-cmp-a/b/c`) con `href` correcto y contorno de foco sólido de 2 px; con `reducedMotion: reduce` ninguna ficha tiene animación ni transición activa (sin `reduce`, sí) |

Validación: `npm run check` 0 errores; `npm test` 141 pass / 0 fail; `npx astro build` exit 0; `projection.mjs check --build-dir dist` OK. `FichaAfiliada.astro` no se modificó: no se encontró defecto.


## Portada I-1 (2026-11-11, auditoría r2 P2-D)

- Archivo: `public/images/blog/camas-entrada-baja-perro-mayor-comparativa/mestizo-pastor-senior-entrando-cama-baja.webp` (1344 × 752, WebP calidad 82).
- Origen: Higgsfield, modelo `gpt_image_2_6`, 16:9, generada el 2026-11-11 desde la cuenta del propietario (0,25 créditos por intento).
- Intento 1 (job `88ef6117-8326-4af4-bfa1-c50aad6ba848`): rechazado, el perro tenía cinco patas.
- Intento 2 (job `45f68a25-0c8d-4da1-a115-6e26823b9496`): aceptado. Prompt basado en §8 del brief, reforzando la anatomía: cuatro patas, delanteras sobre un colchón gris plano y traseras en el suelo, perfil lateral de izquierda a derecha, rasgos senior y luz de ventana a la izquierda.
- `heroImageAlt` idéntico al del brief.
