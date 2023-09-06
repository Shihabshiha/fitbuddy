import mongoose, { Schema } from "mongoose";
import { Trainer } from "../types/trainerTypes";

const trainerSchema = new Schema<Trainer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  isVerified: {
    type: String,
    enum: ["not_verified", "verified", "rejected"],
    default: "not_verified",
  },
  certificates: [{ type: String }],
});

const TrainerModel = mongoose.model<Trainer>("Trainer", trainerSchema);

export default TrainerModel;
