# Propuesta de guía visual del cepillado

Pendiente de aprobación visual del usuario. PR #118 en borrador; no integrar en main sin esa aprobación.

- [Versión HTML autónoma](vista-previa-interactiva.html): contiene imágenes, estilos y lógica; no necesita servicios externos para interactuar. Descargar y abrir en navegador. Es una exportación aislada del mismo componente, no la página completa.
- [Vista previa de Cloudflare](https://f2b2d099-cuidatuperroviejo.g1721m.workers.dev/salud-perros-mayores/salud-dental-perros-mayores): versión de rama generada por Workers Builds. El GET desde el entorno de trabajo devuelve403; no se afirma validación remota de funcionamiento. Recibo actual en `ajuste-movil/vista-previa-remota.json`.
- [Captura móvil compacta](ajuste-movil/propuesta-movil-v2.png) y [teléfono de 320×568 con sus elementos fijos](ajuste-movil/telefono-320x568-light-reduce-True.png). La primera aísla la guía ocultando superposiciones globales solo en la captura.
- [Propuesta, procedencia y fuente](propuesta-visual.md), [verificación local](verificacion-local.md), [auditoría R1](auditoria-r1.md) y [auditoría R2](auditoria-r2.md) y [R3 final responsive](auditoria-r3.md).

El componente tiene cuatro pasos con imágenes generadas: preparación, labio, contacto externo y descanso. Incluye ampliación, secuencia finita, pausa/repetición y navegación manual. No se presenta como vídeo ni como movimiento corporal generado. No hay perros o manos dibujados por código. La identidad ilustrativa no representa un paciente.

Validación: build, tipos, proyección y semántica correctos; seis escenarios locales de navegador aprobados y revisión independiente R3 apta para mostrar. El ajuste móvil añade 10 escenarios/40 comprobaciones de paso con altura útil;107 pruebas de código aprobadas. CI y Workers Builds del commit de producto `dd0d1a5` aprobados. La comprobación HTML autónoma actualizada en memoria y con HTTP bloqueado se registra en `ajuste-movil/offline-pruebas.json`; el navegador administrado impide abrir file://, por lo que ese protocolo no se presenta como probado aquí. Las capturas y la exportación no alteran la fuente auditada del componente.

Falta que el usuario vea y apruebe el resultado antes de su integración en main. La aprobación estética no se infiere de los controles técnicos.

La corrección responde a la revisión del usuario: la versión anterior evitaba desbordamiento horizontal, pero era demasiado alta. El ajuste actual reúne controles, imagen e instrucción y deja los consejos ampliados desplegables. Detalle y medidas en [ajuste móvil](ajuste-movil/README.md). Se conservan las rondas anteriores y sus evidencias históricas; no se reinicia la numeración.
