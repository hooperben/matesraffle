/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RaffleDetails {
  createdAt: string;
  name: string;
  rafflePubKey: string;
  updatedAt: string;
  isRaffleAdmin?: boolean;
  isRaffleSalesPerson?: boolean;
  tickets?: any[]; // TODO fix
}

export const useRaffleInformation = (raffleId: string) => {
  const fetchUser = async () => {
    const dynamicJwtToken = getAuthToken();

    const { data } = await axios.get<RaffleDetails>(
      `/api/raffles?raffleId=${raffleId}`,
      {
        headers: {
          Authorization: dynamicJwtToken
            ? `Bearer ${dynamicJwtToken}`
            : undefined,
        },
      },
    );
    return data;
  };

  const userQuery = useQuery({
    queryKey: ["user-raffle-info", raffleId],
    queryFn: fetchUser,
  });

  return userQuery;
};
