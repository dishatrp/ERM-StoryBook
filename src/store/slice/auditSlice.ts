import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  audit: {},
};

export const auditData = createSlice({
  name: "audit",
  initialState,
  reducers: {
    setAuditData: (state, action) => {
      state.audit = action.payload;
    },
  },
});

export default auditData.reducer;

export const { setAuditData } = auditData.actions;