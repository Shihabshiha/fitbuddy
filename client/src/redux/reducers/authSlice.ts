import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


const adminToken = localStorage.getItem("adminToken")


const initialState = {
  data: {
    adminToken:adminToken,
  },
  isLoggedIn: adminToken ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ adminToken: string}>
    ) {
      localStorage.setItem(
        "adminToken",
        JSON.stringify({
          adminToken: action.payload.adminToken,
        })
      )
      state.data = {
        adminToken: action.payload.adminToken,
      };
      state.isLoggedIn = true;
    },
    clearToken(state) {
      state.data = {
        adminToken: "",
      };
      localStorage.removeItem("adminToken");
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.data;

export const selectadminToken = (state:RootState)=> {
  const adminTokenString: string | null = state.auth.data.adminToken;
  const adminToken = JSON.parse(adminTokenString ?? "")?.adminToken || "";
  return adminToken;
}
export const selectIsLoggedIn = () => {
  const  adminToken = localStorage.getItem("adminToken");
  return adminToken ? true : false;
};


export const authReducer = authSlice.reducer;