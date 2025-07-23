const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying the contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const network = await hre.ethers.provider.getNetwork();
    console.log("Deploying contract to network:", network.name);

    console.log("\nDeploying TOKENICO contract...");
    const TokenICO = await hre.ethers.getContractFactory("TokenICO"); // remove space
    const tokenICO = await TokenICO.deploy();

    await tokenICO.deployed();
    console.log("\nDeployment Successful!");
    console.log("-----------------------------------------------------------------------------");
    console.log("\n NEXT_PUBLIC_TOKENICO_ADDRESS:", tokenICO.address);
    console.log("-----------------------------------------------------------------------------");
    console.log("\n NEXT_PUBLIC_TOKEN_ICO_OWNER:", deployer.address);

    console.log("\nDeploying LINKTUM contract...");
    const LINKTUM = await hre.ethers.getContractFactory("LINKTUM");
    const linktum = await LINKTUM.deploy();

    await linktum.deployed();
    console.log("\nDeployment Successful!");
    console.log("-----------------------------------------------------------------------------");
    console.log("\n NEXT_PUBLIC_LINKTUM_ADDRESS:", linktum.address);
    console.log("-----------------------------------------------------------------------------");
    console.log("\n NEXT_PUBLIC_LINKTUM_OWNER:", deployer.address);
}

// 💡 Move this outside the main() definition
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
