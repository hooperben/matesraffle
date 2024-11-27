import { model, models, Schema } from "mongoose";

const raffleManagerSchema = new Schema(
  {
    raffleId: { type: Schema.Types.ObjectId, ref: "Raffle", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    raffleAdmin: { type: Boolean, required: true, default: false },
    raffleSalesperson: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const RaffleManager =
  models.RaffleManager || model("RaffleManager", raffleManagerSchema);

export default RaffleManager;
