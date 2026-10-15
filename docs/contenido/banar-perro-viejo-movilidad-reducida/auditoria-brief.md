# Revisión del brief — 15 de octubre de 2026

## Veredicto
Válido para redacción tras la segunda iteración de ajustes: quedan diferenciados los hallazgos publicados, la adaptación doméstica y el sujeto visual ilustrativo.

El usuario autorizó corrección y nueva revisión en esta misma sesión, máximo tres iteraciones. Se documenta como autoverificación, no como auditoría externa independiente. No se ha modificado el estándar para declarar aprobado un fallo pendiente.

## Iteraciones
1. Corrección principal: retirar viñeta ficticia, eliminar causalidad atribuida a Lee, sustituir fuente de manejo inaccesible por guía AAHA abierta, actualizar enlaces y formatos, añadir contrato visual. La revisión encontró restos del dato de anticipación de tutores, objetivos de reducir baños universalmente y afirmaciones categóricas sobre pelo y humedad.
2. Eliminar restos y absolutos, delimitar evidencia y condiciones de manejo, comprobar estructura y metadatos. Sin P0/P1 pendientes en el alcance de esta revisión. No se utiliza una tercera iteración.

## Hallazgos y resolución
- P0, secciones 3/6/FAQ: Lee no estudió la frecuencia de baño. Se elimina esa atribución y se incorpora el límite de edad (2–8 años, sin geriátricos). Fortney solo sustenta consejo secundario en piel seca; no un calendario universal.
- P1, sección 2: sustituida viñeta de labrador inventado por hilo documental de la serie real de Camps. Apertura, resultados y cierre sin desenlace fabricado. Dogo argentino solo ilustrativo, sin nombre ni historia clínica atribuida.
- P1, sección 6: cuerpos de AlertBox convertidos en instrucciones; preguntas FAQ sin respuestas heredadas incorrectas.
- P2, sección 5: segundo spoke de incontinencia fecal existente y publicado. No enlazar como publicado el artículo de callosidades cuya publicación remota está pendiente.
- P2, sección 8: tres imágenes WebP, sujeto consistente y prompts con plano, luz y profundidad de campo.
- Precisión adicional: postura defensiva de Camps p=0,0533, no presentarla como diferencia significativa. No atribuir al resumen datos de anticipación del tutor.

## Verificación de fuentes
| Fuente | Identificador / acceso | Resultado y alcance |
|---|---|---|
| Camps et al. 2012 | DOI 10.1016/j.jveb.2011.08.002; registro institucional UAB | Resumen abierto. 12 perros y 66,7 % confirmados; manipulación e impulsividad confirmadas. No se consultó texto completo: no usar datos adicionales ni desenlaces de baño. |
| AAHA, Senior Care Guidelines, Pain Management | https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/pain-management/ | Página abierta, apartados sobre reconocimiento del dolor, vídeo y adaptación del entorno. Sustituye PMC10093362, cuyo texto no pudo abrirse; no se importa ningún resultado de ese ensayo. |
| Shanna Rayburn, Everyday Handling for Veterinary Patients, 2022 | PDF TVN-2022-04_Low_Stress_Handling | PDF de 7 páginas abierto. Contacto suave, superficies con tracción y pausa/reevaluación. Referencia clínica docente, no ensayo de baño. |
| Nakonechny et al. 2025 | PMC12400514 / DOI 10.3389/fvets.2025.1634970 | Texto completo en Frontiers abierto. Pausar/detener ante angustia o agresividad aparece en introducción, no como resultado experimental de baño. |
| Lee et al. 2026 | DOI 10.3389/fvets.2025.1717581 | Texto completo abierto. 45 retrievers sanos, 2–8 años; hidratación p=0,034; pH/sebo sin diferencia por edad. Diseño transversal, sin baño comparado y sin geriátricos. |
| William D. Fortney 2010 | dvm360, The management of common dermatological problems in older dogs (Proceedings) | Texto abierto. Fuente secundaria identificada: sequedad, aseo y menor baño en ese contexto. No reutilizar recomendaciones farmacológicas antiguas. |

Tres investigaciones, una guía AAHA y dos referencias clínicas secundarias: el brief declara su composición y sus límites. No se presentan seis ensayos clínicos de baño. Se acepta la corrección en el alcance autorizado por el usuario; no se incorporan referencias de relleno.

## Comprobaciones mecánicas
- seoTitle: 50 caracteres; metaDescription: 138. Pilar en enum vigente de src/content.config.ts.
- Presupuesto: 800+1000+1100+1200+800+700+700 = 6300 palabras. Contrato final 6000–6500 de texto visible; ±15 % por bloque. Código, atributos y frontmatter no inflan el conteo.
- Fuentes→H2: Camps 2/5; AAHA 3/5; Rayburn 3; Nakonechny 2/5; Lee 1/4; Fortney 1/4. Todas desarrolladas, sin fuente decorativa.
- Info introducción, danger H2-1, warning H2-4; cuadro de fuentes aparte; siete FAQ.
- Slug sin colisión con artículo actual. Dos spokes publicados existentes, pilar, calculadora y enlaces de movilidad verificados contra inventario y árbol del repo.
- Tres prompts: el mismo dogo argentino blanco de orejas naturales y mancha sobre ojo izquierdo. Dos infografías, tres animaciones explicativas con controles y reducción de movimiento.

## Efecto cascada
El artículo de este slug todavía no existía. Otros briefs que citan Lee: cuidado-piel-pelo-perro-senior, dermatitis-humedad-quemadura-orina-perros, empapadores-panales-limpiadores-enzimaticos-perros y corte-unas-almohadillas-perros-mayores. Deben revisar el alcance de Lee antes de redactarlos, especialmente el primero. No se corrigen aquí por estar fuera del artículo solicitado.

## Qué preservar
Transparencia sobre fuente secundaria y extrapolación doméstica; prohibición de inventar experiencias; narrativa documental en tres momentos; espacios narrativos protegidos; tracción, comodidad y pausa como ejes del manejo.

## Entrega a redacción
Seguir brief corregido y guía redactar-articulo-blog. Mantener el artículo en scratch hasta completar volumen, fuentes, componentes y revisión técnica. No publicar ni hacer commit/push sin instrucción expresa. Revisar en navegador los controles, teclado, vista móvil y movimiento reducido.
