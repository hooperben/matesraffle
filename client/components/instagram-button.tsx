import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export const InstagramButton = ({ handle }: { handle: `@${string}` }) => {
  const openInstagram = () => {
    const username = handle.slice(1); // Remove the '@' from the handle
    window.open(`https://instagram.com/${username}`, "_blank");
  };

  return (
    <Button
      className="flex justify-center text-center"
      variant="ghost"
      onClick={openInstagram}
    >
      <Instagram className="h-4 w-4" />
      <p>{handle}</p>
    </Button>
  );
};
