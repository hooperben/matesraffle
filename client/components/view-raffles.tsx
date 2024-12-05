"use client";

import { motion } from "framer-motion";
import ShimmerButton from "./ui/shimmer-button";
import { useRouter } from "next/navigation";

const ViewRaffles = () => {
  const router = useRouter();

  return (
    <div>
      <motion.div
        className="flex flex-col w-full items-center text-center gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <ShimmerButton
          className="max-w-[200px]"
          shimmerColor="#ff00aa"
          onClick={() => router.push("/raffles")}
        >
          View All Raffles
        </ShimmerButton>
      </motion.div>
    </div>
  );
};

export default ViewRaffles;
