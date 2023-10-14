import {Schema, Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  profileImage: string;
  enrolledPrograms : Schema.Types.ObjectId[];

}

export interface GoogleUserPayload {
  given_name: string;
  family_name: string;
  email: string;
  picture :string;
}