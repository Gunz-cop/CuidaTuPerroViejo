# Auditoría independiente del artículo — ronda 3 de 3

Informe aportado por el usuario en el chat el 2026-10-22 y transcrito por coordinación. No es una auditoría realizada por quien guarda este archivo. El informe no aporta hash propio; al recibirlo, la versión entregada era el commit `8c4debde9c91c3c55b1ddc8706f3881681d8593e`, con MDX SHA-256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`. La corrección posterior indicada por este informe tiene su versión y comprobaciones separadas en [corrección R3](correccion-tras-r3.md).

El contador del artículo queda en **3/3**, sin posibilidad de cuarta ronda. Los conteos y verificaciones siguientes son los comunicados por el usuario; se conservan sus diferencias de método respecto a R2 y a los controles de producción.

## Informe recibido

**Resultado: APTO, con tres avisos que no bloquean.** No encontré datos inventados, instrucciones del brief que se hayan colado en el texto publicado ni reglas obligatorias del brief suavizadas en el artículo. Como esta ronda aprueba, el límite de tres no frena nada. Una ronda más no sería posible.

### Qué comprobé y qué encontré

- **Volumen:** 10 de 10 secciones dentro de ±15 % de su objetivo. El total es de 5.602 a 5.862 palabras según el contador, dentro del rango de 5.100 a 6.900. Los párrafos tienen una media de 37 palabras, con un máximo de 50 y ninguno por encima de 50.
- **Tono:** 0,4 muletillas por cada 1.000 palabras (el límite es 3). Todo de tú, sin voseo ni relleno SEO.
- **Fuentes:** abrí 10 de las 12 y comprobé cada frase contra lo que dice la fuente:
  - **Merck, cuándo ir al veterinario:** sí incluye dolor intenso o constante y letargo extremo.
  - **PDSA, mal aliento:** dice textualmente *"isn't normal, even in older dogs"*.
  - **PDSA, enfermedad renal:** úlceras en la boca solo en casos graves, y pruebas de sangre, orina, presión e imagen. Coincide con el artículo.
  - **Merck, páncreas:** dice que la cetoacidosis es *"a medical emergency"* y que puede haber dificultad respiratoria. Coincide.
  - **Merck, boca:** confirma los pliegues del labio con mal olor y la resistencia a que le revisen la boca por dolor.
  - **Cornell:** confirma que las radiografías se hacen bajo anestesia y que el cuidado en casa se retoma según indique el veterinario.
  - **AAHA, cuidados senior 2023:** dice textualmente *"Advanced age alone is not a contraindication to general anesthesia"*.
  - **FDA:** confirma que hay xilitol en dentífricos y enjuagues, y que hay que llamar de inmediato.
- **Imágenes:** revisé las tres. Es el mismo labrador chocolate, de hocico canoso y collar verde oliva, con cuatro patas bien apoyadas. No hay bocas enfermas ni manipulación. Los textos alternativos describen lo que se ve.
- **Reglas obligatorias del brief:** el olor nunca se usa para diagnosticar, y comer o tener buen aliento no se presentan como garantía de salud. La edad no se usa para decidir sobre la anestesia y no hay tutorial de cepillado. El artículo se presenta como guía sin caso. Los cuatro enlaces internos llevan a su destino y las 7 preguntas frecuentes van plegadas.

**Lo que conviene no tocar al corregir:** el artículo resiste la tentación de recomendar sprays o premios, y nunca relaciona un tipo de olor con una enfermedad. Es su mayor valor.

### Avisos

1. **La frase de Illinois dice algo más que la fuente** (`mal-aliento-perros-viejos.mdx:145`). Atribuye a la fuente *"una llaga que persiste"* y *"lesiones que pueden permanecer poco visibles"*. La fuente habla de *"a new bump or sore"*, sangre en los juguetes y tumores tempranos *"small and not yet causing symptoms"*. Instrucción para quien corrija: cambiar a «una llaga o un bulto nuevo… y la importancia de detectar a tiempo tumores que al principio son pequeños y no causan síntomas».
2. **Dos fuentes no las pude abrir.** UC Davis y la sección de historia clínica de AAHA 2019 bloquean el acceso automático (Cloudflare y 403). Las frases que se apoyan en ellas coinciden con el resumen de la investigación del brief, pero en esta ronda no las comprobé contra la página.
3. **La regla de la firma se contradice con el sitio.** La skill `redactar-articulo-blog` (líneas 78 y 157) pide escribir a mano la línea «**Autoría:**… · **Actualizado:**…» en el texto. Pero `[slug].astro:163` ya pone esa firma automáticamente en cada artículo, y el brief §9.3 dice que la firma es automática. Si se escribiera a mano, aparecería dos veces. No es un fallo del artículo: hay que actualizar la skill y el script de métricas en otra sesión.

### Por qué el script de métricas marca NO APTO

Da 4 bloqueos y ninguno es real:
- **Rango y tabla de fuentes:** el script no logra leerlos del brief, pero el brief sí los tiene.
- **Conclusión 763 de 550:** el script cuenta también la lista de fuentes. Sin ella son **549 palabras**.
- **Firma:** es el aviso 3.

### Lo que no medí yo

No repetí las pruebas de navegador en 390 y 1366 px, así que las alturas de los recursos en móvil vienen del QA anterior y no de esta ronda. El contraste del botón «No del todo» y la imagen principal que solo ofrece la versión de 1200 px son problemas que ya existían en el sitio antes de este PR.

No hice ningún cambio en el repositorio.

---

Nota de archivo: el informe se recibió solo en el chat. Su ofrecimiento final de guardarlo no se reproduce como pendiente, porque este archivo materializa ese guardado. El APTO corresponde a la revisión comunicada; no se atribuyen a su autor nuevas aperturas de fuentes, pruebas ni aprobación del hash corregido después.
