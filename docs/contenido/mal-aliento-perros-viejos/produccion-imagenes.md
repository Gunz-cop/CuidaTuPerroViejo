# Producción e inspección de ilustraciones

Fecha: 2026-10-22. Productor: agente coordinador `/root`, separado de los auditores del brief y del artículo. Esta es una comprobación de producción, no una auditoría independiente ni una revisión veterinaria.

Se utilizó `image_gen.imagegen`. La primera escena se generó y se inspeccionó antes de producir las otras dos; ambas se derivaron mediante `referenced_image_paths` de ese mismo original. Se conservaron los originales y los archivos finales se volvieron a abrir tras la conversión.

| Recurso | Original conservado en `assets-originales/blog/mal-aliento-perros-viejos/` | Derivación y comprobación del productor |
|---|---|---|
| R1 | `labrador-senior-observacion-v1.png` | Referencia: labrador chocolate de hocico y cejas canosos, orejas caídas, collar oliva y pequeña marca blanca en pecho. Cuatro patas completas y apoyadas; cuidadora con manos en su regazo. |
| R2 | `labrador-senior-registro-comida-v1.png` | Derivada de R1. Mismo perro y cuidadora; cuatro apoyos reconocibles, cuenco separado de patas, cabeza cerca de su comida mientras ella anota. |
| R3 | `labrador-senior-consulta-v1.png` | Derivada de R1. Mismo perro tumbado con extremidades y pliegues anatómicos reconocibles; personas revisan una hoja, sin abrir la boca ni mostrar resultados. |

La edad se aprecia en la cara y las canas; se mantienen ojos despejados y proporciones naturales, sin imponer cataratas ni heridas. No se simula movimiento corporal. Las escenas son ilustrativas y no representan pacientes, visitas reales, diagnósticos ni una revisión profesional del artículo. La firma global del sitio declara las ilustraciones generadas con IA y los textos alternativos deben describirlas como ilustraciones.

Los tres originales son horizontales de 1664 × 936. Se redimensionaron proporcionalmente, sin recortar, y se codificaron con `sharp` en WebP de 1200 × 675, 800 × 450 y 400 × 225 (calidad 83, esfuerzo 6). Los nueve WebP pesan en conjunto aproximadamente 639 kB. Archivos, dimensiones, bytes exactos y SHA-256 figuran en [imagenes.json](imagenes.json).

La decodificación y selección responsive en navegador se comprobarán sobre la integración real; la existencia de estos archivos todavía no acredita esa prueba ni cierra el artículo.
