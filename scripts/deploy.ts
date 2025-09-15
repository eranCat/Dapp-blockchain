import { network } from "hardhat";

async function main() {
    const { ethers } = await network.connect();

    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    const Token = await ethers.getContractFactory("TeaToken", deployer);
    const token = await Token.deploy();
    await token.waitForDeployment();
    console.log("TeaToken:", await token.getAddress());
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
