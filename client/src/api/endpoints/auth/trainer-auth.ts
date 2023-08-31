import END_POINTS from "../../../constants/endpoints";
import { TrainerLoginData } from "../../../types/trainerTypes";
import { register , login } from "../../services/auth/trainer-auth-services";

export const registerTrainer = (trainerData : FormData) =>{
  console.log('axios data ',trainerData)
  return register(END_POINTS.REGISTER_TRAINER,trainerData)
}

export const trainerLogin = (trainerInfo : TrainerLoginData) => {
  return login(END_POINTS.LOGIN_TRAINER,trainerInfo)
}

