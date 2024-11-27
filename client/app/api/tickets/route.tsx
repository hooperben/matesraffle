/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { verifyAuth } from "@/app/helpers/verify-auth";
import Raffle from "@/lib/models/raffle";
import { connect } from "@/app/helpers/database";
import User from "@/lib/models/user";
import RaffleManager from "@/lib/models/raffle-manager";
import Ticket from "@/lib/models/ticket";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raffleId = searchParams.get("raffleId");

  const authHeader = request.headers.get("Authorization");
  const dynamicJwtToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!dynamicJwtToken) {
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
  }

  try {
    await connect();

    // check the user can view these ticket records

    const userFromToken = await verifyAuth(dynamicJwtToken);
    const { email: raffleSalespersonEmail } = userFromToken;

    if (!raffleSalespersonEmail) {
      return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
    }

    const raffleSalesperson = await User.findOne({
      email: raffleSalespersonEmail,
    });

    console.log(raffleSalesperson);

    if (!raffleSalesperson) {
      return NextResponse.json(
        { message: "raffleSalespersonEmail not found" },
        { status: 404 },
      );
    }

    const raffle = await Raffle.findOne(
      { rafflePubKey: raffleId },
      { _id: 1, name: 1, rafflePubKey: 1, createdAt: 1, updatedAt: 1 },
    );

    console.log(raffle);

    const raffleManagerStatus = await RaffleManager.findOne({
      userId: raffleSalesperson._id,
      raffleId: raffle._id,
    });

    // if they are not salesperson or admin, don't let them create tickets
    if (
      !raffleManagerStatus.raffleSalesperson ||
      !raffleManagerStatus.raffleAdmin
    ) {
      return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
    }

    const tickets = await Ticket.find({ raffleId: raffle._id })
      .limit(10)
      .populate("userId soldBy");

    console.log(tickets);

    return NextResponse.json(tickets);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  const { raffleId, name, email, amount, cost } = await request.json();

  const authHeader = request.headers.get("Authorization");
  const dynamicJwtToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!dynamicJwtToken) {
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
  }

  try {
    await connect();

    const userFromToken = await verifyAuth(dynamicJwtToken);
    const { email: raffleSalespersonEmail } = userFromToken;

    if (!raffleSalespersonEmail) {
      return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
    }

    const raffleSalesperson = await User.findOne({
      email: raffleSalespersonEmail,
    });

    if (!raffleSalesperson) {
      return NextResponse.json(
        { message: "raffleSalespersonEmail not found" },
        { status: 404 },
      );
    }

    const raffle = await Raffle.findOne(
      { rafflePubKey: raffleId },
      { _id: 1, name: 1, rafflePubKey: 1, createdAt: 1, updatedAt: 1 },
    );

    if (!raffle) {
      return NextResponse.json(
        { message: "Raffle not found" },
        { status: 404 },
      );
    }

    const raffleManagerStatus = await RaffleManager.findOne({
      userId: raffleSalesperson._id,
      raffleId: raffle._id,
    });

    // if they are not salesperson or admin, don't let them create tickets
    if (
      !raffleManagerStatus.raffleSalesperson ||
      !raffleManagerStatus.raffleAdmin
    ) {
      return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
    }

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    const ticketBuyerUser = await User.findOneAndUpdate(
      { email },
      { firstName: name, email },
      { new: true, upsert: true },
    );

    if (!ticketBuyerUser) {
      return NextResponse.json(
        { message: "Failed to upsert user" },
        { status: 500 },
      );
    }

    // finally create the ticket record
    const ticket = new Ticket({
      raffleId: raffle._id,
      userId: ticketBuyerUser._id,
      amount: parseInt(amount),
      cost: parseInt(cost),
      soldBy: raffleSalesperson._id,
    });

    await ticket.save();

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 },
    );
  } catch (err) {
    console.error("ERROR creating ticket:");
    console.error(err);
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
  }
}
