# Guía visual del cepillado dental — propuesta para revisión del usuario

Fecha: 17 de octubre de 2026. Rama `contenido/guia-visual-cepillado-dental`. No autorizada todavía para main. El usuario exige ver el resultado antes de publicarlo.

## Alcance

Sustituir únicamente la imagen de cepillado del artículo dental por un componente de cuatro pasos. No reescribir el artículo ni reiniciar sus auditorías clínicas cerradas. La revisión independiente se circunscribe al nuevo recurso y su integración. Este componente es un documento nuevo, con un máximo de tres rondas propias; no se usarán esas rondas para eludir bloqueos de documentos anteriores.

Guion: preparar y familiarizar → elevar suavemente un labio → contacto externo del cepillo → retirar contacto y descansar. La reproducción es una secuencia finita de ilustraciones de 9 segundos por paso para lectura, sin equivalencia con una duración clínica. Detalle ampliable en los pasos del labio y el cepillo. No se simula vídeo ni movimiento corporal del perro.

## Ilustraciones y procedencia

Tres escenas generadas con IA, rotuladas como tales en pantalla. Beagle senior ilustrativo: orejas caídas canela, manto tricolor, hocico y contorno ocular encanecidos, ojos marrones, perfil hacia la derecha. No es paciente, no tiene nombre ni historia clínica inventada. Mismas referencia, proporciones y encuadre en todas las escenas. Manos y perro generados como imágenes; CSS y JS manejan estados y ampliación. Ninguna mano ni perro dibujados mediante SVG/canvas/código.

La primera generación se descartó por orden dental invertido. La referencia corregida coloca el colmillo superior hacia la nariz (derecha) y los premolares detrás (izquierda). Se derivaron las otras dos escenas de esa referencia, en vez de generar perros independientes.

Originales conservados: `original-reposo.png`, `original-labio.png`, `original-contacto.png`. Referencias de generación del entorno: `exec-e6cb7a5b-cfc0-4851-92a4-adab83b31c1d.png` (labio); `exec-a27ae283-ee7c-4b14-955e-11c6e9d84fa0.png` (contacto); `exec-357f2cec-8c2b-4e15-8458-73c65e6d5b72.png` (reposo). Todas derivan de la escena del labio. Los originales no se alteran; Sharp solo redimensiona y codifica las variantes WebP a 1200/800/400px. Nombres nuevos v1 por la caché larga de imágenes.

## Fuente y límites

Fuente consultada directamente el 17 de octubre: [VCA, Brushing Your Dog’s Teeth](https://vcahospitals.com/know-your-pet/brushing-teeth-in-dogs), Malcolm Weir, Lorraine Hiscox y Jan Bellows; página fechada 21 de junio de 2023. Se comprobó identidad y contenido, HTTP200 y texto legible. Apartados concretos: enseñanza gradual, tipo de cepillo y técnica de cepillado. Respaldan adaptación progresiva, suavidad, elevación del labio y atención a superficies externas. No se copia su imagen ni se presenta la guía como revisión veterinaria. La política editorial y el artículo ya requieren consulta ante dolor y sangrado.

La guía limita su demostración al contacto externo accesible sin forzar la boca. No intenta enseñar a abrir la mandíbula, limpiar bajo encías, diagnosticar por color, eliminar sarro, decidir presión por una ilustración ni realizar limpieza profesional. La posición anatómica es representativa; no se usa como mapa de dentición. Sin promesas de prevención universal.

## Controles previstos

Sin reproducción al cargar; botones por paso, anterior/siguiente y reproducción/pausa/repetición; reproducción finita, pausa al ocultar pestaña, limpieza de temporizadores al navegar. Movimiento reducido: avance manual y sin transiciones. Sin JS: cuatro escenas con texto e instrucciones; controles ocultos. Impresión: cuatro pasos. Verificar foco, 44px táctiles, contraste, lectura de proyección Markdown, móvil y modo oscuro.

## Estado

Generación e implementación local completadas; build, pruebas de navegador y auditoría independiente pendientes en este punto. La aprobación visual del usuario queda pendiente y es requisito explícito para main. La vista previa de rama no equivale a publicación en producción.
