# Controles del autor — texto para auditoría editorial R1

Fecha: 2026-10-22. Autor/redactor: `/root/autor_brief`, mismo autor/corrector del brief; **no soy auditor**. Estos controles de producción no son dictamen independiente.

- Brief de origen APTO en ronda 2/3: `auditoria-brief-r2.md`; SHA256 `60a2a79ab94344c766e15fbbf2e598723a431d9b7e357d245c208e033f9f9d0d`, conservado sin cambios.
- Documento: `borrador-articulo.mdx`, fuera de `src/content/blog/` hasta completar gate del autor e integración.
- SHA256 de texto cerrado para revisión: `b54e772218e4609c4bb50037a2e410e36a995dc4de865b3520648f5bca3b30b3`.
- Palabras útiles: **5913**, frente a objetivo 6.000 (−1,45%). No incluyen bibliografía, código, URL ni texto de componentes externos.
- Cuerpo MDX bruto sin frontmatter/imports: **6316** palabras por separación de espacios. Se informa aparte, no como volumen editorial útil.
- Método reproducible: `python3 docs/contenido/mal-aliento-perros-viejos/contar-articulo.py`; salida completa en `metricas-autor-texto.json`. Conserva preguntas/respuestas FAQ y captions como texto leído; las referencias de los componentes se cuentan aparte tras integración.

## Distribución real

| Bloque | Palabras útiles reales | Target §6 | Desviación |
|---|---:|---:|---:|
| Introducción | 210 | 200 | +5.0% |
| Cuándo consultar por el mal aliento de tu perro | 640 | 650 | -1.5% |
| Qué puede decirte el olor y qué necesita una exploración | 437 | 450 | -2.9% |
| Causas en la boca, los dientes y los labios | 896 | 900 | -0.4% |
| Otras causas y los síntomas que ayudan a orientar la consulta | 785 | 800 | -1.9% |
| Qué observar y anotar antes de llamar | 632 | 650 | -2.8% |
| Cómo busca la causa el veterinario | 786 | 800 | -1.7% |
| Qué hacer mientras llega la consulta y qué evitar | 589 | 600 | -1.8% |
| Cómo valorar la evolución después de la consulta | 398 | 400 | -0.5% |
| Conclusión y preguntas frecuentes | 540 | 550 | -1.8% |

Todos los bloques están dentro de ±15%. Los H3 se mantienen en un máximo de 200 palabras por tramo; el JSON conserva cada medida. Densidad: **media 37.0 / mediana 37 / párrafos >50 palabras 0.0%**, sobre 135 párrafos y máximo 50.

Comando vigente de tono: `python3 .agents/skills/references/scripts/tono.py docs/contenido/mal-aliento-perros-viejos/borrador-articulo.mdx`: **5.654 palabras en su recorte, 2 muletillas, 0,4/1.000**. Su recorte excluye FAQ y cajas danger/warning y difiere del conteo editorial completo; no se presenta como total útil.

## Cobertura de contrato y fuentes

| Fuente | H2 donde se desarrolla/cita | Afirmación usada |
|---|---|---|
| F1 UC Davis | Qué puede decirte el olor; causas orales; otras causas; evaluación | Orígenes variados y pruebas según hallazgos, sin diagnosticar por olor |
| F2 Merck periodontal | Causas en boca; cómo busca la causa | Biofilm/tejidos y límites del examen visible; sondaje/radiografía profesionales |
| F3 PDSA halitosis | Cuándo consultar; qué dice el olor; seguimiento | Consultar también en seniors; dieta puede cambiar olor, no diagnóstico |
| F4 Merck mouth | Causas en boca; observación; espera | Tejidos/pliegues, dolor y resistencia; sin trasladar tratamiento doméstico |
| F5 Cornell dental | Observación; evaluación; espera | Signos acompañantes, examen completo y reanudación del cuidado indicada |
| F6 Merck cuándo consultar | Cuándo consultar | Alarmas generales, sin permitir espera de 24 h por regla casera |
| F7 PDSA renal | Otras causas | Signos y pruebas renales; sin dieta terapéutica ni valoración por olor |
| F8 Merck pancreas | Otras causas | Diabetes y deterioro urgente; no ajustes de insulina |
| F9 AAHA assessment | Qué observar; cómo busca la causa | Historia general/oral y pruebas individualizadas; registro editorial |
| F10 AAHA Senior 2023 | Evaluación; evolución | Edad y riesgo individual; bienestar y objetivos |
| F11 FDA | Mientras llega consulta | Algunos productos humanos tienen xilitol; llamada inmediata por posible ingestión |
| F12 Illinois | Bultos o heridas | Lesiones y cambios merecen evaluación; olor no clasifica cáncer |

Se mantienen las doce URL profundas verificadas en investigación, citadas cerca de afirmaciones y reunidas en la bibliografía. No se añaden fuentes o definiciones clínicas nuevas; se describe expulsión de alimento/vómitos sin enseñar a distinguir regurgitación. Las fuentes abren contenido sustantivo según la investigación documentada; no afirmo haber repetido doce aperturas al redactar.

- Guía sin caso declarada en apertura, sin pacientes, conversaciones, experiencia personal ni credenciales inventadas.
- Diferenciación: no tutorial de cepillado, calendario, productos/afiliación ni pasos de profilaxis. Se centra en causas, acompañantes, observación, llamada, evaluación y seguimiento.
- Tres cajas narrativas de tipos info/danger/warning, más caja bibliográfica info: **4** en total.
- FAQ único, cerrado por componente, **7** preguntas.
- Cuatro enlaces internos de contrato: pilar, dental, chequeo y calidad de vida, presentes en contexto y con rutas reales.
- Firma/IA son del `ArticleByline` del layout real; no duplicadas en cuerpo ni revisión veterinaria fabricada.
- `status` del frontmatter se usará solo al integrar tras validación; el borrador se conserva fuera del contenido servible. El campo no filtra builds.

## Recursos e integración prevista

| Recurso | Estado del texto | Verificación pendiente |
|---|---|---|
| R1 hero | Ruta y alt en frontmatter | QA de decodificación/srcset e inspección independiente |
| R2 comida | Figura con dimensiones1200×675, srcset400/800/1200, lazy, alt ajustado a escena de perro comiendo | Binarios producidos por raíz; QA en navegador e inspección independiente |
| R3 consulta | Figura con dimensiones/srcset/lazy, alt de perro tumbado y conversación | Binarios producidos por raíz; QA en navegador e inspección independiente |
| R4 prioridad | Import y variante `prioridad`, H3 coinciden con anclas acordadas | Implementación del productor y QA |
| R5 proceso | Variante `proceso` junto a explicación periodontal; conceptual sin tiempos/progresión inevitable | Controles, movimiento reducido, sinJS, impresión y revisión clínica integrada |
| R6 tabla | `TablaApilable`,4filas/3columnas,data-label y wrapper data-editorial-visual | Responsive, altura, contraste y accesibilidad |
| R7 registro | Variante `registro` después de descripción8datos | Plegado inicial, impresión de campos/valores, teclado y no envío |

El texto está cerrado para lectura editorial provisional; el artículo no se declara APTO final antes de integrar y probar R1–R7. El productor independiente de recursos ha confirmado las props `variant` y las anclas; su creación no es auditoría. No promesas de PDF/vídeo/descargas inexistentes.

## Comprobaciones y pendientes

`git diff --check` sin fallos. Conteos/tono ejecutados realmente; fuentes, rutas y schema comprobados en la preparación. No he ejecutado build desde este borrador fuera de colección ni afirmo pruebas móviles propias. Raíz coordina build/check/CI vigente, proyección y navegador sobre copia integrada final. Los binarios y componentes requieren cierre independiente del artículo dentro del contador único (máximo3), sin separar rondas visuales.

No se modificaron el brief APTO, el inventario final, el primer artículo ni stack/estilos globales. No hubo commits, push, fusión ni despliegue por el redactor.
