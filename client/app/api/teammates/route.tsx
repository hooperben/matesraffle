import { connect } from "@/app/helpers/database";
import { verifyAuth } from "@/app/helpers/verify-auth";
import Raffle from "@/lib/models/raffle";
import RaffleManager from "@/lib/models/raffle-manager";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const dynamicJwtToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!dynamicJwtToken) {
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });
  }

  const { raffleId, name, email, isAdmin } = await request.json();

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
    if (!raffleManagerStatus.raffleAdmin) {
      return NextResponse.json(
        { message: "Not raffle admin" },
        { status: 401 },
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    const teammateUser = await User.findOneAndUpdate(
      { email },
      { firstName: name, email },
      { new: true, upsert: true },
    );

    if (!teammateUser) {
      return NextResponse.json(
        { message: "Failed to upsert user" },
        { status: 500 },
      );
    }

    const newRaffleManager = new RaffleManager({
      raffleId: raffle._id,
      userId: teammateUser._id,
      raffleAdmin: isAdmin,
      raffleSalesperson: true,
    });

    await newRaffleManager.save();

    return NextResponse.json(
      { message: "Raffle Manager Created!" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 },
    );
  }
}
