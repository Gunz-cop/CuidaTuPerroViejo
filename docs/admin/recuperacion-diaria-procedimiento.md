# Recuperación histórica diaria · Procedimiento v2 para autorizar

**PREPARADO, NO EJECUTADO.** Este documento no autoriza la recuperación, crear
`AUDIENCE_RECOVERY_TOKEN`, desplegar versiones ni escribir en D1. Requiere
la auditoría independiente de Claude y una autorización específica del propietario
para el rango, el operador, la ventana y el cierre descritos aquí. El PR de este
procedimiento es solo documental y no se fusiona sin autorización.

**B1 está cerrado: se mantiene la igualdad estricta.** Resultado y auditoría en
[PR #178](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/178), archivos
`docs/admin/b1-pasada-seco.md` y `docs/admin/auditoria-b1-pasada-seco.md` de esa
rama mientras no estén en main. Una observación favorable no garantiza todas las
consultas futuras. No se reparte ninguna diferencia ni se aplica tolerancia.

## 1. Operador, autorización y ventana

El **propietario ejecuta las llamadas HTTP con credenciales y las operaciones
Wrangler de secrets/despliegue en su equipo**, con su sesión de Cloudflare y el
lockfile del proyecto. Codex puede preparar el manifiesto, hacer las lecturas de
verificación autorizadas y conciliar respuestas saneadas; no necesita recibir
las credenciales Basic ni el valor del secret. No se entregan por chat. Conviene
reservar **un bloque de 1 a 2 horas sin interrupciones**, con **Codex como
observador de solo lectura en paralelo** al propietario.

Antes de empezar, registrar una ficha privada:

| Dato de la ventana | Valor por rellenar |
| --- | --- |
| Referencia de autorización específica y operador | |
| SHA de main auditado y SHA del merge vigente | |
| Cuenta, Worker `cuidatuperroviejo`, D1 `cuidatuperroviejo-contact` | |
| Inicio UTC previsto / fin UTC previsto | |
| Inicio UTC real / fin UTC real | |
| `notOlderThan`, `maxDuration`, `maxPageSize` y hora de lectura | |
| Primer día completo / último histórico / ventana ordinaria | |
| V0 sin secret, deployment y procedencia de main | |
| V+ con secret, deployment y hora de activación | |
| V− sin secret, deployment y hora de cierre | |
| Ubicación privada de snapshots, respuestas y registro | |

### Paso previo obligatorio: fusionar la documentación antes del preflight

Workers Builds sube una versión de vista previa con cada push a una rama con PR.
Los PR documentales pendientes tienen pushes posteriores al despliegue de
`51ebd22`; no se presupone que la última versión subida sea la de ese main.
Antes del preflight y de abrir la ventana:

1. **Con autorización expresa del propietario**, fusionar todos los PR
   documentales pendientes: **#174, #175, #177, #178 y #179**, incluido este
   procedimiento. No abrir ninguna otra rama con push durante esta preparación.
2. Esperar a que termine el despliegue del **último merge** y las builds en curso.
   Comprobar que la versión activa procede de **ese SHA final de main**, recibe
   **100 %** del tráfico, la **última versión subida es esa misma versión** y
   el único cron es **`0 8 * * *`**. Registrar SHA, UUID y hora; no reutilizar
   `51ebd22` como referencia si los merges han producido otro SHA de main.
3. **Desde ese momento y hasta cerrar la ventana**, congelar los pushes a
   cualquier rama con PR, **también los de Claude Code y Codex**, y todos los
   merges. No hacer cargas manuales, cambios de secrets ajenos ni despliegues
   concurrentes. Los únicos cambios de versión previstos son los del secret
   descritos en este procedimiento.
4. **Repetir el preflight completo** del apartado 2 con esa versión de main.
   No crear el secret ni iniciar la recuperación antes de completarlo.

Esta preparación evita necesitar una build controlada en el caso normal.
Si aun así la última versión no coincide con la activa de main, **detenerse e
informar**; la build controlada queda solo como contingencia del apartado 3,
fuera de la ventana y con autorización específica. Esta secuencia es una
coordinación operativa documentada: no autoriza ni ejecuta los merges ahora.

Registrar el inicio antes de habilitar el secret. Mantener el registro de
versiones/deployments con hora, SHA y porcentaje durante toda la ventana:
comprobar al abrirla, antes y después de cada cambio del secret y su despliegue,
antes y después de cada petición/tramo, y al cerrarla. Revisar también el
historial de deployments desde el inicio para detectar cambios intermedios.
Durante una petición larga, Codex o el observador de solo lectura comprueba y
registra versión/tráfico/crons cada 30–60 segundos, sin lanzar otra recuperación.
Si detecta un cambio, se informa y no se envía el siguiente tramo; se concilia
la petición ya iniciada antes del cierre. Solo se admiten las transiciones
previstas V0 → V+ → V− del mismo código de main. Cualquier otra versión, reparto de tráfico o cron obliga a parar.

## 2. Preflight de lectura y cálculo del rango

No habilitar el secret si falta cualquiera de estas comprobaciones:

1. Identificar la cuenta y comprobar los bindings CONTACT_DB, CONTACT_KV,
   CF_ANALYTICS_ACCOUNT_ID y CF_ANALYTICS_SITE_TAG; comprobar solo presencia de
   CF_ANALYTICS_TOKEN, sin extraerlo. 0005 y 0006 deben estar registradas, con sus
   tablas y triggers. No aplicar migraciones en esta operación.
2. Identificar **V0**, versión activa sin secret, y demostrar que procede del SHA
   de main autorizado mediante Workers Builds (branch, commit, versión de su
   check y versión del deployment). Debe recibir **100 %** del tráfico y existir
   un único cron: **`0 8 * * *`**. Guardar el UUID V0 como referencia de cierre.
3. Listar solo nombres de secrets: AUDIENCE_RECOVERY_TOKEN debe estar ausente.
4. Ejecutar las dos pruebas sin credenciales del cliente del apartado 4:
   `/` → 200 y POST de recuperación → 401. Con Basic válido y sin el secret,
   comprobar además 503, desde el proceso privado del propietario.
5. Guardar las instantáneas y recuentos del apartado 7. Reservar la ventana
   lejos de las 08:00 UTC y **evitar el día 3 de cada mes en Costa Rica**: ese
   día el cron archiva el mes anterior en audience_months. No pausar el cron;
   una fila mensual nueva rompería la igualdad con la instantánea y exige
   detenerse.
6. Leer settings **reales en ese momento**: enabled, notOlderThan, maxDuration y
   maxPageSize. No reutilizar la retención de B1 ni suponer un plan de Cloudflare.

Con la hora UTC de esa lectura, calcular:

- `límite = ahora − notOlderThan`.
- **Desde:** primer día de Costa Rica cuyo inicio (06:00 UTC) sea mayor o igual
  al límite. Si el día que contiene el límite está cortado, excluirlo entero;
  si coincide exactamente con su medianoche local, ese día sí está completo.
- Obtener la ventana ordinaria con **`recentDays(ahora)` del main auditado**,
  que ya incorpora el margen común de 48 horas y los siete días elegibles.
- **Hasta:** el día local anterior al primero de esa ventana ordinaria.
- Si desde > hasta, no hay histórico que recuperar: registrar y cerrar sin
  crear el secret. Los siete días recientes quedan a cargo del cron; la clave
  única permitiría solaparlos sin sobrescribir, pero aquí se excluyen.

Crear tramos contiguos de **hasta siete días**, extremos incluidos, de **más
antiguo a más reciente**. El último puede ser más corto. El número de tramos se
calcula, no se fija en 26. El manifiesto con fechas calculadas y la regla de
actualización del límite deben quedar cubiertos por la autorización específica.

Antes de cada tramo releer hora/settings y revisar retención. Si se alarga la
operación, **recalcular el rango** y la ventana ordinaria: anotar la revisión,
marcar los días que ya no están completos como fuera de retención y recortar el
tramo antes de consultarlo. No volver a incluir un día conciliado ni ampliar el
rango autorizado automáticamente; una extensión necesita autorización. Lo que
pase a pertenecer a la ventana ordinaria se deja al cron y se registra. Nunca
atribuir un día parcial a un día completo ni reconstruirlo desde meses.

## 3. O3 · Mecanismo exacto de secrets y versiones

Se elige **Wrangler 4.128.0 del lockfile, `versions secret` seguido de despliegue
explícito de un UUID**, con una comprobación obligatoria de la última versión.
No se usa `wrangler secret put/delete`, que despliega inmediatamente.
**Nunca «Add variable and deploy».** Tampoco se usa «⌄ → Save»: en este
procedimiento no se ha demostrado que active el secret en la versión concreta
de main. No se mezcla el panel con el mecanismo siguiente.

### Qué hay que comprobar sobre la última versión

La ayuda y el código instalado muestran que `versions secret put/delete`
aplican un PATCH a **la última versión subida**, no necesariamente la activa.
No tienen una opción para elegir una versión base por UUID. La API documenta
que el PATCH a un UUID concreto **no está soportado**. Por eso no basta con
escribir «usar main» o pasar un nombre de Worker.

Lecturas concretas para verificarlo (cuenta y nombre ya identificados):

```text
GET /accounts/{account}/workers/scripts/cuidatuperroviejo/deployments
GET /accounts/{account}/workers/workers/cuidatuperroviejo/versions/latest?include=modules
GET /accounts/{account}/workers/workers/cuidatuperroviejo/versions/{UUID}?include=modules
GET /accounts/{account}/workers/scripts/cuidatuperroviejo/schedules
GET /accounts/{account}/workers/scripts/cuidatuperroviejo/secrets
```

El primer deployment es el activo. Comparar sus UUID/porcentajes con la versión
leída; relacionar V0 con la build de main por commit y versión de salida. Guardar
privadamente módulos/configuración y comparar hashes de contenido por módulo,
assets y sus referencias heredadas, bindings (solo nombres/tipos en secrets),
compatibilidad y opciones. Los GET no revelan los valores de secrets. Si no se
puede comprobar la equivalencia, no desplegar la copia.

Antes de cada operación, listar versiones y leer la última; identificar también
la activa y sus porcentajes. Para la creación se exige **última = V0 de main**;
para el borrado normal, **última = V+ de ese mismo main**. No debe haber una
preview posterior. Congelar también las subidas, no solo los merges, evita la
carrera entre comprobación y PATCH.

Si tras fusionar los PR documentales y verificar el despliegue final la última
sigue siendo una preview o no coincide con V0, **detenerse e informar**. No crear
el secret ni desplegar esa preview. La **build controlada** queda solo como
contingencia: fuera de la ventana y con autorización específica del propietario,
preparar una build del **SHA exacto de main autorizado**, comprobar su procedencia,
su activación al 100 % y que sea la última, y repetir todo el preflight. No es el
paso normal ni un fallback automático de este documento.

### Verificaciones y transiciones previstas

Los UUID cambian por el secret, pero **el SHA de código debe seguir siendo el
mismo main auditado**. V+ y V− son copias de V0 con el único cambio de binding
indicado. Conservar evidencias del PATCH, UUID devuelto, metadatos y comparación
privada de módulos/assets y configuración: solo puede variar
AUDIENCE_RECOVERY_TOKEN y las anotaciones de la versión. No inferir procedencia
por un tag escrito por el operador ni comparar solo el nombre del Worker.

| Momento obligatorio | Versión activa esperada | Tráfico | Cron único | Secret activo |
| --- | --- | ---: | --- | --- |
| Antes de crear | V0, main autorizado; última=V0 | 100 % | `0 8 * * *` | Ausente |
| Después de crear, antes de desplegar | V0 sin cambios; nueva V+ verificada | 100 % | `0 8 * * *` | Ausente en V0 |
| Después de activar V+ | V+, mismo código/SHA de V0 | 100 % | `0 8 * * *` | Presente |
| Antes de borrar | V+, mismo main; última=V+ | 100 % | `0 8 * * *` | Presente |
| Después de borrar, antes de desplegar | V+ sin cambios; nueva V− verificada | 100 % | `0 8 * * *` | Aún presente en V+ |
| Después de activar V− | V−, mismo código/SHA de V0 | 100 % | `0 8 * * *` | Ausente |

**Crear y activar, solo con autorización operativa:** el proceso privado del
propietario genera `secrets.token_urlsafe(32)` (32 bytes aleatorios), exclusivo de
esta ventana, y lo pasa por stdin a:

```text
npx --no-install wrangler versions secret put AUDIENCE_RECOVERY_TOKEN --name cuidatuperroviejo --config wrangler.jsonc --env-file wrangler-types.env
```

Registrar V+ devuelto sin mostrar el valor. Verificar la fila «después de crear»
y la equivalencia con main. Solo entonces desplegar **ese UUID**, sin elegir
«latest» interactivamente:

```text
npx --no-install wrangler versions deploy <UUID_V_MAS>@100 --name cuidatuperroviejo --config wrangler.jsonc --env-file wrangler-types.env --yes
```

Verificar la fila «después de activar», presencia por nombre y 200 del POST con
ambas credenciales para el **primer tramo autorizado**. No hay una petición de
recuperación de prueba: ese POST ya puede escribir y debe figurar en la tabla.

**Borrar y desactivar al cerrar, incluso si hubo parada:** el propietario ejecuta
en su terminal de confianza, confirma el borrado del nombre y registra V−:

```text
npx --no-install wrangler versions secret delete AUDIENCE_RECOVERY_TOKEN --name cuidatuperroviejo --config wrangler.jsonc --env-file wrangler-types.env
```

Esto **solo crea V−**, no retira todavía el secret del tráfico. Verificar
«después de borrar», comprobar V− y desplegar únicamente su UUID:

```text
npx --no-install wrangler versions deploy <UUID_V_MENOS>@100 --name cuidatuperroviejo --config wrangler.jsonc --env-file wrangler-types.env --yes
```

Completar «después de activar V−». No basta con que el CLI diga «deleted».

### Cierre de emergencia si la procedencia ya no coincide

Parar nuevas peticiones e informar. La retirada del secret **no se omite** porque
haya fallado el control de versión. La autorización operativa debe incluir este
cierre con la referencia V0 sin secret previamente verificada:

1. Volver a servir **V0@100**, con el comando de despliegue explícito anterior,
   para cerrar la ruta activa sin publicar una preview. No revierte D1.
2. Comprobar que la ruta está cerrada y registrar versión/crons, aunque el resto
   de la incidencia siga abierto. No corregir crons ni otra configuración por
   iniciativa propia.
3. Borrar el nombre con `versions secret delete` y registrar el UUID resultante.
   Si la última versión es ajena a main, este borrado se permite **solo para
   retirar el secret; jamás desplegar esa copia**. V0 sigue atendiendo tráfico.
   Verificar la ausencia en el Worker activo y la última versión, solo por nombres.
4. Si no se puede verificar o retirar el secret, comunicar inmediatamente el
   cierre incompleto al propietario y mantener la atención hasta que lo retire;
   no declarar éxito ni reanudar la recuperación. No ocultar el fallo tras un
   `finally`. La incidencia se documenta separadamente.

El borrado quita el binding de la versión de cierre; no elimina automáticamente
versiones históricas inmutables. No volver a desplegar V+ ni sus previews y no
activar sus URLs versionadas. Conservar sus identificadores como evidencia.

## 4. Credenciales y cliente HTTP comprobado

La sesión Cloudflare del propietario se autentica por su mecanismo habitual de
Wrangler, verificando identidad/cuenta antes de operar. Es distinta de Basic,
del token de lectura de Analytics y del secret de recuperación. No se cambian
otros secrets, permisos o bindings durante esta ventana. El propietario fija
`CLOUDFLARE_ACCOUNT_ID` al identificador de cuenta de la ficha (no es un secret)
y comprueba su identidad con `npx --no-install wrangler whoami`. Los comandos
usan siempre `--name cuidatuperroviejo` y la configuración indicada; si el
perfil/cuenta no coincide, no se ejecutan operaciones de secrets.

Para HTTP se usa **Python 3 con urllib y User-Agent explícito
`CuidaTuPerroViejo-Admin-Recovery/1.0`**, TLS verificado y sin redirecciones.
Envía `Accept: text/html` en `/` y `application/json` en la API; pedir JSON en
la portada puede devolver 406 por negociación de contenido. No se usa el agente
predeterminado de urllib, que produjo el error 1010. El
12 de noviembre de 2026 se probaron desde este entorno, sin credenciales:

| Prueba del cliente con ese User-Agent | Resultado observado |
| --- | ---: |
| GET `https://cuidatuperroviejo.com/` | 200 |
| POST `/api/admin/audience/recover-days`, JSON vacío, sin credenciales | 401 |

No hubo `cf-mitigated`; hubo `cf-ray`. No se desactivó ninguna protección. La
petición de prueba a la ruta no pasó la autenticación y no ejecutó recuperación.
**Repetir ambas pruebas desde el equipo del operador antes de cada ventana**:
una prueba de este entorno no garantiza su salida de red. Un 403/1010 obliga a
parar, no a bajar protecciones ni a cambiar de destino.

Basic se introduce con `getpass` en un proceso local privado, no por argumentos
ni variables exportadas del shell. El secret se genera en ese proceso, nunca se
imprime, y se entrega a Wrangler por stdin, no como argumento. No usar trazas,
`set -x`, grabaciones de terminal, volcados de entorno ni logs de cabeceras.
No guardar estos valores en JSON de peticiones, chats, repo o historial.

Este bloque es una **herramienta documental preparada**, no ejecutada. Guardarlo
fuera del repo en un directorio 0700; el propietario lo carga en una sesión Python
local de confianza. Introducir Basic solo cuando el preflight lo requiera:

```python
import base64, getpass, json, re, secrets, subprocess
import urllib.request, urllib.error

BASE = 'https://cuidatuperroviejo.com'
AGENT = 'CuidaTuPerroViejo-Admin-Recovery/1.0'

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

http = urllib.request.build_opener(NoRedirect())
authorization = None
recovery_token = None

def load_basic():
    global authorization
    user = getpass.getpass('Usuario administrativo: ')
    password = getpass.getpass('Contraseña administrativa: ')
    authorization = 'Basic ' + base64.b64encode(
        (user + ':' + password).encode()).decode()

def call(path, body=None, basic=False, token=False):
    headers = {'User-Agent': AGENT,
               'Accept': 'text/html' if path == '/' else 'application/json'}
    if basic:
        if authorization is None:
            raise RuntimeError('Falta Basic en memoria')
        headers['Authorization'] = authorization
    if token:
        if recovery_token is None:
            raise RuntimeError('Falta secret en memoria')
        headers['X-Audience-Recovery-Token'] = recovery_token
    payload = None if body is None else json.dumps(body).encode()
    if payload is not None:
        headers['Content-Type'] = 'application/json'
    request = urllib.request.Request(BASE + path, data=payload,
                                     headers=headers)
    try:
        response = http.open(request, timeout=480)
    except urllib.error.HTTPError as error:
        response = error
    return response.status, response.read().decode('utf8', 'replace')

def create_staged_secret():
    global recovery_token
    # Llamar SOLO tras comprobar última=V0 y congelar las subidas.
    if recovery_token is not None:
        raise RuntimeError('Ya hay un token de esta ventana')
    recovery_token = secrets.token_urlsafe(32)
    result = subprocess.run([
        'npx', '--no-install', 'wrangler', 'versions', 'secret', 'put',
        'AUDIENCE_RECOVERY_TOKEN', '--name', 'cuidatuperroviejo',
        '--config', 'wrangler.jsonc', '--env-file', 'wrangler-types.env'
    ], input=recovery_token + '\n', text=True, capture_output=True)
    if result.returncode:
        raise RuntimeError('Fallo al crear la versión; revisar sin volcar stdin')
    match = re.search(r'Created version ([0-9a-f-]{36})', result.stdout)
    if not match:
        raise RuntimeError('UUID no identificado; no desplegar a ciegas')
    return match.group(1)  # Único dato que se muestra: UUID, nunca el valor.

def release_credentials():
    global authorization, recovery_token
    authorization = None
    recovery_token = None
```

El bloque no se conecta ni crea nada al cargarlo: define funciones. En una
ventana autorizada, el propietario hace las pruebas con `call('/', basic=False)`
y `call('/api/admin/audience/recover-days', {}, basic=False)`; carga Basic para
el 503 previo; crea V+ solo mediante la función tras sus controles y despliega
su UUID por separado. Para cada tramo usa `call` con `basic=True, token=True` y
el JSON del apartado siguiente. Guarda la respuesta con nombre propio 0600,
sin imprimir cabeceras ni credenciales.

El proceso permanece abierto durante la ventana. Para borrar se usa la terminal
Wrangler del apartado 3; no necesita que se vuelva a introducir el valor. Tras
el 503 final, llamar a `release_credentials()` y terminar el proceso; eliminar
cualquier copia accidental y los archivos temporales que contengan credenciales.
No se promete borrado criptográfico de cadenas Python en memoria: no se persisten
y el proceso se termina. Si crear devuelve un resultado incierto, tratar el
secret como potencialmente creado y ejecutar el cierre, no generar otro token.

## 5. O2 · Ejecutar y anotar cada tramo

Endpoint único:
`POST https://cuidatuperroviejo.com/api/admin/audience/recover-days`.
Cada llamada invoca `recoverDays()` en el Worker activo. No usar cron temporal,
SQL de inserción ni lógica paralela. Mantener **una sola petición en curso**.
El JSON no contiene credenciales:

```json
{
  "from": "AAAA-MM-DD",
  "to": "AAAA-MM-DD",
  "reason": "Referencia de autorización y motivo concreto",
  "confirm": "RECOVER_AUDIENCE_DAYS"
}
```

Antes de enviar: comprobar rango vigente, versión, porcentaje y cron; registrar
hora UTC. Tras responder: registrar HTTP, identificador `operation`, cada día de
`coverage`, `requests` y fin UTC; consultar logs por identificador y volver a
comprobar versión/crons. **Un HTTP 200 no significa cobertura completa.**
`requests` cuenta peticiones de datos, sin settings (hasta una adicional).

La tabla siguiente es una plantilla vacía: generar las fechas al abrir la ventana,
ajustar el número de filas y conservar también cada revisión y reintento. En
«Estados por fecha» deben figurar todas las fechas con la etiqueta original
`coverage[].status`, el texto literal de `coverage[].reason` cuando exista y la
clasificación del operador. Por ejemplo:
`AAAA-MM-DD: status=fallido; reason="Día vacío; sigue pendiente de archivo."; clasificación=vacío`.
No anotar solo el estado global del tramo ni sustituir la etiqueta de la API.
No se pasa al siguiente tramo sin completar la fila y conciliar su respuesta.

| Tramo/intento | Desde | Hasta | Petición UTC (inicio–fin) | Operación | Estados por fecha (API → clasificación) | Consultas datos (+settings) | HTTP | Notas/revisión |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01/0 | | | | | | | | |
| 02/0 | | | | | | | | |
| 03/0 | | | | | | | | |
| 04/0 | | | | | | | | |
| 05/0 | | | | | | | | |
| 06/0 | | | | | | | | |
| 07/0 | | | | | | | | |
| 08/0 | | | | | | | | |
| 09/0 | | | | | | | | |
| 10/0 | | | | | | | | |
| 11/0 | | | | | | | | |
| 12/0 | | | | | | | | |
| 13/0 | | | | | | | | |
| 14/0 | | | | | | | | |
| 15/0 | | | | | | | | |
| 16/0 | | | | | | | | |
| 17/0 | | | | | | | | |
| 18/0 | | | | | | | | |
| 19/0 | | | | | | | | |
| 20/0 | | | | | | | | |
| 21/0 | | | | | | | | |
| 22/0 | | | | | | | | |
| 23/0 | | | | | | | | |
| 24/0 | | | | | | | | |
| 25/0 | | | | | | | | |
| 26/0 | | | | | | | | |
| /R1 | | | | | | | | |

### Estados y reglas de avance

- **Archivado:** D1 tiene la fila día/versión; puede ser una fila anterior que
  ON CONFLICT omite. Conservar sus campos, incluidos fetched_at y muestreo.
- **Vacío:** `coverage[].reason` dice literalmente **«Día vacío; sigue pendiente
  de archivo.»**. Esta es la evidencia principal para clasificarlo como vacío,
  aunque `coverage[].status` sea `fallido`. Anotar ambos campos tal como vienen
  y la clasificación; no hay fila ni cero inventado. B1 observó 13 fechas:
  **13–21 mayo, 5/10/23 junio y 3 agosto de 2026**. Solo son esperables las que
  aún pertenezcan al rango autorizado; la fecha conocida no sustituye el reason
  ni garantiza que el resultado se repita. Los vacíos así anotados **no son
  fallos de la operación**.
- **Pendiente:** identificar el motivo. Si es agotamiento de presupuesto, hacer
  **una única segunda pasada** sobre esos días, con intento `/R1`; seleccionar
  subrangos contiguos que excluyan días ya vacíos o fallidos. No reenviar todo
  el tramo si con ello se reintentarían esos fallos. Los ya archivados se omiten
  por idempotencia. Si siguen pendientes tras R1, anotarlos e informar; no R2.
  Pendientes por margen/otra causa no se convierten en reintentos de presupuesto.
- **Fallido:** `coverage[].reason` dice **«Lote no guardado: consulta, coherencia
  o escritura falló.»**. Conservar estado y reason literales, clasificarlo como
  fallido, **anotar e informar; no reintentar a ciegas**. El código auditado separa
  este caso del vacío mediante reason, aunque ambos usen status `fallido`.
- **Caso ambiguo:** solo si reason falta, es desconocido o no permite conciliar
  la respuesta, recurrir a una lectura diagnóstica autorizada de GraphQL del mismo
  día, sin writes/D1/KV. Registrar la evidencia y la clasificación sin borrar los
  campos originales. No hacer esa lectura por rutina para los dos reasons
  anteriores. Si no se puede explicar el caso, detener y cerrar; si aparecen
  diferencias, aplicar la parada inmediata.
- **Fuera de retención:** día ya no completo; registrar límite/hora y la pérdida,
  sin inventar cobertura parcial ni recuperarlo desde los meses.

No esperar a una notificación del software de «presupuesto agotado»:
**O1 sigue pendiente y no se implementa aquí**. Se detecta con los días que
quedan `pendiente`, el contador `requests` (máximo 32) y la ausencia de otra causa.
Una lectura o respuesta ambigua no basta para consumir R1 automáticamente.

Si se pierde la conexión o hay timeout, no asumir cancelación ni rollback total.
Leer logs y D1 antes de decidir: cada batch D1 es transaccional, pero los lotes
completos previos pueden estar guardados. Registrar el identificador si se obtuvo.
No empezar otra petición mientras no se conozca el desenlace de la anterior.
El límite es 32 peticiones de datos + una de settings por llamada; respetar
la cuota compartida de GraphQL (por defecto 300 peticiones por cinco minutos),
con pausas entre llamadas y sin concurrencia. No modificar este presupuesto.

## 6. Condiciones de parada y retirada obligatoria

**Detener nuevas peticiones, anotar e informar inmediatamente** si:

- cambia inesperadamente versión activa, procedencia, reparto de tráfico o crons;
- aparece un **403** (incluido 1010) o un **5xx inesperado**;
- se modifica o añade una fila de audience_months respecto del snapshot;
- aparece cualquier día con diferencias entre horas, total o agregado diario;
- falla una lectura de verificación o su comparación, incluidos límites,
  procedencia, integridad y diagnóstico de un supuesto vacío.

Un 503 con Basic antes de habilitar o después de retirar el secret es la prueba
esperada de cierre; un 503 durante recuperación es inesperado y obliga a parar.
Ante 401/429/timeout inesperado tampoco avanzar: anotar, conciliar sin reenviar a
ciegas e informar. No aumentar tolerancias, repartir diferencias ni bajar
protecciones. B1 favorable no autoriza ignorar una nueva discrepancia.

La parada **no cancela el cierre**: retirar el secret y confirmar la versión de
main con el mecanismo normal o de emergencia del apartado 3. Mantener la
congelación hasta terminar esa retirada. No reanudar con otra versión o cliente
sin resolver la incidencia y la autorización correspondiente.

## 7. Integridad antes y después

Guardar fuera del repositorio, en privado y con hora, resultados completos de
consultas **simples y separadas**. No usar los recuentos de tablas vivas como
condición de igualdad. Ninguna de estas consultas escribe:

```sql
SELECT * FROM audience_months ORDER BY period, query_version;
SELECT type, name, tbl_name, rootpage, sql FROM sqlite_schema ORDER BY type, name;
SELECT COUNT(*) AS rows FROM audience_days;
SELECT * FROM audience_days ORDER BY day, query_version;
```

Cada sentencia se envía por separado. Registrar además d1_migrations y, por
separado, las tablas vivas affiliate_clicks_daily, assistant_interactions,
assistant_clicks, contact_messages, feedback_counts y feedback_votes; sus
recuentos son informativos, no se exige que permanezcan iguales.

Durante la ventana, comprobar mensuales contra su snapshot antes de avanzar de
tramo. Al terminar, exigir **igualdad de todas las filas y campos mensuales** y
**sqlite_schema sin cambios**; las filas diarias preexistentes también deben
seguir idénticas. No hay UPDATE, DELETE ni recálculo en la recuperación.

Leer y registrar el recuento diario inicial/final. Explicar la diferencia con
las nuevas filas de los tramos y, si coincidió el cron ordinario, sus nuevas
filas recientes usando fechas, fetched_at y logs. No atribuir todo crecimiento
a la recuperación ni exigir que un contador vivo permanezca igual.

Comprobaciones finales, también por separado, con cero filas problemáticas:

```sql
SELECT day, query_version, COUNT(*) AS n
FROM audience_days GROUP BY day, query_version HAVING COUNT(*) > 1;

SELECT day, query_version FROM audience_days
WHERE sample_interval IS NULL OR sample_interval < 1
   OR estimated IS NULL OR estimated NOT IN (0,1)
   OR estimated <> (sample_interval > 1);

SELECT day, query_version FROM audience_days
WHERE updated_at IS NOT NULL OR update_reason IS NOT NULL;
```

Conciliar **cada fecha del rango autorizado y sus revisiones** con uno de los
cinco estados finales y su evidencia. Un pendiente tras R1 sigue pendiente en
el informe; no se elimina de la conciliación ni se declara archivado. Verificar
límites UTC, zona, fuente, filtro, query_version y fetched_at de las filas nuevas.
La condición solicitada es que updated_at y update_reason sigan en NULL; una
excepción preexistente se informa antes de crear el secret, no se corrige aquí.

## 8. Cierre e informe saneado

1. Finalizar/conciliar la petición en curso; no enviar más. Registrar hora de
   fin de recuperación y conservar la tabla, respuestas y logs privados.
2. Borrar y desactivar el secret conforme al apartado 3, **aunque se haya parado**.
   Verificar V− (o V0 de cierre de emergencia), procedencia de main, 100 % del
   tráfico y único cron `0 8 * * *`, antes y después de la retirada/despliegue.
3. Listar solo los nombres: AUDIENCE_RECOVERY_TOKEN ausente. Con el cliente
   validado, Basic correcto y **sin** cabecera del secret, POST JSON vacío debe
   responder **503**. Sin credenciales debe responder **401**. No interpretar
   401 por sí solo como prueba de borrado: la ausencia por nombre es obligatoria.
4. Terminar el proceso privado de credenciales y destruir las copias del token;
   no destruir las respuestas/snapshots necesarios para auditar la operación.
5. Completar integridad final, conciliación por fecha e historial de versiones.
   Registrar fin UTC de la ventana, después de retirar el secret y verificar.
   Si algo falla, informar de cierre incompleto y mantener la incidencia abierta.
6. Entregar un **informe saneado en una rama y PR documentales, sin cifras
   absolutas de audiencia**: rango, fechas, estados por día, operaciones, consultas,
   versiones/SHA, crons, verificaciones, vacíos, pérdidas, R1 e incidencias.
   Recuentos privados y snapshots quedan fuera del repo. Abrir el informe después
   del cierre; su build podría subir una preview. No fusionar sin autorización.

No volver a desplegar una versión con el secret ni iniciar otra recuperación por
haber quedado el procedimiento preparado. O1 permanece pendiente; O2 y O3 quedan
especificados aquí para auditoría, no ejecutados.

## Fuentes y validación de este documento

- [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/):
  diferencia entre modificar con despliegue inmediato y preparar una versión.
- [Comandos de versiones](https://developers.cloudflare.com/workers/wrangler/commands/workers/):
  `versions secret put/delete` y `versions deploy <UUID>@100`.
- [Esquema OpenAPI oficial](https://github.com/cloudflare/api-schemas/blob/main/openapi.yaml):
  solo admite latest; verificar la descripción y el esquema al operar.
- [Error 1010](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/):
  bloqueo por firma del cliente, sin necesidad de desactivar protecciones.

Se contrastaron la ayuda y `patchLatestWorkerVersionWithSecrets` del Wrangler
4.128.0 instalado. Solo se ejecutaron lecturas de documentación/ayuda y las dos
pruebas HTTP sin credenciales indicadas; no se creó el secret, no se desplegó
ninguna versión y no se leyó ni escribió D1 para preparar este PR. La sintaxis
Python incluida se valida sin ejecutar sus funciones. Los cambios efectivos de
secrets y su propagación se verificarán únicamente en la operación autorizada.
