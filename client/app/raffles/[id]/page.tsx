/* eslint-disable @typescript-eslint/no-unused-vars */
import { raffles } from "@/app/constants/launch-raffles";
import RafflePage from "@/components/raffle-page";

const isRaffleAdminOrSalesPerson = async () => {};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pubKey = (await params).id;

  return (
    <div className="flex flex-col m-5 w-full">
      <RafflePage pubKey={pubKey} />
    </div>
  );
}
