/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "./ui/neon-gradient-card";

const RaffleCard = ({ pubKey, name }: { pubKey: string; name: string }) => {
  const router = useRouter();

  return (
    <NeonGradientCard className="md:w-[60vw] w-[90vw] h-[14vh] my-2">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <div className="text-xl">{name}</div>
        </div>
        <Button onClick={() => router.push(`/raffles/${pubKey}`)}>
          Browse Raffle
        </Button>
      </div>
    </NeonGradientCard>
  );
};

export default RaffleCard;
