---
name: Auditar Herramienta Interactiva - Cuida Tu Perro Viejo
description: Audita una herramienta interactiva ya construida del pilar /herramientas de cuidatuperroviejo.com como revisor externo — fuentes verificadas una a una contra el DOI, cálculo reproducido a mano, tono de los mensajes, responsive en tres tamaños, accesibilidad, animaciones, tarjeta para compartir, schema, enlazado e inventario de agentes. Úsala cuando el usuario pida revisar, auditar, validar o "ver si está lista" una calculadora, test o app del sitio, o comprobar el trabajo de otra sesión. Es una skill de EVALUACIÓN: entrega un veredicto y hallazgos ubicados, no corrige la herramienta.
---

# Habilidad: Auditar herramientas interactivas

Eres un revisor externo, no quien la construyó. Busca motivos de rechazo. El
estándar contra el que auditas está en
[`crear-herramienta-interactiva`](../crear-herramienta-interactiva/SKILL.md):
léelo primero.

**No corrijas nada.** Quien corrige adquiere interés en que su corrección sea
la buena. Si hay que corregir, deja instrucciones para otra sesión.

## Decisiones del propietario

Antes de auditar, lee [`docs/herramientas/decisiones-del-propietario.md`](../../../docs/herramientas/decisiones-del-propietario.md).
Lo que esté ahí es una decisión de producto del propietario, **no un
hallazgo**: no lo marques como fallo ni como bloqueante. Si crees que una de
esas decisiones causa un problema nuevo y concreto, ponlo en una sección
aparte del informe, "Propuestas para el propietario", con el motivo.

## Procedimiento

Trabaja sobre la rama o el PR indicado. Identifica los tres archivos: lógica
en `src/lib/`, componente en `src/components/tools/` y página en
`src/pages/herramientas/`.

### A. Evidencia (bloqueante)

1. Lista cada cifra o umbral que usa la lógica.
2. Para cada uno, localiza la fuente citada y **abre el DOI/PMC**. Confirma que
   la cifra aparece tal cual (o la derivación es correcta). Comprueba autores,
   año, revista y DOI.
3. Marca como fallo: cifra sin fuente, fuente que no dice eso, DOI roto,
   fuentes no revisadas por pares presentadas como estudios, o ajuste propio
   presentado como dato de un estudio.

### B. Cálculo (bloqueante)

1. Reproduce a mano al menos 4 casos: mínimo, caso típico, límite entre etapas
   y caso por encima de la media.
2. Compara con lo que muestra la herramienta y con la tabla de la página: deben
   coincidir y salir de la misma función en `src/lib/`.
3. Si la portada u otra página calcula lo mismo, comprueba que usan el mismo
   módulo.

### C. Tono (bloqueante si alarma)

- ¿Aparece alguna cifra tipo cuenta atrás ("% de vida vivida", "le quedan")?
- ¿Se dice que la media no es una fecha límite?
- ¿El caso por encima de la media se presenta en positivo?
- ¿Cada resultado lleva a una acción y aclara que no sustituye al veterinario?

### D. Experiencia y diseño

Captura con Playwright a 390, 820 y 1366 px, en claro y oscuro:

- Nada se superpone (texto sobre la imagen del hero, barras sobre botones).
- En móvil, los datos imprescindibles aparecen sin mucho scroll y la barra
  fija muestra el resultado sin tapar el botón del asistente.
- Desktop en dos columnas alineadas.
- Animaciones fluidas y apagadas con `prefers-reduced-motion`.
- Tarjeta para compartir generada y legible.
- Consola sin errores.

### E. Accesibilidad

`aria-live` en el resultado, texto para lectores de pantalla, etiquetas en
todos los campos, foco visible y contraste suficiente.

Además: ningún texto de la herramienta dentro de `<figure>` (la proyección
para agentes lo descarta).

### F. SEO y página

H1 útil, ≥ 3 H2 editoriales, sección `#metodo` con fuentes enlazadas, FAQ.
JSON-LD válido (`WebPage` con `citation`, `BreadcrumbList`,
`SoftwareApplication`, `FAQPage`) y coherente con el texto visible.

### G. Integración

Tarjeta en el pilar `/herramientas`, enlaces desde los pilares y guías
afines, `TOOL_LINKS`, ruta clasificada en
`scripts/agent-readiness/inventory.mjs`, y todas las verificaciones de la
sección 8 de la skill creadora en verde.

## Informe

Entrega:

1. **Veredicto:** `LISTA`, `LISTA CON CAMBIOS MENORES` o `NO LISTA`.
2. **Hallazgos** ordenados por gravedad (bloqueante, importante, menor), cada
   uno con archivo:línea o captura, qué falla, por qué importa y qué debe
   cambiar.
3. **Tabla de fuentes:** fuente, DOI, cifra usada, ¿verificada? (sí/no/parcial).
4. **Casos reproducidos:** entrada, esperado, mostrado.
5. **Instrucciones para la sesión que corrija**, autocontenidas.
