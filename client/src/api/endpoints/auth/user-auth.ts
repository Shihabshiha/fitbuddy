import END_POINTS from "../../../constants/endpoints";
import { register , login , sendOtp , verifyOtp} from "../../services/auth/user-auth-services";
import { UserData } from "../../../types/userType";
import { UserLoginData } from "../../../types/userType";

export const sendOtpToMail = (email: string) =>{
  return sendOtp(END_POINTS.SEND_OTP,email)
}


export const verifyOtpOfMail = (otp : string) => {
  return verifyOtp(END_POINTS.VERIFY_OTP,otp)
}

export const registerUser = (userData : UserData ) =>{
  return register(END_POINTS.REGISTER_USER,userData)
}

export const loginUser = (userData : UserLoginData ) =>{
  return login(END_POINTS.LOGIN_USER,userData)
}