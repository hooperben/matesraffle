/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "./ui/button";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRaffleInformation } from "@/hooks/use-raffle-information";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import AddTeammate from "./add-teammate";
import SellTicket from "./sell-ticket";
import TicketTable from "./ticket-table";
import { useTicketDetails } from "@/hooks/use-ticket-details";

const RafflePage = ({ pubKey }: { pubKey: string }) => {
  const { user } = useDynamicContext();

  const [addingTeammate, setAddingTeammate] = useState(false);
  const [sellingTicket, setSellingTicket] = useState(false);

  const {
    data: userRaffleData,
    isLoading: isLoadingUserRaffleData,
    refetch: refetchRaffleInfo,
  } = useRaffleInformation(pubKey);

  const { isLoading: isLoadingTicketData, refetch: refetchTicketData } =
    useTicketDetails(pubKey);

  // if the user object changes, refresh raffle info
  useEffect(() => {
    refetchRaffleInfo();
    refetchTicketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- as intended
  }, [user]);

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
    await refetchTicketData();
  };

  const handleSuccessfulTeammateAdd = async () => {
    setAddingTeammate(false);
  };

  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col">
        {isLoadingUserRaffleData && <Skeleton className="w-[200px] h-[40px]" />}
      </div>

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

      <div className="flex flex-col">
        {isLoadingTicketData && <Skeleton className="w-full h-[400px] mt-8" />}
      </div>

      {userRaffleData && !addingTeammate && !sellingTicket && (
        <TicketTable raffleId={pubKey} />
      )}

      {addingTeammate && (
        <AddTeammate
          handleSuccessfulTeammateAdd={handleSuccessfulTeammateAdd}
          raffleId={pubKey}
        />
      )}

      {sellingTicket && (
        <SellTicket
          handleSuccessfulTicketSale={handleSuccessfulTicketSale}
          raffleId={pubKey}
        />
      )}

      {!user && (
        <div className="flex flex-col">
          <p>Please login to view raffle details</p>
          <DynamicWidget />
        </div>
      )}
    </div>
  );
};

export default RafflePage;
