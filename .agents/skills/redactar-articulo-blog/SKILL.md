---
name: Redactar Artículo de Blog - Cuida Tu Perro Viejo
description: Ejecuta un brief auditado en MDX con respuesta práctica, fuentes trazables, recursos reales y validación de su contrato, conservando la arquitectura Astro.
---

# Redactar un artículo

Aplicar [contrato 2.0](../references/contrato-utilidad-editorial.md), [calidad editorial](../references/calidad-editorial-adsense.md), [voz](../references/guia-voz-tono.md), [reglas Astro/MDX](references/reglas_astro_mdx.md) y [experiencias visuales](references/experiencias-visuales.md). La plantilla es un soporte, no una estructura clínica obligatoria.

## 1. Recibir y revalidar

Leer el brief y su auditoría independiente con versión/hash. Si es de otra sesión y no tiene auditoría válida, encargarla antes de redactar. Identificar unidad y rondas acumuladas. Máximo cinco rondas por unidad: aprobar cierra, correcciones mantienen contador y fallo R5 detiene. Quien redacta/corrige no hace su auditoría independiente.

El contrato define intención, secciones/targets/rango, fuentes y afirmaciones, enlaces, componentes, recursos y aceptación. Si falta una decisión indispensable, documentar una adenda y validarla antes de escribir; no inventar ni pedir al usuario datos que se puedan investigar dentro del alcance. Un brief anterior conserva su versión hasta una revisión explícita.

Revalidar schema `src/content.config.ts`, pilar, rutas y publicación real de destinos; comprobar colisiones de slug y material en curso. En revisiones ya encargadas, actualizar la misma URL preservando historia/fecha original. No reemplazar trabajo ajeno o ampliar un contrato sin autorización. Search Console no es requisito para escribir si el alcance está definido; no inventar datos de demanda.

## 2. Escribir para la tarea del lector

Abrir con la respuesta útil a la situación observable y el siguiente paso pertinente. Si hay una señal urgente, hacerla visible antes de una explicación extensa. La calma y empatía acompañan, sin dramatización ni culpa. No convertir un síntoma en diagnóstico ni atribuir todo a edad/carácter.

Seguir el orden de preguntas del brief. Cada H2 aporta una decisión o explicación distinta; no añadir secciones para rellenar ni repetir la misma respuesta en introducción, gráfico, FAQ y cierre. El mecanismo científico se explica donde ayuda a entender o actuar. No imponer fisiología→diagnóstico→tratamiento ni un apartado de medicación a todo tema.

Conservar voz de tú y variante de público acordada. Con experiencia documentada, entretejer hechos en H2 prácticos (lo que ocurrió → explicación → acción); cierre integrado, sin H2 dedicado ni hechos nuevos. Sin caso, usar guía de observaciones/decisiones; no fabricar paciente, diálogo o recuperación. Las referencias ilustrativas se identifican según el control compartido.

Citar cerca de cada afirmación el nombre/título real de la fuente asignada y su enlace profundo. Verificar de nuevo identidad y afirmación si se añaden datos; no completar autores, DOI, dosis o resultados de memoria. Una fuente parcial solo sostiene lo leído; no publicar una afirmación central no comprobada. La bibliografía final complementa y no sustituye las citas de cuerpo. No insertar instrucciones editoriales, marcas de verificación parcial, números de fuente o mensajes al redactor en el texto público.

Mantener límites clínicos y procedencia de recetas/productos; sin pautas farmacológicas para el lector. Una advertencia necesaria queda junto a la acción, no oculta en un descargo final. No suavizar una conclusión para favorecer la afiliación.

## 3. Componentes y recursos pactados

En contrato 2.0 usar las cantidades y funciones de cajas declaradas, incluidos ceros justificados. La bibliografía final con `AlertBox info` es independiente de las cajas de cuerpo. No introducir peligro o medicación solo para completar tres tipos; tampoco quitar un aviso pertinente. FAQ estructurada y plegada cuando esté pactada; si se pactó cero, omitir componente e import FAQ.

Enlazar pilar y destinos publicados previstos, junto a la necesidad que amplían. No reemplazar un destino pendiente con un slug plausible ni usar la calculadora como salida automática de todos los artículos. Revisión preventiva, urgencia y seguimiento son distintos. Productos después de explicar problema y alternativas; aplicar flujo de afiliación si se encargan fichas.

Inventariar cada recurso prometido. Reutilizar registros/herramientas reales antes de duplicarlos. Ejecutar el plan visual del artículo completo mediante las skills visuales; si el encargo es solo texto, dejar recursos pendientes en el expediente y retirar promesas públicas hasta su entrega. Un placeholder no es recurso terminado.

Aplicar [dirección visual](../references/direccion-visual-editorial.md) y [apoyos responsive](../references/apoyos-visuales-responsive.md): identidad continua, cinco rasgos senior por imagen/recorte y revisión a 390 px, razas justificadas, anatomía, texto fiel, claro/oscuro. Excepciones documentadas del sujeto real conservan alcance. No dibujar perros/personas en SVG/CSS. Animaciones sin autoplay, controles manuales, pausa real, reduced-motion, impresión y alternativa sin JS; limpiar temporizadores. Las fuentes de una infografía se revisan igual que la prosa.

## 4. Arquitectura invariable

Usar [plantilla MDX](resources/plantilla_articulo.mdx) con valores reales. Leer schema y componentes actuales, no copiar el corpus histórico como norma.

- Frontmatter estricto; título H1, hero, TOC, firma/fechas, JSON-LD y relacionados los genera el layout. No duplicarlos en cuerpo ni escribir `Autoría` manual.
- Importar solo componentes usados, con rutas reales desde `src/content/blog/`. AlertBox: `type` y `title`; FAQ: `items` con `question` y `answer`.
- Empezar el cuerpo con párrafo, no `#`. Las FAQ van en `<FAQ>` cerrado, sin H2/TOC manual redundante. Bloques secundarios plegados; urgencias siempre visibles.
- Hero solo en frontmatter. Imágenes de cuerpo con Markdown y pie útil, según patrón vigente; verificar recursos y dimensiones/variantes mediante el navegador. No confundir archivo creado con archivo servido.
- Enlaces externos los transforma el pipeline actual de Astro; no añadir manualmente atributos redundantes. No cambiar configuración del stack para redactar.
- Fecha nueva al guardar; revisión conserva `datePublished` y registra cambio real en `dateModified`. `perros` solo para Luna/Dakota reales con experiencia documentada. Contrato y estado de auditoría no son campos de YAML.

## 5. Validación antes de entregar

1. Tabla E01–E08: requisito, pasaje/recurso y prueba. Leer recorrido a 390 px: respuesta, acción, precaución y siguiente paso encontrables. Declarar pruebas no ejecutadas.
2. Contar cuerpo sin frontmatter/imports/`---` sueltos y cada sección contra target ±15%; comparar suma y rango. Si difiere, resolver omisiones útiles o adenda justificada; nunca relleno ni conteo falso. El texto de componentes también se revisa aunque el contador MDX no lo capture.
3. Tabla fuente→afirmación→pasaje→sección→verificación/límite. Buscar cada fuente dentro de su H2, no solo bibliografía. Una coincidencia de nombre no verifica la afirmación.
4. Componentes por contrato, FAQ explícita incluso cero, recursos/rutas operativos y enlaces reales. No dejar marcadores, notas al redactor o falsa descarga.
5. Densidad móvil y ritmo: medir párrafos, revisar fragmentos y subtítulos. Reorganizar antes de ampliar. Correr `python3 .agents/skills/references/scripts/tono.py <archivo>` (≤3 muletillas/1000); no borrar seguridad para bajar una métrica.
6. Si hay recursos: abrir cada archivo, recorrer interacciones y anclas, teclado/foco, impresión con/sin JS, reducido movimiento, 390/1366 px, claro/oscuro y contraste. Imágenes decodificadas y variantes servidas, no solo nombres existentes. Pruebas técnicas pertinentes y proyección de agentes al integrar componentes.

Entregar tabla por sección (real/target/desviación), densidad (media/mediana/%>50), tono, fuentes, recursos y evidencias, pendientes y qué se conserva. Las validaciones propias no sustituyen la auditoría independiente.

## 6. Guardar y auditar

`src/content/blog/` no es scratch: todas sus entradas pueden compilar aunque `status` diga Borrador. Si hay bloqueantes guardar trabajo en scratch/expediente, no en esa colección. Con validación propia completa y dentro del encargo, guardar `src/content/blog/<slug>.mdx`, conservar brief y actualizar inventario como redactado/validado localmente.

Encargar auditoría independiente contra el mismo hash y contrato. No marcar Publicado hasta verificar URL y recursos tras despliegue autorizado. Merge y producción siguen metodología; redactar no autoriza esas operaciones. Si se modifica un documento aprobado, revisar delta y dependencias con historial de rondas conservado.
