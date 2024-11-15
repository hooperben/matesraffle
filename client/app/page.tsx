import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Home() {
  return (
    <div className="flex flex-col m-5">
      <NeonGradientCard className="text-left max-w-[400px] m-1">
        <div className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#800080] from-35% to-[#000000] bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          The Worlds Fairest Raffle Runner
        </div>
      </NeonGradientCard>

      <RainbowButton className="m-1">Browse Raffles</RainbowButton>
      <RainbowButton className="m-1">How does it work?</RainbowButton>
    </div>
  );
}
