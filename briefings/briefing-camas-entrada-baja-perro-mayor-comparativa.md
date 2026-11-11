# Briefing de afiliados: camas de entrada baja para perro mayor, comparadas por medida y acceso

> Generado el 11 de noviembre de 2026 con la skill `generar-briefing-afiliados`. Prospecto n.º 1 del [listado](../docs/afiliacion/prospectos-afiliados.md). **Estado: corregido tras la auditoría r1** ([informe](../docs/contenido/camas-entrada-baja-perro-mayor-comparativa/auditoria-brief-r1.md)); pendiente de auditoría r2. Voz y tono: [guía de voz y tono](../.agents/skills/references/guia-voz-tono.md); el redactor mide el borrador con `python3 .agents/skills/references/scripts/tono.py`. No redactar hasta que la sección 6 tenga al menos tres fichas con datos vistos en AliExpress.

## 1. Metadatos

| Campo | Valor |
| --- | --- |
| Título SEO (`seoTitle`) | Camas de entrada baja para perro mayor: comparativa (51 caracteres, `len()`) |
| H1 (`title`) | Camas de entrada baja para perro mayor: 3 modelos comparados por medida y acceso |
| Slug | `camas-entrada-baja-perro-mayor-comparativa` |
| Pilar | `movilidad-dolor-perros-mayores` (existe en el enum de `src/content.config.ts`) |
| Keyword principal | cama perro mayor entrada baja |
| Secundarias | cama ortopédica perro grande; cama perro artrosis comprar; cama viscoelástica perro (ES); cama ortopédica para perro (MX) |
| Mercados | México y España. Precios y plazos por país, nunca mezclados |
| Programa | AliExpress Portals (hoy). Fichas aisladas para poder cambiar de programa |
| Intención | Comercial investigativa: ya decidió cambiar de cama y quiere elegir modelo y talla |
| Extensión | 1 980–2 480 palabras: suma exacta de los rangos de §7 (incluida la FAQ). La justifican tres fichas completas + tabla + guía de medida; no inflar |

Frontmatter propuesto (medido con `len()`):

```yaml
title: "Camas de entrada baja para perro mayor: 3 modelos comparados por medida y acceso"
seoTitle: "Camas de entrada baja para perro mayor: comparativa"   # 51
metaDescription: "Compara camas de entrada baja para perro mayor por medida interior, acceso y núcleo, con precio y entrega fechados para México y España. Sin promesas clínicas."   # 159
pillar: "movilidad-dolor-perros-mayores"
heroImage: "pendiente (I-1)"
heroImageAlt: "Perro mestizo grande de hocico canoso entrando despacio en una cama baja junto al sofá de un salón"
datePublished: pendiente (día de publicación)
```

El redactor comprueba los nombres exactos de campo contra `src/content.config.ts` antes de escribir el MDX.

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
| F6 | Capturas de la ficha A del 10/11/2026 recogidas en la guía de afiliación (precio, entrega, devolución, aranceles por país) y las de B y C cuando existan | Hechos de comercio transfronterizo de H2-4; nunca cifras sin fecha | H2-3, H2-4 |
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
| Precio total | Producto + envío + impuestos al país, con fecha, **precio habitual** | Comparar siempre por la misma talla; el precio promocional de comprador nuevo no entra en la tabla | Las ofertas de comprador nuevo distorsionan (guía de afiliación, «Decisión editorial») |
| Devolución | Plazo y quién paga, por país | Preferir devolución gratis anunciada | Talla mal elegida = devolución voluminosa |

## 5. Tabla comparativa (va antes de las fichas)

Columnas: Modelo · Talla analizada · Superficie útil · Entrada · Núcleo · Funda · Precio MX (fecha) · Precio ES (fecha) · Entrega MX / ES · Para quién.

Filas A, B y C según §6. Celdas sin dato = `por confirmar`, visible al lector solo si el propietario decide publicar con huecos (no recomendado).

## 6. Fichas de producto

Tres perfiles para que la comparación sea útil y no tres camas iguales:

### Ficha A — Cama tipo sofá con un lado bajo (piloto)

| Campo | Dato |
| --- | --- |
| ID / vendedor | `1005009119696851` · Hicarer Home Store |
| URL sin parámetros | https://es.aliexpress.com/item/1005009119696851.html |
| Variante analizada (título del selector) | Negra 71 × 58 × 16 cm. Superficie interior y altura de entrada de esta variante: `pendiente` |
| Diagrama del vendedor (aparte) | Tres filas: exterior 76,2 × 50,8 × 19,1 → interior 65,5 × 40,6; 88,9 × 55,9 × 20,1 → 76,2 × 45,0; 91,4 × 68,6 × 20,1 → 80,0 × 57,4 cm; entrada 7,6 cm en las tres. **No se sabe a qué variante corresponde cada fila** (guía de afiliación); ninguna cifra del diagrama se asigna a la de 71 cm |
| Núcleo | «Orthopedic foam», perfil ondulado (ilustración comercial); grosor real pendiente |
| México | Precio habitual: `pendiente`. (Visto: MX$774.61 como oferta de comprador nuevo; **no entra en la tabla ni en el bloque**.) Envío gratis 23–26 nov, devolución gratis 90 días anunciada — captura del 10/11/2026, entrega en Aguascalientes |
| España | 53,39 € IVA incl. sin aranceles; coste total con aranceles: `pendiente` (se calculan al pagar). Envío gratis 15 dic–6 ene, devolución gratis 90 días anunciada — captura del 10/11/2026, entrega en A Baña |
| Comisión | 7 % en SiteStripe (10/11/2026) |
| Enlace | `https://s.click.aliexpress.com/e/_c4FQx8UJ` (Tracking ID `default`; crear uno propio para esta página) |
| Para quién | `pendiente`: criterio propio que se derivará de la superficie interior una vez el vendedor la confirme |
| Elegibilidad del canal | `pendiente`: la guía de afiliación la deja pendiente de validación comercial |
| No para | `pendiente` hasta conocer la superficie interior de la variante |
| Pendiente | Confirmar con el vendedor superficie y altura de entrada de la variante; tallas grandes y su precio |

### Ficha B — Colchón plano de espuma de bloque, talla L/XL (perro grande)

Perfil buscado: sin bordes (entrada = grosor del colchón), espuma viscoelástica o de bloque con grosor declarado, funda impermeable interior. Búsqueda sugerida: `memory foam dog bed large waterproof removable cover` / `cama viscoelástica perro grande funda impermeable`. **Todos los campos `pendiente`** hasta revisar 3 candidatos con entrega a MX y ES y elegir uno con la ficha de relevo.

### Ficha C — Cama elevada tipo catre transpirable

Perfil: para perros que pasan calor o viven en clima cálido (Monterrey, Sevilla), tejido tenso; útil también en terraza. Altura de entrada: `pendiente` (sin umbral inventado). **Encaje con el título:** el catre no es de entrada baja; se mantiene como contraste explícito («cuándo una cama más alta tiene sentido y para quién no») y su H3 lo dice en la primera frase. Si al revisar candidatos ninguno tiene entrada que un perro con rigidez salve sin saltar, se sustituye por un segundo colchón plano de otra talla y el H1 no cambia. Búsqueda: `elevated dog cot bed large`. **Campos `pendiente`.**

> Regla para las tres: comprobar precio, entrega y devolución **en la misma fecha** para MX y ES, y repetir la comprobación el día de publicación.

## 7. Estructura H2/H3

0. **Entradilla (80–120 palabras).** Para quién es la página, aviso breve de comisión, enlace a la guía si aún no ha decidido si necesita cama nueva.
   - Componente: `AlertBox type="info"` («Una cama da apoyo y acceso; no trata la artrosis»). Tabla comparativa (§5) justo después. *Sustentado en: F5, F4.*

1. **H2 — Antes de comparar: lo que una cama puede y no puede hacer** (150–200). Resumen de F1/F2/F5: apoyo y acceso, no tratamiento; sin cifras clínicas. Enlace a la guía de camas. *Sustentado en: F1, F2, F5.*

2. **H2 — Mide a tu perro en dos minutos** (250–300). Paso a paso con la medida tumbado; la trampa de la medida exterior (ejemplo real F3: bordes de unos 10–13 cm). Experiencia publicada de Luna y Dakota (camas más grandes que ellas). H3: «Si duerme hecho bola» / «Si duerme estirado». Infografía I-2. *Sustentado en: F3, F5.*

3. **H2 — Los tres modelos, ficha por ficha** (850–1 000, ~300 por ficha). H3 por ficha A, B, C con: para quién, lo que declara el vendedor, lo que conviene comprobar al recibirla, precio por país con fecha, a quién no se la recomendaríamos, CTA único + aviso. `AlertBox type="warning"` antes de la primera ficha: «Mide antes de comprar: devolver una cama es un paquete voluminoso». *Sustentado en: §6, F3, F6.*

4. **H2 — Comprar desde México o desde España: lo que cambia** (180–220). Plazos, aranceles en ES al pagar, devolución de un paquete voluminoso, ofertas de comprador nuevo. Sin cifras sin fecha. *Sustentado en: F6 (capturas fechadas por país), F3.*

5. **H2 — Cuándo no hace falta comprar** (120–160). Colchón existente + funda + base antideslizante; enlace a «Cuándo reemplazar o adaptar la cama» y a [prevención de caídas](/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor), sección «Cama y zona de descanso». *Sustentado en: F1, F5.*

6. **H2 — Al recibirla: primera semana** (120–160). Checklist: medir, comprobar base en su suelo, observar si la usa y cómo se levanta. `AlertBox type="danger"`: si empeora la rigidez, deja de levantarse o aparece dolor, veterinario. Enlace a «Qué observar después de un cambio». *Sustentado en: F5, F1.*

7. **Preguntas frecuentes** (150–200, 3–4 preguntas): ¿qué talla elijo si duerme estirado?; ¿quién paga la devolución desde MX y desde ES?; ¿hay aranceles al comprar desde España?; ¿«ortopédica» en la ficha significa que trata la artrosis? Respuestas solo con datos de F3, F5, F6. *Sustentado en: F3, F5, F6.*

8. **Cómo elegimos y cómo ganamos dinero** (bloque final, 80–120). Método, fecha de revisión, que no se probó ningún modelo (si sigue siendo cierto) y la comisión. *Sustentado en: F4.*

9. **Fuentes consultadas.**

Suma de rangos: 80+150+250+850+180+120+120+150+80 = **1 980** a 120+200+300+1 000+220+160+160+200+120 = **2 480**, igual al contrato de §1.

## 8. Imágenes y recursos visuales

Una página de venta necesita **menos ilustración y más información visual**. Cinco piezas, cada una con función:

| ID | Pieza | Función | Origen |
| --- | --- | --- | --- |
| I-1 | Portada: mestizo grande senior entrando en una cama baja (ver prompt) | Contexto de la necesidad, sin producto identificable | Generada siguiendo la dirección visual editorial; no debe parecer un modelo concreto de la comparativa. Alt: el `heroImageAlt` de §1 |
| I-2 | Infografía «cómo medir a tu perro» (tumbado estirado y en bola, medida interior vs exterior) | Evitar la devolución por talla | Propia, SVG responsive con modo oscuro. Alt: «Cómo medir a un perro tumbado estirado y en bola, y diferencia entre medida exterior e interior de una cama» |
| I-3 | Esquema a escala de las tres camas vistas desde arriba con la silueta de un perro mediano y uno grande (sin pesos inventados) | Comparar superficie útil de un vistazo | Propia, solo con medidas interiores confirmadas por variante; si no hay, no se publica. Alt: «Tres camas vistas desde arriba con su medida interior y la silueta de un perro mediano y uno grande» |
| I-4 | Foto por ficha | Ver bordes y acceso | **Solo** foto propia o con derechos documentados; si no, ficha sin foto (permitido por la guía). Alt: descripción del modelo, sus bordes y lado de acceso |
| I-5 | Foto real de Luna o Dakota en su cama actual | Experiencia genuina para el H2 de medida | Pedir al propietario; pie de foto aclarando que no es un modelo de la comparativa. Alt: «Luna (o Dakota), beagle senior, tumbada entera en su cama» según la foto |

El video del vendedor de la ficha A tiene derechos sin verificar: no usar hasta resolverlo.

### Prompt de I-1 (dirección visual editorial)

**Raza.** Recientes en `heroImageAlt`: cocker (4), beagle (3), labrador (2), golden, dogo, mestizo/a. Beagle queda descartado (repetido y confundible con Luna/Dakota; esta imagen **no** es Luna ni Dakota). Se elige un **mestizo grande de tipo pastor, pelo corto-medio fuego y negro**: el artículo apunta también a perros grandes y la silueta larga hace legible el tamaño de la cama.

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

- Cada CTA: `<a rel="sponsored noopener noreferrer" target="_blank">` con el enlace oficial intacto; aviso «Si compras desde este enlace, recibimos una comisión sin coste para ti» bajo el botón.
- Aviso breve en la entradilla y bloque completo en §7 del artículo.
- Sin `Review`/`AggregateRating` en schema: no hay prueba propia. Mantener `BlogPosting`.
- Precios con fecha y «puede cambiar»; nada de «oferta por tiempo limitado».
- No usar «ortopédica» como promesa clínica; atribuirlo al vendedor.
- Revisar política editorial, privacidad y cookies (ya contemplado en la guía de afiliación).
- Marco por país (URLs verificadas con HTTP 200 el 11/11/2026):
  - **UE:** [Comisión Europea, Influencer legal hub](https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/influencer-legal-hub_en) (F4).
  - **España:** [TRLGDCU, RDL 1/2007](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555); [Ley 34/1988 General de Publicidad](https://www.boe.es/buscar/act.php?id=BOE-A-1988-26156); [LSSI, Ley 34/2002, art. 20](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) (comunicaciones comerciales identificables).
  - **México:** [LFPC, art. 32](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf) (publicidad veraz, comprobable y que no induzca a error), vigilada por PROFECO.
- Precio: solo el habitual con fecha; el promocional de comprador nuevo queda fuera de tabla y bloque.

## 11. Medición y mantenimiento

- Un Tracking ID por ficha (`camas-cmp-a`, `-b`, `-c`) para saber cuál convierte.
- Revisión semanal de las tres fichas durante el primer mes, mensual después; retirar o pausar si cambia vendedor, variante o envío a un país.
- A los 30 días: visitas (Cloudflare), clics y pedidos por Tracking ID (portal), consultas por país (Search Console). Decidir con eso si se sigue con el prospecto 2 (rampas).

## 12. Contrato de entrega y bloqueos

**Bloquea la redacción:**
1. Fichas B y C con datos reales vistos en AliExpress para MX y ES (propietario o sesión con acceso al portal).
2. Respuesta del vendedor de la ficha A sobre superficie y entrada, o decisión de publicarla explicando la discrepancia.
3. Decisión del propietario: ¿la ficha piloto se queda en la guía o se muda aquí?
4. Ficha A: precio habitual MX, coste total con aranceles ES y validación comercial del canal.

**El redactor entrega:** MDX en `src/content/blog/camas-entrada-baja-perro-mayor-comparativa.mdx`, componente de ficha reutilizando `src/components/CamaAfiliada.astro` (generalizarlo a `FichaAfiliada.astro` si hace falta), tabla responsive, AlertBox info/warning/danger y FAQ de §7, I-1 con el prompt de §8, I-2 e I-3, enlaces internos actualizados, `tono.py` medido, `npm run check` y `npx astro build` en verde, proyección Markdown sin bloques comerciales.

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
