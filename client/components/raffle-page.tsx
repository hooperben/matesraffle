/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import {
  DynamicWidget,
  useDynamicContext,
  getAuthToken,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { raffles } from "@/app/constants/launch-raffles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import confetti from "canvas-confetti";
import { Skeleton } from "./ui/skeleton";

const RafflePage = ({ pubKey }: { pubKey: string }) => {
  const raffle = raffles[pubKey] || { errorFindingRaffle: true };

  const router = useRouter();

  const [passCode, setPassCode] = useState("");

  const { user } = useDynamicContext();

  const userWallets = useUserWallets();

  const ownerTicketsBought = (owner: string) => `
query {
  ticketBoughts(where: {owner: "${owner}"}) {
    raffle
    owner
    amount
  }
}
`;

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const { data: ticketsBought, isLoading: isLoadingTicketStatus } = useQuery({
    queryKey: ["raffleDetails", pubKey],
    enabled: !!user && userWallets.length > 0,
    queryFn: async () => {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
        {
          query: ownerTicketsBought(userWallets[0].address),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data.data; // this is dumb
      return (
        data.ticketBoughts.filter((raffle: any) => raffle.raffle === pubKey) ||
        []
      );
    },
    refetchInterval: 60000,
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutateAsync: getTicketAsync, isPending: isGettingTicket } =
    useMutation({
      mutationFn: async () => {
        setErrorMessage(undefined);
        const dynamicJwtToken = getAuthToken();

        const request = await axios.put("/api/tickets", {
          raffle,
          passCode,
          dynamicJwtToken,
        });
        console.log(request);
      },
      onError: (err: any) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message ?? "Something went wrong");
      },
      onSuccess: () => {
        setOpenSuccess(true);
        handleConfetti();
      },
    });

  return (
    <>
      <Dialog open={openSuccess} onOpenChange={() => setOpenSuccess(false)}>
        <DialogContent className="flex w-full flex-col overflow-hidden rounded-lg border bg-background min-h-[300px]">
          <div className="flex flex-col">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              {raffle.name} Ticket Secured!
            </span>
            <div className="flex text-md justify-center text-center w-[100%]">
              <p className="mt-4">
                Keep an eye out for winner announcements shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col justify-start">
        <Button
          variant="ghost"
          className="text-sm mb-2 font-bold w-[100px] ml-2"
          onClick={() => router.push("/raffles")}
        >
          {"< "}Back to raffles
        </Button>

        {raffle.errorFindingRaffle && <div>Raffle Not Found</div>}
        {raffle && !raffle.errorFindingRaffle && (
          <NeonGradientCard className="md:w-[60vw] w-[90vw] h-[90vh] my-2">
            <CardTitle></CardTitle>
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
                {isLoadingTicketStatus && (
                  <Skeleton className="h-[20px] w-[200px]" />
                )}

                <div className="min-h-[150px]">
                  {ticketsBought && ticketsBought.length > 0 ? (
                    <div className="text-2xl">
                      ✅ You&apos;ve secured your ticket.
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="flex flex-col"
                    >
                      <strong>Get your ticket:</strong>

                      <p>You need a code to get a ticket in this raffle.</p>

                      <Input
                        type="text"
                        placeholder="Pass Code"
                        value={passCode}
                        onChange={(e) => setPassCode(e.target.value)}
                      />

                      <motion.div
                        className="my-3 flex flex-col text-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      >
                        {!user ? (
                          <DynamicWidget />
                        ) : (
                          <Button
                            onClick={() => getTicketAsync()}
                            disabled={
                              passCode.length !== 6 ||
                              isGettingTicket ||
                              openSuccess
                            }
                            className="flex"
                          >
                            {isGettingTicket && (
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Get my ticket
                          </Button>
                        )}
                        <div className="text-red-500 text-sm text-center my-2">
                          {errorMessage && errorMessage}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
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
        )}
      </div>
    </>
  );
};

export default RafflePage;
