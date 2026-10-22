#!/usr/bin/env bash
# Ejecutar desde la raíz del repositorio. No despliega ni indexa URLs.
set -u
export ASTRO_TELEMETRY_DISABLED=1
export XDG_CONFIG_HOME=/tmp/mal-aliento-config
export npm_config_cache=/tmp/mal-aliento-npm-cache
export WRANGLER_SEND_METRICS=false
OUT=docs/contenido/mal-aliento-perros-viejos/qa/checks
mkdir -p "$OUT"
RESULTS="$OUT/resultados.tsv"
printf 'check\texit_code\n' > "$RESULTS"
failures=0
run() {
  local label="$1"
  shift
  "$@" > "$OUT/$label.log" 2>&1
  local result=$?
  printf '%s\t%s\n' "$label" "$result" >> "$RESULTS"
  if [ "$result" -ne 0 ]; then failures=$((failures + 1)); fi
}
run sync npx --no-install astro sync
run specs node scripts/audit-specs-migracion.mjs --base origin/main
run check npx --no-install astro check
run tests npm test
run agent-offline bash -c 'node --test tests/agent-readiness/*.test.mjs'
run f3-generation bash -c 'node --test tests/agent-readiness/f3-*.test.mjs'
run negotiation node --import tsx --test tests/agent-readiness/negotiation.test.ts
run f3-runtime node --import tsx --test tests/agent-readiness/f3-runtime.test.ts
run build npx --no-install astro build
run inventory node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/mal-aliento-inventory
run discovery node scripts/agent-readiness/discovery.mjs check --build-dir dist
run projection node scripts/agent-readiness/projection.mjs check --build-dir dist
run agent-api node scripts/agent-readiness/agent-api.mjs check --build-dir dist
run routing node scripts/agent-readiness/projection.mjs check-routing --build-dir dist
run projection-growth node --test tests/agent-readiness/projection-growth.mjs
run projection-semantic node tests/agent-readiness/projection-semantic.mjs dist
run worker-types npx --no-install wrangler types --env-file wrangler-types.env --strict-vars=false
run worker-types-diff git diff --exit-code -- worker-configuration.d.ts
run worker-package npx --no-install wrangler deploy --config dist/server/wrangler.json --dry-run --outdir=/tmp/mal-aliento-worker-dry-run
cat "$RESULTS"
if [ "$failures" -gt 0 ]; then exit 1; fi
