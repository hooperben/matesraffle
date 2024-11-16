/* eslint-disable @typescript-eslint/no-explicit-any */
import RaffleCard from "@/components/raffle-card";
import axios from "axios";
import { raffles } from "../constants/launch-raffles";

const pythReceivedsQuery = `
  query {
    mrRaffleCreateds(orderBy: blockTimestamp) {
      id
      pubKey
      blockTimestamp
    }
  }
`;

async function getRaffles() {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    {
      query: pythReceivedsQuery,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = response.data.data; // this is dumb

  return data.mrRaffleCreateds;
}

export default async function Home() {
  const deployedRaffles = await getRaffles();

  const formattedRaffles = deployedRaffles
    ?.map((raffle: any) => raffles[raffle.pubKey])
    .filter((raffle: any) => raffle !== undefined);

  return (
    <div className="flex flex-col p-5 gap-2">
      <div className="text-4xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Mates Raffles
      </div>

      {formattedRaffles.length === 0 && (
        <div className="text-xl">
          Apologies compadre, no raffles available at this hour.
        </div>
      )}

      {formattedRaffles.map((raffle: any) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
