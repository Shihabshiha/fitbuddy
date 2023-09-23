import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userDetails } from "../../types/userType";

interface userData {
  userDetails : userDetails | null;
}

const initialState : userData = {
  userDetails : null,
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
    }
  }
})

export const { setUser , clearUser } = userSlice.actions

export const selectUser = (state : RootState ) => state.user

export const selectIsLoggedIn = () => {
  const  userToken = localStorage.getItem("userToken");
  return userToken ? true : false;
};

export const userReducer = userSlice.reducer;