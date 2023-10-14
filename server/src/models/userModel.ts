import mongoose, { Document, Schema } from "mongoose";
import { User } from "../types/userTypes";

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isBlocked: { type: Boolean, required: true },
  profileImage: { type: String },
  enrolledPrograms : [{type :  Schema.Types.ObjectId , ref : 'courses'}]
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
