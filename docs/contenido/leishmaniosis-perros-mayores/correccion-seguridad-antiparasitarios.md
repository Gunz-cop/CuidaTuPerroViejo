# Corrección de precauciones de antiparasitarios

Fecha: 27 de octubre de 2026. Rama: `codex/leishmaniosis-articulo-revision`. Base: `381b7ac86fd51426fc54dcd76e44006af9970ba2`.

El propietario autorizó aplicar la propuesta concreta de la revisión científica: precauciones sobre niños y medio acuático, y aclaración sobre el collar con deltametrina en el aviso de gatos. Esta entrega es una corrección, no una auditoría independiente ni un dictamen nuevo. No cambia las skills ni adopta la propuesta de proceso editorial de otra rama.

## Alcance

- Nuevo H3 «Precauciones en casa y en el agua», después de la explicación de collar y pipeta: contacto doméstico, niños y restricciones para baños.
- Aclaración en el aviso existente: el collar con deltametrina citado tampoco debe utilizarse en gatos. No se equipara su contraindicación con el riesgo de exposición secundaria a permetrina.
- Se identifica expresamente el spot-on de permetrina como la fuente de la advertencia sobre lamido, para evitar confundirla con la ficha del collar.
- Nueva ficha del collar enlazada junto a la afirmación y en la bibliografía. Copias MDX y Markdown de lectura sincronizadas.

No se reescriben diagnóstico, tratamiento, calendario ni FAQ; no se modifican imágenes, componentes ni metadatos. El archivo histórico `visuales/texto-aprobado-r2.mdx` conserva su hash `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`.

## Trazabilidad de las adiciones

Fuentes oficiales abiertas y leídas en la comprobación previa de esta conversación, no deducidas de la revisión de Gemini:

| Fuente | Localización | Afirmación incorporada | Límite |
|---|---|---|---|
| [AEMPS/CIMAVet, spot-on 3212 ESP](https://cimavet.aemps.es/cimavet/pdfs/es/ft/3212%20ESP/3212_ESP_ft.pdf), revisión 09/2026 | §3.5, p. 2 | No manipular/jugar hasta que se seque la aplicación; no dormir con personas el día del tratamiento, especialmente niños | Instrucciones del producto citado, no plazos universales de todas las pipetas |
| Misma ficha | §3.5, p. 3 | No bañarse en cursos de agua durante los dos días siguientes a la aplicación, por peligro para organismos acuáticos | Restricción ambiental diferente de la pérdida de eficacia por baño |
| [AEMPS/CIMAVet, collar 1326 ESP](https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326_ESP_ft.pdf), revisión 05/2025 | §3.3 y §3.5, p. 2 | No usar en gatos; los niños no deben jugar con el collar ni llevárselo a la boca | Se refiere al collar consultado; no se afirma que esté prohibida la convivencia con gatos |
| Misma ficha | §3.5, pp. 2–3 | Retirar siempre antes de nadar/bañarse; evitar esos baños durante los primeros cinco días de uso | No se sustituye esta instrucción por los dos días de la pipeta |

## Comprobaciones locales

- `npx astro build`: termina con código 0; genera la proyección Markdown de 36 documentos. Sin despliegue.
- `tono.py`: 0 muletillas. Su contador da 4.083 palabras; excluye más elementos que `medir-texto.py`.
- `medir-texto.py`: 4.583 palabras editoriales, dentro del rango global histórico 3.868–5.232. SHA-256 final del MDX: `871ff7fadc0fa352e9e2cd809fd8dd6c5b0b2fe8ee2310d50cb54ac743788d18`.
- `git diff --check`: sin errores. MDX de `src/content/blog/` idéntico a `articulo-borrador.mdx`.
- HTML y Markdown generados contienen el nuevo H3, las precauciones y la referencia al collar.
- No se ha repetido la auditoría visual ni la interacción de los componentes: esta entrega cambia texto y enlaces. Tampoco se ha verificado una publicación nueva, porque no se publica.

| Sección | Palabras | Target histórico | Desviación |
|---|---:|---:|---:|
| Introducción | 240 | 250 | -4,0 % |
| Qué es y por qué un perro mayor merece atención especial | 579 | 650 | -10,9 % |
| Qué mirar en casa: señales y cuándo llamar | 670 | 700 | -4,3 % |
| Pruebas: infectado no es lo mismo que enfermo | 774 | 800 | -3,2 % |
| Estadios, tratamiento y seguimiento con los riñones en el centro | 650 | 700 | -7,1 % |
| Protegerlo de los flebotomos: medidas, calendario y gatos en casa | 1149 | 900 | 27,7 % |
| Qué llevarte de esta guía | 521 | 550 | -5,3 % |

Densidad de párrafo: media 38,3; mediana 39; 1,1 % de párrafos con más de 50 palabras. Ningún H3 supera las 200 palabras con el método del script.

**Ajuste de alcance autorizado:** el H2 de prevención supera el target histórico por estas precauciones útiles. Se conserva esta ampliación de seguridad autorizada por el propietario, sin recortar otras explicaciones aprobadas para encajar un porcentaje. No se declara que cumpla el antiguo ±15 % de ese H2.

## Estado de entrega

Corrección preparada para revisión en la misma rama. No se modifica `main`, no se abre PR y no se despliega. Los informes anteriores describen sus versiones y conservan su carácter histórico.
