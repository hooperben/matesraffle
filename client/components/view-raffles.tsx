"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { RainbowButton } from "./ui/rainbow-button";
import { motion } from "framer-motion";

const raffles = [{ name: "Mojito with Ben" }, { name: "Mates Ball 2024" }];

const RaffleCard = ({ name }: { name: string }) => (
  <figure
    className={cn(
      "relative cursor-pointer overflow-auto rounded-xl border p-4",
      // light styles
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      // dark styles
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{name}</p>
      </div>
    </div>
  </figure>
);

const ViewRaffles = () => {
  return (
    <div className="w-full max-w-[100vw]">
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div className="mx-5 text-2xl text-left font-bold tracking-[-0.02em] text-black dark:text-white">
          Current Raffles
        </div>
      </motion.div>
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <div>
          <Marquee pauseOnHover className="[--duration:20s]">
            {raffles.map((raffle) => (
              <RaffleCard key={raffle.name} {...raffle} />
            ))}
          </Marquee>
        </div>

        <div className="flex flex-row justify-end mr-2">
          <RainbowButton>View All Raffles</RainbowButton>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewRaffles;
