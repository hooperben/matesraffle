import { MatesRaffleDev } from "../typechain-types";
import { TestSuite } from "./test-suite";

describe("Mates Raffle testing", async () => {
  let MatesRaffle: MatesRaffleDev;
  let Signers;

  before(async () => {
    ({ MatesRaffle, Signers } = await TestSuite());
  });

  it("should run", async () => {});
});
