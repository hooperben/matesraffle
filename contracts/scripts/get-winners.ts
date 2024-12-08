import { ethers } from "hardhat";
import { MatesRaffle, MatesRaffle__factory } from "../typechain-types";
import MatesRaffle from "../MatesRaffle.json";
import { keccak256, toUtf8Bytes } from "ethers";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log(signer.address);

  // we create our array of tickets

  const raffleSecret = "12341244124";
  const secret = ethers.toUtf8Bytes(raffleSecret);

  // Recreate the solidity keccak256(abi.encodePacked(commitReveal)) in TypeScript
  const reconstructedPubKey = keccak256(secret);
  console.log("Reconstructed pubkey:", reconstructedPubKey);

  const pubKey = keccak256(secret);

  console.log(pubKey);

  const contract = new ethers.Contract(
    "0xf15e5046B79F6e55469CA72a58D85C46ed039ef6",
    MatesRaffle__factory.abi,
    signer,
  ) as unknown as MatesRaffle;

  // CREATE_RAFFLE_TX
  // const tx = await contract.createRaffle(pubKey, 31, true);
  // await tx.wait();

  // console.log("createRound:", tx);
  // console.log("created round: ", pubKey);

  const pythFee = await contract.getPythFee();
  console.log(ethers.formatEther(pythFee));

  // try {
  // const tx = await contract.beginDrawRaffle(pubKey, { value: pythFee });
  // await tx.wait();

  // } catch (error) {
  //   console.error("Transaction failed:", error);
  // }

  // console.log("begun raffle draw");

  const raffleDetails = await contract.raffles(pubKey);

  console.log(raffleDetails);

  console.log(pubKey);

  // const tx = await contract.settleRaffle(secret);
  // console.log(tx);

  const random = await contract.getRaffleRandomness(pubKey);
  console.log(random);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
