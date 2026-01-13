# Aether — Overview

Aether is a Base-aligned project designed around a **read-only philosophy**:
it inspects onchain state without performing transactions.

---

## Design Goals

- **Base-first**: primary targets are Base Mainnet and Base Sepolia.
- **Configuration-driven**: network metadata lives in `base.networks.json`.
- **Read-only by default**: operations are limited to state queries.
- **Deterministic validation**: repeatable checks using stable sample inputs.

---

## Read-only Philosophy

Allowed:
- Read balances (native + ERC-20)
- Fetch latest block number
- Inspect contract bytecode presence
- Read token metadata (symbol/decimals)

Not in scope (core):
- Sending transactions
- Signing messages as a required workflow
- Private key custody / wallet management
- Any write-path that mutates state

---

## Network Configuration

All RPC endpoints, chainIds, and explorer URLs are centralized in:
- `base.networks.json`

This prevents hardcoded network constants spread across the codebase.

---

_Last updated: initial scaffold_
