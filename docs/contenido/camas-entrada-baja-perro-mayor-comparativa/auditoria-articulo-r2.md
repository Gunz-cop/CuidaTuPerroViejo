# Auditoría del artículo r2: camas de entrada baja para perro mayor (comparativa)

- Fecha: 2026-11-11
- Auditor: sesión independiente (no redactó, no corrigió ni generó la portada)
- Rama: `claude/cool-brown-rj9p62` en `7e340fa`
- Artículo: `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx`
- Contrato: `briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md`, `crear-ficha-afiliada`, `docs/afiliacion/fichas-camas-comparativa.md`
- Base: `auditoria-articulo-r1.md` y la sección «Correcciones r1» de `entrega.md`
- Decisiones del propietario ya tomadas: no habrá revisión periódica de fichas; él comprueba a mano los `s.click` (no se abrieron).
- No se corrigió nada.

## Veredicto

**Aprobado con cambios (solo pendientes del propietario y documentales).** Los nueve P2 de r1 están resueltos o justificadamente aceptados, y la portada I-1 (P1-1) existe y cumple la dirección visual. El texto puede publicarse cuando el propietario cierre P1-2 (revisión de fichas el día de publicación) y P1-3 (destino de los tres enlaces). No hay P0 ni P1 nuevos.

Mecánico: `npx astro build` exit 0; `npm run check` 0 errores; `npm test` 141 pass / 0 fail; `projection.mjs check --build-dir dist` OK; `tono.py` 2 254 palabras, 0 muletillas (dentro de 1 980–2 480). El HTML compilado lleva `og:image` con la portada nueva.

## Seguimiento de r1

| Hallazgo r1 | Estado r2 | Evidencia |
| --- | --- | --- |
| P1-1 portada | **Resuelto** | `mdx:9-10`: `heroImage` a la webp nueva (1344×752) y `heroImageAlt` idéntico al de §1 del brief. Revisión visual abajo |
| P1-2 revisión de fichas el día de publicación | **Abierto (propietario)** | Fechas en `mdx:8, 31, 81, 163, 204, 206, 215` siguen en 11/11/2026. Válido solo si se publica hoy; si no, actualizar registro y después artículo |
| P1-3 destino de los `s.click` | **Abierto (propietario)** | Los tres `href` (`mdx:108, 128, 152`) coinciden con el registro. Falta la comprobación manual anunciada y anotar su resultado en el registro |
| P2-1 `metricas.mjs` | Aceptado (encargo aparte) | Sin cambio esperado en el artículo |
| P2-2 F1 en H2-5 | **Resuelto** | `mdx:183` cita y enlaza AAHA 2023 |
| P2-3 comprobación de C | **Resuelto** | `mdx:141`: marco sin cojear, malla tensa, devolución en plazo. Sin datos nuevos de producto |
| P2-4 plazos de A en MX | Aceptado | `mdx:163` engloba ambos rangos del registro |
| P2-5 promesa semanal | **Resuelto** | Eliminada; `mdx:206` dice que los datos pueden cambiar. Coherente con la decisión del propietario |
| P2-6 I-2 a 390 px | Resuelto según la entrega | Rehecho en vertical con contornos geométricos (conforme a AGENTS.md). No repetí captura; build y check en verde |
| P2-7 generalización | **Resuelto** | Acotada a la ficha A |
| P2-8 título | Aceptado | Título sin cambio; la entradilla (`mdx:21`) aclara que solo B acredita entrada baja y que C es contraste |
| P2-9 teclado y movimiento reducido | Resuelto según la entrega | Prueba con Playwright declarada; el componente no cambió desde r1 |

## Portada nueva contra la dirección visual

`public/images/blog/camas-entrada-baja-perro-mayor-comparativa/mestizo-pastor-senior-entrando-cama-baja.webp`

Cumple:

- **Dirección de marcha coherente** (el motivo de rechazo de la portada v1 de golpe de calor): cuerpo, cabeza y paso avanzan de izquierda a derecha; patas delanteras sobre la cama, traseras en el suelo, como pide §8.
- **Anatomía:** cuatro patas con apoyos creíbles; ninguna duplicada ni imposible.
- **Rasgos senior** visibles a tamaño grande: hocico y cara encanecidos, mirada serena, línea dorsal descendente, cuartos traseros con poca masa, cabeza a la altura del lomo. Tipo pastor con orejas erguidas y pelo fuego y negro, como fija el brief.
- **Escenario:** baldosa clara, esquina de sofá de tela a la derecha, alfombra bajo la cama, ventana a la izquierda con luz de mañana; estantería, mueble de madera y plantas dan casa reconocible sin competir con el perro. Sin personas, marcas, cables, tarima ni salto.
- **Alt y escena coinciden.**

Observaciones menores (P2, no bloquean):

- **P2-A.** La cama es un colchón plano gris sin bordes, lo que se parece por concepto al modelo B de la comparativa. No es idéntica (sin logotipo, con capitoné), y el brief solo excluye «una cama idéntica a un producto comercial». Se acepta; si se regenerara en el futuro, un borde bajo en un lado ayudaría a leer «entrada baja» sin evocar B.
- **P2-B.** Las sombras hacia la derecha son poco marcadas, y la tracción de la alfombra no es verificable a la vista. Irrelevante para la lectura.
- **P2-C.** A tamaño móvil (portada recortada a ~390 px) el encanecimiento del hocico se sigue viendo, pero la línea dorsal y los cuartos traseros pierden lectura; la edad la sostiene sobre todo la cara. Aceptable.

## Hallazgos nuevos

- **P2-D. Documentación desfasada sobre la portada.** `entrega.md` sigue diciendo «sin `heroImage`» (línea 13), «I-1 portada: Falta» (línea 76) y la tiene como pendiente 1 (línea 84). La línea de estado del brief (línea 4) dice «sin portada I-1» y «Pendiente de auditoría del artículo». Ninguna sección registra procedencia de la portada (herramienta, prompt usado, fecha), que la dirección visual pide conservar. Hay que actualizarlo en `entrega.md` y en el estado del brief.
- No encontré datos de producto fuera del registro, precios, fugas del contrato ni `PENDIENTE` en el MDX tras las correcciones.

## Qué hacer, en orden

1. **Propietario, P1-3:** abrir a mano los tres `s.click` en móvil y escritorio con envío a MX y ES; comprobar ID y vendedor (`1005009119696851`, `1005005134788648`, `1005011771728376`); anotarlo en `docs/afiliacion/fichas-camas-comparativa.md`.
2. **Propietario, P1-2:** si la publicación no es el 11/11/2026, repetir la revisión de disponibilidad, entrega y devolución; actualizar primero el registro y luego `datePublished` y las fechas y plazos del MDX. Si algo cambia en vendedor, variante o país, ajustar o retirar la ficha.
3. **Sesión correctora (no esta), P2-D:** actualizar `entrega.md` (portada hecha, ruta, procedencia y prompt) y la línea de estado del brief. Sin tocar el artículo.
4. P2-A a P2-C: ninguna acción necesaria.

No hace falta una ronda r3 del texto. Basta con que el propietario confirme 1 y 2 y que alguien verifique el cambio documental del punto 3.
