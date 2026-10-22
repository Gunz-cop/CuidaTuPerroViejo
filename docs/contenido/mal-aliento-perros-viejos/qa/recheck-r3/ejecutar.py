"""Comprobaciones de producción tras la corrección puntual R3; no auditoría."""
from pathlib import Path
import os, subprocess, sys
out=Path(__file__).resolve().parent
repo=out.parents[4]
env=os.environ.copy()
env.update(ASTRO_TELEMETRY_DISABLED='1',XDG_CONFIG_HOME='/tmp/mal-aliento-config',npm_config_cache='/tmp/mal-aliento-npm-cache',WRANGLER_SEND_METRICS='false')
checks=[
 ('tono',['python3','.agents/skills/references/scripts/tono.py','src/content/blog/mal-aliento-perros-viejos.mdx']),
 ('check',['npx','--no-install','astro','check']),
 ('build',['npx','--no-install','astro','build']),
 ('discovery',['node','scripts/agent-readiness/discovery.mjs','check','--build-dir','dist']),
 ('projection',['node','scripts/agent-readiness/projection.mjs','check','--build-dir','dist']),
 ('agent-api',['node','scripts/agent-readiness/agent-api.mjs','check','--build-dir','dist']),
 ('semantic',['node','tests/agent-readiness/projection-semantic.mjs','dist']),
]
rows=['check\texit_code'];failed=False
for name,cmd in checks:
 p=subprocess.run(cmd,cwd=repo,env=env,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
 (out/f'{name}.log').write_text('\n'.join(x.rstrip() for x in p.stdout.splitlines()).rstrip()+'\n')
 rows.append(f'{name}\t{p.returncode}');print(rows[-1],flush=True)
 if p.returncode:failed=True;break
(out/'resultados.tsv').write_text('\n'.join(rows)+'\n')
sys.exit(1 if failed else 0)
