import { MatesRaffleDev } from "../typechain-types";
import { TestSuite } from "./test-suite";
import { keccak256, toUtf8Bytes } from "ethers";
import { expect } from "chai";

describe("Mates Raffle testing", async () => {
  let MatesRaffle: MatesRaffleDev;
  let Signers;

  before(async () => {
    ({ MatesRaffle, Signers } = await TestSuite());
  });

  it("Testing that commit reveals match in ts and solidity", async () => {
    const preHash = "12345678910";
    const secret = toUtf8Bytes(preHash);

    const tsHash = keccak256(secret);
    const solHash = await MatesRaffle.hashBytes(secret);
    expect(tsHash).equal(solHash);
  });
});
