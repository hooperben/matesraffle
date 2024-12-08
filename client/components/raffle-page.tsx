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
import RaffleTicketPage from "./raffle-ticket-page";

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

      <div className="flex flex-row w-full justify-between px-4">
        <h1 className="text-3xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
          Mates Ball
        </h1>
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

      <div className="flex flex-col gap-2 p-4">
        <p className="max-w-full">
          This raffle has finished! The random value was determined{" "}
          <a
            href="https://basescan.org/tx/0x261d28c33d6165586b75f0f04d008ba31f6e1a76d1f7a7753421070f4082730f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            here
          </a>
          , and is{" "}
          <span className="break-all">
            56093042333888854496960980005796909012463336905912674227018052980723384806848.
          </span>
        </p>
        <p>Winners will be contacted for delivery of prizes shortly!</p>
      </div>

      {!addingTeammate && !sellingTicket && (
        <Tabs
          defaultValue={
            (localStorage && localStorage.getItem("selectedTab")) || "account"
          }
          className="w-full"
          onValueChange={(value) =>
            localStorage && localStorage.setItem("selectedTab", value)
          }
        >
          <div>
            <TabsList className="mt-2 ml-4">
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              {userRaffleData &&
                (userRaffleData.isRaffleAdmin ||
                  userRaffleData.isRaffleSalesPerson) && (
                  <TabsTrigger value="management">Manage</TabsTrigger>
                )}
            </TabsList>
          </div>

          <TabsContent value="prizes">
            <SponsorCard />
          </TabsContent>

          <TabsContent value="tickets">
            <RaffleTicketPage pubKey={pubKey} />
          </TabsContent>

          <TabsContent value="management">
            {userRaffleData && (
              <div className="flex justify-end gap-1 px-4">
                {userRaffleData?.isRaffleAdmin && (
                  <Button
                    onClick={() => handleButton("teammate")}
                    className="text-xs w-[100px]"
                  >
                    Add Teammate
                  </Button>
                )}

                {userRaffleData?.isRaffleSalesPerson && (
                  <Button
                    onClick={() => handleButton("ticket")}
                    className="text-xs w-[100px]"
                  >
                    Sell Ticket
                  </Button>
                )}
              </div>
            )}
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
