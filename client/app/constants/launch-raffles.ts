/* eslint-disable @typescript-eslint/no-explicit-any */

export const raffles: Record<string, any> = {
  // MOJITO LOTTERY
  "0xf67c0fecd26402b98db7cadc1ab9f95107464100f3957f318a933637f5ebebbc": {
    name: "Mojito Lottery",
    prizes: ["1 Mojito"],
    rules: [
      "1 ticket per person",
      "Winner is emailed by organiser",
      "Raffle is Code Protected",
    ],
    thumbnail: "",
    organiser: {
      name: "Ben",
      twitter: "https://x.com/0xbenhooper",
    },
  },
  // LUCKIEST MAN ALIVE
  getHash: {
    name: "Luckiest Man Alive",
    prizes: ["Potential Glory"],
    rules: ["This is a test"],
    thumbnail: "",
    organiser: {
      name: "Ben",
      twitter: "https://x.com/0xbenhooper",
    },
  },
};
