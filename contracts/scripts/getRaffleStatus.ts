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

  const raffle = await contract.raffles(publicRoundId);

  console.log(raffle);

  const pythRequest = await contract.pythRequests(BigInt(116346));
  console.log(pythRequest);

  const CL = await contract.chainLinkRequests(
    "0x2e3196da3b68aa887d769c934937225d5666a5d67f04f07055cc0a35916625b1",
  );
  console.log(CL);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
