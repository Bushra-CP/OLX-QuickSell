import mongoose, { Schema } from "mongoose";
import type { UserInterface } from "../types/userTypes/userInterface.js";

const userSchema = new Schema<UserInterface>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model<UserInterface>("User", userSchema);
