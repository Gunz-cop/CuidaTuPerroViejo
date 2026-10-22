# Validación del artículo integrado

Fecha: 2026-10-22. Base: `main`, commit `9ca247aff3546d3eba41253dda5236504efba32a`; se volvió a consultar el remoto durante el cierre y seguía en el mismo commit. Pruebas locales, sin fusión ni despliegue.

## Texto y contrato

- Brief final: APTO en [ronda 3 de 3](auditoria-brief-r3.md), SHA-256 `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`.
- MDX final: SHA-256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`.
- **5.862 palabras útiles** y **6.265 palabras brutas** de cuerpo; objetivo 6.000. El desglose por H2 y método están en [controles del autor](controles-autor-final.md) y [métricas reproducibles](metricas-autor-final.json). Todos los H2 cumplen ±15%; no se suman los componentes ni la bibliografía para llegar al volumen útil.
- Tono: 0,4 muletillas por 1.000 palabras; párrafos de media 37,2, mediana 37, ninguno superior a 50. No hay tramos H3 superiores a 200 palabras según el control del autor. La [auditoría independiente R2](auditoria-articulo-r2.md) repitió y confirmó el conteo final.
- Doce fuentes veterinarias con afirmación y localización, guía sin caso, sin diagnóstico por olor, dosis, pacientes o revisión veterinaria inventados. La [auditoría editorial R1](auditoria-articulo-r1.md) comprobó las fuentes por su cuenta y los defectos se registraron en [correcciones](correcciones-articulo.md).

## Checks vigentes ejecutados

El [runner reproducible](qa/ejecutar-checks.sh) ejecutó los checks de CI del repositorio. [Resultados por comando](qa/checks/resultados.tsv): **19/19 con código 0**. Los conjuntos de tests se solapan; no se suman como si fueran pruebas distintas. Los logs conservados normalizan únicamente espacios finales y líneas vacías al final del archivo para cumplir el control de diff; no se alteran mensajes, resultados ni códigos de salida.

| Comprobación | Resultado |
|---|---|
| Astro sync / specs de migración | Correctos |
| Astro check | 187 archivos, 0 errores, 0 advertencias, 62 hints |
| `npm test` | 107/107 |
| Agent-readiness offline | 77/77 |
| F3 generación/contratos | 15/15 |
| Negociación | 41/41 |
| F3 runtime | 12/12 |
| Astro build | Correcto; 34 documentos |
| Inventario, discovery, proyección, API y routing | Correctos |
| Crecimiento de proyección | 2/2 |
| Semántica independiente HTML/GFM | Los 34 documentos coinciden; control de pérdidas/duplicación/orden/enlaces correcto |
| Tipos Worker y comparación con archivo versionado | Correctos, sin diferencia |
| Empaquetado Worker | `wrangler deploy --dry-run`; no despliega |

El primer intento completo se conserva en `qa/checks-intento-1/`: el estado descriptivo del frontmatter excluía esta ruta del catálogo y rompía el descubrimiento. Se corrigió el contrato en su tercera auditoría y el MDX usa el default técnico del schema, manteniendo inventario y expediente como no publicados. No se cambió el catálogo global.

Tras la corrección posterior de dos anclas del componente se repitieron tipos, build, discovery, proyección, API y semántica: [logs de recheck](qa/recheck-anclas/). Todos terminaron correctamente; las suites ajenas al cambio de fragmentos ya habían pasado. El Markdown generado mide 48.202 bytes y conserva los cuatro pasos y el registro; no se confunde el número de palabras de esta proyección con el del MDX editorial.

## Navegador y cierre independiente

Revisión del build estático real servido solo en `127.0.0.1`, con [servidor reproducible](qa/servidor-local.mjs). Los servicios dinámicos del Worker se cubren con sus tests/empaquetado; no se afirma haber probado un despliegue público.

El [primer intento de navegador](qa/revision-tecnica-intento-1.md) obtuvo 101/102: detectó dos fragmentos con tildes diferentes de los IDs renderizados. El creador los corrigió; no se alteró el MDX ni se reiniciaron auditorías. El JSON histórico queda conservado. La [repetición final](qa/revision-tecnica.md) obtuvo **103/103 comprobaciones correctas**, sin errores JavaScript ni recursos locales fallidos. Evidencia: [JSON con versiones y hashes](qa/navegador.json), [capturas](qa/capturas/) y PDF técnico de impresión de una página A4 con los ocho valores. Se comprobaron 375/390 y 1366 px, claro/oscuro, las cuatro vistas, teclado, pausa/fin/repetición, reduced-motion, sin JavaScript e impresión. Los eventos de ocultación y navegación Astro se simularon expresamente; las peticiones externas se bloquearon. No se atribuyen esas pruebas a una navegación o despliegue público.

Limitaciones compartidas observadas, anteriores a este cambio y comprobadas también con navegador en los artículos dental y sin dientes ([evidencia](qa/limitaciones-preexistentes.json)):

- El botón «No del todo» de `FeedbackWidget` tiene contraste 1,35:1 en modo claro. Ese componente no se modifica en este artículo; no se declara accesibilidad global sin reservas.
- El layout de hero anuncia solo 1200w en este build, también en artículos de referencia existentes. Las variantes 400/800 se entregan y se comprueban, pero no se afirma que el navegador elija una variante móvil de la hero. Las imágenes de cuerpo sí anuncian los tamaños preparados.

La [auditoría final del artículo](auditoria-articulo-r2.md) cerró la ronda 2 de su único contador como **APTO con avisos preexistentes**, con todos los recursos integrados; incluye conteo y navegación propios del auditor. El script editorial estricto devuelve código 1 por cuatro desacuerdos de parser/método, levantados manualmente y explicados en el informe; no se presenta como una prueba superada. El brief tiene sus tres rondas consumidas, sin cuarta. No se incorpora información de Search Console.
