# Auditoría visual R1 — procesionaria del pino y perros

Fecha: 2026-11-08. Revisión independiente de imágenes e integración local; ronda **1 de 3** del alcance visual. El texto queda cerrado en APTO R4: esta revisión no consume su quinta ronda, no reabre fuentes y no propone cambios de redacción.

## Veredicto

**Pendiente de una corrección visual: la viñeta derecha de la infografía de cierre.** Los otros seis recursos quedan conformes. Las cuatro escenas tienen buen acabado documental, continuidad y edad visible; las tres infografías son legibles. La corrección indicada cambia exclusivamente una imagen y sus variantes/referencias, sin tocar el texto aprobado.

## Versión y método

- MDX revisado: `src/content/blog/procesionaria-pino-perros.mdx`, SHA-256 `0738fbd28eda9b1b098ca81a38c0d668b149a61a788f29f8fca696df88890b3e`.
- Manifest: `visuales/recursos.json`, SHA-256 `6d4afc4611b7e7ff96d32f4f0fe9d24c506c896b4c9b3f58248d31e7642bf518`.
- Se abrieron individualmente los siete WebP finales de 1.200 px y sus siete variantes de 400 px. Se leyeron todos los rótulos, alt y pies. No se aprobó por los prompts.
- Se inspeccionaron las ocho capturas móviles que cubren los siete recursos (portada en ambos temas), y capturas de escritorio de portada y prioridades; se revisó el registro completo de las cuatro configuraciones en `verificacion/navegador.json`. Las capturas y las pruebas automatizadas fueron producidas por el coordinador; esta sesión inspeccionó su evidencia, sin afirmar haber ejecutado de nuevo Playwright, build o Astro check.
- Normas aplicadas: skill de recursos visuales, dirección visual editorial, apoyos responsive y adenda `ajuste-alcance.md`. Base textual aceptada: commit `6d8e476`, 5.960 palabras contractuales según `verificacion/metricas-dom.json`.

Archivos de 1.200 px revisados, todos bajo `public/images/blog/procesionaria-pino-perros/`; las variantes de 800/400 están ligadas al manifest anterior:

| Archivo | SHA-256 |
|---|---|
| `perro-aguas-senior-paseo-editorial-v2.webp` | `91bbdd64011cb77416f7eaf77c684a1f012dd5a71750d879966ac5e679b18ed5` |
| `perro-aguas-senior-observacion-editorial-v2.webp` | `9a9a556f6ba924080fa5d30922350c83960e864d4475b3a9a496c7b451f03998` |
| `infografia-alejarse-llamar-acudir-v2.webp` | `b56159c61d45f27b72b86ec668b97f456a06aa9fe13e175ce6c92e67c15ceda1` |
| `perro-aguas-senior-consulta-editorial-v2.webp` | `a8a553f5b0a1f0867faa531f478c2cdd3dd8eb6b42311b495e175e58875fe66a` |
| `perro-aguas-senior-descanso-editorial-v2.webp` | `1becd0a31a80c1a3080f4a1d4aa860284a82b8b3faa62b5be656d75a78e09e8a` |
| `infografia-prevencion-ruta-alternativa-v2.webp` | `505c39f4e3f58504a9c8357e63187b003e00c724438eee255a7313f5b700dc7f` |
| `infografia-siguiente-paso-v2.webp` | `f4007852669095283693f96508a33767aaf4159b62e06495a1fbb69114e061a2` |

## Único ajuste necesario

**V1 — Cierre, panel «PARA EL PRÓXIMO PASEO / ELIGE OTRA RUTA».** Archivo `infografia-siguiente-paso-v2.webp`, SHA-256 `f4007852669095283693f96508a33767aaf4159b62e06495a1fbb69114e061a2`.

La acera de la viñeta derecha discurre pegada a un pinar abierto, con copas de pino sobre el recorrido. El rótulo pide elegir otra ruta, pero la ilustración vuelve a situar el paseo junto a los pinos y no muestra el alejamiento que sí comunica el esquema preventivo. El defecto es de comunicación visual: no se está afirmando que cualquier pino convierta un lugar en peligroso ni fijando una distancia segura. Conviene eliminar esta ambigüedad en una pieza que resume la decisión final.

**Corrección concreta:** conservar la mitad izquierda, todos los rótulos, la composición y la paleta; sustituir solo la fotografía del panel derecho por una calle alternativa española con acera despejada y sin pinos ni ramas de pino sobre el recorrido. Mantener un acabado fotográfico comparable y no introducir perros, orugas, distancias, fechas ni mensajes nuevos. Versionar el archivo y sus variantes 1.200/800/400; actualizar la referencia y el manifest. El alt y el pie actuales siguen describiendo el mensaje y no necesitan cambios de contenido.

**Reauditoría R2:** limitada a esa sustitución, sus variantes, referencias y visualización en la página. El resto de esta revisión permanece válido si no cambia. No hace falta otra auditoría textual ni otra revisión completa de imágenes.

## Comprobación del perro, imagen por imagen

Las cuatro escenas conservan perro de aguas español mediano, marrón rizado, orejas caídas, cara gris, pequeño blanco del pecho y proporciones compatibles. Cuidadora, ropa y arnés gris mantienen continuidad; en descanso el arnés está retirado. No se usa al animal como paciente diagnosticado ni se escenifica una curación.

| Imagen | Canas: hocico, cejas y párpados | Ojos y expresión | Lomo y musculatura | Postura y apoyos | Sin enfermedad inventada |
|---|---|---|---|---|---|
| Portada | Sí; cara gris legible también a 400 px | Sí; mirada serena, contorno ocular envejecido, sin opacidad | Sí; perfil suavizado y cuartos traseros poco voluminosos | Sí; paso tranquilo, cabeza próxima a la línea del lomo, cuatro extremidades coherentes | Sí |
| Observación | Sí; distribución coherente con portada | Sí; ojos algo encajados y expresión calmada | Sí; grupa y hombros sin masa atlética, línea dorsal suavizada | Sí; de pie sobre alfombra, patas separadas y estables | Sí |
| Consulta | Sí; el perro ocupa menos encuadre, pero el rostro canoso se reconoce a 400 px y en la captura de 358 px | Sí; mirada y párpados compatibles con la referencia | Sí; silueta sin masa de exposición, grupa suavizada | Sí; permanece en el suelo, sin sujeción ni postura forzada | Sí |
| Descanso | Sí; cara, cejas y bordes oculares claros | Sí; ojos visibles, sin cataratas ni gesto doloroso | Sí; contorno relajado de perro mayor, sin emaciación; la postura recostada oculta parte de los cuartos traseros | Sí; cama baja, delanteras extendidas y traseras recogidas de forma plausible | Sí |

El conjunto de rasgos sostiene la edad en móvil; no se acepta únicamente por el hocico canoso. Portada y consulta priorizan el ambiente sin convertir al perro en un detalle irreconocible. No requieren recorte adicional.

Anatomía, manos y objetos: no hay extremidades duplicadas o cortadas, contactos imposibles ni tensión de correa. En portada, cuidadora y perro caminan hacia la derecha. En observación, el móvil queda en una mano y la otra descansa lejos de boca y ojos; no se simula exploración. En consulta, profesional y cuidadora conversan, con manos sobre rodilla/carpeta y correa floja. En descanso, escritura, libreta y apoyo del animal resultan comprensibles. Los materiales —piedra, terrazo, alfombras, madera, baldosa y tejidos— tienen textura y luz consistentes, con variedad entre interior frío y luz doméstica más cálida. No se aprecia acabado plástico o de catálogo que obligue a regenerar.

## Infografías, fidelidad y seguridad

| Recurso | Lectura comprobada a 1.200 y 400 px | Resultado |
|---|---|---|
| Prioridades | «SI SOSPECHAS CONTACTO», «1. ALÉJATE», «2. LLAMA», «3. ACUDE», «EL LAVADO NO DEBE RETRASAR EL TRASLADO» | Conforme: secuencia clara, el lavado permanece subordinado al traslado. Sin técnica ni dosis nuevas. |
| Prevención | «PREPARA LA RUTA», «OBSERVA DE LEJOS», «ELIGE OTRA RUTA», «AVISA AL AYUNTAMIENTO» | Conforme: el trazado abandona el entorno arbolado hacia la calle. «AYUNTAMIENTO» es el rótulo menor, pero se lee también en la captura móvil real; alt y pie conservan la decisión. Sin nido de identificación dudosa ni retirada doméstica. |
| Cierre | «EL SIGUIENTE PASO»; sospecha de contacto → atención veterinaria; próximo paseo → otra ruta | Textos conformes; pendiente solo la viñeta derecha descrita en V1. Las dos decisiones no se conectan como alternativas equivalentes. |

No hay perros en las infografías, por lo que el requisito senior no les aplica. Ninguna incorpora diagnósticos, síntomas fabricados, mezclas, fechas, ventanas de espera o garantías de recuperación. Los alt y pies corresponden a los contenidos reales; las ilustraciones no se presentan como fotografías clínicas.

## Integración y evidencia técnica

Se cumple la cantidad autorizada: portada y una figura en cada uno de los seis H2 escritos, incluida Conclusión; no se añade otra a la FAQ generada. Las variantes están registradas como 1.200/800/400 y las figuras del cuerpo usan `srcset`, dimensiones, carga diferida y enlace de ampliación. La evidencia de navegador confirma imágenes completas/decodificadas en 390 y 1.366 px, claro y oscuro; cuerpo con variante de 400 en móvil, sin desbordamiento horizontal ni errores JavaScript. La ampliación de imagen funciona con teclado. FAQ: siete elementos, ninguno abierto inicialmente. Son imágenes estáticas: los controles de animación no aplican.

| Recurso | Altura móvil del recurso con su pie, px CSS |
|---|---:|
| Portada | 259,38 |
| Observación | 302,16 |
| Prioridades | 334,55 |
| Consulta | 334,55 |
| Descanso | 372,12 |
| Prevención | 334,55 |
| Cierre | 334,55 |

Todos quedan por debajo del presupuesto de unos 900 px. Los rótulos se leen en la imagen de 400 px y en su presentación móvil de 358 px; la información esencial también permanece en HTML.

Contraste de pies, evidencia del coordinador `verificacion/contraste.json`: mínimo 8,89:1 en claro y 10,91:1 en oscuro; los pies del cuerpo alcanzan 16,24:1 y 18,19:1. Muestreo independiente de las zonas tipográficas de los tres WebP: 10,66:1 (prioridades), 11,15:1 (prevención) y 10,59:1 (cierre). Este último cálculo compara luminancias de núcleo de trazo y fondo claro, excluyendo el antialias; es un muestreo de contraste, no una certificación de cada píxel de una imagen con textura. La inspección visual confirma contraste amplio y ausencia de rótulos sobre fotografías que dificulten la lectura.

Logs del coordinador, inspeccionados en `verificacion/`: build completado incluida proyección Markdown; Astro check, 132 archivos, 0 errores, 0 warnings y 56 hints. Estas pruebas son locales, con solicitudes externas bloqueadas y fuentes de sistema. No acreditan despliegue ni publicación.

## Pendientes de cierre

Solo V1. Se conservan originales del generador y expediente; no se solicita retocar la prosa, las fuentes o el rango de palabras. La revisión visual no equivale a aprobación del propietario: todavía debe poder ver el resultado. No se fusiona ni despliega como parte de este dictamen.
