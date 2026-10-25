# Inspección del productor: candidatos a 390 px

Fecha: 25 de octubre de 2026. Esta anotación describe mi lectura de las imágenes; no sustituye la decisión estética del propietario ni constituye una nueva auditoría. Los PNG originales y los descartes se conservan en [candidatos/](candidatos/). La referencia de identidad sigue siendo la portada v1, que no se regenera.

Los cinco rasgos se anotan con sí/no. Cuando un detalle es demasiado sutil para resolverlo a esta escala se indica en la nota; «sí» no expresa una medición clínica. «Lomo y músculo» exige ambos, por lo que se marca no cuando la concavidad existe pero el muslo sigue lleno. El quinto rasgo describe ausencia de patología añadida en la ilustración, no acredita salud real.

## Recorte: ocho generaciones, antes de generar las consultas

Orden de las filas: el mismo de [la comparación a 390 px por candidato](candidatos/comparacion-ocho-recortes-390.png), de izquierda a derecha y de arriba abajo. Cada original tiene además reducciones individuales sobre blanco y sobre `#1a1a1a`.

| Candidato | Canas en hocico / cejas / párpados | Ojos algo hundidos | Lomo y músculo | Postura de mayor | Sin enfermedad inventada | Decisión para esta integración |
|---|---|---|---|---|---|---|
| [1](candidatos/recorte-1-claro-390.png) | Sí / sí / sí, borde fino | Sí, leve | No | No | Sí | Descartado: muslo redondeado y cuello alto. |
| [2](candidatos/recorte-2-claro-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Descartado: depresión dorsal pequeña; muslos llenos y cabeza alta. |
| [3](candidatos/recorte-3-claro-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Descartado: cuartos traseros voluminosos; cuello erguido. |
| [4](candidatos/recorte-4-claro-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Descartado: muslos redondos y cabeza alta. |
| [5](candidatos/recorte-5-claro-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Descartado: estrecha algo el muslo, pero conserva cuello y cráneo elevados. |
| [6](candidatos/recorte-6-claro-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Descartado: aún hay volumen en hombro/muslo y cabeza por encima de la cruz. |
| [7](capturas/recorte-v3-claro-390.png) | Sí / sí / sí, borde fino | Sí, leve: órbita sombreada y párpado relajado | Sí: depresión entre cruz y grupa, muslo más estrecho y cadera angulosa | Sí: nariz baja, cuello descendente y cuatro apoyos próximos | Sí: sin heridas, velo ocular ni emaciación representados | Propuesta integrada como v3; decisión visual del propietario pendiente. |
| [8](candidatos/recorte-8-claro-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | Sí | Alternativa conservada: cabeza baja y muslo estrecho; costado más oscuro que el objetivo en la muestra original (≈49/255). Se prefiere 7 para continuidad de tono. |

Los candidatos 1–4 usaron la portada para identidad y v2 solo como referencia de perfil. La herramienta heredó demasiado de su anatomía. En 5–8 se retiró v2 y se conservó únicamente la portada. En 7–8 se exigió bajar toda la cabeza y reducir expresamente el volumen del muslo; esos cambios se ven en la silueta.

### Evidencia del recorte 7 convertido a WebP v3

- [Blanco a 390 px](capturas/recorte-v3-claro-390.png) y [oscuro a 390 px](capturas/recorte-v3-oscuro-390.png).
- [Recta cruz–grupa a 390 px](capturas/recorte-v3-prueba-recta-390.png) y [a 1200 px](capturas/recorte-v3-prueba-recta-1200.png). Puntos elegidos manualmente sobre el WebP: grupa `(380,116)`, cruz `(760,103)`, contorno dorsal `(550,164)`. Separación vertical respecto de la recta en ese punto: **53,8 px a 1200; 17,5 px a 390**. Es una comprobación de silueta, no una clasificación automática de edad.
- Nariz aproximada `(1118,330)`: queda 227 px por debajo de la cruz en el lienzo de 1200 px. No se describe como cabeza erguida.
- Costado v3: **57,1/255**, media de `Y′ = 0,2126R + 0,7152G + 0,0722B` sobre ROI `(466,215,180,115)` del WebP. Con otra ROI corporal en v2, `(450,215,180,115)`, este método obtiene 66,6. **No es el método/ROI del auditor que obtuvo 82**, por lo que no se presenta como reproducción de su medición. La muestra v3 entra en 55–70 y en la comparación se ve más apagada.
- Alfa real en 1200, 800 y 400 px, rango 0–255 y píxeles de fondo totalmente transparentes. [Valores y SHA](mediciones-recorte.json).
- No percibo halo en los dos fondos a 390 px. Se conservan ampliaciones de [cara y bordes sobre claro](capturas/recorte-v3-bordes-claro-x3.png) y [oscuro](capturas/recorte-v3-bordes-oscuro-x3.png). El contorno fino del pelaje sigue siendo un juicio visual.
- Se distinguen cuatro patas, orejas y cola completas, sin collar ni sombra proyectada.

El alt enumera hocico/cejas canosos, lomo cóncavo, muslos estrechos, cabeza baja y cuatro patas. No atribuye un diagnóstico ni afirma una pérdida muscular medida. Los marcadores se recolocaron sobre la nueva oreja `(922,274)`, cara `(1054,311)`, cuatro pies y tronco `(535,258)` en el lienzo 1200×675.

## Consulta: quince generaciones posteriores al recorte

Las referencias y los prompts completos de cada intento están en [prompts-generaciones.md](prompts-generaciones.md). En 1–4 se usó además la consulta v2 para distribución; en 5–6 se retiró esa referencia. Los intentos 7–12 corrigen detalles de candidatos anteriores; 13–14 son nuevas composiciones desde recorte y portada; 15 cambia la pose del antebrazo de 14.

| Candidato | Canas en hocico / cejas / párpados | Ojos algo hundidos | Lomo y músculo | Postura de mayor | Sin enfermedad inventada | Motivo del descarte o propuesta |
|---|---|---|---|---|---|---|
| [1](candidatos/consulta-1-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Muslo lleno y cabeza alta; aguja demasiado larga sobre el antebrazo. |
| [2](candidatos/consulta-2-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Cuello erguido y cuerpo robusto; uñas demasiado salientes. |
| [3](candidatos/consulta-3-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Cuerpo robusto y cabeza alta; aguja prolongada sobre piel. |
| [4](candidatos/consulta-4-390.png) | Sí / sí / sí | Sí, leve | No | No | Sí | Mejor jeringa, pero aparece un parche redondo junto a la punción y conserva cuerpo robusto. |
| [5](candidatos/consulta-5-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | Sí | Cuatro apoyos y veterinaria fuera de encuadre salvo manos. |
| [6](candidatos/consulta-6-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Pata apoyada y línea roja sobre la piel. |
| [7](candidatos/consulta-7-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Pata levantada, pero persiste línea rojiza larga; [ampliación del defecto](candidatos/consulta-7-puncion-x3.png). |
| [8](candidatos/consulta-8-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Línea roja superficial, pese a pedir eliminarla. |
| [9](candidatos/consulta-9-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | La corrección atenúa el trazo, pero no lo elimina claramente. |
| [10](candidatos/consulta-10-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Aguja/trazo prolongado sobre la piel. |
| [11](candidatos/consulta-11-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Persiste marca superficial; además se degrada la textura por las ediciones sucesivas. |
| [12](candidatos/consulta-12-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | No | Mismo problema de marca sobre el antebrazo. |
| [13](candidatos/consulta-13-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | Sí | Vuelve a apoyar la pata muestreada; no mantiene los tres apoyos pedidos. |
| [14](candidatos/consulta-14-390.png) | Sí / sí / sí | Sí, leve | Sí | Sí | Sí | Aguja corta en contacto, pero pulgar demasiado distal y antebrazo demasiado vertical. |
| [15](candidatos/consulta-15-390.png) | Sí / sí / sí | Sí, leve: ojo oscuro bajo ceja canosa | Sí: depresión dorsal y muslo plano con relieve de cadera | Sí: cuello bajo y pata extendida hacia la veterinaria | Sí: no se representa sangre exterior, heridas ni velo ocular | Propuesta integrada como v3; [punción ampliada](candidatos/consulta-15-puncion-x3.png), pendiente de decisión del propietario. |

### Qué veo en la consulta propuesta y qué no puedo acreditar

La veterinaria está a la izquierda y la tutora a la derecha; la perra mira hacia la tutora, con collar gris visible, sobre la alfombrilla azul. La mano que sostiene el antebrazo queda por encima de la jeringa y su pulgar descansa en la zona proximal. La otra mano sostiene un cilindro transparente pequeño con émbolo y aletas; contiene una cantidad pequeña de rojo dentro. No hay tubo morado lleno ni sangre fuera. El tramo de aguja es corto y termina en el contorno del antebrazo; no se ve una punta libre flotando. La inclinación es baja respecto de la superficie local del antebrazo. **No se puede medir un ángulo anatómico real ni confirmar que una vena interna esté canalizada a partir de esta ilustración**; el prompt pide 15–30°, no lo convierte en una medición del resultado.

La pata muestreada está levantada y extendida hacia la veterinaria. El apoyo delantero opuesto y un apoyo trasero se ven; **el otro apoyo trasero queda oculto por los brazos**. No afirmo que la imagen permita contar tres contactos con la alfombrilla. Las uñas visibles son cortas y romas; las del pie sujeto quedan parcialmente tapadas por la mano. El encuadre tampoco permite verificar la punta de la cola. Son límites observables que el propietario debe tener presentes al decidir; se entrega la imagen completa y la ampliación, sin calificarlas como una validación clínica.

El alt describe una jeringa en la pata extendida, hocico canoso, lomo cóncavo y la sujeción de la cabeza; no afirma visualizar el interior de la vena ni tres pies apoyados. La portada conserva su archivo y recupera exactamente el alt encargado. Su pie generado por el layout coincide con ese alt, comprobado en navegador.
