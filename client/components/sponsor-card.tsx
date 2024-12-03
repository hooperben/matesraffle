// import Image from "next/image";
import { BoardItem, boardItems } from "@/app/constants/mates-ball-prizes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BoardItemCard({ item }: { item: BoardItem }) {
  return (
    <Card className="flex flex-col max-h-[300px] w-full">
      <CardHeader>
        <CardTitle>{item.sponsorName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-muted-foreground mb-2">{item.description}</p>
        <ul className="list-disc list-inside">
          {item.prizes.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function SponsorCard() {
  return (
    <div className="container p-4 w-full">
      <div className="flex flex-wrap gap-2">
        {boardItems.map((item) => (
          <BoardItemCard key={item.sponsorName} item={item} />
        ))}
      </div>
    </div>
  );
}

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
