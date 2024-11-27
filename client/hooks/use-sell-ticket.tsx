import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import axios from "axios";
import { getAuthToken } from "@dynamic-labs/sdk-react-core";

export interface TicketDetails {
  name: string;
  email: string;
  amount: string;
  cost: string;
}

export const useSellTicket = (
  rafflePubKey: string,
  ticketDetails: TicketDetails,
) => {
  const { toast } = useToast();

  const sellTicket = async () => {
    const dynamicJwtToken = getAuthToken();

    await axios.post(
      "/api/tickets",
      {
        raffleId: rafflePubKey,
        name: ticketDetails.name,
        email: ticketDetails.email,
        amount: ticketDetails.amount,
        cost: ticketDetails.cost,
      },
      {
        headers: {
          Authorization: `Bearer ${dynamicJwtToken}`,
        },
      },
    );
  };

  const mutationFn = useMutation({
    mutationFn: sellTicket,
    mutationKey: ["record-raffle-ticket", rafflePubKey],
    onSuccess: () => {
      toast({
        title: "Ticket Purchase Recorded!",
        duration: 500,
      });
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return mutationFn;
};
