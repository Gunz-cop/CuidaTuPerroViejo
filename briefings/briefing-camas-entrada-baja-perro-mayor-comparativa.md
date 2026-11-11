# Briefing de afiliados: camas de entrada baja para perro mayor, comparadas por medida y acceso

> [!NOTE]
> **Estado:** Redactado y guardado en `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx` el 2026-11-11 (sin portada I-1; ver [entrega](../docs/contenido/camas-entrada-baja-perro-mayor-comparativa/entrega.md)). Pendiente de auditoría del artículo.

> Generado el 11 de noviembre de 2026 con la skill `generar-briefing-afiliados`. Prospecto n.º 1 del [listado](../docs/afiliacion/prospectos-afiliados.md). **Estado: corregido tras la auditoría r1** ([informe](../docs/contenido/camas-entrada-baja-perro-mayor-comparativa/auditoria-brief-r1.md)); actualizado el 11/11/2026 con fichas reales de AliExpress Portals ([registro](../docs/afiliacion/fichas-camas-comparativa.md)) y decisiones del propietario; pendiente de nueva auditoría. Voz y tono: [guía de voz y tono](../.agents/skills/references/guia-voz-tono.md); el redactor mide el borrador con `python3 .agents/skills/references/scripts/tono.py`. Las tres fichas de §6 tienen ya datos vistos en AliExpress (2026-11-11); ver §12 para lo que sigue pendiente.

## 1. Metadatos

| Campo | Valor |
| --- | --- |
| Título SEO (`seoTitle`) | Camas de entrada baja para perro mayor: comparativa (51 caracteres, `len()`) |
| H1 (`title`) | Camas de entrada baja para perro mayor: 3 modelos comparados por medida y acceso |
| Slug | `camas-entrada-baja-perro-mayor-comparativa` |
| Pilar | `movilidad-dolor-perros-mayores` (existe en el enum de `src/content.config.ts`) |
| Keyword principal | cama perro mayor entrada baja |
| Secundarias | cama ortopédica perro grande; cama perro artrosis comprar; cama viscoelástica perro (ES); cama ortopédica para perro (MX) |
| Mercados | México y España. Una tabla única con columna de disponibilidad por país; plazos y condiciones por país, nunca mezclados. **Sin precios en la página publicada** (regla de `crear-ficha-afiliada`); los precios viven solo en el [registro interno](../docs/afiliacion/fichas-camas-comparativa.md) |
| Programa | AliExpress Portals (hoy). Fichas aisladas para poder cambiar de programa |
| Intención | Comercial investigativa: ya decidió cambiar de cama y quiere elegir modelo y talla |
| Extensión | 1 980–2 480 palabras: suma exacta de los rangos de §7 (incluida la FAQ). La justifican tres fichas completas + tabla + guía de medida; no inflar |

Frontmatter propuesto (medido con `len()`):

```yaml
title: "Camas de entrada baja para perro mayor: 3 modelos comparados por medida y acceso"
seoTitle: "Camas de entrada baja para perro mayor: comparativa"   # 51
metaDescription: "Compara camas de entrada baja para perro mayor por medida interior, acceso y núcleo, con disponibilidad, entrega y devolución para México y España."   # 147
pilar: "movilidad-dolor-perros-mayores"
keywordPrincipal: "cama perro mayor entrada baja"
heroImage: "<<PENDIENTE: ruta de I-1 en /images/…>>"
heroImageAlt: "Perro mestizo grande de hocico canoso entrando despacio en una cama baja junto al sofá de un salón"
status: "Publicado"
datePublished: "<<PENDIENTE: AAAA-MM-DD del día de publicación>>"
```

Nombres y valores comprobados contra `src/content.config.ts` (`z.strictObject`): `pilar` (no `pillar`) es obligatorio y debe ser uno de los valores del enum; `keywordPrincipal`, `heroImage` y `heroImageAlt` son opcionales; `status` tiene por defecto `"Publicado"`, y solo ese valor hace visible la entrada en portada y tarjetas relacionadas; `datePublished` es cadena (AAAA-MM-DD, entre comillas). Cualquier clave fuera del schema rompe el build.

**Marcadores que no pueden llegar al MDX.** Los valores `<<PENDIENTE: …>>` de `heroImage` y `datePublished` son marcadores, no datos: el redactor los sustituye por la ruta real de I-1 y la fecha real antes de crear el MDX. Si al redactar sigue sin existir I-1, se omite `heroImage` (es opcional) en lugar de copiar el marcador. Antes de entregar, `grep -n "PENDIENTE" src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx` debe devolver vacío.

**Canibalización.** La [guía de camas](../src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx) explica *qué buscar* (informativa). Esta página compara *modelos concretos* (comercial). Regla: la guía conserva los criterios y enlaza aquí con un solo enlace contextual al final de «Cómo leer lo que promete el vendedor»; esta página no repite la explicación clínica, la resume en 2–3 frases y enlaza de vuelta. La ficha piloto `cama-guia-01` puede quedarse en la guía o mudarse aquí; decide el propietario (ver §12).

## 2. Procedencia de la experiencia

- **Lo real (ya publicado, no hay que pedirlo):** Luna (2015) y Dakota (2014), beagles senior. En «Lo que vivimos con Luna y Dakota» de la guía de camas: compraron una cama para cada una porque la descripción decía «ortopédica» y al abrirlas comprobaron que lo eran; son más grandes que ellas, se tumban enteras sin tocar el suelo; a veces duermen juntas en una sola; más de un año después siguen en perfecto estado. Ese es el material de H2-2 (una cama más grande que el perro tumbado) y debe contarse como ejemplo de duración, no como prueba de alivio. Peso de las perras: `pendiente` (pedir al propietario si se quiere usar; no inventarlo). Opcional: foto y medidas de esas camas (I-5).
- **Lo no probado:** ningún modelo de AliExpress de esta comparativa ha sido usado por las perras a la fecha. El texto dice «según la ficha del vendedor» y «al recibirla, comprueba…».
- Si el propietario compra el modelo piloto (la guía de afiliación ya propone empezar por México), añadir una sección «Lo que vimos al recibirla» con fotos propias. Hasta entonces, **no existe**.
- Luna y Dakota son beagles; el artículo cubre de pequeño-mediano a grande según la ficha, y lo dice.

## 3. Fuentes del criterio y trazabilidad

Fuentes ya verificadas en la guía publicada; no se añaden fuentes clínicas nuevas porque la página no hace afirmaciones clínicas nuevas.

| # | Fuente | Qué respalda | Usada en |
| --- | --- | --- | --- |
| F1 | [AAHA 2023 Senior Care Guidelines — Pain Management](https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/pain-management/) | Adaptar el entorno (superficies, accesos) forma parte del manejo del dolor en senior | H2-1, H2-2 |
| F2 | [AAHA 2022 Pain Management — Nonpharmacologic Modalities](https://www.aaha.org/resources/2022-aaha-pain-management-guidelines-for-dogs-and-cats/nonpharmacologic-modalities-for-pain-management/) | Cama acolchada y superficie de apoyo como medida no farmacológica de soporte, no como tratamiento | H2-1 |
| F3 | [Guía de afiliación del sitio](../docs/seo/afiliacion-aliexpress.md) — diagrama de tallas del piloto | Ejemplo real de discrepancia entre medidas exteriores y superficie útil: los bordes restan unos 10–13 cm por eje en las tres filas (10,2–12,7 cm calculados) | H2-2, H2-3, ficha A |
| F5 | [Guía de camas publicada](../src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx) | Criterios cualitativos («no se establece una cifra clínica universal»), «Cuándo reemplazar o adaptar la cama», «Qué observar después de un cambio» y experiencia de Luna y Dakota | H2-1, H2-2, H2-5, H2-6 |
| F6 | [Registro de fichas del 11/11/2026](../docs/afiliacion/fichas-camas-comparativa.md) (A, B y C revisadas en AliExpress Portals para MX y ES: medidas, disponibilidad, entrega, devolución, aranceles, vendedor, SiteStripe) | Hechos de comercio transfronterizo de H2-3 y H2-4, siempre con fecha. Los precios del registro son internos y no se publican | H2-3, H2-4, FAQ |

**Alcance de F1 y F2.** Sus páginas devuelven 403 al leer el texto completo (r1 y r2). Solo sostienen las dos afirmaciones cualitativas de la columna «Qué respalda», que la guía publicada ya cita igual; el redactor no les atribuye ninguna otra afirmación, cifra ni recomendación.
| F4 | [Comisión Europea — Influencer legal hub](https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/influencer-legal-hub_en) (la URL que cita la guía de afiliación; HTTP 200 el 11/11/2026) | El marketing de afiliación debe identificarse: aviso de comisión visible | §10 y bloque final |

Lagunas declaradas: no hay estudios que comparen modelos comerciales de camas para perro; la página no promete alivio ni mejoría.

## 4. Criterios de compra (cerrados)

Sin umbrales numéricos: ninguna fuente (F1, F2, F5) fija una altura de entrada, un grosor por peso ni una densidad mínima, y la guía publicada dice que «no se establece una cifra clínica universal». La única cifra que se usa es la **medida del propio perro** comparada con la medida interior declarada.

| Criterio | Cómo medirlo | Orientación | Por qué |
| --- | --- | --- | --- |
| Superficie útil | Perro tumbado en su postura habitual (estirado o en bola), con cinta métrica | Que quepa entero **dentro de los bordes**: comparar con la superficie interior, no la exterior | En el diagrama del vendedor, los bordes restan unos 10–13 cm por eje en las tres filas (F3) |
| Altura de entrada | Lado abierto, desde el suelo | Una entrada que pueda salvar sin saltar ni dudar; observar al perro con su cama actual | Adaptar accesos forma parte del manejo del entorno (F1, F5) |
| Núcleo | Grosor y tipo declarados (espuma de bloque, viscoelástica, relleno suelto) | Que no se hunda hasta una base dura al apoyarse; el relleno suelto no se presenta como «ortopédico» | Superficie acolchada de soporte, no tratamiento (F2, F5) |
| Funda | Extraíble, lavable, interior impermeable | Imprescindible si hay incontinencia | Higiene y vida útil |
| Base | Antideslizante, comprobable en su suelo | Prueba al recibirla | Que la cama no se desplace al levantarse |
| Coste al país | Envío, IVA y aranceles al pagar, vistos en el comercio el día de compra | El artículo no publica precios: el lector los comprueba en la ficha. En España, mirar si la ficha dice «Sin gastos de importación» o «Los aranceles se calculan al finalizar la compra» | Precio y stock cambian; el sitio no tiene fuente autorizada y actualizada (`crear-ficha-afiliada`) |
| Devolución | Plazo y quién paga, por país | Preferir devolución gratis anunciada | Talla mal elegida = devolución voluminosa |

## 5. Tabla comparativa (va antes de las fichas)

Decisión del propietario (2026-11-11): **una tabla única** con columna de disponibilidad por país y **sin columnas de precio**.

Columnas: Modelo · Talla analizada · Medidas declaradas · Superficie útil · Entrada · Núcleo / tejido · Funda · Disponibilidad por país (fecha) · Para quién.

| Modelo | Talla analizada | Medidas declaradas | Superficie útil | Entrada | Núcleo / tejido | Funda | Disponibilidad (11/11/2026) | Para quién |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A · Sofá con bordes (Hicarer) | Variantes recomendadas (ver §6 A) | Selector: 71×58×16 a 122×89×17 cm | Sin asignar por variante: el diagrama del vendedor no coincide con el selector (§6 A) | Sin declarar por variante | «Orthopedic foam» / «egg crate foam», según el vendedor | Extraíble y lavable a máquina, según el vendedor | México y España | Perro que apoya la cabeza en un borde, si su medida cabe dentro de los bordes |
| B · Colchón plano (Wistand889) | XL | 105×70×10 cm | 105×70 cm (sin bordes) | 10 cm de grosor declarado | Espuma: título «viscoelástica», descripción «espuma de esponja», según el vendedor | Extraíble, lavable a mano, forro impermeable declarado | **Solo envía a España** | Perro grande que duerme estirado y necesita entrar sin salvar bordes |
| C · Catre elevado (One Newgate 4 Choice) | L | 102×70×20 cm | 87×69 cm | 20 cm sobre el suelo (contraste: no es entrada baja) | Malla sobre marco metálico | Malla extraíble y lavable, según el vendedor | México y España (talla L; la XL no envía a México) | Clima cálido, perro que sube sin dificultad a 20 cm; carga máxima declarada 50 kg |

Celdas: solo datos del registro del 11/11/2026. Lo que el registro marca `pendiente` no se rellena.

## 6. Fichas de producto

Tres perfiles para que la comparación sea útil y no tres camas iguales:

Fuente de todos los datos: [registro de fichas del 11/11/2026](../docs/afiliacion/fichas-camas-comparativa.md), revisado en AliExpress y AliExpress Portals con envío a Aguascalientes (MX) y A Baña, A Coruña (ES). Los precios del registro **no pasan al artículo**. Nadie del sitio ha probado ninguno de los tres modelos.

Componente de las tres fichas: generalizar `src/components/CamaAfiliada.astro` (hoy con `href`, ubicación y textos fijos) a un componente con props, p. ej. `FichaAfiliada.astro` (`placement`, `title`, `href`, `reason`, `checks`, medio opcional), sin cambiar el aspecto aprobado ni la ficha `cama-guia-01` de la guía. Cada ficha: `<aside data-affiliate-placement="camas-cmp-a|b|c">`, **un único CTA** con `target="_blank" rel="sponsored noopener noreferrer"`, aviso «Podemos recibir una comisión por las compras a través de este enlace» **bajo el botón**, frase breve de por qué considerarla y comprobaciones pendientes en una línea. Sin precio, stock ni plazos dentro de la ficha. La extracción se justifica porque hay cuatro ubicaciones reales con el mismo comportamiento.

### Ficha A — Cama tipo sofá con bordes (Hicarer Home Store)

| Campo | Dato |
| --- | --- |
| ID / vendedor | `1005009119696851` · Hicarer Home Store |
| URL sin parámetros | https://www.aliexpress.com/item/1005009119696851.html |
| Variantes del selector | Gris o Negro × 71×58×16, 91×69×16, 107×76×17, 122×89×17 cm |
| Variantes que se recomiendan | Solo las de precio normal: **Gris 91×69×16, Gris 107×76×17, Negro 71×58×16, Negro 107×76×17, Negro 122×89×17**. Se **excluyen** Gris 71×58×16, Gris 122×89×17 y Negro 91×69×16: precio unas 10 veces mayor en MX y ES (registro). El artículo no explica el motivo con cifras; dice que esas variantes muestran un precio anómalo y que no las recomendamos |
| Diagrama del vendedor | «HOW TO SELECT THE RIGHT SIZE», 3 filas en pulgadas (M, L y otra también «L»): exterior 76,2×50,8×19,1 → interior 65,5×40,6; 88,9×55,9×20,1 → 76,2×45,0; 91,4×68,6×20,1 → 80,0×57,4 cm; columna «Respaldo» de 3" (7,6 cm). **Ninguna fila coincide con una talla del selector** y no se asigna a ninguna |
| Discrepancia como enseñanza | Selector: 4 tallas en cm con 16–17 cm de alto; diagrama: 3 filas en pulgadas con 7,5–7,9" (unos 19–20 cm) y dos filas «L»; las reseñas hablan de M, L y XL. El H3 la usa para enseñar qué consultar: la medida interior entre bordes de la talla exacta que se compra, la altura del lado de entrada y que la tabla corresponda al selector; si la ficha no lo aclara, preguntar al vendedor antes de pagar |
| Núcleo | Descripción: «ORTHOPEDIC FOAM»; instalación: «egg crate foam». Llega enrollada; unas 24 h para recuperar forma. Grosor: no declarado. Detalles: marco «malla» (no encaja con una cama de espuma). Todo «según el vendedor» |
| Funda / base | Extraíble con cremallera y lavable a máquina; «impermeable» solo en el título (forro no declarado: `pendiente`); antideslizante declarado, no visible en imágenes |
| México | Disponible. Envío gratis; entrega vista 19–23 nov o 28 nov–11 dic según variante y recarga. Devoluciones gratis en 90 días. Precio habitual sin oferta de comprador nuevo: no se muestra (y no se publica) |
| España | Disponible. «El precio incluye el IVA \| Los aranceles se calculan al finalizar la compra»; cabecera: cargos de importación fuera de la UE. Coste con aranceles: `pendiente`. Envío gratis; devoluciones gratis en 90 días |
| Vendedor | 4.0 (11 valoraciones), 68 ventas; tienda 83,4 % positivas. Antigüedad: `pendiente` |
| Comisión | SiteStripe 7 % directa / 7 % indirecta en MX y ES (11/11/2026) |
| Enlace / Tracking ID | `https://s.click.aliexpress.com/e/_c3vqNMIT` · `camas-cmp-a` (MX y ES) |
| Para quién | Perro que descansa apoyando la cabeza en un borde, cuya medida tumbado cabe dentro de la superficie interior confirmada de la talla elegida |
| No para | Perro que necesita entrar sin salvar ningún borde y cuya entrada no puede comprobarse antes de comprar; incontinencia, mientras el forro impermeable no esté declarado |
| Medio | Video del vendedor en la galería (no descargado). El de la ficha piloto ya está aprobado en la guía; reutilizarlo solo si es el mismo producto y se conserva la procedencia |

### Ficha B — Colchón plano de espuma, talla XL (Wistand889 Store)

| Campo | Dato |
| --- | --- |
| ID / vendedor | `1005005134788648` · Wistand889 Store |
| URL sin parámetros | https://www.aliexpress.com/item/1005005134788648.html |
| Variante analizada | XL 105×70×10 cm, 2,45 kg, perro hasta 40 kg (sin color). Otras: M 78×48×8, L 92×56×8, 2XL 120×75×10 |
| Forma | Rectángulo sin bordes: superficie útil = medida declarada; entrada = grosor (10 cm en XL) |
| Núcleo | **Según el vendedor**: el título dice «espuma viscoelástica» y la descripción y materiales, «espuma de esponja». Qué comprobar: al recibirla, si la espuma recupera la forma despacio al presionarla (viscoelástica) o enseguida, y si al apoyarse el perro se nota la base. En 2XL, la conversión «50 kg/1110 lbs» es errónea; no se cita |
| Funda / base | Funda con cremallera extraíble y capa superior de felpa también extraíble; lavado a mano; «forro impermeable» declarado; base Oxford 600D antideslizante declarada |
| Disponibilidad | **Solo envía a España.** Con envío a México la ficha dice «Este artículo no puede enviarse a tu dirección» y Portals la da como no elegible |
| España | «Precio con IVA incluido \| Sin gastos de importación». Envío gratis desde Alemania, 5–9 días (DHL), reembolso si no llega en 20 días; devoluciones gratis en 90 días |
| Vendedor | 4.7 (30 valoraciones), 122 ventas; tienda 95,4 % positivas. Antigüedad: `pendiente` |
| Comisión | SiteStripe ES 7 % / 7 %; MX no elegible |
| Enlace / Tracking ID | `https://s.click.aliexpress.com/e/_c3DVbDzz` · `camas-cmp-b`. El portal lo generó también para MX, pero el producto no envía allí: la ficha y la tabla dicen «Solo envía a España» |
| Para quién | Perro grande que duerme estirado y cuya medida tumbado cabe en 105×70 cm; entrada sin bordes |
| No para | Lectores en México; perro que necesita un borde para apoyar la cabeza |

### Ficha C — Cama elevada tipo catre, talla L (One Newgate 4 Choice Store) — contraste

| Campo | Dato |
| --- | --- |
| ID / vendedor | `1005011771728376` · One Newgate 4 Choice Store (Choice) |
| URL sin parámetros | https://www.aliexpress.com/item/1005011771728376.html |
| Variante analizada | Negro, talla L: exterior 102×70×20 cm, área de descanso 87×69 cm, perro ≤35 kg, carga máxima 50 kg (cuadro de tallas en imagen) |
| Encaje con el título | **No es de entrada baja**: 20 cm sobre el suelo en L. Se mantiene como contraste para clima cálido y su H3 lo dice en la primera frase: para un perro que ya duda al subir, no es la opción |
| Tejido | Malla sobre marco metálico («Stainless steel frame» en una imagen); malla extraíble y lavable, según el vendedor; antideslizante `pendiente` |
| Discrepancia | El título promete «cojín extraíble», pero fotos y variantes muestran solo la malla en Negro. El artículo dice que, según las fotos revisadas, no incluye cojín y que conviene confirmarlo antes de comprar |
| Aviso de reseñas | **Una sola valoración** (5.0) y 38 ventas; tienda 93,7 % positivas, 41 seguidores. El artículo lo dice explícitamente: poca experiencia de otros compradores |
| Disponibilidad | México y España en talla L; la XL no se puede enviar a México |
| México | Envío gratis, entrega 28 nov–11 dic; devoluciones gratis en 90 días |
| España | «El precio incluye el IVA \| Los aranceles se calculan al finalizar la compra»; coste con aranceles `pendiente`. Envío gratis 29 nov–8 dic; devoluciones gratis en 90 días |
| Comisión | SiteStripe MX 7 % directa; ES 7 % / 7 % |
| Enlace / Tracking ID | `https://s.click.aliexpress.com/e/_c4PdeaEF` · `camas-cmp-c` (MX y ES) |
| Para quién | Perro en clima cálido (Monterrey, Sevilla) que sube sin dificultad a 20 cm y pesa dentro de la carga declarada |
| No para | Perro con rigidez, que duda o salta para subir; quien necesite cojín incluido |

> Regla para las tres: comprobar disponibilidad, entrega y devolución **en la misma fecha** para MX y ES, y repetir la comprobación el día de publicación. Si cambia vendedor, variante o envío a un país, actualizar el registro antes que el artículo.

## 7. Estructura H2/H3

0. **Entradilla (80–120 palabras).** Para quién es la página, aviso breve de comisión, enlace a la guía si aún no ha decidido si necesita cama nueva.
   - Componente: `AlertBox type="info"` («Una cama da apoyo y acceso; no trata la artrosis»). Tabla comparativa (§5) justo después. *Sustentado en: F5, F4.*

1. **H2 — Antes de comparar: lo que una cama puede y no puede hacer** (150–200). Resumen de F1/F2/F5: apoyo y acceso, no tratamiento; sin cifras clínicas. Enlace a la guía de camas. *Sustentado en: F1, F2, F5.*

2. **H2 — Mide a tu perro en dos minutos** (250–300). Paso a paso con la medida tumbado; la trampa de la medida exterior (ejemplo real F3: bordes de unos 10–13 cm). Experiencia publicada de Luna y Dakota (camas más grandes que ellas). H3: «Si duerme hecho bola» / «Si duerme estirado». Infografía I-2. *Sustentado en: F3, F5.*

3. **H2 — Los tres modelos, ficha por ficha** (850–1 000, ~300 por ficha). H3 por ficha A, B, C con: para quién, lo que declara el vendedor, lo que conviene comprobar al recibirla, disponibilidad por país con fecha (sin precio), a quién no se la recomendaríamos, CTA único + aviso. `AlertBox type="warning"` antes de la primera ficha: «Mide antes de comprar: devolver una cama es un paquete voluminoso». *Sustentado en: §6, F3, F6.*

4. **H2 — Comprar desde México o desde España: lo que cambia** (180–220). Sin cifras de precio. Disponibilidad (B solo envía a España; la XL de C no envía a México); plazos fechados; en España, la diferencia entre «Sin gastos de importación» (B, envío desde Alemania) y «Los aranceles se calculan al finalizar la compra» (A y C), por lo que el total se confirma antes de pagar; devolución gratis en 90 días anunciada en las tres y qué supone devolver un paquete voluminoso; en México, que el precio grande puede ser una oferta de comprador nuevo limitada a una unidad, así que conviene mirar el total en el pago. *Sustentado en: F6, F3.*

5. **H2 — Cuándo no hace falta comprar** (120–160). Colchón existente + funda + base antideslizante; enlace a «Cuándo reemplazar o adaptar la cama» y a [prevención de caídas](/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor), sección «Cama y zona de descanso». *Sustentado en: F1, F5.*

6. **H2 — Al recibirla: primera semana** (120–160). Checklist: medir, comprobar base en su suelo, observar si la usa y cómo se levanta. `AlertBox type="danger"`: si empeora la rigidez, deja de levantarse o aparece dolor, veterinario. Enlace a «Qué observar después de un cambio». *Sustentado en: F5, F1.*

7. **Preguntas frecuentes** (150–200, 3–4 preguntas): ¿qué talla elijo si duerme estirado?; ¿cómo es la devolución desde MX y desde ES? (las tres anuncian «devoluciones gratis en 90 días»; la ficha no detalla más, así que conviene guardar la caja y confirmar el proceso en el pedido); ¿hay aranceles al comprar desde España? (B: «Sin gastos de importación»; A y C: se calculan al finalizar la compra); ¿«ortopédica» en la ficha significa que trata la artrosis? Sin cifras de precio. Respuestas solo con datos de F3, F5, F6. *Sustentado en: F3, F5, F6.*

8. **Cómo elegimos y cómo ganamos dinero** (bloque final, 80–120). Método, fecha de revisión, que no se probó ningún modelo (si sigue siendo cierto) y la comisión. *Sustentado en: F4.*

9. **Fuentes consultadas.**

Suma de rangos: 80+150+250+850+180+120+120+150+80 = **1 980** a 120+200+300+1 000+220+160+160+200+120 = **2 480**, igual al contrato de §1.

## 8. Imágenes y recursos visuales

Una página de venta necesita **menos ilustración y más información visual**. Cinco piezas, cada una con función:

| ID | Pieza | Función | Origen |
| --- | --- | --- | --- |
| I-1 | Portada: mestizo grande senior entrando en una cama baja (ver prompt) | Contexto de la necesidad, sin producto identificable | Generada siguiendo la dirección visual editorial; no debe parecer un modelo concreto de la comparativa. Alt: el `heroImageAlt` de §1 |
| I-2 | Infografía «cómo medir a tu perro» (tumbado estirado y en bola, medida interior vs exterior) | Evitar la devolución por talla | Propia, SVG responsive con modo oscuro. Alt: «Cómo medir a un perro tumbado estirado y en bola, y diferencia entre medida exterior e interior de una cama» |
| I-3 | Esquema a escala de las camas vistas desde arriba con la silueta de un perro mediano y uno grande (sin pesos inventados) | Comparar superficie útil de un vistazo | Propia, solo con medidas interiores declaradas por variante: B XL 105×70 y C L 87×69 sí; A no tiene superficie asignable y se dibuja solo si el vendedor la confirma (si no, el esquema muestra B y C y lo dice). Alt: «Tres camas vistas desde arriba con su medida interior y la silueta de un perro mediano y uno grande» |
| I-4 | Foto por ficha | Ver bordes y acceso | **Solo** foto propia o con derechos documentados; si no, ficha sin foto (permitido por la guía). Alt: descripción del modelo, sus bordes y lado de acceso |
| I-5 | Foto real de Luna o Dakota en su cama actual | Experiencia genuina para el H2 de medida | Pedir al propietario; pie de foto aclarando que no es un modelo de la comparativa. Alt: «Luna (o Dakota), beagle senior, tumbada entera en su cama» según la foto |

Las tres fichas tienen video o fotos del vendedor (no descargados). El video de A ya se usa en la ficha aprobada de la guía; para B y C aplicar `crear-ficha-afiliada` (procedencia, uso de recursos del comercio solo con enlace a ese comercio). Si no se resuelve, ficha sin medio.

### Prompt de I-1 (dirección visual editorial)

**Raza.** Recientes en `heroImageAlt`: cocker (4), beagle (3), labrador (2), golden, dogo, mestizo/a. Beagle queda descartado (repetido y confundible con Luna/Dakota; esta imagen **no** es Luna ni Dakota). Se elige un **mestizo grande de tipo pastor, pelo corto-medio fuego y negro**: el artículo apunta también a perros grandes y la silueta larga hace legible el tamaño de la cama. «Mestizo/a» ya aparece 2 veces en `heroImageAlt` (tantas como labrador); esta portada se diferencia de esos casos por el tipo pastor (orejas erguidas, hocico largo, silueta alargada) y el pelo fuego y negro, que el prompt fija de forma explícita.

1. **Función editorial:** portada; que se entienda «entrar en una cama sin saltar» sin enseñar un producto concreto.
2. **Sujeto:** mestizo grande tipo pastor, senior. Cinco rasgos: canas en hocico, cejas y párpados (aclarado sobre el fuego y negro); ojos algo hundidos y mirada serena; línea dorsal suavizada y menos masa en cuartos traseros; postura prudente, cabeza a la altura del lomo, entrando paso a paso; sin cojera, heridas ni emaciación.
3. **Escenario:** salón de vivienda corriente de México o España; tres detalles: suelo de baldosa clara, esquina de sofá de tela, alfombra antideslizante bajo la cama. Cama genérica gris, lado abierto bajo, sin logotipo.
4. **Acción y geometría:** perro avanza de izquierda a derecha, patas delanteras ya dentro de la cama y traseras en el suelo, cuerpo y cabeza en la misma dirección; sin persona en escena.
5. **Encuadre:** cámara a la altura del lomo del perro, plano entero lateral, perro y cama completos con margen; fondo sin competir.
6. **Luz y materialidad:** luz de mañana por una ventana lateral izquierda, sombras suaves coherentes hacia la derecha; textura de pelo y del tejido de la cama; profundidad de campo media para leer el borde de entrada.
7. **Acabado y exclusiones:** fotografía documental natural, sin pose publicitaria, marcas ni catálogo. Evitar: perro saltando, patas en número o posición imposible, cama con forma de un modelo de la comparativa, tarima o escalón, cables por el suelo.
8. **Aceptación:** a tamaño grande y móvil se ven los cinco rasgos senior, la entrada se lee como baja, cuerpo y paso van en la misma dirección, imagen y alt coinciden.

```text
Imagen editorial para la portada de una comparativa de camas de entrada baja; debe permitir entender que un perro mayor entra en su cama sin saltar.
Perro mestizo grande de tipo pastor, pelo corto-medio fuego y negro. Edad visible: canas en hocico, cejas y párpados; ojos algo hundidos y mirada serena; línea dorsal suavizada y menos masa en cuartos traseros; postura prudente con la cabeza a la altura del lomo; sin cojera, heridas ni delgadez extrema.
Entorno: salón de vivienda corriente, suelo de baldosa clara, esquina de sofá de tela, alfombra antideslizante bajo una cama gris genérica de lado abierto bajo, sin logotipos.
Acción: el perro entra caminando de izquierda a derecha, patas delanteras dentro de la cama y traseras aún en el suelo, cuerpo y cabeza en la misma dirección. Sin personas.
Cámara a la altura del lomo, plano entero lateral, perro y cama completos con margen; luz de mañana desde una ventana a la izquierda, sombras suaves hacia la derecha, textura del pelo y del tejido, profundidad de campo media.
Acabado documental natural, composición cuidada, sin estética de foto de catálogo.
Evitar: salto, anatomía o número de patas incorrectos, marcas, escalones, cables en el suelo, una cama idéntica a un producto comercial.
Ilustración generada; no representa un paciente ni acredita un resultado clínico.
Rechazar si a tamaño móvil parece un adulto joven.
```

## 9. Enlazado interno

- **Entrantes:** guía de camas (un enlace contextual, ver §1); prevención de caídas (en «Cama y zona de descanso»; alternativa: «Tracción: comprueba el conjunto, no solo el material»); pilar de movilidad (listado de artículos).
- **Salientes:** guía de camas; prevención de caídas; [selector de movilidad](/herramientas/selector-movilidad-perros-mayores) solo como orientación, sin ofertas en sus resultados.
- Actualizar `src/data/internal-links.ts` con la skill `enlazado-interno-sitio`.

## 10. Cumplimiento y avisos

- Cada ficha: `<aside data-affiliate-placement="camas-cmp-a|b|c">` con un único CTA `<a target="_blank" rel="sponsored noopener noreferrer">` y el enlace oficial intacto; aviso «Podemos recibir una comisión por las compras a través de este enlace» bajo el botón. La proyección Markdown debe excluir los tres bloques.
- Aviso breve en la entradilla y bloque final «Cómo elegimos y cómo ganamos dinero» (sección 8 de la estructura de §7 de este brief).
- Sin `Review`/`AggregateRating` en schema: no hay prueba propia. Mantener `BlogPosting`.
- **Sin precios en la página** (ni en tabla, fichas, H2 ni FAQ); disponibilidad y plazos con fecha y «puede cambiar»; nada de «oferta por tiempo limitado».
- No usar «ortopédica» como promesa clínica; atribuirlo al vendedor.
- Revisar política editorial, privacidad y cookies (ya contemplado en la guía de afiliación).
- Marco por país (URLs verificadas con HTTP 200 el 11/11/2026):
  - **UE:** [Comisión Europea, Influencer legal hub](https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/influencer-legal-hub_en) (F4).
  - **España:** [TRLGDCU, RDL 1/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555); [Ley 34/1988 General de Publicidad](https://www.boe.es/buscar/act.php?id=BOE-A-1988-26156); [LSSI, Ley 34/2002, art. 20](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) (comunicaciones comerciales identificables).
  - **México:** [LFPC, art. 32](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf) (publicidad veraz, comprobable y que no induzca a error), vigilada por PROFECO.
- Precio: no se publica. Los precios (incluidos promocionales y de comprador nuevo) quedan solo en el registro interno.

## 11. Medición y mantenimiento

- Un Tracking ID por ficha (`camas-cmp-a`, `-b`, `-c`) para saber cuál convierte.
- Tracking IDs creados el 11/11/2026 (ver §6). Revisión semanal de las tres fichas durante el primer mes, mensual después; retirar o pausar si cambia vendedor, variante o envío a un país.
- A los 30 días: visitas (Cloudflare), clics y pedidos por Tracking ID (portal), consultas por país (Search Console). Decidir con eso si se sigue con el prospecto 2 (rampas).

## 12. Contrato de entrega y bloqueos

**Resuelto con el registro y las decisiones del 11/11/2026:**
1. ~~Fichas B y C con datos reales para MX y ES~~ → hechas (§6). B solo envía a España; C se queda como contraste.
2. ~~Respuesta del vendedor de A sobre superficie y entrada~~ → decisión del propietario: publicar A explicando la discrepancia selector vs diagrama como enseñanza, recomendando solo las variantes de precio normal.
3. ~~Ficha piloto: ¿guía o aquí?~~ → no bloquea: la comparativa tiene su propia ubicación y enlace (`camas-cmp-a`); la ficha `cama-guia-01` de la guía no se toca en este encargo.
4. ~~Validación comercial del canal de A~~ → elegible en MX y ES (SiteStripe 7 %), enlace emitido. ~~Precio habitual MX~~ → deja de bloquear: no se publican precios.

**Pendiente (sin dato; no bloquea si el texto lo trata como tal):**
- Coste total con aranceles en España de A y C: solo se ve en el checkout. El artículo dice que se calculan al finalizar la compra y no da cifra.
- Precio habitual en México: no se muestra en la ficha y no se publica.
- Forro impermeable de A, antideslizante de C y antigüedad de las tres tiendas: `pendiente` en el registro; el texto no los afirma.
- Repetir la comprobación de disponibilidad, entrega y devolución el día de publicación.

**El redactor entrega:** MDX en `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx`, componente de ficha generalizado desde `src/components/CamaAfiliada.astro` (§6: `aside` con `data-affiliate-placement` `camas-cmp-a|b|c`, un CTA por ficha, aviso bajo el botón), tabla única responsive sin precios con disponibilidad por país, AlertBox info/warning/danger y FAQ de §7, I-1 con el prompt de §8, I-2 e I-3, enlaces internos actualizados, `tono.py` medido, `npm run check` y `npx astro build` en verde, proyección Markdown sin bloques comerciales.

**Contra rama:** cualquiera menos `main` (despliega a producción).

## Correcciones r1

| Hallazgo r1 | Cambio |
| --- | --- |
| P0-1 Umbrales ≤ 8 cm, ≥ 7 cm, +15–20 cm, codo | Eliminados de §4 y ficha B; criterios cualitativos coherentes con F5; la única cifra es la medida del perro |
| P0-2 «10–25 cm» | Sustituido por «unos 10–13 cm» (10,2–12,7 calculados del diagrama, F3) |
| P0-3 Fila del diagrama asignada a 71 × 58 × 16 | Ficha A separa título y diagrama; ninguna fila se asigna; superficie y entrada `pendiente` |
| P1-4 Frontmatter, metaDescription, título largo, enum | Bloque YAML; `seoTitle` 51 y `metaDescription` 159 con `len()`; enum confirmado |
| P1-5 Presupuesto | Contrato 1 980–2 480 = suma exacta de §7 (H2-3 a 850–1 000, FAQ añadida) |
| P1-6 Precio promocional | Precio habitual MX y coste con aranceles ES `pendiente`; oferta fuera de tabla; nuevo bloqueo 4 en §12 |
| P1-7 URL F4 y marco legal | F4 → `influencer-legal-hub_en`; §10 con TRLGDCU, Ley 34/1988, LSSI art. 20, LFPC art. 32/PROFECO |
| P1-8 Componentes | AlertBox info (entradilla), warning (H2-3), danger (H2-6) y FAQ de 4 preguntas |
| P1-9 Prompts de imagen | Ficha de 8 bloques, 5 rasgos senior, línea de rechazo móvil, raza justificada frente a recientes (no beagle, no Luna/Dakota), alt por pieza |
| P1-10 Voz y tono | Referencia a la guía y a `tono.py` en cabecera y contrato |
| P1-11 Procedencia | Experiencia publicada de Luna y Dakota incorporada; «~12–15 kg» eliminado (peso `pendiente`) |
| P1-12 `Sustentado en` | Añadido en H2-4 (F6, F3), H2-6 (F5, F1), entradilla, FAQ y bloque final; nuevas F5 y F6 |
| P2-13 Ficha C | Umbral ≤ 20 cm quitado; encaje como contraste explícito o sustitución documentada |
| P2-14 Anclas | «Cama y zona de descanso» / «Tracción: comprueba el conjunto, no solo el material» |
| P2-15 Inventario | Marcado `[~] (En Briefing)` en `INVENTARIO_CONTENIDO.md` |
| P2-16 «Para quién» ficha A | `pendiente`, criterio propio a derivar de la superficie confirmada |
| Skill y listado | Skill y plantilla ampliadas (frontmatter, componentes, prompts, sin umbrales sin fuente, precio habitual vs promocional, ley ES precisa); listado marca tickets y comisiones como estimaciones sin captura |

## Correcciones r2

Aplicadas desde `docs/contenido/camas-entrada-baja-perro-mayor-comparativa/auditoria-brief-r2.md`. No se añade ningún dato de producto, precio ni cifra; los bloqueos de §12 siguen abiertos.

| Hallazgo r2 | Cambio |
| --- | --- |
| N1 `pillar` en lugar de `pilar` | §1: YAML con `pilar`, `keywordPrincipal: "cama perro mayor entrada baja"` y `status: "Publicado"`, verificados contra `src/content.config.ts`. `heroImage` y `datePublished` pasan a marcadores entre comillas `<<PENDIENTE: …>>`, con regla de sustitución u omisión y comprobación `grep` antes de entregar. Skill `generar-briefing-afiliados` y plantilla: `pillar` → `pilar`, añadidos `keywordPrincipal` y `status`, y regla de marcadores |
| N2 referencia «§7 del artículo» | §10: ahora remite al bloque final «Cómo elegimos y cómo ganamos dinero» (sección 8 de la estructura) |
| N3 repetición de mestizo en `heroImageAlt` | §8: la nota de raza registra las 2 apariciones previas de «mestizo/a» y la diferenciación por tipo pastor y pelo fuego y negro |
| N4 F1 y F2 sin texto completo | §3: nota de que F1 y F2 solo sostienen las afirmaciones cualitativas ya atribuidas; el redactor no les atribuye nada más |

## Actualización con fichas reales 2026-11-11

Fuente: [`docs/afiliacion/fichas-camas-comparativa.md`](../docs/afiliacion/fichas-camas-comparativa.md) y decisiones del propietario del mismo día. No se añade ningún dato fuera del registro.

| Ámbito | Antes | Ahora |
| --- | --- | --- |
| §1 Mercados y `metaDescription` | Precios fechados por país | Tabla única con disponibilidad por país; sin precios; `metaDescription` reescrita (147, `len()`) |
| §3 F6 | Capturas de A del 10/11; B y C «cuando existan» | Registro del 11/11/2026 con A, B y C para MX y ES |
| §4 Precio total | Precio habitual con fecha en tabla | «Coste al país»: el lector lo comprueba en el comercio; sin cifras |
| §5 Tabla | Columnas de precio MX/ES y filas por confirmar | Tabla rellena sin precio, con columna de disponibilidad; B «Solo envía a España» |
| §6 Ficha A | Variante 71 cm, URL `es.`, enlace `_c4FQx8UJ` (`default`), datos del 10/11 | URL global; 5 variantes recomendadas y 3 excluidas por precio anómalo; discrepancia selector vs diagrama como enseñanza; enlace `_c3vqNMIT` (`camas-cmp-a`) |
| §6 Ficha B | Perfil de búsqueda, todo `pendiente` | Wistand889 XL 105×70×10; solo España; viscoelástica vs espuma de esponja «según el vendedor» con qué comprobar; enlace `_c3DVbDzz` (`camas-cmp-b`) |
| §6 Ficha C | Perfil de búsqueda, todo `pendiente` | One Newgate 4 Choice L 102×70×20, área 87×69, carga 50 kg; contraste para clima cálido con aviso de 1 reseña y 20 cm; discrepancia del cojín; enlace `_c4PdeaEF` (`camas-cmp-c`) |
| §6 Componente | Reutilizar `CamaAfiliada.astro` | Generalizarlo con props según `crear-ficha-afiliada` (`aside` + `data-affiliate-placement`, un CTA, `rel="sponsored noopener noreferrer"`, aviso bajo el botón) |
| §7 H2-3, H2-4 y FAQ | Precio por país; ofertas de comprador nuevo | Disponibilidad, envío, aranceles y devolución sin cifras de precio |
| §8 I-3 y medios | Solo con medidas confirmadas; video de A sin verificar | B y C con superficie declarada; A solo si se confirma; medios según `crear-ficha-afiliada` |
| §10 | Aviso «recibimos una comisión sin coste»; precios con fecha | Aviso de `crear-ficha-afiliada`; sin precios en la página |
| §12 | 4 bloqueos | Bloqueos cerrados; pendiente solo aranceles ES de A y C, precio habitual MX (no se publica) y campos `pendiente` del registro |
