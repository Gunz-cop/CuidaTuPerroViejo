#!/usr/bin/env python3
"""Build an ignored Workerd-only config from the compiled config, retaining ASSETS and local SESSION."""
import json
from pathlib import Path
compiled = Path('dist/server/wrangler.json')
source = json.loads(compiled.read_text())
allowed = ('name', 'main', 'compatibility_date', 'compatibility_flags', 'assets', 'migrations')
local = {key: source[key] for key in allowed if key in source}
session = next((item for item in source.get('kv_namespaces', []) if item.get('binding') == 'SESSION'), None)
if session is None:
    raise SystemExit('compiled config does not define SESSION')
local['kv_namespaces'] = [{'binding': 'SESSION', 'id': 'f2a-local-session'}]
local['dev'] = {'ip': '127.0.0.1', 'local_protocol': 'http'}
out = Path('dist/server/wrangler.f2a.workerd.json')
out.write_text(json.dumps(local, indent=2) + '\n')
print(json.dumps({'configPath': str(out), 'bindings': ['ASSETS local', 'SESSION local'], 'removed': ['CONTACT_KV', 'EMAIL', 'CONTACT_DB', 'AI', 'ASK_LIMIT', 'ADMIN_LIMIT', 'previews/remote bindings']}, indent=2))
