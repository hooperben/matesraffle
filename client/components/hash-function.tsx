"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded border-2 bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:shadow-[0_0_20px_-12px_rgba(255,255,255,0.8)] dark:border-border",
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export const MultipleHashes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const i0 = useRef<HTMLDivElement>(null);
  const hashI0 = useRef<HTMLDivElement>(null);
  const o0 = useRef<HTMLDivElement>(null);

  const i1 = useRef<HTMLDivElement>(null);
  const hashI1 = useRef<HTMLDivElement>(null);
  const o1 = useRef<HTMLDivElement>(null);

  const iN = useRef<HTMLDivElement>(null);
  const hashIN = useRef<HTMLDivElement>(null);
  const oN = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.3 }}
      className="text-left m-1 h-full relative flex w-full md:w-[60%] mx-auto items-center justify-center bg-background py-2"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-h-[200px] items-stretch justify-between gap-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <Circle ref={i0} className="text-sm w-[80px]">
            i0
          </Circle>
          <Circle ref={hashI0} className="text-sm w-[100px]">
            hash(i0)
          </Circle>
          <Circle ref={o0} className="text-sm w-[80px]">
            o0
          </Circle>
        </div>

        <AnimatedBeam containerRef={containerRef} fromRef={i0} toRef={hashI0} />
        <AnimatedBeam containerRef={containerRef} fromRef={hashI0} toRef={o0} />

        <div className="flex flex-row items-center justify-between">
          <Circle ref={i1} className="text-sm w-[80px]">
            i1
          </Circle>
          <Circle ref={hashI1} className="text-sm w-[100px]">
            hash(i1)
          </Circle>
          <Circle ref={o1} className="text-sm w-[80px]">
            o1
          </Circle>
        </div>

        <AnimatedBeam containerRef={containerRef} fromRef={i1} toRef={hashI1} />
        <AnimatedBeam containerRef={containerRef} fromRef={hashI1} toRef={o1} />

        <div className="flex text-xl w-full justify-center">...</div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={iN} className="text-sm w-[80px]">
            iN
          </Circle>
          <Circle ref={hashIN} className="text-sm w-[100px]">
            hash(iN)
          </Circle>
          <Circle ref={oN} className="text-sm w-[80px]">
            oN
          </Circle>
        </div>

        <AnimatedBeam containerRef={containerRef} fromRef={iN} toRef={hashIN} />
        <AnimatedBeam containerRef={containerRef} fromRef={hashIN} toRef={oN} />
      </div>
    </motion.div>
  );
};

const HashFunction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.3 }}
      className="relative flex w-full md:w-[60%] mx-auto items-center justify-center bg-background py-2"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-h-[200px] items-stretch justify-between ">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="text-sm w-[80px]">
            input
          </Circle>
          <Circle ref={div3Ref} className="text-sm w-[100px]">
            hash(input)
          </Circle>
          <Circle ref={div2Ref} className="text-sm w-[80px]">
            output
          </Circle>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div3Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div2Ref}
        />
      </div>
    </motion.div>
  );
};

export default HashFunction;
