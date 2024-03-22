import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  custId: number | null;
  clientName: string;
}

const initialState: InitialState = {
  custId: null,
  clientName: "",
};

const registerNewClient = createSlice({
  name: "registerNewClient",
  initialState,
  reducers: {
    getClientInfo: (state, action) => {
      state.custId = action.payload.custId;
      state.clientName = action.payload.clientName;
    },
  },
});

export default registerNewClient.reducer;

export const { getClientInfo } = registerNewClient.actions;
