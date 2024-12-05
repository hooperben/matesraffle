/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import Image from "next/image";
import { useUserRaffleTickets } from "@/hooks/use-user-raffle-tickets";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";

const RAFFLE_AMOUNT_TO_ID = {
  2: "44629787902108",
  5: "44630763372700",
  10: "44630765863068",
  25: "44630765928604",
};

const Tickets = ({
  userTickets,
  isLoading,
}: {
  userTickets: any[]; // TODO improve
  isLoading: boolean;
}) =>
  isLoading ? (
    <div className="flex flex-row gap-2 p-4">
      <Skeleton className="w-[160px] h-[160px]" />
      <Skeleton className="w-[160px] h-[160px]" />
    </div>
  ) : (
    userTickets.map((ticket) => (
      <div className="flex flex-wrap justify-center gap-4 p-4" key={ticket._id}>
        <div
          key={ticket._id}
          className="flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Image
            src={`/ticket-logos/mb-${ticket.amount}.svg`}
            alt={`${ticket.amount} Tickets`}
            className="w-32 h-32 mb-4 rounded"
            width={32}
            height={32}
          />
          <p>{ticket.amount} Tickets</p>
        </div>
      </div>
    ))
  );
const RaffleTicketPage = ({ pubKey }: { pubKey: string }) => {
  const { user } = useDynamicContext();

  const { data: userTickets, isLoading: isLoadingUserTickets } =
    useUserRaffleTickets(pubKey);

  useEffect(() => {
    console.log(userTickets);
  }, [userTickets]);

  const handleOnClick = (id: string) => {
    const url = `https://tickets.matesball.com/cart/${id}:1${
      user?.email ? `?checkout[email]=${user.email}` : ""
    }`;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <h1 className="font-bold text-xl">Purchase Tickets</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(RAFFLE_AMOUNT_TO_ID).map(([amount, id]) => (
          <div
            key={id}
            className="flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <Image
              src={`/ticket-logos/mb-${amount}.svg`}
              alt={`${amount} Tickets`}
              className="w-32 h-32 mb-4 rounded"
              width={32}
              height={32}
            />
            <Button className="px-4  rounded" onClick={() => handleOnClick(id)}>
              Buy {amount} Tickets
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 mt-2">
        <h1 className="font-bold text-xl">Your Tickets</h1>
        {!user && (
          <p>
            Log in with your email you purchased your tickets with to view your
            tickets
          </p>
        )}

        <Tickets
          userTickets={(userTickets && userTickets) || []}
          isLoading={isLoadingUserTickets}
        />

        {userTickets && userTickets.length === 0 && (
          <>
            <p>You haven&apos;t purchased any tickets yet.</p>
            <p>
              If you purchased a ticket using the above, it takes a little bit
              to come through.
            </p>
            <p>
              If you have any questions, message{" "}
              <a
                href="https://www.instagram.com/mates.ball/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @mates.ball
              </a>{" "}
              on Instagram.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RaffleTicketPage;
