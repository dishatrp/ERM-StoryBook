import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checked: true,
};

const checked = createSlice({
  name: "checked",
  initialState,
  reducers: {
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
});

export default checked.reducer;

export const { setChecked } = checked.actions;
