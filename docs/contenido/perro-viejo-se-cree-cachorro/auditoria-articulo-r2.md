# Auditoría del artículo «Mi perro viejo se cree cachorro», ronda R2

- **Documento auditado:** `src/content/blog/perro-viejo-se-cree-cachorro.mdx`, commit `5b62ae5`, blob `9bf17764a9db2faa724f571ee9775996ea6988ae`.
- **Base:** [informe R1](auditoria-articulo-r1.md), que quedó intacto tras la reescritura del historial (lo comprobé con un diff contra `ef27c5f`).
- **Ronda:** **R2 de 3.**
- **Fecha:** 2026-11-18.
- **Rol:** revisor externo, desde la misma sesión auditora de la R1 (`…KP3wLDB…`). La corrección la hizo la sesión autora (`…KP5um27…`). No he modificado nada.
- **Encargo:** llegó como mensaje de la sesión autora, que dice actuar a petición del propietario. Audité sin ejecutar el `reset --hard` que pedía: revisé `origin/claude/old-dogs-article-fallai-4kt7q1` en un checkout separado.
- **Método:**
  - Revisé el diff `c353c9b → 5b62ae5` línea a línea.
  - Contrasté los añadidos nuevos con los resúmenes de PubMed (Freeman 22111652, Enomoto 38310147, Yarborough 36008509 y Mlacnik 17144822).
  - Comparé cada momento narrativo con el expediente.
  - Revisé 6 fotogramas del video v2 a 390 px y ampliados.
  - Amplié las placas de los originales del expediente y comprobé si GitHub sigue sirviendo los SHA antiguos.
  - Ejecuté `npx astro build` y `tono.py`, conté las palabras por H2 y rendericé con Playwright a 390 y 1366 px, en modo claro y oscuro.

## Veredicto

**APTO CON CAMBIOS.** En el artículo ya no hay nada bloqueante. La contradicción sobre Dakota, las rutinas de juego atribuidas a la familia y la cervical presentada como hecho están corregidas. Los añadidos nuevos están respaldados por su fuente, salvo una inferencia (N-3). Quedan dos frases que no constan en el expediente (N-2) y que se resuelven en minutos.

**Fuera del artículo hay un riesgo de privacidad abierto que el propietario debe conocer (N-1).** Reescribir la rama no ha retirado el original: GitHub sigue sirviendo el `luna-01.jpg` sin difuminar a través del SHA antiguo.

Mecánica:
- El build compila (exit 0).
- `tono.py` da 0,4 muletillas por cada 1.000 palabras.
- El total es de 5.373 palabras, dentro del rango de 5.100 a 6.900.

## Estado de los hallazgos de la R1

| R1 | Estado | Evidencia |
|---|---|---|
| H-1 Hechos añadidos | **Resuelto en lo grave, con un residuo (N-2)** | L359: «la adoptamos ya mayor, que llegó más delgada y que fue subiendo de peso» ✔. Cervical: «Creo que tiene algún problema…» (L167) y «sospechamos algo en el cuello» (L359) ✔. Los juegos pasan a consejo en segunda persona (L293–295) ✔. Se retiraron la palpación comparada, «sabemos poco», «Dakota come con ganas», «correría hasta caerse» y «siempre va a tener 5 meses» ✔. L299 ahora se apoya en un hecho documentado (la bolsa) ✔. Siguen sin respaldo L19 y la expresión «eras y épocas» (N-2) |
| H-2 Privacidad | **Resuelto en la rama, abierto en GitHub (N-1)** | Las placas de `luna-01` a `luna-04` están difuminadas, y sobre los nuevos originales el área queda opaca ✔. Los blobs antiguos (`aabe8b1`, `b905d7c`) no aparecen en `git rev-list --objects origin/claude/old-dogs-article-fallai-4kt7q1` ✔ |
| H-3 Video senior | **Resuelto** | En v2 la cara es blanca y gris, con cejas blancas, párpados caídos y bolsas bajo los ojos. A 390 px se lee senior en los 6 fotogramas. Póster v2. H.264 a 1280×720, 8 s, sin audio. Figura de 491 px en móvil y sin scroll horizontal |
| H-4 Hero | **Cerrado por decisión del propietario** | Registrado en el historial de la §11. Ya no es un hallazgo |
| H-5 Volumen | **Mejorado** | Total de 5.373 (era 5.204). Ver la tabla |
| H-6 Fidelidad | **Resuelto** | Bekoff: «morder sacudiendo la cabeza» ✔. Se quitaron los «nueve puntos» ✔. «Fisioterapia intensiva» en L289 y FAQ 6 ✔. Autor de la AAHA corregido a Dhaliwal en el brief ✔ |
| H-7 Pies | **Resuelto** | L126: «La cara blanca y el lomo delgado…». L176: «sobre la misma baldosa en la que a veces se le abren las patas» ✔ |
| H-8 Imágenes | **Resuelto en parte** | Las 9 llevan `width`, `height`, `loading="lazy"` y `decoding="async"` con sus dimensiones reales ✔, y los pies se siguen viendo como `<em>` (8 de 8) ✔. Las fotos verticales siguen midiendo 915 px a 1366 de ancho y los pares casi iguales siguen ahí (P2, sin cambios; las fotos reales sustituyen a la imagen 3 por decisión del propietario) |
| H-9 Repeticiones | **Resuelto en parte** | L270 remite al registro ✔, y «grasa y músculo» solo queda en L258 ✔. L225 y L262 siguen pidiendo anotar el peso y la palpación (P2 menor) |
| H-10 Afirmación conductual | **Resuelto** | L68: «Una pista práctica, que es observación y no un estudio» ✔ |
| H-11 Recursos | **Cerrado por decisión del propietario**, con el brief desactualizado (N-4) | |
| H-12 PNG | **Resuelto** | `originales/` ya no está en el árbol |

## Hallazgos nuevos

### P0 (fuera del artículo: decisión del propietario)

**N-1. El original sin difuminar sigue descargándose desde GitHub.**

Peticiones sin autenticar del 2026-11-18:
- `github.com/Gunz-cop/CuidaTuPerroViejo/commit/a1ecedd` devuelve **200**, y lo mismo `ef27c5f` y `c353c9b`.
- `raw.githubusercontent.com/Gunz-cop/CuidaTuPerroViejo/a1ecedd/docs/experiencias/…/luna-01.jpg` devuelve **200** y un archivo de **1.056.018 bytes**, idéntico en tamaño al blob original `aabe8b1`, el de los teléfonos legibles.

Borré la copia descargada y no transcribo los números.

GitHub conserva los commits que dejan de estar referenciados y los sirve por SHA hasta que su soporte los purga. Reescribir la rama no basta. Hay dos vías:
- (a) pedir a GitHub Support que elimine las vistas en caché y los objetos sin referencia del repositorio (procedimiento «Removing sensitive data from a repository»), indicando los SHA `a1ecedd`, `ef27c5f`, `c353c9b` y el resto de commits anteriores a la reescritura;
- (b) dar los teléfonos por expuestos.

No afecta al texto del artículo.

### P1

**N-2. Dos frases que siguen sin constar en el expediente.**

| Línea | Texto | Expediente |
|---|---|---|
| L19 | «A los 5 seguía igual de activa.» | No consta. Además es ambigua: el párrafo empieza con «Llegó a casa con 5 meses», así que no queda claro si son 5 meses o 5 años |
| L28 y L82 | «No sabe de eras ni de épocas» y «No se da cuenta de las eras ni de las épocas: solo está cerca de uno, viviendo» | El expediente dice «Para ella el paso del tiempo debe de ser distinto; solo vive cerca de uno». «Eras y épocas» no aparece. En la R1 se me escapó L28: lo corrijo aquí |

Es posible que estas expresiones vengan del dictado original del dueño. Si es así, basta con añadirlas al expediente. Si no, hay que retirarlas. Pasan de P0 a P1 porque no contradicen nada y no son datos clínicos.

### P2

**N-3. Una inferencia en Yarborough.** El dato de L287 es fiel. El resumen dice: «dogs with a history of neurological, eye, or ear disorders had higher odds of CCD». En cambio, «Si tu perro mayor ve u oye peor, es una razón más para mantenerlo activo con juegos de olfato» presenta como consecuencia del estudio algo que el estudio no prueba: es una asociación transversal y el propio artículo acaba de advertir de la causalidad inversa. Hay que marcarlo como sugerencia editorial («Los juegos de olfato son una buena opción si ve u oye peor»), sin «es una razón más».

**N-4. El brief no refleja las decisiones tomadas.**
- La §1 sigue con `heroImage: …beagle-senior-reverencia-juego.webp` y el alt «invitando a jugar».
- La §6 (línea 251) dice «**Imagen 3** aquí».
- La §11 conserva «3 imágenes ilustradas: Planificado» y el video `reverencia-musculo.mp4` como «Planificado».
- El estado de la línea 3 sigue en «5.814 palabras» con elementos pendientes.

No afecta al artículo, pero el brief es el registro del contrato.

**N-5. Detalles menores.**
- El video v2 pesa 5,4 MB (la v1 pesaba 2,4 MB). Lleva `preload="metadata"`, así que solo se descarga al reproducirlo.
- En los fotogramas 2 y 3 la perra levanta la cola, un gesto más propio de la reverencia de juego, mientras el pie dice «a medio echarse». No hace falta regenerar.
- L107 dice «alguna caída de cachorra» y el expediente dice «más de una vez». El propio artículo dice «varias veces» en L359.

### Comprobación de los añadidos nuevos

| Añadido | Línea | Fuente | Resultado |
|---|---|---|---|
| Sarcopenia frente a caquexia (cardíaca, renal, cáncer); ambos multifactoriales | L136–140 | Freeman, resumen: «cachexia… CHF, CKD, cancer… Sarcopenia… occurs in the absence of disease… pathophysiology… complex and multifactorial» | ✔ «Con causas que se suman» es una glosa aceptable. «Primero conviene que el veterinario descarte una enfermedad» es una recomendación editorial coherente |
| Articulaciones más afectadas: codo, cadera, tarso y rodilla | L186 | Enomoto, resumen: «most commonly affected joints in descending order… elbow, hip, tarsus, and stifle» | ✔ Se aplica a perros jóvenes, y el texto lo sitúa («En ese mismo estudio») |
| Asociación de la disfunción cognitiva con la edad y con problemas neurológicos, de vista y de oído | L287 | Yarborough, resumen | ✔ El dato es correcto; la inferencia, no (N-3) |
| Programa en casa frente al intensivo con electroestimulación, los dos con dieta | L242 | Mlacnik, resumen: «home-based physical therapy… intensive physical therapy program including transcutaneous electrical nerve stimulation… identical dietetic protocol» | ✔ Lo de «supervisada» (L289, FAQ 6) no aparece literal en el resumen, pero es razonable para un programa intensivo en clínica |

## Volumen H2 por H2 (frente a la §6)

| Sección | Real | Target | Desv. |
|---|---|---|---|
| Introducción | 404 | 500 | −19 % |
| Por qué tu perro mayor juega… | 671 | 750 | −11 % |
| Por qué dos perros… | 503 | 550 | −9 % |
| Lo que cambia por dentro… | 745 | 800 | −7 % |
| Señales que solemos confundir… | 689 | 800 | −14 % |
| El peso, en las dos direcciones | 668 | 800 | −16 % |
| Moverse sigue siendo medicina… | 788 | 900 | −12 % |
| Cuándo llevarlo al veterinario | 380 | 450 | −16 % |
| Conclusión + FAQ | 525 | 450 | +17 % |
| **Total (sin el cuadro de fuentes)** | **5.373** | 6.000 | −10 % |

Uso el mismo criterio que en la R1. `tono.py` da 5.251. El total cumple el rango. Tres secciones quedan justo fuera del ±15 % (Introducción, El peso y Cuándo), pero con contenido sustentado y sin relleno. No pido ampliarlas: el contrato permite ajustar y el informe ya lo deja registrado.

## Lo que sí funciona (no tocarlo)

- La corrección de Dakota en L359 («llegó más delgada y fue subiendo de peso») cuadra con L86 y con el expediente.
- La cervical aparece en todas partes como sospecha del dueño.
- La sección de juegos (L293–295) conserva el momento real («Luna sigue queriendo jugar») y convierte el resto en consejo para el lector, sin atribuirlo a la familia.
- La nueva H3 «Sarcopenia no es lo mismo que caquexia» aporta una decisión práctica (descartar una enfermedad antes de «más ejercicio») respaldada por Freeman.
- Las 15 fuentes siguen citadas por su nombre en su H2. Los cambios no rompieron ninguna atribución.
- Siguen igual de bien todos los puntos de «Lo que sí funciona» de la R1.

## Qué corregir, en orden

1. **N-1 (propietario).** Decide entre pedir la purga a GitHub Support o dar los teléfonos por expuestos. No hace falta que bloquee el merge del artículo, pero el merge tampoco lo resuelve.
2. **N-2.** Confirma con el propietario si «a los 5» y «eras y épocas» salieron de su dictado:
   - si es así, añádelos al expediente con la fecha;
   - si no, en L19 elimina la frase o escribe «A los 5 años ya era igual de activa» solo si se confirma, y en L28 y L82 vuelve a la formulación del expediente.
3. **N-3.** En L287, sustituye «es una razón más para mantenerlo activo con juegos de olfato» por una sugerencia que no se derive del estudio.
4. **N-4.** Pon al día en el brief la §1 (hero), la §6 (línea 251), la §11 (fila de imágenes y video v2) y la línea de estado.

Son correcciones cerradas y de pocas líneas. Si la sesión correctora aplica solo N-2 y N-3, el propietario puede decidir si hace falta una R3 (la última) o si basta con revisar el diff. En cualquier caso, quien corrija no audita.
