#!/usr/bin/env python3
"""Hash-checked assembly of the reviewed R3 runner source fragments."""
from pathlib import Path
import hashlib
parts=sorted(Path(__file__).with_name("runner-source").glob("*.pyfrag"))
source=b"".join(p.read_bytes() for p in parts)
expected="063db18233152aaae81bd529b9e6cd5106b39a0ed09e2b9182b7452226ed5e97"
actual=hashlib.sha256(source).hexdigest()
if actual!=expected: raise SystemExit(f"runner source hash mismatch: {actual}")
exec(compile(source,__file__,"exec"),globals(),globals())
