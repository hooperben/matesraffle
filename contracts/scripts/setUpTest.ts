import { ethers, ignition } from "hardhat";
import MatesRaffleModule from "../ignition/modules/MatesRaffle";
import { MatesRaffle__factory } from "../typechain-types";
import MatesRaffle from "../MatesRaffle.json";

async function main() {
  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    MatesRaffle.address,
    MatesRaffle__factory.abi,
    signer,
  );

  const secret = ethers.toUtf8Bytes(process.env.TEST_SECRET!);
  const publicRoundId = ethers.keccak256(secret);

  console.log(secret);
  console.log(publicRoundId);

  const tx = await contract.createRaffle(publicRoundId, [1, 2]);
  await tx.wait();

  console.log("createRound:", tx);
  console.log("created round: ", publicRoundId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
