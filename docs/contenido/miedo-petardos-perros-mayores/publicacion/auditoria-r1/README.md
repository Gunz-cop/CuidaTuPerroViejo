# Evidencia independiente — publicación R1

Fecha: 2026-10-26. Auditor distinto del productor. Alcance: diff de integración y sustitución bibliográfica S10; primera ronda de este documento, máximo tres. No es otra auditoría clínica ni visual.

## Pruebas propias

- `verificar-diff.py`: Git real `b79ee0b` → `625ef8a` → `de55e25`, comparación exacta del MDX con el blob fuente `717ee60`, conservación de textos/hashes y política de binarios. Los JSON de producción solo se contrastan después de leer los blobs.
- `verificar-integracion.py`: resolución de diez destinos contra fuentes/HTML, tres entradas automáticas, sitemap/proyección del artículo y comparación del CSS global. También compara por cuenta propia los 42 HTML de builds anteriores del productor; este reanálisis no convierte esos builds en ejecuciones propias. Los hashes coinciden con el registro previo. Cinco diferencias desaparecen sustituyendo exclusivamente el fragmento de ocho caracteres de UUID de seis componentes preexistentes; contacto difiere únicamente en `startedAt`.
- `verificar-html.cjs`: ejecución propia Playwright/Chromium a 390 claro sobre el build previo servido en `127.0.0.1:4468`. Prueba emisión condicional del estilo, atributos y pseudorrótulos, caption/alt/schema, S10 renderizado, carga/decodificación y estado cerrado de details. Testigo `mal-aliento-perros-viejos`. No mide tipografía, alturas, CLS o contraste ni genera capturas: terceros bloqueados y sin descargar fuentes web. No se interpreta como cuarta ronda visual.
- `s10-fuente-primaria.json`: descarga propia del comunicado y JPG colegial con TLS y proxy heredados, lectura de sus pasajes y apertura real de la guía con `view_image`. HTML/JPG fuera de Git, bajo `/tmp/auditoria-publicacion-r1-malaga.*`; se conservan URL, hashes y pasajes en JSON.
- `programas-oficiales.json`: contraste propio de los tres PDF municipales de 2026 aportados por el productor. Lectura con `pdftotext`, páginas precisas y hashes. Valencia p8, marzo; Alicante p1, junio; Pamplona p25, julio y fuegos artificiales. Cierra el contraste de esos meses con 2026; no acredita programas futuros ni añade fechas/horarios al artículo. PDF/textos fuera de Git en `/tmp/auditoria-publicacion-r1-{valencia,alicante,pamplona}.{pdf,txt}`.

Reproducción desde `/workspace/petardos-publica`:

```bash
python3 docs/contenido/miedo-petardos-perros-mayores/publicacion/auditoria-r1/verificar-diff.py
python3 docs/contenido/miedo-petardos-perros-mayores/publicacion/auditoria-r1/verificar-integracion.py
node docs/contenido/miedo-petardos-perros-mayores/publicacion/auditoria-r1/verificar-html.cjs
```

El segundo comando requiere los artefactos temporales anteriores y el dist del worktree de código; el tercero requiere el servidor estático del build final en puerto 4468 y Playwright/Chromium ya instalados. En el entorno gestionado, Chromium y las descargas necesitan permiso de red de la herramienta. No se reinstala nada.

## Incidencias del instrumental, resueltas antes del resultado

La primera aserción de conservación trataba también los PNG históricos de auditoría como textos protegidos; se acotó a md/json. La biblioteca opcional `bs4` no estaba instalada: la lectura del comunicado se hizo con librería estándar, sin instalar dependencias. El primer lanzamiento Chromium falló por restricciones de sockets; se repitió con permiso de red. La primera versión de la prueba esperaba la decodificación de imágenes lazy sin desplazar el viewport; se interrumpió y se corrigió el instrumental. El testigo se apuntó primero al pilar erróneo y devolvió una página sin contenido de artículo; se corrigió la ruta contra su frontmatter. La comparación inicial de UUID completos no cubría su uso real truncado a ocho caracteres; se verificaron los seis componentes y se acotó la sustitución a sus prefijos. Ninguna de estas incidencias prueba un defecto del producto. Los JSON finales proceden de las ejecuciones correctas.

## Evidencia previa que se conserva como tal

No se ejecutaron de nuevo `astro check`, build, recuento contractual, tono ni la guarda semántica completa de 37 documentos. Sus resultados siguen siendo los del productor, incluido el ajuste S10. Tampoco se repiten las capturas de 390/1366 claro/oscuro, los mínimos continuos de contraste, la altura de tablas, el payload inicial o el CLS. El APTO visual R3 y la auditoría textual R1 se leen con sus hashes y límites, sin sustituir sus informes.

El productor comunicó CI remoto SUCCESS para código #148 (`40302973256`) y para el HEAD editorial (`40321092610`). Esta auditoría no consultó los estados remotos por cuenta propia. No se prueban producción, Cloudflare preview, API de feedback, móvil físico, otros navegadores ni lector de pantalla.

## Integridad del trabajo del auditor

El auditor solo añade el informe `auditoria-publicacion-r1.md` y esta carpeta de evidencia. Ningún cambio de producción, informe previo, commit, PR review, comentario externo, merge o publicación. Git continúa en `de55e25`. Durante la validación final, el productor comenzó su cierre documental en `TODO.md` y `entrega-publicacion.md`; esos cambios concurrentes, posteriores al HEAD auditado, se identifican en `estado-final.json`. No son correcciones del producto ni trabajo del auditor.
