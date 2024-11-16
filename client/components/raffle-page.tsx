/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

const RafflePage = ({ raffle }: { raffle: any }) => {
  const router = useRouter();

  const [passCode, setPassCode] = useState("");

  return (
    <div className="flex flex-col justify-start">
      <Button
        variant="ghost"
        className="text-sm mb-2 font-bold w-[100px] ml-2"
        onClick={() => router.push("/raffles")}
      >
        {"< "}Back to raffles
      </Button>
      <NeonGradientCard className="w-[90vw] h-[80vh]">
        <CardContent className="min-h-[55vh] p-0">
          <div className="mb-4">
            <strong>The Prize{raffle.prizes.length > 1 && "s"}:</strong>
            <ul>
              {raffle.prizes.map((prize: any, index: any) => (
                <li key={index}>{prize}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>The Rule{raffle.rules.length > 1 && "s"}:</strong>
            <ul>
              {raffle.rules.map((prize: any, index: any) => (
                <li key={index}>{prize}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="w-full p-0">
          <div className="flex flex-col  w-full">
            <div className="flex flex-col">
              <strong>Get your ticket:</strong>

              <Input
                type="text"
                placeholder="Pass Code"
                value={passCode}
                onChange={(e) => setPassCode(e.target.value)}
              />
              <motion.div
                className="my-3 flex flex-row justify-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <Button
                  onClick={() => console.log("getting ticket")}
                  disabled={passCode.length !== 6}
                  className="flex justify-end"
                >
                  Get a ticket
                </Button>
              </motion.div>
            </div>
            <div className="mb-4 flex w-full justify-end">
              <p>
                <span>Organised by </span>{" "}
                <a
                  href={raffle.organiser.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]"
                >
                  {raffle.organiser.name}
                </a>
              </p>
            </div>
          </div>
        </CardFooter>
      </NeonGradientCard>
    </div>
  );
};

export default RafflePage;
