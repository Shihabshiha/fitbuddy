import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userDetails } from "../../types/userType";

interface userData {
  user : userDetails
}

const initialState : userData = {
  user : {
    firstName : "",
    lastName : "",
    _id : "",
    email : "",
    isBlocked : false,
    phoneNumber : '',
  }
}

const userSlice = createSlice({
  name : 'userdetails',
  initialState,
  reducers : {
    setUser(state, action : PayloadAction <userDetails>){
      state.user = action.payload
    },
    clearUser(state){
      state.user = initialState.user
    }
  }
})

export const { setUser , clearUser } = userSlice.actions

export const selectUser = (state : RootState ) => state.user

export const userReducer = userSlice.reducer;