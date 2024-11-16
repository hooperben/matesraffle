/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "./ui/neon-gradient-card";
import { raffles } from "@/app/constants/launch-raffles";

const RaffleCard = ({ pubKey }: { pubKey: string }) => {
  const raffle = raffles[pubKey] || { errorFindingRaffle: true };

  const router = useRouter();

  return (
    <NeonGradientCard className="w-[90vw] h-[14vh] my-2">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <div className="text-xl">{raffle.name}</div>
          <div className="text-sm">Organised by {raffle.organiser.name}</div>
        </div>
        <Button onClick={() => router.push(`/raffles/${raffle.pubKey}`)}>
          Browse Raffle
        </Button>
      </div>
    </NeonGradientCard>
  );
};

export default RaffleCard;
