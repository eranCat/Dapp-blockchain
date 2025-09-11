// hardhat.config.ts
// English-only comments
import type { HardhatUserConfig } from "hardhat/config";
import { configVariable } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import hardhatKeystore from "@nomicfoundation/hardhat-keystore"; // enables `hardhat keystore ...`

const config: HardhatUserConfig = {
    solidity: "0.8.24",

    networks: {
        // In-memory local network (v3 discriminator)
        hardhat: { type: "edr-simulated" },

        // JSON-RPC network (Sepolia)
        sepolia: {
            type: "http",
            url: configVariable("SEPOLIA_RPC_URL"),
            // Option A: secure from keystore (recommended)
            accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
            // Option B (alternative): use node-provided accounts
            // accounts: "remote",
        },
    },

    // With the v3 toolbox you can omit target here
    typechain: {
        outDir: "typechain-types",
        // target: "ethers-v6" // remove if your types complain
    },

    test: { mocha: { timeout: 200_000 } },
};

export default config;
