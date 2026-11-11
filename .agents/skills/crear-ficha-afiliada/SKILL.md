---
name: crear-ficha-afiliada
description: Crea y ajusta fichas de recomendación afiliada dentro de artículos de Cuida tu Perro Viejo, con medios del producto, un CTA directo, aviso breve de comisión y diseño responsive. Úsala al incorporar o rediseñar estas fichas. Las guías editoriales completas y el panel de monetización tienen flujos propios.
---

# Fichas de recomendación afiliada

## Referencias del proyecto

Resuelve las rutas de este documento desde la raíz del checkout de CuidaTuPerroViejo asociado al encargo.

Lee `AGENTS.md` y `docs/seo/afiliacion-aliexpress.md`. Para AliExpress, la guía contiene el registro del producto, los mercados revisados, las limitaciones conocidas, los enlaces y la retirada.

La referencia aprobada por el propietario es `src/components/CamaAfiliada.astro`, integrada en `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx`. El 10 de noviembre de 2026 aprobó su color y presencia dentro del artículo, el video, la frase bajo el CTA y el recorrido de un clic al comercio. Comprueba el componente vigente antes de trasladar su diseño.

## Resultado acordado

- Un producto se presenta con un único CTA comercial que contiene el enlace afiliado aprobado en su `href`. El clic abre el comercio directamente.
- El aviso de comisión queda visible junto al CTA, debajo del botón. Una fórmula breve es «Podemos recibir una comisión por las compras a través de este enlace».
- La frase bajo el botón explica por qué considerar el producto. El título identifica qué es. Las comprobaciones pendientes se expresan con brevedad y conservan su significado.
- El medio muestra el producto exacto y ayuda a evaluarlo. En la ficha de camas se eligió el video del vendedor como protagonista.
- La apariencia destaca al recorrer el artículo y mantiene la legibilidad, el foco de teclado y la comodidad táctil.

El desplegable que obligaba a elegir entre afiliación y una salida sin comisión fue rechazado expresamente. Conserva la preferencia de un único CTA directo al ajustar esta ficha o crear otra equivalente. Si el usuario encarga una comparativa entre tiendas, cada destino comercial puede tener su enlace correspondiente.

## Preparación del producto y del medio

Identifica la página y sección donde el producto responde a una decisión del lector. Comprueba producto, vendedor, variante, país, destino y enlace oficial. Reutiliza el registro vigente para el producto ya aprobado y registra los cambios que descubras.

Describe lo que respalda la evidencia disponible. Diferencia la experiencia doméstica del propietario, la revisión de una ficha y las declaraciones del vendedor. Las etiquetas «ortopédica», «la mejor» o «probada» requieren respaldo para el sentido en que se utilizan. La cama del piloto tiene discrepancias de medidas documentadas y se presenta como una opción para considerar.

Para medios aportados por el dueño, conserva la procedencia y sus instrucciones de uso. Comprueba la licencia aplicable o la disponibilidad como material promocional cuando haya una duda concreta. La autorización del propietario y la del titular del medio son datos diferentes. Documenta lo verificado y avanza en el trabajo autorizado. La licencia de recursos obtenidos de un comercio puede limitar su uso a enlaces hacia ese mismo comercio.

Usa una portada del producto reconocible mientras el video está detenido. Reserva el espacio del medio y mantén la reproducción a petición con `controls`, `playsinline` y `preload="none"`. Optimiza el archivo preservando lo que se necesita evaluar. Informa al propietario si cambias el audio, recortas una demostración o eliminas información relevante. La foto o el video del vendedor deben poder distinguirse de una prueba propia.

## Implementación y diseño

Reutiliza la estructura vigente cuando cumpla el encargo. La primera ficha puede tener un componente específico. La extracción de un componente genérico se justifica cuando hay más ubicaciones reales que comparten comportamiento.

Usa enlaces HTML normales y conserva `sponsored` en el atributo `rel` de todo enlace afiliado, tanto si abre en la misma pestaña como en otra. Respeta el enlace aprobado y la elección de pestaña acordada con el propietario. Para abrir otra pestaña, usa `target="_blank"` y conserva también `noopener noreferrer`, de modo que el atributo completo sea `rel="sponsored noopener noreferrer"`.

La tarjeta de camas utiliza terracota `#a33e24` con texto blanco en claro y cobre `#f2a66f` con texto `#27160f` en oscuro. Es una referencia local aprobada. Comprueba el contraste del resultado renderizado y el encaje con el artículo al aplicarla a otro producto. El layout editorial aplica estilos globales fuertes a enlaces, tablas y desplegables. Verifica el estilo calculado en el navegador.

Conserva el aviso breve y una razón concreta para abrir el producto. Mantén precio, stock, tallas disponibles y entrega en el comercio cuando el sitio carezca de una fuente autorizada y actualizada para mostrarlos.

El botón debe caber a 320 px, tener una superficie táctil de al menos 44 × 44 px y conservar un foco visible. El video necesita proporción reservada y el texto debe ajustarse al ancho disponible.

## Animación

La referencia usa una franja de luz sobre el CTA al entrar en pantalla, activada por `IntersectionObserver`. Se activa cuando al menos el 65 % del botón es visible, espera 180 ms y dura 750 ms. Se reproduce una vez por carga. El hover oscurece ligeramente el botón en dispositivos con puntero.

El efecto funciona por desplazamiento también en teléfonos. Respeta `prefers-reduced-motion`. El usuario puede perderse un efecto breve mientras desplaza la página. Si pide hacerlo más perceptible, ajusta la duración o el momento de activación y comprueba el resultado antes de prometer más atención o clics.

## Privacidad y medición

Identifica la finalidad comercial junto al enlace y mantén las políticas coherentes con el funcionamiento publicado.

Cuando el encargo incluya consentimiento, consulta las fuentes oficiales vigentes y las tecnologías que realmente se ejecutan. Distingue el alcance técnico del seguimiento, la necesidad de consentimiento, sus posibles excepciones y la interfaz elegida. Una política informa y el consentimiento exigible requiere su propio mecanismo válido. Los ejemplos de otros medios permiten comparar recorridos y diseños, sin acreditar por sí solos las obligaciones de este sitio.

Una revisión de privacidad debe explicar el requisito concreto y su fuente antes de alterar el recorrido comercial aprobado. Resuelve el mecanismo que corresponda a ese requisito y al encargo, manteniendo las acciones de compra claras.

La medición propia es un encargo adicional. El piloto usa un enlace directo y los informes del proveedor. El panel y el país de los clics están registrados en `TODO.md`. Conserva el atributo `data-affiliate-placement` con una ubicación estable para identificar cada ficha.

## Verificación y entrega

Comprueba el recorrido completo con teclado y pantalla táctil. En una ficha de un solo producto, verifica un solo enlace comercial y el `href` aprobado. Intercepta la navegación externa durante pruebas automatizadas para comprobar el clic sin enviar tráfico de prueba al programa de afiliados.

Revisa móvil, escritorio, ambos temas y movimiento reducido. Comprueba si se descarga el video antes de reproducirlo, si hay desbordes y si el aviso queda legible bajo el CTA.

El contenedor comercial completo debe ser un `<aside data-affiliate-placement="ubicacion-estable">`. El contrato de exclusión del proyector está en `scripts/agent-readiness/projection-dom.mjs` y exige tanto el elemento `aside` como el atributo. Comprueba que el texto comercial y el enlace de esa ubicación quedan fuera del Markdown generado. El asistente y los resultados del selector de movilidad tienen sus propios contratos. Comprueba el build y la proyección cuando cambies el componente o su integración. Usa las validaciones vigentes de `docs/seo/afiliacion-aliexpress.md`.

Al entregar, indica el producto y ubicación, el resultado visible, el destino del CTA y lo verificado. Explica cualquier limitación material de la evidencia o del medio. La autorización de crear una ficha no implica por sí sola publicar cambios. Cuando exista autorización para publicar, sigue el flujo del repositorio y verifica la página pública.
