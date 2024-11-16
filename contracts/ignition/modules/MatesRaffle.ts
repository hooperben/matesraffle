// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// npx hardhat ignition deploy ignition/modules/MatesRaffle.ts --network base

const MatesRaffleModule = buildModule("MatesRaffleModule", (m) => {
  const MatesRaffle = m.contract("MatesRaffle", []);

  return { MatesRaffle };
});

export default MatesRaffleModule;
