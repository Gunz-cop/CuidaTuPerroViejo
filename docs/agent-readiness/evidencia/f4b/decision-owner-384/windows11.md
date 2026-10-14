# Ejecución única del deadline — Windows 11 / PowerShell

Verificador admitido por el propietario, sin cambios: `verificador-deadline-externo.tar.gz`, SHA256 **2ab84cd380f9bde3fb3bbfcac75d5ae2b583884cf5fddd49640e6b1b1a50673a**. El script auxiliar sólo prepara Windows, lanza ese verificador una vez y empaqueta los originales; no modifica sus aserciones, SDK, cuerpo ni transporte.

## Descarga y comando exacto

Descargar los dos adjuntos `verificador-deadline-externo.tar.gz` y `ejecutar-f4b-deadline.ps1` en la carpeta **Descargas**, conservando esos nombres. Abrir **PowerShell** normal, sin administrador, y pegar:

```powershell
$pkg = Join-Path $env:USERPROFILE 'Downloads\verificador-deadline-externo.tar.gz'
$script = Join-Path $env:USERPROFILE 'Downloads\ejecutar-f4b-deadline.ps1'
if ((Get-FileHash -LiteralPath $pkg -Algorithm SHA256).Hash.ToLowerInvariant() -ne '2ab84cd380f9bde3fb3bbfcac75d5ae2b583884cf5fddd49640e6b1b1a50673a') { throw 'SHA256 del tarball incorrecto: STOP.' }
if ((Get-FileHash -LiteralPath $script -Algorithm SHA256).Hash.ToLowerInvariant() -ne '78a15f0373f13e030580b57f245d6316174eab52e03ce7923ac8f43ade3a350d') { throw 'SHA256 del script incorrecto: STOP.' }
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $script -Tarball $pkg
```

`ExecutionPolicy Bypass` sólo afecta al nuevo proceso de PowerShell; no cambia la política persistente. Si Descargas está redirigida, ajustar únicamente las dos rutas a los archivos descargados. No cambiar el código del verificador ni ejecutar manualmente un segundo intento.

## Node, instalación y red

Si existe Node **24.19.0**, se usa. Si falta o tiene otra versión, el script descarga el ZIP portátil oficial adecuado a Windows x64/ARM64, verifica SHA256 y lo extrae en su carpeta de trabajo; no desinstala Node ni cambia el PATH persistente. El PATH del proceso permite que npm use ese Node. Se comprueba Undici **7.29.0** y SDK **2.3.1**, instalado mediante el lock propio con `npm ci --ignore-scripts --no-audit --no-fund` fuera del repo.

Checksums oficiales consultados el 2026-10-14:

- x64: `57f71ab3652e797d84acddc79c81cc9ff1c6ddb2a1974cdb83f00fee9bff4c73`.
- ARM64: `8502f4a50b458d4cc38ed8f2001556c2cd239d464920f74017926ccb1e1c157f`.
- Fuente: https://nodejs.org/dist/v24.19.0/SHASUMS256.txt ; binarios en https://nodejs.org/dist/v24.19.0/ .

El equipo debe usar la salida HTTPS directa declarada por el propietario. Si Node tiene proxy habilitado, el script se detiene sin modificarlo. No desactivar políticas ni certificados para avanzar.

## Ejecución y devolución

Carpeta fija: `Documentos\F4B-deadline-927916b4`. Si ya existe, el script se detiene para evitar una segunda ejecución. El verificador sólo llama `/api/mcp` del preview `https://927916b4-cuidatuperroviejo.g1721m.workers.dev`, máximo **6 solicitudes**, sin retries ni redirects. Se contabilizarán contra las **223/320** previas; máximo total reservado **229/320**. No producción, contacto, administración, AI ni escrituras.

Exige el mismo resultado: 500 sanitizado `-32603 / Internal error.` entre 10 y 12 s, cuerpo completo y petición inmediatamente posterior normal. Cualquier fallo implica STOP; no variantes ni nueva ejecución. El timeout de cliente de 16 s sólo acota la espera de fallo.

El script genera, también cuando el verificador devuelve STOP:

- `Documentos\F4B-deadline-927916b4-resultados.zip`.
- El archivo contiguo `.zip.sha256.txt`, con el hash del ZIP.

**Adjuntar aquí en el chat esos dos archivos, sin editar ni volver a guardar los JSON.** No publicarlos como comentario de issue. El ZIP contiene:

- `evidencia-deadline/result.json` y `http-originals.json`: resultado y todos los intercambios con bytes/base64/hashes, headers, tiempos, Cf-Ray si existe y terminales.
- `execution.json`, `versions.json`, `sdk-version.txt`: entorno, identidad declarada, inicio/fin UTC y código de salida.
- `node.stdout.log`, `node.stderr.log`, `npm.stdout.log`, `npm.stderr.log` y, si corresponde, `preparacion-error.txt`.
- `input-manifest.json`, `package-lock.json`, tarball original y `indice-originales.json` con bytes/SHA256 de cada archivo. El índice no se indexa a sí mismo.

Si falla antes de arrancar Node, pueden faltar los dos JSON del verificador; devolver igualmente el ZIP de preparación y no fabricar archivos. Si el ZIP no puede crearse, conservar la carpeta `devolucion`, comunicar el mensaje exacto y adjuntar sus archivos disponibles. No borrar la carpeta para reintentar.

Al recibirlos: conservar ZIP y originales privados, verificar hash del ZIP e índice, contrastar manifiesto/input/protocolo/preview/headers/cuerpo/tiempo/recuperación y contar solicitudes reales; publicar sólo evidencia curada. No sumar un PASS por el código de salida sin comprobar sus originales. R3/5 sólo después del resultado archivado y gates aplicables, con el mismo auditor. FAIL externo: STOP sin variantes.

El auxiliar PowerShell fue preparado por inspección; **no se ha ejecutado en Windows en esta sesión**. No hay nueva evidencia del deadline.
