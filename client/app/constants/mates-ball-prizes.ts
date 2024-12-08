export interface BoardItem {
  sponsorName: string;
  description: string;
  prizes: `${number} x ${string}`[];
  instagram: `@${string}`;
  hideInsta?: boolean;
  winners: string[];
  // imageUrl: string
}

export const matesBallPrizes: BoardItem[] = [
  {
    sponsorName: "Illuminair",
    description: "",
    prizes: ["1 x Set of Beechwood and Boar bristle hairbrushes"],
    instagram: "@Illuminair",
    hideInsta: true,
    winners: ["Jordan Blatchford"],
  },
  {
    sponsorName: "Suit Society",
    description: "",
    prizes: ["1 x $300 Voucher", "1 x $200 Voucher"],
    instagram: "@suitsociety",
    winners: ["Tom Proctor", "Sarah Clarke"],
  },
  {
    sponsorName: "Brisbane Roar",
    description: "",
    prizes: ["4 x Platinum Tickets to Brisbane Roar v Perth Glory on 21.12.24"],
    instagram: "@brisbaneroarfc",
    winners: ["James Grey"],
  },
  {
    sponsorName: "RLW Apparel",
    description: "",
    prizes: ["1 x RLW Apparel Shirt", "1 x RLW Apparel Shirt"],
    instagram: "@rlwapparel",
    winners: ["Will Baxter", "Mitchell"],
  },
  {
    sponsorName: "Dolphins NRL",
    description: "",
    prizes: ["1 x Dolphins Merchandise Package"],
    instagram: "@dolphinsnrl",
    winners: ["Georgia Haigh"],
  },
  {
    sponsorName: "Valley Hops Brewing",
    description: "",
    prizes: ["1 x $50 Voucher"],
    instagram: "@valleyhopsbrewing",
    winners: ["Ben Gun"],
  },
  {
    sponsorName: "Press Club",
    description: "",
    prizes: ["1 x Free Booth"],
    instagram: "@thepressclubbrisbane",
    winners: ["Bradley Piscioneri"],
  },
  {
    sponsorName: "Cloudland",
    description: "",
    prizes: ["1 x $50 Voucher"],
    instagram: "@cloudlandbrisbane",
    winners: ["Lauren Colwell"],
  },
  {
    sponsorName: "Science of Fitness",
    description: "",
    prizes: [
      "1 x 3 Month Membership Voucher (incl. a Thorough Initial Biomechanical Assessment",
    ],
    instagram: "@scienceoffitness",
    winners: ["Drew Boniface"],
  },
  {
    sponsorName: "TH7",
    description: "",
    prizes: ["1 x $150 Voucher"],
    instagram: "@th7.au",
    winners: ["Nick Crow"],
  },
  {
    sponsorName: "Boxer Brewing",
    description: "",
    prizes: ["1 x Mixed Carton of Beer"],
    instagram: "@boxerbrewingco",
    winners: ["Kieren Conway"],
  },
  {
    sponsorName: "Sirromet Wines",
    description: "",
    prizes: ["2 x Vineyard Selection Range 750ml"],
    instagram: "@sirrometwines",
    winners: ["Alyssa Mcconochie"],
  },
  {
    sponsorName: "CorePlus West End",
    description: "",
    prizes: [
      "1 x 6 month membership (including unlimited Mat Classes and 10 reformer classes per month)",
    ],
    instagram: "@coreplus_studios",
    winners: ["Riley Smith"],
  },
  {
    sponsorName: "Power Moves",
    description: "",
    prizes: ["1 x $270 Voucher"],
    instagram: "@powermoves_au",
    winners: ["Seb Ingold"],
  },
  {
    sponsorName: "Inspire Cycle Box",
    description: "",
    prizes: ["1 x 10 Classes Pack"],
    instagram: "@inspirecyclebox",
    winners: ["Liam Duffy"],
  },
  {
    sponsorName: "Urban Climb Milton",
    description: "",
    prizes: [
      "1 x Rope Gym Passes (2 Adults + Gear Hire)",
      "1 x Rope Gym Passes (2 Adults + Gear Hire)",
    ],
    instagram: "@urbanclimb",
    winners: ["Samantha Strachan", "Brady Day"],
  },
  {
    sponsorName: "Queensland Physio",
    description: "",
    prizes: [
      "2 x Pair of Archies (his and hers) + Free Initial Physio Assessment",
    ],
    instagram: "@qldphysio",
    winners: ["Ben Heinemann"],
  },
  {
    sponsorName: "Dewalt",
    description: "",
    prizes: ["1 x DEWALT x McLaren Limited Edition 18V XR Brushless Twin Kit"],
    instagram: "@dewalt_australia",
    winners: ["Kate Stanley"],
  },
  {
    sponsorName: "Big Boing",
    description: "",
    prizes: ["2 x 1-Hour Pass to Big Boing"],
    instagram: "@thebigboing",
    winners: ["Brad Canov"],
  },
  {
    sponsorName: "Australian Venue Co.",
    description: "",
    prizes: ["1 x $120 Voucher"],
    instagram: "@australianvenueco",
    winners: ["Hughston Parle"],
  },
  {
    sponsorName: "Fred's Forge",
    description: "",
    prizes: ["2 x Knives from Fred's Forge"],
    instagram: "@freds_forge",
    winners: ["Christopher Berndt"],
  },
  {
    sponsorName: "Victoria Park",
    description: "",
    prizes: ["1 x Family Putt Pass"],
    instagram: "@victoriapark",
    winners: ["Molly Matheson"],
  },
  {
    sponsorName: "CFENG Photography",
    description: "",
    prizes: ["1 x $150 Voucher"],
    instagram: "@cfengphotography",
    winners: ["Luke Miskimmin"],
  },
  {
    sponsorName: "Genesis Emerald",
    description: "",
    prizes: ["1 x Noosa Naked Package"],
    instagram: "@genesishairdesignemerald",
    winners: ["Finton"],
  },
  {
    sponsorName: "Australia Zoo",
    description: "",
    prizes: ["1 x Adopt an Animal Package"],
    instagram: "@australiazoo",
    winners: ["Dulan Dunn"],
  },
  {
    sponsorName: "Officer's Mess",
    description: "",
    prizes: ["1 x $150 Officer's Mess Voucher"],
    instagram: "@officersmess.au",
    winners: ["Jack Deon"],
  },
  {
    sponsorName: "Go To Skincare",
    description: "",
    prizes: ["1 x Go-to Skin Care Set", "1 x Bro-to Skin Care Set"],
    instagram: "@gotoskincare",
    winners: ["Terry Mallon", "Shane Elphick"],
  },
];
