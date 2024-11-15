"use client";

import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: 0.1 }}
    >
      <NeonGradientCard className="text-left max-w-[400px] m-1">
        <div className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#800080] from-35% to-[#595959] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          the worlds fairest raffle machine
        </div>
        <div className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#800080] from-35% to-[#595959] bg-clip-text text-md font-bold leading-normal tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          (it&apos;s true - you can look at the code if you want)
        </div>
      </NeonGradientCard>
    </motion.div>
  );
};

export default Banner;
