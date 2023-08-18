import { CustomRequest } from "./custom-request";
import { Response, NextFunction } from "express";

export interface SignupRequestBody {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

