# TeaToken (ERC-20) — Hardhat 3 + TypeScript

A minimal ERC-20 token project using **Hardhat 3**, **TypeScript**, and the official **hardhat-ethers** plugin. The plugin exposes an `ethers` object **on each network connection** (HH3 style), which is what the deploy & console examples use. ([npm][1])

## Prerequisites

* Node.js 18+ and npm
* Hardhat & the ethers plugin installed in this repo:

  ```bash
  npm i -D hardhat @nomicfoundation/hardhat-ethers
  npm i ethers
  ```

  The plugin integrates ethers.js into Hardhat and adds `ethers` to each network connection. ([npm][1])

## Project layout

```
contracts/
  TeaToken.sol
scripts/
  deploy.ts
hardhat.config.ts
tsconfig.json
```

## Compile

```bash
npx hardhat compile
```

## Deploy (local, in-process network)

Use the HH3 plugin pattern (`network.connect()` then destructure `ethers`):

```ts
// scripts/deploy.ts
import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", await deployer.getAddress());

  const token = await ethers.deployContract("TeaToken"); // or getContractFactory if you prefer
  await token.waitForDeployment();

  console.log("TeaToken:", await token.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
```

Run it:

```bash
npx hardhat run scripts/deploy.ts
```

You should see something like:

```
Deploying with: 0xf39F...2266
TeaToken: 0x5FbDB2...0aa3
```

The 20 unlocked local accounts (each with 10,000 ETH) are provided by Hardhat Network by default. ([Hardhat][2])

## (Optional) Run a persistent local node

If you want the chain to keep state between commands:

```bash
npx hardhat node
# in another terminal:
npx hardhat run scripts/deploy.ts --network localhost
```

Hardhat Network exposes an RPC and the same 20 funded accounts when you run a node. ([Hardhat][2])

## Interact in the Hardhat console

```bash
npx hardhat console
```

```ts
const { ethers } = await network.connect();
const addr = "0x...your deployed token address...";
const tea = await ethers.getContractAt("TeaToken", addr);
await tea.name();          // "Tea Token"
await tea.symbol();        // "TEA"
(await tea.totalSupply()).toString();
```

`getContractAt`, `getContractFactory`, `getSigners`, and `deployContract` are provided by the hardhat-ethers plugin. ([npm][1])

## Deploy to a testnet (example: Sepolia)

1. Add a network to `hardhat.config.ts` (use env vars for secrets):

```ts
import { HardhatUserConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : []
    }
  },
  plugins: [hardhatEthers],
};
export default config;
```

2. Deploy:

```bash
SEPOLIA_RPC_URL=https://... \
DEPLOYER_PRIVATE_KEY=0xabc... \
npx hardhat run scripts/deploy.ts --network sepolia
```

## Notes on ERC-20 + Permit (OZ v5)

If you enabled **EIP-2612 permit** (gasless approvals) in your token, the correct import in OpenZeppelin **v5** is:

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
```

(OZ v5 exposes `ERC20Permit` directly; older v4 projects used `draft-ERC20Permit.sol`.) ([OpenZeppelin Docs][3])

## Troubleshooting

* **`Property 'ethers' does not exist on type 'HardhatRuntimeEnvironment'`**
  Make sure the plugin is installed and registered. With Hardhat 3, import the plugin and **add it to the `plugins` array**, then access `ethers` via `const { ethers } = await network.connect()`:

  ```ts
  import hardhatEthers from "@nomicfoundation/hardhat-ethers";
  export default { plugins: [hardhatEthers] };
  ```

  Example usage is shown in the plugin README. ([npm][1])

* **Local accounts & funds**
  If you don’t see funds or accounts: remember Hardhat Network provides **20 unlocked accounts with 10,000 ETH each** by default. ([Hardhat][2])

* **Script style**
  When deploying from scripts in HH3+TS, you can use `ethers.deployContract("YourContract")` or `getContractFactory("YourContract").deploy(...)`. Both are documented in the plugin README. ([npm][1])

## References

* **hardhat-ethers plugin (v4) — install, `plugins` array, `network.connect()`, `deployContract`, `getSigners`, etc.** ([npm][1])
* **Hardhat docs — config & default accounts (20 accounts, 10,000 ETH each)** ([Hardhat][2])
* **Deploying via Hardhat scripts (Ignition + scripts guide)** — general script guidance. ([Hardhat][4])
* **OpenZeppelin Contracts v5 — ERC-20 API & `ERC20Permit`** (correct import in v5). ([OpenZeppelin Docs][3])