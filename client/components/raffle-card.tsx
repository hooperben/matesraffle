/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const RaffleCard = ({ raffle }: { raffle: any }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div>{raffle.id}</div>

      <div>{raffle.pubKey}</div>
      <div>{raffle.timestamp}</div>

      <Button onClick={() => router.push(`/raffles/${raffle.id}`)}>
        Have a Look
      </Button>
    </div>
  );
};

export default RaffleCard;
