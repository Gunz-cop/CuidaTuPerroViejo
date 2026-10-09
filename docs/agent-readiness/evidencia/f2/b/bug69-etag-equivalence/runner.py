#!/usr/bin/env python3
"""Hash-checked assembly of the reviewed bug69 runner source fragments."""
from pathlib import Path
import hashlib
parts=sorted(Path(__file__).with_name("runner-source").glob("*.pyfrag"))
source=b"".join(p.read_bytes() for p in parts)
expected="b7ecf335395d5b6d1bf845b5f566a76b2e2b45fc46e3eefb89844cd024e37139"
actual=hashlib.sha256(source).hexdigest()
if actual!=expected: raise SystemExit(f"runner source hash mismatch: {actual}")
exec(compile(source,__file__,"exec"),globals(),globals())
