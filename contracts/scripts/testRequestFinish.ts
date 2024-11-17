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

  const bytes32Str = ethers.encodeBytes32String(process.env.TEST_SECRET!);
  const secret = ethers.toUtf8Bytes(bytes32Str);
  const publicRoundId = ethers.keccak256(secret);

  const pythFee = await contract.getPythFee();
  console.log(ethers.formatEther(pythFee));

  const tx = await contract.beginDrawRaffle(publicRoundId, { value: pythFee });
  console.log("requesting randomness", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
