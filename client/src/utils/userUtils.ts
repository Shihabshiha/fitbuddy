import { setUser } from "../redux/reducers/userSlice";
import { getUserDetailsbyToken } from "../api/endpoints/user";
import { Dispatch } from "redux";

export const fetchUserDetails = async(dispatch : Dispatch) => {

    const userToken = localStorage.getItem("userToken");
    if(userToken){
      const response = await getUserDetailsbyToken();
      const userDetails = response?.data?.user;
      dispatch(setUser(userDetails));
    }
  
}