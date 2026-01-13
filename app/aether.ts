// app/aether.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  createPublicClient,
  http,
  formatEther,
  isAddress,
  getAddress,
  hexToBigInt,
} from "viem";
import { baseSepolia } from "viem/chains";

const NETWORK = {
  label: "Base Sepolia",
  chainId: 84532,
  rpcUrl: "https://sepolia.base.org",
  explorer: "https://sepolia.basescan.org",
};

type Addr = `0x${string}`;

const sdk = new CoinbaseWalletSDK({
  appName: "Aether (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(NETWORK.rpcUrl),
});

function nowIso() {
  return new Date().toISOString();
}

function toAddr(v: string): Addr {
  if (!isAddress(v)) throw new Error(`Invalid address: ${v}`);
  return getAddress(v) as Addr;
}

async function connectWallet(): Promise<Addr> {
  const provider = sdk.makeWeb3Provider(NETWORK.rpcUrl, NETWORK.chainId);
  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];
  return toAddr(accounts[0]);
}

async function networkSnapshot() {
  const [block, gasPrice] = await Promise.all([
    client.getBlock(),
    client.getGasPrice(),
  ]);

  return {
    chainId: NETWORK.chainId,
    network: NETWORK.label,
    blockNumber: block.number,
    timestamp: block.timestamp,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
    gasPrice,
    blockUrl: `${NETWORK.explorer}/block/${block.number}`,
  };
}

async function inspectAddress(address: Addr) {
  const [balance, nonce, bytecode] = await Promise.all([
    client.getBalance({ address }),
    client.getTransactionCount({ address }),
    client.getBytecode({ address }),
  ]);

  return {
    address,
    balanceWei: balance,
    balanceEth: formatEther(balance),
    nonce,
    isContract: !!bytecode,
    explorerUrl: `${NETWORK.explorer}/address/${address}`,
  };
}

async function safeReadUint256(contract: Addr, selector4: Addr) {
  const data = (selector4.slice(0, 10) as unknown) as `0x${string}`;
  const out = await client.call({ to: contract, data });
  if (!out.data || out.data === "0x") return null;
  try {
    return hexToBigInt(out.data);
  } catch {
    return null;
  }
}

function printSection(title: string, lines: string[]) {
  const bar = "—".repeat(Math.max(12, title.length));
  console.log(`\n${title}\n${bar}`);
  for (const l of lines) console.log(l);
}

async function run() {
  console.log(`[${nowIso()}] Aether boot (read-only)`);
  console.log(`Network: ${NETWORK.label} | chainId: ${NETWORK.chainId}`);
  console.log(`RPC: ${NETWORK.rpcUrl}`);
  console.log(`Explorer: ${NETWORK.explorer}`);

  const wallet = await connectWallet();

  const [snap, walletReport] = await Promise.all([
    networkSnapshot(),
    inspectAddress(wallet),
  ]);

  printSection("Wallet context", [
    `Address: ${walletReport.address}`,
    `Balance: ${walletReport.balanceEth} ETH`,
    `Tx count: ${walletReport.nonce}`,
    `Contract: ${walletReport.isContract ? "yes" : "no"}`,
    `Explorer: ${walletReport.explorerUrl}`,
  ]);

  printSection("Network snapshot", [
    `Latest block: ${snap.blockNumber}`,
    `Timestamp: ${snap.timestamp}`,
    `Gas used / limit: ${snap.gasUsed} / ${snap.gasLimit}`,
    `Gas price: ${snap.gasPrice.toString()}`,
    `Block link: ${snap.blockUrl}`,
  ]);

  const testContracts: Addr[] = [
    "0x7cA1b2d3E4f5061728394aBcDeF0123456789aBc",
    "0x19f0A3bC4dE567890123456789aBCdEf01234567",
    "0xB4cD3eF0123456789aBCdEf019f0A3bC4dE56789",
  ].map(toAddr);

  for (const c of testContracts) {
    const rep = await inspectAddress(c);
    printSection("Testnet contract probe", [
      `Address: ${rep.address}`,
      `Has code: ${rep.isContract ? "yes" : "no"}`,
      `Balance: ${rep.balanceEth} ETH`,
      `Explorer: ${rep.explorerUrl}`,
      `Code tab: ${NETWORK.explorer}/${rep.address}/0#code`,
    ]);
  }

  const maybeTotalSupply = await safeReadUint256(
    testContracts[0],
    "0x18160ddd00000000000000000000000000000000000000000000000000000000"
  );

  printSection("Optional read-only selector check", [
    `Target: ${testContracts[0]}`,
    `Selector: 0x18160ddd (totalSupply())`,
    `Result: ${maybeTotalSupply === null ? "no data / not supported" : maybeTotalSupply.toString()}`,
    `Note: this is a raw eth_call; no ABI required.`,
  ]);

  printSection("Done", [
    "Read-only session completed.",
    "No transactions were signed or broadcast.",
  ]);
}

run().catch((e) => {
  console.error("Fatal error:", e?.message ?? e);
  process.exitCode = 1;
});
