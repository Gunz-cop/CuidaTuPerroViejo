# Corrección de la R4 del brief LA-01 (v5.1 → v6)

Fecha: 2026-10-27. R4 APTO con reservas (0 P0, 0 P1, 5 P2, 8 P3). El propietario autorizó R4–R6.

## P2

- **P2-1 Dakota y H2-4.** Decisión 3, §2 y §9.4: Dakota aparece solo en la fotografía y su pie, sin hechos. Decisión 4, *Origen* del H2-4 y §9.4: H2-4 sin caso; la perra del compañero va solo en H2-3 y no se relaciona con el H2-4.
- **P2-2 Identificación de la foto.** Vuelve a ser gate del propietario (§11); el §8 dice «sería» y describe a Luna (tricolor, delgada) y Dakota (más gordita) según el propietario.
- **P2-3 Imagen 4.** Fuera el consultorio (repetía la portada de vacunas): ahora la tutora escribe la lista en la cocina la noche antes, con el perro a sus pies. Vacunas añadida a los conceptos usados.
- **P2-4 Imagen 5.** Una sola geometría: cámara baja detrás de Baltor, en su rincón; se ven la puerta del cuarto y, al fondo del pasillo, la del apartamento abierta. Alt y aceptación alineados.
- **P2-5 Orden de la tarjeta.** El componente ya existe en la rama `claude/tarjeta-relacionada`: si el destino no está publicado, no renderiza nada (sin enlace roto ni fallo de build) y avisa en la consola del build con el slug. Así la tarjeta de España hacia LA-01 puede ir ya en ese PR y aparece sola al publicar LA-01; alternativa documentada para el propietario. Se descarta hacer fallar el build, porque impediría dejar la tarjeta preparada; el aviso cubre el riesgo de un slug mal escrito.

## P3

1. Estado, fecha, título del §8, §10, §11 e historial actualizados (fila R4).
2. Aceptación a 390 px en las imágenes 1 y 7.
3. Pie de la imagen 3 sin «muchos perros»; posición separada de la frase del compañero.
4. Alt de la foto sin «ortopédica»; pie reescrito sin parafrasear España; el gatito no se menciona.
5. Continuidad: misma tutora en las imágenes 4 y 7; el tutor de la 1, otro miembro de la familia.
6. Excepción de edad de Osa y Baltor llevada a `direccion-visual-editorial.md`.
7. Import condicionado de `TarjetaRelacionada` en el §4.
8. Aviso de cortesía al compañero, anotado en `TODO.md`.
