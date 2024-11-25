import { connect } from "@/app/helpers/database";
import { verifyAuth } from "@/app/helpers/verify-auth";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  // const { dynamicJwtToken, raffle, passCode } = await request.json();

  await connect();

  const user = await User.findOne();

  console.log(user);

  return NextResponse.json({ message: "Connected to DB" }, { status: 200 });
}

export async function POST(request: Request) {
  const { dynamicJwtToken, raffle, passCode } = await request.json();

  const userFromToken = await verifyAuth(dynamicJwtToken);

  return NextResponse.json({ message: "Connected to DB" }, { status: 200 });
}
