/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "./ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRaffleInformation } from "@/hooks/use-raffle-information";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import AddTeammate from "./add-teammate";
import SellTicket from "./sell-ticket";
import TicketTable from "./ticket-table";

const RafflePage = ({ pubKey }: { pubKey: string }) => {
  const { user } = useDynamicContext();

  const [addingTeammate, setAddingTeammate] = useState(false);
  const [sellingTicket, setSellingTicket] = useState(false);

  const {
    data: userRaffleData,
    isLoading: isLoadingUserRaffleData,
    refetch: refetchRaffleInfo,
  } = useRaffleInformation(pubKey);

  // if the user object changes, refresh raffle info
  useEffect(() => {
    refetchRaffleInfo();
  }, [user, refetchRaffleInfo]);

  useEffect(() => {
    console.log(userRaffleData);
  }, [userRaffleData]);

  const handleButton = (buttonName: string) => {
    if (buttonName === "teammate") {
      setSellingTicket(false);
      setAddingTeammate(true);
    }
    if (buttonName === "ticket") {
      setAddingTeammate(false);
      setSellingTicket(true);
    }
  };

  const handleSuccessfulTicketSale = async () => {
    setSellingTicket(false);
    await refetchRaffleInfo();
  };

  return (
    <div className="flex flex-col m-4">
      {isLoadingUserRaffleData && (
        <div className="flex flex-col">
          <Skeleton className="w-[200px] h-[40px]" />
          <Skeleton className="w-full h-[400px] mt-8" />
        </div>
      )}

      {userRaffleData && (
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-3xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
            {userRaffleData.name}
          </h1>

          <div className="flex gap-2">
            {userRaffleData?.isRaffleAdmin && (
              <Button
                onClick={() => handleButton("teammate")}
                className="text-xs"
              >
                Add Teammate
              </Button>
            )}

            {userRaffleData?.isRaffleSalesPerson && (
              <Button
                onClick={() => handleButton("ticket")}
                className="text-xs"
              >
                Sell Ticket
              </Button>
            )}
          </div>
        </div>
      )}

      {userRaffleData && !addingTeammate && !sellingTicket && (
        <TicketTable raffleId={pubKey} />
      )}

      {addingTeammate && <AddTeammate />}

      {sellingTicket && (
        <SellTicket
          handleSuccessfulTicketSale={handleSuccessfulTicketSale}
          raffleId={pubKey}
        />
      )}
    </div>
  );
};

export default RafflePage;
