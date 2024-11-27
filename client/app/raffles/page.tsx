/* eslint-disable @typescript-eslint/no-explicit-any */
import RaffleCard from "@/components/raffle-card";
import Raffle from "@/lib/models/raffle";

async function getRaffles() {
  const raffles = await Raffle.find().sort({ createdAt: -1 }).limit(5);

  return raffles;
}

export default async function Home() {
  const deployedRaffles = await getRaffles();

  return (
    <div className="flex flex-col p-5 gap-2">
      <div className="text-4xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Mates Raffles
      </div>

      {deployedRaffles.length === 0 && (
        <div className="text-xl">
          Apologies compadre, no raffles available at this hour.
        </div>
      )}

      {deployedRaffles.map((raffle: any) => (
        <RaffleCard
          key={raffle.rafflePubKey}
          name={raffle.name}
          pubKey={raffle.rafflePubKey}
        />
      ))}
    </div>
  );
}
