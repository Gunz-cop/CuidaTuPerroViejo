# Auditoría independiente del brief — Golpe de calor en perros mayores (R2)

| Campo | Valor |
|---|---|
| Documento auditado | `briefings/briefing-golpe-de-calor-perros-mayores.md` (rama `claude/brief-golpe-de-calor-perros-mayores`, commit `59dde93`) |
| SHA-256 | `c7bf35dc4fbe72bffa3913948653e687009d365b46d91cb8e92032cd008d1f6b` (comprobado con `sha256sum`; coincide con el esperado) |
| Fecha | 2026-10-24 |
| Ronda | **2 de 3** |
| Rol | Auditor independiente. No se modificó el brief ni ningún otro archivo; solo se creó este informe. |
| Criterio de esta ronda | Decisión del propietario: **solo cuentan los hallazgos bloqueantes**. Los temas de fondo ya se revisaron en R1. Los menores se anotan aparte como observaciones que no impiden el APTO. |
| Reglas aplicadas | `.agents/skills/auditar-briefing-contenido/SKILL.md`, `.agents/skills/references/calidad-editorial-adsense.md` (§6, lista de bloqueantes), `.agents/skills/references/guia-voz-tono.md` (incluida «Excepción: serie España»), `.agents/skills/references/apoyos-visuales-responsive.md`, informe R1 |

## Veredicto

**APTO (ronda 2).** No queda ningún bloqueante. Los catorce hallazgos de R1 están corregidos, y las correcciones que comprobé contra la fuente (WBGT, muerte espontánea, cita de la Introducción de Hall 2022, emisor de S8) son exactas. Las dos fuentes nuevas, S10 (COLVEMA) y S11 (AEMET Meteoalerta), existen y dicen lo que el brief les atribuye; las cifras de S11 (182 zonas; 60/84/38 zonas con amarillo a 34/36/38 °C; zonas de ejemplo) cuadran exactamente. La orientación a lectores de España es coherente y se puede verificar. Quedan observaciones menores (abajo) que conviene pasar al redactor, pero ninguna invalida el contrato.

## Alcance y método

- **Hash:** `sha256sum` del archivo.
- **Correcciones de R1:** comparé el brief vigente con las instrucciones de R1 y, cuando la corrección cita una fuente, la volví a abrir:
  - Hall 2022 (PMC9144152), Hall 2021 (PMC7994647), Hall 2023 (PMC10385239) y Hall 2020 (PMC7303136): texto completo por `efetch db=pmc` y búsqueda de cadenas con `python3 -I`.
  - Nota de prensa del Ministerio: `curl` de la página completa.
  - Guía del Ministerio (S8): `curl` del PDF + `pdftotext`.
- **S10:** `curl` de https://www.colvema.org/noticia/26581 (título, fecha y texto). No abrí la versión de colvet.es.
- **S11:** la URL del brief (`web2.aemet.es/...METEOALERTA_ANX1_Umbrales_y_niveles_de_aviso.pdf`) cortó la conexión tres veces (`curl: (35) Connection reset by peer`). La misma ruta en `www.aemet.es` se descargó bien: PDF de 20 páginas, 2.843.326 bytes, metadato `Subject: METEOALERTA_ANX1`, creado el 31/05/2022. Saqué el texto con `pdftotext -layout`, conté las filas de zona (código de 6 dígitos) con Python y leí la primera columna numérica (amarillo por temperatura máxima).
- **Comprobaciones mecánicas:** `python3 -I` para caracteres, suma de targets y palabras de la FAQ. `ls`/`grep` sobre `src/components`, `src/content/blog`, `src/content/pilares`, `src/pages/herramientas` e `INVENTARIO_CONTENIDO.md`.
- No repetí las identidades PMID/DOI de S1–S5, S7 y S9, que R1 verificó y no han cambiado (R1 lo indicó así).
- Todo es validación local y documental. No se hizo `npm run build` (no aplica a un brief).

## 1. Verificación de cada corrección de R1

| Hallazgo R1 | Corrección en el brief | Comprobación propia | Resultado |
|---|---|---|---|
| **H-01 WBGT** | §3 S1 (Resultados 3.2): «índice WBGT… mediana de 16,9 °C (rango 3,3–23,1 °C)», y aclara que el resumen lo llama «temperatura ambiente». Límites y §6 H2-1 prohíben compararlo con temperaturas del aire; §9.6 lo convierte en casilla. | Hall 2022, 3.2: «The maximum daily WBGT recorded on days of HRI events ranged from 3.3 to 23.1 °C (median 16.9 °C, IQR 14.8–18.9 °C)». El resumen dice «median ambient temperature… 16.9 °C». La Introducción define WBGT con «air temperature, radiant heat, humidity and windspeed». | **Corregido y exacto.** Detalle menor en §6 H2-1 (O-06). |
| **H-02 Eutanasia** | S1: desenlace «muerte» = espontánea + eutanasia + desconocida; «murieron o se les practicó la eutanasia». S4: muerte espontánea 0,32 / 2,19 / 23,42 %. H2-1, H2-4 y §9.6 alineados. | Hall 2022, Métodos: «“death” from any mechanisms (unassisted, euthanasia and unknown)». Hall 2021, Discusión: «fatality rate (death overall)… 2.21% mild… 5.46% moderate… 56.76% severe. The unassisted death fatality rate increased from 0.32% in mild events, to 2.19% in moderate events, and 23.42% in severe events.» | **Corregido; cifras exactas.** Matiz sobre «sin eutanasia» en O-02. S2 tiene el mismo problema de etiqueta (O-01). |
| **H-03 Afirmación sin fuente** | §2 (c) reescrita sobre S10 + S5; desaparece «prensa y protectoras»; el H3 deja de llamarse «mito». | `grep` sin restos de «protectoras» ni «mito», salvo la prohibición expresa. COLVEMA dice «usar toallas empapadas de agua fresca, colocarlo cerca de una corriente de aire y, sobre todo, acudir inmediatamente a un veterinario» (literal). | **Corregido.** La premisa ahora tiene fuente verificable. |
| **H-04 Criterio de parada** | H3 «Cuándo parar»: no hay regla casera; preguntar a la clínica; se prohíben 39, 41, 42–43 °C y 40 min. Laguna 3 y §9.6. | Coherente con S3/S4/S5: ninguna da un criterio doméstico. | **Corregido.** |
| **H-05 41 °C** | S3 Límites, S4 Discusión (traducción libre), H2-1 y §9.6: los 41 °C solo como definición clásica. | Hall 2021: «threshold of > 41 °C… can therefore no longer be considered appropriate. Any dog with a temperature approaching 41 °C should be actively cooled…»; «body temperature should no longer be considered a reliable diagnostic criterion». | **Corregido y fiel.** |
| **H-06 Trazabilidad** | §3/§6/§9 armonizadas. | S1 en H2-2 y S3 en H2-3 ya aparecen en las tres vistas. Quedan dos desajustes pequeños (S7 en la Introducción, S4 en H2-1): O-05. | **Corregido en lo sustancial.** |
| **H-07 OR del vehículo** | S1 Límites, H2-5 y §9.6: sin «veces», con el grupo pequeño. | Coincide con Tabla 5 (OR 3,03; IC 1,28–7,15; 35 perros). | **Corregido.** |
| **H-08 Prosa en AlertBox** | Los cuerpos `danger` y `warning` son listas de contenido; la frase de S6 se elimina. | §6 H2-2 y H2-3: listas separadas por punto y coma, sin prosa terminada. | **Corregido.** |
| **H-09 S6** | S6 retirada; el riesgo respiratorio pasa a S1 (Introducción) y S3. | Hall 2022, Introducción: «Dogs with impaired thermoregulation from altered anatomy (such as brachycephaly), obesity or underlying health conditions affecting the respiratory or circulatory systems, are at increased risk of developing severe HRI at relatively low ambient temperatures, or with relatively low levels of physical exertion». El resumen del brief («con temperaturas o esfuerzos relativamente bajos») es fiel. No queda S6 en §6 ni en §9. | **Corregido y exacto.** |
| **H-10 Tabla móvil** | §4 importa `TablaApilable`; H2-5 pide `data-label` y celdas de una frase; §11 lo convierte en prueba. | El componente `src/components/article/TablaApilable.astro` existe. La ruta `../../components/article/TablaApilable.astro` es la misma que usa `mal-aliento-perros-viejos.mdx`. | **Corregido.** Falta nombrar el prop obligatorio `label` (O-08). |
| **H-11 FAQ** | Rango 40–60 y borradores ampliados. | Medido: 59, 48, 50, 50, 40, 49 y 51 palabras. Todas dentro del rango. | **Corregido.** |
| **H-12 Origen del miedo** | Experimento de 1980 con agua helada; sin «ingles» ni «cambiándola»; «abdomen o la cara interna del muslo». | Hall 2023: «some dogs died immediately upon immersion into ice-cold-water… may have led to the recommendation… to only cool dogs with “tepid” or “not cold” water»; «such as the abdomen or inner thigh». `grep` sin restos. | **Corregido y fiel.** |
| **H-13 S8** | Título en minúsculas del original, metadato del PDF, emisor y nota de prensa con cita. | Nota de prensa abierta completa: fecha «19 de Julio de 2024»; texto literal «una guía elaborada por la Dirección General de Derechos de los Animales, integrada en este ministerio»; Ministerio de Derechos Sociales, Consumo y Agenda 2030. La nota reproduce además los umbrales de 30/32 °C. | **Corregido y exacto.** |
| **H-14 Registro** | (i) «más de 10 años» atribuido al Resumen; (ii) solapamiento S1/S2; (iii) nota de rama; (iv) imágenes `-v1` con sección de inserción; (v) Introducción 250 y H2-4 500. | (i) La frase «aging (over 10 years)… greater odds of fatal HRI» aparece en el texto de resumen/conclusión y la Discusión dice «aged over 12 years»: la instrucción «a partir de los 10–12 años» es correcta. (ii)–(v) presentes. | **Corregido.** |

## 2. Fuentes nuevas

### S10 — COLVEMA, «Para un verano sin sustos, protege a tu mascota de las altas temperaturas»

| Comprobación | Resultado |
|---|---|
| Identidad | `<title>`: «Para un verano sin sustos, protege a tu mascota de las altas temperaturas - COLVEMA». Fecha en la página: 18/07/2024. Declaraciones de «Manuel Lázaro, veterinario clínico y vocal… de la Junta Directiva del Colegio Oficial de Veterinarios de Madrid». **Coincide.** |
| Primeros auxilios | Literal: «moverlo a un lugar fresco, ofrecerle un poco de agua tibia, usar toallas empapadas de agua fresca, colocarlo cerca de una corriente de aire y, sobre todo, acudir inmediatamente a un veterinario». **Verificado.** La lectura del brief de que el «agua tibia» es para beber y no para mojarlo es correcta: «ofrecerle». |
| Prevención | Reducir la actividad, lugar fresco, pasear temprano o a última hora, ventilación «si vas a transportar a tu perro en coche». **Verificado.** La nota también recomienda «cortar su pelo y vigilar su peso» y «aplicar protección solar», y el brief no lo dice (O-03). |
| «50 %» y «2 ºC» | Ambos están **en la propia página de COLVEMA**: «solo hace falta que su temperatura corporal se incremente 2ºC para provocar un golpe de calor, que en el 50% de los casos diagnosticados resulta letal». El brief atribuye el 50 % solo al titular de colvet.es (O-04). Las instrucciones de uso (no presentarlo como dato de España y no usar los 2 °C como umbral) son correctas. |
| Perros mayores | No los menciona («mayor», «edad», «senior»: sin resultados en el cuerpo). El brief lo declara. **Correcto.** |
| Uso en §6 | H2-3, como coincidencia con S5 (agua + aire + veterinario). Es legítimo y no exagera. |

### S11 — AEMET, Plan Meteoalerta, Anexo 1: Umbrales y niveles de aviso

| Comprobación | Resultado |
|---|---|
| Identidad | Cabecera «Umbrales y niveles de aviso · Versión: 1 · Fecha: 31-may-2022 · METEOALERTA_ANX1 · Página x de 20»; `pdfinfo`: 20 páginas, autor AEMET. **Coincide.** |
| Acceso | **Limitación de acceso, no fallo:** la URL `web2.aemet.es` del brief cortó la conexión tres veces. La misma ruta en `www.aemet.es` funciona y da el mismo documento (O-07). |
| 182 zonas | 182 filas con código de zona de 6 dígitos y 182 códigos distintos. **Verificado.** |
| Amarillo por máxima en 34/36/38 °C | Primera columna de «temp. máximas / amllo»: 34 °C en 60 zonas, 36 °C en 84 y 38 °C en 38. No aparece ningún otro valor. **Verificado exacto (60/84/38).** |
| Ejemplos | Campiña sevillana 38/40/44; Metropolitana y Henares 36/39/42; Sierra de Madrid 34/37/40; Campiña cordobesa 38; Valle del Tajo (Toledo) 38; Vega del Segura (Murcia) 38; Vegas del Guadiana (Badajoz) 38. El «valle del Guadalquivir» de §2 existe como «Valle del Guadalquivir de Jaén», 38. **Todos verificados.** |
| «Avisos pensados para personas y bienes» | No figura en el Anexo 1, que solo trae tablas de umbrales. No es un dato clave y es una aclaración de contexto, pero no tiene localización (O-09). |
| Límites | El brief pide comprobar la versión vigente antes de publicar, citar dos o tres zonas como mucho y no convertir la diferencia en umbral clínico. **Correcto.** |

**Aportación (d), «No esperes al aviso amarillo»:** la comparación es entre dos cifras atribuidas a dos emisores oficiales: ~30 °C de la guía del Ministerio (S8, literal en el PDF y en la nota de prensa) y 34–38 °C de la AEMET (S11). No mezcla WBGT con temperatura del aire (la regla de H-01 se respeta) y el brief no la presenta como umbral propio. Se sostiene.

## 3. Orientación a lectores de España

| Punto | Resultado |
|---|---|
| Instrucción de variante | §2 «Variante lingüística» coincide con la «Excepción: serie España» de `guia-voz-tono.md`: tú y vosotros; sin usted, ustedes ni voseo; vocabulario peninsular; formato «30 °C», coma decimal, punto de millar. §9.5 la convierte en bloqueante del contrato. **Coherente.** |
| Texto del propio brief | `grep` de americanismos y de usted/voseo: solo aparecen dentro de la lista de prohibidos (línea 69) y de la regla (línea 68). Borradores de FAQ en tuteo, «°C» con espacio. **Correcto.** |
| Referencias españolas | AEMET (S7, S11), Ministerio (S8, emisor verificado), BOE (S9), COLVEMA (S10). Las cuatro están exigidas en §9.5. Los ejemplos geográficos existen en S11; el brief prohíbe inventar datos regionales. **Verificable.** |
| Cifras clínicas del Reino Unido | §3 cabecera: «Ninguna cifra clínica de este brief es de España». S1 Límites y H2-1: «datos de clínicas del Reino Unido (una vez)». S3: Israel/series hospitalarias. S10 «50 %»: prohibido presentarlo como dato de España. §9.6: casilla «Ninguna cifra del Reino Unido presentada como española». No encontré ninguna cifra de VetCompass ni de S3 atribuida a España en §2, §6 ni en la FAQ. **Correcto.** |
| Laguna 5 | Declara que no hay estudio clínico español y que la parte española se apoya en fuentes oficiales y colegiales. Es una excepción documentada, no silenciosa. **Cumple.** |

## 4. Comprobaciones mecánicas

| Punto | Medido | Resultado |
|---|---|---|
| `seoTitle` | `python3 -I`: **53** | ≤55. Igual en la tabla y en el YAML. |
| `metaDescription` | **152** | ≤160. Igual en la tabla y en el YAML. |
| Suma de targets | 250 + 700 + 700 + 850 + 500 + 850 + 550 = **4.400** | Coincide con el objetivo global y con §9.1 (3.740–5.060 = 4.400 ± 15 %). |
| AlertBox | `info` (Introducción), `danger` (H2-2), `warning` (H2-3) | 3 tipos, uno cada uno, en sus secciones. |
| FAQ | 7 preguntas; 59/48/50/50/40/49/51 palabras | Todas en 40–60. |
| `TablaApilable` | `src/components/article/TablaApilable.astro` existe (props: `label`) | Correcto. |
| Enlaces internos | `src/content/pilares/salud-perros-mayores.mdx`; `src/content/blog/chequeo-geriatrico-canino.mdx` (inventario l. 222 `[x]`); `src/content/blog/sindrome-cushing-perros-mayores.mdx` (l. 226 `[x]`); `src/pages/herramientas/calculadora-calidad-vida-perros.astro` (l. 114 «Publicado») | Todos existen y están publicados. P1-08, P1-12 y P1-04 siguen pendientes y sin slug. `mal-aliento-perros-viejos` sigue en `[~]` (l. 230): está bien no enlazarlo. |
| Rutas relativas del brief | `.agents/skills/references/apoyos-visuales-responsive.md` y `docs/seo/enlazado-interno.md` existen | Correcto. |
| Trazabilidad §3/§6/§9 | Las diez fuentes vigentes tienen H2 en las tres vistas; ninguna es decorativa | Coherente salvo los dos desajustes menores de O-05. |
| Inventario | P1-01 en `[~]` «En Briefing… pendiente de R2» (l. 63) | Correcto. |

## Bloqueantes

**Ninguno.** Repasé la lista de §6 de `calidad-editorial-adsense.md` punto por punto:

- ningún identificador erróneo;
- ninguna afirmación clave sin respaldo (H-03 queda resuelto con S10);
- caso real: no hay;
- ninguna ilustración presentada como evidencia;
- ninguna pauta contraria a la política (sin fármacos, sin hielo, sin cifra de parada);
- ningún recurso prometido como disponible: imágenes y tablas siguen como «planificado» y son gate de publicación;
- ninguna instrucción editorial filtrada al lector;
- ninguna prueba indispensable pendiente en el brief: comprobar la versión vigente de los umbrales de la AEMET es una prueba previa a publicar el artículo, ya recogida en §9.6 y §11.

## Observaciones no bloqueantes

Para el redactor o para una corrección opcional en sesión aparte. Ninguna impide el APTO.

- **O-01 — S2 «letalidad 14,18 %» también incluye eutanasias.** Hall 2020, Resultados: «Of the remaining 54 deaths, 35 (64.81%) were by euthanasia and 19 (35.19%) were unassisted». El brief y H2-1 lo dicen como «uno de cada siete… acaba mal», que no es falso, pero §9.6 solo exige la etiqueta «murieron o se les practicó la eutanasia» para S1/S4. Al usar S2, aplicar la misma regla.
- **O-02 — «Muerte espontánea (sin eutanasia)» de S4.** Hall 2021 excluye del grupo «unassisted» tanto la eutanasia como las muertes de mecanismo no registrado. La cifra es correcta; basta escribir «muerte espontánea» sin el paréntesis o añadir «ni causa desconocida».
- **O-03 — COLVEMA recomienda «cortar su pelo» y «protección solar».** Eso choca en parte con la FAQ 7 (consultar al peluquero, «protegen más que un rapado»), que se apoya en la guía del Ministerio (punto 6, «Importancia del pelo»). Como el artículo enlazará la nota de COLVEMA, el lector puede ver la contradicción. Indicar al redactor que atribuya la FAQ 7 al Ministerio y que no presente a COLVEMA como respaldo de esa respuesta. Además, «la sombra y las horas frescas protegen más que un rapado» no está en ninguna fuente: reformular sin el comparativo. Y el «buen cepillado» de la guía está en la frase sobre gatos, así que su aplicación a perros es interpretativa. Por último, §3 S8 declara «puntos 1–4, 8–10» y la FAQ 7 usa el punto 6.
- **O-04 — El «50 %» y los «2 ºC» están en la propia nota de COLVEMA**, no solo en el titular de colvet.es. Las instrucciones de uso no cambian.
- **O-05 — Dos restos de trazabilidad.**
  - S7: §3 dice «H2: 5» y §9 dice «Introducción, H2-5» (la Introducción sí la usa, §6 párrafo 2).
  - S4: se usa en H2-1 (`### Qué es un golpe de calor`, matización de los 41 °C), pero no figura en el `*Sustentado en:*` de H2-1 ni en §9.
  - En los dos casos, añadir el H2 que falta en la vista correspondiente. La casilla de §10 («mismos H2») no es del todo exacta.
- **O-06 — §6 H2-1 llama al WBGT «índice de calor y humedad».** S1 lo define con temperatura del aire, radiación, humedad y viento (§3 lo dice bien). No es un error de magnitud; conviene usar la definición de §3.
- **O-07 — URL de S11.** `web2.aemet.es` cortó la conexión de forma repetida; `https://www.aemet.es/documentos/es/eltiempo/prediccion/avisos/plan_meteoalerta/METEOALERTA_ANX1_Umbrales_y_niveles_de_aviso.pdf` sirve el mismo PDF. Para el enlace público del artículo, preferir la URL de `www` (o la página vigente de avisos) y abrirla antes de publicar, como ya pide §11.
- **O-08 — `TablaApilable` exige el prop `label`**, que es el `aria-label` de la región. Indicarlo en H2-5, como en `mal-aliento-perros-viejos.mdx` (`<TablaApilable label="…">`).
- **O-09 — «Los avisos están pensados para personas y bienes»** (S11 Límites, H2-5) no está en el Anexo 1. Es una aclaración de contexto, no un dato clave. Formularla sin atribuírsela a la AEMET («son avisos generales, no específicos para animales») o localizarla en el documento principal del Plan Meteoalerta.
- **O-10 — Fuera del brief (sigue de R1):** `INVENTARIO_CONTENIDO.md` ES-01 mantiene «cinco» olas y `mal-aliento-perros-viejos` figura en `[~]` aunque el `git log` registra su publicación (#145). Se actualiza en otra sesión.

## Lo que sí funciona (no romper)

- Las cuatro correcciones de mayor riesgo (WBGT, eutanasia, cita de Hall 2022 que sustituye a S6, emisor de S8) son literales contra la fuente.
- S11 se contó en el propio documento y las cifras del brief (182; 60/84/38) son exactas. Es un buen ejemplo de verificación de la que no hay que fiarse a ojo.
- La aportación (d) compara dos cifras oficiales de la misma magnitud (temperatura del aire), atribuidas cada una a su emisor, sin crear un umbral propio.
- La separación «agua tibia para beber» frente a «agua fresca para mojar» en S10 evita un error fácil.
- Laguna 5 (no hay estudio español) está declarada y la parte española no se rellena con datos clínicos ajenos.

## Efecto cascada

- No hay artículo redactado (`src/content/blog` no contiene golpe de calor).
- Las fuentes nuevas S10 y S11 no aparecen en otros briefs (`grep` de `colvema` y `METEOALERTA` en `briefings/` y `docs/`: solo este brief y este informe).
- No se encontró ningún error de fuente que pueda propagarse.

## Historial

| Ronda | SHA-256 | Veredicto |
|---|---|---|
| R1 | `69c2ea4ca18eaf04163c865de3875bd8edac67cd67ad3a7fcf3e685cff43aeb3` | NO APTO (3 mayores, 11 menores, 0 bloqueantes) |
| **R2** | `c7bf35dc4fbe72bffa3913948653e687009d365b46d91cb8e92032cd008d1f6b` | **APTO** (0 bloqueantes; 10 observaciones no bloqueantes) |

Con el APTO, la redacción puede empezar desde esta versión del brief. Si se aplican las observaciones, cambia el hash: no hace falta una ronda 3 salvo que la corrección toque fuentes, cifras o el contrato (§9).

## Cómo reproducir

```bash
sha256sum briefings/briefing-golpe-de-calor-perros-mayores.md
curl -sS "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=9144152&retmode=xml"   # «median 16.9 °C», «unassisted, euthanasia and unknown», «impaired thermoregulation»
curl -sS "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=7994647&retmode=xml"   # «0.32% … 2.19% … 23.42%»
curl -sS "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=7303136&retmode=xml"   # «35 (64.81%) were by euthanasia»
curl -sSL "https://www.dsca.gob.es/es/comunicacion/notas-prensa/derechos-sociales-publica-guia-proteger-animales-compania-olas-calor"
curl -sSL "https://www.colvema.org/noticia/26581"
curl -sSL -o anx1.pdf "https://www.aemet.es/documentos/es/eltiempo/prediccion/avisos/plan_meteoalerta/METEOALERTA_ANX1_Umbrales_y_niveles_de_aviso.pdf"
pdftotext -layout anx1.pdf anx1.txt   # contar filas con código de 6 dígitos y la primera columna numérica
```
