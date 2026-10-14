param([string]$Tarball = (Join-Path $env:USERPROFILE 'Downloads\verificador-deadline-externo.tar.gz'))
$ErrorActionPreference = 'Stop'
$expected = '2ab84cd380f9bde3fb3bbfcac75d5ae2b583884cf5fddd49640e6b1b1a50673a'
if (!(Test-Path -LiteralPath $Tarball)) { throw "No encuentro el tarball: $Tarball" }
if ((Get-FileHash -LiteralPath $Tarball -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) { throw 'SHA256 incorrecto. STOP; no extraer ni ejecutar.' }
$root = Join-Path ([Environment]::GetFolderPath('MyDocuments')) 'F4B-deadline-927916b4'
if (Test-Path -LiteralPath $root) { throw "La carpeta ya existe: $root. No repetir el verificador. Conserva y devuelve el resultado anterior." }
New-Item -ItemType Directory -Path $root | Out-Null
$returnDir = Join-Path $root 'devolucion'
New-Item -ItemType Directory -Path $returnDir | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
$nodeExit = $null
$setupError = $null
$started = [DateTime]::UtcNow.ToString('o')
try {
    Copy-Item -LiteralPath $Tarball -Destination (Join-Path $returnDir 'verificador-deadline-externo.tar.gz')
    & tar.exe -xzf $Tarball -C $root
    if ($LASTEXITCODE -ne 0) { throw 'Falló tar.exe; STOP.' }
    $runner = Join-Path $root 'runner-externo'
    $manifest = Get-Content -Raw -LiteralPath (Join-Path $runner 'manifest.json') | ConvertFrom-Json
    foreach ($f in $manifest.files) {
        $path = Join-Path $runner $f.path
        if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant() -ne $f.sha256) { throw "Hash del paquete incorrecto: $($f.path)" }
    }
    $nodeExe = $null
    $existing = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($existing) {
        $version = & $existing.Source --version
        if ($LASTEXITCODE -eq 0 -and $version -eq 'v24.19.0') { $nodeExe = $existing.Source }
    }
    if (!$nodeExe) {
        $arch = 'x64'
        $nodeHash = '57f71ab3652e797d84acddc79c81cc9ff1c6ddb2a1974cdb83f00fee9bff4c73'
        if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64' -or $env:PROCESSOR_ARCHITEW6432 -eq 'ARM64') {
            $arch = 'arm64'
            $nodeHash = '8502f4a50b458d4cc38ed8f2001556c2cd239d464920f74017926ccb1e1c157f'
        }
        $nodeName = "node-v24.19.0-win-$arch"
        $nodeZip = Join-Path $root "$nodeName.zip"
        Invoke-WebRequest -UseBasicParsing -Uri "https://nodejs.org/dist/v24.19.0/$nodeName.zip" -OutFile $nodeZip
        if ((Get-FileHash -LiteralPath $nodeZip -Algorithm SHA256).Hash.ToLowerInvariant() -ne $nodeHash) { throw 'SHA256 oficial de Node incorrecto. STOP.' }
        Expand-Archive -LiteralPath $nodeZip -DestinationPath $root
        $nodeExe = Join-Path (Join-Path $root $nodeName) 'node.exe'
    }
    $nodeDir = Split-Path -Parent $nodeExe
    $env:PATH = "$nodeDir;$env:PATH" # Sólo este proceso; no instala ni cambia PATH persistente.
    $versions = & $nodeExe -p "JSON.stringify({node:process.version,undici:process.versions.undici,proxyEnabled:process.env.NODE_USE_ENV_PROXY==='1'||process.execArgv.includes('--use-env-proxy')||!!process.env.NODE_OPTIONS?.includes('--use-env-proxy')})"
    if ($LASTEXITCODE -ne 0) { throw 'Falló la comprobación de Node.' }
    [IO.File]::WriteAllText((Join-Path $returnDir 'versions.json'), $versions, $utf8)
    $v = $versions | ConvertFrom-Json
    if ($v.node -ne 'v24.19.0' -or $v.undici -ne '7.29.0') { throw 'Versión de Node/Undici distinta del contrato.' }
    if ($v.proxyEnabled) { throw 'Node tiene proxy habilitado. No modificarlo ni ejecutar; requiere revisión antes del único intento.' }
    Copy-Item -LiteralPath (Join-Path $runner 'manifest.json') -Destination (Join-Path $returnDir 'input-manifest.json')
    Copy-Item -LiteralPath (Join-Path $runner 'package-lock.json') -Destination (Join-Path $returnDir 'package-lock.json')
    Push-Location $runner
    try {
        $ErrorActionPreference = 'Continue' # Capturar stderr nativo también en PowerShell 5.1.
        & (Join-Path $nodeDir 'npm.cmd') ci --ignore-scripts --no-audit --no-fund 1> (Join-Path $returnDir 'npm.stdout.log') 2> (Join-Path $returnDir 'npm.stderr.log')
        $npmExit = $LASTEXITCODE
        $ErrorActionPreference = 'Stop'
        if ($npmExit -ne 0) { throw "npm ci falló con código $npmExit. No se ejecutó el deadline." }
        $sdk = & $nodeExe -p "JSON.parse(require('node:fs').readFileSync('node_modules/@modelcontextprotocol/client/package.json','utf8')).version"
        if ($LASTEXITCODE -ne 0 -or $sdk -ne '2.3.1') { throw 'SDK distinto de 2.3.1.' }
        [IO.File]::WriteAllText((Join-Path $returnDir 'sdk-version.txt'), $sdk, $utf8)
        [IO.File]::WriteAllText((Join-Path $root 'intento-iniciado.txt'), [DateTime]::UtcNow.ToString('o'), $utf8)
        $ErrorActionPreference = 'Continue'
        & $nodeExe '.\deadline.mjs' 'https://927916b4-cuidatuperroviejo.g1721m.workers.dev' (Join-Path $returnDir 'evidencia-deadline') 1> (Join-Path $returnDir 'node.stdout.log') 2> (Join-Path $returnDir 'node.stderr.log')
        $nodeExit = $LASTEXITCODE
        $ErrorActionPreference = 'Stop'
    } finally { Pop-Location }
} catch {
    $setupError = $_.ToString()
    [IO.File]::WriteAllText((Join-Path $returnDir 'preparacion-error.txt'), $setupError, $utf8)
} finally {
    $metadata = [ordered]@{ startedUtc=$started; endedUtc=[DateTime]::UtcNow.ToString('o'); powershell=$PSVersionTable.PSVersion.ToString(); windows=[Environment]::OSVersion.VersionString; tarballSha256=$expected; preview='https://927916b4-cuidatuperroviejo.g1721m.workers.dev'; servedSha='384f520db8acc85e505005f278cdde9ffd79cb7f'; nodeExitCode=$nodeExit; preparationError=$setupError; singleAttempt=$true; budget=6; logFormat='PowerShell redirection; SDK JSON originals unchanged' }
    [IO.File]::WriteAllText((Join-Path $returnDir 'execution.json'), ($metadata | ConvertTo-Json -Depth 5), $utf8)
    $items = @(Get-ChildItem -LiteralPath $returnDir -File -Recurse | Sort-Object FullName | ForEach-Object {
        [ordered]@{ path=$_.FullName.Substring($returnDir.Length+1).Replace('\','/'); bytes=$_.Length; sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant() }
    })
    [IO.File]::WriteAllText((Join-Path $returnDir 'indice-originales.json'), (ConvertTo-Json -InputObject $items -Depth 5), $utf8)
    $zip = "$root-resultados.zip"
    Compress-Archive -Path (Join-Path $returnDir '*') -DestinationPath $zip
    $zipHash = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash.ToLowerInvariant()
    [IO.File]::WriteAllText("$zip.sha256.txt", "$zipHash  $([IO.Path]::GetFileName($zip))", $utf8)
    Write-Host "DEVOLVER: $zip"
    Write-Host "SHA256: $zipHash"
    if ($nodeExit -eq 0 -and !$setupError) { Write-Host 'Verificador terminó con código 0; pendiente validar los originales y R3.' }
    else { Write-Host 'STOP. No repetir, borrar la carpeta, cambiar aserciones ni probar variantes. Devuelve el ZIP tal cual.' }
}
