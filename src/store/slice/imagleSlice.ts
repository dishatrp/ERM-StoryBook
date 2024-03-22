import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageValue: ''
}

const imageSet = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.imageValue = action.payload;
    },
  },
});

export default imageSet.reducer;

export const { setImage } = imageSet.actions;