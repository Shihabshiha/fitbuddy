import { Document } from "mongoose";

export interface Trainer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked : boolean;
}