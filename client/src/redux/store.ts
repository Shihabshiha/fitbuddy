import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";
import { authReducer } from "./reducers/adminAuthSlice";

export const store = configureStore({
  reducer :{
    user : userReducer,
    auth : authReducer,
  }
})


export type State = typeof store;

export type RootState = ReturnType<typeof store.getState>;