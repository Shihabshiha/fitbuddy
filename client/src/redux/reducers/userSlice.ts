import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userDetails } from "../../types/userType";





interface userData {
  userDetails : userDetails | null;
}

const initialState : userData = {
  userDetails: {
    firstName: "",
    lastName: "",
    email: "",
    _id: "",
    isBlocked: false,
    phoneNumber: "",
    profileImage: "",
    enrolledPrograms: [], 
  }
}

const userSlice = createSlice({
  name : 'userdetails',
  initialState,
  reducers : {
    setUser(state, action : PayloadAction <userDetails>){
      state.userDetails = action.payload
    },
    clearUser(state){
      state.userDetails = initialState.userDetails
    },
    enrollProgram (state, action :PayloadAction<string>){
      if (state.userDetails) {
        state.userDetails = {
          ...state.userDetails,
          enrolledPrograms: [
            ...state.userDetails.enrolledPrograms,
            action.payload,
          ],
        };
      }
    },
  }
})


export const { setUser , clearUser , enrollProgram } = userSlice.actions

export const selectUser = (state : RootState ) => state.user

export const selectIsLoggedIn = () => {
  const  userToken = localStorage.getItem("userToken");
  return userToken ? true : false;
};

export const userReducer = userSlice.reducer;