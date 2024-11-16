import { ethers } from "hardhat";
import fs from "fs";
import { MatesRaffle__factory } from "../typechain-types";

async function main() {
  const [signer] = await ethers.getSigners();
  const MatesRaffle = await ethers.deployContract("MatesRaffle");
  await MatesRaffle.waitForDeployment();

  const address = await MatesRaffle.getAddress();
  console.log("MatesRaffle deployed to:", address);

  // Write deployment info to file
  const deploymentInfo = {
    address: address,
    deployer: signer.address,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    "./MatesRaffle.json",
    JSON.stringify(deploymentInfo, null, 2),
  );

  fs.writeFileSync(
    "./MatesRaffleABI.json",
    JSON.stringify(MatesRaffle__factory.abi, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
