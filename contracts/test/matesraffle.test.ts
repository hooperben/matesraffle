import { MatesRaffleDev } from "../typechain-types";
import { TestSuite } from "./test-suite";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { createRaffle, getRafflePubKey } from "../helpers/createRaffle";

describe("Mates Raffle testing", async () => {
  let MatesRaffle: MatesRaffleDev;
  let Signers;

  let Alice: SignerWithAddress;
  let Bob: SignerWithAddress;

  before(async () => {
    ({ MatesRaffle, Signers } = await TestSuite());
    [Alice, Bob] = Signers;
  });

  it("should allow for creation of a raffle", async () => {
    const { publicKey } = getRafflePubKey("rafflePrivateKey1");

    await createRaffle(MatesRaffle, publicKey, Alice);

    const raffleDetails = await MatesRaffle.raffles(publicKey);

    expect(raffleDetails.manager).equal(Alice.address);
    expect(raffleDetails.prizes).equal(10);
  });

  it("should allow for creation of a raffle and purchase of tickets", async () => {
    const { publicKey } = getRafflePubKey("test2");

    await createRaffle(MatesRaffle, publicKey, Alice);

    // as Bob, purchase a ticket
  });
});
