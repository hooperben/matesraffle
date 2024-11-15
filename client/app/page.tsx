import Banner from "@/components/banner";
import Diagram from "@/components/diagram";
import ViewRaffles from "@/components/view-raffles";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row m-5">
        <Banner />
        <Diagram />
      </div>

      <div className="my-3" />

      <ViewRaffles />
    </div>
  );
}
