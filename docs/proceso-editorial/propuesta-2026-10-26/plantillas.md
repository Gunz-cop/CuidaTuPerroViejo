# Plantillas e instrucciones para los agentes (propuesta)

Pensadas para pegarse en un prompt durante el piloto (paso 1 del plan) sin modificar las skills vigentes. Las skills y `calidad-editorial-adsense.md` siguen en vigor: estas plantillas **añaden** controles y sustituyen solo el formato de severidad, veredicto y registro.

---

## 1. Sección del brief: alcance, preguntas y riesgos

```markdown
## 2bis. Alcance, preguntas y riesgos

**Público e intención:** {quién lee, país, estado (asustado / diagnóstico reciente / preventivo), qué quiere hacer}.
**Alcance clínico:** entra {…}. Queda fuera, explícitamente: {…}.
**Alcance geográfico:** {país/región}; fuentes nacionales esperadas: {…}.
**Nivel de riesgo del tema:** {A informativo | B síntomas y decisión de consulta | C fármacos, tóxicos, urgencias o enfermedad grave}. Motivo: {…}.

### Preguntas fundamentales
| # | Pregunta del lector | H2 que la responde |
|---|---|---|

### Decisiones que requieren criterio veterinario humano
| # | Decisión | Tratamiento en el texto (remitir a la clínica / excluir / consultar antes de publicar) |
|---|---|---|
```

## 2. Mapa de riesgos: las ocho lentes

Cada lente se responde con **filas concretas** o con «no aplica porque {razón propia de este tema, comprobable}». Las razones genéricas («es informativo», «no es relevante») son defectos.

1. **Convivientes:** otras especies de la casa (gatos, conejos, aves, peces), niños, embarazadas, personas inmunodeprimidas o alérgicas.
2. **Productos y fármacos nombrados:** por cada producto, principio activo o clase que el texto mencione, aunque sea de pasada, su ficha oficial (CIMAVet, EMA o equivalente) con §3.3 contraindicaciones y §3.5 precauciones para animales, personas y medio ambiente.
3. **Lectura errónea probable:** qué entendería mal un tutor cansado o asustado. Falsa tranquilidad (p. ej., «negativo = sano») y falsa alarma (p. ej., «positivo = enfermo»).
4. **Perro senior:** comorbilidades y medicaciones habituales en perros mayores (riñón, corazón, hígado, AINE, corticoides) que cambian la recomendación o su riesgo.
5. **Urgencia:** qué señal no puede esperar y dónde aparece.
6. **Acción doméstica:** cada verbo de acción del brief. ¿Puede hacer daño hecho mal, de más o en el animal equivocado?
7. **Escenario habitual no cubierto:** perro ya diagnosticado, viaje, adopción, otra enfermedad, otra zona o país.
8. **Acceso:** qué hará el lector si hoy no puede ir al veterinario (coste, horario, distancia). El texto no debe empujar a resolverlo en casa cuando no procede.

```markdown
### Mapa de riesgos
| ID | Lente | Escenario (quién hace qué) | Daño posible | Fuente de seguridad (localización) | Mitigación en el texto | Sección | Criterio de verificación | ¿Criterio veterinario? |
|---|---|---|---|---|---|---|---|---|
| R-01 | 1 | … | … | Ficha XXXX §3.5 «…» | … | H2-n | grep «…» en H2-n | No |

**Lentes sin filas:** 7: no aplica porque … (razón comprobable).
```

## 3. Matriz de trazabilidad

```markdown
| ID | Afirmación clave (con el verbo máximo permitido) | Fuente (ID, página o apartado) | Tipo y fuerza | Actualidad / búsqueda de versión posterior | Aplicabilidad (especie, país, edad) | Límite | Riesgo vinculado | Sección | Comprobación en el artículo |
|---|---|---|---|---|---|---|---|---|---|
| A-01 | Los tratados **pueden** seguir infectados | S2, Treatment | Consenso 2011 | Buscada actualización el AAAA-MM-DD: {resultado} | Perro, Europa | «may», no «often» | R-04 | H2-4, FAQ 1 | grep «pueden seguir»; 0 «suelen» |
```

Esta matriz sustituye a las tablas fuente→H2 que hoy se repiten en §3, §6 y §9 y se desincronizan.

## 4. Registro de hallazgos (esquema)

Archivo: `docs/contenido/<slug>/registro-hallazgos.yaml`. Se valida con `python3 -I validar_registro.py <archivo> --raiz <repo>`.

```yaml
articulo: <slug>
fase: brief | articulo | visual
documento: <ruta del archivo auditado>          # permite al validador repetir búsquedas negativas
rondas:
  - n: 1
    hash: <sha256 corto>
    sesion: <id de sesión del auditor>
    modelo: <modelo>
    resultado: APROBADO | NO APROBADO           # calculado por el validador, no redactado
    autorizada_por_propietario: <ruta y línea>  # solo para rondas > 3
hallazgos:
  - id: AAA-F-NNN                # nunca se reutiliza
    severidad: P0 | P1 | P2
    estado: abierto | corregido_sin_verificar | cerrado | regresion | pendiente_verificacion |
            en_disputa | diferido | descartado | aceptado_por_propietario
    origen: brief | redaccion | visual | correccion
    ronda_apertura: 1
    en_texto_modificado: true | false            # obligatorio desde R2
    por_que_no_antes: <texto>                    # obligatorio para P1 nuevo en texto no modificado
    tipo: omision                                # opcional
    busqueda_negativa: {terminos: [...], secciones: [...]}   # obligatorio si tipo: omision
    texto_existente_insuficiente_porque: <texto>             # si la búsqueda encuentra algo
    regla: <contrato §, skill §, política; nunca «preferencia»>   # obligatorio en P0/P1
    localizacion: <archivo:línea o sección + hash>
    evidencia: <texto del documento frente al de la fuente, o la medida>
    impacto: <ruta de daño o regla incumplida>
    correccion: <texto o acción exactos>
    criterio_cierre: <comando o comprobación>
    historial:
      - {ronda: 1, estado: abierto, evidencia: "…"}
      - {ronda: 2, estado: cerrado, evidencia: "…"}
      # para reabrir: {ronda: 3, estado: regresion, evidencia_nueva: "…distinta de la anterior…"}
```

## 5. Prompt del auditor de brief

```text
Eres el auditor independiente del brief <ruta> (SHA-256 <hash>), ronda R<n> de 3.
No modificas el brief ni el registro de nadie más: escribes solo en el registro de hallazgos
<ruta>/registro-hallazgos.yaml y en tu informe. No eres la sesión que generó ni corrigió este hash.

Aplica auditar-briefing-contenido y calidad-editorial-adsense.md, con estos cambios:

SI ES R1 (completa):
1. Fuentes, como en la skill (identidad, afirmación localizada), más fuerza, actualidad y
   aplicabilidad por fila de la matriz.
2. Matriz: cada afirmación clave tiene fila, fuente y verbo máximo; cada pregunta fundamental tiene H2.
3. Mapa de riesgos: las ocho lentes respondidas; cada «no aplica» con una razón propia del tema;
   cada producto nombrado tiene su ficha oficial con §3.3 y §3.5 extraídos.
4. Pasada adversarial. Responde por escrito, para este brief, las cinco preguntas:
   faltantes esenciales; recomendación inocua que pueda dañar; escenario habitual no cubierto;
   afirmación sin evidencia suficiente; qué entendería mal un propietario cansado o asustado.
   Cada respuesta es una fila nueva del registro o «nada encontrado tras <búsqueda concreta>».
5. Mecánica vigente (metadatos, enlaces, componentes) con comandos.

SI ES R2 O R3 (delta):
1. Verifica cada P0/P1 abierto por su ID contra su criterio de cierre.
2. Haz diff <hash anterior> → <hash actual>. Revisa cada línea cambiada en busca de regresiones;
   todo dato nuevo se contrasta con su fuente o con el archivo de testimonios.
3. Barrido global acotado a P0 (dosis, tóxicos, urgencias, datos inventados, avisos borrados).
4. Un P1 nuevo en texto no modificado necesita por_que_no_antes. Un P2 nuevo en texto no
   modificado va a «diferido» y no se discute.

REGLAS DE SEVERIDAD:
- P0: ruta de daño plausible siguiendo el texto, o desinformación grave presentada como verificada.
- P1: regla escrita incumplida con impacto; evidencia insuficiente; ambigüedad relevante para la
  salud; precaución explícita de una ficha ausente.
- P2: el resto. No bloquea.
- Escribe la ruta de daño (quién, qué línea, qué daño) antes de asignar P0 o P1 por seguridad.
- Un P0/P1 sin localización, evidencia, impacto, corrección y criterio de cierre se registra
  como pendiente_verificacion.
- Una preferencia de estilo nunca bloquea. No reabras un cerrado sin evidencia nueva.
- Si una omisión parece obvia, haz primero la búsqueda negativa y anota términos y secciones.

SALIDA: registro actualizado; informe de una página con el veredicto que da el validador,
lo que sí funciona (no romper), lo que no abriste y, si R3 falla, el informe de escalamiento.
Nunca escribas «certificado» ni «validado clínicamente».
```

## 6. Prompt del auditor de artículo

```text
Eres el auditor independiente del artículo <ruta .mdx> (SHA-256 <hash>), ronda R<n> de 3,
contra el brief aprobado <ruta> (SHA-256 <hash>) y su registro. Aplica auditar-articulo-blog y
calidad-editorial-adsense.md con los cambios del auditor de brief (R1 completa / R2-R3 delta,
severidad, campos obligatorios), y además:

1. Tabla de cumplimiento: cada fila de la matriz → línea del artículo con el verbo usado;
   cada riesgo del mapa → línea con la mitigación, en la sección asignada.
2. Alcance de texto clínico: cuerpo, avisos, tablas, FAQ, alt, pies y componentes del tema
   (src/components/article/<Tema>*.astro). Un componente con texto clínico no queda fuera
   porque el contador de palabras no lo mida.
3. Pasada adversarial sobre el texto final (las cinco preguntas). Toda omisión lleva búsqueda
   negativa: términos, secciones leídas y por qué el texto presente no basta.
4. Si un fallo nace en el brief, regístralo con origen: brief y propón una adenda (plantilla §9).
   No audites el brief.
5. Calidad editorial: mide con tono.py, metricas.mjs y el conteo del expediente. Solo bloquea
   si incumple una regla escrita.
6. Lo visual (dibujo, recorte, edad aparente, coherencia física) va en la serie visual, con su
   propio contador. Los textos clínicos de esos recursos sí son de esta serie.
```

## 7. Prompt del corrector

```text
Corrige <documento> (SHA-256 <hash>) a partir del registro <ruta>, ronda R<n>.
Trabaja solo los ID en estado abierto o regresion de severidad P0/P1, y los P2 que el
propietario haya marcado. Para cada ID, una de tres salidas en el registro:
- corregido_sin_verificar: lista de líneas cambiadas y texto nuevo;
- en_disputa: evidencia de por qué el hallazgo es incorrecto (cita la fuente);
- no aplicable: razón.
No cambies nada fuera de esos ID. Si ves otro problema, anótalo como propuesta para el auditor
(no lo corrijas). No añadas datos que no estén en la fuente o en el archivo de testimonios:
cada frase nueva lleva su localización. No audites tu resultado ni cambies estados a cerrado.
Entrega el nuevo SHA-256 y el diff.
```

## 8. Informe de escalamiento (tras R3 NO APROBADO)

```markdown
# Escalamiento — <documento>, fase <brief|artículo|visual>, tras R3

**Bloqueantes abiertos:**
| ID | Sev. | Rondas abierto | Recurrente / regresión | Ruta de daño o regla |
|---|---|---|---|---|

**Causa probable** (una): defecto del brief · desacuerdo de criterio · fuente insuficiente ·
corrección defectuosa · requisito estético. Evidencia: …

**Salidas (el propietario elige una):**
- (a) Aceptar el riesgo: texto exacto que quedaría publicado y por qué es aceptable. Coste: 0.
- (b) Aplicar esta corrección exacta: … Verificación sin ronda completa: <criterio de cierre>. Coste: …
- (c) Cambiar el contrato, retirar la sección o abandonar el tema: … Coste: …

**No es una opción de este informe:** abrir R4 completa. Si el propietario la autoriza, debe
escribir aquí el alcance (solo estos ID) y su fecha.

**Decisión del propietario:** ____ (fecha, firma)
```

## 9. Adenda de contrato (defecto del brief descubierto después)

```markdown
### Adenda <n> al brief — <fecha>
**Origen:** hallazgo <ID> (<informe>), origen: brief.
**Cambio:** fila <A-xx | R-xx> de la matriz o del mapa: antes «…» → después «…».
**Fuente:** <ficha o estudio, localización>.
**Decisión del propietario:** <fecha y texto>.
**Verificación de la adenda (otro contexto):** fuente comprobada sí/no; coherencia con §9.6 sí/no.
**Impacto en el artículo:** secciones afectadas (grep): … → entran como líneas cambiadas en la
próxima ronda delta del artículo. Si está publicado: ruta de daño y prioridad.
```

## 10. Puerta de publicación del propietario

```markdown
### Puerta de publicación — <slug>, <fecha>
- [ ] Registro sin P0/P1 bloqueantes (salida del validador pegada abajo).
- [ ] Tabla del mapa de riesgos → línea del texto publicado, revisada por mí.
- [ ] Decisiones que requieren criterio veterinario: tratamiento revisado. Revisión veterinaria
      externa: hecha por … / no hecha (tema de nivel A o B, o asumo el riesgo).
- [ ] P2 diferidos leídos; los que quiero aplicar: …
- [ ] Lo no verificado (lista del auditor), aceptado.
- [ ] Textos clínicos cambiados después de la última auditoría: ninguno / verificados por delta.
Esta aprobación es editorial. No es una certificación veterinaria.
Firma: ____
```
