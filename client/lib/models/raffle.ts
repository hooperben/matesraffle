import { model, models, Schema } from "mongoose";

const raffleSchema = new Schema({
  raffleId: { type: String, required: true },
  name: { type: String, required: true },
});

const Raffle = models.Raffle || model("Raffle", raffleSchema);

export default Raffle;
