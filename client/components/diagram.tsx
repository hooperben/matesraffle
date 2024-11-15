"use client";

import Image from "next/image";
import OrbitingCircles from "./ui/orbiting-circles";
import WordPullUp from "./ui/word-pull-up";
import { RainbowButton } from "./ui/rainbow-button";
import { motion } from "framer-motion";

const Diagram = () => {
  return (
    <div className="max-w-[400px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background"
      >
        <OrbitingCircles
          className="size-[25px] border-none bg-transparent"
          duration={20}
          delay={7}
          radius={80}
        >
          <Image src="/chainlink.png" alt="LINK" height={35} width={35} />
        </OrbitingCircles>

        <OrbitingCircles
          className="size-[25px] border-none bg-transparent"
          duration={20}
          delay={13}
          radius={80}
        >
          <Image src="/chronicle.png" alt="LINK" height={35} width={35} />
        </OrbitingCircles>

        <OrbitingCircles
          className="size-[25px] border-none bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <Image src="/pyth.png" alt="LINK" height={35} width={35} />
        </OrbitingCircles>
      </motion.div>

      <WordPullUp
        className="mx-5 text-2xl text-right font-bold tracking-[-0.02em] text-black dark:text-white"
        words="Fair distributions, secured by verifiable randomness."
      />

      <motion.div
        className="flex justify-end my-2 mr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <RainbowButton>How does it work?</RainbowButton>
      </motion.div>
    </div>
  );
};

export default Diagram;
