# Propuesta de guía visual del cepillado

Pendiente de aprobación visual del usuario. PR #118 en borrador; no integrar en main sin esa aprobación.

- [Versión HTML autónoma](vista-previa-interactiva.html): contiene imágenes, estilos y lógica; no necesita servicios externos para interactuar. Descargar y abrir en navegador. Es una exportación aislada del mismo componente, no la página completa.
- [Vista previa de Cloudflare](https://a82e34e6-cuidatuperroviejo.g1721m.workers.dev/salud-perros-mayores/salud-dental-perros-mayores): versión de rama generada por Workers Builds. El GET desde el entorno de trabajo devuelve403; no se afirma validación remota de funcionamiento. Recibo en `vista-previa-remota.json`.
- [Captura de escritorio](propuesta-1440.png) y [móvil](propuesta-390.png). Aíslan la guía ocultando superposiciones globales solo en la captura.
- [Propuesta, procedencia y fuente](propuesta-visual.md), [verificación local](verificacion-local.md), [auditoría R1](auditoria-r1.md) y [auditoría R2](auditoria-r2.md).

El componente tiene cuatro pasos con imágenes generadas: preparación, labio, contacto externo y descanso. Incluye ampliación, secuencia finita, pausa/repetición y navegación manual. No se presenta como vídeo ni como movimiento corporal generado. No hay perros o manos dibujados por código. La identidad ilustrativa no representa un paciente.

Validación: build, tipos, proyección y semántica correctos; seis escenarios locales de navegador aprobados y revisión independiente R2 apta para mostrar. CI y Workers Builds del commit de producto `8ffe74a` aprobados. La comprobación HTML autónoma en memoria y con HTTP bloqueado se registra en `vista-previa-offline-pruebas.json`; el navegador administrado impide abrir file://, por lo que ese protocolo no se presenta como probado aquí. Las capturas y la exportación no alteran la fuente auditada del componente.

Falta que el usuario vea y apruebe el resultado antes de su integración en main. La aprobación estética no se infiere de los controles técnicos.
