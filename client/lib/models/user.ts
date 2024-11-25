import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  address: { type: String, required: false },
});

const User = models.User || model("User", userSchema);

export default User;
