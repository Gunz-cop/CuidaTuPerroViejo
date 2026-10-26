# Auditoría visual independiente R3 FINAL — miedo a los petardos

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`. Versión de producción auditada: **`eb82b43e6aa5e4e06f0975f5c258d020a93b89fe`**. Tercera y última ronda autorizada. Auditor independiente; R1 y R2 se conservan intactas.

## Veredicto

**APTO VISUAL FINAL** para las tres imágenes y su integración auditada: el contraste que bloqueó R2 supera ahora 4,5:1 sin redondear, y se conservan los cierres de R1.

| Recurso final | Veredicto |
|---|---|
| Portada: PNG `imagen-1-v10.png`, WebP `bodeguero-senior-refugio-dormitorio-nochevieja-v2.webp` y variante `-v2-400.webp` | **APTO** |
| Paseo: PNG `imagen-2-v8.png` / WebP `bodeguero-senior-paseo-antes-de-nochevieja-v1.webp` | **APTO** |
| Consulta: PNG `imagen-3-v1.png` / WebP `bodeguero-senior-revision-dolor-consulta-v1.webp` | **APTO** |
| Alturas de tablas, rótulos compactos, contraste y pie hero | **APTO** |

**El paseo final muestra dos zapatos humanos conectados a sus dos perneras.** Los tres zapatos confirmados en R1 pertenecen al descarte v6, que sigue excluido. No se ha regenerado ninguna imagen después de R2.

Este veredicto cierra el alcance visual autorizado; **no aprueba la clínica ni otros pendientes documentales del artículo y no acredita publicación**. El artículo sigue en docs, sin copia permanente en `src/content/blog/`. No se requiere R4 ni otra corrección visual de las versiones auditadas.

## Alcance y método independiente

Se contrastó el único cambio de producción desde R2 contra `b4e5dfa`: añadido `opacity:.8` en `src/components/article/TablaApilable.astro:31`, dentro del selector móvil `.content-body .tabla-apilable[data-compacta] td[data-label]::before`. MDX, imágenes, schema y layout no tienen cambios. La comparación SHA-256 propia confirma también brief, testimonios, originales, variante400 e informes R1/R2 intactos. [Integridad propia](auditoria-r3/integridad-propia.json) y [hashes completos actuales](auditoria-r3/versiones-inspeccionadas.json).

Se abrieron de nuevo los **tres WebP finales reales a 1200×675**, sus **tres reducciones propias reales a 390×219** y cuatro capturas del productor de las tablas nuevas: calendario 390 claro/1366 oscuro y encuesta 390 oscuro/1366 claro. Los PNG originales y la variante400, ya abiertos individualmente en R1/R2, se comprobaron por identidad de hash; no se presenta esta comparación como una nueva apertura de esos originales.

Se ejecutó el **script propio** de R2 adaptado a R3 sobre el build local nuevo servido en `127.0.0.1:4466`, con Chromium y Playwright existentes, a 390/1366 claro/oscuro. Se produjeron 12 capturas propias de portada y tablas; se abrieron cinco de ellas para verificar etiquetas, reflujo y pie. Se midieron los estilos efectivos, composición alfa continua, contraste, alturas, overflow, caption/alt/schema, carga de las tres imágenes y fallback en otro artículo. No se aceptaron las métricas del productor como sustituto de esta ejecución.

Evidencias: [script](auditoria-r3/verificar-independiente.cjs), [resultados completos](auditoria-r3/verificacion-propia.json), [resumen exacto](auditoria-r3/resumen-mediciones-propias.json), [método y archivos](auditoria-r3/README.md). No se repitió el build ni el CLS; ambos conservan su evidencia de producción en `correccion-r2/`.

## Cierre del único P1 de R2

**P1-R2-01, CERRADO.** Las 22 etiquetas móviles visibles tienen ahora opacidad efectiva **0,8**, frente a 0,75 en R2. El contraste se decide sobre el valor continuo, sin redondear el umbral:

| Viewport / tema | Contraste mínimo de los 22 rótulos | Mínimo de la muestra completa¹ | Fallos <4,5 |
|---|---:|---:|---:|
| 390 claro | **5,1243417398846445:1** | 4,504492059318877:1 | 0 |
| 390 oscuro | **7,320617352599585:1** | 5,516990353269591:1 | 0 |
| 1366 claro | No hay rótulos móviles visibles | 4,504492059318877:1 | 0 |
| 1366 oscuro | No hay rótulos móviles visibles | 5,516990353269591:1 | 0 |

¹ Muestra propia: texto de celdas, cabeceras, pseudorrótulos visibles y figcaption hero; no todos los textos del sitio ni todos los avisos.

Conserva el texto de las etiquetas, las seis formas cortas «Según los dueños» y sus atributos largos. En las [capturas propias móviles claras](auditoria-r3/390-light-encuesta.png) y [oscuras](auditoria-r3/390-dark-calendario.png) no aparece un nuevo corte u ocultación de información. El cambio de opacidad no altera dimensiones.

## Conservación de los cierres de R1

**Portada:** franjas finas rojas **y** amarillas sobre el plano interior opaco junto al radiador, distintas de las rendijas de persiana y distinguibles a 390. La mano sigue fuera de contacto con la perra; una mano, cero piernas/pies humanos visibles. Cuatro patas caninas, cola continua, misma postura autorizada sobre codos y mentón levantado. No se encontró anomalía anatómica nueva. [Final a 390](auditoria-r3/portada-final-390.png).

**Paseo:** dos perneras y dos zapatos, sin pie extra; cuatro patas caninas trazables, mismo bodeguero en primer plano y tutor detrás, ambos hacia derecha. Un cabo flojo en J/U termina en unión con dos ramales; permanecen los dos mosquetones a arnés/collar y chapa lisa. El hash coincide con el ya inspeccionado en grande y recorte nativo de R1. [Final a 390](auditoria-r3/paseo-final-390.png).

**Consulta:** cuatro manos humanas relacionadas con veterinaria/tutora, con dedos parcialmente ocultos por agarre sin duplicación discernible; cuatro patas apoyadas sobre alfombrilla. Gesto de exploración y premio coherentes, sin enfermedad inventada ni manipulación forzada. [Final a 390](auditoria-r3/consulta-final-390.png).

La identidad y los cinco rasgos senior siguen siendo los de las imágenes de R2, cuyos hashes no cambiaron:

| Rasgo | Portada / paseo / consulta en las reducciones actuales |
|---|---|
| Canas en hocico, cejas y párpados | Conservan hocico y contorno ocular aclarados, ceja fuego apagada; el pelo individual se resuelve en los originales ya auditados. |
| Ojos algo hundidos, párpados caídos, sin velo | Mantienen el ojo pequeño bajo arco palpebral pesado, efecto leve y mirada serena, sin catarata añadida. |
| Dorso y masa muscular de mayor | Silueta dorsal suavizada y cuartos traseros afinados; sin musculatura atlética o emaciación. |
| Postura natural de mayor | Tumbada tranquila autorizada / zancada prudente con cabeza baja / cuatro apoyos estables en consulta. |
| Sin enfermedad inventada | Sin lesiones, ojos rojos, jadeo extremo, cojera escenificada o sufrimiento nuevo. |

Estas señales describen una representación visual; no certifican edad cronológica, sexo, peso o diagnóstico real. Se conserva el tipo bodeguero tricolor, antifaz derecho, marcas dorsales generales, orejas plegadas, cola larga y collar gris con chapa. No se reutiliza ningún descarte.

**Tablas:** las alturas medidas por este auditor siguen dentro del presupuesto móvil aproximado de 900 px y no hay scroll horizontal:

| Viewport / tema | Calendario, px CSS | Encuesta, px CSS | scrollWidth |
|---|---:|---:|---:|
| 390 claro / oscuro | 777,53125 | 889,921875 | 390 |
| 1366 claro / oscuro | 488,5625 | 650,34375 | 1366 |

**Pie:** la prueba propia mantiene literalmente «Un refugio preparado con antelación: lejos de la ventana, persiana bajada, cama conocida, agua y un juguete relleno». Alt descriptivo separado; ImageObject con ruta hero v2 y caption editorial. [Captura propia](auditoria-r3/390-light-portada.png). Los dos alts/pies interiores no cambian ni contradicen sus imágenes.

## Regresiones y límites

La regla añadida sigue dentro de la media query móvil y exige `[data-compacta]`; no cambia el estilo por defecto ni el escritorio. Se repitió el testigo **mal-aliento-perros-viejos** en los cuatro modos: caption igual al alt por fallback, tabla sin `data-compacta`, rótulo móvil en bloque y opacidad **0,75** conservada; escritorio sin ese rótulo y opacidad computada 1. No se encontró una regresión causada por esta modificación. Ese testigo no constituye una auditoría de accesibilidad de otros artículos: sus estilos heredados permanecen fuera de esta corrección acotada.

Las tres imágenes decodifican en los cuatro modos; cero errores JavaScript observados; `scrollWidth` coincide con viewport y los details siguen cerrados. Se conserva la limitación de R2: fuentes de la página principal servidas desde caché local, una URL de Outfit no cacheada al abrir el testigo fue bloqueada. No se usa ese testigo para certificar métricas tipográficas. No se probaron Safari/Firefox, móvil físico, lector de pantalla ni despliegue público. El contraste propio cubre la muestra indicada, no declara conformidad WCAG de todo el sitio.

## Hallazgos y cierre

**Sin P0, P1 o P2 nuevos en el alcance auditado.** P1-R2-01 cerrado; franjas de portada, altura de tablas y pie hero permanecen corregidos. Conservar las versiones actuales y la exclusión de v6.

No queda corrección visual pendiente para este conjunto. La auditoría termina en **R3 APTO**. Los pendientes clínico-documentales previos conservan su estado independiente. El auditor solo añadió informe y evidencias de R3; sin corregir producción, commits, PR, merge o publicación.
