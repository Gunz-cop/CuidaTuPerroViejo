---
name: Crear Herramienta Interactiva - Cuida Tu Perro Viejo
description: Crea o rediseña una herramienta interactiva (calculadora, test, selector, app) para el pilar /herramientas de cuidatuperroviejo.com — lógica respaldada por fuentes revisadas por pares, mensajes cálidos, diseño responsive con animaciones CSS modernas, tarjeta para compartir, página con contenido editorial, método y fuentes, y registro en el inventario de agentes. Úsala siempre que el usuario pida crear, mejorar, rediseñar, animar o "llevar el estilo nuevo" a una herramienta o app del sitio (edad, calidad de vida HHHHHMM, movilidad o una nueva), aunque no diga la palabra skill. Para revisar una herramienta ya hecha usa auditar-herramienta-interactiva.
---

# Habilidad: Crear herramientas interactivas

Una herramienta del sitio tiene que ser **real y útil antes que bonita**. Lo
bonito atrae, pero lo que hace que Google la posicione y que una persona confíe
es que el cálculo esté respaldado y explicado. La referencia viva de este
estándar es la calculadora de edad:

- Lógica: `src/lib/dog-age.ts`
- Componente: `src/components/tools/DogAgeTool.astro`
- Página: `src/pages/herramientas/calculadora-edad-perro.astro`

Léelas antes de empezar; copia sus patrones en vez de inventar otros.

## 0. Antes de tocar nada

1. Trabaja en una **rama propia**. `main` despliega a producción (Cloudflare
   Workers Builds). Si la migración de stack sigue abierta, lee
   `docs/migracion-stack/README.md` antes de tocar config.
2. Las herramientas se trabajan en paralelo a la redacción de artículos: no
   toques `src/content/blog/`. El único archivo compartido delicado es
   `src/data/internal-links.ts` (usa la skill `enlazado-interno-sitio`).
3. Revisa a la competencia (2–3 herramientas equivalentes) y anota qué dato
   útil nadie muestra bien. Ese hueco es la propuesta de valor.

## 1. Evidencia primero

- Cada número que la herramienta use (umbrales, esperanzas de vida, tramos,
  fórmulas) debe salir de **publicaciones con revisión por pares o guías de
  sociedades veterinarias** (AAHA, WSAVA, ACVIM…). Nada de blogs ni de
  calculadoras de terceros como fuente.
- **Verifica cada fuente una a una**: abre el DOI/PMC y confirma que la cifra
  está ahí. Anota autores, revista, año, volumen y DOI exactos. Si no pudiste
  confirmar una cifra, no la uses.
- Si algo es un **ajuste propio** (p. ej. equiparar la esperanza de vida a
  80 años humanos), dilo explícitamente en la página. Nunca lo presentes como
  dato de un estudio.
- Si la lógica ya existe en otra parte del sitio (portada, MCP), unifícala en
  el módulo de `src/lib/` para que todo dé el mismo resultado.

## 2. Lógica en `src/lib/`

- Funciones puras en TypeScript, sin DOM, para que la web y el MCP
  (`src/scripts/agent-tools.ts`, `src/agent-api/capabilities.json`) compartan
  el resultado. Exponer la herramienta en el MCP es un trabajo aparte con su
  propio contrato: no lo mezcles en el mismo PR salvo que se pida.
- Comentario de cabecera con el método y los DOI.
- Constantes con nombre (`SENIOR_FRACTION = 0.75`), no números mágicos.

## 3. Tono: cálido, nunca alarmante

El público convive con perros mayores y a menudo con miedo a perderlos.

- **Nunca** muestres cifras que suenen a cuenta atrás: "% de vida vivida",
  "años que le quedan", "probabilidad de morir".
- Una media **no es una fecha límite**: dilo en la página.
- Al superar la media, enmárcalo en positivo ("Senior longevo: habla muy bien
  de sus cuidados") y lleva el foco al confort y al vínculo.
- Cada resultado termina en una acción concreta: un enlace a la guía o
  herramienta que corresponde a ese resultado.
- Siempre: "No sustituye una valoración veterinaria".

## 4. Componente en `src/components/tools/`

**Tecnología:** Tailwind 4 y CSS moderno para lo visual; JS solo para lógica,
eventos y la tarjeta. Nada de React ni librerías de animación.

- Números que cuentan con `@property --num` + `counter()`.
- Transiciones de estado con propiedades personalizadas (`--pos`, `--gray`…)
  registradas con `@property` y `data-stage` en el contenedor.
- Microanimaciones con keyframes (respirar, parpadear, aparecer).
- `@media (prefers-reduced-motion: reduce)` apaga toda animación.
- Ilustración SVG propia que reaccione al resultado (como el perrito que
  envejece). Colores con los tokens `--color-brand-*`; prueba modo oscuro.

**Responsive (obligatorio en 390, 820 y 1366 px):**

- Móvil: primero los datos imprescindibles; los opcionales (nombre) al final.
  Nada de girar el teléfono ni de scroll horizontal. Botones ≥ 44–48 px.
- Barra fija inferior en móvil con el resultado mientras se ajusta el
  formulario, que no tape el botón flotante del asistente (`right: 5.25rem`).
- Desktop (≥ 56rem): dos columnas, formulario | resultado.
- Hero: en desktop la imagen a la derecha con `mask-image` y el texto en el
  hueco; en móvil y tablet (< 64rem) un recorte de la imagen con el texto
  debajo, nunca encima.

**Accesibilidad:** `role="status"` + `aria-live="polite"` en el resultado,
texto `sr-only` con el resultado completo, `fieldset/legend`, foco visible.

**Compartir:** tarjeta PNG 1080×1350 con `canvas` (imagen del hero, resultado,
etapa, URL del sitio). `navigator.share({ files })` si existe; si no, descarga.

## 5. Imagen hero

Pídela al usuario con un prompt para ChatGPT u otro generador. Plantilla:

> Ilustración horizontal 16:9, estilo acuarela cálida y moderna, paleta verde
> salvia, crema y terracota suave. [ESCENA DE LA HERRAMIENTA]. Sin texto, sin
> marcas de agua. Mucho espacio limpio a la izquierda para un titular. Luz
> suave, tono tierno y optimista.

Genera con Pillow, en `public/images/herramientas/`: `<slug>-hero.webp`
(1200×675), `<slug>-hero-400.webp` (400×225, para `buildSrcset`) y
`<slug>-hero-movil.webp` (recorte de la zona con contenido, ~900 px de ancho).

## 6. Página en `src/pages/herramientas/<slug>.astro`

1. Hero con H1 en forma de pregunta que la gente busca.
2. El componente, inmediatamente después.
3. Contenido editorial (≥ 3 H2 útiles): mito o duda frecuente, tabla de
   referencia generada desde `src/lib/` (no duplicar cifras a mano), qué hacer
   según el resultado con enlaces a pilares y guías.
4. `<h2 id="metodo">` **Método y fuentes**: piezas del cálculo, qué es ajuste
   propio y lista de fuentes con DOI enlazado y para qué se usó cada una.
5. Preguntas frecuentes (alimentan el `FAQPage`).
6. Schema JSON-LD: `WebPage` (con `citation` de las fuentes), `BreadcrumbList`
   Inicio › Herramientas › X, `SoftwareApplication`, `FAQPage`. Declara las
   fuentes **antes** del objeto schema en el frontmatter.
7. Breadcrumb visible a partir de desktop.

## 7. Integración en el sitio

- Tarjeta en `toolCards` de `src/pages/[pilar].astro` y mención en
  `src/content/pilares/herramientas.mdx` (tabla "¿cuál uso primero?").
- Enlaces desde los pilares relacionados y, si encaja, CTA desde la portada.
- `TOOL_LINKS` en `src/data/internal-links.ts` para los artículos afines.
- **Inventario de agentes:** toda página nueva debe clasificarse en
  `scripts/agent-readiness/inventory.mjs` (`DISCOVERY_ONLY_ROUTES` si no es
  herramienta del MCP) o el build falla con `UNCLASSIFIED_PAGE`. Si cambias el
  HTML de un pilar o herramienta con golden, regenera el fixture de
  `tests/agent-readiness/fixtures/f2/` y su `manifest.json`, y revisa los
  perfiles de `projection-dom.mjs` y `tests/agent-readiness/projection-semantic.mjs`.

## 8. Verificación antes de subir

```bash
npx astro build                       # incluye las integraciones de agent-readiness
npm test
node --test tests/agent-readiness/*.test.mjs
node --test tests/agent-readiness/projection-growth.mjs
node tests/agent-readiness/projection-semantic.mjs dist
npx astro check                       # 0 errores
```

Además, capturas con Playwright (Chromium en `/opt/pw-browsers`) a 390, 820 y
1366 px, probando varios valores extremos (cachorro, valor máximo, caso
"longevo"), la tarjeta descargada y la consola sin errores. Revisa las
capturas tú mismo antes de enseñarlas.

Después: PR en borrador con la vista previa de Cloudflare, y fusionar solo
cuando el usuario lo apruebe y el CI esté en verde.

## 9. Separa los roles

Quien crea la herramienta no la audita. Al terminar, recomienda auditarla en
otra sesión con `auditar-herramienta-interactiva`.
