/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const slug = (await params).id;

  async function getRaffleDetails() {
    console.log(process.env.NEXT_PUBLIC_SUBGRAPH_URL);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
      {
        query: raffleDataQuery(slug.toString()),
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

  const mojitoRaffleFund = {
    name: "Mojito Lottery",
    prizes: ["1 Mojito"],
    rules: [
      "1 ticket per person",
      "Winner is emailed by organiser",
      "Raffle is Code Protected",
    ],
    thumbnail: "",
    organiser: {
      name: "Ben",
      twitter: "https://x.com/0xbenhooper",
    },
  };

  const raffle = mojitoRaffleFund;

  return (
    <div className="flex flex-col m-5">
      <div className="text-5xl font-bold mb-2">{raffle.name}</div>

      <RafflePage raffle={raffle} />
    </div>
  );
}
