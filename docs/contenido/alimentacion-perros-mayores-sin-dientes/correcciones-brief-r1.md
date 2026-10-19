# Correcciones del brief tras auditoría R1

Fecha: 2026-10-19. Rol: corrección, separado del creador y del auditor independiente. Este registro no emite APTO ni añade una auditoría. Próxima revisión independiente: **ronda 2 de 3 del brief**.

Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`.

- SHA256 antes: `58bac779494d5afda4734261241b75ebb54892341afa72bde59ed67d7b02328d` (coincide con la versión auditada).
- SHA256 después: `accdd752038ed26bd5d30971bfecefe8237c26562c9262f23196fa449e8cf79c`.
- Informe aplicado: `auditoria-brief-r1.md`.
- Evidencia de fuentes consultada: `verificacion/auditor-fuentes-brief-r1.md`.

| Hallazgo R1 | Corrección aplicada | Verificación propia de corrección |
|---|---|---|
| P1.1: tres cajas totales incompatibles con cuadro de fuentes | Secciones 6 y 9: tres cajas de cuerpo más un cuarto cuadro info «Fuentes científicas y de autoridad», antes del FAQ final; seis entradas, título real enlazado, institución/autor, descripción y nota de responsabilidad | Búsqueda: desaparece «Exactamente 3 AlertBox»; título obligatorio aparece en estructura y contrato; se conservan info/danger/warning clínicos |
| P1.2: contrato incompleto de secuencia | Secciones 6, 8, 9 y 11: tres pasos, consulta manual y reproducción opcional finita; anterior/siguiente, reproducir/pausar/repetir, sin autoplay, pausa efectiva, foco y objetivos de 44 px, limpieza al ocultar/navegar/desmontar, sin inicializaciones duplicadas; reduced motion conserva consulta manual; todos los pasos sin JS y controles inertes ocultos; impresión de todos los pasos con y sin JS; sin movimiento corporal del perro ni vídeo | Comprobación textual de controles en las cuatro secciones y retirada del criterio insuficiente «estado inicial útil sin JS». Son criterios futuros de aceptación, no pruebas de un recurso ya construido |
| P2.3: declaración IA visible del hero sin mecanismo concreto | El `heroImageAlt` incluye «Ilustración generada con IA» y límite de receta; secciones 6, 8 y 9 fijan que el figcaption visible del layout usa ese valor, sin duplicar hero ni crear campos de schema | Frontmatter y contrato coinciden; queda exigida la comprobación en navegador del pie renderizado durante la validación del artículo |

Se conserva la firma central real `ArticleByline`, sin byline manual duplicado ni credenciales veterinarias añadidas. No se alteraron fuentes, límites clínicos, presupuesto, identidad visual ni enlaces. El estado del brief distingue R1 completada de R2 pendiente.

Alcance de las verificaciones propias: integridad textual de las correcciones y hash. No se ejecutaron build ni pruebas de navegador porque solo se corrigió planificación; producción visual y funcionamiento del artículo siguen como gate del artículo completo. No se creó artículo, no se hizo commit, push, fusión ni despliegue. Versión estable entregada para auditoría independiente R2; no reabrir ni renumerar rondas.
