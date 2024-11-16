/* eslint-disable @typescript-eslint/no-explicit-any */

export const raffles: Record<string, any> = {
  // MOJITO LOTTERY
  "0x6fed660e5cf819c33356393ec03480b839e78af7a0ff0f4d163045bbfc798d3d": {
    pubKey:
      "0x6fed660e5cf819c33356393ec03480b839e78af7a0ff0f4d163045bbfc798d3d",
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
    accessCode: process.env.MOJITO_CODE,
  },
  // LUCKIEST MAN ALIVE
  "0xc5186d960bd03ff22cf62e88e39ff901a07d3fd83bc499f945d6a031608b1dc0": {
    pubKey:
      "0xc5186d960bd03ff22cf62e88e39ff901a07d3fd83bc499f945d6a031608b1dc0",
    name: "Luckiest Man Alive",
    prizes: ["Potential Glory"],
    rules: ["This is a test"],
    thumbnail: "",
    organiser: {
      name: "Ben",
      twitter: "https://x.com/0xbenhooper",
    },
    accessCode: process.env.TEST_CODE,
  },
};
