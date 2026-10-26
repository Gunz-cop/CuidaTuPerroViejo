#!/usr/bin/env python3
"""Prototipo: valida un registro de hallazgos editorial y calcula el veredicto de la fase.

Uso:
    python3 -I validar_registro.py REGISTRO.yaml [--raiz RUTA_REPO]

No modifica nada. Devuelve 0 si el registro es válido (aunque el veredicto sea
NO APROBADO) y 1 si el registro incumple el contrato de hallazgos.
"""
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("Falta PyYAML (pip install pyyaml).")

SEVERIDADES = {"P0", "P1", "P2"}
ESTADOS = {
    "abierto", "corregido_sin_verificar", "cerrado", "regresion",
    "pendiente_verificacion", "en_disputa", "diferido", "descartado",
    "aceptado_por_propietario",
}
BLOQUEAN = {"abierto", "regresion", "corregido_sin_verificar", "en_disputa"}
CAMPOS_BLOQUEANTE = ("localizacion", "evidencia", "impacto", "correccion", "criterio_cierre", "regla")
ID_RE = re.compile(r"^[A-Z]{3}-[BAV]-\d{3}$")
MAX_RONDAS = 3


def vacio(valor):
    return valor is None or (isinstance(valor, str) and not valor.strip()) or valor == []


def buscar(archivo, terminos):
    """Devuelve las líneas del documento auditado que contienen alguno de los términos."""
    texto = archivo.read_text(encoding="utf-8").splitlines()
    patron = re.compile("|".join(re.escape(t) for t in terminos), re.IGNORECASE)
    return [(n, linea.strip()[:110]) for n, linea in enumerate(texto, 1) if patron.search(linea)]


def validar(registro, raiz):
    errores, avisos = [], []
    fase = registro["fase"]
    rondas = registro.get("rondas", [])
    hallazgos = registro.get("hallazgos", [])
    documento = raiz / registro["documento"] if registro.get("documento") else None

    # 1. Identificadores estables y únicos.
    vistos = set()
    for h in hallazgos:
        hid = h.get("id", "")
        if not ID_RE.match(hid):
            errores.append(f"{hid or '(sin id)'}: id no sigue el patrón AAA-F-NNN")
        if hid in vistos:
            errores.append(f"{hid}: id duplicado (los id no se reutilizan)")
        vistos.add(hid)

    for h in hallazgos:
        hid, sev, est = h.get("id"), h.get("severidad"), h.get("estado")
        if sev not in SEVERIDADES:
            errores.append(f"{hid}: severidad '{sev}' no existe (solo P0, P1, P2)")
        if est not in ESTADOS:
            errores.append(f"{hid}: estado '{est}' no existe")

        # 2. Un bloqueante necesita prueba completa; si no, es pendiente de verificación.
        if sev in {"P0", "P1"} and est in BLOQUEAN:
            faltan = [c for c in CAMPOS_BLOQUEANTE if vacio(h.get(c))]
            if faltan:
                errores.append(f"{hid}: bloqueante sin {', '.join(faltan)}; regístralo como pendiente_verificacion")
            if str(h.get("regla", "")).lower().startswith("preferencia"):
                errores.append(f"{hid}: una preferencia de estilo no puede bloquear")

        # 3. Una omisión exige búsqueda negativa, y el validador la repite sobre el documento.
        if h.get("tipo") == "omision" and est not in {"descartado"}:
            terminos = h.get("busqueda_negativa", {}).get("terminos", [])
            if not terminos:
                errores.append(f"{hid}: omisión sin búsqueda negativa documentada")
            elif documento and documento.exists():
                aciertos = buscar(documento, terminos)
                if aciertos and vacio(h.get("texto_existente_insuficiente_porque")):
                    lineas = ", ".join(str(n) for n, _ in aciertos[:8])
                    errores.append(
                        f"{hid}: se declara ausente, pero {len(aciertos)} líneas contienen "
                        f"{terminos} (líneas {lineas}). Explica por qué el texto presente no basta o descártalo"
                    )

        # 4. Reapertura de un cierre solo con evidencia nueva.
        historial = h.get("historial", [])
        for previo, actual in zip(historial, historial[1:]):
            if previo.get("estado") == "cerrado" and actual.get("estado") in {"abierto", "regresion"}:
                if vacio(actual.get("evidencia_nueva")) or actual.get("evidencia_nueva") == previo.get("evidencia"):
                    errores.append(f"{hid}: reabierto en R{actual.get('ronda')} sin evidencia nueva")

        # 5. En R2 y R3, un hallazgo nuevo sobre texto no modificado solo entra si es P0 o P1 justificado.
        apertura = h.get("ronda_apertura", 1)
        if apertura >= 2 and h.get("en_texto_modificado") is False:
            if sev == "P2" and est != "diferido":
                avisos.append(f"{hid}: P2 nuevo en texto no modificado durante R{apertura}; pasa a diferido")
            if sev == "P1" and vacio(h.get("por_que_no_antes")):
                errores.append(f"{hid}: P1 nuevo en texto no modificado sin explicar por qué no se vio antes")

    # 6. Límite de rondas y escalamiento.
    fallidas = [r for r in rondas if r.get("resultado") == "NO APROBADO"]
    for r in rondas:
        if r["n"] > MAX_RONDAS and not r.get("autorizada_por_propietario"):
            errores.append(f"R{r['n']}: ronda posterior a R{MAX_RONDAS} sin autorización escrita del propietario")
    if len(rondas) >= MAX_RONDAS and rondas[MAX_RONDAS - 1].get("resultado") == "NO APROBADO":
        avisos.append(f"R{MAX_RONDAS} NO APROBADO: corresponde informe de escalamiento, no R{MAX_RONDAS + 1} automática")

    # Veredicto calculado, no opinado.
    bloqueantes = [h["id"] for h in hallazgos if h.get("severidad") in {"P0", "P1"} and h.get("estado") in BLOQUEAN]
    p0_pend = [h["id"] for h in hallazgos if h.get("severidad") == "P0" and h.get("estado") == "pendiente_verificacion"]
    p2 = [h["id"] for h in hallazgos if h.get("severidad") == "P2" and h.get("estado") in {"abierto", "diferido"}]
    if bloqueantes:
        veredicto = "NO APROBADO (" + ", ".join(bloqueantes) + ")"
        if len(fallidas) >= MAX_RONDAS:
            veredicto = "ESCALADO AL PROPIETARIO (" + ", ".join(bloqueantes) + ")"
    elif p0_pend:
        veredicto = "DECISIÓN DEL PROPIETARIO (P0 sin verificar: " + ", ".join(p0_pend) + ")"
    else:
        veredicto = "APROBADO" + (f" con {len(p2)} P2 abiertos/diferidos" if p2 else "")
    return errores, avisos, f"{fase}: {veredicto}"


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    raiz = Path(args[args.index("--raiz") + 1]) if "--raiz" in args else Path.cwd()
    registro = yaml.safe_load(Path(args[0]).read_text(encoding="utf-8"))
    errores, avisos, veredicto = validar(registro, raiz)
    for e in errores:
        print("ERROR  ", e)
    for a in avisos:
        print("AVISO  ", a)
    print("VEREDICTO", veredicto)
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
