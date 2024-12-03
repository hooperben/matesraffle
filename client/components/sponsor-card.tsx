// import Image from "next/image";
import { BoardItem, matesBallPrizes } from "@/app/constants/mates-ball-prizes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { InstagramButton } from "./instagram-button";
import { Input } from "./ui/input";

function BoardItemCard({ item }: { item: BoardItem }) {
  return (
    <Card className="flex flex-col max-h-[300px] w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex-grow">{item.sponsorName}</CardTitle>
        <InstagramButton handle={item.instagram} />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between">
        <div>
          <p className="text-muted-foreground mb-2">{item.description}</p>
          <ul className="list-disc list-inside">
            {item.prizes.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SponsorCard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrizes = matesBallPrizes.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.sponsorName.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.prizes.some((prize) =>
        prize.toLowerCase().includes(lowerCaseSearchTerm),
      ) ||
      item.instagram.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="container p-4 w-full">
      <Input
        type="text"
        placeholder="Search for a prize..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-wrap gap-2">
        {filteredPrizes.map((item) => (
          <BoardItemCard key={item.sponsorName} item={item} />
        ))}
      </div>
    </div>
  );
}

// export default function SponsorCard() {
//   return (
//     <div className="container p-4 w-full">
//       <div className="flex flex-wrap gap-2">
//         {matesBallPrizes.map((item) => (
//           <BoardItemCard key={item.sponsorName} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ImageWrapper({ imageUrl }: { imageUrl: string }) {
//   const [aspectRatio, setAspectRatio] = useState<number | null>(null)

//   useEffect(() => {
//     const img = new Image()
//     img.onload = () => {
//       setAspectRatio(img.width / img.height)
//     }
//     img.src = imageUrl
//   }, [imageUrl])

//   const imageClass = aspectRatio
//     ? aspectRatio > 1.2
//       ? "w-full h-auto"
//       : aspectRatio < 0.8
//       ? "w-auto h-48"
//       : "w-32 h-32 rounded-full"
//     : "w-32 h-32"

//   return (
//     <div className={`relative overflow-hidden ${imageClass}`}>
//       <Image
//         src={imageUrl}
//         alt="Logo"
//         fill
//         style={{ objectFit: "cover" }}
//         className={aspectRatio && aspectRatio >= 0.8 && aspectRatio <= 1.2 ? "rounded-full" : ""}
//       />
//     </div>
//   )
// }
