import { model, models, Schema } from "mongoose";

const raffleManagerSchema = new Schema({
  raffleId: { type: String, required: true },
  userId: { type: String, required: true },
  raffleAdmin: { type: Boolean, required: true, default: false },
  raffleSalesperson: { type: Boolean, required: true, default: false },
});

const RaffleManager =
  models.RaffleManager || model("RaffleManager", raffleManagerSchema);

export default RaffleManager;
