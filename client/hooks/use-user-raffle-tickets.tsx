import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserRaffleTickets = (raffleId: string) => {
  const { user } = useDynamicContext();

  const getTickets = async () => {
    try {
      const dynamicJwtToken = getAuthToken();

      const { data } = await axios.get(
        `/api/users/tickets?raffleId=${raffleId}`,
        {
          headers: {
            Authorization: `Bearer ${dynamicJwtToken}`,
          },
        },
      );

      return data.userTickets;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const queryFn = useQuery({
    queryKey: ["user-raffle", raffleId, user],
    queryFn: getTickets,
    enabled: !!user,
  });

  return queryFn;
};
