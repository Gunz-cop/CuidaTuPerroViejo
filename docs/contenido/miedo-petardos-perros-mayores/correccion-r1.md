# Corrección del brief tras la auditoría R1

Fecha: 2026-10-25. Brief: `briefings/briefing-miedo-petardos-perros-mayores.md` (v1 → v2). Informe de origen: `auditoria-brief-r1.md`. Corrige una sesión que no es la auditora (la generadora, por petición expresa del propietario); la valida una auditoría R2 independiente. Alcance decidido con el propietario: España primero, versión latinoamericana después, testimonios del propietario incorporados.

## Hallazgos de R1 y qué se hizo

| Hallazgo | Corrección en v2 |
|---|---|
| **P1-1** Tres tablas de trazabilidad distintas; fuentes decorativas | Matriz única (§6 cabecera, §3 línea «H2», §9.2). Comprobada por script: coinciden las 11 fuentes en los tres sitios. S6 sale de H2-7; S10 sale de H2-2 y H2-10, y se desarrolla en H2-9; S5 y S8 entran en H2-4; S4 entra en H2-8 |
| **P1-2** «Solo el grupo» frente a nombres y porcentajes de fármacos | Sin marcas (no «Sileo»), sin porcentajes por fármaco (solo el agregado de S5: 69 %, N = 202), sin dosis. La información de la ficha técnica se conserva atribuida y no prescriptiva, con justificación escrita en §9.6.2 |
| **P1-3** Solapamiento con el brief de feromonas | Declarado en §2; la tabla 2 y la FAQ 4 dejan claro que S5 es una encuesta y no un ensayo, y no emiten veredicto; §9.8 pide reconciliar ambos artículos; sin enlace hasta que exista URL |
| **P1-4** Geometría de la imagen 2 | Perro a la derecha del tutor, en el lado de la cámara; correa en la mano derecha; correa de dos ramales (arnés y collar con chapa); doble sujeción marcada como criterio editorial (H2-6) |
| **P1-5** Pie «corto» frente a «largo» | H2-6 y pie dicen «paseo tranquilo y a su ritmo» |
| **P1-6** Alt y mirada de la imagen 1 | Un único alt (frontmatter = §8, comprobado por script); mirada «serena y atenta», cabeza a la altura del lomo, en ficha, prompt y bloque de edad |
| P2-1 RD 989/2015 | Añadido ITC 2, apartado 2.5.A (120 dB(A) a la distancia de seguridad en F1–F3; F1 sin petardos); disposición adicional sexta reformulada; 51.3 → 51.2 y Registro de Animales de Compañía por comunidad; art. 24.2.b incorporado |
| P2-2 Relleno en H2-3 | H2-3 pasa de 640 a 560; el H3 de categorías se condensa y se justifica por su utilidad para el lector; §9.1: «si no se llega al suelo sin relleno, parar y consultar» |
| P2-3 Riemer 2019 | Incorporado como S11 (resumen verificado en Europe PMC): matiza que la mayoría desarrolla el miedo en el primer año, respalda mirar la salud si es nuevo y sustituye a la prensa en H2-10 |
| P2-4 País de S3 | S3 pasa a «Suiza (aprobación ética del cantón de Berna)»; añadidos sus criterios de selección. S2, S5 y S11 siguen sin país verificado |
| P2-5 FAQ | Respuestas reescritas (42–52 palabras, contadas) y FAQ 6 sin «muchas normas locales» |
| P2-6 Detalles de prompts | Imagen 1: dormitorio con ventana a la calle cubierta por la persiana, cama en el lado opuesto, lado visible del antifaz; imagen 3: izquierda/derecha del encuadre sin lateralidad de manos; «farolas de luz anaranjada»; las líneas «Ilustración generada…» y «Rechazar…» pasan a instrucciones para quien genera y se añade «sin texto dentro de la imagen»; rasgos concretos de miedo moderado definidos |
| P2-7 Ventana editorial | Publicar idealmente antes del 25 de noviembre; si no, el texto cambia «con semanas de margen» por «cuanto antes» |
| P2-8 Numeración S9/S10 | Corregida en §2 |
| P2-9 | Art. 24.2.b usado; la guía del Colegio de Málaga sigue sin localizar (límite documentado) |

## Cambios por decisión del propietario (no venían de la auditoría)

- **Alcance:** se mantiene España; la versión latinoamericana se hará después (decisión 2026-10-25).
- **Tipo de material:** de «guía sin caso» a «experiencia aportada + guía». Testimonios en `testimonios-propietario.md`, con país y límites; cada uno en un solo H2 (§9.4); reserva personal Luna/Dakota activada por petición expresa. Presupuesto total sin cambios (6.000), con H2-2 y H2-5 más largos y H2-3, H2-7 y H2-8 más cortos.
- **Seguridad añadida:** requisitos 14 y 15 (no recomendar alzar a un perro asustado; no recomendar regañar, tirar de, mojar ni elevar la voz).

## Comprobaciones hechas por script tras la corrección

- Suma de targets del §6: 6.000; cada H2 coincide con la suma de sus H3.
- Matriz fuente→H2 idéntica en §3, §6 y §9.2 (11 fuentes).
- `seoTitle` 44 y `metaDescription` 154 caracteres.
- Alt del frontmatter idéntico al alt de la imagen 1.
- FAQ: 8 respuestas, 372 palabras en total.

## Pendiente

- Auditoría R2 independiente (quedan R2 y R3).
- Cierre de verificaciones parciales antes de publicar: S2, S5, S7, S10 y S11 (texto completo).
- Reconciliar con el brief de feromonas (§9.8).
