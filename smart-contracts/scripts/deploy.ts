import { network } from "hardhat";
import fs from "fs";

const { ethers } = await network.connect({
  network: "bscTestnet",
  chainType: "l1",
});

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  const initialSupply = ethers.parseUnits("1000", 18); // 1000 tokens

  // Get the contract factory
  const Lottery = await ethers.getContractFactory("Lottery");

  // Deploy the contract
  const lottery = await Lottery.deploy(initialSupply);
  await lottery.waitForDeployment();

  const lotteryAddress = lottery.target;

  console.log("🎉 Lottery deployed to:", lotteryAddress);

  // Save the address for the frontend
  const outDir = "../frontend/public/abi";

  fs.writeFileSync(
    `${outDir}/lottery-address.json`,
    JSON.stringify({ Lottery: lotteryAddress }, null, 2)
  );

  console.log("💾 Address saved to", `${outDir}/lottery-address.json`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
