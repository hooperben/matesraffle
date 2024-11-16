/* eslint-disable @typescript-eslint/no-unused-vars */
import RafflePage from "@/components/raffle-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;

  const mojitoRaffleFund = {
    name: "Mojito Fund",
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
