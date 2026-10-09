#!/usr/bin/env python3
"""Hash-checked assembly of the reviewed bug70 runner source fragments."""
from pathlib import Path
import hashlib
parts=sorted(Path(__file__).with_name("runner-source").glob("*.pyfrag"))
source=b"".join(p.read_bytes() for p in parts)
expected="3a373712f988fd1b65116ecc2285bc0200a6e0583b753a62f8b82860e8b78670"
actual=hashlib.sha256(source).hexdigest()
if actual!=expected: raise SystemExit(f"runner source hash mismatch: {actual}")
exec(compile(source,__file__,"exec"),globals(),globals())

if __name__ == "__main__":
    raise SystemExit(main())
