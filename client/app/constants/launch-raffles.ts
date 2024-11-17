/* eslint-disable @typescript-eslint/no-explicit-any */

export const raffles: Record<string, any> = {
  // MOJITO LOTTERY
  "0xa6817ee5de64d2a3120c09e8d78ca2065fa32e7dccc06662824492e329859a44": {
    pubKey:
      "0xa6817ee5de64d2a3120c09e8d78ca2065fa32e7dccc06662824492e329859a44",
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
  "0x0cc88f7d95d58f612494a2b7469a79178164001d6507a8012488013919a9626a": {
    pubKey:
      "0x0cc88f7d95d58f612494a2b7469a79178164001d6507a8012488013919a9626a",
    name: "Luckiest Alive",
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
