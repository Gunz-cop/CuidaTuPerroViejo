# Auditoría independiente del artículo — iteración 1

Fecha: 2026-10-15. Artículo auditado: `/workspace/scratch/limpieza-ojos-oidos/articulo.mdx`. Contrato: brief local corregido, aprobado con reservas en `iteracion-2.md`. Rol exclusivo de auditor; no se modifica artículo, brief ni inventario.

## Veredicto

**No publicable**: faltan los tres recursos visuales previstos, aunque **el texto completo queda aprobado con observaciones menores** para el encargo actual de redacción.

Las imágenes no fueron encargadas y esta conclusión no exige producirlas ahora. Es un límite de publicación, no un incumplimiento de la autorización de redactar. El borrador está fuera de `src/content/blog/`; no se ha publicado. La comprobación visual permanece pendiente porque no existen binarios que inspeccionar. La verificación íntegra de Moog sigue limitada exactamente como autorizó el brief: no se valida texto completo ni resultados no accesibles.

## Hallazgos

### P0

Ninguno en el texto. No se detectaron autores, pacientes ni resultados inventados; tampoco instrucciones del contrato filtradas al cuerpo. Las preguntas «mi perro» son voz de la lectora, no experiencia personal atribuida al autor.

### P1 — Límite de publicación

1. **Frontmatter línea7; cuerpo líneas276 y349.** Se referencian **tres** imágenes inexistentes, incluida hero:
   - `limpieza-ojos-cocker-senior.webp`.
   - `masaje-base-oreja-limpiador-otico.webp`.
   - `revision-semanal-oidos-perro-senior.webp`.

No se pueden validar sujeto/edad/anatomía, restricciones clínicas ni correspondencia entre imagen y alt. Antes de publicar hay que producir e inspeccionar esos tres recursos. El estado `Publicado` en frontmatter no funciona como bloqueo: conservar el borrador fuera del árbol servido hasta completar integración.

### P2 — Calidad y preparación técnica

2. **H2-3 líneas242-252, H2-4 líneas258-264 y303-307, cierre líneas333-345.** Reaparecen consejos muy próximos sobre pauta escrita, anotar cambios, no compensar una limpieza, detenerse y preguntar. Hay repetición editorial moderada, no datos falsos. Si se hace edición de estilo, concentrar organización familiar en H2-3 y reservar H2-4 para procedimiento, evitando ampliar advertencias equivalentes para mantener volumen. No eliminar cautelas clínicas que dan sentido a cada maniobra. La distribución actual cumple y no se exige reescritura por este punto.

3. **Cuerpo líneas276 y349.** Las imágenes se insertan con Markdown, sin dimensiones explícitas; la Sección4 del brief pide `width`, `height`, `loading` y `decoding`. Resolver al integrar recursos reales con el mecanismo de imagen del sitio o marcado con dimensiones; comprobar proporción final, móvil y ausencia de salto visual. Este punto pertenece a la integración visual pendiente y no impide aprobar el texto.

4. **Cadencia general de subtítulos.** El script da27 H3 y media227 palabras/H3, por encima del objetivo150–200, pero por debajo de su aviso260; la introducción concentra texto antes del primer H3. No es bloqueante según la referencia de métricas. Ajustar solo si la revisión móvil real encuentra un tramo difícil; no partir automáticamente párrafos ni añadir títulos vacíos.

## Verificación mecánica independiente

Se ejecutó nuevamente el script oficial desde `/workspace/scratch/limpieza-ojos-oidos/validation`, sin modificarlo. `cmp` confirma que su copia de artículo es idéntica al archivo auditado. La salida coincide con `metricas-iniciales.txt`.

Dos resultados del parser requieren corrección manual del diagnóstico: «contrato null–null/FUERA» no significa incumplimiento real; y «sin tabla de trazabilidad» no significa ausencia de tabla. El brief sí declara5.440–7.360 y siete fuentes, pero el formato corregido no encaja con el parser. No se alteró brief ni script para forzar pase.

**Total:6.142 palabras**, dentro de5.440–7.360. La suma por secciones da6.089; las53 restantes corresponden al tratamiento de encabezados por los métodos del script, no a prosa perdida. Conteo según norma del proyecto, no exclusivamente texto visible: excluye frontmatter/imports y cuenta el cuerpo MDX.

| Sección | Real | Target | Desviación | Resultado |
|---|---:|---:|---:|---|
| Introducción |760|800|−5 %|Cumple|
| Ojos: qué observar |1.069|1.200|−11 %|Cumple|
| Higiene exterior ocular |765|800|−4 %|Cumple|
| Oídos: no solo cera |1.100|1.200|−8 %|Cumple|
| Técnica ótica indicada |867|900|−4 %|Cumple|
| Cierre de los39 perros |654|700|−7 %|Cumple|
| Conclusión/FAQ/fuentes |874|800|+9 %|Cumple|

| Densidad | Medición | Interpretación |
|---|---:|---|
| Párrafos |133|Medidos sobre prosa según script|
| Media / mediana |38 /39 palabras|Dentro de referencia30–40|
| Párrafos >50 palabras |1 %|No hay densidad excesiva|
| Máximo |76 palabras|Apertura larga aislada, no patrón general|
| Fragmentos <12 palabras |2|Énfasis legible; no citas fragmentadas|

Componentes: tres AlertBox narrativos info/danger/warning más cuadro de fuentes, FAQ de siete preguntas. Sin H1 duplicado; imports presentes; cinco enlaces internos obligatorios presentes y en las secciones convenidas. SEO43 y meta136 caracteres; fecha y byline2026-10-15 coherentes. El artículo no cambia inventario a publicado por aprobar texto.

## Verificación manual de fuentes y contrato

Lectura completa del artículo y contraste con las páginas y estudios abiertos durante las dos auditorías del brief. No se hace pasar una búsqueda bibliográfica por lectura íntegra de Moog. Las nuevas frases del artículo se mantienen dentro del alcance comprobado; las recomendaciones prácticas de organización no se atribuyen a ensayos.

| Fuente y documento contrastado | Uso real fuera del cuadro de fuentes | Resultado |
|---|---|---|
| [Fefer et al.2022, DOI10.1111/jvim.16510](https://onlinelibrary.wiley.com/doi/10.1111/jvim.16510) | Apertura; H2-3 líneas232-238; H2-5 líneas313-329 | Correcto:39 participantes;19/12 y grupo8 diferenciado de5 respuestas a90; sin seguimiento longitudinal ni causalidad. No atribuye sordera a cera ni prevención a higiene. |
| [Cornell, How to Clean Your Dog’s Ears](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/how-clean-your-dogs-ears) | H2-3 línea196; H2-4 líneas268-274 y301; H2-5 línea343 | Correcto: presión/boquilla, masaje/sacudida, evitar bastoncillos, parar ante dolor, frecuencia según necesidad. No prescribe calendario universal. |
| [Merck, Otitis Externa in Animals](https://www.merckvetmanual.com/ear-disorders/otitis-externa/otitis-externa-in-animals) | H2-3 líneas212-222; H2-4 línea291 y warning | Correcto: muestras previas, examen/tímpano, riesgo de ototoxicidad; sin afirmar destrucción absoluta de muestra ni diagnóstico por cabeza inclinada. |
| [Moog et al.2022, PMC9031221](https://pmc.ncbi.nlm.nih.gov/articles/PMC9031221/), identidad [PubMed35448682](https://pubmed.ncbi.nlm.nih.gov/35448682/) | H2-4 líneas281-287 | Respeta la excepción: describe objeto de investigación y población, sin cifras, magnitud de eficacia ni seguridad universal. No atribuye resultados a todos los limpiadores. Texto completo continúa sin verificación estable. |
| [Cornell, KCS](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/keratoconjunctivitis-sicca-kcs-dogs) | H2-1; apoyo H2-2 línea148 | Correcto: componente acuoso, causa inmunomediada, signos, Schirmer y fluoresceína. No repite infradiagnóstico atribuido ni umbral15 ni diagnóstico por secreción recurrente. |
| [Nascimento et al.2023, PubMed35544927](https://pubmed.ncbi.nlm.nih.gov/35544927/) | H2-1, «Otras pruebas, otras preguntas» | Correcto: comparación de tres pruebas y carácter complementario; sin puntos de corte nuevos ni autodiagnóstico. |
| [VCA/LifeLearn, KCS](https://vcahospitals.com/know-your-pet/keratoconjunctivitis-sicca-kcs-or-dry-eye-in-dogs) | H2-2 línea146 y técnica exterior156 | Correcto: paño húmedo templado y retirada suave como cuidado complementario en KCS. No lo convierte en obligación para todo perro mayor ni sustituye tratamiento. |

Todas las fuentes se usan en algún H2 asignado; ninguna aparece solo en la bibliografía. No se mantienen atribuciones VIN/WSAVA retiradas. El desglose del estudio y sus límites no invitan a aplicar estímulos sonoros como prueba casera.

Arco: cohorte en apertura, evaluación BAER en desarrollo, último H2 dedicado a retomar resultados y sus límites; no se inventa desenlace individual ni raza de participantes. Alertas clínicas, material separado, contraindicación de improvisar productos, separación de diagnóstico e higiene y limitación de calculadora se mantienen. La explicación de ototoxicidad y el alt periocular resuelven las dos reservas de producción textual anteriores.

## Lo que sí funciona

- Texto completo dentro de rango y cada sección dentro de±15 %, incluido el cierre científico654/700.
- Datos corregidos de Fefer preservados incluso en el punto donde podrían confundirse las categorías estadísticas con respuestas individuales.
- Limpieza descrita con límites claros y secuencia operativa; no se convierte el artículo en recomendación de compra ni se activan afiliados.
- Autoría institucional editorial; sin credenciales clínicas inventadas ni experiencia personal ficticia.
- Cuadro de fuentes con siete enlaces profundos; Moog sin resultados que excedan verificación.
- Enlaces de pilar, dos spokes, chequeo y herramienta integrados según contrato. La calculadora no sirve para diagnosticar o retrasar urgencias.
- Texto no contiene marcadores de producción, numeración de fuentes del brief, instrucciones al redactor ni enlace obligado a artículo sensorial no publicado.

## Qué corregir, en orden

1. **Encargo actual:** puede entregarse el texto completo aprobado; no hace falta producir imágenes para cerrar esta redacción ni abrir otro ciclo por la repetición menor.
2. **Antes de publicación:** producir las tres imágenes, inspeccionarlas y resolver marcado/dimensiones/alt con los archivos reales. Verificar móvil y render MDX; esta auditoría no afirma build ni render probados.
3. Si se hace edición opcional de estilo, reducir repetición indicada manteniendo precauciones y presupuesto por sección; no añadir nueva información clínica para compensar palabras.
4. Conservar el artículo fuera de la ruta servida y el inventario En Briefing/borrador hasta que corresponda su integración autorizada. Nunca usar `status` como barrera de despliegue.

No se modificó ningún contenido evaluado. La cascada previa de Fefer en otros briefs/artículos sigue registrada en `iteracion-2.md` como trabajo separado; este artículo no reproduce ese error.
