import { MatesRaffleDev } from "../typechain-types";
import { TestSuite } from "./test-suite";
import { keccak256, toUtf8Bytes } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";

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
    const rafflePrivateKey = "rafflePrivateKey1";
    const encodedrafflePrivateKey = toUtf8Bytes(rafflePrivateKey);

    const rafflePubKey = keccak256(encodedrafflePrivateKey);

    await MatesRaffle.connect(Alice).createRaffle(rafflePubKey, 10, true);

    const raffleDetails = await MatesRaffle.raffles(rafflePubKey);

    expect(raffleDetails.manager).equal(Alice.address);
    expect(raffleDetails.prizes).equal(10);
  });
});
