import { ethers, ignition } from "hardhat";
import MatesRaffleModule from "../ignition/modules/MatesRaffle";
import { MatesRaffle__factory } from "../typechain-types";

async function main() {
  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    "0x1656725E557137cFB077DA7F4602fd3d27024edC",
    MatesRaffle__factory.abi,
    signer,
  );

  const secret = ethers.toUtf8Bytes("12412123412");
  const publicRoundId = ethers.keccak256(secret);

  let tx;
  tx = await contract.createRaffle(publicRoundId, [1, 2]);
  await tx.wait();

  console.log("createRound:", tx);
  console.log("created round: ", publicRoundId);

  // buying a ticket
  const ticketHolder = "0x405338F496D665C821518107895F0b9639Fde789";
  tx = await contract.buyTickets(publicRoundId, ticketHolder, 1);
  await tx.wait();
  console.log("buy ticket: ", tx);

  console.log("ticket holder: ", ticketHolder, " bought ticket");

  const pythFee = await contract.getPythFee();
  console.log(ethers.formatEther(pythFee));

  tx = await contract.beginDrawRaffle(publicRoundId, { value: pythFee });
  console.log("requesting randomness", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
