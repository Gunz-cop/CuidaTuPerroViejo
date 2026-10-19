# Producción visual

Fecha: 2026-10-19. Responsable: agente de creación del artículo y sus recursos; este documento registra comprobaciones propias, no una auditoría independiente ni aprobación del usuario.

## Sujeto y procedencia

Tres ilustraciones generadas con `image_gen`, sin paciente ni caso clínico real. Ficha acordada con el creador del brief: beagle senior mediano, tricolor, silla negra, cabeza y orejas caídas canela, hocico y cejas encanecidos, ojos marrones, pecho y patas blancos. No se impone enfermedad ocular ni se representa una lesión o ausencia dental visible. Misma cocina doméstica verde salvia, plato bajo y ancho y superficie antideslizante.

Primero se generó e inspeccionó la referencia hero a tamaño completo. Se comprobaron cara, edad visible, orejas, cuatro extremidades y apoyos, proporciones, plato y entorno. Las otras dos escenas se generaron usando ese archivo como referencia y se inspeccionaron por separado. Conservan identidad, envejecimiento y anatomía. No hay alimentación forzada, boca abierta ni instrumental clínico. No se usa recorte de perro: la secuencia prevista explica un proceso con alimento y utensilios.

| Función | Archivo público, base 1200 × 800 | Original conservado |
|---|---|---|
| Hero/referencia | `/images/blog/alimentacion-perros-mayores-sin-dientes/beagle-senior-comida-blanda-v1.webp` | `originales/beagle-senior-comida-blanda-v1.png` |
| Preparación | `/images/blog/alimentacion-perros-mayores-sin-dientes/preparar-textura-comida-perro-v1.webp` | `originales/preparar-textura-comida-perro-v1.png` |
| Observación | `/images/blog/alimentacion-perros-mayores-sin-dientes/observar-comida-perro-senior-v1.webp` | `originales/observar-comida-perro-senior-v1.png` |

Cada escena tiene variantes `-800.webp` (800 × 533) y `-400.webp` (400 × 267), manteniendo proporciones mediante Lanczos y WebP calidad 83. Son nombres nuevos con versión `v1`; no se sustituyó un archivo publicado con caché previa. Los originales de la herramienta permanecen además en `/workspace/generated_images/` durante esta sesión.

## Instrucciones de generación conservadas

Referencia: ilustración editorial fotográfica horizontal 3:2 de un beagle visiblemente mayor, tricolor, hocico y cejas blancos, orejas canela caídas y ojos marrones. Cuerpo completo con cuatro apoyos naturales en esterilla, ante un plato bajo de húmedo homogéneo, cocina salvia y crema, luz natural. Sin texto, logotipos, heridas, cataratas impuestas, boca abierta o jeringa.

Preparación, derivada de la referencia: el mismo perro al fondo sobre el suelo; dos manos con anatomía correcta deshacen alimento húmedo con un tenedor sobre encimera. Plato bajo, lata sin marca y jarra en reposo, sin añadir una proporción de agua. Perro separado del alimento hasta el servicio.

Observación, derivada de la referencia: el mismo perro comiendo voluntariamente a ras de suelo, postura natural y cuatro patas apoyadas; libreta en mesa lateral fuera de su alcance, sin texto legible. No representa un desenlace médico.

Diferencia entre el prompt propuesto en el brief y el recurso real: no aparece un cuidador en la tercera escena. Se conserva la imagen porque muestra la toma voluntaria y la libreta, y el alt final describirá únicamente esos elementos visibles. La recomendación de observar a distancia pertenece al texto explicativo, sin atribuir esa presencia al encuadre.

## Verificación funcional

Pendiente de integrar el artículo tras APTO del brief. El cierre de esta sección registrará decodificación en navegador, tamaños realmente seleccionados, capturas y pruebas de los componentes. Este estado no equivale a recurso publicado.
