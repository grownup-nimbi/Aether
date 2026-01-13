# Aether

## Overview

Aether is a read-only inspection utility built specifically for the Base ecosystem. It is designed to help developers validate network connectivity, inspect wallet and contract state, and confirm testnet deployments on Base Sepolia without performing any state-changing operations.

The tool focuses on clarity, safety, and transparency, making it suitable for early-stage testing, tooling validation, and account abstraction exploration.

---

## Built for Base

- Designed for **Base Sepolia** testnet workflows  
- Compatible with Base tooling and account abstraction concepts  
- Uses official Coinbase and Base SDKs  
- Explorer-first approach using Basescan for verification  

All interactions are strictly read-only.

---

## What Aether Does

### Network Validation
- Confirms active connection to Base Sepolia  
- Displays chainId and RPC context  
- Retrieves latest block and gas information  

### Wallet Inspection
- Connects via Coinbase Wallet SDK  
- Reads wallet balance and transaction count  
- Detects whether an address contains contract bytecode  

### Contract Probing
- Checks deployed bytecode at known testnet addresses  
- Generates direct Basescan links for deployment and code verification  
- Executes optional raw `eth_call` selector reads without ABI usage  

---

## How It Works

Aether connects to Coinbase Wallet using the Coinbase Wallet SDK and communicates with Base Sepolia through standard JSON-RPC calls via `viem`.  

The script gathers:
- Wallet balance and nonce  
- Block metadata (number, timestamp, gas usage)  
- Contract bytecode presence  
- Optional read-only selector outputs  

No transactions are signed or broadcast at any point.

---

## Repository Structure

### Core
- **app/aether.ts**  
  Main executable script responsible for all read-only inspection logic.

### Contracts
- **contracts/**  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - `mapp.sol` - a Solidity contract focused on mappings (key–value storage).
  - `error.sol` - a Solidity contract focused on error handling.

### Configuration
- **config/**  
  - `base.networks.json` - RPC endpoints, chainIds, and explorer references  

### Scripts
- **scripts/**  
  - `deploy-contracts.sh` - helper for deploying contracts to Base Sepolia  
  - `sample-addresses.json` - known addresses used during validation  

### Documentation
- **docs/**  
  - `overview.md` - design goals and read-only philosophy  
  - `aa-notes.md`- notes on Base account abstraction terminology  

### Metadata
- **package.json** - dependency manifest  
- **LICENSE** - MIT license  
- **README.md** - project documentation  

---

## Usage Notes

- Intended for **inspection and validation**, not execution  
- Safe to run multiple times with no onchain impact  
- Designed to complement Base account abstraction workflows  
- All output includes direct Basescan links for independent verification  

---

## Author

- GitHub: https://github.com/grownup-nimbi
  
- Email: grownup-nimbi.0v@icloud.com
  
- Public contact: https://x.com/nilagda7ifw 

---

## License

MIT License

---

## Testnet Deployment (Base Sepolia)

These deployments are used to validate Base tooling and confirm correct read-only behavior prior to any Base Mainnet usage.

**Network:** Base Sepolia  
**chainId (decimal):** 84532  
**Explorer:** https://sepolia.basescan.org  

### Contract mapp.sol
Address:  
0x0ca20E3E0b09Bae19001c0f289e86CFBDF3E1911 

Deployment and verification:
- https://sepolia.basescan.org/address/0x0ca20E3E0b09Bae19001c0f289e86CFBDF3E1911
- https://sepolia.basescan.org/0x0ca20E3E0b09Bae19001c0f289e86CFBDF3E1911/0#code  

### Contract error.sol
Address:  
0xea4E768aEFA7911d3fec2C7196647db5D743aafD

Deployment and verification:
- https://sepolia.basescan.org/address/0xea4E768aEFA7911d3fec2C7196647db5D743aafD
- https://sepolia.basescan.org/0xea4E768aEFA7911d3fec2C7196647db5D743aafD/0#code  


These Base Sepolia deployments provide a controlled environment for validating Base SDKs, account abstraction flows, and read-only onchain interactions.
