import RafflePage from "@/components/raffle-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pubKey = (await params).id;

  return (
    <div className="flex flex-col w-full">
      <RafflePage pubKey={pubKey} />
    </div>
  );
}
