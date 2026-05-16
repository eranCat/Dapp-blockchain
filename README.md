# ⛓️ Dapp Blockchain

A decentralized application (DApp) built on Ethereum using Solidity smart contracts, Hardhat development framework, and TypeScript.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Smart Contracts | Solidity |
| Dev Framework | Hardhat |
| Language | TypeScript |
| Testing | Hardhat Test (Chai/Mocha) |
| Network | Ethereum (local + testnet) |

## Features

- **Smart contract development** — Solidity contracts with full test coverage
- **Local blockchain** — Hardhat Network for fast local development
- **TypeScript scripts** — typed deployment and interaction scripts
- **Contract artifacts** — ABI + bytecode generated on compile
- **Testnet ready** — configurable for Sepolia, Goerli or mainnet

## Project Structure

```
├── contracts/         # Solidity smart contracts
├── scripts/           # Deployment & interaction scripts
├── artifacts/         # Compiled contract ABIs and bytecode
├── hardhat.config.ts  # Hardhat configuration
└── tsconfig.json      # TypeScript config
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/eranCat/Dapp-blockchain.git
cd Dapp-blockchain
npm install
```

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy Locally

```bash
# Start local node
npx hardhat node

# In another terminal
npx hardhat run scripts/deploy.ts --network localhost
```

### Deploy to Testnet

```bash
# Add your private key and RPC URL to .env
npx hardhat run scripts/deploy.ts --network sepolia
```

### Environment Variables

```env
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
```

> ⚠️ Never commit your private key. Use `.env` and ensure it's in `.gitignore`.

## Author

**Eran Karaso** — [Portfolio](https://erancat.github.io/portfolio-site) · [GitHub](https://github.com/eranCat)
