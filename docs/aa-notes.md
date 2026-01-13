# Aether — AA Notes (Account Abstraction)

Quick notes mapping Base account abstraction terminology to practical meaning.

---

## Key Terms

### EOA
Externally Owned Account (a “normal” wallet address controlled by a private key).
- Signs transactions directly.
- No programmable logic at the account level.

### Smart Account
A contract-based account that can implement custom validation/execution logic.
- May support batching, session keys, or recovery patterns.
- Usually interacts with an **EntryPoint**-style flow in AA systems.

### Bundler
A service that aggregates user operations (or similar intents) and submits them onchain.
- In practice: improves UX by abstracting some transaction plumbing.

### Paymaster
A component that can sponsor gas or enforce policy for transactions/user operations.
- Used for “gasless” UX patterns (still requires policy + security design).

---

## Practical Validation Notes (Read-only)

Even if the project stays read-only, AA concepts matter because addresses may be:
- EOA (no code at address)
- Smart account (contract code present)

Suggested checks:
- `eth_getCode(address)` to detect smart accounts
- Always treat “address type” as unknown unless checked

---

## Design Principle

Aether should **not assume wallet type**.
Use read-only detection and configuration-driven network metadata.

---

_Last updated: initial scaffold_
