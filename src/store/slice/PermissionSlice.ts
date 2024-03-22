import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  CUST_ID: number | null;
  POLICY_NAME: string;
}

const initialState: InitialState = {
  CUST_ID: null,
  POLICY_NAME: "",
};

const permissionSlice = createSlice({
  name: "permissionUser",
  initialState,
  reducers: {
    getuserPermission: (state, action) => {
      state.CUST_ID = action.payload.CUSTID;
      state.POLICY_NAME = action.payload.POLICY_NAME;
    },
  },
});

export default permissionSlice.reducer;
export const { getuserPermission } = permissionSlice.actions;
