/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRaffleInformation } from "@/hooks/use-raffle-information";
import { useEffect, useState } from "react";
import AddTeammate from "./add-teammate";
import SellTicket from "./sell-ticket";
import TicketTable from "./ticket-table";
import { useTicketDetails } from "@/hooks/use-ticket-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SponsorCard from "./sponsor-card";

const RafflePage = ({ pubKey }: { pubKey: string }) => {
  const { user } = useDynamicContext();

  const [addingTeammate, setAddingTeammate] = useState(false);
  const [sellingTicket, setSellingTicket] = useState(false);

  const {
    data: userRaffleData,
    // isLoading: isLoadingUserRaffleData,
    refetch: refetchRaffleInfo,
  } = useRaffleInformation(pubKey);

  const {
    data: ticketData,
    // isLoading: isLoadingTicketData,
    refetch: refetchTicketData,
  } = useTicketDetails(pubKey);

  // if the user object changes, refresh raffle info
  useEffect(() => {
    refetchRaffleInfo();
    refetchTicketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- as intended
  }, [user]);

  useEffect(() => {
    console.log(userRaffleData);
    console.log(ticketData);
  }, [userRaffleData, ticketData]);

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
        {/* {isLoadingUserRaffleData && <Skeleton className="w-[200px] h-[40px]" />} */}
      </div>

      <div className="flex flex-row w-full justify-between">
        <h1 className="text-3xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
          Mates Ball
        </h1>
        {userRaffleData && (
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
        )}
      </div>

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

      {!addingTeammate && !sellingTicket && (
        <Tabs
          defaultValue={localStorage.getItem("selectedTab") || "account"}
          className="w-full"
          onValueChange={(value) => localStorage.setItem("selectedTab", value)}
        >
          <div>
            {ticketData ? (
              <TabsList className="mt-2 ml-5">
                <TabsTrigger value="account">Prizes</TabsTrigger>
                <TabsTrigger value="password">Tickets</TabsTrigger>
                {/* TODO add in the raffles.raffleManagers array to the team members page */}
                {/* <TabsTrigger value="teammates">Team Mates</TabsTrigger> */}
              </TabsList>
            ) : (
              <h1 className="text-xl font-bold mt-2 ml-5">Prizes</h1>
            )}
          </div>

          <TabsContent value="account">
            <SponsorCard />
          </TabsContent>

          <TabsContent value="password">
            <TicketTable raffleId={pubKey} />
          </TabsContent>

          {/* <TabsContent value="teammates">
            <TicketTable raffleId={pubKey} />
          </TabsContent> */}
        </Tabs>
      )}
    </div>
  );
};

export default RafflePage;
