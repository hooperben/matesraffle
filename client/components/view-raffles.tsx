"use client";

import { motion } from "framer-motion";
import ShimmerButton from "./ui/shimmer-button";
import { useRouter } from "next/navigation";

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
        {/* <div>
          <Marquee pauseOnHover className="[--duration:20s]">
            {Object.entries(raffles).map(([key, value]) => {
              return <RaffleCard key={value.name} name={value.name} id={key} />;
            })}
          </Marquee>
        </div> */}

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
