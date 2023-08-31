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
    password: string,
    certificates: string[],
  ) => {
    try {
      const existingTrainer = await TrainerModel.findOne({ email });

      if (existingTrainer) {
        throw new Error("Account already exist");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const newTrainer = await TrainerModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        certificates,
      });
      return newTrainer;
    } catch (error: any) {
      throw error
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

      if (trainer.isVerified === 'not_verified') {
        throw new Error("Your account is not yet verified.");
      }
    
      if (trainer.isVerified === 'rejected') {
        throw new Error("Your account has been rejected.");
      }

      const token = generateJwtToken({ id: trainer._id.toString() , role:'trainer' });
      return { token, trainer };
    } catch (error: any) {
      throw error
    }
  };

  return {
    signupTrainer,
    loginTrainer,
  };
};

export default createAuthService;
