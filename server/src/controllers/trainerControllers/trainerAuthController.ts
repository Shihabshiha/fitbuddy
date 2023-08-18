import { Request, Response } from "express";
import createAuthService from "../../services/trainerServices/trainerAuthService";
import { SignupRequestBody, LoginRequestBody } from "../../types/commonTypes";

const authService = createAuthService();

export const signupTrainerController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName , email, password }: SignupRequestBody = req.body;

    const newTrainer = await authService.signupTrainer( firstName , lastName, email, password);

    res
      .status(201)
      .json({ message: "Trainer signup successful", trainer: newTrainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginTrainerController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const { token, trainer } = await authService.loginTrainer(email, password);
    res
      .status(200)
      .json({ message: "Trainer login successful", token, trainer });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
