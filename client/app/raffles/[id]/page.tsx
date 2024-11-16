/* eslint-disable @typescript-eslint/no-unused-vars */
import { raffles } from "@/app/constants/launch-raffles";
import RafflePage from "@/components/raffle-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pubKey = (await params).id;

  const raffle = raffles[pubKey];
  return (
    <div className="flex flex-col m-5">
      <div className="text-5xl font-bold mb-2">{raffle.name}</div>

      <RafflePage pubKey={pubKey} />
    </div>
  );
}
