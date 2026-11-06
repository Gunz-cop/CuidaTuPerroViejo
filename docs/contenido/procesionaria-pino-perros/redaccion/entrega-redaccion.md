# Entrega de redacción: procesionaria del pino y perros

Fecha: 6 de noviembre de 2026. Alcance autorizado: artículo completo, solo texto, y posterior auditoría independiente. Este documento registra la verificación del autor; no constituye una auditoría ni consume intentos del contador de cinco auditorías del artículo.

Artículo definitivo: `src/content/blog/procesionaria-pino-perros.mdx`. Copia auditada idéntica en `docs/contenido/procesionaria-pino-perros/redaccion/procesionaria-pino-perros.mdx`; edición de lectura sin imágenes pendientes en `articulo-lectura.md` de esta carpeta.

SHA-256 del artículo corregido después de R1: `5422f98483c1ce7fd32d8b340ee750cd3dd6847a053789bea3629de71c5a85ce`.

Brief aplicado: `briefings/briefing-procesionaria-pino-perros.md`, versión 2, aprobada en R2; SHA-256 `b31810de41f8452d801f6e03e1bf305756647070e866e6a2497eb4195c33ddf0`.

El texto completó la auditoría independiente R2/5 y los controles técnicos locales. El coordinador guardó una copia con el hash auditado en la colección y registró el estado de redacción en brief e inventario. La rama de revisión permanece sin fusionar ni desplegar. El campo `status` del frontmatter reproduce el contrato y no funciona como barrera de despliegue; los recursos y gates pendientes impiden considerar lista la publicación.

## Frontmatter del artículo

```yaml
title: "Procesionaria del pino y perros: primeros auxilios y cuándo ir a urgencias"
seoTitle: "Procesionaria y perros: qué hacer y cuándo ir"
metaDescription: "Qué hacer si tu perro toca o lame una procesionaria: señales de alarma, lavado seguro y traslado a urgencias. Prevención para paseos en España."
pilar: "salud-perros-mayores"
keywordPrincipal: "procesionaria perros"
heroImage: "/images/blog/procesionaria-pino-perros/perro-aguas-senior-ruta-alternativa-v1.webp"
heroImageAlt: "Ilustración de un perro de aguas español mayor y su cuidadora caminando por una acera, alejados de una zona de pinos."
status: "Publicado"
datePublished: "2026-11-06"
```

## Tabla de verificación de extensión

Contrato visible: **5.500–6.000 palabras**, objetivo 5.750. El recuento sobre HTML real de la versión final, repetido por el auditor, es **5.937 palabras**, dentro del intervalo. Cuenta texto visible de encabezados, listas, títulos y contenido de AlertBox y las siete preguntas/respuestas del FAQ —incluido su título generado—; excluye YAML, imports, sintaxis, URL, alt, pies de imagen y bibliografía. La corrección de R1 se limita a la bibliografía excluida del contrato; la versión final se recompiló y conserva los mismos conteos por bloque.

| H2 o bloque | Palabras reales visibles | Target (Sección 6) | Desviación |
|---|---:|---:|---:|
| Introducción | 133 | 150 | −11,3 % |
| Señales de contacto: cuándo salir hacia urgencias | 810 | 800 | +1,3 % |
| Qué hacer antes de llegar: apartarse, llamar y lavar solo si es seguro | 1.122 | 1.100 | +2,0 % |
| Qué información necesita el veterinario y cómo se valora el daño | 949 | 900 | +5,4 % |
| Después del alta: qué registrar en un perro mayor | 1.038 | 1.000 | +3,8 % |
| Pasear en España: evitar el contacto sin depender de un mes fijo | 1.163 | 1.100 | +5,7 % |
| Conclusión | 104 | 100 | +4,0 % |
| FAQ: siete preguntas y respuestas | 618 | 600 | +3,0 % |
| **Total** | **5.937** | **5.750** | **+3,3 %** |

Todos los bloques cumplen el ±15 % individual. Hay cinco H2 de desarrollo, sus H3 previstos, conclusión y FAQ final plegado. El FAQ no introduce un H2 manual adicional.

Recuento suplementario del autor sobre el MDX: **5.914** palabras, tras retirar YAML/imports, bibliografía, imágenes/pies, etiquetas y URL, conservar texto ancla y extraer los atributos `question` y `answer` del FAQ. Ese recuento no incluye los títulos de AlertBox ni el título de FAQ generado por el componente; por ello se utiliza el DOM para el total contractual.

Recuento bruto de diagnóstico actualizado después de R1: **6.193** elementos separados por espacios en el cuerpo MDX, después del segundo delimitador YAML y sin líneas `import` ni separadores `---`. Incluye sintaxis, bibliografía, alt y pies; no representa el cuerpo visible pactado en el brief v2. El script productivo antiguo `metricas.mjs` no se ha alterado: su parser de targets exige `Target:` y no interpreta los encabezados de targets del brief v2, ni su tabla S1–S5. No se presenta su conteo bruto como un fallo del contrato visible.

## Párrafos, tono y componentes

Densidad medida por el autor sobre párrafos de prosa, sin FAQ, bibliografía, listas ni AlertBox: **135 párrafos; media 35,75 palabras; mediana 36; 0 % por encima de 50; máximo 45**. El primer render comunicado confirma media 35,81, mediana 36 y máximo 45, con las diferencias menores propias de extraer texto renderizado.

Comando ejecutado sobre el archivo final:

```bash
python3 .agents/skills/references/scripts/tono.py docs/contenido/procesionaria-pino-perros/redaccion/procesionaria-pino-perros.mdx
```

Resultado: 5.339 palabras computadas por ese instrumento, tres muletillas, **0,6 por cada 1.000 palabras**. El denominador es propio del filtro del script; no sustituye el recuento contractual.

Comprobaciones del autor: cuatro AlertBox totales —info inicial, danger, warning y bibliografía info aparte—, siete FAQ, cuatro enlaces internos del brief, dos referencias de imagen en cuerpo y una hero, sin firma manual ni caso ficticio. La guía utiliza tú/vosotros y vocabulario de España.

## Revalidación de fuentes y límites

Las cinco fuentes se abrieron de nuevo durante la redacción, independientemente del registro del brief. Cada H2 contiene nombres de las fuentes y enlaces junto a las afirmaciones; las cinco aparecen también en el cuadro final. No quedó ninguna URL sin verificar.

| Fuente | Localización utilizada | Uso y límite conservado |
|---|---|---|
| COLVET / Colegio de Veterinarios de Murcia, 28-02-2026 | Introducción; H2-1; H2-2; bibliografía | Urgencia ante sospecha, signos y agua templada sin frotar. Traslado prioritario; no se atribuye neutralización térmica ni una ventana de espera. |
| Generalitat Valenciana, 05-03-2021 | H2-2; H2-5; bibliografía | Protección del cuidador, no provocar vómito, evitar contacto y avisar a autoridades. Se excluyen bicarbonato y retirada doméstica de nidos. |
| Niza y colaboradores, 2012 | H2-3; FAQ; bibliografía | Resumen accesible de serie retrospectiva de 41 perros en Portugal. Se identifica ese alcance; no se afirma haber leído el texto completo, ni se extrapola un pronóstico geriátrico. El dato de atención antes de dos horas no se convierte en plazo seguro. |
| Kaszak, Planellas y Dworecka-Kaszak, 2015 | H2-1; H2-3; H2-4; bibliografía | Revisión leída para exposición, afectación oral/ocular y evolución de lesiones. Se excluyen dosis, protocolos farmacológicos y recomendaciones históricas de agua caliente o mezclas domésticas. |
| ICOVAL, 23-01-2026 | H2-3; H2-5; FAQ; bibliografía | Aviso provincial fechado de aparición temprana en Alicante, más valoración clínica. No se presenta como alerta actual de toda España ni predicción nacional de temporada. |

Se prioriza en todo el texto apartarse, pedir atención y salir hacia urgencias. El lavado es superficial, suave y condicional: se omite ante respiración o deglución difíciles, resistencia, riesgo de mordedura o demora del traslado. No se indican dosis, medicación doméstica, exploración forzada de la boca ni pronósticos basados únicamente en la edad.

## Recursos visuales pendientes por el alcance de solo texto

Se mantienen el plan y las referencias del brief, con continuidad de un perro de aguas español mayor. **Faltan los tres archivos visuales**, incluidos la hero y los dos de cuerpo. No se han generado ni se han incluido marcadores editoriales de pendiente dentro del artículo.

| Recurso | Ubicación prevista | Archivo pendiente |
|---|---|---|
| Hero: paseo por ruta alternativa | Frontmatter | `public/images/blog/procesionaria-pino-perros/perro-aguas-senior-ruta-alternativa-v1.webp` |
| Preparar la llamada | Final de H2-3 | `public/images/blog/procesionaria-pino-perros/perro-aguas-senior-preparar-llamada-v1.webp` |
| Descanso y registro después de atención | Final de H2-4 | `public/images/blog/procesionaria-pino-perros/perro-aguas-senior-descanso-registro-v1.webp` |

Las imágenes de cuerpo tienen alt y pie; la hero tiene alt y no se duplica en el cuerpo. No hay descargables, formularios ni recursos ofrecidos que requieran archivos adicionales. La producción y verificación visual quedan fuera de esta entrega textual y pendientes antes de publicar.

## Cierre y auditorías del artículo

- R1: no apto por las cinco anclas bibliográficas parafraseadas. Informe `../auditoria-articulo-r1.md`.
- Corrección: únicamente títulos exactos en esas cinco anclas; URLs y todo fuera de bibliografía intactos. Copia previa conservada para comparar.
- R2: **APTO para entrega del texto**, sin bloqueantes. Informe `../auditoria-articulo-r2.md`. Misma sesión auditora, revisión limitada al ajuste y sus efectos; no repitió la revisión completa de fuentes.
- Contador del artículo: **2/5**, reiniciado por autorización expresa para este nuevo documento. Las dos rondas del brief permanecen en su historial independiente.

`npx astro build` terminó con salida 0 en la copia temporal del proyecto, incluida la proyección Markdown y generación de artefactos del sitio. Registro: `verificacion-r2/build.log`. El HTML renderizado se midió de nuevo, sin cambio de extensión. Datos y método: `verificacion-r2/metricas-dom.json` y `medir_dom.py`.

Navegador local: 390 y 1.366 px, modos claro y oscuro, siete FAQ cerradas inicialmente, apertura/cierre con teclado, sin desbordamiento horizontal, anclas ausentes o errores JavaScript. Evidencia: `verificacion-r2/navegador.json` y capturas. Las solicitudes externas se bloquearon; la lectura usa fuentes de sistema. Son pruebas locales, no comprobación de despliegue ni validación de imágenes.

**Pendientes antes de publicar:** producir e inspeccionar las tres imágenes; completar la revisión de maquetación con tipografía y recursos definitivos. La prueba de 390 px registra máximo ocho líneas por párrafo y 137/138 por encima de tres: no se declara aprobado ese límite físico. La densidad textual sí está medida (media 35,81, máximo45), con observación de maquetación conservada en la auditoría. Comprobar navegación y recurso de calidad de vida en su recorrido completo, y verificar URL/recursos públicos después del eventual despliegue.

La publicación no se ha realizado. El encargo de solo texto está completado.
