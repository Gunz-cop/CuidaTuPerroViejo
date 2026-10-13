#!/bin/bash
# Uso: with-workerd.sh <port> <comando...>   (@BASE@ en los argumentos = URL local)
# Levanta un workerd nuevo con dist/server/wrangler.json, ejecuta el comando con
# BASE=http://127.0.0.1:<port> y lo para (por grupo de procesos) al terminar.
set -u
port=$1; shift
state=$(mktemp -d)
setsid npx --no-install wrangler dev --config dist/server/wrangler.json --local --ip 127.0.0.1 --port "$port" --inspector-port $((port + 1000)) --persist-to "$state" > "$state/wrangler.log" 2>&1 &
pid=$!
for _ in $(seq 1 90); do
  curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$port/" | grep -q 200 && break
  sleep 1
done
args=()
for a in "$@"; do args+=("${a//@BASE@/http://127.0.0.1:$port}"); done
"${args[@]}"
rc=$?
kill -9 -- "-$pid" 2>/dev/null
sleep 1
exit $rc
