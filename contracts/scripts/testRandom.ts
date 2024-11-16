import { ethers, ignition } from "hardhat";
import MatesRaffleModule from "../ignition/modules/MatesRaffle";

async function main() {
  const [signer] = await ethers.getSigners();

  const { MatesRaffle } = await ignition.deploy(MatesRaffleModule);

  const pythFee = await MatesRaffle.getPythFee();

  console.log(ethers.formatEther(pythFee));

  const tx = await MatesRaffle.connect(
    signer,
    // @ts-expect-error
  ).requestRandomnessFromTheOracles({ value: pythFee });

  console.log(tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
