# Corroboración de Blackwell y ficha del medicamento

26 de octubre de 2026. Comprobación documental por encargo del propietario; no es un veredicto de auditoría ni una autorización para fusionar. Versión de partida: `1d1c389`. Los informes anteriores se conservan como registros de sus versiones.

## Blackwell: fuentes y alcance real

Se contrastaron identidad y resumen en el [repositorio de la Universidad de Bristol](https://research-information.bris.ac.uk/en/publications/fear-responses-to-noises-in-domestic-dogs-prevalence-risk-factors/): Blackwell, Bradshaw y Casey, 2013, *Applied Animal Behaviour Science* 145, páginas 15–25, DOI `10.1016/j.applanim.2012.12.004`.

Después se localizó una [transcripción pública de una copia del artículo publicado](https://www.scribd.com/document/851031407/1-s2-0-S016815911200367X-main). Se leyó el texto del estudio con sus métodos, resultados y discusión. Aparecen los encabezados consecutivos de las páginas 15–25, las cinco tablas, pies de figuras, conclusiones y referencias. La identidad y el resumen coinciden con Bristol. El título y el resumen generados por la plataforma quedan fuera del respaldo.

La vía editorial directa continúa bloqueada. No se descargó ni se certificó un PDF original de la revista. Los gráficos de las figuras no se interpretaron visualmente ni se extrajeron cifras de ellos; el contraste utiliza el texto y las tablas legibles. No se incorpora el estudio ni su transcripción al repositorio: se registran URL, método, hashes y paráfrasis de los pasajes.

| Atribución del artículo | Localización contrastada | Resultado |
|---|---|---|
| Mayor riesgo con la edad | §3.3, tabla 4 y §4.4 | Respaldada como asociación en la encuesta. |
| Fuegos como desencadenante más frecuente | §3.5 y §4.5 | Respaldada como respuesta comunicada por los dueños. |
| Casi la mitad frente a una cuarta parte | §3.2, §4.1–4.2 | Respaldadas; se precisa que la cuarta parte corresponde al conjunto de participantes y la casi mitad a los entrevistados. |
| Menos de un tercio pidió consejo profesional | Resumen, §3.7, §4.6 y conclusiones | Respaldada como límite superior: menos de un tercio pidió cualquier ayuda y solo una parte acudió a profesionales. |
| Respuestas a fuegos, disparos y truenos coincidentes | §3.6 y §4.3–4.5 | Respaldada. |
| Relación con conductas de separación | §3.2 y §4.3 | Se precisa coexistencia infrecuente en la muestra; no se afirma imposibilidad de coexistencia ni ausencia universal de asociación. |
| Señales que los dueños no identifican como miedo | §3.4, tabla 5 y §4.1–4.2 | Se precisa que podían reconocer comportamientos sin interpretarlos como miedo. |

Se aplican **tres precisiones de atribución** en las líneas 52, 82 y 99 del MDX. La bibliografía S2 añade la vía de consulta de la copia publicada. No se incorporan cifras nuevas, resultados por raza, tratamientos ni conclusiones causales. Queda leída la versión textual del estudio para las atribuciones utilizadas, con la limitación de soporte descrita; no se presenta como acceso íntegro certificado al PDF editorial.

## Medicamento: fuente primaria británica elegida

Se descargó y leyó el [documento oficial del Veterinary Medicines Directorate](https://www.vmd.defra.gov.uk/productinformationdatabase/files/SPC_Documents/SPC_3219375.PDF), regulador británico. La versión comprobada se identifica como marzo de 2026, AN 03168/2024, diez páginas.

| Afirmación ya presente en el artículo | Apartado y página | Contraste |
|---|---|---|
| Contraindicación en enfermedad cardiovascular grave o sistémica grave, con ejemplos renales o hepáticos terminales | §3.3, p1 | Coincide. |
| Seguridad no estudiada en perros de más de diecisiete años | §3.5, p2 | Coincide; no establece seguridad por debajo de esa edad. |
| Vómitos, sedación, incontinencia urinaria y palidez entre los efectos adversos frecuentes | §3.6, p3 | Coincide. |
| Palidez transitoria de la mucosa en la zona de aplicación | Nota de §3.6, p3 | Coincide; no se extiende a cualquier encía pálida. |

El pasaje farmacológico **no cambia**: ya atribuye los datos a la ficha británica y enlaza directamente al regulador. La señal de urgencia sobre encías pálidas en otro contexto sigue identificada como criterio clínico editorial; no se atribuye a ese listado de efectos locales.

El acceso español sigue limitado: AEMPS devuelve la ficha del registro europeo; la descarga española del registro entrega HTML con comprobación anti automatización. El PDF español de la antigua página EMA contiene solo una remisión al registro, no la ficha. La fecha de publicación del documento español aparece en el registro, pero no se utiliza para deducir que coincide con la británica. No se declara leída ni verificada su vigencia.

**Decisión expresamente delegada por el propietario:** mantener como respaldo la fuente primaria británica, con su atribución explícita, sin añadir una mención española ornamental. Esta decisión posterior sustituye la exigencia de contrastar la ficha española del brief §9.6.4 para esta entrega; no se modifica el brief ni se afirma haber cumplido una lectura que no se hizo. El registro español no se considera falso o poco fiable: el problema fue el acceso. Tampoco se usa una copia de distribuidor como sustituto de un documento regulatorio vigente.

## Validación y límites

Método de recuento original: **5.659 palabras**, frente a 5.653 en `1d1c389`; siguen dentro de 5.300–6.000. Tono: **0 muletillas, 0,0/1.000**; denominador de `tono.py`, 5.173. `npx astro check`: 212 archivos, 0 errores, 0 advertencias y 74 hints; build correcto, proyección reproducida y guarda semántica de 37 documentos correctas. El primer build sin permiso de red falló al enumerar interfaces del prerender de Cloudflare; se repitió con el permiso necesario, sin cambios de código o configuración. Resultados y logs en el JSON adjunto. No se repiten las imágenes ni se emite una auditoría visual nueva.

La revisión independiente posterior corresponde a **publicación R2**, sin reiniciar la numeración y sin alterar R1. Los expedientes anteriores describen correctamente las limitaciones de sus versiones; esta corroboración documenta el avance posterior. PR #148 y #149 permanecen sin fusionar y P1-03 sigue NO publicado.

[Evidencia y hashes del contraste](corroboracion-s2-s7.json). [Lectura independiente del texto publicado](blackwell-texto-publicado-independiente.json).
