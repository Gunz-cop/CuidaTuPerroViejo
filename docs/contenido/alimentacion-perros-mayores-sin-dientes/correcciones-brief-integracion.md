# Corrección del brief por fallo nuevo de integración

Fecha: 2026-10-19. Rol exclusivo: corrección; no auditoría ni veredicto propio. Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`.

- Versión aprobada en R2 / hash antes: `accdd752038ed26bd5d30971bfecefe8237c26562c9262f23196fa449e8cf79c`.
- Hash después: `fb110f500fc009ac86263bd8ca817e361f3f073be6413ae3c5e57d92ec5af0fa`.
- Próxima auditoría: **R3 de 3 del brief**, reabierto por un fallo nuevo que afecta al contrato. No se reinicia la numeración ni se crea una ronda adicional.

## Defecto nuevo y evidencia técnica

El contrato exigía un estado técnico que el catálogo de proyección excluye, aunque el generador de páginas sigue produciendo la ruta. La incompatibilidad se confirmó durante el build de integración; no se corrige el pipeline para eludir su control.

Fuentes técnicas leídas directamente:

- `src/lib/assistant/catalog.ts:24`: `getCollection('blog', ({ data }: CollectionEntry<'blog'>) => data.status === undefined || data.status === 'Publicado')`.
- `src/content.config.ts:29`: `status: z.string().default('Publicado')`.
- `src/pages/[pilar]/[slug].astro:13`: obtiene `getCollection('blog')` sin filtrar por estado; por tanto otra etiqueta no bloquea la generación de la ruta.
- `scripts/agent-readiness/inventory.mjs:286` y `:326`: controles de clasificación de página y diferencias del sitemap.
- `.agents/skills/redactar-articulo-blog/SKILL.md`, Fase 5.2: el gate es completar los autocontroles antes de guardar en la colección; el campo de estado no evita que una entrada se compile. La etiqueta técnica puede ser `Publicado` tras completar ese gate.

Log inspeccionado: `/tmp/alimentacion-build.log`, SHA256 `4ce6e9c532c981d6247d95836c8387f2c758c4d6ce55e0b2121b42885b4922c3`. Extracto mínimo de la línea 71:

> Inventario inválido: UNCLASSIFIED_PAGE: La ruta /alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes no tiene clasificación de proyección.; SITEMAP_UNEXPLAINED_DIFFERENCE: Path /alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes is present in sitemap but has no eligible editorial document..

## Cambio aplicado

Sección 1: el frontmatter planifica `status: "Publicado"` y la instrucción exige completar autocontroles de redacción y recursos antes de guardar el MDX, sin utilizar una etiqueta como sustituto de ese gate. La misma regla queda coherente en la sección 9.5. Secciones de estado inicial y 10 registran el APTO histórico R2, su hash y la reapertura pendiente de R3.

La etiqueta pertenece al catálogo técnico; **no prueba ni autoriza publicación pública**. El inventario debe seguir redactado/validado localmente y no marcarse publicado. La entrega permanece en rama con PR, sin fusión ni despliegue. No se alteran informes históricos R1/R2.

Verificaciones propias: búsquedas sin instrucciones residuales de `Borrador` en el brief, coherencia del valor técnico en YAML/contrato, hash antes/después. Se mantienen fuentes, límites clínicos, targets, enlaces, sujeto visual, firma central y los tres hallazgos R1 resueltos. No se modificaron MDX, catálogo, pipeline, layout, producción visual ni coordinación. No se ejecutó otro build: este cambio solo corrige planificación y no afirma que el build ya pase; la validación de integración del artículo queda pendiente a sus responsables.
