import type { HardhatUserConfig } from "hardhat/config";
import { configVariable } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import "@nomicfoundation/hardhat-ethers";
import hardhatKeystore from "@nomicfoundation/hardhat-keystore";
import hardhatEthersPlugin from "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    plugins: [hardhatKeystore, hardhatEthersPlugin],
    networks: {
        // In-memory local network (v3 discriminator)
        hardhat: { type: "edr-simulated" },

        // JSON-RPC network (Sepolia)
        sepolia: {
            type: "http",
            url: configVariable("SEPOLIA_RPC_URL"),
            accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
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
