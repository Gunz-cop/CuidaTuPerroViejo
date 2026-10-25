# Inspección del productor — propuestas v4

Siete recortes y siete consultas, catorce generaciones en modo edición. Propuestas integradas: candidato 7 de cada imagen. Los originales y todos los descartes se conservan; la decisión estética queda al propietario. Es una corrección de producción tras su decisión del 2026-10-25, no otra ronda de auditoría.

La portada v1 y la casa v1 siguen sanas y mayores. Solo consulta/recorte añaden las señales secas y superficiales encargadas. El cuerpo sigue la referencia v3 aceptada. No se representa un paciente real ni se asigna un estadio clínico por apariencia.

## Cómo leer la evidencia

Cada región tiene un PNG de **300×300 píxeles, escala 1:1**, extraído del original nativo de 1672×941: ojo, oreja, trufa, pelaje y uñas. Los nombres `*-100.png` indican escala 100 %, sin ampliación ni retoque. Los mosaicos conservan esos 300 px por casilla: filas 1–7 y columnas ojo → oreja → trufa → pelaje → uñas. Se incluyen además recortes 300×300 de los WebP finales 1200×675 en [capturas/](capturas/); coordenadas en [mediciones-imagenes.json](mediciones-imagenes.json).

- [Todos los recortes a 390 px](candidatos/recorte-comparacion-390.png), orden por filas, izquierda a derecha; [zonas nativas al 100 %](candidatos/recorte-zonas-100.png).
- [Todas las consultas a 390 px](candidatos/consulta-comparacion-390.png); [zonas nativas al 100 %](candidatos/consulta-zonas-100.png).
- Final WebP de 400 reducido a 390: [recorte en blanco](capturas/recorte-claro-390.png) y [oscuro](capturas/recorte-oscuro-390.png). La captura real del artículo, a 390 px de ventana, muestra la imagen algo menor por los márgenes.
- Originales, referencias y prompts: [generaciones.json](generaciones.json), [prompts-generaciones.md](prompts-generaciones.md).

## Rasgos de las dos propuestas finales

En cada celda se indica **390 px / 100 %**. «No» significa que no puedo identificar ese detalle por separado a esa escala; no se sustituye por lo que pedía el prompt. Los milímetros describen el encargo del generador, no medidas de un perro real.

| Rasgo | Recorte: 390 / 100 % | Consulta: 390 / 100 % | Qué se observa |
|---|---|---|---|
| Canas en hocico / cejas / párpados | Sí / sí / no · Sí / sí / sí | Sí / sí / no · Sí / sí / sí | Hocico y cejas claros; los pelos finos del borde palpebral no se separan a 390. El aro de pelo ralo sí se distingue. |
| Ojos hundidos | Sí / sí | Sí / sí | Órbita sombreada, ojo marrón sereno y párpados relajados. |
| Lomo hundido y musculatura reducida | Sí / sí | Sí / sí | Concavidad tras la cruz, cadera marcada y muslo estrecho; se conserva la referencia corporal v3 aceptada. |
| Cabeza baja y apoyos prudentes | Sí / sí | Sí / sí | Nariz por debajo de la cruz en recorte; cabeza baja y pata extendida en consulta. Un apoyo trasero de consulta queda oculto. |
| Aro de pelo ralo periocular | Sí / sí | Sí / sí | Banda de piel rosada grisácea con pelo ralo alrededor del ojo visible. No se acredita su anchura en mm. |
| Borde escamoso **y costra distinta** | **No / no** | No / sí | En recorte hay escamas al 100 %, pero la pequeña costra no se distingue inequívocamente de ellas. En consulta hay punta marrón seca. |
| Trufa mate con parches claros | No / sí | No / sí | Parches pequeños en el borde superior; las fisuras finas pedidas no se resuelven con claridad. |
| Caspa fina en lomo | No / sí | No / sí | Motas claras pequeñas sobre hombro/dorso, legibles al 100 %; a 390 no se distinguen como caspa fina. |
| Uñas largas y curvas | Sí / sí | Sí / sí | Prolongaciones curvas en las patas visibles; en consulta el pie sujeto queda tapado. No se convierte el largo pedido en una medición real. |
| Ausencia de sangre exterior / úlcera abierta | Sí / sí | Sí / sí | Superficies secas; no se representa pus ni hinchazón. Rojo solo dentro de la jeringa. |
| Ausencia de texto o logos en la imagen | Sí / sí | Sí / sí | Las etiquetas de la animación son HTML aparte. |

**Límite explícito del generador:** tras siete candidatos de recorte no consigo diferenciar con seguridad la costra marrón de 4 mm de las escamas de la punta. Tampoco consigo fisuras finas inequívocas en la trufa de ninguna propuesta. La alternativa entregada es el candidato 7, que conserva el aro, escamas, parches de trufa, caspa y uñas, sin atribuirle en el alt una costra ni fisuras que no puedo confirmar. Si se exige ese detalle exacto, queda pendiente una edición focal de la punta y la trufa por un ilustrador; no hace falta sustituir la escena completa. La consulta 4 queda como alternativa con punta marrón especialmente legible, aunque sus uñas y aro son menos claros que en 7.

## Comprobación por región y candidato

Cada par es **visible a 390 / visible al 100 %**, en ese orden. «Oreja» exige escamas y costra diferenciables a la vez; en los recortes hay escamas al 100 % pero no una costra inequívoca. «Trufa» comprueba aspecto mate y parches, sin dar por conseguidas las fisuras finas.

| Tipo / candidato | Aro ojo | Oreja + costra | Trufa | Caspa | Uñas | Motivo del descarte o propuesta |
|---|---|---|---|---|---|---|
| [recorte 1](candidatos/recorte-1-claro-390.png) | No / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Aro periocular demasiado estrecho a 390; menos diferenciación entre pelo canoso y piel. |
| [recorte 2](candidatos/recorte-2-claro-390.png) | No / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Escamas de oreja muy claras, pero aro menos legible a 390 y uñas menos marcadas que en 7. |
| [recorte 3](candidatos/recorte-3-claro-390.png) | Sí / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Caspa más escasa y aro menos contrastado que en 7. |
| [recorte 4](candidatos/recorte-4-claro-390.png) | Sí / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Mejor parche claro de trufa y borde de oreja; uñas menos largas que en 7. |
| [recorte 5](candidatos/recorte-5-claro-390.png) | Sí / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Caspa legible al 100 %, con aro más estrecho que 7. |
| [recorte 6](candidatos/recorte-6-claro-390.png) | Sí / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Alternativa cercana: buen conjunto, pero el aro y las uñas de 7 se distinguen mejor a 390. |
| [recorte 7](candidatos/recorte-7-claro-390.png) | Sí / Sí | No / No | No / Sí | No / Sí | Sí / Sí | Propuesta integrada: aro y uñas más legibles; conserva lomo hundido, muslos estrechos, cabeza baja y cuatro patas. La costra no se diferencia inequívocamente de las escamas. |
| [consulta 1](candidatos/consulta-1-claro-390.png) | No / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Aro fino; uñas largas, pero menor lectura del pelo ralo a 390. |
| [consulta 2](candidatos/consulta-2-claro-390.png) | No / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Anillo más amplio que 1; uñas menos curvadas que 7. |
| [consulta 3](candidatos/consulta-3-claro-390.png) | Sí / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Aro visible, pero uñas oscuras con menos contraste que en 7. |
| [consulta 4](candidatos/consulta-4-claro-390.png) | Sí / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Alternativa con costra de punta bien marcada; menor lectura de las uñas que 7. |
| [consulta 5](candidatos/consulta-5-claro-390.png) | Sí / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Buen parche claro en trufa, pero aro y uñas menos marcados que 7. |
| [consulta 6](candidatos/consulta-6-claro-390.png) | Sí / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Buen conjunto, pero el aro de 7 es más legible. |
| [consulta 7](candidatos/consulta-7-claro-390.png) | Sí / Sí | No / Sí | No / Sí | No / Sí | Sí / Sí | Propuesta integrada: aro y uñas más claros a 390, con escamas y pequeña zona marrón seca en la punta de la oreja al 100 %. Mantiene escena, manos y jeringa. |

Los catorce candidatos mantienen identidad y composición reconocibles, sin sangre exterior, heridas abiertas, pus, hinchazón, texto o logos. Los descartes se deben a menor legibilidad o diferenciación de las señales. No se describe como idéntica una reconstrucción píxel a píxel: el recorte cambia ligeramente de escala dentro del lienzo, por lo que se reajustan los marcadores. No se recupera un cuerpo atlético ni se levanta la cabeza. La consulta conserva un apoyo trasero oculto tras los brazos, dos apoyos visibles y la pata muestreada extendida.

## Recta, alfa y gesto

[Recta cruz–grupa a 390 px](capturas/recorte-recta-390.png) y [a 1200](capturas/recorte-recta-1200.png). Grupa `(370,85)`, cruz `(760,74)`, contorno dorsal `(550,136)`: depresión vertical **56,1 px a 1200**, **18,2 px a 390**. Son puntos manuales del contorno. La nariz aproximada `(1140,320)` queda por debajo de la cruz.

Las variantes 1200, 800 y 400 del recorte tienen alfa real, 0–255, con fondo totalmente transparente. No percibo halo a 390 sobre los dos fondos; el propietario puede revisar el borde en las capturas. Se conserva la sombra corporal de la propia textura, sin sombra proyectada sobre un fondo.

En consulta la jeringa conserva cilindro, émbolo, pequeño contenido rojo y un tramo de aguja que termina en el antebrazo; el pulgar de sujeción queda proximal. No se afirma ver el interior de una vena ni medir un ángulo real en tres dimensiones. Se mantiene la distribución veterinaria izquierda/tutora derecha, collar gris, mirada a la tutora, mesa de acero y alfombrilla azul. El pie sujeto y un apoyo trasero siguen ocultos parcialmente; no se promete que puedan contarse los cuatro pies ni todas sus uñas. [Detalle original de la punción](capturas/consulta-puncion-100.png).

La animación avanza entre zonas externas de una imagen estática, sin deformar el perro. Los pasos, alt, introducción y pie de consulta señalan que son señales posibles, que muchos perros infectados se ven normales y que la ausencia de lesiones no descarta infección. La causa y el diagnóstico corresponden a la clínica.
