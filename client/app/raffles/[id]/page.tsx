/* eslint-disable @typescript-eslint/no-unused-vars */
import { raffles } from "@/app/constants/launch-raffles";
import RafflePage from "@/components/raffle-page";
import axios from "axios";

const raffleDataQuery = (raffle: string) => `
query {
  ticketBoughts(where: {raffle: "${raffle}"}) {
    raffle
    owner
    amount
  }
}
`;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pubKey = (await params).id;

  async function getRaffleDetails() {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
      {
        query: raffleDataQuery(pubKey.toString()),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data.data; // this is dumb
    console.log(data);
  }

  await getRaffleDetails();

  const raffle = raffles[pubKey];
  return (
    <div className="flex flex-col m-5">
      <div className="text-5xl font-bold mb-2">{raffle.name}</div>

      <RafflePage pubKey={pubKey} />
    </div>
  );
}
