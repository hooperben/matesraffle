"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ShimmerButton from "./ui/shimmer-button";
import { useRouter } from "next/navigation";
import { raffles } from "@/app/constants/launch-raffles";

const RaffleCard = ({ id, name }: { id: string; name: string }) => {
  const router = useRouter();

  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-auto rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
      onClick={() => router.push(`/raffles/${id}`)}
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
};
const ViewRaffles = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[100vw] gap-2">
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div className="mb-3 mx-5 text-2xl text-left font-bold tracking-[-0.02em] text-black dark:text-white">
          Current Raffles
        </div>
      </motion.div>
      <motion.div
        className="my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <div>
          <Marquee pauseOnHover className="[--duration:20s]">
            {Object.entries(raffles).map(([key, value]) => {
              return <RaffleCard key={value.name} name={value.name} id={key} />;
            })}
          </Marquee>
        </div>

        <div className="flex flex-row justify-start ml-2 my-3">
          <ShimmerButton
            shimmerColor="#ff00aa"
            onClick={() => router.push("/raffles")}
          >
            View All Raffles
          </ShimmerButton>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewRaffles;
