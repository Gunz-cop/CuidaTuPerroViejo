# Auditoría independiente del diff de publicación — R1

## Veredicto

**APTO el diff de integración: 0 P0, 0 P1 y 0 P2 nuevos confirmados. La publicación sigue pendiente de cierre editorial y autorización.**

Fecha: 2026-10-26. Ronda **1 de este documento de publicación**, máximo tres; no consume otra ronda clínica ni visual. Auditor independiente del integrador, con rol exclusivo de evaluación.

Versiones contrastadas en Git:

- Base `main`: `b79ee0b2e77269426d63381111dc405b933137e5`.
- Código #148: `625ef8a75b6a21d17848b65a36cd699b4c337661`.
- Artículo #149: `de55e25ac17f196bb1b771b46fc86b888c1f15ae`, rama `claude/publica-miedo-petardos-perros-mayores`.
- Fuente histórica: `717ee60`; MDX final SHA-256 **`b1b73c08263fcd60cef9723fe746e4a7b625c3f9dedee505bcf592370380986a`**.

Se aplican AGENTS/CLAUDE, `auditar-articulo-blog`, calidad editorial, formato de informe y reglas técnicas de enlaces/recursos. Se leyeron entregas, auditoría textual R1 y visuales R1–R3. La spec de migración declara Astro 7 en producción; esta integración editorial corresponde a la base vigente y no a una fase pendiente de migración. **Fusionar a main despliega**.

## Hallazgos

**P0: ninguno. P1: ninguno. P2: ninguno**, dentro del diff autorizado y las pruebas descritas. Los gates heredados de la sección posterior mantienen su estado; este resultado no certifica clínica ni da por realizadas verificaciones no vistas.

## Comprobación del diff y regresiones

| Punto | Resultado propio y ubicación |
|---|---|
| Separación de PR | `b79ee0b..625ef8a` contiene exactamente `TablaApilable.astro`, `content.config.ts` y `[pilar]/[slug].astro`. Ninguno aparece en `625ef8a..de55e25` (148 archivos antes de añadir esta auditoría). Sin edición de otros cuerpos MDX. |
| Tabla opcional | `src/components/article/TablaApilable.astro:4`: prop opcional con valor falso. `:8`: atributo solo al activarla. `:29`: CSS inline condicional, limitado a ≤640 px y a `.content-body .tabla-apilable[data-compacta]`. El CSS global anterior es idéntico salvo espacios. La primera celda conserva su texto y solo pierde el rótulo repetido. No se añade JS. |
| Emisión real y testigo | Chromium propio sobre build final: dos wrappers compactos, dos estilos inline y opacidad 0,8. En `mal-aliento-perros-viejos`, wrapper sin atributo, cero estilos compactos y opacidad heredada 0,75. No se encuentra propagación de la variante a artículos por defecto. |
| Pie y schema | `src/content.config.ts:28`: campo opcional. `[pilar]/[slug].astro:36`, `:73`, `:192`: fallback a alt en figcaption y `ImageObject.caption`, sin cambiar el alt. Navegador confirma caption editorial separado en petardos y fallback correcto en el testigo. |
| Traslado MDX | Comparación de blobs contra `717ee60:docs/contenido/miedo-petardos-perros-mayores/articulo-borrador.mdx`: **igualdad exacta al sustituir únicamente la entrada S10 de la línea 496**. Frontmatter, fecha, cuerpo, cifras, FAQ y testimonios narrados permanecen idénticos. Hash origen `481d6382ba7a2cf0775486f4db0e633ff015bf36f6315fa1d478d96299460d21`; manifiesto contrastado, no aceptado por declaración. |
| Conservación histórica | 111 archivos de la fuente conservados byte a byte, incluidos brief, testimonios, auditorías y sus JSON. Solo cambian dos documentos auxiliares: ruta de lectura en `comprobaciones/recuento.py:3` y nota añadida al final de `visuales/entrega-visuales.md:453`. No hay reescritura de informes anteriores. |
| Binarios | Cuatro WebP activos, idénticos a fuente: hero v2 194.728 bytes; v2-400 27.414; paseo v1 217.344; consulta v1 182.646. Todos <250.000 bytes. Solo tres PNG finales retenidos: v10/v8/v1, idénticos y 7.716.999 bytes en total. Las 226 exclusiones suman 82.281.449 bytes; rutas, bytes y hashes contrastados con Git. Los PNG históricos se remiten al commit fuente. |
| Enlazado | `src/data/internal-links.ts:61`: una nueva entrada con chequeo y prevención de caídas. Diez destinos del cuerpo resuelven a fuentes del pilar correcto y HTML local. Pilar, ansiedad y agresividad enlazan al artículo por mecanismos existentes; no se editan sus cuerpos ni SiloNavigation. |
| Descubrimiento y fecha | Artículo presente en sitemap y proyección local; la proyección incluye S10 nuevo sin CSS inline. Frontmatter conserva `2026-10-25`, sin campo `dateModified` añadido. El schema hereda legítimamente `dateModified = datePublished` por la lógica preexistente; no declara una revisión nueva. |
| Estado editorial | `INVENTARIO_CONTENIDO.md:83`: P1-03 `[~]`, NO publicado. `TODO.md:9`: preparación `[x]`; `:10`: fusión y verificación `[ ]`. Checklist posterior a fusión conservado en `entrega-publicacion.md:139`. El `status: Publicado` del MDX es heredado y no equivale al estado real de despliegue. |

Se recalcularon también los hashes de **42 HTML de builds previos del productor**: 36 iguales byte a byte; cinco difieren solo en fragmentos UUID preexistentes de ocho caracteres y contacto solo en `startedAt`. Incluye los tres artículos publicados de control declarados idénticos. Es una comparación propia sobre artefactos anteriores; **no son nuevos builds ejecutados por este auditor**. [Evidencia](publicacion/auditoria-r1/comparacion-artefactos-previos.json).

## S10: fuente → afirmación → comprobación

| Fuente y ubicación | Comprobación propia | Límite |
|---|---|---|
| Comunicado del Colegio de Málaga, 23-06-2026; entrada bibliográfica `src/content/blog/miedo-petardos-perros-mayores.mdx:496` | HTTP200 con documento real, título coincidente y lectura de las recomendaciones: refugio preparado/accesible, cerrar ventanas/persianas, música/TV, contacto elegido sin castigar/forzar, identificación y consulta veterinaria. Se descargó y abrió también la guía gráfica colegial, no solo su enlace. | Se corrige exclusivamente la nota obsoleta y se añade el enlace primario; prensa conservada. No se incorporan cifras acústicas de la guía ni se cambia la atribución secundaria del cuerpo. No se renueva aquí la auditoría de sus afirmaciones clínicas. |

[Registro de pasajes, URL y hashes](publicacion/auditoria-r1/s10-fuente-primaria.json). [Diff MDX exacto](publicacion/auditoria-r1/mdx-unico-cambio.diff). La sustitución es pertinente y queda fielmente renderizada, con tratamiento automático de enlace externo.

## Gates heredados y límites de publicación

1. **S2 y S7 siguen parciales.** `publicacion/verificacion-fuentes.md:21` y `:23` declaran que no se obtuvo Blackwell completo ni un PDF español vigente del regulador. El MDX conserva «Ficha y resumen consultados» (`:488`) y atribución británica (`:493`). No se presenta la copia del distribuidor como cierre regulatorio ni se inventa aceptación del propietario. Antes de ordenar publicación, completar o resolver documentalmente esos límites como indica `entrega-publicacion.md:134`; en S7 debe quedar resuelto el requisito del brief §9.6.4.
2. **Gate del calendario contrastado en esta R1:** se descargaron y leyeron los tres programas oficiales municipales de 2026. Valencia, programa Fallas, p8: «MARZO» con mascletàs/espectáculos; Alicante, Fogueres, p1: «Del 20 al 24 de junio»; Pamplona, p25: fuegos «del 6 al 14 de julio» en San Fermín 2026. Confirman los meses habituales de las filas `MDX:141`–143 y cierran esa comprobación del brief §11, línea 590. [Fuentes, páginas y hashes](publicacion/auditoria-r1/programas-oficiales.json). No se certifican horarios, ordenanzas ni programas futuros/2027; la obligación de consultar el programa de cada localidad permanece en `MDX:134`. No se cambia el artículo.
3. La lectura publicada de Riemer en espejo, sus límites de acceso directo y la propuesta opcional de bibliografía se conservan como comprobación del productor; no se repiten ni se amplía su alcance. El ajuste S10 no los altera.
4. El CI remoto SUCCESS de ambos HEAD es información comunicada por el productor, no consultada de nuevo por este auditor. La reorientación de #149 tras fusionar código requiere revisar otra vez el diff y el CI resultantes. Ningún APTO mecánico ni este APTO de integración sustituyen el cierre editorial o una orden de fusión.
5. Las pruebas de este informe son locales. La verificación pública de URL/canónico, imágenes, FAQ, navegación, schema, sitemap y proyección se mantiene en el checklist postfusión. P1-03 no debe marcarse publicado antes de comprobar ese despliegue.

## Lo que sí funciona

Conservar el texto clínico, las cifras y la procedencia narrativa ya auditados, los binarios de la visual R3, el pie independiente del alt y la variante de tabla voluntaria. La separación código/artículo permite revisar el alcance compartido sin mezclarlo con la incorporación editorial. La política de archivos mantiene trazabilidad histórica sin presentar las capturas excluidas como disponibles en esta rama.

## Qué corregir o completar, en orden

**No se exige corrección del diff para pasar esta R1.** Completar o resolver documentalmente los gates heredados anteriores; conservar fecha por defecto salvo nueva autorización; revisar el estado remoto y obtener la orden expresa que corresponda antes de cualquier fusión. Después seguir el checklist de publicación y documentar solo las pruebas realmente vistas. No hace falta R2 de integración por esta versión aprobada.

## Evidencia propia y previa

Propia: lectura del diff y referencias; comparación de blobs/hashes y exclusiones; inspección de código; apertura del comunicado/guía S10 y de tres programas municipales de 2026; resolución de fuentes/enlaces/sitemap/proyección; prueba breve Chromium de integración y fallback; reanálisis de HTML anteriores. [Método y reproducción](publicacion/auditoria-r1/README.md), [Git](publicacion/auditoria-r1/git-alcance.json), [integridad MDX](publicacion/auditoria-r1/integridad-mdx.json), [conservación](publicacion/auditoria-r1/conservacion-historica.json), [binarios](publicacion/auditoria-r1/binarios.json), [navegador](publicacion/auditoria-r1/html-navegador.json), [enlaces](publicacion/auditoria-r1/enlazado-descubrimiento.json).

Previa, no repetida: check/build/proyección completa de 37 documentos, recuento 5.653 y tono; capturas 390/1366 claro/oscuro, contraste continuo ≥4,50449, alturas 777,53/889,92, FAQ operable, payload inicial y CLS0. Conservan su atribución al productor y los límites de las auditorías textual R1 y visual R3. No hay nueva auditoría anatómica, clínica o de accesibilidad global.

El auditor solo añade este informe y su evidencia. Producción e informes de auditoría anteriores permanecen intactos; sin commits, reviews, comentarios externos, merge o despliegue. El cierre documental concurrente del productor en TODO/entrega de publicación, posterior al HEAD auditado, queda identificado en [estado-final.json](publicacion/auditoria-r1/estado-final.json).
