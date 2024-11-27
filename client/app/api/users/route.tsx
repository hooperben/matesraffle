import { connect } from "@/app/helpers/database";
import { verifyAuth } from "@/app/helpers/verify-auth";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const dynamicJwtToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!dynamicJwtToken)
    return NextResponse.json({ message: "Invalid Auth" }, { status: 401 });

  const userFromToken = await verifyAuth(dynamicJwtToken);

  await connect();

  console.log(userFromToken);

  const { email, given_name, verified_credentials } = userFromToken;

  // hopefully this always exists
  const address = verified_credentials[0].address;

  // TODO handle this better?
  if (!address)
    return NextResponse.json({ message: "Invalid User" }, { status: 202 });

  const existing = await User.findOne({ address });

  if (!existing) {
    await User.create({
      firstName: given_name,
      email,
      address,
    });
  } else {
    console.log("User: ", email, " already has account");
  }

  return NextResponse.json({ message: "Upserted User" }, { status: 200 });
}
