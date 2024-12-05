import { connect } from "@/app/helpers/database";
import { verifyAuth } from "@/app/helpers/verify-auth";
import Raffle from "@/lib/models/raffle";
import Ticket from "@/lib/models/ticket";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raffleId = searchParams.get("raffleId");

  if (!raffleId) {
    return NextResponse.json({ message: "Invalid Auth" }, { status: 400 });
  }

  const authHeader = request.headers.get("Authorization");
  const dynamicJwtToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!dynamicJwtToken)
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });

  const userFromToken = await verifyAuth(dynamicJwtToken);
  const { email } = userFromToken;

  try {
    const userRecord = await User.findOne({
      email,
    });
    if (!userRecord) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const raffleRecord = await Raffle.findOne({
      $or: [
        { rafflePubKey: raffleId },
        { name: new RegExp(`^${raffleId.replace("-", " ")}$`, "i") },
      ],
    });

    if (!raffleRecord) {
      return NextResponse.json(
        { message: "Raffle not found" },
        { status: 404 },
      );
    }

    const userTickets = await Ticket.find({
      userId: userRecord._id,
      raffleId: raffleRecord._id,
    });

    return NextResponse.json({ userTickets });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 401 },
    );
  }
  await connect();

  console.log(userFromToken);
}
