#!/usr/bin/env python3
"""Hash-checked assembly of the reviewed R3 runner source fragments."""
from pathlib import Path
import hashlib
parts=sorted(Path(__file__).with_name("runner-source").glob("*.pyfrag"))
source=b"".join(p.read_bytes() for p in parts)
expected="b4a90615ae580ec6166ac47b0c3260c2d126212fb13736130bc2c4c800d4b0ea"
actual=hashlib.sha256(source).hexdigest()
if actual!=expected: raise SystemExit(f"runner source hash mismatch: {actual}")
exec(compile(source,__file__,"exec"),globals(),globals())
