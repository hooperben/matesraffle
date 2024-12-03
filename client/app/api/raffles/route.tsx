import { connect } from "@/app/helpers/database";
import { verifyAuth } from "@/app/helpers/verify-auth";
import Raffle from "@/lib/models/raffle";
import RaffleManager from "@/lib/models/raffle-manager";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raffleId = searchParams.get("raffleId");

  let raffles;

  await connect();

  if (raffleId) {
    raffles = await Raffle.findOne(
      {
        $or: [
          { rafflePubKey: raffleId },
          { name: new RegExp(`^${raffleId.replace("-", " ")}$`, "i") },
        ],
      },
      { _id: 1, name: 1, rafflePubKey: 1, createdAt: 1, updatedAt: 1 },
    );

    const authHeader: string | null = request.headers.get("Authorization");
    const dynamicJwtToken: string | null = authHeader
      ? authHeader.replace("Bearer ", "")
      : null;

    if (dynamicJwtToken && dynamicJwtToken !== "undefined") {
      const userFromToken = await verifyAuth(dynamicJwtToken);
      const { email } = userFromToken;

      const user = await User.findOne({ email });

      if (user) {
        const raffleManagerStatus = await RaffleManager.findOne({
          userId: user._id,
          raffleId: raffles._id,
        });

        if (raffleManagerStatus) {
          raffles = {
            ...raffles.toObject(),
            isRaffleAdmin: raffleManagerStatus.raffleAdmin,
            isRaffleSalesPerson: raffleManagerStatus.raffleSalesperson,
          };
        }

        // if they are raffle admin - include list of all raffle managers
        if (raffles.isRaffleAdmin) {
          const raffleManagers = await RaffleManager.find({
            raffleId: raffles._id,
          });
          raffles = {
            ...raffles,
            raffleManagers,
          };
        }
      }
    }
  } else {
    raffles = await Raffle.find().sort({ createdAt: -1 }).limit(5);
  }

  return NextResponse.json(raffles);
}

// export async function POST(request: Request) {
//   const { dynamicJwtToken, raffleName, raffleSecret } = await request.json();

//   // TODO verify auth and get user from token

//   await connect();

//   const secret = toUtf8Bytes(raffleSecret);

//   const rafflePubKey = keccak256(secret);

//   // create the raffle
//   const raffle = new Raffle({
//     rafflePubKey,
//     raffleSecret,
//     name: raffleName,
//   });

//   await raffle.save();

//   console.log(raffle);

//   // TODO change to use token value
//   const user = await User.findOne();

//   console.log(user);

//   const raffleManager = new RaffleManager({
//     raffleId: raffle._id,
//     userId: user._id,
//     raffleAdmin: true,
//     raffleSalesperson: true,
//   });

//   await raffleManager.save();

//   console.log(raffleManager);

//   return NextResponse.json({ message: "Created Records" }, { status: 200 });
// }
