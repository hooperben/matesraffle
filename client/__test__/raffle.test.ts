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

    // TODO get the real one
    const randomValue =
      "0x5fec80b1036f0ae7934869d4fffedc3ebd3c99d94294f500ead6bd7a03e2c2c1";

    console.log(`Sold ${populatedTickets.length} tickets.`);
    console.log(`Our random number generated was: ${randomValue} `);

    const seed = BigInt(`0x${randomValue.slice(2)}`);

    // Fisher-Yates shuffle using the seed
    const shuffled = [...tickets];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Number((seed + BigInt(i)) % BigInt(i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Take first 10 items
    console.log(shuffled.length);

    console.log(matesBallPrizes);
  });
});
