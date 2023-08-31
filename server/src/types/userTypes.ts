import { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
}

export interface GoogleUserPayload {
  given_name: string;
  family_name: string;
  email: string;
}