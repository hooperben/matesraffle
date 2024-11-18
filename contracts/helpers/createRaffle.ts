import { ContractTransactionResponse } from "ethers";
import { MatesRaffle, MatesRaffleDev } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { keccak256, toUtf8Bytes } from "ethers";

export const getRafflePubKey = (
  privateKey: string,
): { publicKey: string; privateKey: string } => {
  const encodedRafflePrivateKey = toUtf8Bytes(privateKey);
  const publicKey = keccak256(encodedRafflePrivateKey);

  return { publicKey, privateKey };
};

export const createRaffle = async (
  MatesRaffle: MatesRaffle | MatesRaffleDev,
  raffleId: string,
  raffleCreator: SignerWithAddress,
  prizes = 10,
  isOpen = true,
  waitForConfirmation = true,
): Promise<ContractTransactionResponse> => {
  const tx = await MatesRaffle.connect(raffleCreator).createRaffle(
    raffleId,
    prizes,
    isOpen,
  );

  if (waitForConfirmation) {
    await tx.wait();
    return tx;
  }

  return tx;
};

export const purchaseTicket = async (
  MatesRaffle: MatesRaffle | MatesRaffleDev,
  raffleId: string,
  buyer: SignerWithAddress,
  waitForConfirmation = true,
) => {
  const tx = await MatesRaffle.connect(buyer).buyTickets(
    raffleId,
    buyer.address,
    1,
  );

  if (waitForConfirmation) {
    await tx.wait();
    return tx;
  }

  return tx;
};
