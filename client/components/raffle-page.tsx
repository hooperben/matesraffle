/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRaffleInformation } from "@/hooks/use-raffle-information";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import AddTeammate from "./add-teammate";
import SellTicket from "./sell-ticket";

const RafflePage = ({ pubKey }: { pubKey: string }) => {
  const router = useRouter();

  const { user } = useDynamicContext();

  const [addingTeammate, setAddingTeammate] = useState(false);
  const [sellingTicket, setSellingTicket] = useState(false);

  const {
    data: userRaffleData,
    isLoading: isLoadingUserRaffleData,
    refetch: refetchRaffleInfo,
  } = useRaffleInformation(pubKey);

  // if the user object changes, refresh it
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

  return (
    <div className="flex flex-col w-full">
      {isLoadingUserRaffleData && <Skeleton className="w-[200px] h-[40px]" />}

      {userRaffleData && (
        <div className="flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-xl">{userRaffleData.name}</h1>

            <div className="flex gap-2">
              {userRaffleData?.isRaffleAdmin && (
                <Button onClick={() => handleButton("teammate")}>
                  Add Teammate
                </Button>
              )}

              {userRaffleData?.isRaffleSalesPerson && (
                <Button onClick={() => handleButton("ticket")}>
                  Sell Ticket
                </Button>
              )}
            </div>
          </div>

          {addingTeammate && <AddTeammate />}

          {sellingTicket && <SellTicket />}
        </div>
      )}
    </div>
  );
};

export default RafflePage;
