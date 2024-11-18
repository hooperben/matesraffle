import { ethers } from "hardhat";
import { Contract } from "ethers";
import { MatesRaffleDev, MatesRaffleDev__factory } from "../typechain-types";

const TestSuite = async () => {
  const Signers = await ethers.getSigners();
  const MatesRaffleDeployment = await ethers.deployContract("MatesRaffleDev");
  await MatesRaffleDeployment.waitForDeployment();

  const MatesRaffleDeploymentAddress = MatesRaffleDeployment.target;

  console.log(MatesRaffleDeploymentAddress);

  const MatesRaffle: MatesRaffleDev = new Contract(
    MatesRaffleDeploymentAddress,
    MatesRaffleDev__factory.abi,
    Signers[0],
  ) as unknown as MatesRaffleDev;

  return { MatesRaffle, MatesRaffleDeployment, Signers };
};

export { TestSuite };
