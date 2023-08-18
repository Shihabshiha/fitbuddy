import END_POINTS from "../../../constants/endpoints";
import { AdminLoginData } from "../../../types/adminTypes";
import { login } from "../../services/auth/admin-auth-sevices";

export const adminLogin = ( adminData:AdminLoginData ) =>{
  return login(END_POINTS.LOGIN_ADMIN,adminData)
}
