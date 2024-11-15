import Diagram from "@/components/diagram";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import ViewRaffles from "@/components/view-raffles";
// import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row m-5">
        <NeonGradientCard className="text-left max-w-[400px] m-1">
          <div className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#800080] from-35% to-[#595959] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            the worlds fairest raffle machine
          </div>
          <div className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#800080] from-35% to-[#595959] bg-clip-text text-md font-bold leading-normal tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            (it&apos;s true - you can look at the code yourself)
          </div>
        </NeonGradientCard>

        <Diagram />
      </div>

      <div className="my-3" />

      <ViewRaffles />
    </div>
  );
}
