#!/usr/bin/env python3
"""Hash-checked assembly of the reviewed R3 runner source fragments."""
from pathlib import Path
import hashlib
parts=sorted(Path(__file__).with_name("runner-source").glob("*.pyfrag"))
source=b"".join(p.read_bytes() for p in parts)
expected="a652040934017f6677b816e788bd614d129b5b97c5cb67d3202d465774902301"
actual=hashlib.sha256(source).hexdigest()
if actual!=expected: raise SystemExit(f"runner source hash mismatch: {actual}")
exec(compile(source,__file__,"exec"),globals(),globals())
