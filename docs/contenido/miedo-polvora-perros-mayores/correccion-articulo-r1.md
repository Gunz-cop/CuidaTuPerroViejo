# Corrección del artículo LA-01 tras la auditoría R1

- **Fecha:** 8 de noviembre de 2026.
- **Base:** commit `ae93868` (texto auditado) y auditoría `auditoria-articulo-r1.md` (commit `ee95d80`).
- **Archivo corregido:** `src/content/blog/miedo-polvora-perros-mayores.mdx`.
- **Quién corrige:** la misma sesión que redactó el artículo. No es la sesión que auditó. Este documento no es una auditoría: la R2 debe hacerla otra sesión.
- **No se tocaron:** brief, componentes, rutas, tarjetas ni imágenes.

## Fuentes nuevas, leídas en esta sesión (8 de noviembre de 2026)

Se abrieron por separado y no se copiaron del informe del auditor:

| Fuente | Qué se comprobó | Uso |
|---|---|---|
| VCA, *Urgent Care for Pain or Limping* | «Your pet is unable to stand/walk without assistance» en la lista de cuándo buscar urgencias | H2-4, triaje |
| Merck Veterinary Manual, *Disorders of Micturition in Dogs and Cats* (Van Vertloo; actualizado en octubre de 2026) | Incontinencia por rebosamiento: una vejiga sobredistendida puede gotear | H2-4, micción |
| Cornell, *Fear of fireworks and thunderstorms* | Planear las salidas al baño antes de los fuegos; correa incluso en patio cercado | H2-6, salida nocturna |
| FAO AGRIS, resumen de Riemer 2020 | «feed/play» = comida, masticables y juego; «only "feed/play"» asociado a mejoría; el resumen no menciona movilidad | H2-4, H2-6 |
| Alcaldía de Bogotá, 29-10-2026 | Campaña «La Pólvora Explota Mis Sentidos» del IDPYBA, del 30-10-2026 al 6-01-2027; formulario anónimo en los canales del IDPYBA (animalesbog.gov.co) | H2-9, FAQ |
| animalesbog.gov.co | La página principal da la línea 123 para «urgencias, emergencias o maltrato animal». No hay enlace directo al formulario de pólvora. | H2-9, FAQ |
| Ministerio del Interior, 17-12-2023 | El Decreto 2174 de 2023 reglamenta la Ley 2224; exige permiso previo de la alcaldía para demostraciones públicas y privadas | H2-9 |

**Límite:** no se envió ningún formulario ni se localizó su URL final. El artículo remite a los canales del IDPYBA, sin prometer un acceso directo. Tampoco se leyó el texto del decreto, solo la comunicación ministerial.

## Cierre por hallazgo

| Hallazgo | Qué se hizo | Dónde |
|---|---|---|
| **P0-1** Perro que no se levanta | El apartado se abre limitándolo al perro postrado desde hace tiempo, ya revisado y con un plan de cuidados. Si dejó de levantarse de repente o empeoró mucho, se pide ir hoy a la veterinaria, con VCA como fuente. El H3 pasa a «Lo que necesita que hagas por él»: las capacidades varían y se ayuda en lo que la veterinaria identificó. Se separa la higiene (empapadores) de la micción: comprobar que orine; si no orina, lo intenta sin resultado o gotea sin parar, llamar a la veterinaria (Merck); no intentar vaciar la vejiga. Se conservan la postura, el agua de pecho y la regla de no forzar. FAQ actualizada. | H2-4 y FAQ 3 |
| **P0-2** «Algo para que duerma» | Se quita «es la acepromazina o algo parecido». Ahora: no darle nada por tu cuenta; quieto no es sin miedo; la acepromazina es un ejemplo; existen tratamientos que elige tu veterinaria. El rechazo específico del H2-5 no cambia. | H2-10 |
| **P1-1** Búsqueda del perro | Se retiran «no suele ir lejos» y «muchos salen solos». El nuevo texto dice que puede esconderse cerca o alejarse, así que se empieza cerca y se amplía. El H3 pasa a «Si no aparece cerca»: no esperar a que vuelva; repasar la ruta de madrugada y al amanecer; ampliar cuadra por cuadra con carteles, grupos y llamadas diarias a veterinarias y albergues. Si se deja el portón entreabierto, con vigilancia continua y los otros animales dentro. | H2-8 |
| **P1-2** Necesidades de noche | H3 nuevo, «Si necesita orinar en plena noche» (Cornell): sacarlo antes de la hora fuerte; un rincón interior si ya lo usa; si sale, con correa, en un rato de calma y con el portón cerrado; nunca solo al patio. El acuerdo 2 pasa a «El perro no sale solo». | H2-6 |
| **P1-3** Bogotá | La FAQ y H2-9 remiten a la campaña 2026–2027, al formulario anónimo en los canales del IDPYBA y a la línea 123 para urgencias o maltrato, con la veterinaria primero si está herido. Se retira la frase de 2024 sobre la encuesta. Los datos de 2025 se quedan en H2-1 como contexto. | H2-9 y FAQ 7 |
| **P1-4** Reglamentación colombiana | Se añaden el Decreto 2174 de 2023 y el permiso previo de la alcaldía, con fecha de comprobación. Se retira el rango de multas. La tabla se actualiza. | H2-9 |
| **P1-5** Riemer | Se describe el grupo comida, masticables y juego en H2-4 y H2-6. Se retira «en perros que se movían» y se sustituye por «ese estudio no dice nada de perros postrados». Los límites de seguridad al comer se ponen donde se da cada consejo. «Funcionan a volumen bajo» pasa a «es un aprendizaje que se hace con tiempo». | H2-4, H2-6, H2-10 |
| **P2-1** Ansiedad por separación | Pasa a ser una pista que conviene investigar, no un diagnóstico. | H2-7 |
| **P2-2** Estudios latinoamericanos | «no hay» pasa a «no encontramos». | Introducción |
| **P2-3** Certezas | «Basta con» pasa a «Empieza por…». Ciudades altas: observar el cuarto y al perro (también en la FAQ). Se quita «en dos minutos». Urgencias abre con señales que observar, sin «la mayoría terminan». | H2-2, H2-3, H2-5, H2-7, FAQ 8 |
| **P2-4** Firma | Se quita la firma manual; firma y fecha las pone `ArticleByline`. La introducción identifica una vez al narrador: Gonzalo, responsable editorial (dato público de la política editorial). Los relatos siguen en primera persona. | Introducción |
| **P2-5** H2 cortos | Ver la tabla de volumen. No se añadió relleno. | — |
| **P2-6** Estado e imágenes | Sin cambios en el código. Los marcadores de imagen bajo cada H2 responden a una **decisión del propietario del 8 de noviembre de 2026** (una imagen por H2, producida por él), que sustituye el plan de 7 imágenes del brief §8, incluido el «sin imagen» del H2-4. Si se ilustra el H2-4, debe ser con un sujeto distinto del mestizo fijo. `status: "Publicado"` se mantiene porque la tarjeta solo funciona así. La protección real es **no fusionar esta rama en `main`** hasta cerrar la R2, las imágenes y los gates del §11. | — |

Corrección menor añadida: el Dr. Meza pasa de «especialista en analgesia» a «con énfasis en analgesia y anestesia», que es como lo describe la nota (observación de la tabla de fuentes de la auditoría, S9).

## Incidencias heredadas del brief (para otra sesión, sin reabrir su auditoría)

1. El §6/H2-4 del brief agrupa «no puede cambiar de postura, alejarse del calor, beber ni orinar» y propone empapadores para la orina (origen del P0-1).
2. El §3/S4 y el H2-4 del brief traducen *feed/play* como «dar comida» y añaden «perros que se movían» (origen del P1-5).
3. El §8 del brief quedó superado por la decisión del propietario de poner una imagen por H2.

## Volumen después de corregir

Método parecido al de la auditoría: texto visible separado por espacios, sin frontmatter, imports, comentarios, tarjeta, destinos de enlaces ni bibliografía; con títulos, avisos, tabla y FAQ.

| Sección | Real | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 293 | 320 | −8,4 % |
| H2-1 Barrio | 452 | 510 | −11,4 % |
| H2-2 Patio | 541 | 560 | −3,4 % |
| H2-3 Cueva | 430 | 450 | −4,4 % |
| H2-4 No se levanta | 675 | 520 | +29,8 % |
| H2-5 Consulta | 466 | 520 | −10,4 % |
| H2-6 Casa llena | 571 | 480 | +19,0 % |
| H2-7 Esconderse | 414 | 460 | −10,0 % |
| H2-8 Portón | 424 | 360 | +17,8 % |
| H2-9 Ley | 494 | 420 | +17,6 % |
| H2-10 Consejos/enero | 552 | 560 | −1,4 % |
| Conclusión + FAQ | 576 | 540 | +6,7 % |
| **Total** | **≈5.890** | 5.700 (5.300–6.000) | +3,3 % |

**Ajuste de contrato propuesto (P2-5):** H2-4, H2-6, H2-8 y H2-9 superan el ±10 % porque la auditoría pidió añadir en ellos contenido de seguridad u operativo (triaje y micción, salida nocturna, búsqueda ampliada, decreto y canal de Bogotá). Recortarlos para volver al target quitaría justo esas correcciones. H2-1 y H2-7 se quedan apenas por debajo y no se rellenan. El total sigue dentro de 5.300–6.000. Se propone aceptar esta distribución y que la R2 la valore.

Otras métricas: `tono.py` da 0 muletillas por 1.000 palabras. Densidad de párrafo: media 32, mediana 32, 6 % de párrafos con más de 50 palabras, máximo 55. `npx astro build` termina sin errores.
