/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { NeonGradientCard } from "./ui/neon-gradient-card";
import { motion } from "framer-motion";

const RaffleCard = ({ pubKey, name }: { pubKey: string; name: string }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="text-left max-w-[400px] m-1 h-full"
    >
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
    </motion.div>
  );
};

export default RaffleCard;
