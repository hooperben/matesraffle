import { ethers, ignition } from "hardhat";
import MatesRaffleModule from "../ignition/modules/MatesRaffle";

async function main() {
  const [signer] = await ethers.getSigners();

  const { MatesRaffle } = await ignition.deploy(MatesRaffleModule);

  console.log(await MatesRaffle.getAddress());
  const chainlinkRandom = await MatesRaffle.lastRequestId();

  console.log(chainlinkRandom);

  const request = await MatesRaffle.chainLinkRequests(chainlinkRandom);

  console.log(request);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
