#!/bin/zsh
set -e

PROJECT_DIR="${0:A:h}"
cd "$PROJECT_DIR"

if [[ ! -d node_modules ]]; then
  echo "Installing local dependencies…"
  npm install
fi

LOCAL_IP="$(ipconfig getifaddr en0 2>/dev/null || true)"

echo ""
echo "Inventions is starting."
echo "This Mac: http://localhost:3000"
if [[ -n "$LOCAL_IP" ]]; then
  echo "Local network: http://${LOCAL_IP}:3000"
fi
echo "Press Control-C to stop."
echo ""

npm run dev:lan
