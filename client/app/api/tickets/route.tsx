/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createNexusClient } from "@biconomy/sdk";
import { base } from "viem/chains";
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import MatesRaffleABI from "../../../MatesRaffleABI.json";
import MatesRaffle from "../../../MatesRaffle.json";

import { JsonRpcProvider, Contract, Wallet } from "ethers";
import { verifyAuth } from "@/app/helpers/verify-auth";
import { raffles } from "@/app/constants/launch-raffles";

export async function PUT(request: Request) {
  const { dynamicJwtToken, raffle, passCode } = await request.json();

  console.log(raffle);

  const userFromToken = await verifyAuth(dynamicJwtToken);
  const address = userFromToken.verified_credentials[0].address;
  const activeRaffle = raffles[raffle.pubKey];

  if (!activeRaffle) {
    return NextResponse.json({ message: "no raffle found" }, { status: 400 });
  }

  if (activeRaffle.accessCode !== passCode) {
    return NextResponse.json(
      { message: "Invalid code sorry :(" },
      { status: 400 },
    );
  }

  try {
    const provider = new JsonRpcProvider(process.env.BASE_MAINNET_RPC_URL!);
    const signer = new Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new Contract(MatesRaffle.address, MatesRaffleABI, signer);
    const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);

    // this is not unique key, just what biconomy had
    const bundlerUrl =
      "https://bundler.biconomy.io/api/v3/8453/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

    const nexusClient = await createNexusClient({
      signer: account,
      chain: base,
      transport: http(),
      bundlerTransport: http(bundlerUrl),
    });
    const smartAccountAddress = await nexusClient.account.address;
    console.log(smartAccountAddress);

    const ticketHolder: `0x${string}` = address;

    const balance = await contract.balanceOf(address, raffle.pubKey);

    if (balance != BigInt(0)) {
      return NextResponse.json(
        { message: "Already have a ticket!" },
        { status: 400 },
      );
    }

    const txDetails = await contract.buyTickets.populateTransaction(
      raffle.pubKey,
      ticketHolder,
      1,
    );

    const tx = {
      to: txDetails.to as `0x${string}`,
      data: txDetails.data as `0x${string}`,
    };

    const hash = await nexusClient.sendTransaction({
      calls: [tx],
    });
    const receipt = await nexusClient.waitForTransactionReceipt({ hash });

    return NextResponse.json(
      { hash: receipt.transactionHash },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong getting your ticket" },
      { status: 400 },
    );
  }
}
