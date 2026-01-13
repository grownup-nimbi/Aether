#!/usr/bin/env bash
set -euo pipefail

# Aether — deploy-contracts.sh
# Helper for deploying a contract to Base Sepolia using Foundry.
#
# Required env:
#   PRIVATE_KEY=0x...
#
# Optional env:
#   RPC_URL=https://sepolia.base.org
#   CHAIN_ID=84532
#   CONTRACT=src/BlockCounter.sol:BlockCounter

if [ -z "${PRIVATE_KEY:-}" ]; then
  echo "❌ PRIVATE_KEY not set"
  exit 1
fi

RPC_URL="${RPC_URL:-https://sepolia.base.org}"
CHAIN_ID="${CHAIN_ID:-84532}"
CONTRACT="${CONTRACT:-src/BlockCounter.sol:BlockCounter}"

echo "🚀 Aether deploy"
echo "   RPC     : $RPC_URL"
echo "   ChainId : $CHAIN_ID"
echo "   Contract: $CONTRACT"

forge create \
  --rpc-url "$RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --chain-id "$CHAIN_ID" \
  "$CONTRACT"

echo "✅ Deployment finished"
