"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import Image from "next/image";

const RAFFLE_AMOUNT_TO_ID = {
  2: "44629787902108",
  5: "44630763372700",
  10: "44630765863068",
  25: "44630765928604",
};

const RaffleTicketPage = () => {
  const { user } = useDynamicContext();

  const handleOnClick = (id: string) => {
    const url = `https://fufcdf-0j.myshopify.com/cart/${id}:1${
      user?.email ? `?checkout[email]=${user.email}` : ""
    }`;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <h1>Purchase Tickets</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(RAFFLE_AMOUNT_TO_ID).map(([amount, id]) => (
          <div
            key={id}
            className="flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <Image
              src={`/ticket-logos/mb-${amount}.svg`}
              alt={`${amount} Tickets`}
              className="w-32 h-32 mb-4"
              width={32}
              height={32}
            />
            <Button
              className="w-full px-4 py- rounded"
              onClick={() => handleOnClick(id)}
            >
              Buy {amount} Tickets
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaffleTicketPage;
