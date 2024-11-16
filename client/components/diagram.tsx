"use client";

import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import OrbitingCircles from "./ui/orbiting-circles";
import WordPullUp from "./ui/word-pull-up";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Diagram = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center max-w-[400px] m-1 h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="my-3 relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background"
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
        className="my-3 mx-5 text-2xl font-bold tracking-[-0.02em] text-black dark:text-white"
        words="Fair raffles, secured by verifiable randomness."
      />

      <motion.div
        className="my-3 flex flex-row justify-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <ShimmerButton
          onClick={() => router.push("/faqs")}
          className="flex justify-end"
        >
          What does this even mean?
        </ShimmerButton>
      </motion.div>
    </div>
  );
};

export default Diagram;
