# Análisis de Claude: competencia y enlaces entrantes

Fecha de observación: 2026-11-13. Autor: Claude (sesión de chat con el propietario). Estado: documento de trabajo para estudiar junto al [análisis de Codex](analisis-miperromayor-2026-11-13.md). Nada de esto está encargado ni implementado.

## Alcance y método

- **miperromayor.com**: lectura de la portada, «Sobre nosotros» y seis artículos (`perro-mayor-se-esta-apagando`, `mi-perro-mayor-se-resbala-en-el-suelo`, `adaptar-casa-perro-mayor`, `como-levantar-a-un-perro-mayor`, `cuando-sacrificar-perro-anciano`, `higiene-perro-senior-guia`) con un lector web. No se usó la API de WordPress; el inventario completo (68 artículos) es el de Codex.
- **Catálogo propio**: 41 documentos del servidor MCP del sitio (`search_guides`), que no incluye páginas legales ni el asistente IA.
- **Enlaces entrantes**: informe «Enlaces → Sitios con más enlaces» de Search Console, exportado por el propietario el 2026-11-13, y capturas de cada sitio con sus páginas de origen y destino.
- **petmetric.vet**: portada, `/escala-hhhhhmm/`, `/calculadora-hhhhhmm/` y `/para-veterinarios/`.
- No se pudo abrir `puppyhousemedellin.com`; su enlace se conoce solo por Search Console.
- El encargo del propietario: aprender de la competencia, sin comparar en qué somos mejores.

## Hallazgo principal

**Nadie enlaza artículos. Los enlaces van a guías principales, a páginas de referencia y a recursos.**

| Sitio | Páginas de origen | Destino propio | Tipo de destino |
| --- | --- | --- | --- |
| petmetric.vet | 8 (una página de recursos repetida en 8 idiomas: ca, de, en, es, fr, it, pl, pt) | `/cuidados-paliativos-perros` | Pilar |
| miperromayor.com | 3 | `/salud-perros-mayores/chequeo-geriatrico-canino` | Referencia |
| miperromayor.com | 1 | `/higiene-hogar-perros-senior` | Pilar |
| puppyhousemedellin.com | 1 (`/estimulacion-cognitiva-para-perros-mayores/`) | `/salud-mental-emocional-perros` | Pilar |

`mediatize.info` y `blogspot.com` aparecen en el informe, pero son microblogs del propietario y se excluyen.

Para el plan de crecimiento, esto significa usar los artículos de síntomas para atraer búsquedas y llevar al lector a las guías principales, las herramientas y las páginas de referencia, que son las que otros sitios citan.

## URLs viejas de Blogger: siguen circulando

Dos de los tres sitios externos enlazan rutas de Blogger:

- puppyhousemedellin.com → `https://www.cuidatuperroviejo.com/p/salud-mental-y-emocional-en-perros.html`
- miperromayor.com → `https://www.cuidatuperroviejo.com/2025/10/revision-veterinaria-perros-mayores.html` (comprobado por Codex: redirige con 200 final)

Search Console atribuye ambos enlaces a las URLs nuevas, así que hoy funcionan. Propuesta: listar todas las rutas que tenía Blogger (`/p/*.html`, `/AAAA/MM/*.html` y la variante `www`) y comprobar que cada una redirige con 301, **en un solo salto**, a su URL nueva. Esas redirecciones se mantienen para siempre.

## miperromayor.com: qué aprender

Coincide en general con Codex. Lo que este análisis agrega:

1. **«Antes de seguir: descarta lo tratable.»** El artículo «se está apagando» abre con una sección que pide descartar causas tratables y da cuatro preguntas para distinguir el envejecimiento normal de un deterioro activo. El de resbalones empieza con «antes de comprar nada: mírale las patas» y una lista de casos en los que el problema no es el suelo. Es un patrón de decisión que puede adaptarse a los artículos de síntomas, siempre con fuentes propias verificadas.
2. **Explicar antes de recomendar productos.** Primero el mecanismo (resbalón → caída → miedo) y después las soluciones genéricas. Aplica a las comparativas afiliadas, como la de camas: el lector confía más cuando se le explica el problema antes de recomendarle algo.
3. **Unos 11 enlaces internos en el texto por artículo**, que van de un síntoma a otro (uñas → lamido de patas → rigidez → artrosis → arnés → rampa). Coincide con la tabla de Codex; revisar con la skill `enlazado-interno-sitio`.
4. **Un «calendario de días buenos y malos».** Lo recomiendan como llamado a la acción, pero no lo ofrecen como herramienta (ver R04).
5. **Por qué te enlazan.** Te enlazan para temas que su artículo menciona pero no desarrolla (qué incluye un chequeo, higiene). Las páginas de referencia completas reciben enlaces de sitios que no quieren escribir ese tema.

Advertencia (también de Codex): no tienen autor veterinario ni revisor, y en lo observado no citan fuentes. Se aprende de su forma de presentar los temas, no de sus afirmaciones clínicas.

## petmetric.vet: qué aprender

Es un bot de Telegram que pide cada noche los siete valores de la escala HHHHHMM y manda informes semanales y mensuales de la tendencia al veterinario. Ofrece una calculadora web, guías de «calidad de vida con» cada enfermedad (artrosis, disfunción cognitiva, enfermedad renal felina, hipertiroidismo felino, cáncer) y una página para veterinarios con enlace o QR por clínica y comisión por suscripción. No identifica autores, equipo ni veterinarios.

1. **Seguimiento en el tiempo, no un cálculo aislado.** El valor que ofrecen está en el recordatorio diario, la tendencia y el informe de 4 semanas para el veterinario. Su calculadora web no guarda, no exporta y no comparte: manda al bot. → R05.
2. **Página de la escala orientada a la confianza.** Tiene secciones de quién reconoce la escala (AAHA, Dra. Villalobos), validación revisada por pares (estudio de la Universidad de Padua, *Animals* 2023, MDPI), una tabla de umbrales (0–34, 35–49, 50–70), por qué importa más la tendencia que un día, si sirve para gatos y cuándo hablar con el veterinario. Hay que verificar cada fuente antes de usarla, según la skill de herramientas.
3. **Recursos por país.** Unos 50 enlaces salientes a sitios veterinarios, de divulgación y clínicas de 12 países. Ahí está nuestro enlace, bajo España. Una página así sirve al lector y además da motivos para que nos enlacen. → C14.
4. **Guías de «calidad de vida con» cada enfermedad.** Conectan cada enfermedad con la escala. → A03.
5. **Ángulo para veterinarios.** Material que la clínica comparte con sus clientes. Es una idea a explorar, no una prioridad.
6. **Contacto.** Ya nos reconocen como recurso. Se les puede proponer que, además del pilar de paliativos, enlacen la calculadora HHHHHMM, que encaja mejor con su página.

## Oportunidades (complementan la tabla C01–C10 de Codex)

Los identificadores siguen la numeración de Codex para poder estudiarlos juntos.

### Contenido

| ID | Prioridad propuesta | Tema | Motivo |
| --- | --- | --- | --- |
| C11 | Alta | **Reforzar el chequeo geriátrico** (URL existente, la más enlazada después del pilar de paliativos) | Recibe 3 de los 4 enlaces de miperromayor. Hoy es de las páginas más cortas y antiguas (2025-10). Propuesta: frecuencia según edad y tamaño, qué detecta cada prueba (hemograma, bioquímica, orina, presión, tiroides), cómo preparar la consulta y una lista imprimible. Convertirla en el destino de cada «consulta al veterinario» de los artículos de síntomas. |
| C12 | Alta | **Estimulación mental y juegos para perros mayores** | puppyhousemedellin la enlaza desde ese tema y nos manda al pilar general porque no hay página específica. miperromayor tiene `estimulacion-mental-perros-mayores`. |
| C13 | Media | **Final de vida: señales de que se está apagando y cuándo plantear la eutanasia** | Ellos tienen una categoría completa de «Final de vida y duelo». Complementa C09 (duelo). Revisar antes qué cubre ya el pilar de paliativos. |
| C14 | Media | **Recursos por país** (Latinoamérica y España) | Servicios de urgencias, sociedades veterinarias, apoyo en el duelo y cremación. Inspirado en petmetric. Atrae enlaces de las instituciones listadas. |
| C15 | Baja | Vómito de espuma blanca, lamido de patas, olor corporal, barriga hinchada, temblores | Búsquedas de síntomas con títulos en primera persona. Agruparlas en guías más amplias si no se justifica una URL por síntoma (criterio de Codex). |

### Herramientas (seguir `crear-herramienta-interactiva`; evidencia revisada por pares verificada una por una)

| ID | Recurso | Idea | Límites |
| --- | --- | --- | --- |
| R04 | Calendario de días buenos y malos | Marcar cada día como bueno o difícil, ver la proporción semanal y un resumen para el veterinario. Corresponde a la «M» de la escala HHHHHMM. | No decide sobre la eutanasia. Lo que se marca es una observación del cuidador. |
| R05 | **HHHHHMM v2: historial y reporte** | Guardar los registros en el navegador (`localStorage`, envuelto en try/catch), gráfico de tendencia, informe imprimible o en PDF de 2 a 4 semanas y recordatorio opcional. Sin servidor, coherente con la infraestructura gratuita. | La suma no diagnostica. Explicar que los datos viven en ese navegador y en ese dispositivo. |
| R06 | Test de cambios cognitivos | Basado en una escala validada, como la CCDR (Salvin et al.); evaluar también DISHA. Conecta con el artículo de disfunción cognitiva. | Orienta para preparar la consulta, no diagnostica. Verificar la licencia y la publicación original de la escala. |

R02 (registro de agua) de Codex coincide con lo que este análisis vería como herramienta de agua; se mantiene su versión con límites.

### Arquitectura y enlaces

| ID | Acción |
| --- | --- |
| A01 | Auditar las redirecciones de Blogger (sección anterior): 301 en un salto, incluida la variante `www`. |
| A02 | Enlazar el chequeo geriátrico desde cada «consulta al veterinario» de los artículos de síntomas (skill `enlazado-interno-sitio`). |
| A03 | En cada artículo de una enfermedad crónica (artrosis, disfunción cognitiva, Cushing, IPE, leishmaniosis), una sección o caja «calidad de vida con esta enfermedad» enlazada a la calculadora HHHHHMM. |
| A04 | Contactar a petmetric.vet para proponer que enlace también la calculadora. Contactar a negocios locales de Latinoamérica (guarderías, veterinarias) cuando existan C12 y C14. |

## Primera selección sugerida por Claude

1. **A01**: redirecciones de Blogger. Es barato, protege los enlaces que ya existen y no requiere redactar.
2. **C11 + A02**: reforzar el chequeo geriátrico y convertirlo en el centro de los artículos de síntomas.
3. **R05**: HHHHHMM v2 con historial y reporte. Es la herramienta más relacionada con los enlaces que ya tenemos.
4. **C12** y las C01/C02/C03/C05 de Codex, según la capacidad editorial.

Igual que en el documento de Codex, esto es una propuesta para estudiar con el propietario, no un orden de producción.

## Correcciones a lo dicho en el chat

- En el chat se supuso que petmetric enlazaba la calculadora HHHHHMM. Al revisar la página se vio que el enlace va al **pilar de cuidados paliativos** (texto «Cuida tu perro viejo · Cuidados paliativos · escala HHHHHMM»), y solo en su sección de recursos por país.
- Algunos temas que en el chat aparecieron como faltantes en miperromayor (estimulación mental, calidad de vida, frecuencia de visitas al veterinario) sí tienen artículo propio en su inventario completo de 68 artículos.
