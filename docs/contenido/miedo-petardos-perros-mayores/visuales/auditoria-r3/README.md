# Evidencia propia R3 FINAL

Versión auditada: eb82b43e6aa5e4e06f0975f5c258d020a93b89fe, 2026-10-26. R1/R2 intactas.

`verificar-independiente.cjs` es la prueba propia de R2 reutilizada con scope/directorios R3 y lectura explícita de opacidad de rótulos compactos/testigo. Se ejecutó de nuevo contra el build nuevo local existente, sin recompilar o desplegar.

`verificacion-propia.json` registra los cuatro modos de la página principal y otros cuatro del testigo. `resumen-mediciones-propias.json` extrae contrastes sin redondeo, opacidades, alturas, caption, carga y overflow. Contraste sRGB: composición alfa continua del color efectivo sobre fondo y luminancia WCAG, sin redondeo para decidir ≥4,5. Muestra: td/th/pseudorrótulos visibles y figcaption, no todo el sitio.

Doce archivos `390-*`/`1366-*` son capturas propias de Chromium: portada, calendario y encuesta, claro/oscuro. Solo se ocultaron fixed/sticky durante la captura del recurso; no se alteraron imágenes, texto o estilos de tablas. `*-final-390.png` son tres reducciones propias reales a390×219 de WebP vigentes, mediante Lanczos, abiertas a tamaño real.

`integridad-propia.json` compara hashes de todos los recursos de R2, registra como único cambio esperado TablaApilable y verifica que R1/R2 coinciden byte a byte con b4e5dfa. `versiones-inspeccionadas.json` registra hashes completos actuales de binarios, MDX, contrato, testimonios, código e informes previos.

Browser configs/cache en/tmp. Fuentes principales desde caché previa; no se descargó red externa. El testigo solicitó una URL de Outfit no cacheada, bloqueada y registrada como limitación tipográfica. No se repitieron build, CLS o capturas de avisos del productor. No se modificó producción.
