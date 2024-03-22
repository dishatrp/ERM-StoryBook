import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccessToken } from "../interface/LoginInterface";
import { removeCookie } from "@/helper/SessionToken";

interface InitialState {
  accesstoken?: null | Partial<AccessToken>;
  userName?: string | null
}

const initialState: InitialState = {
  accesstoken: {},
  userName: ''
};

const loginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken: (
      state: Draft<InitialState>,
      action: PayloadAction<Partial<AccessToken>>
    ) => {
      state.accesstoken = action.payload;
    },
    logout: (state) => {
      state.accesstoken = {}
      removeCookie('authToken');
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    }
  },
});

export const { setAccessToken, logout, setUserName } = loginSlice.actions;

export default loginSlice.reducer;
