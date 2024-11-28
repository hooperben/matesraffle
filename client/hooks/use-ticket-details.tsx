import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Ticket {
  userId: {
    name: string;
    email: string;
  };
  amount: string;
  cost: string;
  soldBy: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const useTicketDetails = (raffleId: string) => {
  const { user } = useDynamicContext();

  const getTickets = async () => {
    const dynamicJwtToken = getAuthToken();

    const { data } = await axios.get<Ticket[]>(
      `/api/tickets?raffleId=${raffleId}`,
      {
        headers: {
          Authorization: `Bearer ${dynamicJwtToken}`,
        },
      },
    );

    return data;
  };

  const queryFn = useQuery({
    queryFn: getTickets,
    queryKey: ["get-raffle-tickets", raffleId],
    enabled: !!user,
  });

  return queryFn;
};
