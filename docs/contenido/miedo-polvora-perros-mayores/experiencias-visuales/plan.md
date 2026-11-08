# Apoyos visuales de LA-01 (miedo a la pólvora)

Encargo del propietario (8-11-2026): al menos tres apoyos visuales animados, útiles y que retengan, sin formularios (checks sí). Componente: `src/components/article/PolvoraRecursos.astro` (variantes `casa`, `noche` y `lista`).

| Recurso | Pregunta del lector | Ubicación | Fuente del contenido | Interacción y alternativas | Altura medida (390 / 1366 px) |
|---|---|---|---|---|---|
| **Del patio a su cueva** (plano animado, 4 pasos) | ¿Dónde lo pongo y cómo lo paso del patio a un refugio? | H2-2, tras «Cómo hacerlo entrar sin jalarlo» | Texto del H2-2 y el H2-3: UNAM (patios), ESVCE (zona segura con salida), COLVET (cuarto interior, cueva bajo la mesa) | Anterior, reproducir/pausar, siguiente y repetir; ondas de pólvora, recorrido de la huella, candados, cuartos coloreados según cuánto se oye, cueva y ventilador | 611 / 777 px |
| **La noche, de la tarde al amanecer** (línea animada, 5 momentos) | ¿Qué hago en cada momento de la noche? | Final del H2-6 | H2-6, H2-7 y H2-8: placa, paseo y baño (COLVET, Cornell), cueva y música, acuerdos de la familia, comida (Riemer), urgencias, búsqueda, restos (UNAM) | Línea de tiempo con cinco botones más los controles; el cielo cambia, hay estallidos en la hora fuerte y restos al amanecer | 579 / 672 px |
| **Tu lista para el 24 y el 31** (checks) | ¿Ya tengo todo listo? | Final del H2-10, antes de la conclusión | Resumen de acciones de todo el artículo; ninguna nueva | 21 checks en 5 momentos plegados; anillo de progreso, contador por momento y mensaje al completar; se guarda en el navegador (`localStorage`); botones de imprimir y desmarcar | 511 cerrada, 742 con un momento abierto / 514 |

Límites: no se dibuja al perro (la huella lo representa), porque la skill pide no hacerlo con figuras simplificadas y aquí no había generación de imágenes. El plano es un esquema, no una medición acústica; lo dice el desplegable. La línea de la noche no fija horas.

Pruebas (Chromium, build local, 8-11-2026):
- Sin desbordamiento a 390 px ni a 1366 px. Todos los recursos miden menos de 900 px en móvil.
- Sin reproducción al cargar. La pausa detiene el avance (paso 0 → 0 tras 6 s). Con movimiento reducido el botón de reproducir queda desactivado.
- Sin JavaScript: 9 pasos legibles, sin controles visibles y los 21 checks presentes. La impresión muestra todos los pasos.
- Los checks persisten al recargar.
- No hay errores de JavaScript; los únicos 404 son las imágenes que aún no existen.
- Capturas en esta carpeta.

Pendiente: revisión independiente de esta ampliación visual (otra sesión) y aprobación visual del propietario.
