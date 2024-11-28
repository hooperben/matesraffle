import RafflePage from "@/components/raffle-page";

export default function Page({ params }: { params: { id: string } }) {
  const pubKey = params.id;

  return (
    <div className="flex flex-col w-full">
      <RafflePage pubKey={pubKey} />
    </div>
  );
}
