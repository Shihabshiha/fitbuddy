import bcrypt from "bcrypt";

import TrainerModel from "../../models/trainerModel";
import { generateJwtToken } from "../../middlewares/jwtAuth";

const SALT_ROUNDS = 10;

const createAuthService = () => {
  //function to signup trainer
  const signupTrainer = async (
    firstName: string,
    lastName:string,
    email: string,
    password: string
  ) => {
    try {
      const existingTriner = await TrainerModel.findOne({ email });

      if (existingTriner) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const isBlocked:boolean = false;

      const newTrainer = await TrainerModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isBlocked
      });
      return newTrainer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const loginTrainer = async (email: string, password: string) => {
    try {
      const trainer = await TrainerModel.findOne({ email });

      if (!trainer) {
        throw new Error("Trainer not found");
      }

      const passwordMatch = await bcrypt.compare(password, trainer.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = generateJwtToken({ id: trainer._id.toString() , role:'trainer' });
      return { token, trainer };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    signupTrainer,
    loginTrainer,
  };
};

export default createAuthService;
