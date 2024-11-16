import { ethers, ignition } from "hardhat";
import MatesRaffleModule from "../ignition/modules/MatesRaffle";
import axios from "axios";

export const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/95008/matesraffle/version/latest";

export const pythReceivedsQuery = `
query {
  pythReceiveds(first: 10) {
    transactionHash
    requestId
    randomValue
  }
}
`;

async function main() {
  const response = await axios.post(
    SUBGRAPH_URL,
    {
      query: pythReceivedsQuery,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = response.data;
  console.log("PythReceived events:", data.data.pythReceiveds);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
