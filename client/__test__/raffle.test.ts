import { connect } from "@/app/helpers/database";
import Ticket from "@/lib/models/ticket";
import User from "@/lib/models/user";

import { matesBallPrizes } from "@/app/constants/mates-ball-prizes";

describe("Getting Truflation Data", () => {
  it("gets index data feeds", async () => {
    await connect();

    const tickets = await Ticket.find({}).populate({
      path: "userId",
      model: User,
    });

    const populatedTickets = tickets.flatMap((ticket) =>
      Array(ticket.amount).fill(ticket.userId.firstName),
    );

    // our final randomness generation:
    // https://basescan.org/tx/0x261d28c33d6165586b75f0f04d008ba31f6e1a76d1f7a7753421070f4082730f
    const randomValue =
      "0x7c0389705b36c57579ff023d8d7c543cde56d664e57f4a5d7e04e98ebc336dc0";

    console.log(`Sold ${populatedTickets.length} tickets.`);
    console.log(`Our random number generated was: ${randomValue} `);

    const seed = BigInt(`0x${randomValue.slice(2)}`);

    // Fisher-Yates shuffle using the seed
    const shuffled = [...tickets];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Number((seed + BigInt(i)) % BigInt(i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const allPrizes = matesBallPrizes.flatMap((prize) => prize.prizes);

    const matesBallPrizesWithWinners = [];

    console.log("all prizes length: ", allPrizes.length);

    for (let i = 0; i < allPrizes.length; i++) {
      const currentPrizeSponsor = matesBallPrizes.find((prize) =>
        prize.prizes.includes(allPrizes[i]),
      );
      console.log(
        `${shuffled[i].userId.firstName} won ${allPrizes[i]} from ${currentPrizeSponsor?.sponsorName}`,
      );

      matesBallPrizesWithWinners.push({
        winnerId: shuffled[i].userId._id,
        winner: shuffled[i].userId.firstName,
        prize: allPrizes[i],
        sponsor: currentPrizeSponsor?.sponsorName,
      });
    }

    console.log(matesBallPrizesWithWinners);
  });
});
