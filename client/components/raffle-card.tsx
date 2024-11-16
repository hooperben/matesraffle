/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "./ui/neon-gradient-card";

const RaffleCard = ({ raffle }: { raffle: any }) => {
  const router = useRouter();

  return (
    <NeonGradientCard className="w-[90vw] h-[10vh]">
      <div>{raffle.id}</div>

      <div>{raffle.pubKey}</div>
      <div>{raffle.timestamp}</div>

      <Button onClick={() => router.push(`/raffles/${raffle.id}`)}>
        Have a Look
      </Button>
    </NeonGradientCard>
  );
};

export default RaffleCard;
