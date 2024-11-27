import { getAuthToken } from "@dynamic-labs/sdk-react-core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

interface TeammateDetails {
  email: string;
  name: string;
  isAdmin: boolean;
}

export const useAddTeammate = (
  raffleId: string,
  teammateDetails: TeammateDetails,
) => {
  const { toast } = useToast();

  const addTeammate = async () => {
    const dynamicJwtToken = getAuthToken();

    const response = await axios.post(
      "/api/teammates",
      {
        raffleId: raffleId,
        email: teammateDetails.email,
        name: teammateDetails.name,
        isAdmin: teammateDetails.isAdmin,
      },
      {
        headers: {
          Authorization: `Bearer ${dynamicJwtToken}`,
        },
      },
    );

    console.log(response);
  };

  const mutationFn = useMutation({
    mutationFn: addTeammate,
    mutationKey: ["add-team", raffleId],
    onSuccess: () => {
      toast({
        title: "Team mate added successfully!",
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
