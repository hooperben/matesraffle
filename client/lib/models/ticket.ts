import { model, models, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    raffleId: { type: Schema.Types.ObjectId, ref: "Raffle", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    cost: { type: Number, required: true },
    soldBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
