import { model, models, Schema } from "mongoose";

const raffleSchema = new Schema(
  {
    rafflePubKey: { type: String, required: true, index: true },
    raffleSecret: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Raffle = models.Raffle || model("Raffle", raffleSchema);

export default Raffle;
