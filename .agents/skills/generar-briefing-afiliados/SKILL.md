---
name: Generar Briefing de Afiliados - Cuida Tu Perro Viejo
description: Diseña el briefing de un artículo comparativo con enlaces de afiliado (AliExpress hoy, otro programa mañana) para cuidatuperroviejo.com. Úsalo cuando el usuario pida un artículo de afiliados, una comparativa de productos o un brief comercial.
---

# Briefing de afiliados

Variante de [`generar-briefing-contenido`](../generar-briefing-contenido/SKILL.md) para páginas con intención de compra. **Todo lo de esa skill sigue vigente** (control editorial, fuentes verificadas una a una, canibalización, enlazado interno, voz y tono) salvo lo que este archivo sustituye. Lee además la [guía de afiliación](../../../docs/seo/afiliacion-aliexpress.md) y el [listado de prospectos](../../../docs/afiliacion/prospectos-afiliados.md).

## Qué cambia respecto a un brief informativo

1. **El objetivo es ayudar a elegir, no explicar una enfermedad.** El artículo responde «¿cuál de estas opciones le sirve a mi perro y dónde la consigo?». La parte clínica se reduce a lo que justifica cada criterio y enlaza a la guía informativa que ya lo explica.
2. **Nada de «las mejores X».** Google valora reseñas con evidencia de uso, comparación y criterios propios; un listado genérico de enlaces cuenta como contenido de poco valor. Títulos tipo «Camas de entrada baja para perro mayor: N modelos comparados por medida y acceso».
3. **Fichas, no secciones de relleno.** Cada producto lleva una ficha con: qué es, para qué perro sirve, datos declarados por el vendedor **por variante**, qué queda por comprobar, precio y entrega por país **con fecha**, a quién no se lo recomendaríamos y un único CTA.
4. **Procedencia de la experiencia.** Si nadie del sitio probó el producto, el brief lo dice y el artículo habla de «lo que declara el vendedor» y «cómo comprobarlo al recibirlo». Prohibido atribuir a Luna, Dakota o Jaspe el uso de un producto exacto sin evidencia.
5. **Imágenes con función de compra.** Menos ilustración editorial, más: comparativa visual de medidas a escala, foto propia del producto o del perro en una cama equivalente (marcada como tal), diagrama «cómo medir a tu perro». Fotos del vendedor solo con derechos documentados; si no, ficha sin foto.
6. **Tabla comparativa obligatoria** arriba del primer H2 de fichas, con las columnas que deciden la compra.
7. **Alternativa sin compra.** Cada brief incluye cuándo NO hace falta comprar (adaptar lo que ya se tiene).
8. **Independencia del programa.** Separa criterio (fijo) de fichas (dependen de la tienda) para poder cambiar AliExpress por Amazon, eBay u otro sin reescribir.
9. **Criterios sin umbrales inventados.** En «Criterios de compra» no se escribe una cifra (altura, grosor, margen, densidad) salvo que la fuente citada la contenga literalmente. Si ninguna fuente la fija, el criterio es cualitativo y la única cifra es la medida del propio perro. Comprueba que no contradices la guía informativa enlazada.
10. **Precio habitual, no promocional.** La tabla y el bloque usan el precio habitual con fecha; la oferta de comprador nuevo se anota aparte y no se compara. En España, el coste total con aranceles o `pendiente`.

## Lo que sigue vigente de la skill base (no omitir)

- **Frontmatter completo** (`title`, `seoTitle` ≤ 55, `metaDescription` ≤ 160, `pilar` (valor del enum de `src/content.config.ts`, no `pillar`), `keywordPrincipal`, `heroImage`, `heroImageAlt`, `status`, `datePublished`), medido con `len()`. Nombres y valores exactos de `src/content.config.ts` (`z.strictObject`: una clave fuera del schema rompe el build). Un valor aún desconocido se escribe entre comillas como `"<<PENDIENTE: …>>"`, nunca como texto que valide (p. ej. `"pendiente"`), y el brief indica que debe sustituirse u omitirse antes del MDX (`grep PENDIENTE` vacío al entregar).
- **Componentes**: AlertBox (`info` para «no trata», `warning` para talla/devolución, `danger` para señales de urgencia) y FAQ comercial (talla, devolución, aranceles), o una exclusión razonada.
- **Imágenes generadas**: prompt completo según la [dirección visual editorial](../references/direccion-visual-editorial.md) (8 bloques, 5 rasgos senior, «Rechazar si a tamaño móvil parece un adulto joven», aceptación), raza justificada frente a las recientes y `alt` por pieza.
- **`Sustentado en:`** en cada H2, incluidos los de comercio (capturas fechadas como fuente).
- **Presupuesto**: la suma de rangos por sección cuadra con la extensión del contrato.
- **Voz y tono**: [guía](../references/guia-voz-tono.md) y medición con `tono.py`.
- **Inventario**: marcar el artículo `[~] (En Briefing)` en `INVENTARIO_CONTENIDO.md`.

## Datos obligatorios por producto (Sección «Fichas» del brief)

Usa la ficha de relevo de la guía de afiliación: ID, vendedor, variante, URL sin parámetros, medidas declaradas, precio total y moneda por país con fecha, entrega, devolución, tasa en `SiteStripe`, enlace emitido o `pendiente`. **Si un dato no se vio en la ficha real, se escribe `pendiente`; nunca se rellena de memoria.**

## Cumplimiento

- `rel="sponsored noopener noreferrer"` en cada enlace comercial; aviso de comisión visible junto al CTA y uno breve al inicio.
- Sin marcado `Review`/`AggregateRating` salvo prueba propia real; no copiar estrellas del vendedor.
- España: TRLGDCU (RDL 1/2007), Ley 34/1988 General de Publicidad y LSSI (Ley 34/2002) art. 20; orientaciones UE ([Influencer legal hub](https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/influencer-legal-hub_en)). México: LFPC art. 32 y PROFECO (publicidad veraz, comprobable y que no induzca a error). Cita URL profunda verificada. Precios siempre con fecha y «puede cambiar».
- Fuera de afiliación lo que la guía excluye (fármacos, suplementos, órtesis, sillas de ruedas, soportes de ajuste individual).

## Plantilla

Usa [`resources/template_briefing_afiliados.md`](./resources/template_briefing_afiliados.md). Guarda el resultado en `briefings/briefing-{{slug}}.md` y marca el prospecto en el listado.

## Después

El flujo sigue igual: auditar brief (`auditar-briefing-contenido`, añadiendo la comprobación de fichas) → redactar → auditar artículo. Quien genera no audita.
