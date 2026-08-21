# Plan de monetización

**cuidatuperroviejo.com** · Agosto 2026 · Complementa los estudios de viabilidad (`estudio-viabilidad-multilenguaje-2026-08-v2.md`) y asume su hoja de ruta por fases.

---

## Tesis

Con ~13 clics orgánicos/día (en crecimiento +161,7% entre tramos de 28 días), **ninguna red de display paga hoy cifras significativas**. La decisión correcta no es maximizar RPM ahora, sino:

1. **No dañar la confianza** mientras el tráfico crece — en un sitio YMYL de salud animal, un anuncio fuera de lugar cuesta más de lo que paga.
2. **Construir las fuentes que escalan con la marca:** afiliación contextual a corto plazo, producto propio a medio plazo. El display es el suelo, no el techo.

El sitio ya vivió el riesgo del punto 1: el Native Banner de Adsterra está **pausado porque servía anuncios de citas** (`src/components/ads/AdNativeBanner.astro:17`). Ese incidente es la mejor evidencia de que Adsterra es una solución transitoria para este nicho.

---

## Estado actual (verificado en el código)

| Elemento | Estado | Referencia |
| :--- | :--- | :--- |
| Banner 300x250 tras 1º/2º párrafo | Activo (Adsterra) | `src/components/PostReader.astro:59-62` |
| Banner 320x50 a mitad de artículo | Activo (Adsterra) | `PostReader.astro:64-66` |
| Sticky móvil 320x50 | Activo (Adsterra) | `src/components/ads/AdStickyMobile320x50.astro` |
| Native Banner | **Pausado** (servía anuncios de citas) | `AdNativeBanner.astro:17` |
| Carga diferida de anuncios | Implementada (patrón reutilizable) | `AdSlotLoader.astro` |
| Enlaces de afiliado | Previstos en la política de privacidad, **no implementados** | `politica-de-privacidad.astro:114,179` |
| Textos legales | Declaran "**No usamos Google AdSense** ni Infolinks" en 3 páginas | `politica-de-privacidad.astro:157,178` · `politica-de-cookies.astro:177` |

La densidad actual (2 in-content + 1 sticky) es razonable; no hay margen para más sin dañar la experiencia móvil (82,4% de los clics).

---

## Horizonte 1 (0–1 mes): sanear display y preparar AdSense

### Mientras Adsterra siga activo

- Bloquear en el panel de Adsterra todas las categorías sensibles (citas, apuestas, cripto, salud milagro). El incidente del nativo demuestra que el filtrado por defecto no basta.
- Mantener el nativo pausado y **no añadir más slots**.
- Nunca activar formatos agresivos de Adsterra (pop-unders, redirects, push): son incompatibles con un sitio de salud y matarían una futura aprobación de AdSense.

### Migración a AdSense

**AdSense es mejor opción para este sitio**, no por RPM bruto sino por encaje: inventario seguro para marca, mejor demanda para tráfico de España (45% de los clics, el segmento con más valor publicitario del sitio), y familias de anuncios coherentes con contenido de salud.

Los requisitos del review de AdSense son casi exactamente la **Fase 0 de confianza de la v2**: autoría identificable, políticas completas, contenido original, URLs canónicas limpias, navegación clara. Orden correcto:

1. Completar Fase 0 (canonical sin `.html`, atribuciones resueltas, autoría y política editorial visibles, `dateModified` real).
2. Solicitar AdSense.
3. Al aprobar: **retirar Adsterra por completo** (sustituir los slots existentes, que ya tienen dimensiones fijas reservadas — la migración es de bajo riesgo de CLS gracias a los placeholders actuales), reutilizando el patrón lazy de `AdSlotLoader.astro`.
4. Actualizar las 3 páginas legales que hoy dicen "no usamos AdSense" (privacidad ×2, cookies) y el consentimiento (AdSense en EEE requiere CMP certificada por Google — verificar el banner de cookies actual).

**Por qué no convivir ambas redes:** mezclar inventario de calidad dispar en una página YMYL resta confianza y AdSense penaliza la convivencia con formatos agresivos. Una sola red, la de mejor calidad disponible.

**Riesgo a aceptar:** AdSense puede rechazar el sitio por volumen o "contenido insuficiente" en el primer intento. No es grave: cada mejora de la Fase 0/1 de la v2 aumenta la probabilidad del siguiente intento, y Adsterra saneado cubre el ínterin.

---

## Horizonte 2 (1–3 meses): afiliación contextual

El encaje más natural del catálogo actual: los artículos ya son listas de compra implícitas sin un solo enlace de afiliado.

### Programa principal: Amazon Afiliados (ES) — con AliExpress como complemento, no como base

Matiz importante sobre el objetivo inicial (AdSense + AliExpress): **el tráfico que convierte en compra está sobre todo en España** (45% de los clics, el CTR más alto de los mercados grandes), y ese usuario compra en Amazon.es con envío al día siguiente — no espera 3 semanas un envío de AliExpress. Recomendación:

- **Amazon Afiliados España** como programa principal (cama ortopédica, arnés, empapadores: categorías con comisión ~3%, pero conversión alta y carrito completo atribuible 24h).
- **AliExpress** como complemento para el ~50% LATAM donde Amazon no opera bien (Argentina, Chile, Colombia, Perú): comisiones mayores (5–9%) que compensan la conversión menor. México puede resolverse con Amazon.com.mx si se usa localización de enlaces.
- Ambos programas conviven bien: un componente que muestre el enlace según el contexto (o simplemente ambos enlaces etiquetados) evita perder a la mitad de la audiencia.

### Dónde (páginas concretas, por intención de compra)

| Contenido existente | Productos naturales |
| :--- | :--- |
| Cama ortopédica para displasia/artrosis (artículo ya publicado) | Camas ortopédicas — el artículo ES una guía de compra |
| Selector de Movilidad (herramienta) | Arneses de soporte, rampas, botas antideslizantes — el resultado del selector puede enlazar el producto que recomienda |
| Incontinencia urinaria/fecal | Empapadores, pañales, fundas impermeables |
| Prevención de caídas | Alfombras/rollos antideslizantes, escalones |
| Comida casera / alimentación | Básculas, moldes de porciones, suplementos condroprotectores (solo con respaldo de fuentes) |
| Cómo dar medicación | Lanzadores de pastillas, pill pockets |

### Cómo (reglas de implementación)

- Componente `ProductoRecomendado.astro`: disclosure visible ("enlace de afiliado: si compras, recibimos una comisión sin coste para ti"), `rel="sponsored nofollow noopener"`, sin precios hardcodeados (caducan), imagen propia o genérica.
- Criterio editorial innegociable: **solo productos que recomendaríamos igual sin comisión**, coherente con la separación redactor/auditor de `AGENTS.md` y con la confianza clínica de la Fase 0. Nada de artículos "los 10 mejores X" fabricados para afiliar.
- La política de privacidad ya prevé afiliados; añadir el aviso por-artículo y revisar la sección de cookies de afiliación al implementar.

---

## Horizonte 3 (3–12 meses): producto propio — el techo alto

Los datos de los estudios previos señalan el camino: las herramientas concentran ~23% de los clics con CTR 5× la media, y la visión de **ficha clínica del perro** ya está definida en `INVENTARIO_CONTENIDO.md`. Escalera de menor a mayor inversión:

1. **Validación barata (puede empezar ya):** PDF premium tipo "Guía de cuidados paliativos + plantillas de registro HHHHHMM" o "Cuaderno de salud del perro senior", vendido con Gumroad/Lemon Squeezy/Stripe Payment Links (sin cuentas de usuario, sin backend). Objetivo: medir disposición a pagar real con semanas de trabajo, no meses. Precio bajo (5–12 €).
2. **Freemium sobre las herramientas:** calculadora HHHHHMM y test CCDR gratis; **historial por perro + exportación PDF para el veterinario + recordatorios de medicación** como nivel de pago (suscripción baja ~2–4 €/mes o pago único). Esto es exactamente la "ficha clínica" de la hoja de ruta de producto, y de paso cumple la condición del piloto EN (herramienta diferenciada).
3. **Si el freemium tracciona:** acceso de solo lectura para el veterinario, multi-perro, y el asistente IA como canal de retención.

**Por qué el producto es la apuesta correcta en este nicho:** el dueño de un perro mayor tiene una necesidad recurrente (seguimiento), emocionalmente importante y de vida limitada pero intensa — perfil ideal para pagar por una herramienta que un artículo (o un AI Overview) no puede sustituir. Y es inmune a la volatilidad del display y de la búsqueda.

**Métrica de decisión** (ya definida en la v2): finalización de herramientas, retorno a 7/30 días, exportaciones. Si el PDF de validación no vende nada con tráfico ×2, retrasar el freemium y seguir con afiliación.

---

## Proyección honesta (supuestos explícitos)

Supuestos: tráfico orgánico actual ~530 clics/28 días creciendo al ritmo observado; sesiones totales algo mayores que clics GSC. Cifras en euros/mes, rangos conservadores:

| Fuente | Hoy | Con tráfico ×4 (12 meses, si la hoja de ruta v2 se ejecuta) |
| :--- | :--- | :--- |
| Adsterra (actual) | céntimos–pocos € | no aplica (retirado) |
| AdSense | — | 10–50 € (RPM 1–3 € sobre ~15–20k páginas vistas) |
| Afiliación (Amazon ES + AliExpress) | — | 30–150 € (depende de los artículos de compra y el selector) |
| PDF de validación | 0–30 € | 30–100 € |
| Freemium ficha clínica | — | 0–300 € (10–100 suscriptores ×3 €; el rango honesto es amplio) |

Lectura: **ninguna fuente paga un sueldo a 12 meses vista** — el plan optimiza para que a 24 meses el producto y la afiliación (que escalan con la marca) sean el grueso, con el display como complemento. La alternativa (exprimir display ya) recaudaría céntimos más al coste de la confianza que sostiene todo lo demás.

---

## Qué NO hacer

- Más densidad de anuncios ni formatos agresivos de Adsterra (pop-under, redirect, push) — incompatibles con YMYL y con la aprobación de AdSense.
- Reactivar el nativo sin bloqueo de categorías verificado.
- Artículos "mejores X del 2026" sin criterio clínico, fabricados para afiliar.
- Precios o claims de producto hardcodeados en el contenido (caducan y erosionan confianza).
- Monetizar el asistente IA o las herramientas con anuncios intrusivos: son el activo de confianza y el futuro producto de pago.

---

## Secuencia recomendada (integrada con la hoja de ruta v2)

| Cuándo | Acción de monetización | Depende de |
| :--- | :--- | :--- |
| Ya | Bloquear categorías en Adsterra; congelar slots | — |
| Fase 0 (0–4 sem.) | Preparar solicitud AdSense | Canonicals, autoría, políticas (Fase 0 v2) |
| Fase 1 (1–3 meses) | Alta Amazon Afiliados ES + AliExpress; `ProductoRecomendado.astro`; afiliar cama ortopédica, selector de movilidad e incontinencia. Lanzar PDF de validación | Tráfico creciendo; disclosure legal |
| Al aprobar AdSense | Migrar slots, retirar Adsterra, actualizar 3 páginas legales + CMP | Aprobación |
| Fase 2 (3–6 meses) | Construir freemium (historial + PDF veterinario) si el PDF de validación vende | Métricas de herramientas |
| Fase 3 (>6 meses) | El piloto EN de la HHHHHMM hereda la monetización de producto, no display | Condiciones v2 |
