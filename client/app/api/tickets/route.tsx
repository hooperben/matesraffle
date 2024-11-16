/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createNexusClient } from "@biconomy/sdk";
import { base } from "viem/chains";
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import MatesRaffleABI from "../../../MatesRaffleABI.json";

import {
  toUtf8Bytes,
  keccak256,
  JsonRpcProvider,
  Contract,
  Wallet,
} from "ethers";
import { verifyAuth } from "@/app/helpers/verify-auth";

export async function PUT(request: Request) {
  const { dynamicJwtToken } = await request.json();

  const userFromToken = await verifyAuth(dynamicJwtToken);

  const address = userFromToken.verified_credentials[0].address;

  console.log(address);

  return NextResponse.json({ message: "hello" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const provider = new JsonRpcProvider(process.env.BASE_MAINNET_RPC_URL!);
    const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

    const contract = new Contract(
      "0x1656725E557137cFB077DA7F4602fd3d27024edC",
      MatesRaffleABI,
      signer,
    );
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

    const secret = toUtf8Bytes("12412123412"); // TODO make dynamic
    const publicRoundId = keccak256(secret);

    const ticketHolder: `0x${string}` =
      "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

    const txDetails = await contract.buyTickets.populateTransaction(
      publicRoundId,
      ticketHolder,
      1,
    );

    const tx = {
      to: txDetails.to as `0x${string}`,
      data: txDetails.data as `0x${string}`,
    };

    console.log(tx);

    const hash = await nexusClient.sendTransaction({
      calls: [tx],
    });
    const receipt = await nexusClient.waitForTransactionReceipt({ hash });

    console.log(receipt);

    return NextResponse.json(
      { hash: receipt.transactionHash },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
