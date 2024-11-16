/* eslint-disable @typescript-eslint/no-explicit-any */
import RaffleCard from "@/components/raffle-card";
import axios from "axios";

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
  const raffles = await getRaffles();
  const formattedRaffles =
    raffles?.map((raffle: any) => ({
      id: raffle.id,
      pubKey: raffle.pubKey,
      timestamp: new Date(raffle.blockTimestamp * 1000).toLocaleString(),
    })) || [];

  return (
    <div className="flex flex-col p-5 gap-2">
      <div className="text-4xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Mates Raffles
      </div>

      {formattedRaffles.map((raffle: any) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
