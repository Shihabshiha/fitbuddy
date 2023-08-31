import END_POINTS from "../../constants/endpoints";
import { getPendingVerificationList , sendAcceptanceMail , sendRejectedMail} from "../services/admin-services";

export const getTrainerVerificationList = () =>{
  return getPendingVerificationList(END_POINTS.GET_TRAINERS_VERIFICATION_LIST)
}


export const sendRequestAcceptedMail = (trainerEmail : string) => {
  return sendAcceptanceMail(END_POINTS.SEND_ACCEPTANCE_MAIL,trainerEmail)
}

export const sendRequestRejectedMail = (trainerEmail : string , reason: string) => {
  return sendRejectedMail(END_POINTS.SEND_REJECTED_MAIL,trainerEmail,reason)
}