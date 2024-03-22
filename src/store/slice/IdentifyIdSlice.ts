import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  identifyId: number | undefined
} = {
  identifyId: undefined,
};

const IdentifyIdSlice = createSlice({
  name: "identifyId",
  initialState,
  reducers: {
    setIdentifyId: (state, { payload }: { payload: undefined | number }) => {
      state.identifyId = payload || undefined
    },
  },
});

export default IdentifyIdSlice.reducer;

export const { setIdentifyId } = IdentifyIdSlice.actions;