# Decisiones del propietario sobre las herramientas

Decisiones tomadas por el propietario del sitio (Gonzalo) después de revisar
las herramientas y sus auditorías. **Son decisiones de producto, no
hallazgos pendientes**: una auditoría debe respetarlas y no volver a
marcarlas como fallo. Si una auditoría cree que alguna causa un problema
nuevo y concreto (por ejemplo, de accesibilidad o de exactitud), debe
señalarlo como *propuesta para el propietario*, nunca como bloqueante.

Para cambiar una decisión de esta lista hace falta que el propietario lo
pida expresamente.

## Calculadora de edad (`/herramientas/calculadora-edad-perro`)

Fecha: 2026-10-16. PR #115.

### 1. El perro senior y el longevo duermen (animación)

- **Senior:** ojos abiertos con "Zzz" azules que suben y crecen al estilo
  del emoji 😴.
- **Senior longevo:** duerme del todo: ojos cerrados en forma de sonrisa,
  boca pequeña en "o", cabeza un poco ladeada, respiración más lenta y "Zzz".
- **Motivo:** los perros mayores duermen mucho y cada vez más profundo; la
  imagen del perro dormido es tierna y reconocible para quien convive con
  un perro mayor. La auditoría de 2026-10-15 lo leyó como "apagarse"; el
  propietario lo descarta. Lo que sí se corrigió de esa observación fue la
  barra, que ahora sigue etapas y no termina en la esperanza de vida.
- **Descartado expresamente:** burbujas de sueño en la nariz (parecían moco
  o lágrima).

### 2. Canas progresivas al estilo Beagle

- Las canas empiezan unos 4 años antes de la etapa senior.
- La cara y las orejas pasan de café a crema; aparecen "anteojos" claros
  alrededor de los ojos; las canas suben a la frente; la franja blanca se
  ensancha y las mejillas caen un poco.
- En la etapa final la cara queda casi blanca, como la de una Beagle de
  12–13 años.
- **Motivo:** basado en la progresión real de dos Beagles del propietario
  (Luna y Dakota) desde cachorras hasta los 11–12 años.

### 3. Mensajes sobre el sueño

- Senior: "Es normal que duerma más y más profundo; consulta si le cuesta
  mucho despertar o el cambio es brusco".
- Longevo: dormir mucho es parte de la etapa; cama cómoda y rutinas
  tranquilas.

## Selector de movilidad (`/herramientas/selector-movilidad-perros-mayores`)

Fecha: 2026-10-17. Rama `herramientas/movilidad-rediseno`.

### 1. Se actualiza también el MCP para que todo sea coherente

El propietario autorizó cambiar los datos compartidos
(`src/lib/agent-tools/movilidad.ts`, versión 1.1) aunque eso cambie la
respuesta de la API y el MCP. Detalle y evidencia en
[`movilidad-revision-1.1.md`](movilidad-revision-1.1.md).

### 2. El nivel severo es «apoyo total», no «cuidado paliativo»

Una silla de ruedas puede devolverle el paseo a un perro: no es una señal de
final. El aviso del nivel severo se llama «Cuidados diarios si ya no se
levanta solo».

### 3. Cambios de postura: plan individual (actualizada 2026-10-17)

No se fija un intervalo: cada perro es distinto y muchos avisan cuando están
incómodos (por ejemplo, ladrando cuando el sol empieza a quemarles). La app
pide un plan individual al veterinario y menciona 2–4 horas solo como
referencia general de enfermería, coherente con la guía de úlceras por
presión revisada en la corrección editorial del 2026-10-16.

### 4. Nada de enlaces de afiliado dentro de la app

Los productos se enlazarán desde artículos propios (por ejemplo, comparativas
de sillas de ruedas). La app solo enlazará a esos artículos.
`SHOW_AFFILIATE_LINKS` sigue en `false`.

### 5. Un mismo beagle senior en toda la app

El hero y las ilustraciones del resultado usan el mismo perro, generado
editando una imagen base (una escena por resultado), en lugar de dibujarlo en
SVG.

## Cómo usar este archivo

- **Al crear o rediseñar** una herramienta (`crear-herramienta-interactiva`):
  léelo antes de empezar y no deshagas estas decisiones.
- **Al auditar** (`auditar-herramienta-interactiva`): léelo antes de
  redactar hallazgos. Lo que esté aquí va, como mucho, en una sección
  aparte de "propuestas para el propietario".
- **Nuevas decisiones:** añádelas aquí con fecha, PR, qué se decidió y por
  qué, cuando el propietario lo pida.
